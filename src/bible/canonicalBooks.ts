/**
 * Canonical Bible Books - Single Source of Truth
 *
 * This file defines the 66 books of the Bible with:
 * - Numeric IDs (1-66) as universal identifiers
 * - Chapter counts and verse data
 * - Legacy ID mappings for migration
 *
 * IMPORTANT: These numeric IDs are INTERNAL ONLY.
 * Users always see localized display IDs (e.g., "Joh", "John", "Juan").
 */

import type { BibleStructure } from '../types';

/**
 * A canonical Bible book with numeric ID
 */
export interface CanonicalBook {
  /** Numeric ID (1-66) - universal, never shown to users */
  id: number;
  /** Number of chapters in this book */
  chapters: number;
  /** Verse counts per chapter (1-indexed in usage) */
  versesPerChapter: number[];
}

/**
 * The 66 canonical books of the Bible
 * Based on Protestant canon, verse numbering from Lutherbibel 2017
 */
export const CANONICAL_BOOKS: CanonicalBook[] = [
  // ═══════════════════════════════════════════════════════════════
  // ALTES TESTAMENT (Old Testament) - Books 1-39
  // ═══════════════════════════════════════════════════════════════

  // Pentateuch (Torah) - Books 1-5
  {
    id: 1, // Genesis
    chapters: 50,
    versesPerChapter: [31,25,24,26,32,22,24,22,29,32,32,20,18,24,21,16,27,33,38,18,34,24,20,67,34,35,46,22,35,43,55,32,20,31,29,43,36,30,23,23,57,38,34,34,28,34,31,22,33,26]
  },
  {
    id: 2, // Exodus
    chapters: 40,
    versesPerChapter: [22,25,22,31,23,30,25,32,35,29,10,51,22,31,27,36,16,27,25,26,36,31,33,18,40,37,21,43,46,38,18,35,23,35,35,38,29,31,43,38]
  },
  {
    id: 3, // Leviticus
    chapters: 27,
    versesPerChapter: [17,16,17,35,19,30,38,36,24,20,47,8,59,57,33,34,16,30,37,27,24,33,44,23,55,46,34]
  },
  {
    id: 4, // Numbers
    chapters: 36,
    versesPerChapter: [54,34,51,49,31,27,89,26,23,36,35,16,33,45,41,50,13,32,22,29,35,41,30,25,18,65,23,31,40,16,54,42,56,29,34,13]
  },
  {
    id: 5, // Deuteronomy
    chapters: 34,
    versesPerChapter: [46,37,29,49,33,25,26,20,29,22,32,32,18,29,23,22,20,22,21,20,23,30,25,22,19,19,26,68,29,20,30,52,29,12]
  },

  // Historical Books - Books 6-17
  {
    id: 6, // Joshua
    chapters: 24,
    versesPerChapter: [18,24,17,24,15,27,26,35,27,43,23,24,33,15,63,10,18,28,51,9,45,34,16,33]
  },
  {
    id: 7, // Judges
    chapters: 21,
    versesPerChapter: [36,23,31,24,31,40,25,35,57,18,40,15,25,20,20,31,13,31,30,48,25]
  },
  {
    id: 8, // Ruth
    chapters: 4,
    versesPerChapter: [22,23,18,22]
  },
  {
    id: 9, // 1 Samuel
    chapters: 31,
    versesPerChapter: [28,36,21,22,12,21,17,22,27,27,15,25,23,52,35,23,58,30,24,42,15,23,29,22,44,25,12,25,11,31,13]
  },
  {
    id: 10, // 2 Samuel
    chapters: 24,
    versesPerChapter: [27,32,39,12,25,23,29,18,13,19,27,31,39,33,37,23,29,33,43,26,22,51,39,25]
  },
  {
    id: 11, // 1 Kings
    chapters: 22,
    versesPerChapter: [53,46,28,34,18,38,51,66,28,29,43,33,34,31,34,34,24,46,21,43,29,53]
  },
  {
    id: 12, // 2 Kings
    chapters: 25,
    versesPerChapter: [18,25,27,44,27,33,20,29,37,36,21,21,25,29,38,20,41,37,37,21,26,20,37,20,30]
  },
  {
    id: 13, // 1 Chronicles
    chapters: 29,
    versesPerChapter: [54,55,24,43,26,81,40,40,44,14,47,40,14,17,29,43,27,17,19,8,30,19,32,31,31,32,34,21,30]
  },
  {
    id: 14, // 2 Chronicles
    chapters: 36,
    versesPerChapter: [17,18,17,22,14,42,22,18,31,19,23,16,22,15,19,14,19,34,11,37,20,12,21,27,28,23,9,27,36,27,21,23,15,18,14,30,40]
  },
  {
    id: 15, // Ezra
    chapters: 10,
    versesPerChapter: [11,70,13,24,17,22,28,36,15,44]
  },
  {
    id: 16, // Nehemiah
    chapters: 13,
    versesPerChapter: [11,20,32,23,19,19,73,18,38,39,36,47,31]
  },
  {
    id: 17, // Esther
    chapters: 10,
    versesPerChapter: [22,23,15,17,14,14,10,17,32,3]
  },

  // Poetic Books - Books 18-22
  {
    id: 18, // Job
    chapters: 42,
    versesPerChapter: [22,13,26,21,27,30,21,22,35,22,20,25,28,22,35,22,16,21,29,29,34,30,17,25,6,14,23,28,25,31,40,22,33,37,16,33,24,41,30,24,34,17]
  },
  {
    id: 19, // Psalms
    chapters: 150,
    versesPerChapter: [6,12,8,8,12,10,17,9,20,18,7,8,6,7,5,11,15,50,14,9,13,31,6,10,22,12,14,9,11,12,24,11,22,22,28,12,40,22,13,17,13,11,5,26,17,11,9,14,20,23,19,9,6,7,23,13,11,11,17,12,8,12,11,10,13,20,7,35,36,5,24,20,28,23,10,12,20,72,13,19,16,8,18,12,13,17,7,18,52,17,16,15,5,23,11,13,12,9,9,5,8,28,22,35,45,48,43,13,31,7,10,10,9,8,18,19,2,29,176,7,8,9,4,8,5,6,5,6,8,8,3,18,3,3,21,26,9,8,24,13,10,7,12,15,21,10,20,14,9,6]
  },
  {
    id: 20, // Proverbs
    chapters: 31,
    versesPerChapter: [33,22,35,27,23,35,27,36,18,32,31,28,25,35,33,33,28,24,29,30,31,29,35,34,28,28,27,28,27,33,31]
  },
  {
    id: 21, // Ecclesiastes
    chapters: 12,
    versesPerChapter: [18,26,22,16,20,12,29,17,18,20,10,14]
  },
  {
    id: 22, // Song of Solomon
    chapters: 8,
    versesPerChapter: [17,17,11,16,16,13,13,14]
  },

  // Major Prophets - Books 23-27
  {
    id: 23, // Isaiah
    chapters: 66,
    versesPerChapter: [31,22,26,6,30,13,25,22,21,34,16,6,22,32,9,14,14,7,25,6,17,25,18,23,12,21,13,29,24,33,9,20,24,17,10,22,38,22,8,31,29,25,28,28,25,13,15,22,26,11,23,15,12,17,13,12,21,14,21,22,11,12,19,12,25,24]
  },
  {
    id: 24, // Jeremiah
    chapters: 52,
    versesPerChapter: [19,37,25,31,31,30,34,22,26,25,23,17,27,22,21,21,27,23,15,18,14,30,40,10,38,24,22,17,32,24,40,44,26,22,19,32,21,28,18,16,18,22,13,30,5,28,7,47,39,46,64,34]
  },
  {
    id: 25, // Lamentations
    chapters: 5,
    versesPerChapter: [22,22,66,22,22]
  },
  {
    id: 26, // Ezekiel
    chapters: 48,
    versesPerChapter: [28,10,27,17,17,14,27,18,11,22,25,28,23,23,8,63,24,32,14,49,32,31,49,27,17,21,36,26,21,26,18,32,33,31,15,38,28,23,29,49,26,20,27,31,25,24,23,35]
  },
  {
    id: 27, // Daniel
    chapters: 12,
    versesPerChapter: [21,49,30,37,31,28,28,27,27,21,45,13]
  },

  // Minor Prophets - Books 28-39
  {
    id: 28, // Hosea
    chapters: 14,
    versesPerChapter: [11,23,5,19,15,11,16,14,17,15,12,14,16,9]
  },
  {
    id: 29, // Joel
    chapters: 3,
    versesPerChapter: [20,32,21]
  },
  {
    id: 30, // Amos
    chapters: 9,
    versesPerChapter: [15,16,15,13,27,14,17,14,15]
  },
  {
    id: 31, // Obadiah
    chapters: 1,
    versesPerChapter: [21]
  },
  {
    id: 32, // Jonah
    chapters: 4,
    versesPerChapter: [17,10,10,11]
  },
  {
    id: 33, // Micah
    chapters: 7,
    versesPerChapter: [16,13,12,13,15,16,20]
  },
  {
    id: 34, // Nahum
    chapters: 3,
    versesPerChapter: [15,13,19]
  },
  {
    id: 35, // Habakkuk
    chapters: 3,
    versesPerChapter: [17,20,19]
  },
  {
    id: 36, // Zephaniah
    chapters: 3,
    versesPerChapter: [18,15,20]
  },
  {
    id: 37, // Haggai
    chapters: 2,
    versesPerChapter: [15,23]
  },
  {
    id: 38, // Zechariah
    chapters: 14,
    versesPerChapter: [21,13,10,14,11,15,14,23,17,12,17,14,9,21]
  },
  {
    id: 39, // Malachi
    chapters: 4,
    versesPerChapter: [14,17,18,6]
  },

  // ═══════════════════════════════════════════════════════════════
  // NEUES TESTAMENT (New Testament) - Books 40-66
  // ═══════════════════════════════════════════════════════════════

  // Gospels - Books 40-43
  {
    id: 40, // Matthew
    chapters: 28,
    versesPerChapter: [25,23,17,25,48,34,29,34,38,42,30,50,58,36,39,28,27,35,30,34,46,46,39,51,46,75,66,20]
  },
  {
    id: 41, // Mark
    chapters: 16,
    versesPerChapter: [45,28,35,41,43,56,37,38,50,52,33,44,37,72,47,20]
  },
  {
    id: 42, // Luke
    chapters: 24,
    versesPerChapter: [80,52,38,44,39,49,50,56,62,42,54,59,35,35,32,31,37,43,48,47,38,71,56,53]
  },
  {
    id: 43, // John
    chapters: 21,
    versesPerChapter: [51,25,36,54,47,71,53,59,41,42,57,50,38,31,27,33,26,40,42,31,25]
  },

  // History - Book 44
  {
    id: 44, // Acts
    chapters: 28,
    versesPerChapter: [26,47,26,37,42,15,60,40,43,48,30,25,52,28,41,40,34,28,41,38,40,30,35,27,27,32,44,31]
  },

  // Pauline Epistles - Books 45-57
  {
    id: 45, // Romans
    chapters: 16,
    versesPerChapter: [32,29,31,25,21,23,25,39,33,21,36,21,14,23,33,27]
  },
  {
    id: 46, // 1 Corinthians
    chapters: 16,
    versesPerChapter: [31,16,23,21,13,20,40,13,27,33,34,31,13,40,58,24]
  },
  {
    id: 47, // 2 Corinthians
    chapters: 13,
    versesPerChapter: [24,17,18,18,21,18,16,24,15,18,33,21,14]
  },
  {
    id: 48, // Galatians
    chapters: 6,
    versesPerChapter: [24,21,29,31,26,18]
  },
  {
    id: 49, // Ephesians
    chapters: 6,
    versesPerChapter: [23,22,21,32,33,24]
  },
  {
    id: 50, // Philippians
    chapters: 4,
    versesPerChapter: [30,30,21,23]
  },
  {
    id: 51, // Colossians
    chapters: 4,
    versesPerChapter: [29,23,25,18]
  },
  {
    id: 52, // 1 Thessalonians
    chapters: 5,
    versesPerChapter: [10,20,13,18,28]
  },
  {
    id: 53, // 2 Thessalonians
    chapters: 3,
    versesPerChapter: [12,17,18]
  },
  {
    id: 54, // 1 Timothy
    chapters: 6,
    versesPerChapter: [20,15,16,16,25,21]
  },
  {
    id: 55, // 2 Timothy
    chapters: 4,
    versesPerChapter: [18,26,17,22]
  },
  {
    id: 56, // Titus
    chapters: 3,
    versesPerChapter: [16,15,15]
  },
  {
    id: 57, // Philemon
    chapters: 1,
    versesPerChapter: [25]
  },

  // General Epistles - Books 58-65
  {
    id: 58, // Hebrews
    chapters: 13,
    versesPerChapter: [14,18,19,16,14,20,28,13,28,39,40,29,25]
  },
  {
    id: 59, // James
    chapters: 5,
    versesPerChapter: [27,26,18,17,20]
  },
  {
    id: 60, // 1 Peter
    chapters: 5,
    versesPerChapter: [25,25,22,19,14]
  },
  {
    id: 61, // 2 Peter
    chapters: 3,
    versesPerChapter: [21,22,18]
  },
  {
    id: 62, // 1 John
    chapters: 5,
    versesPerChapter: [10,29,24,21,21]
  },
  {
    id: 63, // 2 John
    chapters: 1,
    versesPerChapter: [13]
  },
  {
    id: 64, // 3 John
    chapters: 1,
    versesPerChapter: [14]
  },
  {
    id: 65, // Jude
    chapters: 1,
    versesPerChapter: [25]
  },

  // Revelation - Book 66
  {
    id: 66, // Revelation
    chapters: 22,
    versesPerChapter: [20,29,22,11,14,17,17,13,21,11,19,17,18,20,8,21,18,24,21,15,27,21]
  }
];

/**
 * Book ID type for type safety (1-66)
 */
export type BookId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
  11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 |
  21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 |
  31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 |
  41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 |
  51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 |
  61 | 62 | 63 | 64 | 65 | 66;

/**
 * Get a canonical book by its numeric ID
 */
export function getBookById(id: number): CanonicalBook | undefined {
  return CANONICAL_BOOKS.find(book => book.id === id);
}

/**
 * Get the maximum verse number for a given chapter
 */
export function getMaxVerse(bookId: number, chapter: number): number | null {
  const book = getBookById(bookId);
  if (!book || chapter < 1 || chapter > book.chapters) {
    return null;
  }
  return book.versesPerChapter[chapter - 1];
}

/**
 * Get the maximum chapter number for a given book
 */
export function getMaxChapter(bookId: number): number | null {
  const book = getBookById(bookId);
  return book ? book.chapters : null;
}

/**
 * Validate if a reference is valid
 */
export function isValidReference(bookId: number, chapter: number, verse?: number): boolean {
  const book = getBookById(bookId);
  if (!book || chapter < 1 || chapter > book.chapters) {
    return false;
  }

  if (verse !== undefined) {
    const maxVerse = book.versesPerChapter[chapter - 1];
    return verse >= 1 && verse <= maxVerse;
  }

  return true;
}

/**
 * Legacy ID mappings for migration from old format
 * Maps all known legacy IDs (from all languages) to numeric IDs
 */
export const LEGACY_ID_TO_BOOK_ID: Record<string, number> = {
  // German legacy IDs
  'Gen': 1, '1Mo': 1,
  'Ex': 2, '2Mo': 2,
  'Lev': 3, '3Mo': 3,
  'Num': 4, '4Mo': 4,
  'Dtn': 5, '5Mo': 5,
  'Jos': 6,
  'Ri': 7,
  'Rut': 8,
  '1Sam': 9,
  '2Sam': 10,
  '1Kön': 11, '1Ki': 11,
  '2Kön': 12, '2Ki': 12,
  '1Chr': 13,
  '2Chr': 14,
  'Esr': 15,
  'Neh': 16,
  'Est': 17,
  'Hiob': 18, 'Hi': 18,
  'Ps': 19,
  'Spr': 20,
  'Pred': 21, 'Koh': 21,
  'Hld': 22, 'HL': 22,
  'Jes': 23,
  'Jer': 24,
  'Klgl': 25,
  'Hes': 26, 'Ez': 26,
  'Dan': 27,
  'Hos': 28,
  'Jl': 29,
  'Am': 30,
  'Obd': 31, 'Ob': 31,
  'Jon': 32,
  'Mi': 33,
  'Nah': 34,
  'Hab': 35,
  'Zef': 36,
  'Hag': 37,
  'Sach': 38,
  'Mal': 39,
  'Mt': 40,
  'Mk': 41,
  'Lk': 42,
  'Joh': 43, 'Jo': 43,
  'Apg': 44,
  'Röm': 45,
  '1Kor': 46,
  '2Kor': 47,
  'Gal': 48,
  'Eph': 49,
  'Phil': 50,
  'Kol': 51,
  '1Thess': 52,
  '2Thess': 53,
  '1Tim': 54,
  '2Tim': 55,
  'Tit': 56,
  'Phlm': 57,
  'Hebr': 58,
  'Jak': 59,
  '1Petr': 60, '1Pe': 60,
  '2Petr': 61, '2Pe': 61,
  '1Joh': 62, '1Jo': 62,
  '2Joh': 63, '2Jo': 63,
  '3Joh': 64, '3Jo': 64,
  'Jud': 65,
  'Offb': 66, 'Off': 66,

  // English legacy IDs (from bibleStructure.ts)
  'Exo': 2,
  'Deu': 5,
  'Jdg': 7,
  '1Sa': 9,
  '2Sa': 10,
  '1Ki': 11,
  '2Ki': 12,
  '1Ch': 13,
  '2Ch': 14,
  'Ezr': 15,
  'Job': 18,
  'Psa': 19,
  'Pro': 20,
  'Ecc': 21,
  'Son': 22,
  'Isa': 23,
  'Lam': 25,
  'Eze': 26,
  'Joe': 29,
  'Amo': 30,
  'Oba': 31,
  'Mic': 33,
  'Zep': 36,
  'Zec': 38,
  'Mat': 40,
  'Mar': 41,
  'Luk': 42,
  'John': 43,
  'Act': 44,
  'Rom': 45,
  '1Co': 46,
  '2Co': 47,
  'Phi': 50,
  'Col': 51,
  '1Th': 52,
  '2Th': 53,
  '1Ti': 54,
  '2Ti': 55,
  'Phm': 57,
  'Heb': 58,
  'Jam': 59,
  '1Pe': 60,
  '2Pe': 61,
  '1Jo': 62,
  '2Jo': 63,
  '3Jo': 64,
  'Rev': 66,

  // French legacy IDs
  'Gn': 1,
  'Lc': 42,
  'Jn': 43,
  '1R': 11,
  '2R': 12,

  // Italian legacy IDs
  'Es': 2,
  'Gv': 43,
  '1Re': 11,
  '2Re': 12,

  // Portuguese legacy IDs
  'Êx': 2,
  '1Reis': 11,
  '2Reis': 12,

  // Spanish legacy IDs
  'Gén': 1,
  'Éx': 2,
  'Juan': 43,
};

/**
 * Convert a legacy string ID to numeric book ID
 */
export function legacyIdToBookId(legacyId: string): number | null {
  return LEGACY_ID_TO_BOOK_ID[legacyId] ?? null;
}

/**
 * Canonical book order for sorting (by numeric ID)
 */
export const BOOK_ORDER: number[] = Array.from({ length: 66 }, (_, i) => i + 1);

/**
 * Old Testament book IDs (1-39)
 */
export const OLD_TESTAMENT_IDS: number[] = Array.from({ length: 39 }, (_, i) => i + 1);

/**
 * New Testament book IDs (40-66)
 */
export const NEW_TESTAMENT_IDS: number[] = Array.from({ length: 27 }, (_, i) => i + 40);

/**
 * Check if a book ID is in the Old Testament
 */
export function isOldTestament(bookId: number): boolean {
  return bookId >= 1 && bookId <= 39;
}

/**
 * Check if a book ID is in the New Testament
 */
export function isNewTestament(bookId: number): boolean {
  return bookId >= 40 && bookId <= 66;
}
