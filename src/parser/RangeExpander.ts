import type { ParsedReference, ExpandedReference } from '../types';
import {
  BIBLE_STRUCTURE,
  getMaxVerse,
  getMaxChapter,
  getAllVersesInChapter,
  getAllChaptersInBook
} from '../data/bibleStructure';

/**
 * RangeExpander
 *
 * Expands ParsedReference objects into atomic ExpandedReference arrays.
 * CRITICAL PRINCIPLE: "Atomic Tagging"
 * - Ranges are ALWAYS expanded to individual verses
 * - NEVER create tags like "bible/Joh/3/16-18"
 * - ALWAYS create separate tags: "bible/Joh/3/16", "bible/Joh/3/17", "bible/Joh/3/18"
 *
 * Handles:
 * - Single verses: Joh 3,16 → [{ bookId: 'Joh', chapter: 3, verse: 16 }]
 * - Verse ranges: Joh 3,16-18 → 3 expanded references
 * - Verse lists: Joh 3,16.18.20 → 3 expanded references
 * - Mixed: Joh 3,16-18.20 → 4 expanded references
 * - Chapter ranges: Joh 3-4 → All verses in chapters 3 and 4
 * - Cross-chapter ranges: Joh 3,35-4,3 → Verses from 3:35 to 4:3
 * - Whole chapters: Joh 3 → All verses in chapter 3
 * - Whole books: Kolosser → All verses in all chapters
 */
export class RangeExpander {
  /**
   * Expand a parsed reference into atomic verse references
   * @param ref Parsed reference to expand
   * @returns Array of atomic verse references
   */
  expand(ref: ParsedReference): ExpandedReference[] {
    try {
      switch (ref.granularity) {
        case 'book':
          return this.expandBook(ref.bookId);

        case 'chapter':
          return this.expandChapters(ref);

        case 'verse':
          // Check if it's a cross-chapter range
          if (
            ref.endChapter !== undefined &&
            ref.endChapter !== ref.startChapter
          ) {
            return this.expandCrossChapterRange(ref);
          }
          // Regular verse reference (may include ranges/lists within one chapter)
          return this.expandVerses(ref);

        default:
          return [];
      }
    } catch (error) {
      // Graceful degradation: log error but don't crash
      console.warn(`Failed to expand reference: ${ref.raw}`, error);
      return [];
    }
  }

  /**
   * Parse a verse part (e.g., "16-18.20") into individual verse numbers
   * Handles:
   * - Single: "16" → [16]
   * - List: "16.18.20" → [16, 18, 20]
   * - Range: "16-18" → [16, 17, 18]
   * - Mixed: "16-18.20" → [16, 17, 18, 20]
   *
   * @param input Verse part string
   * @param listSep List separator (e.g., ".")
   * @param rangeSep Range separator (e.g., "-")
   * @returns Array of verse numbers
   */
  parseVersePart(
    input: string,
    listSep: string,
    rangeSep: string
  ): number[] {
    if (!input) return [];

    const verses = new Set<number>();

    // Split by list separator (e.g., "16-18.20" → ["16-18", "20"])
    const parts = input.split(listSep);

    for (const part of parts) {
      const trimmed = part.trim();
      if (!trimmed) continue;

      // Check if it's a range (e.g., "16-18")
      if (trimmed.includes(rangeSep)) {
        const [startStr, endStr] = trimmed.split(rangeSep);
        const start = parseInt(startStr.trim(), 10);
        const end = parseInt(endStr.trim(), 10);

        if (!isNaN(start) && !isNaN(end) && start <= end) {
          for (let v = start; v <= end; v++) {
            verses.add(v);
          }
        }
      } else {
        // Single verse
        const verse = parseInt(trimmed, 10);
        if (!isNaN(verse)) {
          verses.add(verse);
        }
      }
    }

    return Array.from(verses).sort((a, b) => a - b);
  }

  // ═══════════════════════════════════════════════════════════════
  // PRIVATE EXPANSION METHODS
  // ═══════════════════════════════════════════════════════════════

  /**
   * Expand a book-level reference to all verses in all chapters
   * Example: "Kolosser" → All verses in Colossians (95 verses total)
   */
  private expandBook(bookId: string): ExpandedReference[] {
    const result: ExpandedReference[] = [];
    const chapters = getAllChaptersInBook(bookId);

    for (const chapter of chapters) {
      const verses = getAllVersesInChapter(bookId, chapter);
      for (const verse of verses) {
        result.push({ bookId, chapter, verse });
      }
    }

    return result;
  }

  /**
   * Expand chapter-level references
   * Handles:
   * - Single chapter: Joh 3 → All verses in chapter 3
   * - Chapter range: Joh 3-4 → All verses in chapters 3 and 4
   */
  private expandChapters(ref: ParsedReference): ExpandedReference[] {
    const result: ExpandedReference[] = [];

    if (!ref.startChapter) return result;

    const startChapter = ref.startChapter;
    const endChapter = ref.endChapter || startChapter;

    for (let chapter = startChapter; chapter <= endChapter; chapter++) {
      const verses = getAllVersesInChapter(ref.bookId, chapter);
      for (const verse of verses) {
        result.push({ bookId: ref.bookId, chapter, verse });
      }
    }

    return result;
  }

  /**
   * Expand verse-level references within a single chapter
   * Handles:
   * - Single: Joh 3,16
   * - Range: Joh 3,16-18
   * - List: Joh 3,16.18.20
   * - Mixed: Joh 3,16-18.20
   */
  private expandVerses(ref: ParsedReference): ExpandedReference[] {
    const result: ExpandedReference[] = [];

    if (!ref.startChapter || !ref.startVerse) return result;

    const chapter = ref.startChapter;
    let verses: number[] = [];

    // Check if there's a verse list (e.g., "16.18.20")
    if (ref._verseList && ref._verseList.length > 0) {
      verses = ref._verseList;
    } else if (ref.endVerse && ref.endVerse !== ref.startVerse) {
      // It's a range within the same chapter
      for (let v = ref.startVerse; v <= ref.endVerse; v++) {
        verses.push(v);
      }
    } else {
      // Single verse
      verses = [ref.startVerse];
    }

    // Validate verses against Bible structure
    const maxVerse = getMaxVerse(ref.bookId, chapter);
    if (maxVerse === null) return result;

    for (const verse of verses) {
      // Only include valid verses
      if (verse >= 1 && verse <= maxVerse) {
        result.push({
          bookId: ref.bookId,
          chapter,
          verse
        });
      }
    }

    return result;
  }

  /**
   * Expand cross-chapter ranges
   * Example: Joh 3,35-4,3 → Verses from 3:35 to end of ch.3 + 4:1-3
   *
   * Algorithm:
   * 1. Add remaining verses in start chapter (from startVerse to end)
   * 2. Add all verses in intermediate chapters (if any)
   * 3. Add verses in end chapter (from 1 to endVerse)
   */
  private expandCrossChapterRange(ref: ParsedReference): ExpandedReference[] {
    const result: ExpandedReference[] = [];

    if (
      !ref.startChapter ||
      !ref.startVerse ||
      !ref.endChapter ||
      !ref.endVerse
    ) {
      return result;
    }

    const { bookId, startChapter, startVerse, endChapter, endVerse } = ref;

    // Validate chapters
    const maxChapter = getMaxChapter(bookId);
    if (
      maxChapter === null ||
      startChapter > maxChapter ||
      endChapter > maxChapter
    ) {
      return result;
    }

    // 1. Add remaining verses in start chapter
    const startChapterMaxVerse = getMaxVerse(bookId, startChapter);
    if (startChapterMaxVerse !== null) {
      for (let v = startVerse; v <= startChapterMaxVerse; v++) {
        result.push({ bookId, chapter: startChapter, verse: v });
      }
    }

    // 2. Add all verses in intermediate chapters
    for (let ch = startChapter + 1; ch < endChapter; ch++) {
      const verses = getAllVersesInChapter(bookId, ch);
      for (const verse of verses) {
        result.push({ bookId, chapter: ch, verse });
      }
    }

    // 3. Add verses in end chapter (from 1 to endVerse)
    const endChapterMaxVerse = getMaxVerse(bookId, endChapter);
    if (endChapterMaxVerse !== null) {
      const actualEndVerse = Math.min(endVerse, endChapterMaxVerse);
      for (let v = 1; v <= actualEndVerse; v++) {
        result.push({ bookId, chapter: endChapter, verse: v });
      }
    }

    return result;
  }
}

/**
 * Helper function to create a RangeExpander instance
 */
export function createRangeExpander(): RangeExpander {
  return new RangeExpander();
}
