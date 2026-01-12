/**
 * Localization strings for the Bible Reference Mapper plugin
 *
 * This file contains all UI strings in German and English.
 * NO hardcoded strings should exist elsewhere in the codebase.
 */

export type Locale = 'de' | 'en';

export interface LocaleStrings {
  // === Commands ===
  commandOpenSidebar: string;
  commandSyncCurrent: string;
  commandSyncAll: string;

  // === Sidebar ===
  sidebarTitle: string;
  sidebarTabDirect: string;
  sidebarTabParallel: string;
  sidebarTabGlobal: string;
  sidebarNoReferences: string;
  sidebarNoOtherNotes: string;
  sidebarEmpty: string;
  sidebarReferenceCount: string;
  sidebarParallelCount: string;
  sidebarSelectBook: string;
  sidebarSelectChapter: string;
  sidebarSelectVerse: string;
  sidebarNotesWithVerse: string;

  // === Sync Button ===
  syncButtonSync: string;
  syncButtonSyncing: string;
  syncButtonSynced: string;
  syncButtonError: string;

  // === Notices ===
  noticeSynced: string;
  noticeNoChanges: string;
  noticeError: string;
  noticeNoFile: string;
  noticeSyncAll: string;
  noticeMigration: string;

  // === Settings - Sections ===
  settingsLanguageSection: string;
  settingsLanguageSectionDesc: string;
  settingsSyncSection: string;
  settingsSyncSectionDesc: string;
  settingsFormatSection: string;
  settingsFormatSectionDesc: string;
  settingsFrontmatterSection: string;
  settingsFrontmatterSectionDesc: string;
  settingsParsingSection: string;
  settingsParsingSectionDesc: string;
  settingsBehaviorSection: string;
  settingsBehaviorSectionDesc: string;
  settingsAdvancedSection: string;
  settingsAdvancedSectionDesc: string;
  settingsInfoSection: string;
  settingsInfoSectionDesc: string;

  // === Settings - Danger Zone ===
  settingsDangerZone: string;
  settingsDangerZoneDesc: string;
  settingsResetToDefault: string;
  settingsResetToDefaultDesc: string;
  settingsResetToDefaultButton: string;
  settingsResetToDefaultConfirm: string;

  // === Settings - UI Language ===
  settingsUiLanguage: string;
  settingsUiLanguageDesc: string;

  // === Settings - Sync Options ===
  settingsSyncTitle: string;
  syncOnSave: string;
  syncOnSaveDesc: string;
  syncOnFileChange: string;
  syncOnFileChangeDesc: string;
  syncManualHint: string;

  // === Settings - Format ===
  settingsLanguagePreset: string;
  settingsLanguagePresetDesc: string;
  settingsChapterVerseSep: string;
  settingsChapterVerseSepDesc: string;
  settingsListSep: string;
  settingsListSepDesc: string;
  settingsRangeSep: string;
  settingsRangeSepDesc: string;
  presetGerman: string;
  presetEnglish: string;
  presetCustom: string;

  // === Settings - Frontmatter ===
  settingsFrontmatterKey: string;
  settingsFrontmatterKeyDesc: string;
  settingsTagPrefix: string;
  settingsTagPrefixDesc: string;

  // === Settings - Graph View ===
  settingsGraphViewSection: string;
  settingsGraphViewSectionDesc: string;
  settingsWriteToTags: string;
  settingsWriteToTagsDesc: string;
  settingsGraphTagGranularity: string;
  settingsGraphTagGranularityDesc: string;
  graphGranularityBook: string;
  graphGranularityChapter: string;
  graphGranularityVerse: string;
  settingsApplyAndSync: string;
  settingsApplyAndSyncDesc: string;
  settingsApplyAndSyncButton: string;

  // === Quick Settings (Sidebar) ===
  quickSettingsTooltip: string;
  quickSettingsGranularity: string;

  // === Settings - Sync Enhancements ===
  settingsSyncCommandHint: string;
  settingsSyncAllButton: string;
  settingsSyncAllButtonDesc: string;
  settingsSyncAllButtonText: string;

  // === Sync Timeout ===
  syncButtonTimeout: string;

  // === Settings - Parsing ===
  settingsParseCodeBlocks: string;
  settingsParseCodeBlocksDesc: string;
  settingsParseTitles: string;
  settingsParseTitlesDesc: string;

  // === Settings - Link Behavior ===
  settingsLinkBehavior: string;
  settingsLinkBehaviorDesc: string;
  linkBehaviorSameTab: string;
  linkBehaviorNewTab: string;
  linkBehaviorSplit: string;

  // === Settings - Info/Tips ===
  settingsParallelTip: string;
  settingsParallelTipDesc: string;
  settingsInfo: string;
  settingsInfoDesc: string;

  // === Settings - Book Mappings (V2) ===
  settingsBookMappingsVisual: string;
  settingsBookMappingsVisualDesc: string;
  settingsBookMappingsJson: string;
  settingsBookMappingsJsonDesc: string;
  settingsOldTestament: string;
  settingsNewTestament: string;
  settingsAliasesLabel: string;
  settingsStandalonePatternsLabel: string;
  settingsPillInputPlaceholder: string;
  settingsSearchBooksPlaceholder: string;
  settingsBookMappingsWarning: string;
  settingsDisplayIdExplanation: string;
  settingsCannotDeleteCanonicalId: string;
}

export const LOCALES: Record<Locale, LocaleStrings> = {
  de: {
    // Commands
    commandOpenSidebar: 'Bibelreferenzen öffnen',
    commandSyncCurrent: 'Aktuelle Datei synchronisieren',
    commandSyncAll: 'Alle Dateien synchronisieren',

    // Sidebar
    sidebarTitle: 'Bibelreferenzen',
    sidebarTabDirect: 'Verweise',
    sidebarTabParallel: 'Parallelstellen',
    sidebarTabGlobal: 'Suchen',
    sidebarNoReferences: 'Keine Bibelreferenzen gefunden',
    sidebarNoOtherNotes: 'Keine anderen Notizen mit diesem Vers',
    sidebarEmpty: 'Öffne eine Notiz mit Bibelreferenzen...',
    sidebarReferenceCount: '{count} Referenz(en)',
    sidebarParallelCount: '{count} Notiz(en)',
    sidebarSelectBook: 'Buch',
    sidebarSelectChapter: 'Kapitel',
    sidebarSelectVerse: 'Vers',
    sidebarNotesWithVerse: 'Notizen mit {verse}:',

    // Sync Button
    syncButtonSync: 'Sync',
    syncButtonSyncing: 'Synchronisiere...',
    syncButtonSynced: 'Fertig',
    syncButtonError: 'Fehler',

    // Notices
    noticeSynced: '{count} Bibelreferenz(en) synchronisiert',
    noticeNoChanges: 'Keine Aenderungen',
    noticeError: 'Fehler beim Synchronisieren',
    noticeNoFile: 'Keine Markdown-Datei geoeffnet',
    noticeSyncAll: '{changed}/{total} Dateien aktualisiert ({duration}s)',
    noticeMigration: '{count} Dateien zum neuen Format migriert',

    // Settings Sections
    settingsLanguageSection: 'Sprache',
    settingsLanguageSectionDesc: 'Plugin-Sprache und UI-Texte',
    settingsSyncSection: 'Synchronisation',
    settingsSyncSectionDesc: 'Wann und wie synchronisiert wird',
    settingsFormatSection: 'Format',
    settingsFormatSectionDesc: 'Trennzeichen für Bibelreferenzen',
    settingsFrontmatterSection: 'Frontmatter',
    settingsFrontmatterSectionDesc: 'Tags und Metadaten-Einstellungen',
    settingsParsingSection: 'Erkennung',
    settingsParsingSectionDesc: 'Was als Bibelreferenz erkannt wird (Zusätzlich zu normalen inline-referenzen)',
    settingsBehaviorSection: 'Verhalten',
    settingsBehaviorSectionDesc: 'Link-Verhalten und Interaktionen',
    settingsAdvancedSection: 'Erweitert',
    settingsAdvancedSectionDesc: 'Buchmappings und JSON-Editor',
    settingsInfoSection: 'Info',
    settingsInfoSectionDesc: 'Tipps zur Plugin-Nutzung',

    // Settings - Danger Zone
    settingsDangerZone: 'Gefahrenzone',
    settingsDangerZoneDesc: 'Irreversible Aktionen',
    settingsResetToDefault: 'Auf Standard zurücksetzen',
    settingsResetToDefaultDesc: 'Alle Einstellungen auf die Standardwerte zurücksetzen',
    settingsResetToDefaultButton: 'Zurücksetzen',
    settingsResetToDefaultConfirm: 'Möchtest du wirklich alle Einstellungen zurücksetzen? Diese Aktion kann nicht rückgängig gemacht werden.',

    // Settings - UI Language
    settingsUiLanguage: 'Plugin-Sprache',
    settingsUiLanguageDesc: 'Sprache für UI-Texte (Commands, Sidebar, Meldungen)',

    // Settings - Sync
    settingsSyncTitle: 'Wann synchronisieren?',
    syncOnSave: 'Beim Speichern',
    syncOnSaveDesc: 'Sync bei Ctrl+S / Cmd+S',
    syncOnFileChange: 'Beim Dateiwechsel',
    syncOnFileChangeDesc: 'Sync wenn du zu einer anderen Datei wechselst',
    syncManualHint: 'Tipp: Wenn beide deaktiviert sind, nutze den Sync-Button in der Sidebar oder das Command "Aktuelle Datei synchronisieren"',

    // Settings - Format
    settingsLanguagePreset: 'Trennzeichen Format',
    settingsLanguagePresetDesc: 'Bestimmt, welche Trennzeichen für Bibelreferenzen verwendet werden',
    settingsChapterVerseSep: 'Kapitel-Vers-Trenner',
    settingsChapterVerseSepDesc: 'Trenner zwischen Kapitel und Vers (z.B. "," für Joh 3,16)',
    settingsListSep: 'Listen-Trenner',
    settingsListSepDesc: 'Trenner für Vers-Listen (z.B. "." für Joh 3,16.18)',
    settingsRangeSep: 'Bereich-Trenner',
    settingsRangeSepDesc: 'Trenner für Vers-Bereiche (z.B. "-" für Joh 3,16-18)',
    presetGerman: 'Joh 3,16-18.20',
    presetEnglish: 'Joh 3:16-18,20',
    presetCustom: 'Benutzerdefiniert',

    // Settings - Frontmatter
    settingsFrontmatterKey: 'Frontmatter-Schluessel',
    settingsFrontmatterKeyDesc: 'Name der Property im Frontmatter (Standard: _bible_refs)',
    settingsTagPrefix: 'Tag-Praefix',
    settingsTagPrefixDesc: 'Praefix fuer generierte Tags (z.B. "bible/" -> bible/Joh/3/16)',

    // Settings - Graph View
    settingsGraphViewSection: 'Graph View',
    settingsGraphViewSectionDesc: 'Einstellungen fuer die Darstellung im Obsidian Graph',
    settingsWriteToTags: 'Graph View aktivieren (Tags)',
    settingsWriteToTagsDesc: 'Bibelreferenzen zusaetzlich im Standard-Tags-Feld speichern (fuer Graph View)',
    settingsGraphTagGranularity: 'Tag-Granularitaet',
    settingsGraphTagGranularityDesc: 'Wie detailliert sollen die Tags im Graph sein?',
    graphGranularityBook: 'Nur Buch (z.B. bible/Joh)',
    graphGranularityChapter: 'Buch + Kapitel (z.B. bible/Joh/3)',
    graphGranularityVerse: 'Vollstaendig (z.B. bible/Joh/3/16)',
    settingsApplyAndSync: 'Aenderungen anwenden',
    settingsApplyAndSyncDesc: 'Alle Dateien mit den neuen Einstellungen synchronisieren',
    settingsApplyAndSyncButton: 'Anwenden und Synchronisieren',

    // Quick Settings (Sidebar)
    quickSettingsTooltip: 'Einstellungen für Graph View',
    quickSettingsGranularity: 'Tag-Granularitaet',

    // Settings - Sync Enhancements
    settingsSyncCommandHint: 'Tipp: Nutze Cmd+Shift+P und suche nach "sync" fuer schnellen Zugriff.',
    settingsSyncAllButton: 'Alle Dateien synchronisieren',
    settingsSyncAllButtonDesc: 'Startet eine vollstaendige Synchronisation aller Markdown-Dateien.',
    settingsSyncAllButtonText: 'Jetzt synchronisieren',

    // Sync Timeout
    syncButtonTimeout: 'Zeitlimit',

    // Settings - Parsing
    settingsParseCodeBlocks: 'Code-Blöcke parsen',
    settingsParseCodeBlocksDesc: 'Bibelreferenzen auch in Code-Blöcken erkennen',
    settingsParseTitles: 'Dateinamen parsen',
    settingsParseTitlesDesc: 'Bibelverse im Dateinamen erkennen (z.B. "Joh 3,16 - Gottes Liebe.md")',

    // Settings - Link Behavior
    settingsLinkBehavior: 'Link-Verhalten',
    settingsLinkBehaviorDesc: 'Wie sollen Vers-links aus der Sidebar geöffnet werden?',
    linkBehaviorSameTab: 'Im gleichen Tab',
    linkBehaviorNewTab: 'In neuem Tab',
    linkBehaviorSplit: 'Nebeneinander (Split View)',

    // Settings - Tips
    settingsParallelTip: 'Parallelstellen',
    settingsParallelTipDesc: 'Dieses Plugin geht davon aus, dass alle in einer Notiz erwähnten Verse als Parallelstellen zu verstehen sind (Prinzip: Atomic Notes -> Immer nur ein Gedanke/Thema pro Notiz). Dadurch kannst du auch eigene Parallelstellen-Listen erstellen! Erstelle z.B. eine thematische Notiz ("Gottes Liebe", "Christus im AT", "Gottesknechtslieder" etc.) und liste alle verwandten Verse auf. Diese werden automatisch als Parallelen erkannt.',
    settingsInfo: 'Info',
    settingsInfoDesc: 'Bible Reference Mapper bietet bewusst keine fertigen Listen oder Textimports an. Alle Referenzen sollen aus deinem persönlichen Bibelstudium entstehen. Obsidian bietet die Referenz und Struktur. Aufschlagen musst du deine Bibel dann selbst. ',

    // Settings - Book Mappings
    settingsBookMappingsVisual: 'Buchmappings',
    settingsBookMappingsVisualDesc: 'Hier hast du die Möglichkeit zu definieren, wie die Bücher der Bibel in deinen Notizen erkannt werden sollen. Du kannst Aliase (Kurzformen) und Langformen (Volltitel) für jedes Buch festlegen. So kannst du sicherstellen, dass Bibelreferenzen in verschiedenen Schreibweisen korrekt erkannt werden.',
    settingsBookMappingsJson: 'JSON-Mappings (Erweitert)',
    settingsBookMappingsJsonDesc: 'Direkte Bearbeitung der Mappings als JSON',
    settingsOldTestament: 'Altes Testament',
    settingsNewTestament: 'Neues Testament',
    settingsAliasesLabel: 'Kurzform (Abkürzungen)',
    settingsStandalonePatternsLabel: 'Langform (Volltitel)',
    settingsPillInputPlaceholder: 'Eingabe zum Hinzufügen...',
    settingsSearchBooksPlaceholder: 'Bücher durchsuchen...',
    settingsBookMappingsWarning: 'Achtung: Das Löschen aller Aliase kann dazu führen, dass Bibelstellen nicht mehr erkannt werden.',
    settingsDisplayIdExplanation: 'Der aktuell gepinnte Alias ist die für Sie überall im Interface sichtbare Anzeige des Buches. Sie können eine andere Schreibweise als Ihren bevorzugten Alias pinnen, indem Sie auf das Pin-Symbol klicken.',
    settingsCannotDeleteCanonicalId: 'Die kanonische ID kann nicht gelöscht werden.',
  },

  en: {
    // Commands
    commandOpenSidebar: 'Open Bible References',
    commandSyncCurrent: 'Sync Current File',
    commandSyncAll: 'Sync All Files',

    // Sidebar
    sidebarTitle: 'Bible References',
    sidebarTabDirect: 'References',
    sidebarTabParallel: 'Parallels',
    sidebarTabGlobal: 'Search',
    sidebarNoReferences: 'No Bible references found',
    sidebarNoOtherNotes: 'No other notes with this verse',
    sidebarEmpty: 'Open a note with Bible references...',
    sidebarReferenceCount: '{count} reference(s)',
    sidebarParallelCount: '{count} note(s)',
    sidebarSelectBook: 'Select book',
    sidebarSelectChapter: 'Chapter',
    sidebarSelectVerse: 'Verse',
    sidebarNotesWithVerse: 'Notes with {verse}:',

    // Sync Button
    syncButtonSync: 'Sync',
    syncButtonSyncing: 'Syncing...',
    syncButtonSynced: 'Done',
    syncButtonError: 'Error',

    // Notices
    noticeSynced: '{count} Bible reference(s) synced',
    noticeNoChanges: 'No changes',
    noticeError: 'Error syncing',
    noticeNoFile: 'No markdown file open',
    noticeSyncAll: '{changed}/{total} files updated ({duration}s)',
    noticeMigration: '{count} files migrated to new format',

    // Settings Sections
    settingsLanguageSection: 'Language',
    settingsLanguageSectionDesc: 'Plugin language and UI texts',
    settingsSyncSection: 'Synchronization',
    settingsSyncSectionDesc: 'When and how to sync',
    settingsFormatSection: 'Format',
    settingsFormatSectionDesc: 'Separators for Bible references',
    settingsFrontmatterSection: 'Frontmatter',
    settingsFrontmatterSectionDesc: 'Tags and metadata settings',
    settingsParsingSection: 'Detection',
    settingsParsingSectionDesc: 'What is detected as Bible reference',
    settingsBehaviorSection: 'Behavior',
    settingsBehaviorSectionDesc: 'Link behavior and interactions',
    settingsAdvancedSection: 'Advanced',
    settingsAdvancedSectionDesc: 'Book mappings and JSON editor',
    settingsInfoSection: 'Info',
    settingsInfoSectionDesc: 'Tips for using the plugin',

    // Settings - Danger Zone
    settingsDangerZone: 'Danger Zone',
    settingsDangerZoneDesc: 'Irreversible actions',
    settingsResetToDefault: 'Reset to Default',
    settingsResetToDefaultDesc: 'Reset all settings to their default values',
    settingsResetToDefaultButton: 'Reset',
    settingsResetToDefaultConfirm: 'Are you sure you want to reset all settings? This action cannot be undone.',

    // Settings - UI Language
    settingsUiLanguage: 'Plugin Language',
    settingsUiLanguageDesc: 'Language for UI texts (commands, sidebar, messages)',

    // Settings - Sync
    settingsSyncTitle: 'When to sync?',
    syncOnSave: 'On Save',
    syncOnSaveDesc: 'Sync on Ctrl+S / Cmd+S',
    syncOnFileChange: 'On File Change',
    syncOnFileChangeDesc: 'Sync when switching to another file',
    syncManualHint: 'Tip: If both are disabled, use the Sync button in the sidebar or the "Sync Current File" command',

    // Settings - Format
    settingsLanguagePreset: 'Format Preset',
    settingsLanguagePresetDesc: 'Determines separators for Bible references',
    settingsChapterVerseSep: 'Chapter-Verse Separator',
    settingsChapterVerseSepDesc: 'Separator between chapter and verse (e.g., ":" for John 3:16)',
    settingsListSep: 'List Separator',
    settingsListSepDesc: 'Separator for verse lists (e.g., "," for John 3:16,18)',
    settingsRangeSep: 'Range Separator',
    settingsRangeSepDesc: 'Separator for verse ranges (e.g., "-" for John 3:16-18)',
    presetGerman: 'Joh 3,16-18.20',
    presetEnglish: 'John 3:16-18,20',
    presetCustom: 'Custom',

    // Settings - Frontmatter
    settingsFrontmatterKey: 'Frontmatter Key',
    settingsFrontmatterKeyDesc: 'Property name in frontmatter (default: _bible_refs)',
    settingsTagPrefix: 'Tag Prefix',
    settingsTagPrefixDesc: 'Prefix for generated tags (e.g., "bible/" -> bible/Joh/3/16)',

    // Settings - Graph View
    settingsGraphViewSection: 'Graph View',
    settingsGraphViewSectionDesc: 'Settings for display in Obsidian Graph',
    settingsWriteToTags: 'Enable Graph View (Tags)',
    settingsWriteToTagsDesc: 'Also save Bible references to the standard tags field (for Graph View visibility)',
    settingsGraphTagGranularity: 'Tag Granularity',
    settingsGraphTagGranularityDesc: 'How detailed should tags be in the graph?',
    graphGranularityBook: 'Book only (e.g. bible/Joh)',
    graphGranularityChapter: 'Book + Chapter (e.g. bible/Joh/3)',
    graphGranularityVerse: 'Full detail (e.g. bible/Joh/3/16)',
    settingsApplyAndSync: 'Apply changes',
    settingsApplyAndSyncDesc: 'Synchronize all files with the new settings',
    settingsApplyAndSyncButton: 'Apply and Sync',

    // Quick Settings (Sidebar)
    quickSettingsTooltip: 'Graph View Settings',
    quickSettingsGranularity: 'Tag Granularity',

    // Settings - Sync Enhancements
    settingsSyncCommandHint: 'Tip: Use Cmd+Shift+P and search for "sync" for quick access.',
    settingsSyncAllButton: 'Sync All Files',
    settingsSyncAllButtonDesc: 'Starts a full synchronization of all Markdown files in the vault.',
    settingsSyncAllButtonText: 'Sync Now',

    // Sync Timeout
    syncButtonTimeout: 'Timeout',

    // Settings - Parsing
    settingsParseCodeBlocks: 'Parse Code Blocks',
    settingsParseCodeBlocksDesc: 'Detect Bible references in code blocks',
    settingsParseTitles: 'Parse Filenames',
    settingsParseTitlesDesc: 'Detect Bible verses in filenames (e.g., "John 3,16 - God\'s Love.md")',

    // Settings - Link Behavior
    settingsLinkBehavior: 'Link Behavior',
    settingsLinkBehaviorDesc: 'How should links in the sidebar open?',
    linkBehaviorSameTab: 'Same Tab',
    linkBehaviorNewTab: 'New Tab',
    linkBehaviorSplit: 'Side by Side (Split View)',

    // Settings - Tips
    settingsParallelTip: 'Parallel Passages',
    settingsParallelTipDesc: 'This plugin assumes that all verses mentioned in a note should be understood as parallel passages (principle: Atomic Notes → always just one idea/theme per note). This also allows you to create your own parallel passage lists! For example, create a thematic note ("God\'s Love", "Christ in the Old Testament", "Servant Songs" etc.) and list all related verses. These will automatically be recognized as parallels.',
    settingsInfo: 'Info',
    settingsInfoDesc: 'Bible Reference Mapper deliberately offers no pre-made lists or text imports. All references should come from your personal Bible study. Obsidian provides the reference and structure. You still have to open your Bible yourself.',

    // Settings - Book Mappings
    settingsBookMappingsVisual: 'Book Mappings',
    settingsBookMappingsVisualDesc: 'Here you can define how Bible books are recognized in your notes. You can set aliases (short forms) and long forms (full titles) for each book. This ensures that Bible references are correctly identified regardless of the format used.',
    settingsBookMappingsJson: 'JSON Mappings (Advanced)',
    settingsBookMappingsJsonDesc: 'Direct editing of mappings as JSON',
    settingsOldTestament: 'Old Testament',
    settingsNewTestament: 'New Testament',
    settingsAliasesLabel: 'Short Form (Abbreviations)',
    settingsStandalonePatternsLabel: 'Long Form (Full Titles)',
    settingsPillInputPlaceholder: 'Press Enter to add...',
    settingsSearchBooksPlaceholder: 'Search books...',
    settingsBookMappingsWarning: 'Warning: Deleting all aliases may prevent Bible references from being detected.',
    settingsDisplayIdExplanation: 'The currently pinned alias is the display format you will see everywhere in the interface. You can pin a different format as your preferred alias by clicking the pin icon.',
    settingsCannotDeleteCanonicalId: 'The canonical ID cannot be deleted.',
  }
};
