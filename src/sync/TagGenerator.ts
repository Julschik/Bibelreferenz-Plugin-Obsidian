import type { ParsedReference, ExpandedReference, BibleRefSettings, Locale } from '../types';
import { RangeExpander } from '../parser/RangeExpander';
import { DisplayIdResolver, createDisplayIdResolver } from '../parser/DisplayIdResolver';
import { getDisplayId } from '../languages/registry';

/**
 * TagGenerator
 *
 * Converts parsed Bible references into hierarchical tag strings.
 * Handles expansion of ranges to individual verse tags (Atomic Tagging).
 *
 * Tag Format Examples:
 * - Book level: "bible/Col"
 * - Chapter level: "bible/Col/3"
 * - Verse level: "bible/Col/3/16"
 *
 * CRITICAL: Ranges are ALWAYS expanded to individual verses.
 * Never generate "bible/Joh/3/16-18" - always generate three separate tags.
 */
export class TagGenerator {
  private settings: BibleRefSettings;
  private rangeExpander: RangeExpander;
  private displayIdResolver: DisplayIdResolver;

  constructor(settings: BibleRefSettings) {
    this.settings = settings;
    this.rangeExpander = new RangeExpander();
    this.displayIdResolver = createDisplayIdResolver(settings);
  }

  /**
   * Generate tags from an array of parsed references
   * @param references Array of parsed references
   * @returns Array of unique tag strings
   */
  generateTags(references: ParsedReference[]): string[] {
    const tagSet = new Set<string>();

    for (const ref of references) {
      const tags = this.generateTagsForReference(ref);
      tags.forEach(tag => tagSet.add(tag));
    }

    // Return sorted array for consistent output
    // Use natural sort to handle numeric parts correctly (e.g., verse 9 before verse 10)
    return Array.from(tagSet).sort((a, b) => {
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    });
  }

  /**
   * Generate tags for a single parsed reference
   * @param ref Parsed reference (bookId is canonicalId like "Gen", "Joh")
   * @returns Array of tag strings
   */
  private generateTagsForReference(ref: ParsedReference): string[] {
    const prefix = this.settings.tagPrefix;
    const locale = this.settings.language as Locale;

    // ref.bookId is canonicalId (e.g., "Gen"), get language-specific displayId
    // First check for custom pinned display ID
    let displayId = this.displayIdResolver.getDisplayId(ref.bookId);

    // If no custom pinning, get default displayId from language config
    if (displayId === ref.bookId) {
      displayId = getDisplayId(locale, ref.bookId);
    }

    switch (ref.granularity) {
      case 'book':
        // Book level: "bible/Col" or "bible/Mt" if pinned
        return [`${prefix}${displayId}`];

      case 'chapter':
        // Chapter level: Expand to all verses OR just chapter tag
        return this.generateChapterTags(ref, prefix, displayId);

      case 'verse':
        // Verse level: Expand ranges to individual verses (Atomic Tagging)
        return this.generateVerseTags(ref, prefix, displayId);

      default:
        return [];
    }
  }

  /**
   * Generate tags for chapter-level references
   * Expands to all individual verses in the chapter(s)
   */
  private generateChapterTags(ref: ParsedReference, prefix: string, displayId: string): string[] {
    const tags: string[] = [];

    // Expand to individual verses
    const expanded = this.rangeExpander.expand(ref);

    for (const verse of expanded) {
      tags.push(`${prefix}${displayId}/${verse.chapter}/${verse.verse}`);
    }

    return tags;
  }

  /**
   * Generate tags for verse-level references
   * Handles single verses, ranges, and lists
   */
  private generateVerseTags(ref: ParsedReference, prefix: string, displayId: string): string[] {
    const tags: string[] = [];

    // Expand to individual verses (handles ranges, lists, cross-chapter, etc.)
    const expanded = this.rangeExpander.expand(ref);

    for (const verse of expanded) {
      tags.push(`${prefix}${displayId}/${verse.chapter}/${verse.verse}`);
    }

    return tags;
  }

  /**
   * Update settings
   */
  updateSettings(settings: BibleRefSettings): void {
    this.settings = settings;
    this.displayIdResolver = createDisplayIdResolver(settings);
  }
}

/**
 * Factory function to create a TagGenerator from settings
 * @param settings Plugin settings
 * @returns TagGenerator instance
 */
export function createTagGenerator(settings: BibleRefSettings): TagGenerator {
  return new TagGenerator(settings);
}

/**
 * Helper function to parse a tag string back to its components
 * @param tag Tag string (e.g., "bible/Joh/3/16")
 * @returns Object with bookId, chapter, verse (if present)
 */
export function parseTag(tag: string): {
  bookId: string;
  chapter?: number;
  verse?: number;
  granularity: 'book' | 'chapter' | 'verse';
} | null {
  // Remove prefix (assume default "bible/")
  const parts = tag.split('/');

  if (parts.length < 2) return null;

  // Skip the prefix (e.g., "bible")
  const [, bookId, chapterStr, verseStr] = parts;

  if (!bookId) return null;

  // Book level only
  if (!chapterStr) {
    return { bookId, granularity: 'book' };
  }

  const chapter = parseInt(chapterStr, 10);
  if (isNaN(chapter)) return null;

  // Chapter level only
  if (!verseStr) {
    return { bookId, chapter, granularity: 'chapter' };
  }

  const verse = parseInt(verseStr, 10);
  if (isNaN(verse)) return null;

  // Verse level
  return { bookId, chapter, verse, granularity: 'verse' };
}

/**
 * Helper function to compare tags by specificity
 * More specific tags (verse) come before less specific (chapter, book)
 * @param a First tag
 * @param b Second tag
 * @returns Comparison result for sorting
 */
export function compareTagsBySpecificity(a: string, b: string): number {
  const aParts = a.split('/').length;
  const bParts = b.split('/').length;

  // More parts = more specific
  if (aParts !== bParts) {
    return bParts - aParts; // Descending (most specific first)
  }

  // Same specificity: alphabetical
  return a.localeCompare(b);
}

/**
 * Helper function to group tags by book
 * @param tags Array of tag strings
 * @returns Map of bookId to array of tags
 */
export function groupTagsByBook(tags: string[]): Map<string, string[]> {
  const grouped = new Map<string, string[]>();

  for (const tag of tags) {
    const parsed = parseTag(tag);
    if (!parsed) continue;

    const existing = grouped.get(parsed.bookId) || [];
    existing.push(tag);
    grouped.set(parsed.bookId, existing);
  }

  return grouped;
}
