---
task_id: ARC-2025-11-10-001
created_by: Archivist
created_date: 2025-11-10
priority: CRITICAL
category: versioning
status: queued
---

# Create v2.0.0 Version Artifacts Directory and Release Notes

## Description

The current version is 2.0.0 (per VERSION file and CHANGELOG), but the `_versions/v2.0.0/` directory does not exist. This breaks version artifact links and prevents proper historical preservation of the v2.0.0 Bootstrap Model transformation.

## Current State

- **VERSION file**: Shows 2.0.0 ✅
- **CHANGELOG**: Has v2.0.0 entry (2025-11-06) ✅
- **Expected**: `_versions/v2.0.0/` directory with RELEASE_NOTES.md
- **Actual**: Only `_versions/v1.0.0/` exists
- **Impact**: 
  - Hub page links to v2.0.0 release notes are broken (also identified by Librarian as LIB-2025-11-10-001)
  - v2.0.0 transformation not properly preserved in version artifacts
  - Historical record incomplete

## Desired State

Complete v2.0.0 version artifacts directory:
```
_versions/v2.0.0/
├── RELEASE_NOTES.md      # Bootstrap Model transformation details
└── reports/              # Optional: version-specific reports
```

## Action Required

1. Create directory: `_versions/v2.0.0/`
2. Create `_versions/v2.0.0/RELEASE_NOTES.md`:
   - Use `_templates/release_notes_template.md` as template
   - Document Bootstrap Model transformation (from CHANGELOG)
   - Include: What changed, why, migration guide, known issues
   - Reference v1.0.0 for comparison
3. Optionally create `_versions/v2.0.0/reports/` directory for future reports
4. Verify hub page links now work (coordinate with Librarian task LIB-2025-11-10-001)

## Impact

- ✅ Version artifacts complete for v2.0.0
- ✅ Historical preservation of Bootstrap Model transformation
- ✅ Hub page links become functional
- ✅ Proper version history maintained
- ✅ Future reference value preserved

## Affected Files

- `_versions/v2.0.0/RELEASE_NOTES.md` (to be created)
- `_versions/v2.0.0/` directory (to be created)
- Hub page links (will be fixed when directory exists)

## Historical Context

The v2.0.0 release (2025-11-06) represents a **fundamental methodology transformation**:
- Large-Scale Model → Bootstrap Model
- 10-30 ha → 1 ha pilot
- €500k-2M → €20-30k Year 1
- 20-100 people → 1-2 founders

This transformation is well-documented in CHANGELOG but needs to be preserved in version artifacts for future reference.

## Verification Criteria

- [ ] `_versions/v2.0.0/` directory exists
- [ ] `_versions/v2.0.0/RELEASE_NOTES.md` exists
- [ ] Release notes document Bootstrap Model transformation
- [ ] Hub page links to v2.0.0 release notes work
- [ ] Version artifacts provide historical context

## Estimated Effort

**MODERATE** - Requires creating release notes with comprehensive content

## Notes

**Coordination**: This task overlaps with Librarian task LIB-2025-11-10-001 (Fix missing v2.0.0 release notes links). The Librarian task focuses on fixing broken links, while this task focuses on creating the missing artifacts. Both should be completed together - create the directory first, then links will work.

**Priority**: CRITICAL because:
1. Current version artifacts are incomplete
2. Historical record of major transformation is at risk
3. Broken links affect navigation (identified by Librarian)

