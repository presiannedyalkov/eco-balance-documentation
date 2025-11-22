#!/bin/bash
# update-last-updated.sh - Automatically update "Last Updated" dates from Git commit history
# Usage: ./scripts/update-last-updated.sh [file1.md] [file2.md] ...
# If no files specified, updates all .md files in docs/

# Don't use set -e here - we want to continue processing even if some files fail

# Color output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to get last commit date for a file
get_last_commit_date() {
    local file="$1"
    
    # Try to get the last commit date (author date)
    local date=$(git log -1 --format="%ai" -- "$file" 2>/dev/null | cut -d' ' -f1)
    
    if [ -z "$date" ]; then
        # Fallback to file modification time if no Git history
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            date=$(stat -f "%Sm" -t "%Y-%m-%d" "$file" 2>/dev/null || echo "")
        else
            # Linux
            date=$(stat -c "%y" "$file" 2>/dev/null | cut -d' ' -f1 || echo "")
        fi
    fi
    
    echo "$date"
}

# Function to update last updated date in a file
update_file() {
    local file="$1"
    local last_date=$(get_last_commit_date "$file")
    
    if [ -z "$last_date" ]; then
        echo -e "${YELLOW}⚠️  Could not determine date for: $file${NC}"
        return 1
    fi
    
    # Check if file exists
    if [ ! -f "$file" ]; then
        echo -e "${RED}❌ File not found: $file${NC}"
        return 1
    fi
    
    # Create backup
    cp "$file" "${file}.bak"
    
    # Pattern 1: "**Last Updated:** YYYY-MM-DD" or "**Last Updated**: YYYY-MM-DD"
    # Pattern 2: "Last Updated: YYYY-MM-DD" (without bold)
    # Pattern 3: "**Last Updated:** November 2025" (month format)
    # Pattern 4: "Last Updated: YYYY.MM.DD" (dot format)
    
    # Try to update in frontmatter first (YAML format)
    if grep -q "^lastUpdated:" "$file" 2>/dev/null; then
        # Docusaurus frontmatter format
        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i '' "s/^lastUpdated:.*/lastUpdated: $last_date/" "$file"
        else
            sed -i "s/^lastUpdated:.*/lastUpdated: $last_date/" "$file"
        fi
        echo -e "${GREEN}✅ Updated frontmatter lastUpdated in: $file${NC} (date: $last_date)"
        rm "${file}.bak"
        return 0
    fi
    
    # Update in markdown content (footer/metadata section)
    local updated=false
    
    # Pattern 1: **Last Updated:** or **Last Updated**:
    if grep -q "\*\*Last Updated\*\*:" "$file" || grep -q "\*\*Last Updated\*\*:" "$file"; then
        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i '' -E "s/\*\*Last Updated\*\*:[[:space:]]*[0-9]{4}-[0-9]{2}-[0-9]{2}/\*\*Last Updated\*\*: $last_date/g" "$file"
            sed -i '' -E "s/\*\*Last Updated\*\*:[[:space:]]*[A-Za-z]+ [0-9]{4}/\*\*Last Updated\*\*: $last_date/g" "$file"
            sed -i '' -E "s/\*\*Last Updated\*\*:[[:space:]]*[0-9]{4}\.[0-9]{2}\.[0-9]{2}/\*\*Last Updated\*\*: $last_date/g" "$file"
        else
            sed -i -E "s/\*\*Last Updated\*\*:[[:space:]]*[0-9]{4}-[0-9]{2}-[0-9]{2}/\*\*Last Updated\*\*: $last_date/g" "$file"
            sed -i -E "s/\*\*Last Updated\*\*:[[:space:]]*[A-Za-z]+ [0-9]{4}/\*\*Last Updated\*\*: $last_date/g" "$file"
            sed -i -E "s/\*\*Last Updated\*\*:[[:space:]]*[0-9]{4}\.[0-9]{2}\.[0-9]{2}/\*\*Last Updated\*\*: $last_date/g" "$file"
        fi
        updated=true
    fi
    
    # Pattern 2: Last Updated: (without bold)
    if grep -q "^Last Updated:" "$file" || grep -q "Last Updated:" "$file"; then
        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i '' -E "s/^Last Updated:[[:space:]]*[0-9]{4}-[0-9]{2}-[0-9]{2}/Last Updated: $last_date/g" "$file"
            sed -i '' -E "s/Last Updated:[[:space:]]*[A-Za-z]+ [0-9]{4}/Last Updated: $last_date/g" "$file"
        else
            sed -i -E "s/^Last Updated:[[:space:]]*[0-9]{4}-[0-9]{2}-[0-9]{2}/Last Updated: $last_date/g" "$file"
            sed -i -E "s/Last Updated:[[:space:]]*[A-Za-z]+ [0-9]{4}/Last Updated: $last_date/g" "$file"
        fi
        updated=true
    fi
    
    if [ "$updated" = true ]; then
        echo -e "${GREEN}✅ Updated Last Updated in: $file${NC} (date: $last_date)"
        rm "${file}.bak"
        return 0
    else
        # No Last Updated field found, restore backup
        mv "${file}.bak" "$file"
        echo -e "${YELLOW}⚠️  No 'Last Updated' field found in: $file (skipping)${NC}"
        return 0  # Return 0 to continue processing other files
    fi
}

# Main execution
echo "🔄 Updating Last Updated dates from Git commit history..."
echo ""

# If files are provided as arguments, update only those
if [ $# -gt 0 ]; then
    FILES="$@"
else
    # Find all markdown files in docs/ directory
    FILES=$(find docs/ -name "*.md" -type f 2>/dev/null || echo "")
fi

if [ -z "$FILES" ]; then
    echo -e "${RED}❌ No files found to update${NC}"
    exit 1
fi

UPDATED=0
SKIPPED=0

for file in $FILES; do
    if update_file "$file"; then
        ((UPDATED++))
    else
        ((SKIPPED++))
    fi
done

echo ""
echo -e "${GREEN}✅ Updated: $UPDATED files${NC}"
if [ $SKIPPED -gt 0 ]; then
    echo -e "${YELLOW}⚠️  Skipped: $SKIPPED files (no 'Last Updated' field found)${NC}"
fi

# Exit with success even if some files were skipped
# This allows the workflow to continue
exit 0

