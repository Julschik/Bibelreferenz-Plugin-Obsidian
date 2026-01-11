# Changelog

All notable changes to the Bible Reference Mapper plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- Support for deuterocanonical/apocryphal books
- Alternative verse counting systems (Luther vs ESV)
- Context-aware reference parsing ("V. 16" when chapter is established)
- Parallel passage suggestions
- Additional language support

---

## [1.0.0] - 2025-01-11

### Added

#### Core Features
- **Automatic Bible Reference Detection**
  - Smart parser recognizes references in natural text
  - Support for German and English formats
  - Handles single verses, verse lists, ranges, and cross-chapter ranges
  - Recognizes chapter-only and book-only references
  - Support for numbered books (1. Mose, 2 Kor, etc.)

- **Shadow Tags (Frontmatter Sync)**
  - Automatic synchronization to YAML frontmatter
  - Atomic tagging - ranges always expand to individual verses
  - Configurable frontmatter key and tag prefix

- **Multiple Sync Modes**
  - On save + change (default)
  - On save only
  - On file change only
  - Manual sync

- **Multi-Language Support**
  - German language preset (`, . -` separators)
  - English language preset (`: , -` separators)
  - Custom separator configuration

- **Title Parsing**
  - References in file names are recognized
  - Enables deep-dive notes (e.g., `Joh 3,16.md`)

#### User Interface
- **Concordance Sidebar**
  - Dedicated sidebar view for Bible references
  - Sync button with visual feedback
  - Related notes display (structure prepared)

- **Settings Tab**
  - Sync mode selection
  - Language preset dropdown
  - Custom separator inputs
  - Frontmatter key configuration
  - Tag prefix configuration
  - Code block parsing toggle
  - Title parsing toggle

- **Commands**
  - Open Bible References sidebar
  - Sync Current File
  - Sync All Files

#### Data
- Complete Bible structure for all 66 books
  - Chapter counts
  - Verse counts per chapter
  - Based on Luther Bible 2017 / ESV standard

- German book mappings
  - All 66 books with German aliases
  - Standalone patterns for book-only recognition

- English book mappings
  - All 66 books with English aliases
  - Standalone patterns for book-only recognition

#### Architecture
- **Parser Pipeline**
  - SmartBibleParser - Main detection engine
  - BookNormalizer - Alias to canonical ID mapping
  - RangeExpander - Range to atomic verse expansion
  - TitleParser - Filename parsing
  - ContentCleaner - Exclusion of code blocks, links, etc.

- **Sync Pipeline**
  - SyncManager - Event coordination and sync modes
  - TagGenerator - Reference to tag conversion
  - FrontmatterSync - YAML read/write with loop prevention

- **Safety Features**
  - Loop prevention in frontmatter sync
  - Debouncing (500ms) for rapid file changes
  - Graceful degradation (invalid references ignored)

### Technical
- TypeScript with strict mode
- ESBuild bundler
- Vitest test framework
- No external runtime dependencies
- 100% local processing (no API calls)

### Documentation
- Comprehensive README with usage guide
- Developer documentation with architecture details
- API reference with Mermaid diagrams
- Contributing guidelines

---

## Version History Summary

| Version | Date | Highlights |
|---------|------|------------|
| 1.0.0 | 2025-01-11 | Initial release with full feature set |

---

## Migration Guide

### Upgrading from Pre-release

If you were using a pre-release version:

1. **Backup your vault** before upgrading
2. **Check frontmatter key** - default changed to `bible-refs`
3. **Review tag format** - tags now follow `bible/Book/Chapter/Verse` pattern
4. **Test sync mode** - verify your preferred mode works as expected

### Fresh Installation

No migration needed. See [README.md](README.md) for installation instructions.

---

## Reporting Issues

Found a bug or have a feature request?

1. Check [existing issues](https://github.com/Julschik/bible-reference-mapper/issues)
2. Create a [new issue](https://github.com/Julschik/bible-reference-mapper/issues/new) with:
   - Your Obsidian version
   - Plugin version
   - Steps to reproduce
   - Expected vs actual behavior

---

*Soli Deo Gloria*
