import { App, PluginSettingTab, Setting } from 'obsidian';
import type { Plugin } from 'obsidian';
import type { BibleRefSettings, LinkBehavior } from '../types';
import type { I18nService } from '../i18n/I18nService';
import { LANGUAGE_PRESETS } from './presets';

/**
 * SettingsTab
 *
 * Obsidian Settings UI für das Bible Reference Mapper Plugin.
 * Vollständig lokalisiert über I18nService.
 */
export class BibleRefSettingsTab extends PluginSettingTab {
  plugin: Plugin;
  settings: BibleRefSettings;
  i18n: I18nService;
  onSettingsChange: (settings: BibleRefSettings) => Promise<void>;
  onSyncAll?: () => Promise<void>;

  constructor(
    app: App,
    plugin: Plugin,
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

    new Setting(containerEl)
      .setName('Custom Book Mappings')
      .setDesc('JSON: {"Alias": "BookId"}')
      .addTextArea(text => text
        .setPlaceholder('{}')
        .setValue(JSON.stringify(this.settings.customBookMappings, null, 2))
        .onChange(async (value) => {
          try {
            this.settings.customBookMappings = JSON.parse(value || '{}');
            await this.saveSettings();
          } catch (error) {
            // Invalid JSON - ignore until valid
          }
        })
      );

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

  async saveSettings(): Promise<void> {
    await this.onSettingsChange(this.settings);
  }
}
