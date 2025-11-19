---
task_id: LIB-2025-11-11-002
created_by: Librarian
created_date: 2025-11-11
priority: HIGH
category: links
status: queued
---

# Fix VERSION File Links

## Description

Multiple strategic documents link to `[[VERSION]]`, but VERSION is a plain text file (not .md), so wiki-style links won't work in Obsidian. This breaks navigation to version information.

## Current State

**Files Affected:**
1. `00_Eco_Balance_Hub.md` (7 instances)
2. `01_Executive_Summary.md` (1 instance)
3. `ROADMAP.md` (1 instance)

**Total**: 9 instances of `[[VERSION]]` links

**Issue**: VERSION file is plain text (ASCII), not markdown, so `[[VERSION]]` links don't work in Obsidian/wiki systems.

## Desired State

Version information should be accessible via working links. Options:

**Option A (Recommended)**: Link to version information in `_versions/README.md`
- Replace `[[VERSION]]` with `[[_versions/README|Version Information]]` or `[[_versions/README|Current Version]]`

**Option B**: Create `VERSION.md` that contains version info
- Create new file with version number and link to it

**Option C**: Remove wiki links, use plain text references
- Change `[[VERSION]]` to plain text "VERSION file" or "version 2.0.0"

## Action Required

1. **Decide on approach** (recommend Option A - link to `_versions/README.md`)

2. **Update `00_Eco_Balance_Hub.md`** (7 instances):
   - Lines: 7, 46, 318, 374, 465, 548
   - Replace `[[VERSION]]` with `[[_versions/README|Version Information]]` or appropriate text

3. **Update `01_Executive_Summary.md`** (1 instance):
   - Line: 481
   - Replace `[[VERSION]]` with `[[_versions/README|Current Version]]`

4. **Update `ROADMAP.md`** (1 instance):
   - Line: 403
   - Replace `[[VERSION]]` with `[[_versions/README|Version]]`

5. **Verify links work**:
   - Test each link in Obsidian
   - Confirm `_versions/README.md` exists and contains version info
   - Verify navigation works

## Impact

- ✅ Version information accessible via working links
- ✅ Consistent navigation to version details
- ✅ Better user experience finding version info
- ⚠️ **HIGH** - Affects multiple strategic documents

## Affected Files

- `00_Eco_Balance_Hub.md` (7 links)
- `01_Executive_Summary.md` (1 link)
- `ROADMAP.md` (1 link)

## Verification Criteria

- [ ] All `[[VERSION]]` links updated to working alternatives
- [ ] Links tested in Obsidian and work correctly
- [ ] Target file (`_versions/README.md`) exists and contains version info
- [ ] Consistent approach used across all files
- [ ] No broken version links remain

## Estimated Effort

**MINOR** - Find-replace operation, 9 links to update, need to verify target file exists

## Notes

- VERSION file is plain text (not markdown), so wiki links don't work
- `_versions/README.md` likely contains version information and is a better link target
- Consider creating `VERSION.md` if version info needs its own page
- This is a systemic issue affecting multiple documents

