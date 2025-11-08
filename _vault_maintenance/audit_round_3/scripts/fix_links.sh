#!/bin/bash
# fix_links.sh - Automated link path corrections for Round 3 Agent 04

set -e

PROJECT_ROOT="/home/presi/projects/eco-balance-documentation"
cd "$PROJECT_ROOT"

echo "==================================="
echo "FIX AGENT 04 - Link Corrections"
echo "==================================="
echo ""

# Create backup
echo "[1/4] Creating backup..."
BACKUP_FILE="fix_agent_04_backup_$(date +%Y%m%d_%H%M%S).tar.gz"
tar -czf "/tmp/$BACKUP_FILE" implementation_tasks/ _process/
echo "✓ Backup saved to /tmp/$BACKUP_FILE"
echo ""

# Fix Pattern 1: Climate Action links
echo "[2/4] Fixing Climate Action link paths..."
find implementation_tasks -name "*.md" -type f \
    -exec sed -i 's|\[\[../15_Climate_Action|[[../../15_Climate_Action|g' {} +
echo "✓ Fixed Climate Action links"

# Fix Pattern 2: Biodiversity folder references
echo "[3/4] Fixing biodiversity folder references..."
find implementation_tasks -name "*.md" -type f \
    -exec sed -i 's|biodiversity_conservation/|biodiversity/|g' {} +
echo "✓ Fixed biodiversity folder references"

# Verify changes
echo "[4/4] Verification..."
echo ""
echo "Remaining Climate Action issues:"
CLIMATE_COUNT=$(grep -r "\[\[../15_Climate_Action" implementation_tasks/ 2>/dev/null | wc -l || echo "0")
if [ "$CLIMATE_COUNT" -eq 0 ]; then
    echo "  None found ✓"
else
    echo "  $CLIMATE_COUNT instances still found:"
    grep -r "\[\[../15_Climate_Action" implementation_tasks/ 2>/dev/null || true
fi

echo ""
echo "Remaining biodiversity_conservation references:"
BIO_COUNT=$(grep -r "biodiversity_conservation/" implementation_tasks/ 2>/dev/null | wc -l || echo "0")
if [ "$BIO_COUNT" -eq 0 ]; then
    echo "  None found ✓"
else
    echo "  $BIO_COUNT instances still found:"
    grep -r "biodiversity_conservation/" implementation_tasks/ 2>/dev/null || true
fi

echo ""
echo "✓ Automated fixes complete"
echo ""
echo "==================================="
echo "Manual fixes still needed:"
echo "==================================="
echo "  - biodiversity/00_Biodiversity_Overview.md (lines 35-38)"
echo "  - _process/git/README.md (line 90)"
echo "  - soil_restoration/02_Add_Organic_Matter.md (line 299)"
echo "  - MIGRATION_CHECK_SUMMARY.md (line 130)"
echo ""
echo "Review changes:"
echo "  git diff implementation_tasks/ _process/"
echo ""
echo "Backup location: /tmp/$BACKUP_FILE"
