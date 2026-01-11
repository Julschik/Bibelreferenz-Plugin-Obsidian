import type { SeparatorConfig } from '../types';

/**
 * Language Presets
 *
 * Vordefinierte Separator-Konfigurationen für verschiedene Sprachen.
 * User kann zwischen Presets wählen oder eigene Custom-Separatoren definieren.
 */

export interface LanguagePreset {
  name: string;
  description: string;
  separators: SeparatorConfig;
  example: string;
}

export const LANGUAGE_PRESETS: Record<string, LanguagePreset> = {
  de: {
    name: 'Deutsch',
    description: 'Deutsche Bibelstellenformate',
    separators: {
      chapterVerse: ',',
      list: '.',
      range: '-'
    },
    example: 'Joh 3,16-18.20'
  },

  en: {
    name: 'English',
    description: 'English Bible reference formats',
    separators: {
      chapterVerse: ':',
      list: ',',
      range: '-'
    },
    example: 'John 3:16-18,20'
  }
};

/**
 * Get preset by language key
 * @param language Language key ('de', 'en', 'custom')
 * @returns LanguagePreset or undefined if not found
 */
export function getPreset(language: string): LanguagePreset | undefined {
  return LANGUAGE_PRESETS[language];
}

/**
 * Get separator configuration for a language
 * @param language Language key
 * @returns SeparatorConfig or undefined
 */
export function getSeparators(language: string): SeparatorConfig | undefined {
  const preset = getPreset(language);
  return preset?.separators;
}
