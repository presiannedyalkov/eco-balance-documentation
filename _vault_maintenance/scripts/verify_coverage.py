#!/usr/bin/env python3
"""
Verify Task Coverage - Ensure All Source Tasks Are Assigned to Agents

This script automatically verifies that:
1. All tasks from FIX_TASKS_*.md files are assigned to agents
2. No tasks are assigned to multiple agents (unless intentionally split)
3. All 20 agents have work assigned
4. No agents are missing or duplicated

Usage:
    python verify_coverage.py
"""

import re
from pathlib import Path
from typing import Dict, List, Set, Tuple
from collections import defaultdict


def parse_fix_tasks_file(file_path: Path) -> List[Dict]:
    """Parse a FIX_TASKS_*.md file to extract task information."""

    tasks = []

    if not file_path.exists():
        return tasks

    content = file_path.read_text()

    # Find all task headings: ### ⚠️ FIX-XXX: Title
    task_pattern = r'###\s+⚠️\s+(FIX-[A-Z0-9-]+):\s+(.+?)$'

    for match in re.finditer(task_pattern, content, re.MULTILINE):
        task_id = match.group(1)
        title = match.group(2).strip()
        persona = file_path.stem.replace('FIX_TASKS_', '')

        tasks.append({
            'id': task_id,
            'title': title,
            'persona': persona,
            'file': file_path.name
        })

    return tasks


def parse_agent_routing_master(file_path: Path) -> List[Dict]:
    """Parse AGENT_ROUTING_MASTER.md to extract agent assignments."""

    if not file_path.exists():
        print(f"❌ {file_path} not found")
        return []

    content = file_path.read_text()
    assignments = []

    # Find agent sections: ### AGENT N: Task Name
    agent_pattern = r'###\s+AGENT\s+(\d+):\s+(.+?)$'

    # Find task references: - FIX-XXX
    task_ref_pattern = r'-\s+(FIX-[A-Z0-9-]+)'

    current_agent = None
    current_section_text = ""

    for line in content.split('\n'):
        agent_match = re.match(agent_pattern, line)
        if agent_match:
            # Save previous agent if exists
            if current_agent:
                # Extract task IDs from previous section
                task_ids = re.findall(task_ref_pattern, current_section_text)
                if task_ids:
                    assignments.append({
                        'agent': current_agent,
                        'task_ids': task_ids
                    })

            # Start new agent
            current_agent = int(agent_match.group(1))
            current_section_text = ""
        else:
            current_section_text += line + "\n"

    # Don't forget the last agent
    if current_agent:
        task_ids = re.findall(task_ref_pattern, current_section_text)
        if task_ids:
            assignments.append({
                'agent': current_agent,
                'task_ids': task_ids
            })

    return assignments


def verify_coverage(vault_dir: Path = Path('.')) -> bool:
    """Main verification function."""

    print("🔍 TASK COVERAGE VERIFICATION\n")

    # 1. Parse all FIX_TASKS files
    fix_tasks_dir = vault_dir / '_vault_maintenance'
    fix_tasks_files = list(fix_tasks_dir.glob('FIX_TASKS_*.md'))

    all_source_tasks = []
    tasks_by_persona = defaultdict(list)

    print("📊 Source Tasks from FIX_TASKS files:\n")

    for file_path in sorted(fix_tasks_files):
        tasks = parse_fix_tasks_file(file_path)
        all_source_tasks.extend(tasks)
        persona = file_path.stem.replace('FIX_TASKS_', '')
        tasks_by_persona[persona] = tasks

        print(f"  {persona}: {len(tasks)} tasks")

    print(f"\n  TOTAL: {len(all_source_tasks)} tasks from source files\n")

    # 2. Parse agent routing master
    routing_file = vault_dir / '_vault_maintenance/agent_tasks/AGENT_ROUTING_MASTER.md'
    agent_assignments = parse_agent_routing_master(routing_file)

    print(f"🤖 Agent Assignments: {len(agent_assignments)} agents\n")

    # 3. Build assignment mapping
    assigned_tasks = set()
    task_to_agents = defaultdict(list)

    for assignment in agent_assignments:
        agent_num = assignment['agent']
        for task_id in assignment['task_ids']:
            assigned_tasks.add(task_id)
            task_to_agents[task_id].append(agent_num)

    # 4. Verify coverage
    source_task_ids = set(task['id'] for task in all_source_tasks)

    missing_tasks = source_task_ids - assigned_tasks
    extra_tasks = assigned_tasks - source_task_ids

    all_good = True

    # Check for missing tasks
    if missing_tasks:
        print("❌ MISSING TASKS (in source but not assigned):")
        for task_id in sorted(missing_tasks):
            task_info = next((t for t in all_source_tasks if t['id'] == task_id), {})
            print(f"  - {task_id}: {task_info.get('title', 'Unknown')}")
        print()
        all_good = False
    else:
        print("✅ All source tasks are assigned to agents\n")

    # Check for extra tasks (assigned but not in source)
    if extra_tasks:
        print("⚠️  EXTRA TASKS (assigned but not in FIX_TASKS files):")
        for task_id in sorted(extra_tasks):
            agents = task_to_agents[task_id]
            print(f"  - {task_id}: assigned to agents {agents}")
        print()
        # This might be okay if tasks were split

    # Check for duplicate assignments
    duplicates = {task_id: agents for task_id, agents
                  in task_to_agents.items() if len(agents) > 1}

    if duplicates:
        print("ℹ️  TASKS ASSIGNED TO MULTIPLE AGENTS:")
        for task_id, agents in sorted(duplicates.items()):
            print(f"  - {task_id}: agents {agents}")
        print("  (This is OK if task was intentionally split)\n")

    # Check agent coverage (1-20)
    assigned_agent_nums = set(a['agent'] for a in agent_assignments)
    expected_agents = set(range(1, 21))

    missing_agents = expected_agents - assigned_agent_nums
    extra_agents = assigned_agent_nums - expected_agents

    if missing_agents:
        print(f"❌ MISSING AGENTS: {sorted(missing_agents)}")
        all_good = False
    else:
        print("✅ All agents 1-20 have assignments\n")

    if extra_agents:
        print(f"⚠️  UNEXPECTED AGENTS: {sorted(extra_agents)}")

    # Summary
    print("=" * 60)
    print("SUMMARY:\n")
    print(f"  Source tasks: {len(source_task_ids)}")
    print(f"  Assigned tasks: {len(assigned_tasks)}")
    print(f"  Active agents: {len(assigned_agent_nums)}")
    print(f"  Coverage: {len(assigned_tasks)/len(source_task_ids)*100:.1f}%")
    print()

    if all_good and len(missing_tasks) == 0:
        print("✅ VERIFICATION PASSED - 100% COVERAGE")
        return True
    else:
        print("❌ VERIFICATION FAILED - FIX ISSUES ABOVE")
        return False


def main():
    """Main entry point."""
    success = verify_coverage()
    exit(0 if success else 1)


if __name__ == "__main__":
    main()
