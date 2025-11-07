#!/usr/bin/env python3
"""Create persona-specific AUDIT and FIX task files"""

import re
from pathlib import Path
from datetime import date

PERSONAS = {
    'CURATOR': {
        'name': 'Curator',
        'focus': 'Content quality, completeness, coherence, narrative flow, cross-references',
        'emoji': '🎭'
    },
    'JANITOR': {
        'name': 'Janitor',
        'focus': 'Organization, file placement, naming conventions, structure',
        'emoji': '🧹'
    },
    'LIBRARIAN': {
        'name': 'Librarian',
        'focus': 'Navigation, links, discoverability, cross-references',
        'emoji': '📚'
    },
    'AUDITOR': {
        'name': 'Auditor',
        'focus': 'Completeness, consistency, standards compliance',
        'emoji': '📋'
    },
    'ARCHIVIST': {
        'name': 'Archivist',
        'focus': 'Version control, history, archival, documentation',
        'emoji': '📜'
    },
    'QUALITY INSPECTOR': {
        'name': 'Quality Inspector',
        'focus': 'Formatting, style, polish, consistency',
        'emoji': '✨'
    },
}

def extract_audit_tasks(input_file, persona_key):
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
            # Check if we've hit another task at the same indentation level
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

def extract_fix_tasks(input_file, persona_name):
    """Extract all FIX tasks found by a specific persona"""
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    persona_fixes = []
    in_fix = False
    current_fix = []
    is_persona_fix = False

    for i, line in enumerate(lines):
        # Check for FIX task header
        if re.match(r'^###\s+⚠️\s+FIX-', line):
            # Save previous fix if it was for this persona
            if current_fix and is_persona_fix:
                persona_fixes.append(''.join(current_fix))

            # Start new fix
            current_fix = [line]
            in_fix = True
            is_persona_fix = False

        elif in_fix:
            current_fix.append(line)
            # Check if this fix was found by our persona
            if 'Found By' in line and persona_name in line:
                is_persona_fix = True

    # Don't forget the last fix
    if current_fix and is_persona_fix:
        persona_fixes.append(''.join(current_fix))

    return persona_fixes

def create_audit_file(persona_key, persona_info, tasks, output_dir):
    """Create AUDIT_TASKS_[PERSONA].md file"""
    persona_name = persona_info['name']
    persona_focus = persona_info['focus']
    emoji = persona_info['emoji']

    # Count completed vs total
    completed = sum(1 for t in tasks if t.strip().startswith('- [x]'))
    total = len(tasks)
    status = "✅ ALL COMPLETE" if completed == total else f"{completed}/{total} COMPLETE"

    content = f"""# {emoji} {persona_name.upper()} AUDIT TASKS

**Persona**: {persona_name}
**Focus**: {persona_focus}
**Total Tasks**: {total}
**Status**: {status} ({date.today().strftime('%Y-%m-%d')})
**Version**: 2.0.0 (Bootstrap Model)

---

## 📋 PURPOSE

This file contains **only** the audit tasks assigned to the **{persona_name.upper()}** persona.

**{persona_name} Role**: {persona_focus}

---

## 🚨 WORKFLOW INSTRUCTIONS

### For {persona_name} Persona

1. **Read persona file**: `_vault_maintenance/personas/{persona_name.lower().replace(' ', '_')}.md`
2. **Work through tasks** below sequentially
3. **Document findings** in Result field
4. **Add issues** to `FIX_TASKS_{persona_name.upper().replace(' ', '_')}.md`
5. **Mark complete**: Change `[ ]` to `[x]` and fill in Result
6. **Create merge request** after each session

### Merge Strategy

When ready to merge:
- Your branch will only modify THIS file
- Other personas modify their own files
- No merge conflicts!

---

## ✅ {persona_name.upper()} AUDIT TASKS

"""

    # Add all tasks
    for task in tasks:
        content += task + '\n'

    content += f"""
---

## 📊 AUDIT SUMMARY

**Total Tasks**: {total}
**Completed**: {completed} ({100 * completed // total if total > 0 else 0}%)
**Status**: {status}

---

## 🔗 RELATED FILES

- **Fix Tasks**: `_vault_maintenance/FIX_TASKS_{persona_name.upper().replace(' ', '_')}.md`
- **Persona Definition**: `_vault_maintenance/personas/{persona_name.lower().replace(' ', '_')}.md`
- **Workflow**: `_vault_maintenance/WORKFLOW.md`
"""

    filename = f"AUDIT_TASKS_{persona_name.upper().replace(' ', '_')}.md"
    output_path = output_dir / filename

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)

    return output_path

def create_fix_file(persona_key, persona_info, fixes, output_dir):
    """Create FIX_TASKS_[PERSONA].md file"""
    persona_name = persona_info['name']
    persona_focus = persona_info['focus']
    emoji = persona_info['emoji']

    # Count by priority
    critical = sum(1 for f in fixes if '🚨 CRITICAL' in f or 'Priority**: 🚨' in f)
    high = sum(1 for f in fixes if '🔴 HIGH' in f or 'Priority**: 🔴' in f)
    medium = sum(1 for f in fixes if '🟡 MEDIUM' in f or 'Priority**: 🟡' in f)
    low = sum(1 for f in fixes if '🟢 LOW' in f or 'Priority**: 🟢' in f)
    total = len(fixes)

    content = f"""# {emoji} {persona_name.upper()} FIX TASKS

**Persona**: {persona_name}
**Focus**: {persona_focus}
**Total Issues Found**: {total}
**Status**: All documented, awaiting Phase 2 (Fix phase) to begin
**Version**: 2.0.0 (Bootstrap Model)

---

## 📋 PURPOSE

This file contains **only** the fix tasks discovered by the **{persona_name.upper()}** persona during audit.

**Important**: This is PHASE 2 work. Do NOT start fixes until the full vault audit is 100% complete.

---

## 🚨 WORKFLOW INSTRUCTIONS

### For {persona_name} Persona (During Fix Phase)

1. **Wait for audit complete**: Check that all personas have finished their audits
2. **Work by priority**: CRITICAL → HIGH → MEDIUM → LOW
3. **Fix one task at a time**: Make changes, verify, mark complete
4. **Update this file**: Change status to `[x] Complete (Date: 2025-11-XX)`
5. **Create merge request** after completing each fix

### Merge Strategy

When ready to merge:
- Your branch will only modify THIS file and the files being fixed
- Other personas modify their own fix files
- Reduced merge conflicts!

---

## 📊 FIX TASKS BY PRIORITY

"""

    if critical > 0:
        content += "\n### 🚨 CRITICAL PRIORITY\n\n"
        for fix in fixes:
            if '🚨 CRITICAL' in fix or 'Priority**: 🚨' in fix:
                content += fix + "\n---\n\n"

    if high > 0:
        content += "\n### 🔴 HIGH PRIORITY\n\n"
        for fix in fixes:
            if '🔴 HIGH' in fix or 'Priority**: 🔴' in fix:
                content += fix + "\n---\n\n"

    if medium > 0:
        content += "\n### 🟡 MEDIUM PRIORITY\n\n"
        for fix in fixes:
            if '🟡 MEDIUM' in fix or 'Priority**: 🟡' in fix:
                content += fix + "\n---\n\n"

    if low > 0:
        content += "\n### 🟢 LOW PRIORITY\n\n"
        for fix in fixes:
            if '🟢 LOW' in fix or 'Priority**: 🟢' in fix:
                content += fix + "\n---\n\n"

    if total == 0:
        content += "\nNo issues found by {persona_name} during audit. ✅\n\n"

    content += f"""
---

## 📊 {persona_name.upper()} FIX SUMMARY

**Total {persona_name}-Found Issues**: {total}

**By Priority**:
- 🚨 **CRITICAL**: {critical} tasks
- 🔴 **HIGH**: {high} tasks
- 🟡 **MEDIUM**: {medium} tasks
- 🟢 **LOW**: {low} tasks

**Completion Status**:
- [ ] CRITICAL Priority: ___ / {critical} complete
- [ ] HIGH Priority: ___ / {high} complete
- [ ] MEDIUM Priority: ___ / {medium} complete
- [ ] LOW Priority: ___ / {low} complete
- [ ] **TOTAL**: ___ / {total} complete

---

## 🔗 RELATED FILES

- **Audit Tasks**: `_vault_maintenance/AUDIT_TASKS_{persona_name.upper().replace(' ', '_')}.md`
- **Persona Definition**: `_vault_maintenance/personas/{persona_name.lower().replace(' ', '_')}.md`
- **Workflow**: `_vault_maintenance/WORKFLOW.md`

---

**Status**: Ready for Phase 2 (Fix phase) - awaiting full audit completion
**Next Action**: Wait for all personas to complete audits, then start fixes by priority
"""

    filename = f"FIX_TASKS_{persona_name.upper().replace(' ', '_')}.md"
    output_path = output_dir / filename

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)

    return output_path

if __name__ == '__main__':
    vault_dir = Path('/home/user/eco-balance-documentation/_vault_maintenance')
    audit_file = vault_dir / 'AUDIT_TASKS.md'
    fix_file = vault_dir / 'FIX_TASKS.md'

    print("=" * 80)
    print("CREATING PERSONA-SPECIFIC FILES")
    print("=" * 80)

    for persona_key, persona_info in PERSONAS.items():
        persona_name = persona_info['name']
        print(f"\n{persona_name.upper()}:")

        # Extract and create audit file
        audit_tasks = extract_audit_tasks(audit_file, persona_key)
        audit_path = create_audit_file(persona_key, persona_info, audit_tasks, vault_dir)
        print(f"  ✓ Created {audit_path.name} ({len(audit_tasks)} tasks)")

        # Extract and create fix file
        fix_tasks = extract_fix_tasks(fix_file, persona_name)
        fix_path = create_fix_file(persona_key, persona_info, fix_tasks, vault_dir)
        print(f"  ✓ Created {fix_path.name} ({len(fix_tasks)} issues)")

    print("\n" + "=" * 80)
    print("ALL PERSONA FILES CREATED SUCCESSFULLY")
    print("=" * 80)
