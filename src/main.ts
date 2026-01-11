import { Plugin, TFile, Notice, WorkspaceLeaf } from 'obsidian';
import type { BibleRefSettings } from './types';
import { DEFAULT_SETTINGS } from './settings/defaultSettings';
import { BibleRefSettingsTab } from './settings/SettingsTab';
import { SyncManager, createSyncManager } from './sync/SyncManager';
import { ConcordanceSidebarView, VIEW_TYPE_CONCORDANCE } from './sidebar/ConcordanceSidebarView';

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
  settings: BibleRefSettings;
  syncManager: SyncManager;

  /**
   * Plugin Load
   * Wird beim Start von Obsidian oder beim Aktivieren des Plugins aufgerufen.
   */
  async onload(): Promise<void> {
    console.log('Loading Bible Reference Mapper Plugin');

    // Load settings
    await this.loadSettings();

    // Initialize SyncManager
    this.syncManager = createSyncManager(this.app, this, this.settings);

    // Register event listeners based on sync mode
    this.syncManager.registerEvents();

    // Register sidebar view
    this.registerView(
      VIEW_TYPE_CONCORDANCE,
      (leaf) => new ConcordanceSidebarView(leaf, this)
    );

    // Add ribbon icon to open sidebar
    this.addRibbonIcon('book-open', 'Open Bible References', () => {
      this.activateSidebarView();
    });

    // Add settings tab
    this.addSettingTab(
      new BibleRefSettingsTab(
        this.app,
        this,
        this.settings,
        this.onSettingsChange.bind(this)
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
      name: 'Open Bible References Sidebar',
      callback: () => {
        this.activateSidebarView();
      }
    });

    // Command: Sync Current File
    this.addCommand({
      id: 'sync-current-file',
      name: 'Sync Current File',
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
      name: 'Sync All Files',
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
      new Notice('No markdown file is currently open');
      return;
    }

    try {
      const result = await this.syncManager.syncFile(activeFile);

      if (result.changed) {
        new Notice(
          `✓ Synced: ${result.tagCount} Bible reference(s) found`
        );
      } else {
        new Notice('No changes detected');
      }
    } catch (error) {
      console.error('Error syncing current file:', error);
      new Notice('Error syncing file. Check console for details.');
    }
  }

  /**
   * Sync All Files
   * Synchronisiert alle Markdown-Dateien im Vault.
   */
  private async syncAllFiles(): Promise<void> {
    const startTime = Date.now();
    new Notice('Syncing all files...');

    try {
      const result = await this.syncManager.syncAll();
      const duration = ((Date.now() - startTime) / 1000).toFixed(1);

      new Notice(
        `✓ Sync complete: ${result.changed}/${result.processed} files updated (${duration}s)`
      );
    } catch (error) {
      console.error('Error syncing all files:', error);
      new Notice('Error syncing files. Check console for details.');
    }
  }

  /**
   * Load Settings
   * Lädt gespeicherte Settings oder verwendet Default-Werte.
   */
  async loadSettings(): Promise<void> {
    const data = await this.loadData();
    this.settings = Object.assign({}, DEFAULT_SETTINGS, data);
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
