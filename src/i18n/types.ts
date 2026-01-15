/**
 * Type definitions for the i18n system
 *
 * Re-exports from languages/types.ts for backwards compatibility.
 * The languages module is now the Single Source of Truth.
 */

// Re-export everything from the canonical source
export type { Locale, SupportedLanguage, LocaleStrings, SeparatorConfig } from '../languages/types';
export { SUPPORTED_LOCALES } from '../languages/types';

// Import for LANGUAGE_LABELS
import { LANGUAGES } from '../languages/registry';
import type { Locale } from '../languages/types';

/** Language labels for UI display */
export const LANGUAGE_LABELS: Record<Locale, string> = {
  de: LANGUAGES.de.name,
  en: LANGUAGES.en.name,
  es: LANGUAGES.es.name,
  fr: LANGUAGES.fr.name,
  it: LANGUAGES.it.name,
  pt: LANGUAGES.pt.name,
};
