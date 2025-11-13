#!/bin/bash
# clean_metadata_final.sh - Final version for removing duplicate metadata

set +e  # Don't exit on error, we'll handle it

echo "🧹 Removing duplicate metadata entries from 21 strategic files..."
echo ""

AFFECTED_FILES=(
    "strategic/02_Project_Vision.md"
    "strategic/03_Success_Factors.md"
    "strategic/04_Current_Status_Assessment.md"
    "strategic/10_Organizational_Structure.md"
    "strategic/11_Governance.md"
    "strategic/12_Team_Roles.md"
    "strategic/13_Legal_Framework.md"
    "strategic/20_Restoration_Methodology.md"
    "strategic/21_Technology_Integration.md"
    "strategic/22_Restoration_Challenges_Solutions.md"
    "strategic/30_Business_Model.md"
    "strategic/31_Financial_Projections.md"
    "strategic/32_Funding_Strategy.md"
    "strategic/42_Adaptive_Timeline.md"
    "strategic/43_Operations_Action_Plan.md"
    "strategic/44_Site_Selection_Land_Acquisition.md"
    "strategic/45_Tiny_House_and_Living_Infrastructure.md"
    "strategic/50_Risk_Assessment.md"
    "strategic/51_Key_Performance_Indicators.md"
    "strategic/60_Marketing_Communications_Strategy.md"
    "strategic/70_Case_Studies_Restoration_Examples.md"
)

CLEANED=0
ERRORS=0

for file in "${AFFECTED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo "⚠️  $(basename "$file"): File not found"
        ((ERRORS++))
        continue
    fi
    
    # Must have new metadata
    if ! grep -q "Document Version.*2025\.11" "$file"; then
        echo "⚠️  $(basename "$file"): No new metadata found"
        ((ERRORS++))
        continue
    fi
    
    # Create backup
    cp "$file" "${file}.bak"
    
    # Process with Python
    python3 << PYEOF
import re
import sys

try:
    with open("$file", 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Find last occurrence of new metadata
    new_idx = None
    for i in range(len(lines) - 1, -1, -1):
        if re.search(r'Document Version.*2025\.11', lines[i]):
            new_idx = i
            break
    
    if new_idx is None:
        sys.exit(1)
    
    # Find separator before new metadata (look back up to 5 lines)
    sep_idx = None
    for i in range(new_idx - 1, max(0, new_idx - 6), -1):
        if lines[i].strip() == "---":
            sep_idx = i
            break
    
    if sep_idx is None:
        sep_idx = new_idx - 1
    
    # Build output: keep content, remove old metadata blocks
    output = []
    i = 0
    skip_old = False
    
    while i < sep_idx:
        line = lines[i]
        
        # Check if this is a separator that starts old metadata
        if line.strip() == "---":
            # Look ahead to see if old metadata follows
            found_old = False
            j = i + 1
            while j < min(i + 6, sep_idx, len(lines)):
                if lines[j].strip() and re.search(r'Document Version.*[23]\.0\.0', lines[j]):
                    found_old = True
                    break
                if lines[j].strip() and lines[j].strip() != "":
                    break
                j += 1
            
            if found_old:
                # Skip this separator and old metadata block
                skip_old = True
                i = j + 1
                # Skip until next separator or end
                while i < sep_idx and i < len(lines):
                    if lines[i].strip() == "---":
                        # Check if this is separator before new metadata
                        if i + 1 < len(lines) and re.search(r'Document Version.*2025\.11', lines[i + 1]):
                            # This is the separator we want!
                            output.append(lines[i])
                            skip_old = False
                            i += 1
                            break
                        else:
                            # Another old separator, skip it
                            i += 1
                            continue
                    elif skip_old and re.search(r'Document Version.*[23]\.0\.0|Last Updated.*2025-11-10|Status.*Transformed|Status.*Bootstrap|Status.*Active.*Location', lines[i]):
                        # Old metadata line, skip
                        i += 1
                        continue
                    else:
                        skip_old = False
                        break
                continue
            else:
                # Not old metadata, keep separator
                output.append(line)
        elif skip_old and re.search(r'Document Version.*[23]\.0\.0|Last Updated.*2025-11-10|Status.*Transformed|Status.*Bootstrap', line):
            # Old metadata line, skip
            i += 1
            continue
        else:
            # Regular line, keep it
            output.append(line)
            if skip_old and line.strip():
                skip_old = False
        
        i += 1
    
    # Add separator and new metadata block
    for i in range(sep_idx, len(lines)):
        output.append(lines[i])
    
    # Write output
    with open("${file}.tmp", 'w', encoding='utf-8') as f:
        f.writelines(output)
    
    sys.exit(0)
except Exception as e:
    print(f"Error processing $file: {e}", file=sys.stderr)
    sys.exit(1)
PYEOF

    PYTHON_EXIT=$?
    
    if [ $PYTHON_EXIT -ne 0 ] || [ ! -f "${file}.tmp" ]; then
        echo "❌ $(basename "$file"): Processing failed (exit $PYTHON_EXIT)"
        rm -f "${file}.tmp" "${file}.bak"
        ((ERRORS++))
        continue
    fi
    
    # Verify new metadata still exists
    if ! grep -q "Document Version.*2025\.11" "${file}.tmp"; then
        echo "❌ $(basename "$file"): Lost new metadata"
        rm -f "${file}.tmp" "${file}.bak"
        ((ERRORS++))
        continue
    fi
    
    # Count old and new entries
    OLD=$(grep -cE "Document Version.*[23]\.0\.0" "${file}.tmp" 2>/dev/null | head -1 | tr -d '\n' || echo "0")
    NEW=$(grep -c "Document Version.*2025\.11" "${file}.tmp" 2>/dev/null | head -1 | tr -d '\n' || echo "0")
    
    # Handle case where grep returns empty
    [ -z "$OLD" ] && OLD="0"
    [ -z "$NEW" ] && NEW="0"
    
    if [ "$OLD" = "0" ] && [ "$NEW" = "1" ]; then
        mv "${file}.tmp" "$file"
        rm "${file}.bak"
        echo "✅ $(basename "$file")"
        ((CLEANED++))
    else
        echo "⚠️  $(basename "$file"): OLD=$OLD NEW=$NEW (needs review)"
        rm -f "${file}.tmp" "${file}.bak"
        ((ERRORS++))
    fi
done

echo ""
echo "📊 Summary:"
echo "   ✅ Cleaned: $CLEANED files"
echo "   ⚠️  Issues: $ERRORS files"
echo ""

if [ $CLEANED -gt 0 ]; then
    echo "✅ Cleanup complete! $CLEANED files now have clean metadata."
fi

