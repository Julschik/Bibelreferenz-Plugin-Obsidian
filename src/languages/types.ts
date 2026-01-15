/**
 * Language Configuration Types
 *
 * This file defines the unified LanguageConfig structure that serves as the
 * Single Source of Truth for each supported language.
 *
 * Each language file exports ONE LanguageConfig containing:
 * - UI strings
 * - Book localizations (display names, aliases)
 * - Separator configuration
 * - Tag prefix
 */

import type { BookId } from '../bible/canonicalBooks';

// ═══════════════════════════════════════════════════════════════
// LOCALE TYPES
// ═══════════════════════════════════════════════════════════════

/** Supported locale codes */
export type Locale = 'de' | 'en' | 'es' | 'fr' | 'pt' | 'it';

/** Alias for backwards compatibility */
export type SupportedLanguage = Locale;

/** All supported locales as array */
export const SUPPORTED_LOCALES: Locale[] = ['de', 'en', 'es', 'fr', 'pt', 'it'];

// ═══════════════════════════════════════════════════════════════
// SEPARATOR CONFIGURATION
// ═══════════════════════════════════════════════════════════════

/**
 * Configuration for Bible reference separators
 */
export interface SeparatorConfig {
  /** Chapter-verse separator: "," (DE: Joh 3,16) or ":" (EN: John 3:16) */
  chapterVerse: string;
  /** List separator (AND): "." (DE: 3,16.18) or "," (EN: 3:16,18) */
  list: string;
  /** Range separator (TO): "-" → 16-18 = verses 16 to 18 */
  range: string;
}

// ═══════════════════════════════════════════════════════════════
// BOOK LOCALIZATION
// ═══════════════════════════════════════════════════════════════

/**
 * Localization data for a single Bible book
 */
export interface BookLocalization {
  /** Numeric book ID (1-66) - internal only, never shown to users */
  bookId: number;

  /** Canonical ID for BIBLE_STRUCTURE lookup: "Gen", "Exo", "Joh", etc. (language-neutral) */
  canonicalId: string;

  /** Display ID for tags: "Joh" (DE), "John" (EN), "Juan" (ES) */
  displayId: string;

  /** Full display name for UI: "Johannes", "John", "Juan" */
  displayName: string;

  /**
   * All recognized aliases for parsing.
   * These are the forms users might type in their notes.
   * Example for German Genesis: ["Genesis", "1. Mose", "1.Mose", "Gen.", "Gen"]
   */
  aliases: string[];

  /**
   * Standalone patterns - long forms that can appear without chapter/verse.
   * Example: ["Das Evangelium nach Johannes", "Johannesevangelium"]
   */
  standalonePatterns?: string[];
}

// ═══════════════════════════════════════════════════════════════
// UI STRINGS
// ═══════════════════════════════════════════════════════════════

/**
 * All translatable UI strings
 */
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
  syncButtonTimeout: string;

  // === Notices ===
  noticeSynced: string;
  noticeNoChanges: string;
  noticeError: string;
  noticeNoFile: string;
  noticeSyncAll: string;
  noticeMigration: string;
  noticeMigrationStarted: string;
  noticeMigrationCompleted: string;
  noticeLanguageMigration: string;
  noticeLanguageMigrationCompleted: string;

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
  quickSettingsTitle: string;
  quickSettingsTooltip: string;
  quickSettingsGranularity: string;

  // === Sort Options ===
  sortOrderSection: string;
  sortDocument: string;
  sortCanonical: string;
  sortAlphaAsc: string;
  sortAlphaDesc: string;
  sortCount: string;

  // === Settings - Sync Enhancements ===
  settingsSyncCommandHint: string;
  settingsSyncAllButton: string;
  settingsSyncAllButtonDesc: string;
  settingsSyncAllButtonText: string;

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

// ═══════════════════════════════════════════════════════════════
// LANGUAGE CONFIGURATION
// ═══════════════════════════════════════════════════════════════

/**
 * Complete language configuration - Single Source of Truth
 *
 * Each language exports exactly ONE LanguageConfig containing everything
 * needed for that language: UI strings, book data, separators, and prefix.
 */
export interface LanguageConfig {
  /** Locale code: 'de', 'en', etc. */
  code: Locale;

  /** Display name: 'Deutsch', 'English', etc. */
  name: string;

  /**
   * Tag prefix for frontmatter tags.
   * Examples: 'Bibel' (DE), 'Bible' (EN), 'Biblia' (ES)
   */
  tagPrefix: string;

  /** Separator configuration for Bible reference parsing */
  separators: SeparatorConfig;

  /** All UI strings for this language */
  strings: LocaleStrings;

  /** Localization data for all 66 books */
  books: BookLocalization[];
}

// ═══════════════════════════════════════════════════════════════
// HELPER TYPES
// ═══════════════════════════════════════════════════════════════

/**
 * Language registry type - maps locale codes to configs
 */
export type LanguageRegistry = Record<Locale, LanguageConfig>;

/**
 * Book lookup map type - maps displayId to bookId
 */
export type DisplayIdToBookId = Map<string, number>;

/**
 * Alias lookup map type - maps lowercase alias to bookId
 */
export type AliasToBookId = Map<string, number>;
