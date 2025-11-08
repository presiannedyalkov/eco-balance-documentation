#!/bin/bash
# verify_fixes.sh - Verification script for Round 3 fixes

PROJECT_ROOT="/home/presi/projects/eco-balance-documentation"
cd "$PROJECT_ROOT"

echo "==================================="
echo "FIX ROUND 3 - VERIFICATION"
echo "==================================="
echo ""

# Agent 01 Verification
echo "📋 AGENT 01 - Date & Version Corrections"
echo "───────────────────────────────────────────"

echo -n "Date errors (2024-11-08): "
DATE_COUNT=$(grep -r "Last Updated:\*\* 2024-11-08" . --include="*.md" 2>/dev/null | wc -l || echo "0")
if [ "$DATE_COUNT" -eq 0 ]; then
    echo "✓ None found (PASS)"
else
    echo "❌ $DATE_COUNT found (FAIL)"
    echo "  Run: grep -r 'Last Updated:\*\* 2024-11-08' . --include='*.md'"
fi

echo -n "Version 1.0.0 in headers: "
VERSION_COUNT=$(grep -r "Document Version:\*\* 1.0.0" . --include="*.md" ! -path "./_vault_maintenance/*" 2>/dev/null | wc -l || echo "0")
if [ "$VERSION_COUNT" -eq 0 ]; then
    echo "✓ None found (PASS)"
else
    echo "⚠ $VERSION_COUNT found (Review needed)"
fi
echo ""

# Agent 02 Verification
echo "📋 AGENT 02 - Critical Content"
echo "───────────────────────────────────────────"

echo -n "File #45 budget: "
BUDGET_CHECK=$(grep -c "€41.*48k\|€48.*41k" 45_Tiny_House_and_Living_Infrastructure.md 2>/dev/null || echo "0")
if [ "$BUDGET_CHECK" -eq 0 ]; then
    echo "✓ No €41-48k found (PASS)"
else
    echo "❌ Old budget still present (FAIL)"
fi

echo -n "Geographic 'Southern Europe': "
GEO_COUNT=$(grep -r "Southern Europe" . --include="*.md" ! -path "./_vault_maintenance/*" ! -path "./_process/*" 2>/dev/null | wc -l || echo "0")
if [ "$GEO_COUNT" -eq 0 ]; then
    echo "✓ None found (PASS)"
else
    echo "❌ $GEO_COUNT found (FAIL)"
    echo "  Files: 12_Team_Roles.md, 06_Contact_Landowners.md"
fi

echo -n "Currency USD ($): "
USD_COUNT=$(grep -r '\$[0-9]' implementation_tasks/ --include="*.md" 2>/dev/null | grep -v "backup" | wc -l || echo "0")
if [ "$USD_COUNT" -eq 0 ]; then
    echo "✓ None found (PASS)"
else
    echo "⚠ $USD_COUNT found (Review - may be legitimate)"
fi
echo ""

# Agent 03 Verification
echo "📋 AGENT 03 - Metadata & Structure"
echo "───────────────────────────────────────────"

echo -n "Missing frontmatter (critical files): "
MISSING_FM=0
[ ! -f "implementation_tasks/soil_restoration/00_Soil_Restoration_Overview.md" ] || \
  grep -q "Document Version" implementation_tasks/soil_restoration/00_Soil_Restoration_Overview.md || ((MISSING_FM++))
[ ! -f "implementation_tasks/water_management/00_Water_Management_Overview.md" ] || \
  grep -q "Document Version" implementation_tasks/water_management/00_Water_Management_Overview.md || ((MISSING_FM++))

if [ "$MISSING_FM" -eq 0 ]; then
    echo "✓ All have frontmatter (PASS)"
else
    echo "❌ $MISSING_FM files missing frontmatter (FAIL)"
fi

echo -n "Incomplete dates (XX): "
XX_COUNT=$(grep -r "2024-11-XX" _process/ --include="*.md" 2>/dev/null | wc -l || echo "0")
if [ "$XX_COUNT" -eq 0 ]; then
    echo "✓ None found (PASS)"
else
    echo "❌ $XX_COUNT found (FAIL)"
fi
echo ""

# Agent 04 Verification
echo "📋 AGENT 04 - Links & Strategic Content"
echo "───────────────────────────────────────────"

echo -n "Broken Climate Action links: "
CLIMATE_COUNT=$(grep -r "\[\[../15_Climate_Action" implementation_tasks/ 2>/dev/null | wc -l || echo "0")
if [ "$CLIMATE_COUNT" -eq 0 ]; then
    echo "✓ None found (PASS)"
else
    echo "❌ $CLIMATE_COUNT found (FAIL)"
fi

echo -n "Wrong folder 'biodiversity_conservation': "
BIO_COUNT=$(grep -r "biodiversity_conservation" implementation_tasks/ 2>/dev/null | wc -l || echo "0")
if [ "$BIO_COUNT" -eq 0 ]; then
    echo "✓ None found (PASS)"
else
    echo "❌ $BIO_COUNT found (FAIL)"
fi

echo -n "KPI File #51 Year 3 target: "
KPI_CHECK=$(grep -c "50+ hectares" 51_Key_Performance_Indicators.md 2>/dev/null || echo "0")
if [ "$KPI_CHECK" -eq 0 ]; then
    echo "✓ Unrealistic target removed (PASS)"
else
    echo "❌ Still shows 50+ hectares (FAIL)"
fi
echo ""

# Overall Summary
echo "==================================="
echo "OVERALL STATUS"
echo "==================================="

# Count total issues
TOTAL_ISSUES=0
[ "$DATE_COUNT" -gt 0 ] && ((TOTAL_ISSUES++))
[ "$BUDGET_CHECK" -gt 0 ] && ((TOTAL_ISSUES++))
[ "$GEO_COUNT" -gt 0 ] && ((TOTAL_ISSUES++))
[ "$MISSING_FM" -gt 0 ] && ((TOTAL_ISSUES++))
[ "$XX_COUNT" -gt 0 ] && ((TOTAL_ISSUES++))
[ "$CLIMATE_COUNT" -gt 0 ] && ((TOTAL_ISSUES++))
[ "$BIO_COUNT" -gt 0 ] && ((TOTAL_ISSUES++))
[ "$KPI_CHECK" -gt 0 ] && ((TOTAL_ISSUES++))

if [ "$TOTAL_ISSUES" -eq 0 ]; then
    echo "✅ All critical checks PASSED"
    echo "   Ready for pull request submission"
else
    echo "❌ $TOTAL_ISSUES critical issues remaining"
    echo "   Review failed checks above"
fi
echo ""

echo "Modified files:"
git diff --stat --cached 2>/dev/null || git diff --stat 2>/dev/null || echo "  No changes staged/unstaged"
echo ""

echo "Run individual checks for more details:"
echo "  Date errors:     grep -r 'Last Updated:\*\* 2024-11-08' . --include='*.md'"
echo "  Geographic:      grep -r 'Southern Europe' . --include='*.md'"
echo "  Links (climate): grep -r '\[\[../15_Climate_Action' implementation_tasks/"
echo "  Links (bio):     grep -r 'biodiversity_conservation' implementation_tasks/"
