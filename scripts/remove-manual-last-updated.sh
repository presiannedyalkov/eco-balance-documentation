#!/bin/bash
# remove-manual-last-updated.sh - Remove manually maintained "Last Updated" fields
# Since we now have automatic updates from Git, these manual fields are redundant

# Color output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🗑️  Removing manually maintained 'Last Updated' fields..."
echo ""

# Find all markdown files
FILES=$(find docs/ strategic/ -name "*.md" -type f 2>/dev/null)

REMOVED=0

for file in $FILES; do
    if [ ! -f "$file" ]; then
        continue
    fi
    
    # Create backup
    cp "$file" "${file}.bak"
    
    # Remove patterns:
    # 1. **Last Updated:** YYYY-MM-DD (with or without space after colon)
    # 2. **Last Updated:** November 2025 (month format)
    # 3. **Last Updated:** 2025.11.13 (dot format)
    # 4. Last Updated: YYYY-MM-DD (without bold, at start of line or anywhere)
    
    # Remove **Last Updated:** lines (with various date formats)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS sed
        sed -i '' -E '/\*\*Last Updated\*\*:[[:space:]]*[0-9]{4}-[0-9]{2}-[0-9]{2}/d' "$file"
        sed -i '' -E '/\*\*Last Updated\*\*:[[:space:]]*[A-Za-z]+ [0-9]{4}/d' "$file"
        sed -i '' -E '/\*\*Last Updated\*\*:[[:space:]]*[0-9]{4}\.[0-9]{2}\.[0-9]{2}/d' "$file"
        sed -i '' -E '/\*\*Last Updated\*\*:[[:space:]]*[0-9]{4}\.[0-9]{2}/d' "$file"
        # Remove standalone Last Updated: lines (at start of line)
        sed -i '' -E '/^Last Updated:[[:space:]]*[0-9]{4}-[0-9]{2}-[0-9]{2}/d' "$file"
        sed -i '' -E '/^Last Updated:[[:space:]]*[A-Za-z]+ [0-9]{4}/d' "$file"
    else
        # Linux sed
        sed -i -E '/\*\*Last Updated\*\*:[[:space:]]*[0-9]{4}-[0-9]{2}-[0-9]{2}/d' "$file"
        sed -i -E '/\*\*Last Updated\*\*:[[:space:]]*[A-Za-z]+ [0-9]{4}/d' "$file"
        sed -i -E '/\*\*Last Updated\*\*:[[:space:]]*[0-9]{4}\.[0-9]{2}\.[0-9]{2}/d' "$file"
        sed -i -E '/\*\*Last Updated\*\*:[[:space:]]*[0-9]{4}\.[0-9]{2}/d' "$file"
        # Remove standalone Last Updated: lines (at start of line)
        sed -i -E '/^Last Updated:[[:space:]]*[0-9]{4}-[0-9]{2}-[0-9]{2}/d' "$file"
        sed -i -E '/^Last Updated:[[:space:]]*[A-Za-z]+ [0-9]{4}/d' "$file"
    fi
    
    # Check if file was modified
    if ! cmp -s "$file" "${file}.bak"; then
        echo -e "${GREEN}✅ Removed from: $file${NC}"
        rm "${file}.bak"
        ((REMOVED++))
    else
        # No changes, restore backup
        rm "${file}.bak"
    fi
done

echo ""
echo -e "${GREEN}✅ Removed 'Last Updated' fields from $REMOVED files${NC}"
echo ""
echo "Note: Docusaurus will automatically show last updated dates using Git commit history."
echo "No manual maintenance needed!"

