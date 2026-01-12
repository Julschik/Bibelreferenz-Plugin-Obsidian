import { PillInput } from './PillInput';
import type { BookMapping, BookMappingCustomization } from '../../types';
import type { I18nService } from '../../i18n/I18nService';
import { Notice } from 'obsidian';

export interface BookMappingEditorOptions {
  bookMapping: BookMapping;
  customization?: BookMappingCustomization;
  i18n: I18nService;
  onChange: (customization: BookMappingCustomization) => void;
}

/**
 * BookMappingEditor Component
 *
 * Edits mappings for a single book with two PillInputs:
 * - Aliases (Kurzform - short form)
 * - Standalone Patterns (Langform - long form)
 */
export class BookMappingEditor {
  private containerEl: HTMLElement;
  private options: BookMappingEditorOptions;
  private aliasesInput: PillInput;
  private standalonePatternsInput: PillInput;

  constructor(containerEl: HTMLElement, options: BookMappingEditorOptions) {
    this.containerEl = containerEl;
    this.options = options;
    this.render();
  }

  private render(): void {
    const { bookMapping, customization, i18n } = this.options;

    // Add description text above aliases
    const descriptionEl = this.containerEl.createDiv('bible-ref-field-description');
    descriptionEl.textContent = i18n.t('settingsDisplayIdExplanation');

    // Calculate current state
    // ALWAYS include canonical ID as first element in aliases
    const canonicalId = bookMapping.canonicalId;
    const defaultAliases = [canonicalId, ...bookMapping.aliases];
    const deletedAliases = customization?.aliasesDeletions || [];
    const addedAliases = customization?.aliasesAdditions || [];
    const visibleDefaultAliases = defaultAliases.filter(a => !deletedAliases.includes(a));

    const defaultStandalone = bookMapping.standalonePatterns;
    const deletedStandalone = customization?.standalonePatternsDeletions || [];
    const addedStandalone = customization?.standalonePatternsAdditions || [];
    const visibleDefaultStandalone = defaultStandalone.filter(p => !deletedStandalone.includes(p));

    // Determine pinned value
    // If NO custom pin is set, canonical ID is the default pinned value
    const pinnedAliasValue = customization?.pinnedDisplayId || canonicalId;
    const pinnedStandaloneValue = customization?.pinnedDisplayIdSource === 'standalone'
      ? customization.pinnedDisplayId
      : undefined;

    // Aliases section (Kurzform)
    const aliasesContainer = this.containerEl.createDiv('bible-ref-mapping-field');
    aliasesContainer.createEl('label', {
      text: i18n.t('settingsAliasesLabel'),
      cls: 'bible-ref-field-label'
    });

    const aliasesInputContainer = aliasesContainer.createDiv();
    this.aliasesInput = new PillInput(aliasesInputContainer, {
      placeholder: i18n.t('settingsPillInputPlaceholder'),
      defaultValues: visibleDefaultAliases,
      customValues: addedAliases,
      pinnedValue: pinnedAliasValue,
      onAdd: (value) => this.handleAliasAdd(value),
      onRemove: (value, isDefault) => this.handleAliasRemove(value, isDefault),
      onPin: (value) => this.handleAliasPin(value)
    });

    // Standalone patterns section (Langform)
    const standaloneContainer = this.containerEl.createDiv('bible-ref-mapping-field');
    standaloneContainer.createEl('label', {
      text: i18n.t('settingsStandalonePatternsLabel'),
      cls: 'bible-ref-field-label'
    });

    const standaloneInputContainer = standaloneContainer.createDiv();
    this.standalonePatternsInput = new PillInput(standaloneInputContainer, {
      placeholder: i18n.t('settingsPillInputPlaceholder'),
      defaultValues: visibleDefaultStandalone,
      customValues: addedStandalone,
      pinnedValue: pinnedStandaloneValue,
      onAdd: (value) => this.handleStandaloneAdd(value),
      onRemove: (value, isDefault) => this.handleStandaloneRemove(value, isDefault),
      onPin: (value) => this.handleStandalonePin(value)
    });
  }

  private handleAliasAdd(value: string): void {
    const customization = this.getCurrentCustomization();

    if (!customization.aliasesAdditions) {
      customization.aliasesAdditions = [];
    }

    customization.aliasesAdditions.push(value);
    this.options.onChange(customization);
  }

  private handleAliasRemove(value: string, isDefault: boolean): void {
    const customization = this.getCurrentCustomization();

    // Prevent deletion of canonical ID
    if (value === this.options.bookMapping.canonicalId) {
      new Notice(this.options.i18n.t('settingsCannotDeleteCanonicalId'));
      return;
    }

    if (isDefault) {
      // Mark as deleted
      if (!customization.aliasesDeletions) {
        customization.aliasesDeletions = [];
      }
      customization.aliasesDeletions.push(value);
    } else {
      // Remove from additions
      if (customization.aliasesAdditions) {
        customization.aliasesAdditions = customization.aliasesAdditions.filter(a => a !== value);
      }
    }

    this.options.onChange(customization);
  }

  private handleStandaloneAdd(value: string): void {
    const customization = this.getCurrentCustomization();

    if (!customization.standalonePatternsAdditions) {
      customization.standalonePatternsAdditions = [];
    }

    customization.standalonePatternsAdditions.push(value);
    this.options.onChange(customization);
  }

  private handleStandaloneRemove(value: string, isDefault: boolean): void {
    const customization = this.getCurrentCustomization();

    if (isDefault) {
      if (!customization.standalonePatternsDeletions) {
        customization.standalonePatternsDeletions = [];
      }
      customization.standalonePatternsDeletions.push(value);
    } else {
      if (customization.standalonePatternsAdditions) {
        customization.standalonePatternsAdditions =
          customization.standalonePatternsAdditions.filter(p => p !== value);
      }
    }

    this.options.onChange(customization);
  }

  private handleAliasPin(value: string): void {
    const customization = this.getCurrentCustomization();

    // Check if this is already pinned
    if (customization.pinnedDisplayId === value &&
        customization.pinnedDisplayIdSource === 'alias') {
      // Unpin
      delete customization.pinnedDisplayId;
      delete customization.pinnedDisplayIdSource;
    } else {
      // Pin (replaces any existing pin)
      customization.pinnedDisplayId = value;
      customization.pinnedDisplayIdSource = 'alias';
    }

    this.options.onChange(customization);
  }

  private handleStandalonePin(value: string): void {
    const customization = this.getCurrentCustomization();

    if (customization.pinnedDisplayId === value &&
        customization.pinnedDisplayIdSource === 'standalone') {
      // Unpin
      delete customization.pinnedDisplayId;
      delete customization.pinnedDisplayIdSource;
    } else {
      // Pin
      customization.pinnedDisplayId = value;
      customization.pinnedDisplayIdSource = 'standalone';
    }

    this.options.onChange(customization);
  }

  private getCurrentCustomization(): BookMappingCustomization {
    return {
      canonicalId: this.options.bookMapping.canonicalId,
      ...(this.options.customization || {})
    };
  }

  public update(customization?: BookMappingCustomization): void {
    this.options.customization = customization;

    const { bookMapping } = this.options;

    // Recalculate visible values
    // Include canonical ID as first element
    const canonicalId = bookMapping.canonicalId;
    const defaultAliases = [canonicalId, ...bookMapping.aliases];
    const deletedAliases = customization?.aliasesDeletions || [];
    const addedAliases = customization?.aliasesAdditions || [];
    const visibleDefaultAliases = defaultAliases.filter(
      a => !deletedAliases.includes(a)
    );

    const defaultStandalone = bookMapping.standalonePatterns;
    const deletedStandalone = customization?.standalonePatternsDeletions || [];
    const addedStandalone = customization?.standalonePatternsAdditions || [];
    const visibleDefaultStandalone = defaultStandalone.filter(
      p => !deletedStandalone.includes(p)
    );

    // Determine pinned value (default to canonical ID)
    const pinnedAliasValue = customization?.pinnedDisplayId || canonicalId;
    const pinnedStandaloneValue = customization?.pinnedDisplayIdSource === 'standalone'
      ? customization.pinnedDisplayId
      : undefined;

    // Update PillInputs
    this.aliasesInput.update({
      defaultValues: visibleDefaultAliases,
      customValues: addedAliases,
      pinnedValue: pinnedAliasValue
    });

    this.standalonePatternsInput.update({
      defaultValues: visibleDefaultStandalone,
      customValues: addedStandalone,
      pinnedValue: pinnedStandaloneValue
    });
  }

  public destroy(): void {
    this.aliasesInput.destroy();
    this.standalonePatternsInput.destroy();
  }
}
