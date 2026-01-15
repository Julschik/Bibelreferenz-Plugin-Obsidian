/**
 * English locale strings
 */
import type { LocaleStrings } from '../types';

export const EN_LOCALE: LocaleStrings = {
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
  noticeMigrationStarted: 'Migration started: {oldId} → {newId}',
  noticeMigrationCompleted: 'Migration completed: {changed}/{total} files updated ({duration}s)',

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
};
