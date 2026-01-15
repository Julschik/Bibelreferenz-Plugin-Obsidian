import { App, Plugin, TFile, debounce, Debouncer } from 'obsidian';
import type { BibleRefSettings, ParsedReference } from '../types';
import { SmartBibleParser, createSmartBibleParser } from '../parser/SmartBibleParser';
import { TitleParser, createTitleParser } from '../parser/TitleParser';
import { TagGenerator, createTagGenerator } from './TagGenerator';
import { FrontmatterSync, createFrontmatterSync } from './FrontmatterSync';
import { DEBOUNCE_DELAY } from '../constants';

/**
 * Error thrown when sync operation times out
 */
export class SyncTimeoutError extends Error {
  constructor(operation: string, timeoutMs: number) {
    super(`Sync timeout: ${operation} exceeded ${timeoutMs}ms`);
    this.name = 'SyncTimeoutError';
  }
}

/**
 * Execute a promise with a timeout
 * Uses Promise.race() for cleaner implementation
 *
 * @param promise Promise to execute
 * @param timeoutMs Timeout in milliseconds
 * @param operation Operation name for error message
 * @returns Promise result or throws SyncTimeoutError
 */
async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  operation: string
): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout>;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(
      () => reject(new SyncTimeoutError(operation, timeoutMs)),
      timeoutMs
    );
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timeoutId!);
  }
}

/**
 * SyncManager
 *
 * Manages the synchronization of Bible references to frontmatter.
 * Handles event registration based on sync options and coordinates all sync operations.
 *
 * Sync Options (checkbox-based):
 * - onSave: Sync when file is saved (Ctrl+S / Cmd+S)
 * - onFileChange: Sync when switching to another file
 * - Both disabled: Manual only (via command or button)
 *
 * Architecture:
 * User writes → Parser detects refs → TagGenerator creates tags → FrontmatterSync writes
 */
export class SyncManager {
  private app: App;
  private plugin: Plugin;
  private settings: BibleRefSettings;

  // Components
  private parser: SmartBibleParser;
  private titleParser: TitleParser;
  private tagGenerator: TagGenerator;
  private frontmatterSync: FrontmatterSync;

  // Event handling
  private debouncedSync: Debouncer<[TFile], Promise<void>>;
  private eventRefs: Array<() => void> = [];

  constructor(app: App, plugin: Plugin, settings: BibleRefSettings) {
    this.app = app;
    this.plugin = plugin;
    this.settings = settings;

    // Initialize components
    this.parser = createSmartBibleParser(settings);
    this.titleParser = createTitleParser(settings);
    this.tagGenerator = createTagGenerator(settings);
    this.frontmatterSync = createFrontmatterSync(app, settings);

    // Create debounced sync function
    this.debouncedSync = debounce(
      this.syncFileDebounced.bind(this),
      DEBOUNCE_DELAY,
      true // Leading edge: run immediately, then debounce
    );
  }

  /**
   * Register event listeners based on sync options (checkboxes)
   */
  registerEvents(): void {
    // Clear any existing event listeners
    this.unregisterEvents();

    const { syncOptions } = this.settings;

    // Register save events if onSave is enabled
    if (syncOptions.onSave) {
      this.registerSaveEvents();
    }

    // Register file change events if onFileChange is enabled
    if (syncOptions.onFileChange) {
      this.registerFileChangeEvents();
    }

    // If both are disabled: manual only (no automatic sync)
  }

  /**
   * Unregister all event listeners
   */
  unregisterEvents(): void {
    this.eventRefs.forEach(unregister => unregister());
    this.eventRefs = [];
  }

  /**
   * Sync a single file (with timeout)
   * @param file File to sync
   * @returns Object with sync status
   */
  async syncFile(file: TFile): Promise<{ changed: boolean; tagCount: number; timeout?: boolean }> {
    const timeoutMs = this.settings.syncTimeout?.singleFileMs ?? 30000;

    try {
      return await withTimeout(
        this.syncFileInternal(file),
        timeoutMs,
        'single file sync'
      );
    } catch (error) {
      if (error instanceof SyncTimeoutError) {
        console.warn('SyncManager: Timeout syncing file', file.path);
        return { changed: false, tagCount: 0, timeout: true };
      }
      console.error('SyncManager: Error syncing file', file.path, error);
      return { changed: false, tagCount: 0 };
    }
  }

  /**
   * Internal sync implementation (without timeout)
   */
  private async syncFileInternal(file: TFile): Promise<{ changed: boolean; tagCount: number }> {
    // Skip if frontmatter sync is currently updating (loop prevention)
    if (this.frontmatterSync.isCurrentlyUpdating) {
      return { changed: false, tagCount: 0 };
    }

    // Read file content
    const content = await this.app.vault.read(file);

    // Parse content for references
    const contentRefs = this.parser.parse(content);

    // Parse title for references (if enabled)
    let titleRefs: ParsedReference[] = [];
    if (this.settings.parseTitles) {
      titleRefs = this.titleParser.parse(file.basename);
    }

    // Combine references (title refs + content refs)
    const allRefs = [...titleRefs, ...contentRefs];

    // Generate tags
    const tags = this.tagGenerator.generateTags(allRefs);

    // Sync to frontmatter
    const changed = await this.frontmatterSync.sync(file, tags);

    return { changed, tagCount: tags.length };
  }

  /**
   * Sync all markdown files in the vault (with timeout)
   * @returns Object with sync statistics
   */
  async syncAll(): Promise<{ processed: number; changed: number; timeout?: boolean }> {
    const timeoutMs = this.settings.syncTimeout?.fullVaultMs ?? 300000;

    try {
      return await withTimeout(
        this.syncAllInternal(),
        timeoutMs,
        'full vault sync'
      );
    } catch (error) {
      if (error instanceof SyncTimeoutError) {
        console.warn('SyncManager: Timeout syncing all files');
        return { processed: 0, changed: 0, timeout: true };
      }
      throw error;
    }
  }

  /**
   * Internal sync all implementation (without timeout)
   */
  private async syncAllInternal(): Promise<{ processed: number; changed: number }> {
    const files = this.app.vault.getMarkdownFiles();
    let processed = 0;
    let changed = 0;

    for (const file of files) {
      // Use internal sync to avoid double-timeout
      const result = await this.syncFileInternal(file);
      processed++;
      if (result.changed) {
        changed++;
      }
    }

    return { processed, changed };
  }

  /**
   * Update settings and reinitialize components
   */
  updateSettings(settings: BibleRefSettings): void {
    this.settings = settings;

    // Update all components
    this.parser.updateSettings(settings);
    this.titleParser.updateSettings(settings);
    this.tagGenerator.updateSettings(settings);
    this.frontmatterSync.updateSettings(settings);

    // Re-register events (mode might have changed)
    this.registerEvents();
  }

  /**
   * Get the frontmatter sync instance (for external access)
   */
  getFrontmatterSync(): FrontmatterSync {
    return this.frontmatterSync;
  }

  // ═══════════════════════════════════════════════════════════════
  // PRIVATE: Event Registration
  // ═══════════════════════════════════════════════════════════════

  /**
   * Register save events (modify event)
   */
  private registerSaveEvents(): void {
    const ref = this.plugin.registerEvent(
      this.app.vault.on('modify', (file) => {
        if (file instanceof TFile && file.extension === 'md') {
          this.debouncedSync(file);
        }
      })
    );

    // Store unregister function
    this.eventRefs.push(() => {
      this.app.vault.offref(ref);
    });
  }

  /**
   * Register file change events (active-leaf-change)
   */
  private registerFileChangeEvents(): void {
    const ref = this.plugin.registerEvent(
      this.app.workspace.on('active-leaf-change', (leaf) => {
        if (!leaf) return;

        const file = leaf.view.file;
        if (file instanceof TFile && file.extension === 'md') {
          this.debouncedSync(file);
        }
      })
    );

    this.eventRefs.push(() => {
      this.app.workspace.offref(ref);
    });
  }

  /**
   * Debounced sync wrapper (used by event handlers)
   */
  private async syncFileDebounced(file: TFile): Promise<void> {
    await this.syncFile(file);
  }
}

/**
 * Factory function to create a SyncManager instance
 * @param app Obsidian App instance
 * @param plugin Plugin instance
 * @param settings Plugin settings
 * @returns SyncManager instance
 */
export function createSyncManager(
  app: App,
  plugin: Plugin,
  settings: BibleRefSettings
): SyncManager {
  return new SyncManager(app, plugin, settings);
}
