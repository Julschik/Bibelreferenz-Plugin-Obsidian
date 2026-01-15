/**
 * Spanish (Espanol) locale strings
 */
import type { LocaleStrings } from '../types';

export const ES_LOCALE: LocaleStrings = {
  // Commands
  commandOpenSidebar: 'Abrir referencias biblicas',
  commandSyncCurrent: 'Sincronizar archivo actual',
  commandSyncAll: 'Sincronizar todos los archivos',

  // Sidebar
  sidebarTitle: 'Referencias biblicas',
  sidebarTabDirect: 'Referencias',
  sidebarTabParallel: 'Paralelos',
  sidebarTabGlobal: 'Buscar',
  sidebarNoReferences: 'No se encontraron referencias biblicas',
  sidebarNoOtherNotes: 'No hay otras notas con este versiculo',
  sidebarEmpty: 'Abre una nota con referencias biblicas...',
  sidebarReferenceCount: '{count} referencia(s)',
  sidebarParallelCount: '{count} nota(s)',
  sidebarSelectBook: 'Seleccionar libro',
  sidebarSelectChapter: 'Capitulo',
  sidebarSelectVerse: 'Versiculo',
  sidebarNotesWithVerse: 'Notas con {verse}:',

  // Sync Button
  syncButtonSync: 'Sincronizar',
  syncButtonSyncing: 'Sincronizando...',
  syncButtonSynced: 'Listo',
  syncButtonError: 'Error',

  // Notices
  noticeSynced: '{count} referencia(s) biblica(s) sincronizada(s)',
  noticeNoChanges: 'Sin cambios',
  noticeError: 'Error al sincronizar',
  noticeNoFile: 'Ningun archivo Markdown abierto',
  noticeSyncAll: '{changed}/{total} archivos actualizados ({duration}s)',
  noticeMigration: '{count} archivos migrados al nuevo formato',
  noticeMigrationStarted: 'Migracion iniciada: {oldId} -> {newId}',
  noticeMigrationCompleted: 'Migracion completada: {changed}/{total} archivos actualizados ({duration}s)',

  // Settings Sections
  settingsLanguageSection: 'Idioma',
  settingsLanguageSectionDesc: 'Idioma del plugin y textos de la interfaz',
  settingsSyncSection: 'Sincronizacion',
  settingsSyncSectionDesc: 'Cuando y como se sincroniza',
  settingsFormatSection: 'Formato',
  settingsFormatSectionDesc: 'Separadores para las referencias biblicas',
  settingsFrontmatterSection: 'Frontmatter',
  settingsFrontmatterSectionDesc: 'Configuracion de etiquetas y metadatos',
  settingsParsingSection: 'Deteccion',
  settingsParsingSectionDesc: 'Que se detecta como referencia biblica',
  settingsBehaviorSection: 'Comportamiento',
  settingsBehaviorSectionDesc: 'Comportamiento de enlaces e interacciones',
  settingsAdvancedSection: 'Avanzado',
  settingsAdvancedSectionDesc: 'Mapeo de libros y editor JSON',
  settingsInfoSection: 'Informacion',
  settingsInfoSectionDesc: 'Consejos para el uso del plugin',

  // Settings - Danger Zone
  settingsDangerZone: 'Zona de peligro',
  settingsDangerZoneDesc: 'Acciones irreversibles',
  settingsResetToDefault: 'Restablecer valores predeterminados',
  settingsResetToDefaultDesc: 'Restablecer todos los ajustes a sus valores originales',
  settingsResetToDefaultButton: 'Restablecer',
  settingsResetToDefaultConfirm: 'Estas seguro de que deseas restablecer todos los ajustes? Esta accion no se puede deshacer.',

  // Settings - UI Language
  settingsUiLanguage: 'Idioma del plugin',
  settingsUiLanguageDesc: 'Idioma para los textos de la interfaz (comandos, barra lateral, mensajes)',

  // Settings - Sync
  settingsSyncTitle: 'Cuando sincronizar?',
  syncOnSave: 'Al guardar',
  syncOnSaveDesc: 'Sincronizar al presionar Ctrl+S / Cmd+S',
  syncOnFileChange: 'Al cambiar de archivo',
  syncOnFileChangeDesc: 'Sincronizar al cambiar a otro archivo',
  syncManualHint: 'Consejo: Si ambos estan desactivados, usa el boton de sincronizacion en la barra lateral o el comando "Sincronizar archivo actual"',

  // Settings - Format
  settingsLanguagePreset: 'Preajuste de formato',
  settingsLanguagePresetDesc: 'Determina que separadores se usan para las referencias biblicas',
  settingsChapterVerseSep: 'Separador capitulo-versiculo',
  settingsChapterVerseSepDesc: 'Separador entre capitulo y versiculo (p. ej., ":" para Juan 3:16)',
  settingsListSep: 'Separador de lista',
  settingsListSepDesc: 'Separador para listas de versiculos (p. ej., "," para Juan 3:16,18)',
  settingsRangeSep: 'Separador de rango',
  settingsRangeSepDesc: 'Separador para rangos de versiculos (p. ej., "-" para Juan 3:16-18)',
  presetGerman: 'Juan 3,16-18.20',
  presetEnglish: 'Juan 3:16-18,20',
  presetCustom: 'Personalizado',

  // Settings - Frontmatter
  settingsFrontmatterKey: 'Clave de Frontmatter',
  settingsFrontmatterKeyDesc: 'Nombre de la propiedad en el frontmatter (por defecto: _bible_refs)',
  settingsTagPrefix: 'Prefijo de etiqueta',
  settingsTagPrefixDesc: 'Prefijo para etiquetas generadas (p. ej., "bible/" -> bible/Juan/3/16)',

  // Settings - Graph View
  settingsGraphViewSection: 'Vista de grafico',
  settingsGraphViewSectionDesc: 'Configuracion para la visualizacion en el grafico de Obsidian',
  settingsWriteToTags: 'Activar vista de grafico (Etiquetas)',
  settingsWriteToTagsDesc: 'Guardar tambien las referencias biblicas en el campo estandar de etiquetas',
  settingsGraphTagGranularity: 'Granularidad de etiquetas',
  settingsGraphTagGranularityDesc: 'Que tan detalladas deben ser las etiquetas en el grafico?',
  graphGranularityBook: 'Solo libro (p. ej., bible/Juan)',
  graphGranularityChapter: 'Libro + Capitulo (p. ej., bible/Juan/3)',
  graphGranularityVerse: 'Detalle completo (p. ej., bible/Juan/3/16)',
  settingsApplyAndSync: 'Aplicar cambios',
  settingsApplyAndSyncDesc: 'Sincronizar todos los archivos con los nuevos ajustes',
  settingsApplyAndSyncButton: 'Aplicar y sincronizar',

  // Quick Settings (Sidebar)
  quickSettingsTitle: 'Ajustes rapidos',
  quickSettingsTooltip: 'Ajustes rapidos',
  quickSettingsGranularity: 'Granularidad de etiquetas',

  // Sort Options
  sortOrderSection: 'Orden de clasificacion',
  sortDocument: 'Orden del documento',
  sortCanonical: 'Orden biblico (Gen->Apoc)',
  sortAlphaAsc: 'Alfabetico A->Z',
  sortAlphaDesc: 'Alfabetico Z->A',
  sortCount: 'Por numero de notas',

  // Settings - Sync Enhancements
  settingsSyncCommandHint: 'Consejo: Usa Cmd+Shift+P y busca "sync" para un acceso rapido.',
  settingsSyncAllButton: 'Sincronizar todos los archivos',
  settingsSyncAllButtonDesc: 'Inicia una sincronizacion completa de todos los archivos Markdown.',
  settingsSyncAllButtonText: 'Sincronizar ahora',

  // Sync Timeout
  syncButtonTimeout: 'Tiempo de espera',

  // Settings - Parsing
  settingsParseCodeBlocks: 'Analizar bloques de codigo',
  settingsParseCodeBlocksDesc: 'Detectar referencias biblicas tambien en bloques de codigo',
  settingsParseTitles: 'Analizar nombres de archivos',
  settingsParseTitlesDesc: 'Detectar versiculos en el nombre del archivo (p. ej., "Juan 3,16 - Amor de Dios.md")',

  // Settings - Link Behavior
  settingsLinkBehavior: 'Comportamiento de enlaces',
  settingsLinkBehaviorDesc: 'Como deben abrirse los enlaces desde la barra lateral?',
  linkBehaviorSameTab: 'En la misma pestana',
  linkBehaviorNewTab: 'En una nueva pestana',
  linkBehaviorSplit: 'Lado a lado (Vista dividida)',

  // Settings - Tips
  settingsParallelTip: 'Pasajes paralelos',
  settingsParallelTipDesc: 'Este plugin asume que todos los versiculos mencionados en una nota son pasajes paralelos (Principio: Notas Atomicas -> una sola idea por nota). Esto te permite crear tus propias listas de paralelos! Crea una nota tematica (p. ej., "Amor de Dios") y enumera los versiculos relacionados; se reconoceran automaticamente como paralelos.',
  settingsInfo: 'Informacion',
  settingsInfoDesc: 'Bible Reference Mapper no ofrece listas predefinidas ni importacion de textos. Todas las referencias deben surgir de tu estudio personal. Obsidian ofrece la estructura, pero tu abres la Biblia.',

  // Settings - Book Mappings
  settingsBookMappingsVisual: 'Mapeo de libros',
  settingsBookMappingsVisualDesc: 'Define como se reconocen los libros en tus notas. Puedes configurar alias (abreviaturas) y nombres completos para cada libro, asegurando que se detecten correctamente sin importar el formato.',
  settingsBookMappingsJson: 'Mapeo JSON (Avanzado)',
  settingsBookMappingsJsonDesc: 'Edicion directa de los mapeos en formato JSON',
  settingsOldTestament: 'Antiguo Testamento',
  settingsNewTestament: 'Nuevo Testamento',
  settingsAliasesLabel: 'Abreviaturas (Alias)',
  settingsStandalonePatternsLabel: 'Nombres completos',
  settingsPillInputPlaceholder: 'Escribe y pulsa Enter...',
  settingsSearchBooksPlaceholder: 'Buscar libros...',
  settingsBookMappingsWarning: 'Atencion: Eliminar todos los alias puede hacer que las referencias dejen de reconocerse.',
  settingsDisplayIdExplanation: 'El alias fijado actualmente es el que veras en toda la interfaz. Puedes fijar un formato diferente haciendo clic en el icono de la chincheta.',
  settingsCannotDeleteCanonicalId: 'El ID canonico no se puede eliminar.',
};
