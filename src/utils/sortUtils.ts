import type { ExpandedReference } from '../types';
import { BIBLE_BOOK_ORDER } from '../data/bibleStructure';

/**
 * Get the canonical order index for a book
 */
function getBookOrderIndex(bookId: string): number {
  const index = BIBLE_BOOK_ORDER.indexOf(bookId);
  return index === -1 ? 999 : index;
}

/**
 * Create a verse key for an ExpandedReference
 */
export function makeVerseKey(ref: ExpandedReference): string {
  return `${ref.bookId}/${ref.chapter}/${ref.verse}`;
}

/**
 * Sort references by canonical Bible order (Gen → Rev)
 */
export function sortByCanonicalOrder(refs: ExpandedReference[]): ExpandedReference[] {
  return [...refs].sort((a, b) => {
    const bookDiff = getBookOrderIndex(a.bookId) - getBookOrderIndex(b.bookId);
    if (bookDiff !== 0) return bookDiff;

    const chapterDiff = a.chapter - b.chapter;
    if (chapterDiff !== 0) return chapterDiff;

    return a.verse - b.verse;
  });
}

/**
 * Sort references alphabetically by book ID
 */
export function sortAlphabetically(
  refs: ExpandedReference[],
  descending: boolean = false
): ExpandedReference[] {
  const sorted = [...refs].sort((a, b) => {
    const bookCmp = a.bookId.localeCompare(b.bookId);
    if (bookCmp !== 0) return bookCmp;

    const chapterDiff = a.chapter - b.chapter;
    if (chapterDiff !== 0) return chapterDiff;

    return a.verse - b.verse;
  });

  return descending ? sorted.reverse() : sorted;
}

/**
 * Sort references by count (descending)
 * @param refs References to sort
 * @param getCount Function that returns count for a reference
 */
export function sortByCount(
  refs: ExpandedReference[],
  getCount: (ref: ExpandedReference) => number
): ExpandedReference[] {
  return [...refs].sort((a, b) => {
    const countDiff = getCount(b) - getCount(a);
    if (countDiff !== 0) return countDiff;

    // Secondary sort by canonical order for ties
    return getBookOrderIndex(a.bookId) - getBookOrderIndex(b.bookId);
  });
}

/**
 * Get canonical book order index (for external use)
 */
export function getCanonicalBookIndex(bookId: string): number {
  return getBookOrderIndex(bookId);
}
