import { describe, it, expect } from 'vitest';
import { ContentCleaner, createContentCleaner } from '../../src/parser/ContentCleaner';

describe('ContentCleaner', () => {
  describe('clean', () => {
    describe('empty and edge cases', () => {
      it('should return empty string for empty input', () => {
        const cleaner = new ContentCleaner();
        expect(cleaner.clean('')).toBe('');
      });

      it('should return empty string for null/undefined input', () => {
        const cleaner = new ContentCleaner();
        expect(cleaner.clean(null as unknown as string)).toBe('');
        expect(cleaner.clean(undefined as unknown as string)).toBe('');
      });

      it('should handle whitespace-only input', () => {
        const cleaner = new ContentCleaner();
        expect(cleaner.clean('   ')).toBe('   ');
        expect(cleaner.clean('\n\n')).toBe('\n\n');
      });
    });

    describe('YAML frontmatter', () => {
      it('should remove YAML frontmatter', () => {
        const cleaner = new ContentCleaner();
        const content = `---
title: Test
tags: [bible]
---
Some content with Joh 3,16`;
        const cleaned = cleaner.clean(content);
        expect(cleaned).not.toContain('title:');
        expect(cleaned).toContain('Joh 3,16');
      });

      it('should handle missing closing ---', () => {
        const cleaner = new ContentCleaner();
        const content = `---
title: Test
Some content with Joh 3,16`;
        // Frontmatter without closing --- should NOT be removed
        const cleaned = cleaner.clean(content);
        expect(cleaned).toContain('title: Test');
        expect(cleaned).toContain('Joh 3,16');
      });

      it('should only remove frontmatter at the start of the file', () => {
        const cleaner = new ContentCleaner();
        const content = `Some intro text
---
title: Not frontmatter
---
More content`;
        const cleaned = cleaner.clean(content);
        expect(cleaned).toContain('title: Not frontmatter');
      });

      it('should preserve string length when removing frontmatter', () => {
        const cleaner = new ContentCleaner();
        const content = `---
title: Test
---
Some content`;
        const cleaned = cleaner.clean(content);
        expect(cleaned.length).toBe(content.length);
      });
    });

    describe('fenced code blocks', () => {
      it('should remove fenced code blocks', () => {
        const cleaner = new ContentCleaner();
        const content = 'Before ```javascript\nJoh 3,16\n``` After';
        const cleaned = cleaner.clean(content);
        expect(cleaned).not.toContain('javascript');
        expect(cleaned).not.toContain('Joh 3,16');
        expect(cleaned).toContain('Before');
        expect(cleaned).toContain('After');
      });

      it('should remove code blocks without language specifier', () => {
        const cleaner = new ContentCleaner();
        const content = 'Before ```\nJoh 3,16\n``` After';
        const cleaned = cleaner.clean(content);
        expect(cleaned).not.toContain('Joh 3,16');
      });

      it('should handle multiple code blocks', () => {
        const cleaner = new ContentCleaner();
        const content = 'Text ' + '```code1```' + ' middle ' + '```code2```' + ' end';
        const cleaned = cleaner.clean(content);
        expect(cleaned).not.toContain('code1');
        expect(cleaned).not.toContain('code2');
        expect(cleaned).toContain('Text');
        expect(cleaned).toContain('middle');
        expect(cleaned).toContain('end');
      });

      it('should handle nested-looking code blocks correctly', () => {
        const cleaner = new ContentCleaner();
        // Non-greedy regex should stop at first ```
        const content = '```first block```' + ' text ' + '```second block```';
        const cleaned = cleaner.clean(content);
        expect(cleaned).toContain('text');
      });

      it('should preserve code blocks when parseCodeBlocks is true', () => {
        const cleaner = new ContentCleaner(true);
        const content = 'Before ```Joh 3,16``` After';
        const cleaned = cleaner.clean(content);
        expect(cleaned).toContain('Joh 3,16');
      });
    });

    describe('inline code', () => {
      it('should remove inline code', () => {
        const cleaner = new ContentCleaner();
        const content = 'Check the `Joh 3,16` reference';
        const cleaned = cleaner.clean(content);
        expect(cleaned).not.toContain('Joh 3,16');
        expect(cleaned).toContain('Check the');
        expect(cleaned).toContain('reference');
      });

      it('should handle multiple inline code spans', () => {
        const cleaner = new ContentCleaner();
        const content = 'Use `code1` and `code2` here';
        const cleaned = cleaner.clean(content);
        expect(cleaned).not.toContain('code1');
        expect(cleaned).not.toContain('code2');
        expect(cleaned).toContain('Use');
        expect(cleaned).toContain('and');
        expect(cleaned).toContain('here');
      });

      it('should NOT remove triple backticks as inline code', () => {
        const cleaner = new ContentCleaner();
        // Triple backticks are for code blocks, not inline
        const content = 'Before ``` inline ``` After';
        const cleaned = cleaner.clean(content);
        // The ``` inline ``` is treated as a code block, not inline code
        expect(cleaned).toContain('Before');
        expect(cleaned).toContain('After');
      });

      it('should preserve inline code when parseCodeBlocks is true', () => {
        const cleaner = new ContentCleaner(true);
        const content = 'Check the `Joh 3,16` reference';
        const cleaned = cleaner.clean(content);
        expect(cleaned).toContain('Joh 3,16');
      });

      it('should handle inline code that spans to end of line', () => {
        const cleaner = new ContentCleaner();
        // Inline code should not cross newlines
        const content = 'Start `code\nNew line';
        const cleaned = cleaner.clean(content);
        // The ` without closing ` should not match
        expect(cleaned).toContain('Start `code');
      });
    });

    describe('Obsidian internal links', () => {
      it('should remove [[internal links]]', () => {
        const cleaner = new ContentCleaner();
        const content = 'See [[Joh 3,16]] for details';
        const cleaned = cleaner.clean(content);
        expect(cleaned).not.toContain('[[');
        expect(cleaned).not.toContain(']]');
        expect(cleaned).not.toContain('Joh 3,16');
        expect(cleaned).toContain('See');
        expect(cleaned).toContain('for details');
      });

      it('should remove [[link|with alias]]', () => {
        const cleaner = new ContentCleaner();
        const content = 'See [[Note Title|display text]] here';
        const cleaned = cleaner.clean(content);
        expect(cleaned).not.toContain('Note Title');
        expect(cleaned).not.toContain('display text');
        expect(cleaned).toContain('See');
        expect(cleaned).toContain('here');
      });

      it('should handle multiple links', () => {
        const cleaner = new ContentCleaner();
        const content = '[[link1]] and [[link2]] and [[link3]]';
        const cleaned = cleaner.clean(content);
        expect(cleaned).not.toContain('link1');
        expect(cleaned).not.toContain('link2');
        expect(cleaned).not.toContain('link3');
        expect(cleaned).toContain('and');
      });

      it('should handle links with special characters', () => {
        const cleaner = new ContentCleaner();
        const content = '[[Joh 3,16-18 (Test)]] reference';
        const cleaned = cleaner.clean(content);
        expect(cleaned).not.toContain('Joh 3,16');
      });
    });

    describe('URLs', () => {
      it('should remove http URLs', () => {
        const cleaner = new ContentCleaner();
        const content = 'Visit http://bible.com/Joh3:16 for more';
        const cleaned = cleaner.clean(content);
        expect(cleaned).not.toContain('http://');
        expect(cleaned).not.toContain('bible.com');
        expect(cleaned).toContain('Visit');
        expect(cleaned).toContain('for more');
      });

      it('should remove https URLs', () => {
        const cleaner = new ContentCleaner();
        const content = 'Visit https://bible.com/Joh3:16 for more';
        const cleaned = cleaner.clean(content);
        expect(cleaned).not.toContain('https://');
        expect(cleaned).not.toContain('bible.com');
      });

      it('should handle multiple URLs', () => {
        const cleaner = new ContentCleaner();
        const content = 'Links: https://a.com and http://b.com here';
        const cleaned = cleaner.clean(content);
        expect(cleaned).not.toContain('a.com');
        expect(cleaned).not.toContain('b.com');
        expect(cleaned).toContain('Links:');
        expect(cleaned).toContain('and');
        expect(cleaned).toContain('here');
      });

      it('should NOT remove mailto: URLs (known limitation)', () => {
        const cleaner = new ContentCleaner();
        const content = 'Contact mailto:test@example.com here';
        const cleaned = cleaner.clean(content);
        // mailto: is not matched by the http(s) pattern
        expect(cleaned).toContain('mailto:test@example.com');
      });

      it('should stop URL at whitespace', () => {
        const cleaner = new ContentCleaner();
        const content = 'Link https://a.com next Joh 3,16';
        const cleaned = cleaner.clean(content);
        expect(cleaned).not.toContain('a.com');
        expect(cleaned).toContain('next Joh 3,16');
      });
    });

    describe('string length preservation', () => {
      it('should preserve string length for all replacements', () => {
        const cleaner = new ContentCleaner();

        // Test each type of content
        const testCases = [
          '```code block```',
          '`inline code`',
          '[[internal link]]',
          'https://example.com/path',
          `---\ntitle: test\n---\ncontent`,
        ];

        for (const content of testCases) {
          const cleaned = cleaner.clean(content);
          expect(cleaned.length).toBe(content.length);
        }
      });

      it('should replace with spaces, not empty strings', () => {
        const cleaner = new ContentCleaner();
        const content = 'A [[link]] B';
        const cleaned = cleaner.clean(content);
        // Should be 'A        B' with spaces where [[link]] was
        expect(cleaned.length).toBe(content.length);
        expect(cleaned).toMatch(/^A\s+B$/);
      });
    });

    describe('combined content', () => {
      it('should handle document with all elements', () => {
        const cleaner = new ContentCleaner();
        const content = `---
title: Test Note
---
This is text with Joh 3,16.

See [[Other Note]] for more.

\`\`\`javascript
// Joh 4,14 in code
const x = 1;
\`\`\`

Check \`Ps 23,1\` inline.

Link: https://bible.com/Joh1:1

Final verse: Gen 1,1`;

        const cleaned = cleaner.clean(content);

        // Should keep regular text references
        expect(cleaned).toContain('Joh 3,16');
        expect(cleaned).toContain('Gen 1,1');

        // Should remove excluded content
        expect(cleaned).not.toContain('title: Test Note');
        expect(cleaned).not.toContain('Other Note');
        expect(cleaned).not.toContain('Joh 4,14');
        expect(cleaned).not.toContain('Ps 23,1');
        expect(cleaned).not.toContain('bible.com');

        // Length should be preserved
        expect(cleaned.length).toBe(content.length);
      });
    });

    describe('regex lastIndex reset', () => {
      it('should handle repeated calls correctly (lastIndex reset)', () => {
        const cleaner = new ContentCleaner();

        // Call clean multiple times - should work consistently
        const content = '```code1```' + ' text ' + '```code2```';

        const result1 = cleaner.clean(content);
        const result2 = cleaner.clean(content);
        const result3 = cleaner.clean(content);

        // All results should be identical
        expect(result1).toBe(result2);
        expect(result2).toBe(result3);
        expect(result1).toContain('text');
        expect(result1).not.toContain('code1');
      });
    });
  });

  describe('isInExcludedSection', () => {
    it('should return false for empty content', () => {
      const cleaner = new ContentCleaner();
      expect(cleaner.isInExcludedSection('', 0)).toBe(false);
    });

    it('should return false for negative position', () => {
      const cleaner = new ContentCleaner();
      expect(cleaner.isInExcludedSection('content', -1)).toBe(false);
    });

    it('should return false for position beyond content', () => {
      const cleaner = new ContentCleaner();
      expect(cleaner.isInExcludedSection('abc', 10)).toBe(false);
    });

    it('should return true for position in frontmatter', () => {
      const cleaner = new ContentCleaner();
      const content = `---
title: Test
---
Content`;
      // Position 5 is in the frontmatter
      expect(cleaner.isInExcludedSection(content, 5)).toBe(true);
    });

    it('should return true for position in code block', () => {
      const cleaner = new ContentCleaner();
      const content = 'Text ```code``` more';
      // Find position of 'c' in 'code'
      const codePos = content.indexOf('code');
      expect(cleaner.isInExcludedSection(content, codePos)).toBe(true);
    });

    it('should return false for position in code block when parseCodeBlocks is true', () => {
      const cleaner = new ContentCleaner(true);
      const content = 'Text ```code``` more';
      const codePos = content.indexOf('code');
      expect(cleaner.isInExcludedSection(content, codePos)).toBe(false);
    });

    it('should return true for position in inline code', () => {
      const cleaner = new ContentCleaner();
      const content = 'Text `code` more';
      const codePos = content.indexOf('code');
      expect(cleaner.isInExcludedSection(content, codePos)).toBe(true);
    });

    it('should return true for position in internal link', () => {
      const cleaner = new ContentCleaner();
      const content = 'See [[link]] here';
      const linkPos = content.indexOf('link');
      expect(cleaner.isInExcludedSection(content, linkPos)).toBe(true);
    });

    it('should return true for position in URL', () => {
      const cleaner = new ContentCleaner();
      const content = 'Visit https://example.com here';
      const urlPos = content.indexOf('example');
      expect(cleaner.isInExcludedSection(content, urlPos)).toBe(true);
    });

    it('should return false for position in regular text', () => {
      const cleaner = new ContentCleaner();
      const content = 'This is regular text with Joh 3,16';
      const textPos = content.indexOf('Joh');
      expect(cleaner.isInExcludedSection(content, textPos)).toBe(false);
    });
  });

  describe('createContentCleaner factory', () => {
    it('should create cleaner with default parseCodeBlocks=false', () => {
      const cleaner = createContentCleaner();
      const content = 'Text ```code``` more';
      const cleaned = cleaner.clean(content);
      expect(cleaned).not.toContain('code');
    });

    it('should create cleaner with parseCodeBlocks=true', () => {
      const cleaner = createContentCleaner(true);
      const content = 'Text ```code``` more';
      const cleaned = cleaner.clean(content);
      expect(cleaned).toContain('code');
    });

    it('should create cleaner with parseCodeBlocks=false explicitly', () => {
      const cleaner = createContentCleaner(false);
      const content = 'Text ```code``` more';
      const cleaned = cleaner.clean(content);
      expect(cleaned).not.toContain('code');
    });
  });
});
