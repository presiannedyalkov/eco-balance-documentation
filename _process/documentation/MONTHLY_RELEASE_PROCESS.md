# Monthly Release Process - User Guide

**Created:** December 2025  
**Purpose:** Complete guide to understanding and using the monthly release system  
**Status:** Active Documentation

---

## 📋 Overview

The project uses a **monthly scheduled release system** that automatically:
- Batches changes throughout the month
- Creates comprehensive changelogs
- Deploys documentation once per month
- Creates GitHub releases with full statistics

This replaces the previous continuous deployment model where every push to `main` triggered a deployment.

---

## 🎯 Key Concepts

### Monthly Releases
- **Frequency:** Once per month (last day of month at 23:59 UTC)
- **Version Format:** `YYYY-MM` (e.g., `2025-12`)
- **Automatic:** No manual intervention required
- **Comprehensive:** Includes changelogs, statistics, and diffs

### Change Accumulation
- All changes to `main` branch accumulate during the month
- No deployment happens until the monthly release
- Monthly release batches all changes together
- Single deployment with comprehensive changelog

### Release Artifacts
Each monthly release creates:
- **Release Notes:** `_versions/vYYYY.MM/RELEASE_NOTES.md` (in repository)
- **GitHub Release:** Tagged `vYYYY-MM` with comprehensive changelog
- **Git Tag:** `vYYYY-MM` format
- **Deployed Site:** Updated documentation site

---

## 🔄 How It Works

### Automatic Monthly Release Flow

```
1. Schedule Trigger (Last Day of Month, 23:59 UTC)
   ↓
2. Check if it's actually the last day of month
   ↓
3. Calculate next version (YYYY-MM format)
   ↓
4. Check if version already exists
   ↓
5. Check for changes since last release
   ↓
6. Generate comprehensive changelog:
   - Commit list since last release
   - File statistics (added/modified/deleted)
   - Lines changed statistics
   - Diff URLs for comparison
   ↓
7. Create release notes in _versions/vYYYY.MM/RELEASE_NOTES.md
   ↓
8. Update VERSION file automatically
   ↓
9. Push to release branch (e.g. release/YYYY-MM) and open PR to main
   ↓
10. You merge the PR → VERSION file change on main triggers deployment workflow
    ↓
11. Deployment happens automatically
    ↓
12. Release automation creates GitHub release
    ↓
13. Sentry release created (if configured)
```

---

## 📅 Release Schedule

### Automatic Releases
- **First Release:** End of December 2025
- **Subsequent Releases:** Last day of each month at 23:59 UTC
- **Timezone:** UTC (Coordinated Universal Time)

### Example Schedule
- **December 2025:** December 31, 2025 at 23:59 UTC
- **January 2026:** January 31, 2026 at 23:59 UTC
- **February 2026:** February 28, 2026 at 23:59 UTC (leap year: Feb 29)

---

## 🚀 Manual Triggers

You can manually trigger a monthly release at any time:

### Via GitHub Actions UI

1. Go to your repository on GitHub
2. Click on **Actions** tab
3. Select **Monthly Release** workflow from the left sidebar
4. Click **Run workflow** button (top right)
5. Configure options:
   - **Version (optional):** Specify custom version (YYYY-MM format)
   - **Force:** Check to force release even if no changes detected
6. Click **Run workflow**

### When to Use Manual Triggers

- **Urgent Updates:** Need to deploy critical changes immediately
- **Testing:** Test the release process before scheduled run
- **Special Releases:** Create a release outside normal schedule
- **Recovery:** Re-run a failed release

---

## 📊 What Gets Released

### Release Notes Content

Each monthly release includes:

1. **Release Information**
   - Release date
   - Version number
   - Previous version

2. **Statistics**
   - Number of commits since last release
   - Files changed (added/modified/deleted)
   - Lines changed
   - Contributors

3. **Changes Since Last Release**
   - Complete commit list with messages
   - Diff summary with link to full diff
   - File change details

4. **Related Links**
   - Full diff URL
   - Documentation link
   - GitHub release link

### Example Release Notes Structure

```markdown
## Release Notes - 2025.12

**Release Date:** December 31, 2025
**Version:** 2025.12
**Previous Version:** 2025.11

---

## 📈 Statistics

- **Commits:** 20 commits since v2025-11
- **Files Changed:** 15 files
  - Added: 3 files
  - Modified: 10 files
  - Deleted: 2 files
- **Lines Changed:** 150 insertions(+), 50 deletions(-)

---

## 🔄 Changes Since Last Release

### Commits
- feat: Add new documentation section
- fix: Correct typo in introduction
- docs: Update roadmap information
...

### Diff Summary
[View full diff](https://github.com/.../compare/v2025-11...v2025-12)
```

---

## 📁 Release Artifacts Location

### In Repository

**Release Notes:**
- Location: `_versions/vYYYY.MM/RELEASE_NOTES.md`
- Example: `_versions/v2025.12/RELEASE_NOTES.md`
- Contains: Full changelog and statistics

**VERSION File:**
- Location: `VERSION` (root of repository)
- Contains: Current version (e.g., `2025-12`)
- Updated: Automatically by monthly-release workflow

### On GitHub

**GitHub Releases:**
- URL: `https://github.com/presiannedyalkov/eco-balance-documentation/releases`
- Tag Format: `vYYYY-MM` (e.g., `v2025-12`)
- Release Name: "Release v2025-12 (Monthly)"
- Includes: Full changelog, statistics, diff links

**Git Tags:**
- Format: `vYYYY-MM`
- Created: Automatically by release-automation workflow
- Links: To specific commit in repository

---

## 🔍 Monitoring Releases

### Check Release Status

1. **GitHub Actions:**
   - Go to **Actions** tab
   - Look for **Monthly Release** workflow runs
   - Check execution status and logs

2. **GitHub Releases:**
   - Go to **Releases** page
   - View latest release with changelog
   - Check release date and version

3. **Repository Files:**
   - Check `VERSION` file for current version
   - Check `_versions/vYYYY.MM/RELEASE_NOTES.md` for release notes

### Workflow Run Status

Each monthly release workflow run shows:
- ✅ **Success:** Release branch pushed and PR opened. **Merge the PR** to update `main` and trigger deployment (required when `main` is protected).
- ⚠️ **Skipped:** No changes detected, or version already exists (use `force` to override).
- ❌ **Failed:** Error occurred (check logs).

---

## 🛠️ Troubleshooting

### Release Didn't Run

**Check:**
1. Is it the last day of the month?
2. Are there changes since last release?
3. Check workflow logs in GitHub Actions

**Solution:**
- Manually trigger the workflow if needed
- Use `force` option to create release anyway

### Deployment Didn't Happen

**Check:**
1. Did the monthly release workflow complete successfully?
2. Did you **merge the release PR** into `main`? (Required when `main` is protected.)
3. Was the `VERSION` file updated on `main`?
4. Check deployment workflow logs

**Solution:**
- When `main` is protected, the workflow opens a PR instead of pushing. **Merge the release PR** (e.g. `release/2026-01` → `main`) to update `VERSION` on `main` and trigger deployment.
- Deployment runs automatically when `VERSION` changes on `main`.
- You can manually trigger deployment from the Actions tab if needed.

### Workflow Failed: "Protected branch" / "Changes must be made through a pull request"

**Cause:** The `main` branch has branch protection that blocks direct pushes. The workflow is designed for this: it pushes to a **release branch** (e.g. `release/2026-01`) and opens a **Pull Request** to `main`.

**What to do:**
1. After the workflow runs, open the **Actions** run and check the summary for the PR link.
2. Open the PR (e.g. "chore: release v2026-01") and merge it into `main`.
3. Merging updates `VERSION` on `main` and triggers deploy + release creation.

**Optional:** If you prefer the workflow to push directly to `main`, add the GitHub Actions bot to the branch protection bypass list: **Settings → Branches → Edit rule for main → Allow specified actors to bypass required pull requests** and add `github-actions[bot]`. Then you can change the workflow back to pushing to `main` if desired.

### Release Notes Missing

**Check:**
1. Look in `_versions/vYYYY.MM/RELEASE_NOTES.md`
2. Check if monthly release workflow completed
3. Verify release notes step in workflow logs

**Solution:**
- Release notes are created during monthly release
- Check workflow logs for errors
- Manually trigger release if needed

### Version Already Exists

**Check:**
1. Current `VERSION` file content
2. Existing GitHub releases
3. Workflow logs for version check

**Solution:**
- Workflow skips if version already exists
- Use `force` option to override
- Or specify different version manually

---

## 📝 Best Practices

### During the Month

- ✅ **Make Changes Freely:** All changes accumulate during the month
- ✅ **Commit Regularly:** Normal commit workflow continues
- ✅ **Merge PRs:** Standard pull request process unchanged
- ✅ **No Deployment:** Changes won't deploy until monthly release

### Before Monthly Release

- ✅ **Review Changes:** Check what will be included in release
- ✅ **Test Locally:** Ensure site builds correctly
- ✅ **Update Documentation:** Make sure docs are current

### After Monthly Release

- ✅ **Verify Deployment:** Check that site updated correctly
- ✅ **Review Release Notes:** Ensure changelog is accurate
- ✅ **Check GitHub Release:** Verify release was created
- ✅ **Monitor Site:** Ensure everything works as expected

---

## 🔗 Related Documentation

- [Monthly Release Strategy](MONTHLY_RELEASE_STRATEGY.md) - Strategy document
- [Monthly Release Implementation](MONTHLY_RELEASE_IMPLEMENTATION.md) - Technical implementation details
- [Versioning Concepts](VERSIONING_CONCEPTS.md) - Understanding monthly vs daily versions
- [GitHub Pages Setup](GITHUB_PAGES_SETUP.md) - Deployment setup guide
- [Deployment Ready](DEPLOYMENT_READY.md) - Deployment status

---

## ❓ Frequently Asked Questions

### Q: Can I deploy changes immediately?

**A:** Yes, you can manually trigger a monthly release at any time via GitHub Actions UI. This will create a release and deploy immediately.

### Q: What if I need to deploy urgent fixes?

**A:** Use the manual trigger option in GitHub Actions. The monthly release workflow can be triggered immediately with the `force` option if needed.

### Q: How do I know what will be in the next release?

**A:** Check the commits since the last release tag. The monthly release workflow will show all commits that will be included in the changelog.

### Q: Can I skip a monthly release?

**A:** The workflow automatically skips if no changes are detected. You can also manually skip by not triggering the workflow, but this is not recommended.

### Q: What happens if the monthly release fails?

**A:** Check the workflow logs for errors. You can manually trigger the release again, or fix any issues and retry.

### Q: How do I view past releases?

**A:** 
- **GitHub Releases:** https://github.com/presiannedyalkov/eco-balance-documentation/releases
- **Release Notes:** `_versions/vYYYY.MM/RELEASE_NOTES.md` files in repository
- **Git Tags:** `vYYYY-MM` tags in repository

---

**Last Updated:** December 2025

