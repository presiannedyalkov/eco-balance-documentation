#!/bin/bash
# fix_dates_versions.sh - Automated fixes for Round 3 Agent 01

set -e

PROJECT_ROOT="/home/presi/projects/eco-balance-documentation"
cd "$PROJECT_ROOT"

echo "==================================="
echo "FIX AGENT 01 - Automated Corrections"
echo "==================================="
echo ""

# Create backup
echo "[1/4] Creating backup..."
BACKUP_FILE="fix_agent_01_backup_$(date +%Y%m%d_%H%M%S).tar.gz"
tar -czf "/tmp/$BACKUP_FILE" *.md implementation_tasks/ _process/
echo "✓ Backup saved to /tmp/$BACKUP_FILE"
echo ""

# Fix dates
echo "[2/4] Fixing dates (2024-11-08 → 2025-11-08)..."
find . -name "*.md" -type f \
    ! -path "./_vault_maintenance/*" \
    -exec sed -i 's/\*\*Last Updated:\*\* 2024-11-08/**Last Updated:** 2025-11-08/g' {} +

DATE_COUNT=$(git diff --stat | grep -c "\.md" || echo "0")
echo "✓ Fixed dates in approximately $DATE_COUNT files"
echo ""

# Verify dates
echo "[3/4] Verifying date fixes..."
REMAINING=$(grep -r "Last Updated:\*\* 2024-11-08" . --include="*.md" 2>/dev/null | wc -l || echo "0")
if [ "$REMAINING" -eq 0 ]; then
    echo "✓ All dates corrected successfully"
else
    echo "⚠ Warning: $REMAINING instances still showing 2024-11-08"
    grep -r "Last Updated:\*\* 2024-11-08" . --include="*.md" 2>/dev/null || true
fi
echo ""

# Summary
echo "[4/4] Summary of changes..."
git diff --stat
echo ""
echo "==================================="
echo "✅ AUTOMATED FIXES COMPLETE"
echo "==================================="
echo ""
echo "Next Steps:"
echo "1. Review changes: git diff"
echo "2. Complete manual version fixes (see task file)"
echo "3. Run verification: grep -r '2024-11-08' . --include='*.md'"
echo "4. Commit when ready: git commit -am 'Fix Round 3: Agent 01 - Date/version corrections'"
echo ""
echo "Backup location: /tmp/$BACKUP_FILE"
