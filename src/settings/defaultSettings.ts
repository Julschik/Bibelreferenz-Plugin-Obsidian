import type { BibleRefSettings } from '../types';
import type { SupportedLanguage } from '../i18n/types';
import { getLanguage } from '../languages/registry';

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
export function createDefaultSettings(locale: SupportedLanguage = 'en'): BibleRefSettings {
  const langConfig = getLanguage(locale);

  return {
    // Language setting (unified: controls both UI and parsing)
    language: locale,

    // Sync options (only on-save by default, no live sync while typing)
    syncOptions: {
      onSave: true,
      onFileChange: false
    },

    // Separators from language config
    separators: { ...langConfig.separators },

    // Frontmatter (underscore prefix for less prominent display in Obsidian)
    frontmatterKey: '_bible_refs',
    // Tag prefix from language config (e.g., "Bibel/" for DE, "Bible/" for EN)
    tagPrefix: langConfig.tagPrefix + '/',

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
