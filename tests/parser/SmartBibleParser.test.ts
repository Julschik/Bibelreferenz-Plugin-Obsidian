import { describe, it, expect, beforeEach } from 'vitest';
import { SmartBibleParser } from '../../src/parser/SmartBibleParser';
import type { BibleRefSettings } from '../../src/types';

/**
 * Helper to create default German settings
 */
function createGermanSettings(): BibleRefSettings {
  return {
    syncMode: 'on-save-or-change',
    language: 'de',
    separators: {
      chapterVerse: ',',
      list: '.',
      range: '-'
    },
    frontmatterKey: 'bible-refs',
    tagPrefix: 'bible/',
    customBookMappings: {},
    parseCodeBlocks: false,
    parseTitles: true
  };
}

/**
 * Helper to create default English settings
 */
function createEnglishSettings(): BibleRefSettings {
  return {
    ...createGermanSettings(),
    language: 'en',
    separators: {
      chapterVerse: ':',
      list: ',',
      range: '-'
    }
  };
}

describe('SmartBibleParser', () => {
  describe('German format parsing', () => {
    let parser: SmartBibleParser;

    beforeEach(() => {
      parser = new SmartBibleParser(createGermanSettings());
    });

    describe('Single verse references', () => {
      it('should parse "Joh 3,16"', () => {
        const result = parser.parse('Siehe Joh 3,16');
        expect(result).toHaveLength(1);
        expect(result[0].bookId).toBe('Joh');
        expect(result[0].startChapter).toBe(3);
        expect(result[0].startVerse).toBe(16);
        expect(result[0].granularity).toBe('verse');
      });

      it('should parse "Johannes 3,16"', () => {
        const result = parser.parse('Lese Johannes 3,16 heute');
        expect(result).toHaveLength(1);
        expect(result[0].bookId).toBe('Joh');
        expect(result[0].startChapter).toBe(3);
        expect(result[0].startVerse).toBe(16);
      });

      it('should parse "1. Mose 3,15"', () => {
        const result = parser.parse('Siehe 1. Mose 3,15');
        expect(result).toHaveLength(1);
        expect(result[0].bookId).toBe('Gen');
        expect(result[0].startChapter).toBe(3);
        expect(result[0].startVerse).toBe(15);
      });

      it('should parse "1Mose 3,15" (no space)', () => {
        const result = parser.parse('Siehe 1Mose 3,15');
        expect(result).toHaveLength(1);
        expect(result[0].bookId).toBe('Gen');
      });

      it('should parse multiple references in text', () => {
        const result = parser.parse('Vergleiche Joh 3,16 mit Röm 5,8');
        expect(result).toHaveLength(2);
        expect(result[0].bookId).toBe('Joh');
        expect(result[1].bookId).toBe('Rom');
      });
    });

    describe('Verse ranges', () => {
      it('should parse "Joh 3,16-18"', () => {
        const result = parser.parse('Joh 3,16-18');
        expect(result).toHaveLength(1);
        expect(result[0].bookId).toBe('Joh');
        expect(result[0].startChapter).toBe(3);
        expect(result[0].startVerse).toBe(16);
        expect(result[0].endVerse).toBe(18);
        expect(result[0].granularity).toBe('verse');
      });

      it('should parse "Ps 23,1-6"', () => {
        const result = parser.parse('Ps 23,1-6');
        expect(result).toHaveLength(1);
        expect(result[0].bookId).toBe('Psa');
        expect(result[0].startVerse).toBe(1);
        expect(result[0].endVerse).toBe(6);
      });
    });

    describe('Verse lists', () => {
      it('should parse "Joh 3,16.18" (list with dot)', () => {
        const result = parser.parse('Joh 3,16.18');
        expect(result).toHaveLength(1);
        expect(result[0]._verseList).toEqual([16, 18]);
      });

      it('should parse "Joh 3,16.18.20" (multiple verses)', () => {
        const result = parser.parse('Joh 3,16.18.20');
        expect(result).toHaveLength(1);
        expect(result[0]._verseList).toEqual([16, 18, 20]);
      });
    });

    describe('Mixed verse lists and ranges', () => {
      it('should parse "Joh 3,16-18.20"', () => {
        const result = parser.parse('Joh 3,16-18.20');
        expect(result).toHaveLength(1);
        expect(result[0]._verseList).toEqual([16, 17, 18, 20]);
      });

      it('should parse "Joh 3,1.5-7.10"', () => {
        const result = parser.parse('Joh 3,1.5-7.10');
        expect(result).toHaveLength(1);
        expect(result[0]._verseList).toEqual([1, 5, 6, 7, 10]);
      });
    });

    describe('Cross-chapter ranges', () => {
      it('should parse "Joh 3,35-4,3"', () => {
        const result = parser.parse('Joh 3,35-4,3');
        expect(result).toHaveLength(1);
        expect(result[0].bookId).toBe('Joh');
        expect(result[0].startChapter).toBe(3);
        expect(result[0].startVerse).toBe(35);
        expect(result[0].endChapter).toBe(4);
        expect(result[0].endVerse).toBe(3);
        expect(result[0].granularity).toBe('verse');
      });

      it('should parse "Mt 5,1-7,29" (cross-chapter range)', () => {
        const result = parser.parse('Mt 5,1-7,29');
        expect(result).toHaveLength(1);
        expect(result[0].startChapter).toBe(5);
        expect(result[0].endChapter).toBe(7);
      });
    });

    describe('Chapter references', () => {
      it('should parse "Joh 3" (whole chapter)', () => {
        const result = parser.parse('Lies Joh 3');
        expect(result).toHaveLength(1);
        expect(result[0].bookId).toBe('Joh');
        expect(result[0].startChapter).toBe(3);
        expect(result[0].granularity).toBe('chapter');
      });

      it('should parse "1 Kor 13" (chapter reference)', () => {
        const result = parser.parse('Siehe 1 Kor 13');
        expect(result).toHaveLength(1);
        expect(result[0].bookId).toBe('1Co');
        expect(result[0].startChapter).toBe(13);
        expect(result[0].granularity).toBe('chapter');
      });

      it('should parse "Joh 3-4" (chapter range)', () => {
        const result = parser.parse('Joh 3-4');
        expect(result).toHaveLength(1);
        expect(result[0].bookId).toBe('Joh');
        expect(result[0].startChapter).toBe(3);
        expect(result[0].endChapter).toBe(4);
        expect(result[0].granularity).toBe('chapter');
      });
    });

    describe('Book references (standalone)', () => {
      it('should parse "Kolosserbrief"', () => {
        const result = parser.parse('Text Kolosserbrief');
        expect(result).toHaveLength(1);
        expect(result[0].bookId).toBe('Col');
        expect(result[0].granularity).toBe('book');
      });

      it('should parse "Philemonbrief"', () => {
        const result = parser.parse('Siehe Philemonbrief');
        expect(result).toHaveLength(1);
        expect(result[0].bookId).toBe('Phm');
        expect(result[0].granularity).toBe('book');
      });
    });

    describe('Numbered books', () => {
      it('should parse various formats of 1. Mose', () => {
        const formats = ['1. Mose 1,1', '1.Mose 1,1', '1 Mose 1,1', '1Mose 1,1'];
        for (const format of formats) {
          const result = parser.parse(format);
          expect(result).toHaveLength(1);
          expect(result[0].bookId).toBe('Gen');
        }
      });

      it('should parse 1. Korinther', () => {
        const result = parser.parse('1. Korinther 13,4');
        expect(result).toHaveLength(1);
        expect(result[0].bookId).toBe('1Co');
      });

      it('should parse 2. Korinther', () => {
        const result = parser.parse('2. Korinther 5,17');
        expect(result).toHaveLength(1);
        expect(result[0].bookId).toBe('2Co');
      });

      it('should parse 1. Johannes', () => {
        const result = parser.parse('1. Johannes 4,8');
        expect(result).toHaveLength(1);
        expect(result[0].bookId).toBe('1Jo');
      });
    });
  });

  describe('English format parsing', () => {
    let parser: SmartBibleParser;

    beforeEach(() => {
      parser = new SmartBibleParser(createEnglishSettings());
    });

    describe('Single verse references', () => {
      it('should parse "John 3:16"', () => {
        const result = parser.parse('See John 3:16');
        expect(result).toHaveLength(1);
        expect(result[0].bookId).toBe('Joh');
        expect(result[0].startChapter).toBe(3);
        expect(result[0].startVerse).toBe(16);
      });

      it('should parse "Gen 1:1"', () => {
        const result = parser.parse('Gen 1:1');
        expect(result).toHaveLength(1);
        expect(result[0].bookId).toBe('Gen');
      });
    });

    describe('Verse lists (English comma)', () => {
      it('should parse "John 3:16,18" (list with comma)', () => {
        const result = parser.parse('John 3:16,18');
        expect(result).toHaveLength(1);
        expect(result[0]._verseList).toEqual([16, 18]);
      });
    });

    describe('Cross-chapter ranges', () => {
      it('should parse "John 3:35-4:3"', () => {
        const result = parser.parse('John 3:35-4:3');
        expect(result).toHaveLength(1);
        expect(result[0].startChapter).toBe(3);
        expect(result[0].endChapter).toBe(4);
      });
    });
  });

  describe('Content cleaning (ignored sections)', () => {
    let parser: SmartBibleParser;

    beforeEach(() => {
      parser = new SmartBibleParser(createGermanSettings());
    });

    it('should ignore inline code', () => {
      const result = parser.parse('Text `Joh 3,16` mehr Text');
      expect(result).toHaveLength(0);
    });

    it('should ignore code blocks', () => {
      const content = `
Einleitung
\`\`\`javascript
const ref = "Joh 3,16";
\`\`\`
Ende
      `;
      const result = parser.parse(content);
      expect(result).toHaveLength(0);
    });

    it('should ignore Obsidian internal links', () => {
      const result = parser.parse('Siehe [[Joh 3,16]] für mehr');
      expect(result).toHaveLength(0);
    });

    it('should ignore URLs', () => {
      const result = parser.parse('Link: https://bible.com/Joh/3/16');
      expect(result).toHaveLength(0);
    });

    it('should ignore frontmatter', () => {
      const content = `---
title: Joh 3,16 Analyse
tags: [test]
---
Hier ist der eigentliche Text.
      `;
      const result = parser.parse(content);
      expect(result).toHaveLength(0);
    });

    it('should parse references outside ignored sections', () => {
      const content = `
\`\`\`
ignored: Joh 3,16
\`\`\`
But Röm 5,8 is parsed
      `;
      const result = parser.parse(content);
      expect(result).toHaveLength(1);
      expect(result[0].bookId).toBe('Rom');
    });
  });

  describe('Parse order (specificity)', () => {
    let parser: SmartBibleParser;

    beforeEach(() => {
      parser = new SmartBibleParser(createGermanSettings());
    });

    it('should not double-match cross-chapter as verse', () => {
      // "Joh 3,16-4,3" should be ONE cross-chapter reference
      // NOT "Joh 3,16" and something else
      const result = parser.parse('Joh 3,16-4,3');
      expect(result).toHaveLength(1);
      expect(result[0].endChapter).toBe(4);
    });

    it('should prefer verse over chapter when verse separator present', () => {
      // "Joh 3,16" should be verse, not chapter
      const result = parser.parse('Joh 3,16');
      expect(result).toHaveLength(1);
      expect(result[0].granularity).toBe('verse');
    });

    it('should match chapter when no verse separator', () => {
      // "Joh 3" should be chapter
      const result = parser.parse('Joh 3');
      expect(result).toHaveLength(1);
      expect(result[0].granularity).toBe('chapter');
    });

    it('should not double-match overlapping patterns', () => {
      // In "Joh 3,16" the "Joh 3" part should not be matched separately
      const result = parser.parse('Joh 3,16');
      expect(result).toHaveLength(1);
    });
  });

  describe('Complex text scenarios', () => {
    let parser: SmartBibleParser;

    beforeEach(() => {
      parser = new SmartBibleParser(createGermanSettings());
    });

    it('should parse multiple references in paragraph', () => {
      const content = `
Siehe Joh 3,16-18 und
Röm 5,8 und 1. Johannes 4,8. Vergleiche Kolosserbrief
und Kol 1,15-20.
      `;
      const result = parser.parse(content);

      // Should find: Joh 3,16-18, Röm 5,8, 1. Johannes 4,8, Kolosserbrief, Kol 1,15-20
      expect(result.length).toBeGreaterThanOrEqual(4);

      const bookIds = result.map(r => r.bookId);
      expect(bookIds).toContain('Joh');
      expect(bookIds).toContain('Rom');
      expect(bookIds).toContain('1Jo');
      expect(bookIds).toContain('Col');
    });

    it('should handle edge case: back-to-back references', () => {
      const result = parser.parse('Joh 1,1 Gen 1,1');
      expect(result).toHaveLength(2);
    });

    it('should handle Psalms', () => {
      const result = parser.parse('Psalm 23,1 und Ps 91');
      expect(result).toHaveLength(2);
      expect(result.every(r => r.bookId === 'Psa')).toBe(true);
    });

    it('should handle Proverbs', () => {
      const result = parser.parse('Sprüche 3,5-6');
      expect(result).toHaveLength(1);
      expect(result[0].bookId).toBe('Pro');
    });
  });

  describe('Edge cases', () => {
    let parser: SmartBibleParser;

    beforeEach(() => {
      parser = new SmartBibleParser(createGermanSettings());
    });

    it('should handle empty content', () => {
      const result = parser.parse('');
      expect(result).toHaveLength(0);
    });

    it('should handle content with no references', () => {
      const result = parser.parse('Dies ist ein Text ohne Bibelreferenzen.');
      expect(result).toHaveLength(0);
    });

    it('should handle special characters in text', () => {
      const result = parser.parse('(Joh 3,16) [Röm 5,8]');
      expect(result).toHaveLength(2);
    });

    it('should handle references at start/end of text', () => {
      const result = parser.parse('Joh 3,16');
      expect(result).toHaveLength(1);

      const result2 = parser.parse('Text Joh 3,16');
      expect(result2).toHaveLength(1);

      const result3 = parser.parse('Joh 3,16 Text');
      expect(result3).toHaveLength(1);
    });

    it('should be case-insensitive for book names', () => {
      const results = [
        parser.parse('JOH 3,16'),
        parser.parse('joh 3,16'),
        parser.parse('Joh 3,16')
      ];

      for (const result of results) {
        expect(result).toHaveLength(1);
        expect(result[0].bookId).toBe('Joh');
      }
    });

    it('should preserve raw text in result', () => {
      const result = parser.parse('Johannes 3,16');
      expect(result[0].raw).toBe('Johannes 3,16');
    });
  });

  describe('updateSettings', () => {
    it('should update parser behavior after settings change', () => {
      const parser = new SmartBibleParser(createGermanSettings());

      // German format
      let result = parser.parse('Joh 3,16');
      expect(result).toHaveLength(1);
      expect(result[0].granularity).toBe('verse');

      // Switch to English
      parser.updateSettings(createEnglishSettings());

      // German format "Joh 3,16" will be parsed as chapter "Joh 3"
      // because "," is not a valid separator in English mode
      result = parser.parse('Joh 3,16');
      expect(result).toHaveLength(1);
      expect(result[0].granularity).toBe('chapter'); // Only chapter recognized
      expect(result[0].startChapter).toBe(3);

      // English format should work properly
      result = parser.parse('Joh 3:16');
      expect(result).toHaveLength(1);
      expect(result[0].granularity).toBe('verse');
    });
  });

  describe('parseCodeBlocks setting', () => {
    it('should parse code blocks when enabled', () => {
      const settings = createGermanSettings();
      settings.parseCodeBlocks = true;
      const parser = new SmartBibleParser(settings);

      const content = 'Text `Joh 3,16` mehr';
      const result = parser.parse(content);
      expect(result).toHaveLength(1);
    });

    it('should ignore code blocks when disabled (default)', () => {
      const settings = createGermanSettings();
      settings.parseCodeBlocks = false;
      const parser = new SmartBibleParser(settings);

      const content = 'Text `Joh 3,16` mehr';
      const result = parser.parse(content);
      expect(result).toHaveLength(0);
    });
  });

  describe('Test scenarios from README', () => {
    let parser: SmartBibleParser;

    beforeEach(() => {
      parser = new SmartBibleParser(createGermanSettings());
    });

    // From README Section 9.6: STELLE SICHER, DASS DIESE FÄLLE FUNKTIONIEREN
    it('✓ "Joh 3,16" → bible/Joh/3/16', () => {
      const result = parser.parse('Joh 3,16');
      expect(result[0].bookId).toBe('Joh');
      expect(result[0].startChapter).toBe(3);
      expect(result[0].startVerse).toBe(16);
    });

    it('✓ "John 3:16" with colon (English)', () => {
      // This uses English settings with colon separator
      const englishParser = new SmartBibleParser(createEnglishSettings());
      const result = englishParser.parse('John 3:16');
      expect(result).toHaveLength(1);
      expect(result[0].bookId).toBe('Joh');
      expect(result[0].startChapter).toBe(3);
      expect(result[0].startVerse).toBe(16);
    });

    it('✓ "Joh 3,16-18" → bible/Joh/3/16, .../17, .../18', () => {
      const result = parser.parse('Joh 3,16-18');
      expect(result[0].startVerse).toBe(16);
      expect(result[0].endVerse).toBe(18);
    });

    it('✓ "Joh 3,16.18.20" → bible/Joh/3/16, .../18, .../20', () => {
      const result = parser.parse('Joh 3,16.18.20');
      expect(result[0]._verseList).toEqual([16, 18, 20]);
    });

    it('✓ "Joh 3,16-4,3" → alle Verse von 3:16 bis 4:3', () => {
      const result = parser.parse('Joh 3,16-4,3');
      expect(result[0].startChapter).toBe(3);
      expect(result[0].startVerse).toBe(16);
      expect(result[0].endChapter).toBe(4);
      expect(result[0].endVerse).toBe(3);
    });

    it('✓ "Joh 3" → alle Verse in Kapitel 3', () => {
      const result = parser.parse('Joh 3');
      expect(result[0].granularity).toBe('chapter');
      expect(result[0].startChapter).toBe(3);
    });

    it('✓ "Joh 3-4" → alle Verse in Kapitel 3 und 4', () => {
      const result = parser.parse('Joh 3-4');
      expect(result[0].granularity).toBe('chapter');
      expect(result[0].startChapter).toBe(3);
      expect(result[0].endChapter).toBe(4);
    });

    it('✓ "Kolosserbrief" → bible/Col (Buch-Level)', () => {
      const result = parser.parse('Kolosserbrief');
      expect(result[0].bookId).toBe('Col');
      expect(result[0].granularity).toBe('book');
    });

    it('✓ "1. Mose 3,15" → bible/Gen/3/15', () => {
      const result = parser.parse('1. Mose 3,15');
      expect(result[0].bookId).toBe('Gen');
      expect(result[0].startChapter).toBe(3);
      expect(result[0].startVerse).toBe(15);
    });

    it('✓ "1Mose 3,15" → bible/Gen/3/15', () => {
      const result = parser.parse('1Mose 3,15');
      expect(result[0].bookId).toBe('Gen');
    });

    it('✓ "1 Kor 13" → bible/1Co/13 (Kapitel-Level)', () => {
      const result = parser.parse('1 Kor 13');
      expect(result[0].bookId).toBe('1Co');
      expect(result[0].startChapter).toBe(13);
      expect(result[0].granularity).toBe('chapter');
    });

    // IGNORE tests
    it('✗ `Joh 3,16` (in Code) → nichts', () => {
      const result = parser.parse('Text `Joh 3,16` mehr');
      expect(result).toHaveLength(0);
    });

    it('✗ ```Joh 3,16``` (in Codeblock) → nichts', () => {
      const content = '```\nJoh 3,16\n```';
      const result = parser.parse(content);
      expect(result).toHaveLength(0);
    });

    it('✗ [[Joh 3,16]] (Obsidian Link) → nichts', () => {
      const result = parser.parse('[[Joh 3,16]]');
      expect(result).toHaveLength(0);
    });
  });
});
