# Bible Reference Mapper – Obsidian Plugin

> **Low Friction Bible Study Integration**  
> Schreibe einfach deine Notizen. Das Plugin erkennt Bibelreferenzen automatisch und vernetzt sie im Graph.

---

## Inhaltsverzeichnis

1. [Vision & Designprinzipien](#1-vision--designprinzipien)
2. [Features im Überblick](#2-features-im-überblick)
3. [Technische Architektur](#3-technische-architektur)
4. [Modul-Spezifikationen](#4-modul-spezifikationen)
5. [Datenstrukturen](#5-datenstrukturen)
6. [Implementierungsroadmap](#6-implementierungsroadmap)
7. [Testing-Strategie](#7-testing-strategie)
8. [Bekannte Einschränkungen & Future Work](#8-bekannte-einschränkungen--future-work)
9. [Claude Code Agentenanweisungen](#9-claude-code-agentenanweisungen)

---

## 1. Vision & Designprinzipien

### 1.1 Das Problem

Bibelstudium in Obsidian erfordert derzeit manuelles Tagging oder externe Plugins mit Bibeltext-Import. Nutzer wollen einfach schreiben – ohne sich Gedanken über korrekte Formatierung zu machen.

### 1.2 Die Lösung

Ein **unsichtbarer Assistent**, der:
- Bibelreferenzen in natürlicher Schreibweise erkennt
- Diese automatisch als "Shadow Tags" in die Frontmatter synchronisiert
- Den nativen Obsidian Graph für Vers-Vernetzung nutzbar macht
- Eine Sidebar für Konkordanz und thematische Entdeckungen bietet

### 1.3 Kernprinzipien

| Prinzip | Bedeutung |
|---------|-----------|
| **Low Friction** | Der Nutzer schreibt einfach. Keine spezielle Syntax nötig. |
| **Privacy First** | Keine externen API-Calls. Alles lokal. |
| **Lean & Fast** | Minimaler Footprint. Keine UI-Überfrachtung. |
| **Graph Native** | Integration in Obsidians Stärke: den Graphen. |

### 1.4 Was dieses Plugin NICHT tut

- ❌ Bibeltext importieren oder anzeigen
- ❌ Externe Dienste aufrufen
- ❌ Den Fließtext der Notiz verändern (außer Frontmatter)

---

## 2. Features im Überblick

### 2.1 Referenz-Erkennung (Smart Parser)

Der Parser erkennt **alle gängigen Schreibweisen**:

| Typ | Beispiele | Ergebnis |
|-----|-----------|----------|
| Einzelvers | `Joh 3,16` · `Johannes 3:16` · `Jn 3.16` | Tag für Vers 16 |
| Vers-Liste | `Joh 3,16.18` | Tags für Verse 16 und 18 |
| Vers-Range | `Joh 3,16-18` | Tags für Verse 16, 17, 18 |
| Gemischt | `Joh 3,16-18.20` | Tags für 16, 17, 18, 20 |
| Kapitelübergreifend | `Joh 3,16-4,3` | Alle Verse von 3:16 bis 4:3 |
| Ganzes Kapitel | `Joh 3` · `Johannes 3` | Alle Verse in Kapitel 3 |
| Kapitel-Range | `Joh 3-4` | Alle Verse in Kapitel 3 und 4 |
| Ganzes Buch | `Kolosserbrief` · `Kolosser` | Buch-Level Tag |
| Nummerierte Bücher | `1. Mose 3,15` · `1Mose 3,15` · `1 Kor 13` | Korrekte Erkennung |

### 2.2 Shadow Tags (Frontmatter Sync)

Erkannte Referenzen werden als hierarchische Tags in die Frontmatter geschrieben:

```yaml
---
bible-refs:
  - bible/Joh/3/16
  - bible/Joh/3/17
  - bible/Joh/3/18
  - bible/Col         # Buch-Level (wenn "Kolosserbrief" erwähnt)
  - bible/Col/3       # Kapitel-Level (wenn "Kol 3" erwähnt)
---
```

**Wichtig: Atomic Tagging**
- Ranges werden IMMER zu Einzelversen expandiert
- Niemals `bible/Joh/3/16-18` – immer drei separate Tags

### 2.3 Titel-Parsing

Referenzen im Dateinamen werden erkannt:

| Dateiname | Erkannte Referenz |
|-----------|-------------------|
| `Joh 3,16.md` | Vers-Tag |
| `Kolosser Zusammenfassung.md` | Buch-Tag |
| `Genesis Überblick.md` | Buch-Tag |

**Use-Case:** Deep-Dive Notizen (`Joh 3,16.md`) erscheinen in der Sidebar, sobald der Vers anderswo erwähnt wird.

### 2.4 Sync-Modi

Vom Nutzer wählbar in den Einstellungen:

| Modus | Beschreibung | Trigger |
|-------|--------------|---------|
| **Speichern + Wechsel** (Default) | Wie Linter Plugin | `Ctrl+S` oder Datei-Wechsel |
| **Nur Speichern** | Konservativ | Nur `Ctrl+S` |
| **Nur Wechsel** | Bei Navigation | Beim Öffnen anderer Datei |
| **Manuell** | Volle Kontrolle | Command Palette ODER Sidebar-Button |

### 2.5 Concordance Sidebar

Eine `ItemView` im rechten Sidebar-Bereich:

**Sektion A: Manueller Sync Button** (bei manuellem Modus)
- Prominenter Button: "🔄 Referenzen synchronisieren"
- Visuelles Feedback während Sync

**Sektion B: Verwandte Notizen**
- Gruppiert nach Relevanz:
  1. **Gleiche Verse** – Exakte Matches
  2. **Gleiches Kapitel** – Andere Verse im selben Kapitel
  3. **Gleiches Buch** – z.B. "Kolosser Zusammenfassung"

**Sektion C: Thematisch verbunden**
- Co-Occurrence Engine: Welche anderen Verse werden oft zusammen mit den aktuellen zitiert?
- Beispiel: Notiz mit `Gen 1,1` → Findet Notizen die auch `Gen 1,1` haben → Zeigt deren andere Referenzen (z.B. `Joh 1,1`, `Kol 1,16`)

### 2.6 Graph Integration

Durch die hierarchischen Tags entsteht eine natürliche Baumstruktur im Obsidian Graph:

```
bible/
├── Gen
│   ├── 1
│   │   ├── 1  ← Alle Notizen mit "Gen 1,1"
│   │   └── ...
├── Col
│   ├── [Buch-Level]  ← "Kolosserbrief" Notizen
│   ├── 3
│   │   ├── [Kapitel-Level]  ← "Kol 3" Notizen  
│   │   ├── 16  ← Vers-Notizen
│   │   └── ...
```

---

## 3. Technische Architektur

### 3.1 Projektstruktur

```
bible-reference-mapper/
├── manifest.json
├── package.json
├── tsconfig.json
├── esbuild.config.mjs
├── src/
│   ├── main.ts                      # Plugin Entry Point
│   ├── types.ts                     # TypeScript Interfaces
│   ├── constants.ts                 # Konstanten
│   │
│   ├── settings/
│   │   ├── SettingsTab.ts           # Obsidian PluginSettingTab
│   │   ├── defaultSettings.ts       # Default-Werte
│   │   └── presets.ts               # Sprach-Presets (DE/EN)
│   │
│   ├── parser/
│   │   ├── SmartBibleParser.ts      # Hauptparser
│   │   ├── TitleParser.ts           # Dateinamen-Parser
│   │   ├── RangeExpander.ts         # Range → Einzelverse
│   │   ├── BookNormalizer.ts        # Alias → Kanonische ID
│   │   └── ContentCleaner.ts        # Code-Blöcke etc. entfernen
│   │
│   ├── sync/
│   │   ├── FrontmatterSync.ts       # Frontmatter Read/Write
│   │   ├── TagGenerator.ts          # Referenzen → Tags
│   │   └── SyncManager.ts           # Event-Handling & Modi
│   │
│   ├── views/
│   │   ├── ConcordanceSidebarView.ts
│   │   └── components/
│   │       ├── RelatedNotesSection.ts
│   │       ├── CoOccurrenceSection.ts
│   │       └── SyncButton.ts
│   │
│   ├── data/
│   │   ├── bibleStructure.ts        # Kapitel/Vers-Zahlen aller Bücher
│   │   ├── bookMappings.de.ts       # Deutsche Buchnamen & Aliase
│   │   └── bookMappings.en.ts       # Englische Buchnamen & Aliase
│   │
│   └── utils/
│       ├── helpers.ts
│       └── logger.ts                # Debug-Logging (dev only)
│
├── tests/
│   ├── parser/
│   │   ├── SmartBibleParser.test.ts
│   │   ├── RangeExpander.test.ts
│   │   └── BookNormalizer.test.ts
│   └── sync/
│       └── TagGenerator.test.ts
│
└── styles.css                       # Minimal CSS für Sidebar
```

### 3.2 Abhängigkeiten

```json
{
  "devDependencies": {
    "@types/node": "^18.0.0",
    "esbuild": "^0.17.0",
    "obsidian": "latest",
    "typescript": "^5.0.0",
    "vitest": "^1.0.0"
  }
}
```

**Keine Runtime-Dependencies außer Obsidian API.**

### 3.3 Build-Konfiguration

```javascript
// esbuild.config.mjs
import esbuild from "esbuild";

const prod = process.argv[2] === "production";

esbuild.build({
  entryPoints: ["src/main.ts"],
  bundle: true,
  external: ["obsidian"],
  format: "cjs",
  target: "es2018",
  outfile: "main.js",
  sourcemap: prod ? false : "inline",
  minify: prod,
  logLevel: "info",
}).catch(() => process.exit(1));
```

---

## 4. Modul-Spezifikationen

### 4.1 Types (`src/types.ts`)

```typescript
// ═══════════════════════════════════════════════════════════════
// SYNC CONFIGURATION
// ═══════════════════════════════════════════════════════════════

export type SyncMode = 
  | 'on-save-or-change'  // Default: Beim Speichern ODER Dokumentwechsel
  | 'on-save'            // Nur beim Speichern (Ctrl+S)
  | 'on-file-change'     // Nur beim Wechsel zu anderem Dokument
  | 'manual';            // Nur via Command Palette oder Sidebar-Button

export interface SeparatorConfig {
  chapterVerse: string;  // Kapitel-Vers-Trenner: "," (DE) oder ":" (EN)
  list: string;          // Listen-Trenner (AND): "." → 16.18 = Verse 16 und 18
  range: string;         // Bereichs-Trenner (TO): "-" → 16-18 = Verse 16 bis 18
}

export interface BibleRefSettings {
  syncMode: SyncMode;
  language: 'de' | 'en' | 'custom';
  separators: SeparatorConfig;
  frontmatterKey: string;  // Default: "bible-refs"
  tagPrefix: string;       // Default: "bible/"
  customBookMappings: Record<string, string>;
  parseCodeBlocks: boolean;  // Default: false
  parseTitles: boolean;      // Default: true
}

// ═══════════════════════════════════════════════════════════════
// PARSED REFERENCES
// ═══════════════════════════════════════════════════════════════

export type ReferenceGranularity = 
  | 'book'      // "Kolosserbrief"
  | 'chapter'   // "Kol 3"
  | 'verse';    // "Kol 3,16" oder Range "Kol 3,16-18"

export interface ParsedReference {
  raw: string;                       // Original-String aus dem Text
  bookId: string;                    // Kanonische ID: "Col", "Gen", etc.
  granularity: ReferenceGranularity;
  startChapter?: number;
  startVerse?: number;
  endChapter?: number;               // Bei kapitelübergreifenden Ranges
  endVerse?: number;
  _verseList?: number[];             // Intern: Für "16.18.20"
}

export interface ExpandedReference {
  bookId: string;
  chapter: number;
  verse: number;
}

// ═══════════════════════════════════════════════════════════════
// BIBLE DATA STRUCTURE
// ═══════════════════════════════════════════════════════════════

export interface BookData {
  chapters: number;
  versesPerChapter: number[];
}

export type BibleStructure = Record<string, BookData>;

export interface BookMapping {
  canonicalId: string;
  aliases: string[];
  standalonePatterns: string[];
}

// ═══════════════════════════════════════════════════════════════
// SIDEBAR DATA
// ═══════════════════════════════════════════════════════════════

export interface RelatedNote {
  file: TFile;
  relevance: 'exact-verse' | 'same-chapter' | 'same-book';
  matchingTags: string[];
}

export interface CoOccurrenceSuggestion {
  tag: string;
  displayName: string;
  count: number;
  sourceNotes: TFile[];
}
```

### 4.2 Settings Module

#### `defaultSettings.ts`

```typescript
import type { BibleRefSettings } from '../types';

export const DEFAULT_SETTINGS: BibleRefSettings = {
  syncMode: 'on-save-or-change',
  language: 'de',
  separators: {
    chapterVerse: ',',
    list: '.',
    range: '-'
  },
  frontmatterKey: 'bible-refs',
  tagPrefix: 'bible/',
  customBookMappings: {},
  parseCodeBlocks: false,
  parseTitles: true
};
```

#### `presets.ts`

```typescript
import type { SeparatorConfig } from '../types';

export const LANGUAGE_PRESETS: Record<string, SeparatorConfig> = {
  de: { chapterVerse: ',', list: '.', range: '-' },
  en: { chapterVerse: ':', list: ',', range: '-' }
};
```

#### `SettingsTab.ts` (Struktur)

```typescript
export class BibleRefSettingsTab extends PluginSettingTab {
  // Sync Mode Dropdown
  // Language Dropdown (mit Preset-Anwendung)
  // Custom Separators (nur bei language === 'custom')
  // Frontmatter Key Input
  // Tag Prefix Input
  // Parse Titles Toggle
  // Info-Box: Code-Blöcke Warnung
  // Info-Box: Low Friction Erklärung
}
```

### 4.3 Parser Module

#### `BookNormalizer.ts` (Kernlogik)

```typescript
export class BookNormalizer {
  private aliasMap: Map<string, string>;       // "johannes" → "Joh"
  private standalonePatterns: { pattern: RegExp; bookId: string }[];

  constructor(language: 'de' | 'en' | 'custom', customMappings?: Record<string, string>);
  
  normalize(bookName: string): string | null;
  getAllAliasesPattern(): string;              // Für Regex
  getStandalonePatterns(): { pattern: RegExp; bookId: string }[];
}
```

#### `RangeExpander.ts` (Kernlogik)

```typescript
export class RangeExpander {
  expand(ref: ParsedReference): ExpandedReference[];
  
  private expandBook(bookId: string): ExpandedReference[];
  private expandChapters(ref: ParsedReference): ExpandedReference[];
  private expandVerses(ref: ParsedReference): ExpandedReference[];
  private expandCrossChapterRange(ref: ParsedReference): ExpandedReference[];
  
  parseVersePart(input: string, listSep: string, rangeSep: string): number[];
}
```

#### `SmartBibleParser.ts` (Kernlogik)

```typescript
export class SmartBibleParser {
  constructor(settings: BibleRefSettings);
  
  parse(content: string): ParsedReference[];
  
  private parseCrossChapterRanges(content: string, matched: Range[]): ParsedReference[];
  private parseVerseReferences(content: string, matched: Range[]): ParsedReference[];
  private parseChapterReferences(content: string, matched: Range[]): ParsedReference[];
  private parseBookReferences(content: string, matched: Range[]): ParsedReference[];
}
```

**Wichtig: Parse-Reihenfolge**
1. Kapitelübergreifende Ranges (spezifischste)
2. Vers-Referenzen
3. Kapitel-Referenzen
4. Buch-Referenzen (allgemeinste)

### 4.4 Sync Module

#### `FrontmatterSync.ts` (Kernlogik)

```typescript
export class FrontmatterSync {
  private isUpdating: boolean = false;  // Loop-Prevention!
  
  constructor(app: App, settings: BibleRefSettings);
  
  async sync(file: TFile, newTags: string[]): Promise<boolean>;
  async read(file: TFile): Promise<string[]>;
  
  get isCurrentlyUpdating(): boolean;
}
```

**KRITISCH: Loop-Prevention**
```typescript
async sync(file: TFile, newTags: string[]): Promise<boolean> {
  if (this.isUpdating) return false;
  this.isUpdating = true;
  try {
    await this.app.fileManager.processFrontMatter(file, (fm) => {
      // Nur schreiben wenn sich etwas geändert hat
    });
  } finally {
    this.isUpdating = false;
  }
}
```

#### `SyncManager.ts` (Kernlogik)

```typescript
export class SyncManager {
  constructor(app: App, plugin: Plugin, settings: BibleRefSettings);
  
  registerEvents(): void;      // Event-Listener basierend auf syncMode
  unregisterEvents(): void;
  
  async syncFile(file: TFile): Promise<{ changed: boolean; tagCount: number }>;
  async syncAll(): Promise<{ processed: number; changed: number }>;
  
  updateSettings(settings: BibleRefSettings): void;
}
```

### 4.5 Views Module

#### `ConcordanceSidebarView.ts` (Struktur)

```typescript
export class ConcordanceSidebarView extends ItemView {
  private indexCache: Map<string, TFile[]> | null = null;
  private isDirty: boolean = true;
  
  getViewType(): string;   // 'bible-ref-concordance'
  getDisplayText(): string; // 'Bibelreferenzen'
  getIcon(): string;        // 'book-open'
  
  async onOpen(): Promise<void>;
  async refresh(): Promise<void>;
  
  private buildIndex(): Map<string, TFile[]>;
  private findRelatedNotes(activeTags: string[], excludeFile: TFile): TFile[];
  private groupByRelevance(notes: TFile[], activeTags: string[]): GroupedNotes;
  private findCoOccurrences(activeTags: string[], excludeFile: TFile): CoOccurrenceSuggestion[];
}
```

---

## 5. Datenstrukturen

### 5.1 Bible Structure (`bibleStructure.ts`)

Vollständige Kapitel- und Verszahlen für alle 66 Bücher:

```typescript
export const BIBLE_STRUCTURE: BibleStructure = {
  "Gen": { chapters: 50, versesPerChapter: [31,25,24,...] },
  "Exo": { chapters: 40, versesPerChapter: [22,25,22,...] },
  // ... alle 66 Bücher
  "Rev": { chapters: 22, versesPerChapter: [20,29,22,...] }
};

// Helper Functions
export function getMaxVerse(bookId: string, chapter: number): number | null;
export function getMaxChapter(bookId: string): number | null;
export function getAllVersesInChapter(bookId: string, chapter: number): number[];
export function getAllChaptersInBook(bookId: string): number[];
export function isValidReference(bookId: string, chapter: number, verse?: number): boolean;
```

### 5.2 Book Mappings

#### Deutsche Mappings (`bookMappings.de.ts`)

```typescript
export const BOOK_MAPPINGS_DE: BookMapping[] = [
  {
    canonicalId: 'Gen',
    aliases: ['Gen', 'Genesis', '1. Mose', '1.Mose', '1 Mose', '1Mose', '1Mo'],
    standalonePatterns: ['Genesis', '1. Mose']
  },
  {
    canonicalId: 'Joh',
    aliases: ['Joh', 'Johannes', 'Jn', 'Jo'],
    standalonePatterns: ['Johannesevangelium']
  },
  {
    canonicalId: 'Col',
    aliases: ['Kol', 'Kolosser', 'Col'],
    standalonePatterns: ['Kolosserbrief', 'Kolosser']
  },
  // ... alle 66 Bücher mit deutschen Varianten
];
```

#### Englische Mappings (`bookMappings.en.ts`)

```typescript
export const BOOK_MAPPINGS_EN: BookMapping[] = [
  {
    canonicalId: 'Gen',
    aliases: ['Gen', 'Genesis', 'Gn'],
    standalonePatterns: ['Genesis']
  },
  {
    canonicalId: 'Joh',
    aliases: ['John', 'Jn', 'Joh'],
    standalonePatterns: ['Gospel of John']
  },
  // ... alle 66 Bücher mit englischen Varianten
];
```

---

## 6. Implementierungsroadmap

### Phase 1: Foundation (Tag 1-2)

| Task | Beschreibung | Dateien |
|------|--------------|---------|
| 1.1 | Projekt-Scaffold | `manifest.json`, `package.json`, `tsconfig.json`, `esbuild.config.mjs` |
| 1.2 | Type Definitions | `src/types.ts` |
| 1.3 | Bible Data | `src/data/bibleStructure.ts` |
| 1.4 | Book Mappings DE | `src/data/bookMappings.de.ts` |
| 1.5 | Book Mappings EN | `src/data/bookMappings.en.ts` |

### Phase 2: Parser Core (Tag 2-3)

| Task | Beschreibung | Dateien |
|------|--------------|---------|
| 2.1 | BookNormalizer | `src/parser/BookNormalizer.ts` |
| 2.2 | RangeExpander | `src/parser/RangeExpander.ts` |
| 2.3 | ContentCleaner | `src/parser/ContentCleaner.ts` |
| 2.4 | SmartBibleParser | `src/parser/SmartBibleParser.ts` |
| 2.5 | TitleParser | `src/parser/TitleParser.ts` |
| 2.6 | Parser Tests | `tests/parser/*.test.ts` |

### Phase 3: Sync Engine (Tag 3-4)

| Task | Beschreibung | Dateien |
|------|--------------|---------|
| 3.1 | TagGenerator | `src/sync/TagGenerator.ts` |
| 3.2 | FrontmatterSync | `src/sync/FrontmatterSync.ts` |
| 3.3 | SyncManager | `src/sync/SyncManager.ts` |
| 3.4 | Sync Tests | `tests/sync/*.test.ts` |

### Phase 4: Plugin Integration (Tag 4-5)

| Task | Beschreibung | Dateien |
|------|--------------|---------|
| 4.1 | Settings Tab | `src/settings/SettingsTab.ts` |
| 4.2 | Main Plugin | `src/main.ts` |
| 4.3 | Commands | In `main.ts`: Sync Current, Sync All |

### Phase 5: Sidebar UI (Tag 5-6)

| Task | Beschreibung | Dateien |
|------|--------------|---------|
| 5.1 | ConcordanceSidebarView | `src/views/ConcordanceSidebarView.ts` |
| 5.2 | Sync Button Component | `src/views/components/SyncButton.ts` |
| 5.3 | Styles | `styles.css` |

### Phase 6: Polish & Testing (Tag 6-7)

| Task | Beschreibung |
|------|--------------|
| 6.1 | Edge Case Testing |
| 6.2 | Performance Testing (großer Vault) |
| 6.3 | Dokumentation |
| 6.4 | Release Preparation |

---

## 7. Testing-Strategie

### 7.1 Unit Tests (Vitest)

#### Parser Tests

```typescript
// tests/parser/RangeExpander.test.ts
describe('RangeExpander', () => {
  describe('parseVersePart', () => {
    it('should parse single verse', () => {
      expect(expander.parseVersePart('16', '.', '-')).toEqual([16]);
    });
    
    it('should parse verse list', () => {
      expect(expander.parseVersePart('16.18.20', '.', '-')).toEqual([16, 18, 20]);
    });
    
    it('should parse verse range', () => {
      expect(expander.parseVersePart('16-18', '.', '-')).toEqual([16, 17, 18]);
    });
    
    it('should parse mixed list and range', () => {
      expect(expander.parseVersePart('16-18.20', '.', '-')).toEqual([16, 17, 18, 20]);
    });
  });
  
  describe('expand', () => {
    it('should expand book reference to all verses', () => {
      const ref: ParsedReference = { bookId: 'Phm', granularity: 'book', raw: 'Philemon' };
      const result = expander.expand(ref);
      expect(result.length).toBe(25); // Philemon hat 25 Verse
    });
    
    it('should expand cross-chapter range', () => {
      const ref: ParsedReference = {
        bookId: 'Joh',
        granularity: 'verse',
        startChapter: 3,
        startVerse: 35,
        endChapter: 4,
        endVerse: 3,
        raw: 'Joh 3,35-4,3'
      };
      const result = expander.expand(ref);
      // Joh 3 hat 36 Verse: 35, 36 + Joh 4: 1, 2, 3 = 5 Verse
      expect(result.length).toBe(5);
    });
  });
});
```

#### SmartBibleParser Tests

```typescript
// tests/parser/SmartBibleParser.test.ts
describe('SmartBibleParser', () => {
  it('should parse German format', () => {
    const result = parser.parse('Siehe Joh 3,16');
    expect(result).toHaveLength(1);
    expect(result[0].bookId).toBe('Joh');
    expect(result[0].startChapter).toBe(3);
    expect(result[0].startVerse).toBe(16);
  });
  
  it('should parse book-only reference', () => {
    const result = parser.parse('Der Kolosserbrief ist wichtig');
    expect(result).toHaveLength(1);
    expect(result[0].bookId).toBe('Col');
    expect(result[0].granularity).toBe('book');
  });
  
  it('should ignore code blocks', () => {
    const result = parser.parse('Text `Joh 3,16` mehr Text');
    expect(result).toHaveLength(0);
  });
  
  it('should parse numbered books', () => {
    const result = parser.parse('1. Mose 3,15 ist wichtig');
    expect(result[0].bookId).toBe('Gen');
  });
});
```

### 7.2 Integration Tests

```typescript
// tests/integration/sync.test.ts
describe('Full Sync Flow', () => {
  it('should sync frontmatter correctly', async () => {
    const content = 'Joh 3,16-18 und Gen 1,1';
    const tags = await fullSyncPipeline(content);
    
    expect(tags).toContain('bible/Joh/3/16');
    expect(tags).toContain('bible/Joh/3/17');
    expect(tags).toContain('bible/Joh/3/18');
    expect(tags).toContain('bible/Gen/1/1');
  });
});
```

### 7.3 Test Commands

```bash
npm run test          # Alle Tests
npm run test:watch    # Watch Mode
npm run test:coverage # Coverage Report
```

---

## 8. Bekannte Einschränkungen & Future Work

### 8.1 Aktuelle Einschränkungen

| Einschränkung | Beschreibung | Workaround |
|---------------|--------------|------------|
| **Verszählung** | Verschiedene Übersetzungen haben unterschiedliche Verszählungen (z.B. Psalmen) | Aktuell: Lutherbibel/ESV Standard |
| **Code-Blöcke** | Werden nicht geparst | Referenz außerhalb wiederholen |
| **Kontext-Referenzen** | "V. 16" ohne Buchname wird nicht erkannt | Vollständige Referenz verwenden |

### 8.2 Future Work (TODOs)

#### Priorität 1: Verszählung

```
TODO: Unterschiedliche Verszählungen unterstützen

Problem:
- Deutsche Bibeln (Luther, Elberfelder) haben teilweise andere Verszählungen
- Besonders betroffen: Psalmen, Joel, Maleachi, 3. Johannes
- Beispiel: Psalm 51 - Luther zählt Überschrift als Vers 1-2

Lösungsansatz:
1. Zusätzliche Datenstruktur für Mapping zwischen Zählsystemen
2. Setting für "Zählsystem": Luther, ESV/NIV, Einheitsübersetzung
3. Bei Sync: Immer auf Referenz-System normalisieren
4. Bei Display: Zurück in User-Präferenz konvertieren

Aufwand: ~2-3 Tage
```

#### Priorität 2: Apokryphen

```
TODO: Deuterokanonische Bücher unterstützen

Bücher:
- Tobit, Judith, Weisheit, Sirach
- Baruch, 1-2 Makkabäer
- Zusätze zu Ester und Daniel

Aufwand: ~1 Tag (Datenstruktur erweitern)
```

#### Priorität 3: Kontext-Referenzen

```
TODO: "V. 16" im Kontext erkennen

Wenn vorher "Joh 3,15" steht, sollte "V. 16" als "Joh 3,16" erkannt werden.

Komplexität: Hoch (State-Management über Absätze)
Aufwand: ~2 Tage
```

#### Priorität 4: Parallelen-Datenbank

```
TODO: Bekannte Parallelstellen vorschlagen

Beispiel: Bei Mt 5-7 automatisch Lk 6 vorschlagen (Bergpredigt/Feldrede)

Aufwand: ~3 Tage (Datenbank + UI)
```

---

## 9. Claude Code Agentenanweisungen

### 9.1 Projektkontext

```
Du entwickelst das "Bible Reference Mapper" Obsidian Plugin.

LIES DIESE GESAMTE README VOLLSTÄNDIG, bevor du mit der Implementierung beginnst.

Kernprinzip: LOW FRICTION
- Der Nutzer schreibt natürlich, das Plugin erkennt automatisch
- Keine spezielle Syntax erforderlich
- Verschiedene Schreibweisen werden akzeptiert
```

### 9.2 Entwicklungsregeln

```
REGELN FÜR DIE ENTWICKLUNG:

1. ARCHITEKTUR
   - Halte dich exakt an die Projektstruktur in Abschnitt 3.1
   - Jedes Modul hat eine klar definierte Verantwortung
   - Keine zirkulären Abhängigkeiten

2. TYPEN
   - Nutze die Types aus Abschnitt 4.1 exakt wie definiert
   - Keine `any` Types außer in Test-Mocks
   - Strikte TypeScript-Konfiguration

3. PARSER
   - Parse-Reihenfolge ist KRITISCH (spezifisch → allgemein)
   - Überlappende Matches vermeiden
   - Immer zu Einzelversen expandieren (Atomic Tagging)

4. SYNC
   - IMMER Loop-Prevention implementieren (isUpdating Flag)
   - Nur schreiben wenn sich etwas geändert hat
   - processFrontMatter korrekt nutzen

5. TESTING
   - Für jeden Parser: Unit Tests mit Edge Cases
   - Besonders testen: Nummerierte Bücher, Ranges, Mixed
   - Tests VOR Implementation schreiben (TDD)

6. OBSIDIAN API
   - Konsultiere https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin
   - Nutze metadataCache für Performance
   - Events korrekt registrieren und deregistrieren
```

### 9.3 Implementierungsreihenfolge

```
BEFOLGE DIESE REIHENFOLGE:

PHASE 1: Setup
□ 1. manifest.json erstellen
□ 2. package.json mit Dependencies
□ 3. tsconfig.json (strict mode)
□ 4. esbuild.config.mjs
□ 5. src/types.ts

PHASE 2: Data Layer
□ 6. src/data/bibleStructure.ts (VOLLSTÄNDIG mit allen 66 Büchern)
□ 7. src/data/bookMappings.de.ts (ALLE deutschen Aliase)
□ 8. src/data/bookMappings.en.ts (ALLE englischen Aliase)

PHASE 3: Parser (MIT TESTS)
□ 9. src/parser/BookNormalizer.ts
□ 10. tests/parser/BookNormalizer.test.ts
□ 11. src/parser/RangeExpander.ts
□ 12. tests/parser/RangeExpander.test.ts
□ 13. src/parser/ContentCleaner.ts
□ 14. src/parser/SmartBibleParser.ts
□ 15. tests/parser/SmartBibleParser.test.ts
□ 16. src/parser/TitleParser.ts

PHASE 4: Sync
□ 17. src/sync/TagGenerator.ts
□ 18. src/sync/FrontmatterSync.ts (MIT Loop-Prevention!)
□ 19. src/sync/SyncManager.ts

PHASE 5: Settings
□ 20. src/settings/defaultSettings.ts
□ 21. src/settings/presets.ts
□ 22. src/settings/SettingsTab.ts

PHASE 6: Main Plugin
□ 23. src/main.ts (alles zusammenführen)
□ 24. Commands registrieren

PHASE 7: Sidebar
□ 25. src/views/ConcordanceSidebarView.ts
□ 26. styles.css

PHASE 8: Polish
□ 27. Edge Case Tests
□ 28. Performance Check
□ 29. Build & Test
```

### 9.4 Code-Qualitätsstandards

```
CODE STANDARDS:

1. DOKUMENTATION
   - JSDoc für alle public methods
   - Inline-Kommentare für komplexe Logik
   - Deutsche Kommentare sind OK

2. ERROR HANDLING
   - Graceful degradation (nie crashen)
   - Ungültige Referenzen still ignorieren
   - Logging nur im Dev-Modus

3. PERFORMANCE
   - Debouncing bei Events (min. 500ms)
   - Index-Cache in Sidebar (isDirty Pattern)
   - Keine synchronen Vault-Operationen

4. OBSIDIAN BEST PRACTICES
   - registerEvent für alle Event-Listener
   - onunload für Cleanup
   - Workspace.on statt direkte DOM-Events
```

### 9.5 Kritische Implementierungsdetails

```
ACHTE BESONDERS AUF:

1. FRONTMATTER LOOP PREVENTION
   ─────────────────────────────
   processFrontMatter triggert 'modify' Event!
   
   FALSCH:
   vault.on('modify', async (file) => {
     await processFrontMatter(file, ...); // → INFINITE LOOP!
   });
   
   RICHTIG:
   private isUpdating = false;
   
   async sync(file) {
     if (this.isUpdating) return;
     this.isUpdating = true;
     try {
       await processFrontMatter(file, ...);
     } finally {
       this.isUpdating = false;
     }
   }

2. REGEX PATTERN REIHENFOLGE
   ─────────────────────────────
   "Joh 3,16-4,3" muss VOR "Joh 3,16" gematcht werden!
   Sonst wird nur "Joh 3,16" erkannt.
   
   Reihenfolge:
   1. Cross-Chapter Ranges (Joh 3,16-4,3)
   2. Verse References (Joh 3,16-18)
   3. Chapter References (Joh 3)
   4. Book References (Kolosserbrief)

3. BOOK NAME MATCHING
   ─────────────────────────────
   Sortiere Aliase nach Länge (längste zuerst)!
   
   FALSCH: "Joh" matcht in "Johannes" → falsches Ergebnis
   RICHTIG: "Johannes" wird vor "Joh" geprüft

4. SIDEBAR PERFORMANCE
   ─────────────────────────────
   Nutze metadataCache, NICHT vault.read()!
   
   FALSCH:
   for (const file of files) {
     const content = await vault.read(file); // LANGSAM!
   }
   
   RICHTIG:
   for (const file of files) {
     const cache = metadataCache.getFileCache(file);
     const tags = cache?.frontmatter?.['bible-refs'];
   }
```

### 9.6 Test-Szenarien

```
STELLE SICHER, DASS DIESE FÄLLE FUNKTIONIEREN:

PARSER:
✓ "Joh 3,16" → bible/Joh/3/16
✓ "Johannes 3:16" → bible/Joh/3/16
✓ "Joh 3,16-18" → bible/Joh/3/16, .../17, .../18
✓ "Joh 3,16.18.20" → bible/Joh/3/16, .../18, .../20
✓ "Joh 3,16-4,3" → alle Verse von 3:16 bis 4:3
✓ "Joh 3" → alle Verse in Kapitel 3
✓ "Joh 3-4" → alle Verse in Kapitel 3 und 4
✓ "Kolosserbrief" → bible/Col (Buch-Level)
✓ "1. Mose 3,15" → bible/Gen/3/15
✓ "1Mose 3,15" → bible/Gen/3/15
✓ "1 Kor 13" → bible/1Co/13 (Kapitel-Level)

IGNORE:
✗ `Joh 3,16` (in Code) → nichts
✗ ```Joh 3,16``` (in Codeblock) → nichts
✗ [[Joh 3,16]] (Obsidian Link) → nichts

TITEL:
✓ "Joh 3,16.md" → bible/Joh/3/16
✓ "Kolosser Zusammenfassung.md" → bible/Col
✓ "Meine Notizen.md" → nichts
```

### 9.7 Abschluss-Checkliste

```
VOR DEM ABSCHLUSS PRÜFEN:

□ Alle 66 Bücher in bibleStructure.ts vorhanden
□ Deutsche UND englische Mappings vollständig
□ Parser-Tests grün
□ Sync-Loop-Prevention funktioniert
□ Settings speichern und laden korrekt
□ Sidebar aktualisiert bei Datei-Wechsel
□ Manual Sync Button funktioniert
□ Commands in Palette verfügbar
□ Build ohne Errors
□ Plugin lädt in Obsidian ohne Errors
```

---

## Lizenz

GNU GPLv3

---

*Erstellt für die Obsidian Community. Soli Deo Gloria.*