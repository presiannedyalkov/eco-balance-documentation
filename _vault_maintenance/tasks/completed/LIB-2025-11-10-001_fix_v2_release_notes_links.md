---
task_id: LIB-2025-11-10-001
created_by: Librarian
created_date: 2025-11-10
priority: CRITICAL
category: links
status: queued
---

# Fix Missing v2.0.0 Release Notes Links

## Description

The hub page (00_Eco_Balance_Hub.md) references `[[_versions/v2.0.0/RELEASE_NOTES]]` 4 times, but the directory `_versions/v2.0.0/` does not exist. This breaks critical version information links in the main navigation hub.

## Current State

- **Referenced**: `[[_versions/v2.0.0/RELEASE_NOTES]]` appears 4 times in 00_Eco_Balance_Hub.md
- **Actual state**: Directory `_versions/v2.0.0/` does not exist
- **Existing**: `_versions/v1.0.0/RELEASE_NOTES.md` exists
- **Impact**: Version info links in hub page are broken, users cannot access v2.0.0 release notes

## Desired State

Either:
1. **Option A**: Create `_versions/v2.0.0/RELEASE_NOTES.md` file (recommended)
2. **Option B**: Update all 4 links to point to v1.0.0 release notes temporarily
3. **Option C**: Remove links until v2.0.0 release notes are created

## Action Required

**Recommended: Option A** - Create v2.0.0 release notes

1. Create directory: `_versions/v2.0.0/`
2. Create file: `_versions/v2.0.0/RELEASE_NOTES.md`
3. Use `_templates/release_notes_template.md` as template
4. Document v2.0.0 Bootstrap Model changes
5. Verify all 4 links in hub page now work

**Alternative: Option B** (if release notes not ready)
1. Update all 4 instances in 00_Eco_Balance_Hub.md:
   - FROM: `[[_versions/v2.0.0/RELEASE_NOTES|Release Notes]]`
   - TO: `[[_versions/v1.0.0/RELEASE_NOTES|v1.0.0 Release Notes]]` (temporary)
2. Add note that v2.0.0 release notes coming soon

## Impact

- ✅ Hub page version info links become functional
- ✅ Users can access version documentation
- ✅ Navigation integrity restored
- ✅ Critical navigation pathway fixed

## Affected Files

- `00_Eco_Balance_Hub.md` (4 broken links)
- `_versions/v2.0.0/RELEASE_NOTES.md` (to be created)

## Verification Criteria

- [ ] All 4 links in hub page work correctly
- [ ] v2.0.0 release notes file exists OR links point to valid alternative
- [ ] No broken `_versions/v2.0.0/RELEASE_NOTES` references remain
- [ ] Version information is accessible from hub page

## Estimated Effort

**MINOR** (if creating release notes) or **TRIVIAL** (if updating links)

## Notes

This is a critical navigation issue affecting the main hub page. The v2.0.0 Bootstrap Model conversion is complete, so release notes should be created to document the changes. If release notes are not ready, Option B provides a temporary fix.

