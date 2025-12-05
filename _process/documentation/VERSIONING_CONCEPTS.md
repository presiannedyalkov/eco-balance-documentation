# Versioning Concepts: Monthly vs Daily Versions

**Created:** November 16, 2025  
**Purpose:** Explain the distinction between monthly and daily versioning  
**Status:** Active

---

## Overview

This project uses **two types of versions** for different purposes:

1. **Monthly Version** (`v2025-11`) - For releases and major releases
2. **Daily Version** (`v2025-11-16`) - For exports and documentation snapshots

---

## Monthly Version (vYYYY-MM)

### Purpose
- **Major releases** and stable release points
- **Version tracking** in the `VERSION` file
- **Release automation** when `VERSION` file changes
- **Stable reference points** for the project state

### Format
- Pattern: `vYYYY-MM`
- Example: `v2025-11` (November 2025)
- Stored in: `VERSION` file

### When It Changes
- **Automatically:** On the last day of each month at 23:59 UTC via monthly-release workflow
- **Manually:** Can be triggered manually via GitHub Actions UI
- **Updated by:** Monthly release workflow (automatically updates `VERSION` file)
- **Triggers:** 
  - Deployment workflow (when `VERSION` file changes)
  - Release automation workflow (creates GitHub release)

### Usage
- **Release tags:** `v2025-11`
- **Release names:** "Release v2025-11 (Monthly)"
- **GitHub Releases:** Created by `.github/workflows/release-automation.yml`
- **Release Notes:** Stored in `_versions/v2025.11/RELEASE_NOTES.md`
- **Documentation:** Referenced in release notes and changelogs
- **Deployment:** Triggers automatic deployment when `VERSION` file changes

### Example
```bash
# Monthly release workflow runs on last day of month:
1. Calculates version: 2025-12
2. Updates VERSION file: 2025-12
3. Creates release notes: _versions/v2025.12/RELEASE_NOTES.md
4. Commits changes to repository

# VERSION file change triggers:
- Deployment workflow (deploys site)
- Release automation workflow (creates GitHub release)

# Creates release:
Tag: v2025-12
Name: Release v2025-12 (Monthly)
Release Notes: Comprehensive changelog with statistics
```

---

## Daily Version (vYYYY-MM-DD)

### Purpose
- **Documentation exports** (PDF/EPUB)
- **Daily snapshots** of documentation
- **Export tracking** and file naming
- **Frequent updates** without changing project version

### Format
- Pattern: `vYYYY-MM-DD`
- Example: `v2025-11-16` (November 16, 2025)
- Generated from: Current date at export time

### When It Changes
- Every time documentation is exported
- Automatically generated from the current date
- No manual updates needed

### Usage
- **Export file names:** `eco-balance-documentation-v2025-11-16.epub`
- **Export release tags:** `v2025-11-16`
- **Export release names:** "Documentation Export v2025-11-16 (Daily)"
- **GitHub Releases:** Created by `.github/workflows/export-docs.yml`

### Example
```bash
# Export on November 16, 2025 creates:
File: eco-balance-documentation-v2025-11-16.epub
Tag: v2025-11-16
Name: Documentation Export v2025-11-16 (Daily)
```

---

## Comparison

| Aspect | Monthly Version | Daily Version |
|--------|----------------|---------------|
| **Format** | `v2025-11` | `v2025-11-16` |
| **Source** | `VERSION` file | Current date |
| **Frequency** | Monthly (automatic) | Every export |
| **Purpose** | Project releases | Documentation exports |
| **Workflow** | `release-automation.yml` | `export-docs.yml` |
| **Release Type** | Full release | Pre-release |
| **Stability** | Stable milestone | Daily snapshot |

---

## Workflow Behavior

### Export Workflow (Daily Version)
```yaml
# .github/workflows/export-docs.yml
- Creates release with tag: v2025-11-16
- File names: eco-balance-documentation-v2025-11-16.epub
- Release type: Pre-release
- Trigger: On documentation changes or manual trigger
```

### Monthly Release Workflow
```yaml
# .github/workflows/monthly-release.yml
- Schedule: Last day of month at 23:59 UTC
- Calculates next version (YYYY-MM format)
- Checks for changes since last release
- Generates comprehensive changelog
- Creates release notes in _versions/vYYYY.MM/
- Updates VERSION file automatically
- Commits and pushes changes
- Trigger: Scheduled or manual (workflow_dispatch)
```

### Release Automation (Monthly Version)
```yaml
# .github/workflows/release-automation.yml
- Creates release with tag: v2025-11
- File names: Uses exports from latest daily version
- Release type: Full release
- Trigger: When VERSION file changes (from monthly-release workflow)
- Includes: Comprehensive changelog with statistics, file changes, diff links
```

---

## File Naming

### Export Files
- **Pattern:** `eco-balance-documentation-v{DAILY_VERSION}.{ext}`
- **Example:** `eco-balance-documentation-v2025-11-16.epub`
- **Uses:** Daily version (date-based)

### Release Files
- **Pattern:** Same as export files (attached from latest exports)
- **Tagged with:** Monthly version (`v2025-11`)
- **Contains:** Latest export files available at release time

---

## Best Practices

### When to Use Monthly Version
- ✅ Creating a major release
- ✅ Major documentation updates
- ✅ Significant feature additions
- ✅ Breaking changes
- ✅ Monthly project reviews

### When to Use Daily Version
- ✅ Regular documentation exports
- ✅ Daily documentation snapshots
- ✅ Testing export functionality
- ✅ Sharing latest documentation
- ✅ Continuous documentation updates

---

## Version History

### Monthly Versions
- `v2025-11` - November 2025 release
- `v2025-12` - December 2025 release (future)

### Daily Versions
- `v2025-11-16` - Export from November 16, 2025
- `v2025-11-17` - Export from November 17, 2025
- Multiple daily versions can exist within the same month

---

## GitHub Releases

Both version types create GitHub Releases:

1. **Monthly Releases** (`v2025-11`)
   - Full releases
   - Include release notes
   - Marked as stable

2. **Daily Releases** (`v2025-11-16`)
   - Pre-releases
   - Automated exports
   - Marked as pre-release

**View all releases:** [GitHub Releases](https://github.com/presiannedyalkov/eco-balance-documentation/releases)

---

---

## 📚 Monthly Release Process

The monthly version is now automatically managed by the **Monthly Release Workflow**:

### Automatic Process

1. **Scheduled Trigger:** Last day of each month at 23:59 UTC
2. **Version Calculation:** Automatically determines next version (YYYY-MM)
3. **Change Detection:** Checks if there are changes since last release
4. **Changelog Generation:** Creates comprehensive changelog with:
   - Commit list since last release
   - File statistics (added/modified/deleted)
   - Lines changed statistics
   - Diff URLs for comparison
5. **Release Notes:** Saves to `_versions/vYYYY.MM/RELEASE_NOTES.md`
6. **VERSION Update:** Updates `VERSION` file automatically
7. **Deployment:** VERSION file change triggers deployment
8. **GitHub Release:** Release automation creates GitHub release

### Manual Triggers

You can also trigger a monthly release manually:
- Via GitHub Actions UI: **Actions** → **Monthly Release** → **Run workflow**
- Options available:
  - Specify custom version (optional)
  - Force release even if no changes detected

### Release Artifacts

Each monthly release creates:
- **Release Notes:** `_versions/vYYYY.MM/RELEASE_NOTES.md` (in repository)
- **GitHub Release:** With tag `vYYYY-MM` and comprehensive changelog
- **Git Tag:** `vYYYY-MM` format
- **Deployed Site:** Updated documentation site

For complete details, see: [Monthly Release Process Guide](MONTHLY_RELEASE_PROCESS.md)

---

**Last Updated:** December 2025 (Updated to include monthly release process)

