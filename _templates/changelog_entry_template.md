# Changelog Entry Template

Use this template when adding a new version to CHANGELOG.md

---

## Template Structure

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
[Use for new features, documents, or capabilities]
- **[Category]:** [Specific addition] - [Brief context]
- **[Category]:** [Specific addition] - [Brief context]

### Changed
[Use for changes to existing functionality or content]
- **[Category]:** [Specific change] - [What's different and why]
- **[Category]:** [Specific change] - [What's different and why]

### Deprecated
[Use for features/documents that will be removed in future versions]
- **[Category]:** [What's deprecated] - [Alternative to use]

### Removed
[Use for features/documents that were removed in this version]
- **[Category]:** [What was removed] - [Why removed, where content moved]

### Fixed
[Use for bug fixes, corrections, and improvements]
- **[Category]:** [What was fixed] - [Impact]
- **[Category]:** [What was fixed] - [Impact]

### Security
[Use for security-related changes - rarely applicable to documentation]
- **[Category]:** [Security improvement] - [Impact]
```

---

## Version Numbering Guide

### MAJOR.MINOR.PATCH (e.g., 2.1.3)

**MAJOR (X.0.0) - Breaking Changes**
Increment when:
- Complete documentation restructuring
- Fundamental methodology changes
- New project phases that invalidate previous structure
- Changes that require significant adaptation by users

Examples:
- `2.0.0` - Complete overhaul of restoration methodology
- `3.0.0` - Restructure from 6 categories to 8 categories

**MINOR (X.Y.0) - New Features**
Increment when:
- Adding new implementation task categories
- Adding new strategic documents
- Adding new tools or templates
- Enhanced cross-referencing system
- New functionality that doesn't break existing use

Examples:
- `1.1.0` - Add Carbon Sequestration task category
- `1.2.0` - Add Training and Capacity Building section
- `1.3.0` - Add Financial Modeling templates

**PATCH (X.Y.Z) - Bug Fixes**
Increment when:
- Fixing typos
- Correcting broken links
- Clarifying confusing content
- Formatting improvements
- Minor content updates
- Small corrections

Examples:
- `1.0.1` - Fix 15 broken links in biodiversity section
- `1.0.2` - Correct budget figures in financial documents
- `1.0.3` - Update formatting for consistency

---

## Category Labels

Use these standard category labels for consistency:

**Content Categories:**
- Strategic Documents
- Implementation Tasks
- Knowledge Management
- Documentation Infrastructure
- Templates
- Reports
- Archive Materials

**Specific Implementation Categories:**
- Site Selection
- Reforestation
- Biodiversity Conservation
- Soil Restoration
- Water Management
- Community Engagement
- [Add new categories as they're created]

**Technical Categories:**
- Structure
- Cross-Linking
- Navigation
- Version Control
- Process Documentation

---

## Writing Guidelines

### Be Specific
❌ Bad: "Updated some files"
✅ Good: "Enhanced Water Management overview with drought resilience strategies"

### Provide Context
❌ Bad: "Fixed links"
✅ Good: "Fixed 12 broken links in biodiversity section pointing to renamed files"

### Use Active Voice
❌ Bad: "Links were updated in the document"
✅ Good: "Updated links in Site Selection Overview to reflect new structure"

### Be Concise
❌ Bad: "We decided to add a new section covering carbon sequestration because it's becoming increasingly important in the context of climate change mitigation and many funders are now prioritizing projects that demonstrate measurable carbon impact"
✅ Good: "Added Carbon Sequestration task category with 7 implementation guides"

### Focus on User Impact
Always answer: "How does this help the user?"
- ❌ "Refactored internal file structure"
- ✅ "Reorganized process docs into _process/ for cleaner navigation"

---

## Examples of Good Changelog Entries

### Example 1: Minor Version with New Features

```markdown
## [1.2.0] - 2025-11-15

### Added
- **Carbon Sequestration:** New task category with 7 detailed implementation guides
- **Templates:** Monthly progress report template for stakeholder updates
- **Strategic Documents:** Partnership framework document with legal considerations

### Changed
- **Funding Strategy:** Updated to reflect Q4 2025 grant opportunities and trends
- **Site Selection:** Enhanced criteria to include carbon sequestration potential assessment

### Fixed
- **Water Management:** Corrected equipment cost estimates (reduced by 15%)
- **Cross-Links:** Fixed 8 broken links in community engagement section
```

### Example 2: Patch Version with Fixes

```markdown
## [1.0.2] - 2025-11-01

### Fixed
- **Biodiversity:** Corrected scientific names for 12 native species
- **Links:** Fixed 15 broken links across all implementation task categories
- **Formatting:** Standardized heading levels in all overview documents
- **Budget:** Updated equipment costs to reflect 2025 market prices

### Changed
- **KPIs:** Clarified measurement methodology for biodiversity metrics
```

### Example 3: Major Version with Breaking Changes

```markdown
## [2.0.0] - 2026-01-15

### Added
- **Climate Adaptation:** New major category with 10 implementation guides
- **Technology:** AI-powered monitoring system documentation
- **Methodology:** Regenerative agriculture principles integrated throughout

### Changed
- **Structure:** Reorganized from 6 to 8 restoration categories (BREAKING)
- **Restoration Methodology:** Updated to prioritize climate resilience (BREAKING)
- **All Tasks:** Updated to align with new climate-focused approach

### Deprecated
- **Old Methodology:** Previous 5-pillar approach (see migration guide in v2.0.0/RELEASE_NOTES)

### Removed
- **Outdated Practices:** Removed 3 task files for superseded techniques
```

---

## Checklist Before Adding Entry

Before adding a new changelog entry, verify:

- [ ] Version number follows semantic versioning correctly
- [ ] Date is in YYYY-MM-DD format
- [ ] All changes are categorized correctly (Added/Changed/etc.)
- [ ] Each item has a category label
- [ ] Descriptions are clear and specific
- [ ] User impact is evident
- [ ] Links work (if applicable)
- [ ] Consistent with project's tone and style
- [ ] No spelling or grammar errors
- [ ] Cross-referenced with release notes (if major/minor version)

---

## Where to Add Entry

1. Open `CHANGELOG.md` in the project root
2. Add new entry AFTER the header but BEFORE previous versions
3. Maintain reverse chronological order (newest first)
4. Keep formatting consistent with existing entries

---

## Related Files to Update

When adding a version:

1. **CHANGELOG.md** (this file) - Add entry using this template
2. **VERSION** - Update to new version number
3. **_versions/vX.Y.Z/** - Create new version folder if major/minor
4. **_versions/vX.Y.Z/RELEASE_NOTES.md** - Create release notes if major/minor
5. **Relevant documents** - Update version footers if applicable

---

## Quick Reference

**Version Type Decision Tree:**

1. Does it break existing usage? → **MAJOR**
2. Does it add new functionality? → **MINOR**
3. Is it just fixes/improvements? → **PATCH**

**Category Decision Tree:**

1. What part of the project changed?
   - Content files → Use specific category (e.g., "Biodiversity")
   - Structure → Use "Structure"
   - Links/navigation → Use "Navigation" or "Cross-Linking"
   - Templates → Use "Templates"

---

*Use this template to maintain consistency across all changelog entries.*  
*Last Updated: 2025-10-25*  
*Template Version: 1.0.0*
