/**
 * Portuguese (Portugues) locale strings
 */
import type { LocaleStrings } from '../types';

export const PT_LOCALE: LocaleStrings = {
  // Commands
  commandOpenSidebar: 'Abrir referencias biblicas',
  commandSyncCurrent: 'Sincronizar arquivo atual',
  commandSyncAll: 'Sincronizar todos os arquivos',

  // Sidebar
  sidebarTitle: 'Referencias biblicas',
  sidebarTabDirect: 'Referencias',
  sidebarTabParallel: 'Paralelos',
  sidebarTabGlobal: 'Pesquisar',
  sidebarNoReferences: 'Nenhuma referencia biblica encontrada',
  sidebarNoOtherNotes: 'Nenhuma outra nota com este versiculo',
  sidebarEmpty: 'Abra uma nota com referencias biblicas...',
  sidebarReferenceCount: '{count} referencia(s)',
  sidebarParallelCount: '{count} nota(s)',
  sidebarSelectBook: 'Selecionar livro',
  sidebarSelectChapter: 'Capitulo',
  sidebarSelectVerse: 'Versiculo',
  sidebarNotesWithVerse: 'Notas com {verse}:',

  // Sync Button
  syncButtonSync: 'Sincronizar',
  syncButtonSyncing: 'Sincronizando...',
  syncButtonSynced: 'Concluido',
  syncButtonError: 'Erro',

  // Notices
  noticeSynced: '{count} referencia(s) biblica(s) sincronizada(s)',
  noticeNoChanges: 'Sem alteracoes',
  noticeError: 'Erro ao sincronizar',
  noticeNoFile: 'Nenhum arquivo Markdown aberto',
  noticeSyncAll: '{changed}/{total} arquivos atualizados ({duration}s)',
  noticeMigration: '{count} arquivos migrados para o novo formato',
  noticeMigrationStarted: 'Migracao iniciada: {oldId} -> {newId}',
  noticeMigrationCompleted: 'Migracao concluida: {changed}/{total} arquivos atualizados ({duration}s)',

  // Settings Sections
  settingsLanguageSection: 'Idioma',
  settingsLanguageSectionDesc: 'Idioma do plugin e textos da interface',
  settingsSyncSection: 'Sincronizacao',
  settingsSyncSectionDesc: 'Quando e como sincronizar',
  settingsFormatSection: 'Formato',
  settingsFormatSectionDesc: 'Separadores para as referencias biblicas',
  settingsFrontmatterSection: 'Frontmatter',
  settingsFrontmatterSectionDesc: 'Configuracoes de etiquetas e metadados',
  settingsParsingSection: 'Deteccao',
  settingsParsingSectionDesc: 'O que e reconhecido como referencia biblica',
  settingsBehaviorSection: 'Comportamento',
  settingsBehaviorSectionDesc: 'Comportamento de links e interacoes',
  settingsAdvancedSection: 'Avancado',
  settingsAdvancedSectionDesc: 'Mapeamento de livros e editor JSON',
  settingsInfoSection: 'Info',
  settingsInfoSectionDesc: 'Dicas para o uso do plugin',

  // Settings - Danger Zone
  settingsDangerZone: 'Zona de perigo',
  settingsDangerZoneDesc: 'Acoes irreversiveis',
  settingsResetToDefault: 'Redefinir para o padrao',
  settingsResetToDefaultDesc: 'Redefinir todas as configuracoes para os valores originais',
  settingsResetToDefaultButton: 'Redefinir',
  settingsResetToDefaultConfirm: 'Tem certeza que deseja redefinir todas as configuracoes? Esta acao nao pode ser desfeita.',

  // Settings - UI Language
  settingsUiLanguage: 'Idioma do plugin',
  settingsUiLanguageDesc: 'Idioma para os textos da interface (comandos, barra lateral, mensagens)',

  // Settings - Sync
  settingsSyncTitle: 'Quando sincronizar?',
  syncOnSave: 'Ao salvar',
  syncOnSaveDesc: 'Sincronizar ao pressionar Ctrl+S / Cmd+S',
  syncOnFileChange: 'Ao mudar de arquivo',
  syncOnFileChangeDesc: 'Sincronizar ao alternar para outro arquivo',
  syncManualHint: 'Dica: Se ambos estiverem desativados, use o botao de sincronizacao ou o comando "Sincronizar arquivo atual"',

  // Settings - Format
  settingsLanguagePreset: 'Predefinicao de formato',
  settingsLanguagePresetDesc: 'Determina quais separadores sao usados',
  settingsChapterVerseSep: 'Separador capitulo-versiculo',
  settingsChapterVerseSepDesc: 'Separador entre capitulo e versiculo (ex: ":" para Joao 3:16)',
  settingsListSep: 'Separador de lista',
  settingsListSepDesc: 'Separador para listas de versiculos (ex: "," para Joao 3:16,18)',
  settingsRangeSep: 'Separador de intervalo',
  settingsRangeSepDesc: 'Separador para intervalos (ex: "-" para Joao 3:16-18)',
  presetGerman: 'Joao 3,16-18.20',
  presetEnglish: 'Joao 3:16-18,20',
  presetCustom: 'Personalizado',

  // Settings - Frontmatter
  settingsFrontmatterKey: 'Chave do Frontmatter',
  settingsFrontmatterKeyDesc: 'Nome da propriedade no frontmatter (padrao: _bible_refs)',
  settingsTagPrefix: 'Prefixo de etiqueta',
  settingsTagPrefixDesc: 'Prefixo para etiquetas geradas (ex: "bible/" -> bible/Jo/3/16)',

  // Settings - Graph View
  settingsGraphViewSection: 'Vista de Grafico',
  settingsGraphViewSectionDesc: 'Configuracoes para exibicao no grafico do Obsidian',
  settingsWriteToTags: 'Ativar Vista de Grafico (Tags)',
  settingsWriteToTagsDesc: 'Salvar referencias tambem no campo de etiquetas padrao',
  settingsGraphTagGranularity: 'Granularidade de etiquetas',
  settingsGraphTagGranularityDesc: 'Quao detalhadas as etiquetas devem ser no grafico',
  graphGranularityBook: 'Apenas livro (ex: bible/Jo)',
  graphGranularityChapter: 'Livro + Capitulo (ex: bible/Jo/3)',
  graphGranularityVerse: 'Detalhe completo (ex: bible/Jo/3/16)',
  settingsApplyAndSync: 'Aplicar alteracoes',
  settingsApplyAndSyncDesc: 'Sincronizar todos os arquivos com as novas configuracoes',
  settingsApplyAndSyncButton: 'Aplicar e Sincronizar',

  // Quick Settings (Sidebar)
  quickSettingsTitle: 'Configuracoes rapidas',
  quickSettingsTooltip: 'Configuracoes rapidas',
  quickSettingsGranularity: 'Granularidade de etiquetas',

  // Sort Options
  sortOrderSection: 'Ordenacao',
  sortDocument: 'Ordem do documento',
  sortCanonical: 'Ordem biblica (Gn->Ap)',
  sortAlphaAsc: 'Alfabetica A->Z',
  sortAlphaDesc: 'Alfabetica Z->A',
  sortCount: 'Por numero de notas',

  // Settings - Sync Enhancements
  settingsSyncCommandHint: 'Dica: Use Cmd+Shift+P e pesquise por "sync" para acesso rapido.',
  settingsSyncAllButton: 'Sincronizar todos os arquivos',
  settingsSyncAllButtonDesc: 'Inicia uma sincronizacao completa de todos os arquivos Markdown.',
  settingsSyncAllButtonText: 'Sincronizar agora',

  // Sync Timeout
  syncButtonTimeout: 'Tempo limite',

  // Settings - Parsing
  settingsParseCodeBlocks: 'Analisar blocos de codigo',
  settingsParseCodeBlocksDesc: 'Detectar referencias tambem em blocos de codigo',
  settingsParseTitles: 'Analisar nomes de arquivos',
  settingsParseTitlesDesc: 'Detectar versiculos no titulo (ex: "Joao 3,16 - Amor de Deus.md")',

  // Settings - Link Behavior
  settingsLinkBehavior: 'Comportamento de links',
  settingsLinkBehaviorDesc: 'Como os links da barra lateral devem abrir?',
  linkBehaviorSameTab: 'Na mesma aba',
  linkBehaviorNewTab: 'Em nova aba',
  linkBehaviorSplit: 'Lado a lado (Vista dividida)',

  // Settings - Tips
  settingsParallelTip: 'Passagens paralelas',
  settingsParallelTipDesc: 'Este plugin assume que todos os versiculos em uma nota sao paralelos (Principio: Notas Atomicas -> apenas uma ideia por nota). Isso permite criar suas proprias listas tematicas (ex: "Amor de Deus"), que serao reconhecidas automaticamente.',
  settingsInfo: 'Info',
  settingsInfoDesc: 'Bible Reference Mapper nao oferece listas prontas. As referencias devem surgir do seu estudo pessoal. O Obsidian oferece a estrutura, mas voce mesmo deve abrir sua Biblia.',

  // Settings - Book Mappings
  settingsBookMappingsVisual: 'Mapeamento de livros',
  settingsBookMappingsVisualDesc: 'Defina como os livros sao reconhecidos (abreviacoes ou nomes completos) para garantir a deteccao correta em qualquer formato.',
  settingsBookMappingsJson: 'Mapeamentos JSON (Avancado)',
  settingsBookMappingsJsonDesc: 'Edicao direta dos mapeamentos em JSON',
  settingsOldTestament: 'Antigo Testamento',
  settingsNewTestament: 'Novo Testamento',
  settingsAliasesLabel: 'Abreviacoes (Alias)',
  settingsStandalonePatternsLabel: 'Nomes completos',
  settingsPillInputPlaceholder: 'Pressione Enter para adicionar...',
  settingsSearchBooksPlaceholder: 'Pesquisar livros...',
  settingsBookMappingsWarning: 'Atencao: Excluir todos os alias pode impedir a deteccao das referencias.',
  settingsDisplayIdExplanation: 'O alias fixado e o que voce vera na interface. Clique no icone do alfinete para escolher seu formato preferido.',
  settingsCannotDeleteCanonicalId: 'O ID canonico nao pode ser excluido.',
};
