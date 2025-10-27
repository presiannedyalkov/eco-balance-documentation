# AI Assistant Guide: Using Vault Maintenance Personas

## Purpose
This guide tells AI assistants exactly how to respond when users trigger persona analyses.

---

## Quick Trigger Reference

When the user says any of these, execute the corresponding workflow:

| User Says | AI Should Do |
|-----------|--------------|
| "Run the Janitor" | Execute Janitor Analysis |
| "Run Janitor analysis" | Execute Janitor Analysis |
| "Check organization" | Execute Janitor Analysis |
| "Run the Curator" | Execute Curator Analysis |
| "Check content quality" | Execute Curator Analysis |
| "Run the Archivist" | Execute Archivist Analysis |
| "Check archives" / "Check versioning" | Execute Archivist Analysis |
| "Run the Auditor" | Execute Auditor Analysis |
| "Check completeness" | Execute Auditor Analysis |
| "Run the Librarian" | Execute Librarian Analysis |
| "Check links" / "Check navigation" | Execute Librarian Analysis |
| "Run Quality Inspector" | Execute Quality Inspector Analysis |
| "Check formatting" / "Check quality" | Execute Quality Inspector Analysis |
| "Execute tasks" | Execute Task Workflow |
| "Check vault health" | Quick Health Check |
| "Summarize the work in this version and prepare to commit" | Version Release Workflow |
| "Prepare version release" | Version Release Workflow |

---

## Standard Analysis Workflow

When user triggers a persona analysis:

### Step 1: Load Required Files (Don't ask, just do it)
```
1. Read: _vault_maintenance/personas/[persona].md
2. Read: _vault_maintenance/state/[persona]_state.md
3. Read: _vault_maintenance/workflows/analysis_workflow.md (if first time)
```

### Step 2: Acknowledge & Begin
```
Response template:
"Running [Persona Name] analysis on your vault. This will take approximately [time estimate].

I'll be checking:
- [Key responsibility 1]
- [Key responsibility 2]
- [Key responsibility 3]

Starting analysis now..."
```

### Step 3: Execute Analysis
Follow the persona's checklist systematically:
- Go through each checklist item
- Document findings as you discover them
- Note specific file paths and issues
- Calculate health score components

### Step 4: Generate Tasks
For each issue found:
- Create task file in `_vault_maintenance/tasks/queue/`
- Use naming: `[CODE]-YYYY-MM-DD-###-brief-description.md`
- Follow task template structure
- Include all required fields

### Step 5: Report Results
```
Response template:
"Analysis complete! Here's what I found:

**Health Score: XX/100** ([Excellent/Good/Fair/Poor/Critical])

**Issues Found:**
- Critical: X
- High: X
- Medium: X
- Low: X

**Key Findings:**
1. [Finding 1 with specifics]
2. [Finding 2 with specifics]
3. [Finding 3 with specifics]

**Tasks Created:** X tasks saved to queue

**Top Priorities:**
1. [Most important task]
2. [Second most important]

**Next Steps:**
[What should happen next]

Would you like me to:
- Execute the high-priority tasks now?
- Show you the detailed task list?
- Run another persona analysis?"
```

### Step 6: Update State File
Update `_vault_maintenance/state/[persona]_state.md` with:
- Current timestamp
- Analysis date
- New health score
- Summary of findings
- Tasks created
- Coordination notes

---

## Task Execution Workflow

When user says "Execute tasks" or "Run tasks":

### Step 1: Review Queue
```
1. List all files in _vault_maintenance/tasks/queue/
2. Read each task file
3. Group by priority (CRITICAL > HIGH > MEDIUM > LOW)
```

### Step 2: Present Options
```
Response template:
"I found X tasks in the queue:

**Critical:** X tasks
- [Task 1 title]
- [Task 2 title]

**High:** X tasks
- [Task 1 title]

**Medium:** X tasks
**Low:** X tasks

Would you like me to:
1. Execute all CRITICAL tasks now
2. Execute a specific task
3. See details of a specific task
4. Execute all tasks up to a priority level"
```

### Step 3: Execute Task
For each task:
1. Move task file to `tasks/in-progress/`
2. Read task completely
3. Execute action steps
4. Verify completion criteria
5. Document completion notes
6. Move to `tasks/completed/`

### Step 4: Report Completion
```
Response template:
"Task completed: [Task title]

**Changes Made:**
- [Change 1]
- [Change 2]

**Verification:**
✓ [Check 1 passed]
✓ [Check 2 passed]

**New Issues Discovered:**
[Any new issues, if applicable]

[X] tasks remaining in queue.
Continue with next task?"
```

---

## Quick Health Check Workflow

When user says "Check vault health":

### Execute
1. Read all 6 state files in `_vault_maintenance/state/`
2. Extract health scores and last analysis dates
3. Summarize critical issues

### Report
```
Response template:
"Vault Health Summary:

🧹 **Janitor (Organization):** XX/100 - [Status]
   Last checked: [date] | [Notable issues]

📚 **Curator (Content):** XX/100 - [Status]
   Last checked: [date] | [Notable issues]

🗄️ **Archivist (History):** XX/100 - [Status]
   Last checked: [date] | [Notable issues]

🔍 **Auditor (Completeness):** XX/100 - [Status]
   Last checked: [date] | [Notable issues]

📖 **Librarian (Navigation):** XX/100 - [Status]
   Last checked: [date] | [Notable issues]

✨ **Quality Inspector (Polish):** XX/100 - [Status]
   Last checked: [date] | [Notable issues]

**Overall Status:** [Assessment]
**Critical Issues:** X
**Pending Tasks:** X

**Recommendations:**
- [Action 1]
- [Action 2]

Which persona should I run next?"
```

---

## Version Release Workflow

When user says "Summarize the work in this version and prepare to commit":

### Step 1: Analyze Changes
```
1. Run: git log --since="[last version date]" --oneline
2. Run: git diff [last-tag]..HEAD --stat
3. Read all completed tasks since last version
4. Identify change categories (Added/Changed/Fixed/Removed)
```

### Step 2: Propose Version Bump
```
Determine: MAJOR.MINOR.PATCH based on changes
- MAJOR: Breaking changes, restructuring
- MINOR: New features, new personas, major additions
- PATCH: Bug fixes, small improvements
```

### Step 3: Generate Documents
```
1. Read current VERSION file
2. Generate CHANGELOG entry (Keep a Changelog format)
3. Prepare Git commit message
4. List all files to be committed
```

### Step 4: Present for Approval
```
Response template:
"# Version Release Preparation

**Current Version:** X.X.X
**Proposed Version:** Y.Y.Y
**Type:** [MAJOR/MINOR/PATCH] - [reason]

## Changes Summary
- Files changed: X
- Additions: X lines
- Deletions: X lines

## CHANGELOG Entry:
[Show formatted entry]

## Git Commit Message:
[Show prepared message]

## Files to Commit:
- [List files]

## Review Checklist:
☐ Version number appropriate?
☐ CHANGELOG accurate?
☐ Commit message clear?
☐ All files ready?

Please respond:
- 'Approve' or 'Continue' to execute
- 'Change version to X.X.X' to adjust
- 'Update CHANGELOG: [text]' to revise
- 'Cancel' to stop"
```

### Step 5: Wait for User Approval
```
DO NOT EXECUTE until user explicitly approves
Listen for: "Approve", "Continue", "Looks good"
```

### Step 6: Execute on Approval
```
1. Update VERSION file
2. Update CHANGELOG.md
3. git add .
4. git commit -m "[prepared message]"
5. git tag -a vX.X.X -m "Release version X.X.X"
6. Show git status and log
```

### Step 7: Report Completion
```
Response template:
"# Version Release Completed ✓

**Version:** X.X.X → Y.Y.Y
**Commit:** [hash]
**Tag:** vY.Y.Y

✓ Updated VERSION
✓ Updated CHANGELOG  
✓ Created commit
✓ Created tag

Ready to push?
Say 'Push to remote' when ready."
```

**Full workflow documentation:** `workflows/version_release_workflow.md`

---

## Example Prompts & Responses

### Example 1: First-Time Analysis

**User:** "Run the Janitor"

**AI Response:**
```
Running Janitor analysis on your vault. This will take approximately 30-45 minutes.

I'll be checking:
- File placement and organization
- Naming convention compliance
- Redundant or duplicate content
- Archive structure
- Directory integrity

Starting analysis now...

[Executes analysis following checklist]

Analysis complete! Here's what I found:

**Health Score: 89/100** (Good)

**Issues Found:**
- Critical: 0
- High: 1
- Medium: 1
- Low: 2

[Continue with full report...]
```

### Example 2: Task Execution

**User:** "Execute high priority tasks"

**AI Response:**
```
I found 3 HIGH priority tasks:

1. JAN-2025-10-27-002: Investigate missing numbered files 31 and 41
2. LIB-2025-10-27-003: Repair broken links in main hub page
3. CUR-2025-10-26-012: Link restoration methodology to implementation tasks

Executing task 1 now...

[Executes and reports on each task]
```

### Example 3: Health Check

**User:** "How's my vault?"

**AI Response:**
```
Let me check the vault health for you...

[Reads all state files]

Vault Health Summary:
[Provides full summary as shown above]
```

---

## Important Notes for AI

### DO:
- ✓ Load files immediately without asking
- ✓ Follow checklists systematically
- ✓ Create actual task files (don't just list issues)
- ✓ Update state files after analysis
- ✓ Be specific with file paths and examples
- ✓ Calculate health scores objectively
- ✓ Execute tasks thoroughly

### DON'T:
- ✗ Ask permission to read persona files (just do it)
- ✗ Skip checklist items
- ✗ Create vague tasks
- ✗ Forget to update state files
- ✗ Make assumptions about issues
- ✗ Rush through analysis
- ✗ Skip verification after task execution

### Remember:
- You're simulating the persona's perspective
- Be thorough and systematic
- Document everything you find
- Think like the persona (Janitor thinks organization, Curator thinks content, etc.)
- Tasks should be actionable by another AI or human
- Health scores should be honest and objective

---

## Coordination Between Analyses

When running multiple personas:
1. Always read other personas' recent state files first
2. Note any coordination items in your state file
3. Reference related tasks from other personas
4. Don't duplicate work - reference existing tasks

---

## File Paths Quick Reference

```
Personas: _vault_maintenance/personas/[persona].md
States: _vault_maintenance/state/[persona]_state.md
Tasks Queue: _vault_maintenance/tasks/queue/
Task Template: _vault_maintenance/workflows/task_template.md
Analysis Guide: _vault_maintenance/workflows/analysis_workflow.md
```

---

*This guide ensures consistent, high-quality persona execution every time.*
