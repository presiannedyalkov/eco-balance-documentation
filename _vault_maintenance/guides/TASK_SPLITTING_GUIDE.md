# Task Splitting Guide

**Purpose**: Guidelines for splitting large tasks into smaller, manageable subtasks  
**For**: All personas when generating tasks  
**Last Updated**: 2025-11-10

---

## When to Split Tasks

**SPLIT LARGE TASKS INTO SMALLER SUBTASKS** when:

1. **Task affects >5 files** → Split by file or logical group
2. **Task has >10 action steps** → Split into phases
3. **Estimated effort is MAJOR** → Break into smaller chunks
4. **Task spans multiple categories** → Split by category
5. **Task has dependencies** → Split into sequential subtasks

---

## Splitting Methods

### Method 1: By File Group
Split tasks that affect many files into groups of 3-5 files each.

**Example:**
```
Original: Fix broken links in all 15 files
Split into:
- TASK-001a: Fix links in strategic docs (5 files)
- TASK-001b: Fix links in implementation docs (5 files)
- TASK-001c: Fix links in reference docs (5 files)
```

### Method 2: By Sub-Task
Split complex tasks into logical phases or sub-tasks.

**Example:**
```
Original: Complete comprehensive audit
Split into:
- TASK-001a: Audit budget numbers consistency
- TASK-001b: Audit timeline consistency
- TASK-001c: Audit terminology consistency
```

### Method 3: By Directory/Area
Split tasks that span multiple directories or topic areas.

**Example:**
```
Original: Reorganize entire vault structure
Split into:
- TASK-001a: Reorganize root directory files
- TASK-001b: Reorganize implementation_tasks/ directory
- TASK-001c: Reorganize _vault_maintenance/ directory
```

### Method 4: By Phase (Audit → Fix)
Split tasks that have distinct audit and fix phases.

**Example:**
```
Original: Fix all broken cross-references
Split into:
- TASK-001a: Identify all broken references (audit phase)
- TASK-001b: Fix references in strategic docs (fix phase 1)
- TASK-001c: Fix references in implementation docs (fix phase 2)
```

---

## Task ID Naming for Split Tasks

When splitting tasks, use letter suffixes:

```
Original task: AUD-2025-11-10-001
Split into:
- AUD-2025-11-10-001a (first subtask)
- AUD-2025-11-10-001b (second subtask)
- AUD-2025-11-10-001c (third subtask)
```

---

## Task Dependency Management

When splitting tasks, document dependencies:

```yaml
task_id: AUD-YYYY-MM-DD-001a
depends_on: []
blocks: [AUD-YYYY-MM-DD-001b]

task_id: AUD-YYYY-MM-DD-001b
depends_on: [AUD-YYYY-MM-DD-001a]
blocks: [AUD-YYYY-MM-DD-001c]

task_id: AUD-YYYY-MM-DD-001c
depends_on: [AUD-YYYY-MM-DD-001b]
blocks: []
```

**Fields:**
- `depends_on`: List of task IDs that must complete before this task
- `blocks`: List of task IDs that cannot start until this task completes

---

## Benefits of Task Splitting

✅ **Easier to track progress** - Clear completion status for each subtask  
✅ **Smaller, more manageable work units** - Less overwhelming  
✅ **Better parallel execution opportunities** - Multiple people can work simultaneously  
✅ **Clearer verification criteria** - Each subtask has specific verification  
✅ **Reduced risk of incomplete work** - Easier to see what's done vs pending  
✅ **Easier to prioritize and schedule** - Can prioritize subtasks independently  

---

## Examples by Persona

### Janitor Example
```
Original: Reorganize 20 misplaced files
Split into:
- JAN-001a: Reorganize strategic docs (7 files)
- JAN-001b: Reorganize implementation docs (7 files)
- JAN-001c: Reorganize reference docs (6 files)
```

### Curator Example
```
Original: Fix all broken cross-references
Split into:
- CUR-001a: Identify all broken references
- CUR-001b: Fix references in strategic docs
- CUR-001c: Fix references in implementation docs
```

### Auditor Example
```
Original: Align all budget numbers across vault
Split into:
- AUD-001a: Align budget numbers in strategic docs
- AUD-001b: Align budget numbers in financial docs
- AUD-001c: Align budget numbers in implementation docs
```

### Librarian Example
```
Original: Fix all broken links
Split into:
- LIB-001a: Fix links in strategic docs (5 files)
- LIB-001b: Fix links in implementation docs (5 files)
- LIB-001c: Fix links in reference docs (5 files)
```

---

## Task Size Guidelines

**Ideal Task Size:**
- **Files affected**: 3-5 files per task
- **Action steps**: 5-10 steps per task
- **Estimated effort**: MINOR to MODERATE
- **Time to complete**: 30 minutes to 2 hours

**Too Large (Split it!):**
- **Files affected**: >5 files
- **Action steps**: >10 steps
- **Estimated effort**: MAJOR
- **Time to complete**: >2 hours

---

## Quick Decision Tree

```
Is task affecting >5 files?
├─ YES → Split by file group
└─ NO → Continue

Does task have >10 action steps?
├─ YES → Split by sub-task or phase
└─ NO → Continue

Is estimated effort MAJOR?
├─ YES → Split into smaller chunks
└─ NO → Continue

Does task span multiple categories?
├─ YES → Split by category
└─ NO → Task is appropriately sized ✓
```

---

## See Also

- Individual persona files in `personas/` for persona-specific examples
- `tasks/` directory for examples of split tasks
- `guides/PERSONA_INTERACTION_MATRIX.md` for coordination between personas


