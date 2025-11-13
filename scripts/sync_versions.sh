#!/bin/bash
# sync_versions.sh - Synchronize all strategic files to current global version
# Detects version mismatches and updates files automatically

# Don't exit on error - continue processing all files
set +e

VERSION_FILE="VERSION"
JOURNAL_DIR="_versions"
CURRENT_VERSION=$(cat "$VERSION_FILE" 2>/dev/null || echo "")

if [ -z "$CURRENT_VERSION" ]; then
    echo "❌ Error: VERSION file not found or empty"
    exit 1
fi

# Extract YYYY.MM format from version
if [[ $CURRENT_VERSION =~ ^([0-9]{4}\.[0-9]{2}) ]]; then
    GLOBAL_VERSION="${BASH_REMATCH[1]}"
else
    echo "❌ Error: Invalid version format in VERSION file: $CURRENT_VERSION"
    echo "Expected format: YYYY.MM or YYYY.MM.DD HH:MM"
    exit 1
fi

VERSION_DIR="$JOURNAL_DIR/v${GLOBAL_VERSION}"
JOURNAL_FILE="$VERSION_DIR/JOURNAL.md"
CURRENT_DATETIME=$(date +"%Y.%m.%d %H:%M")
CURRENT_DATE=$(date +"%Y-%m-%d")

# Create version directory and journal if they don't exist
mkdir -p "$VERSION_DIR"
if [ ! -f "$JOURNAL_FILE" ]; then
    cat > "$JOURNAL_FILE" <<EOF
# Version Journal: ${GLOBAL_VERSION}

**Created:** ${CURRENT_DATE}
**Global Version:** ${GLOBAL_VERSION}

## Change Log

EOF
fi

echo "🔄 Synchronizing files to global version: ${GLOBAL_VERSION}"
echo ""

# Find all strategic documentation files
# Focus on strategic/ folder (source of truth) first, then sync to docs/ if needed
STRATEGIC_FILES=$(find strategic -name "*.md" -type f 2>/dev/null | sort)
# Also include hub file in root
if [ -f "00_Eco_Balance_Hub.md" ]; then
    STRATEGIC_FILES="$STRATEGIC_FILES 00_Eco_Balance_Hub.md"
fi

UPDATED_COUNT=0
SYNCED_COUNT=0
ERROR_COUNT=0

for file in $STRATEGIC_FILES; do
    if [ ! -f "$file" ]; then
        continue
    fi
    
    # Extract current global version from file using sed
    # Try old SemVer format first (most common): "Document Version: X.X.X" (with or without markdown)
    # Handle cases with extra text like " - Adaptive Framework"
    OLD_VERSION=$(sed -n 's/.*\*\*Document Version\*\*: *\([0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*\).*/\1/p' "$file" 2>/dev/null | head -1)
    if [ -z "$OLD_VERSION" ]; then
        OLD_VERSION=$(sed -n 's/.*Document Version: *\([0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*\).*/\1/p' "$file" 2>/dev/null | head -1)
    fi
    if [ -n "$OLD_VERSION" ]; then
        echo "📝 $file: Found old SemVer format ($OLD_VERSION), will migrate to $GLOBAL_VERSION"
        FILE_GLOBAL="OLD_SEMVER"  # Mark for migration
    fi
    
    # If not SemVer, try CalVer format: "Document Version: YYYY.MM" (with or without markdown bold)
    if [ -z "$FILE_GLOBAL" ]; then
        FILE_GLOBAL=$(sed -n 's/.*\*\*Document Version\*\*: *\([0-9][0-9][0-9][0-9]\.[0-9][0-9]\).*/\1/p' "$file" 2>/dev/null | head -1)
        if [ -z "$FILE_GLOBAL" ]; then
            FILE_GLOBAL=$(sed -n 's/.*Document Version: *\([0-9][0-9][0-9][0-9]\.[0-9][0-9]\).*/\1/p' "$file" 2>/dev/null | head -1)
        fi
    fi
    
    # Try alternative format: "Version: YYYY.MM" (with or without markdown)
    if [ -z "$FILE_GLOBAL" ] && [ "$FILE_GLOBAL" != "OLD_SEMVER" ]; then
        FILE_GLOBAL=$(sed -n 's/.*\*\*Version\*\*: *\([0-9][0-9][0-9][0-9]\.[0-9][0-9]\).*/\1/p' "$file" 2>/dev/null | head -1)
        if [ -z "$FILE_GLOBAL" ]; then
            FILE_GLOBAL=$(sed -n 's/.*Version: *\([0-9][0-9][0-9][0-9]\.[0-9][0-9]\).*/\1/p' "$file" 2>/dev/null | head -1)
        fi
    fi
    
    if [ -z "$FILE_GLOBAL" ]; then
        echo "⚠️  $file: No version found, skipping"
        ((ERROR_COUNT++))
        continue
    fi
    
    # Handle migration from SemVer or update from old CalVer
    if [ "$FILE_GLOBAL" = "OLD_SEMVER" ] || [ "$FILE_GLOBAL" != "$GLOBAL_VERSION" ]; then
        if [ "$FILE_GLOBAL" = "OLD_SEMVER" ]; then
            echo "📝 Migrating $file from SemVer to CalVer: -> $GLOBAL_VERSION"
        else
            echo "📝 Updating $file"
            echo "   Global version: $FILE_GLOBAL -> $GLOBAL_VERSION"
        fi
        
        # Backup original file
        cp "$file" "${file}.bak"
        
        # Update global version in file
        # Pattern 1: "**Document Version**: X.X.X" or "**Document Version**: YYYY.MM" (with markdown bold)
        # Handle cases with extra text like " - Adaptive Framework" by matching everything after version
        sed -i -E "s/\*\*Document Version\*\*:\s*([0-9]+\.[0-9]+\.[0-9]+|[0-9]{4}\.[0-9]{2})([^0-9]*)/\*\*Document Version\*\*: ${GLOBAL_VERSION}/g" "$file"
        
        # Pattern 2: "Document Version: X.X.X" or "Document Version: YYYY.MM" (without markdown)
        sed -i -E "s/Document Version:\s*([0-9]+\.[0-9]+\.[0-9]+|[0-9]{4}\.[0-9]{2})([^0-9]*)/Document Version: ${GLOBAL_VERSION}/g" "$file"
        
        # Pattern 3: "**Version**: X.X.X" or "**Version**: YYYY.MM" (with markdown bold, for hub file)
        sed -i -E "s/\*\*Version\*\*:\s*([0-9]+\.[0-9]+\.[0-9]+|[0-9]{4}\.[0-9]{2})([^0-9]*)/\*\*Version\*\*: ${GLOBAL_VERSION}/g" "$file"
        
        # Pattern 4: "Version: X.X.X" or "Version: YYYY.MM" (without markdown, for hub file)
        sed -i -E "s/Version:\s*([0-9]+\.[0-9]+\.[0-9]+|[0-9]{4}\.[0-9]{2})([^0-9]*)/Version: ${GLOBAL_VERSION}/g" "$file"
        
        # Update or add local subversion
        # Check if local subversion already exists in format (YYYY.MM.DD HH:MM)
        if grep -qE "\([0-9]{4}\.[0-9]{2}\.[0-9]{2} [0-9]{2}:[0-9]{2}\)" "$file"; then
            # Update existing local subversion
            sed -i -E "s/\([0-9]{4}\.[0-9]{2}\.[0-9]{2} [0-9]{2}:[0-9]{2}\)/\(${CURRENT_DATETIME}\)/g" "$file"
        else
            # Add local subversion if not present
            # Find the version line and add subversion (handle both markdown and plain formats)
            sed -i "s/\*\*Document Version\*\*: ${GLOBAL_VERSION}/\*\*Document Version\*\*: ${GLOBAL_VERSION} (${CURRENT_DATETIME})/g" "$file"
            sed -i "s/Document Version: ${GLOBAL_VERSION}/Document Version: ${GLOBAL_VERSION} (${CURRENT_DATETIME})/g" "$file"
            sed -i "s/\*\*Version\*\*: ${GLOBAL_VERSION}/\*\*Version\*\*: ${GLOBAL_VERSION} (${CURRENT_DATETIME})/g" "$file"
            sed -i "s/Version: ${GLOBAL_VERSION}/Version: ${GLOBAL_VERSION} (${CURRENT_DATETIME})/g" "$file"
        fi
        
        # Log to journal
        echo "" >> "$JOURNAL_FILE"
        echo "### ${CURRENT_DATETIME} - $(basename "$file")" >> "$JOURNAL_FILE"
        echo "- **Updated:** Global version ${FILE_GLOBAL} -> ${GLOBAL_VERSION}" >> "$JOURNAL_FILE"
        echo "- **Local subversion:** ${CURRENT_DATETIME}" >> "$JOURNAL_FILE"
        echo "- **Type:** Synchronization" >> "$JOURNAL_FILE"
        
        # Remove backup if update successful
        rm "${file}.bak"
        
        ((UPDATED_COUNT++))
    else
        # File is already synchronized, but update local subversion if needed
        if ! grep -q "(${CURRENT_DATETIME:0:10}" "$file"; then
            # Update local subversion to current time
            sed -i "s/([0-9]\{4\}\.[0-9]\{2\}\.[0-9]\{2\} [0-9]\{2\}:[0-9]\{2\})/(${CURRENT_DATETIME})/g" "$file"
        fi
        ((SYNCED_COUNT++))
    fi
done

echo ""
echo "✅ Synchronization complete"
echo "   Updated: $UPDATED_COUNT files"
echo "   Already synced: $SYNCED_COUNT files"
if [ $ERROR_COUNT -gt 0 ]; then
    echo "   Errors: $ERROR_COUNT files"
fi
echo ""
echo "📋 Journal updated: $JOURNAL_FILE"

