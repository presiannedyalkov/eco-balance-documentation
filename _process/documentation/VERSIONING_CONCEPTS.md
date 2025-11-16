# Versioning Concepts: Monthly vs Daily Versions

**Created:** November 16, 2025  
**Purpose:** Explain the distinction between monthly and daily versioning  
**Status:** Active

---

## Overview

This project uses **two types of versions** for different purposes:

1. **Monthly Version** (`v2025.11`) - For releases and project milestones
2. **Daily Version** (`v2025-11-16`) - For exports and documentation snapshots

---

## Monthly Version (vYYYY.MM)

### Purpose
- **Project milestones** and major releases
- **Version tracking** in the `VERSION` file
- **Release automation** when `VERSION` file changes
- **Stable reference points** for the project state

### Format
- Pattern: `vYYYY.MM`
- Example: `v2025.11` (November 2025)
- Stored in: `VERSION` file

### When It Changes
- Monthly or when significant project milestones are reached
- Updated manually in the `VERSION` file
- Triggers the **Release Automation** workflow

### Usage
- **Release tags:** `v2025.11`
- **Release names:** "Release v2025.11 (Monthly)"
- **GitHub Releases:** Created by `.github/workflows/release-automation.yml`
- **Documentation:** Referenced in release notes and changelogs

### Example
```bash
# VERSION file contains:
2025.11

# Creates release:
Tag: v2025.11
Name: Release v2025.11 (Monthly)
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
| **Format** | `v2025.11` | `v2025-11-16` |
| **Source** | `VERSION` file | Current date |
| **Frequency** | Monthly or milestone-based | Every export |
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

### Release Automation (Monthly Version)
```yaml
# .github/workflows/release-automation.yml
- Creates release with tag: v2025.11
- File names: Uses exports from latest daily version
- Release type: Full release
- Trigger: When VERSION file changes
```

---

## File Naming

### Export Files
- **Pattern:** `eco-balance-documentation-v{DAILY_VERSION}.{ext}`
- **Example:** `eco-balance-documentation-v2025-11-16.epub`
- **Uses:** Daily version (date-based)

### Release Files
- **Pattern:** Same as export files (attached from latest exports)
- **Tagged with:** Monthly version (`v2025.11`)
- **Contains:** Latest export files available at release time

---

## Best Practices

### When to Use Monthly Version
- ✅ Creating a project milestone
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
- `v2025.11` - November 2025 release
- `v2025.12` - December 2025 release (future)

### Daily Versions
- `v2025-11-16` - Export from November 16, 2025
- `v2025-11-17` - Export from November 17, 2025
- Multiple daily versions can exist within the same month

---

## GitHub Releases

Both version types create GitHub Releases:

1. **Monthly Releases** (`v2025.11`)
   - Full releases
   - Include release notes
   - Marked as stable

2. **Daily Releases** (`v2025-11-16`)
   - Pre-releases
   - Automated exports
   - Marked as pre-release

**View all releases:** [GitHub Releases](https://github.com/presiannedyalkov/eco-balance-documentation/releases)

---

**Last Updated:** November 16, 2025

