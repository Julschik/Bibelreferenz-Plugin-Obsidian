import { TFile } from 'obsidian';

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
 * Sync timeout configuration
 */
export interface SyncTimeout {
  singleFileMs: number;  // Default: 30000 (30s)
  fullVaultMs: number;   // Default: 300000 (5 min)
}

/**
 * Main plugin settings
 */
export interface BibleRefSettings {
  // UI Language
  uiLanguage: 'de' | 'en';

  // Sync options (checkboxes)
  syncOptions: SyncOptions;

  // Format settings
  language: 'de' | 'en' | 'custom';
  separators: SeparatorConfig;

  // Frontmatter settings
  frontmatterKey: string;       // Default: "_bible_refs"
  tagPrefix: string;            // Default: "bible/"
  writeToTagsField: boolean;    // Default: false - Also write to 'tags' field for graph view

  // Parsing options
  parseCodeBlocks: boolean;     // Default: false
  parseTitles: boolean;         // Default: true

  // UI Behavior
  linkBehavior: LinkBehavior;   // Default: "same-tab"

  // Sync timeout
  syncTimeout: SyncTimeout;     // Default: { singleFileMs: 30000, fullVaultMs: 300000 }

  // Custom mappings
  customBookMappings: Record<string, string>;
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
