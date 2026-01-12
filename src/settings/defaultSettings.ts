import type { BibleRefSettings } from '../types';
import type { Locale } from '../i18n/locales';

/**
 * Default Settings
 *
 * Diese Konfiguration wird beim ersten Start des Plugins verwendet.
 * User kann alle Werte ueber das Settings Tab anpassen.
 */

/**
 * Create default settings with dynamic locale
 * @param locale Detected or specified locale
 */
export function createDefaultSettings(locale: Locale = 'en'): BibleRefSettings {
  // Determine format separators based on locale
  const isGerman = locale === 'de';

  return {
    // UI Language (dynamically detected)
    uiLanguage: locale,

    // Sync options (only on-save by default, no live sync while typing)
    syncOptions: {
      onSave: true,
      onFileChange: false
    },

    // Format preset (determines book name format and separators)
    language: locale,
    separators: isGerman
      ? { chapterVerse: ',', list: '.', range: '-' }  // German: Joh 3,16
      : { chapterVerse: ':', list: ',', range: '-' }, // English: John 3:16

    // Frontmatter (underscore prefix for less prominent display in Obsidian)
    frontmatterKey: '_bible_refs',
    tagPrefix: 'bible/',

    // Graph View settings
    writeToTagsField: true,         // Enabled by default for graph view visibility
    graphTagGranularity: 'chapter', // Chapter level by default (less cluttered graph)

    // Parsing options
    parseCodeBlocks: false,
    parseTitles: true,

    // Link behavior in sidebar
    linkBehavior: 'same-tab',

    // Sync timeout
    syncTimeout: {
      singleFileMs: 30000,   // 30 seconds for single file
      fullVaultMs: 300000    // 5 minutes for full vault sync
    },

    // Custom book mappings (user-defined overrides)
    customBookMappings: {}
  };
}

/**
 * Static default settings for backward compatibility
 * Uses English as fallback (actual locale detection happens in main.ts on first load)
 */
export const DEFAULT_SETTINGS: BibleRefSettings = createDefaultSettings('en');
