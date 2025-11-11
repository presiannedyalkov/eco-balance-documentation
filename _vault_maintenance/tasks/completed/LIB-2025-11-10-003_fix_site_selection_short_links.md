---
task_id: LIB-2025-11-10-003
created_by: Librarian
created_date: 2025-11-10
priority: HIGH
category: links
status: queued
---

# Fix Incorrect 44_Site_Selection Short Links

## Description

Multiple strategic documents use the short link `[[44_Site_Selection]]` but the actual file is named `44_Site_Selection_Land_Acquisition.md`. This creates broken navigation links throughout the vault.

## Current State

- **Incorrect links**: `[[44_Site_Selection]]` or `[[44_Site_Selection|...]]` (13 instances found)
- **Correct filename**: `44_Site_Selection_Land_Acquisition.md`
- **Files affected**: 7 strategic documents
- **Impact**: Site selection links are broken, users cannot navigate to site selection documentation

## Desired State

All links to site selection document use the full filename:
- `[[44_Site_Selection_Land_Acquisition|Site Selection]]` or
- `[[44_Site_Selection_Land_Acquisition|...]]` (with appropriate display text)

## Action Required

**Split into subtasks by file group** (following task splitting guidelines):

### LIB-2025-11-10-003a: Fix links in core strategy docs (3 files)
1. `01_Executive_Summary.md` - Fix 2 instances
2. `04_Current_Status_Assessment.md` - Fix 3 instances
3. `42_Adaptive_Timeline.md` - Fix 1 instance

### LIB-2025-11-10-003b: Fix links in organizational docs (2 files)
1. `10_Organizational_Structure.md` - Fix 2 instances
2. `13_Legal_Framework.md` - Fix 3 instances

### LIB-2025-11-10-003c: Fix links in risk/assessment docs (2 files)
1. `50_Risk_Assessment.md` - Fix 2 instances

**For each file:**
1. Find all instances of `[[44_Site_Selection]]` or `[[44_Site_Selection|...]]`
2. Replace with `[[44_Site_Selection_Land_Acquisition|...]]` (preserve display text)
3. Verify link works correctly

## Impact

- ✅ All site selection links become functional
- ✅ Users can navigate to site selection documentation
- ✅ Navigation integrity restored across multiple documents
- ✅ Consistent link formatting

## Affected Files

- `01_Executive_Summary.md` (2 instances)
- `04_Current_Status_Assessment.md` (3 instances)
- `10_Organizational_Structure.md` (2 instances)
- `13_Legal_Framework.md` (3 instances)
- `42_Adaptive_Timeline.md` (1 instance)
- `50_Risk_Assessment.md` (2 instances)

**Total**: 13 instances across 6 files

## Verification Criteria

- [ ] All 13 instances updated to full filename
- [ ] All links work correctly
- [ ] Display text preserved where appropriate
- [ ] No `[[44_Site_Selection]]` references remain (except in this task file)

## Estimated Effort

**MINOR** - Simple find/replace across 6 files

## Notes

This is a common pattern - using short filenames in links. The full filename should be used to ensure link integrity. Consider documenting preferred link format in style guide.

