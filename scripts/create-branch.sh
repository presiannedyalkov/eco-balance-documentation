#!/bin/bash
# Helper script to create a new branch from an up-to-date main
# Usage: ./scripts/create-branch.sh fix/my-fix-name

set -e

BRANCH_NAME="$1"

if [ -z "$BRANCH_NAME" ]; then
  echo "❌ Error: Branch name required"
  echo "Usage: ./scripts/create-branch.sh fix/my-fix-name"
  exit 1
fi

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
  echo "❌ Error: Not in a git repository"
  exit 1
fi

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Current branch: $CURRENT_BRANCH"

# Check if there are uncommitted changes
if ! git diff-index --quiet HEAD --; then
  echo "⚠️  Warning: You have uncommitted changes"
  echo "   Stashing changes..."
  git stash push -m "Auto-stash before creating branch $BRANCH_NAME"
  STASHED=true
else
  STASHED=false
fi

# Switch to main
echo "🔄 Switching to main..."
git checkout main

# Check if local main is behind origin/main
LOCAL_COMMITS=$(git rev-list --count main ^origin/main 2>/dev/null || echo "0")
REMOTE_COMMITS=$(git rev-list --count origin/main ^main 2>/dev/null || echo "0")

if [ "$REMOTE_COMMITS" -gt 0 ]; then
  echo "📥 Local main is behind origin/main by $REMOTE_COMMITS commit(s)"
  echo "   Updating local main..."
  git pull origin main --rebase
  echo "✅ Local main is now up to date"
fi

if [ "$LOCAL_COMMITS" -gt 0 ]; then
  echo "⚠️  Warning: Local main has $LOCAL_COMMITS commit(s) not in origin/main"
  echo "   These commits will be included in your new branch"
  echo "   Consider: git reset --hard origin/main (if you want to discard them)"
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

# Create new branch
echo "🌿 Creating branch: $BRANCH_NAME"
git checkout -b "$BRANCH_NAME"

# Restore stashed changes if any
if [ "$STASHED" = true ]; then
  echo "📦 Restoring stashed changes..."
  git stash pop || true
fi

echo "✅ Branch '$BRANCH_NAME' created successfully!"
echo "   You can now make your changes and commit them"
echo ""
echo "Next steps:"
echo "  1. Make your changes"
echo "  2. git add ."
echo "  3. git commit -m 'Your commit message'"
echo "  4. git push -u origin $BRANCH_NAME"

