/**
 * Central export for all locale definitions
 */
import type { Locale, LocaleStrings } from '../types';
import { DE_LOCALE } from './de';
import { EN_LOCALE } from './en';
import { ES_LOCALE } from './es';
import { FR_LOCALE } from './fr';
import { PT_LOCALE } from './pt';
import { IT_LOCALE } from './it';

/**
 * All available locales mapped by their locale code
 */
export const LOCALES: Record<Locale, LocaleStrings> = {
  de: DE_LOCALE,
  en: EN_LOCALE,
  es: ES_LOCALE,
  fr: FR_LOCALE,
  pt: PT_LOCALE,
  it: IT_LOCALE,
};

// Re-export individual locales for direct access if needed
export { DE_LOCALE, EN_LOCALE, ES_LOCALE, FR_LOCALE, PT_LOCALE, IT_LOCALE };
