# Branch Creation Best Practices

## Why Conflicts Happen

**The Problem:**
When you create a branch from a local `main` that has diverged from `origin/main`, you'll get conflicts when opening a PR. This happens because:

1. **Commits made directly to local `main`**: Instead of creating a branch first, commits are made to local `main`
2. **Local `main` not synced**: After PRs are merged, local `main` doesn't get updated
3. **Branches created from outdated `main`**: New branches inherit the divergence

**Example:**
```bash
# ❌ BAD: Making commits directly to local main
git checkout main
git add .
git commit -m "My changes"
# ... later, PR #123 gets merged to origin/main
# ... you create a new branch
git checkout -b fix/new-feature  # ← Based on outdated local main!
# ... Now you have conflicts when opening PR
```

## Solution: Always Sync Before Creating Branches

### Method 1: Use the Helper Script (Recommended)

```bash
# This script automatically:
# 1. Stashes uncommitted changes
# 2. Switches to main
# 3. Pulls latest from origin/main
# 4. Creates your new branch
# 5. Restores stashed changes

./scripts/create-branch.sh fix/my-fix-name
```

### Method 2: Manual Steps

```bash
# 1. Stash any uncommitted changes
git stash

# 2. Switch to main
git checkout main

# 3. Update local main from remote
git pull origin main

# 4. Create your new branch
git checkout -b fix/my-fix-name

# 5. Restore stashed changes (if any)
git stash pop
```

### Method 3: Create Branch from origin/main Directly

```bash
# Create branch directly from origin/main (bypasses local main)
git fetch origin
git checkout -b fix/my-fix-name origin/main
```

## Prevention Checklist

Before creating a new branch, always:

- [ ] Check current branch: `git branch` or `git status`
- [ ] If on `main`, sync it: `git pull origin main`
- [ ] Check if local main has uncommitted commits: `git log main --not origin/main`
- [ ] If yes, decide: keep them or reset: `git reset --hard origin/main`
- [ ] Create branch from synced `main`

## Quick Check Commands

```bash
# Check if local main is behind origin/main
git fetch origin
git log --oneline main..origin/main

# Check if local main has commits not in origin/main
git log --oneline origin/main..main

# See divergence
git log --oneline --graph --all --decorate -10
```

## Common Scenarios

### Scenario 1: I accidentally committed to local main

```bash
# Create branch from current state
git checkout -b fix/my-changes

# Reset main to match origin
git checkout main
git reset --hard origin/main

# Go back to your branch
git checkout fix/my-changes
```

### Scenario 2: I have uncommitted changes and want to create a branch

```bash
# Option A: Stash and restore
git stash
git checkout main
git pull origin main
git checkout -b fix/my-changes
git stash pop

# Option B: Commit to current branch, then create new branch
git add .
git commit -m "WIP: my changes"
git checkout -b fix/my-changes
```

### Scenario 3: My branch has conflicts with main

```bash
# Rebase your branch on latest main
git fetch origin
git checkout fix/my-branch
git rebase origin/main

# Resolve any conflicts, then:
git add .
git rebase --continue

# Force push (safe for feature branches)
git push --force-with-lease origin fix/my-branch
```

## Best Practices Summary

1. **Never commit directly to `main`** - Always create a branch first
2. **Always sync `main` before creating branches** - `git pull origin main`
3. **Use the helper script** - `./scripts/create-branch.sh fix/name`
4. **AI Assistant: Use `./scripts/ai-create-branch.sh`** - Wrapper that enforces proper workflow
5. **Check divergence regularly** - `git log main..origin/main`
6. **Reset local main if needed** - `git reset --hard origin/main` (only if you're sure!)

## For AI Assistants

**IMPORTANT:** When creating branches programmatically, always use:
```bash
./scripts/ai-create-branch.sh fix/name
```

This wrapper script:
- ✅ Enforces using the proper branch creation workflow
- ✅ Prevents creating branches from outdated main
- ✅ Ensures branches are always based on latest origin/main
- ✅ Reduces PR conflicts significantly

## Why This Matters

- ✅ Prevents merge conflicts in PRs
- ✅ Keeps your local repo in sync with remote
- ✅ Makes collaboration smoother
- ✅ Reduces time spent resolving conflicts
- ✅ Follows Git best practices

