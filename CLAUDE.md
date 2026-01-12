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

- `src/main.ts` - Plugin entry point, registers commands and settings
- `src/parser/SmartBibleParser.ts` - Main reference detection engine
- `src/parser/BookNormalizer.ts` - Maps aliases to canonical book IDs
- `src/parser/RangeExpander.ts` - Expands verse ranges to atomic references
- `src/sync/SyncManager.ts` - Orchestrates sync operations, handles events
- `src/sync/FrontmatterSync.ts` - YAML frontmatter read/write
- `src/data/bibleStructure.ts` - Chapter/verse counts for all 66 books
- `src/data/bookMappings.de.ts`, `bookMappings.en.ts` - Language-specific aliases

## Code Conventions

- TypeScript strict mode - no `any` types except in test mocks
- German comments in code are acceptable
- Return `null` for invalid input, never throw exceptions for parse failures
- Use Obsidian's `metadataCache` instead of reading file content directly
- Register events with `this.registerEvent()` for automatic cleanup
