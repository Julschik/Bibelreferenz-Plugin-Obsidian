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

      expect(tags).toEqual(['bible/Joh/3/16']);
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
      const content = 'Joh 3,16 und Gen 1,1 sind zentrale Verse.';
      const tags = await fullSyncPipeline(content);

      expect(tags).toHaveLength(2);
      expect(tags).toContain('bible/Joh/3/16');
      expect(tags).toContain('bible/Gen/1/1');
    });

    it('should combine title and content references', async () => {
      const content = 'Dieser Vers verbindet sich mit Gen 1,1';
      const tags = await fullSyncPipeline(content, 'Joh 3,16.md');

      expect(tags).toHaveLength(2);
      expect(tags).toContain('bible/Joh/3/16'); // from title
      expect(tags).toContain('bible/Gen/1/1');   // from content
    });

    it('should remove duplicates between title and content', async () => {
      const content = 'Joh 3,16 ist wichtig';
      const tags = await fullSyncPipeline(content, 'Joh 3,16.md');

      expect(tags).toEqual(['bible/Joh/3/16']); // No duplicate
    });
  });

  describe('Chapter and Book References', () => {
    it('should expand chapter reference to all verses', async () => {
      const content = 'Kolosser 3 ist wichtig';
      const tags = await fullSyncPipeline(content);

      expect(tags.length).toBeGreaterThan(20); // Col 3 has 25 verses
      expect(tags).toContain('bible/Col/3/1');
      expect(tags).toContain('bible/Col/3/25');
    });

    it('should handle book-only reference', async () => {
      const content = 'Der Kolosserbrief ist interessant';
      const tags = await fullSyncPipeline(content);

      expect(tags).toEqual(['bible/Col']);
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

      expect(tags).toContain('bible/Col');        // book reference
      expect(tags).toContain('bible/Col/3/16');   // verse reference
      expect(tags).toContain('bible/Joh/3/16');   // verse range
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
      const tags = await fullSyncPipeline(content);

      expect(tags).toHaveLength(2);
      expect(tags).toContain('bible/Gen/3/15');
      expect(tags).toContain('bible/1Co/13/13');
    });
  });

  describe('Update Detection', () => {
    it('should detect when tags change', async () => {
      // Initial sync
      mockCache.frontmatter = { 'bible-refs': ['bible/Joh/3/16'] };

      const content = 'Gen 1,1 ist wichtig';
      const tags = await fullSyncPipeline(content);

      expect(tags).toEqual(['bible/Gen/1/1']);
      expect(mockCache.frontmatter['bible-refs']).toEqual(['bible/Gen/1/1']);
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

      const content = 'Gen 1,1 ist wichtig';
      const tags = await fullSyncPipeline(content, 'Joh 3,16.md');

      // Should only have content reference, not title reference
      expect(tags).toEqual(['bible/Gen/1/1']);
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
      // Philemon has only 25 verses total
      const content = 'Philemon 1';
      const tags = await fullSyncPipeline(content);

      expect(tags).toHaveLength(25);
      expect(tags[0]).toBe('bible/Phm/1/1');
      expect(tags[24]).toBe('bible/Phm/1/25');
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
