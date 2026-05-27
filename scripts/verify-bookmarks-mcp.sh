#!/usr/bin/env bash
# Quick check that bookmarks-mcp is reachable with your token.
# Usage: cp .env.example .env, set BOOKMARKS_MCP_AUTH_TOKEN, then ./scripts/verify-bookmarks-mcp.sh

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [ -f .env ]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

URL="${BOOKMARKS_MCP_URL:-http://192.168.178.35:7100}"
TOKEN="${BOOKMARKS_MCP_AUTH_TOKEN:-}"

if [ -z "$TOKEN" ]; then
  echo "Set BOOKMARKS_MCP_AUTH_TOKEN in $ROOT/.env (copy from .env.example)."
  exit 1
fi

echo "GET $URL/sse (expect 200 or SSE handshake, not 401)..."
CODE=$(curl -s -o /dev/null -w "%{http_code}" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: text/event-stream" \
  --connect-timeout 5 \
  "$URL/sse" || echo "000")

if [ "$CODE" = "401" ]; then
  echo "FAIL: 401 unauthorized — token does not match Unraid MCP_AUTH_TOKEN."
  exit 1
fi

if [ "$CODE" = "000" ]; then
  echo "FAIL: could not reach $URL (not on LAN or server down)."
  exit 1
fi

echo "OK: HTTP $CODE — bookmarks-mcp auth looks good."
echo "Restart Cursor (full quit), then check Settings → MCP → bookmarks."
