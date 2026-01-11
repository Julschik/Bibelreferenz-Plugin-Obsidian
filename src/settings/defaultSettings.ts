import type { BibleRefSettings } from '../types';

/**
 * Default Settings
 *
 * Diese Konfiguration wird beim ersten Start des Plugins verwendet.
 * User kann alle Werte über das Settings Tab anpassen.
 */
export const DEFAULT_SETTINGS: BibleRefSettings = {
  syncMode: 'on-save-or-change',
  language: 'de',
  separators: {
    chapterVerse: ',',
    list: '.',
    range: '-'
  },
  frontmatterKey: 'bible-refs',
  tagPrefix: 'bible/',
  customBookMappings: {},
  parseCodeBlocks: false,
  parseTitles: true
};
