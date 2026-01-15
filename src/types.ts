import { TFile } from 'obsidian';
import type { SupportedLanguage } from './i18n/types';

// ═══════════════════════════════════════════════════════════════
// SYNC CONFIGURATION
// ═══════════════════════════════════════════════════════════════

/**
 * @deprecated Use SyncOptions instead. Kept for migration compatibility.
 */
export type SyncMode =
  | 'on-save-or-change'  // Default: On save OR file change
  | 'on-save'            // Only on save (Ctrl+S)
  | 'on-file-change'     // Only when switching to another document
  | 'manual';            // Only via Command Palette or Sidebar button

/**
 * Sync options as checkboxes (replaces SyncMode dropdown)
 * Allows flexible combinations of sync triggers
 */
export interface SyncOptions {
  onSave: boolean;        // Sync on Ctrl+S / Cmd+S
  onFileChange: boolean;  // Sync when switching to another file
}

/**
 * Configuration for different separators used in Bible references
 */
export interface SeparatorConfig {
  chapterVerse: string;  // Chapter-verse separator: "," (DE) or ":" (EN)
  list: string;          // List separator (AND): "." → 16.18 = verses 16 and 18
  range: string;         // Range separator (TO): "-" → 16-18 = verses 16 to 18
}

/**
 * Link behavior options for sidebar links
 */
export type LinkBehavior = 'same-tab' | 'new-tab' | 'split';

/**
 * Customization for a single Bible book's mappings
 * Tracks both user additions and deletions of default mappings
 */
export interface BookMappingCustomization {
  canonicalId: string;                          // e.g., "Gen", "Joh", "Col"
  aliasesAdditions?: string[];                  // User-added aliases (short forms)
  aliasesDeletions?: string[];                  // Deleted default aliases
  standalonePatternsAdditions?: string[];       // User-added standalone patterns (long forms)
  standalonePatternsDeletions?: string[];       // Deleted default standalone patterns
  pinnedDisplayId?: string;                     // Pinned alias/pattern (e.g., "Mt" for Matthew)
  pinnedDisplayIdSource?: 'alias' | 'standalone';  // Which field the pinned ID comes from
}

/**
 * V2 custom book mappings structure
 * Maps canonical book ID to customization
 */
export type CustomBookMappingsV2 = Record<string, BookMappingCustomization>;

/**
 * Sync timeout configuration
 */
export interface SyncTimeout {
  singleFileMs: number;  // Default: 30000 (30s)
  fullVaultMs: number;   // Default: 300000 (5 min)
}

/**
 * Migration task for changing canonical IDs
 */
export interface CanonicalIdMigration {
  bookId: string;           // Original canonical ID (e.g., "Mat")
  oldId: string;            // Old display ID
  newId: string;            // New display ID (e.g., "Mt")
  status: 'pending' | 'running' | 'completed' | 'failed';
  startedAt?: number;       // Timestamp
  completedAt?: number;     // Timestamp
  filesProcessed: number;
  filesTotal: number;
}

/**
 * Migration queue state
 */
export interface MigrationQueueState {
  migrations: CanonicalIdMigration[];
}

/**
 * Main plugin settings
 */
export interface BibleRefSettings {
  // Language setting (unified: controls both UI and parsing)
  language: SupportedLanguage;

  // Sync options (checkboxes)
  syncOptions: SyncOptions;

  // Separators for Bible reference format
  separators: SeparatorConfig;

  // Frontmatter settings
  frontmatterKey: string;       // Default: "_bible_refs"
  tagPrefix: string;            // Default: "bible/"

  // Graph View settings
  writeToTagsField: boolean;    // Default: true - Also write to 'tags' field for graph view
  graphTagGranularity: 'book' | 'chapter' | 'verse';  // Default: 'verse' - Granularity for tags field

  // Parsing options
  parseCodeBlocks: boolean;     // Default: false
  parseTitles: boolean;         // Default: true

  // UI Behavior
  linkBehavior: LinkBehavior;   // Default: "same-tab"

  // Sync timeout
  syncTimeout: SyncTimeout;     // Default: { singleFileMs: 30000, fullVaultMs: 300000 }

  // Custom mappings
  customBookMappings: Record<string, string>;    // V1 - Deprecated, kept for migration
  customBookMappingsV2?: CustomBookMappingsV2;   // V2 - New structure with additions and deletions

  // Migration queue for canonical ID changes
  migrationQueue?: MigrationQueueState;
}

// ═══════════════════════════════════════════════════════════════
// PARSED REFERENCES
// ═══════════════════════════════════════════════════════════════

/**
 * Granularity level of a Bible reference
 */
export type ReferenceGranularity =
  | 'book'      // "Kolosserbrief"
  | 'chapter'   // "Kol 3"
  | 'verse';    // "Kol 3,16" or Range "Kol 3,16-18"

/**
 * A parsed Bible reference from text
 */
export interface ParsedReference {
  raw: string;                       // Original string from text
  bookId: string;                    // Canonical ID: "Col", "Gen", etc.
  granularity: ReferenceGranularity;
  startChapter?: number;
  startVerse?: number;
  endChapter?: number;               // For cross-chapter ranges
  endVerse?: number;
  _verseList?: number[];             // Internal: For "16.18.20" style lists
}

/**
 * A single, atomic verse reference (result of expansion)
 */
export interface ExpandedReference {
  bookId: string;
  chapter: number;
  verse: number;
}

/**
 * Sort modes for sidebar reference lists
 */
export type ReferenceSortMode =
  | 'document'     // Order of appearance in note (DEFAULT)
  | 'canonical'    // Genesis → Revelation
  | 'alpha-asc'    // A-Z by book ID
  | 'alpha-desc'   // Z-A by book ID
  | 'count';       // By reference count (descending)

// ═══════════════════════════════════════════════════════════════
// BIBLE DATA STRUCTURE
// ═══════════════════════════════════════════════════════════════

/**
 * Metadata for a Bible book
 */
export interface BookData {
  chapters: number;
  versesPerChapter: number[];
}

/**
 * Complete Bible structure (all 66 books)
 */
export type BibleStructure = Record<string, BookData>;

/**
 * Mapping of book names and aliases to canonical ID
 */
export interface BookMapping {
  canonicalId: string;
  aliases: string[];              // All possible abbreviations and variants
  standalonePatterns: string[];   // Patterns that work without chapter/verse (e.g., "Kolosserbrief")
}

// ═══════════════════════════════════════════════════════════════
// SIDEBAR DATA
// ═══════════════════════════════════════════════════════════════

/**
 * A note related to the current file's Bible references
 */
export interface RelatedNote {
  file: TFile;
  relevance: 'exact-verse' | 'same-chapter' | 'same-book';
  matchingTags: string[];
}

/**
 * A Bible reference that co-occurs with the current references
 */
export interface CoOccurrenceSuggestion {
  tag: string;
  displayName: string;
  count: number;
  sourceNotes: TFile[];
}
