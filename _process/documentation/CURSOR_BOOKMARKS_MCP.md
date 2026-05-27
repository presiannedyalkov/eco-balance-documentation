# Cursor + bookmarks-mcp setup

Use this when enriching Eco Balance docs with semantic search over the full bookmarks vault (~1600 articles, 475+ in Climate Change).

## Prerequisites

- [bookmarks-mcp](https://gitea.nexus-home.cc/pres/bookmarks-mcp) running on Unraid (default: `http://192.168.178.35:7100`)
- Bearer token set in Unraid (`MCP_AUTH_TOKEN` in compose env)
- VPN/LAN access from the machine running Cursor

## Cursor MCP config

Add to Cursor **Settings → MCP** (or project `.cursor/mcp.json` if you use one):

```json
{
  "mcpServers": {
    "bookmarks": {
      "url": "http://192.168.178.35:7100/sse",
      "headers": {
        "Authorization": "Bearer YOUR_MCP_AUTH_TOKEN"
      }
    }
  }
}
```

Replace `YOUR_MCP_AUTH_TOKEN` with the value from your Unraid `bookmarks-mcp` stack (not the Gitea token).

## Tools to use for Eco Balance work

| Tool | Use |
|------|-----|
| `search_bookmarks` | `collections: ["Climate Change"]`, queries like “EU restoration funding Germany”, “rewilding lessons”, “mycorrhizal soil” |
| `get_bookmark` | Read full article + frontmatter for citations |
| `get_related` | Follow `article_relationships` from a strong hit |
| `list_recent` | See what you saved lately on a theme |

## Enrichment workflow

See [BOOKMARKS_ENRICHMENT.md](BOOKMARKS_ENRICHMENT.md):

1. Search with bookmarks-mcp
2. Edit `strategic/` or `00_Eco_Balance_Hub.md`
3. Cite `research/bookmarks/Climate Change/{entry_id}.md`
4. `npm run sync:docs` then `npm run build`

## Submodule vs MCP

| Mechanism | Role |
|-----------|------|
| Git submodule `research/bookmarks/` | Stable file paths in markdown; CI sync via `GITEA_READ_TOKEN` |
| bookmarks-mcp | Discovery, similarity, related articles—not required in CI |

---

**Last updated:** 2026-05
