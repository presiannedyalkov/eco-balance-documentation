# 🔴 FIX AGENT 03 - Link Path Corrections

**Priority**: HIGH
**Agent**: FIX-AGENT-03
**Issues**: 101 link path issues
**Files**: All implementation task subdirectories
**Est. Time**: 6-8 hours

---

## 🎯 MISSION

Fix systematic link path errors throughout implementation tasks. The primary issue: files in `implementation_tasks/` subdirectories use `../` to reference strategic documents, but need `../../` to reach the root level.

**Impact**: 101 broken internal links prevent navigation between implementation tasks and strategic documents.

---

## 🔧 SYSTEMATIC ISSUE PATTERN

### Problem Example

**File**: `implementation_tasks/water_management/01_Assess_Water_Needs.md`
**Current (BROKEN)**: `[[../30_Business_Model]]`
**Fixed (WORKING)**: `[[../../30_Business_Model]]`

**Why**: The file is 2 levels deep (`implementation_tasks/water_management/`), so needs `../../` to reach root.

---

## 📁 FILES AFFECTED (45+ implementation task files)

All files in these subdirectories have link path issues:

### Biodiversity (7 files)
- `implementation_tasks/biodiversity/*.md` (except 00_Overview)

### Community Engagement (7 files)
- `implementation_tasks/community_engagement/*.md` (except 00_Overview)

### Reforestation (7 files)
- `implementation_tasks/reforestation/*.md` (except 00_Overview)

### Site Selection (9 files)
- `implementation_tasks/site_selection/*.md` (except 00_Overview)

### Soil Restoration (7 files)
- `implementation_tasks/soil_restoration/*.md` (except 00_Overview)

### Water Management (7 files)
- `implementation_tasks/water_management/*.md` (except 00_Overview)

---

## 🤖 AUTOMATED FIX APPROACH

### Option 1: Python Script (Recommended)

Create and run this script:

```python
#!/usr/bin/env python3
"""Fix link paths in implementation task files."""

import re
from pathlib import Path

# Strategic documents that are referenced from implementation tasks
STRATEGIC_DOCS = [
    '00_Eco_Balance_Hub',
    '01_Executive_Summary',
    '02_Project_Vision',
    '03_Success_Factors',
    '04_Current_Status_Assessment',
    '10_Organizational_Structure',
    '11_Governance',
    '12_Team_Roles',
    '13_Legal_Framework',
    '20_Restoration_Methodology',
    '21_Technology_Integration',
    '22_Restoration_Challenges_Solutions',
    '30_Business_Model',
    '32_Funding_Strategy',
    '40_Expansion_Growth_Strategy',
    '42_Next_Steps_90_Days',
    '43_Operations_Action_Plan',
    '44_Site_Selection_Land_Acquisition',
    '45_Tiny_House_and_Living_Infrastructure',
    '50_Risk_Assessment',
    '51_Key_Performance_Indicators',
    '60_Marketing_Communications_Strategy',
    '70_Case_Studies_Restoration_Examples',
    'CHANGELOG',
    'QUICK_REFERENCE_GUIDE',
]

def fix_links_in_file(filepath):
    """Fix relative link paths in a single file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    changes = []

    # Fix pattern: [[../STRATEGIC_DOC]] -> [[../../STRATEGIC_DOC]]
    for doc in STRATEGIC_DOCS:
        # Match [[../DOC]] or [[../DOC|text]]
        old_pattern = f'\\[\\[\\.\\.\\/({doc}[^\\]]*)\\]\\]'
        new_pattern = f'[[../../\\1]]'

        if re.search(old_pattern, content):
            content = re.sub(old_pattern, new_pattern, content)
            changes.append(f"  ../{}  → ../../{}")

    # Only write if changes made
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return changes
    return None

def main():
    """Process all implementation task files."""
    base_path = Path('implementation_tasks')

    subdirs = ['biodiversity', 'community_engagement', 'reforestation',
               'site_selection', 'soil_restoration', 'water_management']

    total_files = 0
    total_fixes = 0

    for subdir in subdirs:
        subdir_path = base_path / subdir
        print(f"\\nProcessing {subdir}/...")

        for md_file in sorted(subdir_path.glob('*.md')):
            if md_file.name == '00_*_Overview.md':
                continue  # Skip overview files

            changes = fix_links_in_file(md_file)
            if changes:
                total_files += 1
                total_fixes += len(changes)
                print(f"  ✓ {md_file.name}: {len(changes)} links fixed")
                for change in changes:
                    print(f"    {change}")

    print(f"\\n" + "="*60)
    print(f"✅ COMPLETE: Fixed {total_fixes} links in {total_files} files")
    print("="*60)

if __name__ == '__main__':
    main()
```

**Run**:
```bash
cd /home/presi/projects/eco-balance-documentation
python3 _vault_maintenance/audit_round_2/scripts/fix_links.py
```

### Option 2: Manual sed Command

For those who prefer shell scripting:

```bash
#!/bin/bash

# Navigate to project root
cd /home/presi/projects/eco-balance-documentation

# Find all implementation task files (except Overviews)
find implementation_tasks/ -name "*.md" ! -name "00_*_Overview.md" | while read file; do
    # Backup original
    cp "$file" "$file.bak"

    # Fix ../STRATEGIC_DOC patterns
    sed -i 's/\\[\\[\\.\\.\\/\\([0-9][0-9]_[^]]*\\)\\]\\]/[[..\\/..\\/\\1]]/g' "$file"
    sed -i 's/\\[\\[\\.\\.\\/\\(CHANGELOG[^]]*\\)\\]\\]/[[..\\/..\\/\\1]]/g' "$file"
    sed -i 's/\\[\\[\\.\\.\\/\\(QUICK_REFERENCE[^]]*\\)\\]\\]/[[..\\/..\\/\\1]]/g' "$file"

    # Report changes
    if ! diff "$file" "$file.bak" > /dev/null; then
        echo "✓ Fixed: $file"
        diff "$file.bak" "$file" | grep "^[<>]" | head -3
    fi

    # Remove backup
    rm "$file.bak"
done
```

---

## 🔍 MANUAL VERIFICATION

After running automated fixes, manually verify these edge cases:

### 1. Cross-Implementation-Task Links

**Check**: Links between implementation task files
**Pattern**: `[[../biodiversity/01_Assess_Biodiversity]]` from water_management/
**Fix**: Should be `[[../biodiversity/01_Assess_Biodiversity]]` (only 1 level up, same level down)

### 2. README Links

**Check**: References to `implementation_tasks/README.md`
**From subdirectory**: `[[../README]]` is CORRECT
**From root strategic doc**: `[[implementation_tasks/README]]` is CORRECT

### 3. Process Documentation Links

**Check**: Links to `_process/` files from implementation tasks
**Example**: `[[../../_process/audit/COMPREHENSIVE_AUDIT_REPORT]]` (2 levels up to root, then into _process)

### 4. Duplicate Links

Several files were flagged for having duplicate navigation links. While fixing paths, also:
- Remove duplicate `[[00_Eco_Balance_Hub]]` references
- Consolidate repeated "Related Documents" sections

---

## 📋 SPECIFIC FILE ISSUES

### High-Priority Individual Fixes

**File**: `implementation_tasks/community_engagement/02_Communicate_Plans.md`
- **Issue**: 8 broken strategic doc links
- **Pattern**: All use `../` instead of `../../`
- **Strategic docs referenced**: 30_Business_Model, 42_Next_Steps_90_Days, 60_Marketing_Communications_Strategy

**File**: `implementation_tasks/community_engagement/04_Involve_Community.md`
- **Issue**: 6 broken strategic doc links
- **Pattern**: All use `../` instead of `../../`

**File**: `implementation_tasks/water_management/06_Monitor_Water_Use.md`
- **Issue**: 7 broken strategic doc links
- **Pattern**: All use `../` instead of `../../`

**File**: `implementation_tasks/biodiversity/03_Create_Protected_Areas.md`
- **Issue**: 5 broken strategic doc links
- **Pattern**: All use `../` instead of `../../`

---

## ✅ VERIFICATION CHECKLIST

Run these checks after fixes:

### Automated Link Check Script

```python
#!/usr/bin/env python3
"""Verify all internal links resolve correctly."""

import re
from pathlib import Path

def check_link(source_file, link_path):
    """Check if a wiki-link resolves to an existing file."""
    source_dir = source_file.parent

    # Handle [[../../DOC]] style links
    if link_path.startswith('../'):
        target = source_dir / link_path
        # Try with .md extension
        if not target.with_suffix('.md').exists():
            return False, f"NOT FOUND: {target}.md"
        return True, "OK"

    return True, "SKIP (not relative link)"

def verify_file(filepath):
    """Verify all links in a file."""
    with open(filepath, 'r') as f:
        content = f.read()

    # Find all wiki-links
    links = re.findall(r'\\[\\[([^\\]]+?)(?:\\|[^\\]]+)?\\]\\]', content)

    broken = []
    for link in links:
        is_valid, status = check_link(filepath, link)
        if not is_valid:
            broken.append(f"{link}: {status}")

    return broken

def main():
    """Verify all implementation task files."""
    base_path = Path('implementation_tasks')
    all_broken = {}

    for md_file in base_path.rglob('*.md'):
        broken = verify_file(md_file)
        if broken:
            all_broken[str(md_file)] = broken

    if all_broken:
        print("❌ BROKEN LINKS FOUND:\\n")
        for filepath, links in all_broken.items():
            print(f"{filepath}:")
            for link in links:
                print(f"  - {link}")
    else:
        print("✅ ALL LINKS VERIFIED - No broken links found!")

if __name__ == '__main__':
    main()
```

### Manual Checks

- [ ] Pick 5 random implementation task files
- [ ] Click on strategic document links
- [ ] Verify they navigate to correct file
- [ ] Check that overview file links still work
- [ ] Verify cross-implementation-task links work

---

## 📤 DELIVERABLES

1. **Fixed Files**: 45+ implementation task files with corrected link paths
2. **Link Fix Script**: Python/bash script used for automated fixes
3. **Verification Report**: Output from link verification script
4. **Pull Request**:
   - Branch: `fix-round-2/agent-03-link-corrections`
   - Title: "Fix Round 2: Agent 03 - Systematic Link Path Corrections"
   - Description: "Fixed 101 broken links (../ → ../../) in implementation tasks"

---

## 🚨 IMPORTANT NOTES

1. **Test Before Committing**: Run verification script before creating PR
2. **Obsidian vs GitHub**: Links work in Obsidian file browser but may have different behavior in GitHub
3. **Don't Break Working Links**: Only fix links that are actually broken
4. **Backup First**: Script creates .bak files before modifying

---

**Status**: Ready for Execution
**Priority**: 🔴 HIGH - Execute after Critical fixes (Agents 1-2)
