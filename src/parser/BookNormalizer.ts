import type { BibleRefSettings, CustomBookMappingsV2 } from '../types';
import type { Locale, BookLocalization } from '../languages/types';
import { getBooks } from '../languages/registry';
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
   * @param language Language for book mappings (de, en, es, fr, it, pt)
   * @param customMappingsV1 Optional V1 custom book mappings (deprecated, kept for backwards compatibility)
   * @param customMappingsV2 Optional V2 custom book mappings with additions and deletions
   */
  constructor(
    language: Locale,
    customMappingsV1?: Record<string, string>,
    customMappingsV2?: CustomBookMappingsV2
  ) {
    const books = getBooks(language);
    this.aliasMap = this.buildAliasMap(books, customMappingsV1, customMappingsV2);
    this.standalonePatterns = this.buildStandalonePatterns(books, customMappingsV2);
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
   * Build alias map: lowercased alias → displayId
   * CRITICAL: Longer aliases are preferred for matching
   *
   * Handles both V1 (simple additions) and V2 (additions + deletions) customizations
   */
  private buildAliasMap(
    books: BookLocalization[],
    customMappingsV1?: Record<string, string>,
    customMappingsV2?: CustomBookMappingsV2
  ): Map<string, string> {
    const map = new Map<string, string>();

    // Create working copy of books with V2 customizations applied
    const workingBooks = books.map(book => {
      const customization = customMappingsV2?.[book.canonicalId];

      let aliases = [...book.aliases];

      if (customization) {
        // Apply deletions first (remove default aliases)
        if (customization.aliasesDeletions) {
          aliases = aliases.filter(
            a => !customization.aliasesDeletions!.some(
              del => del.toLowerCase() === a.toLowerCase()
            )
          );
        }

        // Apply additions (add custom aliases)
        if (customization.aliasesAdditions) {
          aliases.push(...customization.aliasesAdditions);
        }
      }

      return { ...book, aliases };
    });

    // Add built-in mappings (with V2 customizations applied)
    for (const book of workingBooks) {
      // Add both displayId and canonicalId as aliases (users can type either)
      const allAliases = [book.displayId, book.canonicalId, ...book.aliases];

      // Sort aliases by length (longest first) to prioritize specific matches
      const sortedAliases = allAliases.sort((a, b) => b.length - a.length);

      for (const alias of sortedAliases) {
        const key = alias.toLowerCase();
        // Don't override if already exists (first = longest wins)
        if (!map.has(key)) {
          // Map to canonicalId (used for BIBLE_STRUCTURE lookup)
          map.set(key, book.canonicalId);
        }
      }
    }

    // Apply V1 custom mappings (override built-in, kept for backwards compatibility)
    if (customMappingsV1) {
      for (const [alias, bookId] of Object.entries(customMappingsV1)) {
        map.set(alias.toLowerCase(), bookId);
      }
    }

    return map;
  }

  /**
   * Build standalone patterns for books that can be referenced without chapter/verse
   * Examples: "Kolosserbrief", "Genesis", "Book of Revelation"
   *
   * Handles V2 customizations (additions + deletions)
   */
  private buildStandalonePatterns(
    books: BookLocalization[],
    customMappingsV2?: CustomBookMappingsV2
  ): { pattern: RegExp; bookId: string }[] {
    const patterns: { pattern: RegExp; bookId: string }[] = [];

    // Create working copy of books with V2 customizations applied
    const workingBooks = books.map(book => {
      const customization = customMappingsV2?.[book.canonicalId];

      let standalonePatterns = [...(book.standalonePatterns || [])];

      if (customization) {
        // Apply deletions first (remove default patterns)
        if (customization.standalonePatternsDeletions) {
          standalonePatterns = standalonePatterns.filter(
            p => !customization.standalonePatternsDeletions!.some(
              del => del.toLowerCase() === p.toLowerCase()
            )
          );
        }

        // Apply additions (add custom patterns)
        if (customization.standalonePatternsAdditions) {
          standalonePatterns.push(...customization.standalonePatternsAdditions);
        }
      }

      return { ...book, standalonePatterns };
    });

    for (const book of workingBooks) {
      if (book.standalonePatterns && book.standalonePatterns.length > 0) {
        // Sort by length (longest first) for greedy matching
        const sorted = [...book.standalonePatterns].sort(
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
            bookId: book.canonicalId
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
  return new BookNormalizer(
    settings.language,
    settings.customBookMappings,
    settings.customBookMappingsV2
  );
}
