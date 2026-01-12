import { setIcon } from 'obsidian';

export interface SettingsCollapsibleSectionOptions {
  title: string;
  description: string;
  defaultExpanded?: boolean;
  onToggle?: (expanded: boolean) => void;
}

/**
 * SettingsCollapsibleSection Component
 *
 * A collapsible section specifically designed for settings pages.
 * Shows a title and short description in the header, with content hidden by default.
 */
export class SettingsCollapsibleSection {
  private containerEl: HTMLElement;
  private contentEl: HTMLElement;
  private expandIcon: HTMLElement;
  private sectionEl: HTMLElement;
  private isExpanded: boolean;
  private options: SettingsCollapsibleSectionOptions;

  constructor(containerEl: HTMLElement, options: SettingsCollapsibleSectionOptions) {
    this.containerEl = containerEl;
    this.options = options;
    this.isExpanded = options.defaultExpanded ?? false;
    this.render();
  }

  private render(): void {
    this.sectionEl = this.containerEl.createDiv('bible-ref-settings-section');

    // Header with title and description
    const headerEl = this.sectionEl.createDiv('bible-ref-settings-section-header');

    this.expandIcon = headerEl.createSpan({ cls: 'bible-ref-expand-icon' });
    setIcon(this.expandIcon, this.isExpanded ? 'chevron-down' : 'chevron-right');

    const textContainer = headerEl.createDiv('bible-ref-settings-section-text');

    textContainer.createEl('span', {
      text: this.options.title,
      cls: 'bible-ref-settings-section-title'
    });

    textContainer.createEl('span', {
      text: this.options.description,
      cls: 'bible-ref-settings-section-desc'
    });

    // Content
    this.contentEl = this.sectionEl.createDiv('bible-ref-settings-section-content');
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
}
