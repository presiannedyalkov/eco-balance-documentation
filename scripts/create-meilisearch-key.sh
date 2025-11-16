#!/bin/bash
# Create a search-only key for Meilisearch
# Usage: ./scripts/create-meilisearch-key.sh [MEILISEARCH_HOST] [MASTER_KEY]

set -e

MEILISEARCH_HOST="${1:-http://localhost:7700}"
MASTER_KEY="${2:-$MEILISEARCH_MASTER_KEY}"

if [ -z "$MASTER_KEY" ]; then
    echo "❌ Error: Master key required"
    echo "Usage: $0 [MEILISEARCH_HOST] [MASTER_KEY]"
    echo "   Or set MEILISEARCH_MASTER_KEY environment variable"
    exit 1
fi

echo "🔑 Creating search-only key for Meilisearch..."
echo "Host: $MEILISEARCH_HOST"
echo ""

# Create search-only key
RESPONSE=$(curl -s -X POST "${MEILISEARCH_HOST}/keys" \
  -H "Authorization: Bearer ${MASTER_KEY}" \
  -H "Content-Type: application/json" \
  --data-binary '{
    "description": "Search-only key for Eco Balance documentation",
    "actions": ["search"],
    "indexes": ["eco-balance-docs"],
    "expiresAt": null
  }')

# Extract key from response
SEARCH_KEY=$(echo "$RESPONSE" | grep -o '"key":"[^"]*' | cut -d'"' -f4)

if [ -z "$SEARCH_KEY" ]; then
    echo "❌ Error: Failed to create key"
    echo "Response: $RESPONSE"
    exit 1
fi

echo "✅ Search-only key created successfully!"
echo ""
echo "🔐 Search Key: $SEARCH_KEY"
echo ""
echo "📝 Add this to your configuration:"
echo "   MEILISEARCH_SEARCH_KEY=$SEARCH_KEY"
echo ""
echo "⚠️  Keep this key secure! It can be used in frontend code safely."
echo "   (It only has 'search' permission, cannot modify data)"

