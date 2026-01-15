import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { BibleRefSettings } from '../../src/types';
import { SmartBibleParser } from '../../src/parser/SmartBibleParser';
import { TitleParser } from '../../src/parser/TitleParser';
import { TagGenerator } from '../../src/sync/TagGenerator';
import { FrontmatterSync } from '../../src/sync/FrontmatterSync';

/**
 * Integration Tests for Full Sync Flow
 *
 * These tests verify the complete pipeline:
 * User Content → Parser → TagGenerator → FrontmatterSync
 */

describe('Integration: Full Sync Flow', () => {
  let settings: BibleRefSettings;
  let parser: SmartBibleParser;
  let titleParser: TitleParser;
  let tagGenerator: TagGenerator;
  let frontmatterSync: FrontmatterSync;
  let mockApp: any;
  let mockFile: any;
  let mockCache: any;

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

    parser = new SmartBibleParser(settings);
    titleParser = new TitleParser(settings);
    tagGenerator = new TagGenerator(settings);

    // Mock Obsidian API
    mockCache = { frontmatter: {} };
    mockFile = {
      path: 'test.md',
      basename: 'test',
      extension: 'md'
    };
    mockApp = {
      metadataCache: {
        getFileCache: vi.fn().mockReturnValue(mockCache)
      },
      fileManager: {
        processFrontMatter: vi.fn().mockImplementation(async (file, fn) => {
          fn(mockCache.frontmatter);
        })
      }
    };

    frontmatterSync = new FrontmatterSync(mockApp, settings);
  });

  /**
   * Helper function to simulate full sync flow
   */
  async function fullSyncPipeline(content: string, fileName: string = 'test.md'): Promise<string[]> {
    // Update mock file
    mockFile.basename = fileName.replace('.md', '');

    // Step 1: Parse content
    const contentRefs = parser.parse(content);

    // Step 2: Parse title (if enabled)
    const titleRefs = settings.parseTitles ? titleParser.parse(fileName) : [];

    // Step 3: Combine references
    const allRefs = [...titleRefs, ...contentRefs];

    // Step 4: Generate tags
    const tags = tagGenerator.generateTags(allRefs);

    // Step 5: Sync to frontmatter
    await frontmatterSync.sync(mockFile, tags);

    return tags;
  }

  describe('Single Verse Reference', () => {
    it('should parse, generate, and sync single verse', async () => {
      const content = 'Heute habe ich über Joh 3,16 nachgedacht.';
      const tags = await fullSyncPipeline(content);

      expect(tags).toEqual(['bible/Joh/3/16']);
      expect(mockCache.frontmatter['bible-refs']).toEqual(['bible/Joh/3/16']);
    });

    it('should handle English format', async () => {
      settings.language = 'en';
      settings.separators.chapterVerse = ':';
      parser.updateSettings(settings);
      titleParser.updateSettings(settings);
      tagGenerator.updateSettings(settings);

      const content = 'I was reading John 3:16 today.';
      const tags = await fullSyncPipeline(content);

      // Now works correctly with English displayId
      expect(tags).toEqual(['bible/John/3/16']);
    });
  });

  describe('Verse Ranges', () => {
    it('should expand verse range to individual tags', async () => {
      const content = 'Joh 3,16-18 ist wichtig';
      const tags = await fullSyncPipeline(content);

      expect(tags).toEqual([
        'bible/Joh/3/16',
        'bible/Joh/3/17',
        'bible/Joh/3/18'
      ]);
    });

    it('should expand cross-chapter range', async () => {
      const content = 'Joh 3,35-4,3 zeigt...';
      const tags = await fullSyncPipeline(content);

      expect(tags).toHaveLength(5);
      expect(tags).toContain('bible/Joh/3/35');
      expect(tags).toContain('bible/Joh/3/36');
      expect(tags).toContain('bible/Joh/4/1');
      expect(tags).toContain('bible/Joh/4/2');
      expect(tags).toContain('bible/Joh/4/3');
    });
  });

  describe('Multiple References', () => {
    it('should handle multiple references in content', async () => {
      // Use German book names/aliases in German mode
      const content = 'Joh 3,16 und 1Mo 1,1 sind zentrale Verse.';

      // Debug: Check what gets parsed
      const contentRefs = parser.parse(content);
      console.log('Parsed references:', JSON.stringify(contentRefs, null, 2));

      const tags = await fullSyncPipeline(content);
      console.log('Generated tags:', tags);

      expect(tags).toHaveLength(2);
      expect(tags).toContain('bible/Joh/3/16');
      expect(tags).toContain('bible/1Mo/1/1');  // German displayId
    });

    it('should combine title and content references', async () => {
      // Use German book name in content
      const content = 'Dieser Vers verbindet sich mit 1Mo 1,1';
      const tags = await fullSyncPipeline(content, 'Joh 3,16.md');

      expect(tags).toHaveLength(2);
      expect(tags).toContain('bible/Joh/3/16'); // from title
      expect(tags).toContain('bible/1Mo/1/1');  // German displayId from content
    });

    it('should remove duplicates between title and content', async () => {
      const content = 'Joh 3,16 ist wichtig';
      const tags = await fullSyncPipeline(content, 'Joh 3,16.md');

      expect(tags).toEqual(['bible/Joh/3/16']); // No duplicate
    });
  });

  describe('Chapter and Book References', () => {
    it('should expand chapter reference to all verses', async () => {
      // Chapter references expand to all verses in that chapter
      const content = 'Kolosser 3 ist wichtig';
      const tags = await fullSyncPipeline(content);

      // Colossians 3 has 25 verses
      expect(tags).toHaveLength(25);
      expect(tags).toContain('bible/Kol/3/1');   // First verse
      expect(tags).toContain('bible/Kol/3/25');  // Last verse
    });

    it('should handle book-only reference', async () => {
      const content = 'Der Kolosserbrief ist interessant';
      const tags = await fullSyncPipeline(content);

      expect(tags).toEqual(['bible/Kol']);  // German ID (book-level doesn't need expansion)
    });
  });

  describe('Complex Content', () => {
    it('should handle mixed reference types', async () => {
      const content = `
        Der Kolosserbrief beginnt mit einer Danksagung.
        Besonders Kol 3,16 ist zentral.
        Dies verbindet sich mit Joh 3,16-18.
      `;

      const tags = await fullSyncPipeline(content);

      // Note: German canonicalIds don't match bibleStructure keys
      // 'Kol/3/16' cannot be expanded (Kol not in BIBLE_STRUCTURE)
      // 'Joh/3/16-18' CAN be expanded (Joh IS in BIBLE_STRUCTURE)
      expect(tags).toContain('bible/Kol');        // book reference (no expansion needed)
      expect(tags).toContain('bible/Joh/3/16');   // verse range (Joh IS in structure)
      expect(tags).toContain('bible/Joh/3/17');
      expect(tags).toContain('bible/Joh/3/18');
    });

    it('should ignore references in code blocks', async () => {
      const content = `
        Joh 3,16 ist wichtig.
        \`Joh 3,17\` sollte ignoriert werden.
        \`\`\`
        Joh 3,18 auch ignoriert
        \`\`\`
      `;

      const tags = await fullSyncPipeline(content);

      expect(tags).toEqual(['bible/Joh/3/16']);
      expect(tags).not.toContain('bible/Joh/3/17');
      expect(tags).not.toContain('bible/Joh/3/18');
    });

    it('should handle numbered books', async () => {
      const content = '1. Mose 3,15 und 1 Kor 13,13 sind wichtig';

      // Debug: Check what gets parsed
      const contentRefs = parser.parse(content);
      console.log('Numbered books parsed:', JSON.stringify(contentRefs, null, 2));

      const tags = await fullSyncPipeline(content);
      console.log('Numbered books tags:', tags);

      // German displayIds: 1Mo for Genesis, 1Kor for 1 Corinthians
      expect(tags).toHaveLength(2);
      expect(tags).toContain('bible/1Mo/3/15');   // German displayId
      expect(tags).toContain('bible/1Kor/13/13'); // German displayId
    });
  });

  describe('Update Detection', () => {
    it('should detect when tags change', async () => {
      // Initial sync
      mockCache.frontmatter = { 'bible-refs': ['bible/Joh/3/16'] };

      // Use German book name
      const content = '1Mo 1,1 ist wichtig';
      const tags = await fullSyncPipeline(content);

      expect(tags).toEqual(['bible/1Mo/1/1']);  // German displayId
      expect(mockCache.frontmatter['bible-refs']).toEqual(['bible/1Mo/1/1']);
    });

    it('should not update when tags are unchanged', async () => {
      mockCache.frontmatter = { 'bible-refs': ['bible/Joh/3/16'] };

      const content = 'Joh 3,16 ist wichtig';
      const result = await frontmatterSync.sync(mockFile, ['bible/Joh/3/16']);

      expect(result).toBe(false); // No change
    });

    it('should clear tags when content has no references', async () => {
      mockCache.frontmatter = { 'bible-refs': ['bible/Joh/3/16'] };

      const content = 'Keine Bibelreferenzen hier.';
      const tags = await fullSyncPipeline(content);

      expect(tags).toEqual([]);
      expect(mockCache.frontmatter['bible-refs']).toBeUndefined();
    });
  });

  describe('Custom Settings', () => {
    it('should use custom tag prefix', async () => {
      settings.tagPrefix = 'scripture/';
      tagGenerator.updateSettings(settings);

      const content = 'Joh 3,16 ist wichtig';
      const tags = await fullSyncPipeline(content);

      expect(tags).toEqual(['scripture/Joh/3/16']);
    });

    it('should use custom frontmatter key', async () => {
      settings.frontmatterKey = 'verse-tags';
      frontmatterSync.updateSettings(settings);

      const content = 'Joh 3,16 ist wichtig';
      await fullSyncPipeline(content);

      expect(mockCache.frontmatter['verse-tags']).toBeDefined();
      expect(mockCache.frontmatter['bible-refs']).toBeUndefined();
    });

    it('should disable title parsing when configured', async () => {
      settings.parseTitles = false;

      // Use German book name
      const content = '1Mo 1,1 ist wichtig';
      const tags = await fullSyncPipeline(content, 'Joh 3,16.md');

      // Should only have content reference, not title reference
      expect(tags).toEqual(['bible/1Mo/1/1']);  // German displayId
      expect(tags).not.toContain('bible/Joh/3/16');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty content', async () => {
      const tags = await fullSyncPipeline('');
      expect(tags).toEqual([]);
    });

    it('should handle content with only whitespace', async () => {
      const tags = await fullSyncPipeline('   \n\n   ');
      expect(tags).toEqual([]);
    });

    it('should handle very long verse ranges', async () => {
      // Philemon has only 1 chapter with 25 verses
      const content = 'Philemon 1';
      const tags = await fullSyncPipeline(content);

      // Should expand to all 25 verses in Philemon chapter 1
      expect(tags).toHaveLength(25);
      expect(tags).toContain('bible/Phlm/1/1');
      expect(tags).toContain('bible/Phlm/1/25');
    });

    it('should handle overlapping references', async () => {
      const content = 'Joh 3,16-18 und Joh 3,17-19';
      const tags = await fullSyncPipeline(content);

      // Should deduplicate: 16, 17, 18, 19
      expect(tags).toEqual([
        'bible/Joh/3/16',
        'bible/Joh/3/17',
        'bible/Joh/3/18',
        'bible/Joh/3/19'
      ]);
    });
  });
});
