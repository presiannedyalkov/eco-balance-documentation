#!/bin/bash
# update_metadata_safe.sh - Safely update metadata in files without deleting content
# This script preserves all file content and only updates the metadata footer

set +e

CURRENT_DATETIME=$(date +"%Y.%m.%d %H:%M")
CURRENT_DATE=$(date +"%Y-%m-%d")
GLOBAL_VERSION="2025.11"

echo "🔄 Safely updating metadata in files..."
echo ""

# Function to safely update metadata in a file
update_metadata_safe() {
    local file="$1"
    local part_of="$2"
    local category="$3"
    local doc_type="$4"
    local status="$5"
    
    if [ ! -f "$file" ]; then
        echo "⚠️  File not found: $file"
        return
    fi
    
    # Create backup
    cp "$file" "${file}.bak"
    OLD_LINES=$(wc -l < "${file}.bak")
    
    # Find the line where metadata starts by looking for "Document Version" field
    # This is the most reliable indicator of where metadata begins
    METADATA_START_LINE=$(grep -n "^\*\*Document Version\*\*:\|^Document Version:" "$file" | head -1 | cut -d: -f1)
    
    if [ -z "$METADATA_START_LINE" ]; then
        # No existing metadata found, just append to end
        # Remove trailing empty lines first
        sed -i -e :a -e '/^\n*$/{$d;N;ba' -e '}' "$file"
        echo "" >> "$file"
        echo "---" >> "$file"
        echo "" >> "$file"
        echo "**Document Version**: ${GLOBAL_VERSION} (${CURRENT_DATETIME})" >> "$file"
        echo "**Part of**: ${part_of}" >> "$file"
        echo "**Category**: ${category}" >> "$file"
        echo "**Type**: ${doc_type}" >> "$file"
        echo "**Status**: ${status}" >> "$file"
        echo "**Last Updated**: ${CURRENT_DATE}" >> "$file"
        echo "✅ Added metadata to $file (no existing metadata found)"
        rm "${file}.bak"
        return
    fi
    
    # Now look backwards from the metadata start line to find the "---" separator
    # We'll look up to 5 lines back (metadata is usually close to the separator)
    SEPARATOR_LINE=""
    for ((i=$METADATA_START_LINE; i>=1 && i>=$((METADATA_START_LINE - 5)); i--)); do
        line=$(sed -n "${i}p" "$file")
        if [[ "$line" == "---" ]]; then
            SEPARATOR_LINE=$i
            break
        fi
    done
    
    # Determine where to cut: if we found a separator, cut before it
    # Otherwise, cut before the metadata start line
    if [ -n "$SEPARATOR_LINE" ] && [ "$SEPARATOR_LINE" -lt "$METADATA_START_LINE" ]; then
        CUT_LINE=$((SEPARATOR_LINE - 1))
    else
        CUT_LINE=$((METADATA_START_LINE - 1))
    fi
    
    # Safety check: make sure we're not cutting too much
    # We should keep at least 80% of the original content
    MIN_LINES=$((OLD_LINES * 80 / 100))
    if [ "$CUT_LINE" -lt "$MIN_LINES" ]; then
        echo "❌ ERROR: Would cut too much content from $file (would keep $CUT_LINE lines, need at least $MIN_LINES)"
        echo "   Restoring from backup..."
        mv "${file}.bak" "$file"
        return 1
    fi
    
    # Keep everything up to the cut line
    head -n "$CUT_LINE" "$file" > "${file}.tmp"
    
    # Remove trailing empty lines from the content
    while [ -s "${file}.tmp" ]; do
        last_line=$(tail -n 1 "${file}.tmp")
        if [[ -z "$last_line" ]] || [[ "$last_line" =~ ^[[:space:]]*$ ]]; then
            head -n -1 "${file}.tmp" > "${file}.tmp2" && mv "${file}.tmp2" "${file}.tmp"
        else
            break
        fi
    done
    
    # Add new metadata
    echo "" >> "${file}.tmp"
    echo "---" >> "${file}.tmp"
    echo "" >> "${file}.tmp"
    echo "**Document Version**: ${GLOBAL_VERSION} (${CURRENT_DATETIME})" >> "${file}.tmp"
    echo "**Part of**: ${part_of}" >> "${file}.tmp"
    echo "**Category**: ${category}" >> "${file}.tmp"
    echo "**Type**: ${doc_type}" >> "${file}.tmp"
    echo "**Status**: ${status}" >> "${file}.tmp"
    echo "**Last Updated**: ${CURRENT_DATE}" >> "${file}.tmp"
    
    # Replace original file
    mv "${file}.tmp" "$file"
    
    # Verify file is not empty
    if [ ! -s "$file" ]; then
        echo "❌ ERROR: $file became empty! Restoring from backup..."
        mv "${file}.bak" "$file"
        return 1
    fi
    
    # Verify we didn't lose too much content (at least 80% should remain)
    NEW_LINES=$(wc -l < "$file")
    if [ "$NEW_LINES" -lt "$MIN_LINES" ]; then
        echo "❌ ERROR: $file lost too much content! (was $OLD_LINES lines, now $NEW_LINES lines, need at least $MIN_LINES)"
        echo "   Restoring from backup..."
        mv "${file}.bak" "$file"
        return 1
    fi
    
    # Verify the content before metadata is preserved
    # Compare first 10 lines to ensure content wasn't accidentally deleted
    head -n 10 "${file}.bak" > "${file}.bak.head"
    head -n 10 "$file" > "${file}.file.head"
    if ! diff -q "${file}.bak.head" "${file}.file.head" > /dev/null 2>&1; then
        echo "❌ ERROR: Beginning of $file changed! Restoring from backup..."
        rm "${file}.bak.head" "${file}.file.head"
        mv "${file}.bak" "$file"
        return 1
    fi
    rm "${file}.bak.head" "${file}.file.head"
    
    rm "${file}.bak"
    echo "✅ Updated metadata in $file (preserved $NEW_LINES/$OLD_LINES lines of content)"
}

# Update Vision files
update_metadata_safe "strategic/01_Executive_Summary.md" "Strategic Documentation" "Vision" "Vision Document" "Active"
update_metadata_safe "strategic/02_Project_Vision.md" "Strategic Documentation" "Vision" "Vision Document" "Active"
update_metadata_safe "strategic/03_Success_Factors.md" "Strategic Documentation" "Vision" "Vision Document" "Active"

# Update Reality files
update_metadata_safe "strategic/04_Current_Status_Assessment.md" "Strategic Documentation" "Reality" "Status Document" "Active"

# Update Plan files
update_metadata_safe "strategic/10_Organizational_Structure.md" "Strategic Documentation" "Plan" "Organizational Document" "Active"
update_metadata_safe "strategic/11_Governance.md" "Strategic Documentation" "Plan" "Organizational Document" "Active"
update_metadata_safe "strategic/12_Team_Roles.md" "Strategic Documentation" "Plan" "Organizational Document" "Active"
update_metadata_safe "strategic/13_Legal_Framework.md" "Strategic Documentation" "Plan" "Organizational Document" "Active"
update_metadata_safe "strategic/20_Restoration_Methodology.md" "Strategic Documentation" "Plan" "Methodology Document" "Active"
update_metadata_safe "strategic/21_Technology_Integration.md" "Strategic Documentation" "Plan" "Methodology Document" "Active"
update_metadata_safe "strategic/22_Restoration_Challenges_Solutions.md" "Strategic Documentation" "Plan" "Methodology Document" "Active"
update_metadata_safe "strategic/30_Business_Model.md" "Strategic Documentation" "Plan" "Strategic Planning Document" "Active"
update_metadata_safe "strategic/31_Financial_Projections.md" "Strategic Documentation" "Plan" "Strategic Planning Document" "Active"
update_metadata_safe "strategic/32_Funding_Strategy.md" "Strategic Documentation" "Plan" "Strategic Planning Document" "Active"
update_metadata_safe "strategic/40_Expansion_Growth_Strategy.md" "Strategic Documentation" "Plan" "Strategic Planning Document" "Active"
update_metadata_safe "strategic/42_Adaptive_Timeline.md" "Strategic Documentation" "Plan" "Strategic Planning Document" "Active"
update_metadata_safe "strategic/43_Operations_Action_Plan.md" "Strategic Documentation" "Plan" "Operational Document" "Active"
update_metadata_safe "strategic/44_Site_Selection_Land_Acquisition.md" "Strategic Documentation" "Plan" "Strategic Planning Document" "Active"
update_metadata_safe "strategic/45_Tiny_House_and_Living_Infrastructure.md" "Strategic Documentation" "Plan" "Operational Document" "Active"
update_metadata_safe "strategic/50_Risk_Assessment.md" "Strategic Documentation" "Plan" "Strategic Planning Document" "Active"
update_metadata_safe "strategic/51_Key_Performance_Indicators.md" "Strategic Documentation" "Plan" "Strategic Planning Document" "Active"
update_metadata_safe "strategic/60_Marketing_Communications_Strategy.md" "Strategic Documentation" "Plan" "Strategic Planning Document" "Active"
update_metadata_safe "strategic/70_Case_Studies_Restoration_Examples.md" "Strategic Documentation" "Plan" "Reference Document" "Active"

# Update restoration playbook files
find strategic/restoration_playbook -name "*.md" -type f | sort | while read -r file; do
    if [ -f "$file" ]; then
        # Determine type
        if [[ "$file" == *"00_"*"Overview"* ]] || [[ "$file" == *"README"* ]]; then
            doc_type="Overview Document"
        elif [[ "$file" == *"00_"* ]]; then
            doc_type="Overview Document"
        else
            doc_type="Task Guide"
        fi
        
        update_metadata_safe "$file" "Restoration Playbook" "Plan" "$doc_type" "Template - Customize for Your Project"
    fi
done

# Update hub file
update_metadata_safe "00_Eco_Balance_Hub.md" "Strategic Documentation" "Vision" "Vision Document" "Active"

echo ""
echo "✅ Safe metadata update complete"
