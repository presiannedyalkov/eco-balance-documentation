#!/bin/bash

# Test script to validate file collection logic for export

set -e

# Configuration (same as export-docs.sh)
INCLUDE_DIRS=(
  "strategic"
  "docs"
)

EXCLUDE_PATTERNS=(
  "_vault_maintenance"
  "_process"
  "_templates"
  "_versions"
  "archive"
  "implementation_tasks"
  "ai_skills"
  "node_modules"
  ".git"
  "exports"
  "*.backup"
)

INCLUDE_FILES=(
  "README.md"
  "CONTRIBUTING.md"
)

# Function to check if file should be excluded
should_exclude() {
    local file="$1"
    for pattern in "${EXCLUDE_PATTERNS[@]}"; do
        if [[ "$file" == *"$pattern"* ]]; then
            return 0
        fi
    done
    return 1
}

echo "Testing file collection logic..."
echo ""

# Collect all markdown files
FILES=()

# Add main files
echo "Checking main files..."
for file in "${INCLUDE_FILES[@]}"; do
    if [ -f "$file" ]; then
        FILES+=("$file")
        echo "  ✓ $file"
    else
        echo "  ✗ $file (not found)"
    fi
done
echo ""

# Add files from include directories
for dir in "${INCLUDE_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo "Scanning $dir/..."
        while IFS= read -r -d '' file; do
            if ! should_exclude "$file"; then
                FILES+=("$file")
            fi
        done < <(find "$dir" -name "*.md" -type f -print0 2>/dev/null | sort -z)
    else
        echo "  ✗ $dir/ (not found)"
    fi
done
echo ""

# Filter out backup files and detailed guides
FILTERED_FILES=()
for file in "${FILES[@]}"; do
    # Skip backup files
    if [[ "$file" == *.backup ]]; then
        continue
    fi
    # Skip detailed guide files
    if [[ "$file" == *"a_"* ]] || [[ "$file" == *"b_"* ]] || [[ "$file" == *"c_"* ]] || \
       [[ "$file" == *"d_"* ]] || [[ "$file" == *"e_"* ]] || [[ "$file" == *"f_"* ]] || \
       [[ "$file" == *"g_"* ]]; then
        continue
    fi
    FILTERED_FILES+=("$file")
done

FILE_COUNT=${#FILTERED_FILES[@]}
echo "=========================================="
echo "Summary:"
echo "  Total files found: $FILE_COUNT"
echo ""
echo "Files to be included:"
for file in "${FILTERED_FILES[@]}"; do
    echo "  - $file"
done | head -20

if [ $FILE_COUNT -gt 20 ]; then
    echo "  ... and $((FILE_COUNT - 20)) more files"
fi

echo ""
echo "File count breakdown:"
echo "  Strategic files: $(find strategic -name "*.md" -type f ! -name "*a_*" ! -name "*b_*" ! -name "*c_*" ! -name "*d_*" ! -name "*e_*" ! -name "*f_*" ! -name "*g_*" ! -name "*.backup" 2>/dev/null | wc -l)"
echo "  Docs files: $(find docs -name "*.md" -type f 2>/dev/null | wc -l)"
echo "  Main files: $(echo "${INCLUDE_FILES[@]}" | wc -w)"

