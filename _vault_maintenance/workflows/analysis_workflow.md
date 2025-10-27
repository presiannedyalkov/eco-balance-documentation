# Analysis Workflow

## Purpose
This workflow defines the standard process for running a persona analysis on the vault.

## When to Run Analysis
- **Regular Schedule**: Weekly or bi-weekly for active projects
- **After Major Changes**: When significant content is added or reorganized
- **Before Releases**: Prior to version releases or milestones
- **On Demand**: When specific issues need investigation

## Workflow Steps

### 1. Preparation (5 minutes)

**Actions:**
- [ ] Select which persona to run
- [ ] Read the persona file: `_vault_maintenance/personas/[persona].md`
- [ ] Load the state file: `_vault_maintenance/state/[persona]_state.md`
- [ ] Note the last analysis date
- [ ] Check for any pending tasks from previous analysis
- [ ] Review recent Git commits for context

**Output:** Understanding of persona role and current state

### 2. Analysis Execution (20-60 minutes)

**Actions:**
- [ ] Follow the persona's analysis checklist systematically
- [ ] Document findings as you go
- [ ] Take notes on patterns observed
- [ ] Collect specific examples of issues
- [ ] Calculate health score components
- [ ] Identify both problems and successes

**Tips:**
- Don't rush - thoroughness matters
- Document WHY something is an issue, not just WHAT
- Look for patterns, not just individual issues
- Consider impact on users and project goals

**Output:** Complete analysis notes and findings

### 3. Task Generation (15-30 minutes)

**Actions:**
- [ ] Review all findings
- [ ] Prioritize issues (Critical > High > Medium > Low)
- [ ] Create task files for each issue using task template
- [ ] Ensure tasks are specific and actionable
- [ ] Assign appropriate effort estimates
- [ ] Add verification criteria to each task
- [ ] Save tasks to: `_vault_maintenance/tasks/queue/`

**Task Naming Convention:**
`[PERSONA_CODE]-YYYY-MM-DD-###-brief-title.md`

Example: `JAN-2025-10-26-001-move-stray-files.md`

**Output:** Task files in queue directory

### 4. Report Writing (15-20 minutes)

**Actions:**
- [ ] Use persona's analysis output format
- [ ] Write executive summary (2-3 sentences)
- [ ] Document all findings by category
- [ ] Calculate final health score
- [ ] Provide clear recommendations
- [ ] Set next analysis date
- [ ] Save report to: `_vault_maintenance/state/[persona]_analysis_[date].md`

**Output:** Formal analysis report

### 5. State Update (5-10 minutes)

**Actions:**
- [ ] Open the persona's state file
- [ ] Update "Last Updated" timestamp
- [ ] Update "Last Analysis" date
- [ ] Update "Current Health Score"
- [ ] Summarize key findings
- [ ] List tasks generated
- [ ] Add coordination notes for other personas
- [ ] Set "Next Scheduled Analysis" date
- [ ] Save updated state file

**Output:** Current state file reflecting analysis

### 6. Communication (5 minutes)

**Actions:**
- [ ] Review if any findings need immediate human attention
- [ ] Check if other personas should be notified
- [ ] Document any blockers or dependencies
- [ ] Update README if workflow improvements identified

**Output:** Relevant stakeholders informed

## Time Estimates

| Persona | Typical Duration |
|---------|-----------------|
| Janitor | 30-45 minutes |
| Curator | 45-90 minutes |
| Archivist | 30-45 minutes |
| Auditor | 45-60 minutes |
| Librarian | 30-45 minutes |
| Quality Inspector | 45-60 minutes |

## Quality Checklist

Before considering analysis complete:
- [ ] All checklist items in persona file were addressed
- [ ] Health score is calculated with justification
- [ ] Tasks are specific and actionable
- [ ] State file is updated
- [ ] Report is clear and comprehensive
- [ ] Next steps are documented

## Common Pitfalls to Avoid

1. **Rushing the checklist** - Skip nothing, even if it seems fine
2. **Vague tasks** - "Improve documentation" is not actionable
3. **Missing priorities** - Not all issues are equal
4. **No verification criteria** - How will you know it's fixed?
5. **Forgetting state update** - Next analysis needs current info
6. **Analysis without action** - Generate tasks, don't just observe

## Example Analysis Session

```
10:00 - Load Janitor persona and state file
10:05 - Begin systematic scan of vault structure
10:25 - Document findings (5 misplaced files, 3 naming issues)
10:35 - Calculate health score (82/100)
10:45 - Create 8 task files in queue
11:00 - Write analysis report
11:15 - Update janitor_state.md
11:20 - Done!
```

## Next Steps After Analysis

1. Review tasks in queue
2. Prioritize for execution
3. Consider running complementary personas
4. Schedule next analysis
5. Execute high-priority tasks

---

*This workflow ensures consistent, thorough analysis across all persona types.*
