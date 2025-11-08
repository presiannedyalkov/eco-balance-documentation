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

    # Fix pattern 1: [[../STRATEGIC_DOC]] -> [[../../STRATEGIC_DOC]]
    for doc in STRATEGIC_DOCS:
        # Match [[../DOC]] or [[../DOC|text]]
        old_pattern = f'\\[\\[\\.\\.\\/({doc}[^\\]]*)\\]\\]'
        new_pattern = f'[[../../\\1]]'

        matches = list(re.finditer(old_pattern, content))
        if matches:
            content = re.sub(old_pattern, new_pattern, content)
            changes.append(f"  ../{doc}  → ../../{doc}")

    # Fix pattern 2: [[STRATEGIC_DOC]] -> [[../../STRATEGIC_DOC]]
    # But NOT if it's already [[../../DOC]] or a same-directory reference
    for doc in STRATEGIC_DOCS:
        # Match [[DOC]] or [[DOC|text]] but NOT [[../DOC]] or [[../../DOC]] or [[subdir/DOC]]
        # Negative lookbehind to ensure no ../ or ../../ before the doc name
        old_pattern = f'\\[\\[(?!\\.\\./|\\.\\./\\.\\./|[a-z_]+/)({doc}(?:\\|[^\\]]+)?)\\]\\]'
        new_pattern = f'[[../../\\1]]'

        matches = list(re.finditer(old_pattern, content))
        if matches:
            content = re.sub(old_pattern, new_pattern, content)
            changes.append(f"  {doc}  → ../../{doc}")

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
        print(f"\nProcessing {subdir}/...")

        for md_file in sorted(subdir_path.glob('*.md')):
            changes = fix_links_in_file(md_file)
            if changes:
                total_files += 1
                total_fixes += len(changes)
                print(f"  ✓ {md_file.name}: {len(changes)} links fixed")
                for change in changes:
                    print(f"    {change}")
            else:
                print(f"  - {md_file.name}: No changes needed")

    print(f"\n" + "="*60)
    print(f"✅ COMPLETE: Fixed {total_fixes} links in {total_files} files")
    print("="*60)

if __name__ == '__main__':
    main()
