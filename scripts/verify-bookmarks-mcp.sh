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

echo "Probing $URL/sse (SSE stays open — using a 3s cap)..."
# /sse is a long-lived stream; curl would hang without --max-time.
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: text/event-stream" \
  --connect-timeout 5 \
  --max-time 3 \
  "$URL/sse" 2>/dev/null || true)
CURL_EXIT=$?

if [ "$HTTP_CODE" = "401" ]; then
  echo "FAIL: 401 unauthorized — token does not match Unraid MCP_AUTH_TOKEN."
  exit 1
fi

if [ -z "$HTTP_CODE" ] || [ "$HTTP_CODE" = "000" ]; then
  echo "FAIL: could not reach $URL (not on LAN, server down, or timeout before headers)."
  echo "       curl exit code: $CURL_EXIT"
  exit 1
fi

if [ "$HTTP_CODE" = "200" ]; then
  echo "OK: HTTP 200 — auth accepted (stream opened; curl stopped after 3s as expected)."
  echo "Restart Cursor fully, then check Settings → MCP → bookmarks."
  exit 0
fi

echo "Unexpected HTTP $HTTP_CODE (curl exit $CURL_EXIT)."
echo "If the server is up, check URL and token; 200 is expected for valid auth."
exit 1
