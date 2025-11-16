#!/bin/bash
# Create a search-only key for Meilisearch
# This script uses your master key to create a search-only key

set -e

# Configuration
MEILISEARCH_HOST="${MEILISEARCH_HOST:-http://192.168.178.35:7777}"
MASTER_KEY="${1:-kYsKXHMJFnCqAumextwGjS}"

if [ -z "$MASTER_KEY" ]; then
    echo "❌ Error: Master key required"
    echo "Usage: $0 [MASTER_KEY]"
    echo "   Or set MASTER_KEY environment variable"
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

# Check if request was successful
if echo "$RESPONSE" | grep -q '"key"'; then
    # Extract key from response (try multiple methods)
    SEARCH_KEY=$(echo "$RESPONSE" | jq -r '.key' 2>/dev/null || \
                 echo "$RESPONSE" | grep -o '"key":"[^"]*' | cut -d'"' -f4 || \
                 echo "$RESPONSE" | sed -n 's/.*"key":"\([^"]*\)".*/\1/p')
    
    if [ -n "$SEARCH_KEY" ] && [ "$SEARCH_KEY" != "null" ]; then
        echo "✅ Search-only key created successfully!"
        echo ""
        echo "🔐 Search Key: $SEARCH_KEY"
        echo ""
        echo "📝 Next steps:"
        echo "1. Add to GitHub Secrets (for production):"
        echo "   MEILISEARCH_SEARCH_KEY=$SEARCH_KEY"
        echo ""
        echo "2. Or add to .env file (for local development):"
        echo "   MEILISEARCH_SEARCH_KEY=$SEARCH_KEY"
        echo ""
        echo "3. Or set directly in docusaurus.config.js (for testing):"
        echo "   searchKey: '$SEARCH_KEY',"
        echo ""
        echo "⚠️  Keep this key secure! It can be used in frontend code safely."
        echo "   (It only has 'search' permission, cannot modify data)"
        echo ""
        echo "💾 Save this key - you'll need it for configuration!"
    else
        echo "⚠️  Key created but couldn't extract from response"
        echo "Response: $RESPONSE"
        echo ""
        echo "Please extract the 'key' value from the response above"
    fi
else
    echo "❌ Error: Failed to create key"
    echo "Response: $RESPONSE"
    echo ""
    echo "Common issues:"
    echo "- Meilisearch host not accessible: $MEILISEARCH_HOST"
    echo "- Master key incorrect"
    echo "- Meilisearch not running"
    exit 1
fi
