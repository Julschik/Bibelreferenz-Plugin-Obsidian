import { setIcon, Notice } from 'obsidian';

export interface PillInputOptions {
  placeholder?: string;
  defaultValues?: string[];    // Default values (from bookMappings)
  customValues?: string[];     // User-added values
  pinnedValue?: string;        // Currently pinned value (if any)
  onAdd?: (value: string) => void;
  onRemove?: (value: string, isDefault: boolean) => void;
  onPin?: (value: string, isDefault: boolean) => void;  // Pin callback
}

/**
 * PillInput Component
 *
 * Displays a list of values as pills with X buttons on hover.
 * Allows adding new values via Enter key.
 * Distinguishes between default pills (from bookMappings) and custom pills.
 */
export class PillInput {
  private containerEl: HTMLElement;
  private options: PillInputOptions;
  private inputEl: HTMLInputElement;

  constructor(containerEl: HTMLElement, options: PillInputOptions) {
    this.containerEl = containerEl;
    this.options = options;
    this.render();
  }

  private render(): void {
    this.containerEl.empty();
    this.containerEl.addClass('bible-ref-pill-container');

    // Render default pills
    if (this.options.defaultValues) {
      for (const value of this.options.defaultValues) {
        this.renderPill(value, true);
      }
    }

    // Render custom pills
    if (this.options.customValues) {
      for (const value of this.options.customValues) {
        this.renderPill(value, false);
      }
    }

    // Render input field
    this.inputEl = this.containerEl.createEl('input', {
      cls: 'bible-ref-pill-input',
      attr: {
        type: 'text',
        placeholder: this.options.placeholder || 'Press Enter to add...'
      }
    });

    this.inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.addValue(this.inputEl.value.trim());
      }
    });
  }

  private renderPill(value: string, isDefault: boolean): void {
    const pillEl = this.renderPillElement(value, isDefault);
    this.containerEl.appendChild(pillEl);
  }

  private renderPillElement(value: string, isDefault: boolean): HTMLElement {
    const pillEl = document.createElement('div');
    pillEl.className = 'bible-ref-pill';

    if (isDefault) {
      pillEl.classList.add('default');
    }

    // Check if this pill is pinned
    const isPinned = this.options.pinnedValue === value;
    if (isPinned) {
      pillEl.classList.add('pinned');
    }

    pillEl.createSpan({ text: value });

    // Hover actions container
    const actionsEl = pillEl.createSpan({ cls: 'bible-ref-pill-actions' });

    // Pin button
    const pinBtn = actionsEl.createSpan({ cls: 'bible-ref-pill-pin' });
    setIcon(pinBtn, isPinned ? 'pin' : 'pin-off');
    pinBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.pinValue(value, isDefault);
    });

    // Remove button
    const removeBtn = actionsEl.createSpan({ cls: 'bible-ref-pill-remove' });
    setIcon(removeBtn, 'x');

    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.removeValue(value, isDefault);
    });

    return pillEl;
  }

  private addValue(value: string): void {
    if (!value) {
      return;
    }

    // Normalize to lowercase for comparison
    const normalized = value.toLowerCase();

    // Check for duplicates (case-insensitive)
    const allValues = [
      ...(this.options.defaultValues || []),
      ...(this.options.customValues || [])
    ].map(v => v.toLowerCase());

    if (allValues.includes(normalized)) {
      new Notice('Dieser Wert existiert bereits');
      this.inputEl.value = '';
      return;
    }

    if (this.options.onAdd) {
      this.options.onAdd(value);
    }

    this.inputEl.value = '';
  }

  private removeValue(value: string, isDefault: boolean): void {
    if (this.options.onRemove) {
      this.options.onRemove(value, isDefault);
    }
  }

  private pinValue(value: string, isDefault: boolean): void {
    if (this.options.onPin) {
      this.options.onPin(value, isDefault);
    }
  }

  public update(options: Partial<PillInputOptions>): void {
    // Merge new options
    this.options = { ...this.options, ...options };

    // Clear existing pills (but keep input field)
    const pills = this.containerEl.querySelectorAll('.bible-ref-pill');
    pills.forEach(pill => pill.remove());

    // Re-render pills with new data
    if (this.options.defaultValues) {
      for (const value of this.options.defaultValues) {
        const pillEl = this.renderPillElement(value, true);
        this.inputEl.before(pillEl);
      }
    }

    if (this.options.customValues) {
      for (const value of this.options.customValues) {
        const pillEl = this.renderPillElement(value, false);
        this.inputEl.before(pillEl);
      }
    }
  }

  public destroy(): void {
    this.containerEl.empty();
  }
}
