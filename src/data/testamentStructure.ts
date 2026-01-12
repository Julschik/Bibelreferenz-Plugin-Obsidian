/**
 * Testament structure for organizing Bible books
 * Used for grouping books in the settings UI
 */

export const OLD_TESTAMENT_BOOKS = [
  // Pentateuch (5 books)
  'Gen', 'Exo', 'Lev', 'Num', 'Deu',
  // Historical Books (12 books)
  'Jos', 'Jdg', 'Rut', '1Sa', '2Sa', '1Ki', '2Ki', '1Ch', '2Ch', 'Ezr', 'Neh', 'Est',
  // Poetic Books (5 books)
  'Job', 'Psa', 'Pro', 'Ecc', 'Son',
  // Major Prophets (5 books)
  'Isa', 'Jer', 'Klag', 'Eze', 'Dan',
  // Minor Prophets (12 books)
  'Hos', 'Joe', 'Amo', 'Oba', 'Jon', 'Mic', 'Nah', 'Hab', 'Zef', 'Hag', 'Zec', 'Mal'
] as const;

export const NEW_TESTAMENT_BOOKS = [
  // Gospels (4 books)
  'Mat', 'Mar', 'Luk', 'Joh',
  // Acts (1 book)
  'Act',
  // Pauline Epistles (14 books)
  'Rom', '1Co', '2Co', 'Gal', 'Eph', 'Php', 'Col', '1Th', '2Th', '1Ti', '2Ti', 'Tit', 'Phm',
  // Hebrews (1 book)
  'Heb',
  // General Epistles (8 books)
  'Jas', '1Pe', '2Pe', '1Jo', '2Jo', '3Jo', 'Jud',
  // Revelation (1 book)
  'Rev'
] as const;

export type Testament = 'old' | 'new';

/**
 * Get testament for a canonical book ID
 */
export function getTestament(canonicalId: string): Testament | null {
  if (OLD_TESTAMENT_BOOKS.includes(canonicalId as any)) return 'old';
  if (NEW_TESTAMENT_BOOKS.includes(canonicalId as any)) return 'new';
  return null;
}

/**
 * Get all books for a testament
 */
export function getBooksByTestament(testament: Testament): readonly string[] {
  return testament === 'old' ? OLD_TESTAMENT_BOOKS : NEW_TESTAMENT_BOOKS;
}
