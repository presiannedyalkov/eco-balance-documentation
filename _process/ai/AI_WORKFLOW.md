# AI Assistant Workflow Guidelines

## Branch Creation

**ALWAYS use the branch creation script when creating new branches:**

```bash
./scripts/ai-create-branch.sh fix/description
```

**Why:**
- Prevents PR conflicts by ensuring branches are based on latest `origin/main`
- Automatically syncs local `main` before creating branch
- Handles stashing/unstashing of uncommitted changes
- Follows best practices documented in `_process/git/BRANCH_CREATION_BEST_PRACTICES.md`

**Never:**
- ❌ `git checkout -b fix/name` (may be based on outdated main)
- ❌ `git checkout main && git checkout -b fix/name` (may skip syncing)
- ✅ Always use: `./scripts/ai-create-branch.sh fix/name`

## Fixing PR Conflicts

If a PR has conflicts, use the conflict fixing script:

```bash
./scripts/fix-pr-conflicts.sh [branch-name]
```

This automatically:
1. Finds unique commits in the branch
2. Resets branch to `origin/main`
3. Cherry-picks commits back
4. Force pushes safely

## Workflow Checklist

Before creating a branch:
- [ ] Use `./scripts/ai-create-branch.sh` (never create branches manually)
- [ ] Verify branch name follows convention: `fix/`, `feature/`, or `docs/`

After creating a branch:
- [ ] Make changes
- [ ] Commit with clear messages
- [ ] Push branch
- [ ] Create PR

If PR has conflicts:
- [ ] Use `./scripts/fix-pr-conflicts.sh [branch-name]`
- [ ] Verify PR is mergeable after fix

## Why This Matters

Using the script prevents:
- ❌ PR conflicts from outdated base branches
- ❌ Time wasted resolving merge conflicts
- ❌ Divergent branch history
- ❌ Force push issues

Using the script ensures:
- ✅ Branches always based on latest `origin/main`
- ✅ Clean PR history
- ✅ Smooth collaboration
- ✅ Faster PR merges

