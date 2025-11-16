#!/bin/bash
# check_document_lengths.sh - Scan documents for length and flag exceeding files

THRESHOLD_STRATEGIC=400
THRESHOLD_COMPLEX=600
THRESHOLD_HUB=200

echo "📏 Document Length Scan"
echo "======================"
echo ""
echo "Thresholds:"
echo "  Strategic Docs (00-70): $THRESHOLD_STRATEGIC lines"
echo "  Complex Topics: $THRESHOLD_COMPLEX lines"
echo "  Hub/Index Files: $THRESHOLD_HUB lines"
echo ""

echo "🔍 Scanning strategic files..."
echo ""

# Check strategic files
STRATEGIC_COUNT=0
STRATEGIC_EXCEEDING=0

for file in strategic/[0-9]*.md; do
    if [ -f "$file" ]; then
        lines=$(wc -l < "$file" 2>/dev/null || echo "0")
        if [ "$lines" -gt 0 ]; then
            ((STRATEGIC_COUNT++))
            if [ "$lines" -gt "$THRESHOLD_STRATEGIC" ]; then
                printf "⚠️  %-50s %6d lines (exceeds %d)\n" "$(basename "$file")" "$lines" "$THRESHOLD_STRATEGIC"
                ((STRATEGIC_EXCEEDING++))
            fi
        fi
    fi
done

# Check hub file
if [ -f "00_Eco_Balance_Hub.md" ]; then
    lines=$(wc -l < "00_Eco_Balance_Hub.md" 2>/dev/null || echo "0")
    if [ "$lines" -gt "$THRESHOLD_HUB" ]; then
        printf "⚠️  %-50s %6d lines (exceeds hub threshold %d)\n" "00_Eco_Balance_Hub.md" "$lines" "$THRESHOLD_HUB"
    fi
fi

echo ""
echo "📊 Summary:"
echo "  Strategic files scanned: $STRATEGIC_COUNT"
echo "  Files exceeding threshold: $STRATEGIC_EXCEEDING"
echo ""

if [ "$STRATEGIC_EXCEEDING" -eq 0 ]; then
    echo "✅ All strategic files are within length thresholds!"
else
    echo "📋 Files requiring attention: $STRATEGIC_EXCEEDING"
fi

