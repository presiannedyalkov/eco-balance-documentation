# GitHub Milestones Setup Guide

**Created:** November 13, 2025  
**Purpose:** Step-by-step guide to set up GitHub Milestones and Issues  
**Status:** Ready to Execute

---

## Prerequisites

1. **GitHub CLI installed**: [Install GitHub CLI](https://cli.github.com/)
2. **Authenticated**: Run `gh auth login` to authenticate
3. **Repository access**: Ensure you have write access to the repository

---

## Quick Start

### Step 1: Create Milestones

```bash
./scripts/setup_github_milestones.sh
```

This will create:
- `2025.11 - Documentation Platform Launch` (COMPLETED)
- `2025.12 - Versioning & Roadmap System`
- `2026.01 - Content & Quality`
- `2026.Q1 - Interactive Features`
- `2026.Q2 - Advanced Features`

### Step 2: Create Initial Issues

```bash
./scripts/create_github_issues.sh
```

This will create issues for:
- GitHub Milestones & Roadmap Integration
- Documentation Export Formats (EPUB & PDF)
- Research Bookmarks Integration (Submodule)

### Step 3: Verify Setup

1. Check milestones: https://github.com/presiannedyalkov/eco-balance-documentation/milestones
2. Check issues: https://github.com/presiannedyalkov/eco-balance-documentation/issues

---

## Manual Setup (Alternative)

If you prefer to set up manually or the scripts don't work:

### Create Milestones via GitHub Web UI

1. Go to: https://github.com/presiannedyalkov/eco-balance-documentation/milestones
2. Click "New milestone"
3. Fill in:
   - **Title**: `2025.12 - Versioning & Roadmap System`
   - **Description**: See plan document
   - **Due date**: End of month
4. Repeat for each milestone

### Create Issues via GitHub Web UI

1. Go to: https://github.com/presiannedyalkov/eco-balance-documentation/issues
2. Click "New issue"
3. Use the issue template format from `_process/documentation/GITHUB_MILESTONES_ROADMAP_PLAN.md`
4. Link to appropriate milestone

---

## Using GitHub CLI (gh)

### Create Milestone

```bash
gh api repos/presiannedyalkov/eco-balance-documentation/milestones \
  -X POST \
  -f title="2025.12 - Versioning & Roadmap System" \
  -f description="Calendar Versioning implementation, GitHub Milestones integration" \
  -f due_on="2025-12-31T23:59:59Z"
```

### Create Issue

```bash
gh issue create \
  --repo presiannedyalkov/eco-balance-documentation \
  --title "GitHub Milestones & Roadmap Integration" \
  --body "Description here..." \
  --milestone "2025.12 - Versioning & Roadmap System" \
  --label "enhancement,documentation,high-priority"
```

### List Milestones

```bash
gh api repos/presiannedyalkov/eco-balance-documentation/milestones
```

### List Issues

```bash
gh issue list --repo presiannedyalkov/eco-balance-documentation
```

---

## Next Steps

After milestones and issues are created:

1. **Link PRs to Milestones**: Use PR templates to auto-link
2. **Set up Automation**: Create GitHub Actions workflows
3. **Create Releases**: Set up monthly release automation
4. **Sync Roadmap**: Create script to sync roadmap docs from GitHub API

See `_process/documentation/GITHUB_MILESTONES_ROADMAP_PLAN.md` for full implementation plan.

---

## Troubleshooting

### Script fails with "not authenticated"

```bash
gh auth login
```

### Script fails with "milestone already exists"

This is normal - the script will skip existing milestones. You can manually delete and recreate if needed.

### Script fails with "issue already exists"

This is normal - the script will skip existing issues. You can manually close/delete and recreate if needed.

### Need to update milestone dates

```bash
gh api repos/presiannedyalkov/eco-balance-documentation/milestones \
  --jq '.[] | select(.title == "2025.12 - Versioning & Roadmap System") | .number'
# Then update using the milestone number
```

---

**Related Documents:**
- `_process/documentation/GITHUB_MILESTONES_ROADMAP_PLAN.md` - Full implementation plan
- `docs/resources/feature-wishlist.md` - Source of features to create issues from
- `scripts/setup_github_milestones.sh` - Automation script
- `scripts/create_github_issues.sh` - Issue creation script

