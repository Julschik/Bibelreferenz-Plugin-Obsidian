import { setIcon } from 'obsidian';

export interface CollapsibleSectionOptions {
  title: string;
  defaultExpanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  icon?: string;
}

/**
 * CollapsibleSection Component
 *
 * Reusable collapsible section with chevron icon.
 * Follows existing patterns from GlobalBrowserTab.
 */
export class CollapsibleSection {
  private containerEl: HTMLElement;
  private contentEl: HTMLElement;
  private expandIcon: HTMLElement;
  private sectionEl: HTMLElement;
  private isExpanded: boolean;
  private options: CollapsibleSectionOptions;

  constructor(containerEl: HTMLElement, options: CollapsibleSectionOptions) {
    this.containerEl = containerEl;
    this.options = options;
    this.isExpanded = options.defaultExpanded ?? false;
    this.render();
  }

  private render(): void {
    this.sectionEl = this.containerEl.createDiv('bible-ref-expandable');

    // Header
    const headerEl = this.sectionEl.createDiv('bible-ref-expandable-header');

    this.expandIcon = headerEl.createSpan({ cls: 'bible-ref-expand-icon' });
    setIcon(this.expandIcon, this.isExpanded ? 'chevron-down' : 'chevron-right');

    if (this.options.icon) {
      const iconEl = headerEl.createSpan({ cls: 'bible-ref-section-icon' });
      setIcon(iconEl, this.options.icon);
    }

    headerEl.createEl('span', {
      text: this.options.title,
      cls: 'bible-ref-section-title'
    });

    // Content
    this.contentEl = this.sectionEl.createDiv('bible-ref-expandable-content');
    this.contentEl.style.display = this.isExpanded ? 'block' : 'none';

    // Toggle handler
    headerEl.addEventListener('click', () => {
      this.toggle();
    });

    if (this.isExpanded) {
      this.sectionEl.addClass('expanded');
    }
  }

  private toggle(): void {
    this.isExpanded = !this.isExpanded;
    this.contentEl.style.display = this.isExpanded ? 'block' : 'none';
    setIcon(this.expandIcon, this.isExpanded ? 'chevron-down' : 'chevron-right');

    if (this.isExpanded) {
      this.sectionEl.addClass('expanded');
    } else {
      this.sectionEl.removeClass('expanded');
    }

    if (this.options.onToggle) {
      this.options.onToggle(this.isExpanded);
    }
  }

  public getContentElement(): HTMLElement {
    return this.contentEl;
  }

  public setExpanded(expanded: boolean): void {
    if (this.isExpanded !== expanded) {
      this.toggle();
    }
  }

  public destroy(): void {
    // Cleanup handled by parent container.empty()
  }
}
