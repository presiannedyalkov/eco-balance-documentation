#!/usr/bin/env python3
"""Extract Curator-found fix tasks from FIX_TASKS.md"""

import re

def extract_curator_fixes(input_file):
    """Extract all FIX tasks found by Curator"""
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    curator_fixes = []
    in_curator_fix = False
    current_fix = []
    fix_number = None

    for i, line in enumerate(lines):
        # Check if this is a new FIX task header (### ⚠️ FIX-XXX:)
        fix_match = re.match(r'^###\s+⚠️\s+FIX-(\d+):', line)
        if fix_match:
            # Save previous fix if it was a Curator fix
            if current_fix and in_curator_fix:
                curator_fixes.append({
                    'number': fix_number,
                    'content': ''.join(current_fix)
                })

            # Start new fix
            current_fix = [line]
            fix_number = fix_match.group(1)
            in_curator_fix = False

        elif current_fix:
            # Check if this fix was found by Curator
            if 'Found By' in line and 'Curator' in line:
                in_curator_fix = True

            # Add line to current fix
            current_fix.append(line)

            # Check if we've hit the next fix section (two blank lines or another ###)
            if line.strip() == '' and i + 1 < len(lines) and lines[i + 1].strip() == '':
                # Might be end of this fix task
                if i + 2 < len(lines) and re.match(r'^###\s+⚠️\s+FIX-', lines[i + 2]):
                    # Definitely end of this fix
                    if in_curator_fix:
                        curator_fixes.append({
                            'number': fix_number,
                            'content': ''.join(current_fix)
                        })
                    current_fix = []
                    fix_number = None
                    in_curator_fix = False

    # Don't forget the last fix
    if current_fix and in_curator_fix:
        curator_fixes.append({
            'number': fix_number,
            'content': ''.join(current_fix)
        })

    return curator_fixes

if __name__ == '__main__':
    input_file = '/home/user/eco-balance-documentation/_vault_maintenance/FIX_TASKS.md'
    fixes = extract_curator_fixes(input_file)

    print(f"Found {len(fixes)} Curator fix tasks\n")
    print("FIX numbers:", [f['number'] for f in fixes])

    for fix in fixes:
        print(f"\n{'=' * 80}")
        print(fix['content'])
