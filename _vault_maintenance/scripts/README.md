# 🛠️ Agent Task Distribution Scripts

**Purpose**: Automate agent task system creation and verification

**Version**: 2.0 (Based on lessons from v1.0 successful execution)

---

## 📁 Scripts

### 1. `generate_agent_tasks.py`

**Purpose**: Automatically generate all 20 agent task files from structured data

**Usage**:
```bash
python _vault_maintenance/scripts/generate_agent_tasks.py tasks.json output_dir/
```

**Input**: JSON file with task definitions
**Output**: 20 complete agent task markdown files

**Benefits**:
- ✅ No manual file creation
- ✅ Consistent formatting
- ✅ Easy regeneration if tasks change
- ✅ Validates coverage automatically

**Example tasks.json**:
```json
{
  "agents": [
    {
      "agent_num": 1,
      "name": "Marketing Strategy Link Fix",
      "priority": "🔴 HIGH",
      "time_estimate": "20-30 min",
      "difficulty": "Easy",
      "file_count": 6,
      "summary": "Fix broken cross-references...",
      "source_task_id": "FIX-024",
      "source_file": "FIX_TASKS_LIBRARIAN.md",
      "detailed_tasks": "### Task 1...",
      "execution_steps": "1. Read files\n2. Edit...",
      "verification_checklist": "- [ ] Links fixed",
      "completion_summary": "- Fixed 10 links",
      "files_modified_list": "- file1.md\n- file2.md",
      "verification_summary": "- All links functional ✓",
      "slug": "marketing-links",
      "commit_template": "Fix marketing strategy cross-references",
      "next_agent_info": "Agent 2 (can run in parallel)"
    }
  ]
}
```

---

### 2. `verify_coverage.py`

**Purpose**: Verify all source tasks are assigned to agents

**Usage**:
```bash
python _vault_maintenance/scripts/verify_coverage.py
```

**What it checks**:
- ✅ All tasks from FIX_TASKS_*.md files are assigned
- ✅ No tasks are missing
- ✅ All agents 1-20 have work
- ✅ Identifies duplicate assignments (intentional splits)
- ✅ Reports extra tasks not in source files

**Output**:
```
🔍 TASK COVERAGE VERIFICATION

📊 Source Tasks from FIX_TASKS files:
  CURATOR: 12 tasks
  JANITOR: 1 tasks
  LIBRARIAN: 2 tasks
  ...
  TOTAL: 18 tasks from source files

🤖 Agent Assignments: 20 agents

✅ All source tasks are assigned to agents
✅ All agents 1-20 have assignments

=============================================================
SUMMARY:
  Source tasks: 18
  Assigned tasks: 20
  Active agents: 20
  Coverage: 100.0%

✅ VERIFICATION PASSED - 100% COVERAGE
```

---

### 3. `pre_flight_check.sh` (Coming Soon)

**Purpose**: Complete pre-execution validation

**Planned checks**:
- File existence (all FIX_TASKS, all agent files)
- Coverage verification (calls verify_coverage.py)
- Task ID conflict detection
- File path validation
- Git status (should be clean)
- Routing master integrity

---

## 🚀 Workflow for v2.0

### Step 1: After Audit Phase Complete

You'll have FIX_TASKS_*.md files from all personas.

### Step 2: Create Task Definitions

Create `tasks.json` with structured data for all 20 agents:

```bash
# Manual for now, could be automated by parsing FIX_TASKS files
# See example above for JSON structure
```

### Step 3: Generate Agent Files

```bash
python _vault_maintenance/scripts/generate_agent_tasks.py \
  tasks.json \
  _vault_maintenance/agent_tasks/
```

This creates:
- AGENT_01_TASKS.md through AGENT_20_TASKS.md
- All with complete, consistent formatting
- All with detailed instructions

### Step 4: Verify Coverage

```bash
python _vault_maintenance/scripts/verify_coverage.py
```

If it passes, you're ready to execute!

### Step 5: Execute Agents

Use the standard prompt:
```
execute the tasks for agent N from this list:
/home/presi/projects/eco-balance-documentation/_vault_maintenance/agent_tasks/AGENT_ROUTING_MASTER.md
```

---

## 📊 Improvements Over v1.0

| Aspect | v1.0 | v2.0 |
|--------|------|------|
| Task file creation | Manual bash script | Automated Python script |
| Coverage verification | Manual analysis | Automated script |
| Consistency | 3 detailed + 17 refs | All 20 detailed |
| Regeneration | Hard to recreate | JSON → regenerate anytime |
| Validation | Manual checking | Automated verification |
| Time to setup | 2-3 hours | 30-60 min |
| Error prone | Yes (08-09 had issues) | No (programmatic) |

---

## 🎯 Future Enhancements

### Phase 2: Auto-parse FIX_TASKS files
```python
# parse_fix_tasks.py
# Automatically create tasks.json from FIX_TASKS_*.md files
# No manual JSON creation needed
```

### Phase 3: Progress Tracking
```python
# track_progress.py
# Read git log
# Update PROGRESS_TRACKER.md automatically
# Show real-time completion status
```

### Phase 4: Time Analysis
```python
# analyze_performance.py
# Compare predicted vs actual times
# Improve estimates for next iteration
# Identify consistently fast/slow task types
```

---

## 📝 Script Dependencies

**Python version**: 3.7+

**Standard library only** (no external dependencies):
- json
- re
- pathlib
- typing
- collections
- sys

**No pip install required** ✅

---

## ✅ Testing the Scripts

### Test Coverage Verification

```bash
cd /home/presi/projects/eco-balance-documentation
python _vault_maintenance/scripts/verify_coverage.py
```

Expected: Should show 100% coverage for current system

### Test Task Generation

```bash
# Create example tasks.json first
# Then run:
python _vault_maintenance/scripts/generate_agent_tasks.py \
  example_tasks.json \
  /tmp/test_output/
```

---

## 🎓 Lessons from v1.0

Based on successful execution of 20 agents via 28 PRs:

1. **Full task files are better** - Agents need complete instructions in one place
2. **Automation saves time** - Manual creation is error-prone
3. **Verification is critical** - Catch issues before agents run
4. **Consistency matters** - All agents should have same file structure
5. **Documentation pays off** - Clear instructions = perfect execution

See [LESSONS_LEARNED.md](../agent_tasks/LESSONS_LEARNED.md) for full analysis.

---

## 📚 Documentation

- **LESSONS_LEARNED.md**: What worked, what to improve
- **VERIFICATION_CHECKLIST.md**: Pre-flight checks
- **AGENT_ROUTING_MASTER.md**: Task distribution overview
- **QUICK_START.md**: Execution prompts

---

**Created**: November 8, 2025
**Author**: Claude Code (Sonnet 4.5)
**Based on**: Successful v1.0 execution with 100% success rate
