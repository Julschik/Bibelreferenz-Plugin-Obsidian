/**
 * Language Migration Service
 *
 * Handles migration of Bible reference tags when the user changes their language setting.
 * Converts tags like "Bibel/Joh/3/16" → "Bible/John/3/16" automatically.
 *
 * UX Goal: "It just works" - users should never need to think about tag formats.
 */

import type { App, TFile } from 'obsidian';
import { Notice } from 'obsidian';
import type { Locale, LocaleStrings } from '../languages/types';
import {
  getLanguage,
  buildUniversalToDisplayIdMap,
  getAllTagPrefixes,
  getLocaleByTagPrefix,
} from '../languages/registry';

/**
 * Result of a migration operation
 */
export interface MigrationResult {
  filesProcessed: number;
  tagsConverted: number;
  errors: string[];
}

/**
 * Language Migration Service
 */
export class LanguageMigrationService {
  private app: App;

  constructor(app: App) {
    this.app = app;
  }

  /**
   * Migrate all Bible reference tags from one language to another.
   * Called when user changes language setting.
   *
   * @param fromLocale Source language (or null to auto-detect from existing tags)
   * @param toLocale Target language
   * @param strings Localized strings for notices
   * @returns Migration result
   */
  async migrateAllTags(
    fromLocale: Locale | null,
    toLocale: Locale,
    strings: LocaleStrings
  ): Promise<MigrationResult> {
    const result: MigrationResult = {
      filesProcessed: 0,
      tagsConverted: 0,
      errors: [],
    };

    // Get target language config
    const toLang = getLanguage(toLocale);

    // Build universal mapping: any known displayId/alias → target displayId
    const displayIdMap = buildUniversalToDisplayIdMap(toLocale);

    // Get all known prefixes for detection
    const allPrefixes = getAllTagPrefixes();

    // Get all markdown files
    const files = this.app.vault.getMarkdownFiles();

    // Show progress notice
    new Notice(strings.noticeLanguageMigration.replace('{count}', String(files.length)));

    for (const file of files) {
      try {
        let fileChanged = false;

        await this.app.fileManager.processFrontMatter(file, (frontmatter) => {
          if (!frontmatter.tags || !Array.isArray(frontmatter.tags)) {
            return;
          }

          const newTags = frontmatter.tags.map((tag: string) => {
            const migratedTag = this.migrateTag(tag, toLang.tagPrefix, displayIdMap, allPrefixes);
            if (migratedTag !== tag) {
              result.tagsConverted++;
              fileChanged = true;
            }
            return migratedTag;
          });

          frontmatter.tags = newTags;
        });

        if (fileChanged) {
          result.filesProcessed++;
        }
      } catch (error) {
        result.errors.push(`${file.path}: ${error}`);
      }
    }

    // Show completion notice
    new Notice(
      strings.noticeLanguageMigrationCompleted
        .replace('{count}', String(result.tagsConverted))
        .replace('{language}', toLang.name)
    );

    return result;
  }

  /**
   * Migrate a single tag to the target language format.
   *
   * @param tag Original tag (e.g., "Bibel/Joh/3/16")
   * @param toPrefix Target prefix (e.g., "Bible")
   * @param displayIdMap Map of all known IDs to target displayId
   * @param allPrefixes All known tag prefixes
   * @returns Migrated tag (e.g., "Bible/John/3/16")
   */
  private migrateTag(
    tag: string,
    toPrefix: string,
    displayIdMap: Map<string, string>,
    allPrefixes: string[]
  ): string {
    // Check if this is a Bible reference tag
    const lowerTag = tag.toLowerCase();
    const matchingPrefix = allPrefixes.find(prefix =>
      lowerTag.startsWith(prefix.toLowerCase() + '/')
    );

    if (!matchingPrefix) {
      // Not a Bible reference tag, return unchanged
      return tag;
    }

    // Parse the tag: Prefix/BookId/Chapter/Verse or Prefix/BookId/Chapter
    const parts = tag.split('/');
    if (parts.length < 2) {
      return tag;
    }

    const [_oldPrefix, oldBookId, ...rest] = parts;

    // Look up the new displayId
    const newDisplayId = displayIdMap.get(oldBookId.toLowerCase());
    if (!newDisplayId) {
      // Unknown book ID, return unchanged
      return tag;
    }

    // Reconstruct tag with new prefix and displayId
    return [toPrefix, newDisplayId, ...rest].join('/');
  }

  /**
   * Detect which language is currently being used in the vault's tags.
   * Useful for auto-detecting the source language when migrating.
   *
   * @returns The most common locale found in existing tags, or null if none found
   */
  async detectCurrentLanguage(): Promise<Locale | null> {
    const prefixCounts = new Map<string, number>();
    const files = this.app.vault.getMarkdownFiles();

    // Sample up to 100 files for performance
    const sampleSize = Math.min(files.length, 100);
    const sampledFiles = files.slice(0, sampleSize);

    for (const file of sampledFiles) {
      try {
        const cache = this.app.metadataCache.getFileCache(file);
        const tags = cache?.frontmatter?.tags;

        if (Array.isArray(tags)) {
          for (const tag of tags) {
            const prefix = this.extractPrefix(tag);
            if (prefix) {
              const locale = getLocaleByTagPrefix(prefix);
              if (locale) {
                prefixCounts.set(locale, (prefixCounts.get(locale) || 0) + 1);
              }
            }
          }
        }
      } catch {
        // Ignore errors during detection
      }
    }

    // Find the most common locale
    let maxCount = 0;
    let detectedLocale: Locale | null = null;

    for (const [locale, count] of prefixCounts) {
      if (count > maxCount) {
        maxCount = count;
        detectedLocale = locale as Locale;
      }
    }

    return detectedLocale;
  }

  /**
   * Extract the prefix from a tag.
   */
  private extractPrefix(tag: string): string | null {
    const parts = tag.split('/');
    if (parts.length >= 2) {
      return parts[0];
    }
    return null;
  }

  /**
   * Count Bible reference tags in the vault.
   * Useful for showing migration progress estimates.
   */
  async countBibleTags(): Promise<number> {
    const allPrefixes = getAllTagPrefixes();
    let count = 0;

    for (const file of this.app.vault.getMarkdownFiles()) {
      try {
        const cache = this.app.metadataCache.getFileCache(file);
        const tags = cache?.frontmatter?.tags;

        if (Array.isArray(tags)) {
          for (const tag of tags) {
            const lowerTag = tag.toLowerCase();
            if (allPrefixes.some(p => lowerTag.startsWith(p.toLowerCase() + '/'))) {
              count++;
            }
          }
        }
      } catch {
        // Ignore errors
      }
    }

    return count;
  }
}

/**
 * Factory function to create a LanguageMigrationService
 */
export function createLanguageMigrationService(app: App): LanguageMigrationService {
  return new LanguageMigrationService(app);
}
