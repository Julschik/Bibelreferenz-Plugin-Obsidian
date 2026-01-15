import type { BookMapping } from '../types';

export const BOOK_MAPPINGS_FR: BookMapping[] = [
  // ═══════════════════════════════════════════════════════════════
  // ANCIEN TESTAMENT
  // ═══════════════════════════════════════════════════════════════

  {
    canonicalId: 'Gn',
    aliases: ['Genèse', 'Genese', 'Gen.', 'Gen', 'Gn.', 'Gn'],
    standalonePatterns: ['Livre de la Genèse', 'La Genèse']
  },
  {
    canonicalId: 'Ex',
    aliases: ['Exode', 'Exod.', 'Exod', 'Ex.', 'Ex'],
    standalonePatterns: ["Livre de l'Exode", "L'Exode"]
  },
  {
    canonicalId: 'Lv',
    aliases: ['Lévitique', 'Levitique', 'Lév.', 'Lev.', 'Lév', 'Lev', 'Lv.', 'Lv'],
    standalonePatterns: ['Livre du Lévitique', 'Le Lévitique']
  },
  {
    canonicalId: 'Nb',
    aliases: ['Nombres', 'Nomb.', 'Nom.', 'Nb.', 'Nb'],
    standalonePatterns: ['Livre des Nombres', 'Les Nombres']
  },
  {
    canonicalId: 'Dt',
    aliases: ['Deutéronome', 'Deuteronome', 'Deut.', 'Deut', 'Dt.', 'Dt'],
    standalonePatterns: ['Livre du Deutéronome', 'Le Deutéronome']
  },
  {
    canonicalId: 'Jos',
    aliases: ['Josué', 'Josue', 'Jos.', 'Jos'],
    standalonePatterns: ['Livre de Josué']
  },
  {
    canonicalId: 'Jg',
    aliases: ['Juges', 'Jug.', 'Jg.', 'Jg'],
    standalonePatterns: ['Livre des Juges']
  },
  {
    canonicalId: 'Rt',
    aliases: ['Ruth', 'Rut', 'Rt.', 'Rt'],
    standalonePatterns: ['Livre de Ruth']
  },
  {
    canonicalId: '1S',
    aliases: ['1 Samuel', '1. Samuel', '1Samuel', 'I Samuel', '1 Sam.', '1 Sam', '1Sam', 'I Sam', '1S.', '1S'],
    standalonePatterns: ['Premier Livre de Samuel']
  },
  {
    canonicalId: '2S',
    aliases: ['2 Samuel', '2. Samuel', '2Samuel', 'II Samuel', '2 Sam.', '2 Sam', '2Sam', 'II Sam', '2S.', '2S'],
    standalonePatterns: ['Second Livre de Samuel']
  },
  {
    canonicalId: '1R',
    aliases: ['1 Rois', '1. Rois', '1Rois', 'I Rois', '1 R.', '1 R', '1R.', '1R', 'I R'],
    standalonePatterns: ['Premier Livre des Rois']
  },
  {
    canonicalId: '2R',
    aliases: ['2 Rois', '2. Rois', '2Rois', 'II Rois', '2 R.', '2 R', '2R.', '2R', 'II R'],
    standalonePatterns: ['Second Livre des Rois']
  },
  {
    canonicalId: '1Ch',
    aliases: ['1 Chroniques', '1. Chroniques', 'I Chroniques', '1 Chr.', '1 Chr', '1Chr', 'I Chr', '1Ch', '1C'],
    standalonePatterns: ['Premier Livre des Chroniques']
  },
  {
    canonicalId: '2Ch',
    aliases: ['2 Chroniques', '2. Chroniques', 'II Chroniques', '2 Chr.', '2 Chr', '2Chr', 'II Chr', '2Ch', '2C'],
    standalonePatterns: ['Second Livre des Chroniques']
  },
  {
    canonicalId: 'Esd',
    aliases: ['Esdras', 'Esd.', 'Esd'],
    standalonePatterns: ["Livre d'Esdras"]
  },
  {
    canonicalId: 'Ne',
    aliases: ['Néhémie', 'Nehemie', 'Néh.', 'Neh.', 'Néh', 'Neh', 'Né', 'Ne'],
    standalonePatterns: ['Livre de Néhémie']
  },
  {
    canonicalId: 'Est',
    aliases: ['Esther', 'Est.', 'Est'],
    standalonePatterns: ["Livre d'Esther"]
  },
  {
    canonicalId: 'Jb',
    aliases: ['Job', 'Jb.', 'Jb'],
    standalonePatterns: ['Livre de Job']
  },
  {
    canonicalId: 'Ps',
    aliases: ['Psaumes', 'Psaume', 'Psa.', 'Ps.', 'Ps'],
    standalonePatterns: ['Livre des Psaumes', 'Le Psautier']
  },
  {
    canonicalId: 'Pr',
    aliases: ['Proverbes', 'Prov.', 'Prov', 'Pr.', 'Pr'],
    standalonePatterns: ['Livre des Proverbes']
  },
  {
    canonicalId: 'Ec',
    aliases: ['Ecclésiaste', 'Ecclesiaste', 'Qohelet', 'Eccl.', 'Eccl', 'Ec.', 'Ec', 'Qo'],
    standalonePatterns: ["L'Ecclésiaste", "Le Qohelet"]
  },
  {
    canonicalId: 'Ct',
    aliases: ['Cantique des Cantiques', 'Cantique', 'Cant.', 'Cant', 'Ct.', 'Ct'],
    standalonePatterns: ['Le Cantique des Cantiques']
  },
  {
    canonicalId: 'Es',
    aliases: ['Ésaïe', 'Esaie', 'Isaïe', 'Isaié', 'És.', 'Es.', 'És', 'Es', 'Is.', 'Is'],
    standalonePatterns: ["Livre d'Ésaïe", "Livre d'Isaïe"]
  },
  {
    canonicalId: 'Jr',
    aliases: ['Jérémie', 'Jeremie', 'Jér.', 'Jer.', 'Jér', 'Jer', 'Jr.', 'Jr'],
    standalonePatterns: ['Livre de Jérémie']
  },
  {
    canonicalId: 'Lm',
    aliases: ['Lamentations', 'Lam.', 'Lam', 'Lm.', 'Lm'],
    standalonePatterns: ['Les Lamentations de Jérémie']
  },
  {
    canonicalId: 'Ez',
    aliases: ['Ézéchiel', 'Ezechiel', 'Éz.', 'Ez.', 'Éz', 'Ez'],
    standalonePatterns: ["Livre d'Ézéchiel"]
  },
  {
    canonicalId: 'Dn',
    aliases: ['Daniel', 'Dan.', 'Dan', 'Dn.', 'Dn'],
    standalonePatterns: ['Livre de Daniel']
  },
  {
    canonicalId: 'Os',
    aliases: ['Osée', 'Osee', 'Os.', 'Os'],
    standalonePatterns: ["Livre d'Osée"]
  },
  {
    canonicalId: 'Jl',
    aliases: ['Joël', 'Joel', 'Jl.', 'Jl'],
    standalonePatterns: ['Livre de Joël']
  },
  {
    canonicalId: 'Am',
    aliases: ['Amos', 'Am.', 'Am'],
    standalonePatterns: ["Livre d'Amos"]
  },
  {
    canonicalId: 'Ab',
    aliases: ['Abdias', 'Abd.', 'Abd', 'Ab.', 'Ab'],
    standalonePatterns: ["Livre d'Abdias"]
  },
  {
    canonicalId: 'Jon',
    aliases: ['Jonas', 'Jon.', 'Jon'],
    standalonePatterns: ['Livre de Jonas']
  },
  {
    canonicalId: 'Mi',
    aliases: ['Michée', 'Michee', 'Mi.', 'Mi'],
    standalonePatterns: ['Livre de Michée']
  },
  {
    canonicalId: 'Na',
    aliases: ['Nahum', 'Nah.', 'Nah', 'Na.', 'Na'],
    standalonePatterns: ['Livre de Nahum']
  },
  {
    canonicalId: 'Ha',
    aliases: ['Habacuc', 'Hab.', 'Hab', 'Ha.', 'Ha'],
    standalonePatterns: ["Livre d'Habacuc"]
  },
  {
    canonicalId: 'So',
    aliases: ['Sophonie', 'Soph.', 'Soph', 'So.', 'So'],
    standalonePatterns: ['Livre de Sophonie']
  },
  {
    canonicalId: 'Ag',
    aliases: ['Aggée', 'Aggee', 'Agg.', 'Agg', 'Ag.', 'Ag'],
    standalonePatterns: ["Livre d'Aggée"]
  },
  {
    canonicalId: 'Za',
    aliases: ['Zacharie', 'Zach.', 'Zach', 'Za.', 'Za'],
    standalonePatterns: ['Livre de Zacharie']
  },
  {
    canonicalId: 'Ml',
    aliases: ['Malachie', 'Mal.', 'Mal', 'Ml.', 'Ml'],
    standalonePatterns: ['Livre de Malachie']
  },

  // ═══════════════════════════════════════════════════════════════
  // NOUVEAU TESTAMENT
  // ═══════════════════════════════════════════════════════════════

  {
    canonicalId: 'Mt',
    aliases: ['Matthieu', 'Matt.', 'Matt', 'Mt.', 'Mt'],
    standalonePatterns: ["Évangile selon Matthieu", "L'Évangile selon Saint Matthieu"]
  },
  {
    canonicalId: 'Mc',
    aliases: ['Marc', 'Mc.', 'Mc'],
    standalonePatterns: ["Évangile selon Marc", "L'Évangile selon Saint Marc"]
  },
  {
    canonicalId: 'Lc',
    aliases: ['Luc', 'Lc.', 'Lc'],
    standalonePatterns: ["Évangile selon Luc", "L'Évangile selon Saint Luc"]
  },
  {
    canonicalId: 'Jn',
    aliases: ['Jean', 'Jn.', 'Jn'],
    standalonePatterns: ["Évangile selon Jean", "L'Évangile selon Saint Jean"]
  },
  {
    canonicalId: 'Ac',
    aliases: ['Actes des Apôtres', 'Actes', 'Act.', 'Act', 'Ac.', 'Ac'],
    standalonePatterns: ['Les Actes des Apôtres']
  },
  {
    canonicalId: 'Rm',
    aliases: ['Romains', 'Rom.', 'Rom', 'Rm.', 'Rm'],
    standalonePatterns: ["Épître aux Romains", "L'Épître aux Romains"]
  },
  {
    canonicalId: '1Co',
    aliases: ['1 Corinthiens', '1. Corinthiens', 'I Corinthiens', '1 Cor.', '1 Cor', '1Cor', 'I Cor', '1Co.', '1Co'],
    standalonePatterns: ['Première Épître aux Corinthiens']
  },
  {
    canonicalId: '2Co',
    aliases: ['2 Corinthiens', '2. Corinthiens', 'II Corinthiens', '2 Cor.', '2 Cor', '2Cor', 'II Cor', '2Co.', '2Co'],
    standalonePatterns: ['Seconde Épître aux Corinthiens']
  },
  {
    canonicalId: 'Ga',
    aliases: ['Galates', 'Gal.', 'Gal', 'Ga.', 'Ga'],
    standalonePatterns: ["Épître aux Galates", "L'Épître aux Galates"]
  },
  {
    canonicalId: 'Ep',
    aliases: ['Éphésiens', 'Ephesiens', 'Éph.', 'Eph.', 'Éph', 'Eph', 'Ép.', 'Ep.', 'Ép', 'Ep'],
    standalonePatterns: ["Épître aux Éphésiens", "L'Épître aux Éphésiens"]
  },
  {
    canonicalId: 'Ph',
    aliases: ['Philippiens', 'Phil.', 'Phil', 'Ph.', 'Ph'],
    standalonePatterns: ["Épître aux Philippiens", "L'Épître aux Philippiens"]
  },
  {
    canonicalId: 'Col',
    aliases: ['Colossiens', 'Col.', 'Col'],
    standalonePatterns: ["Épître aux Colossenses", "L'Épître aux Colossiens"]
  },
  {
    canonicalId: '1Th',
    aliases: ['1 Thessaloniciens', '1. Thessaloniciens', 'I Thessaloniciens', '1 Thess.', '1 Thess', '1Th.', '1Th', 'I Th'],
    standalonePatterns: ['Première Épître aux Thessaloniciens']
  },
  {
    canonicalId: '2Th',
    aliases: ['2 Thessaloniciens', '2. Thessaloniciens', 'II Thessaloniciens', '2 Thess.', '2 Thess', '2Th.', '2Th', 'II Th'],
    standalonePatterns: ['Seconde Épître aux Thessaloniciens']
  },
  {
    canonicalId: '1Tm',
    aliases: ['1 Timothée', '1 Timothee', 'I Timothée', '1 Tim.', '1 Tim', '1Tm.', '1Tm', 'I Tm'],
    standalonePatterns: ['Première Épître à Timothée']
  },
  {
    canonicalId: '2Tm',
    aliases: ['2 Timothée', '2 Timothee', 'II Timothée', '2 Tim.', '2 Tim', '2Tm.', '2Tm', 'II Tm'],
    standalonePatterns: ['Seconde Épître à Timothée']
  },
  {
    canonicalId: 'Tt',
    aliases: ['Tite', 'Tit.', 'Tit', 'Tt.', 'Tt'],
    standalonePatterns: ["Épître à Tite"]
  },
  {
    canonicalId: 'Phm',
    aliases: ['Philémon', 'Philemon', 'Phm.', 'Phm', 'Philem.', 'Philem'],
    standalonePatterns: ["Épître à Philémon"]
  },
  {
    canonicalId: 'He',
    aliases: ['Hébreux', 'Hebreux', 'Héb.', 'Heb.', 'Héb', 'Heb', 'He.', 'He'],
    standalonePatterns: ["Épître aux Hébreux", "L'Épître aux Hébreux"]
  },
  {
    canonicalId: 'Jc',
    aliases: ['Jacques', 'Jacq.', 'Jacq', 'Jac.', 'Jc.', 'Jc'],
    standalonePatterns: ["Épître de Jacques"]
  },
  {
    canonicalId: '1P',
    aliases: ['1 Pierre', '1. Pierre', 'I Pierre', '1 Pi.', '1 Pi', '1P.', '1P', 'I P'],
    standalonePatterns: ['Première Épître de Pierre']
  },
  {
    canonicalId: '2P',
    aliases: ['2 Pierre', '2. Pierre', 'II Pierre', '2 Pi.', '2 Pi', '2P.', '2P', 'II P'],
    standalonePatterns: ['Seconde Épître de Pierre']
  },
  {
    canonicalId: '1Jn',
    aliases: ['1 Jean', '1. Jean', 'I Jean', '1 Jn.', '1 Jn', 'I Jn'],
    standalonePatterns: ['Première Épître de Jean']
  },
  {
    canonicalId: '2Jn',
    aliases: ['2 Jean', '2. Jean', 'II Jean', '2 Jn.', '2 Jn', 'II Jn'],
    standalonePatterns: ['Seconde Épître de Jean']
  },
  {
    canonicalId: '3Jn',
    aliases: ['3 Jean', '3. Jean', 'III Jean', '3 Jn.', '3 Jn', 'III Jn'],
    standalonePatterns: ['Troisième Épître de Jean']
  },
  {
    canonicalId: 'Jd',
    aliases: ['Jude', 'Jd.', 'Jd'],
    standalonePatterns: ["Épître de Jude"]
  },
  {
    canonicalId: 'Ap',
    aliases: ['Apocalypse', 'Apoc.', 'Apoc', 'Ap.', 'Ap', 'Rev.'],
    standalonePatterns: ["L'Apocalypse", "L'Apocalypse de Jean"]
  }
];