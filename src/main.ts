import { Plugin, TFile, Notice, WorkspaceLeaf } from 'obsidian';
import type { BibleRefSettings, SyncMode, CustomBookMappingsV2, BookMappingCustomization } from './types';
import { DEFAULT_SETTINGS, createDefaultSettings } from './settings/defaultSettings';
import { detectSystemLocale } from './i18n/I18nService';
import { BibleRefSettingsTab } from './settings/SettingsTab';
import { SyncManager, createSyncManager } from './sync/SyncManager';
import { ConcordanceSidebarView, VIEW_TYPE_CONCORDANCE } from './sidebar/ConcordanceSidebarView';
import { I18nService, createI18nService } from './i18n/I18nService';
import { MigrationService } from './migration/MigrationService';

/**
 * Bible Reference Mapper Plugin
 *
 * Main Plugin Entry Point.
 * Registriert Commands, Settings Tab und initialisiert SyncManager.
 *
 * Architecture:
 * Plugin → SyncManager → Parser + TagGenerator + FrontmatterSync
 */
export default class BibleRefPlugin extends Plugin {
  settings!: BibleRefSettings;
  syncManager!: SyncManager;
  i18n!: I18nService;
  migrationService!: MigrationService;

  /**
   * Plugin Load
   * Wird beim Start von Obsidian oder beim Aktivieren des Plugins aufgerufen.
   */
  async onload(): Promise<void> {
    console.log('Loading Bible Reference Mapper Plugin');

    // Load settings (includes migration)
    await this.loadSettings();

    // Initialize I18nService
    this.i18n = createI18nService(this.settings.uiLanguage);

    // Initialize MigrationService
    this.migrationService = new MigrationService(
      this.app,
      this.settings,
      this.saveSettings.bind(this)
    );

    // Resume any pending migrations
    await this.migrationService.resumeMigrations();

    // Initialize SyncManager
    this.syncManager = createSyncManager(this.app, this, this.settings);

    // Register event listeners based on sync options
    this.syncManager.registerEvents();

    // Register sidebar view
    this.registerView(
      VIEW_TYPE_CONCORDANCE,
      (leaf) => new ConcordanceSidebarView(leaf, this)
    );

    // Open sidebar automatically when workspace is ready
    this.app.workspace.onLayoutReady(() => {
      this.activateSidebarView();
    });

    // Add ribbon icon to open sidebar
    this.addRibbonIcon('book-open', this.i18n.t('commandOpenSidebar'), () => {
      this.activateSidebarView();
    });

    // Add settings tab
    this.addSettingTab(
      new BibleRefSettingsTab(
        this.app,
        this,
        this.settings,
        this.i18n,
        this.onSettingsChange.bind(this),
        this.syncAllFiles.bind(this)
      )
    );

    // Register commands
    this.registerCommands();

    console.log('Bible Reference Mapper Plugin loaded successfully');
  }

  /**
   * Plugin Unload
   * Wird beim Deaktivieren des Plugins aufgerufen.
   */
  onunload(): void {
    console.log('Unloading Bible Reference Mapper Plugin');

    // Unregister all event listeners
    this.syncManager.unregisterEvents();

    // Detach all sidebar views
    this.app.workspace.detachLeavesOfType(VIEW_TYPE_CONCORDANCE);
  }

  /**
   * Register Commands
   * Fügt Commands zur Command Palette hinzu.
   */
  private registerCommands(): void {
    // Command: Open Bible References Sidebar
    this.addCommand({
      id: 'open-bible-references',
      name: this.i18n.t('commandOpenSidebar'),
      callback: () => {
        this.activateSidebarView();
      }
    });

    // Command: Sync Current File
    this.addCommand({
      id: 'sync-current-file',
      name: this.i18n.t('commandSyncCurrent'),
      checkCallback: (checking: boolean) => {
        const activeFile = this.app.workspace.getActiveFile();

        if (activeFile && activeFile.extension === 'md') {
          if (!checking) {
            this.syncCurrentFile();
          }
          return true;
        }

        return false;
      }
    });

    // Command: Sync All Files
    this.addCommand({
      id: 'sync-all-files',
      name: this.i18n.t('commandSyncAll'),
      callback: () => {
        this.syncAllFiles();
      }
    });
  }

  /**
   * Sync Current File
   * Synchronisiert die aktuell geöffnete Datei.
   */
  private async syncCurrentFile(): Promise<void> {
    const activeFile = this.app.workspace.getActiveFile();

    if (!activeFile || activeFile.extension !== 'md') {
      new Notice(this.i18n.t('noticeNoFile'));
      return;
    }

    try {
      const result = await this.syncManager.syncFile(activeFile);

      if (result.changed) {
        new Notice(this.i18n.t('noticeSynced', { count: result.tagCount }));
      } else {
        new Notice(this.i18n.t('noticeNoChanges'));
      }
    } catch (error) {
      console.error('Error syncing current file:', error);
      new Notice(this.i18n.t('noticeError'));
    }
  }

  /**
   * Sync All Files
   * Synchronisiert alle Markdown-Dateien im Vault.
   * Public for access from sidebar QuickSettingsButton.
   */
  async syncAllFiles(): Promise<void> {
    const startTime = Date.now();
    new Notice(this.i18n.t('syncButtonSyncing'));

    try {
      const result = await this.syncManager.syncAll();
      const duration = ((Date.now() - startTime) / 1000).toFixed(1);

      new Notice(
        this.i18n.t('noticeSyncAll', {
          changed: result.changed,
          total: result.processed,
          duration
        })
      );
    } catch (error) {
      console.error('Error syncing all files:', error);
      new Notice(this.i18n.t('noticeError'));
    }
  }

  /**
   * Load Settings
   * Laedt gespeicherte Settings oder verwendet Default-Werte.
   * Fuehrt notwendige Migrationen durch.
   */
  async loadSettings(): Promise<void> {
    const data = await this.loadData();

    // On first load (no saved data), detect system locale
    // Otherwise use static defaults for backward compatibility
    const defaults = data ? DEFAULT_SETTINGS : createDefaultSettings(detectSystemLocale());
    this.settings = Object.assign({}, defaults, data);

    let needsSave = false;
    let migrationCount = 0;

    // ═══════════════════════════════════════════════════════════════
    // MIGRATION 1: syncMode → syncOptions
    // ═══════════════════════════════════════════════════════════════
    if ((this.settings as any).syncMode !== undefined) {
      const oldMode = (this.settings as any).syncMode as SyncMode;
      this.settings.syncOptions = {
        onSave: oldMode === 'on-save' || oldMode === 'on-save-or-change',
        onFileChange: oldMode === 'on-file-change' || oldMode === 'on-save-or-change'
      };
      delete (this.settings as any).syncMode;
      needsSave = true;
      console.log('Migration: syncMode → syncOptions completed');
    }

    // ═══════════════════════════════════════════════════════════════
    // MIGRATION 2: frontmatterKey 'bible-refs' → '_bible_refs'
    // ═══════════════════════════════════════════════════════════════
    if (this.settings.frontmatterKey === 'bible-refs') {
      // Migrate existing files
      migrationCount = await this.migrateFrontmatterKey('bible-refs', '_bible_refs');
      this.settings.frontmatterKey = '_bible_refs';
      needsSave = true;
      console.log(`Migration: frontmatterKey 'bible-refs' → '_bible_refs' (${migrationCount} files)`);
    }

    // ═══════════════════════════════════════════════════════════════
    // MIGRATION 3: Add new settings with defaults
    // ═══════════════════════════════════════════════════════════════
    if (this.settings.uiLanguage === undefined) {
      this.settings.uiLanguage = 'de';
      needsSave = true;
    }
    if (this.settings.linkBehavior === undefined) {
      this.settings.linkBehavior = 'same-tab';
      needsSave = true;
    }
    if (this.settings.syncOptions === undefined) {
      this.settings.syncOptions = { onSave: true, onFileChange: false };
      needsSave = true;
    }

    // ═══════════════════════════════════════════════════════════════
    // MIGRATION 4: customBookMappings V1 → V2
    // ═══════════════════════════════════════════════════════════════
    if (
      this.settings.customBookMappings &&
      Object.keys(this.settings.customBookMappings).length > 0 &&
      !this.settings.customBookMappingsV2
    ) {
      console.log('Migrating custom book mappings from V1 to V2');

      const v2: CustomBookMappingsV2 = {};

      for (const [alias, bookId] of Object.entries(this.settings.customBookMappings)) {
        // Validate bookId exists (optional validation)
        // For now, we trust the data and just migrate
        if (!v2[bookId]) {
          v2[bookId] = { canonicalId: bookId };
        }

        if (!v2[bookId].aliasesAdditions) {
          v2[bookId].aliasesAdditions = [];
        }

        v2[bookId].aliasesAdditions!.push(alias);
      }

      this.settings.customBookMappingsV2 = v2;
      needsSave = true;
      console.log('Migration: customBookMappings V1 → V2 completed');

      // Show migration notice to user
      this.app.workspace.onLayoutReady(() => {
        new Notice(this.i18n.t('noticeMigration', { count: Object.keys(v2).length }));
      });
    }

    if (needsSave) {
      await this.saveSettings();

      // Show migration notice if files were migrated
      if (migrationCount > 0) {
        // Delay notice until app is ready
        this.app.workspace.onLayoutReady(() => {
          // Use default German text since i18n isn't initialized yet
          new Notice(`${migrationCount} Dateien zum neuen Format migriert`);
        });
      }
    }
  }

  /**
   * Migrate frontmatter key in all files
   * @param oldKey Old frontmatter key
   * @param newKey New frontmatter key
   * @returns Number of files migrated
   */
  private async migrateFrontmatterKey(oldKey: string, newKey: string): Promise<number> {
    const files = this.app.vault.getMarkdownFiles();
    let migratedCount = 0;

    for (const file of files) {
      try {
        await this.app.fileManager.processFrontMatter(file, (frontmatter) => {
          if (frontmatter[oldKey] !== undefined) {
            frontmatter[newKey] = frontmatter[oldKey];
            delete frontmatter[oldKey];
            migratedCount++;
          }
        });
      } catch (error) {
        console.error(`Migration error for file ${file.path}:`, error);
      }
    }

    return migratedCount;
  }

  /**
   * Save Settings
   * Speichert aktuelle Settings persistent.
   */
  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }

  /**
   * Settings Change Handler
   * Wird aufgerufen, wenn User Settings im Settings Tab ändert.
   */
  private async onSettingsChange(newSettings: BibleRefSettings): Promise<void> {
    this.settings = newSettings;
    await this.saveSettings();

    // Update I18n locale if language changed
    if (this.i18n.getLocale() !== newSettings.uiLanguage) {
      this.i18n.setLocale(newSettings.uiLanguage);
    }

    // Update SyncManager with new settings
    this.syncManager.updateSettings(newSettings);

    console.log('Settings updated:', newSettings);
  }

  /**
   * Activate Sidebar View
   * Öffnet die Bible References Sidebar in der Right Sidebar.
   */
  async activateSidebarView(): Promise<void> {
    const { workspace } = this.app;

    // Check if view is already open
    let leaf: WorkspaceLeaf | null = null;
    const leaves = workspace.getLeavesOfType(VIEW_TYPE_CONCORDANCE);

    if (leaves.length > 0) {
      // View already exists, reveal it
      leaf = leaves[0];
      workspace.revealLeaf(leaf);
      return;
    }

    // Create new view in right sidebar
    leaf = workspace.getRightLeaf(false);
    if (leaf) {
      await leaf.setViewState({
        type: VIEW_TYPE_CONCORDANCE,
        active: true
      });
      workspace.revealLeaf(leaf);
    }
  }
}
