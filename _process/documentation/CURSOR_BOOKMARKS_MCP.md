# Cursor + bookmarks-mcp setup

Use this when enriching Eco Balance docs with semantic search over the full bookmarks vault (~1600 articles, 475+ in Climate Change).

## Prerequisites

- [bookmarks-mcp](https://gitea.nexus-home.cc/pres/bookmarks-mcp) running on Unraid (default: `http://192.168.178.35:7100`)
- Bearer token set in Unraid (`MCP_AUTH_TOKEN` in compose env)
- VPN/LAN access from the machine running Cursor

## Cursor MCP config (this repo)

Project config is already at [.cursor/mcp.json](../../.cursor/mcp.json). It reads the token from an environment variable so secrets stay out of git.

### One-time setup

1. On Unraid, open the **bookmarks-mcp** container → Environment → copy **`MCP_AUTH_TOKEN`** (not the Gitea read token).
2. In this repo root:
   ```bash
   cp .env.example .env
   # Edit .env and paste: BOOKMARKS_MCP_AUTH_TOKEN=<paste from Unraid>
   ```
3. Verify from WSL (must be on your LAN):
   ```bash
   ./scripts/verify-bookmarks-mcp.sh
   ```
4. **Fully quit and restart Cursor** so it picks up `.env` / MCP config.
5. **Settings → MCP** → confirm **bookmarks** is connected (green). Open **Output** → **MCP** if it fails.

### Optional: global config

Same block in `~/.cursor/mcp.json` if you want bookmarks-mcp in every project. Prefer the project `.cursor/mcp.json` here so Eco Balance docs and token scope stay together.

```json
{
  "mcpServers": {
    "bookmarks": {
      "url": "http://192.168.178.35:7100/sse",
      "headers": {
        "Authorization": "Bearer ${env:BOOKMARKS_MCP_AUTH_TOKEN}"
      }
    }
  }
}
```

Export the variable in your shell profile if Cursor does not load `.env` automatically:

```bash
export BOOKMARKS_MCP_AUTH_TOKEN='paste-from-unraid'
```

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
