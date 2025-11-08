#!/usr/bin/env python3
"""
Generate Agent Task Files from Structured Task Data

This script automates the creation of all agent task files from a structured
task definition, eliminating manual file creation and ensuring consistency.

Usage:
    python generate_agent_tasks.py tasks.json output_dir/

Input: JSON file with task definitions
Output: 20 agent task markdown files
"""

import json
import sys
from pathlib import Path
from typing import Dict, List


TASK_FILE_TEMPLATE = """# 🤖 AGENT {agent_num:02d}: {task_name}

**Priority**: {priority}
**Estimated Time**: {time_estimate}
**Difficulty**: {difficulty}
**Files to Modify**: {file_count}

---

## 📋 TASK SUMMARY

{summary}

**Source**: {source_task_id} from {source_file}

---

## 🎯 TASKS TO COMPLETE

{detailed_tasks}

---

## ✅ EXECUTION STEPS

{execution_steps}

---

## 🔍 VERIFICATION CHECKLIST

{verification_checklist}

---

## 📝 COMPLETION REPORT TEMPLATE

When done, report:

```
✅ AGENT {agent_num:02d} COMPLETE

Tasks Completed:
{completion_summary}

Files Modified:
{files_modified_list}

Verification:
{verification_summary}

Time Taken: [X] minutes
```

---

## 🔀 GIT WORKFLOW

**Branch name**: `claude/agent-{agent_num:02d}-{task_slug}-{{id}}`

**Commit message format**:
```
{commit_message_template}
```

---

**Status**: Ready for execution
**Next Agent**: {next_agent_info}
"""


def generate_agent_task_file(agent_num: int, task_data: Dict) -> str:
    """Generate a complete agent task file from task data."""

    return TASK_FILE_TEMPLATE.format(
        agent_num=agent_num,
        task_name=task_data.get('name', 'Task Name'),
        priority=task_data.get('priority', '🟡 MEDIUM'),
        time_estimate=task_data.get('time_estimate', '20-30 min'),
        difficulty=task_data.get('difficulty', 'Medium'),
        file_count=task_data.get('file_count', 1),
        summary=task_data.get('summary', 'Task summary'),
        source_task_id=task_data.get('source_task_id', 'FIX-XXX'),
        source_file=task_data.get('source_file', 'FIX_TASKS_PERSONA.md'),
        detailed_tasks=task_data.get('detailed_tasks', '### Task 1\n\nDetails here'),
        execution_steps=task_data.get('execution_steps', '1. Step 1\n2. Step 2'),
        verification_checklist=task_data.get('verification_checklist',
                                              '- [ ] Check 1\n- [ ] Check 2'),
        completion_summary=task_data.get('completion_summary', '- Task completed'),
        files_modified_list=task_data.get('files_modified_list', '- file.md'),
        verification_summary=task_data.get('verification_summary',
                                            '- All checks passed ✓'),
        task_slug=task_data.get('slug', 'task'),
        commit_message_template=task_data.get('commit_template',
                                                'Fix task for agent {agent_num:02d}'),
        next_agent_info=task_data.get('next_agent_info',
                                        'Agent N+1 (can run in parallel)')
    )


def load_task_definitions(json_file: Path) -> List[Dict]:
    """Load task definitions from JSON file."""
    with open(json_file, 'r') as f:
        data = json.load(f)
    return data.get('agents', [])


def generate_all_agent_files(task_definitions: List[Dict], output_dir: Path):
    """Generate all agent task files."""

    output_dir.mkdir(parents=True, exist_ok=True)

    for i, task_data in enumerate(task_definitions, start=1):
        agent_num = task_data.get('agent_num', i)
        content = generate_agent_task_file(agent_num, task_data)

        output_file = output_dir / f"AGENT_{agent_num:02d}_TASKS.md"
        with open(output_file, 'w') as f:
            f.write(content)

        print(f"✅ Generated: {output_file.name}")

    print(f"\n🎉 Generated {len(task_definitions)} agent task files")


def verify_coverage(task_definitions: List[Dict]) -> bool:
    """Verify all agent numbers 1-20 are covered."""

    agent_nums = [task.get('agent_num', i)
                  for i, task in enumerate(task_definitions, start=1)]

    expected = set(range(1, 21))
    actual = set(agent_nums)

    missing = expected - actual
    duplicates = [n for n in agent_nums if agent_nums.count(n) > 1]

    if missing:
        print(f"❌ MISSING AGENTS: {sorted(missing)}")
        return False

    if duplicates:
        print(f"⚠️  DUPLICATE AGENTS: {sorted(set(duplicates))}")
        return False

    print("✅ Coverage verified: All agents 1-20 assigned")
    return True


def main():
    """Main entry point."""

    if len(sys.argv) < 3:
        print("Usage: python generate_agent_tasks.py tasks.json output_dir/")
        sys.exit(1)

    json_file = Path(sys.argv[1])
    output_dir = Path(sys.argv[2])

    if not json_file.exists():
        print(f"❌ Error: {json_file} not found")
        sys.exit(1)

    print(f"📖 Loading task definitions from {json_file}")
    task_definitions = load_task_definitions(json_file)

    print(f"📊 Loaded {len(task_definitions)} task definitions")

    if not verify_coverage(task_definitions):
        print("❌ Coverage verification failed")
        sys.exit(1)

    print(f"\n📝 Generating agent task files to {output_dir}")
    generate_all_agent_files(task_definitions, output_dir)

    print("\n✅ All agent task files generated successfully!")


if __name__ == "__main__":
    main()
