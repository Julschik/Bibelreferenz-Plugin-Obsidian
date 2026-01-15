import { describe, it, expect } from 'vitest';
import { DisplayIdResolver, createDisplayIdResolver } from '../../src/parser/DisplayIdResolver';
import type { BibleRefSettings, CustomBookMappingsV2 } from '../../src/types';

describe('DisplayIdResolver', () => {
  describe('constructor', () => {
    it('should create instance with no custom mappings', () => {
      const resolver = new DisplayIdResolver();

      // Without custom mappings, canonical IDs should be returned as-is
      expect(resolver.getDisplayId('Mat')).toBe('Mat');
      expect(resolver.getDisplayId('Gen')).toBe('Gen');
    });

    it('should create instance with empty custom mappings', () => {
      const resolver = new DisplayIdResolver({});

      expect(resolver.getDisplayId('Mat')).toBe('Mat');
    });

    it('should create instance with custom mappings', () => {
      const customMappings: CustomBookMappingsV2 = {
        'Mat': { pinnedDisplayId: 'Mt' },
        'Gen': { pinnedDisplayId: 'Genesis' }
      };

      const resolver = new DisplayIdResolver(customMappings);

      expect(resolver.getDisplayId('Mat')).toBe('Mt');
      expect(resolver.getDisplayId('Gen')).toBe('Genesis');
    });
  });

  describe('getDisplayId', () => {
    it('should return pinned display ID when available', () => {
      const customMappings: CustomBookMappingsV2 = {
        'Mat': { pinnedDisplayId: 'Mt' }
      };

      const resolver = new DisplayIdResolver(customMappings);

      expect(resolver.getDisplayId('Mat')).toBe('Mt');
    });

    it('should return canonical ID as fallback when no pinned ID', () => {
      const customMappings: CustomBookMappingsV2 = {
        'Mat': { aliasesAdditions: ['Mattäus'] } // No pinnedDisplayId
      };

      const resolver = new DisplayIdResolver(customMappings);

      expect(resolver.getDisplayId('Mat')).toBe('Mat');
    });

    it('should return canonical ID for unknown book', () => {
      const resolver = new DisplayIdResolver({});

      expect(resolver.getDisplayId('UnknownBook')).toBe('UnknownBook');
    });

    it('should handle multiple pinned display IDs', () => {
      const customMappings: CustomBookMappingsV2 = {
        'Mat': { pinnedDisplayId: 'Matthäus' },
        'Joh': { pinnedDisplayId: 'Johannes' },
        'Gen': { pinnedDisplayId: '1Mose' }
      };

      const resolver = new DisplayIdResolver(customMappings);

      expect(resolver.getDisplayId('Mat')).toBe('Matthäus');
      expect(resolver.getDisplayId('Joh')).toBe('Johannes');
      expect(resolver.getDisplayId('Gen')).toBe('1Mose');
      expect(resolver.getDisplayId('Rev')).toBe('Rev'); // Not pinned
    });
  });

  describe('getCanonicalId', () => {
    it('should return canonical ID when input is a canonical ID', () => {
      const customMappings: CustomBookMappingsV2 = {
        'Mat': { pinnedDisplayId: 'Mt' }
      };

      const resolver = new DisplayIdResolver(customMappings);

      // Mat is a canonical ID in the map
      expect(resolver.getCanonicalId('Mat')).toBe('Mat');
    });

    it('should return canonical ID when input is a display ID', () => {
      const customMappings: CustomBookMappingsV2 = {
        'Mat': { pinnedDisplayId: 'Mt' }
      };

      const resolver = new DisplayIdResolver(customMappings);

      // Mt maps back to Mat
      expect(resolver.getCanonicalId('Mt')).toBe('Mat');
    });

    it('should return null for unknown ID', () => {
      const customMappings: CustomBookMappingsV2 = {
        'Mat': { pinnedDisplayId: 'Mt' }
      };

      const resolver = new DisplayIdResolver(customMappings);

      expect(resolver.getCanonicalId('UnknownBook')).toBe(null);
    });

    it('should handle empty custom mappings', () => {
      const resolver = new DisplayIdResolver({});

      expect(resolver.getCanonicalId('Mat')).toBe(null);
    });

    it('should handle reverse lookup with multiple mappings', () => {
      const customMappings: CustomBookMappingsV2 = {
        'Mat': { pinnedDisplayId: 'Matthäus' },
        'Joh': { pinnedDisplayId: 'Johannes' }
      };

      const resolver = new DisplayIdResolver(customMappings);

      expect(resolver.getCanonicalId('Matthäus')).toBe('Mat');
      expect(resolver.getCanonicalId('Johannes')).toBe('Joh');
    });

    it('should prefer canonical ID over display ID match', () => {
      // Edge case: What if a display ID happens to be another book's canonical ID?
      const customMappings: CustomBookMappingsV2 = {
        'Mat': { pinnedDisplayId: 'Joh' } // Mat is pinned to display as "Joh"
      };

      const resolver = new DisplayIdResolver(customMappings);

      // "Mat" is a canonical ID in the map, so it returns "Mat"
      expect(resolver.getCanonicalId('Mat')).toBe('Mat');

      // "Joh" is a display ID that maps to "Mat"
      // But it's NOT a canonical ID in our map (only Mat is)
      expect(resolver.getCanonicalId('Joh')).toBe('Mat');
    });
  });

  describe('edge cases', () => {
    it('should handle customization without pinnedDisplayId', () => {
      const customMappings: CustomBookMappingsV2 = {
        'Mat': {
          aliasesAdditions: ['Mattäus'],
          aliasesDeletions: ['Matthew']
        }
      };

      const resolver = new DisplayIdResolver(customMappings);

      // No pinnedDisplayId, so canonical ID should be returned
      expect(resolver.getDisplayId('Mat')).toBe('Mat');
    });

    it('should handle empty string pinnedDisplayId', () => {
      const customMappings: CustomBookMappingsV2 = {
        'Mat': { pinnedDisplayId: '' }
      };

      const resolver = new DisplayIdResolver(customMappings);

      // Empty string is falsy, so should not be used
      expect(resolver.getDisplayId('Mat')).toBe('Mat');
    });

    it('should handle undefined pinnedDisplayId', () => {
      const customMappings: CustomBookMappingsV2 = {
        'Mat': { pinnedDisplayId: undefined }
      };

      const resolver = new DisplayIdResolver(customMappings);

      expect(resolver.getDisplayId('Mat')).toBe('Mat');
    });
  });

  describe('createDisplayIdResolver factory', () => {
    it('should create resolver from settings', () => {
      const settings = {
        customBookMappingsV2: {
          'Mat': { pinnedDisplayId: 'Mt' }
        }
      } as BibleRefSettings;

      const resolver = createDisplayIdResolver(settings);

      expect(resolver.getDisplayId('Mat')).toBe('Mt');
    });

    it('should handle settings without customBookMappingsV2', () => {
      const settings = {} as BibleRefSettings;

      const resolver = createDisplayIdResolver(settings);

      expect(resolver.getDisplayId('Mat')).toBe('Mat');
    });

    it('should handle settings with undefined customBookMappingsV2', () => {
      const settings = {
        customBookMappingsV2: undefined
      } as BibleRefSettings;

      const resolver = createDisplayIdResolver(settings);

      expect(resolver.getDisplayId('Mat')).toBe('Mat');
    });
  });

  describe('real-world scenarios', () => {
    it('should handle German style pinned display IDs', () => {
      const customMappings: CustomBookMappingsV2 = {
        'Gen': { pinnedDisplayId: '1Mose' },
        'Exo': { pinnedDisplayId: '2Mose' },
        'Mat': { pinnedDisplayId: 'Matthäus' },
        'Joh': { pinnedDisplayId: 'Johannes' },
        'Rev': { pinnedDisplayId: 'Offenbarung' }
      };

      const resolver = new DisplayIdResolver(customMappings);

      expect(resolver.getDisplayId('Gen')).toBe('1Mose');
      expect(resolver.getDisplayId('Exo')).toBe('2Mose');
      expect(resolver.getDisplayId('Mat')).toBe('Matthäus');
      expect(resolver.getDisplayId('Joh')).toBe('Johannes');
      expect(resolver.getDisplayId('Rev')).toBe('Offenbarung');

      // Reverse lookups
      expect(resolver.getCanonicalId('1Mose')).toBe('Gen');
      expect(resolver.getCanonicalId('Matthäus')).toBe('Mat');
      expect(resolver.getCanonicalId('Offenbarung')).toBe('Rev');
    });

    it('should handle partial customization (some books pinned, others not)', () => {
      const customMappings: CustomBookMappingsV2 = {
        'Mat': { pinnedDisplayId: 'Mt' }
        // All other books use canonical IDs
      };

      const resolver = new DisplayIdResolver(customMappings);

      expect(resolver.getDisplayId('Mat')).toBe('Mt');
      expect(resolver.getDisplayId('Joh')).toBe('Joh');
      expect(resolver.getDisplayId('Gen')).toBe('Gen');
      expect(resolver.getDisplayId('Rev')).toBe('Rev');
    });
  });
});
