import type { BookMapping } from '../types';

/**
 * English book name mappings for all 66 Bible books
 * Includes common English abbreviations and variations
 *
 * Design notes:
 * - Aliases are sorted by length (longest first) to prevent premature matching
 * - standalonePatterns: Book names that work without chapter/verse
 * - Includes variations with/without dots and spaces
 */
export const BOOK_MAPPINGS_EN: BookMapping[] = [
  // ═══════════════════════════════════════════════════════════════
  // OLD TESTAMENT
  // ═══════════════════════════════════════════════════════════════

  // Pentateuch (Torah)
  {
    canonicalId: 'Gen',
    aliases: ['Genesis', 'Gen', 'Ge', 'Gn'],
    standalonePatterns: ['Genesis', 'Book of Genesis']
  },
  {
    canonicalId: 'Exo',
    aliases: ['Exodus', 'Exo', 'Exod', 'Ex'],
    standalonePatterns: ['Exodus', 'Book of Exodus']
  },
  {
    canonicalId: 'Lev',
    aliases: ['Leviticus', 'Lev', 'Le', 'Lv'],
    standalonePatterns: ['Leviticus', 'Book of Leviticus']
  },
  {
    canonicalId: 'Num',
    aliases: ['Numbers', 'Num', 'Nu', 'Nm', 'Nb'],
    standalonePatterns: ['Numbers', 'Book of Numbers']
  },
  {
    canonicalId: 'Deu',
    aliases: ['Deuteronomy', 'Deut', 'Deu', 'Dt'],
    standalonePatterns: ['Deuteronomy', 'Book of Deuteronomy']
  },

  // Historical Books
  {
    canonicalId: 'Jos',
    aliases: ['Joshua', 'Josh', 'Jos', 'Jsh'],
    standalonePatterns: ['Joshua', 'Book of Joshua']
  },
  {
    canonicalId: 'Jdg',
    aliases: ['Judges', 'Judg', 'Jdg', 'Jg', 'Jdgs'],
    standalonePatterns: ['Judges', 'Book of Judges']
  },
  {
    canonicalId: 'Rut',
    aliases: ['Ruth', 'Rut', 'Rth', 'Ru'],
    standalonePatterns: ['Ruth', 'Book of Ruth']
  },
  {
    canonicalId: '1Sa',
    aliases: ['1 Samuel', '1Samuel', '1Sam', '1 Sam', '1Sa', '1 Sa', 'I Samuel', 'First Samuel'],
    standalonePatterns: ['1 Samuel', 'First Samuel', 'First Book of Samuel']
  },
  {
    canonicalId: '2Sa',
    aliases: ['2 Samuel', '2Samuel', '2Sam', '2 Sam', '2Sa', '2 Sa', 'II Samuel', 'Second Samuel'],
    standalonePatterns: ['2 Samuel', 'Second Samuel', 'Second Book of Samuel']
  },
  {
    canonicalId: '1Ki',
    aliases: ['1 Kings', '1Kings', '1Kgs', '1 Kgs', '1Ki', '1 Ki', 'I Kings', 'First Kings'],
    standalonePatterns: ['1 Kings', 'First Kings', 'First Book of Kings']
  },
  {
    canonicalId: '2Ki',
    aliases: ['2 Kings', '2Kings', '2Kgs', '2 Kgs', '2Ki', '2 Ki', 'II Kings', 'Second Kings'],
    standalonePatterns: ['2 Kings', 'Second Kings', 'Second Book of Kings']
  },
  {
    canonicalId: '1Ch',
    aliases: ['1 Chronicles', '1Chronicles', '1Chron', '1 Chron', '1Chr', '1 Chr', '1Ch', 'I Chronicles', 'First Chronicles'],
    standalonePatterns: ['1 Chronicles', 'First Chronicles', 'First Book of Chronicles']
  },
  {
    canonicalId: '2Ch',
    aliases: ['2 Chronicles', '2Chronicles', '2Chron', '2 Chron', '2Chr', '2 Chr', '2Ch', 'II Chronicles', 'Second Chronicles'],
    standalonePatterns: ['2 Chronicles', 'Second Chronicles', 'Second Book of Chronicles']
  },
  {
    canonicalId: 'Ezr',
    aliases: ['Ezra', 'Ezr', 'Ez'],
    standalonePatterns: ['Ezra', 'Book of Ezra']
  },
  {
    canonicalId: 'Neh',
    aliases: ['Nehemiah', 'Neh', 'Ne'],
    standalonePatterns: ['Nehemiah', 'Book of Nehemiah']
  },
  {
    canonicalId: 'Est',
    aliases: ['Esther', 'Esth', 'Est', 'Es'],
    standalonePatterns: ['Esther', 'Book of Esther']
  },

  // Wisdom Books
  {
    canonicalId: 'Job',
    aliases: ['Job', 'Jb'],
    standalonePatterns: ['Job', 'Book of Job']
  },
  {
    canonicalId: 'Psa',
    aliases: ['Psalms', 'Psalm', 'Psa', 'Ps', 'Pss', 'Psm'],
    standalonePatterns: ['Psalms', 'Book of Psalms', 'Psalter']
  },
  {
    canonicalId: 'Pro',
    aliases: ['Proverbs', 'Prov', 'Pro', 'Prv', 'Pr'],
    standalonePatterns: ['Proverbs', 'Book of Proverbs']
  },
  {
    canonicalId: 'Ecc',
    aliases: ['Ecclesiastes', 'Eccles', 'Eccl', 'Ecc', 'Ec', 'Qoh', 'Qoheleth'],
    standalonePatterns: ['Ecclesiastes', 'Book of Ecclesiastes']
  },
  {
    canonicalId: 'Son',
    aliases: ['Song of Solomon', 'Song of Songs', 'Songs', 'Song', 'SOS', 'SoS', 'SS', 'Can', 'Canticles'],
    standalonePatterns: ['Song of Solomon', 'Song of Songs', 'Canticles']
  },

  // Major Prophets
  {
    canonicalId: 'Isa',
    aliases: ['Isaiah', 'Isa', 'Is'],
    standalonePatterns: ['Isaiah', 'Book of Isaiah']
  },
  {
    canonicalId: 'Jer',
    aliases: ['Jeremiah', 'Jer', 'Je', 'Jr'],
    standalonePatterns: ['Jeremiah', 'Book of Jeremiah']
  },
  {
    canonicalId: 'Lam',
    aliases: ['Lamentations', 'Lam', 'La'],
    standalonePatterns: ['Lamentations', 'Book of Lamentations']
  },
  {
    canonicalId: 'Eze',
    aliases: ['Ezekiel', 'Ezek', 'Eze', 'Ezk'],
    standalonePatterns: ['Ezekiel', 'Book of Ezekiel']
  },
  {
    canonicalId: 'Dan',
    aliases: ['Daniel', 'Dan', 'Da', 'Dn'],
    standalonePatterns: ['Daniel', 'Book of Daniel']
  },

  // Minor Prophets
  {
    canonicalId: 'Hos',
    aliases: ['Hosea', 'Hos', 'Ho'],
    standalonePatterns: ['Hosea', 'Book of Hosea']
  },
  {
    canonicalId: 'Joe',
    aliases: ['Joel', 'Joe', 'Jl'],
    standalonePatterns: ['Joel', 'Book of Joel']
  },
  {
    canonicalId: 'Amo',
    aliases: ['Amos', 'Amo', 'Am'],
    standalonePatterns: ['Amos', 'Book of Amos']
  },
  {
    canonicalId: 'Oba',
    aliases: ['Obadiah', 'Obad', 'Oba', 'Ob'],
    standalonePatterns: ['Obadiah', 'Book of Obadiah']
  },
  {
    canonicalId: 'Jon',
    aliases: ['Jonah', 'Jon', 'Jnh'],
    standalonePatterns: ['Jonah', 'Book of Jonah']
  },
  {
    canonicalId: 'Mic',
    aliases: ['Micah', 'Mic', 'Mi'],
    standalonePatterns: ['Micah', 'Book of Micah']
  },
  {
    canonicalId: 'Nah',
    aliases: ['Nahum', 'Nah', 'Na'],
    standalonePatterns: ['Nahum', 'Book of Nahum']
  },
  {
    canonicalId: 'Hab',
    aliases: ['Habakkuk', 'Hab', 'Hb'],
    standalonePatterns: ['Habakkuk', 'Book of Habakkuk']
  },
  {
    canonicalId: 'Zep',
    aliases: ['Zephaniah', 'Zeph', 'Zep', 'Zp'],
    standalonePatterns: ['Zephaniah', 'Book of Zephaniah']
  },
  {
    canonicalId: 'Hag',
    aliases: ['Haggai', 'Hag', 'Hg'],
    standalonePatterns: ['Haggai', 'Book of Haggai']
  },
  {
    canonicalId: 'Zec',
    aliases: ['Zechariah', 'Zech', 'Zec', 'Zc'],
    standalonePatterns: ['Zechariah', 'Book of Zechariah']
  },
  {
    canonicalId: 'Mal',
    aliases: ['Malachi', 'Mal', 'Ml'],
    standalonePatterns: ['Malachi', 'Book of Malachi']
  },

  // ═══════════════════════════════════════════════════════════════
  // NEW TESTAMENT
  // ═══════════════════════════════════════════════════════════════

  // Gospels
  {
    canonicalId: 'Mat',
    aliases: ['Matthew', 'Matt', 'Mat', 'Mt'],
    standalonePatterns: ['Matthew', 'Gospel of Matthew', 'Gospel According to Matthew']
  },
  {
    canonicalId: 'Mar',
    aliases: ['Mark', 'Mar', 'Mk', 'Mrk'],
    standalonePatterns: ['Mark', 'Gospel of Mark', 'Gospel According to Mark']
  },
  {
    canonicalId: 'Luk',
    aliases: ['Luke', 'Luk', 'Lk', 'Lu'],
    standalonePatterns: ['Luke', 'Gospel of Luke', 'Gospel According to Luke']
  },
  {
    canonicalId: 'Joh',
    aliases: ['John', 'Joh', 'Jhn', 'Jn'],
    standalonePatterns: ['Gospel of John', 'Gospel According to John']
  },

  // History
  {
    canonicalId: 'Act',
    aliases: ['Acts', 'Act', 'Ac'],
    standalonePatterns: ['Acts', 'Acts of the Apostles']
  },

  // Pauline Epistles
  {
    canonicalId: 'Rom',
    aliases: ['Romans', 'Rom', 'Ro', 'Rm'],
    standalonePatterns: ['Romans', 'Epistle to the Romans']
  },
  {
    canonicalId: '1Co',
    aliases: ['1 Corinthians', '1Corinthians', '1Cor', '1 Cor', '1Co', '1 Co', 'I Corinthians', 'First Corinthians'],
    standalonePatterns: ['1 Corinthians', 'First Corinthians', 'First Epistle to the Corinthians']
  },
  {
    canonicalId: '2Co',
    aliases: ['2 Corinthians', '2Corinthians', '2Cor', '2 Cor', '2Co', '2 Co', 'II Corinthians', 'Second Corinthians'],
    standalonePatterns: ['2 Corinthians', 'Second Corinthians', 'Second Epistle to the Corinthians']
  },
  {
    canonicalId: 'Gal',
    aliases: ['Galatians', 'Gal', 'Ga'],
    standalonePatterns: ['Galatians', 'Epistle to the Galatians']
  },
  {
    canonicalId: 'Eph',
    aliases: ['Ephesians', 'Eph', 'Ephes'],
    standalonePatterns: ['Ephesians', 'Epistle to the Ephesians']
  },
  {
    canonicalId: 'Phi',
    aliases: ['Philippians', 'Philip', 'Phil', 'Phi', 'Php'],
    standalonePatterns: ['Philippians', 'Epistle to the Philippians']
  },
  {
    canonicalId: 'Col',
    aliases: ['Colossians', 'Col', 'Co'],
    standalonePatterns: ['Colossians', 'Epistle to the Colossians']
  },
  {
    canonicalId: '1Th',
    aliases: ['1 Thessalonians', '1Thessalonians', '1Thess', '1 Thess', '1Th', '1 Th', 'I Thessalonians', 'First Thessalonians'],
    standalonePatterns: ['1 Thessalonians', 'First Thessalonians', 'First Epistle to the Thessalonians']
  },
  {
    canonicalId: '2Th',
    aliases: ['2 Thessalonians', '2Thessalonians', '2Thess', '2 Thess', '2Th', '2 Th', 'II Thessalonians', 'Second Thessalonians'],
    standalonePatterns: ['2 Thessalonians', 'Second Thessalonians', 'Second Epistle to the Thessalonians']
  },
  {
    canonicalId: '1Ti',
    aliases: ['1 Timothy', '1Timothy', '1Tim', '1 Tim', '1Ti', '1 Ti', 'I Timothy', 'First Timothy'],
    standalonePatterns: ['1 Timothy', 'First Timothy', 'First Epistle to Timothy']
  },
  {
    canonicalId: '2Ti',
    aliases: ['2 Timothy', '2Timothy', '2Tim', '2 Tim', '2Ti', '2 Ti', 'II Timothy', 'Second Timothy'],
    standalonePatterns: ['2 Timothy', 'Second Timothy', 'Second Epistle to Timothy']
  },
  {
    canonicalId: 'Tit',
    aliases: ['Titus', 'Tit', 'Ti'],
    standalonePatterns: ['Titus', 'Epistle to Titus']
  },
  {
    canonicalId: 'Phm',
    aliases: ['Philemon', 'Philem', 'Phlm', 'Phm', 'Pm'],
    standalonePatterns: ['Philemon', 'Epistle to Philemon']
  },

  // General Epistles
  {
    canonicalId: 'Heb',
    aliases: ['Hebrews', 'Heb', 'He'],
    standalonePatterns: ['Hebrews', 'Epistle to the Hebrews']
  },
  {
    canonicalId: 'Jam',
    aliases: ['James', 'Jam', 'Jas', 'Jm'],
    standalonePatterns: ['James', 'Epistle of James']
  },
  {
    canonicalId: '1Pe',
    aliases: ['1 Peter', '1Peter', '1Pet', '1 Pet', '1Pe', '1 Pe', '1Pt', 'I Peter', 'First Peter'],
    standalonePatterns: ['1 Peter', 'First Peter', 'First Epistle of Peter']
  },
  {
    canonicalId: '2Pe',
    aliases: ['2 Peter', '2Peter', '2Pet', '2 Pet', '2Pe', '2 Pe', '2Pt', 'II Peter', 'Second Peter'],
    standalonePatterns: ['2 Peter', 'Second Peter', 'Second Epistle of Peter']
  },
  {
    canonicalId: '1Jo',
    aliases: ['1 John', '1John', '1Joh', '1 Joh', '1Jo', '1 Jo', '1Jn', '1 Jn', 'I John', 'First John'],
    standalonePatterns: ['1 John', 'First John', 'First Epistle of John']
  },
  {
    canonicalId: '2Jo',
    aliases: ['2 John', '2John', '2Joh', '2 Joh', '2Jo', '2 Jo', '2Jn', '2 Jn', 'II John', 'Second John'],
    standalonePatterns: ['2 John', 'Second John', 'Second Epistle of John']
  },
  {
    canonicalId: '3Jo',
    aliases: ['3 John', '3John', '3Joh', '3 Joh', '3Jo', '3 Jo', '3Jn', '3 Jn', 'III John', 'Third John'],
    standalonePatterns: ['3 John', 'Third John', 'Third Epistle of John']
  },
  {
    canonicalId: 'Jud',
    aliases: ['Jude', 'Jud', 'Jd'],
    standalonePatterns: ['Jude', 'Epistle of Jude']
  },

  // Revelation
  {
    canonicalId: 'Rev',
    aliases: ['Revelation', 'Rev', 'Re', 'Rv', 'Apocalypse'],
    standalonePatterns: ['Revelation', 'Book of Revelation', 'Revelation of John', 'Apocalypse']
  }
];

/**
 * Get a book mapping by canonical ID
 */
export function getBookMappingEN(canonicalId: string): BookMapping | undefined {
  return BOOK_MAPPINGS_EN.find(mapping => mapping.canonicalId === canonicalId);
}

/**
 * Get all canonical book IDs
 */
export function getAllBookIdsEN(): string[] {
  return BOOK_MAPPINGS_EN.map(mapping => mapping.canonicalId);
}
