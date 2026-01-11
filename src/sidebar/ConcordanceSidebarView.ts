import { ItemView, WorkspaceLeaf, TFile, MarkdownView } from 'obsidian';
import type BibleRefPlugin from '../main';
import type { ParsedReference } from '../types';
import { SyncButton } from './SyncButton';

/**
 * Bible Reference Concordance Sidebar View
 *
 * Zeigt:
 * - Alle Bible References der aktuellen Datei
 * - Related Notes (Concordance)
 * - Sync Button
 *
 * Architecture:
 * - ItemView ist die Basis-Klasse für Sidebar-Views in Obsidian
 * - Wird über this.plugin registriert und in die Right Sidebar geladen
 */
export const VIEW_TYPE_CONCORDANCE = 'bible-ref-concordance';

export class ConcordanceSidebarView extends ItemView {
  private plugin: BibleRefPlugin;
  private syncButton: SyncButton;
  private currentFile: TFile | null = null;
  private currentReferences: ParsedReference[] = [];

  constructor(leaf: WorkspaceLeaf, plugin: BibleRefPlugin) {
    super(leaf);
    this.plugin = plugin;
  }

  /**
   * View Type Identifier
   * Wird von Obsidian verwendet, um View zu identifizieren.
   */
  getViewType(): string {
    return VIEW_TYPE_CONCORDANCE;
  }

  /**
   * Display Text
   * Der Titel, der im Sidebar-Tab angezeigt wird.
   */
  getDisplayText(): string {
    return 'Bible References';
  }

  /**
   * Icon
   * Das Icon für den Sidebar-Tab.
   */
  getIcon(): string {
    return 'book-open';
  }

  /**
   * onOpen
   * Wird aufgerufen, wenn die View geöffnet wird.
   * Hier bauen wir die UI auf.
   */
  async onOpen(): Promise<void> {
    const { contentEl } = this;

    // Clear existing content
    contentEl.empty();

    // Add CSS class for styling
    contentEl.addClass('bible-ref-concordance-view');

    // Create header container
    const headerEl = contentEl.createDiv('bible-ref-header');

    // Create title
    const titleEl = headerEl.createEl('h4', {
      text: 'Bible References',
      cls: 'bible-ref-title'
    });

    // Create sync button
    this.syncButton = new SyncButton(headerEl, async () => {
      await this.syncCurrentFile();
    });

    // Create content container
    const contentContainer = contentEl.createDiv('bible-ref-content');

    // Register event: File opened/switched
    this.registerEvent(
      this.app.workspace.on('file-open', (file) => {
        this.onFileOpen(file);
      })
    );

    // Register event: File modified (for live updates)
    this.registerEvent(
      this.app.workspace.on('editor-change', (editor, view) => {
        if (view instanceof MarkdownView && view.file) {
          this.onFileModified(view.file);
        }
      })
    );

    // Initial load: Get currently active file
    const activeFile = this.app.workspace.getActiveFile();
    if (activeFile) {
      await this.onFileOpen(activeFile);
    } else {
      this.renderEmptyState(contentContainer);
    }
  }

  /**
   * onClose
   * Wird aufgerufen, wenn die View geschlossen wird.
   */
  async onClose(): Promise<void> {
    // Cleanup
    if (this.syncButton) {
      this.syncButton.destroy();
    }
  }

  /**
   * File Opened Event
   * Wird aufgerufen, wenn eine neue Datei geöffnet wird.
   */
  private async onFileOpen(file: TFile | null): Promise<void> {
    this.currentFile = file;

    if (!file) {
      this.renderEmptyState();
      return;
    }

    // Load references from cache or parse
    await this.loadReferences(file);
    this.render();
  }

  /**
   * File Modified Event
   * Wird aufgerufen, wenn die aktuelle Datei geändert wird (live updates).
   */
  private async onFileModified(file: TFile): Promise<void> {
    if (this.currentFile?.path !== file.path) {
      return;
    }

    // Reload references (debounced würde hier Sinn machen für Production)
    await this.loadReferences(file);
    this.render();
  }

  /**
   * Load References
   * Lädt die Bible References der aktuellen Datei aus dem Frontmatter.
   */
  private async loadReferences(file: TFile): Promise<void> {
    try {
      // Read file cache
      const cache = this.app.metadataCache.getFileCache(file);

      if (!cache?.frontmatter) {
        this.currentReferences = [];
        return;
      }

      // Get frontmatter key from settings
      const frontmatterKey = this.plugin.settings.frontmatterKey || 'bible-refs';
      const refs = cache.frontmatter[frontmatterKey];

      if (!refs || !Array.isArray(refs)) {
        this.currentReferences = [];
        return;
      }

      // Parse tags back to ParsedReference
      this.currentReferences = this.parseTagsToReferences(refs);
    } catch (error) {
      console.error('Error loading references:', error);
      this.currentReferences = [];
    }
  }

  /**
   * Parse Tags to References
   * Konvertiert Tags (z.B. "bible/Col-3-16") zurück zu ParsedReference-Objekten.
   */
  private parseTagsToReferences(tags: string[]): ParsedReference[] {
    const tagPrefix = this.plugin.settings.tagPrefix || 'bible/';
    const references: ParsedReference[] = [];

    for (const tag of tags) {
      if (!tag.startsWith(tagPrefix)) {
        continue;
      }

      // Remove prefix: "bible/Col-3-16" → "Col-3-16"
      const tagContent = tag.slice(tagPrefix.length);

      // Parse format: "BookId-Chapter-Verse" or "BookId-Chapter"
      const parts = tagContent.split('-');

      if (parts.length === 0) {
        continue;
      }

      const bookId = parts[0];
      const chapter = parts.length > 1 ? parseInt(parts[1], 10) : undefined;
      const verse = parts.length > 2 ? parseInt(parts[2], 10) : undefined;

      // Determine granularity
      let granularity: 'book' | 'chapter' | 'verse' = 'book';
      if (verse !== undefined) {
        granularity = 'verse';
      } else if (chapter !== undefined) {
        granularity = 'chapter';
      }

      references.push({
        raw: tagContent,
        bookId,
        granularity,
        startChapter: chapter,
        startVerse: verse
      });
    }

    return references;
  }

  /**
   * Render
   * Rendert die komplette Sidebar UI basierend auf currentReferences.
   */
  private render(): void {
    const contentContainer = this.contentEl.querySelector('.bible-ref-content');

    if (!contentContainer) {
      return;
    }

    // Clear content
    contentContainer.empty();

    // If no file or no references
    if (!this.currentFile || this.currentReferences.length === 0) {
      this.renderEmptyState(contentContainer);
      return;
    }

    // Render file info
    this.renderFileInfo(contentContainer);

    // Render references list
    this.renderReferencesList(contentContainer);

    // TODO Phase 6: Related Notes (Concordance)
    // this.renderRelatedNotes(contentContainer);
  }

  /**
   * Render Empty State
   * Zeigt eine Meldung, wenn keine Referenzen vorhanden sind.
   */
  private renderEmptyState(container?: Element): void {
    const target = container || this.contentEl.querySelector('.bible-ref-content');

    if (!target) {
      return;
    }

    target.empty();

    const emptyEl = target.createDiv('bible-ref-empty');
    emptyEl.createEl('p', {
      text: 'No Bible references found',
      cls: 'bible-ref-empty-text'
    });
    emptyEl.createEl('p', {
      text: 'Open a note with Bible references to see them here.',
      cls: 'bible-ref-empty-subtext'
    });
  }

  /**
   * Render File Info
   * Zeigt den Dateinamen und die Anzahl der Referenzen.
   */
  private renderFileInfo(container: Element): void {
    const fileInfoEl = container.createDiv('bible-ref-file-info');

    const fileName = this.currentFile?.basename || 'Unknown';
    const refCount = this.currentReferences.length;

    fileInfoEl.createEl('div', {
      text: fileName,
      cls: 'bible-ref-file-name'
    });

    fileInfoEl.createEl('div', {
      text: `${refCount} reference${refCount !== 1 ? 's' : ''}`,
      cls: 'bible-ref-count'
    });
  }

  /**
   * Render References List
   * Zeigt alle Bible References als Liste.
   */
  private renderReferencesList(container: Element): void {
    const listEl = container.createDiv('bible-ref-list');

    // Group by book for better UX
    const groupedRefs = this.groupReferencesByBook(this.currentReferences);

    for (const [bookId, refs] of Object.entries(groupedRefs)) {
      // Create book group
      const bookGroupEl = listEl.createDiv('bible-ref-book-group');

      // Book header
      const bookHeaderEl = bookGroupEl.createDiv('bible-ref-book-header');
      bookHeaderEl.createEl('strong', {
        text: bookId,
        cls: 'bible-ref-book-name'
      });

      // Reference items
      const refItemsEl = bookGroupEl.createDiv('bible-ref-items');

      for (const ref of refs) {
        const refItemEl = refItemsEl.createDiv('bible-ref-item');

        // Format display text
        const displayText = this.formatReferenceDisplay(ref);

        refItemEl.createEl('span', {
          text: displayText,
          cls: 'bible-ref-text'
        });

        // Clickable: Scroll to reference in document (optional enhancement)
        refItemEl.addClass('bible-ref-clickable');
        refItemEl.addEventListener('click', () => {
          this.onReferenceClick(ref);
        });
      }
    }
  }

  /**
   * Group References by Book
   * Gruppiert Referenzen nach Buch für bessere Übersichtlichkeit.
   */
  private groupReferencesByBook(refs: ParsedReference[]): Record<string, ParsedReference[]> {
    const grouped: Record<string, ParsedReference[]> = {};

    for (const ref of refs) {
      if (!grouped[ref.bookId]) {
        grouped[ref.bookId] = [];
      }
      grouped[ref.bookId].push(ref);
    }

    return grouped;
  }

  /**
   * Format Reference Display
   * Formatiert eine Referenz für die Anzeige (z.B. "3:16" oder "3").
   */
  private formatReferenceDisplay(ref: ParsedReference): string {
    const sep = this.plugin.settings.separators.chapterVerse || ',';

    if (ref.granularity === 'verse' && ref.startChapter && ref.startVerse) {
      // Range?
      if (ref.endVerse && ref.endVerse !== ref.startVerse) {
        return `${ref.startChapter}${sep}${ref.startVerse}-${ref.endVerse}`;
      }
      return `${ref.startChapter}${sep}${ref.startVerse}`;
    }

    if (ref.granularity === 'chapter' && ref.startChapter) {
      return `${ref.startChapter}`;
    }

    return '(entire book)';
  }

  /**
   * Reference Click Handler
   * Wird aufgerufen, wenn auf eine Referenz geklickt wird.
   * Könnte z.B. zur Referenz im Dokument scrollen.
   */
  private onReferenceClick(ref: ParsedReference): void {
    // TODO Phase 6: Implement scroll-to-reference or open related notes
    console.log('Reference clicked:', ref);
  }

  /**
   * Sync Current File
   * Synchronisiert die aktuell geöffnete Datei.
   */
  private async syncCurrentFile(): Promise<void> {
    if (!this.currentFile) {
      return;
    }

    this.syncButton.setLoading(true);

    try {
      const result = await this.plugin.syncManager.syncFile(this.currentFile);

      // Reload references
      await this.loadReferences(this.currentFile);
      this.render();

      this.syncButton.setSuccess();
    } catch (error) {
      console.error('Error syncing file:', error);
      this.syncButton.setError();
    }
  }
}
