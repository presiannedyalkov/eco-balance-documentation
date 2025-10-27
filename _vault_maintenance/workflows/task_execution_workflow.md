# Task Execution Workflow

## Purpose
This workflow defines how to execute tasks created by persona analyses.

## Task Lifecycle

```
Queue → Priority (optional) → In Progress → Completed/Archived
```

## Before Starting Tasks

### 1. Review Task Queue (5-10 minutes)

**Actions:**
- [ ] Review all tasks in `_vault_maintenance/tasks/queue/`
- [ ] Read each task completely
- [ ] Understand the issue and desired outcome
- [ ] Check dependencies between tasks
- [ ] Identify any blockers

### 2. Prioritize Tasks (5-10 minutes)

**Actions:**
- [ ] Move CRITICAL tasks to `tasks/priority/`
- [ ] Group related tasks together
- [ ] Consider task dependencies (do task A before task B)
- [ ] Estimate time for each task
- [ ] Select tasks for current session

**Priority Factors:**
- Task priority level (Critical > High > Medium > Low)
- Impact on project goals
- Dependencies (blocking other work)
- Effort required (quick wins vs major work)
- Related tasks (batch similar work)

## Executing a Task

### Step 1: Prepare (2-3 minutes)

**Actions:**
- [ ] Move task file to `tasks/in-progress/`
- [ ] Read task completely
- [ ] Understand current state and desired state
- [ ] Review affected files
- [ ] Check for dependencies
- [ ] Have verification criteria ready

### Step 2: Execute (Variable time)

**Actions:**
- [ ] Make the required changes
- [ ] Follow action steps in task file
- [ ] Document what you're doing as you go
- [ ] Test changes if applicable
- [ ] Verify nothing broke

**Best Practices:**
- Work methodically through action steps
- Don't deviate from task scope (create new task if needed)
- Keep notes of decisions made
- If task reveals new issues, create new tasks
- Preserve anything being changed (archive, don't delete)

### Step 3: Verify (3-5 minutes)

**Actions:**
- [ ] Check against verification criteria in task
- [ ] Test that changes work as intended
- [ ] Verify no unintended side effects
- [ ] Confirm desired state is achieved
- [ ] Check related files if applicable

### Step 4: Document (5 minutes)

**Actions:**
- [ ] Add completion notes to task file
- [ ] Document what was changed
- [ ] Note any decisions made
- [ ] List any new issues discovered
- [ ] Record time spent
- [ ] Add completion timestamp

**Task Completion Template:**
```markdown
## Completion Notes

**Completed By**: [AI/Human name]
**Completion Date**: YYYY-MM-DD HH:MM
**Time Spent**: X minutes

### Changes Made
1. [Change 1]
2. [Change 2]

### Decisions Made
- [Decision 1 and rationale]

### Verification Results
- [Verification check 1: PASS/FAIL]
- [Verification check 2: PASS/FAIL]

### New Issues Discovered
- [Issue 1] - Created task: [task-id]

### Notes
[Any additional context]
```

### Step 5: Finalize (2 minutes)

**Actions:**
- [ ] Move task to `tasks/completed/`
- [ ] Update related state file if significant
- [ ] Create follow-up tasks if needed
- [ ] Git commit if using version control
- [ ] Update any affected indexes or documentation

## Batch Processing Tasks

When executing multiple related tasks:

1. **Group by Type**: All file moves together, all content edits together
2. **Check Dependencies**: Complete prerequisite tasks first
3. **Coordinate Changes**: Consider cumulative impact
4. **Test Together**: Verify all changes work as a set
5. **Document as Set**: Note how tasks relate

## Special Cases

### Task Cannot Be Completed

**Actions:**
- [ ] Document why task cannot be completed
- [ ] Note what's blocking it
- [ ] Update task status to "blocked"
- [ ] Create tasks to resolve blockers if needed
- [ ] Move to queue or archive as appropriate

### Task No Longer Relevant

**Actions:**
- [ ] Document why it's no longer needed
- [ ] Add note about changed circumstances
- [ ] Move to `tasks/archived/`
- [ ] Update state file

### Task Needs Modification

**Actions:**
- [ ] Create new task with updated requirements
- [ ] Reference original task
- [ ] Move original to archived with note
- [ ] Execute new task

### Task Reveals Larger Issue

**Actions:**
- [ ] Complete original task if possible
- [ ] Create new tasks for larger issues discovered
- [ ] Document the connection
- [ ] Consider if immediate persona analysis needed

## Quality Checks

Before marking task complete:
- [ ] Verification criteria all met
- [ ] Changes documented
- [ ] No broken links or references
- [ ] Related documentation updated if needed
- [ ] Completion notes added to task file

## Time Management

**Quick Tasks (< 10 minutes):**
- Batch these together
- Do several in one session
- Good for momentum

**Medium Tasks (10-30 minutes):**
- Schedule focused time
- Minimize interruptions
- Complete in single session if possible

**Major Tasks (> 30 minutes):**
- Break into subtasks
- Plan multiple sessions
- Document progress between sessions
- Consider if task should be split

## Example Execution Session

```
2:00 PM - Review task queue (7 tasks)
2:08 PM - Move 2 critical tasks to priority
2:10 PM - Start Task JAN-2025-10-26-001 (move stray files)
2:25 PM - Complete task, verify, document
2:30 PM - Start Task JAN-2025-10-26-003 (rename files)
2:40 PM - Complete task, verify, document
2:45 PM - Git commit changes
2:50 PM - Update janitor state file
2:55 PM - Done! 2 tasks completed.
```

## Common Pitfalls

1. **Starting without reading** - Understand task completely first
2. **Scope creep** - Stay focused on the specific task
3. **No verification** - Always check your work
4. **Poor documentation** - Future you needs to know what happened
5. **Forgetting follow-ups** - Create new tasks for discovered issues

## Task Execution Checklist

- [ ] Task moved to in-progress
- [ ] Changes made per action steps
- [ ] Verification criteria checked
- [ ] Completion notes added
- [ ] Task moved to completed
- [ ] Related state updated if needed
- [ ] New tasks created if needed

---

*Systematic execution ensures tasks are completed thoroughly and nothing is overlooked.*
