import { describe, it, expect } from 'vitest';
import { LOCALES } from '../../src/i18n/locales';
import { SUPPORTED_LOCALES, type Locale, type LocaleStrings } from '../../src/i18n/types';

describe('i18n Locales', () => {
  // Get all keys from the LocaleStrings interface by using one complete locale (German)
  const referenceLocale = LOCALES.de;
  const allKeys = Object.keys(referenceLocale) as (keyof LocaleStrings)[];

  describe('Locale completeness', () => {
    it('all locales should have all required keys', () => {
      for (const locale of SUPPORTED_LOCALES) {
        const localeStrings = LOCALES[locale];
        const missingKeys: string[] = [];

        for (const key of allKeys) {
          if (!(key in localeStrings)) {
            missingKeys.push(key);
          }
        }

        expect(missingKeys, `Locale "${locale}" is missing keys`).toEqual([]);
      }
    });

    it('LOCALES should contain all supported locales', () => {
      for (const locale of SUPPORTED_LOCALES) {
        expect(LOCALES[locale], `LOCALES should contain "${locale}"`).toBeDefined();
      }
    });

    it('SUPPORTED_LOCALES should match LOCALES keys', () => {
      const localeKeys = Object.keys(LOCALES) as Locale[];
      expect(localeKeys.sort()).toEqual([...SUPPORTED_LOCALES].sort());
    });
  });

  describe('String validity', () => {
    it('no locale should have empty strings', () => {
      for (const locale of SUPPORTED_LOCALES) {
        const localeStrings = LOCALES[locale];
        const emptyKeys: string[] = [];

        for (const key of allKeys) {
          const value = localeStrings[key];
          if (typeof value !== 'string' || value.trim() === '') {
            emptyKeys.push(key);
          }
        }

        expect(emptyKeys, `Locale "${locale}" has empty strings`).toEqual([]);
      }
    });

    it('no locale should have undefined values', () => {
      for (const locale of SUPPORTED_LOCALES) {
        const localeStrings = LOCALES[locale];

        for (const key of allKeys) {
          expect(
            localeStrings[key],
            `Locale "${locale}" has undefined value for key "${key}"`
          ).toBeDefined();
        }
      }
    });
  });

  describe('Placeholder consistency', () => {
    // Extract placeholders from a string (e.g., {count}, {duration})
    function extractPlaceholders(text: string): string[] {
      const matches = text.match(/\{[^}]+\}/g) || [];
      return matches.sort();
    }

    it('placeholders should be consistent across all locales for each key', () => {
      // Use English as the reference for placeholder patterns
      const referenceStrings = LOCALES.en;

      for (const key of allKeys) {
        const referencePlaceholders = extractPlaceholders(referenceStrings[key]);

        // Skip keys without placeholders
        if (referencePlaceholders.length === 0) continue;

        for (const locale of SUPPORTED_LOCALES) {
          const localeStrings = LOCALES[locale];
          const localePlaceholders = extractPlaceholders(localeStrings[key]);

          expect(
            localePlaceholders,
            `Locale "${locale}" has different placeholders for key "${key}". ` +
            `Expected: ${referencePlaceholders.join(', ')}, Got: ${localePlaceholders.join(', ')}`
          ).toEqual(referencePlaceholders);
        }
      }
    });
  });

  describe('Locale count', () => {
    it('should have exactly 6 supported locales', () => {
      expect(SUPPORTED_LOCALES).toHaveLength(6);
    });

    it('should include de, en, es, fr, pt, it', () => {
      expect(SUPPORTED_LOCALES).toContain('de');
      expect(SUPPORTED_LOCALES).toContain('en');
      expect(SUPPORTED_LOCALES).toContain('es');
      expect(SUPPORTED_LOCALES).toContain('fr');
      expect(SUPPORTED_LOCALES).toContain('pt');
      expect(SUPPORTED_LOCALES).toContain('it');
    });
  });

  describe('Key count', () => {
    it('LocaleStrings should have a reasonable number of keys', () => {
      // Sanity check - we expect around 80+ keys based on the current implementation
      expect(allKeys.length).toBeGreaterThan(80);
    });

    it('all locales should have the same number of keys', () => {
      const expectedCount = allKeys.length;

      for (const locale of SUPPORTED_LOCALES) {
        const localeKeys = Object.keys(LOCALES[locale]);
        expect(
          localeKeys.length,
          `Locale "${locale}" has ${localeKeys.length} keys, expected ${expectedCount}`
        ).toBe(expectedCount);
      }
    });
  });
});
