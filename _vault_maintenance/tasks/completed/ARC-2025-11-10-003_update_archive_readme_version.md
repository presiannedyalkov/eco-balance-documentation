---
task_id: ARC-2025-11-10-003
created_by: Archivist
created_date: 2025-11-10
priority: MEDIUM
category: legacy
status: queued
---

# Update Archive README v1.0.0 Reference to v2.0.0

## Description

The `archive/README.md` file references v1.0.0 as "Current release" in one location, which contradicts the actual current version (2.0.0). This is a minor inconsistency that should be corrected.

## Current State

- **Line 143**: References `[[../_versions/v1.0.0/RELEASE_NOTES|v1.0.0 Release Notes]] - Current release`
- **Actual current version**: 2.0.0
- **Impact**: Minor confusion, contradicts actual current version

## Desired State

Update the reference to either:
- Remove "Current release" designation, or
- Update to reference v2.0.0 as current

## Action Required

1. Open `archive/README.md`
2. Find line 143 (in "Version Control" section)
3. Update the reference:
   - **Option A** (Recommended): Remove "Current release" text
     - FROM: `- [[../_versions/v1.0.0/RELEASE_NOTES|v1.0.0 Release Notes]] - Current release`
     - TO: `- [[../_versions/v1.0.0/RELEASE_NOTES|v1.0.0 Release Notes]] - Initial release (archived)`
   - **Option B**: Add v2.0.0 reference
     - Add: `- [[../_versions/v2.0.0/RELEASE_NOTES|v2.0.0 Release Notes]] - Current release`
     - Keep v1.0.0 as archived
4. Verify reference is accurate

## Impact

- ✅ Version references are accurate
- ✅ Eliminates minor confusion
- ✅ Consistent with actual current version

## Affected Files

- `archive/README.md` (1 location to update)

## Verification Criteria

- [ ] Line 143 updated to remove "Current release" or add v2.0.0 reference
- [ ] Version references are accurate
- [ ] No contradictions with actual current version

## Estimated Effort

**TRIVIAL** - Simple text update

## Notes

This is a minor polish improvement. Priority is MEDIUM because it doesn't affect functionality, but improves accuracy and consistency. Should be done after v2.0.0 artifacts are created (ARC-2025-11-10-001) to ensure references are correct.

