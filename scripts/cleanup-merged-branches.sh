#!/bin/bash
# Script to delete all merged remote branches
# This will delete branches that have been merged into origin/main

set -e

echo "Fetching latest from remote..."
git fetch --prune

echo ""
echo "Finding merged branches..."
MERGED_BRANCHES=$(git branch -r --merged origin/main | grep -v "origin/HEAD\|origin/main" | sed 's|origin/||' | sed 's/^[[:space:]]*//')

BRANCH_COUNT=$(echo "$MERGED_BRANCHES" | grep -c . || echo "0")
echo "Found $BRANCH_COUNT merged branches to delete"
echo ""

if [ "$BRANCH_COUNT" -eq 0 ]; then
    echo "No merged branches to delete."
    exit 0
fi

echo "Branches to be deleted:"
echo "$MERGED_BRANCHES" | head -20
if [ "$BRANCH_COUNT" -gt 20 ]; then
    echo "... and $((BRANCH_COUNT - 20)) more"
fi
echo ""

read -p "Do you want to proceed with deletion? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "Cancelled."
    exit 0
fi

echo ""
echo "Deleting branches..."
DELETED=0
FAILED=0

while IFS= read -r branch; do
    if [ -n "$branch" ]; then
        echo -n "Deleting origin/$branch... "
        if git push origin --delete "$branch" 2>&1 | grep -q "deleted"; then
            echo "✓"
            ((DELETED++))
        else
            echo "✗ (may already be deleted or require auth)"
            ((FAILED++))
        fi
    fi
done <<< "$MERGED_BRANCHES"

echo ""
echo "Summary:"
echo "  Deleted: $DELETED"
echo "  Failed: $FAILED"
echo ""
echo "Done!"


