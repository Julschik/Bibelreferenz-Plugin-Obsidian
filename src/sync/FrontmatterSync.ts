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
      if (this.areTagsEqual(existingTags, newTags)) {
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
   * Write Bible reference tags to file frontmatter
   * @param file The file to write
   * @param tags Array of tags to write
   */
  private async write(file: TFile, tags: string[]): Promise<void> {
    const key = this.settings.frontmatterKey;

    await this.app.fileManager.processFrontMatter(file, (frontmatter) => {
      if (tags.length === 0) {
        // Remove the key if no tags
        delete frontmatter[key];
      } else {
        // Write tags as array
        frontmatter[key] = tags;
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
