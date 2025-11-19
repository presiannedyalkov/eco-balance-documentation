---
task_id: JAN-2025-11-06-001
created_by: Janitor
created_date: 2025-11-06
priority: HIGH
category: placement
status: queued
---

# Relocate 11 Process Files from Root to _process/ Subdirectories

## Description

Root directory currently contains 31 files total: 20 strategic documents (correct) and 11 process/meta files (should be in `_process/`). This creates visual clutter and makes it harder to distinguish strategic content from process documentation.

Moving these 11 files to appropriate `_process/` subdirectories will:
- Clean up root directory (reducing from 31 to ~23 files)
- Improve navigation and clarity
- Group related process documentation together
- Follow established vault organization patterns

## Current State

**Root directory contains:**
- 20 strategic documents (00-70 series) ✅
- 11 process/meta files ❌ Should be in `_process/`
- 3-4 essential meta files (CHANGELOG, VERSION, etc.) ✅

**Process files currently in root:**
1. AUDIT_FIXES_TRACKER.md
2. BUDGET_CLARIFICATION_TABLE.md
3. COMPREHENSIVE_AUDIT_REPORT.md
4. COMPREHENSIVE_FINAL_AUDIT_REPORT.md
5. SOLAR_CALCULATION_FIX.md
6. POLISHING_PLAN.md
7. PUBLIC_PLATFORM_PLAN.md
8. V2_BOOTSTRAP_CONVERSION_PLAN.md
9. GIT_PUSH_INSTRUCTIONS.md
10. git_status.txt
11. STRUCTURE_VISUAL_GUIDE.md

## Desired State

**Root directory will contain:**
- 20 strategic documents (00-70 series)
- CHANGELOG.md
- VERSION
- QUICK_REFERENCE_GUIDE.md
- Total: ~23 files (clean, navigable)

**Process files organized in `_process/` subdirectories:**
- `_process/audit/` - 5 audit-related files
- `_process/planning/` - 2 planning files
- `_process/conversion/` - 1 conversion planning file
- `_process/git/` - 2 git workflow files
- `_process/documentation/` - 1 documentation guide

## Action Required

### Step 1: Create Subdirectories (if not exist)
```bash
mkdir -p "_process/audit"
mkdir -p "_process/planning"
mkdir -p "_process/conversion"
mkdir -p "_process/git"
mkdir -p "_process/documentation"
```

### Step 2: Move Files

**To `_process/audit/`:**
```bash
mv AUDIT_FIXES_TRACKER.md _process/audit/
mv BUDGET_CLARIFICATION_TABLE.md _process/audit/
mv COMPREHENSIVE_AUDIT_REPORT.md _process/audit/
mv COMPREHENSIVE_FINAL_AUDIT_REPORT.md _process/audit/
mv SOLAR_CALCULATION_FIX.md _process/audit/
```

**To `_process/planning/`:**
```bash
mv POLISHING_PLAN.md _process/planning/
mv PUBLIC_PLATFORM_PLAN.md _process/planning/
```

**To `_process/conversion/`:**
```bash
mv V2_BOOTSTRAP_CONVERSION_PLAN.md _process/conversion/
```

**To `_process/git/`:**
```bash
mv GIT_PUSH_INSTRUCTIONS.md _process/git/
mv git_status.txt _process/git/
```

**To `_process/documentation/`:**
```bash
mv STRUCTURE_VISUAL_GUIDE.md _process/documentation/
```

### Step 3: Update Cross-References (if any)

Check if any documents reference these files and update paths:
- Search for links to moved files in all .md files
- Update any relative paths to new locations
- Most likely: V2_BOOTSTRAP_CONVERSION_PLAN.md may be referenced in recent work

### Step 4: Verify

- Check root directory contains only strategic docs + essential meta files
- Verify all moved files accessible in new locations
- Test a few cross-references if found

## Impact

**Benefits:**
- ✅ Cleaner root directory (23 files vs 31)
- ✅ Better organization (process files grouped)
- ✅ Improved navigation for users seeking strategic content
- ✅ Consistent with vault architecture (meta in `_*` directories)
- ✅ Easier to find related process documentation

**Risks:**
- ⚠️ Broken cross-references (mitigated by Step 3)
- ⚠️ User confusion if they bookmarked files (low risk - these are process files)

## Affected Files

**Files Being Moved (11):**
- AUDIT_FIXES_TRACKER.md
- BUDGET_CLARIFICATION_TABLE.md
- COMPREHENSIVE_AUDIT_REPORT.md
- COMPREHENSIVE_FINAL_AUDIT_REPORT.md
- SOLAR_CALCULATION_FIX.md
- POLISHING_PLAN.md
- PUBLIC_PLATFORM_PLAN.md
- V2_BOOTSTRAP_CONVERSION_PLAN.md
- GIT_PUSH_INSTRUCTIONS.md
- git_status.txt
- STRUCTURE_VISUAL_GUIDE.md

**Directories Being Created (5):**
- _process/audit/
- _process/planning/
- _process/conversion/
- _process/git/
- _process/documentation/

## Estimated Effort

**MINOR** (30-45 minutes)

- Create directories: 2 minutes
- Move files: 5 minutes
- Check for cross-references: 15-20 minutes
- Update references (if found): 10-15 minutes
- Verification: 5 minutes

## Verification Criteria

Task complete when:
- [ ] All 5 subdirectories exist under `_process/`
- [ ] All 11 files successfully moved to new locations
- [ ] Root directory contains only ~23 files (strategic docs + essential meta)
- [ ] All cross-references updated (if any found)
- [ ] Files accessible and readable in new locations
- [ ] Git commit created documenting the reorganization

## Notes

**Priority Rationale:** HIGH because this is the primary organizational issue affecting vault cleanliness. However, it's not CRITICAL because no data is at risk and functionality is not impaired.

**Git Commit Message Suggestion:**
```
refactor: Reorganize process files into _process/ subdirectories

- Move 11 process/meta files from root to _process/
- Create subdirectories: audit, planning, conversion, git, documentation
- Improves root directory clarity (31 → 23 files)
- Better organization for process documentation

Related: Janitor Analysis 2025-11-06
```

**Coordination:**
- Alert Librarian persona after completion (may affect navigation)
- Alert Curator if cross-references need updating