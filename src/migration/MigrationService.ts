import { App, TFile, Notice } from 'obsidian';
import type { BibleRefSettings, CanonicalIdMigration, MigrationQueueState } from '../types';

/**
 * MigrationService
 *
 * Handles background migration of tags when canonical IDs change
 * Implements optimistic UI with async migration
 */
export class MigrationService {
  private app: App;
  private settings: BibleRefSettings;
  private saveSettings: () => Promise<void>;
  private isRunning: boolean = false;

  constructor(
    app: App,
    settings: BibleRefSettings,
    saveSettings: () => Promise<void>
  ) {
    this.app = app;
    this.settings = settings;
    this.saveSettings = saveSettings;
  }

  /**
   * Queue a new migration task
   * @param bookId Canonical book ID
   * @param oldId Old display ID
   * @param newId New display ID
   */
  async queueMigration(bookId: string, oldId: string, newId: string): Promise<void> {
    if (!this.settings.migrationQueue) {
      this.settings.migrationQueue = {
        migrations: [],
        isRunning: false
      };
    }

    // Check if migration already exists
    const existing = this.settings.migrationQueue.migrations.find(
      m => m.bookId === bookId && m.newId === newId
    );

    if (existing) {
      console.log(`Migration for ${bookId}: ${oldId} → ${newId} already queued`);
      return;
    }

    // Create new migration task
    const migration: CanonicalIdMigration = {
      bookId,
      oldId,
      newId,
      status: 'pending',
      filesProcessed: 0,
      filesTotal: 0
    };

    this.settings.migrationQueue.migrations.push(migration);
    await this.saveSettings();

    // Show notice
    new Notice(`Migration gestartet: ${oldId} → ${newId}`);

    // Start migration if not already running
    if (!this.isRunning) {
      this.processMigrationQueue();
    }
  }

  /**
   * Process migration queue in background
   */
  private async processMigrationQueue(): Promise<void> {
    if (!this.settings.migrationQueue || this.isRunning) {
      return;
    }

    this.isRunning = true;
    this.settings.migrationQueue.isRunning = true;
    await this.saveSettings();

    while (this.settings.migrationQueue.migrations.length > 0) {
      const migration = this.settings.migrationQueue.migrations[0];

      if (migration.status === 'pending') {
        await this.runMigration(migration);
      }

      // Remove completed/failed migration
      this.settings.migrationQueue.migrations.shift();
      await this.saveSettings();
    }

    this.isRunning = false;
    this.settings.migrationQueue.isRunning = false;
    await this.saveSettings();
  }

  /**
   * Run a single migration task
   */
  private async runMigration(migration: CanonicalIdMigration): Promise<void> {
    migration.status = 'running';
    migration.startedAt = Date.now();

    // Get all markdown files
    const files = this.app.vault.getMarkdownFiles();
    migration.filesTotal = files.length;

    console.log(`Starting migration: ${migration.oldId} → ${migration.newId} (${files.length} files)`);

    let changedFiles = 0;

    for (const file of files) {
      try {
        const changed = await this.migrateFile(file, migration);
        if (changed) changedFiles++;

        migration.filesProcessed++;

        // Yield to UI every 10 files
        if (migration.filesProcessed % 10 === 0) {
          await new Promise(resolve => setTimeout(resolve, 0));
          await this.saveSettings();
        }
      } catch (error) {
        console.error(`Migration error for file ${file.path}:`, error);
      }
    }

    migration.status = 'completed';
    migration.completedAt = Date.now();

    const duration = ((migration.completedAt - migration.startedAt!) / 1000).toFixed(1);

    new Notice(`Migration abgeschlossen: ${changedFiles}/${files.length} Dateien aktualisiert (${duration}s)`);
    console.log(`Migration completed: ${migration.oldId} → ${migration.newId} (${changedFiles} files changed)`);
  }

  /**
   * Migrate tags in a single file
   * @returns true if file was modified
   */
  private async migrateFile(
    file: TFile,
    migration: CanonicalIdMigration
  ): Promise<boolean> {
    let changed = false;

    const tagPrefix = this.settings.tagPrefix;
    const oldPattern = `${tagPrefix}${migration.oldId}/`;
    const newPattern = `${tagPrefix}${migration.newId}/`;

    await this.app.fileManager.processFrontMatter(file, (frontmatter) => {
      // Migrate custom frontmatter key
      const customKey = this.settings.frontmatterKey;
      if (frontmatter[customKey] && Array.isArray(frontmatter[customKey])) {
        const oldTags = frontmatter[customKey];
        const newTags = oldTags.map((tag: string) => {
          if (tag.startsWith(oldPattern)) {
            changed = true;
            return tag.replace(oldPattern, newPattern);
          }
          return tag;
        });

        if (changed) {
          frontmatter[customKey] = newTags;
        }
      }

      // Migrate standard tags field if writeToTagsField is enabled
      if (this.settings.writeToTagsField && frontmatter.tags && Array.isArray(frontmatter.tags)) {
        const oldTags = frontmatter.tags;
        const newTags = oldTags.map((tag: string) => {
          if (typeof tag === 'string' && tag.startsWith(oldPattern)) {
            changed = true;
            return tag.replace(oldPattern, newPattern);
          }
          return tag;
        });

        if (changed) {
          frontmatter.tags = newTags;
        }
      }
    });

    return changed;
  }

  /**
   * Resume any pending migrations on plugin load
   */
  async resumeMigrations(): Promise<void> {
    if (!this.settings.migrationQueue || this.settings.migrationQueue.migrations.length === 0) {
      return;
    }

    // Reset running migrations to pending
    for (const migration of this.settings.migrationQueue.migrations) {
      if (migration.status === 'running') {
        migration.status = 'pending';
        migration.filesProcessed = 0;
      }
    }

    this.settings.migrationQueue.isRunning = false;
    await this.saveSettings();

    // Restart migration queue
    this.processMigrationQueue();
  }
}
