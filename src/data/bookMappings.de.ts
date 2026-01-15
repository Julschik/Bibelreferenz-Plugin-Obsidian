import type { BookMapping } from '../types';

export const BOOK_MAPPINGS_DE: BookMapping[] = [
  // ═══════════════════════════════════════════════════════════════
  // ALTES TESTAMENT
  // ═══════════════════════════════════════════════════════════════

  {
    canonicalId: 'Gen',
    aliases: ['Genesis', '1. Mose', '1.Mose', '1 Mose', '1Mose', '1. Mo.', '1. Mo', '1.Mo.', '1.Mo', 'Gen.', 'Gen', '1Mo'],
    standalonePatterns: ['1. Buch Mose', 'Erstes Buch Mose', 'Genesis']
  },
  {
    canonicalId: 'Ex',
    aliases: ['Exodus', '2. Mose', '2.Mose', '2 Mose', '2Mose', '2. Mo.', '2. Mo', '2.Mo.', '2.Mo', 'Exo', 'Ex.', 'Ex', '2Mo'],
    standalonePatterns: ['2. Buch Mose', 'Zweites Buch Mose', 'Exodus']
  },
  {
    canonicalId: 'Lev',
    aliases: ['Levitikus', 'Leviticus', '3. Mose', '3.Mose', '3 Mose', '3Mose', '3. Mo.', '3. Mo', '3.Mo.', '3.Mo', 'Lev.', 'Lev', '3Mo'],
    standalonePatterns: ['3. Buch Mose', 'Drittes Buch Mose', 'Levitikus']
  },
  {
    canonicalId: 'Num',
    aliases: ['Numeri', '4. Mose', '4.Mose', '4 Mose', '4Mose', '4. Mo.', '4. Mo', '4.Mo.', '4.Mo', 'Num.', 'Num', '4Mo'],
    standalonePatterns: ['4. Buch Mose', 'Viertes Buch Mose', 'Numeri']
  },
  {
    canonicalId: 'Dtn',
    aliases: ['Deuteronomium', '5. Mose', '5.Mose', '5 Mose', '5Mose', '5. Mo.', '5. Mo', '5.Mo.', '5.Mo', 'Dtn.', 'Dtn', '5Mo'],
    standalonePatterns: ['5. Buch Mose', 'Fünftes Buch Mose', 'Deuteronomium']
  },
  {
    canonicalId: 'Jos',
    aliases: ['Josua', 'Jos.', 'Jos', 'Josh'],
    standalonePatterns: ['Das Buch Josua']
  },
  {
    canonicalId: 'Ri',
    aliases: ['Richter', 'Ri.', 'Ri', 'Rich'],
    standalonePatterns: ['Das Buch der Richter', 'Richterbuch']
  },
  {
    canonicalId: 'Rut',
    aliases: ['Ruth', 'Rut.', 'Rut', 'Rt.', 'Rt'],
    standalonePatterns: ['Das Buch Ruth', 'Das Buch Rut']
  },
  {
    canonicalId: '1Sam',
    aliases: ['1. Samuel', '1.Samuel', '1 Samuel', '1Samuel', '1. Sam.', '1. Sam', '1.Sam.', '1.Sam', '1 Sam', '1Sam'],
    standalonePatterns: ['1. Buch Samuel', 'Erstes Buch Samuel']
  },
  {
    canonicalId: '2Sam',
    aliases: ['2. Samuel', '2.Samuel', '2 Samuel', '2Samuel', '2. Sam.', '2. Sam', '2.Sam.', '2.Sam', '2 Sam', '2Sam'],
    standalonePatterns: ['2. Buch Samuel', 'Zweites Buch Samuel']
  },
  {
    canonicalId: '1Kön',
    aliases: ['1. Könige', '1.Könige', '1 Könige', '1Könige', '1. Kön.', '1. Kön', '1.Kön.', '1.Kön', '1 Kön', '1Kön', '1Ki'],
    standalonePatterns: ['1. Buch der Könige', 'Erstes Buch der Könige']
  },
  {
    canonicalId: '2Kön',
    aliases: ['2. Könige', '2.Könige', '2 Könige', '2Könige', '2. Kön.', '2. Kön', '2.Kön.', '2.Kön', '2 Kön', '2Kön', '2Ki'],
    standalonePatterns: ['2. Buch der Könige', 'Zweites Buch der Könige']
  },
  {
    canonicalId: '1Chr',
    aliases: ['1. Chronik', '1.Chronik', '1 Chronik', '1Chronik', '1. Chr.', '1. Chr', '1.Chr.', '1.Chr', '1 Chr', '1Chr'],
    standalonePatterns: ['1. Buch der Chronik', 'Erstes Buch der Chronik']
  },
  {
    canonicalId: '2Chr',
    aliases: ['2. Chronik', '2.Chronik', '2 Chronik', '2Chronik', '2. Chr.', '2. Chr', '2.Chr.', '2.Chr', '2 Chr', '2Chr'],
    standalonePatterns: ['2. Buch der Chronik', 'Zweites Buch der Chronik']
  },
  {
    canonicalId: 'Esr',
    aliases: ['Esra', 'Esr.', 'Esr', 'Ezr'],
    standalonePatterns: ['Das Buch Esra']
  },
  {
    canonicalId: 'Neh',
    aliases: ['Nehemia', 'Neh.', 'Neh'],
    standalonePatterns: ['Das Buch Nehemia']
  },
  {
    canonicalId: 'Est',
    aliases: ['Esther', 'Ester', 'Est.', 'Est'],
    standalonePatterns: ['Das Buch Esther', 'Das Buch Ester']
  },
  {
    canonicalId: 'Hiob',
    aliases: ['Hiob', 'Ijob', 'Hi.', 'Hi', 'Job'],
    standalonePatterns: ['Das Buch Hiob', 'Das Buch Ijob']
  },
  {
    canonicalId: 'Ps',
    aliases: ['Psalmen', 'Psalm', 'Ps.', 'Pss', 'Ps', 'Psa'],
    standalonePatterns: ['Der Psalter', 'Das Buch der Psalmen']
  },
  {
    canonicalId: 'Spr',
    aliases: ['Sprüche', 'Spr.', 'Spr', 'Pro', 'Prov'],
    standalonePatterns: ['Die Sprüche Salomos', 'Sprüche', 'Buch der Sprüche']
  },
  {
    canonicalId: 'Pred',
    aliases: ['Prediger', 'Kohelet', 'Pred.', 'Pred', 'Koh.', 'Koh', 'Ecc'],
    standalonePatterns: ['Der Prediger Salomo', 'Kohelet', 'Buch Prediger']
  },
  {
    canonicalId: 'Hld',
    aliases: ['Hoheslied', 'Hohelied', 'Hld.', 'Hld', 'HL'],
    standalonePatterns: ['Das Hohelied Salomos', 'Das Hohelied']
  },
  {
    canonicalId: 'Jes',
    aliases: ['Jesaja', 'Jes.', 'Jes', 'Isa'],
    standalonePatterns: ['Das Buch Jesaja']
  },
  {
    canonicalId: 'Jer',
    aliases: ['Jeremia', 'Jer.', 'Jer'],
    standalonePatterns: ['Das Buch Jeremia']
  },
  {
    canonicalId: 'Klgl',
    aliases: ['Klagelieder', 'Klgl.', 'Klgl', 'Klag', 'Lam'],
    standalonePatterns: ['Die Klagelieder Jeremias', 'Klagelieder']
  },
  {
    canonicalId: 'Hes',
    aliases: ['Hesekiel', 'Ezechiel', 'Hes.', 'Hes', 'Ez.', 'Ez', 'Eze'],
    standalonePatterns: ['Das Buch Hesekiel', 'Das Buch Ezechiel']
  },
  {
    canonicalId: 'Dan',
    aliases: ['Daniel', 'Dan.', 'Dan', 'Da'],
    standalonePatterns: ['Das Buch Daniel']
  },
  {
    canonicalId: 'Hos',
    aliases: ['Hosea', 'Hos.', 'Hos'],
    standalonePatterns: ['Das Buch Hosea']
  },
  {
    canonicalId: 'Jl',
    aliases: ['Joel', 'Jl.', 'Jl', 'Joe'],
    standalonePatterns: ['Das Buch Joel']
  },
  {
    canonicalId: 'Am',
    aliases: ['Amos', 'Am.', 'Am', 'Amo'],
    standalonePatterns: ['Das Buch Amos']
  },
  {
    canonicalId: 'Obd',
    aliases: ['Obadja', 'Obd.', 'Obd', 'Oba', 'Ob'],
    standalonePatterns: ['Das Buch Obadja']
  },
  {
    canonicalId: 'Jon',
    aliases: ['Jona', 'Jon.', 'Jon'],
    standalonePatterns: ['Das Buch Jona']
  },
  {
    canonicalId: 'Mi',
    aliases: ['Micha', 'Mi.', 'Mi', 'Mic'],
    standalonePatterns: ['Das Buch Micha']
  },
  {
    canonicalId: 'Nah',
    aliases: ['Nahum', 'Nah.', 'Nah', 'Na'],
    standalonePatterns: ['Das Buch Nahum']
  },
  {
    canonicalId: 'Hab',
    aliases: ['Habakuk', 'Hab.', 'Hab', 'Hk'],
    standalonePatterns: ['Das Buch Habakuk']
  },
  {
    canonicalId: 'Zef',
    aliases: ['Zephanja', 'Zefanja', 'Zeph', 'Zef.', 'Zef', 'Zep'],
    standalonePatterns: ['Das Buch Zephanja', 'Das Buch Zefanja']
  },
  {
    canonicalId: 'Hag',
    aliases: ['Haggai', 'Hag.', 'Hag', 'Hg'],
    standalonePatterns: ['Das Buch Haggai']
  },
  {
    canonicalId: 'Sach',
    aliases: ['Sacharja', 'Sach.', 'Sach', 'Zec'],
    standalonePatterns: ['Das Buch Sacharja']
  },
  {
    canonicalId: 'Mal',
    aliases: ['Maleachi', 'Mal.', 'Mal'],
    standalonePatterns: ['Das Buch Maleachi']
  },

  // ═══════════════════════════════════════════════════════════════
  // NEUES TESTAMENT
  // ═══════════════════════════════════════════════════════════════

  {
    canonicalId: 'Mt',
    aliases: ['Matthäus', 'Matth.', 'Matt.', 'Matt', 'Mt.', 'Mt'],
    standalonePatterns: ['Das Evangelium nach Matthäus', 'Matthäusevangelium']
  },
  {
    canonicalId: 'Mk',
    aliases: ['Markus', 'Mark.', 'Mark', 'Mk.', 'Mk'],
    standalonePatterns: ['Das Evangelium nach Markus', 'Markusevangelium']
  },
  {
    canonicalId: 'Lk',
    aliases: ['Lukas', 'Luk.', 'Luk', 'Lk.', 'Lk'],
    standalonePatterns: ['Das Evangelium nach Lukas', 'Lukasevangelium']
  },
  {
    canonicalId: 'Joh',
    aliases: ['Johannes', 'Joh.', 'Joh', 'Jo', 'Jn'],
    standalonePatterns: ['Das Evangelium nach Johannes', 'Johannesevangelium']
  },
  {
    canonicalId: 'Apg',
    aliases: ['Apostelgeschichte', 'Apg.', 'Apg', 'Act'],
    standalonePatterns: ['Die Apostelgeschichte']
  },
  {
    canonicalId: 'Röm',
    aliases: ['Römerbrief', 'Römer', 'Röm.', 'Röm', 'Rm', 'Rom'],
    standalonePatterns: ['Der Brief an die Römer', 'Römerbrief']
  },
  {
    canonicalId: '1Kor',
    aliases: ['1. Korinther', '1.Korinther', '1 Korinther', '1Korinther', '1. Kor.', '1. Kor', '1.Kor.', '1.Kor', '1 Kor', '1Kor', '1Co'],
    standalonePatterns: ['1. Korintherbrief', 'Erster Korintherbrief']
  },
  {
    canonicalId: '2Kor',
    aliases: ['2. Korinther', '2.Korinther', '2 Korinther', '2Korinther', '2. Kor.', '2. Kor', '2.Kor.', '2.Kor', '2 Kor', '2Kor', '2Co'],
    standalonePatterns: ['2. Korintherbrief', 'Zweiter Korintherbrief']
  },
  {
    canonicalId: 'Gal',
    aliases: ['Galater', 'Gal.', 'Gal'],
    standalonePatterns: ['Der Brief an die Galater', 'Galaterbrief']
  },
  {
    canonicalId: 'Eph',
    aliases: ['Epheser', 'Eph.', 'Eph'],
    standalonePatterns: ['Der Brief an die Epheser', 'Epheserbrief']
  },
  {
    canonicalId: 'Phil',
    aliases: ['Philipper', 'Phil.', 'Phil', 'Php'],
    standalonePatterns: ['Der Brief an die Philipper', 'Philipperbrief']
  },
  {
    canonicalId: 'Kol',
    aliases: ['Kolosser', 'Kol.', 'Kol', 'Col'],
    standalonePatterns: ['Der Brief an die Kolosser', 'Kolosserbrief']
  },
  {
    canonicalId: '1Thess',
    aliases: ['1. Thessalonicher', '1.Thessalonicher', '1 Thessalonicher', '1Thessalonicher', '1. Thess.', '1. Thess', '1.Thess.', '1.Thess', '1 Thess', '1Thess', '1Th'],
    standalonePatterns: ['1. Thessalonicherbrief']
  },
  {
    canonicalId: '2Thess',
    aliases: ['2. Thessalonicher', '2.Thessalonicher', '2 Thessalonicher', '2Thessalonicher', '2. Thess.', '2. Thess', '2.Thess.', '2.Thess', '2 Thess', '2Thess', '2Th'],
    standalonePatterns: ['2. Thessalonicherbrief']
  },
  {
    canonicalId: '1Tim',
    aliases: ['1. Timotheus', '1.Timotheus', '1 Timotheus', '1Timotheus', '1. Tim.', '1. Tim', '1.Tim.', '1.Tim', '1 Tim', '1Tim'],
    standalonePatterns: ['1. Timotheusbrief']
  },
  {
    canonicalId: '2Tim',
    aliases: ['2. Timotheus', '2.Timotheus', '2 Timotheus', '2Timotheus', '2. Tim.', '2. Tim', '2.Tim.', '2.Tim', '2 Tim', '2Tim'],
    standalonePatterns: ['2. Timotheusbrief']
  },
  {
    canonicalId: 'Tit',
    aliases: ['Titusbrief', 'Titus', 'Tit.', 'Tit'],
    standalonePatterns: ['Der Brief an Titus', 'Titusbrief']
  },
  {
    canonicalId: 'Phlm',
    aliases: ['Philemonbrief', 'Philemon', 'Phlm.', 'Phlm', 'Phm'],
    standalonePatterns: ['Der Brief an Philemon', 'Philemonbrief']
  },
  {
    canonicalId: 'Hebr',
    aliases: ['Hebräerbrief', 'Hebräer', 'Hebr.', 'Hebr', 'Hbr'],
    standalonePatterns: ['Der Brief an die Hebräer', 'Hebräerbrief']
  },
  {
    canonicalId: 'Jak',
    aliases: ['Jakobusbrief', 'Jakobus', 'Jak.', 'Jak', 'Jk'],
    standalonePatterns: ['Der Brief des Jakobus', 'Jakobusbrief']
  },
  {
    canonicalId: '1Petr',
    aliases: ['1. Petrus', '1.Petrus', '1 Petrus', '1Petrus', '1. Petr.', '1. Petr', '1.Petr.', '1.Petr', '1 Petr', '1Petr', '1Pe', '1Pt'],
    standalonePatterns: ['1. Petrusbrief']
  },
  {
    canonicalId: '2Petr',
    aliases: ['2. Petrus', '2.Petrus', '2 Petrus', '2Petrus', '2. Petr.', '2. Petr', '2.Petr.', '2.Petr', '2 Petr', '2Petr', '2Pe', '2Pt'],
    standalonePatterns: ['2. Petrusbrief']
  },
  {
    canonicalId: '1Joh',
    aliases: ['1. Johannes', '1.Johannes', '1 Johannes', '1Johannes', '1. Joh.', '1. Joh', '1.Joh.', '1.Joh', '1 Joh', '1Joh', '1Jo'],
    standalonePatterns: ['1. Johannesbrief']
  },
  {
    canonicalId: '2Joh',
    aliases: ['2. Johannes', '2.Johannes', '2 Johannes', '2Johannes', '2. Joh.', '2. Joh', '2.Joh.', '2.Joh', '2 Joh', '2Joh', '2Jo'],
    standalonePatterns: ['2. Johannesbrief']
  },
  {
    canonicalId: '3Joh',
    aliases: ['3. Johannes', '3.Johannes', '3 Johannes', '3Johannes', '3. Joh.', '3. Joh', '3.Joh.', '3.Joh', '3 Joh', '3Joh', '3Jo'],
    standalonePatterns: ['3. Johannesbrief']
  },
  {
    canonicalId: 'Jud',
    aliases: ['Judasbrief', 'Judas', 'Jud.', 'Jud'],
    standalonePatterns: ['Der Brief des Judas', 'Judasbrief']
  },
  {
    canonicalId: 'Offb',
    aliases: ['Offenbarung des Johannes', 'Offenbarung', 'Apokalypse', 'Offb.', 'Offb', 'Off.', 'Off', 'Apk.', 'Apk', 'Rev'],
    standalonePatterns: ['Die Offenbarung des Johannes', 'Die Apokalypse']
  }
];

/**
 * Get a book mapping by canonical ID
 */
export function getBookMappingDE(canonicalId: string): BookMapping | undefined {
  return BOOK_MAPPINGS_DE.find(mapping => mapping.canonicalId === canonicalId);
}

/**
 * Get all canonical book IDs
 */
export function getAllBookIdsDE(): string[] {
  return BOOK_MAPPINGS_DE.map(mapping => mapping.canonicalId);
}
