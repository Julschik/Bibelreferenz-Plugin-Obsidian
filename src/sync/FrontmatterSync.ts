import { App, TFile } from 'obsidian';
import type { BibleRefSettings } from '../types';

/**
 * FrontmatterSync
 *
 * Responsible for reading and writing Bible reference tags to file frontmatter.
 *
 * CRITICAL: Loop Prevention
 * -------------------------
 * processFrontMatter() triggers the 'modify' event, which could cause infinite loops
 * if the modify handler calls processFrontMatter again. This class uses an
 * `isUpdating` flag to prevent re-entry.
 *
 * Usage Example:
 * ```typescript
 * const sync = new FrontmatterSync(app, settings);
 *
 * // Check if currently updating to avoid loops
 * if (!sync.isCurrentlyUpdating) {
 *   await sync.sync(file, newTags);
 * }
 * ```
 */
export class FrontmatterSync {
  private app: App;
  private settings: BibleRefSettings;
  private isUpdating: boolean = false;

  constructor(app: App, settings: BibleRefSettings) {
    this.app = app;
    this.settings = settings;
  }

  /**
   * Synchronize tags to file frontmatter
   * @param file The file to update
   * @param newTags Array of new tags to write
   * @returns true if changes were made, false if no changes or update in progress
   */
  async sync(file: TFile, newTags: string[]): Promise<boolean> {
    // CRITICAL: Prevent infinite loops
    if (this.isUpdating) {
      return false;
    }

    this.isUpdating = true;

    try {
      // Read existing tags
      const existingTags = await this.read(file);

      // Check if tags have changed
      const tagsEqual = this.areTagsEqual(existingTags, newTags);

      // Also check if granularity setting has changed (when writeToTagsField is enabled)
      const granularityChanged = await this.hasGranularityChanged(file);

      if (tagsEqual && !granularityChanged) {
        return false; // No changes needed
      }

      // Write new tags to frontmatter
      await this.write(file, newTags);

      return true; // Changes were made
    } catch (error) {
      console.error('FrontmatterSync: Error syncing file', file.path, error);
      return false;
    } finally {
      // ALWAYS reset the flag, even if an error occurs
      this.isUpdating = false;
    }
  }

  /**
   * Check if the granularity setting has changed since last sync
   * @param file The file to check
   * @returns true if granularity has changed and update is needed
   */
  private async hasGranularityChanged(file: TFile): Promise<boolean> {
    // Only relevant when writeToTagsField is enabled
    if (!this.settings.writeToTagsField) {
      return false;
    }

    try {
      const cache = this.app.metadataCache.getFileCache(file);
      const frontmatter = cache?.frontmatter;

      if (!frontmatter) return false;

      const storedGranularity = frontmatter['_bible_refs_granularity'];
      const currentGranularity = this.settings.graphTagGranularity || 'verse';

      // If no stored granularity, update is needed to store it
      if (!storedGranularity) return true;

      return storedGranularity !== currentGranularity;
    } catch {
      return false;
    }
  }

  /**
   * Read Bible reference tags from file frontmatter
   * @param file The file to read
   * @returns Array of tags (empty array if none found)
   */
  async read(file: TFile): Promise<string[]> {
    try {
      const cache = this.app.metadataCache.getFileCache(file);
      const frontmatter = cache?.frontmatter;

      if (!frontmatter) return [];

      const key = this.settings.frontmatterKey;
      const value = frontmatter[key];

      if (!value) return [];

      // Handle both array and single string values
      if (Array.isArray(value)) {
        return value.filter(tag => typeof tag === 'string');
      }

      if (typeof value === 'string') {
        return [value];
      }

      return [];
    } catch (error) {
      console.error('FrontmatterSync: Error reading file', file.path, error);
      return [];
    }
  }

  /**
   * Truncate a tag based on granularity setting
   * @param tag Full tag (e.g., "bible/Joh/3/16")
   * @param granularity Target granularity level
   * @returns Truncated tag (e.g., "bible/Joh/3" for chapter granularity)
   */
  private truncateTag(tag: string, granularity: 'book' | 'chapter' | 'verse'): string {
    const parts = tag.split('/');
    switch (granularity) {
      case 'book':
        return parts.slice(0, 2).join('/');     // bible/Joh
      case 'chapter':
        return parts.slice(0, 3).join('/');     // bible/Joh/3
      default:
        return tag;                              // bible/Joh/3/16
    }
  }

  /**
   * Write Bible reference tags to file frontmatter
   * Optionally also writes to standard 'tags' field for graph view visibility
   * @param file The file to write
   * @param tags Array of tags to write
   */
  private async write(file: TFile, tags: string[]): Promise<void> {
    const key = this.settings.frontmatterKey;
    const tagPrefix = this.settings.tagPrefix;
    const writeToTagsField = this.settings.writeToTagsField || false;
    const granularity = this.settings.graphTagGranularity || 'verse';

    await this.app.fileManager.processFrontMatter(file, (frontmatter) => {
      // Write to custom field (_bible_refs) - always full granularity
      if (tags.length === 0) {
        delete frontmatter[key];
      } else {
        frontmatter[key] = tags;
      }

      // Optionally also write to standard 'tags' field for graph view
      if (writeToTagsField) {
        // Store granularity for change detection
        frontmatter['_bible_refs_granularity'] = granularity;

        // Get existing tags, filter out old Bible tags
        const existingTags: string[] = Array.isArray(frontmatter.tags)
          ? frontmatter.tags
          : (frontmatter.tags ? [frontmatter.tags] : []);

        const nonBibleTags = existingTags.filter(
          (t: unknown) => typeof t === 'string' && !t.startsWith(tagPrefix)
        );

        if (tags.length === 0) {
          // Keep only non-Bible tags
          if (nonBibleTags.length === 0) {
            delete frontmatter.tags;
          } else {
            frontmatter.tags = nonBibleTags;
          }
        } else {
          // Truncate tags based on granularity and deduplicate
          const truncatedTags = [...new Set(
            tags.map(tag => this.truncateTag(tag, granularity))
          )];
          // Merge non-Bible tags with truncated Bible tags
          frontmatter.tags = [...nonBibleTags, ...truncatedTags];
        }
      } else {
        // Clean up granularity field if writeToTagsField is disabled
        delete frontmatter['_bible_refs_granularity'];
      }
    });
  }

  /**
   * Check if currently updating (for external loop prevention)
   */
  get isCurrentlyUpdating(): boolean {
    return this.isUpdating;
  }

  /**
   * Compare two tag arrays for equality
   * @param a First array
   * @param b Second array
   * @returns true if arrays contain the same tags (order-independent)
   */
  private areTagsEqual(a: string[], b: string[]): boolean {
    if (a.length !== b.length) return false;

    // Sort both arrays for comparison
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();

    return sortedA.every((tag, index) => tag === sortedB[index]);
  }

  /**
   * Update settings
   */
  updateSettings(settings: BibleRefSettings): void {
    this.settings = settings;
  }

  /**
   * Clear all Bible reference tags from a file
   * @param file The file to clear
   * @returns true if changes were made
   */
  async clear(file: TFile): Promise<boolean> {
    return this.sync(file, []);
  }

  /**
   * Check if a file has any Bible reference tags
   * @param file The file to check
   * @returns true if the file has Bible reference tags
   */
  async hasTags(file: TFile): Promise<boolean> {
    const tags = await this.read(file);
    return tags.length > 0;
  }

  /**
   * Get count of Bible reference tags in a file
   * @param file The file to check
   * @returns Number of tags
   */
  async getTagCount(file: TFile): Promise<number> {
    const tags = await this.read(file);
    return tags.length;
  }
}

/**
 * Factory function to create a FrontmatterSync instance
 * @param app Obsidian App instance
 * @param settings Plugin settings
 * @returns FrontmatterSync instance
 */
export function createFrontmatterSync(
  app: App,
  settings: BibleRefSettings
): FrontmatterSync {
  return new FrontmatterSync(app, settings);
}
