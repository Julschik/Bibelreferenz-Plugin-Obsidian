import { App, TFile, setIcon } from 'obsidian';
import type { ExpandedReference, LinkBehavior, BibleRefSettings, ReferenceSortMode } from '../../types';
import type { I18nService } from '../../i18n/I18nService';
import {
  sortByCanonicalOrder,
  sortAlphabetically,
  sortByCount,
  makeVerseKey
} from '../../utils/sortUtils';

/**
 * DirectReferencesTab
 *
 * Tab 1: Shows notes that share verses with the current note.
 * Groups by verse and shows "no other notes" hint when empty.
 */
export class DirectReferencesTab {
  private app: App;
  private i18n: I18nService;
  private settings: BibleRefSettings;
  private containerEl: HTMLElement;
  private currentFile: TFile | null = null;
  private currentRefs: ExpandedReference[] = [];
  private sortMode: ReferenceSortMode = 'document';

  constructor(app: App, i18n: I18nService, settings: BibleRefSettings) {
    this.app = app;
    this.i18n = i18n;
    this.settings = settings;
  }

  /**
   * Set current file and references
   */
  setData(file: TFile | null, refs: ExpandedReference[], sortMode: ReferenceSortMode = 'document'): void {
    this.currentFile = file;
    this.currentRefs = refs;
    this.sortMode = sortMode;
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

    // Get sorted references
    const sortedRefs = this.getSortedRefs();

    // Group references by verse key (maintains sorted order due to Map insertion order)
    const groupedRefs = this.groupByVerse(sortedRefs);

    // Create list wrapper with shared expandable styles
    const listEl = containerEl.createDiv('bible-ref-expandable-list');

    for (const [, refs] of groupedRefs) {
      this.renderVerseGroup(listEl, refs[0]);
    }
  }

  /**
   * Get references sorted according to current sort mode
   */
  private getSortedRefs(): ExpandedReference[] {
    switch (this.sortMode) {
      case 'canonical':
        return sortByCanonicalOrder(this.currentRefs);

      case 'alpha-asc':
        return sortAlphabetically(this.currentRefs, false);

      case 'alpha-desc':
        return sortAlphabetically(this.currentRefs, true);

      case 'count':
        return sortByCount(this.currentRefs, (ref) => {
          return this.findNotesWithVerse(ref).length;
        });

      case 'document':
      default:
        // Document order: use refs as-is (preserves order from parsing/frontmatter)
        return this.currentRefs;
    }
  }

  /**
   * Render empty state
   */
  private renderEmptyState(): void {
    const emptyEl = this.containerEl.createDiv('bible-ref-empty');
    emptyEl.createEl('p', {
      text: this.i18n.t('sidebarNoReferences'),
      cls: 'bible-ref-empty-text'
    });
    emptyEl.createEl('p', {
      text: this.i18n.t('sidebarEmpty'),
      cls: 'bible-ref-empty-subtext'
    });
  }

  /**
   * Render a verse group with related notes (collapsable)
   */
  private renderVerseGroup(listEl: HTMLElement, ref: ExpandedReference): void {
    const itemEl = listEl.createDiv('bible-ref-expandable');

    // Header row (clickable to expand)
    const headerEl = itemEl.createDiv('bible-ref-expandable-header');

    // Expand/collapse icon
    const expandIcon = headerEl.createSpan({ cls: 'bible-ref-expand-icon' });
    setIcon(expandIcon, 'chevron-right');

    // Verse display
    const verseDisplay = this.formatVerse(ref);
    headerEl.createEl('span', {
      text: verseDisplay,
      cls: 'bible-ref-parallel-verse'
    });

    // Find other notes with this verse
    const otherNotes = this.findNotesWithVerse(ref);

    // Count display
    if (otherNotes.length > 0) {
      headerEl.createEl('span', {
        text: this.i18n.t('sidebarParallelCount', { count: otherNotes.length }),
        cls: 'bible-ref-parallel-count'
      });
    }

    // Expandable content (initially hidden)
    const contentEl = itemEl.createDiv('bible-ref-parallel-files');
    contentEl.style.display = 'none';

    if (otherNotes.length === 0) {
      contentEl.createEl('p', {
        text: this.i18n.t('sidebarNoOtherNotes'),
        cls: 'bible-ref-empty-hint'
      });
    } else {
      const noteListEl = contentEl.createEl('ul', { cls: 'bible-ref-note-list' });

      for (const note of otherNotes) {
        const li = noteListEl.createEl('li');
        const link = li.createEl('a', {
          text: note.basename,
          cls: 'bible-ref-note-link'
        });
        link.addEventListener('click', (e: unknown) => {
          const event = e as { preventDefault: () => void; stopPropagation: () => void };
          event.preventDefault();
          event.stopPropagation();
          this.openNote(note);
        });
      }
    }

    // Toggle expand/collapse
    headerEl.addEventListener('click', () => {
      const isExpanded = contentEl.style.display !== 'none';
      contentEl.style.display = isExpanded ? 'none' : 'block';
      setIcon(expandIcon, isExpanded ? 'chevron-right' : 'chevron-down');
      if (isExpanded) {
        itemEl.removeClass('expanded');
      } else {
        itemEl.addClass('expanded');
      }
    });
  }

  /**
   * Format verse for display
   */
  private formatVerse(ref: ExpandedReference): string {
    const sep = this.settings.separators.chapterVerse || ',';
    return `${ref.bookId} ${ref.chapter}${sep}${ref.verse}`;
  }

  /**
   * Find notes that contain the given verse (excluding current file)
   */
  private findNotesWithVerse(ref: ExpandedReference): TFile[] {
    const results: TFile[] = [];
    const targetTag = `${this.settings.tagPrefix}${ref.bookId}/${ref.chapter}/${ref.verse}`;
    const files = this.app.vault.getMarkdownFiles();

    for (const file of files) {
      // Skip current file
      if (this.currentFile && file.path === this.currentFile.path) {
        continue;
      }

      // Check frontmatter for matching tag
      const cache = this.app.metadataCache.getFileCache(file);
      if (!cache?.frontmatter) continue;

      const refs = cache.frontmatter[this.settings.frontmatterKey];
      if (!refs || !Array.isArray(refs)) continue;

      if (refs.includes(targetTag)) {
        results.push(file);
      }
    }

    return results;
  }

  /**
   * Group references by verse key (bookId/chapter/verse)
   */
  private groupByVerse(refs: ExpandedReference[]): Map<string, ExpandedReference[]> {
    const grouped = new Map<string, ExpandedReference[]>();

    for (const ref of refs) {
      const key = `${ref.bookId}/${ref.chapter}/${ref.verse}`;
      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key)!.push(ref);
    }

    return grouped;
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
}
