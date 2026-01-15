/**
 * Language Registry - Central access point for all language configurations
 *
 * This module provides:
 * - Access to all language configurations
 * - Helper functions for looking up books by displayId or alias
 * - Cross-language mapping for tag migration
 */

import type {
  Locale,
  LanguageConfig,
  BookLocalization,
  SeparatorConfig,
  LocaleStrings,
  DisplayIdToBookId,
  AliasToBookId,
} from './types';
import { SUPPORTED_LOCALES } from './types';

// Import all language configurations
// These will be created in Phase 2
import { GERMAN } from './de';
import { ENGLISH } from './en';
import { SPANISH } from './es';
import { FRENCH } from './fr';
import { ITALIAN } from './it';
import { PORTUGUESE } from './pt';

// ═══════════════════════════════════════════════════════════════
// LANGUAGE REGISTRY
// ═══════════════════════════════════════════════════════════════

/**
 * Central registry of all language configurations
 */
export const LANGUAGES: Record<Locale, LanguageConfig> = {
  de: GERMAN,
  en: ENGLISH,
  es: SPANISH,
  fr: FRENCH,
  it: ITALIAN,
  pt: PORTUGUESE,
};

// ═══════════════════════════════════════════════════════════════
// ACCESSOR FUNCTIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Get a language configuration by locale code
 */
export function getLanguage(locale: Locale): LanguageConfig {
  return LANGUAGES[locale];
}

/**
 * Get all supported locales
 */
export function getSupportedLocales(): Locale[] {
  return SUPPORTED_LOCALES;
}

/**
 * Get the display name for a locale
 */
export function getLanguageName(locale: Locale): string {
  return LANGUAGES[locale].name;
}

/**
 * Get the tag prefix for a locale (e.g., "Bibel", "Bible")
 */
export function getTagPrefix(locale: Locale): string {
  return LANGUAGES[locale].tagPrefix;
}

/**
 * Get the separator configuration for a locale
 */
export function getSeparators(locale: Locale): SeparatorConfig {
  return LANGUAGES[locale].separators;
}

/**
 * Get all UI strings for a locale
 */
export function getStrings(locale: Locale): LocaleStrings {
  return LANGUAGES[locale].strings;
}

/**
 * Get all book localizations for a locale
 */
export function getBooks(locale: Locale): BookLocalization[] {
  return LANGUAGES[locale].books;
}

// ═══════════════════════════════════════════════════════════════
// BOOK LOOKUP FUNCTIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Get a book by its numeric ID
 */
export function getBookById(locale: Locale, bookId: number): BookLocalization | undefined {
  return LANGUAGES[locale].books.find(b => b.bookId === bookId);
}

/**
 * Get a book by its canonical ID (e.g., "Gen", "Joh")
 */
export function getBookByCanonicalId(locale: Locale, canonicalId: string): BookLocalization | undefined {
  const lowerCanonicalId = canonicalId.toLowerCase();
  return LANGUAGES[locale].books.find(b => b.canonicalId.toLowerCase() === lowerCanonicalId);
}

/**
 * Get a book by its display ID (e.g., "Joh", "John")
 */
export function getBookByDisplayId(locale: Locale, displayId: string): BookLocalization | undefined {
  const lowerDisplayId = displayId.toLowerCase();
  return LANGUAGES[locale].books.find(b => b.displayId.toLowerCase() === lowerDisplayId);
}

/**
 * Get displayId from canonicalId for a locale
 * Returns canonicalId if not found (graceful fallback)
 */
export function getDisplayId(locale: Locale, canonicalId: string): string {
  const book = getBookByCanonicalId(locale, canonicalId);
  return book ? book.displayId : canonicalId;
}

/**
 * Build a map of displayId -> bookId for fast lookups
 */
export function buildDisplayIdMap(locale: Locale): DisplayIdToBookId {
  const map = new Map<string, number>();
  for (const book of LANGUAGES[locale].books) {
    map.set(book.displayId.toLowerCase(), book.bookId);
  }
  return map;
}

/**
 * Build a map of all aliases -> bookId for fast parsing lookups
 * Includes displayId, aliases, and standalone patterns
 */
export function buildAliasMap(locale: Locale): AliasToBookId {
  const map = new Map<string, number>();

  for (const book of LANGUAGES[locale].books) {
    // Add displayId
    map.set(book.displayId.toLowerCase(), book.bookId);

    // Add all aliases
    for (const alias of book.aliases) {
      map.set(alias.toLowerCase(), book.bookId);
    }

    // Add standalone patterns (if any)
    if (book.standalonePatterns) {
      for (const pattern of book.standalonePatterns) {
        map.set(pattern.toLowerCase(), book.bookId);
      }
    }
  }

  return map;
}

/**
 * Normalize an alias to a numeric book ID
 * Returns null if alias is not recognized
 */
export function normalizeAlias(locale: Locale, alias: string): number | null {
  const aliasMap = buildAliasMap(locale);
  return aliasMap.get(alias.toLowerCase()) ?? null;
}

// ═══════════════════════════════════════════════════════════════
// CROSS-LANGUAGE MAPPING
// ═══════════════════════════════════════════════════════════════

/**
 * Build a cross-language display ID map for migration
 * Maps displayId from source language to displayId in target language
 */
export function buildCrossLanguageMap(
  fromLocale: Locale,
  toLocale: Locale
): Map<string, string> {
  const map = new Map<string, string>();
  const fromBooks = LANGUAGES[fromLocale].books;
  const toBooks = LANGUAGES[toLocale].books;

  for (const fromBook of fromBooks) {
    const toBook = toBooks.find(b => b.bookId === fromBook.bookId);
    if (toBook) {
      // Map displayId -> displayId
      map.set(fromBook.displayId, toBook.displayId);
    }
  }

  return map;
}

/**
 * Build a comprehensive alias-to-displayId map for a target language
 * Used for migrating tags from ANY format to the target language
 */
export function buildUniversalToDisplayIdMap(toLocale: Locale): Map<string, string> {
  const map = new Map<string, string>();
  const toBooks = LANGUAGES[toLocale].books;

  // For each book in the target language
  for (const toBook of toBooks) {
    // Collect all known aliases from ALL languages for this book
    for (const locale of SUPPORTED_LOCALES) {
      const fromBook = LANGUAGES[locale].books.find(b => b.bookId === toBook.bookId);
      if (fromBook) {
        // Map the displayId from source language
        map.set(fromBook.displayId.toLowerCase(), toBook.displayId);

        // Map all aliases from source language
        for (const alias of fromBook.aliases) {
          map.set(alias.toLowerCase(), toBook.displayId);
        }
      }
    }
  }

  return map;
}

// ═══════════════════════════════════════════════════════════════
// TAG PREFIX MAPPING
// ═══════════════════════════════════════════════════════════════

/**
 * Get all known tag prefixes across all languages
 */
export function getAllTagPrefixes(): string[] {
  return SUPPORTED_LOCALES.map(locale => LANGUAGES[locale].tagPrefix);
}

/**
 * Check if a string is a known tag prefix
 */
export function isKnownTagPrefix(prefix: string): boolean {
  const lowerPrefix = prefix.toLowerCase();
  return SUPPORTED_LOCALES.some(
    locale => LANGUAGES[locale].tagPrefix.toLowerCase() === lowerPrefix
  );
}

/**
 * Get the locale for a given tag prefix
 */
export function getLocaleByTagPrefix(prefix: string): Locale | null {
  const lowerPrefix = prefix.toLowerCase();
  for (const locale of SUPPORTED_LOCALES) {
    if (LANGUAGES[locale].tagPrefix.toLowerCase() === lowerPrefix) {
      return locale;
    }
  }
  return null;
}

// ═══════════════════════════════════════════════════════════════
// VALIDATION
// ═══════════════════════════════════════════════════════════════

/**
 * Validate that a locale is supported
 */
export function isValidLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}

/**
 * Get a valid locale or fallback to default
 */
export function getValidLocale(locale: string, fallback: Locale = 'en'): Locale {
  return isValidLocale(locale) ? locale : fallback;
}
