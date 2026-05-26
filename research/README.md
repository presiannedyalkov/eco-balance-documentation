# Research Bookmarks

Curated, AI-enriched markdown articles from Raindrop.io, maintained in the unified bookmarks repository on Gitea.

## Structure

```
research/
├── bookmarks/                    # Git submodule: pres/bookmarks on Gitea
│   ├── Climate Change/           # ~475 articles (primary corpus for Eco Balance)
│   ├── Activism/
│   ├── Business/
│   └── ...                       # Other collections (14 total)
└── README.md                     # This file
```

## Source Repository

- **Repository:** [pres/bookmarks](https://gitea.nexus-home.cc/pres/bookmarks) on Gitea (`https://gitea.nexus-home.cc/pres/bookmarks.git`)
- **Climate Change articles:** ~475 markdown files in `Climate Change/`
- **Format:** Each article has YAML frontmatter (`raindrop_id`, `title`, `url`, `tags`, `ai_summary`, etc.)
- **Naming:** Files are named by `raindrop_id` (e.g. `1620242155000.md`)

For search and similarity across all collections, use [bookmarks-mcp](https://gitea.nexus-home.cc/pres/bookmarks-mcp) (Meilisearch + Qdrant on your LAN).

## Auto-Sync

GitHub Actions syncs the submodule when the bookmarks repo changes:

- **Schedule:** Every 6 hours
- **Workflow:** `.github/workflows/sync-research-bookmarks.yml`
- **Manual trigger:** `workflow_dispatch`
- **Requires:** `GITEA_READ_TOKEN` secret (read-only Gitea token)

## Usage

### Accessing Climate Change Articles

Articles are in `research/bookmarks/Climate Change/`. Example frontmatter:

```yaml
---
raindrop_id: 1014978855
title: Article Title
url: https://example.com/article
collection: Climate Change
content_type: reference
tags:
  - climate_change
  - biodiversity
ai_summary: ...
---
```

### Citing Articles

```markdown
According to research [^1], native species restoration shows strong outcomes in comparable climates.

[^1]: [Article Title](research/bookmarks/Climate%20Change/1014978855.md) — example.com
```

## Manual Update

```bash
git submodule sync research/bookmarks
git submodule update --init --remote research/bookmarks
git add research/bookmarks .gitmodules
git commit -m "chore: update research bookmarks submodule"
```

## Cloning with Submodule

```bash
git clone --recurse-submodules https://github.com/presiannedyalkov/eco-balance-documentation.git
```

Or after clone:

```bash
git submodule update --init --recursive
```

## Statistics

- **Climate Change articles:** ~475 (in submodule)
- **All collections:** ~1600+ (full bookmarks repo; searchable via bookmarks-mcp)
- **Last updated:** Auto-synced via GitHub Actions when `GITEA_READ_TOKEN` is configured

---

**Note:** Edit articles in the [bookmarks](https://gitea.nexus-home.cc/pres/bookmarks) repository, not inside this submodule checkout.
