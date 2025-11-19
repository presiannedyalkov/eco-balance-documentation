#!/usr/bin/env python3
"""Extract Curator tasks from AUDIT_TASKS.md"""

import re

def extract_curator_tasks(input_file):
    """Extract all CURATOR tasks with their full context"""
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    curator_tasks = []
    in_curator_task = False
    current_task = []
    indent_level = 0

    for i, line in enumerate(lines):
        # Check if this is a CURATOR task line
        if re.match(r'^\s*-\s*\[(x| )\]\s*\*\*CURATOR\*\*', line):
            # Save previous task if exists
            if current_task:
                curator_tasks.append(''.join(current_task))
                current_task = []

            in_curator_task = True
            current_task.append(line)
            # Get the indent level of the task
            indent_level = len(line) - len(line.lstrip())

        elif in_curator_task:
            # Check if we've hit another task at the same or higher level
            if re.match(r'^\s*-\s*\[(x| )\]\s*\*\*', line):
                # Different persona task - end of current task
                curator_tasks.append(''.join(current_task))
                current_task = []
                in_curator_task = False
            else:
                # Part of the current task (sub-bullets, result lines, etc.)
                current_task.append(line)

    # Don't forget the last task
    if current_task:
        curator_tasks.append(''.join(current_task))

    return curator_tasks

if __name__ == '__main__':
    input_file = '/home/user/eco-balance-documentation/_vault_maintenance/AUDIT_TASKS.md'
    tasks = extract_curator_tasks(input_file)

    print(f"Found {len(tasks)} CURATOR tasks\n")
    print("=" * 80)

    for i, task in enumerate(tasks, 1):
        print(f"\n### TASK {i}:\n{task}")
        print("-" * 80)
