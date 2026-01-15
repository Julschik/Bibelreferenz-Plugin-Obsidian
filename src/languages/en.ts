/**
 * English Language Configuration
 *
 * Single Source of Truth for English language support including:
 * - UI strings
 * - Book localizations with aliases
 * - Separator configuration
 * - Tag prefix
 */

import type { LanguageConfig } from './types';

export const ENGLISH: LanguageConfig = {
  code: 'en',
  name: 'English',
  tagPrefix: 'Bible',

  separators: {
    chapterVerse: ':',  // John 3:16
    list: ',',          // John 3:16,18
    range: '-',         // John 3:16-18
  },

  strings: {
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
    syncButtonTimeout: 'Timeout',

    // Notices
    noticeSynced: '{count} Bible reference(s) synced',
    noticeNoChanges: 'No changes',
    noticeError: 'Error syncing',
    noticeNoFile: 'No markdown file open',
    noticeSyncAll: '{changed}/{total} files updated ({duration}s)',
    noticeMigration: '{count} files migrated to new format',
    noticeMigrationStarted: 'Migration started: {oldId} → {newId}',
    noticeMigrationCompleted: 'Migration completed: {changed}/{total} files updated ({duration}s)',
    noticeLanguageMigration: 'Migrating {count} Bible references...',
    noticeLanguageMigrationCompleted: '{count} references migrated to {language}',

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
    presetGerman: 'John 3,16-18.20',
    presetEnglish: 'John 3:16-18,20',
    presetCustom: 'Custom',

    // Settings - Frontmatter
    settingsFrontmatterKey: 'Frontmatter Key',
    settingsFrontmatterKeyDesc: 'Property name in frontmatter (default: _bible_refs)',
    settingsTagPrefix: 'Tag Prefix',
    settingsTagPrefixDesc: 'Prefix for generated tags (e.g., "Bible/" -> Bible/John/3/16)',

    // Settings - Graph View
    settingsGraphViewSection: 'Graph View',
    settingsGraphViewSectionDesc: 'Settings for display in Obsidian Graph',
    settingsWriteToTags: 'Enable Graph View (Tags)',
    settingsWriteToTagsDesc: 'Also save Bible references to the standard tags field (for Graph View visibility)',
    settingsGraphTagGranularity: 'Tag Granularity',
    settingsGraphTagGranularityDesc: 'How detailed should tags be in the graph?',
    graphGranularityBook: 'Book only (e.g. Bible/John)',
    graphGranularityChapter: 'Book + Chapter (e.g. Bible/John/3)',
    graphGranularityVerse: 'Full detail (e.g. Bible/John/3/16)',
    settingsApplyAndSync: 'Apply changes',
    settingsApplyAndSyncDesc: 'Synchronize all files with the new settings',
    settingsApplyAndSyncButton: 'Apply and Sync',

    // Quick Settings (Sidebar)
    quickSettingsTitle: 'Quick Settings',
    quickSettingsTooltip: 'Quick Settings',
    quickSettingsGranularity: 'Tag Granularity',

    // Sort Options
    sortOrderSection: 'Sort Order',
    sortDocument: 'Document order',
    sortCanonical: 'Bible order (Gen→Rev)',
    sortAlphaAsc: 'Alphabetical A→Z',
    sortAlphaDesc: 'Alphabetical Z→A',
    sortCount: 'By reference count',

    // Settings - Sync Enhancements
    settingsSyncCommandHint: 'Tip: Use Cmd+Shift+P and search for "sync" for quick access.',
    settingsSyncAllButton: 'Sync All Files',
    settingsSyncAllButtonDesc: 'Starts a full synchronization of all Markdown files in the vault.',
    settingsSyncAllButtonText: 'Sync Now',

    // Settings - Parsing
    settingsParseCodeBlocks: 'Parse Code Blocks',
    settingsParseCodeBlocksDesc: 'Detect Bible references in code blocks',
    settingsParseTitles: 'Parse Filenames',
    settingsParseTitlesDesc: 'Detect Bible verses in filenames (e.g., "John 3:16 - God\'s Love.md")',

    // Settings - Link Behavior
    settingsLinkBehavior: 'Link Behavior',
    settingsLinkBehaviorDesc: 'How should links in the sidebar open?',
    linkBehaviorSameTab: 'Same Tab',
    linkBehaviorNewTab: 'New Tab',
    linkBehaviorSplit: 'Side by Side (Split View)',

    // Settings - Tips
    settingsParallelTip: 'Parallel Passages',
    settingsParallelTipDesc: 'This plugin assumes that all verses mentioned in a note should be understood as parallel passages (principle: Atomic Notes). Create thematic notes and list all related verses - they will automatically be recognized as parallels.',
    settingsInfo: 'Info',
    settingsInfoDesc: 'Bible Reference Mapper deliberately offers no pre-made lists or text imports. All references should come from your personal Bible study.',

    // Settings - Book Mappings
    settingsBookMappingsVisual: 'Book Mappings',
    settingsBookMappingsVisualDesc: 'Define how Bible books are recognized in your notes.',
    settingsBookMappingsJson: 'JSON Mappings (Advanced)',
    settingsBookMappingsJsonDesc: 'Direct editing of mappings as JSON',
    settingsOldTestament: 'Old Testament',
    settingsNewTestament: 'New Testament',
    settingsAliasesLabel: 'Short Form (Abbreviations)',
    settingsStandalonePatternsLabel: 'Long Form (Full Titles)',
    settingsPillInputPlaceholder: 'Press Enter to add...',
    settingsSearchBooksPlaceholder: 'Search books...',
    settingsBookMappingsWarning: 'Warning: Deleting all aliases may prevent Bible references from being detected.',
    settingsDisplayIdExplanation: 'The pinned alias is the display format you will see everywhere in the interface.',
    settingsCannotDeleteCanonicalId: 'The canonical ID cannot be deleted.',
  },

  books: [
    // ═══════════════════════════════════════════════════════════════
    // OLD TESTAMENT (Books 1-39)
    // ═══════════════════════════════════════════════════════════════

    // Pentateuch
    {
      bookId: 1,
      canonicalId: 'Gen',
      displayId: 'Gen',
      displayName: 'Genesis',
      aliases: ['Genesis', 'Gen.', 'Gen', 'Ge.', 'Ge', 'Gn'],
      standalonePatterns: ['The Book of Genesis', 'First Book of Moses']
    },
    {
      bookId: 2,
      canonicalId: 'Exo',
      displayId: 'Exo',
      displayName: 'Exodus',
      aliases: ['Exodus', 'Exod.', 'Exod', 'Ex.', 'Ex'],
      standalonePatterns: ['The Book of Exodus', 'Second Book of Moses']
    },
    {
      bookId: 3,
      canonicalId: 'Lev',
      displayId: 'Lev',
      displayName: 'Leviticus',
      aliases: ['Leviticus', 'Lev.', 'Lev', 'Le.', 'Le', 'Lv'],
      standalonePatterns: ['The Book of Leviticus', 'Third Book of Moses']
    },
    {
      bookId: 4,
      canonicalId: 'Num',
      displayId: 'Num',
      displayName: 'Numbers',
      aliases: ['Numbers', 'Num.', 'Num', 'Nu.', 'Nu', 'Nm'],
      standalonePatterns: ['The Book of Numbers', 'Fourth Book of Moses']
    },
    {
      bookId: 5,
      canonicalId: 'Deu',
      displayId: 'Deu',
      displayName: 'Deuteronomy',
      aliases: ['Deuteronomy', 'Deut.', 'Deut', 'Deu.', 'Deu', 'Dt.', 'Dt'],
      standalonePatterns: ['The Book of Deuteronomy', 'Fifth Book of Moses']
    },

    // Historical Books
    {
      bookId: 6,
      canonicalId: 'Jos',
      displayId: 'Josh',
      displayName: 'Joshua',
      aliases: ['Joshua', 'Josh.', 'Josh', 'Jos.', 'Jos'],
      standalonePatterns: ['The Book of Joshua']
    },
    {
      bookId: 7,
      canonicalId: 'Jdg',
      displayId: 'Judg',
      displayName: 'Judges',
      aliases: ['Judges', 'Judg.', 'Judg', 'Jdgs.', 'Jdgs', 'Jg.', 'Jg'],
      standalonePatterns: ['The Book of Judges']
    },
    {
      bookId: 8,
      canonicalId: 'Rut',
      displayId: 'Ruth',
      displayName: 'Ruth',
      aliases: ['Ruth', 'Rut.', 'Rut', 'Ru.', 'Ru'],
      standalonePatterns: ['The Book of Ruth']
    },
    {
      bookId: 9,
      canonicalId: '1Sa',
      displayId: '1Sam',
      displayName: '1 Samuel',
      aliases: ['1 Samuel', '1. Samuel', '1Samuel', '1 Sam.', '1 Sam', '1Sam.', 'I Sam.', 'I Sam', 'ISam', '1Sa.', '1Sa', '1S.'],
      standalonePatterns: ['The First Book of Samuel']
    },
    {
      bookId: 10,
      canonicalId: '2Sa',
      displayId: '2Sam',
      displayName: '2 Samuel',
      aliases: ['2 Samuel', '2. Samuel', '2Samuel', '2 Sam.', '2 Sam', '2Sam.', 'II Sam.', 'II Sam', 'IISam', '2Sa.', '2Sa', '2S.'],
      standalonePatterns: ['The Second Book of Samuel']
    },
    {
      bookId: 11,
      canonicalId: '1Ki',
      displayId: '1Kgs',
      displayName: '1 Kings',
      aliases: ['1 Kings', '1. Kings', '1Kings', '1 Kgs.', '1 Kgs', '1Kgs.', 'I Kings', 'I Kgs.', 'I Kgs', '1Ki.', '1Ki'],
      standalonePatterns: ['The First Book of Kings']
    },
    {
      bookId: 12,
      canonicalId: '2Ki',
      displayId: '2Kgs',
      displayName: '2 Kings',
      aliases: ['2 Kings', '2. Kings', '2Kings', '2 Kgs.', '2 Kgs', '2Kgs.', 'II Kings', 'II Kgs.', 'II Kgs', '2Ki.', '2Ki'],
      standalonePatterns: ['The Second Book of Kings']
    },
    {
      bookId: 13,
      canonicalId: '1Ch',
      displayId: '1Chr',
      displayName: '1 Chronicles',
      aliases: ['1 Chronicles', '1. Chronicles', '1Chronicles', '1 Chron.', '1 Chron', '1Chr.', '1Chr', 'I Chron', 'I Chr', '1Ch'],
      standalonePatterns: ['The First Book of Chronicles']
    },
    {
      bookId: 14,
      canonicalId: '2Ch',
      displayId: '2Chr',
      displayName: '2 Chronicles',
      aliases: ['2 Chronicles', '2. Chronicles', '2Chronicles', '2 Chron.', '2 Chron', '2Chr.', '2Chr', 'II Chron', 'II Chr', '2Ch'],
      standalonePatterns: ['The Second Book of Chronicles']
    },
    {
      bookId: 15,
      canonicalId: 'Ezr',
      displayId: 'Ezra',
      displayName: 'Ezra',
      aliases: ['Ezra', 'Ezr.', 'Ezr', 'Ez'],
      standalonePatterns: ['The Book of Ezra']
    },
    {
      bookId: 16,
      canonicalId: 'Neh',
      displayId: 'Neh',
      displayName: 'Nehemiah',
      aliases: ['Nehemiah', 'Neh.', 'Neh', 'Ne'],
      standalonePatterns: ['The Book of Nehemiah']
    },
    {
      bookId: 17,
      canonicalId: 'Est',
      displayId: 'Esth',
      displayName: 'Esther',
      aliases: ['Esther', 'Esth.', 'Esth', 'Est.', 'Est', 'Es'],
      standalonePatterns: ['The Book of Esther']
    },

    // Poetic Books
    {
      bookId: 18,
      canonicalId: 'Job',
      displayId: 'Job',
      displayName: 'Job',
      aliases: ['Job', 'Jb.', 'Jb'],
      standalonePatterns: ['The Book of Job']
    },
    {
      bookId: 19,
      canonicalId: 'Psa',
      displayId: 'Ps',
      displayName: 'Psalms',
      aliases: ['Psalms', 'Psalm', 'Psa.', 'Pss.', 'Pss', 'Ps.', 'Ps'],
      standalonePatterns: ['The Book of Psalms', 'The Psalter']
    },
    {
      bookId: 20,
      canonicalId: 'Pro',
      displayId: 'Prov',
      displayName: 'Proverbs',
      aliases: ['Proverbs', 'Prov.', 'Prov', 'Pr.', 'Pr'],
      standalonePatterns: ['The Proverbs of Solomon', 'The Book of Proverbs']
    },
    {
      bookId: 21,
      canonicalId: 'Ecc',
      displayId: 'Eccl',
      displayName: 'Ecclesiastes',
      aliases: ['Ecclesiastes', 'Eccl.', 'Eccl', 'Ecc.', 'Ecc', 'Qoheleth', 'Qoh'],
      standalonePatterns: ['Ecclesiastes', 'The Preacher', 'Qoheleth']
    },
    {
      bookId: 22,
      canonicalId: 'Son',
      displayId: 'Song',
      displayName: 'Song of Solomon',
      aliases: ['Song of Solomon', 'Song of Songs', 'Canticles', 'Song.', 'Song', 'Cant.', 'Cant', 'So.', 'So'],
      standalonePatterns: ['The Song of Solomon', 'Song of Songs', 'Canticle of Canticles']
    },

    // Major Prophets
    {
      bookId: 23,
      canonicalId: 'Isa',
      displayId: 'Isa',
      displayName: 'Isaiah',
      aliases: ['Isaiah', 'Isa.', 'Isa', 'Is.', 'Is'],
      standalonePatterns: ['The Book of Isaiah']
    },
    {
      bookId: 24,
      canonicalId: 'Jer',
      displayId: 'Jer',
      displayName: 'Jeremiah',
      aliases: ['Jeremiah', 'Jer.', 'Jer', 'Je.', 'Je'],
      standalonePatterns: ['The Book of Jeremiah']
    },
    {
      bookId: 25,
      canonicalId: 'Lam',
      displayId: 'Lam',
      displayName: 'Lamentations',
      aliases: ['Lamentations', 'Lam.', 'Lam', 'La.', 'La'],
      standalonePatterns: ['The Lamentations of Jeremiah']
    },
    {
      bookId: 26,
      canonicalId: 'Eze',
      displayId: 'Ezek',
      displayName: 'Ezekiel',
      aliases: ['Ezekiel', 'Ezek.', 'Ezek', 'Eze.', 'Eze', 'Ek.'],
      standalonePatterns: ['The Book of Ezekiel']
    },
    {
      bookId: 27,
      canonicalId: 'Dan',
      displayId: 'Dan',
      displayName: 'Daniel',
      aliases: ['Daniel', 'Dan.', 'Dan', 'Da.', 'Da'],
      standalonePatterns: ['The Book of Daniel']
    },

    // Minor Prophets
    {
      bookId: 28,
      canonicalId: 'Hos',
      displayId: 'Hos',
      displayName: 'Hosea',
      aliases: ['Hosea', 'Hos.', 'Hos', 'Ho.'],
      standalonePatterns: ['The Book of Hosea']
    },
    {
      bookId: 29,
      canonicalId: 'Joe',
      displayId: 'Joel',
      displayName: 'Joel',
      aliases: ['Joel', 'Joe.', 'Joe', 'Jl.', 'Jl'],
      standalonePatterns: ['The Book of Joel']
    },
    {
      bookId: 30,
      canonicalId: 'Amo',
      displayId: 'Amos',
      displayName: 'Amos',
      aliases: ['Amos', 'Amos.', 'Am.', 'Am'],
      standalonePatterns: ['The Book of Amos']
    },
    {
      bookId: 31,
      canonicalId: 'Oba',
      displayId: 'Obad',
      displayName: 'Obadiah',
      aliases: ['Obadiah', 'Obad.', 'Obad', 'Ob.', 'Ob'],
      standalonePatterns: ['The Book of Obadiah']
    },
    {
      bookId: 32,
      canonicalId: 'Jon',
      displayId: 'Jonah',
      displayName: 'Jonah',
      aliases: ['Jonah', 'Jonah.', 'Jon.', 'Jon'],
      standalonePatterns: ['The Book of Jonah']
    },
    {
      bookId: 33,
      canonicalId: 'Mic',
      displayId: 'Mic',
      displayName: 'Micah',
      aliases: ['Micah', 'Mic.', 'Mic', 'Mi.'],
      standalonePatterns: ['The Book of Micah']
    },
    {
      bookId: 34,
      canonicalId: 'Nah',
      displayId: 'Nah',
      displayName: 'Nahum',
      aliases: ['Nahum', 'Nah.', 'Nah', 'Na.'],
      standalonePatterns: ['The Book of Nahum']
    },
    {
      bookId: 35,
      canonicalId: 'Hab',
      displayId: 'Hab',
      displayName: 'Habakkuk',
      aliases: ['Habakkuk', 'Hab.', 'Hab', 'Hb.'],
      standalonePatterns: ['The Book of Habakkuk']
    },
    {
      bookId: 36,
      canonicalId: 'Zep',
      displayId: 'Zeph',
      displayName: 'Zephaniah',
      aliases: ['Zephaniah', 'Zeph.', 'Zeph', 'Zp.', 'Zp'],
      standalonePatterns: ['The Book of Zephaniah']
    },
    {
      bookId: 37,
      canonicalId: 'Hag',
      displayId: 'Hag',
      displayName: 'Haggai',
      aliases: ['Haggai', 'Hagg.', 'Hagg', 'Hag.', 'Hag', 'Hg.'],
      standalonePatterns: ['The Book of Haggai']
    },
    {
      bookId: 38,
      canonicalId: 'Zec',
      displayId: 'Zech',
      displayName: 'Zechariah',
      aliases: ['Zechariah', 'Zech.', 'Zech', 'Zec.', 'Zec'],
      standalonePatterns: ['The Book of Zechariah']
    },
    {
      bookId: 39,
      canonicalId: 'Mal',
      displayId: 'Mal',
      displayName: 'Malachi',
      aliases: ['Maleachi', 'Malachi', 'Mal.', 'Mal', 'Ml.'],
      standalonePatterns: ['The Book of Malachi']
    },

    // ═══════════════════════════════════════════════════════════════
    // NEW TESTAMENT (Books 40-66)
    // ═══════════════════════════════════════════════════════════════

    // Gospels
    {
      bookId: 40,
      canonicalId: 'Mat',
      displayId: 'Matt',
      displayName: 'Matthew',
      aliases: ['Matthew', 'Matt.', 'Matt', 'Mat.', 'Mat', 'Mt.', 'Mt'],
      standalonePatterns: ['Gospel according to Matthew', 'The Gospel of Matthew']
    },
    {
      bookId: 41,
      canonicalId: 'Mar',
      displayId: 'Mark',
      displayName: 'Mark',
      aliases: ['Mark', 'Mark.', 'Mk.', 'Mk', 'Mrk.'],
      standalonePatterns: ['Gospel according to Mark', 'The Gospel of Mark']
    },
    {
      bookId: 42,
      canonicalId: 'Luk',
      displayId: 'Luke',
      displayName: 'Luke',
      aliases: ['Luke', 'Luke.', 'Luk.', 'Luk', 'Lk.', 'Lk'],
      standalonePatterns: ['Gospel according to Luke', 'The Gospel of Luke']
    },
    {
      bookId: 43,
      canonicalId: 'Joh',
      displayId: 'John',
      displayName: 'John',
      aliases: ['Johannes', 'John', 'John.', 'Joh.', 'Joh', 'Jn.', 'Jn'],
      standalonePatterns: ['Gospel according to John', 'The Gospel of John']
    },

    // History
    {
      bookId: 44,
      canonicalId: 'Act',
      displayId: 'Acts',
      displayName: 'Acts',
      aliases: ['Acts', 'Acts.', 'Act.', 'Act', 'Ac.'],
      standalonePatterns: ['The Acts of the Apostles']
    },

    // Pauline Epistles
    {
      bookId: 45,
      canonicalId: 'Rom',
      displayId: 'Rom',
      displayName: 'Romans',
      aliases: ['Romans', 'Rom.', 'Rom', 'Ro.', 'Ro', 'Rm.'],
      standalonePatterns: ['Epistle to the Romans']
    },
    {
      bookId: 46,
      canonicalId: '1Co',
      displayId: '1Cor',
      displayName: '1 Corinthians',
      aliases: ['1 Corinthians', '1. Corinthians', '1Corinthians', '1 Cor.', '1 Cor', '1Cor.', '1Cor', 'I Cor.', 'I Cor', 'ICor'],
      standalonePatterns: ['First Epistle to the Corinthians']
    },
    {
      bookId: 47,
      canonicalId: '2Co',
      displayId: '2Cor',
      displayName: '2 Corinthians',
      aliases: ['2 Corinthians', '2. Corinthians', '2Corinthians', '2 Cor.', '2 Cor', '2Cor.', '2Cor', 'II Cor.', 'II Cor', 'IICor'],
      standalonePatterns: ['Second Epistle to the Corinthians']
    },
    {
      bookId: 48,
      canonicalId: 'Gal',
      displayId: 'Gal',
      displayName: 'Galatians',
      aliases: ['Galatians', 'Gal.', 'Gal', 'Ga.'],
      standalonePatterns: ['Epistle to the Galatians']
    },
    {
      bookId: 49,
      canonicalId: 'Eph',
      displayId: 'Eph',
      displayName: 'Ephesians',
      aliases: ['Ephesians', 'Ephes.', 'Ephes', 'Eph.', 'Eph'],
      standalonePatterns: ['Epistle to the Ephesians']
    },
    {
      bookId: 50,
      canonicalId: 'Phi',
      displayId: 'Phil',
      displayName: 'Philippians',
      aliases: ['Philipper', 'Philippians', 'Phil.', 'Phil', 'Php.', 'Php'],
      standalonePatterns: ['Epistle to the Philippians']
    },
    {
      bookId: 51,
      canonicalId: 'Col',
      displayId: 'Col',
      displayName: 'Colossians',
      aliases: ['Kolosser', 'Colossians', 'Col.', 'Col', 'Cl.'],
      standalonePatterns: ['Epistle to the Colossians']
    },
    {
      bookId: 52,
      canonicalId: '1Th',
      displayId: '1Thess',
      displayName: '1 Thessalonians',
      aliases: ['1 Thessalonians', '1. Thessalonians', '1Thessalonians', '1 Thess.', '1 Thess', '1Thess.', 'I Thess.', 'I Thess', '1Th.', '1Th'],
      standalonePatterns: ['First Epistle to the Thessalonians']
    },
    {
      bookId: 53,
      canonicalId: '2Th',
      displayId: '2Thess',
      displayName: '2 Thessalonians',
      aliases: ['2 Thessalonians', '2. Thessalonians', '2Thessalonians', '2 Thess.', '2 Thess', '2Thess.', 'II Thess.', 'II Thess', '2Th.', '2Th'],
      standalonePatterns: ['Second Epistle to the Thessalonians']
    },
    {
      bookId: 54,
      canonicalId: '1Ti',
      displayId: '1Tim',
      displayName: '1 Timothy',
      aliases: ['1 Timothy', '1. Timothy', '1Timothy', '1 Tim.', '1 Tim', '1Tim.', 'I Tim.', 'I Tim', '1Ti.', '1Ti'],
      standalonePatterns: ['First Epistle to Timothy']
    },
    {
      bookId: 55,
      canonicalId: '2Ti',
      displayId: '2Tim',
      displayName: '2 Timothy',
      aliases: ['2 Timothy', '2. Timothy', '2Timothy', '2 Tim.', '2 Tim', '2Tim.', 'II Tim.', 'II Tim', '2Ti.', '2Ti'],
      standalonePatterns: ['Second Epistle to Timothy']
    },
    {
      bookId: 56,
      canonicalId: 'Tit',
      displayId: 'Titus',
      displayName: 'Titus',
      aliases: ['Titus', 'Tit.', 'Tit', 'Ti.'],
      standalonePatterns: ['Epistle to Titus']
    },
    {
      bookId: 57,
      canonicalId: 'Phm',
      displayId: 'Phlm',
      displayName: 'Philemon',
      aliases: ['Philemon', 'Philem.', 'Philem', 'Phm.', 'Phm', 'Pm.'],
      standalonePatterns: ['Epistle to Philemon']
    },

    // General Epistles
    {
      bookId: 58,
      canonicalId: 'Heb',
      displayId: 'Heb',
      displayName: 'Hebrews',
      aliases: ['Hebrews', 'Hebr.', 'Hebr', 'Heb.', 'Heb'],
      standalonePatterns: ['Epistle to the Hebrews']
    },
    {
      bookId: 59,
      canonicalId: 'Jam',
      displayId: 'James',
      displayName: 'James',
      aliases: ['Jakobus', 'James', 'James.', 'Jas.', 'Jas', 'Ja.'],
      standalonePatterns: ['The Epistle of James']
    },
    {
      bookId: 60,
      canonicalId: '1Pe',
      displayId: '1Pet',
      displayName: '1 Peter',
      aliases: ['1 Peter', '1. Peter', '1Peter', '1 Pet.', '1 Pet', '1Pet.', 'I Pet.', 'I Pet', '1Pe.', '1Pe', '1Pt.'],
      standalonePatterns: ['First Epistle of Peter']
    },
    {
      bookId: 61,
      canonicalId: '2Pe',
      displayId: '2Pet',
      displayName: '2 Peter',
      aliases: ['2 Peter', '2. Peter', '2Peter', '2 Pet.', '2 Pet', '2Pet.', 'II Pet.', 'II Pet', '2Pe.', '2Pe', '2Pt.'],
      standalonePatterns: ['Second Epistle of Peter']
    },
    {
      bookId: 62,
      canonicalId: '1Jo',
      displayId: '1John',
      displayName: '1 John',
      aliases: ['1 John', '1. John', '1John', '1 Joh.', '1 Joh', '1Joh.', 'I John', 'I Joh', '1Jn.', '1Jn', '1Jo.'],
      standalonePatterns: ['First Epistle of John']
    },
    {
      bookId: 63,
      canonicalId: '2Jo',
      displayId: '2John',
      displayName: '2 John',
      aliases: ['2 John', '2. John', '2John', '2 Joh.', '2 Joh', '2Joh.', 'II John', 'II Joh', '2Jn.', '2Jn', '2Jo.'],
      standalonePatterns: ['Second Epistle of John']
    },
    {
      bookId: 64,
      canonicalId: '3Jo',
      displayId: '3John',
      displayName: '3 John',
      aliases: ['3 John', '3. John', '3John', '3 Joh.', '3 Joh', '3Joh.', 'III John', 'III Joh', '3Jn.', '3Jn', '3Jo.'],
      standalonePatterns: ['Third Epistle of John']
    },
    {
      bookId: 65,
      canonicalId: 'Jud',
      displayId: 'Jude',
      displayName: 'Jude',
      aliases: ['Judas', 'Jude', 'Jude.', 'Jud.', 'Jud'],
      standalonePatterns: ['The Epistle of Jude']
    },

    // Revelation
    {
      bookId: 66,
      canonicalId: 'Rev',
      displayId: 'Rev',
      displayName: 'Revelation',
      aliases: ['Offenbarung', 'Revelation', 'Rev.', 'Rev', 'Rv.', 'Apocalypse', 'Apoc.'],
      standalonePatterns: ['The Revelation to John', 'The Book of Revelation', 'The Apocalypse']
    }
  ]
};
