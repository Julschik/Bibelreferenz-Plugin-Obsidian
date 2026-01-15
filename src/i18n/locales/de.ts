/**
 * German (Deutsch) locale strings
 */
import type { LocaleStrings } from '../types';

export const DE_LOCALE: LocaleStrings = {
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
  noticeMigrationStarted: 'Migration gestartet: {oldId} → {newId}',
  noticeMigrationCompleted: 'Migration abgeschlossen: {changed}/{total} Dateien aktualisiert ({duration}s)',

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
  quickSettingsTitle: 'Schnelleinstellungen',
  quickSettingsTooltip: 'Schnelleinstellungen',
  quickSettingsGranularity: 'Tag-Granularitaet',

  // Sort Options
  sortOrderSection: 'Sortierung',
  sortDocument: 'Dokumentreihenfolge',
  sortCanonical: 'Bibelreihenfolge (Gen→Offb)',
  sortAlphaAsc: 'Alphabetisch A→Z',
  sortAlphaDesc: 'Alphabetisch Z→A',
  sortCount: 'Nach Anzahl Notizen',

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
};
