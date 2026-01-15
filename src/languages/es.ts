/**
 * Spanish (Español) Language Configuration
 *
 * Single Source of Truth for Spanish language support.
 * TODO: Complete translation of strings and book names.
 */

import type { LanguageConfig } from './types';
import { ENGLISH } from './en';

// Spanish books with localized display names
const SPANISH_BOOKS = ENGLISH.books.map(book => ({
  ...book,
  // Override display names for Spanish
  displayName: getSpanishBookName(book.bookId),
  displayId: getSpanishDisplayId(book.bookId),
}));

function getSpanishBookName(bookId: number): string {
  const names: Record<number, string> = {
    1: 'Génesis', 2: 'Éxodo', 3: 'Levítico', 4: 'Números', 5: 'Deuteronomio',
    6: 'Josué', 7: 'Jueces', 8: 'Rut', 9: '1 Samuel', 10: '2 Samuel',
    11: '1 Reyes', 12: '2 Reyes', 13: '1 Crónicas', 14: '2 Crónicas',
    15: 'Esdras', 16: 'Nehemías', 17: 'Ester', 18: 'Job', 19: 'Salmos',
    20: 'Proverbios', 21: 'Eclesiastés', 22: 'Cantares', 23: 'Isaías',
    24: 'Jeremías', 25: 'Lamentaciones', 26: 'Ezequiel', 27: 'Daniel',
    28: 'Oseas', 29: 'Joel', 30: 'Amós', 31: 'Abdías', 32: 'Jonás',
    33: 'Miqueas', 34: 'Nahúm', 35: 'Habacuc', 36: 'Sofonías', 37: 'Hageo',
    38: 'Zacarías', 39: 'Malaquías', 40: 'Mateo', 41: 'Marcos', 42: 'Lucas',
    43: 'Juan', 44: 'Hechos', 45: 'Romanos', 46: '1 Corintios', 47: '2 Corintios',
    48: 'Gálatas', 49: 'Efesios', 50: 'Filipenses', 51: 'Colosenses',
    52: '1 Tesalonicenses', 53: '2 Tesalonicenses', 54: '1 Timoteo', 55: '2 Timoteo',
    56: 'Tito', 57: 'Filemón', 58: 'Hebreos', 59: 'Santiago', 60: '1 Pedro',
    61: '2 Pedro', 62: '1 Juan', 63: '2 Juan', 64: '3 Juan', 65: 'Judas',
    66: 'Apocalipsis'
  };
  return names[bookId] || ENGLISH.books.find(b => b.bookId === bookId)?.displayName || '';
}

function getSpanishDisplayId(bookId: number): string {
  const ids: Record<number, string> = {
    1: 'Gén', 2: 'Éx', 3: 'Lev', 4: 'Núm', 5: 'Deut',
    43: 'Jn', 66: 'Apoc'
  };
  return ids[bookId] || ENGLISH.books.find(b => b.bookId === bookId)?.displayId || '';
}

export const SPANISH: LanguageConfig = {
  code: 'es',
  name: 'Español',
  tagPrefix: 'Biblia',

  separators: {
    chapterVerse: ':',
    list: ',',
    range: '-',
  },

  strings: {
    ...ENGLISH.strings,
    // Spanish overrides
    commandOpenSidebar: 'Abrir referencias bíblicas',
    commandSyncCurrent: 'Sincronizar archivo actual',
    commandSyncAll: 'Sincronizar todos los archivos',
    sidebarTitle: 'Referencias Bíblicas',
    sidebarTabDirect: 'Referencias',
    sidebarTabParallel: 'Paralelos',
    sidebarTabGlobal: 'Buscar',
    sidebarNoReferences: 'No se encontraron referencias bíblicas',
    syncButtonSync: 'Sincronizar',
    syncButtonSyncing: 'Sincronizando...',
    syncButtonSynced: 'Listo',
    syncButtonError: 'Error',
    noticeLanguageMigration: 'Migrando {count} referencias bíblicas...',
    noticeLanguageMigrationCompleted: '{count} referencias migradas a {language}',
  },

  books: SPANISH_BOOKS,
};
