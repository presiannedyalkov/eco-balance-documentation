# Contributing to Eco Balance Documentation

**⚠️ IMPORTANT: All changes must go through Pull Requests. Direct pushes to `main` are NOT allowed.**

---

## 🚫 Branch Protection Rules

**The `main` branch is protected. You CANNOT:**
- ❌ Push directly to `main`
- ❌ Force push to `main`
- ❌ Delete `main`
- ❌ Merge without a Pull Request

**You MUST:**
- ✅ Create a branch for your changes
- ✅ Open a Pull Request
- ✅ Get approval (if required)
- ✅ Merge via PR only

---

## 📋 Workflow: Making Changes

### Step 1: Create a Branch

**ALWAYS create a branch before making changes:**

**Option A: Use the helper script (Recommended - prevents conflicts):**
```bash
# Automatically syncs main and creates branch
./scripts/create-branch.sh fix/your-fix-name
```

**Option B: Manual steps:**
```bash
# Make sure you're on main and up to date
git checkout main
git pull origin main

# Create a new branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-fix-name
# or
git checkout -b docs/your-doc-update
```

**⚠️ Important:** Always sync `main` before creating branches to avoid conflicts. See `_process/git/BRANCH_CREATION_BEST_PRACTICES.md` for details.

**Branch naming convention:**
- `feature/YYYY.MM-short-description` (e.g., `feature/2025.12-versioning-system`)
- `fix/YYYY.MM-short-description` (e.g., `fix/2025.12-milestone-sync`)
- `docs/YYYY.MM-short-description` (e.g., `docs/2025.12-roadmap-update`)
- Or simpler: `feature/description`, `fix/description`, `docs/description`

### Step 2: Make Your Changes

- Edit files
- Test locally (run `npm start` to preview docs)
- Commit your changes

```bash
git add .
git commit -m "Clear description of what you changed"
```

### Step 3: Push Your Branch

```bash
git push origin feature/your-feature-name
```

**⚠️ If you try to push to `main`, it will be blocked!**

### Step 4: Open a Pull Request

1. Go to the repository on Gitea: `https://gitea.nexus-home.cc/pres/eco-balance-documentation`
2. Click "New Pull Request" (Gitea offers it after you push a branch)
3. Fill out the PR template
4. Submit the PR

> **Not a maintainer?** The Gitea instance is private, so the flow above only
> works if you have access to it. The GitHub copy is a read-only mirror — pull
> requests opened there are not seen and pushes to it are overwritten on the
> next sync. To suggest a change to the documentation, use the annotation tool
> on [docs.eco-balance.cc](https://docs.eco-balance.cc): select any passage,
> leave a comment or suggestion, and it arrives as an issue in the queue.

### Step 5: Review and Merge

- Wait for review
- Address any feedback
- Once approved, the PR can be merged
- Merging automatically triggers deployment

---

## 🤖 For AI Assistants

**If you are an AI assistant helping with this repository:**

1. **NEVER push directly to `main`**
   - Always create a branch first
   - Check current branch: `git branch` or `git status`
   - If on `main`, create a branch: `git checkout -b feature/description`

2. **Before committing, check:**
   ```bash
   git status  # Shows current branch
   git branch  # Lists all branches, * shows current
   ```

3. **If you're on `main` and need to make changes:**
   ```bash
   # STOP - Don't commit to main!
   # Create a branch first:
   git checkout -b feature/your-changes
   # Then make your changes and commit
   ```

4. **If you accidentally committed to `main`:**
   ```bash
   # Create a branch from current state
   git checkout -b feature/your-changes
   # Reset main to previous state
   git checkout main
   git reset --hard origin/main
   # Go back to your branch
   git checkout feature/your-changes
   # Now push your branch
   git push origin feature/your-changes
   ```

5. **Always verify before pushing:**
   ```bash
   git status  # Check branch
   git log --oneline -5  # Check recent commits
   # Only push if you're on a feature branch, not main!
   ```

---

## ✅ Pre-Commit Checklist

Before committing, verify:

- [ ] I'm on a feature/fix/docs branch (NOT `main`)
- [ ] I've tested my changes locally
- [ ] My commit message is clear
- [ ] I'm ready to create a PR after pushing

**Check your branch:**
```bash
git branch
# Should show: * feature/your-branch-name
# NOT: * main
```

---

## 🛡️ Branch Protection (GitHub Settings)

**Repository owner must enable these settings:**

1. Go to: Settings → Branches → Branch protection rules
2. Add rule for `main` branch:
   - ✅ Require a pull request before merging
   - ✅ Require approvals (optional, but recommended)
   - ✅ Require status checks to pass (deployment, verification)
   - ✅ Require branches to be up to date before merging
   - ✅ Do not allow bypassing the above settings
   - ✅ Restrict who can push to matching branches (nobody)

**This prevents:**
- Direct pushes to `main`
- Force pushes
- Deletion of `main`
- Merging without PR

---

## 📝 Pull Request Template

When opening a PR, use this template:

```markdown
## Description
[What does this PR do?]

## Type of Change
- [ ] Feature
- [ ] Bug fix
- [ ] Documentation
- [ ] Refactoring
- [ ] Other

## Testing
[How was this tested?]

## Checklist
- [ ] Changes tested locally
- [ ] Documentation updated (if needed)
- [ ] No breaking changes (or documented)
- [ ] Follows project style guidelines
```

---

## 🚨 Common Mistakes to Avoid

1. **❌ Committing to `main`**
   - ✅ Always create a branch first

2. **❌ Pushing to `main`**
   - ✅ Push to your feature branch instead

3. **❌ Force pushing**
   - ✅ Use regular push, or rebase if needed

4. **❌ Skipping PR**
   - ✅ All changes must go through PR

## 🔧 Fixing PR Conflicts

If your PR has conflicts with `main`, use the helper script:

```bash
# Automatically fixes conflicts by:
# 1. Finding your unique commits
# 2. Resetting branch to origin/main
# 3. Cherry-picking your commits back
# 4. Force pushing (safe with --force-with-lease)

./scripts/fix-pr-conflicts.sh [branch-name]
```

**Manual method:**
```bash
# 1. Fetch latest
git fetch origin

# 2. Switch to your branch
git checkout your-branch-name

# 3. Reset to origin/main and cherry-pick your commits
git reset --hard origin/main
git cherry-pick <commit-sha-1> <commit-sha-2> ...

# 4. Force push (safe)
git push origin your-branch-name --force-with-lease
```

**Why conflicts happen:**
- Branch was created from outdated `main`
- Other PRs were merged while you were working
- Local `main` wasn't synced before creating branch

**Prevention:**
- Always use `./scripts/create-branch.sh` to create branches
- This automatically syncs `main` first

---

## 🔄 Sync Your Fork (If Using Fork Workflow)

```bash
# Add upstream remote (Gitea is upstream; the GitHub copy is a mirror of it)
git remote add upstream https://gitea.nexus-home.cc/pres/eco-balance-documentation.git

# Fetch latest changes
git fetch upstream

# Update your main branch
git checkout main
git merge upstream/main

# Update your feature branch
git checkout feature/your-branch
git rebase main  # or merge main into your branch
```

---

## 📚 Additional Resources

- [Collaborator Access Guide](_process/documentation/COLLABORATOR_ACCESS.md)
- [Collaborator Guide](_process/documentation/COLLABORATOR_GUIDE.md)
- [Gitea Branch Protection Docs](https://docs.gitea.com/usage/protected-branches)

---

## ❓ Need Help?

- Check existing PRs for examples
- Review the guides in `_process/documentation/`
- Contact repository maintainer

---

**Remember: All changes go through Pull Requests. No exceptions.**

