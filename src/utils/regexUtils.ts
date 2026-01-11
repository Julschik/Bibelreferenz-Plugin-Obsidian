/**
 * regexUtils
 *
 * Shared regex utility functions used across the codebase.
 * Extracted to eliminate code duplication and ensure consistent behavior.
 */

/**
 * Escape special regex characters in a string
 * Used to safely use user-defined separators in regex patterns
 *
 * @param str String to escape
 * @returns String with special regex characters escaped
 *
 * @example
 * escapeRegex('.') → '\\.'
 * escapeRegex('-') → '\\-'
 * escapeRegex(',') → ','
 */
export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Build a verse part pattern for regex matching
 * Supports single verses, ranges, lists, and mixed patterns
 *
 * @param listSep List separator (e.g., '.')
 * @param rangeSep Range separator (e.g., '-')
 * @returns Regex pattern string for verse parts
 *
 * @example
 * buildVersePartPattern('.', '-')
 * → '\\d+(?:-\\d+)?(?:\\.\\d+(?:-\\d+)?)*'
 *
 * This pattern matches:
 * - "16" (single verse)
 * - "16-18" (range)
 * - "16.18" (list)
 * - "16-18.20" (mixed)
 */
export function buildVersePartPattern(listSep: string, rangeSep: string): string {
  const escapedListSep = escapeRegex(listSep);
  const escapedRangeSep = escapeRegex(rangeSep);

  return `\\d+(?:${escapedRangeSep}\\d+)?(?:${escapedListSep}\\d+(?:${escapedRangeSep}\\d+)?)*`;
}
