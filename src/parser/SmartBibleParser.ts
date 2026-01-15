import type { BibleRefSettings, ParsedReference, ReferenceGranularity } from '../types';
import { BookNormalizer, createBookNormalizer } from './BookNormalizer';
import { ContentCleaner, createContentCleaner } from './ContentCleaner';
import { RangeExpander } from './RangeExpander';
import { escapeRegex, buildVersePartPattern } from '../utils/regexUtils';

/**
 * SmartBibleParser
 *
 * The main parser for detecting Bible references in natural text.
 * Supports multiple formats and writing styles:
 *
 * - Single verse: "Joh 3,16", "Johannes 3:16", "John 3.16"
 * - Verse list: "Joh 3,16.18" (verses 16 AND 18)
 * - Verse range: "Joh 3,16-18" (verses 16 TO 18)
 * - Mixed: "Joh 3,16-18.20" (verses 16, 17, 18, 20)
 * - Cross-chapter: "Joh 3,16-4,3" (from 3:16 to 4:3)
 * - Whole chapter: "Joh 3"
 * - Chapter range: "Joh 3-4" (chapters 3 AND 4)
 * - Whole book: "Kolosserbrief", "Kolosser"
 * - Numbered books: "1. Mose 3,15", "1Mose 3,15", "2 Kor 13"
 *
 * CRITICAL: Parse order matters!
 * 1. Cross-chapter ranges (most specific)
 * 2. Verse references
 * 3. Chapter references
 * 4. Book references (most general)
 */
export class SmartBibleParser {
  private settings: BibleRefSettings;
  private normalizer: BookNormalizer;
  private cleaner: ContentCleaner;
  private rangeExpander: RangeExpander;

  // Cached regex patterns
  private crossChapterPattern: RegExp | null = null;
  private versePattern: RegExp | null = null;
  private chapterPattern: RegExp | null = null;

  constructor(settings: BibleRefSettings) {
    this.settings = settings;
    this.normalizer = createBookNormalizer(settings);
    this.cleaner = createContentCleaner(settings.parseCodeBlocks);
    this.rangeExpander = new RangeExpander();

    this.buildPatterns();
  }

  /**
   * Parse content for Bible references
   * @param content Markdown content to parse
   * @returns Array of parsed references (not yet expanded)
   */
  parse(content: string): ParsedReference[] {
    if (!content) return [];

    // Clean content: remove code blocks, links, etc.
    const cleanedContent = this.cleaner.clean(content);

    // Track matched ranges to avoid overlapping matches
    const matchedRanges: Array<{ start: number; end: number }> = [];
    const results: ParsedReference[] = [];

    // Parse in order of specificity (most specific first)
    // 1. Cross-chapter ranges: "Joh 3,16-4,3"
    this.parseCrossChapterRanges(cleanedContent, matchedRanges, results);

    // 2. Verse references: "Joh 3,16", "Joh 3,16-18", "Joh 3,16.18"
    this.parseVerseReferences(cleanedContent, matchedRanges, results);

    // 3. Chapter references: "Joh 3", "Joh 3-4"
    this.parseChapterReferences(cleanedContent, matchedRanges, results);

    // 4. Book references (standalone): "Kolosserbrief", "Genesis"
    this.parseBookReferences(cleanedContent, matchedRanges, results);

    return results;
  }

  /**
   * Update settings and rebuild patterns
   */
  updateSettings(settings: BibleRefSettings): void {
    this.settings = settings;
    this.normalizer = createBookNormalizer(settings);
    this.cleaner = createContentCleaner(settings.parseCodeBlocks);
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

    // Guard: If no aliases are configured, disable all patterns
    // This prevents invalid regex like /\b()\s*.../ which would match empty strings
    if (!bookPattern) {
      this.crossChapterPattern = null;
      this.versePattern = null;
      this.chapterPattern = null;
      return;
    }

    const cvSep = escapeRegex(this.settings.separators.chapterVerse);
    const listSep = this.settings.separators.list;
    const rangeSep = this.settings.separators.range;

    // Pattern for verse numbers with optional list/range
    // Examples: "16", "16-18", "16.18", "16-18.20"
    const versePartPattern = buildVersePartPattern(listSep, rangeSep);

    // Cross-chapter range: "Joh 3,16-4,3"
    // Book + Chapter + Separator + Verse + Range + Chapter + Separator + Verse
    this.crossChapterPattern = new RegExp(
      `\\b(${bookPattern})\\s*(\\d+)${cvSep}(\\d+)${rangeSep}(\\d+)${cvSep}(\\d+)\\b`,
      'gi'
    );

    // Verse reference: "Joh 3,16" or "Joh 3,16-18" or "Joh 3,16.18.20"
    // Book + Chapter + Separator + VersePart
    this.versePattern = new RegExp(
      `\\b(${bookPattern})\\s*(\\d+)${cvSep}(${versePartPattern})\\b`,
      'gi'
    );

    // Chapter reference: "Joh 3" or "Joh 3-4"
    // Book + Chapter (with optional range)
    this.chapterPattern = new RegExp(
      `\\b(${bookPattern})\\s*(\\d+)(?:${rangeSep}(\\d+))?\\b`,
      'gi'
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // PRIVATE: Parsing Methods
  // ═══════════════════════════════════════════════════════════════

  /**
   * Parse cross-chapter ranges: "Joh 3,16-4,3"
   * Most specific pattern - must be matched first
   */
  private parseCrossChapterRanges(
    content: string,
    matchedRanges: Array<{ start: number; end: number }>,
    results: ParsedReference[]
  ): void {
    if (!this.crossChapterPattern) return;

    // Reset regex
    this.crossChapterPattern.lastIndex = 0;

    let match;
    while ((match = this.crossChapterPattern.exec(content)) !== null) {
      const start = match.index;
      const end = start + match[0].length;

      // Skip if overlaps with already matched content
      if (this.isOverlapping(start, end, matchedRanges)) continue;

      const bookName = match[1];
      const startChapter = parseInt(match[2], 10);
      const startVerse = parseInt(match[3], 10);
      const endChapter = parseInt(match[4], 10);
      const endVerse = parseInt(match[5], 10);

      // Validate parsed numbers
      if (isNaN(startChapter) || startChapter < 1) continue;
      if (isNaN(startVerse) || startVerse < 1) continue;
      if (isNaN(endChapter) || endChapter < 1) continue;
      if (isNaN(endVerse) || endVerse < 1) continue;

      const bookId = this.normalizer.normalize(bookName);
      if (!bookId) continue;

      // Validate: end chapter must be >= start chapter
      if (endChapter < startChapter) continue;

      results.push({
        raw: match[0],
        bookId,
        granularity: 'verse',
        startChapter,
        startVerse,
        endChapter,
        endVerse
      });

      matchedRanges.push({ start, end });
    }
  }

  /**
   * Parse verse references: "Joh 3,16", "Joh 3,16-18", "Joh 3,16.18"
   */
  private parseVerseReferences(
    content: string,
    matchedRanges: Array<{ start: number; end: number }>,
    results: ParsedReference[]
  ): void {
    if (!this.versePattern) return;

    // Reset regex
    this.versePattern.lastIndex = 0;

    let match;
    while ((match = this.versePattern.exec(content)) !== null) {
      const start = match.index;
      const end = start + match[0].length;

      // Skip if overlaps with already matched content
      if (this.isOverlapping(start, end, matchedRanges)) continue;

      const bookName = match[1];
      const chapter = parseInt(match[2], 10);
      const versePart = match[3];

      // Validate parsed chapter number
      if (isNaN(chapter) || chapter < 1) continue;

      const bookId = this.normalizer.normalize(bookName);
      if (!bookId) continue;

      // Parse the verse part (can be single, range, list, or mixed)
      const verseData = this.parseVersePart(versePart);

      if (verseData.verses.length === 0) continue;

      const ref: ParsedReference = {
        raw: match[0],
        bookId,
        granularity: 'verse',
        startChapter: chapter,
        startVerse: verseData.verses[0]
      };

      // Determine if it's a simple range or a list
      if (verseData.isSimpleRange && verseData.verses.length >= 2) {
        ref.endVerse = verseData.verses[verseData.verses.length - 1];
      } else if (verseData.verses.length > 1) {
        // It's a list (possibly with ranges inside)
        ref._verseList = verseData.verses;
        ref.endVerse = verseData.verses[verseData.verses.length - 1];
      }

      results.push(ref);
      matchedRanges.push({ start, end });
    }
  }

  /**
   * Parse chapter references: "Joh 3", "Joh 3-4"
   */
  private parseChapterReferences(
    content: string,
    matchedRanges: Array<{ start: number; end: number }>,
    results: ParsedReference[]
  ): void {
    if (!this.chapterPattern) return;

    // Reset regex
    this.chapterPattern.lastIndex = 0;

    let match;
    while ((match = this.chapterPattern.exec(content)) !== null) {
      const start = match.index;
      const end = start + match[0].length;

      // Skip if overlaps with already matched content
      if (this.isOverlapping(start, end, matchedRanges)) continue;

      const bookName = match[1];
      const startChapter = parseInt(match[2], 10);
      const endChapter = match[3] ? parseInt(match[3], 10) : undefined;

      // Validate parsed chapter numbers
      if (isNaN(startChapter) || startChapter < 1) continue;
      if (endChapter !== undefined && (isNaN(endChapter) || endChapter < 1)) continue;

      const bookId = this.normalizer.normalize(bookName);
      if (!bookId) continue;

      results.push({
        raw: match[0],
        bookId,
        granularity: 'chapter',
        startChapter,
        endChapter
      });

      matchedRanges.push({ start, end });
    }
  }

  /**
   * Parse standalone book references: "Kolosserbrief", "Genesis"
   * These are patterns that work without any chapter/verse numbers
   */
  private parseBookReferences(
    content: string,
    matchedRanges: Array<{ start: number; end: number }>,
    results: ParsedReference[]
  ): void {
    const standalonePatterns = this.normalizer.getStandalonePatterns();

    for (const { pattern, bookId } of standalonePatterns) {
      // Reset regex
      pattern.lastIndex = 0;

      let match;
      while ((match = pattern.exec(content)) !== null) {
        const start = match.index;
        const end = start + match[0].length;

        // Skip if overlaps with already matched content
        if (this.isOverlapping(start, end, matchedRanges)) continue;

        results.push({
          raw: match[0],
          bookId,
          granularity: 'book'
        });

        matchedRanges.push({ start, end });
      }
    }
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

  /**
   * Check if a range overlaps with any existing matched ranges
   */
  private isOverlapping(
    start: number,
    end: number,
    matchedRanges: Array<{ start: number; end: number }>
  ): boolean {
    for (const range of matchedRanges) {
      // Check if ranges overlap
      if (start < range.end && end > range.start) {
        return true;
      }
    }
    return false;
  }

}

/**
 * Factory function to create a SmartBibleParser from settings
 * @param settings Plugin settings
 * @returns SmartBibleParser instance
 */
export function createSmartBibleParser(settings: BibleRefSettings): SmartBibleParser {
  return new SmartBibleParser(settings);
}
