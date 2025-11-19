# Research Bookmarks

This directory contains research articles and bookmarks related to climate change, environmental restoration, biodiversity, and related topics.

## Structure

```
research/
├── bookmarks/          # Git submodule: climate-change-bookmarks repository
│   └── articles/       # 399+ markdown articles with YAML frontmatter
└── README.md           # This file
```

## Source Repository

The bookmarks are maintained in a separate repository:
- **Repository:** [climate-change-bookmarks](https://github.com/presiannedyalkov/climate-change-bookmarks)
- **Articles:** 399+ markdown files
- **Format:** Each article has YAML frontmatter with metadata (title, URL, tags, dates)
- **Naming:** Files are named by `raindrop_id` (e.g., `1014978855.md`)

## Auto-Sync

The research bookmarks are automatically synced via GitHub Actions:
- **Schedule:** Every 6 hours
- **Workflow:** `.github/workflows/sync-research-bookmarks.yml`
- **Manual Trigger:** Available via `workflow_dispatch`

## Usage

### Accessing Articles

Articles are located in `research/bookmarks/articles/`. Each article is a markdown file with:

```yaml
---
raindrop_id: 1014978855
title: Article Title
url: https://example.com/article
domain: example.com
created: 2025-04-14T17:26:56.372Z
downloaded: 2025-11-14T17:00:07.259604
tags:
  - Climate_Change
  - Biodiversity
cleaned: true
---

# Article Title

**Source:** [example.com](https://example.com/article)
**Tags:** #Climate_Change #Biodiversity

[Article content...]
```

### Searching Articles

You can search articles by:
- **Tags:** Look for specific tags in frontmatter
- **Domain:** Filter by source domain
- **Title:** Search article titles
- **Content:** Full-text search in article bodies

### Citing Articles

When referencing research in documentation, use the article's `raindrop_id` or URL:

```markdown
According to research [^1], native species restoration has a 85% success rate.

[^1]: [Article Title](research/bookmarks/articles/1014978855.md) - Source: example.com
```

## Manual Update

To manually update the submodule:

```bash
# Update to latest version
git submodule update --remote research/bookmarks

# Commit the update
git add research/bookmarks .gitmodules
git commit -m "chore: update research bookmarks submodule"
```

## Cloning with Submodule

When cloning this repository, include the submodule:

```bash
git clone --recurse-submodules https://github.com/presiannedyalkov/eco-balance-documentation.git
```

Or if already cloned:

```bash
git submodule update --init --recursive
```

## Integration with AI Personas

The research bookmarks are available to AI personas (Knowledge Synthesizer, etc.) for:
- Extracting insights from research
- Adding citations to documentation
- Validating claims against research sources
- Generating research-backed content

## Statistics

- **Total Articles:** 399+ (growing)
- **Format:** Markdown with YAML frontmatter
- **Last Updated:** Auto-synced every 6 hours
- **Location:** `research/bookmarks/articles/`

---

**Note:** The bookmarks repository is maintained separately. Changes to articles should be made in the [climate-change-bookmarks](https://github.com/presiannedyalkov/climate-change-bookmarks) repository, not directly in this submodule.

