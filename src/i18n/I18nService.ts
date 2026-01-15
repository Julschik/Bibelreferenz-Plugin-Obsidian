import { moment } from 'obsidian';
import type { Locale, LocaleStrings } from './types';
import { getStrings } from '../languages/registry';

// Re-export types for convenience
export type { Locale, LocaleStrings } from './types';
export { SUPPORTED_LOCALES } from './types';

/**
 * Detect system locale based on Obsidian's moment locale
 * Obsidian uses moment.js internally and sets the locale based on user's system settings
 * @returns Detected locale
 */
export function detectSystemLocale(): Locale {
  // Use Obsidian's moment locale (reflects system/Obsidian language settings)
  const momentLocale = moment.locale() || '';

  if (momentLocale.startsWith('de')) return 'de';
  if (momentLocale.startsWith('es')) return 'es';
  if (momentLocale.startsWith('fr')) return 'fr';
  if (momentLocale.startsWith('pt')) return 'pt';
  if (momentLocale.startsWith('it')) return 'it';

  // Default to English for all other locales
  return 'en';
}

/**
 * I18nService - Internationalization service for the Bible Reference Mapper plugin
 *
 * Provides type-safe access to localized strings with support for
 * placeholder replacements like {count}, {duration}, etc.
 */
export class I18nService {
  private strings: LocaleStrings;
  private locale: Locale;

  constructor(locale: Locale = 'de') {
    this.locale = locale;
    this.strings = getStrings(locale);
  }

  /**
   * Get a translated string by key
   * @param key The localization key
   * @param replacements Optional placeholder replacements
   * @returns Translated string with replacements applied
   *
   * @example
   * i18n.t('noticeSynced', { count: 5 }) // "✓ 5 Bibelreferenz(en) synchronisiert"
   */
  t(key: keyof LocaleStrings, replacements?: Record<string, string | number>): string {
    let text = this.strings[key];

    if (replacements) {
      for (const [k, value] of Object.entries(replacements)) {
        text = text.replace(`{${k}}`, String(value));
      }
    }

    return text;
  }

  /**
   * Get the current locale
   */
  getLocale(): Locale {
    return this.locale;
  }

  /**
   * Change the current locale
   * @param locale New locale to use
   */
  setLocale(locale: Locale): void {
    this.locale = locale;
    this.strings = getStrings(locale);
  }
}

/**
 * Factory function to create an I18nService
 * @param locale Initial locale (defaults to 'de')
 */
export function createI18nService(locale: Locale = 'de'): I18nService {
  return new I18nService(locale);
}
