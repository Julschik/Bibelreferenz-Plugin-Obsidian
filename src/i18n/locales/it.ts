/**
 * Italian (Italiano) locale strings
 */
import type { LocaleStrings } from '../types';

export const IT_LOCALE: LocaleStrings = {
  // Commands
  commandOpenSidebar: 'Apri riferimenti biblici',
  commandSyncCurrent: 'Sincronizza file corrente',
  commandSyncAll: 'Sincronizza tutti i file',

  // Sidebar
  sidebarTitle: 'Riferimenti biblici',
  sidebarTabDirect: 'Riferimenti',
  sidebarTabParallel: 'Paralleli',
  sidebarTabGlobal: 'Cerca',
  sidebarNoReferences: 'Nessun riferimento biblico trovato',
  sidebarNoOtherNotes: 'Nessun\'altra nota con questo versetto',
  sidebarEmpty: 'Apri una nota con riferimenti biblici...',
  sidebarReferenceCount: '{count} riferimento/i',
  sidebarParallelCount: '{count} nota/e',
  sidebarSelectBook: 'Seleziona libro',
  sidebarSelectChapter: 'Capitolo',
  sidebarSelectVerse: 'Versetto',
  sidebarNotesWithVerse: 'Note con {verse}:',

  // Sync Button
  syncButtonSync: 'Sincronizza',
  syncButtonSyncing: 'Sincronizzazione...',
  syncButtonSynced: 'Fatto',
  syncButtonError: 'Errore',

  // Notices
  noticeSynced: '{count} riferimento/i biblico/i sincronizzato/i',
  noticeNoChanges: 'Nessuna modifica',
  noticeError: 'Errore durante la sincronizzazione',
  noticeNoFile: 'Nessun file Markdown aperto',
  noticeSyncAll: '{changed}/{total} file aggiornati ({duration}s)',
  noticeMigration: '{count} file migrati al nuovo formato',
  noticeMigrationStarted: 'Migrazione avviata: {oldId} -> {newId}',
  noticeMigrationCompleted: 'Migrazione completata: {changed}/{total} file aggiornati ({duration}s)',

  // Settings Sections
  settingsLanguageSection: 'Lingua',
  settingsLanguageSectionDesc: 'Lingua del plugin e testi dell\'interfaccia',
  settingsSyncSection: 'Sincronizzazione',
  settingsSyncSectionDesc: 'Quando e come sincronizzare',
  settingsFormatSection: 'Formato',
  settingsFormatSectionDesc: 'Separatori per i riferimenti biblici',
  settingsFrontmatterSection: 'Frontmatter',
  settingsFrontmatterSectionDesc: 'Impostazioni tag e metadati',
  settingsParsingSection: 'Rilevamento',
  settingsParsingSectionDesc: 'Cosa viene riconosciuto come riferimento biblico',
  settingsBehaviorSection: 'Comportamento',
  settingsBehaviorSectionDesc: 'Comportamento dei link e interazioni',
  settingsAdvancedSection: 'Avanzato',
  settingsAdvancedSectionDesc: 'Mappatura libri ed editor JSON',
  settingsInfoSection: 'Info',
  settingsInfoSectionDesc: 'Suggerimenti sull\'uso del plugin',

  // Settings - Danger Zone
  settingsDangerZone: 'Zona di pericolo',
  settingsDangerZoneDesc: 'Azioni irreversibili',
  settingsResetToDefault: 'Ripristina predefiniti',
  settingsResetToDefaultDesc: 'Ripristina tutte le impostazioni ai valori iniziali',
  settingsResetToDefaultButton: 'Ripristina',
  settingsResetToDefaultConfirm: 'Sei sicuro di voler ripristinare tutte le impostazioni? L\'azione non e annullabile.',

  // Settings - UI Language
  settingsUiLanguage: 'Lingua del plugin',
  settingsUiLanguageDesc: 'Lingua per i testi UI (comandi, barra laterale, messaggi)',

  // Settings - Sync
  settingsSyncTitle: 'Quando sincronizzare?',
  syncOnSave: 'Al salvataggio',
  syncOnSaveDesc: 'Sincronizza con Ctrl+S / Cmd+S',
  syncOnFileChange: 'Al cambio file',
  syncOnFileChangeDesc: 'Sincronizza quando passi a un altro file',
  syncManualHint: 'Suggerimento: Se entrambi sono disattivati, usa il tasto Sync o il comando "Sincronizza file corrente"',

  // Settings - Format
  settingsLanguagePreset: 'Preset formato',
  settingsLanguagePresetDesc: 'Determina i separatori usati per i riferimenti',
  settingsChapterVerseSep: 'Separatore Capitolo-Versetto',
  settingsChapterVerseSepDesc: 'Separatore tra capitolo e versetto (es. ":" per Giovanni 3:16)',
  settingsListSep: 'Separatore lista',
  settingsListSepDesc: 'Separatore per liste di versetti (es. "," per Giovanni 3:16,18)',
  settingsRangeSep: 'Separatore intervallo',
  settingsRangeSepDesc: 'Separatore per intervalli (es. "-" per Giovanni 3:16-18)',
  presetGerman: 'Gv 3,16-18.20',
  presetEnglish: 'Gv 3:16-18,20',
  presetCustom: 'Personalizzato',

  // Settings - Frontmatter
  settingsFrontmatterKey: 'Chiave Frontmatter',
  settingsFrontmatterKeyDesc: 'Nome della proprieta (predefinito: _bible_refs)',
  settingsTagPrefix: 'Prefisso Tag',
  settingsTagPrefixDesc: 'Prefisso per i tag generati (es. "bible/" -> bible/Gv/3/16)',

  // Settings - Graph View
  settingsGraphViewSection: 'Vista Grafico',
  settingsGraphViewSectionDesc: 'Impostazioni per la visualizzazione nel grafico di Obsidian',
  settingsWriteToTags: 'Attiva Vista Grafico (Tag)',
  settingsWriteToTagsDesc: 'Salva i riferimenti anche nel campo tag standard',
  settingsGraphTagGranularity: 'Granularita Tag',
  settingsGraphTagGranularityDesc: 'Livello di dettaglio dei tag nel grafico',
  graphGranularityBook: 'Solo libro (es. bible/Gv)',
  graphGranularityChapter: 'Libro + Capitolo (es. bible/Gv/3)',
  graphGranularityVerse: 'Dettaglio completo (es. bible/Gv/3/16)',
  settingsApplyAndSync: 'Applica modifiche',
  settingsApplyAndSyncDesc: 'Sincronizza tutti i file con le nuove impostazioni',
  settingsApplyAndSyncButton: 'Applica e Sincronizza',

  // Quick Settings (Sidebar)
  quickSettingsTitle: 'Impostazioni rapide',
  quickSettingsTooltip: 'Impostazioni rapide',
  quickSettingsGranularity: 'Granularita Tag',

  // Sort Options
  sortOrderSection: 'Ordinamento',
  sortDocument: 'Ordine documento',
  sortCanonical: 'Ordine biblico (Gen->Ap)',
  sortAlphaAsc: 'Alfabetico A->Z',
  sortAlphaDesc: 'Alfabetico Z->A',
  sortCount: 'Per numero di note',

  // Settings - Sync Enhancements
  settingsSyncCommandHint: 'Suggerimento: Usa Cmd+Shift+P e cerca "sync" per l\'accesso rapido.',
  settingsSyncAllButton: 'Sincronizza tutti i file',
  settingsSyncAllButtonDesc: 'Avvia una sincronizzazione completa di tutti i file Markdown.',
  settingsSyncAllButtonText: 'Sincronizza ora',

  // Sync Timeout
  syncButtonTimeout: 'Timeout',

  // Settings - Parsing
  settingsParseCodeBlocks: 'Analizza blocchi di codice',
  settingsParseCodeBlocksDesc: 'Rileva riferimenti anche nei blocchi di codice',
  settingsParseTitles: 'Analizza nomi file',
  settingsParseTitlesDesc: 'Rileva versetti nel titolo (es. "Giovanni 3,16 - Amore di Dio.md")',

  // Settings - Link Behavior
  settingsLinkBehavior: 'Comportamento link',
  settingsLinkBehaviorDesc: 'Come aprire i link dalla barra laterale?',
  linkBehaviorSameTab: 'Stessa scheda',
  linkBehaviorNewTab: 'Nuova scheda',
  linkBehaviorSplit: 'Affiancati (Split View)',

  // Settings - Tips
  settingsParallelTip: 'Passaggi paralleli',
  settingsParallelTipDesc: 'Questo plugin assume che tutti i versetti in una nota siano paralleli (Principio: Note Atomiche -> un solo pensiero per nota). Puoi creare liste tematiche (es. "Amore di Dio") che verranno riconosciute automaticamente come paralleli.',
  settingsInfo: 'Info',
  settingsInfoDesc: 'Bible Reference Mapper non offre liste pronte. I riferimenti nascono dal tuo studio personale. Obsidian offre la struttura, ma la Bibbia la devi aprire tu.',

  // Settings - Book Mappings
  settingsBookMappingsVisual: 'Mappatura libri',
  settingsBookMappingsVisualDesc: 'Definisci come i libri vengono riconosciuti (abbreviazioni o nomi completi) per garantire un rilevamento corretto in ogni formato.',
  settingsBookMappingsJson: 'Mappature JSON (Avanzate)',
  settingsBookMappingsJsonDesc: 'Modifica diretta delle mappature in JSON',
  settingsOldTestament: 'Antico Testamento',
  settingsNewTestament: 'Nuovo Testamento',
  settingsAliasesLabel: 'Abbreviazioni (Alias)',
  settingsStandalonePatternsLabel: 'Nomi completi',
  settingsPillInputPlaceholder: 'Premi Invio per aggiungere...',
  settingsSearchBooksPlaceholder: 'Cerca libri...',
  settingsBookMappingsWarning: 'Attenzione: Eliminare tutti gli alias puo impedire il rilevamento dei versetti.',
  settingsDisplayIdExplanation: 'L\'alias fissato e quello visibile nell\'interfaccia. Clicca sulla puntina per scegliere il formato preferito.',
  settingsCannotDeleteCanonicalId: 'L\'ID canonico non puo essere eliminato.',
};
