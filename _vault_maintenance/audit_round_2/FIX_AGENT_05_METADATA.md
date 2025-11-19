# 🟡 FIX AGENT 05 - Metadata Standardization

**Priority**: MEDIUM
**Agent**: FIX-AGENT-05
**Issues**: 52 metadata issues
**Files**: All files missing metadata (40+ files)
**Est. Time**: 3-4 hours

---

## 🎯 MISSION

Standardize metadata across all documentation. Most implementation task files lack version/date metadata. Some strategic documents have incorrect dates (future dates, outdated "last updated" fields).

**Approach**: Batch-add metadata template to all files, correct date errors.

---

## 📋 STANDARD METADATA TEMPLATE

### For Implementation Task Files

Add this header to ALL implementation task files that lack metadata:

```markdown
---
**Document Version:** 2.0.0
**Last Updated:** 2024-11-08
**Status:** Active
**Aligned with:** Bootstrap Model v2.0
---

# [Document Title]
```

### For Strategic Documents

Strategic documents already have metadata, but need corrections:

```markdown
---
**Document Version:** 2.0.0  
**Last Updated:** [Current date when you fix it]
**Status:** Active
---
```

---

## 🤖 AUTOMATED BATCH APPROACH

### Python Script to Add Metadata

```python
#!/usr/bin/env python3
"""Add standard metadata to all implementation task files."""

from pathlib import Path
from datetime import date

METADATA_TEMPLATE = """---
**Document Version:** 2.0.0
**Last Updated:** {date}
**Status:** Active
**Aligned with:** Bootstrap Model v2.0
---

"""

def add_metadata(filepath):
    """Add metadata to file if missing."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if metadata already exists
    if content.startswith('---'):
        return False, "Already has metadata"

    # Add metadata
    today = date.today().strftime('%Y-%m-%d')
    new_content = METADATA_TEMPLATE.format(date=today) + content

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    return True, "Metadata added"

def main():
    """Process all implementation task files."""
    base_path = Path('implementation_tasks')
    added_count = 0

    for md_file in base_path.rglob('*.md'):
        if md_file.name == 'README.md':
            continue

        added, status = add_metadata(md_file)
        if added:
            added_count += 1
            print(f"✓ {md_file}: {status}")
        else:
            print(f"  {md_file}: {status}")

    print(f"\n✅ Added metadata to {added_count} files")

if __name__ == '__main__':
    main()
```

---

## 📁 SPECIFIC DATE CORRECTIONS

### Files with Future/Incorrect Dates

1. **30_Business_Model.md**
   - **Line 4**: "Last Updated: November 6, 2025"
   - **Fix**: "Last Updated: 2024-11-08" (or actual date when fixed)

2. **_process/README.md**
   - Check for future dates in metadata

3. **_process/documentation/STRUCTURE_VISUAL_GUIDE.md**
   - Verify and correct any incorrect dates

4. **_process/migration/MIGRATION_ANALYSIS_COMPLETE.md**
   - Update "Last Updated" to actual date

### Files Missing Metadata Entirely

**Strategic Document**:
- `51_Key_Performance_Indicators.md` - Only strategic doc missing version/date footer

**All Implementation Tasks** (40+ files):
- All subdirectories under `implementation_tasks/` except 00_Overview files
- Most lack any version or date tracking

---

## 📋 VERSION CONSISTENCY

### Ensure All References Show v2.0.0

Check and fix version number references:

**QUICK_REFERENCE_GUIDE.md**:
- Line ~10: Header says "v2.0.0" ✓
- Line ~45: Body says "v1.0.0" ✗ → Fix to "v2.0.0"
- Line ~90: References "Version 1.0" ✗ → Fix to "Version 2.0"

**Search Pattern**:
```bash
# Find any lingering v1.0 references
grep -r "v1\.0" --include="*.md" .
grep -r "Version 1" --include="*.md" .
grep -r "1\.0\.0" --include="*.md" .
```

**Replace with**: v2.0.0, Version 2.0, 2.0.0 (as appropriate)

---

## 🗓️ DATE POLICY ESTABLISHMENT

Document the dating policy in metadata:

### Last Updated Date Rules

1. **Format**: YYYY-MM-DD (ISO 8601)
2. **Trigger**: Update when:
   - Content is substantively changed
   - Structure is reorganized
   - Data/facts are updated
   - NOT for: typo fixes, minor formatting

3. **Version Bump**: Increment version when:
   - Major content rewrite
   - Structural changes
   - Scope/model alignment changes

### Status Values

- **Active**: Current, in-use documentation
- **Historical**: Archived, superseded content
- **Draft**: Work in progress
- **Deprecated**: No longer recommended

---

## ✅ VERIFICATION CHECKLIST

### Automated Checks

```bash
# Check all implementation tasks have metadata
find implementation_tasks/ -name "*.md" ! -name "README.md" ! -name "00_*" -exec grep -L "^---" {} \;
# Should return empty if all have metadata

# Check for future dates (assuming current year is 2024)
grep -r "2025\|2026\|2027" --include="*.md" . | grep "Last Updated"
# Should return empty

# Check version consistency
grep -r "v1\.0" --include="*.md" .
# Should return only historical/archive files
```

### Manual Spot Checks

- [ ] Pick 10 random implementation task files → all have metadata
- [ ] Check strategic docs → all show v2.0.0
- [ ] Verify dates are realistic (not in future)
- [ ] Check QUICK_REFERENCE_GUIDE has no v1.0 references
- [ ] Verify 51_Key_Performance_Indicators.md has metadata footer

---

## 📤 DELIVERABLES

1. **Fixed Files**: 40+ files with added/corrected metadata
2. **Metadata Script**: Batch addition script used
3. **Pull Request**:
   - Branch: `fix-round-2/agent-05-metadata`
   - Title: "Fix Round 2: Agent 05 - Metadata Standardization"
   - Description: "Added standard v2.0.0 metadata to all files, corrected dates"

---

**Status**: Ready for Execution
**Priority**: 🟡 MEDIUM - Execute after HIGH priority fixes
