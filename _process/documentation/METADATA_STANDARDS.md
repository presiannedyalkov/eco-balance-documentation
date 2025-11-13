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
**Part of**: [Vision | Plan | Reality] → Strategic Documentation
**Type**: [Document type - see Type Standards below]
**Status**: [Status - see Status Standards below]
**Last Updated**: YYYY-MM-DD
```

**Example:**
```markdown
---

**Document Version**: 2025.11 (2025.11.13 14:30)
**Part of**: Plan → Strategic Documentation
**Type**: Strategic Planning Document
**Status**: Active
**Last Updated**: 2025-11-13
```

### For Restoration Playbook Files

All playbook files **must** include:

```markdown
---

**Document Version**: YYYY.MM (YYYY.MM.DD HH:MM)
**Part of**: Plan → Restoration Playbook
**Type**: Template/Playbook
**Status**: Template - Customize for Your Project
**Last Updated**: YYYY-MM-DD
```

### Optional Metadata Fields

The following fields may be included if relevant:

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

**Decision:** Use Vision/Plan/Reality categorization system (Option 3)

**Categorization System:**
All files should have a `**Part of:**` field that categorizes them within the Vision → Plan → Reality framework:

- **Vision:** Core vision, values, mission, goals (immutable purpose)
  - Examples: `01_Executive_Summary.md`, `02_Project_Vision.md`, `03_Success_Factors.md`
  
- **Plan:** Strategic planning, methodology, frameworks, templates (created together, adaptable)
  - Examples: `20_Restoration_Methodology.md`, `30_Business_Model.md`, `restoration_playbook/` files
  
- **Reality:** Current state, actual data, what exists now (gathered by us)
  - Examples: `04_Current_Status_Assessment.md`, actual site data, current constraints

**Format:**
```markdown
**Part of:** Vision | Plan | Reality
```

**Examples:**
- `**Part of:** Vision` - For vision and values documents
- `**Part of:** Plan` - For strategic planning, methodology, playbooks
- `**Part of:** Reality` - For current status, actual data, constraints

**Document Collection:**
- `**Part of:** Strategic Documentation` - For the strategic files collection (01-70)
- `**Part of:** Restoration Playbook` - For playbook/template files

**Combined Format (Recommended):**
```markdown
**Part of:** Plan → Strategic Documentation
**Part of:** Plan → Restoration Playbook
**Part of:** Vision → Strategic Documentation
**Part of:** Reality → Strategic Documentation
```

This provides both the conceptual categorization (Vision/Plan/Reality) and the document collection (Strategic Documentation/Restoration Playbook).

---

## Type Standards

### Document Types

All files should have a `**Type:**` field that describes the document's purpose and nature.

**Strategic Documentation Types:**
- `Strategic Planning Document` - Core strategic planning (e.g., Business Model, Funding Strategy)
- `Vision Document` - Vision, values, mission statements
- `Status Document` - Current state assessments
- `Methodology Document` - Approaches, frameworks, methods
- `Reference Document` - Case studies, examples, guides
- `Organizational Document` - Structure, governance, legal
- `Operational Document` - Operations plans, action plans

**Restoration Playbook Types:**
- `Template/Playbook` - Template for customization
- `Task Guide` - Step-by-step task instructions
- `Overview Document` - Category overview and introduction

**Examples:**
```markdown
**Type**: Strategic Planning Document
**Type**: Vision Document
**Type**: Template/Playbook
**Type**: Methodology Document
```

## Status Standards

### Status Values

All files should have a `**Status:**` field indicating the document's current state and usability.

**Status Categories:**

1. **Active Statuses** (Current, usable documents):
   - `Active` - Document is current and actively used
   - `Active - Under Review` - Current but being reviewed/updated
   - `Active - Draft` - Current draft, may have incomplete sections

2. **Template Statuses** (For playbook/template files):
   - `Template - Customize for Your Project` - Template ready for customization
   - `Template - Example` - Example template with sample data

3. **Maintenance Statuses** (Documents being updated):
   - `Being Updated` - Currently being revised
   - `Needs Review` - Requires review before use
   - `Outdated - Update Pending` - Contains outdated information

4. **Archive Statuses** (Historical documents):
   - `Archived` - Historical reference, not current
   - `Superseded` - Replaced by newer version

**Examples:**
```markdown
**Status**: Active
**Status**: Active - Under Review
**Status**: Template - Customize for Your Project
**Status**: Needs Review
```

**Status Selection Guidelines:**
- Most strategic files: `Active`
- Files being updated: `Active - Under Review` or `Being Updated`
- Playbook files: `Template - Customize for Your Project`
- Drafts: `Active - Draft`
- Historical: `Archived` or `Superseded`

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
- [ ] Has "Part of:" field with Vision/Plan/Reality categorization
- [ ] Has "Type:" field describing document type
- [ ] Has "Status:" field with appropriate status value
- [ ] Has "Last Updated" field
- [ ] Metadata is in footer (after `---`)
- [ ] Uses consistent field formatting (bold vs plain)
- [ ] Field order matches standard:
  1. Document Version
  2. Part of
  3. Type
  4. Status
  5. Last Updated
- [ ] All fields present and consistent across all files

---

## Migration Plan

### Phase 1: Version Standardization (Current)
- ✅ Update VERSION file to 2025.11
- ✅ Create sync_versions.sh script
- 🔄 Migrate all files to CalVer format
- 🔄 Add versions to files missing them

### Phase 2: Metadata Structure Standardization (Next)
- [ ] Audit all files for metadata consistency
- [ ] Add "Part of:" field to all files (Vision/Plan/Reality categorization)
- [ ] Add "Type:" field to all files (document type classification)
- [ ] Add "Status:" field to all files (appropriate status value)
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

