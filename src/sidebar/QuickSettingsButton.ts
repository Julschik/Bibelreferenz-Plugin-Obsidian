import { setIcon } from 'obsidian';
import type BibleRefPlugin from '../main';
import type { I18nService } from '../i18n/I18nService';
import type { ReferenceSortMode } from '../types';

/**
 * QuickSettingsButton
 *
 * A gear icon button in the sidebar header that opens an in-sidebar popup
 * with frequently-changed settings like tag granularity.
 * The popup appears within the sidebar with a darkened overlay behind it.
 */
export class QuickSettingsButton {
  private buttonEl: HTMLButtonElement;
  private plugin: BibleRefPlugin;
  private i18n: I18nService;
  private onSyncCallback: () => Promise<void>;
  private onSortModeChange: (mode: ReferenceSortMode) => void;
  private getCurrentSortMode: () => ReferenceSortMode;
  private sidebarEl: HTMLElement;
  private popupEl: HTMLElement | null = null;
  private overlayEl: HTMLElement | null = null;

  constructor(
    containerEl: HTMLElement,
    plugin: BibleRefPlugin,
    i18n: I18nService,
    onSync: () => Promise<void>,
    onSortModeChange: (mode: ReferenceSortMode) => void,
    getCurrentSortMode: () => ReferenceSortMode
  ) {
    this.plugin = plugin;
    this.i18n = i18n;
    this.onSyncCallback = onSync;
    this.onSortModeChange = onSortModeChange;
    this.getCurrentSortMode = getCurrentSortMode;
    // Get the sidebar container (parent of the header)
    this.sidebarEl = containerEl.closest('.bible-ref-sidebar') as HTMLElement;
    this.render(containerEl);
  }

  private render(containerEl: HTMLElement): void {
    this.buttonEl = containerEl.createEl('button', {
      cls: 'clickable-icon bible-ref-quick-settings-button',
      attr: { title: this.i18n.t('quickSettingsTooltip') }
    });

    const iconSpan = this.buttonEl.createSpan({ cls: 'bible-ref-quick-settings-icon' });
    setIcon(iconSpan, 'git-fork');

    this.buttonEl.addEventListener('click', () => this.togglePopup());
  }

  private togglePopup(): void {
    if (this.popupEl) {
      this.closePopup();
    } else {
      this.openPopup();
    }
  }

  private openPopup(): void {
    if (!this.sidebarEl) return;

    // Create overlay
    this.overlayEl = this.sidebarEl.createDiv('bible-ref-quick-settings-overlay');
    this.overlayEl.addEventListener('click', () => this.closePopup());

    // Create popup
    this.popupEl = this.sidebarEl.createDiv('bible-ref-quick-settings-popup');
    this.renderPopupContent();

    // Mark button as active
    this.buttonEl.addClass('is-active');
  }

  private closePopup(): void {
    if (this.overlayEl) {
      this.overlayEl.remove();
      this.overlayEl = null;
    }
    if (this.popupEl) {
      this.popupEl.remove();
      this.popupEl = null;
    }
    this.buttonEl.removeClass('is-active');
  }

  private renderPopupContent(): void {
    if (!this.popupEl) return;

    const currentGranularity = this.plugin.settings.graphTagGranularity || 'verse';
    const writeToTags = this.plugin.settings.writeToTagsField;

    // Header
    const headerEl = this.popupEl.createDiv('bible-ref-quick-settings-header');
    headerEl.createSpan({ text: this.i18n.t('quickSettingsTitle') });

    const closeBtn = headerEl.createEl('button', {
      cls: 'clickable-icon bible-ref-quick-settings-close'
    });
    setIcon(closeBtn, 'x');
    closeBtn.addEventListener('click', () => this.closePopup());

    // Content
    const contentEl = this.popupEl.createDiv('bible-ref-quick-settings-content');

    // ═══════════════════════════════════════════════════════════════
    // Graph View Card
    // ═══════════════════════════════════════════════════════════════
    const graphCard = contentEl.createDiv('bible-ref-settings-card');

    // Card header with title and toggle
    const graphCardHeader = graphCard.createDiv('bible-ref-settings-card-header');
    graphCardHeader.createSpan({
      text: this.i18n.t('settingsGraphViewSection'),
      cls: 'bible-ref-settings-card-title'
    });

    // Toggle switch in header
    const toggleEl = graphCardHeader.createEl('label', { cls: 'bible-ref-quick-settings-toggle' });
    const checkbox = toggleEl.createEl('input', { type: 'checkbox' });
    checkbox.checked = writeToTags;
    toggleEl.createSpan({ cls: 'bible-ref-toggle-slider' });
    checkbox.addEventListener('change', async () => {
      this.plugin.settings.writeToTagsField = checkbox.checked;
      await this.plugin.saveSettings();
      this.refreshPopup();
    });

    // Granularity section (only if writeToTags is enabled)
    if (writeToTags) {
      const granularitySection = graphCard.createDiv('bible-ref-quick-settings-section');
      granularitySection.createDiv({
        text: this.i18n.t('quickSettingsGranularity'),
        cls: 'bible-ref-quick-settings-section-title'
      });

      const granularities: Array<{ id: 'book' | 'chapter' | 'verse'; label: string }> = [
        { id: 'book', label: this.i18n.t('graphGranularityBook') },
        { id: 'chapter', label: this.i18n.t('graphGranularityChapter') },
        { id: 'verse', label: this.i18n.t('graphGranularityVerse') }
      ];

      for (const g of granularities) {
        const optionEl = granularitySection.createDiv({
          cls: `bible-ref-quick-settings-option ${currentGranularity === g.id ? 'is-selected' : ''}`
        });

        // Custom indicator with checkmark
        const indicator = optionEl.createDiv({ cls: 'bible-ref-option-indicator' });
        indicator.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>';

        optionEl.createSpan({ text: g.label });

        optionEl.addEventListener('click', async () => {
          this.plugin.settings.graphTagGranularity = g.id;
          await this.plugin.saveSettings();
          this.refreshPopup();
        });
      }
    }

    // ═══════════════════════════════════════════════════════════════
    // Sort Order Card
    // ═══════════════════════════════════════════════════════════════
    const sortCard = contentEl.createDiv('bible-ref-settings-card');

    // Card header
    const sortCardHeader = sortCard.createDiv('bible-ref-settings-card-header');
    sortCardHeader.createSpan({
      text: this.i18n.t('sortOrderSection'),
      cls: 'bible-ref-settings-card-title'
    });

    const currentSort = this.getCurrentSortMode();
    const sortOptions: Array<{ id: ReferenceSortMode; labelKey: string }> = [
      { id: 'document', labelKey: 'sortDocument' },
      { id: 'canonical', labelKey: 'sortCanonical' },
      { id: 'alpha-asc', labelKey: 'sortAlphaAsc' },
      { id: 'alpha-desc', labelKey: 'sortAlphaDesc' },
      { id: 'count', labelKey: 'sortCount' }
    ];

    for (const option of sortOptions) {
      const optionEl = sortCard.createDiv({
        cls: `bible-ref-quick-settings-option ${currentSort === option.id ? 'is-selected' : ''}`
      });

      const indicator = optionEl.createDiv({ cls: 'bible-ref-option-indicator' });
      indicator.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>';

      optionEl.createSpan({ text: this.i18n.t(option.labelKey) });

      optionEl.addEventListener('click', () => {
        this.onSortModeChange(option.id);
        this.refreshPopup();
      });
    }

    // Sync button
    const syncSection = contentEl.createDiv('bible-ref-quick-settings-sync');
    const syncBtn = syncSection.createEl('button', {
      text: this.i18n.t('settingsApplyAndSyncButton'),
      cls: 'mod-cta bible-ref-quick-settings-sync-btn'
    });
    syncBtn.addEventListener('click', async () => {
      syncBtn.disabled = true;
      syncBtn.setText(this.i18n.t('syncButtonSyncing'));
      try {
        await this.onSyncCallback();
      } finally {
        syncBtn.disabled = false;
        syncBtn.setText(this.i18n.t('settingsApplyAndSyncButton'));
      }
    });
  }

  private refreshPopup(): void {
    if (this.popupEl) {
      this.popupEl.empty();
      this.renderPopupContent();
    }
  }

  /**
   * Update button tooltip when language changes
   */
  updateLocale(i18n: I18nService): void {
    this.i18n = i18n;
    this.buttonEl.setAttribute('title', this.i18n.t('quickSettingsTooltip'));
  }
}
