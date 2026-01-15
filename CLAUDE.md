# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bible Reference Mapper is an Obsidian plugin that automatically detects Bible references in natural text and syncs them as hierarchical tags to frontmatter. It supports German and English formats without requiring special syntax from users.

## Build Commands

```bash
npm install          # Install dependencies
npm run dev          # Watch mode (development) - outputs to main.js
npm run build        # Production build (minified)
npm test             # Run Vitest test suite
npm run test:watch   # Tests in watch mode
npm run test:coverage # Coverage report

# Run a single test file
npx vitest tests/parser/SmartBibleParser.test.ts
npx vitest tests/parser/RangeExpander.test.ts --watch
```

The plugin outputs `main.js`, `manifest.json`, and `styles.css` - these are copied to `<vault>/.obsidian/plugins/bible-reference-mapper/` for installation.

## Architecture

### Data Flow Pipeline

```
User saves file
    ↓
SyncManager (event handling, debouncing 500ms)
    ↓
ContentCleaner (removes frontmatter, code blocks, links, URLs)
    ↓
SmartBibleParser (regex-based reference detection)
    ↓
BookNormalizer (aliases → canonical IDs like "Joh", "Gen", "Col")
    ↓
RangeExpander (expands ranges to individual verses)
    ↓
TagGenerator (produces tags like "bible/Joh/3/16")
    ↓
FrontmatterSync (writes to YAML frontmatter)
```

### Critical Design Patterns

**Atomic Tagging**: Ranges ALWAYS expand to individual verse tags. Never `bible/Joh/3/16-18`, always separate tags `bible/Joh/3/16`, `bible/Joh/3/17`, `bible/Joh/3/18`.

**Parse Order**: SmartBibleParser processes patterns most-specific-first:
1. Cross-chapter ranges (`Joh 3,16-4,3`)
2. Verse references (`Joh 3,16-18`)
3. Chapter references (`Joh 3`)
4. Standalone book references (`Kolosserbrief`)

**Loop Prevention**: FrontmatterSync uses an `isUpdating` flag to prevent infinite loops when `processFrontMatter()` triggers a 'modify' event.

**Longest-First Matching**: BookNormalizer tries longer aliases before shorter ones ("Johannes" before "Joh") to prevent partial matches.

## Key Modules

**Core Pipeline:**
- `src/main.ts` - Plugin entry point, settings migration, command registration
- `src/parser/SmartBibleParser.ts` - Main reference detection engine (regex-based)
- `src/parser/BookNormalizer.ts` - Maps aliases to canonical book IDs
- `src/parser/RangeExpander.ts` - Expands verse ranges to atomic references
- `src/parser/ContentCleaner.ts` - Strips frontmatter, code blocks, links, URLs
- `src/parser/TitleParser.ts` - Parses references from filenames

**Sync Layer:**
- `src/sync/SyncManager.ts` - Event handling, debouncing (500ms), sync orchestration
- `src/sync/FrontmatterSync.ts` - YAML frontmatter read/write with loop prevention
- `src/sync/TagGenerator.ts` - Converts ParsedReference[] to tag strings

**Data:**
- `src/data/bibleStructure.ts` - Chapter/verse counts for all 66 books
- `src/data/bookMappings.de.ts`, `bookMappings.en.ts` - Language-specific aliases

**UI:**
- `src/sidebar/ConcordanceSidebarView.ts` - Main sidebar with tabs
- `src/settings/SettingsTab.ts` - Plugin settings UI
- `src/i18n/I18nService.ts` - UI localization (German/English)

## Code Conventions

- TypeScript strict mode - no `any` types except in test mocks
- German comments in code are acceptable
- Return `null` for invalid input, never throw exceptions for parse failures
- Use Obsidian's `metadataCache` instead of reading file content directly
- Register events with `this.registerEvent()` for automatic cleanup
- Factory functions follow `createX()` pattern (e.g., `createSyncManager()`)
- Settings migrations in `main.ts loadSettings()` - check for old keys and transform

## Testing

Tests are in `tests/` mirroring the `src/` structure. Key test files:
- `tests/parser/SmartBibleParser.test.ts` - Core parsing (German/English formats, edge cases)
- `tests/parser/RangeExpander.test.ts` - Range/list expansion
- `tests/sync/integration.test.ts` - End-to-end flow tests

Test patterns to cover: verse lists (`16.18.20`), ranges (`16-18`), mixed (`16-18.20`), cross-chapter (`3,16-4,3`), numbered books (`1. Mose`), standalone patterns (`Kolosserbrief`), and content that should be ignored (code blocks, links, URLs).

## Further Documentation

See [DEVELOPER.md](DEVELOPER.md) for comprehensive technical documentation including mermaid diagrams, complete type definitions, and all 66 canonical book IDs.
