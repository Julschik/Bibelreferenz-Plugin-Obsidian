import type { BookMapping } from '../types';

/**
 * German book name mappings for all 66 Bible books
 * Includes common German abbreviations and variations
 *
 * Design notes:
 * - Aliases are sorted by length (longest first) to prevent premature matching
 * - standalonePatterns: Book names that work without chapter/verse (e.g., "Kolosserbrief")
 * - Includes variations with/without dots, spaces, and numbers
 */
export const BOOK_MAPPINGS_DE: BookMapping[] = [
  // ═══════════════════════════════════════════════════════════════
  // ALTES TESTAMENT (Old Testament)
  // ═══════════════════════════════════════════════════════════════

  // Pentateuch (Torah)
  {
    canonicalId: 'Gen',
    aliases: ['1. Mose', '1.Mose', '1 Mose', '1Mose', 'Genesis', 'Gen', '1Mo', '1.Mo', '1. Mo'],
    standalonePatterns: ['Genesis', '1. Buch Mose', 'Erstes Buch Mose', '1. Mose']
  },
  {
    canonicalId: 'Exo',
    aliases: ['2. Mose', '2.Mose', '2 Mose', '2Mose', 'Exodus', 'Exo', 'Ex', '2Mo', '2.Mo'],
    standalonePatterns: ['Exodus', '2. Buch Mose', 'Zweites Buch Mose']
  },
  {
    canonicalId: 'Lev',
    aliases: ['3. Mose', '3.Mose', '3 Mose', '3Mose', 'Levitikus', 'Leviticus', 'Lev', '3Mo', '3.Mo'],
    standalonePatterns: ['Levitikus', 'Leviticus', '3. Buch Mose', 'Drittes Buch Mose']
  },
  {
    canonicalId: 'Num',
    aliases: ['4. Mose', '4.Mose', '4 Mose', '4Mose', 'Numeri', 'Num', '4Mo', '4.Mo'],
    standalonePatterns: ['Numeri', '4. Buch Mose', 'Viertes Buch Mose']
  },
  {
    canonicalId: 'Deu',
    aliases: ['5. Mose', '5.Mose', '5 Mose', '5Mose', 'Deuteronomium', 'Deu', 'Dtn', '5Mo', '5.Mo'],
    standalonePatterns: ['Deuteronomium', '5. Buch Mose', 'Fünftes Buch Mose']
  },

  // Geschichtsbücher (Historical Books)
  {
    canonicalId: 'Jos',
    aliases: ['Josua', 'Jos', 'Josh'],
    standalonePatterns: ['Buch Josua']
  },
  {
    canonicalId: 'Jdg',
    aliases: ['Richter', 'Ri', 'Jdg'],
    standalonePatterns: ['Buch der Richter', 'Richterbuch']
  },
  {
    canonicalId: 'Rut',
    aliases: ['Ruth', 'Rut', 'Rt'],
    standalonePatterns: ['Buch Ruth', 'Buch Rut']
  },
  {
    canonicalId: '1Sa',
    aliases: ['1. Samuel', '1.Samuel', '1 Samuel', '1Samuel', '1Sam', '1.Sam', '1 Sam'],
    standalonePatterns: ['1. Buch Samuel', 'Erstes Buch Samuel']
  },
  {
    canonicalId: '2Sa',
    aliases: ['2. Samuel', '2.Samuel', '2 Samuel', '2Samuel', '2Sam', '2.Sam', '2 Sam'],
    standalonePatterns: ['2. Buch Samuel', 'Zweites Buch Samuel']
  },
  {
    canonicalId: '1Ki',
    aliases: ['1. Könige', '1.Könige', '1 Könige', '1Könige', '1Kön', '1.Kön', '1 Kön', '1Ki', '1.Ki'],
    standalonePatterns: ['1. Buch der Könige', 'Erstes Buch der Könige']
  },
  {
    canonicalId: '2Ki',
    aliases: ['2. Könige', '2.Könige', '2 Könige', '2Könige', '2Kön', '2.Kön', '2 Kön', '2Ki', '2.Ki'],
    standalonePatterns: ['2. Buch der Könige', 'Zweites Buch der Könige']
  },
  {
    canonicalId: '1Ch',
    aliases: ['1. Chronik', '1.Chronik', '1 Chronik', '1Chronik', '1Chr', '1.Chr', '1 Chr'],
    standalonePatterns: ['1. Buch der Chronik', 'Erstes Buch der Chronik']
  },
  {
    canonicalId: '2Ch',
    aliases: ['2. Chronik', '2.Chronik', '2 Chronik', '2Chronik', '2Chr', '2.Chr', '2 Chr'],
    standalonePatterns: ['2. Buch der Chronik', 'Zweites Buch der Chronik']
  },
  {
    canonicalId: 'Ezr',
    aliases: ['Esra', 'Esr', 'Ezr'],
    standalonePatterns: ['Buch Esra']
  },
  {
    canonicalId: 'Neh',
    aliases: ['Nehemia', 'Neh'],
    standalonePatterns: ['Buch Nehemia']
  },
  {
    canonicalId: 'Est',
    aliases: ['Esther', 'Est', 'Ester'],
    standalonePatterns: ['Buch Esther', 'Buch Ester', 'Estherbuch']
  },

  // Poetische Bücher (Poetic Books)
  {
    canonicalId: 'Job',
    aliases: ['Hiob', 'Hi', 'Job', 'Ijob'],
    standalonePatterns: ['Buch Hiob', 'Hiobbuch']
  },
  {
    canonicalId: 'Psa',
    aliases: ['Psalmen', 'Psalm', 'Ps', 'Psa', 'Pss'],
    standalonePatterns: ['Psalmen', 'Buch der Psalmen', 'Psalter']
  },
  {
    canonicalId: 'Pro',
    aliases: ['Sprüche', 'Spr', 'Pro', 'Prov'],
    standalonePatterns: ['Sprüche Salomos', 'Buch der Sprüche', 'Sprichwörter']
  },
  {
    canonicalId: 'Ecc',
    aliases: ['Prediger', 'Pred', 'Ecc', 'Koh', 'Kohelet'],
    standalonePatterns: ['Prediger Salomo', 'Buch Prediger', 'Kohelet']
  },
  {
    canonicalId: 'Son',
    aliases: ['Hoheslied', 'Hohelied', 'Hld', 'HL', 'Son'],
    standalonePatterns: ['Hoheslied Salomos', 'Hohelied Salomos', 'Das Hohelied']
  },

  // Große Propheten (Major Prophets)
  {
    canonicalId: 'Isa',
    aliases: ['Jesaja', 'Jes', 'Isa', 'Is'],
    standalonePatterns: ['Buch Jesaja', 'Jesajabuch']
  },
  {
    canonicalId: 'Jer',
    aliases: ['Jeremia', 'Jer'],
    standalonePatterns: ['Buch Jeremia', 'Jeremiabuch']
  },
  {
    canonicalId: 'Klag',
    aliases: ['Klagelieder', 'Klgl', 'Klag', 'Lam', 'Klagl'],
    standalonePatterns: ['Klagelieder Jeremias', 'Klagelieder']
  },
  {
    canonicalId: 'Eze',
    aliases: ['Hesekiel', 'Hes', 'Ezechiel', 'Ez', 'Eze'],
    standalonePatterns: ['Buch Hesekiel', 'Hesekielbuch']
  },
  {
    canonicalId: 'Dan',
    aliases: ['Daniel', 'Dan', 'Da'],
    standalonePatterns: ['Buch Daniel', 'Danielbuch']
  },

  // Kleine Propheten (Minor Prophets)
  {
    canonicalId: 'Hos',
    aliases: ['Hosea', 'Hos'],
    standalonePatterns: ['Buch Hosea']
  },
  {
    canonicalId: 'Joe',
    aliases: ['Joel', 'Joe', 'Jl'],
    standalonePatterns: ['Buch Joel']
  },
  {
    canonicalId: 'Amo',
    aliases: ['Amos', 'Am', 'Amo'],
    standalonePatterns: ['Buch Amos']
  },
  {
    canonicalId: 'Oba',
    aliases: ['Obadja', 'Obd', 'Ob', 'Oba'],
    standalonePatterns: ['Buch Obadja']
  },
  {
    canonicalId: 'Jon',
    aliases: ['Jona', 'Jon'],
    standalonePatterns: ['Buch Jona', 'Jonabuch']
  },
  {
    canonicalId: 'Mic',
    aliases: ['Micha', 'Mi', 'Mic'],
    standalonePatterns: ['Buch Micha']
  },
  {
    canonicalId: 'Nah',
    aliases: ['Nahum', 'Nah', 'Na'],
    standalonePatterns: ['Buch Nahum']
  },
  {
    canonicalId: 'Hab',
    aliases: ['Habakuk', 'Hab', 'Hk'],
    standalonePatterns: ['Buch Habakuk']
  },
  {
    canonicalId: 'Zef',
    aliases: ['Zephanja', 'Zefanja', 'Zef', 'Zeph', 'Zep'],
    standalonePatterns: ['Buch Zephanja', 'Buch Zefanja']
  },
  {
    canonicalId: 'Hag',
    aliases: ['Haggai', 'Hag', 'Hg'],
    standalonePatterns: ['Buch Haggai']
  },
  {
    canonicalId: 'Zec',
    aliases: ['Sacharja', 'Sach', 'Zech', 'Zec'],
    standalonePatterns: ['Buch Sacharja']
  },
  {
    canonicalId: 'Mal',
    aliases: ['Maleachi', 'Mal'],
    standalonePatterns: ['Buch Maleachi']
  },

  // ═══════════════════════════════════════════════════════════════
  // NEUES TESTAMENT (New Testament)
  // ═══════════════════════════════════════════════════════════════

  // Evangelien (Gospels)
  {
    canonicalId: 'Mat',
    aliases: ['Matthäus', 'Matth', 'Matt', 'Mt', 'Mat'],
    standalonePatterns: ['Matthäusevangelium', 'Evangelium nach Matthäus']
  },
  {
    canonicalId: 'Mar',
    aliases: ['Markus', 'Mark', 'Mk', 'Mar'],
    standalonePatterns: ['Markusevangelium', 'Evangelium nach Markus']
  },
  {
    canonicalId: 'Luk',
    aliases: ['Lukas', 'Luk', 'Lk', 'Lu'],
    standalonePatterns: ['Lukasevangelium', 'Evangelium nach Lukas']
  },
  {
    canonicalId: 'Joh',
    aliases: ['Johannes', 'Joh', 'Jo', 'Jn'],
    standalonePatterns: ['Johannesevangelium', 'Evangelium nach Johannes']
  },

  // Geschichte (History)
  {
    canonicalId: 'Act',
    aliases: ['Apostelgeschichte', 'Apg', 'Act', 'Ag'],
    standalonePatterns: ['Apostelgeschichte']
  },

  // Paulusbriefe (Pauline Epistles)
  {
    canonicalId: 'Rom',
    aliases: ['Römer', 'Roem', 'Röm', 'Rom', 'Rm'],
    standalonePatterns: ['Römerbrief', 'Brief an die Römer']
  },
  {
    canonicalId: '1Co',
    aliases: ['1. Korinther', '1.Korinther', '1 Korinther', '1Korinther', '1Kor', '1.Kor', '1 Kor', '1Co'],
    standalonePatterns: ['1. Korintherbrief', 'Erster Korintherbrief']
  },
  {
    canonicalId: '2Co',
    aliases: ['2. Korinther', '2.Korinther', '2 Korinther', '2Korinther', '2Kor', '2.Kor', '2 Kor', '2Co'],
    standalonePatterns: ['2. Korintherbrief', 'Zweiter Korintherbrief']
  },
  {
    canonicalId: 'Gal',
    aliases: ['Galater', 'Gal'],
    standalonePatterns: ['Galaterbrief', 'Brief an die Galater']
  },
  {
    canonicalId: 'Eph',
    aliases: ['Epheser', 'Eph'],
    standalonePatterns: ['Epheserbrief', 'Brief an die Epheser']
  },
  {
    canonicalId: 'Php',
    aliases: ['Philipper', 'Phil', 'Phi', 'Php'],
    standalonePatterns: ['Philipperbrief', 'Brief an die Philipper']
  },
  {
    canonicalId: 'Col',
    aliases: ['Kolosser', 'Kol', 'Col'],
    standalonePatterns: ['Kolosserbrief', 'Brief an die Kolosser', 'Kolosser']
  },
  {
    canonicalId: '1Th',
    aliases: ['1. Thessalonicher', '1.Thessalonicher', '1 Thessalonicher', '1Thessalonicher', '1Thess', '1.Thess', '1 Thess', '1Th'],
    standalonePatterns: ['1. Thessalonicherbrief', 'Erster Thessalonicherbrief']
  },
  {
    canonicalId: '2Th',
    aliases: ['2. Thessalonicher', '2.Thessalonicher', '2 Thessalonicher', '2Thessalonicher', '2Thess', '2.Thess', '2 Thess', '2Th'],
    standalonePatterns: ['2. Thessalonicherbrief', 'Zweiter Thessalonicherbrief']
  },
  {
    canonicalId: '1Ti',
    aliases: ['1. Timotheus', '1.Timotheus', '1 Timotheus', '1Timotheus', '1Tim', '1.Tim', '1 Tim', '1Ti'],
    standalonePatterns: ['1. Timotheusbrief', 'Erster Timotheusbrief']
  },
  {
    canonicalId: '2Ti',
    aliases: ['2. Timotheus', '2.Timotheus', '2 Timotheus', '2Timotheus', '2Tim', '2.Tim', '2 Tim', '2Ti'],
    standalonePatterns: ['2. Timotheusbrief', 'Zweiter Timotheusbrief']
  },
  {
    canonicalId: 'Tit',
    aliases: ['Titus', 'Tit'],
    standalonePatterns: ['Titusbrief', 'Brief an Titus']
  },
  {
    canonicalId: 'Phm',
    aliases: ['Philemon', 'Phlm', 'Phm'],
    standalonePatterns: ['Philemonbrief', 'Brief an Philemon']
  },

  // Hebräerbrief und Allgemeine Briefe (Hebrews & General Epistles)
  {
    canonicalId: 'Heb',
    aliases: ['Hebräer', 'Hebr', 'Heb', 'Hbr'],
    standalonePatterns: ['Hebräerbrief', 'Brief an die Hebräer']
  },
  {
    canonicalId: 'Jas',
    aliases: ['Jakobus', 'Jak', 'Jam', 'Jk'],
    standalonePatterns: ['Jakobusbrief', 'Brief des Jakobus']
  },
  {
    canonicalId: '1Pe',
    aliases: ['1. Petrus', '1.Petrus', '1 Petrus', '1Petrus', '1Petr', '1.Petr', '1 Petr', '1Pe', '1Pt'],
    standalonePatterns: ['1. Petrusbrief', 'Erster Petrusbrief']
  },
  {
    canonicalId: '2Pe',
    aliases: ['2. Petrus', '2.Petrus', '2 Petrus', '2Petrus', '2Petr', '2.Petr', '2 Petr', '2Pe', '2Pt'],
    standalonePatterns: ['2. Petrusbrief', 'Zweiter Petrusbrief']
  },
  {
    canonicalId: '1Jo',
    aliases: ['1. Johannes', '1.Johannes', '1 Johannes', '1Johannes', '1Joh', '1.Joh', '1 Joh', '1Jo', '1Jn'],
    standalonePatterns: ['1. Johannesbrief', 'Erster Johannesbrief']
  },
  {
    canonicalId: '2Jo',
    aliases: ['2. Johannes', '2.Johannes', '2 Johannes', '2Johannes', '2Joh', '2.Joh', '2 Joh', '2Jo', '2Jn'],
    standalonePatterns: ['2. Johannesbrief', 'Zweiter Johannesbrief']
  },
  {
    canonicalId: '3Jo',
    aliases: ['3. Johannes', '3.Johannes', '3 Johannes', '3Johannes', '3Joh', '3.Joh', '3 Joh', '3Jo', '3Jn'],
    standalonePatterns: ['3. Johannesbrief', 'Dritter Johannesbrief']
  },
  {
    canonicalId: 'Jud',
    aliases: ['Judas', 'Jud'],
    standalonePatterns: ['Judasbrief', 'Brief des Judas']
  },

  // Offenbarung (Revelation)
  {
    canonicalId: 'Rev',
    aliases: ['Offenbarung', 'Offb', 'Off', 'Rev', 'Apk'],
    standalonePatterns: ['Offenbarung des Johannes', 'Apokalypse']
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
