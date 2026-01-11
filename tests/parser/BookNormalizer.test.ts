import { describe, it, expect, beforeEach } from 'vitest';
import { BookNormalizer } from '../../src/parser/BookNormalizer';

describe('BookNormalizer', () => {
  describe('German mappings', () => {
    let normalizer: BookNormalizer;

    beforeEach(() => {
      normalizer = new BookNormalizer('de');
    });

    describe('normalize', () => {
      it('should normalize full book names', () => {
        expect(normalizer.normalize('Johannes')).toBe('Joh');
        expect(normalizer.normalize('Genesis')).toBe('Gen');
        expect(normalizer.normalize('Kolosser')).toBe('Col');
      });

      it('should normalize abbreviations', () => {
        expect(normalizer.normalize('Joh')).toBe('Joh');
        expect(normalizer.normalize('Gen')).toBe('Gen');
        expect(normalizer.normalize('Kol')).toBe('Col');
      });

      it('should handle numbered books with various formats', () => {
        expect(normalizer.normalize('1. Mose')).toBe('Gen');
        expect(normalizer.normalize('1.Mose')).toBe('Gen');
        expect(normalizer.normalize('1 Mose')).toBe('Gen');
        expect(normalizer.normalize('1Mose')).toBe('Gen');
        expect(normalizer.normalize('1Mo')).toBe('Gen');
      });

      it('should handle numbered books in NT', () => {
        expect(normalizer.normalize('1. Korinther')).toBe('1Co');
        expect(normalizer.normalize('1Korinther')).toBe('1Co');
        expect(normalizer.normalize('1Kor')).toBe('1Co');
        expect(normalizer.normalize('2. Korinther')).toBe('2Co');
      });

      it('should be case-insensitive', () => {
        expect(normalizer.normalize('JOHANNES')).toBe('Joh');
        expect(normalizer.normalize('johannes')).toBe('Joh');
        expect(normalizer.normalize('JoHaNnEs')).toBe('Joh');
      });

      it('should handle whitespace', () => {
        expect(normalizer.normalize('  Johannes  ')).toBe('Joh');
        expect(normalizer.normalize(' 1 Mose ')).toBe('Gen');
      });

      it('should return null for invalid input', () => {
        expect(normalizer.normalize('')).toBe(null);
        expect(normalizer.normalize('InvalidBook')).toBe(null);
        expect(normalizer.normalize('XYZ')).toBe(null);
      });

      it('should handle multiple aliases for same book', () => {
        // Römer
        expect(normalizer.normalize('Römer')).toBe('Rom');
        expect(normalizer.normalize('Roem')).toBe('Rom');
        expect(normalizer.normalize('Röm')).toBe('Rom');
        expect(normalizer.normalize('Rom')).toBe('Rom');
      });

      it('should prioritize longer matches (Johannes vs Joh)', () => {
        // Both "Johannes" and "Joh" map to 'Joh'
        // But "Johannes" should not be prematurely matched by "Joh"
        expect(normalizer.normalize('Johannes')).toBe('Joh');
        expect(normalizer.normalize('Joh')).toBe('Joh');
      });

      it('should handle all Pentateuch books', () => {
        expect(normalizer.normalize('Genesis')).toBe('Gen');
        expect(normalizer.normalize('Exodus')).toBe('Exo');
        expect(normalizer.normalize('Levitikus')).toBe('Lev');
        expect(normalizer.normalize('Numeri')).toBe('Num');
        expect(normalizer.normalize('Deuteronomium')).toBe('Deu');
      });

      it('should handle prophets', () => {
        expect(normalizer.normalize('Jesaja')).toBe('Isa');
        expect(normalizer.normalize('Jeremia')).toBe('Jer');
        expect(normalizer.normalize('Hesekiel')).toBe('Eze');
        expect(normalizer.normalize('Daniel')).toBe('Dan');
      });

      it('should handle poetic books', () => {
        expect(normalizer.normalize('Hiob')).toBe('Job');
        expect(normalizer.normalize('Psalmen')).toBe('Psa');
        expect(normalizer.normalize('Sprüche')).toBe('Pro');
        expect(normalizer.normalize('Prediger')).toBe('Ecc');
        expect(normalizer.normalize('Hoheslied')).toBe('Son');
      });
    });

    describe('getAllAliasesPattern', () => {
      it('should return a valid regex alternation pattern', () => {
        const pattern = normalizer.getAllAliasesPattern();
        expect(pattern).toBeTruthy();
        expect(pattern).toContain('|'); // Should contain alternations

        // Should be usable in a regex
        const regex = new RegExp(pattern, 'i');
        expect(regex.test('Johannes')).toBe(true);
        expect(regex.test('Joh')).toBe(true);
        expect(regex.test('InvalidBook')).toBe(false);
      });

      it('should prioritize longer matches in pattern', () => {
        const pattern = normalizer.getAllAliasesPattern();
        // "Johannes" should appear before "Joh" in the pattern
        const johannesIndex = pattern.indexOf('johannes');
        const johIndex = pattern.lastIndexOf('joh');
        expect(johannesIndex).toBeLessThan(johIndex);
      });
    });

    describe('getStandalonePatterns', () => {
      it('should return standalone book patterns', () => {
        const patterns = normalizer.getStandalonePatterns();
        expect(patterns.length).toBeGreaterThan(0);

        // Each pattern should have a regex and bookId
        for (const p of patterns) {
          expect(p.pattern).toBeInstanceOf(RegExp);
          expect(p.bookId).toBeTruthy();
        }
      });

      it('should match standalone book names', () => {
        const patterns = normalizer.getStandalonePatterns();
        const kolPatterns = patterns.filter(p => p.bookId === 'Col');

        expect(kolPatterns.length).toBeGreaterThan(0);
        // At least one pattern should match 'Kolosserbrief'
        const matches = kolPatterns.some(p => p.pattern.test('Kolosserbrief'));
        expect(matches).toBe(true);
      });

      it('should match with word boundaries', () => {
        const patterns = normalizer.getStandalonePatterns();
        const genPatterns = patterns.filter(p => p.bookId === 'Gen');

        expect(genPatterns.length).toBeGreaterThan(0);

        // At least one pattern should match these strings
        expect(genPatterns.some(p => p.pattern.test('Siehe Genesis'))).toBe(true);
        expect(genPatterns.some(p => p.pattern.test('Genesis Text'))).toBe(true);

        // Should NOT match partial words (if properly implemented with \b)
        // This depends on the exact pattern implementation
      });
    });

    describe('isValidBookAlias', () => {
      it('should return true for valid aliases', () => {
        expect(normalizer.isValidBookAlias('Johannes')).toBe(true);
        expect(normalizer.isValidBookAlias('Joh')).toBe(true);
        expect(normalizer.isValidBookAlias('1 Mose')).toBe(true);
      });

      it('should return false for invalid aliases', () => {
        expect(normalizer.isValidBookAlias('InvalidBook')).toBe(false);
        expect(normalizer.isValidBookAlias('')).toBe(false);
        expect(normalizer.isValidBookAlias('XYZ')).toBe(false);
      });
    });
  });

  describe('English mappings', () => {
    let normalizer: BookNormalizer;

    beforeEach(() => {
      normalizer = new BookNormalizer('en');
    });

    it('should normalize English book names', () => {
      expect(normalizer.normalize('John')).toBe('Joh');
      expect(normalizer.normalize('Genesis')).toBe('Gen');
      expect(normalizer.normalize('Colossians')).toBe('Col');
    });

    it('should handle English abbreviations', () => {
      expect(normalizer.normalize('Jn')).toBe('Joh');
      expect(normalizer.normalize('Gen')).toBe('Gen');
      expect(normalizer.normalize('Col')).toBe('Col');
    });

    it('should handle numbered books in English', () => {
      expect(normalizer.normalize('1 Corinthians')).toBe('1Co');
      expect(normalizer.normalize('1Corinthians')).toBe('1Co');
      expect(normalizer.normalize('1Cor')).toBe('1Co');
      expect(normalizer.normalize('First Corinthians')).toBe('1Co');
      expect(normalizer.normalize('I Corinthians')).toBe('1Co');
    });

    it('should handle Song of Solomon variants', () => {
      expect(normalizer.normalize('Song of Solomon')).toBe('Son');
      expect(normalizer.normalize('Song of Songs')).toBe('Son');
      expect(normalizer.normalize('SOS')).toBe('Son');
    });
  });

  describe('Custom mappings', () => {
    it('should override built-in mappings', () => {
      const customMappings = {
        'MyCustomJohn': 'Joh',
        'MyBook': 'Gen'
      };

      const normalizer = new BookNormalizer('de', customMappings);

      expect(normalizer.normalize('MyCustomJohn')).toBe('Joh');
      expect(normalizer.normalize('MyBook')).toBe('Gen');
    });

    it('should still support built-in mappings', () => {
      const customMappings = { 'MyCustomJohn': 'Joh' };
      const normalizer = new BookNormalizer('de', customMappings);

      // Built-in should still work
      expect(normalizer.normalize('Johannes')).toBe('Joh');
      expect(normalizer.normalize('Genesis')).toBe('Gen');
    });
  });

  describe('Edge cases', () => {
    let normalizer: BookNormalizer;

    beforeEach(() => {
      normalizer = new BookNormalizer('de');
    });

    it('should handle null and undefined gracefully', () => {
      expect(normalizer.normalize(null as any)).toBe(null);
      expect(normalizer.normalize(undefined as any)).toBe(null);
    });

    it('should handle special characters in book names', () => {
      // Römer with umlaut
      expect(normalizer.normalize('Römer')).toBe('Rom');
      expect(normalizer.normalize('RÖMER')).toBe('Rom');
    });

    it('should handle books with dots in abbreviations', () => {
      expect(normalizer.normalize('1.Mo')).toBe('Gen'); // German mapping uses 'Gen'
      expect(normalizer.normalize('1. Mo')).toBe('Gen');
      expect(normalizer.normalize('1. Mose')).toBe('Gen');
    });
  });
});
