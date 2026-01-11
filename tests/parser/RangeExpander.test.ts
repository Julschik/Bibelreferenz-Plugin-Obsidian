import { describe, it, expect, beforeEach } from 'vitest';
import { RangeExpander } from '../../src/parser/RangeExpander';
import type { ParsedReference } from '../../src/types';

describe('RangeExpander', () => {
  let expander: RangeExpander;

  beforeEach(() => {
    expander = new RangeExpander();
  });

  describe('parseVersePart', () => {
    it('should parse single verse', () => {
      const result = expander.parseVersePart('16', '.', '-');
      expect(result).toEqual([16]);
    });

    it('should parse verse list', () => {
      const result = expander.parseVersePart('16.18.20', '.', '-');
      expect(result).toEqual([16, 18, 20]);
    });

    it('should parse verse range', () => {
      const result = expander.parseVersePart('16-18', '.', '-');
      expect(result).toEqual([16, 17, 18]);
    });

    it('should parse mixed list and range', () => {
      const result = expander.parseVersePart('16-18.20', '.', '-');
      expect(result).toEqual([16, 17, 18, 20]);
    });

    it('should parse complex mixed pattern', () => {
      const result = expander.parseVersePart('16-18.20.22-24', '.', '-');
      expect(result).toEqual([16, 17, 18, 20, 22, 23, 24]);
    });

    it('should handle whitespace', () => {
      const result = expander.parseVersePart(' 16 - 18 . 20 ', '.', '-');
      expect(result).toEqual([16, 17, 18, 20]);
    });

    it('should handle English separators', () => {
      const result = expander.parseVersePart('16-18,20', ',', '-');
      expect(result).toEqual([16, 17, 18, 20]);
    });

    it('should handle empty input', () => {
      const result = expander.parseVersePart('', '.', '-');
      expect(result).toEqual([]);
    });

    it('should deduplicate verses', () => {
      const result = expander.parseVersePart('16.16.18.16', '.', '-');
      expect(result).toEqual([16, 18]);
    });

    it('should sort verses', () => {
      const result = expander.parseVersePart('20.16.18', '.', '-');
      expect(result).toEqual([16, 18, 20]);
    });

    it('should handle invalid ranges gracefully', () => {
      const result = expander.parseVersePart('18-16', '.', '-'); // Backward range
      expect(result).toEqual([]);
    });
  });

  describe('expand - Single Verse', () => {
    it('should expand single verse reference', () => {
      const ref: ParsedReference = {
        raw: 'Joh 3,16',
        bookId: 'Joh',
        granularity: 'verse',
        startChapter: 3,
        startVerse: 16
      };

      const result = expander.expand(ref);
      expect(result).toEqual([
        { bookId: 'Joh', chapter: 3, verse: 16 }
      ]);
    });

    it('should expand multiple single verses from different references', () => {
      const ref1: ParsedReference = {
        raw: 'Gen 1,1',
        bookId: 'Gen',
        granularity: 'verse',
        startChapter: 1,
        startVerse: 1
      };

      const result1 = expander.expand(ref1);
      expect(result1).toEqual([
        { bookId: 'Gen', chapter: 1, verse: 1 }
      ]);
    });
  });

  describe('expand - Verse Ranges', () => {
    it('should expand simple verse range', () => {
      const ref: ParsedReference = {
        raw: 'Joh 3,16-18',
        bookId: 'Joh',
        granularity: 'verse',
        startChapter: 3,
        startVerse: 16,
        endVerse: 18
      };

      const result = expander.expand(ref);
      expect(result).toEqual([
        { bookId: 'Joh', chapter: 3, verse: 16 },
        { bookId: 'Joh', chapter: 3, verse: 17 },
        { bookId: 'Joh', chapter: 3, verse: 18 }
      ]);
    });

    it('should expand verse list with _verseList', () => {
      const ref: ParsedReference = {
        raw: 'Joh 3,16.18.20',
        bookId: 'Joh',
        granularity: 'verse',
        startChapter: 3,
        startVerse: 16,
        _verseList: [16, 18, 20]
      };

      const result = expander.expand(ref);
      expect(result).toHaveLength(3);
      expect(result).toContainEqual({ bookId: 'Joh', chapter: 3, verse: 16 });
      expect(result).toContainEqual({ bookId: 'Joh', chapter: 3, verse: 18 });
      expect(result).toContainEqual({ bookId: 'Joh', chapter: 3, verse: 20 });
    });

    it('should validate verse numbers against Bible structure', () => {
      // John 3 has 36 verses (in standard numbering)
      const ref: ParsedReference = {
        raw: 'Joh 3,35-40', // 40 doesn't exist
        bookId: 'Joh',
        granularity: 'verse',
        startChapter: 3,
        startVerse: 35,
        endVerse: 40
      };

      const result = expander.expand(ref);
      // Should only include valid verses (35, 36)
      expect(result.length).toBeLessThanOrEqual(2);
      expect(result.every(r => r.verse <= 36)).toBe(true);
    });
  });

  describe('expand - Cross-Chapter Ranges', () => {
    it('should expand cross-chapter range', () => {
      const ref: ParsedReference = {
        raw: 'Joh 3,35-4,3',
        bookId: 'Joh',
        granularity: 'verse',
        startChapter: 3,
        startVerse: 35,
        endChapter: 4,
        endVerse: 3
      };

      const result = expander.expand(ref);

      // John 3 has 36 verses, so 35-36 = 2 verses
      // John 4:1-3 = 3 verses
      // Total = 5 verses
      expect(result.length).toBe(5);

      // Check start chapter verses
      expect(result).toContainEqual({ bookId: 'Joh', chapter: 3, verse: 35 });
      expect(result).toContainEqual({ bookId: 'Joh', chapter: 3, verse: 36 });

      // Check end chapter verses
      expect(result).toContainEqual({ bookId: 'Joh', chapter: 4, verse: 1 });
      expect(result).toContainEqual({ bookId: 'Joh', chapter: 4, verse: 2 });
      expect(result).toContainEqual({ bookId: 'Joh', chapter: 4, verse: 3 });
    });

    it('should handle cross-chapter range with intermediate chapters', () => {
      // Example: Gen 1,30-2,3
      // Gen 1 has 31 verses, so 30-31 = 2 verses
      // Gen 2:1-3 = 3 verses
      // Total = 5 verses
      const ref: ParsedReference = {
        raw: '1Mo 1,30-2,3',
        bookId: 'Gen',
        granularity: 'verse',
        startChapter: 1,
        startVerse: 30,
        endChapter: 2,
        endVerse: 3
      };

      const result = expander.expand(ref);
      expect(result.length).toBe(5);
    });
  });

  describe('expand - Chapter References', () => {
    it('should expand single chapter to all verses', () => {
      const ref: ParsedReference = {
        raw: 'Phm 1',
        bookId: 'Phm',
        granularity: 'chapter',
        startChapter: 1
      };

      const result = expander.expand(ref);
      // Philemon has 1 chapter with 25 verses
      expect(result.length).toBe(25);
      expect(result[0]).toEqual({ bookId: 'Phm', chapter: 1, verse: 1 });
      expect(result[24]).toEqual({ bookId: 'Phm', chapter: 1, verse: 25 });
    });

    it('should expand chapter range', () => {
      const ref: ParsedReference = {
        raw: 'Kol 3-4',
        bookId: 'Col',
        granularity: 'chapter',
        startChapter: 3,
        endChapter: 4
      };

      const result = expander.expand(ref);
      // Col 3: 25 verses, Col 4: 18 verses = 43 total
      expect(result.length).toBe(25 + 18);

      // Check chapters
      const chap3Verses = result.filter(r => r.chapter === 3);
      const chap4Verses = result.filter(r => r.chapter === 4);
      expect(chap3Verses.length).toBe(25);
      expect(chap4Verses.length).toBe(18);
    });
  });

  describe('expand - Book References', () => {
    it('should expand whole book reference', () => {
      const ref: ParsedReference = {
        raw: 'Philemon',
        bookId: 'Phm',
        granularity: 'book'
      };

      const result = expander.expand(ref);
      // Philemon: 1 chapter, 25 verses
      expect(result.length).toBe(25);
    });

    it('should expand small book (Obadiah - 1 chapter)', () => {
      const ref: ParsedReference = {
        raw: 'Obadja',
        bookId: 'Oba',
        granularity: 'book'
      };

      const result = expander.expand(ref);
      // Obadiah: 1 chapter, 21 verses
      expect(result.length).toBe(21);
    });

    it('should expand medium book (Colossians)', () => {
      const ref: ParsedReference = {
        raw: 'Kolosser',
        bookId: 'Col',
        granularity: 'book'
      };

      const result = expander.expand(ref);
      // Colossians: 4 chapters, 95 verses total
      expect(result.length).toBe(29 + 23 + 25 + 18); // 95
    });

    it('should expand large book (Genesis)', () => {
      const ref: ParsedReference = {
        raw: 'Genesis',
        bookId: 'Gen',
        granularity: 'book'
      };

      const result = expander.expand(ref);
      // Genesis: 50 chapters, 1533 verses
      expect(result.length).toBeGreaterThan(1500);
      expect(result[0]).toEqual({ bookId: 'Gen', chapter: 1, verse: 1 });
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid book IDs gracefully', () => {
      const ref: ParsedReference = {
        raw: 'InvalidBook 1,1',
        bookId: 'InvalidBook',
        granularity: 'verse',
        startChapter: 1,
        startVerse: 1
      };

      const result = expander.expand(ref);
      expect(result).toEqual([]);
    });

    it('should handle missing chapter/verse gracefully', () => {
      const ref: ParsedReference = {
        raw: 'Joh ???',
        bookId: 'Joh',
        granularity: 'verse'
        // Missing startChapter and startVerse
      };

      const result = expander.expand(ref);
      expect(result).toEqual([]);
    });

    it('should handle invalid chapter numbers', () => {
      const ref: ParsedReference = {
        raw: 'Joh 999',
        bookId: 'Joh',
        granularity: 'chapter',
        startChapter: 999 // John only has 21 chapters
      };

      const result = expander.expand(ref);
      expect(result).toEqual([]);
    });
  });

  describe('Atomic Tagging Principle', () => {
    it('should NEVER return range tags', () => {
      const ref: ParsedReference = {
        raw: 'Joh 3,16-18',
        bookId: 'Joh',
        granularity: 'verse',
        startChapter: 3,
        startVerse: 16,
        endVerse: 18
      };

      const result = expander.expand(ref);

      // Should be 3 separate references, not one range
      expect(result.length).toBe(3);
      expect(result).toEqual([
        { bookId: 'Joh', chapter: 3, verse: 16 },
        { bookId: 'Joh', chapter: 3, verse: 17 },
        { bookId: 'Joh', chapter: 3, verse: 18 }
      ]);
    });

    it('should expand all verses atomically', () => {
      const ref: ParsedReference = {
        raw: 'Joh 3,16-18.20.22-24',
        bookId: 'Joh',
        granularity: 'verse',
        startChapter: 3,
        startVerse: 16,
        _verseList: [16, 17, 18, 20, 22, 23, 24]
      };

      const result = expander.expand(ref);

      // Should be 7 atomic references
      expect(result.length).toBe(7);
      for (const expanded of result) {
        expect(expanded).toHaveProperty('bookId');
        expect(expanded).toHaveProperty('chapter');
        expect(expanded).toHaveProperty('verse');
        expect(typeof expanded.verse).toBe('number');
      }
    });
  });
});
