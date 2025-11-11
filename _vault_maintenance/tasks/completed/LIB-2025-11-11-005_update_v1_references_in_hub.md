---
task_id: LIB-2025-11-11-005
created_by: Librarian
created_date: 2025-11-11
priority: MEDIUM
category: navigation
status: queued
---

# Update v1.0.0 References in Hub

## Description

The hub page (`00_Eco_Balance_Hub.md`) contains 6 references to v1.0.0 that should be updated to v2.0.0 or clearly marked as archived references. While some v1.0.0 references are appropriate (for historical context), they should be consistent and clearly indicate they're archived.

## Current State

**File Affected**: `00_Eco_Balance_Hub.md`

**v1.0.0 References Found:**
1. Line 339: `**Version Info:** _versions/v1.0.0/`
2. Line 376: `Read [[_versions/v1.0.0/RELEASE_NOTES|Release Notes]] for v1.0.0 details`
3. Line 434: `→ Release details: [[_versions/v1.0.0/RELEASE_NOTES|v1.0.0 Release Notes]]`
4. Line 469: `- [[_versions/v1.0.0/RELEASE_NOTES|v1.0.0 Release Notes]] - Initial release (archived)`
5. Line 529: `Check [[_versions/v1.0.0/RELEASE_NOTES|v1.0.0 Release Notes]] (10 min)`
6. Line 581: `[[_versions/v1.0.0/RELEASE_NOTES|v1.0.0 (Archived)]]`

**Issue**: Some references are appropriate (archived), but some should reference v2.0.0 as current version.

## Desired State

All version references should be consistent:
- **Current version** (v2.0.0) should be referenced as current
- **Archived versions** (v1.0.0) should be clearly marked as archived
- **Version info** should point to current version directory

## Action Required

1. **Review each v1.0.0 reference** and determine if it should be:
   - Updated to v2.0.0 (if referring to current version)
   - Kept as v1.0.0 but marked as archived (if historical reference)

2. **Update line 339** (Version Info):
   - Current: `**Version Info:** _versions/v1.0.0/`
   - Should be: `**Version Info:** _versions/v2.0.0/` (current version)

3. **Update line 376** (Release Notes reference):
   - Current: `Read [[_versions/v1.0.0/RELEASE_NOTES|Release Notes]] for v1.0.0 details`
   - Should be: `Read [[_versions/v2.0.0/RELEASE_NOTES|v2.0.0 Release Notes]] for current version details`

4. **Update line 434** (Release details):
   - Current: `→ Release details: [[_versions/v1.0.0/RELEASE_NOTES|v1.0.0 Release Notes]]`
   - Should be: `→ Release details: [[_versions/v2.0.0/RELEASE_NOTES|v2.0.0 Release Notes]]`

5. **Keep line 469** (already marked as archived):
   - Current: `- [[_versions/v1.0.0/RELEASE_NOTES|v1.0.0 Release Notes]] - Initial release (archived)`
   - ✅ Already correct - keep as is

6. **Update line 529** (quick start reference):
   - Current: `Check [[_versions/v1.0.0/RELEASE_NOTES|v1.0.0 Release Notes]] (10 min)`
   - Should be: `Check [[_versions/v2.0.0/RELEASE_NOTES|v2.0.0 Release Notes]] (10 min)`

7. **Keep line 581** (already marked as archived):
   - Current: `[[_versions/v1.0.0/RELEASE_NOTES|v1.0.0 (Archived)]]`
   - ✅ Already correct - keep as is

8. **Verify all links work**:
   - Test updated links in Obsidian
   - Confirm v2.0.0 release notes exist
   - Verify navigation works

## Impact

- ✅ Hub references current version (v2.0.0)
- ✅ Historical references clearly marked as archived
- ✅ Consistent version information
- ✅ Better user experience finding current version info
- ⚠️ **MEDIUM** - Improves consistency and clarity

## Affected Files

- `00_Eco_Balance_Hub.md` (6 references to review/update)

## Verification Criteria

- [ ] All current version references point to v2.0.0
- [ ] Historical references clearly marked as archived
- [ ] Version info directory points to current version
- [ ] Links tested in Obsidian and work correctly
- [ ] Consistent version references throughout hub

## Estimated Effort

**MINOR** - Find-replace operation, 4 references to update (2 already correct)

## Notes

- Some v1.0.0 references are appropriate for historical context
- Key is to ensure current version (v2.0.0) is clearly indicated
- Archived references should be clearly marked
- This improves consistency and reduces confusion about current version

