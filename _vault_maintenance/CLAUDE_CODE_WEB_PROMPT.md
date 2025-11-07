# 🤖 CLAUDE CODE WEB - AUTONOMOUS TASK EXECUTION

**For: code.claude.com - Autonomous execution with merge requests**

---

## 🚀 STRATEGY 1: TASK RANGE ASSIGNMENT (TRUE PARALLEL)

For running multiple agents in parallel, assign each agent a specific range:

### Agent 1 Prompt:
```
VAULT MAINTENANCE - TASK RANGE 1-54

Read _vault_maintenance/WORKFLOW.md to understand the process.

AUDIT PHASE:
Work through AUDIT_TASKS.md, completing tasks 1-54 only:
- Tasks 1-54 cover: Strategic docs 00-04 (all personas)
- Complete EACH task in your range
- Mark [x] done with Result filled in
- Add issues to FIX_TASKS.md if found

Complete ALL tasks in your range, then create ONE merge request:
- Title: "Audit: Tasks 1-54 Complete (Strategic Docs 00-04)"
- Include summary of findings

BEGIN NOW.
```

### Agent 2 Prompt:
```
VAULT MAINTENANCE - TASK RANGE 55-108

Read _vault_maintenance/WORKFLOW.md to understand the process.

AUDIT PHASE:
Work through AUDIT_TASKS.md, completing tasks 55-108 only:
- Tasks 55-108 cover: Organizational docs 10-13 (all personas)
- Complete EACH task in your range
- Mark [x] done with Result filled in
- Add issues to FIX_TASKS.md if found

Complete ALL tasks in your range, then create ONE merge request:
- Title: "Audit: Tasks 55-108 Complete (Organizational Docs 10-13)"
- Include summary of findings

BEGIN NOW.
```

### Agent 3 Prompt:
```
VAULT MAINTENANCE - TASK RANGE 109-162

Read _vault_maintenance/WORKFLOW.md to understand the process.

AUDIT PHASE:
Work through AUDIT_TASKS.md, completing tasks 109-162 only:
- Tasks 109-162 cover: Methodology & Business docs 20-32
- Complete EACH task in your range
- Mark [x] done with Result filled in
- Add issues to FIX_TASKS.md if found

Complete ALL tasks in your range, then create ONE merge request:
- Title: "Audit: Tasks 109-162 Complete (Methodology & Business)"
- Include summary of findings

BEGIN NOW.
```

### Agent 4 Prompt:
```
VAULT MAINTENANCE - TASK RANGE 163-216

Read _vault_maintenance/WORKFLOW.md to understand the process.

AUDIT PHASE:
Work through AUDIT_TASKS.md, completing tasks 163-216 only:
- Tasks 163-216 cover: Growth & Performance docs 40-60
- Complete EACH task in your range
- Mark [x] done with Result filled in
- Add issues to FIX_TASKS.md if found

Complete ALL tasks in your range, then create ONE merge request:
- Title: "Audit: Tasks 163-216 Complete (Growth & Performance)"
- Include summary of findings

BEGIN NOW.
```

### Agent 5 Prompt:
```
VAULT MAINTENANCE - TASK RANGE 217-270

Read _vault_maintenance/WORKFLOW.md to understand the process.

AUDIT PHASE:
Work through AUDIT_TASKS.md, completing tasks 217-270 only:
- Tasks 217-270 cover: Case studies & Implementation tasks start
- Complete EACH task in your range
- Mark [x] done with Result filled in
- Add issues to FIX_TASKS.md if found

Complete ALL tasks in your range, then create ONE merge request:
- Title: "Audit: Tasks 217-270 Complete (Case Studies & Impl Start)"
- Include summary of findings

BEGIN NOW.
```

**This is TRUE parallel execution** - each agent works independently on different tasks simultaneously!

---

## 🚀 STRATEGY 2: SEQUENTIAL BATCH (SIMPLER)

If you want simpler workflow, do sequential batches:

### Single Agent Prompt (Reusable):
```
VAULT MAINTENANCE - NEXT UNCHECKED TASK

Read _vault_maintenance/WORKFLOW.md to understand the process.

CURRENT PHASE: Check AUDIT_TASKS.md for completion
- If unchecked [ ] tasks remain → Work on AUDIT
- If all [x] checked → Work on FIX_TASKS.md

INSTRUCTIONS:
1. Find FIRST UNCHECKED task ([ ] not [x])
2. Read relevant persona file if audit phase
3. Complete the task fully
4. Mark [x] done with Result/date
5. Add issues to FIX_TASKS.md if found during audit

Create merge request:
- Title: "Task Complete: [PERSONA] check of [FILE]" or "Fix: FIX-XXX"
- Include findings/changes

Complete ONE task only, then stop.

BEGIN NOW.
```

**Usage**: Paste in ONE tab, let it complete, merge MR, paste again. Repeat.

**Faster**: Paste in 3 tabs simultaneously. First 3 tasks get done, but you get 3 duplicate attempts. Just merge the first one that finishes and close the duplicates.

---

## 🚀 STRATEGY 3: PERSONA ASSIGNMENT (PARALLEL BY PERSONA)

Assign each agent a different persona to avoid conflicts:

### Agent "Curator" Prompt:
```
VAULT MAINTENANCE - CURATOR ONLY

Read _vault_maintenance/personas/curator.md for your role.

Work through ALL files checking with CURATOR perspective only:
- Strategic docs 00-70: Curator checks
- Implementation tasks: Curator checks
- Mark each [x] done
- Add issues to FIX_TASKS.md

Skip tasks assigned to other personas (Auditor, Librarian, etc.)

Create merge request when complete:
- Title: "Audit Complete: Curator Checks (All Files)"

BEGIN NOW.
```

### Agent "Auditor" Prompt:
```
VAULT MAINTENANCE - AUDITOR ONLY

Read _vault_maintenance/personas/auditor.md for your role.

Work through ALL files checking with AUDITOR perspective only:
- Strategic docs 00-70: Auditor checks
- Implementation tasks: Auditor checks
- Mark each [x] done
- Add issues to FIX_TASKS.md

Skip tasks assigned to other personas (Curator, Librarian, etc.)

Create merge request when complete:
- Title: "Audit Complete: Auditor Checks (All Files)"

BEGIN NOW.
```

**Continue for**: Librarian, Quality Inspector, Janitor, Archivist (6 agents total)

**This is TRUE parallel** - each persona works on all files simultaneously!

---

## 📊 STRATEGY COMPARISON

| Strategy | Parallel? | Complexity | Best For |
|----------|-----------|------------|----------|
| **Range Assignment** | ✅ TRUE | Medium | Want true parallel, willing to set up ranges |
| **Sequential Batch** | ❌ Sequential | Simple | One person, no rush |
| **Persona Assignment** | ✅ TRUE | Low | Each persona checks all files separately |

---

## 💡 RECOMMENDED APPROACH

**For fastest parallel execution**: Use **STRATEGY 1 (Range Assignment)** or **STRATEGY 3 (Persona Assignment)**

**For simplicity**: Use **STRATEGY 2 (Sequential)** - paste, merge, repeat

**Hybrid**: Do STRATEGY 1 for audit (big task list), STRATEGY 2 for fixes (smaller list)

---
