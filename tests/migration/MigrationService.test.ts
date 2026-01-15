import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { MigrationService } from '../../src/migration/MigrationService';
import type { BibleRefSettings, CanonicalIdMigration } from '../../src/types';
import type { I18nService } from '../../src/i18n/I18nService';
import { TFile, Notice } from 'obsidian';

// Mock Notice
vi.mock('obsidian', async () => {
  const actual = await vi.importActual('obsidian');
  return {
    ...actual,
    Notice: vi.fn(),
  };
});

function createMockFile(path: string): TFile {
  const file = new TFile();
  file.path = path;
  file.basename = path.replace('.md', '');
  file.extension = 'md';
  return file;
}

function createMockI18n(): I18nService {
  return {
    t: vi.fn((key: string, replacements?: Record<string, string | number>) => {
      let text = key;
      if (replacements) {
        for (const [k, value] of Object.entries(replacements)) {
          text = text.replace(`{${k}}`, String(value));
        }
      }
      return text;
    }),
    getLocale: vi.fn().mockReturnValue('de'),
    setLocale: vi.fn(),
  } as unknown as I18nService;
}

describe('MigrationService', () => {
  let migrationService: MigrationService;
  let settings: BibleRefSettings;
  let mockApp: any;
  let mockI18n: I18nService;
  let saveSettingsFn: ReturnType<typeof vi.fn>;
  let mockFrontmatter: Record<string, unknown>;
  let mockFiles: TFile[];

  beforeEach(() => {
    vi.clearAllMocks();
    mockFrontmatter = {};
    mockFiles = [createMockFile('test1.md'), createMockFile('test2.md')];

    settings = {
      uiLanguage: 'de',
      syncOptions: { onSave: true, onFileChange: true },
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
      migrationQueue: { migrations: [] },
    };

    mockApp = {
      vault: {
        getMarkdownFiles: vi.fn().mockReturnValue(mockFiles),
      },
      fileManager: {
        processFrontMatter: vi.fn().mockImplementation(async (_file, fn) => {
          fn(mockFrontmatter);
        }),
      },
    };

    saveSettingsFn = vi.fn().mockResolvedValue(undefined);
    mockI18n = createMockI18n();
    migrationService = new MigrationService(mockApp, settings, saveSettingsFn, mockI18n);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('queueMigration', () => {
    it('should initialize migrationQueue if not exists', async () => {
      settings.migrationQueue = undefined as any;

      await migrationService.queueMigration('Joh', 'Johannes', 'Joh');

      expect(settings.migrationQueue).toBeDefined();
      expect(settings.migrationQueue!.migrations).toBeDefined();
    });

    it('should add migration to queue', async () => {
      await migrationService.queueMigration('Joh', 'Johannes', 'Joh');

      expect(settings.migrationQueue!.migrations).toHaveLength(1);
      expect(settings.migrationQueue!.migrations[0]).toEqual({
        bookId: 'Joh',
        oldId: 'Johannes',
        newId: 'Joh',
        status: 'pending',
        filesProcessed: 0,
        filesTotal: 0,
      });
    });

    it('should not add duplicate migrations', async () => {
      await migrationService.queueMigration('Joh', 'Johannes', 'Joh');
      await migrationService.queueMigration('Joh', 'Johannes', 'Joh');

      expect(settings.migrationQueue!.migrations).toHaveLength(1);
    });

    it('should call saveSettings after adding migration', async () => {
      await migrationService.queueMigration('Joh', 'Johannes', 'Joh');

      expect(saveSettingsFn).toHaveBeenCalled();
    });

    it('should show notice when migration starts', async () => {
      await migrationService.queueMigration('Joh', 'Johannes', 'Joh');

      // Verify i18n.t was called with correct parameters
      expect(mockI18n.t).toHaveBeenCalledWith('noticeMigrationStarted', { oldId: 'Johannes', newId: 'Joh' });
      // Verify Notice was called (i18n.t returns the key name in the mock)
      expect(Notice).toHaveBeenCalled();
    });
  });

  describe('processMigrationQueue', () => {
    it('should process all pending migrations', async () => {
      mockFrontmatter = {
        'bible-refs': ['bible/Johannes/3/16'],
        tags: ['bible/Johannes/3/16'],
      };

      await migrationService.queueMigration('Joh', 'Johannes', 'Joh');

      // Wait for async processing
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(mockApp.fileManager.processFrontMatter).toHaveBeenCalled();
    });

    it('should remove completed migrations from queue', async () => {
      mockFrontmatter = {};

      await migrationService.queueMigration('Joh', 'Johannes', 'Joh');

      // Wait for async processing
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(settings.migrationQueue!.migrations).toHaveLength(0);
    });

    it('should not run if already running', async () => {
      // Add first migration
      await migrationService.queueMigration('Joh', 'Johannes', 'Joh');

      // Queue should be processing, add another
      settings.migrationQueue!.migrations.push({
        bookId: 'Gen',
        oldId: 'Genesis',
        newId: 'Gen',
        status: 'pending',
        filesProcessed: 0,
        filesTotal: 0,
      });

      // Wait for processing
      await new Promise(resolve => setTimeout(resolve, 100));

      // Both should be processed eventually
      expect(settings.migrationQueue!.migrations).toHaveLength(0);
    });
  });

  describe('runMigration', () => {
    it('should migrate custom frontmatter key', async () => {
      let capturedFrontmatter: Record<string, unknown> = {};
      mockApp.fileManager.processFrontMatter.mockImplementation(async (_file: TFile, fn: (fm: Record<string, unknown>) => void) => {
        const fm = {
          'bible-refs': ['bible/Johannes/3/16', 'bible/Gen/1/1'],
        };
        fn(fm);
        capturedFrontmatter = fm;
      });

      await migrationService.queueMigration('Joh', 'Johannes', 'Joh');
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(capturedFrontmatter['bible-refs']).toContain('bible/Joh/3/16');
      expect(capturedFrontmatter['bible-refs']).toContain('bible/Gen/1/1');
    });

    it('should migrate standard tags field when writeToTagsField is true', async () => {
      let capturedFrontmatter: Record<string, unknown> = {};
      mockApp.fileManager.processFrontMatter.mockImplementation(async (_file: TFile, fn: (fm: Record<string, unknown>) => void) => {
        const fm = {
          'bible-refs': ['bible/Johannes/3/16'],
          tags: ['bible/Johannes/3/16', 'other-tag'],
        };
        fn(fm);
        capturedFrontmatter = fm;
      });

      await migrationService.queueMigration('Joh', 'Johannes', 'Joh');
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(capturedFrontmatter.tags).toContain('bible/Joh/3/16');
      expect(capturedFrontmatter.tags).toContain('other-tag');
    });

    it('should not migrate tags field when writeToTagsField is false', async () => {
      settings.writeToTagsField = false;
      migrationService = new MigrationService(mockApp, settings, saveSettingsFn, mockI18n);

      let capturedFrontmatter: Record<string, unknown> = {};
      mockApp.fileManager.processFrontMatter.mockImplementation(async (_file: TFile, fn: (fm: Record<string, unknown>) => void) => {
        const fm = {
          'bible-refs': ['bible/Johannes/3/16'],
          tags: ['bible/Johannes/3/16'],
        };
        fn(fm);
        capturedFrontmatter = fm;
      });

      await migrationService.queueMigration('Joh', 'Johannes', 'Joh');
      await new Promise(resolve => setTimeout(resolve, 100));

      // tags should remain unchanged since writeToTagsField is false
      expect(capturedFrontmatter.tags).toContain('bible/Johannes/3/16');
    });

    it('should update migration status to completed', async () => {
      mockFrontmatter = {};

      await migrationService.queueMigration('Joh', 'Johannes', 'Joh');
      await new Promise(resolve => setTimeout(resolve, 100));

      // Migration should be removed after completion
      expect(settings.migrationQueue!.migrations).toHaveLength(0);
    });

    it('should handle errors gracefully', async () => {
      mockApp.fileManager.processFrontMatter.mockRejectedValue(new Error('File error'));

      await migrationService.queueMigration('Joh', 'Johannes', 'Joh');
      await new Promise(resolve => setTimeout(resolve, 100));

      // Should complete despite errors
      expect(settings.migrationQueue!.migrations).toHaveLength(0);
    });

    it('should yield to UI every 10 files', async () => {
      const manyFiles = Array.from({ length: 25 }, (_, i) => createMockFile(`file${i}.md`));
      mockApp.vault.getMarkdownFiles.mockReturnValue(manyFiles);
      mockFrontmatter = {};

      const setTimeoutSpy = vi.spyOn(global, 'setTimeout');

      await migrationService.queueMigration('Joh', 'Johannes', 'Joh');
      await new Promise(resolve => setTimeout(resolve, 200));

      // Should have yielded twice (at 10 and 20 files)
      const yieldCalls = setTimeoutSpy.mock.calls.filter(call => call[1] === 0);
      expect(yieldCalls.length).toBeGreaterThanOrEqual(2);

      setTimeoutSpy.mockRestore();
    });
  });

  describe('migrateFile', () => {
    it('should replace old pattern with new pattern', async () => {
      let capturedFrontmatter: Record<string, unknown> = {};
      mockApp.fileManager.processFrontMatter.mockImplementation(async (_file: TFile, fn: (fm: Record<string, unknown>) => void) => {
        const fm = {
          'bible-refs': ['bible/OldBook/1/1', 'bible/OldBook/2/3'],
        };
        fn(fm);
        capturedFrontmatter = fm;
      });

      await migrationService.queueMigration('Test', 'OldBook', 'NewBook');
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(capturedFrontmatter['bible-refs']).toEqual(['bible/NewBook/1/1', 'bible/NewBook/2/3']);
    });

    it('should preserve non-matching tags', async () => {
      let capturedFrontmatter: Record<string, unknown> = {};
      mockApp.fileManager.processFrontMatter.mockImplementation(async (_file: TFile, fn: (fm: Record<string, unknown>) => void) => {
        const fm = {
          'bible-refs': ['bible/OldBook/1/1', 'bible/OtherBook/2/3', 'unrelated-tag'],
        };
        fn(fm);
        capturedFrontmatter = fm;
      });

      await migrationService.queueMigration('Test', 'OldBook', 'NewBook');
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(capturedFrontmatter['bible-refs']).toContain('bible/NewBook/1/1');
      expect(capturedFrontmatter['bible-refs']).toContain('bible/OtherBook/2/3');
      expect(capturedFrontmatter['bible-refs']).toContain('unrelated-tag');
    });

    it('should handle empty frontmatter', async () => {
      mockApp.fileManager.processFrontMatter.mockImplementation(async (_file: TFile, fn: (fm: Record<string, unknown>) => void) => {
        fn({});
      });

      await migrationService.queueMigration('Joh', 'Johannes', 'Joh');
      await new Promise(resolve => setTimeout(resolve, 100));

      // Should complete without errors
      expect(settings.migrationQueue!.migrations).toHaveLength(0);
    });

    it('should handle non-array frontmatter values', async () => {
      mockApp.fileManager.processFrontMatter.mockImplementation(async (_file: TFile, fn: (fm: Record<string, unknown>) => void) => {
        fn({
          'bible-refs': 'string-value',
          tags: 123,
        });
      });

      await migrationService.queueMigration('Joh', 'Johannes', 'Joh');
      await new Promise(resolve => setTimeout(resolve, 100));

      // Should complete without errors
      expect(settings.migrationQueue!.migrations).toHaveLength(0);
    });
  });

  describe('resumeMigrations', () => {
    it('should do nothing with empty queue', async () => {
      settings.migrationQueue = { migrations: [] };

      await migrationService.resumeMigrations();

      expect(mockApp.fileManager.processFrontMatter).not.toHaveBeenCalled();
    });

    it('should do nothing without migrationQueue', async () => {
      settings.migrationQueue = undefined as any;

      await migrationService.resumeMigrations();

      expect(mockApp.fileManager.processFrontMatter).not.toHaveBeenCalled();
    });

    it('should reset running migrations to pending', async () => {
      settings.migrationQueue = {
        migrations: [
          {
            bookId: 'Joh',
            oldId: 'Johannes',
            newId: 'Joh',
            status: 'running',
            filesProcessed: 5,
            filesTotal: 10,
          },
        ],
      };

      mockFrontmatter = {};

      await migrationService.resumeMigrations();
      await new Promise(resolve => setTimeout(resolve, 100));

      // Migration should be processed and removed
      expect(settings.migrationQueue!.migrations).toHaveLength(0);
    });

    it('should reset filesProcessed when resuming', async () => {
      const migration: CanonicalIdMigration = {
        bookId: 'Joh',
        oldId: 'Johannes',
        newId: 'Joh',
        status: 'running',
        filesProcessed: 5,
        filesTotal: 10,
      };
      settings.migrationQueue = { migrations: [migration] };

      await migrationService.resumeMigrations();

      // filesProcessed should be reset to 0
      // Note: We check before async processing completes
      expect(migration.filesProcessed).toBe(0);
    });

    it('should restart migration queue processing', async () => {
      settings.migrationQueue = {
        migrations: [
          {
            bookId: 'Joh',
            oldId: 'Johannes',
            newId: 'Joh',
            status: 'pending',
            filesProcessed: 0,
            filesTotal: 0,
          },
        ],
      };

      mockFrontmatter = { 'bible-refs': ['bible/Johannes/3/16'] };

      await migrationService.resumeMigrations();
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(mockApp.fileManager.processFrontMatter).toHaveBeenCalled();
    });
  });

  describe('show completion notice', () => {
    it('should show notice on migration completion', async () => {
      mockFrontmatter = { 'bible-refs': ['bible/Johannes/3/16'] };

      await migrationService.queueMigration('Joh', 'Johannes', 'Joh');
      await new Promise(resolve => setTimeout(resolve, 100));

      // Verify i18n.t was called for completion notice
      expect(mockI18n.t).toHaveBeenCalledWith('noticeMigrationCompleted', expect.objectContaining({
        changed: expect.any(Number),
        total: expect.any(Number),
        duration: expect.any(String),
      }));

      // Should show both start and completion notices
      const noticeCalls = (Notice as ReturnType<typeof vi.fn>).mock.calls;
      expect(noticeCalls.length).toBeGreaterThanOrEqual(2);
    });
  });
});
