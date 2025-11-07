#!/usr/bin/env python3
"""Split AUDIT_TASKS.md and FIX_TASKS.md by persona"""

import re
from pathlib import Path

PERSONAS = {
    'CURATOR': {'name': 'Curator', 'focus': 'Content quality, completeness, coherence, narrative flow, cross-references'},
    'JANITOR': {'name': 'Janitor', 'focus': 'Organization, file placement, naming conventions, structure'},
    'LIBRARIAN': {'name': 'Librarian', 'focus': 'Navigation, links, discoverability, cross-references'},
    'AUDITOR': {'name': 'Auditor', 'focus': 'Completeness, consistency, standards compliance'},
    'ARCHIVIST': {'name': 'Archivist', 'focus': 'Version control, history, archival, documentation'},
    'QUALITY INSPECTOR': {'name': 'Quality Inspector', 'focus': 'Formatting, style, polish, consistency'},
}

def extract_persona_audit_tasks(input_file, persona_key):
    """Extract all tasks for a specific persona from AUDIT_TASKS.md"""
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    persona_tasks = []
    in_persona_task = False
    current_task = []

    for i, line in enumerate(lines):
        # Check if this is a task line for our persona
        if re.match(rf'^\s*-\s*\[(x| )\]\s*\*\*{re.escape(persona_key)}\*\*', line):
            # Save previous task if exists
            if current_task:
                persona_tasks.append(''.join(current_task))
                current_task = []

            in_persona_task = True
            current_task.append(line)

        elif in_persona_task:
            # Check if we've hit another persona's task at the same level
            if re.match(r'^\s*-\s*\[(x| )\]\s*\*\*', line):
                # Different persona task - end of current task
                persona_tasks.append(''.join(current_task))
                current_task = []
                in_persona_task = False
            else:
                # Part of the current task (sub-bullets, result lines, etc.)
                current_task.append(line)

    # Don't forget the last task
    if current_task:
        persona_tasks.append(''.join(current_task))

    return persona_tasks

def extract_persona_fix_tasks(input_file, persona_name):
    """Extract all FIX tasks found by a specific persona"""
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split into individual fix tasks
    fix_sections = re.split(r'\n###\s+⚠️\s+FIX-', content)

    persona_fixes = []
    for section in fix_sections[1:]:  # Skip first split (header)
        # Check if this fix was found by our persona
        if f'Found By.*{persona_name}' in section or f'Found By:.*{persona_name}' in section:
            # Reconstruct the fix task with header
            persona_fixes.append('### ⚠️ FIX-' + section)

    return persona_fixes

def count_by_priority(fixes):
    """Count fixes by priority level"""
    critical = sum(1 for f in fixes if '🚨 CRITICAL' in f or 'Priority**: 🚨' in f)
    high = sum(1 for f in fixes if '🔴 HIGH' in f or 'Priority**: 🔴' in f)
    medium = sum(1 for f in fixes if '🟡 MEDIUM' in f or 'Priority**: 🟡' in f)
    low = sum(1 for f in fixes if '🟢 LOW' in f or 'Priority**: 🟢' in f)
    return {'critical': critical, 'high': high, 'medium': medium, 'low': low}

if __name__ == '__main__':
    vault_dir = Path('/home/user/eco-balance-documentation/_vault_maintenance')
    audit_file = vault_dir / 'AUDIT_TASKS.md'
    fix_file = vault_dir / 'FIX_TASKS.md'

    print("=" * 80)
    print("EXTRACTING TASKS BY PERSONA")
    print("=" * 80)

    for persona_key, persona_info in PERSONAS.items():
        persona_name = persona_info['name']

        # Extract audit tasks
        audit_tasks = extract_persona_audit_tasks(audit_file, persona_key)

        # Extract fix tasks
        fix_tasks = extract_persona_fix_tasks(fix_file, persona_name)

        # Count priorities
        fix_counts = count_by_priority(fix_tasks)

        print(f"\n{persona_name.upper()}:")
        print(f"  Audit tasks: {len(audit_tasks)}")
        print(f"  Fix tasks: {len(fix_tasks)}")
        if len(fix_tasks) > 0:
            print(f"    - Critical: {fix_counts['critical']}")
            print(f"    - High: {fix_counts['high']}")
            print(f"    - Medium: {fix_counts['medium']}")
            print(f"    - Low: {fix_counts['low']}")

    print("\n" + "=" * 80)
    print("TOTALS:")
    total_audit = sum(len(extract_persona_audit_tasks(audit_file, pk)) for pk in PERSONAS.keys())
    total_fix = sum(len(extract_persona_fix_tasks(fix_file, pi['name'])) for pi in PERSONAS.values())
    print(f"  Total audit tasks: {total_audit}")
    print(f"  Total fix tasks: {total_fix}")
    print("=" * 80)
