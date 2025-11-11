---
task_id: LIB-2025-11-11-004
created_by: Librarian
created_date: 2025-11-11
priority: MEDIUM
category: links
status: queued
---

# Verify Section Links to Headings

## Description

Two links in `70_Case_Studies_Restoration_Examples.md` use section anchors (`#heading`) that need to be verified. If the target headings don't exist, these links won't work.

## Current State

**File Affected**: `70_Case_Studies_Restoration_Examples.md`

**Section Links to Verify:**
1. Line 85: `[[strategic/20_Restoration_Methodology#Community Engagement|Community Engagement Strategy]]`
2. Line 376: `[[strategic/30_Business_Model#Eco-Tourism|Eco-Tourism Revenue]]`

**Issue**: Need to verify that these section headings exist in the target files.

## Desired State

All section links should point to existing headings in target files. If headings don't exist:
- Update links to point to correct headings
- Or remove section anchor and link to file only
- Or add missing headings to target files

## Action Required

1. **Verify `20_Restoration_Methodology.md` has `#Community Engagement` heading**:
   - Search for "Community Engagement" heading in target file
   - Check exact heading text (case-sensitive, may have different wording)
   - Note exact heading text if found

2. **Verify `30_Business_Model.md` has `#Eco-Tourism` heading**:
   - Search for "Eco-Tourism" heading in target file
   - Check exact heading text (case-sensitive, may have different wording)
   - Note exact heading text if found

3. **Fix links if headings don't match**:
   - If heading exists but text differs, update link to match
   - If heading doesn't exist, either:
     - Remove section anchor: `[[strategic/20_Restoration_Methodology|Community Engagement Strategy]]`
     - Or add missing heading to target file
     - Or update link to point to existing related heading

4. **Verify links work**:
   - Test each link in Obsidian
   - Confirm section anchors work correctly
   - Verify navigation works

## Impact

- ✅ Section links work correctly
- ✅ Users can navigate directly to relevant sections
- ✅ Better navigation precision
- ⚠️ **MEDIUM** - Affects one document, section links are nice-to-have

## Affected Files

- `70_Case_Studies_Restoration_Examples.md` (2 section links)
- Possibly `20_Restoration_Methodology.md` (if heading needs to be added)
- Possibly `30_Business_Model.md` (if heading needs to be added)

## Verification Criteria

- [ ] Both target files checked for section headings
- [ ] Links updated to match existing headings (if found)
- [ ] Links updated if headings don't exist (remove anchor or add heading)
- [ ] Section links tested in Obsidian and work correctly
- [ ] Navigation works as expected

## Estimated Effort

**MINOR** - Need to search target files and verify headings, may need to update links or add headings

## Notes

- Section links (`#heading`) are case-sensitive
- Heading text must match exactly (including punctuation, spacing)
- If headings don't exist, consider whether they should be added or links should be simplified
- Section links are a nice-to-have feature, not critical for basic navigation

