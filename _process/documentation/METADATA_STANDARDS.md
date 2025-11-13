# Documentation Metadata Standards

**Created:** November 13, 2025  
**Purpose:** Define standard metadata structure for all documentation files  
**Status:** Active Standard

---

## Overview

All strategic documentation files should have consistent metadata structure to ensure:
- Easy version tracking
- Consistent document organization
- Clear document status and categorization
- Professional presentation
- Automated processing and synchronization

---

## Required Metadata Fields

### For Strategic Files (01-70 range)

All strategic files **must** include the following metadata fields in the footer:

```markdown
---

**Document Version**: YYYY.MM (YYYY.MM.DD HH:MM)
**Last Updated**: YYYY-MM-DD
**Status**: [Current status description]
```

**Example:**
```markdown
---

**Document Version**: 2025.11 (2025.11.13 14:30)
**Last Updated**: 2025-11-13
**Status**: Active - Current version
```

### Optional Metadata Fields

The following fields may be included if relevant:

- **Document Status**: v2.0.0 compliant, etc. (legacy field, being phased out)
- **Philosophy**: Core principles or approach
- **Next Review**: When document should be reviewed next
- **Related Documents**: Links to related content

---

## Metadata Format Standards

### Version Format

**Required Format:** `YYYY.MM (YYYY.MM.DD HH:MM)`

- **Global Version**: `YYYY.MM` (e.g., `2025.11`)
- **Local Subversion**: `YYYY.MM.DD HH:MM` (e.g., `2025.11.13 14:30`)

**Examples:**
- ✅ `**Document Version**: 2025.11 (2025.11.13 14:30)`
- ✅ `Document Version: 2025.11 (2025.11.13 14:30)`
- ❌ `Document Version: 2.0.0` (old SemVer format)
- ❌ `Document Version: 3.0.0 - Adaptive Framework` (inconsistent format)

### Field Formatting

**Consistent Format:**
- Use markdown bold: `**Field Name**: Value`
- Or plain format: `Field Name: Value`
- **Important:** All files in same category should use same format

**Current Standard:**
- Strategic files (01-70): Use `**Field Name**: Value` (markdown bold)
- Restoration playbook files: Use `**Field Name**: Value` (markdown bold)

### Field Order

**Standard Order (footer):**
1. `**Document Version**`
2. `**Last Updated**`
3. `**Status**` (if applicable)
4. Other optional fields

---

## Document Structure Standards

### Standard Document Structure

All strategic files should follow this structure:

```markdown
# Document Title

[Optional: Back link to hub or parent]

---

## Section 1
[Content]

## Section 2
[Content]

---

**Document Version**: YYYY.MM (YYYY.MM.DD HH:MM)
**Last Updated**: YYYY-MM-DD
**Status**: [Status description]
```

### Metadata Location

**Footer Location (Standard):**
- Metadata should be placed at the end of the document
- Separated by `---` horizontal rule
- After all content sections

---

## Categorization Standards

### "Part of:" Field

**Current Issue:** Some files (restoration_playbook) have `**Part of:** Plan Section (Vision → Plan → Reality)`, but strategic files don't.

**Decision Required:**
- **Option 1:** Add "Part of:" field to ALL files (strategic + playbook)
- **Option 2:** Remove "Part of:" field from playbook files
- **Option 3:** Use different categorization system

**Recommendation:** 
- If keeping "Part of:" field, standardize the categorization:
  - Strategic files: `**Part of:** Strategic Documentation`
  - Playbook files: `**Part of:** Restoration Playbook`
  - Or use a more descriptive categorization system

**Current State:**
- ❌ Inconsistent: Only playbook files have "Part of:" field
- ✅ Should be: All files have consistent categorization, or none do

---

## Restoration Playbook Files

### Current Structure

Playbook files currently have:
```markdown
**Part of:** Plan Section (Vision → Plan → Reality)  
**Type:** Template/Playbook for Small Plot Restoration  
**Status:** Template - Customize for Your Project
```

### Standardization Options

**Option 1: Add to All Files**
- Add "Part of:" and "Type:" to all strategic files
- Create consistent categorization system

**Option 2: Remove from Playbook**
- Remove "Part of:" from playbook files
- Keep only standard metadata (Version, Last Updated, Status)

**Option 3: Hybrid**
- Keep "Type:" field for playbook files (they are templates)
- Remove "Part of:" field (inconsistent wording)
- Add "Type:" to strategic files if needed

---

## Version Synchronization

### Automatic Synchronization

The `scripts/sync_versions.sh` script:
- Updates all files to current global version
- Adds version to files that don't have one
- Migrates old SemVer format (2.0.0, 3.0.0) to CalVer (YYYY.MM)
- Logs all changes to version journal

### Manual Updates

When manually updating files:
- Always update "Last Updated" field
- Update local subversion (YYYY.MM.DD HH:MM) when making changes
- Update global version (YYYY.MM) only when breaking changes occur

---

## Compliance Checklist

For each strategic file, verify:

- [ ] Has "Document Version" field
- [ ] Version format is YYYY.MM (YYYY.MM.DD HH:MM)
- [ ] Has "Last Updated" field
- [ ] Metadata is in footer (after `---`)
- [ ] Uses consistent field formatting (bold vs plain)
- [ ] Field order matches standard
- [ ] No inconsistent fields (e.g., "Part of:" only in some files)
- [ ] Status field is present and meaningful (if applicable)

---

## Migration Plan

### Phase 1: Version Standardization (Current)
- ✅ Update VERSION file to 2025.11
- ✅ Create sync_versions.sh script
- 🔄 Migrate all files to CalVer format
- 🔄 Add versions to files missing them

### Phase 2: Metadata Structure Standardization (Next)
- [ ] Audit all files for metadata consistency
- [ ] Decide on "Part of:" field (keep/remove/standardize)
- [ ] Standardize field order across all files
- [ ] Standardize field formatting (bold vs plain)
- [ ] Update all files to match standard

### Phase 3: Ongoing Maintenance
- [ ] Auditor persona checks metadata consistency
- [ ] Sync script maintains version consistency
- [ ] New files follow metadata standards
- [ ] Regular audits ensure compliance

---

## Related Documents

- `_process/documentation/VERSIONING_STRATEGY.md` - Versioning system details
- `scripts/sync_versions.sh` - Version synchronization script
- `_vault_maintenance/personas/auditor.md` - Auditor persona (checks compliance)

---

**Status:** Active standard - All new files must follow these guidelines.

