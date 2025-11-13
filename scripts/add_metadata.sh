#!/bin/bash
# add_metadata.sh - Add standardized metadata to all strategic files
# This script adds the required metadata fields to files that don't have them

set +e

CURRENT_DATETIME=$(date +"%Y.%m.%d %H:%M")
CURRENT_DATE=$(date +"%Y-%m-%d")
GLOBAL_VERSION="2025.11"

echo "🔄 Adding metadata to all strategic files..."
echo ""

# Function to add metadata to a file
add_metadata() {
    local file="$1"
    local part_of="$2"
    local category="$3"
    local doc_type="$4"
    local status="$5"
    
    # Check if file already has metadata footer
    if grep -q "^\*\*Document Version\*\*:" "$file" 2>/dev/null; then
        echo "⚠️  $file: Already has version metadata, skipping"
        return
    fi
    
    # Check if file ends with --- separator
    if ! tail -3 "$file" | grep -q "^---$"; then
        echo "" >> "$file"
        echo "---" >> "$file"
        echo "" >> "$file"
    fi
    
    # Add metadata
    echo "**Document Version**: ${GLOBAL_VERSION} (${CURRENT_DATETIME})" >> "$file"
    echo "**Part of**: ${part_of}" >> "$file"
    echo "**Category**: ${category}" >> "$file"
    echo "**Type**: ${doc_type}" >> "$file"
    echo "**Status**: ${status}" >> "$file"
    echo "**Last Updated**: ${CURRENT_DATE}" >> "$file"
    
    echo "✅ Added metadata to $file"
}

# Strategic files - Vision category
VISION_FILES=(
    "strategic/01_Executive_Summary.md:Vision Document"
    "strategic/02_Project_Vision.md:Vision Document"
    "strategic/03_Success_Factors.md:Vision Document"
)

# Strategic files - Plan category
PLAN_FILES=(
    "strategic/10_Organizational_Structure.md:Organizational Document"
    "strategic/11_Governance.md:Organizational Document"
    "strategic/12_Team_Roles.md:Organizational Document"
    "strategic/13_Legal_Framework.md:Organizational Document"
    "strategic/20_Restoration_Methodology.md:Methodology Document"
    "strategic/21_Technology_Integration.md:Methodology Document"
    "strategic/22_Restoration_Challenges_Solutions.md:Methodology Document"
    "strategic/30_Business_Model.md:Strategic Planning Document"
    "strategic/31_Financial_Projections.md:Strategic Planning Document"
    "strategic/32_Funding_Strategy.md:Strategic Planning Document"
    "strategic/40_Expansion_Growth_Strategy.md:Strategic Planning Document"
    "strategic/42_Adaptive_Timeline.md:Strategic Planning Document"
    "strategic/43_Operations_Action_Plan.md:Operational Document"
    "strategic/44_Site_Selection_Land_Acquisition.md:Strategic Planning Document"
    "strategic/45_Tiny_House_and_Living_Infrastructure.md:Operational Document"
    "strategic/50_Risk_Assessment.md:Strategic Planning Document"
    "strategic/51_Key_Performance_Indicators.md:Strategic Planning Document"
    "strategic/60_Marketing_Communications_Strategy.md:Strategic Planning Document"
    "strategic/70_Case_Studies_Restoration_Examples.md:Reference Document"
)

# Strategic files - Reality category
REALITY_FILES=(
    "strategic/04_Current_Status_Assessment.md:Status Document"
)

# Process Vision files
for entry in "${VISION_FILES[@]}"; do
    IFS=':' read -r file doc_type <<< "$entry"
    if [ -f "$file" ]; then
        add_metadata "$file" "Strategic Documentation" "Vision" "$doc_type" "Active"
    fi
done

# Process Plan files
for entry in "${PLAN_FILES[@]}"; do
    IFS=':' read -r file doc_type <<< "$entry"
    if [ -f "$file" ]; then
        add_metadata "$file" "Strategic Documentation" "Plan" "$doc_type" "Active"
    fi
done

# Process Reality files
for entry in "${REALITY_FILES[@]}"; do
    IFS=':' read -r file doc_type <<< "$entry"
    if [ -f "$file" ]; then
        add_metadata "$file" "Strategic Documentation" "Reality" "$doc_type" "Active"
    fi
done

# Process restoration playbook files
find strategic/restoration_playbook -name "*.md" -type f | while read -r file; do
    if [ -f "$file" ]; then
        # Determine type based on filename
        if [[ "$file" == *"00_"*"Overview"* ]] || [[ "$file" == *"README"* ]]; then
            doc_type="Overview Document"
        elif [[ "$file" == *"00_"* ]]; then
            doc_type="Overview Document"
        else
            doc_type="Task Guide"
        fi
        
        # Check if already has metadata
        if ! grep -q "^\*\*Document Version\*\*:" "$file" 2>/dev/null; then
            # Remove old "Part of:" if exists
            sed -i '/^\*\*Part of:\*\*/d' "$file"
            sed -i '/^Part of:/d' "$file"
            
            # Add new metadata
            if ! tail -3 "$file" | grep -q "^---$"; then
                echo "" >> "$file"
                echo "---" >> "$file"
                echo "" >> "$file"
            fi
            
            echo "**Document Version**: ${GLOBAL_VERSION} (${CURRENT_DATETIME})" >> "$file"
            echo "**Part of**: Restoration Playbook" >> "$file"
            echo "**Category**: Plan" >> "$file"
            echo "**Type**: ${doc_type}" >> "$file"
            echo "**Status**: Template - Customize for Your Project" >> "$file"
            echo "**Last Updated**: ${CURRENT_DATE}" >> "$file"
            
            echo "✅ Added metadata to $file"
        else
            echo "⚠️  $file: Already has version metadata, skipping"
        fi
    fi
done

echo ""
echo "✅ Metadata addition complete"

