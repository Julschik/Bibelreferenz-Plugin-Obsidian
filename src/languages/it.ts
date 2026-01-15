/**
 * Italian (Italiano) Language Configuration
 *
 * Single Source of Truth for Italian language support.
 * TODO: Complete translation of strings and book names.
 */

import type { LanguageConfig } from './types';
import { ENGLISH } from './en';

// Italian books with localized display names
const ITALIAN_BOOKS = ENGLISH.books.map(book => ({
  ...book,
  displayName: getItalianBookName(book.bookId),
  displayId: getItalianDisplayId(book.bookId),
}));

function getItalianBookName(bookId: number): string {
  const names: Record<number, string> = {
    1: 'Genesi', 2: 'Esodo', 3: 'Levitico', 4: 'Numeri', 5: 'Deuteronomio',
    6: 'Giosuè', 7: 'Giudici', 8: 'Rut', 9: '1 Samuele', 10: '2 Samuele',
    11: '1 Re', 12: '2 Re', 13: '1 Cronache', 14: '2 Cronache',
    15: 'Esdra', 16: 'Neemia', 17: 'Ester', 18: 'Giobbe', 19: 'Salmi',
    20: 'Proverbi', 21: 'Ecclesiaste', 22: 'Cantico', 23: 'Isaia',
    24: 'Geremia', 25: 'Lamentazioni', 26: 'Ezechiele', 27: 'Daniele',
    28: 'Osea', 29: 'Gioele', 30: 'Amos', 31: 'Abdia', 32: 'Giona',
    33: 'Michea', 34: 'Naum', 35: 'Abacuc', 36: 'Sofonia', 37: 'Aggeo',
    38: 'Zaccaria', 39: 'Malachia', 40: 'Matteo', 41: 'Marco', 42: 'Luca',
    43: 'Giovanni', 44: 'Atti', 45: 'Romani', 46: '1 Corinzi', 47: '2 Corinzi',
    48: 'Galati', 49: 'Efesini', 50: 'Filippesi', 51: 'Colossesi',
    52: '1 Tessalonicesi', 53: '2 Tessalonicesi', 54: '1 Timoteo', 55: '2 Timoteo',
    56: 'Tito', 57: 'Filemone', 58: 'Ebrei', 59: 'Giacomo', 60: '1 Pietro',
    61: '2 Pietro', 62: '1 Giovanni', 63: '2 Giovanni', 64: '3 Giovanni', 65: 'Giuda',
    66: 'Apocalisse'
  };
  return names[bookId] || ENGLISH.books.find(b => b.bookId === bookId)?.displayName || '';
}

function getItalianDisplayId(bookId: number): string {
  const ids: Record<number, string> = {
    1: 'Gn', 2: 'Es', 3: 'Lv', 4: 'Nm', 5: 'Dt',
    11: '1Re', 12: '2Re', 42: 'Lc', 43: 'Gv', 66: 'Ap'
  };
  return ids[bookId] || ENGLISH.books.find(b => b.bookId === bookId)?.displayId || '';
}

export const ITALIAN: LanguageConfig = {
  code: 'it',
  name: 'Italiano',
  tagPrefix: 'Bibbia',

  separators: {
    chapterVerse: ',',
    list: '.',
    range: '-',
  },

  strings: {
    ...ENGLISH.strings,
    commandOpenSidebar: 'Apri riferimenti biblici',
    commandSyncCurrent: 'Sincronizza file corrente',
    commandSyncAll: 'Sincronizza tutti i file',
    sidebarTitle: 'Riferimenti Biblici',
    sidebarTabDirect: 'Riferimenti',
    sidebarTabParallel: 'Paralleli',
    sidebarTabGlobal: 'Cerca',
    sidebarNoReferences: 'Nessun riferimento biblico trovato',
    syncButtonSync: 'Sync',
    syncButtonSyncing: 'Sincronizzazione...',
    syncButtonSynced: 'Fatto',
    syncButtonError: 'Errore',
    noticeLanguageMigration: 'Migrazione di {count} riferimenti biblici...',
    noticeLanguageMigrationCompleted: '{count} riferimenti migrati in {language}',
  },

  books: ITALIAN_BOOKS,
};
