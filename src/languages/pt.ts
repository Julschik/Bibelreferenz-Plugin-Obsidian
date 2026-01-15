/**
 * Portuguese (Português) Language Configuration
 *
 * Single Source of Truth for Portuguese language support.
 * TODO: Complete translation of strings and book names.
 */

import type { LanguageConfig } from './types';
import { ENGLISH } from './en';

// Portuguese books with localized display names
const PORTUGUESE_BOOKS = ENGLISH.books.map(book => ({
  ...book,
  displayName: getPortugueseBookName(book.bookId),
  displayId: getPortugueseDisplayId(book.bookId),
}));

function getPortugueseBookName(bookId: number): string {
  const names: Record<number, string> = {
    1: 'Gênesis', 2: 'Êxodo', 3: 'Levítico', 4: 'Números', 5: 'Deuteronômio',
    6: 'Josué', 7: 'Juízes', 8: 'Rute', 9: '1 Samuel', 10: '2 Samuel',
    11: '1 Reis', 12: '2 Reis', 13: '1 Crônicas', 14: '2 Crônicas',
    15: 'Esdras', 16: 'Neemias', 17: 'Ester', 18: 'Jó', 19: 'Salmos',
    20: 'Provérbios', 21: 'Eclesiastes', 22: 'Cânticos', 23: 'Isaías',
    24: 'Jeremias', 25: 'Lamentações', 26: 'Ezequiel', 27: 'Daniel',
    28: 'Oséias', 29: 'Joel', 30: 'Amós', 31: 'Obadias', 32: 'Jonas',
    33: 'Miquéias', 34: 'Naum', 35: 'Habacuque', 36: 'Sofonias', 37: 'Ageu',
    38: 'Zacarias', 39: 'Malaquias', 40: 'Mateus', 41: 'Marcos', 42: 'Lucas',
    43: 'João', 44: 'Atos', 45: 'Romanos', 46: '1 Coríntios', 47: '2 Coríntios',
    48: 'Gálatas', 49: 'Efésios', 50: 'Filipenses', 51: 'Colossenses',
    52: '1 Tessalonicenses', 53: '2 Tessalonicenses', 54: '1 Timóteo', 55: '2 Timóteo',
    56: 'Tito', 57: 'Filemom', 58: 'Hebreus', 59: 'Tiago', 60: '1 Pedro',
    61: '2 Pedro', 62: '1 João', 63: '2 João', 64: '3 João', 65: 'Judas',
    66: 'Apocalipse'
  };
  return names[bookId] || ENGLISH.books.find(b => b.bookId === bookId)?.displayName || '';
}

function getPortugueseDisplayId(bookId: number): string {
  const ids: Record<number, string> = {
    1: 'Gn', 2: 'Êx', 3: 'Lv', 4: 'Nm', 5: 'Dt',
    11: '1Rs', 12: '2Rs', 42: 'Lc', 43: 'Jo', 66: 'Ap'
  };
  return ids[bookId] || ENGLISH.books.find(b => b.bookId === bookId)?.displayId || '';
}

export const PORTUGUESE: LanguageConfig = {
  code: 'pt',
  name: 'Português',
  tagPrefix: 'Bíblia',

  separators: {
    chapterVerse: ':',
    list: ',',
    range: '-',
  },

  strings: {
    ...ENGLISH.strings,
    commandOpenSidebar: 'Abrir referências bíblicas',
    commandSyncCurrent: 'Sincronizar arquivo atual',
    commandSyncAll: 'Sincronizar todos os arquivos',
    sidebarTitle: 'Referências Bíblicas',
    sidebarTabDirect: 'Referências',
    sidebarTabParallel: 'Paralelos',
    sidebarTabGlobal: 'Pesquisar',
    sidebarNoReferences: 'Nenhuma referência bíblica encontrada',
    syncButtonSync: 'Sincronizar',
    syncButtonSyncing: 'Sincronizando...',
    syncButtonSynced: 'Pronto',
    syncButtonError: 'Erro',
    noticeLanguageMigration: 'Migrando {count} referências bíblicas...',
    noticeLanguageMigrationCompleted: '{count} referências migradas para {language}',
  },

  books: PORTUGUESE_BOOKS,
};
