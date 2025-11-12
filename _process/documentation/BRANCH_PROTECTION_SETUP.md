# Branch Protection Setup Guide

**Purpose:** Instructions for setting up branch protection rules on GitHub  
**Last Updated:** November 2025

---

## 🛡️ Setting Up Branch Protection

### Step 1: Navigate to Settings

1. Go to your repository: https://github.com/presiannedyalkov/eco-balance-documentation
2. Click **Settings** (top right, in repository menu)
3. Click **Branches** (left sidebar, under "Code and automation")

### Step 2: Add Branch Protection Rule

1. Click **Add branch protection rule**
2. In "Branch name pattern", enter: `main`
3. Configure the following settings:

#### ✅ Required Settings

**Require a pull request before merging:**
- ✅ Check "Require a pull request before merging"
- ✅ Check "Require approvals" (set to 1 or more)
- ✅ Check "Dismiss stale pull request approvals when new commits are pushed"
- ✅ Check "Require review from Code Owners" (if you have CODEOWNERS file)

**Require status checks to pass before merging:**
- ✅ Check "Require status checks to pass before merging"
- ✅ Check "Require branches to be up to date before merging"
- Select these checks:
  - `Deploy to GitHub Pages` (deploy job)
  - `Verify Deployment` (verify job)

**Restrict who can push to matching branches:**
- ✅ Check "Restrict pushes that create matching branches"
- Leave empty (nobody can push directly)

#### ⚠️ Important Settings

**Do not allow bypassing the above settings:**
- ✅ Check "Do not allow bypassing the above settings"
- This prevents even admins from bypassing (you can uncheck if you want admin override)

**Allow force pushes:**
- ❌ **DO NOT CHECK** - Force pushes should be disabled

**Allow deletions:**
- ❌ **DO NOT CHECK** - Branch deletion should be disabled

### Step 3: Save

1. Click **Create** or **Save changes**
2. The rule is now active!

---

## ✅ What This Enforces

Once enabled, these rules apply:

- ✅ **No direct pushes to `main`** - All changes must go through PRs
- ✅ **No force pushes** - Prevents rewriting history
- ✅ **No branch deletion** - Protects the main branch
- ✅ **PR required** - Can't merge without opening a PR
- ✅ **Approval required** - PRs need at least 1 approval (if configured)
- ✅ **Status checks must pass** - Deployment and verification must succeed
- ✅ **Branches must be up to date** - PRs must be rebased/merged with latest main

---

## 🧪 Testing the Protection

### Test 1: Try Direct Push (Should Fail)

```bash
git checkout main
# Make a change
git add .
git commit -m "test direct push"
git push origin main
```

**Expected:** Push will be rejected with error message

### Test 2: Try PR (Should Work)

```bash
git checkout -b test/pr-workflow
# Make a change
git add .
git commit -m "test PR workflow"
git push origin test/pr-workflow
# Open PR on GitHub
```

**Expected:** PR can be created and merged (after approval)

---

## 🔧 Advanced Settings (Optional)

### Require Linear History

- ✅ Check "Require linear history"
- Forces rebase or squash merges only
- Keeps git history clean

### Include Administrators

- ✅ Check "Include administrators"
- Even repo admins must follow rules
- Recommended for strict protection

### Allow Specified Actors to Bypass

- Only if you need emergency access
- Add specific users/teams who can bypass
- Use sparingly

---

## 📋 Summary Checklist

- [ ] Branch protection rule created for `main`
- [ ] PR required before merging
- [ ] Approvals required (1+)
- [ ] Status checks required (deploy, verify)
- [ ] Branches must be up to date
- [ ] Direct pushes restricted
- [ ] Force pushes disabled
- [ ] Branch deletion disabled
- [ ] Administrators included (optional but recommended)
- [ ] Tested: Direct push fails
- [ ] Tested: PR workflow works

---

## 🚨 Troubleshooting

**"I can't push to main"**
- ✅ This is correct! Use a branch and PR instead

**"PR can't be merged"**
- Check if status checks are passing
- Check if approvals are required
- Check if branch is up to date with main

**"I need emergency access"**
- If you're admin and "Include administrators" is unchecked, you can bypass
- Otherwise, temporarily disable protection (not recommended)
- Or add yourself to bypass list

---

## 📚 Related Documentation

- [CONTRIBUTING.md](../../CONTRIBUTING.md) - Contribution guidelines
- [Collaborator Guide](COLLABORATOR_GUIDE.md) - How to make PRs
- [GitHub Docs](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches) - Official documentation

---

**Once set up, all contributors (including AI assistants) must follow the PR workflow!**

