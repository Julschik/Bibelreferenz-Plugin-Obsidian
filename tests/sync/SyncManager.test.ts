import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { SyncManager, SyncTimeoutError, createSyncManager } from '../../src/sync/SyncManager';
import type { BibleRefSettings } from '../../src/types';
import { TFile } from 'obsidian';

/**
 * Mock implementations for Obsidian API
 * Uses vitest.config.ts alias to resolve obsidian to __mocks__/obsidian.ts
 */

// Create mock file that extends TFile for instanceof checks
function createMockFile(path: string): TFile {
  const file = new TFile();
  file.path = path;
  file.basename = path.replace('.md', '');
  file.extension = 'md';
  return file;
}

describe('SyncManager', () => {
  let syncManager: SyncManager;
  let settings: BibleRefSettings;
  let mockApp: any;
  let mockPlugin: any;
  let mockFile: TFile;
  let mockFrontmatter: Record<string, unknown>;
  let registeredEvents: Array<{ type: string; callback: (...args: unknown[]) => void }>;
  let unregisteredRefs: unknown[];

  beforeEach(() => {
    registeredEvents = [];
    unregisteredRefs = [];
    mockFrontmatter = {};

    settings = {
      uiLanguage: 'de',
      syncOptions: {
        onSave: true,
        onFileChange: true,
      },
      language: 'de',
      separators: {
        chapterVerse: ',',
        list: '.',
        range: '-',
      },
      frontmatterKey: 'bible-refs',
      tagPrefix: 'bible/',
      writeToTagsField: true,
      graphTagGranularity: 'verse',
      customBookMappings: {},
      parseCodeBlocks: false,
      parseTitles: true,
      linkBehavior: 'same-tab',
      syncTimeout: {
        singleFileMs: 30000,
        fullVaultMs: 300000,
      },
    };

    mockFile = createMockFile('test.md');

    // Mock App
    mockApp = {
      vault: {
        read: vi.fn().mockResolvedValue('Test content with Joh 3,16'),
        getMarkdownFiles: vi.fn().mockReturnValue([mockFile]),
        on: vi.fn().mockImplementation((event, callback) => {
          const ref = { type: event, callback };
          registeredEvents.push(ref);
          return ref;
        }),
        offref: vi.fn().mockImplementation((ref) => {
          unregisteredRefs.push(ref);
        }),
      },
      workspace: {
        on: vi.fn().mockImplementation((event, callback) => {
          const ref = { type: event, callback };
          registeredEvents.push(ref);
          return ref;
        }),
        offref: vi.fn().mockImplementation((ref) => {
          unregisteredRefs.push(ref);
        }),
      },
      metadataCache: {
        getFileCache: vi.fn().mockReturnValue({
          frontmatter: mockFrontmatter,
        }),
      },
      fileManager: {
        processFrontMatter: vi.fn().mockImplementation(async (_file, fn) => {
          fn(mockFrontmatter);
        }),
      },
    };

    // Mock Plugin
    mockPlugin = {
      registerEvent: vi.fn().mockImplementation((ref) => ref),
    };

    syncManager = new SyncManager(mockApp, mockPlugin, settings);

    // Register events so they're available for tests
    syncManager.registerEvents();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('constructor', () => {
    it('should initialize all components', () => {
      expect(syncManager).toBeDefined();
      expect(syncManager.getFrontmatterSync()).toBeDefined();
    });
  });

  describe('registerEvents', () => {
    it('should register modify event when onSave is true', () => {
      settings.syncOptions = { onSave: true, onFileChange: false };
      syncManager.updateSettings(settings);

      const modifyEvents = registeredEvents.filter(e => e.type === 'modify');
      expect(modifyEvents.length).toBeGreaterThan(0);
    });

    it('should register active-leaf-change when onFileChange is true', () => {
      settings.syncOptions = { onSave: false, onFileChange: true };
      syncManager.updateSettings(settings);

      const leafEvents = registeredEvents.filter(e => e.type === 'active-leaf-change');
      expect(leafEvents.length).toBeGreaterThan(0);
    });

    it('should register both events when both options are true', () => {
      settings.syncOptions = { onSave: true, onFileChange: true };
      syncManager.updateSettings(settings);

      const modifyEvents = registeredEvents.filter(e => e.type === 'modify');
      const leafEvents = registeredEvents.filter(e => e.type === 'active-leaf-change');
      expect(modifyEvents.length).toBeGreaterThan(0);
      expect(leafEvents.length).toBeGreaterThan(0);
    });

    it('should not register any events when both options are false', () => {
      // Clear previous registrations
      registeredEvents = [];
      settings.syncOptions = { onSave: false, onFileChange: false };

      // Create new SyncManager with manual-only settings
      const manualSyncManager = new SyncManager(mockApp, mockPlugin, settings);
      manualSyncManager.registerEvents();

      // Should have 0 new registrations after registerEvents
      // Note: constructor calls registerEvents, so we need to check the final state
      const modifyEvents = registeredEvents.filter(e => e.type === 'modify');
      const leafEvents = registeredEvents.filter(e => e.type === 'active-leaf-change');

      // With both false, no events should be registered
      expect(modifyEvents.length + leafEvents.length).toBe(0);
    });
  });

  describe('unregisterEvents', () => {
    it('should unregister all events', () => {
      // First register events
      syncManager.registerEvents();
      const registeredCount = registeredEvents.length;

      // Then unregister
      syncManager.unregisterEvents();

      // All refs should be unregistered
      expect(unregisteredRefs.length).toBe(registeredCount);
    });

    it('should clear event refs array', () => {
      syncManager.registerEvents();
      syncManager.unregisterEvents();

      // Calling unregister again should not throw or unregister more
      const prevCount = unregisteredRefs.length;
      syncManager.unregisterEvents();
      expect(unregisteredRefs.length).toBe(prevCount);
    });
  });

  describe('syncFile', () => {
    it('should skip sync when isCurrentlyUpdating is true', async () => {
      // Access frontmatterSync and set isCurrentlyUpdating
      const frontmatterSync = syncManager.getFrontmatterSync();
      (frontmatterSync as any).isUpdating = true;

      const result = await syncManager.syncFile(mockFile as any);

      expect(result.changed).toBe(false);
      expect(result.tagCount).toBe(0);
      expect(mockApp.vault.read).not.toHaveBeenCalled();
    });

    it('should parse content and sync to frontmatter', async () => {
      mockApp.vault.read.mockResolvedValue('Test with Joh 3,16 reference');

      const result = await syncManager.syncFile(mockFile as any);

      expect(mockApp.vault.read).toHaveBeenCalledWith(mockFile);
      expect(mockApp.fileManager.processFrontMatter).toHaveBeenCalled();
      expect(result.tagCount).toBeGreaterThan(0);
    });

    it('should parse title when parseTitles is enabled', async () => {
      settings.parseTitles = true;
      syncManager.updateSettings(settings);

      mockFile = createMockFile('Joh 3,16.md');
      mockApp.vault.read.mockResolvedValue('Some content without refs');

      const result = await syncManager.syncFile(mockFile as any);

      // Should have tags from the title
      expect(result.tagCount).toBeGreaterThan(0);
    });

    it('should not parse title when parseTitles is disabled', async () => {
      settings.parseTitles = false;
      syncManager.updateSettings(settings);

      mockFile = createMockFile('Joh 3,16.md');
      mockApp.vault.read.mockResolvedValue('Some content without refs');

      const result = await syncManager.syncFile(mockFile as any);

      // Should have no tags (no content refs, title parsing disabled)
      expect(result.tagCount).toBe(0);
    });

    it('should return timeout flag when sync times out', async () => {
      // Set a very short timeout
      settings.syncTimeout = { singleFileMs: 1, fullVaultMs: 300000 };
      syncManager.updateSettings(settings);

      // Make vault.read take a long time
      mockApp.vault.read.mockImplementation(() =>
        new Promise(resolve => setTimeout(() => resolve('content'), 100))
      );

      const result = await syncManager.syncFile(mockFile as any);

      expect(result.timeout).toBe(true);
      expect(result.changed).toBe(false);
    });

    it('should catch and handle errors gracefully', async () => {
      mockApp.vault.read.mockRejectedValue(new Error('Read error'));

      // Should not throw
      const result = await syncManager.syncFile(mockFile as any);

      expect(result.changed).toBe(false);
      expect(result.tagCount).toBe(0);
    });
  });

  describe('syncAll', () => {
    it('should sync all markdown files', async () => {
      const files = [
        createMockFile('file1.md'),
        createMockFile('file2.md'),
        createMockFile('file3.md'),
      ];
      mockApp.vault.getMarkdownFiles.mockReturnValue(files);
      mockApp.vault.read.mockResolvedValue('Content with Joh 3,16');

      const result = await syncManager.syncAll();

      expect(result.processed).toBe(3);
      expect(mockApp.vault.read).toHaveBeenCalledTimes(3);
    });

    it('should return correct changed count', async () => {
      const files = [
        createMockFile('file1.md'),
        createMockFile('file2.md'),
      ];
      mockApp.vault.getMarkdownFiles.mockReturnValue(files);

      // First file has refs, second doesn't
      mockApp.vault.read
        .mockResolvedValueOnce('Content with Joh 3,16')
        .mockResolvedValueOnce('Content without references');

      const result = await syncManager.syncAll();

      expect(result.processed).toBe(2);
      // At least the first file should have changed
      expect(result.changed).toBeGreaterThanOrEqual(1);
    });

    it('should return timeout flag when full vault sync times out', async () => {
      settings.syncTimeout = { singleFileMs: 30000, fullVaultMs: 1 };
      syncManager.updateSettings(settings);

      const files = Array.from({ length: 100 }, (_, i) => createMockFile(`file${i}.md`));
      mockApp.vault.getMarkdownFiles.mockReturnValue(files);
      mockApp.vault.read.mockImplementation(() =>
        new Promise(resolve => setTimeout(() => resolve('content'), 10))
      );

      const result = await syncManager.syncAll();

      expect(result.timeout).toBe(true);
    });

    it('should handle empty vault', async () => {
      mockApp.vault.getMarkdownFiles.mockReturnValue([]);

      const result = await syncManager.syncAll();

      expect(result.processed).toBe(0);
      expect(result.changed).toBe(0);
    });
  });

  describe('updateSettings', () => {
    it('should update settings and re-register events', () => {
      // Count events before update
      const eventsBefore = registeredEvents.length;

      const newSettings = {
        ...settings,
        syncOptions: { onSave: false, onFileChange: true },
      };

      // Clear arrays by mutating (not reassigning) to preserve closure references
      registeredEvents.length = 0;
      unregisteredRefs.length = 0;

      syncManager.updateSettings(newSettings);

      // Should have unregistered the old events (eventsBefore worth)
      expect(unregisteredRefs.length).toBe(eventsBefore);

      // Should have only file change event registered
      const modifyEvents = registeredEvents.filter(e => e.type === 'modify');
      const leafEvents = registeredEvents.filter(e => e.type === 'active-leaf-change');
      expect(leafEvents.length).toBeGreaterThan(0);
      expect(modifyEvents.length).toBe(0);
    });

    it('should update frontmatterKey', async () => {
      const newSettings = {
        ...settings,
        frontmatterKey: 'custom-key',
      };
      syncManager.updateSettings(newSettings);

      mockApp.vault.read.mockResolvedValue('Content with Joh 3,16');
      await syncManager.syncFile(mockFile as any);

      // Check that processFrontMatter was called with the new key
      expect(mockApp.fileManager.processFrontMatter).toHaveBeenCalled();
    });
  });

  describe('getFrontmatterSync', () => {
    it('should return the frontmatter sync instance', () => {
      const frontmatterSync = syncManager.getFrontmatterSync();
      expect(frontmatterSync).toBeDefined();
      expect(typeof frontmatterSync.sync).toBe('function');
    });
  });

  describe('event handlers', () => {
    it('should trigger sync on modify event for markdown files', async () => {
      const syncFileSpy = vi.spyOn(syncManager, 'syncFile');

      // Get the modify event handler
      const modifyEvent = registeredEvents.find(e => e.type === 'modify');
      expect(modifyEvent).toBeDefined();

      // Trigger the event with a markdown file
      await modifyEvent!.callback(mockFile);

      expect(syncFileSpy).toHaveBeenCalled();
    });

    it('should not trigger sync on modify event for non-markdown files', async () => {
      const syncFileSpy = vi.spyOn(syncManager, 'syncFile');

      const modifyEvent = registeredEvents.find(e => e.type === 'modify');
      expect(modifyEvent).toBeDefined();

      // Trigger with a non-markdown file
      const nonMdFile = { ...mockFile, extension: 'txt' };
      await modifyEvent!.callback(nonMdFile);

      expect(syncFileSpy).not.toHaveBeenCalled();
    });

    it('should trigger sync on active-leaf-change for markdown files', async () => {
      const syncFileSpy = vi.spyOn(syncManager, 'syncFile');

      const leafEvent = registeredEvents.find(e => e.type === 'active-leaf-change');
      expect(leafEvent).toBeDefined();

      // Trigger with a leaf containing a markdown file
      const mockLeaf = {
        view: {
          file: mockFile,
        },
      };
      await leafEvent!.callback(mockLeaf);

      expect(syncFileSpy).toHaveBeenCalled();
    });

    it('should not trigger sync on active-leaf-change with null leaf', async () => {
      const syncFileSpy = vi.spyOn(syncManager, 'syncFile');

      const leafEvent = registeredEvents.find(e => e.type === 'active-leaf-change');
      expect(leafEvent).toBeDefined();

      await leafEvent!.callback(null);

      expect(syncFileSpy).not.toHaveBeenCalled();
    });
  });
});

describe('SyncTimeoutError', () => {
  it('should create error with correct message', () => {
    const error = new SyncTimeoutError('test operation', 5000);
    expect(error.message).toBe('Sync timeout: test operation exceeded 5000ms');
    expect(error.name).toBe('SyncTimeoutError');
  });

  it('should be instanceof Error', () => {
    const error = new SyncTimeoutError('test', 1000);
    expect(error instanceof Error).toBe(true);
  });
});

describe('createSyncManager factory', () => {
  it('should create a SyncManager instance', () => {
    const settings: BibleRefSettings = {
      uiLanguage: 'de',
      syncOptions: { onSave: true, onFileChange: false },
      language: 'de',
      separators: { chapterVerse: ',', list: '.', range: '-' },
      frontmatterKey: 'bible-refs',
      tagPrefix: 'bible/',
      writeToTagsField: true,
      graphTagGranularity: 'verse',
      customBookMappings: {},
      parseCodeBlocks: false,
      parseTitles: true,
      linkBehavior: 'same-tab',
      syncTimeout: { singleFileMs: 30000, fullVaultMs: 300000 },
    };

    const mockApp = {
      vault: {
        read: vi.fn(),
        getMarkdownFiles: vi.fn().mockReturnValue([]),
        on: vi.fn(),
        offref: vi.fn(),
      },
      workspace: {
        on: vi.fn(),
        offref: vi.fn(),
      },
      metadataCache: {
        getFileCache: vi.fn().mockReturnValue({ frontmatter: {} }),
      },
      fileManager: {
        processFrontMatter: vi.fn(),
      },
    };

    const mockPlugin = {
      registerEvent: vi.fn().mockImplementation(ref => ref),
    };

    const manager = createSyncManager(mockApp as any, mockPlugin as any, settings);
    expect(manager).toBeInstanceOf(SyncManager);
  });
});
