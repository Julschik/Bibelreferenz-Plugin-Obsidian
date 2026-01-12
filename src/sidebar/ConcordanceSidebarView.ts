import { ItemView, WorkspaceLeaf, TFile, MarkdownView, setIcon } from 'obsidian';
import type BibleRefPlugin from '../main';
import type { ExpandedReference } from '../types';
import { SyncButton } from './SyncButton';
import { DirectReferencesTab } from './tabs/DirectReferencesTab';
import { ParallelVersesTab } from './tabs/ParallelVersesTab';
import { GlobalBrowserTab } from './tabs/GlobalBrowserTab';

/**
 * Bible Reference Concordance Sidebar View
 *
 * Redesigned with 3 tabs:
 * - Tab 1: Direct References (notes sharing verses with current)
 * - Tab 2: Parallels (co-occurrence based)
 * - Tab 3: All (global browser)
 *
 * Architecture:
 * - ItemView ist die Basis-Klasse für Sidebar-Views in Obsidian
 * - Tab components handle their own rendering
 */
export const VIEW_TYPE_CONCORDANCE = 'bible-ref-concordance';

type TabId = 'direct' | 'parallel' | 'global';

export class ConcordanceSidebarView extends ItemView {
  private plugin: BibleRefPlugin;
  private syncButton: SyncButton;
  private currentFile: TFile | null = null;
  private currentReferences: ExpandedReference[] = [];
  private activeTab: TabId = 'direct';

  // Tab components
  private directTab: DirectReferencesTab;
  private parallelTab: ParallelVersesTab;
  private globalTab: GlobalBrowserTab;

  // UI elements
  private tabContentEl: HTMLElement;

  constructor(leaf: WorkspaceLeaf, plugin: BibleRefPlugin) {
    super(leaf);
    this.plugin = plugin;
  }

  /**
   * View Type Identifier
   */
  getViewType(): string {
    return VIEW_TYPE_CONCORDANCE;
  }

  /**
   * Display Text
   */
  getDisplayText(): string {
    return this.plugin.i18n.t('sidebarTitle');
  }

  /**
   * Icon
   */
  getIcon(): string {
    return 'book-open';
  }

  /**
   * onOpen
   */
  async onOpen(): Promise<void> {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass('bible-ref-sidebar');

    // Initialize tab components
    this.directTab = new DirectReferencesTab(this.app, this.plugin.i18n, this.plugin.settings);
    this.parallelTab = new ParallelVersesTab(this.app, this.plugin.i18n, this.plugin.settings);
    this.globalTab = new GlobalBrowserTab(this.app, this.plugin.i18n, this.plugin.settings);

    // Create header
    const headerEl = contentEl.createDiv('bible-ref-header');
    headerEl.createEl('h4', {
      text: this.plugin.i18n.t('sidebarTitle'),
      cls: 'bible-ref-title'
    });

    // Create sync button
    this.syncButton = new SyncButton(headerEl, this.plugin.i18n, async () => {
      await this.syncCurrentFile();
    });

    // Create tab bar
    this.renderTabBar(contentEl);

    // Create tab content area
    this.tabContentEl = contentEl.createDiv('bible-ref-tab-content');

    // Register events
    this.registerEvent(
      this.app.workspace.on('file-open', (file) => {
        this.onFileOpen(file);
      })
    );

    this.registerEvent(
      this.app.workspace.on('editor-change', (editor, view) => {
        if (view instanceof MarkdownView && view.file) {
          this.onFileModified(view.file);
        }
      })
    );

    // Initial load
    const activeFile = this.app.workspace.getActiveFile();
    if (activeFile) {
      await this.onFileOpen(activeFile);
    } else {
      this.renderActiveTab();
    }
  }

  /**
   * onClose
   */
  async onClose(): Promise<void> {
    if (this.syncButton) {
      this.syncButton.destroy();
    }
  }

  /**
   * Render tab bar
   */
  private renderTabBar(containerEl: HTMLElement): void {
    const tabBarEl = containerEl.createDiv('bible-ref-tabs');

    const tabs: { id: TabId; labelKey: 'sidebarTabDirect' | 'sidebarTabParallel' | 'sidebarTabGlobal'; icon: string }[] = [
      { id: 'direct', labelKey: 'sidebarTabDirect', icon: 'book-open' },
      { id: 'parallel', labelKey: 'sidebarTabParallel', icon: 'link' },
      { id: 'global', labelKey: 'sidebarTabGlobal', icon: 'search' }
    ];

    for (const tab of tabs) {
      const tabEl = tabBarEl.createEl('button', {
        cls: `bible-ref-tab ${this.activeTab === tab.id ? 'active' : ''}`,
        attr: {
          'data-tab': tab.id,
          'aria-label': this.plugin.i18n.t(tab.labelKey)
        }
      });

      const iconSpan = tabEl.createSpan({ cls: 'tab-icon' });
      setIcon(iconSpan, tab.icon);
      tabEl.createSpan({ text: this.plugin.i18n.t(tab.labelKey), cls: 'tab-text' });

      tabEl.addEventListener('click', () => {
        this.activeTab = tab.id;
        this.updateTabBar(tabBarEl);
        this.renderActiveTab();
      });
    }
  }

  /**
   * Update tab bar active state
   */
  private updateTabBar(tabBarEl: HTMLElement): void {
    const tabs = tabBarEl.querySelectorAll('.bible-ref-tab');
    tabs.forEach((tabEl) => {
      const tabId = tabEl.getAttribute('data-tab');
      if (tabId === this.activeTab) {
        tabEl.addClass('active');
      } else {
        tabEl.removeClass('active');
      }
    });
  }

  /**
   * Render the active tab content
   */
  private renderActiveTab(): void {
    if (!this.tabContentEl) return;

    // Update tab data
    this.directTab.setData(this.currentFile, this.currentReferences);
    this.parallelTab.setData(this.currentFile, this.currentReferences);

    // Update settings in case they changed
    this.directTab.updateSettings(this.plugin.settings);
    this.parallelTab.updateSettings(this.plugin.settings);
    this.globalTab.updateSettings(this.plugin.settings);

    // Render active tab
    switch (this.activeTab) {
      case 'direct':
        this.directTab.render(this.tabContentEl);
        break;
      case 'parallel':
        this.parallelTab.render(this.tabContentEl);
        break;
      case 'global':
        this.globalTab.render(this.tabContentEl);
        break;
    }
  }

  /**
   * File Opened Event
   */
  private async onFileOpen(file: TFile | null): Promise<void> {
    this.currentFile = file;

    if (!file) {
      this.currentReferences = [];
      this.renderActiveTab();
      return;
    }

    await this.loadReferences(file);
    this.renderActiveTab();
  }

  /**
   * File Modified Event
   */
  private async onFileModified(file: TFile): Promise<void> {
    if (this.currentFile?.path !== file.path) {
      return;
    }

    await this.loadReferences(file);
    this.renderActiveTab();
  }

  /**
   * Load References from frontmatter
   */
  private async loadReferences(file: TFile): Promise<void> {
    try {
      const cache = this.app.metadataCache.getFileCache(file);

      if (!cache?.frontmatter) {
        this.currentReferences = [];
        return;
      }

      const frontmatterKey = this.plugin.settings.frontmatterKey || '_bible_refs';
      const refs = cache.frontmatter[frontmatterKey];

      if (!refs || !Array.isArray(refs)) {
        this.currentReferences = [];
        return;
      }

      this.currentReferences = this.parseTagsToExpandedRefs(refs);
    } catch (error) {
      console.error('Error loading references:', error);
      this.currentReferences = [];
    }
  }

  /**
   * Parse tags to ExpandedReference objects
   */
  private parseTagsToExpandedRefs(tags: string[]): ExpandedReference[] {
    const tagPrefix = this.plugin.settings.tagPrefix || 'bible/';
    const references: ExpandedReference[] = [];

    for (const tag of tags) {
      if (!tag.startsWith(tagPrefix)) {
        continue;
      }

      const tagContent = tag.slice(tagPrefix.length);
      const parts = tagContent.split('/');

      if (parts.length !== 3) {
        continue;
      }

      const bookId = parts[0];
      const chapter = parseInt(parts[1], 10);
      const verse = parseInt(parts[2], 10);

      if (isNaN(chapter) || isNaN(verse)) {
        continue;
      }

      references.push({ bookId, chapter, verse });
    }

    return references;
  }

  /**
   * Sync Current File
   */
  private async syncCurrentFile(): Promise<void> {
    if (!this.currentFile) {
      return;
    }

    this.syncButton.setLoading(true);

    try {
      const result = await this.plugin.syncManager.syncFile(this.currentFile);
      await this.loadReferences(this.currentFile);
      this.renderActiveTab();

      if (result.timeout) {
        this.syncButton.setTimeoutState();
      } else {
        this.syncButton.setSuccess();
      }
    } catch (error) {
      console.error('Error syncing file:', error);
      this.syncButton.setError();
    }
  }
}
