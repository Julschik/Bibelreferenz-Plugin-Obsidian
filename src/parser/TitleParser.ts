import type { BibleRefSettings, ParsedReference } from '../types';
import { BookNormalizer, createBookNormalizer } from './BookNormalizer';
import { RangeExpander } from './RangeExpander';
import { escapeRegex, buildVersePartPattern } from '../utils/regexUtils';

/**
 * TitleParser
 *
 * Specialized parser for extracting Bible references from file names.
 * Used to enable Deep-Dive notes (e.g., "Joh 3,16.md") to appear in the
 * Concordance Sidebar when that verse is mentioned elsewhere.
 *
 * Supported patterns in file names:
 * - "Joh 3,16.md" → Verse reference
 * - "Johannes 3:16.md" → Verse reference (English style)
 * - "Kolosser Zusammenfassung.md" → Book reference
 * - "Genesis Überblick.md" → Book reference
 * - "Joh 3.md" → Chapter reference
 * - "1. Mose 3,15.md" → Numbered book reference
 *
 * Notes without valid references are silently ignored.
 */
export class TitleParser {
  private settings: BibleRefSettings;
  private normalizer: BookNormalizer;
  private rangeExpander: RangeExpander;

  // Cached regex patterns
  private versePattern: RegExp | null = null;
  private chapterPattern: RegExp | null = null;

  constructor(settings: BibleRefSettings) {
    this.settings = settings;
    this.normalizer = createBookNormalizer(settings);
    this.rangeExpander = new RangeExpander();

    this.buildPatterns();
  }

  /**
   * Parse a file name for Bible references
   * @param fileName File name (with or without .md extension)
   * @returns Array of parsed references (usually 0 or 1 element)
   */
  parse(fileName: string): ParsedReference[] {
    if (!fileName) return [];

    // Remove .md extension if present
    const cleanName = fileName.endsWith('.md')
      ? fileName.slice(0, -3)
      : fileName;

    const results: ParsedReference[] = [];

    // Try to match patterns in order of specificity
    // 1. Verse references: "Joh 3,16"
    const verseRef = this.parseVerseReference(cleanName);
    if (verseRef) {
      results.push(verseRef);
      return results; // Found verse, no need to check further
    }

    // 2. Chapter references: "Joh 3"
    const chapterRef = this.parseChapterReference(cleanName);
    if (chapterRef) {
      results.push(chapterRef);
      return results; // Found chapter, no need to check further
    }

    // 3. Book references (standalone): "Kolosserbrief", "Genesis"
    const bookRef = this.parseBookReference(cleanName);
    if (bookRef) {
      results.push(bookRef);
      return results;
    }

    return results;
  }

  /**
   * Update settings and rebuild patterns
   */
  updateSettings(settings: BibleRefSettings): void {
    this.settings = settings;
    this.normalizer = createBookNormalizer(settings);
    this.buildPatterns();
  }

  // ═══════════════════════════════════════════════════════════════
  // PRIVATE: Pattern Building
  // ═══════════════════════════════════════════════════════════════

  /**
   * Build regex patterns based on current settings
   */
  private buildPatterns(): void {
    const bookPattern = this.normalizer.getAllAliasesPattern();
    const cvSep = escapeRegex(this.settings.separators.chapterVerse);
    const listSep = this.settings.separators.list;
    const rangeSep = this.settings.separators.range;

    // Pattern for verse numbers with optional list/range
    // Examples: "16", "16-18", "16.18", "16-18.20"
    const versePartPattern = buildVersePartPattern(listSep, rangeSep);

    // Verse reference: "Joh 3,16" or "Joh 3,16-18"
    // Allow optional text before/after
    this.versePattern = new RegExp(
      `^.*?\\b(${bookPattern})\\s*(\\d+)${cvSep}(${versePartPattern})\\b.*$`,
      'i'
    );

    // Chapter reference: "Joh 3" (without verse numbers)
    // Allow optional text before/after
    this.chapterPattern = new RegExp(
      `^.*?\\b(${bookPattern})\\s*(\\d+)\\b.*$`,
      'i'
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // PRIVATE: Parsing Methods
  // ═══════════════════════════════════════════════════════════════

  /**
   * Try to parse as verse reference
   */
  private parseVerseReference(title: string): ParsedReference | null {
    if (!this.versePattern) return null;

    const match = title.match(this.versePattern);
    if (!match) return null;

    const bookName = match[1];
    const chapter = parseInt(match[2], 10);
    const versePart = match[3];

    // Validate parsed chapter number
    if (isNaN(chapter) || chapter < 1) return null;

    const bookId = this.normalizer.normalize(bookName);
    if (!bookId) return null;

    // Parse the verse part
    const verseData = this.parseVersePart(versePart);
    if (verseData.verses.length === 0) return null;

    const ref: ParsedReference = {
      raw: match[0].trim(),
      bookId,
      granularity: 'verse',
      startChapter: chapter,
      startVerse: verseData.verses[0]
    };

    // Determine if it's a simple range or a list
    if (verseData.isSimpleRange && verseData.verses.length >= 2) {
      ref.endVerse = verseData.verses[verseData.verses.length - 1];
    } else if (verseData.verses.length > 1) {
      // It's a list
      ref._verseList = verseData.verses;
      ref.endVerse = verseData.verses[verseData.verses.length - 1];
    }

    return ref;
  }

  /**
   * Try to parse as chapter reference
   */
  private parseChapterReference(title: string): ParsedReference | null {
    if (!this.chapterPattern) return null;

    const match = title.match(this.chapterPattern);
    if (!match) return null;

    const bookName = match[1];
    const chapter = parseInt(match[2], 10);

    // Validate parsed chapter number
    if (isNaN(chapter) || chapter < 1) return null;

    const bookId = this.normalizer.normalize(bookName);
    if (!bookId) return null;

    // Make sure this isn't actually a verse reference (which would have been caught earlier)
    // by checking if there's a chapter-verse separator right after the chapter number
    const cvSep = this.settings.separators.chapterVerse;
    const chapterEndIndex = match[0].indexOf(match[2]) + match[2].length;
    const nextChar = match[0][chapterEndIndex];

    if (nextChar === cvSep) {
      // This is actually a verse reference that failed to parse
      return null;
    }

    return {
      raw: match[0].trim(),
      bookId,
      granularity: 'chapter',
      startChapter: chapter
    };
  }

  /**
   * Try to parse as book reference (standalone patterns only)
   */
  private parseBookReference(title: string): ParsedReference | null {
    const standalonePatterns = this.normalizer.getStandalonePatterns();

    for (const { pattern, bookId } of standalonePatterns) {
      // Test the pattern (no need to reset lastIndex since we're not using 'g' flag)
      const match = pattern.exec(title);
      if (match) {
        return {
          raw: match[1] || match[0], // Use captured group if available
          bookId,
          granularity: 'book'
        };
      }
    }

    return null;
  }

  // ═══════════════════════════════════════════════════════════════
  // PRIVATE: Helper Methods
  // ═══════════════════════════════════════════════════════════════

  /**
   * Parse verse part string into verse numbers
   * Examples:
   * - "16" → [16], isSimpleRange: false
   * - "16-18" → [16, 17, 18], isSimpleRange: true
   * - "16.18" → [16, 18], isSimpleRange: false
   * - "16-18.20" → [16, 17, 18, 20], isSimpleRange: false
   */
  private parseVersePart(input: string): { verses: number[]; isSimpleRange: boolean } {
    const listSep = this.settings.separators.list;
    const rangeSep = this.settings.separators.range;

    // Check if it's a simple range (no list separator)
    const hasListSep = input.includes(listSep);

    // Use RangeExpander's parseVersePart method
    const verses = this.rangeExpander.parseVersePart(input, listSep, rangeSep);

    // Determine if it's a simple continuous range
    const isSimpleRange = !hasListSep && input.includes(rangeSep);

    return { verses, isSimpleRange };
  }

}

/**
 * Factory function to create a TitleParser from settings
 * @param settings Plugin settings
 * @returns TitleParser instance
 */
export function createTitleParser(settings: BibleRefSettings): TitleParser {
  return new TitleParser(settings);
}
