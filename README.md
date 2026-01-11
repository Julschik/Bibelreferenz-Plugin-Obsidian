# Bible Reference Mapper

[![Obsidian Plugin](https://img.shields.io/badge/Obsidian-Plugin-7c3aed?logo=obsidian&logoColor=white)](https://obsidian.md/)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/Julschik/bible-reference-mapper)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL%203.0-green.svg)](LICENSE)

> **Low Friction Bible Study Integration**
> Write naturally. The plugin automatically detects Bible references and connects them in your graph.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Usage](#usage)
- [Configuration](#configuration)
- [Supported Formats](#supported-formats)
- [Commands](#commands)
- [FAQ](#faq)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Automatic Reference Detection

Write Bible references naturally - the plugin recognizes them automatically:

```markdown
Today I studied Joh 1,1 and found connections to Genesis 1,1.
Colossians also discusses creation themes in Col 1,15-20.
```

The plugin detects these references and creates hierarchical tags in your frontmatter.

### Shadow Tags (Frontmatter Sync)

Detected references are synced as tags to your frontmatter:

```yaml
---
bible-refs:
  - bible/Joh/1/1
  - bible/Gen/1/1
  - bible/Col/1/15
  - bible/Col/1/16
  - bible/Col/1/17
  - bible/Col/1/18
  - bible/Col/1/19
  - bible/Col/1/20
---
```

**Atomic Tagging**: Ranges are ALWAYS expanded to individual verses - never `bible/Col/1/15-20`, always separate tags for each verse.

### Graph Integration

The hierarchical tag structure creates a natural tree in Obsidian's graph:

```
bible/
├── Gen
│   └── 1
│       └── 1  ← All notes mentioning "Gen 1:1"
├── Joh
│   └── 1
│       └── 1  ← All notes mentioning "Joh 1,1"
└── Col
    └── 1
        ├── 15
        ├── 16
        └── ...
```

### Concordance Sidebar

A dedicated sidebar view showing:
- **Related Notes**: Notes sharing the same Bible references
- **Sync Button**: Manual sync control
- **Thematic Connections**: Discover co-occurring references

### Multi-Language Support

- **German** (default): `Joh 1,1` / `1. Mose 3,15`
- **English**: `John 3:16` / `Genesis 3:15`
- **Custom**: Define your own separators

---

## Installation

### From Obsidian Community Plugins (Recommended)

1. Open **Settings** → **Community Plugins**
2. Click **Browse** and search for "Bible Reference Mapper"
3. Click **Install**, then **Enable**

### Manual Installation

1. Download the latest release from [GitHub Releases](https://github.com/Julschik/bible-reference-mapper/releases)
2. Extract files to: `<vault>/.obsidian/plugins/bible-reference-mapper/`
3. Reload Obsidian
4. Enable the plugin in **Settings** → **Community Plugins**

### From Source

```bash
# Clone the repository
git clone https://github.com/Julschik/bible-reference-mapper.git
cd bible-reference-mapper

# Install dependencies
npm install

# Build the plugin
npm run build

# Copy to your vault
cp main.js manifest.json styles.css <vault>/.obsidian/plugins/bible-reference-mapper/
```

---

## Quick Start

1. **Install and enable** the plugin
2. **Write a note** with Bible references:
   ```markdown
   # My Study Notes

   Today I read Joh 3,16-18 and reflected on God's love.
   See also 1. Mose 3,15 for the first promise.
   ```
3. **Save the file** (Ctrl/Cmd + S)
4. **Check frontmatter** - tags are automatically added!
5. **Open Graph View** to see your Bible reference network

---

## Usage

### Writing References

Simply write references naturally in your notes:

| What you write | Tags created |
|----------------|--------------|
| `Joh 3,16` | `bible/Joh/3/16` |
| `Joh 3,16-18` | `bible/Joh/3/16`, `.../17`, `.../18` |
| `Joh 3,16.18.20` | `bible/Joh/3/16`, `.../18`, `.../20` |
| `Joh 3` | All verses in chapter 3 |
| `Kolosserbrief` | `bible/Col` (book-level) |

### File Title Parsing

References in file names are also recognized:

| Filename | Recognized as |
|----------|---------------|
| `Joh 3,16.md` | Verse reference |
| `Kolosser Summary.md` | Book reference |
| `Genesis Overview.md` | Book reference |

**Use Case**: Deep-dive notes like `Joh 3,16.md` appear in the sidebar when that verse is mentioned elsewhere.

### Concordance Sidebar

Open via:
- Command Palette: "Open Bible References Sidebar"
- Click the book icon in the ribbon

The sidebar shows:
1. **Sync Button** - Manually trigger sync
2. **Related Notes** - Grouped by relevance:
   - Exact verse matches
   - Same chapter
   - Same book
3. **Thematic Connections** - Co-occurring references

---

## Configuration

Access settings via **Settings** → **Community Plugins** → **Bible Reference Mapper**

### Sync Mode

| Mode | Description | Trigger |
|------|-------------|---------|
| **Save + Change** (default) | Like Obsidian Linter | Ctrl+S or file switch |
| **Save Only** | Conservative | Only Ctrl+S |
| **File Change Only** | On navigation | When opening another file |
| **Manual** | Full control | Command Palette or sidebar button |

### Language Settings

| Setting | German (default) | English |
|---------|-----------------|---------|
| Chapter-Verse separator | `,` | `:` |
| List separator | `.` | `,` |
| Range separator | `-` | `-` |

**Examples:**
- German: `Joh 3,16-18.20` (verses 16-18 and 20)
- English: `John 3:16-18,20` (verses 16-18 and 20)

### Advanced Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `frontmatterKey` | `bible-refs` | YAML key for storing tags |
| `tagPrefix` | `bible/` | Prefix for all tags |
| `parseCodeBlocks` | `false` | Parse references inside code blocks |
| `parseTitles` | `true` | Parse file names for references |

---

## Supported Formats

### Reference Types

| Type | Examples | Result |
|------|----------|--------|
| Single verse | `Joh 3,16` / `John 3:16` | Tag for verse 16 |
| Verse list | `Joh 3,16.18` | Tags for verses 16 and 18 |
| Verse range | `Joh 3,16-18` | Tags for verses 16, 17, 18 |
| Mixed | `Joh 3,16-18.20` | Tags for 16, 17, 18, 20 |
| Cross-chapter | `Joh 3,16-4,3` | All verses from 3:16 to 4:3 |
| Whole chapter | `Joh 3` | All verses in chapter 3 |
| Chapter range | `Joh 3-4` | All verses in chapters 3 and 4 |
| Whole book | `Kolosserbrief` | Book-level tag |
| Numbered books | `1. Mose 3,15` / `1Mose` | Correct detection |

### Book Name Aliases

The plugin recognizes many aliases for each book:

| Book | German Aliases | English Aliases |
|------|---------------|-----------------|
| Genesis | Gen, Genesis, 1. Mose, 1.Mose, 1Mo | Gen, Genesis, Gn |
| John | Joh, Johannes, Jo, Jn | John, Jn, Joh |
| Colossians | Kol, Kolosser, Kolosserbrief | Col, Colossians |
| 1 Corinthians | 1. Kor, 1Kor, 1 Korinther | 1 Cor, 1 Corinthians |

See [DEVELOPER.md](DEVELOPER.md) for the complete list of all 66 books.

### Ignored Content

The parser automatically ignores:
- YAML frontmatter
- Code blocks (``` ... ```)
- Inline code (` ... `)
- Obsidian links (`[[...]]`)
- URLs

---

## Commands

Available in the Command Palette (Ctrl/Cmd + P):

| Command | Description |
|---------|-------------|
| **Open Bible References** | Open the concordance sidebar |
| **Sync Current File** | Manually sync the active file |
| **Sync All Files** | Batch sync entire vault |

---

## FAQ

### Why are my references not being detected?

1. **Check sync mode** - If set to "Manual", you need to trigger sync manually
2. **Check separators** - Make sure your language setting matches your writing style
3. **Inside code block?** - By default, code blocks are not parsed
4. **Correct format?** - The reference needs book name + chapter (+ optional verse)

### Why do ranges expand to individual verses?

This is intentional ("Atomic Tagging"). It enables:
- Precise graph connections
- Better search results
- Accurate co-occurrence analysis

### Can I use my own tag format?

Yes! Configure the `tagPrefix` setting. Default is `bible/`, but you can use:
- `scripture/`
- `verses/`
- Any prefix you prefer

### Does this work offline?

Yes, 100%. The plugin is completely local with no external API calls.

### What Bible version is used for verse counts?

The plugin uses the verse counting from the Luther Bible 2017 / ESV standard. Future versions may support alternative verse counting systems.

---

## Contributing

Contributions are welcome! Please see [DEVELOPER.md](DEVELOPER.md) for:
- Architecture documentation
- Development setup
- Coding standards
- Testing guidelines

### Quick Start for Contributors

```bash
# Clone and setup
git clone https://github.com/Julschik/bible-reference-mapper.git
cd bible-reference-mapper
npm install

# Run tests
npm test

# Development build (watch mode)
npm run dev

# Production build
npm run build
```

---

## License

This project is licensed under the [GNU General Public License v3.0](LICENSE).

---

## Acknowledgments

- Built for the [Obsidian](https://obsidian.md/) community
- Inspired by the need for low-friction Bible study workflows
- *Soli Deo Gloria*

---

## Support

- [Report Issues](https://github.com/Julschik/bible-reference-mapper/issues)
- [Feature Requests](https://github.com/Julschik/bible-reference-mapper/discussions)
- [Documentation](https://github.com/Julschik/bible-reference-mapper/wiki)
