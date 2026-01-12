import { setIcon } from 'obsidian';
import type { I18nService } from '../i18n/I18nService';

/**
 * Sync Button Component
 *
 * Ein wiederverwendbarer Button für die Sidebar, der:
 * - Loading State anzeigt (während Sync läuft)
 * - Success State anzeigt (nach erfolgreichem Sync)
 * - Error State anzeigt (bei Fehler)
 * - Normal State hat (default)
 *
 * Architecture:
 * - Reine UI-Komponente ohne Business Logic
 * - Callback-basiert für Sync-Action
 * - Vollständig lokalisiert über I18nService
 */
export class SyncButton {
  private containerEl: HTMLElement;
  private buttonEl: HTMLButtonElement;
  private onSyncCallback: () => Promise<void>;
  private i18n: I18nService;
  private timeoutId: number | null = null;

  /**
   * State der Button-Komponente
   */
  private state: 'idle' | 'loading' | 'success' | 'error' | 'timeout' = 'idle';

  constructor(containerEl: HTMLElement, i18n: I18nService, onSync: () => Promise<void>) {
    this.containerEl = containerEl;
    this.i18n = i18n;
    this.onSyncCallback = onSync;

    this.render();
  }

  /**
   * Render Button
   * Erstellt den Button und fügt ihn zum Container hinzu.
   */
  private render(): void {
    // Create button element
    this.buttonEl = this.containerEl.createEl('button', {
      cls: 'bible-ref-sync-button',
      attr: {
        'aria-label': this.i18n.t('syncButtonSync')
      }
    });

    // Set initial content
    this.updateButtonContent();

    // Add click handler
    this.buttonEl.addEventListener('click', () => {
      this.handleClick();
    });
  }

  /**
   * Handle Click
   * Wird aufgerufen, wenn der Button geklickt wird.
   */
  private async handleClick(): Promise<void> {
    if (this.state === 'loading') {
      return; // Ignore clicks while loading
    }

    this.setLoading(true);

    try {
      await this.onSyncCallback();
      // Success state is set by caller via setSuccess()
    } catch (error) {
      this.setError();
    }
  }

  /**
   * Set Loading State
   * Zeigt Loading-Animation.
   */
  setLoading(loading: boolean): void {
    if (loading) {
      this.state = 'loading';
      this.buttonEl.disabled = true;
    } else {
      this.state = 'idle';
      this.buttonEl.disabled = false;
    }

    this.updateButtonContent();
  }

  /**
   * Set Success State
   * Zeigt Checkmark für 2 Sekunden.
   */
  setSuccess(): void {
    this.state = 'success';
    this.buttonEl.disabled = false;
    this.updateButtonContent();

    // Reset to idle after 2s
    this.clearTimeout();
    this.timeoutId = window.setTimeout(() => {
      this.state = 'idle';
      this.updateButtonContent();
    }, 2000);
  }

  /**
   * Set Error State
   * Zeigt Error-Icon für 2 Sekunden.
   */
  setError(): void {
    this.state = 'error';
    this.buttonEl.disabled = false;
    this.updateButtonContent();

    // Reset to idle after 2s
    this.clearTimeout();
    this.timeoutId = window.setTimeout(() => {
      this.state = 'idle';
      this.updateButtonContent();
    }, 2000);
  }

  /**
   * Set Timeout State
   * Zeigt Timeout-Icon für 2 Sekunden.
   */
  setTimeoutState(): void {
    this.state = 'timeout';
    this.buttonEl.disabled = false;
    this.updateButtonContent();

    // Reset to idle after 2s
    this.clearTimeout();
    this.timeoutId = window.setTimeout(() => {
      this.state = 'idle';
      this.updateButtonContent();
    }, 2000);
  }

  /**
   * Update Button Content
   * Aktualisiert das Icon und den Text basierend auf dem State.
   */
  private updateButtonContent(): void {
    // Clear existing content
    this.buttonEl.empty();

    // Remove all state classes
    this.buttonEl.removeClass(
      'bible-ref-sync-loading',
      'bible-ref-sync-success',
      'bible-ref-sync-error',
      'bible-ref-sync-timeout'
    );

    // Set content based on state
    switch (this.state) {
      case 'loading':
        this.buttonEl.addClass('bible-ref-sync-loading');
        this.buttonEl.createSpan({
          cls: 'bible-ref-sync-spinner'
        });
        this.buttonEl.createSpan({
          text: this.i18n.t('syncButtonSyncing'),
          cls: 'bible-ref-sync-text'
        });
        break;

      case 'success':
        this.buttonEl.addClass('bible-ref-sync-success');
        const successIcon = this.buttonEl.createSpan({ cls: 'bible-ref-sync-icon' });
        setIcon(successIcon, 'check');
        this.buttonEl.createSpan({
          text: this.i18n.t('syncButtonSynced'),
          cls: 'bible-ref-sync-text'
        });
        break;

      case 'error':
        this.buttonEl.addClass('bible-ref-sync-error');
        const errorIcon = this.buttonEl.createSpan({ cls: 'bible-ref-sync-icon' });
        setIcon(errorIcon, 'x');
        this.buttonEl.createSpan({
          text: this.i18n.t('syncButtonError'),
          cls: 'bible-ref-sync-text'
        });
        break;

      case 'timeout':
        this.buttonEl.addClass('bible-ref-sync-timeout');
        const timeoutIcon = this.buttonEl.createSpan({ cls: 'bible-ref-sync-icon' });
        setIcon(timeoutIcon, 'clock');
        this.buttonEl.createSpan({
          text: this.i18n.t('syncButtonTimeout'),
          cls: 'bible-ref-sync-text'
        });
        break;

      default:
        // idle
        const syncIcon = this.buttonEl.createSpan({ cls: 'bible-ref-sync-icon' });
        setIcon(syncIcon, 'refresh-cw');
        this.buttonEl.createSpan({
          text: this.i18n.t('syncButtonSync'),
          cls: 'bible-ref-sync-text'
        });
        break;
    }
  }

  /**
   * Clear Timeout
   * Löscht den aktiven Timeout (für State-Reset).
   */
  private clearTimeout(): void {
    if (this.timeoutId !== null) {
      window.clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  /**
   * Destroy
   * Cleanup beim Schließen der View.
   */
  destroy(): void {
    this.clearTimeout();
    this.buttonEl.remove();
  }
}
