# Breaking Changes - 2025.11

**Version:** 2025.11  
**Date:** November 12, 2025  
**Type:** Version Format Migration

---

## Summary

This version introduces a breaking change to the versioning format used throughout the documentation. All documents have been migrated from Semantic Versioning (SemVer) to Calendar Versioning (CalVer).

---

## Breaking Change: Version Format Migration

### What Changed

**Previous Format (SemVer):**
```
Document Version: 2.0.0
Version: 2.0.0
```

**New Format (CalVer):**
```
Document Version: 2025.11 (2025.11.12 HH:MM)
Version: 2025.11
```

### Impact

- **All strategic documents** now use the new format
- **VERSION file** changed from `2.0.0` to `2025.11`
- **Version directories** now use format `_versions/v2025.11/` instead of `_versions/v2.0.0/`

### Migration Applied

✅ All files have been automatically updated to the new format  
✅ No manual action required  
✅ All cross-references remain valid

### For Scripts and Automation

If you have scripts that parse version numbers:
- Update regex patterns to match `YYYY.MM` format
- Update version directory paths to use `vYYYY.MM` format
- Version comparison logic may need updates (now date-based)

### Compatibility

- **Backward Compatibility:** None - this is a breaking change
- **Migration Path:** All files automatically migrated
- **Rollback:** Not recommended - would require reverting all document versions

---

## Files Affected

- All strategic documentation files (00-70 range)
- Hub file (`00_Eco_Balance_Hub.md`)
- VERSION file
- Version directory structure

---

## Notes

- This change is primarily cosmetic/organizational
- Document content remains unchanged
- Cross-references and links remain valid
- Only the version format has changed

---

**Status:** Migration complete. All breaking changes applied.
