import { App, PluginSettingTab, Setting } from 'obsidian';
import type { Plugin } from 'obsidian';
import type { BibleRefSettings, SyncMode } from '../types';
import { LANGUAGE_PRESETS } from './presets';

/**
 * SettingsTab
 *
 * Obsidian Settings UI für das Bible Reference Mapper Plugin.
 * Ermöglicht User die Konfiguration aller Plugin-Einstellungen.
 */
export class BibleRefSettingsTab extends PluginSettingTab {
  plugin: Plugin;
  settings: BibleRefSettings;
  onSettingsChange: (settings: BibleRefSettings) => void;

  constructor(
    app: App,
    plugin: Plugin,
    settings: BibleRefSettings,
    onSettingsChange: (settings: BibleRefSettings) => void
  ) {
    super(app, plugin);
    this.plugin = plugin;
    this.settings = settings;
    this.onSettingsChange = onSettingsChange;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    // ═══════════════════════════════════════════════════════════════
    // SYNC BEHAVIOR
    // ═══════════════════════════════════════════════════════════════

    containerEl.createEl('h2', { text: 'Sync Behavior' });

    new Setting(containerEl)
      .setName('Sync Mode')
      .setDesc('Wann sollen Bibelreferenzen automatisch synchronisiert werden?')
      .addDropdown(dropdown => dropdown
        .addOption('on-save-or-change', 'On Save or File Change (Empfohlen)')
        .addOption('on-save', 'On Save Only (Ctrl+S)')
        .addOption('on-file-change', 'On File Change Only')
        .addOption('manual', 'Manual Only (Command Palette)')
        .setValue(this.settings.syncMode)
        .onChange(async (value) => {
          this.settings.syncMode = value as SyncMode;
          await this.saveSettings();
        })
      );

    // ═══════════════════════════════════════════════════════════════
    // LANGUAGE & SEPARATORS
    // ═══════════════════════════════════════════════════════════════

    containerEl.createEl('h2', { text: 'Language & Format' });

    new Setting(containerEl)
      .setName('Language Preset')
      .setDesc('Wähle ein vordefiniertes Format oder "Custom" für eigene Separatoren.')
      .addDropdown(dropdown => {
        dropdown
          .addOption('de', `${LANGUAGE_PRESETS.de.name} (${LANGUAGE_PRESETS.de.example})`)
          .addOption('en', `${LANGUAGE_PRESETS.en.name} (${LANGUAGE_PRESETS.en.example})`)
          .addOption('custom', 'Custom')
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
            this.display(); // Refresh UI to show/hide custom separators
          });
      });

    // Show custom separator settings only if "custom" is selected
    if (this.settings.language === 'custom') {
      new Setting(containerEl)
        .setName('Chapter-Verse Separator')
        .setDesc('Trenner zwischen Kapitel und Vers (z.B. "," oder ":")')
        .addText(text => text
          .setPlaceholder(',')
          .setValue(this.settings.separators.chapterVerse)
          .onChange(async (value) => {
            this.settings.separators.chapterVerse = value || ',';
            await this.saveSettings();
          })
        );

      new Setting(containerEl)
        .setName('List Separator (AND)')
        .setDesc('Trenner für Listen (z.B. "." → 16.18 = Verse 16 und 18)')
        .addText(text => text
          .setPlaceholder('.')
          .setValue(this.settings.separators.list)
          .onChange(async (value) => {
            this.settings.separators.list = value || '.';
            await this.saveSettings();
          })
        );

      new Setting(containerEl)
        .setName('Range Separator (TO)')
        .setDesc('Trenner für Bereiche (z.B. "-" → 16-18 = Verse 16 bis 18)')
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
    // FRONTMATTER & TAGGING
    // ═══════════════════════════════════════════════════════════════

    containerEl.createEl('h2', { text: 'Frontmatter & Tagging' });

    new Setting(containerEl)
      .setName('Frontmatter Key')
      .setDesc('Schlüssel für Bibelreferenz-Tags im Frontmatter (z.B. "bible-refs")')
      .addText(text => text
        .setPlaceholder('bible-refs')
        .setValue(this.settings.frontmatterKey)
        .onChange(async (value) => {
          this.settings.frontmatterKey = value || 'bible-refs';
          await this.saveSettings();
        })
      );

    new Setting(containerEl)
      .setName('Tag Prefix')
      .setDesc('Präfix für generierte Tags (z.B. "bible/" → bible/Joh/3/16)')
      .addText(text => text
        .setPlaceholder('bible/')
        .setValue(this.settings.tagPrefix)
        .onChange(async (value) => {
          this.settings.tagPrefix = value || 'bible/';
          await this.saveSettings();
        })
      );

    // ═══════════════════════════════════════════════════════════════
    // PARSING OPTIONS
    // ═══════════════════════════════════════════════════════════════

    containerEl.createEl('h2', { text: 'Parsing Options' });

    new Setting(containerEl)
      .setName('Parse Titles')
      .setDesc('Bibelreferenzen im Dateinamen erkennen (z.B. "Joh 3,16.md")')
      .addToggle(toggle => toggle
        .setValue(this.settings.parseTitles)
        .onChange(async (value) => {
          this.settings.parseTitles = value;
          await this.saveSettings();
        })
      );

    new Setting(containerEl)
      .setName('Parse Code Blocks')
      .setDesc('Bibelreferenzen auch in Code-Blöcken erkennen (nicht empfohlen)')
      .addToggle(toggle => toggle
        .setValue(this.settings.parseCodeBlocks)
        .onChange(async (value) => {
          this.settings.parseCodeBlocks = value;
          await this.saveSettings();
        })
      );

    // ═══════════════════════════════════════════════════════════════
    // CUSTOM BOOK MAPPINGS
    // ═══════════════════════════════════════════════════════════════

    containerEl.createEl('h2', { text: 'Custom Book Mappings' });

    new Setting(containerEl)
      .setName('Custom Book Mappings')
      .setDesc(
        'Eigene Abkürzungen definieren (JSON Format). Beispiel: {"Joh": "Johannes", "Mt": "Matthäus"}'
      )
      .addTextArea(text => text
        .setPlaceholder('{}')
        .setValue(JSON.stringify(this.settings.customBookMappings, null, 2))
        .onChange(async (value) => {
          try {
            this.settings.customBookMappings = JSON.parse(value || '{}');
            await this.saveSettings();
          } catch (error) {
            console.error('Invalid JSON for custom book mappings:', error);
          }
        })
      );

    // ═══════════════════════════════════════════════════════════════
    // INFO SECTION
    // ═══════════════════════════════════════════════════════════════

    containerEl.createEl('h2', { text: 'Info' });

    const infoDiv = containerEl.createDiv();
    infoDiv.innerHTML = `
      <p style="color: var(--text-muted);">
        <strong>Bible Reference Mapper</strong><br>
        Automatische Erkennung und Tagging von Bibelreferenzen.<br>
        <br>
        <strong>Beispiele:</strong><br>
        • Deutsch: Joh 3,16-18 → bible/Joh/3/16, bible/Joh/3/17, bible/Joh/3/18<br>
        • English: John 3:16-18 → bible/Joh/3/16, bible/Joh/3/17, bible/Joh/3/18<br>
        • Kapitel: Kolosser 3 → Alle Verse in Kol 3<br>
        • Buch: Kolosserbrief → bible/Col<br>
      </p>
    `;
  }

  async saveSettings(): Promise<void> {
    await this.onSettingsChange(this.settings);
  }
}
