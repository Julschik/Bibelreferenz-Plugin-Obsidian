/**
 * German (Deutsch) Language Configuration
 *
 * Single Source of Truth for German language support including:
 * - UI strings
 * - Book localizations with aliases
 * - Separator configuration
 * - Tag prefix
 */

import type { LanguageConfig } from './types';

export const GERMAN: LanguageConfig = {
  code: 'de',
  name: 'Deutsch',
  tagPrefix: 'Bibel',

  separators: {
    chapterVerse: ',',  // Joh 3,16
    list: '.',          // Joh 3,16.18
    range: '-',         // Joh 3,16-18
  },

  strings: {
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
    syncButtonTimeout: 'Zeitlimit',

    // Notices
    noticeSynced: '{count} Bibelreferenz(en) synchronisiert',
    noticeNoChanges: 'Keine Änderungen',
    noticeError: 'Fehler beim Synchronisieren',
    noticeNoFile: 'Keine Markdown-Datei geöffnet',
    noticeSyncAll: '{changed}/{total} Dateien aktualisiert ({duration}s)',
    noticeMigration: '{count} Dateien zum neuen Format migriert',
    noticeMigrationStarted: 'Migration gestartet: {oldId} → {newId}',
    noticeMigrationCompleted: 'Migration abgeschlossen: {changed}/{total} Dateien aktualisiert ({duration}s)',
    noticeLanguageMigration: 'Migriere {count} Bibelreferenzen...',
    noticeLanguageMigrationCompleted: '{count} Referenzen auf {language} migriert',

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
    settingsParsingSectionDesc: 'Was als Bibelreferenz erkannt wird',
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
    settingsFrontmatterKey: 'Frontmatter-Schlüssel',
    settingsFrontmatterKeyDesc: 'Name der Property im Frontmatter (Standard: _bible_refs)',
    settingsTagPrefix: 'Tag-Präfix',
    settingsTagPrefixDesc: 'Präfix für generierte Tags (z.B. "Bibel/" -> Bibel/Joh/3/16)',

    // Settings - Graph View
    settingsGraphViewSection: 'Graph View',
    settingsGraphViewSectionDesc: 'Einstellungen für die Darstellung im Obsidian Graph',
    settingsWriteToTags: 'Graph View aktivieren (Tags)',
    settingsWriteToTagsDesc: 'Bibelreferenzen zusätzlich im Standard-Tags-Feld speichern (für Graph View)',
    settingsGraphTagGranularity: 'Tag-Granularität',
    settingsGraphTagGranularityDesc: 'Wie detailliert sollen die Tags im Graph sein?',
    graphGranularityBook: 'Nur Buch (z.B. Bibel/Joh)',
    graphGranularityChapter: 'Buch + Kapitel (z.B. Bibel/Joh/3)',
    graphGranularityVerse: 'Vollständig (z.B. Bibel/Joh/3/16)',
    settingsApplyAndSync: 'Änderungen anwenden',
    settingsApplyAndSyncDesc: 'Alle Dateien mit den neuen Einstellungen synchronisieren',
    settingsApplyAndSyncButton: 'Anwenden und Synchronisieren',

    // Quick Settings (Sidebar)
    quickSettingsTitle: 'Schnelleinstellungen',
    quickSettingsTooltip: 'Schnelleinstellungen',
    quickSettingsGranularity: 'Tag-Granularität',

    // Sort Options
    sortOrderSection: 'Sortierung',
    sortDocument: 'Dokumentreihenfolge',
    sortCanonical: 'Bibelreihenfolge (Gen→Offb)',
    sortAlphaAsc: 'Alphabetisch A→Z',
    sortAlphaDesc: 'Alphabetisch Z→A',
    sortCount: 'Nach Anzahl Notizen',

    // Settings - Sync Enhancements
    settingsSyncCommandHint: 'Tipp: Nutze Cmd+Shift+P und suche nach "sync" für schnellen Zugriff.',
    settingsSyncAllButton: 'Alle Dateien synchronisieren',
    settingsSyncAllButtonDesc: 'Startet eine vollständige Synchronisation aller Markdown-Dateien.',
    settingsSyncAllButtonText: 'Jetzt synchronisieren',

    // Settings - Parsing
    settingsParseCodeBlocks: 'Code-Blöcke parsen',
    settingsParseCodeBlocksDesc: 'Bibelreferenzen auch in Code-Blöcken erkennen',
    settingsParseTitles: 'Dateinamen parsen',
    settingsParseTitlesDesc: 'Bibelverse im Dateinamen erkennen (z.B. "Joh 3,16 - Gottes Liebe.md")',

    // Settings - Link Behavior
    settingsLinkBehavior: 'Link-Verhalten',
    settingsLinkBehaviorDesc: 'Wie sollen Vers-Links aus der Sidebar geöffnet werden?',
    linkBehaviorSameTab: 'Im gleichen Tab',
    linkBehaviorNewTab: 'In neuem Tab',
    linkBehaviorSplit: 'Nebeneinander (Split View)',

    // Settings - Tips
    settingsParallelTip: 'Parallelstellen',
    settingsParallelTipDesc: 'Dieses Plugin geht davon aus, dass alle in einer Notiz erwähnten Verse als Parallelstellen zu verstehen sind (Prinzip: Atomic Notes). Erstelle thematische Notizen und liste alle verwandten Verse auf - diese werden automatisch als Parallelen erkannt.',
    settingsInfo: 'Info',
    settingsInfoDesc: 'Bible Reference Mapper bietet bewusst keine fertigen Listen oder Textimports an. Alle Referenzen sollen aus deinem persönlichen Bibelstudium entstehen.',

    // Settings - Book Mappings
    settingsBookMappingsVisual: 'Buchmappings',
    settingsBookMappingsVisualDesc: 'Definiere, wie die Bücher der Bibel in deinen Notizen erkannt werden sollen.',
    settingsBookMappingsJson: 'JSON-Mappings (Erweitert)',
    settingsBookMappingsJsonDesc: 'Direkte Bearbeitung der Mappings als JSON',
    settingsOldTestament: 'Altes Testament',
    settingsNewTestament: 'Neues Testament',
    settingsAliasesLabel: 'Kurzform (Abkürzungen)',
    settingsStandalonePatternsLabel: 'Langform (Volltitel)',
    settingsPillInputPlaceholder: 'Eingabe zum Hinzufügen...',
    settingsSearchBooksPlaceholder: 'Bücher durchsuchen...',
    settingsBookMappingsWarning: 'Achtung: Das Löschen aller Aliase kann dazu führen, dass Bibelstellen nicht mehr erkannt werden.',
    settingsDisplayIdExplanation: 'Der gepinnte Alias ist die überall im Interface sichtbare Anzeige des Buches.',
    settingsCannotDeleteCanonicalId: 'Die kanonische ID kann nicht gelöscht werden.',
  },

  books: [
    // ═══════════════════════════════════════════════════════════════
    // ALTES TESTAMENT (Books 1-39)
    // ═══════════════════════════════════════════════════════════════

    // Pentateuch
    {
      bookId: 1,
      canonicalId: 'Gen',
      displayId: '1Mo',
      displayName: 'Genesis',
      aliases: ['Genesis', '1. Mose', '1.Mose', '1 Mose', '1Mose', '1. Mo.', '1. Mo', '1.Mo.', '1.Mo', 'Gen.', 'Gen'],
      standalonePatterns: ['1. Buch Mose', 'Erstes Buch Mose', 'Genesis']
    },
    {
      bookId: 2,
      canonicalId: 'Exo',
      displayId: '2Mo',
      displayName: 'Exodus',
      aliases: ['Exodus', '2. Mose', '2.Mose', '2 Mose', '2Mose', '2. Mo.', '2. Mo', '2.Mo.', '2.Mo', 'Exo', 'Ex.', 'Ex'],
      standalonePatterns: ['2. Buch Mose', 'Zweites Buch Mose', 'Exodus']
    },
    {
      bookId: 3,
      canonicalId: 'Lev',
      displayId: '3Mo',
      displayName: 'Levitikus',
      aliases: ['Levitikus', 'Leviticus', '3. Mose', '3.Mose', '3 Mose', '3Mose', '3. Mo.', '3. Mo', '3.Mo.', '3.Mo', 'Lev.', 'Lev'],
      standalonePatterns: ['3. Buch Mose', 'Drittes Buch Mose', 'Levitikus']
    },
    {
      bookId: 4,
      canonicalId: 'Num',
      displayId: '4Mo',
      displayName: 'Numeri',
      aliases: ['Numeri', '4. Mose', '4.Mose', '4 Mose', '4Mose', '4. Mo.', '4. Mo', '4.Mo.', '4.Mo', 'Num.', 'Num'],
      standalonePatterns: ['4. Buch Mose', 'Viertes Buch Mose', 'Numeri']
    },
    {
      bookId: 5,
      canonicalId: 'Deu',
      displayId: '5Mo',
      displayName: 'Deuteronomium',
      aliases: ['Deuteronomium', '5. Mose', '5.Mose', '5 Mose', '5Mose', '5. Mo.', '5. Mo', '5.Mo.', '5.Mo', 'Dtn.', 'Dtn'],
      standalonePatterns: ['5. Buch Mose', 'Fünftes Buch Mose', 'Deuteronomium']
    },

    // Historical Books
    {
      bookId: 6,
      canonicalId: 'Jos',
      displayId: 'Jos',
      displayName: 'Josua',
      aliases: ['Josua', 'Jos.', 'Jos', 'Josh'],
      standalonePatterns: ['Das Buch Josua']
    },
    {
      bookId: 7,
      canonicalId: 'Jdg',
      displayId: 'Ri',
      displayName: 'Richter',
      aliases: ['Richter', 'Ri.', 'Ri', 'Rich'],
      standalonePatterns: ['Das Buch der Richter', 'Richterbuch']
    },
    {
      bookId: 8,
      canonicalId: 'Rut',
      displayId: 'Rut',
      displayName: 'Ruth',
      aliases: ['Ruth', 'Rut.', 'Rut', 'Rt.', 'Rt'],
      standalonePatterns: ['Das Buch Ruth', 'Das Buch Rut']
    },
    {
      bookId: 9,
      canonicalId: '1Sa',
      displayId: '1Sam',
      displayName: '1. Samuel',
      aliases: ['1. Samuel', '1.Samuel', '1 Samuel', '1Samuel', '1. Sam.', '1. Sam', '1.Sam.', '1.Sam', '1 Sam', '1Sam'],
      standalonePatterns: ['1. Buch Samuel', 'Erstes Buch Samuel']
    },
    {
      bookId: 10,
      canonicalId: '2Sa',
      displayId: '2Sam',
      displayName: '2. Samuel',
      aliases: ['2. Samuel', '2.Samuel', '2 Samuel', '2Samuel', '2. Sam.', '2. Sam', '2.Sam.', '2.Sam', '2 Sam', '2Sam'],
      standalonePatterns: ['2. Buch Samuel', 'Zweites Buch Samuel']
    },
    {
      bookId: 11,
      canonicalId: '1Ki',
      displayId: '1Kön',
      displayName: '1. Könige',
      aliases: ['1. Könige', '1.Könige', '1 Könige', '1Könige', '1. Kön.', '1. Kön', '1.Kön.', '1.Kön', '1 Kön', '1Kön', '1Ki'],
      standalonePatterns: ['1. Buch der Könige', 'Erstes Buch der Könige']
    },
    {
      bookId: 12,
      canonicalId: '2Ki',
      displayId: '2Kön',
      displayName: '2. Könige',
      aliases: ['2. Könige', '2.Könige', '2 Könige', '2Könige', '2. Kön.', '2. Kön', '2.Kön.', '2.Kön', '2 Kön', '2Kön', '2Ki'],
      standalonePatterns: ['2. Buch der Könige', 'Zweites Buch der Könige']
    },
    {
      bookId: 13,
      canonicalId: '1Ch',
      displayId: '1Chr',
      displayName: '1. Chronik',
      aliases: ['1. Chronik', '1.Chronik', '1 Chronik', '1Chronik', '1. Chr.', '1. Chr', '1.Chr.', '1.Chr', '1 Chr', '1Chr'],
      standalonePatterns: ['1. Buch der Chronik', 'Erstes Buch der Chronik']
    },
    {
      bookId: 14,
      canonicalId: '2Ch',
      displayId: '2Chr',
      displayName: '2. Chronik',
      aliases: ['2. Chronik', '2.Chronik', '2 Chronik', '2Chronik', '2. Chr.', '2. Chr', '2.Chr.', '2.Chr', '2 Chr', '2Chr'],
      standalonePatterns: ['2. Buch der Chronik', 'Zweites Buch der Chronik']
    },
    {
      bookId: 15,
      canonicalId: 'Ezr',
      displayId: 'Esr',
      displayName: 'Esra',
      aliases: ['Esra', 'Esr.', 'Esr', 'Ezr'],
      standalonePatterns: ['Das Buch Esra']
    },
    {
      bookId: 16,
      canonicalId: 'Neh',
      displayId: 'Neh',
      displayName: 'Nehemia',
      aliases: ['Nehemia', 'Neh.', 'Neh'],
      standalonePatterns: ['Das Buch Nehemia']
    },
    {
      bookId: 17,
      canonicalId: 'Est',
      displayId: 'Est',
      displayName: 'Esther',
      aliases: ['Esther', 'Ester', 'Est.', 'Est'],
      standalonePatterns: ['Das Buch Esther', 'Das Buch Ester']
    },

    // Poetic Books
    {
      bookId: 18,
      canonicalId: 'Job',
      displayId: 'Hi',
      displayName: 'Hiob',
      aliases: ['Hiob', 'Ijob', 'Hi.', 'Hi', 'Job'],
      standalonePatterns: ['Das Buch Hiob', 'Das Buch Ijob']
    },
    {
      bookId: 19,
      canonicalId: 'Psa',
      displayId: 'Ps',
      displayName: 'Psalmen',
      aliases: ['Psalmen', 'Psalm', 'Ps.', 'Pss', 'Ps', 'Psa'],
      standalonePatterns: ['Der Psalter', 'Das Buch der Psalmen']
    },
    {
      bookId: 20,
      canonicalId: 'Pro',
      displayId: 'Spr',
      displayName: 'Sprüche',
      aliases: ['Sprüche', 'Spr.', 'Spr', 'Pro', 'Prov'],
      standalonePatterns: ['Die Sprüche Salomos', 'Sprüche', 'Buch der Sprüche']
    },
    {
      bookId: 21,
      canonicalId: 'Ecc',
      displayId: 'Pred',
      displayName: 'Prediger',
      aliases: ['Prediger', 'Kohelet', 'Pred.', 'Pred', 'Koh.', 'Koh', 'Ecc'],
      standalonePatterns: ['Der Prediger Salomo', 'Kohelet', 'Buch Prediger']
    },
    {
      bookId: 22,
      canonicalId: 'Son',
      displayId: 'Hld',
      displayName: 'Hoheslied',
      aliases: ['Hoheslied', 'Hohelied', 'Hld.', 'Hld', 'HL'],
      standalonePatterns: ['Das Hohelied Salomos', 'Das Hohelied']
    },

    // Major Prophets
    {
      bookId: 23,
      canonicalId: 'Isa',
      displayId: 'Jes',
      displayName: 'Jesaja',
      aliases: ['Jesaja', 'Jes.', 'Jes', 'Isa'],
      standalonePatterns: ['Das Buch Jesaja']
    },
    {
      bookId: 24,
      canonicalId: 'Jer',
      displayId: 'Jer',
      displayName: 'Jeremia',
      aliases: ['Jeremia', 'Jer.', 'Jer'],
      standalonePatterns: ['Das Buch Jeremia']
    },
    {
      bookId: 25,
      canonicalId: 'Lam',
      displayId: 'Klgl',
      displayName: 'Klagelieder',
      aliases: ['Klagelieder', 'Klgl.', 'Klgl', 'Klag', 'Lam'],
      standalonePatterns: ['Die Klagelieder Jeremias', 'Klagelieder']
    },
    {
      bookId: 26,
      canonicalId: 'Eze',
      displayId: 'Hes',
      displayName: 'Hesekiel',
      aliases: ['Hesekiel', 'Ezechiel', 'Hes.', 'Hes', 'Ez.', 'Ez', 'Eze'],
      standalonePatterns: ['Das Buch Hesekiel', 'Das Buch Ezechiel']
    },
    {
      bookId: 27,
      canonicalId: 'Dan',
      displayId: 'Dan',
      displayName: 'Daniel',
      aliases: ['Daniel', 'Dan.', 'Dan', 'Da'],
      standalonePatterns: ['Das Buch Daniel']
    },

    // Minor Prophets
    {
      bookId: 28,
      canonicalId: 'Hos',
      displayId: 'Hos',
      displayName: 'Hosea',
      aliases: ['Hosea', 'Hos.', 'Hos'],
      standalonePatterns: ['Das Buch Hosea']
    },
    {
      bookId: 29,
      canonicalId: 'Joe',
      displayId: 'Joel',
      displayName: 'Joel',
      aliases: ['Joel', 'Jl.', 'Jl', 'Joe'],
      standalonePatterns: ['Das Buch Joel']
    },
    {
      bookId: 30,
      canonicalId: 'Amo',
      displayId: 'Am',
      displayName: 'Amos',
      aliases: ['Amos', 'Am.', 'Am', 'Amo'],
      standalonePatterns: ['Das Buch Amos']
    },
    {
      bookId: 31,
      canonicalId: 'Oba',
      displayId: 'Obd',
      displayName: 'Obadja',
      aliases: ['Obadja', 'Obd.', 'Obd', 'Oba', 'Ob'],
      standalonePatterns: ['Das Buch Obadja']
    },
    {
      bookId: 32,
      canonicalId: 'Jon',
      displayId: 'Jona',
      displayName: 'Jona',
      aliases: ['Jona', 'Jon.', 'Jon'],
      standalonePatterns: ['Das Buch Jona']
    },
    {
      bookId: 33,
      canonicalId: 'Mic',
      displayId: 'Mi',
      displayName: 'Micha',
      aliases: ['Micha', 'Mi.', 'Mi', 'Mic'],
      standalonePatterns: ['Das Buch Micha']
    },
    {
      bookId: 34,
      canonicalId: 'Nah',
      displayId: 'Nah',
      displayName: 'Nahum',
      aliases: ['Nahum', 'Nah.', 'Nah', 'Na'],
      standalonePatterns: ['Das Buch Nahum']
    },
    {
      bookId: 35,
      canonicalId: 'Hab',
      displayId: 'Hab',
      displayName: 'Habakuk',
      aliases: ['Habakuk', 'Hab.', 'Hab', 'Hk'],
      standalonePatterns: ['Das Buch Habakuk']
    },
    {
      bookId: 36,
      canonicalId: 'Zep',
      displayId: 'Zef',
      displayName: 'Zefanja',
      aliases: ['Zephanja', 'Zefanja', 'Zeph', 'Zef.', 'Zef', 'Zep'],
      standalonePatterns: ['Das Buch Zephanja', 'Das Buch Zefanja']
    },
    {
      bookId: 37,
      canonicalId: 'Hag',
      displayId: 'Hag',
      displayName: 'Haggai',
      aliases: ['Haggai', 'Hag.', 'Hag', 'Hg'],
      standalonePatterns: ['Das Buch Haggai']
    },
    {
      bookId: 38,
      canonicalId: 'Zec',
      displayId: 'Sach',
      displayName: 'Sacharja',
      aliases: ['Sacharja', 'Sach.', 'Sach', 'Zec'],
      standalonePatterns: ['Das Buch Sacharja']
    },
    {
      bookId: 39,
      canonicalId: 'Mal',
      displayId: 'Mal',
      displayName: 'Maleachi',
      aliases: ['Maleachi', 'Mal.', 'Mal'],
      standalonePatterns: ['Das Buch Maleachi']
    },

    // ═══════════════════════════════════════════════════════════════
    // NEUES TESTAMENT (Books 40-66)
    // ═══════════════════════════════════════════════════════════════

    // Gospels
    {
      bookId: 40,
      canonicalId: 'Mat',
      displayId: 'Mt',
      displayName: 'Matthäus',
      aliases: ['Matthäus', 'Matth.', 'Matt.', 'Matt', 'Mt.', 'Mt'],
      standalonePatterns: ['Das Evangelium nach Matthäus', 'Matthäusevangelium']
    },
    {
      bookId: 41,
      canonicalId: 'Mar',
      displayId: 'Mk',
      displayName: 'Markus',
      aliases: ['Markus', 'Mark.', 'Mark', 'Mk.', 'Mk'],
      standalonePatterns: ['Das Evangelium nach Markus', 'Markusevangelium']
    },
    {
      bookId: 42,
      canonicalId: 'Luk',
      displayId: 'Lk',
      displayName: 'Lukas',
      aliases: ['Lukas', 'Luk.', 'Luk', 'Lk.', 'Lk'],
      standalonePatterns: ['Das Evangelium nach Lukas', 'Lukasevangelium']
    },
    {
      bookId: 43,
      canonicalId: 'Joh',
      displayId: 'Joh',
      displayName: 'Johannes',
      aliases: ['Johannes', 'Joh.', 'Joh', 'Jo', 'Jn'],
      standalonePatterns: ['Das Evangelium nach Johannes', 'Johannesevangelium']
    },

    // History
    {
      bookId: 44,
      canonicalId: 'Act',
      displayId: 'Apg',
      displayName: 'Apostelgeschichte',
      aliases: ['Apostelgeschichte', 'Apg.', 'Apg', 'Act'],
      standalonePatterns: ['Die Apostelgeschichte']
    },

    // Pauline Epistles
    {
      bookId: 45,
      canonicalId: 'Rom',
      displayId: 'Röm',
      displayName: 'Römer',
      aliases: ['Römerbrief', 'Römer', 'Röm.', 'Röm', 'Rm', 'Rom'],
      standalonePatterns: ['Der Brief an die Römer', 'Römerbrief']
    },
    {
      bookId: 46,
      canonicalId: '1Co',
      displayId: '1Kor',
      displayName: '1. Korinther',
      aliases: ['1. Korinther', '1.Korinther', '1 Korinther', '1Korinther', '1. Kor.', '1. Kor', '1.Kor.', '1.Kor', '1 Kor', '1Kor', '1Co'],
      standalonePatterns: ['1. Korintherbrief', 'Erster Korintherbrief']
    },
    {
      bookId: 47,
      canonicalId: '2Co',
      displayId: '2Kor',
      displayName: '2. Korinther',
      aliases: ['2. Korinther', '2.Korinther', '2 Korinther', '2Korinther', '2. Kor.', '2. Kor', '2.Kor.', '2.Kor', '2 Kor', '2Kor', '2Co'],
      standalonePatterns: ['2. Korintherbrief', 'Zweiter Korintherbrief']
    },
    {
      bookId: 48,
      canonicalId: 'Gal',
      displayId: 'Gal',
      displayName: 'Galater',
      aliases: ['Galater', 'Gal.', 'Gal'],
      standalonePatterns: ['Der Brief an die Galater', 'Galaterbrief']
    },
    {
      bookId: 49,
      canonicalId: 'Eph',
      displayId: 'Eph',
      displayName: 'Epheser',
      aliases: ['Epheser', 'Eph.', 'Eph'],
      standalonePatterns: ['Der Brief an die Epheser', 'Epheserbrief']
    },
    {
      bookId: 50,
      canonicalId: 'Phi',
      displayId: 'Phil',
      displayName: 'Philipper',
      aliases: ['Philipper', 'Phil.', 'Phil', 'Php'],
      standalonePatterns: ['Der Brief an die Philipper', 'Philipperbrief']
    },
    {
      bookId: 51,
      canonicalId: 'Col',
      displayId: 'Kol',
      displayName: 'Kolosser',
      aliases: ['Kolosser', 'Kol.', 'Kol', 'Col'],
      standalonePatterns: ['Der Brief an die Kolosser', 'Kolosserbrief']
    },
    {
      bookId: 52,
      canonicalId: '1Th',
      displayId: '1Thess',
      displayName: '1. Thessalonicher',
      aliases: ['1. Thessalonicher', '1.Thessalonicher', '1 Thessalonicher', '1Thessalonicher', '1. Thess.', '1. Thess', '1.Thess.', '1.Thess', '1 Thess', '1Thess', '1Th'],
      standalonePatterns: ['1. Thessalonicherbrief']
    },
    {
      bookId: 53,
      canonicalId: '2Th',
      displayId: '2Thess',
      displayName: '2. Thessalonicher',
      aliases: ['2. Thessalonicher', '2.Thessalonicher', '2 Thessalonicher', '2Thessalonicher', '2. Thess.', '2. Thess', '2.Thess.', '2.Thess', '2 Thess', '2Thess', '2Th'],
      standalonePatterns: ['2. Thessalonicherbrief']
    },
    {
      bookId: 54,
      canonicalId: '1Ti',
      displayId: '1Tim',
      displayName: '1. Timotheus',
      aliases: ['1. Timotheus', '1.Timotheus', '1 Timotheus', '1Timotheus', '1. Tim.', '1. Tim', '1.Tim.', '1.Tim', '1 Tim', '1Tim'],
      standalonePatterns: ['1. Timotheusbrief']
    },
    {
      bookId: 55,
      canonicalId: '2Ti',
      displayId: '2Tim',
      displayName: '2. Timotheus',
      aliases: ['2. Timotheus', '2.Timotheus', '2 Timotheus', '2Timotheus', '2. Tim.', '2. Tim', '2.Tim.', '2.Tim', '2 Tim', '2Tim'],
      standalonePatterns: ['2. Timotheusbrief']
    },
    {
      bookId: 56,
      canonicalId: 'Tit',
      displayId: 'Tit',
      displayName: 'Titus',
      aliases: ['Titusbrief', 'Titus', 'Tit.', 'Tit'],
      standalonePatterns: ['Der Brief an Titus', 'Titusbrief']
    },
    {
      bookId: 57,
      canonicalId: 'Phm',
      displayId: 'Phlm',
      displayName: 'Philemon',
      aliases: ['Philemonbrief', 'Philemon', 'Phlm.', 'Phlm', 'Phm'],
      standalonePatterns: ['Der Brief an Philemon', 'Philemonbrief']
    },

    // General Epistles
    {
      bookId: 58,
      canonicalId: 'Heb',
      displayId: 'Hebr',
      displayName: 'Hebräer',
      aliases: ['Hebräerbrief', 'Hebräer', 'Hebr.', 'Hebr', 'Hbr'],
      standalonePatterns: ['Der Brief an die Hebräer', 'Hebräerbrief']
    },
    {
      bookId: 59,
      canonicalId: 'Jam',
      displayId: 'Jak',
      displayName: 'Jakobus',
      aliases: ['Jakobusbrief', 'Jakobus', 'Jak.', 'Jak', 'Jk'],
      standalonePatterns: ['Der Brief des Jakobus', 'Jakobusbrief']
    },
    {
      bookId: 60,
      canonicalId: '1Pe',
      displayId: '1Petr',
      displayName: '1. Petrus',
      aliases: ['1. Petrus', '1.Petrus', '1 Petrus', '1Petrus', '1. Petr.', '1. Petr', '1.Petr.', '1.Petr', '1 Petr', '1Petr', '1Pe', '1Pt'],
      standalonePatterns: ['1. Petrusbrief']
    },
    {
      bookId: 61,
      canonicalId: '2Pe',
      displayId: '2Petr',
      displayName: '2. Petrus',
      aliases: ['2. Petrus', '2.Petrus', '2 Petrus', '2Petrus', '2. Petr.', '2. Petr', '2.Petr.', '2.Petr', '2 Petr', '2Petr', '2Pe', '2Pt'],
      standalonePatterns: ['2. Petrusbrief']
    },
    {
      bookId: 62,
      canonicalId: '1Jo',
      displayId: '1Joh',
      displayName: '1. Johannes',
      aliases: ['1. Johannes', '1.Johannes', '1 Johannes', '1Johannes', '1. Joh.', '1. Joh', '1.Joh.', '1.Joh', '1 Joh', '1Joh', '1Jo'],
      standalonePatterns: ['1. Johannesbrief']
    },
    {
      bookId: 63,
      canonicalId: '2Jo',
      displayId: '2Joh',
      displayName: '2. Johannes',
      aliases: ['2. Johannes', '2.Johannes', '2 Johannes', '2Johannes', '2. Joh.', '2. Joh', '2.Joh.', '2.Joh', '2 Joh', '2Joh', '2Jo'],
      standalonePatterns: ['2. Johannesbrief']
    },
    {
      bookId: 64,
      canonicalId: '3Jo',
      displayId: '3Joh',
      displayName: '3. Johannes',
      aliases: ['3. Johannes', '3.Johannes', '3 Johannes', '3Johannes', '3. Joh.', '3. Joh', '3.Joh.', '3.Joh', '3 Joh', '3Joh', '3Jo'],
      standalonePatterns: ['3. Johannesbrief']
    },
    {
      bookId: 65,
      canonicalId: 'Jud',
      displayId: 'Jud',
      displayName: 'Judas',
      aliases: ['Judasbrief', 'Judas', 'Jud.', 'Jud'],
      standalonePatterns: ['Der Brief des Judas', 'Judasbrief']
    },

    // Revelation
    {
      bookId: 66,
      canonicalId: 'Rev',
      displayId: 'Offb',
      displayName: 'Offenbarung',
      aliases: ['Offenbarung des Johannes', 'Offenbarung', 'Apokalypse', 'Offb.', 'Offb', 'Off.', 'Off', 'Apk.', 'Apk', 'Rev'],
      standalonePatterns: ['Die Offenbarung des Johannes', 'Die Apokalypse']
    }
  ]
};
