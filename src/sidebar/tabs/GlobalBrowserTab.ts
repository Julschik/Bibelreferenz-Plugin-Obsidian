import { App, TFile, setIcon } from 'obsidian';
import type { BibleRefSettings } from '../../types';
import type { I18nService } from '../../i18n/I18nService';
import { BIBLE_BOOK_ORDER } from '../../data/bibleStructure';
import { getBookByDisplayId } from '../../languages/registry';
import type { Locale } from '../../languages/types';

/**
 * ReferenceIndex
 * Index of all Bible references in the vault
 */
interface ReferenceIndex {
  books: Set<string>;                    // All books with references
  chapters: Map<string, Set<number>>;    // bookId → chapters
  verses: Map<string, Set<number>>;      // "bookId/chapter" → verses
}

/**
 * GlobalBrowserTab
 *
 * Tab 3: Searchable browser of all Bible references in the vault.
 * Uses cascading dropdowns: Book → Chapter → Verse
 * Only shows options that actually exist in notes.
 */
export class GlobalBrowserTab {
  private app: App;
  private i18n: I18nService;
  private settings: BibleRefSettings;
  private containerEl: HTMLElement;

  private index: ReferenceIndex;
  private selectedBook: string | null = null;
  private selectedChapter: number | null = null;
  private selectedVerse: number | null = null;

  constructor(app: App, i18n: I18nService, settings: BibleRefSettings) {
    this.app = app;
    this.i18n = i18n;
    this.settings = settings;
    this.index = { books: new Set(), chapters: new Map(), verses: new Map() };
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

    // Build index first
    this.buildIndex();

    if (this.index.books.size === 0) {
      this.renderEmptyState();
      return;
    }

    // Render filter dropdowns
    this.renderFilters();

    // Render results
    this.renderResults();
  }

  /**
   * Build index of all references in vault
   */
  private buildIndex(): void {
    this.index = { books: new Set(), chapters: new Map(), verses: new Map() };

    const files = this.app.vault.getMarkdownFiles();

    for (const file of files) {
      const cache = this.app.metadataCache.getFileCache(file);
      if (!cache?.frontmatter) continue;

      const refs = cache.frontmatter[this.settings.frontmatterKey];
      if (!refs || !Array.isArray(refs)) continue;

      for (const tag of refs) {
        if (!tag.startsWith(this.settings.tagPrefix)) continue;

        const tagContent = tag.slice(this.settings.tagPrefix.length);
        const parts = tagContent.split('/');

        if (parts.length < 1) continue;

        const bookId = parts[0];
        this.index.books.add(bookId);

        if (parts.length >= 2) {
          const chapter = parseInt(parts[1], 10);
          if (!isNaN(chapter)) {
            if (!this.index.chapters.has(bookId)) {
              this.index.chapters.set(bookId, new Set());
            }
            this.index.chapters.get(bookId)!.add(chapter);

            if (parts.length >= 3) {
              const verse = parseInt(parts[2], 10);
              if (!isNaN(verse)) {
                const verseKey = `${bookId}/${chapter}`;
                if (!this.index.verses.has(verseKey)) {
                  this.index.verses.set(verseKey, new Set());
                }
                this.index.verses.get(verseKey)!.add(verse);
              }
            }
          }
        }
      }
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
  }

  /**
   * Render filter dropdowns (always show all three, progressively enable)
   */
  private renderFilters(): void {
    const filtersEl = this.containerEl.createDiv('bible-ref-filters');

    // Book dropdown (always enabled)
    const bookSelect = filtersEl.createEl('select', { cls: 'bible-ref-dropdown' });
    bookSelect.createEl('option', {
      text: this.i18n.t('sidebarSelectBook'),
      value: ''
    });

    const sortedBooks = this.getSortedBooks();
    for (const bookId of sortedBooks) {
      bookSelect.createEl('option', {
        text: this.getBookDisplayName(bookId),
        value: bookId
      });
    }

    if (this.selectedBook) {
      bookSelect.value = this.selectedBook;
    }

    bookSelect.addEventListener('change', () => {
      this.selectedBook = bookSelect.value || null;
      this.selectedChapter = null;
      this.selectedVerse = null;
      this.render(this.containerEl);
    });

    // Chapter dropdown (disabled until book selected)
    const chapterSelect = filtersEl.createEl('select', { cls: 'bible-ref-dropdown' });
    chapterSelect.createEl('option', {
      text: this.i18n.t('sidebarSelectChapter'),
      value: ''
    });

    if (!this.selectedBook) {
      chapterSelect.disabled = true;
    } else {
      const chapters = this.index.chapters.get(this.selectedBook);
      if (chapters && chapters.size > 0) {
        const sortedChapters = [...chapters].sort((a, b) => a - b);
        for (const chapter of sortedChapters) {
          chapterSelect.createEl('option', { text: String(chapter), value: String(chapter) });
        }
      }

      if (this.selectedChapter !== null) {
        chapterSelect.value = String(this.selectedChapter);
      }

      chapterSelect.addEventListener('change', () => {
        this.selectedChapter = chapterSelect.value ? parseInt(chapterSelect.value, 10) : null;
        this.selectedVerse = null;
        this.render(this.containerEl);
      });
    }

    // Verse dropdown (disabled until chapter selected)
    const verseSelect = filtersEl.createEl('select', { cls: 'bible-ref-dropdown' });
    verseSelect.createEl('option', {
      text: this.i18n.t('sidebarSelectVerse'),
      value: ''
    });

    if (!this.selectedBook || this.selectedChapter === null) {
      verseSelect.disabled = true;
    } else {
      const verseKey = `${this.selectedBook}/${this.selectedChapter}`;
      const verses = this.index.verses.get(verseKey);
      if (verses && verses.size > 0) {
        const sortedVerses = [...verses].sort((a, b) => a - b);
        for (const verse of sortedVerses) {
          verseSelect.createEl('option', { text: String(verse), value: String(verse) });
        }
      }

      if (this.selectedVerse !== null) {
        verseSelect.value = String(this.selectedVerse);
      }

      verseSelect.addEventListener('change', () => {
        this.selectedVerse = verseSelect.value ? parseInt(verseSelect.value, 10) : null;
        this.render(this.containerEl);
      });
    }
  }

  /**
   * Render results based on current selection (progressive filtering)
   * Shows results as soon as a book is selected
   */
  private renderResults(): void {
    // Show results as soon as a book is selected
    if (!this.selectedBook) {
      return;
    }

    const resultsEl = this.containerEl.createDiv('bible-ref-results');

    // Build the search pattern and display text based on selection level
    let searchTag: string;
    let displayText: string;
    let isPrefix: boolean;

    const sep = this.settings.separators.chapterVerse || ',';

    if (this.selectedVerse !== null && this.selectedChapter !== null) {
      // Specific verse selected
      searchTag = `${this.settings.tagPrefix}${this.selectedBook}/${this.selectedChapter}/${this.selectedVerse}`;
      displayText = `${this.selectedBook} ${this.selectedChapter}${sep}${this.selectedVerse}`;
      isPrefix = false;
    } else if (this.selectedChapter !== null) {
      // Chapter selected (any verse in chapter)
      searchTag = `${this.settings.tagPrefix}${this.selectedBook}/${this.selectedChapter}/`;
      displayText = `${this.selectedBook} ${this.selectedChapter}`;
      isPrefix = true;
    } else {
      // Only book selected (any verse in book)
      searchTag = `${this.settings.tagPrefix}${this.selectedBook}/`;
      displayText = this.selectedBook;
      isPrefix = true;
    }

    // Find matching files with their associated verses
    const fileVersesMap = this.findFilesWithVerses(searchTag, isPrefix);

    // Header
    resultsEl.createEl('h4', {
      text: this.i18n.t('sidebarNotesWithVerse', { verse: displayText }),
      cls: 'bible-ref-results-header'
    });

    if (fileVersesMap.size === 0) {
      resultsEl.createEl('p', {
        text: this.i18n.t('sidebarNoOtherNotes'),
        cls: 'bible-ref-empty-hint'
      });
    } else {
      const listEl = resultsEl.createDiv('bible-ref-expandable-list');

      for (const [verse, files] of fileVersesMap) {
        this.renderVerseItem(listEl, verse, files);
      }
    }
  }

  /**
   * Render a single verse with expandable list of notes that contain it
   */
  private renderVerseItem(
    containerEl: HTMLElement,
    verse: string,
    files: TFile[]
  ): void {
    const itemEl = containerEl.createDiv('bible-ref-expandable');

    // Header row (clickable to expand)
    const headerEl = itemEl.createDiv('bible-ref-expandable-header');

    // Expand/collapse icon
    const expandIcon = headerEl.createSpan({ cls: 'bible-ref-expand-icon' });
    setIcon(expandIcon, 'chevron-right');

    // Verse display
    headerEl.createEl('span', {
      text: verse,
      cls: 'bible-ref-parallel-verse'
    });

    // File count
    headerEl.createEl('span', {
      text: this.i18n.t('sidebarParallelCount', { count: files.length }),
      cls: 'bible-ref-parallel-count'
    });

    // Expandable content (initially hidden)
    const contentEl = itemEl.createDiv('bible-ref-parallel-files');
    contentEl.style.display = 'none';

    // Create note list
    const listEl = contentEl.createEl('ul', { cls: 'bible-ref-note-list' });
    for (const file of files) {
      const li = listEl.createEl('li');
      const link = li.createEl('a', {
        text: file.basename,
        cls: 'bible-ref-note-link'
      });
      link.addEventListener('click', (e: unknown) => {
        const event = e as { preventDefault: () => void; stopPropagation: () => void };
        event.preventDefault();
        event.stopPropagation();
        this.openNote(file);
      });
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
   * Find files with verses - returns map of verse text → array of files
   * Inverted from file → verses to verse → files structure
   */
  private findFilesWithVerses(tag: string, isPrefix: boolean): Map<string, TFile[]> {
    const results = new Map<string, TFile[]>();
    const files = this.app.vault.getMarkdownFiles();

    const sep = this.settings.separators.chapterVerse || ',';

    for (const file of files) {
      const cache = this.app.metadataCache.getFileCache(file);
      if (!cache?.frontmatter) continue;

      const refs = cache.frontmatter[this.settings.frontmatterKey];
      if (!refs || !Array.isArray(refs)) continue;

      for (const t of refs) {
        const isMatch = isPrefix ? t.startsWith(tag) : t === tag;
        if (isMatch) {
          // Extract verse reference from tag
          const tagContent = t.slice(this.settings.tagPrefix.length);
          const parts = tagContent.split('/');
          if (parts.length === 3) {
            const [bookId, chapter, verse] = parts;
            const verseText = `${bookId} ${chapter}${sep}${verse}`;

            // Add file to verse's list instead of verse to file's list
            if (!results.has(verseText)) {
              results.set(verseText, []);
            }
            results.get(verseText)!.push(file);
          }
        }
      }
    }

    return results;
  }

  /**
   * Get display name for a book ID
   * Returns full book name (e.g., "Johannes") instead of abbreviation (e.g., "Joh")
   */
  private getBookDisplayName(bookId: string): string {
    const book = getBookByDisplayId(this.settings.language as Locale, bookId);

    // Return displayName or fall back to bookId
    return book?.displayName || bookId;
  }

  /**
   * Get books sorted by biblical order
   */
  private getSortedBooks(): string[] {
    return [...this.index.books].sort((a, b) => {
      const aIndex = BIBLE_BOOK_ORDER.indexOf(a);
      const bIndex = BIBLE_BOOK_ORDER.indexOf(b);
      // If not found in order, put at end
      const aOrder = aIndex === -1 ? 999 : aIndex;
      const bOrder = bIndex === -1 ? 999 : bIndex;
      return aOrder - bOrder;
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
}
