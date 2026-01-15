/**
 * French (Francais) locale strings
 */
import type { LocaleStrings } from '../types';

export const FR_LOCALE: LocaleStrings = {
  // Commands
  commandOpenSidebar: 'Ouvrir les references bibliques',
  commandSyncCurrent: 'Synchroniser le fichier actuel',
  commandSyncAll: 'Synchroniser tous les fichiers',

  // Sidebar
  sidebarTitle: 'References bibliques',
  sidebarTabDirect: 'References',
  sidebarTabParallel: 'Paralleles',
  sidebarTabGlobal: 'Rechercher',
  sidebarNoReferences: 'Aucune reference biblique trouvee',
  sidebarNoOtherNotes: 'Aucune autre note avec ce verset',
  sidebarEmpty: 'Ouvrez une note contenant des references...',
  sidebarReferenceCount: '{count} reference(s)',
  sidebarParallelCount: '{count} note(s)',
  sidebarSelectBook: 'Choisir un livre',
  sidebarSelectChapter: 'Chapitre',
  sidebarSelectVerse: 'Verset',
  sidebarNotesWithVerse: 'Notes avec {verse} :',

  // Sync Button
  syncButtonSync: 'Sync',
  syncButtonSyncing: 'Synchronisation...',
  syncButtonSynced: 'Termine',
  syncButtonError: 'Erreur',

  // Notices
  noticeSynced: '{count} reference(s) biblique(s) synchronisee(s)',
  noticeNoChanges: 'Aucun changement',
  noticeError: 'Erreur de synchronisation',
  noticeNoFile: 'Aucun fichier Markdown ouvert',
  noticeSyncAll: '{changed}/{total} fichiers mis a jour ({duration}s)',
  noticeMigration: '{count} fichiers migres vers le nouveau format',
  noticeMigrationStarted: 'Migration demarree : {oldId} -> {newId}',
  noticeMigrationCompleted: 'Migration terminee : {changed}/{total} fichiers mis a jour ({duration}s)',

  // Settings Sections
  settingsLanguageSection: 'Langue',
  settingsLanguageSectionDesc: 'Langue du plugin et textes de l\'interface',
  settingsSyncSection: 'Synchronisation',
  settingsSyncSectionDesc: 'Quand et comment synchroniser',
  settingsFormatSection: 'Format',
  settingsFormatSectionDesc: 'Separateurs pour les references bibliques',
  settingsFrontmatterSection: 'Frontmatter',
  settingsFrontmatterSectionDesc: 'Reglages des tags et metadonnees',
  settingsParsingSection: 'Detection',
  settingsParsingSectionDesc: 'Ce qui est reconnu comme reference biblique',
  settingsBehaviorSection: 'Comportement',
  settingsBehaviorSectionDesc: 'Comportement des liens et interactions',
  settingsAdvancedSection: 'Avance',
  settingsAdvancedSectionDesc: 'Correspondance des livres et editeur JSON',
  settingsInfoSection: 'Infos',
  settingsInfoSectionDesc: 'Conseils d\'utilisation',

  // Settings - Danger Zone
  settingsDangerZone: 'Zone de danger',
  settingsDangerZoneDesc: 'Actions irreversibles',
  settingsResetToDefault: 'Reinitialiser',
  settingsResetToDefaultDesc: 'Retablir tous les reglages par defaut',
  settingsResetToDefaultButton: 'Reinitialiser',
  settingsResetToDefaultConfirm: 'Voulez-vous vraiment reinitialiser tous les reglages ? Cette action est irreversible.',

  // Settings - UI Language
  settingsUiLanguage: 'Langue du plugin',
  settingsUiLanguageDesc: 'Langue de l\'interface (commandes, barre laterale, messages)',

  // Settings - Sync
  settingsSyncTitle: 'Quand synchroniser ?',
  syncOnSave: 'A l\'enregistrement',
  syncOnSaveDesc: 'Sync lors de Ctrl+S / Cmd+S',
  syncOnFileChange: 'Au changement de fichier',
  syncOnFileChangeDesc: 'Sync en passant d\'une note a l\'autre',
  syncManualHint: 'Conseil : Si les deux sont desactives, utilisez le bouton Sync ou la commande "Synchroniser le fichier actuel"',

  // Settings - Format
  settingsLanguagePreset: 'Format predefini',
  settingsLanguagePresetDesc: 'Determine les separateurs utilises',
  settingsChapterVerseSep: 'Separateur Chapitre-Verset',
  settingsChapterVerseSepDesc: 'Separateur entre chapitre et verset (ex: ":" pour Jean 3:16)',
  settingsListSep: 'Separateur de liste',
  settingsListSepDesc: 'Separateur pour les listes (ex: "," pour Jean 3:16,18)',
  settingsRangeSep: 'Separateur de plage',
  settingsRangeSepDesc: 'Separateur pour les plages (ex: "-" pour Jean 3:16-18)',
  presetGerman: 'Jean 3,16-18.20',
  presetEnglish: 'Jean 3:16-18,20',
  presetCustom: 'Personnalise',

  // Settings - Frontmatter
  settingsFrontmatterKey: 'Cle Frontmatter',
  settingsFrontmatterKeyDesc: 'Nom de la propriete (defaut : _bible_refs)',
  settingsTagPrefix: 'Prefixe des tags',
  settingsTagPrefixDesc: 'Prefixe pour les tags generes (ex: "bible/" -> bible/Jean/3/16)',

  // Settings - Graph View
  settingsGraphViewSection: 'Vue Graphique',
  settingsGraphViewSectionDesc: 'Reglages pour l\'affichage dans le graphique Obsidian',
  settingsWriteToTags: 'Activer la vue graphique (Tags)',
  settingsWriteToTagsDesc: 'Enregistrer aussi dans le champ tags standard',
  settingsGraphTagGranularity: 'Granularite des tags',
  settingsGraphTagGranularityDesc: 'Niveau de detail dans le graphique',
  graphGranularityBook: 'Livre uniquement (ex: bible/Jean)',
  graphGranularityChapter: 'Livre + Chapitre (ex: bible/Jean/3)',
  graphGranularityVerse: 'Detail complet (ex: bible/Jean/3/16)',
  settingsApplyAndSync: 'Appliquer les changements',
  settingsApplyAndSyncDesc: 'Synchroniser tous les fichiers avec les nouveaux reglages',
  settingsApplyAndSyncButton: 'Appliquer et synchroniser',

  // Quick Settings (Sidebar)
  quickSettingsTitle: 'Reglages rapides',
  quickSettingsTooltip: 'Reglages rapides',
  quickSettingsGranularity: 'Granularite des tags',

  // Sort Options
  sortOrderSection: 'Ordre de tri',
  sortDocument: 'Ordre du document',
  sortCanonical: 'Ordre biblique (Gen->Apo)',
  sortAlphaAsc: 'Alphabetique A->Z',
  sortAlphaDesc: 'Alphabetique Z->A',
  sortCount: 'Par nombre de notes',

  // Settings - Sync Enhancements
  settingsSyncCommandHint: 'Conseil : Utilisez Cmd+Shift+P et cherchez "sync" pour un acces rapide.',
  settingsSyncAllButton: 'Synchroniser tous les fichiers',
  settingsSyncAllButtonDesc: 'Lance une synchronisation complete de tous les fichiers Markdown.',
  settingsSyncAllButtonText: 'Synchroniser maintenant',

  // Sync Timeout
  syncButtonTimeout: 'Delai d\'attente',

  // Settings - Parsing
  settingsParseCodeBlocks: 'Parser les blocs de code',
  settingsParseCodeBlocksDesc: 'Detecter les references meme dans les blocs de code',
  settingsParseTitles: 'Parser les noms de fichiers',
  settingsParseTitlesDesc: 'Detecter les versets dans le titre (ex: "Jean 3,16 - Amour de Dieu.md")',

  // Settings - Link Behavior
  settingsLinkBehavior: 'Comportement des liens',
  settingsLinkBehaviorDesc: 'Comment ouvrir les liens depuis la barre laterale ?',
  linkBehaviorSameTab: 'Meme onglet',
  linkBehaviorNewTab: 'Nouvel onglet',
  linkBehaviorSplit: 'Cote a cote (Vue scindee)',

  // Settings - Tips
  settingsParallelTip: 'Passages paralleles',
  settingsParallelTipDesc: 'Ce plugin considere que tous les versets d\'une note sont des paralleles (Principe : Notes Atomiques -> une seule idee par note). Vous pouvez ainsi creer vos propres listes thematiques (ex: "Amour de Dieu") qui seront reconnues automatiquement.',
  settingsInfo: 'Infos',
  settingsInfoDesc: 'Bible Reference Mapper ne propose pas de listes pretes a l\'emploi. Les references naissent de votre etude personnelle. Obsidian offre la structure, mais c\'est a vous d\'ouvrir votre Bible.',

  // Settings - Book Mappings
  settingsBookMappingsVisual: 'Correspondance des livres',
  settingsBookMappingsVisualDesc: 'Definissez comment les livres sont reconnus (abreviations ou noms complets) pour garantir une detection correcte quel que soit le format.',
  settingsBookMappingsJson: 'Mappings JSON (Avance)',
  settingsBookMappingsJsonDesc: 'Modification directe des correspondances en JSON',
  settingsOldTestament: 'Ancien Testament',
  settingsNewTestament: 'Nouveau Testament',
  settingsAliasesLabel: 'Abreviations (Alias)',
  settingsStandalonePatternsLabel: 'Noms complets',
  settingsPillInputPlaceholder: 'Appuyez sur Entree pour ajouter...',
  settingsSearchBooksPlaceholder: 'Chercher un livre...',
  settingsBookMappingsWarning: 'Attention : Supprimer tous les alias peut empecher la detection des versets.',
  settingsDisplayIdExplanation: 'L\'alias epingle est celui affiche dans l\'interface. Cliquez sur l\'epingle pour choisir votre format prefere.',
  settingsCannotDeleteCanonicalId: 'L\'ID canonique ne peut pas etre supprime.',
};
