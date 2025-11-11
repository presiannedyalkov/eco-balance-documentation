---
task_id: ARC-2025-11-11-001
created_by: Archivist
created_date: 2025-11-11
priority: MEDIUM
category: referential_integrity
status: queued
---

# Fix Outdated v1.0.0 Reference in Hub Page

## Description

The hub page (`00_Eco_Balance_Hub.md`) contains an outdated reference to v1.0.0 release notes in the "Quick Start" section, directing new users to the old version instead of the current v2.0.0. This creates confusion and directs users away from current documentation.

## Current State

**File Affected**: `00_Eco_Balance_Hub.md` (line 376)

**Current Text**:
```markdown
- Read [[_versions/v1.0.0/RELEASE_NOTES|Release Notes]] for v1.0.0 details
```

**Issue**: References v1.0.0 instead of current v2.0.0

**Context**: This appears in the "Quick Start" section, which is meant to guide new users to current documentation.

**Impact**: 
- Directs new users to outdated version information
- Creates confusion about which version is current
- Minor referential integrity issue

## Desired State

Update reference to current version or make it version-agnostic:

**Option A** (Recommended): Update to v2.0.0
```markdown
- Read [[_versions/v2.0.0/RELEASE_NOTES|Release Notes]] for v2.0.0 details
```

**Option B**: Make version-agnostic
```markdown
- Read [[_versions/README|Version History]] for release details
```

**Option C**: Remove version-specific reference
```markdown
- Review [[CHANGELOG|Changelog]] for complete version history
```

## Action Required

1. **Open** `00_Eco_Balance_Hub.md`
2. **Locate** line 376 (in "Quick Start" section)
3. **Choose** one of the options above (recommend Option A)
4. **Update** the reference
5. **Verify** link works correctly
6. **Check** for any other v1.0.0 references in hub that should be updated

## Impact

- ✅ New users directed to current version information
- ✅ Reduced confusion about version status
- ✅ Better referential integrity
- ⚠️ **MEDIUM** - Minor improvement for user experience

## Affected Files

- `00_Eco_Balance_Hub.md` (single file, single line)

## Verification Criteria

- [ ] v1.0.0 reference updated to v2.0.0 or made version-agnostic
- [ ] Link works correctly
- [ ] No other outdated v1.0.0 references in hub
- [ ] Quick Start section guides users to current documentation

## Estimated Effort

**TRIVIAL** - Simple reference update (1-2 minutes)

## Notes

This is a minor referential integrity improvement. The hub page should guide users to current documentation, not outdated versions. Option A (update to v2.0.0) is recommended as it maintains the specific reference while pointing to current version.

