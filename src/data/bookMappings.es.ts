import type { BookMapping } from '../types';

export const BOOK_MAPPINGS_ES: BookMapping[] = [
  // ═══════════════════════════════════════════════════════════════
  // ANTIGUO TESTAMENTO
  // ═══════════════════════════════════════════════════════════════

  {
    canonicalId: 'Gén',
    aliases: ['Génesis', 'Gén.', 'Gen.', 'Gén', 'Gen', 'Gn.', 'Gn'],
    standalonePatterns: ['Primer Libro de Moisés', 'Libro del Génesis', 'Génesis']
  },
  {
    canonicalId: 'Éx',
    aliases: ['Éxodo', 'Éxo.', 'Exo.', 'Éxo', 'Exo', 'Éx.', 'Ex.', 'Éx', 'Ex'],
    standalonePatterns: ['Segundo Libro de Moisés', 'Libro del Éxodo', 'Éxodo']
  },
  {
    canonicalId: 'Lev',
    aliases: ['Levítico', 'Levitico', 'Lev.', 'Lev', 'Lv.', 'Lv'],
    standalonePatterns: ['Tercer Libro de Moisés', 'Libro de Levítico', 'Levítico']
  },
  {
    canonicalId: 'Núm',
    aliases: ['Números', 'Numeros', 'Núm.', 'Num.', 'Núm', 'Num', 'Nm.', 'Nm'],
    standalonePatterns: ['Cuarto Libro de Moisés', 'Libro de Números', 'Números']
  },
  {
    canonicalId: 'Dt',
    aliases: ['Deuteronomio', 'Deut.', 'Deut', 'Dt.', 'Dt'],
    standalonePatterns: ['Quinto Libro de Moisés', 'Libro de Deuteronomio', 'Deuteronomio']
  },
  {
    canonicalId: 'Jos',
    aliases: ['Josué', 'Josue', 'Jos.', 'Jos'],
    standalonePatterns: ['Libro de Josué']
  },
  {
    canonicalId: 'Jue',
    aliases: ['Jueces', 'Jue.', 'Jue', 'Juc'],
    standalonePatterns: ['Libro de Jueces']
  },
  {
    canonicalId: 'Rt',
    aliases: ['Ruth', 'Rut', 'Rt.', 'Rt'],
    standalonePatterns: ['Libro de Rut', 'Libro de Ruth']
  },
  {
    canonicalId: '1Sam',
    aliases: ['1 Samuel', '1. Samuel', '1Samuel', '1 Sam.', '1 Sam', '1Sam.', 'I Samuel', 'I Sam.', 'I Sam', 'ISam', '1S.'],
    standalonePatterns: ['Primer Libro de Samuel']
  },
  {
    canonicalId: '2Sam',
    aliases: ['2 Samuel', '2. Samuel', '2Samuel', '2 Sam.', '2 Sam', '2Sam.', 'II Samuel', 'II Sam.', 'II Sam', 'IISam', '2S.'],
    standalonePatterns: ['Segundo Libro de Samuel']
  },
  {
    canonicalId: '1Rey',
    aliases: ['1 Reyes', '1. Reyes', '1Reyes', '1 Rey.', '1 Rey', '1Reyes.', 'I Reyes', 'I Rey.', 'I Rey', 'IRey', '1R.'],
    standalonePatterns: ['Primer Libro de los Reyes']
  },
  {
    canonicalId: '2Rey',
    aliases: ['2 Reyes', '2. Reyes', '2Reyes', '2 Rey.', '2 Rey', '2Reyes.', 'II Reyes', 'II Rey.', 'II Rey', 'IIRey', '2R.'],
    standalonePatterns: ['Segundo Libro de los Reyes']
  },
  {
    canonicalId: '1Cró',
    aliases: ['1 Crónicas', '1 Cronicas', '1. Crónicas', '1Crónicas', '1 Cró.', '1 Cró', '1 Cro.', '1 Cro', 'I Crón', '1Cr'],
    standalonePatterns: ['Primer Libro de las Crónicas']
  },
  {
    canonicalId: '2Cró',
    aliases: ['2 Crónicas', '2 Cronicas', '2. Crónicas', '2Crónicas', '2 Cró.', '2 Cró', '2 Cro.', '2 Cro', 'II Crón', '2Cr'],
    standalonePatterns: ['Segundo Libro de las Crónicas']
  },
  {
    canonicalId: 'Esd',
    aliases: ['Esdras', 'Esd.', 'Esd'],
    standalonePatterns: ['Libro de Esdras']
  },
  {
    canonicalId: 'Neh',
    aliases: ['Nehemías', 'Nehemias', 'Neh.', 'Neh'],
    standalonePatterns: ['Libro de Nehemías']
  },
  {
    canonicalId: 'Est',
    aliases: ['Ester', 'Esther', 'Est.', 'Est'],
    standalonePatterns: ['Libro de Ester']
  },
  {
    canonicalId: 'Job',
    aliases: ['Job', 'Job.'],
    standalonePatterns: ['Libro de Job']
  },
  {
    canonicalId: 'Sal',
    aliases: ['Salmos', 'Salmo', 'Sal.', 'Sal', 'Sl.', 'Sl'],
    standalonePatterns: ['Libro de los Salmos', 'Salterio']
  },
  {
    canonicalId: 'Prov',
    aliases: ['Proverbios', 'Prov.', 'Prov', 'Prv.', 'Prv', 'Pr.'],
    standalonePatterns: ['Libro de los Proverbios']
  },
  {
    canonicalId: 'Ecl',
    aliases: ['Eclesiastés', 'Eclesiastes', 'Cohelet', 'Ecl.', 'Ecl', 'Qoh'],
    standalonePatterns: ['Eclesiastés', 'Libro del Predicador']
  },
  {
    canonicalId: 'Cant',
    aliases: ['Cantares', 'Cantar de los Cantares', 'Cant.', 'Cant', 'Can.'],
    standalonePatterns: ['Cantar de los Cantares de Salomón']
  },
  {
    canonicalId: 'Is',
    aliases: ['Isaías', 'Isaias', 'Isa.', 'Isa', 'Is.', 'Is'],
    standalonePatterns: ['Libro de Isaías']
  },
  {
    canonicalId: 'Jer',
    aliases: ['Jeremías', 'Jeremias', 'Jer.', 'Jer'],
    standalonePatterns: ['Libro de Jeremías']
  },
  {
    canonicalId: 'Lam',
    aliases: ['Lamentaciones', 'Lam.', 'Lam', 'Lm.'],
    standalonePatterns: ['Lamentaciones de Jeremías']
  },
  {
    canonicalId: 'Ez',
    aliases: ['Ezequiel', 'Ezeq.', 'Ezeq', 'Ez.', 'Ez'],
    standalonePatterns: ['Libro de Ezequiel']
  },
  {
    canonicalId: 'Dan',
    aliases: ['Daniel', 'Dan.', 'Dan', 'Dn.'],
    standalonePatterns: ['Libro de Daniel']
  },
  {
    canonicalId: 'Os',
    aliases: ['Oseas', 'Os.', 'Os'],
    standalonePatterns: ['Libro de Oseas']
  },
  {
    canonicalId: 'Jl',
    aliases: ['Joel', 'Joel.', 'Jl.', 'Jl'],
    standalonePatterns: ['Libro de Joel']
  },
  {
    canonicalId: 'Am',
    aliases: ['Amós', 'Amos', 'Am.', 'Am'],
    standalonePatterns: ['Libro de Amós']
  },
  {
    canonicalId: 'Abd',
    aliases: ['Abdías', 'Abdias', 'Abd.', 'Abd'],
    standalonePatterns: ['Libro de Abdías']
  },
  {
    canonicalId: 'Jon',
    aliases: ['Jonás', 'Jonas', 'Jon.', 'Jon'],
    standalonePatterns: ['Libro de Jonás']
  },
  {
    canonicalId: 'Miq',
    aliases: ['Miqueas', 'Miq.', 'Miq', 'Mi.'],
    standalonePatterns: ['Libro de Miqueas']
  },
  {
    canonicalId: 'Nah',
    aliases: ['Nahúm', 'Nahum', 'Nah.', 'Nah'],
    standalonePatterns: ['Libro de Nahúm']
  },
  {
    canonicalId: 'Hab',
    aliases: ['Habacuc', 'Hab.', 'Hab'],
    standalonePatterns: ['Libro de Habacuc']
  },
  {
    canonicalId: 'Sof',
    aliases: ['Sofonías', 'Sofonias', 'Sof.', 'Sof'],
    standalonePatterns: ['Libro de Sofonías']
  },
  {
    canonicalId: 'Hag',
    aliases: ['Hageo', 'Hag.', 'Hag'],
    standalonePatterns: ['Libro de Hageo']
  },
  {
    canonicalId: 'Zac',
    aliases: ['Zacarías', 'Zacarias', 'Zac.', 'Zac'],
    standalonePatterns: ['Libro de Zacarías']
  },
  {
    canonicalId: 'Mal',
    aliases: ['Malaquías', 'Malaquias', 'Mal.', 'Mal'],
    standalonePatterns: ['Libro de Malaquías']
  },

  // ═══════════════════════════════════════════════════════════════
  // NUEVO TESTAMENTO
  // ═══════════════════════════════════════════════════════════════

  {
    canonicalId: 'Mt',
    aliases: ['Mateo', 'Mat.', 'Mat', 'Mt.', 'Mt'],
    standalonePatterns: ['Evangelio según San Mateo', 'Evangelio de Mateo']
  },
  {
    canonicalId: 'Mc',
    aliases: ['Marcos', 'Marc.', 'Marc', 'Mc.', 'Mc'],
    standalonePatterns: ['Evangelio según San Marcos', 'Evangelio de Marcos']
  },
  {
    canonicalId: 'Lc',
    aliases: ['Lucas', 'Luc.', 'Luc', 'Lc.', 'Lc'],
    standalonePatterns: ['Evangelio según San Lucas', 'Evangelio de Lucas']
  },
  {
    canonicalId: 'Jn',
    aliases: ['Juan', 'Jua.', 'Jua', 'Jn.', 'Jn'],
    standalonePatterns: ['Evangelio según San Juan', 'Evangelio de Juan']
  },
  {
    canonicalId: 'Hech',
    aliases: ['Hechos de los Apóstoles', 'Hechos', 'Hech.', 'Hech', 'Hch.', 'Hch'],
    standalonePatterns: ['Los Hechos de los Apóstoles']
  },
  {
    canonicalId: 'Rom',
    aliases: ['Romanos', 'Rom.', 'Rom', 'Ro.'],
    standalonePatterns: ['Epístola a los Romanos']
  },
  {
    canonicalId: '1Cor',
    aliases: ['1 Corintios', '1. Corintios', '1Corintios', '1 Cor.', '1 Cor', 'I Corintios', 'I Cor.', 'I Cor', '1C.'],
    standalonePatterns: ['Primera Epístola a los Corintios']
  },
  {
    canonicalId: '2Cor',
    aliases: ['2 Corintios', '2. Corintios', '2Corintios', '2 Cor.', '2 Cor', 'II Corintios', 'II Cor.', 'II Cor', '2C.'],
    standalonePatterns: ['Segunda Epístola a los Corintios']
  },
  {
    canonicalId: 'Gál',
    aliases: ['Gálatas', 'Galatas', 'Gál.', 'Gal.', 'Gál', 'Gal', 'Ga.'],
    standalonePatterns: ['Epístola a los Gálatas']
  },
  {
    canonicalId: 'Ef',
    aliases: ['Efesios', 'Efe.', 'Efe', 'Ef.', 'Ef'],
    standalonePatterns: ['Epístola a los Efesios']
  },
  {
    canonicalId: 'Fil',
    aliases: ['Filipenses', 'Flp.', 'Flp', 'Fil.', 'Fil'],
    standalonePatterns: ['Epístola a los Filipenses']
  },
  {
    canonicalId: 'Col',
    aliases: ['Colosenses', 'Col.', 'Col'],
    standalonePatterns: ['Epístola a los Colosenses']
  },
  {
    canonicalId: '1Tes',
    aliases: ['1 Tesalonicenses', '1. Tesalonicenses', '1 Tes.', '1 Tes', 'I Tes.', 'I Tes', '1T.'],
    standalonePatterns: ['Primera Epístola a los Tesalonicenses']
  },
  {
    canonicalId: '2Tes',
    aliases: ['2 Tesalonicenses', '2. Tesalonicenses', '2 Tes.', '2 Tes', 'II Tes.', 'II Tes', '2T.'],
    standalonePatterns: ['Segunda Epístola a los Tesalonicenses']
  },
  {
    canonicalId: '1Tim',
    aliases: ['1 Timothy', '1 Timoteo', '1. Timoteo', '1 Tim.', '1 Tim', 'I Tim.', 'I Tim'],
    standalonePatterns: ['Primera Epístola a Timoteo']
  },
  {
    canonicalId: '2Tim',
    aliases: ['2 Timothy', '2 Timoteo', '2. Timoteo', '2 Tim.', '2 Tim', 'II Tim.', 'II Tim'],
    standalonePatterns: ['Segunda Epístola a Timoteo']
  },
  {
    canonicalId: 'Tit',
    aliases: ['Tito', 'Tit.', 'Tit'],
    standalonePatterns: ['Epístola a Tito']
  },
  {
    canonicalId: 'Flm',
    aliases: ['Filemón', 'Filemon', 'Filem.', 'Filem', 'Flm.', 'Flm'],
    standalonePatterns: ['Epístola a Filemón']
  },
  {
    canonicalId: 'Heb',
    aliases: ['Hebreos', 'Hebr.', 'Hebr', 'Heb.', 'Heb'],
    standalonePatterns: ['Epístola a los Hebreos']
  },
  {
    canonicalId: 'Sant',
    aliases: ['Santiago', 'Sant.', 'Sant', 'Stgo.', 'Stgo', 'Jac.', 'Jac'],
    standalonePatterns: ['Epístola de Santiago', 'Epístola de Jacobo']
  },
  {
    canonicalId: '1Pe',
    aliases: ['1 Pedro', '1. Pedro', '1 Ped.', '1 Ped', 'I Ped.', 'I Ped', '1Pe.', '1Pe', '1P.'],
    standalonePatterns: ['Primera Epístola de Pedro']
  },
  {
    canonicalId: '2Pe',
    aliases: ['2 Pedro', '2. Pedro', '2 Ped.', '2 Ped', 'II Ped.', 'II Ped', '2Pe.', '2Pe', '2P.'],
    standalonePatterns: ['Segunda Epístola de Pedro']
  },
  {
    canonicalId: '1Jn',
    aliases: ['1 Juan', '1. Juan', '1 Jua.', '1 Jua', 'I Juan', 'I Jua', '1Jn.', '1Jn'],
    standalonePatterns: ['Primera Epístola de Juan']
  },
  {
    canonicalId: '2Jn',
    aliases: ['2 Juan', '2. Juan', '2 Jua.', '2 Jua', 'II Juan', 'II Jua', '2Jn.', '2Jn'],
    standalonePatterns: ['Segunda Epístola de Juan']
  },
  {
    canonicalId: '3Jn',
    aliases: ['3 Juan', '3. Juan', '3 Jua.', '3 Jua', 'III Juan', 'III Jua', '3Jn.', '3Jn'],
    standalonePatterns: ['Tercera Epístola de Juan']
  },
  {
    canonicalId: 'Jud',
    aliases: ['Judas', 'Jud.', 'Jud'],
    standalonePatterns: ['Epístola de Judas']
  },
  {
    canonicalId: 'Ap',
    aliases: ['Apocalipsis', 'Apoc.', 'Apoc', 'Ap.', 'Ap', 'Rev.'],
    standalonePatterns: ['La Revelación de San Juan', 'Libro de Apocalipsis']
  }
];