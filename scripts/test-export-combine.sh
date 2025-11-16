#!/bin/bash

# Test script to validate markdown combination logic (without Pandoc)

set -e

# Same configuration as export-docs.sh
INCLUDE_DIRS=("strategic" "docs")
INCLUDE_FILES=("README.md" "CONTRIBUTING.md")
EXCLUDE_PATTERNS=("_vault_maintenance" "_process" "_templates" "_versions" "archive" "implementation_tasks" "ai_skills" "node_modules" ".git" "exports" "*.backup")

VERSION=$(cat VERSION 2>/dev/null || echo "unknown")
EXPORT_DATE=$(date +"%Y-%m-%d")
TITLE="Eco Balance Documentation"
AUTHOR="Eco Balance Project"

TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

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

# Collect files (simplified version)
FILES=()
for file in "${INCLUDE_FILES[@]}"; do
    [ -f "$file" ] && FILES+=("$file")
done

for dir in "${INCLUDE_DIRS[@]}"; do
    [ -d "$dir" ] && while IFS= read -r -d '' file; do
        ! should_exclude "$file" && FILES+=("$file")
    done < <(find "$dir" -name "*.md" -type f -print0 2>/dev/null | sort -z)
done

# Filter files
FILTERED_FILES=()
for file in "${FILES[@]}"; do
    [[ "$file" != *.backup ]] && \
    [[ "$file" != *"a_"* ]] && [[ "$file" != *"b_"* ]] && \
    [[ "$file" != *"c_"* ]] && [[ "$file" != *"d_"* ]] && \
    [[ "$file" != *"e_"* ]] && [[ "$file" != *"f_"* ]] && \
    [[ "$file" != *"g_"* ]] && FILTERED_FILES+=("$file")
done

# Create combined markdown (test version - only first 3 files)
COMBINED_FILE="$TEMP_DIR/combined-test.md"

echo "Creating test combined markdown file..."
echo ""

# Add title page
cat > "$COMBINED_FILE" <<EOF
---
title: "$TITLE"
author: "$AUTHOR"
date: "$EXPORT_DATE"
version: "$VERSION"
---

# $TITLE

**Version:** $VERSION  
**Export Date:** $EXPORT_DATE  
**Author:** $AUTHOR

---

# Table of Contents

EOF

# Add first 5 files as test
TEST_FILES=("${FILTERED_FILES[@]:0:5}")
for file in "${TEST_FILES[@]}"; do
    TITLE_LINE=$(head -n 20 "$file" | grep -E "^# " | head -n 1 | sed 's/^# //' || basename "$file" .md)
    echo "- [$TITLE_LINE](#$(echo "$TITLE_LINE" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd '[:alnum:]-'))" >> "$COMBINED_FILE"
done

echo "" >> "$COMBINED_FILE"
echo "---" >> "$COMBINED_FILE"
echo "" >> "$COMBINED_FILE"

# Append first 3 files as test
for file in "${TEST_FILES[@]:0:3}"; do
    TITLE_LINE=$(head -n 20 "$file" | grep -E "^# " | head -n 1 | sed 's/^# //' || basename "$file" .md)
    
    echo "" >> "$COMBINED_FILE"
    echo "# $TITLE_LINE" >> "$COMBINED_FILE"
    echo "" >> "$COMBINED_FILE"
    echo "*Source: \`$file\`*" >> "$COMBINED_FILE"
    echo "" >> "$COMBINED_FILE"
    
    # Remove frontmatter if present
    if grep -q "^---" "$file"; then
        sed -n '/^---$/,/^---$/!p' "$file" | sed '1d' | head -50 >> "$COMBINED_FILE"
    else
        head -50 "$file" >> "$COMBINED_FILE"
    fi
    
    echo "" >> "$COMBINED_FILE"
    echo "---" >> "$COMBINED_FILE"
    echo "" >> "$COMBINED_FILE"
done

echo "Test combined file created: $COMBINED_FILE"
echo "File size: $(wc -l < "$COMBINED_FILE") lines"
echo ""
echo "First 30 lines:"
head -30 "$COMBINED_FILE"
echo ""
echo "..."
echo ""
echo "Last 10 lines:"
tail -10 "$COMBINED_FILE"

