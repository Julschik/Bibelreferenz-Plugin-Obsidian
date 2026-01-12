import { App, TFile } from 'obsidian';
import type { ExpandedReference, LinkBehavior, BibleRefSettings } from '../../types';
import type { I18nService } from '../../i18n/I18nService';

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

    // Group references by verse key
    const groupedRefs = this.groupByVerse(this.currentRefs);

    for (const [verseKey, refs] of groupedRefs) {
      this.renderVerseGroup(verseKey, refs[0]);
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
   * Render a verse group with related notes
   */
  private renderVerseGroup(verseKey: string, ref: ExpandedReference): void {
    const groupEl = this.containerEl.createDiv('bible-ref-group');

    // Verse header
    const verseDisplay = this.formatVerse(ref);
    groupEl.createEl('h4', {
      text: verseDisplay,
      cls: 'bible-ref-verse-header'
    });

    // Find other notes with this verse
    const otherNotes = this.findNotesWithVerse(ref);

    if (otherNotes.length === 0) {
      groupEl.createEl('p', {
        text: this.i18n.t('sidebarNoOtherNotes'),
        cls: 'bible-ref-empty-hint'
      });
    } else {
      const listEl = groupEl.createEl('ul', { cls: 'bible-ref-note-list' });

      for (const note of otherNotes) {
        const li = listEl.createEl('li');
        const link = li.createEl('a', {
          text: note.basename,
          cls: 'bible-ref-note-link'
        });
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.openNote(note);
        });
      }
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
