# Collaborator Guide - Making Pull Requests

**Purpose:** Guide for contributors who want to make changes to this repository  
**Last Updated:** November 2025

---

## 🎯 Two Ways to Contribute

### Option 1: Fork & Pull Request (Recommended for External Contributors)

**Best for:** People you don't know well, open source contributors, one-time contributions

**Steps:**

1. **Fork the Repository**
   - Go to: https://github.com/presiannedyalkov/eco-balance-documentation
   - Click the "Fork" button in the top right
   - This creates a copy in their GitHub account

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/THEIR-USERNAME/eco-balance-documentation.git
   cd eco-balance-documentation
   ```

3. **Add Upstream Remote** (to sync with original repo)
   ```bash
   git remote add upstream https://github.com/presiannedyalkov/eco-balance-documentation.git
   ```

4. **Create a Branch**
   ```bash
   git checkout -b feature/their-feature-name
   # or
   git checkout -b fix/their-fix-name
   ```

5. **Make Changes**
   - Edit files
   - Test changes locally
   - Commit changes

6. **Push to Your Fork**
   ```bash
   git push origin feature/their-feature-name
   ```

7. **Open Pull Request**
   - Go to your fork on GitHub
   - Click "Compare & pull request"
   - Fill out PR description
   - Submit PR

8. **Keep Fork Updated** (if working over time)
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   git push origin main
   ```

**Advantages:**
- ✅ No access management needed
- ✅ Standard open source workflow
- ✅ Safe - can't accidentally break main repo
- ✅ Works for anyone

**Disadvantages:**
- ⚠️ Need to keep fork synced
- ⚠️ Slightly more steps

---

### Option 2: Direct Collaborator Access

**Best for:** Trusted team members, regular contributors, people you work with closely

**Setup (Repository Owner):**

1. Go to repository Settings
2. Click "Collaborators" in left sidebar
3. Click "Add people"
4. Enter their GitHub username or email
5. Select permission level:
   - **Read**: Can view and clone
   - **Write**: Can push branches and create PRs (recommended)
   - **Admin**: Full access (use carefully)
6. They receive an email invitation
7. They accept the invitation

**Steps for Collaborator:**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/presiannedyalkov/eco-balance-documentation.git
   cd eco-balance-documentation
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/their-feature-name
   # or
   git checkout -b fix/their-fix-name
   ```

3. **Make Changes**
   - Edit files
   - Test changes locally
   - Commit changes

4. **Push Branch**
   ```bash
   git push origin feature/their-feature-name
   ```

5. **Open Pull Request**
   - Go to repository on GitHub
   - Click "Compare & pull request" (appears after push)
   - Fill out PR description
   - Submit PR

**Advantages:**
- ✅ Simpler workflow
- ✅ Direct access to repo
- ✅ Easier collaboration

**Disadvantages:**
- ⚠️ Requires access management
- ⚠️ Need to trust collaborator
- ⚠️ Can push branches directly (though PRs still recommended)

---

## 📋 Branch Naming Convention

**Recommended format:**
- `feature/YYYY.MM-short-description` (e.g., `feature/2025.12-versioning-system`)
- `fix/YYYY.MM-short-description` (e.g., `fix/2025.12-release-fix`)
- `docs/YYYY.MM-short-description` (e.g., `docs/2025.12-roadmap-update`)

**Or simpler:**
- `feature/their-feature-name`
- `fix/their-fix-name`
- `docs/their-doc-update`

---

## ✅ Pull Request Checklist

Before submitting a PR, make sure:

- [ ] Changes are tested locally
- [ ] Code follows project style (if applicable)
- [ ] Documentation is updated (if needed)
- [ ] Commit messages are clear
- [ ] PR description explains what and why
- [ ] No breaking changes (or they're documented)

---

## 🔄 Workflow Summary

### For Fork Contributors:
```
Fork → Clone → Branch → Edit → Commit → Push → PR → Review → Merge
```

### For Collaborators:
```
Clone → Branch → Edit → Commit → Push → PR → Review → Merge
```

---

## 🛡️ Branch Protection (If Enabled)

If the `main` branch is protected (recommended):
- ✅ All changes must go through PRs
- ✅ PRs require review before merging
- ✅ Direct pushes to `main` are blocked
- ✅ This applies to both forks and collaborators

This is a **good thing** - it protects the main branch!

---

## 📝 Example PR Description Template

```markdown
## Description
[Brief description of what this PR does]

## Type of Change
- [ ] Feature
- [ ] Bug fix
- [ ] Documentation
- [ ] Refactoring
- [ ] Other

## Testing
[How was this tested?]

## Screenshots (if applicable)
[Add screenshots here]
```

---

## ❓ Questions?

If you need help:
1. Check existing PRs for examples
2. Ask in PR comments
3. Contact repository maintainer

---

**Note:** The repository owner can always review, request changes, or merge PRs. This ensures quality and consistency.

