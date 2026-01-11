import { App, Plugin, TFile, debounce, Debouncer } from 'obsidian';
import type { BibleRefSettings, ParsedReference } from '../types';
import { SmartBibleParser, createSmartBibleParser } from '../parser/SmartBibleParser';
import { TitleParser, createTitleParser } from '../parser/TitleParser';
import { TagGenerator, createTagGenerator } from './TagGenerator';
import { FrontmatterSync, createFrontmatterSync } from './FrontmatterSync';
import { DEBOUNCE_DELAY } from '../constants';

/**
 * SyncManager
 *
 * Manages the synchronization of Bible references to frontmatter.
 * Handles event registration based on sync mode and coordinates all sync operations.
 *
 * Sync Modes:
 * - on-save-or-change: Sync on both save (Ctrl+S) and file change (default)
 * - on-save: Only sync on save
 * - on-file-change: Only sync when switching files
 * - manual: No automatic sync (user must trigger via command or button)
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
      this.syncFileInternal.bind(this),
      DEBOUNCE_DELAY,
      true // Leading edge: run immediately, then debounce
    );
  }

  /**
   * Register event listeners based on sync mode
   */
  registerEvents(): void {
    // Clear any existing event listeners
    this.unregisterEvents();

    const mode = this.settings.syncMode;

    switch (mode) {
      case 'on-save-or-change':
        this.registerSaveEvents();
        this.registerFileChangeEvents();
        break;

      case 'on-save':
        this.registerSaveEvents();
        break;

      case 'on-file-change':
        this.registerFileChangeEvents();
        break;

      case 'manual':
        // No automatic sync
        break;
    }
  }

  /**
   * Unregister all event listeners
   */
  unregisterEvents(): void {
    this.eventRefs.forEach(unregister => unregister());
    this.eventRefs = [];
  }

  /**
   * Sync a single file
   * @param file File to sync
   * @returns Object with sync status
   */
  async syncFile(file: TFile): Promise<{ changed: boolean; tagCount: number }> {
    try {
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
    } catch (error) {
      console.error('SyncManager: Error syncing file', file.path, error);
      return { changed: false, tagCount: 0 };
    }
  }

  /**
   * Sync all markdown files in the vault
   * @returns Object with sync statistics
   */
  async syncAll(): Promise<{ processed: number; changed: number }> {
    const files = this.app.vault.getMarkdownFiles();
    let processed = 0;
    let changed = 0;

    for (const file of files) {
      const result = await this.syncFile(file);
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
   * Internal sync implementation (used by debounced version)
   */
  private async syncFileInternal(file: TFile): Promise<void> {
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
