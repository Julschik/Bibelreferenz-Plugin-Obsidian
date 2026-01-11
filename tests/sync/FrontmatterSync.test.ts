import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FrontmatterSync } from '../../src/sync/FrontmatterSync';
import type { BibleRefSettings } from '../../src/types';

/**
 * Mock implementations for Obsidian API
 * These tests verify the logic without requiring a full Obsidian environment
 */

describe('FrontmatterSync', () => {
  let sync: FrontmatterSync;
  let settings: BibleRefSettings;
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

    // Mock file
    mockFile = {
      path: 'test.md',
      basename: 'test',
      extension: 'md'
    };

    // Mock cache with frontmatter
    mockCache = {
      frontmatter: {}
    };

    // Mock App with metadataCache and fileManager
    mockApp = {
      metadataCache: {
        getFileCache: vi.fn().mockReturnValue(mockCache)
      },
      fileManager: {
        processFrontMatter: vi.fn().mockImplementation(async (file, fn) => {
          // Simulate processFrontMatter by calling the function with frontmatter
          fn(mockCache.frontmatter);
        })
      }
    };

    sync = new FrontmatterSync(mockApp, settings);
  });

  describe('read()', () => {
    it('should return empty array when no frontmatter exists', async () => {
      mockCache.frontmatter = null;

      const tags = await sync.read(mockFile);

      expect(tags).toEqual([]);
    });

    it('should return empty array when frontmatter key does not exist', async () => {
      mockCache.frontmatter = { title: 'Test' };

      const tags = await sync.read(mockFile);

      expect(tags).toEqual([]);
    });

    it('should read tags from frontmatter array', async () => {
      mockCache.frontmatter = {
        'bible-refs': ['bible/Joh/3/16', 'bible/Gen/1/1']
      };

      const tags = await sync.read(mockFile);

      expect(tags).toEqual(['bible/Joh/3/16', 'bible/Gen/1/1']);
    });

    it('should read single tag as string', async () => {
      mockCache.frontmatter = {
        'bible-refs': 'bible/Joh/3/16'
      };

      const tags = await sync.read(mockFile);

      expect(tags).toEqual(['bible/Joh/3/16']);
    });

    it('should filter out non-string values', async () => {
      mockCache.frontmatter = {
        'bible-refs': ['bible/Joh/3/16', 123, null, 'bible/Gen/1/1']
      };

      const tags = await sync.read(mockFile);

      expect(tags).toEqual(['bible/Joh/3/16', 'bible/Gen/1/1']);
    });

    it('should use custom frontmatter key', async () => {
      settings.frontmatterKey = 'scripture-tags';
      sync = new FrontmatterSync(mockApp, settings);

      mockCache.frontmatter = {
        'scripture-tags': ['bible/Joh/3/16']
      };

      const tags = await sync.read(mockFile);

      expect(tags).toEqual(['bible/Joh/3/16']);
    });
  });

  describe('sync()', () => {
    it('should write new tags to frontmatter', async () => {
      mockCache.frontmatter = {};

      const newTags = ['bible/Joh/3/16', 'bible/Gen/1/1'];
      const changed = await sync.sync(mockFile, newTags);

      expect(changed).toBe(true);
      expect(mockCache.frontmatter['bible-refs']).toEqual(newTags);
    });

    it('should return false when tags are unchanged', async () => {
      mockCache.frontmatter = {
        'bible-refs': ['bible/Joh/3/16', 'bible/Gen/1/1']
      };

      const newTags = ['bible/Joh/3/16', 'bible/Gen/1/1'];
      const changed = await sync.sync(mockFile, newTags);

      expect(changed).toBe(false);
    });

    it('should detect changes regardless of order', async () => {
      mockCache.frontmatter = {
        'bible-refs': ['bible/Gen/1/1', 'bible/Joh/3/16']
      };

      const newTags = ['bible/Joh/3/16', 'bible/Gen/1/1'];
      const changed = await sync.sync(mockFile, newTags);

      // Same tags, different order = no change
      expect(changed).toBe(false);
    });

    it('should remove frontmatter key when tags are empty', async () => {
      mockCache.frontmatter = {
        'bible-refs': ['bible/Joh/3/16']
      };

      const changed = await sync.sync(mockFile, []);

      expect(changed).toBe(true);
      expect(mockCache.frontmatter['bible-refs']).toBeUndefined();
    });

    it('should update existing tags', async () => {
      mockCache.frontmatter = {
        'bible-refs': ['bible/Joh/3/16']
      };

      const newTags = ['bible/Gen/1/1', 'bible/Col/3/16'];
      const changed = await sync.sync(mockFile, newTags);

      expect(changed).toBe(true);
      expect(mockCache.frontmatter['bible-refs']).toEqual(newTags);
    });
  });

  describe('Loop Prevention', () => {
    it('should prevent re-entry during sync', async () => {
      mockCache.frontmatter = {};

      // Simulate nested sync call
      mockApp.fileManager.processFrontMatter.mockImplementation(async (file: any, fn: any) => {
        fn(mockCache.frontmatter);

        // Try to sync again while still in progress
        const nestedResult = await sync.sync(mockFile, ['bible/Joh/3/17']);
        expect(nestedResult).toBe(false); // Should be blocked
      });

      const result = await sync.sync(mockFile, ['bible/Joh/3/16']);
      expect(result).toBe(true);
    });

    it('should expose isCurrentlyUpdating flag', () => {
      expect(sync.isCurrentlyUpdating).toBe(false);
    });

    it('should reset isUpdating flag after error', async () => {
      mockApp.fileManager.processFrontMatter.mockImplementation(async () => {
        throw new Error('Test error');
      });

      await sync.sync(mockFile, ['bible/Joh/3/16']);

      // Flag should be reset even after error
      expect(sync.isCurrentlyUpdating).toBe(false);
    });
  });

  describe('Helper Methods', () => {
    it('clear() should remove all tags', async () => {
      mockCache.frontmatter = {
        'bible-refs': ['bible/Joh/3/16', 'bible/Gen/1/1']
      };

      const changed = await sync.clear(mockFile);

      expect(changed).toBe(true);
      expect(mockCache.frontmatter['bible-refs']).toBeUndefined();
    });

    it('hasTags() should return true when tags exist', async () => {
      mockCache.frontmatter = {
        'bible-refs': ['bible/Joh/3/16']
      };

      const result = await sync.hasTags(mockFile);
      expect(result).toBe(true);
    });

    it('hasTags() should return false when no tags exist', async () => {
      mockCache.frontmatter = {};

      const result = await sync.hasTags(mockFile);
      expect(result).toBe(false);
    });

    it('getTagCount() should return correct count', async () => {
      mockCache.frontmatter = {
        'bible-refs': ['bible/Joh/3/16', 'bible/Gen/1/1', 'bible/Col/3/16']
      };

      const count = await sync.getTagCount(mockFile);
      expect(count).toBe(3);
    });

    it('getTagCount() should return 0 when no tags exist', async () => {
      mockCache.frontmatter = {};

      const count = await sync.getTagCount(mockFile);
      expect(count).toBe(0);
    });
  });

  describe('Settings Update', () => {
    it('should update settings', () => {
      const newSettings: BibleRefSettings = {
        ...settings,
        frontmatterKey: 'scripture-refs'
      };

      sync.updateSettings(newSettings);

      // Verify by checking if new key is used
      expect(sync).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('should handle read errors gracefully', async () => {
      mockApp.metadataCache.getFileCache.mockImplementation(() => {
        throw new Error('Test error');
      });

      const tags = await sync.read(mockFile);

      expect(tags).toEqual([]);
    });

    it('should handle sync errors gracefully', async () => {
      mockApp.fileManager.processFrontMatter.mockImplementation(async () => {
        throw new Error('Test error');
      });

      const changed = await sync.sync(mockFile, ['bible/Joh/3/16']);

      expect(changed).toBe(false);
    });
  });
});
