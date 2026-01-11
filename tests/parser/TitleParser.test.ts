import { describe, it, expect, beforeEach } from 'vitest';
import { TitleParser } from '../../src/parser/TitleParser';
import type { BibleRefSettings } from '../../src/types';

describe('TitleParser', () => {
  let parser: TitleParser;
  let settings: BibleRefSettings;

  beforeEach(() => {
    settings = {
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

    parser = new TitleParser(settings);
  });

  describe('Verse References', () => {
    it('should parse simple verse reference', () => {
      const result = parser.parse('Joh 3,16.md');

      expect(result).toHaveLength(1);
      expect(result[0].bookId).toBe('Joh');
      expect(result[0].granularity).toBe('verse');
      expect(result[0].startChapter).toBe(3);
      expect(result[0].startVerse).toBe(16);
    });

    it('should parse verse reference with full book name', () => {
      const result = parser.parse('Johannes 3,16.md');

      expect(result).toHaveLength(1);
      expect(result[0].bookId).toBe('Joh');
      expect(result[0].startChapter).toBe(3);
      expect(result[0].startVerse).toBe(16);
    });

    it('should parse verse reference with additional text', () => {
      const result = parser.parse('Joh 3,16 Notizen.md');

      expect(result).toHaveLength(1);
      expect(result[0].bookId).toBe('Joh');
      expect(result[0].startChapter).toBe(3);
      expect(result[0].startVerse).toBe(16);
    });

    it('should parse verse reference without .md extension', () => {
      const result = parser.parse('Joh 3,16');

      expect(result).toHaveLength(1);
      expect(result[0].bookId).toBe('Joh');
      expect(result[0].startChapter).toBe(3);
      expect(result[0].startVerse).toBe(16);
    });

    it('should parse verse range', () => {
      const result = parser.parse('Joh 3,16-18.md');

      expect(result).toHaveLength(1);
      expect(result[0].bookId).toBe('Joh');
      expect(result[0].startChapter).toBe(3);
      expect(result[0].startVerse).toBe(16);
      expect(result[0].endVerse).toBe(18);
    });

    it('should parse verse list', () => {
      const result = parser.parse('Joh 3,16.18.20.md');

      expect(result).toHaveLength(1);
      expect(result[0].bookId).toBe('Joh');
      expect(result[0].startChapter).toBe(3);
      expect(result[0].startVerse).toBe(16);
      expect(result[0]._verseList).toEqual([16, 18, 20]);
    });

    it('should parse numbered book verse reference', () => {
      const result = parser.parse('1. Mose 3,15.md');

      expect(result).toHaveLength(1);
      expect(result[0].bookId).toBe('Gen'); // German mapping uses 'Gen'
      expect(result[0].startChapter).toBe(3);
      expect(result[0].startVerse).toBe(15);
    });

    it('should parse 1 Kor format', () => {
      const result = parser.parse('1 Kor 13,13.md');

      expect(result).toHaveLength(1);
      expect(result[0].bookId).toBe('1Co'); // German mapping uses '1Kor'
      expect(result[0].startChapter).toBe(13);
      expect(result[0].startVerse).toBe(13);
    });
  });

  describe('Chapter References', () => {
    it('should parse simple chapter reference', () => {
      const result = parser.parse('Joh 3.md');

      expect(result).toHaveLength(1);
      expect(result[0].bookId).toBe('Joh');
      expect(result[0].granularity).toBe('chapter');
      expect(result[0].startChapter).toBe(3);
      expect(result[0].startVerse).toBeUndefined();
    });

    it('should parse chapter reference with additional text', () => {
      const result = parser.parse('Johannes 3 Zusammenfassung.md');

      expect(result).toHaveLength(1);
      expect(result[0].bookId).toBe('Joh');
      expect(result[0].granularity).toBe('chapter');
      expect(result[0].startChapter).toBe(3);
    });

    it('should parse numbered book chapter reference', () => {
      const result = parser.parse('1. Mose 3.md');

      expect(result).toHaveLength(1);
      expect(result[0].bookId).toBe('Gen'); // German mapping uses 'Gen'
      expect(result[0].granularity).toBe('chapter');
      expect(result[0].startChapter).toBe(3);
    });
  });

  describe('Book References', () => {
    it('should parse standalone book name', () => {
      const result = parser.parse('Kolosserbrief.md');

      expect(result).toHaveLength(1);
      expect(result[0].bookId).toBe('Col'); // German mapping uses 'Kol'
      expect(result[0].granularity).toBe('book');
    });

    it('should parse standalone book with additional text', () => {
      const result = parser.parse('Kolosser Zusammenfassung.md');

      expect(result).toHaveLength(1);
      expect(result[0].bookId).toBe('Col'); // German mapping uses 'Kol'
      expect(result[0].granularity).toBe('book');
    });

    it('should parse Genesis', () => {
      const result = parser.parse('Genesis Überblick.md');

      expect(result).toHaveLength(1);
      expect(result[0].bookId).toBe('Gen'); // German mapping uses 'Gen'
      expect(result[0].granularity).toBe('book');
    });

    it('should parse standalone pattern 1. Mose', () => {
      const result = parser.parse('1. Mose Notizen.md');

      expect(result).toHaveLength(1);
      expect(result[0].bookId).toBe('Gen'); // German mapping uses 'Gen'
      expect(result[0].granularity).toBe('book');
    });
  });

  describe('English Format Support', () => {
    beforeEach(() => {
      settings.language = 'en';
      settings.separators.chapterVerse = ':';
      settings.separators.list = ',';
      parser = new TitleParser(settings);
    });

    it('should parse English verse format', () => {
      const result = parser.parse('John 3:16.md');

      expect(result).toHaveLength(1);
      expect(result[0].bookId).toBe('Joh');
      expect(result[0].startChapter).toBe(3);
      expect(result[0].startVerse).toBe(16);
    });

    it('should parse English verse range', () => {
      const result = parser.parse('John 3:16-18.md');

      expect(result).toHaveLength(1);
      expect(result[0].startVerse).toBe(16);
      expect(result[0].endVerse).toBe(18);
    });

    it('should parse English verse list', () => {
      const result = parser.parse('John 3:16,18,20.md');

      expect(result).toHaveLength(1);
      expect(result[0]._verseList).toEqual([16, 18, 20]);
    });
  });

  describe('Edge Cases', () => {
    it('should return empty array for non-Bible file names', () => {
      const result = parser.parse('Meine Notizen.md');
      expect(result).toHaveLength(0);
    });

    it('should return empty array for empty string', () => {
      const result = parser.parse('');
      expect(result).toHaveLength(0);
    });

    it('should handle file name with no extension', () => {
      const result = parser.parse('Joh 3,16');

      expect(result).toHaveLength(1);
      expect(result[0].bookId).toBe('Joh');
    });

    it('should prioritize verse over chapter reference', () => {
      // If a file has both chapter and verse info, verse should win
      const result = parser.parse('Joh 3,16.md');

      expect(result).toHaveLength(1);
      expect(result[0].granularity).toBe('verse');
    });

    it('should prioritize chapter over book reference', () => {
      // If a file has both book name and chapter, chapter should win
      const result = parser.parse('Kolosser 3.md');

      expect(result).toHaveLength(1);
      expect(result[0].granularity).toBe('chapter');
    });

    it('should handle file with prefix text', () => {
      const result = parser.parse('Notizen zu Joh 3,16.md');

      expect(result).toHaveLength(1);
      expect(result[0].bookId).toBe('Joh');
      expect(result[0].startChapter).toBe(3);
      expect(result[0].startVerse).toBe(16);
    });

    it('should handle file with suffix text', () => {
      const result = parser.parse('Joh 3,16 Deep Dive.md');

      expect(result).toHaveLength(1);
      expect(result[0].bookId).toBe('Joh');
      expect(result[0].startChapter).toBe(3);
      expect(result[0].startVerse).toBe(16);
    });
  });

  describe('Settings Update', () => {
    it('should update patterns when settings change', () => {
      // Start with German format
      let result = parser.parse('Joh 3,16.md');
      expect(result).toHaveLength(1);

      // Switch to English format
      const newSettings: BibleRefSettings = {
        ...settings,
        language: 'en',
        separators: {
          chapterVerse: ':',
          list: ',',
          range: '-'
        }
      };

      parser.updateSettings(newSettings);

      // Should now parse English format
      result = parser.parse('John 3:16.md');
      expect(result).toHaveLength(1);
      expect(result[0].bookId).toBe('Joh');
    });
  });
});
