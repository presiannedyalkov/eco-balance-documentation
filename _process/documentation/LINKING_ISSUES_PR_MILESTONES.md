# Linking Issues, PRs, and Branches to Milestones

**Created:** December 2025  
**Purpose:** Guide for linking GitHub Issues, Pull Requests, and Branches to Milestones

---

## 🔗 How to Link Issues to Milestones

### Method 1: Via GitHub CLI

```bash
# Link an issue to a milestone by milestone number
gh issue edit <ISSUE_NUMBER> --milestone <MILESTONE_NUMBER>

# Example: Link issue #10 to milestone #2 (2025.12)
gh issue edit 10 --milestone 2
```

### Method 2: Via GitHub API

```bash
# Get milestone number first
gh api repos/presiannedyalkov/eco-balance-documentation/milestones --jq '.[] | "\(.number): \(.title)"'

# Link issue to milestone
gh api repos/presiannedyalkov/eco-balance-documentation/issues/<ISSUE_NUMBER> \
  -X PATCH \
  -f milestone=<MILESTONE_NUMBER>
```

### Method 3: Via GitHub UI

1. Go to the issue
2. Click on the right sidebar "Milestones"
3. Select the milestone from dropdown

---

## 🔗 How to Link PRs to Milestones

### Method 1: Via GitHub CLI

```bash
# Link a PR to a milestone
gh pr edit <PR_NUMBER> --milestone <MILESTONE_NUMBER>

# Example: Link PR #247 to milestone #2 (2025.12)
gh pr edit 247 --milestone 2
```

### Method 2: Via GitHub API

```bash
# Link PR to milestone
gh api repos/presiannedyalkov/eco-balance-documentation/pulls/<PR_NUMBER> \
  -X PATCH \
  -f milestone=<MILESTONE_NUMBER>
```

### Method 3: Via GitHub UI

1. Go to the PR
2. Click on the right sidebar "Milestones"
3. Select the milestone from dropdown

### Method 4: Automatic via Branch Name (Already Implemented)

The `milestone-automation.yml` workflow automatically links PRs to milestones based on branch name patterns:

- Branch: `feature/2025.12-monthly-release` → Links to milestone "2025.12"
- Branch: `fix/2026.01-content-update` → Links to milestone "2026.01"
- Branch: `update/dependabot-prs` → No automatic link (use manual method)

**Pattern:** `YYYY.MM` or `YYYY.Q#` in branch name

---

## 🔗 How to Link Branches to Milestones

Branches are linked indirectly through PRs. When you create a PR from a branch, the PR gets linked to the milestone.

**Best Practice:** Use milestone pattern in branch name:
- ✅ `feature/2025.12-monthly-release`
- ✅ `fix/2026.01-content-quality`
- ❌ `feature/monthly-release` (no milestone pattern)

---

## 📋 Current Milestones

### Active Milestones

1. **#2: 2025.12 - Versioning & Roadmap System** (Due: 2025-12-31)
2. **#3: 2026.01 - Content & Quality** (Due: 2026-01-31)
3. **#4: 2026.Q1 - Interactive Features** (Due: 2026-03-31)
4. **#5: 2026.Q2 - Advanced Features** (Due: 2026-06-30)

### Completed Milestones

1. **#1: 2025.11 - Documentation Platform Launch** (COMPLETED)

---

## 🎯 Recommended Milestone Assignments

### For 2025.12 - Versioning & Roadmap System

**Completed Work:**
- ✅ Monthly Release System (PR #247) - Should be linked
- ✅ Dependabot Updates (PR #248) - Should be linked
- ✅ Documentation Updates - Should be linked

**Issues to Create:**
- Monthly Release Strategy Implementation
- GitHub Actions Dependencies Update
- Documentation System Updates

### For 2026.01 - Content & Quality

**Completed Work:**
- ✅ Documentation Export Formats (EPUB & PDF) - Already completed, should be closed

**Issues to Create:**
- Remove Manual Last Updated Dates (completed)
- Documentation Export Formats (mark as completed)

---

## 🛠️ Commands Reference

### Get Milestone Numbers

```bash
gh api repos/presiannedyalkov/eco-balance-documentation/milestones \
  --jq '.[] | "\(.number): \(.title)"'
```

### Link PR to Milestone

```bash
# Get PR number and milestone number, then:
gh pr edit <PR_NUMBER> --milestone <MILESTONE_NUMBER>
```

### Create Issue and Link to Milestone

```bash
# Create issue
gh issue create --title "Title" --body "Description" --milestone <MILESTONE_NUMBER>
```

### Bulk Link PRs

```bash
# Link multiple PRs to a milestone
for pr in 247 248; do
  gh pr edit $pr --milestone 2
done
```

---

## 📝 Best Practices

1. **Branch Naming:** Include milestone pattern in branch name for automatic linking
2. **PR Description:** Mention milestone in PR description
3. **Issue Creation:** Create issues for features, link to milestones
4. **Close Issues:** When PR is merged, close related issues
5. **Milestone Progress:** GitHub automatically tracks progress based on closed issues

---

**Last Updated:** December 2025

