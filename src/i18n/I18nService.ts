import { moment } from 'obsidian';
import { LOCALES, type Locale, type LocaleStrings } from './locales';

/**
 * Detect system locale based on Obsidian's moment locale
 * Obsidian uses moment.js internally and sets the locale based on user's system settings
 * @returns Detected locale ('de' or 'en')
 */
export function detectSystemLocale(): Locale {
  // Use Obsidian's moment locale (reflects system/Obsidian language settings)
  const momentLocale = moment.locale() || '';

  if (momentLocale.startsWith('de')) return 'de';

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
    this.strings = LOCALES[locale];
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
    this.strings = LOCALES[locale];
  }
}

/**
 * Factory function to create an I18nService
 * @param locale Initial locale (defaults to 'de')
 */
export function createI18nService(locale: Locale = 'de'): I18nService {
  return new I18nService(locale);
}
