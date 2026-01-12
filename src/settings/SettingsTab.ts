import { App, PluginSettingTab, Setting } from 'obsidian';
import type { BibleRefSettings, LinkBehavior, BookMapping } from '../types';
import type BibleRefPlugin from '../main';
import type { I18nService } from '../i18n/I18nService';
import { LANGUAGE_PRESETS } from './presets';
import { createDefaultSettings } from './defaultSettings';
import { CollapsibleSection } from './components/CollapsibleSection';
import { SettingsCollapsibleSection } from './components/SettingsCollapsibleSection';
import { BookMappingEditor } from './components/BookMappingEditor';
import { BOOK_MAPPINGS_DE } from '../data/bookMappings.de';
import { BOOK_MAPPINGS_EN } from '../data/bookMappings.en';
import { getBooksByTestament } from '../data/testamentStructure';

/**
 * SettingsTab
 *
 * Obsidian Settings UI für das Bible Reference Mapper Plugin.
 * Vollständig lokalisiert über I18nService.
 */
export class BibleRefSettingsTab extends PluginSettingTab {
  plugin: BibleRefPlugin;
  settings: BibleRefSettings;
  i18n: I18nService;
  onSettingsChange: (settings: BibleRefSettings) => Promise<void>;
  onSyncAll?: () => Promise<void>;
  private bookEditors: Map<string, BookMappingEditor> = new Map();

  constructor(
    app: App,
    plugin: BibleRefPlugin,
    settings: BibleRefSettings,
    i18n: I18nService,
    onSettingsChange: (settings: BibleRefSettings) => Promise<void>,
    onSyncAll?: () => Promise<void>
  ) {
    super(app, plugin);
    this.plugin = plugin;
    this.settings = settings;
    this.i18n = i18n;
    this.onSettingsChange = onSettingsChange;
    this.onSyncAll = onSyncAll;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    // Clear editor cache when re-rendering entire UI
    this.bookEditors.clear();

    // ═══════════════════════════════════════════════════════════════
    // LANGUAGE SECTION
    // ═══════════════════════════════════════════════════════════════
    this.renderLanguageSection(containerEl);

    // ═══════════════════════════════════════════════════════════════
    // SYNC SECTION
    // ═══════════════════════════════════════════════════════════════
    this.renderSyncSection(containerEl);

    // ═══════════════════════════════════════════════════════════════
    // FORMAT SECTION
    // ═══════════════════════════════════════════════════════════════
    this.renderFormatSection(containerEl);

    // ═══════════════════════════════════════════════════════════════
    // FRONTMATTER SECTION
    // ═══════════════════════════════════════════════════════════════
    this.renderFrontmatterSection(containerEl);

    // ═══════════════════════════════════════════════════════════════
    // GRAPH VIEW SECTION
    // ═══════════════════════════════════════════════════════════════
    this.renderGraphViewSection(containerEl);

    // ═══════════════════════════════════════════════════════════════
    // PARSING SECTION
    // ═══════════════════════════════════════════════════════════════
    this.renderParsingSection(containerEl);

    // ═══════════════════════════════════════════════════════════════
    // BEHAVIOR SECTION
    // ═══════════════════════════════════════════════════════════════
    this.renderBehaviorSection(containerEl);

    // ═══════════════════════════════════════════════════════════════
    // ADVANCED SECTION
    // ═══════════════════════════════════════════════════════════════
    this.renderAdvancedSection(containerEl);

    // ═══════════════════════════════════════════════════════════════
    // INFO SECTION
    // ═══════════════════════════════════════════════════════════════
    this.renderInfoSection(containerEl);

    // ═══════════════════════════════════════════════════════════════
    // RESET TO DEFAULT
    // ═══════════════════════════════════════════════════════════════
    this.renderResetSection(containerEl);
  }

  private renderLanguageSection(containerEl: HTMLElement): void {
    const section = new SettingsCollapsibleSection(containerEl, {
      title: this.i18n.t('settingsLanguageSection'),
      description: this.i18n.t('settingsLanguageSectionDesc'),
      defaultExpanded: false
    });

    const contentEl = section.getContentElement();

    new Setting(contentEl)
      .setName(this.i18n.t('settingsUiLanguage'))
      .setDesc(this.i18n.t('settingsUiLanguageDesc'))
      .addDropdown(dropdown => dropdown
        .addOption('de', 'Deutsch')
        .addOption('en', 'English')
        .setValue(this.settings.uiLanguage)
        .onChange(async (value) => {
          this.settings.uiLanguage = value as 'de' | 'en';
          this.i18n.setLocale(value as 'de' | 'en');
          await this.saveSettings();
          this.display(); // Refresh UI with new language
        })
      );
  }

  private renderSyncSection(containerEl: HTMLElement): void {
    const section = new SettingsCollapsibleSection(containerEl, {
      title: this.i18n.t('settingsSyncSection'),
      description: this.i18n.t('settingsSyncSectionDesc'),
      defaultExpanded: false
    });

    const contentEl = section.getContentElement();

    contentEl.createEl('p', {
      text: this.i18n.t('settingsSyncTitle'),
      cls: 'setting-item-description'
    });

    new Setting(contentEl)
      .setName(this.i18n.t('syncOnSave'))
      .setDesc(this.i18n.t('syncOnSaveDesc'))
      .addToggle(toggle => toggle
        .setValue(this.settings.syncOptions.onSave)
        .onChange(async (value) => {
          this.settings.syncOptions.onSave = value;
          await this.saveSettings();
        })
      );

    new Setting(contentEl)
      .setName(this.i18n.t('syncOnFileChange'))
      .setDesc(this.i18n.t('syncOnFileChangeDesc'))
      .addToggle(toggle => toggle
        .setValue(this.settings.syncOptions.onFileChange)
        .onChange(async (value) => {
          this.settings.syncOptions.onFileChange = value;
          await this.saveSettings();
        })
      );

    // Hint when both are disabled
    if (!this.settings.syncOptions.onSave && !this.settings.syncOptions.onFileChange) {
      contentEl.createEl('p', {
        text: this.i18n.t('syncManualHint'),
        cls: 'setting-item-description bible-ref-hint'
      });
    }

    // Command hint
    contentEl.createEl('p', {
      text: this.i18n.t('settingsSyncCommandHint'),
      cls: 'setting-item-description bible-ref-hint'
    });

    // Sync All Files button
    if (this.onSyncAll) {
      const syncAllSetting = new Setting(contentEl)
        .setName(this.i18n.t('settingsSyncAllButton'))
        .setDesc(this.i18n.t('settingsSyncAllButtonDesc'));

      const buttonEl = syncAllSetting.controlEl.createEl('button', {
        text: this.i18n.t('settingsSyncAllButtonText'),
        cls: 'mod-cta'
      });

      buttonEl.addEventListener('click', async () => {
        buttonEl.disabled = true;
        buttonEl.setText(this.i18n.t('syncButtonSyncing'));
        try {
          await this.onSyncAll!();
        } finally {
          buttonEl.disabled = false;
          buttonEl.setText(this.i18n.t('settingsSyncAllButtonText'));
        }
      });
    }
  }

  private renderFormatSection(containerEl: HTMLElement): void {
    const section = new SettingsCollapsibleSection(containerEl, {
      title: this.i18n.t('settingsFormatSection'),
      description: this.i18n.t('settingsFormatSectionDesc'),
      defaultExpanded: false
    });

    const contentEl = section.getContentElement();

    new Setting(contentEl)
      .setName(this.i18n.t('settingsLanguagePreset'))
      .setDesc(this.i18n.t('settingsLanguagePresetDesc'))
      .addDropdown(dropdown => {
        dropdown
          .addOption('de', this.i18n.t('presetGerman'))
          .addOption('en', this.i18n.t('presetEnglish'))
          .addOption('custom', this.i18n.t('presetCustom'))
          .setValue(this.settings.language)
          .onChange(async (value) => {
            this.settings.language = value as 'de' | 'en' | 'custom';

            // Apply preset separators
            if (value !== 'custom') {
              const preset = LANGUAGE_PRESETS[value];
              if (preset) {
                this.settings.separators = { ...preset.separators };
              }
            }

            await this.saveSettings();
            this.display(); // Refresh to show/hide custom separators
          });
      });

    // Show custom separator settings only if "custom" is selected
    if (this.settings.language === 'custom') {
      new Setting(contentEl)
        .setName(this.i18n.t('settingsChapterVerseSep'))
        .setDesc(this.i18n.t('settingsChapterVerseSepDesc'))
        .addText(text => text
          .setPlaceholder(',')
          .setValue(this.settings.separators.chapterVerse)
          .onChange(async (value) => {
            this.settings.separators.chapterVerse = value || ',';
            await this.saveSettings();
          })
        );

      new Setting(contentEl)
        .setName(this.i18n.t('settingsListSep'))
        .setDesc(this.i18n.t('settingsListSepDesc'))
        .addText(text => text
          .setPlaceholder('.')
          .setValue(this.settings.separators.list)
          .onChange(async (value) => {
            this.settings.separators.list = value || '.';
            await this.saveSettings();
          })
        );

      new Setting(contentEl)
        .setName(this.i18n.t('settingsRangeSep'))
        .setDesc(this.i18n.t('settingsRangeSepDesc'))
        .addText(text => text
          .setPlaceholder('-')
          .setValue(this.settings.separators.range)
          .onChange(async (value) => {
            this.settings.separators.range = value || '-';
            await this.saveSettings();
          })
        );
    }
  }

  private renderFrontmatterSection(containerEl: HTMLElement): void {
    const section = new SettingsCollapsibleSection(containerEl, {
      title: this.i18n.t('settingsFrontmatterSection'),
      description: this.i18n.t('settingsFrontmatterSectionDesc'),
      defaultExpanded: false
    });

    const contentEl = section.getContentElement();

    new Setting(contentEl)
      .setName(this.i18n.t('settingsFrontmatterKey'))
      .setDesc(this.i18n.t('settingsFrontmatterKeyDesc'))
      .addText(text => text
        .setPlaceholder('_bible_refs')
        .setValue(this.settings.frontmatterKey)
        .onChange(async (value) => {
          this.settings.frontmatterKey = value || '_bible_refs';
          await this.saveSettings();
        })
      );

    new Setting(contentEl)
      .setName(this.i18n.t('settingsTagPrefix'))
      .setDesc(this.i18n.t('settingsTagPrefixDesc'))
      .addText(text => text
        .setPlaceholder('bible/')
        .setValue(this.settings.tagPrefix)
        .onChange(async (value) => {
          this.settings.tagPrefix = value || 'bible/';
          await this.saveSettings();
        })
      );
  }

  private renderGraphViewSection(containerEl: HTMLElement): void {
    const section = new SettingsCollapsibleSection(containerEl, {
      title: this.i18n.t('settingsGraphViewSection'),
      description: this.i18n.t('settingsGraphViewSectionDesc'),
      defaultExpanded: false
    });

    const contentEl = section.getContentElement();

    // Write to tags field toggle
    new Setting(contentEl)
      .setName(this.i18n.t('settingsWriteToTags'))
      .setDesc(this.i18n.t('settingsWriteToTagsDesc'))
      .addToggle(toggle => toggle
        .setValue(this.settings.writeToTagsField)
        .onChange(async (value) => {
          this.settings.writeToTagsField = value;
          await this.saveSettings();
          this.display(); // Refresh to show/hide granularity dropdown
        })
      );

    // Granularity dropdown (only visible when writeToTagsField is enabled)
    if (this.settings.writeToTagsField) {
      new Setting(contentEl)
        .setName(this.i18n.t('settingsGraphTagGranularity'))
        .setDesc(this.i18n.t('settingsGraphTagGranularityDesc'))
        .addDropdown(dropdown => dropdown
          .addOption('book', this.i18n.t('graphGranularityBook'))
          .addOption('chapter', this.i18n.t('graphGranularityChapter'))
          .addOption('verse', this.i18n.t('graphGranularityVerse'))
          .setValue(this.settings.graphTagGranularity || 'verse')
          .onChange(async (value) => {
            this.settings.graphTagGranularity = value as 'book' | 'chapter' | 'verse';
            await this.saveSettings();
          })
        );

      // Apply and Sync button
      if (this.onSyncAll) {
        const syncSetting = new Setting(contentEl)
          .setName(this.i18n.t('settingsApplyAndSync'))
          .setDesc(this.i18n.t('settingsApplyAndSyncDesc'));

        const buttonEl = syncSetting.controlEl.createEl('button', {
          text: this.i18n.t('settingsApplyAndSyncButton'),
          cls: 'mod-cta'
        });

        buttonEl.addEventListener('click', async () => {
          buttonEl.disabled = true;
          buttonEl.setText(this.i18n.t('syncButtonSyncing'));
          try {
            await this.onSyncAll!();
          } finally {
            buttonEl.disabled = false;
            buttonEl.setText(this.i18n.t('settingsApplyAndSyncButton'));
          }
        });
      }
    }
  }

  private renderParsingSection(containerEl: HTMLElement): void {
    const section = new SettingsCollapsibleSection(containerEl, {
      title: this.i18n.t('settingsParsingSection'),
      description: this.i18n.t('settingsParsingSectionDesc'),
      defaultExpanded: false
    });

    const contentEl = section.getContentElement();

    new Setting(contentEl)
      .setName(this.i18n.t('settingsParseTitles'))
      .setDesc(this.i18n.t('settingsParseTitlesDesc'))
      .addToggle(toggle => toggle
        .setValue(this.settings.parseTitles)
        .onChange(async (value) => {
          this.settings.parseTitles = value;
          await this.saveSettings();
        })
      );

    new Setting(contentEl)
      .setName(this.i18n.t('settingsParseCodeBlocks'))
      .setDesc(this.i18n.t('settingsParseCodeBlocksDesc'))
      .addToggle(toggle => toggle
        .setValue(this.settings.parseCodeBlocks)
        .onChange(async (value) => {
          this.settings.parseCodeBlocks = value;
          await this.saveSettings();
        })
      );
  }

  private renderBehaviorSection(containerEl: HTMLElement): void {
    const section = new SettingsCollapsibleSection(containerEl, {
      title: this.i18n.t('settingsBehaviorSection'),
      description: this.i18n.t('settingsBehaviorSectionDesc'),
      defaultExpanded: false
    });

    const contentEl = section.getContentElement();

    new Setting(contentEl)
      .setName(this.i18n.t('settingsLinkBehavior'))
      .setDesc(this.i18n.t('settingsLinkBehaviorDesc'))
      .addDropdown(dropdown => dropdown
        .addOption('same-tab', this.i18n.t('linkBehaviorSameTab'))
        .addOption('new-tab', this.i18n.t('linkBehaviorNewTab'))
        .addOption('split', this.i18n.t('linkBehaviorSplit'))
        .setValue(this.settings.linkBehavior)
        .onChange(async (value) => {
          this.settings.linkBehavior = value as LinkBehavior;
          await this.saveSettings();
        })
      );
  }

  private renderAdvancedSection(containerEl: HTMLElement): void {
    const section = new SettingsCollapsibleSection(containerEl, {
      title: this.i18n.t('settingsAdvancedSection'),
      description: this.i18n.t('settingsAdvancedSectionDesc'),
      defaultExpanded: false
    });

    const contentEl = section.getContentElement();

    // Visual Book Mappings Editor
    this.renderVisualBookMappingsEditor(contentEl);

    // JSON Editor (collapsible, for advanced users)
    this.renderJsonMappingsEditor(contentEl);
  }

  private renderInfoSection(containerEl: HTMLElement): void {
    const section = new SettingsCollapsibleSection(containerEl, {
      title: this.i18n.t('settingsInfoSection'),
      description: this.i18n.t('settingsInfoSectionDesc'),
      defaultExpanded: false
    });

    const contentEl = section.getContentElement();

    // Parallel Tip
    new Setting(contentEl)
      .setName(this.i18n.t('settingsParallelTip'))
      .setDesc(this.i18n.t('settingsParallelTipDesc'));

    // General Info
    const infoDiv = contentEl.createDiv({ cls: 'bible-ref-info' });
    infoDiv.createEl('p', {
      text: this.i18n.t('settingsInfoDesc'),
      cls: 'setting-item-description'
    });
  }

  private renderResetSection(containerEl: HTMLElement): void {
    const section = new SettingsCollapsibleSection(containerEl, {
      title: this.i18n.t('settingsDangerZone'),
      description: this.i18n.t('settingsDangerZoneDesc'),
      defaultExpanded: false
    });

    const contentEl = section.getContentElement();
    contentEl.addClass('bible-ref-danger-zone');

    const resetSetting = new Setting(contentEl)
      .setName(this.i18n.t('settingsResetToDefault'))
      .setDesc(this.i18n.t('settingsResetToDefaultDesc'));

    const buttonEl = resetSetting.controlEl.createEl('button', {
      text: this.i18n.t('settingsResetToDefaultButton'),
      cls: 'mod-warning'
    });

    buttonEl.addEventListener('click', async () => {
      // Confirmation dialog
      const confirmed = (globalThis as typeof globalThis & { confirm: (msg: string) => boolean }).confirm(
        this.i18n.t('settingsResetToDefaultConfirm')
      );
      if (!confirmed) return;

      // Reset settings to default
      const currentLocale = this.i18n.getLocale();
      this.settings = createDefaultSettings(currentLocale);
      await this.saveSettings();
      this.display(); // Refresh UI
    });
  }

  private renderVisualBookMappingsEditor(containerEl: HTMLElement): void {
    const section = containerEl.createDiv('bible-ref-visual-mappings-section');

    section.createEl('h3', { text: this.i18n.t('settingsBookMappingsVisual') });
    section.createEl('p', {
      text: this.i18n.t('settingsBookMappingsVisualDesc'),
      cls: 'setting-item-description'
    });

    // Get current language mappings
    const mappings = this.settings.language === 'en'
      ? BOOK_MAPPINGS_EN
      : BOOK_MAPPINGS_DE;

    // Old Testament section
    this.renderTestamentSection(section, 'old', mappings);

    // New Testament section
    this.renderTestamentSection(section, 'new', mappings);
  }

  private renderTestamentSection(
    containerEl: HTMLElement,
    testament: 'old' | 'new',
    mappings: BookMapping[]
  ): void {
    const testamentDiv = containerEl.createDiv('bible-ref-testament-section');

    const title = testament === 'old'
      ? this.i18n.t('settingsOldTestament')
      : this.i18n.t('settingsNewTestament');

    const collapsible = new CollapsibleSection(testamentDiv, {
      title,
      defaultExpanded: false,
      icon: testament === 'old' ? 'book' : 'book-open'
    });

    const contentEl = collapsible.getContentElement();

    // Get books for this testament
    const bookIds = getBooksByTestament(testament);

    for (const bookId of bookIds) {
      const mapping = mappings.find(m => m.canonicalId === bookId);
      if (!mapping) continue;

      this.renderBookSection(contentEl, mapping);
    }
  }

  private renderBookSection(containerEl: HTMLElement, mapping: BookMapping): void {
    const bookDiv = containerEl.createDiv('bible-ref-book-section');

    const collapsible = new CollapsibleSection(bookDiv, {
      title: `${mapping.canonicalId} - ${mapping.aliases[0]}`,
      defaultExpanded: false,
      onToggle: (expanded) => {
        if (expanded) {
          // Check if editor already exists
          let editor = this.bookEditors.get(mapping.canonicalId);

          if (!editor) {
            // First time: create editor
            editor = this.renderBookEditor(collapsible.getContentElement(), mapping);
            this.bookEditors.set(mapping.canonicalId, editor);
          } else {
            // Re-expand: update editor with latest data
            const customization = this.settings.customBookMappingsV2?.[mapping.canonicalId];
            editor.update(customization);
          }
        }
      }
    });
  }

  private renderBookEditor(containerEl: HTMLElement, mapping: BookMapping): BookMappingEditor {
    const customization = this.settings.customBookMappingsV2?.[mapping.canonicalId];

    const editor = new BookMappingEditor(containerEl, {
      bookMapping: mapping,
      customization,
      i18n: this.i18n,
      onChange: async (updatedCustomization) => {
        // Update settings
        if (!this.settings.customBookMappingsV2) {
          this.settings.customBookMappingsV2 = {};
        }

        this.settings.customBookMappingsV2[mapping.canonicalId] = updatedCustomization;

        // Clean up empty customizations
        if (!updatedCustomization.aliasesAdditions?.length &&
            !updatedCustomization.aliasesDeletions?.length &&
            !updatedCustomization.standalonePatternsAdditions?.length &&
            !updatedCustomization.standalonePatternsDeletions?.length) {
          delete this.settings.customBookMappingsV2[mapping.canonicalId];
        }

        await this.saveSettings();

        // Update editor immediately with new state
        editor.update(updatedCustomization);
      }
    });

    return editor;
  }

  private renderJsonMappingsEditor(containerEl: HTMLElement): void {
    const section = containerEl.createDiv('bible-ref-json-mappings-section');

    const collapsible = new CollapsibleSection(section, {
      title: this.i18n.t('settingsBookMappingsJson'),
      defaultExpanded: false
    });

    const contentEl = collapsible.getContentElement();

    contentEl.createEl('p', {
      text: this.i18n.t('settingsBookMappingsJsonDesc'),
      cls: 'setting-item-description'
    });

    // JSON textarea (advanced editing)
    new Setting(contentEl)
      .setName('Custom Book Mappings V2 (JSON)')
      .setDesc('Advanced: Edit the raw JSON structure')
      .addTextArea(text => text
        .setPlaceholder('{}')
        .setValue(JSON.stringify(this.settings.customBookMappingsV2 || {}, null, 2))
        .onChange(async (value) => {
          try {
            this.settings.customBookMappingsV2 = JSON.parse(value || '{}');
            await this.saveSettings();
          } catch (error) {
            // Invalid JSON - ignore until valid
            console.warn('Invalid JSON in custom mappings:', error);
          }
        })
      );
  }

  async saveSettings(): Promise<void> {
    await this.onSettingsChange(this.settings);
  }
}
