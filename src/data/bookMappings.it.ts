import type { BookMapping } from '../types';

export const BOOK_MAPPINGS_IT: BookMapping[] = [
  // ═══════════════════════════════════════════════════════════════
  // ANTICO TESTAMENTO
  // ═══════════════════════════════════════════════════════════════

  {
    canonicalId: 'Gn',
    aliases: ['Genesi', 'Gen.', 'Gen', 'Gn.', 'Gn'],
    standalonePatterns: ['Libro della Genesi', 'La Genesi']
  },
  {
    canonicalId: 'Es',
    aliases: ['Esodo', 'Esod.', 'Esod', 'Es.', 'Es'],
    standalonePatterns: ["Libro dell'Esodo", "L'Esodo"]
  },
  {
    canonicalId: 'Lv',
    aliases: ['Levitico', 'Levit.', 'Lev', 'Lv.', 'Lv'],
    standalonePatterns: ['Libro del Levitico', 'Il Levitico']
  },
  {
    canonicalId: 'Nm',
    aliases: ['Numeri', 'Num.', 'Num', 'Nm.', 'Nm'],
    standalonePatterns: ['Libro dei Numeri', 'I Numeri']
  },
  {
    canonicalId: 'Dt',
    aliases: ['Deuteronomio', 'Deut.', 'Deut', 'Dt.', 'Dt'],
    standalonePatterns: ['Libro del Deuteronomio', 'Il Deuteronomio']
  },
  {
    canonicalId: 'Gs',
    aliases: ['Giosuè', 'Giosue', 'Gios.', 'Gios', 'Gs.', 'Gs'],
    standalonePatterns: ['Libro di Giosuè']
  },
  {
    canonicalId: 'Gdc',
    aliases: ['Giudici', 'Giud.', 'Giud', 'Gdc.', 'Gdc'],
    standalonePatterns: ['Libro dei Giudici']
  },
  {
    canonicalId: 'Rt',
    aliases: ['Ruth', 'Rut', 'Rt.', 'Rt'],
    standalonePatterns: ['Libro di Rut']
  },
  {
    canonicalId: '1Sam',
    aliases: ['1 Samuele', '1. Samuele', '1° Samuele', '1Sam', '1 Sam.', '1 Sam', 'I Samuele', 'I Sam.', 'I Sam', 'ISam', '1S.'],
    standalonePatterns: ['Primo Libro di Samuele']
  },
  {
    canonicalId: '2Sam',
    aliases: ['2 Samuele', '2. Samuele', '2° Samuele', '2Sam', '2 Sam.', '2 Sam', 'II Samuele', 'II Sam.', 'II Sam', 'IISam', '2S.'],
    standalonePatterns: ['Secondo Libro di Samuele']
  },
  {
    canonicalId: '1Re',
    aliases: ['1 Re', '1. Re', '1° Re', '1Re', 'I Re', '1R.'],
    standalonePatterns: ['Primo Libro dei Re']
  },
  {
    canonicalId: '2Re',
    aliases: ['2 Re', '2. Re', '2° Re', '2Re', 'II Re', '2R.'],
    standalonePatterns: ['Secondo Libro dei Re']
  },
  {
    canonicalId: '1Cr',
    aliases: ['1 Cronache', '1. Cronache', '1° Cronache', '1 Cron.', '1 Cron', 'I Cronache', '1Cr.', '1Cr', 'I Cr'],
    standalonePatterns: ['Primo Libro delle Cronache']
  },
  {
    canonicalId: '2Cr',
    aliases: ['2 Cronache', '2. Cronache', '2° Cronache', '2 Cron.', '2 Cron', 'II Cronache', '2Cr.', '2Cr', 'II Cr'],
    standalonePatterns: ['Secondo Libro delle Cronache']
  },
  {
    canonicalId: 'Esd',
    aliases: ['Esdra', 'Esd.', 'Esd'],
    standalonePatterns: ['Libro di Esdra']
  },
  {
    canonicalId: 'Ne',
    aliases: ['Neemia', 'Neh.', 'Neh', 'Ne.', 'Ne'],
    standalonePatterns: ['Libro di Neemia']
  },
  {
    canonicalId: 'Est',
    aliases: ['Ester', 'Esther', 'Est.', 'Est'],
    standalonePatterns: ['Libro di Ester']
  },
  {
    canonicalId: 'Gb',
    aliases: ['Giobbe', 'Giob.', 'Giob', 'Gb.', 'Gb'],
    standalonePatterns: ['Libro di Giobbe']
  },
  {
    canonicalId: 'Sal',
    aliases: ['Salmi', 'Salmo', 'Sal.', 'Sal', 'Sl.', 'Sl'],
    standalonePatterns: ['Libro dei Salmi', 'Il Salterio']
  },
  {
    canonicalId: 'Pr',
    aliases: ['Proverbi', 'Prov.', 'Prov', 'Pr.', 'Pr'],
    standalonePatterns: ['Libro dei Proverbi']
  },
  {
    canonicalId: 'Ec',
    aliases: ['Ecclesiaste', 'Qohelet', 'Eccl.', 'Eccl', 'Ec.', 'Ec', 'Qo.', 'Qo'],
    standalonePatterns: ["L'Ecclesiaste", "Il Qohelet"]
  },
  {
    canonicalId: 'Ct',
    aliases: ['Cantico dei Cantici', 'Cantico', 'Cant.', 'Cant', 'Ct.', 'Ct'],
    standalonePatterns: ['Il Cantico dei Cantici']
  },
  {
    canonicalId: 'Is',
    aliases: ['Isaia', 'Is.', 'Is', 'Isa.'],
    standalonePatterns: ['Libro di Isaia']
  },
  {
    canonicalId: 'Ger',
    aliases: ['Geremia', 'Gerem.', 'Ger.', 'Ger', 'Jr.'],
    standalonePatterns: ['Libro di Geremia']
  },
  {
    canonicalId: 'Lam',
    aliases: ['Lamentazioni', 'Lam.', 'Lam', 'Lm.'],
    standalonePatterns: ['Le Lamentazioni di Geremia']
  },
  {
    canonicalId: 'Ez',
    aliases: ['Ezechiele', 'Ezech.', 'Eze.', 'Ez.', 'Ez'],
    standalonePatterns: ['Libro di Ezechiele']
  },
  {
    canonicalId: 'Dn',
    aliases: ['Daniele', 'Dan.', 'Dan', 'Dn.', 'Dn'],
    standalonePatterns: ['Libro di Daniele']
  },
  {
    canonicalId: 'Os',
    aliases: ['Osea', 'Os.', 'Os'],
    standalonePatterns: ['Libro di Osea']
  },
  {
    canonicalId: 'Gl',
    aliases: ['Gioele', 'Gioel.', 'Gl.', 'Gl'],
    standalonePatterns: ['Libro di Gioele']
  },
  {
    canonicalId: 'Am',
    aliases: ['Amos', 'Am.', 'Am'],
    standalonePatterns: ['Libro di Amos']
  },
  {
    canonicalId: 'Abd',
    aliases: ['Abdia', 'Abd.', 'Abd', 'Ab.'],
    standalonePatterns: ['Libro di Abdia']
  },
  {
    canonicalId: 'Gio',
    aliases: ['Giona', 'Gion.', 'Gio.', 'Gio'],
    standalonePatterns: ['Libro di Giona']
  },
  {
    canonicalId: 'Mi',
    aliases: ['Michea', 'Mic.', 'Mi.', 'Mi'],
    standalonePatterns: ['Libro di Michea']
  },
  {
    canonicalId: 'Na',
    aliases: ['Nahum', 'Nah.', 'Na.', 'Na'],
    standalonePatterns: ['Libro di Nahum']
  },
  {
    canonicalId: 'Ab',
    aliases: ['Abacuc', 'Habacuc', 'Hab.', 'Ab.', 'Ab'],
    standalonePatterns: ['Libro di Abacuc']
  },
  {
    canonicalId: 'Sof',
    aliases: ['Sofonia', 'Sof.', 'Sof', 'Sf.'],
    standalonePatterns: ['Libro di Sofonia']
  },
  {
    canonicalId: 'Ag',
    aliases: ['Aggeo', 'Agg.', 'Ag.', 'Ag'],
    standalonePatterns: ['Libro di Aggeo']
  },
  {
    canonicalId: 'Zac',
    aliases: ['Zaccaria', 'Zacc.', 'Zac.', 'Zac'],
    standalonePatterns: ['Libro di Zaccaria']
  },
  {
    canonicalId: 'Mal',
    aliases: ['Malachia', 'Malach.', 'Mal.', 'Mal'],
    standalonePatterns: ['Libro di Malachia']
  },

  // ═══════════════════════════════════════════════════════════════
  // NUOVO TESTAMENTO
  // ═══════════════════════════════════════════════════════════════

  {
    canonicalId: 'Mt',
    aliases: ['Matteo', 'Matt.', 'Matt', 'Mt.', 'Mt'],
    standalonePatterns: ["Vangelo secondo Matteo", "Vangelo di San Matteo"]
  },
  {
    canonicalId: 'Mc',
    aliases: ['Marco', 'Marc.', 'Marc', 'Mc.', 'Mc'],
    standalonePatterns: ["Vangelo secondo Marco", "Vangelo di San Marco"]
  },
  {
    canonicalId: 'Lc',
    aliases: ['Luca', 'Luc.', 'Luc', 'Lc.', 'Lc'],
    standalonePatterns: ["Vangelo secondo Luca", "Vangelo di San Luca"]
  },
  {
    canonicalId: 'Gv',
    aliases: ['Giovanni', 'Giov.', 'Giov', 'Gv.', 'Gv'],
    standalonePatterns: ["Vangelo secondo Giovanni", "Vangelo di San Giovanni"]
  },
  {
    canonicalId: 'At',
    aliases: ['Atti degli Apostoli', 'Atti', 'At.', 'At'],
    standalonePatterns: ['Gli Atti degli Apostoli']
  },
  {
    canonicalId: 'Rm',
    aliases: ['Romani', 'Rom.', 'Rom', 'Rm.', 'Rm'],
    standalonePatterns: ["Lettera ai Romani"]
  },
  {
    canonicalId: '1Cor',
    aliases: ['1 Corinzi', '1. Corinzi', '1° Corinzi', 'I Corinzi', '1 Cor.', '1 Cor', 'I Cor.', '1C.'],
    standalonePatterns: ['Prima Lettera ai Corinzi']
  },
  {
    canonicalId: '2Cor',
    aliases: ['2 Corinzi', '2. Corinzi', '2° Corinzi', 'II Corinzi', '2 Cor.', '2 Cor', 'II Cor.', '2C.'],
    standalonePatterns: ['Seconda Lettera ai Corinzi']
  },
  {
    canonicalId: 'Gal',
    aliases: ['Galati', 'Gal.', 'Gal', 'Ga.'],
    standalonePatterns: ["Lettera ai Galati"]
  },
  {
    canonicalId: 'Ef',
    aliases: ['Efesini', 'Efes.', 'Ef.', 'Ef'],
    standalonePatterns: ["Lettera agli Efesini"]
  },
  {
    canonicalId: 'Fil',
    aliases: ['Filippesi', 'Filip.', 'Phil.', 'Fil.', 'Fil'],
    standalonePatterns: ["Lettera ai Filippesi"]
  },
  {
    canonicalId: 'Col',
    aliases: ['Colossesi', 'Coloss.', 'Col.', 'Col'],
    standalonePatterns: ["Lettera ai Colossesi"]
  },
  {
    canonicalId: '1Ts',
    aliases: ['1 Tessalonicesi', '1. Tessalonicesi', 'I Tessalonicesi', '1 Tess.', '1 Tess', '1Ts.', '1Ts', 'I Ts'],
    standalonePatterns: ['Prima Lettera ai Tessalonicesi']
  },
  {
    canonicalId: '2Ts',
    aliases: ['2 Tessalonicesi', '2. Tessalonicesi', 'II Tessalonicesi', '2 Tess.', '2 Tess', '2Ts.', '2Ts', 'II Ts'],
    standalonePatterns: ['Seconda Lettera ai Tessalonicesi']
  },
  {
    canonicalId: '1Tm',
    aliases: ['1 Timoteo', '1. Timoteo', 'I Timoteo', '1 Tim.', '1 Tim', '1Tm.', '1Tm', 'I Tm'],
    standalonePatterns: ['Prima Lettera a Timoteo']
  },
  {
    canonicalId: '2Tm',
    aliases: ['2 Timoteo', '2. Timoteo', 'II Timoteo', '2 Tim.', '2 Tim', '2Tm.', '2Tm', 'II Tm'],
    standalonePatterns: ['Seconda Lettera a Timoteo']
  },
  {
    canonicalId: 'Tt',
    aliases: ['Tito', 'Tit.', 'Tit', 'Tt.', 'Tt'],
    standalonePatterns: ["Lettera a Tito"]
  },
  {
    canonicalId: 'Fm',
    aliases: ['Filemone', 'Filem.', 'Fm.', 'Fm'],
    standalonePatterns: ["Lettera a Filemone"]
  },
  {
    canonicalId: 'Eb',
    aliases: ['Ebrei', 'Ebr.', 'Eb.', 'Eb'],
    standalonePatterns: ["Lettera agli Ebrei"]
  },
  {
    canonicalId: 'Gc',
    aliases: ['Giacomo', 'Giac.', 'Giac', 'Gc.', 'Gc'],
    standalonePatterns: ["Lettera di Giacomo"]
  },
  {
    canonicalId: '1Pt',
    aliases: ['1 Pietro', '1. Pietro', 'I Pietro', '1 Piet.', '1 Piet', '1Pt.', '1Pt', 'I Pt'],
    standalonePatterns: ['Prima Lettera di Pietro']
  },
  {
    canonicalId: '2Pt',
    aliases: ['2 Pietro', '2. Pietro', 'II Pietro', '2 Piet.', '2 Piet', '2Pt.', '2Pt', 'II Pt'],
    standalonePatterns: ['Seconda Lettera di Pietro']
  },
  {
    canonicalId: '1Gv',
    aliases: ['1 Giovanni', '1. Giovanni', 'I Giovanni', '1 Giov.', '1 Giov', '1Gv.', '1Gv', 'I Gv'],
    standalonePatterns: ['Prima Lettera di Giovanni']
  },
  {
    canonicalId: '2Gv',
    aliases: ['2 Giovanni', '2. Giovanni', 'II Giovanni', '2 Giov.', '2 Giov', '2Gv.', '2Gv', 'II Gv'],
    standalonePatterns: ['Seconda Lettera di Giovanni']
  },
  {
    canonicalId: '3Gv',
    aliases: ['3 Giovanni', '3. Giovanni', 'III Giovanni', '3 Giov.', '3 Giov', '3Gv.', '3Gv', 'III Gv'],
    standalonePatterns: ['Terza Lettera di Giovanni']
  },
  {
    canonicalId: 'Gd',
    aliases: ['Giuda', 'Giud.', 'Giud', 'Gd.', 'Gd'],
    standalonePatterns: ["Lettera di Giuda"]
  },
  {
    canonicalId: 'Ap',
    aliases: ['Apocalisse', 'Apoc.', 'Apoc', 'Ap.', 'Ap', 'Rev.'],
    standalonePatterns: ["L'Apocalisse di Giovanni", "L'Apocalisse"]
  }
];