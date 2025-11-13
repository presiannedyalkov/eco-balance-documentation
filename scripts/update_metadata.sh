#!/bin/bash
# update_metadata.sh - Update existing metadata to new standard format
# This script updates files that already have metadata to the new standard

set +e

CURRENT_DATETIME=$(date +"%Y.%m.%d %H:%M")
CURRENT_DATE=$(date +"%Y-%m-%d")
GLOBAL_VERSION="2025.11"

echo "🔄 Updating metadata to new standard format..."
echo ""

# Function to update metadata in a file
update_metadata() {
    local file="$1"
    local part_of="$2"
    local category="$3"
    local doc_type="$4"
    local status="$5"
    
    if [ ! -f "$file" ]; then
        return
    fi
    
    # Check if file has version metadata
    if ! grep -q "Document Version" "$file" 2>/dev/null; then
        echo "⚠️  $file: No version metadata found, skipping"
        return
    fi
    
    # Backup file
    cp "$file" "${file}.bak"
    
    # Remove old metadata section (from --- to end, or from Document Version to end)
    # Find the line with Document Version and remove everything from there to end
    sed -i '/^---$/,${/^---$/!d}' "$file" 2>/dev/null || true
    sed -i '/^\*\*Document Version\*\*:/,$d' "$file" 2>/dev/null || true
    sed -i '/^Document Version:/,$d' "$file" 2>/dev/null || true
    
    # Remove trailing empty lines
    sed -i -e :a -e '/^\n*$/{$d;N;ba' -e '}' "$file" 2>/dev/null || true
    
    # Add new metadata
    echo "" >> "$file"
    echo "---" >> "$file"
    echo "" >> "$file"
    echo "**Document Version**: ${GLOBAL_VERSION} (${CURRENT_DATETIME})" >> "$file"
    echo "**Part of**: ${part_of}" >> "$file"
    echo "**Category**: ${category}" >> "$file"
    echo "**Type**: ${doc_type}" >> "$file"
    echo "**Status**: ${status}" >> "$file"
    echo "**Last Updated**: ${CURRENT_DATE}" >> "$file"
    
    # Remove backup if successful
    rm "${file}.bak"
    
    echo "✅ Updated metadata in $file"
}

# Update Vision files
update_metadata "strategic/01_Executive_Summary.md" "Strategic Documentation" "Vision" "Vision Document" "Active"
update_metadata "strategic/02_Project_Vision.md" "Strategic Documentation" "Vision" "Vision Document" "Active"
update_metadata "strategic/03_Success_Factors.md" "Strategic Documentation" "Vision" "Vision Document" "Active"

# Update Reality files
update_metadata "strategic/04_Current_Status_Assessment.md" "Strategic Documentation" "Reality" "Status Document" "Active"

# Update Plan files
update_metadata "strategic/10_Organizational_Structure.md" "Strategic Documentation" "Plan" "Organizational Document" "Active"
update_metadata "strategic/11_Governance.md" "Strategic Documentation" "Plan" "Organizational Document" "Active"
update_metadata "strategic/12_Team_Roles.md" "Strategic Documentation" "Plan" "Organizational Document" "Active"
update_metadata "strategic/13_Legal_Framework.md" "Strategic Documentation" "Plan" "Organizational Document" "Active"
update_metadata "strategic/20_Restoration_Methodology.md" "Strategic Documentation" "Plan" "Methodology Document" "Active"
update_metadata "strategic/21_Technology_Integration.md" "Strategic Documentation" "Plan" "Methodology Document" "Active"
update_metadata "strategic/22_Restoration_Challenges_Solutions.md" "Strategic Documentation" "Plan" "Methodology Document" "Active"
update_metadata "strategic/30_Business_Model.md" "Strategic Documentation" "Plan" "Strategic Planning Document" "Active"
update_metadata "strategic/31_Financial_Projections.md" "Strategic Documentation" "Plan" "Strategic Planning Document" "Active"
update_metadata "strategic/32_Funding_Strategy.md" "Strategic Documentation" "Plan" "Strategic Planning Document" "Active"
update_metadata "strategic/40_Expansion_Growth_Strategy.md" "Strategic Documentation" "Plan" "Strategic Planning Document" "Active"
update_metadata "strategic/42_Adaptive_Timeline.md" "Strategic Documentation" "Plan" "Strategic Planning Document" "Active"
update_metadata "strategic/43_Operations_Action_Plan.md" "Strategic Documentation" "Plan" "Operational Document" "Active"
update_metadata "strategic/44_Site_Selection_Land_Acquisition.md" "Strategic Documentation" "Plan" "Strategic Planning Document" "Active"
update_metadata "strategic/45_Tiny_House_and_Living_Infrastructure.md" "Strategic Documentation" "Plan" "Operational Document" "Active"
update_metadata "strategic/50_Risk_Assessment.md" "Strategic Documentation" "Plan" "Strategic Planning Document" "Active"
update_metadata "strategic/51_Key_Performance_Indicators.md" "Strategic Documentation" "Plan" "Strategic Planning Document" "Active"
update_metadata "strategic/60_Marketing_Communications_Strategy.md" "Strategic Documentation" "Plan" "Strategic Planning Document" "Active"
update_metadata "strategic/70_Case_Studies_Restoration_Examples.md" "Strategic Documentation" "Plan" "Reference Document" "Active"

# Update restoration playbook files
find strategic/restoration_playbook -name "*.md" -type f | while read -r file; do
    if [ -f "$file" ] && grep -q "Document Version\|Part of" "$file" 2>/dev/null; then
        # Determine type
        if [[ "$file" == *"00_"*"Overview"* ]] || [[ "$file" == *"README"* ]]; then
            doc_type="Overview Document"
        elif [[ "$file" == *"00_"* ]]; then
            doc_type="Overview Document"
        else
            doc_type="Task Guide"
        fi
        
        # Backup
        cp "$file" "${file}.bak"
        
        # Remove old metadata
        sed -i '/^---$/,${/^---$/!d}' "$file" 2>/dev/null || true
        sed -i '/^\*\*Document Version\*\*:/,$d' "$file" 2>/dev/null || true
        sed -i '/^\*\*Part of:\*\*/,$d' "$file" 2>/dev/null || true
        sed -i '/^Part of:/,$d' "$file" 2>/dev/null || true
        
        # Remove trailing empty lines
        sed -i -e :a -e '/^\n*$/{$d;N;ba' -e '}' "$file" 2>/dev/null || true
        
        # Add new metadata
        echo "" >> "$file"
        echo "---" >> "$file"
        echo "" >> "$file"
        echo "**Document Version**: ${GLOBAL_VERSION} (${CURRENT_DATETIME})" >> "$file"
        echo "**Part of**: Restoration Playbook" >> "$file"
        echo "**Category**: Plan" >> "$file"
        echo "**Type**: ${doc_type}" >> "$file"
        echo "**Status**: Template - Customize for Your Project" >> "$file"
        echo "**Last Updated**: ${CURRENT_DATE}" >> "$file"
        
        rm "${file}.bak"
        echo "✅ Updated metadata in $file"
    fi
done

echo ""
echo "✅ Metadata update complete"

