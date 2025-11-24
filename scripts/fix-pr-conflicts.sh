#!/bin/bash
# Helper script to fix conflicts in an existing PR branch
# Usage: ./scripts/fix-pr-conflicts.sh [branch-name]
# If branch-name is not provided, uses current branch

set -e

BRANCH_NAME="${1:-$(git branch --show-current)}"

if [ -z "$BRANCH_NAME" ]; then
  echo "❌ Error: Could not determine branch name"
  echo "Usage: ./scripts/fix-pr-conflicts.sh [branch-name]"
  exit 1
fi

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
  echo "❌ Error: Not in a git repository"
  exit 1
fi

echo "🔧 Fixing conflicts for branch: $BRANCH_NAME"
echo ""

# Check if branch exists
if ! git show-ref --verify --quiet refs/heads/"$BRANCH_NAME"; then
  echo "❌ Error: Branch '$BRANCH_NAME' does not exist locally"
  exit 1
fi

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Current branch: $CURRENT_BRANCH"

# Check if there are uncommitted changes
if ! git diff-index --quiet HEAD --; then
  echo "⚠️  Warning: You have uncommitted changes"
  echo "   Stashing changes..."
  git stash push -m "Auto-stash before fixing PR conflicts for $BRANCH_NAME"
  STASHED=true
else
  STASHED=false
fi

# Fetch latest from origin
echo "📥 Fetching latest from origin..."
git fetch origin

# Switch to the branch
echo "🔄 Switching to branch: $BRANCH_NAME"
git checkout "$BRANCH_NAME"

# Find commits that are unique to this branch (not in origin/main)
echo "🔍 Finding commits unique to this branch..."
UNIQUE_COMMITS=$(git log --oneline origin/main..HEAD | wc -l)

if [ "$UNIQUE_COMMITS" -eq 0 ]; then
  echo "⚠️  No unique commits found in this branch"
  echo "   This branch may already be merged or has no new commits"
  read -p "   Continue anyway? (y/N) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Aborted"
    if [ "$STASHED" = true ]; then
      git stash pop
    fi
    git checkout "$CURRENT_BRANCH" 2>/dev/null || true
    exit 1
  fi
fi

echo "📋 Found $UNIQUE_COMMITS unique commit(s) in this branch"
echo ""

# Save the commit SHAs
COMMIT_SHAS=$(git log --reverse --format="%H" origin/main..HEAD)

# Reset branch to origin/main
echo "🔄 Resetting branch to origin/main..."
git reset --hard origin/main

# Cherry-pick each commit
echo "🍒 Cherry-picking commits..."
for COMMIT in $COMMIT_SHAS; do
  echo "   Cherry-picking: $(git log --oneline -1 $COMMIT)"
  if ! git cherry-pick "$COMMIT" 2>/dev/null; then
    echo "⚠️  Conflict during cherry-pick!"
    echo "   Resolve conflicts, then run:"
    echo "   git add ."
    echo "   git cherry-pick --continue"
    echo "   Then re-run this script to continue"
    if [ "$STASHED" = true ]; then
      git stash pop
    fi
    exit 1
  fi
done

echo "✅ All commits cherry-picked successfully!"
echo ""

# Force push with lease (safe force push)
echo "📤 Pushing to origin..."
if git push origin "$BRANCH_NAME" --force-with-lease; then
  echo "✅ Branch updated successfully!"
  echo "   PR conflicts should now be resolved"
else
  echo "⚠️  Push failed - you may need to resolve conflicts manually"
  echo "   Or the branch may have been updated by someone else"
fi

# Restore stashed changes if any
if [ "$STASHED" = true ]; then
  echo "📦 Restoring stashed changes..."
  git stash pop || true
fi

echo ""
echo "✅ Done! Your PR should now be conflict-free."

