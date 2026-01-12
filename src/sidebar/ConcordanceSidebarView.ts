import { ItemView, WorkspaceLeaf, TFile, MarkdownView, setIcon } from 'obsidian';
import type BibleRefPlugin from '../main';
import type { ExpandedReference } from '../types';
import { SyncButton } from './SyncButton';
import { QuickSettingsButton } from './QuickSettingsButton';
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
  private quickSettingsButton: QuickSettingsButton;
  private currentFile: TFile | null = null;
  private currentReferences: ExpandedReference[] = [];
  private activeTab: TabId = 'direct';

  // Tab components
  private directTab: DirectReferencesTab;
  private parallelTab: ParallelVersesTab;
  private globalTab: GlobalBrowserTab;

  // UI elements
  private tabContentEl: HTMLElement;
  private expandAllBtn: HTMLElement | null = null;
  private allExpandedState: boolean = false;

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

    // Create button container for expand/collapse + sync buttons
    const buttonContainerEl = headerEl.createDiv('bible-ref-header-buttons');

    // Create expand/collapse all button
    this.renderExpandCollapseButton(buttonContainerEl);

    // Create sync button
    this.syncButton = new SyncButton(buttonContainerEl, this.plugin.i18n, async () => {
      await this.syncCurrentFile();
    });

    // Create quick settings button
    this.quickSettingsButton = new QuickSettingsButton(
      buttonContainerEl,
      this.plugin,
      this.plugin.i18n,
      async () => {
        await this.plugin.syncAllFiles();
      }
    );

    // Create tab bar
    this.renderTabBar(contentEl);

    // Create tab content area
    this.tabContentEl = contentEl.createDiv('bible-ref-tab-content');

    // Listen for manual expand/collapse in tabs to update button icon
    this.tabContentEl.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('.bible-ref-expandable-header')) {
        // Wait for DOM update, then update icon
        setTimeout(() => this.updateExpandCollapseIcon(), 50);
      }
    });

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
   * Render expand/collapse all button
   */
  private renderExpandCollapseButton(containerEl: HTMLElement): void {
    this.expandAllBtn = containerEl.createEl('button', {
      cls: 'clickable-icon bible-ref-expand-all-button',
      attr: {
        'title': 'Expand/Collapse all items'
      }
    });

    const iconSpan = this.expandAllBtn.createSpan({ cls: 'bible-ref-expand-all-icon' });
    // Start with "expand" icon (arrows apart) since all items start collapsed
    setIcon(iconSpan, 'chevrons-up-down');

    this.expandAllBtn.addEventListener('click', () => {
      this.toggleExpandAllInCurrentTab();
    });
  }

  /**
   * Update expand/collapse button icon based on current state
   * Icon shows "expand" (chevrons apart) if all collapsed, "collapse" (chevrons together) if any expanded
   */
  private updateExpandCollapseIcon(): void {
    if (!this.expandAllBtn || !this.tabContentEl) return;

    const expandables = this.tabContentEl.querySelectorAll('.bible-ref-expandable');
    if (expandables.length === 0) return;

    // Check if any item is expanded
    const anyExpanded = Array.from(expandables).some(el =>
      el.classList.contains('expanded')
    );

    // Update icon based on state
    const iconSpan = this.expandAllBtn.querySelector('.bible-ref-expand-all-icon');
    if (iconSpan) {
      // If any expanded, show "collapse" icon (arrows together)
      // If none expanded, show "expand" icon (arrows apart)
      setIcon(iconSpan as HTMLElement, anyExpanded ? 'chevrons-down-up' : 'chevrons-up-down');
    }
  }

  /**
   * Toggle expand/collapse all for current tab
   */
  private toggleExpandAllInCurrentTab(): void {
    if (!this.tabContentEl) return;

    const expandables = this.tabContentEl.querySelectorAll('.bible-ref-expandable');
    if (expandables.length === 0) return;

    // Check if all are expanded
    const allExpanded = Array.from(expandables).every(el =>
      el.classList.contains('expanded')
    );

    // Toggle all
    const newState = !allExpanded;
    for (const expandable of expandables) {
      const header = expandable.querySelector('.bible-ref-expandable-header') as HTMLElement;
      const content = expandable.querySelector('.bible-ref-parallel-files') as HTMLElement;
      const icon = expandable.querySelector('.bible-ref-expand-icon') as HTMLElement;

      if (header && content && icon) {
        content.style.display = newState ? 'block' : 'none';
        setIcon(icon, newState ? 'chevron-down' : 'chevron-right');

        if (newState) {
          expandable.addClass('expanded');
        } else {
          expandable.removeClass('expanded');
        }
      }
    }

    this.allExpandedState = newState;
    this.updateExpandCollapseIcon();
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

    // Update expand/collapse button icon based on new tab content
    this.updateExpandCollapseIcon();
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
