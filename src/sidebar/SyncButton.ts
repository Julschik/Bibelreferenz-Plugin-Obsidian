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
 */
export class SyncButton {
  private containerEl: HTMLElement;
  private buttonEl: HTMLButtonElement;
  private onSyncCallback: () => Promise<void>;
  private timeoutId: number | null = null;

  /**
   * State der Button-Komponente
   */
  private state: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  constructor(containerEl: HTMLElement, onSync: () => Promise<void>) {
    this.containerEl = containerEl;
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
        'aria-label': 'Sync current file'
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
      'bible-ref-sync-error'
    );

    // Set content based on state
    switch (this.state) {
      case 'loading':
        this.buttonEl.addClass('bible-ref-sync-loading');
        this.buttonEl.createSpan({
          cls: 'bible-ref-sync-spinner'
        });
        this.buttonEl.createSpan({
          text: 'Syncing...',
          cls: 'bible-ref-sync-text'
        });
        break;

      case 'success':
        this.buttonEl.addClass('bible-ref-sync-success');
        this.buttonEl.createSpan({
          text: '✓',
          cls: 'bible-ref-sync-icon'
        });
        this.buttonEl.createSpan({
          text: 'Synced',
          cls: 'bible-ref-sync-text'
        });
        break;

      case 'error':
        this.buttonEl.addClass('bible-ref-sync-error');
        this.buttonEl.createSpan({
          text: '✗',
          cls: 'bible-ref-sync-icon'
        });
        this.buttonEl.createSpan({
          text: 'Error',
          cls: 'bible-ref-sync-text'
        });
        break;

      default:
        // idle
        this.buttonEl.createSpan({
          text: '↻',
          cls: 'bible-ref-sync-icon'
        });
        this.buttonEl.createSpan({
          text: 'Sync',
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
