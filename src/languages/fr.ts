/**
 * French (Français) Language Configuration
 *
 * Single Source of Truth for French language support.
 * TODO: Complete translation of strings and book names.
 */

import type { LanguageConfig } from './types';
import { ENGLISH } from './en';

// French books with localized display names
const FRENCH_BOOKS = ENGLISH.books.map(book => ({
  ...book,
  displayName: getFrenchBookName(book.bookId),
  displayId: getFrenchDisplayId(book.bookId),
}));

function getFrenchBookName(bookId: number): string {
  const names: Record<number, string> = {
    1: 'Genèse', 2: 'Exode', 3: 'Lévitique', 4: 'Nombres', 5: 'Deutéronome',
    6: 'Josué', 7: 'Juges', 8: 'Ruth', 9: '1 Samuel', 10: '2 Samuel',
    11: '1 Rois', 12: '2 Rois', 13: '1 Chroniques', 14: '2 Chroniques',
    15: 'Esdras', 16: 'Néhémie', 17: 'Esther', 18: 'Job', 19: 'Psaumes',
    20: 'Proverbes', 21: 'Ecclésiaste', 22: 'Cantique', 23: 'Ésaïe',
    24: 'Jérémie', 25: 'Lamentations', 26: 'Ézéchiel', 27: 'Daniel',
    28: 'Osée', 29: 'Joël', 30: 'Amos', 31: 'Abdias', 32: 'Jonas',
    33: 'Michée', 34: 'Nahum', 35: 'Habacuc', 36: 'Sophonie', 37: 'Aggée',
    38: 'Zacharie', 39: 'Malachie', 40: 'Matthieu', 41: 'Marc', 42: 'Luc',
    43: 'Jean', 44: 'Actes', 45: 'Romains', 46: '1 Corinthiens', 47: '2 Corinthiens',
    48: 'Galates', 49: 'Éphésiens', 50: 'Philippiens', 51: 'Colossiens',
    52: '1 Thessaloniciens', 53: '2 Thessaloniciens', 54: '1 Timothée', 55: '2 Timothée',
    56: 'Tite', 57: 'Philémon', 58: 'Hébreux', 59: 'Jacques', 60: '1 Pierre',
    61: '2 Pierre', 62: '1 Jean', 63: '2 Jean', 64: '3 Jean', 65: 'Jude',
    66: 'Apocalypse'
  };
  return names[bookId] || ENGLISH.books.find(b => b.bookId === bookId)?.displayName || '';
}

function getFrenchDisplayId(bookId: number): string {
  const ids: Record<number, string> = {
    1: 'Gn', 2: 'Ex', 3: 'Lv', 4: 'Nb', 5: 'Dt',
    11: '1R', 12: '2R', 42: 'Lc', 43: 'Jn', 66: 'Ap'
  };
  return ids[bookId] || ENGLISH.books.find(b => b.bookId === bookId)?.displayId || '';
}

export const FRENCH: LanguageConfig = {
  code: 'fr',
  name: 'Français',
  tagPrefix: 'Bible',

  separators: {
    chapterVerse: ':',
    list: ',',
    range: '-',
  },

  strings: {
    ...ENGLISH.strings,
    commandOpenSidebar: 'Ouvrir les références bibliques',
    commandSyncCurrent: 'Synchroniser le fichier actuel',
    commandSyncAll: 'Synchroniser tous les fichiers',
    sidebarTitle: 'Références Bibliques',
    sidebarTabDirect: 'Références',
    sidebarTabParallel: 'Parallèles',
    sidebarTabGlobal: 'Rechercher',
    sidebarNoReferences: 'Aucune référence biblique trouvée',
    syncButtonSync: 'Sync',
    syncButtonSyncing: 'Synchronisation...',
    syncButtonSynced: 'Terminé',
    syncButtonError: 'Erreur',
    noticeLanguageMigration: 'Migration de {count} références bibliques...',
    noticeLanguageMigrationCompleted: '{count} références migrées vers {language}',
  },

  books: FRENCH_BOOKS,
};
