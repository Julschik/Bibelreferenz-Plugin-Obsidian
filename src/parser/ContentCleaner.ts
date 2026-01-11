/**
 * ContentCleaner
 *
 * Removes content that should NOT be parsed for Bible references:
 * - Code blocks (```...```)
 * - Inline code (`...`)
 * - Obsidian internal links ([[...]])
 * - URLs
 * - YAML frontmatter
 *
 * Design principle: Replace excluded content with spaces (not empty strings)
 * to preserve character indices for accurate match positions.
 */
export class ContentCleaner {
  private parseCodeBlocks: boolean;

  // Cache compiled regexes for performance
  private readonly frontmatterRegex = /^---\n[\s\S]*?\n---\n/;
  private readonly codeBlockRegex = /```[\s\S]*?```/g;
  private readonly inlineCodeRegex = /(?<!`)`(?!`)[^`\n]+?`(?!`)/g;
  private readonly linkRegex = /\[\[[^\]]+?\]\]/g;
  private readonly urlRegex = /https?:\/\/\S+/g;

  constructor(parseCodeBlocks: boolean = false) {
    this.parseCodeBlocks = parseCodeBlocks;
  }

  /**
   * Clean content by removing/masking sections that shouldn't be parsed
   * @param content Raw markdown content
   * @returns Cleaned content with excluded sections replaced by spaces
   */
  clean(content: string): string {
    if (!content) return '';

    let cleaned = content;

    // 1. Remove frontmatter (YAML between --- delimiters)
    cleaned = this.removeFrontmatter(cleaned);

    // 2. Remove code blocks if parseCodeBlocks is false
    if (!this.parseCodeBlocks) {
      cleaned = this.removeCodeBlocks(cleaned);
      cleaned = this.removeInlineCode(cleaned);
    }

    // 3. Remove Obsidian internal links [[...]]
    cleaned = this.removeInternalLinks(cleaned);

    // 4. Remove URLs
    cleaned = this.removeUrls(cleaned);

    return cleaned;
  }

  /**
   * Remove YAML frontmatter (--- ... ---)
   */
  private removeFrontmatter(content: string): string {
    // Frontmatter must be at the very start of the file
    return content.replace(this.frontmatterRegex, (match) => ' '.repeat(match.length));
  }

  /**
   * Remove fenced code blocks (```...```)
   */
  private removeCodeBlocks(content: string): string {
    // Match ```language\n...``` or ```\n...```
    // Reset lastIndex before use
    this.codeBlockRegex.lastIndex = 0;
    return content.replace(this.codeBlockRegex, (match) => ' '.repeat(match.length));
  }

  /**
   * Remove inline code (`...`)
   */
  private removeInlineCode(content: string): string {
    // Match `code` but not ``` (which is part of code blocks)
    // Reset lastIndex before use
    this.inlineCodeRegex.lastIndex = 0;
    return content.replace(this.inlineCodeRegex, (match) => ' '.repeat(match.length));
  }

  /**
   * Remove Obsidian internal links [[...]]
   */
  private removeInternalLinks(content: string): string {
    // Match [[link]] or [[link|alias]]
    // Reset lastIndex before use
    this.linkRegex.lastIndex = 0;
    return content.replace(this.linkRegex, (match) => ' '.repeat(match.length));
  }

  /**
   * Remove URLs (http:// and https://)
   */
  private removeUrls(content: string): string {
    // Simple URL pattern - matches http(s):// followed by non-whitespace
    // Reset lastIndex before use
    this.urlRegex.lastIndex = 0;
    return content.replace(this.urlRegex, (match) => ' '.repeat(match.length));
  }

  /**
   * Check if a position in the original content is within an excluded section
   * Useful for validation after parsing
   *
   * @param content Original content
   * @param position Character position to check
   * @returns true if position is in an excluded section
   */
  isInExcludedSection(content: string, position: number): boolean {
    if (!content || position < 0 || position >= content.length) {
      return false;
    }

    // Check frontmatter
    const frontmatterMatch = content.match(this.frontmatterRegex);
    if (frontmatterMatch && position < frontmatterMatch[0].length) {
      return true;
    }

    // Check code blocks (if not parsing them)
    if (!this.parseCodeBlocks) {
      // Reset lastIndex before use
      this.codeBlockRegex.lastIndex = 0;
      let match;
      while ((match = this.codeBlockRegex.exec(content)) !== null) {
        if (position >= match.index && position < match.index + match[0].length) {
          return true;
        }
      }

      // Check inline code
      this.inlineCodeRegex.lastIndex = 0;
      while ((match = this.inlineCodeRegex.exec(content)) !== null) {
        if (position >= match.index && position < match.index + match[0].length) {
          return true;
        }
      }
    }

    // Check internal links
    this.linkRegex.lastIndex = 0;
    let match;
    while ((match = this.linkRegex.exec(content)) !== null) {
      if (position >= match.index && position < match.index + match[0].length) {
        return true;
      }
    }

    // Check URLs
    this.urlRegex.lastIndex = 0;
    while ((match = this.urlRegex.exec(content)) !== null) {
      if (position >= match.index && position < match.index + match[0].length) {
        return true;
      }
    }

    return false;
  }
}

/**
 * Factory function to create a ContentCleaner
 * @param parseCodeBlocks Whether to parse code blocks
 * @returns ContentCleaner instance
 */
export function createContentCleaner(parseCodeBlocks: boolean = false): ContentCleaner {
  return new ContentCleaner(parseCodeBlocks);
}
