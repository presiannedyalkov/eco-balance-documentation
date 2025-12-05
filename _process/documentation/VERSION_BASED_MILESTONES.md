# Version-Based Milestones Strategy

**Created:** December 2025  
**Purpose:** Align GitHub Milestones with monthly release versions  
**Status:** Proposed Strategy

---

## 🎯 Concept

**Milestones = Release Versions**

Each milestone represents a monthly release version. All PRs and issues linked to that milestone show what was accomplished in that release.

### Key Principles

1. **Milestone = Version**: Milestone name is the version (e.g., `v2025-12`, `v2026-01`)
2. **Cumulative Result**: The milestone represents all work completed up to that release
3. **Release Alignment**: Milestones align with monthly releases and GitHub releases
4. **Automatic Creation**: New milestones created when monthly release happens

---

## 📋 Current vs Proposed Structure

### Current Structure (Time-Based with Descriptions)
```
❌ 2025.12 - Versioning & Roadmap System
❌ 2026.01 - Content & Quality
❌ 2026.Q1 - Interactive Features
❌ 2026.Q2 - Advanced Features
```

### Proposed Structure (Version-Based)
```
✅ v2025-11 (or 2025-11)
✅ v2025-12 (or 2025-12)
✅ v2026-01 (or 2026-01)
✅ v2026-02 (or 2026-02)
... (one per month)
```

---

## 🔄 Migration Plan

### Step 1: Rename Existing Milestones

**Milestone #2:**
- **From:** `2025.12 - Versioning & Roadmap System`
- **To:** `v2025-12` (or `2025-12`)

**Milestone #3:**
- **From:** `2026.01 - Content & Quality`
- **To:** `v2026-01` (or `2026-01`)

**Milestone #4:**
- **From:** `2026.Q1 - Interactive Features`
- **To:** `v2026-03` (or `2026-03`) - Q1 ends in March

**Milestone #5:**
- **From:** `2026.Q2 - Advanced Features`
- **To:** `v2026-06` (or `2026-06`) - Q2 ends in June

### Step 2: Create Missing Version Milestones

Create milestones for versions that already have releases:
- `v2025-11` (if it exists as a release)

### Step 3: Migrate PRs/Issues

All PRs/issues currently linked to milestone #2 should stay linked (they're part of v2025-12).

---

## 🚀 Future Milestone Creation

### Automatic Creation

The monthly release workflow should automatically create a milestone for each new version:

```yaml
# In monthly-release.yml, after version is determined:
- name: Create milestone for version
  run: |
    gh api repos/${{ github.repository }}/milestones \
      -X POST \
      -f title="v${VERSION}" \
      -f description="Release ${VERSION} - All work completed in this release" \
      -f due_on="${RELEASE_DATE}T23:59:59Z"
```

### Manual Creation (if needed)

```bash
# Create milestone for version
gh api repos/presiannedyalkov/eco-balance-documentation/milestones \
  -X POST \
  -f title="v2026-01" \
  -f description="Release 2026-01 - All work completed in this release" \
  -f due_on="2026-01-31T23:59:59Z"
```

---

## 📊 Milestone Properties

### Title Format
- **Option 1:** `v2025-12` (with 'v' prefix, matches git tags)
- **Option 2:** `2025-12` (without prefix, matches VERSION file)

**Recommendation:** Use `v2025-12` to match git tag format.

### Description
```
Release v2025-12 - All work completed in this release

This milestone represents all PRs and issues that were part of the v2025-12 monthly release.
```

### Due Date
- Set to last day of the month at 23:59 UTC
- Matches monthly release schedule

---

## 🔗 Linking Strategy

### PRs to Milestones

**During Development:**
- Link PRs to the milestone for the version they'll be released in
- Example: PR created in December → Link to `v2025-12`
- PR created in January → Link to `v2026-01`

**After Release:**
- All PRs merged before the release are part of that version's milestone
- The milestone shows cumulative work for that release

### Issues to Milestones

- Link issues to the milestone for the version they'll be completed in
- When issue is closed, it contributes to that milestone's progress

---

## 📈 Benefits

1. **Clear Alignment**: Milestones directly match releases
2. **Easy Tracking**: See exactly what was in each release
3. **Automatic Progress**: Milestone progress = release progress
4. **Version History**: Milestones become a version history
5. **Release Notes**: Milestone issues/PRs can generate release notes

---

## 🔄 Workflow Integration

### Monthly Release Process

1. **Last Day of Month:**
   - Monthly release workflow runs
   - Calculates next version (e.g., `2026-01`)
   - Creates milestone `v2026-01` (if doesn't exist)
   - Links all unlinked PRs/issues from that month to the milestone

2. **Release Creation:**
   - GitHub release created with tag `v2026-01`
   - Release notes generated from milestone PRs/issues
   - Milestone shows 100% complete

3. **Next Month:**
   - New milestone `v2026-02` created
   - New PRs/issues link to new milestone

---

## 📝 Example

### v2025-12 Milestone

**Title:** `v2025-12`  
**Description:** Release v2025-12 - All work completed in this release  
**Due Date:** 2025-12-31  
**Status:** ✅ Complete (53 closed, 0 open)

**Contains:**
- PR #247: Monthly Release Strategy
- PR #248: Dependabot Updates
- PR #253: Documentation Updates
- All other PRs/issues from December 2025

**Result:**
- Shows exactly what was in v2025-12 release
- Milestone progress = release completeness
- Easy to see what changed in this version

---

## 🛠️ Implementation Steps

1. ✅ Document the strategy (this file)
2. ⏳ Rename existing milestones to version format
3. ⏳ Create missing version milestones (v2025-11 if needed)
4. ⏳ Update monthly-release workflow to auto-create milestones
5. ⏳ Update linking guide to reflect version-based approach
6. ⏳ Test with next monthly release

---

**Last Updated:** December 2025

