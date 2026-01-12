import { App, PluginSettingTab, Setting } from 'obsidian';
import type { BibleRefSettings, LinkBehavior, BookMapping, CustomBookMappingsV2 } from '../types';
import type BibleRefPlugin from '../main';
import type { I18nService } from '../i18n/I18nService';
import { LANGUAGE_PRESETS } from './presets';
import { CollapsibleSection } from './components/CollapsibleSection';
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
    // UI LANGUAGE (at the very top)
    // ═══════════════════════════════════════════════════════════════

    containerEl.createEl('h2', { text: this.i18n.t('settingsLanguageSection') });

    new Setting(containerEl)
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

    // ═══════════════════════════════════════════════════════════════
    // SYNC OPTIONS (Checkboxes)
    // ═══════════════════════════════════════════════════════════════

    containerEl.createEl('h2', { text: this.i18n.t('settingsSyncSection') });

    containerEl.createEl('p', {
      text: this.i18n.t('settingsSyncTitle'),
      cls: 'setting-item-description'
    });

    new Setting(containerEl)
      .setName(this.i18n.t('syncOnSave'))
      .setDesc(this.i18n.t('syncOnSaveDesc'))
      .addToggle(toggle => toggle
        .setValue(this.settings.syncOptions.onSave)
        .onChange(async (value) => {
          this.settings.syncOptions.onSave = value;
          await this.saveSettings();
        })
      );

    new Setting(containerEl)
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
      containerEl.createEl('p', {
        text: this.i18n.t('syncManualHint'),
        cls: 'setting-item-description bible-ref-hint'
      });
    }

    // Command hint
    containerEl.createEl('p', {
      text: this.i18n.t('settingsSyncCommandHint'),
      cls: 'setting-item-description bible-ref-hint'
    });

    // Sync All Files button
    if (this.onSyncAll) {
      const syncAllSetting = new Setting(containerEl)
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

    // ═══════════════════════════════════════════════════════════════
    // FORMAT (Language preset & separators)
    // ═══════════════════════════════════════════════════════════════

    containerEl.createEl('h2', { text: this.i18n.t('settingsFormatSection') });

    new Setting(containerEl)
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
      new Setting(containerEl)
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

      new Setting(containerEl)
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

      new Setting(containerEl)
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

    // ═══════════════════════════════════════════════════════════════
    // FRONTMATTER
    // ═══════════════════════════════════════════════════════════════

    containerEl.createEl('h2', { text: this.i18n.t('settingsFrontmatterSection') });

    new Setting(containerEl)
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

    new Setting(containerEl)
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

    new Setting(containerEl)
      .setName(this.i18n.t('settingsWriteToTags'))
      .setDesc(this.i18n.t('settingsWriteToTagsDesc'))
      .addToggle(toggle => toggle
        .setValue(this.settings.writeToTagsField)
        .onChange(async (value) => {
          this.settings.writeToTagsField = value;
          await this.saveSettings();
        })
      );

    // ═══════════════════════════════════════════════════════════════
    // PARSING OPTIONS
    // ═══════════════════════════════════════════════════════════════

    containerEl.createEl('h2', { text: this.i18n.t('settingsParsingSection') });

    new Setting(containerEl)
      .setName(this.i18n.t('settingsParseTitles'))
      .setDesc(this.i18n.t('settingsParseTitlesDesc'))
      .addToggle(toggle => toggle
        .setValue(this.settings.parseTitles)
        .onChange(async (value) => {
          this.settings.parseTitles = value;
          await this.saveSettings();
        })
      );

    new Setting(containerEl)
      .setName(this.i18n.t('settingsParseCodeBlocks'))
      .setDesc(this.i18n.t('settingsParseCodeBlocksDesc'))
      .addToggle(toggle => toggle
        .setValue(this.settings.parseCodeBlocks)
        .onChange(async (value) => {
          this.settings.parseCodeBlocks = value;
          await this.saveSettings();
        })
      );

    // ═══════════════════════════════════════════════════════════════
    // BEHAVIOR
    // ═══════════════════════════════════════════════════════════════

    containerEl.createEl('h2', { text: this.i18n.t('settingsBehaviorSection') });

    new Setting(containerEl)
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

    // ═══════════════════════════════════════════════════════════════
    // ADVANCED (Custom Mappings)
    // ═══════════════════════════════════════════════════════════════

    containerEl.createEl('h2', { text: this.i18n.t('settingsAdvancedSection') });

    // Visual Book Mappings Editor
    this.renderVisualBookMappingsEditor(containerEl);

    // JSON Editor (collapsible, for advanced users)
    this.renderJsonMappingsEditor(containerEl);

    // ═══════════════════════════════════════════════════════════════
    // INFO & TIPS
    // ═══════════════════════════════════════════════════════════════

    containerEl.createEl('h2', { text: this.i18n.t('settingsInfo') });

    // Parallel Tip
    new Setting(containerEl)
      .setName(this.i18n.t('settingsParallelTip'))
      .setDesc(this.i18n.t('settingsParallelTipDesc'));

    // General Info
    const infoDiv = containerEl.createDiv({ cls: 'bible-ref-info' });
    infoDiv.createEl('p', {
      text: this.i18n.t('settingsInfoDesc'),
      cls: 'setting-item-description'
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
