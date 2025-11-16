#!/bin/bash
# sync-roadmap-from-github.sh - Sync roadmap documentation from GitHub Milestones
# Requires: GitHub CLI (gh) installed and authenticated

set -e

REPO_OWNER="presiannedyalkov"
REPO_NAME="eco-balance-documentation"
ROADMAP_FILE="_process/documentation/ROADMAP.md"

echo "🔄 Syncing Roadmap from GitHub Milestones"
echo "Repository: $REPO_OWNER/$REPO_NAME"
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ Error: GitHub CLI (gh) is not installed"
    echo "Install from: https://cli.github.com/"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Error: Not authenticated with GitHub CLI"
    echo "Run: gh auth login"
    exit 1
fi

# Get all milestones
echo "📋 Fetching milestones from GitHub..."
MILESTONES=$(gh api repos/$REPO_OWNER/$REPO_NAME/milestones --jq '.[] | select(.state == "open") | {
  title: .title,
  number: .number,
  description: .description,
  due_on: .due_on,
  open_issues: .open_issues,
  closed_issues: .closed_issues
}')

if [ -z "$MILESTONES" ]; then
    echo "⚠️  No open milestones found"
    exit 0
fi

# Create roadmap content
ROADMAP_CONTENT="# Roadmap

**Last Synced:** $(date +"%Y-%m-%d %H:%M:%S")
**Source:** GitHub Milestones
**Repository:** https://github.com/$REPO_OWNER/$REPO_NAME

> **Note:** This file is auto-generated from GitHub Milestones. To update milestones, use GitHub UI or GitHub CLI.

---

## Active Milestones

"

# Process each milestone
echo "$MILESTONES" | jq -r '. | @base64' | while IFS= read -r milestone_b64; do
    MILESTONE=$(echo "$milestone_b64" | base64 -d)
    
    TITLE=$(echo "$MILESTONE" | jq -r '.title')
    NUMBER=$(echo "$MILESTONE" | jq -r '.number')
    DESCRIPTION=$(echo "$MILESTONE" | jq -r '.description // "No description"')
    DUE_ON=$(echo "$MILESTONE" | jq -r '.due_on // "No due date"')
    OPEN_ISSUES=$(echo "$MILESTONE" | jq -r '.open_issues')
    CLOSED_ISSUES=$(echo "$MILESTONE" | jq -r '.closed_issues')
    TOTAL_ISSUES=$((OPEN_ISSUES + CLOSED_ISSUES))
    
    if [ "$TOTAL_ISSUES" -gt 0 ]; then
        PROGRESS=$((CLOSED_ISSUES * 100 / TOTAL_ISSUES))
    else
        PROGRESS=0
    fi
    
    # Format due date
    if [ "$DUE_ON" != "null" ] && [ -n "$DUE_ON" ]; then
        DUE_DATE=$(date -d "$DUE_ON" +"%Y-%m-%d" 2>/dev/null || echo "$DUE_ON")
    else
        DUE_DATE="No due date"
    fi
    
    ROADMAP_CONTENT+="### $TITLE

**Milestone:** [#$NUMBER](https://github.com/$REPO_OWNER/$REPO_NAME/milestone/$NUMBER)
**Due Date:** $DUE_DATE
**Progress:** $CLOSED_ISSUES/$TOTAL_ISSUES issues closed ($PROGRESS%)

$DESCRIPTION

**Issues:**
- [View all issues](https://github.com/$REPO_OWNER/$REPO_NAME/milestone/$NUMBER)

---

"
done

# Add footer
ROADMAP_CONTENT+="## How to Update

This roadmap is automatically synced from GitHub Milestones. To update:

1. **Via GitHub UI:**
   - Go to: https://github.com/$REPO_OWNER/$REPO_NAME/milestones
   - Create or edit milestones
   - Run this script to sync: \`./scripts/sync-roadmap-from-github.sh\`

2. **Via GitHub CLI:**
   - Create milestone: \`gh api repos/$REPO_OWNER/$REPO_NAME/milestones -X POST -f title=\"...\"\`
   - Run this script to sync: \`./scripts/sync-roadmap-from-github.sh\`

3. **Automated:**
   - This script can be run via GitHub Actions on a schedule
   - See: \`.github/workflows/sync-roadmap.yml\` (if configured)

---

**Last Updated:** $(date +"%Y-%m-%d %H:%M:%S")
"

# Write to file
echo "$ROADMAP_CONTENT" > "$ROADMAP_FILE"
echo "✅ Roadmap synced to: $ROADMAP_FILE"
echo ""
echo "📊 Summary:"
echo "$MILESTONES" | jq -r '.title' | while read -r title; do
    echo "  - $title"
done

