import type { BookMapping } from '../types';

export const BOOK_MAPPINGS_PT: BookMapping[] = [
  // ═══════════════════════════════════════════════════════════════
  // ANTIGO TESTAMENTO
  // ═══════════════════════════════════════════════════════════════

  {
    canonicalId: 'Gn',
    aliases: ['Gênesis', 'Génesis', 'Gên.', 'Gén.', 'Gen.', 'Gen', 'Gn.', 'Gn'],
    standalonePatterns: ['Primeiro Livro de Moisés', 'Livro do Gênesis', 'Livro do Génesis']
  },
  {
    canonicalId: 'Êx',
    aliases: ['Êxodo', 'Éxodo', 'Êxo.', 'Éxo.', 'Exo.', 'Êx.', 'Éx.', 'Ex.', 'Êx', 'Éx', 'Ex'],
    standalonePatterns: ['Segundo Livro de Moisés', 'Livro do Êxodo', 'Livro do Éxodo']
  },
  {
    canonicalId: 'Lv',
    aliases: ['Levítico', 'Levitico', 'Lev.', 'Lev', 'Lv.', 'Lv'],
    standalonePatterns: ['Terceiro Livro de Moisés', 'Livro de Levítico']
  },
  {
    canonicalId: 'Nm',
    aliases: ['Números', 'Numeros', 'Núm.', 'Num.', 'Núm', 'Num', 'Nm.', 'Nm'],
    standalonePatterns: ['Quarto Livro de Moisés', 'Livro de Números']
  },
  {
    canonicalId: 'Dt',
    aliases: ['Deuteronômio', 'Deuteronómio', 'Deut.', 'Deut', 'Dt.', 'Dt'],
    standalonePatterns: ['Quinto Livro de Moisés', 'Livro de Deuteronômio']
  },
  {
    canonicalId: 'Jos',
    aliases: ['Josué', 'Josue', 'Jos.', 'Jos'],
    standalonePatterns: ['Livro de Josué']
  },
  {
    canonicalId: 'Jz',
    aliases: ['Juízes', 'Juizes', 'Juiz.', 'Jz.', 'Jz'],
    standalonePatterns: ['Livro de Juízes']
  },
  {
    canonicalId: 'Rt',
    aliases: ['Rute', 'Ruth', 'Rt.', 'Rt'],
    standalonePatterns: ['Livro de Rute']
  },
  {
    canonicalId: '1Sam',
    aliases: ['1 Samuel', '1. Samuel', '1ª Samuel', '1 Samuel', '1Sam.', '1 Sam.', '1 Sam', 'I Samuel', 'I Sam', '1S.'],
    standalonePatterns: ['Primeiro Livro de Samuel']
  },
  {
    canonicalId: '2Sam',
    aliases: ['2 Samuel', '2. Samuel', '2ª Samuel', '2 Samuel', '2Sam.', '2 Sam.', '2 Sam', 'II Samuel', 'II Sam', '2S.'],
    standalonePatterns: ['Segundo Livro de Samuel']
  },
  {
    canonicalId: '1Reis',
    aliases: ['1 Reis', '1. Reis', '1ª Reis', '1 Reis', '1Re.', '1 Re.', '1 Re', 'I Reis', 'I Re', '1R.'],
    standalonePatterns: ['Primeiro Livro dos Reis']
  },
  {
    canonicalId: '2Reis',
    aliases: ['2 Reis', '2. Reis', '2ª Reis', '2 Reis', '2Re.', '2 Re.', '2 Re', 'II Reis', 'II Re', '2R.'],
    standalonePatterns: ['Segundo Livro dos Reis']
  },
  {
    canonicalId: '1Crô',
    aliases: ['1 Crônicas', '1 Crónicas', '1. Crônicas', '1ª Crônicas', '1 Crô.', '1 Cró.', '1 Cro.', 'I Crônicas', '1Cr'],
    standalonePatterns: ['Primeiro Livro das Crônicas']
  },
  {
    canonicalId: '2Crô',
    aliases: ['2 Crônicas', '2 Crónicas', '2. Crônicas', '2ª Crônicas', '2 Crô.', '2 Cró.', '2 Cro.', 'II Crônicas', '2Cr'],
    standalonePatterns: ['Segundo Livro das Crônicas']
  },
  {
    canonicalId: 'Esd',
    aliases: ['Esdras', 'Esd.', 'Esd'],
    standalonePatterns: ['Livro de Esdras']
  },
  {
    canonicalId: 'Neh',
    aliases: ['Neemias', 'Neh.', 'Neh', 'Ne.'],
    standalonePatterns: ['Livro de Neemias']
  },
  {
    canonicalId: 'Est',
    aliases: ['Ester', 'Esther', 'Est.', 'Est'],
    standalonePatterns: ['Livro de Ester']
  },
  {
    canonicalId: 'Jó',
    aliases: ['Jó', 'Jo', 'Jó.'],
    standalonePatterns: ['Livro de Jó']
  },
  {
    canonicalId: 'Sl',
    aliases: ['Salmos', 'Salmo', 'Sal.', 'Sal', 'Sl.', 'Sl'],
    standalonePatterns: ['Livro dos Salmos', 'Salterium']
  },
  {
    canonicalId: 'Pv',
    aliases: ['Provérbios', 'Proverbios', 'Prov.', 'Prov', 'Pv.', 'Pv', 'Pr.'],
    standalonePatterns: ['Livro dos Provérbios']
  },
  {
    canonicalId: 'Ec',
    aliases: ['Eclesiastes', 'Colet', 'Ecl.', 'Ecl', 'Ec.', 'Ec', 'Qoh'],
    standalonePatterns: ['Livro de Eclesiastes', 'Pregador']
  },
  {
    canonicalId: 'Ct',
    aliases: ['Cantares de Salomão', 'Cânticos', 'Cântico dos Cânticos', 'Cantares', 'Cant.', 'Cant', 'Ct.', 'Ct'],
    standalonePatterns: ['Cântico dos Cânticos de Salomão']
  },
  {
    canonicalId: 'Is',
    aliases: ['Isaías', 'Isaias', 'Isa.', 'Isa', 'Is.', 'Is'],
    standalonePatterns: ['Livro de Isaías']
  },
  {
    canonicalId: 'Jr',
    aliases: ['Jeremias', 'Jer.', 'Jer', 'Jr.', 'Jr'],
    standalonePatterns: ['Livro de Jeremias']
  },
  {
    canonicalId: 'Lm',
    aliases: ['Lamentações', 'Lamentacoes', 'Lam.', 'Lam', 'Lm.', 'Lm'],
    standalonePatterns: ['Lamentações de Jeremias']
  },
  {
    canonicalId: 'Ez',
    aliases: ['Ezequiel', 'Ezeq.', 'Ezeq', 'Ez.', 'Ez'],
    standalonePatterns: ['Livro de Ezequiel']
  },
  {
    canonicalId: 'Dn',
    aliases: ['Daniel', 'Dan.', 'Dan', 'Dn.', 'Dn'],
    standalonePatterns: ['Livro de Daniel']
  },
  {
    canonicalId: 'Os',
    aliases: ['Oseias', 'Oséias', 'Os.', 'Os'],
    standalonePatterns: ['Livro de Oseias']
  },
  {
    canonicalId: 'Jl',
    aliases: ['Joel', 'Jl.', 'Jl'],
    standalonePatterns: ['Livro de Joel']
  },
  {
    canonicalId: 'Am',
    aliases: ['Amós', 'Amos', 'Am.', 'Am'],
    standalonePatterns: ['Livro de Amós']
  },
  {
    canonicalId: 'Ob',
    aliases: ['Obadias', 'Obad.', 'Obad', 'Ob.', 'Ob'],
    standalonePatterns: ['Livro de Obadias']
  },
  {
    canonicalId: 'Jn',
    aliases: ['Jonas', 'Jon.', 'Jon', 'Jn.', 'Jn'],
    standalonePatterns: ['Livro de Jonas']
  },
  {
    canonicalId: 'Mq',
    aliases: ['Miqueias', 'Miquéias', 'Miq.', 'Miq', 'Mq.', 'Mq'],
    standalonePatterns: ['Livro de Miqueias']
  },
  {
    canonicalId: 'Na',
    aliases: ['Naum', 'Nahum', 'Nah.', 'Na.', 'Na'],
    standalonePatterns: ['Livro de Naum']
  },
  {
    canonicalId: 'Hab',
    aliases: ['Habacuque', 'Hab.', 'Hab'],
    standalonePatterns: ['Livro de Habacuque']
  },
  {
    canonicalId: 'Sf',
    aliases: ['Sofonias', 'Sof.', 'Sf.', 'Sf'],
    standalonePatterns: ['Livro de Sofonias']
  },
  {
    canonicalId: 'Ag',
    aliases: ['Ageu', 'Hag.', 'Ag.', 'Ag'],
    standalonePatterns: ['Livro de Ageu']
  },
  {
    canonicalId: 'Zc',
    aliases: ['Zacarias', 'Zac.', 'Zac', 'Zc.', 'Zc'],
    standalonePatterns: ['Livro de Zacarias']
  },
  {
    canonicalId: 'Ml',
    aliases: ['Malaquias', 'Mal.', 'Mal', 'Ml.', 'Ml'],
    standalonePatterns: ['Livro de Malaquias']
  },

  // ═══════════════════════════════════════════════════════════════
  // NOVO TESTAMENTO
  // ═══════════════════════════════════════════════════════════════

  {
    canonicalId: 'Mt',
    aliases: ['Mateus', 'Mat.', 'Mat', 'Mt.', 'Mt'],
    standalonePatterns: ['Evangelho segundo São Mateus', 'Evangelho de Mateus']
  },
  {
    canonicalId: 'Mc',
    aliases: ['Marcos', 'Marc.', 'Marc', 'Mc.', 'Mc'],
    standalonePatterns: ['Evangelio segundo São Marcos', 'Evangelho de Marcos']
  },
  {
    canonicalId: 'Lc',
    aliases: ['Lucas', 'Luc.', 'Luc', 'Lc.', 'Lc'],
    standalonePatterns: ['Evangelho segundo São Lucas', 'Evangelho de Lucas']
  },
  {
    canonicalId: 'Jo',
    aliases: ['João', 'Joao', 'Jo.', 'Jo'],
    standalonePatterns: ['Evangelho segundo São João', 'Evangelho de João']
  },
  {
    canonicalId: 'At',
    aliases: ['Atos dos Apóstolos', 'Atos', 'At.', 'At'],
    standalonePatterns: ['Os Atos dos Apóstolos']
  },
  {
    canonicalId: 'Rm',
    aliases: ['Romanos', 'Rom.', 'Rom', 'Rm.', 'Rm'],
    standalonePatterns: ['Epístola aos Romanos']
  },
  {
    canonicalId: '1Cor',
    aliases: ['1 Coríntios', '1 Corintios', '1. Coríntios', '1ª Coríntios', '1 Cor.', '1 Cor', 'I Coríntios', 'I Cor.', '1C.'],
    standalonePatterns: ['Primeira Epístola aos Coríntios']
  },
  {
    canonicalId: '2Cor',
    aliases: ['2 Coríntios', '2 Corintios', '2. Coríntios', '2ª Coríntios', '2 Cor.', '2 Cor', 'II Coríntios', 'II Cor.', '2C.'],
    standalonePatterns: ['Segunda Epístola aos Coríntios']
  },
  {
    canonicalId: 'Gl',
    aliases: ['Gálatas', 'Galatas', 'Gál.', 'Gal.', 'Gl.', 'Gl'],
    standalonePatterns: ['Epístola aos Gálatas']
  },
  {
    canonicalId: 'Ef',
    aliases: ['Efésios', 'Efesios', 'Efe.', 'Efe', 'Ef.', 'Ef'],
    standalonePatterns: ['Epístola aos Efésios']
  },
  {
    canonicalId: 'Fp',
    aliases: ['Filipenses', 'Fil.', 'Fil', 'Fp.', 'Fp'],
    standalonePatterns: ['Epístola aos Filipenses']
  },
  {
    canonicalId: 'Cl',
    aliases: ['Colossenses', 'Col.', 'Col', 'Cl.', 'Cl'],
    standalonePatterns: ['Epístola aos Colossenses']
  },
  {
    canonicalId: '1Tes',
    aliases: ['1 Tesalonicenses', '1 Tessalonicenses', '1ª Tesalonicenses', '1. Tes.', '1 Tes.', 'I Tes.', '1T.'],
    standalonePatterns: ['Primeira Epístola aos Tesalonicenses']
  },
  {
    canonicalId: '2Tes',
    aliases: ['2 Tesalonicenses', '2 Tessalonicenses', '2ª Tesalonicenses', '2. Tes.', '2 Tes.', 'II Tes.', '2T.'],
    standalonePatterns: ['Segunda Epístola aos Tesalonicenses']
  },
  {
    canonicalId: '1Tm',
    aliases: ['1 Timóteo', '1 Timoteo', '1. Timóteo', '1ª Timóteo', '1 Tim.', '1 Tim', 'I Timóteo', '1Tm.', '1Tm'],
    standalonePatterns: ['Primeira Epístola a Timóteo']
  },
  {
    canonicalId: '2Tm',
    aliases: ['2 Timóteo', '2 Timoteo', '2. Timóteo', '2ª Timóteo', '2 Tim.', '2 Tim', 'II Timóteo', '2Tm.', '2Tm'],
    standalonePatterns: ['Segunda Epístola a Timóteo']
  },
  {
    canonicalId: 'Tt',
    aliases: ['Tito', 'Tit.', 'Tit', 'Tt.', 'Tt'],
    standalonePatterns: ['Epístola a Tito']
  },
  {
    canonicalId: 'Fm',
    aliases: ['Filemom', 'Filemón', 'Filemon', 'Filem.', 'Fm.', 'Fm'],
    standalonePatterns: ['Epístola a Filemom']
  },
  {
    canonicalId: 'Hb',
    aliases: ['Hebreus', 'Hebr.', 'Hebr', 'Heb.', 'Hb.', 'Hb'],
    standalonePatterns: ['Epístola aos Hebreus']
  },
  {
    canonicalId: 'Tg',
    aliases: ['Tiago', 'Santiago', 'Tiag.', 'Tia.', 'Tia', 'Tg.', 'Tg'],
    standalonePatterns: ['Epístola de Tiago']
  },
  {
    canonicalId: '1Pe',
    aliases: ['1 Pedro', '1. Pedro', '1ª Pedro', '1 Ped.', '1 Ped', 'I Pedro', 'I Ped.', '1Pe.', '1Pe', '1P.'],
    standalonePatterns: ['Primeira Epístola de Pedro']
  },
  {
    canonicalId: '2Pe',
    aliases: ['2 Pedro', '2. Pedro', '2ª Pedro', '2 Ped.', '2 Ped', 'II Pedro', 'II Ped.', '2Pe.', '2Pe', '2P.'],
    standalonePatterns: ['Segunda Epístola de Pedro']
  },
  {
    canonicalId: '1Jo',
    aliases: ['1 João', '1 Joao', '1. João', '1ª João', '1 Jo.', '1 Jo', 'I João', 'I Jo', '1Jo.', '1Jo'],
    standalonePatterns: ['Primeira Epístola de João']
  },
  {
    canonicalId: '2Jo',
    aliases: ['2 João', '2 Joao', '2. João', '2ª João', '2 Jo.', '2 Jo', 'II João', 'II Jo', '2Jo.', '2Jo'],
    standalonePatterns: ['Segunda Epístola de João']
  },
  {
    canonicalId: '3Jo',
    aliases: ['3 João', '3 Joao', '3. João', '3ª João', '3 Jo.', '3 Jo', 'III João', 'III Jo', '3Jo.', '3Jo'],
    standalonePatterns: ['Terceira Epístola de João']
  },
  {
    canonicalId: 'Jd',
    aliases: ['Judas', 'Jud.', 'Jud', 'Jd.', 'Jd'],
    standalonePatterns: ['Epístola de Judas']
  },
  {
    canonicalId: 'Ap',
    aliases: ['Apocalipse', 'Revelação', 'Apoc.', 'Apoc', 'Ap.', 'Ap'],
    standalonePatterns: ['Apocalipse de São João']
  }
];