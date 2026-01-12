import { App, TFile, setIcon } from 'obsidian';
import type { ExpandedReference, BibleRefSettings } from '../../types';
import type { I18nService } from '../../i18n/I18nService';

interface CoOccurrenceData {
  count: number;
  ref: ExpandedReference;
  files: TFile[];
}

/**
 * ParallelVersesTab
 *
 * Tab 2: Shows parallel passages based on co-occurrence.
 * Finds verses that appear together with current verses in other notes.
 * Sorted by frequency of co-occurrence.
 */
export class ParallelVersesTab {
  private app: App;
  private i18n: I18nService;
  private settings: BibleRefSettings;
  private containerEl: HTMLElement;
  private currentFile: TFile | null = null;
  private currentRefs: ExpandedReference[] = [];

  constructor(app: App, i18n: I18nService, settings: BibleRefSettings) {
    this.app = app;
    this.i18n = i18n;
    this.settings = settings;
  }

  /**
   * Set current file and references
   */
  setData(file: TFile | null, refs: ExpandedReference[]): void {
    this.currentFile = file;
    this.currentRefs = refs;
  }

  /**
   * Update settings
   */
  updateSettings(settings: BibleRefSettings): void {
    this.settings = settings;
  }

  /**
   * Render the tab content
   */
  render(containerEl: HTMLElement): void {
    this.containerEl = containerEl;
    containerEl.empty();

    if (!this.currentFile || this.currentRefs.length === 0) {
      this.renderEmptyState();
      return;
    }

    // Find co-occurring verses
    const coOccurrences = this.findCoOccurrences();

    if (coOccurrences.size === 0) {
      this.renderNoParallelsState();
      return;
    }

    // Render parallel verses sorted by count
    const sorted = [...coOccurrences.entries()].sort((a, b) => b[1].count - a[1].count);

    const listEl = containerEl.createDiv('bible-ref-expandable-list');

    for (const [verseKey, data] of sorted) {
      this.renderParallelVerse(listEl, verseKey, data);
    }
  }

  /**
   * Render empty state (no current references)
   */
  private renderEmptyState(): void {
    const emptyEl = this.containerEl.createDiv('bible-ref-empty');
    emptyEl.createEl('p', {
      text: this.i18n.t('sidebarNoReferences'),
      cls: 'bible-ref-empty-text'
    });
  }

  /**
   * Render state when no parallels are found
   */
  private renderNoParallelsState(): void {
    const emptyEl = this.containerEl.createDiv('bible-ref-empty');
    emptyEl.createEl('p', {
      text: this.i18n.t('sidebarNoOtherNotes'),
      cls: 'bible-ref-empty-text'
    });
  }

  /**
   * Render a single parallel verse entry with expandable file list
   */
  private renderParallelVerse(
    containerEl: HTMLElement,
    verseKey: string,
    data: CoOccurrenceData
  ): void {
    const itemEl = containerEl.createDiv('bible-ref-expandable');

    // Header row (clickable to expand)
    const headerEl = itemEl.createDiv('bible-ref-expandable-header');

    // Expand/collapse icon
    const expandIcon = headerEl.createSpan({ cls: 'bible-ref-expand-icon' });
    setIcon(expandIcon, 'chevron-right');

    // Verse display
    const verseDisplay = this.formatVerse(data.ref);
    headerEl.createEl('span', {
      text: verseDisplay,
      cls: 'bible-ref-parallel-verse'
    });

    // Count display
    headerEl.createEl('span', {
      text: this.i18n.t('sidebarParallelCount', { count: data.files.length }),
      cls: 'bible-ref-parallel-count'
    });

    // Expandable file list (initially hidden)
    const fileListEl = itemEl.createDiv('bible-ref-parallel-files');
    fileListEl.style.display = 'none';

    const listEl = fileListEl.createEl('ul', { cls: 'bible-ref-note-list' });
    for (const file of data.files) {
      const li = listEl.createEl('li');
      const link = li.createEl('a', {
        text: file.basename,
        cls: 'bible-ref-note-link'
      });
      const openFile = () => this.openNote(file);
      link.addEventListener('click', (e: unknown) => {
        const event = e as { preventDefault: () => void; stopPropagation: () => void };
        event.preventDefault();
        event.stopPropagation();
        openFile();
      });
    }

    // Toggle expand/collapse
    headerEl.addEventListener('click', () => {
      const isExpanded = fileListEl.style.display !== 'none';
      fileListEl.style.display = isExpanded ? 'none' : 'block';
      setIcon(expandIcon, isExpanded ? 'chevron-right' : 'chevron-down');
      if (isExpanded) {
        itemEl.removeClass('expanded');
      } else {
        itemEl.addClass('expanded');
      }
    });
  }

  /**
   * Open a note based on link behavior setting
   */
  private openNote(file: TFile): void {
    const behavior = this.settings.linkBehavior;

    switch (behavior) {
      case 'new-tab':
        this.app.workspace.getLeaf('tab').openFile(file);
        break;
      case 'split':
        this.app.workspace.getLeaf('split').openFile(file);
        break;
      case 'same-tab':
      default:
        this.app.workspace.getLeaf().openFile(file);
        break;
    }
  }

  /**
   * Format verse for display
   */
  private formatVerse(ref: ExpandedReference): string {
    const sep = this.settings.separators.chapterVerse || ',';
    return `${ref.bookId} ${ref.chapter}${sep}${ref.verse}`;
  }

  /**
   * Find co-occurring verses
   * Returns map of verseKey → { count, ref, files }
   */
  private findCoOccurrences(): Map<string, CoOccurrenceData> {
    const coOccurrences = new Map<string, CoOccurrenceData>();

    // Build set of current verse keys
    const currentVerseKeys = new Set(
      this.currentRefs.map(r => `${r.bookId}/${r.chapter}/${r.verse}`)
    );

    // Build set of current tags for matching
    const currentTags = new Set(
      this.currentRefs.map(r => `${this.settings.tagPrefix}${r.bookId}/${r.chapter}/${r.verse}`)
    );

    const files = this.app.vault.getMarkdownFiles();

    for (const file of files) {
      // Skip current file
      if (this.currentFile && file.path === this.currentFile.path) {
        continue;
      }

      // Check frontmatter
      const cache = this.app.metadataCache.getFileCache(file);
      if (!cache?.frontmatter) continue;

      const refs = cache.frontmatter[this.settings.frontmatterKey];
      if (!refs || !Array.isArray(refs)) continue;

      // Check if this file contains any of our current verses
      const hasCurrentVerse = refs.some((tag: string) => currentTags.has(tag));
      if (!hasCurrentVerse) continue;

      // Count all OTHER verses in this file as co-occurrences
      for (const tag of refs) {
        if (!tag.startsWith(this.settings.tagPrefix)) continue;

        const tagContent = tag.slice(this.settings.tagPrefix.length);
        const parts = tagContent.split('/');

        if (parts.length !== 3) continue;

        const verseKey = tagContent;

        // Skip if it's one of our current verses
        if (currentVerseKeys.has(verseKey)) continue;

        const [bookId, chapterStr, verseStr] = parts;
        const chapter = parseInt(chapterStr, 10);
        const verse = parseInt(verseStr, 10);

        if (isNaN(chapter) || isNaN(verse)) continue;

        if (!coOccurrences.has(verseKey)) {
          coOccurrences.set(verseKey, {
            count: 0,
            ref: { bookId, chapter, verse },
            files: []
          });
        }

        const entry = coOccurrences.get(verseKey)!;
        entry.count++;
        // Add file if not already in list
        if (!entry.files.some(f => f.path === file.path)) {
          entry.files.push(file);
        }
      }
    }

    return coOccurrences;
  }
}
