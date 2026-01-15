import { describe, it, expect, beforeEach } from 'vitest';
import { TagGenerator, parseTag, compareTagsBySpecificity, groupTagsByBook } from '../../src/sync/TagGenerator';
import type { BibleRefSettings, ParsedReference } from '../../src/types';

describe('TagGenerator', () => {
  let generator: TagGenerator;
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

    generator = new TagGenerator(settings);
  });

  describe('Book References', () => {
    it('should generate book-level tag', () => {
      const refs: ParsedReference[] = [
        {
          raw: 'Kolosserbrief',
          bookId: 'Kol',
          granularity: 'book'
        }
      ];

      const tags = generator.generateTags(refs);

      expect(tags).toContain('bible/Kol');
    });

    it('should generate book tag for multiple books', () => {
      const refs: ParsedReference[] = [
        { raw: 'Kolosserbrief', bookId: 'Kol', granularity: 'book' },
        { raw: 'Genesis', bookId: 'Gen', granularity: 'book' }
      ];

      const tags = generator.generateTags(refs);

      expect(tags).toContain('bible/Kol');
      expect(tags).toContain('bible/1Mo');
      expect(tags).toHaveLength(2);
    });
  });

  describe('Chapter References', () => {
    it('should expand single chapter to all verses', () => {
      const refs: ParsedReference[] = [
        {
          raw: 'Phm 1',
          bookId: 'Phm',
          granularity: 'chapter',
          startChapter: 1
        }
      ];

      const tags = generator.generateTags(refs);

      // Philemon 1 has 25 verses
      expect(tags).toHaveLength(25);
      expect(tags[0]).toBe('bible/Phlm/1/1');
      expect(tags[24]).toBe('bible/Phlm/1/25');
    });

    it('should expand chapter range', () => {
      const refs: ParsedReference[] = [
        {
          raw: 'Jud 1',
          bookId: 'Jud',
          granularity: 'chapter',
          startChapter: 1
        }
      ];

      const tags = generator.generateTags(refs);

      // Jude has 1 chapter with 25 verses
      expect(tags).toHaveLength(25);
      expect(tags).toContain('bible/Jud/1/1');
      expect(tags).toContain('bible/Jud/1/25');
    });
  });

  describe('Verse References', () => {
    it('should generate single verse tag', () => {
      const refs: ParsedReference[] = [
        {
          raw: 'Joh 3,16',
          bookId: 'Joh',
          granularity: 'verse',
          startChapter: 3,
          startVerse: 16
        }
      ];

      const tags = generator.generateTags(refs);

      expect(tags).toEqual(['bible/Joh/3/16']);
    });

    it('should expand verse range to individual tags (Atomic Tagging)', () => {
      const refs: ParsedReference[] = [
        {
          raw: 'Joh 3,16-18',
          bookId: 'Joh',
          granularity: 'verse',
          startChapter: 3,
          startVerse: 16,
          endVerse: 18
        }
      ];

      const tags = generator.generateTags(refs);

      expect(tags).toEqual([
        'bible/Joh/3/16',
        'bible/Joh/3/17',
        'bible/Joh/3/18'
      ]);
    });

    it('should expand verse list to individual tags', () => {
      const refs: ParsedReference[] = [
        {
          raw: 'Joh 3,16.18.20',
          bookId: 'Joh',
          granularity: 'verse',
          startChapter: 3,
          startVerse: 16,
          endVerse: 20,
          _verseList: [16, 18, 20]
        }
      ];

      const tags = generator.generateTags(refs);

      expect(tags).toEqual([
        'bible/Joh/3/16',
        'bible/Joh/3/18',
        'bible/Joh/3/20'
      ]);
    });

    it('should expand cross-chapter range', () => {
      const refs: ParsedReference[] = [
        {
          raw: 'Joh 3,35-4,3',
          bookId: 'Joh',
          granularity: 'verse',
          startChapter: 3,
          startVerse: 35,
          endChapter: 4,
          endVerse: 3
        }
      ];

      const tags = generator.generateTags(refs);

      // Joh 3 has 36 verses: 35, 36
      // Joh 4: 1, 2, 3
      expect(tags).toHaveLength(5);
      expect(tags).toContain('bible/Joh/3/35');
      expect(tags).toContain('bible/Joh/3/36');
      expect(tags).toContain('bible/Joh/4/1');
      expect(tags).toContain('bible/Joh/4/2');
      expect(tags).toContain('bible/Joh/4/3');
    });
  });

  describe('Multiple References', () => {
    it('should generate tags for multiple references', () => {
      const refs: ParsedReference[] = [
        {
          raw: 'Joh 3,16',
          bookId: 'Joh',
          granularity: 'verse',
          startChapter: 3,
          startVerse: 16
        },
        {
          raw: 'Gen 1,1',
          bookId: 'Gen',
          granularity: 'verse',
          startChapter: 1,
          startVerse: 1
        }
      ];

      const tags = generator.generateTags(refs);

      expect(tags).toHaveLength(2);
      expect(tags).toContain('bible/1Mo/1/1');
      expect(tags).toContain('bible/Joh/3/16');
    });

    it('should remove duplicate tags', () => {
      const refs: ParsedReference[] = [
        {
          raw: 'Joh 3,16',
          bookId: 'Joh',
          granularity: 'verse',
          startChapter: 3,
          startVerse: 16
        },
        {
          raw: 'Joh 3,16',
          bookId: 'Joh',
          granularity: 'verse',
          startChapter: 3,
          startVerse: 16
        }
      ];

      const tags = generator.generateTags(refs);

      expect(tags).toEqual(['bible/Joh/3/16']);
    });

    it('should handle overlapping ranges', () => {
      const refs: ParsedReference[] = [
        {
          raw: 'Joh 3,16-18',
          bookId: 'Joh',
          granularity: 'verse',
          startChapter: 3,
          startVerse: 16,
          endVerse: 18
        },
        {
          raw: 'Joh 3,17-19',
          bookId: 'Joh',
          granularity: 'verse',
          startChapter: 3,
          startVerse: 17,
          endVerse: 19
        }
      ];

      const tags = generator.generateTags(refs);

      // Should have unique tags: 16, 17, 18, 19
      expect(tags).toEqual([
        'bible/Joh/3/16',
        'bible/Joh/3/17',
        'bible/Joh/3/18',
        'bible/Joh/3/19'
      ]);
    });
  });

  describe('Custom Tag Prefix', () => {
    it('should use custom tag prefix', () => {
      settings.tagPrefix = 'scripture/';
      generator = new TagGenerator(settings);

      const refs: ParsedReference[] = [
        {
          raw: 'Joh 3,16',
          bookId: 'Joh',
          granularity: 'verse',
          startChapter: 3,
          startVerse: 16
        }
      ];

      const tags = generator.generateTags(refs);

      expect(tags).toEqual(['scripture/Joh/3/16']);
    });
  });

  describe('Tag Sorting', () => {
    it('should return sorted tags', () => {
      const refs: ParsedReference[] = [
        {
          raw: 'Joh 3,18',
          bookId: 'Joh',
          granularity: 'verse',
          startChapter: 3,
          startVerse: 18
        },
        {
          raw: 'Gen 1,1',
          bookId: 'Gen',
          granularity: 'verse',
          startChapter: 1,
          startVerse: 1
        },
        {
          raw: 'Joh 3,16',
          bookId: 'Joh',
          granularity: 'verse',
          startChapter: 3,
          startVerse: 16
        }
      ];

      const tags = generator.generateTags(refs);

      // Should be sorted alphabetically
      expect(tags).toEqual([
        'bible/1Mo/1/1',
        'bible/Joh/3/16',
        'bible/Joh/3/18'
      ]);
    });
  });
});

describe('parseTag', () => {
  it('should parse verse-level tag', () => {
    const result = parseTag('bible/Joh/3/16');

    expect(result).toEqual({
      bookId: 'Joh',
      chapter: 3,
      verse: 16,
      granularity: 'verse'
    });
  });

  it('should parse chapter-level tag', () => {
    const result = parseTag('bible/Joh/3');

    expect(result).toEqual({
      bookId: 'Joh',
      chapter: 3,
      granularity: 'chapter'
    });
  });

  it('should parse book-level tag', () => {
    const result = parseTag('bible/Kol');

    expect(result).toEqual({
      bookId: 'Kol',
      granularity: 'book'
    });
  });

  it('should return null for invalid tag', () => {
    expect(parseTag('invalid')).toBeNull();
    expect(parseTag('bible/')).toBeNull();
    expect(parseTag('bible')).toBeNull();
  });
});

describe('compareTagsBySpecificity', () => {
  it('should sort verse tags before chapter tags', () => {
    const tags = ['bible/Joh/3', 'bible/Joh/3/16'];
    tags.sort(compareTagsBySpecificity);

    expect(tags).toEqual(['bible/Joh/3/16', 'bible/Joh/3']);
  });

  it('should sort verse tags before book tags', () => {
    const tags = ['bible/Kol', 'bible/Col/3/16'];
    tags.sort(compareTagsBySpecificity);

    expect(tags).toEqual(['bible/Col/3/16', 'bible/Kol']);
  });

  it('should sort alphabetically within same specificity', () => {
    const tags = ['bible/Joh/3/18', 'bible/1Mo/1/1', 'bible/Joh/3/16'];
    tags.sort(compareTagsBySpecificity);

    expect(tags).toEqual([
      'bible/1Mo/1/1',
      'bible/Joh/3/16',
      'bible/Joh/3/18'
    ]);
  });
});

describe('groupTagsByBook', () => {
  it('should group tags by book', () => {
    const tags = [
      'bible/Joh/3/16',
      'bible/1Mo/1/1',
      'bible/Joh/3/17',
      'bible/Col/3/16'
    ];

    const grouped = groupTagsByBook(tags);

    expect(grouped.size).toBe(3);
    expect(grouped.get('Joh')).toEqual(['bible/Joh/3/16', 'bible/Joh/3/17']);
    expect(grouped.get('1Mo')).toEqual(['bible/1Mo/1/1']);
    expect(grouped.get('Col')).toEqual(['bible/Col/3/16']);
  });

  it('should handle empty array', () => {
    const grouped = groupTagsByBook([]);
    expect(grouped.size).toBe(0);
  });
});
