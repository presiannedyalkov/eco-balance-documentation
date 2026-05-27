# Bookmarks enrichment workflow

**Purpose:** Add evidence and specificity to Eco Balance strategic docs using the Climate Change bookmark corpus.

## Sources

| Source | Use |
|--------|-----|
| Git submodule `research/bookmarks/` | File paths for markdown citations in Obsidian/Docusaurus |
| [bookmarks-mcp](https://gitea.nexus-home.cc/pres/bookmarks-mcp) | Semantic + keyword search, `get_related`, full corpus (~1600 articles) |

Filter MCP searches with `collections=["Climate Change"]` unless a topic clearly spans collections.

## Rules

1. Edit **strategic/** or **00_Eco_Balance_Hub.md**, then `npm run sync:docs`.
2. Prefer **one-line insight + link** to `research/bookmarks/Climate Change/{entry_id}.md`—not pasted `ai_summary` blocks.
3. Use `entry_id` from frontmatter (`raindrop_id` legacy field may differ; prefer `entry_id` when present).
4. Mark low `verification_score` or `needs_review: true` articles as “needs verification” in prose.
5. Do not treat bookmark text as ground truth; it is curated reading material you saved.

## What enrichment fixes

| Doc gap | Bookmark adds |
|---------|----------------|
| Repeated vision boilerplate | Distinct examples (policy, projects, methods) |
| Generic “we will…” plans | Named programs, geographies, numbers |
| No citations | Traceable `entry_id` + URL in frontmatter |
| Template voice | Your saved articles + `ai_relevance` as a prompt, not copy-paste |

## MCP tools (when deployed)

- `search_bookmarks(query, collections=["Climate Change"], limit=10)`
- `get_bookmark(entry_id)`
- `get_related(entry_id)`

## First enriched files

- `00_Eco_Balance_Hub.md` — “From our research” section
- `strategic/04a_Detailed_Status_Assessment.md` — research foundation themes

---

**Last updated:** 2026-02
