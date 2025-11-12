#!/bin/bash
# sync_versions.sh - Synchronize all strategic files to current global version
# Detects version mismatches and updates files automatically

set -e

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
STRATEGIC_FILES=$(find docs -name "*.md" -type f | grep -E "(vision-strategy|organization|operations|business|growth|performance|engagement|learning|resources)" | sort)

UPDATED_COUNT=0
SYNCED_COUNT=0
ERROR_COUNT=0

for file in $STRATEGIC_FILES; do
    if [ ! -f "$file" ]; then
        continue
    fi
    
    # Extract current global version from file (look for "Document Version: YYYY.MM")
    FILE_GLOBAL=$(grep -oP 'Document Version:\s*\K[0-9]{4}\.[0-9]{2}' "$file" 2>/dev/null | head -1 || echo "")
    
    if [ -z "$FILE_GLOBAL" ]; then
        # Try alternative format: "Version: YYYY.MM"
        FILE_GLOBAL=$(grep -oP 'Version:\s*\K[0-9]{4}\.[0-9]{2}' "$file" 2>/dev/null | head -1 || echo "")
    fi
    
    if [ -z "$FILE_GLOBAL" ]; then
        echo "⚠️  $file: No version found, skipping"
        ((ERROR_COUNT++))
        continue
    fi
    
    if [ "$FILE_GLOBAL" != "$GLOBAL_VERSION" ]; then
        echo "📝 Updating $file"
        echo "   Global version: $FILE_GLOBAL -> $GLOBAL_VERSION"
        
        # Backup original file
        cp "$file" "${file}.bak"
        
        # Update global version in file
        # Pattern 1: "Document Version: YYYY.MM"
        sed -i "s/Document Version:\s*[0-9]\{4\}\.[0-9]\{2\}/Document Version: ${GLOBAL_VERSION}/g" "$file"
        
        # Pattern 2: "Version: YYYY.MM"
        sed -i "s/Version:\s*[0-9]\{4\}\.[0-9]\{2\}/Version: ${GLOBAL_VERSION}/g" "$file"
        
        # Update local subversion to current date/time
        # Pattern: (YYYY.MM.DD HH:MM) or (YYYY.MM.DD HH:MM)
        if grep -q "(${FILE_GLOBAL}" "$file"; then
            sed -i "s/(${FILE_GLOBAL}[^)]*)/(${CURRENT_DATETIME})/g" "$file"
        else
            # Add local subversion if not present
            # Find the version line and add subversion
            sed -i "s/Document Version: ${GLOBAL_VERSION}/Document Version: ${GLOBAL_VERSION} (${CURRENT_DATETIME})/g" "$file"
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

