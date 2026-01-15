import type { BookMapping } from '../types';

export const BOOK_MAPPINGS_EN: BookMapping[] = [
  // ═══════════════════════════════════════════════════════════════
  // OLD TESTAMENT
  // ═══════════════════════════════════════════════════════════════

  {
    canonicalId: 'Gen',
    aliases: ['Genesis', 'Gen.', 'Gen', 'Ge.', 'Ge', 'Gn'],
    standalonePatterns: ['The Book of Genesis', 'First Book of Moses']
  },
  {
    canonicalId: 'Exo',
    aliases: ['Exodus', 'Exod.', 'Exod', 'Ex.', 'Ex'],
    standalonePatterns: ['The Book of Exodus', 'Second Book of Moses']
  },
  {
    canonicalId: 'Lev',
    aliases: ['Leviticus', 'Lev.', 'Lev', 'Le.', 'Le', 'Lv'],
    standalonePatterns: ['The Book of Leviticus', 'Third Book of Moses']
  },
  {
    canonicalId: 'Num',
    aliases: ['Numbers', 'Num.', 'Num', 'Nu.', 'Nu', 'Nm'],
    standalonePatterns: ['The Book of Numbers', 'Fourth Book of Moses']
  },
  {
    canonicalId: 'Deu',
    aliases: ['Deuteronomy', 'Deut.', 'Deut', 'Deu.', 'Deu', 'Dt.', 'Dt'],
    standalonePatterns: ['The Book of Deuteronomy', 'Fifth Book of Moses']
  },
  {
    canonicalId: 'Jos',
    aliases: ['Joshua', 'Josh.', 'Josh', 'Jos.', 'Jos'],
    standalonePatterns: ['The Book of Joshua']
  },
  {
    canonicalId: 'Jdg',
    aliases: ['Judges', 'Judg.', 'Judg', 'Jdgs.', 'Jdgs', 'Jg.', 'Jg'],
    standalonePatterns: ['The Book of Judges']
  },
  {
    canonicalId: 'Rut',
    aliases: ['Ruth', 'Rut.', 'Rut', 'Ru.', 'Ru'],
    standalonePatterns: ['The Book of Ruth']
  },
  {
    canonicalId: '1Sam',
    aliases: ['1 Samuel', '1. Samuel', '1Samuel', '1 Sam.', '1 Sam', '1Sam.', 'I Sam.', 'I Sam', 'ISam', '1Sa.', '1Sa', '1S.'],
    standalonePatterns: ['The First Book of Samuel']
  },
  {
    canonicalId: '2Sam',
    aliases: ['2 Samuel', '2. Samuel', '2Samuel', '2 Sam.', '2 Sam', '2Sam.', 'II Sam.', 'II Sam', 'IISam', '2Sa.', '2Sa', '2S.'],
    standalonePatterns: ['The Second Book of Samuel']
  },
  {
    canonicalId: '1Kgs',
    aliases: ['1 Kings', '1. Kings', '1Kings', '1 Kgs.', '1 Kgs', '1Kgs.', 'I Kings', 'I Kgs.', 'I Kgs', '1Ki.', '1Ki'],
    standalonePatterns: ['The First Book of Kings']
  },
  {
    canonicalId: '2Kgs',
    aliases: ['2 Kings', '2. Kings', '2Kings', '2 Kgs.', '2 Kgs', '2Kgs.', 'II Kings', 'II Kgs.', 'II Kgs', '2Ki.', '2Ki'],
    standalonePatterns: ['The Second Book of Kings']
  },
  {
    canonicalId: '1Chr',
    aliases: ['1 Chronicles', '1. Chronicles', '1Chronicles', '1 Chron.', '1 Chron', '1Chr.', '1Chr', 'I Chron', 'I Chr', '1Ch'],
    standalonePatterns: ['The First Book of Chronicles']
  },
  {
    canonicalId: '2Chr',
    aliases: ['2 Chronicles', '2. Chronicles', '2Chronicles', '2 Chron.', '2 Chron', '2Chr.', '2Chr', 'II Chron', 'II Chr', '2Ch'],
    standalonePatterns: ['The Second Book of Chronicles']
  },
  {
    canonicalId: 'Ezr',
    aliases: ['Ezra', 'Ezr.', 'Ezr', 'Ez'],
    standalonePatterns: ['The Book of Ezra']
  },
  {
    canonicalId: 'Neh',
    aliases: ['Nehemiah', 'Neh.', 'Neh', 'Ne'],
    standalonePatterns: ['The Book of Nehemiah']
  },
  {
    canonicalId: 'Est',
    aliases: ['Esther', 'Esth.', 'Esth', 'Est.', 'Est', 'Es'],
    standalonePatterns: ['The Book of Esther']
  },
  {
    canonicalId: 'Job',
    aliases: ['Job', 'Jb.', 'Jb'],
    standalonePatterns: ['The Book of Job']
  },
  {
    canonicalId: 'Psa',
    aliases: ['Psalms', 'Psalm', 'Psa.', 'Pss.', 'Pss', 'Ps.', 'Ps'],
    standalonePatterns: ['The Book of Psalms', 'The Psalter']
  },
  {
    canonicalId: 'Pro',
    aliases: ['Proverbs', 'Prov.', 'Prov', 'Pr.', 'Pr'],
    standalonePatterns: ['The Proverbs of Solomon', 'The Book of Proverbs']
  },
  {
    canonicalId: 'Ecc',
    aliases: ['Ecclesiastes', 'Eccl.', 'Eccl', 'Ecc.', 'Ecc', 'Qoheleth', 'Qoh'],
    standalonePatterns: ['Ecclesiastes', 'The Preacher', 'Qoheleth']
  },
  {
    canonicalId: 'Sng',
    aliases: ['Song of Solomon', 'Song of Songs', 'Canticles', 'Song.', 'Song', 'Cant.', 'Cant', 'So.', 'So'],
    standalonePatterns: ['The Song of Solomon', 'Song of Songs', 'Canticle of Canticles']
  },
  {
    canonicalId: 'Isa',
    aliases: ['Isaiah', 'Isa.', 'Isa', 'Is.', 'Is'],
    standalonePatterns: ['The Book of Isaiah']
  },
  {
    canonicalId: 'Jer',
    aliases: ['Jeremiah', 'Jer.', 'Jer', 'Je.', 'Je'],
    standalonePatterns: ['The Book of Jeremiah']
  },
  {
    canonicalId: 'Lam',
    aliases: ['Lamentations', 'Lam.', 'Lam', 'La.', 'La'],
    standalonePatterns: ['The Lamentations of Jeremiah']
  },
  {
    canonicalId: 'Eze',
    aliases: ['Ezekiel', 'Ezek.', 'Ezek', 'Eze.', 'Eze', 'Ek.'],
    standalonePatterns: ['The Book of Ezekiel']
  },
  {
    canonicalId: 'Dan',
    aliases: ['Daniel', 'Dan.', 'Dan', 'Da.', 'Da'],
    standalonePatterns: ['The Book of Daniel']
  },
  {
    canonicalId: 'Hos',
    aliases: ['Hosea', 'Hos.', 'Hos', 'Ho.'],
    standalonePatterns: ['The Book of Hosea']
  },
  {
    canonicalId: 'Jol',
    aliases: ['Joel', 'Joe.', 'Joe', 'Jl.', 'Jl'],
    standalonePatterns: ['The Book of Joel']
  },
  {
    canonicalId: 'Amo',
    aliases: ['Amos', 'Amos.', 'Am.', 'Am'],
    standalonePatterns: ['The Book of Amos']
  },
  {
    canonicalId: 'Oba',
    aliases: ['Obadiah', 'Obad.', 'Obad', 'Ob.', 'Ob'],
    standalonePatterns: ['The Book of Obadiah']
  },
  {
    canonicalId: 'Jon',
    aliases: ['Jonah', 'Jonah.', 'Jon.', 'Jon'],
    standalonePatterns: ['The Book of Jonah']
  },
  {
    canonicalId: 'Mic',
    aliases: ['Micah', 'Mic.', 'Mic', 'Mi.'],
    standalonePatterns: ['The Book of Micah']
  },
  {
    canonicalId: 'Nah',
    aliases: ['Nahum', 'Nah.', 'Nah', 'Na.'],
    standalonePatterns: ['The Book of Nahum']
  },
  {
    canonicalId: 'Hab',
    aliases: ['Habakkuk', 'Hab.', 'Hab', 'Hb.'],
    standalonePatterns: ['The Book of Habakkuk']
  },
  {
    canonicalId: 'Zep',
    aliases: ['Zephaniah', 'Zeph.', 'Zeph', 'Zp.', 'Zp'],
    standalonePatterns: ['The Book of Zephaniah']
  },
  {
    canonicalId: 'Hag',
    aliases: ['Haggai', 'Hagg.', 'Hagg', 'Hag.', 'Hag', 'Hg.'],
    standalonePatterns: ['The Book of Haggai']
  },
  {
    canonicalId: 'Zec',
    aliases: ['Zechariah', 'Zech.', 'Zech', 'Zec.', 'Zec'],
    standalonePatterns: ['The Book of Zechariah']
  },
  {
    canonicalId: 'Mal',
    aliases: ['Maleachi', 'Malachi', 'Mal.', 'Mal', 'Ml.'],
    standalonePatterns: ['The Book of Malachi']
  },

  // ═══════════════════════════════════════════════════════════════
  // NEW TESTAMENT
  // ═══════════════════════════════════════════════════════════════

  {
    canonicalId: 'Matt',
    aliases: ['Matthew', 'Matt.', 'Matt', 'Mat.', 'Mat', 'Mt.', 'Mt'],
    standalonePatterns: ['Gospel according to Matthew', 'The Gospel of Matthew']
  },
  {
    canonicalId: 'Mark',
    aliases: ['Mark', 'Mark.', 'Mk.', 'Mk', 'Mrk.'],
    standalonePatterns: ['Gospel according to Mark', 'The Gospel of Mark']
  },
  {
    canonicalId: 'Luke',
    aliases: ['Luke', 'Luke.', 'Luk.', 'Luk', 'Lk.', 'Lk'],
    standalonePatterns: ['Gospel according to Luke', 'The Gospel of Luke']
  },
  {
    canonicalId: 'John',
    aliases: ['Johannes', 'John', 'John.', 'Joh.', 'Joh', 'Jn.', 'Jn'],
    standalonePatterns: ['Gospel according to John', 'The Gospel of John']
  },
  {
    canonicalId: 'Acts',
    aliases: ['Acts', 'Acts.', 'Act.', 'Act', 'Ac.'],
    standalonePatterns: ['The Acts of the Apostles']
  },
  {
    canonicalId: 'Rom',
    aliases: ['Romans', 'Rom.', 'Rom', 'Ro.', 'Ro', 'Rm.'],
    standalonePatterns: ['Epistle to the Romans']
  },
  {
    canonicalId: '1Cor',
    aliases: ['1 Corinthians', '1. Corinthians', '1Corinthians', '1 Cor.', '1 Cor', '1Cor.', '1Cor', 'I Cor.', 'I Cor', 'ICor'],
    standalonePatterns: ['First Epistle to the Corinthians']
  },
  {
    canonicalId: '2Cor',
    aliases: ['2 Corinthians', '2. Corinthians', '2Corinthians', '2 Cor.', '2 Cor', '2Cor.', '2Cor', 'II Cor.', 'II Cor', 'IICor'],
    standalonePatterns: ['Second Epistle to the Corinthians']
  },
  {
    canonicalId: 'Gal',
    aliases: ['Galatians', 'Gal.', 'Gal', 'Ga.'],
    standalonePatterns: ['Epistle to the Galatians']
  },
  {
    canonicalId: 'Eph',
    aliases: ['Ephesians', 'Ephes.', 'Ephes', 'Eph.', 'Eph'],
    standalonePatterns: ['Epistle to the Ephesians']
  },
  {
    canonicalId: 'Phil',
    aliases: ['Philipper', 'Philippians', 'Phil.', 'Phil', 'Php.', 'Php'],
    standalonePatterns: ['Epistle to the Philippians']
  },
  {
    canonicalId: 'Col',
    aliases: ['Kolosser', 'Colossians', 'Col.', 'Col', 'Cl.'],
    standalonePatterns: ['Epistle to the Colossians']
  },
  {
    canonicalId: '1Thess',
    aliases: ['1 Thessalonians', '1. Thessalonians', '1Thessalonians', '1 Thess.', '1 Thess', '1Thess.', 'I Thess.', 'I Thess', '1Th.', '1Th'],
    standalonePatterns: ['First Epistle to the Thessalonians']
  },
  {
    canonicalId: '2Thess',
    aliases: ['2 Thessalonians', '2. Thessalonians', '2Thessalonians', '2 Thess.', '2 Thess', '2Thess.', 'II Thess.', 'II Thess', '2Th.', '2Th'],
    standalonePatterns: ['Second Epistle to the Thessalonians']
  },
  {
    canonicalId: '1Tim',
    aliases: ['1 Timothy', '1. Timothy', '1Timothy', '1 Tim.', '1 Tim', '1Tim.', 'I Tim.', 'I Tim', '1Ti.', '1Ti'],
    standalonePatterns: ['First Epistle to Timothy']
  },
  {
    canonicalId: '2Tim',
    aliases: ['2 Timothy', '2. Timothy', '2Timothy', '2 Tim.', '2 Tim', '2Tim.', 'II Tim.', 'II Tim', '2Ti.', '2Ti'],
    standalonePatterns: ['Second Epistle to Timothy']
  },
  {
    canonicalId: 'Tit',
    aliases: ['Titus', 'Tit.', 'Tit', 'Ti.'],
    standalonePatterns: ['Epistle to Titus']
  },
  {
    canonicalId: 'Phm',
    aliases: ['Philemon', 'Philem.', 'Philem', 'Phm.', 'Phm', 'Pm.'],
    standalonePatterns: ['Epistle to Philemon']
  },
  {
    canonicalId: 'Heb',
    aliases: ['Hebrews', 'Hebr.', 'Hebr', 'Heb.', 'Heb'],
    standalonePatterns: ['Epistle to the Hebrews']
  },
  {
    canonicalId: 'Jas',
    aliases: ['Jakobus', 'James', 'James.', 'Jas.', 'Jas', 'Ja.'],
    standalonePatterns: ['The Epistle of James']
  },
  {
    canonicalId: '1Pet',
    aliases: ['1 Peter', '1. Peter', '1Peter', '1 Pet.', '1 Pet', '1Pet.', 'I Pet.', 'I Pet', '1Pe.', '1Pe', '1Pt.'],
    standalonePatterns: ['First Epistle of Peter']
  },
  {
    canonicalId: '2Pet',
    aliases: ['2 Peter', '2. Peter', '2Peter', '2 Pet.', '2 Pet', '2Pet.', 'II Pet.', 'II Pet', '2Pe.', '2Pe', '2Pt.'],
    standalonePatterns: ['Second Epistle of Peter']
  },
  {
    canonicalId: '1John',
    aliases: ['1 John', '1. John', '1John', '1 Joh.', '1 Joh', '1Joh.', 'I John', 'I Joh', '1Jn.', '1Jn', '1Jo.'],
    standalonePatterns: ['First Epistle of John']
  },
  {
    canonicalId: '2John',
    aliases: ['2 John', '2. John', '2John', '2 Joh.', '2 Joh', '2Joh.', 'II John', 'II Joh', '2Jn.', '2Jn', '2Jo.'],
    standalonePatterns: ['Second Epistle of John']
  },
  {
    canonicalId: '3John',
    aliases: ['3 John', '3. John', '3John', '3 Joh.', '3 Joh', '3Joh.', 'III John', 'III Joh', '3Jn.', '3Jn', '3Jo.'],
    standalonePatterns: ['Third Epistle of John']
  },
  {
    canonicalId: 'Jud',
    aliases: ['Judas', 'Jude', 'Jude.', 'Jud.', 'Jud'],
    standalonePatterns: ['The Epistle of Jude']
  },
  {
    canonicalId: 'Rev',
    aliases: ['Offenbarung', 'Revelation', 'Rev.', 'Rev', 'Rv.', 'Apocalypse', 'Apoc.'],
    standalonePatterns: ['The Revelation to John', 'The Book of Revelation', 'The Apocalypse']
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
