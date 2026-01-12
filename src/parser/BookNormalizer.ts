import type { BookMapping, BibleRefSettings } from '../types';
import { BOOK_MAPPINGS_DE } from '../data/bookMappings.de';
import { BOOK_MAPPINGS_EN } from '../data/bookMappings.en';
import { escapeRegex } from '../utils/regexUtils';

/**
 * BookNormalizer
 *
 * Responsible for normalizing book names and aliases to canonical IDs.
 * Critical design principle: Aliases are matched LONGEST FIRST to prevent
 * premature matching (e.g., "Johannes" before "Joh").
 */
export class BookNormalizer {
  private aliasMap: Map<string, string>;
  private standalonePatterns: { pattern: RegExp; bookId: string }[];
  private allAliasesPattern: string;

  /**
   * @param language Language for book mappings
   * @param customMappings Optional custom book mappings (overrides built-in)
   */
  constructor(
    language: 'de' | 'en' | 'custom',
    customMappings?: Record<string, string>
  ) {
    const mappings = this.loadMappings(language);
    this.aliasMap = this.buildAliasMap(mappings, customMappings);
    this.standalonePatterns = this.buildStandalonePatterns(mappings);
    this.allAliasesPattern = this.buildAllAliasesPattern();
  }

  /**
   * Normalize a book name to its canonical ID
   * @param bookName The book name or alias to normalize
   * @returns Canonical book ID or null if not found
   */
  normalize(bookName: string): string | null {
    if (!bookName) return null;

    // Normalize input: trim and case-insensitive lookup
    const normalized = bookName.trim();
    const lowerCase = normalized.toLowerCase();

    // Direct lookup in alias map (case-insensitive)
    return this.aliasMap.get(lowerCase) || null;
  }

  /**
   * Get a regex pattern that matches ALL book aliases
   * Used by the SmartBibleParser for detection
   * @returns Regex-safe alternation pattern (e.g., "Genesis|Gen|Joh|Johannes|...")
   */
  getAllAliasesPattern(): string {
    return this.allAliasesPattern;
  }

  /**
   * Get standalone patterns for books that can appear without chapter/verse
   * @returns Array of patterns with their associated book IDs
   */
  getStandalonePatterns(): { pattern: RegExp; bookId: string }[] {
    return this.standalonePatterns;
  }

  /**
   * Check if a string is a valid book alias
   * @param input String to check
   * @returns true if it's a valid book alias
   */
  isValidBookAlias(input: string): boolean {
    return this.normalize(input) !== null;
  }

  // ═══════════════════════════════════════════════════════════════
  // PRIVATE METHODS
  // ═══════════════════════════════════════════════════════════════

  /**
   * Load book mappings based on language
   */
  private loadMappings(language: 'de' | 'en' | 'custom'): BookMapping[] {
    if (language === 'custom') {
      // Default to German for custom (user provides overrides)
      return BOOK_MAPPINGS_DE;
    }
    return language === 'de' ? BOOK_MAPPINGS_DE : BOOK_MAPPINGS_EN;
  }

  /**
   * Build alias map: lowercased alias → canonical ID
   * CRITICAL: Longer aliases are preferred for matching
   */
  private buildAliasMap(
    mappings: BookMapping[],
    customMappings?: Record<string, string>
  ): Map<string, string> {
    const map = new Map<string, string>();

    // Add built-in mappings
    for (const mapping of mappings) {
      // Sort aliases by length (longest first) to prioritize specific matches
      const sortedAliases = [...mapping.aliases].sort(
        (a, b) => b.length - a.length
      );

      for (const alias of sortedAliases) {
        const key = alias.toLowerCase();
        // Don't override if already exists (first = longest wins)
        if (!map.has(key)) {
          map.set(key, mapping.canonicalId);
        }
      }
    }

    // Apply custom mappings (override built-in)
    if (customMappings) {
      for (const [alias, bookId] of Object.entries(customMappings)) {
        map.set(alias.toLowerCase(), bookId);
      }
    }

    return map;
  }

  /**
   * Build standalone patterns for books that can be referenced without chapter/verse
   * Examples: "Kolosserbrief", "Genesis", "Book of Revelation"
   */
  private buildStandalonePatterns(
    mappings: BookMapping[]
  ): { pattern: RegExp; bookId: string }[] {
    const patterns: { pattern: RegExp; bookId: string }[] = [];

    for (const mapping of mappings) {
      if (mapping.standalonePatterns.length > 0) {
        // Sort by length (longest first) for greedy matching
        const sorted = [...mapping.standalonePatterns].sort(
          (a, b) => b.length - a.length
        );

        for (const pattern of sorted) {
          // Escape regex special characters and create word-boundary pattern
          // Note: Using (^|\\s|$) instead of \\b because \\b doesn't work correctly
          // with umlauts in JavaScript. Pattern matches word at start, after space, or standalone.
          // CRITICAL: Must use 'g' flag for exec() to advance through the string
          // Without 'g', exec() always returns the first match, causing infinite loops!
          const escaped = escapeRegex(pattern);
          const regex = new RegExp(`(^|\\s)${escaped}($|\\s)`, 'gi');

          patterns.push({
            pattern: regex,
            bookId: mapping.canonicalId
          });
        }
      }
    }

    // Sort patterns by length of their source (longest first)
    patterns.sort((a, b) => {
      const aLen = a.pattern.source.length;
      const bLen = b.pattern.source.length;
      return bLen - aLen;
    });

    return patterns;
  }

  /**
   * Build a single regex alternation pattern for ALL aliases
   * Used by SmartBibleParser for efficient detection
   */
  private buildAllAliasesPattern(): string {
    // Get all unique aliases from the map
    const allAliases = Array.from(this.aliasMap.keys());

    // Sort by length (longest first) to prevent premature matching
    const sorted = allAliases.sort((a, b) => b.length - a.length);

    // Escape and join with alternation
    const escaped = sorted.map(alias => escapeRegex(alias));

    return escaped.join('|');
  }
}

/**
 * Factory function to create a BookNormalizer from settings
 * @param settings Plugin settings
 * @returns BookNormalizer instance
 */
export function createBookNormalizer(
  settings: BibleRefSettings
): BookNormalizer {
  return new BookNormalizer(settings.language, settings.customBookMappings);
}
