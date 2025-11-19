# Dependency Map Template
## [Project/Initiative Name]

**Purpose**: Map dependencies, identify critical path, and plan execution sequence
**Project**: [Name]
**Phase/Timeframe**: [e.g., Year 1 Bootstrap, Q1 2025, etc.]
**Created**: [Date]
**Last Updated**: [Date]
**Created By**: [Name/Role]

---

## Overview

### What is a Dependency Map?
A dependency map shows what tasks depend on what other tasks - i.e., what must happen before what else can begin. This helps identify:
- **Critical path**: The longest chain of dependent tasks (determines minimum project duration)
- **Parallel opportunities**: Tasks that can happen simultaneously
- **Bottlenecks**: Tasks that block many other tasks
- **Risk points**: External dependencies or single points of failure

### How to Use This Template
1. List all major tasks/milestones in the Task Inventory
2. For each task, identify what it depends on (prerequisites)
3. Map the dependency relationships in the Dependency Matrix
4. Identify the critical path
5. Create a visual timeline showing dependencies
6. Monitor and update as project progresses

---

## Task Inventory

### All Major Tasks/Milestones

| ID | Task Name | Duration (weeks) | Earliest Start | Latest Finish | Owner | Status |
|----|-----------|------------------|----------------|---------------|-------|--------|
| T1 | [Task name] | [X weeks] | [Week/date] | [Week/date] | [Name] | [Status] |
| T2 | [Task name] | [X weeks] | [Week/date] | [Week/date] | [Name] | [Status] |
| T3 | [Task name] | [X weeks] | [Week/date] | [Week/date] | [Name] | [Status] |
| T4 | [Task name] | [X weeks] | [Week/date] | [Week/date] | [Name] | [Status] |
| T5 | [Task name] | [X weeks] | [Week/date] | [Week/date] | [Name] | [Status] |

**Status Key**: Not Started / In Progress / Completed / Blocked / At Risk

---

## Dependency Matrix

### Task Dependencies

For each task, list what it depends on (must be completed before this task can start):

**T1: [Task Name]**
- Prerequisites: [None / T## / External dependency]
- Depends on: [List specific tasks or conditions]
- Enables: [Which tasks can start after this completes]
- Type: [Internal / External / Conditional]

**T2: [Task Name]**
- Prerequisites: [Task IDs or conditions]
- Depends on: [Specific requirements]
- Enables: [Subsequent tasks]
- Type: [Internal / External / Conditional]

**T3: [Task Name]**
- Prerequisites: [Task IDs or conditions]
- Depends on: [Specific requirements]
- Enables: [Subsequent tasks]
- Type: [Internal / External / Conditional]

[Continue for all tasks...]

---

## Dependency Types

### Internal Dependencies
[Tasks that depend on other tasks within your control]

| Task | Depends On | Reason | Controllable? |
|------|------------|--------|---------------|
| [Task] | [Task] | [Why this dependency exists] | Yes |

### External Dependencies
[Tasks that depend on third parties, approvals, or events outside your control]

| Task | Depends On | External Party | Risk Level | Mitigation |
|------|------------|----------------|------------|------------|
| [Task] | [What] | [Who/What entity] | [H/M/L] | [Backup plan] |

### Conditional Dependencies
[Tasks that may or may not be needed depending on earlier outcomes]

| Task | Condition | If Yes, Then | If No, Then |
|------|-----------|--------------|-------------|
| [Task] | [Condition to be met] | [Path A tasks] | [Path B tasks] |

### Soft Dependencies
[Tasks that don't strictly require predecessors but are better done in sequence]

| Task | Better After | Reason |
|------|--------------|--------|
| [Task] | [Other task] | [Why sequence helps] |

---

## Critical Path Analysis

### Critical Path Tasks
[The longest sequence of dependent tasks - delays here delay the entire project]

```
[T1] → [T3] → [T7] → [T9] → [T12] → [T15]
```

**Critical Path Duration**: [X] weeks
**Minimum Project Timeline**: [X] weeks
**Buffer Built In**: [X] weeks ([X]% of critical path)

### Critical Path Details

| Sequence Position | Task ID | Task Name | Duration | Cumulative Time | Risk Level |
|-------------------|---------|-----------|----------|-----------------|------------|
| 1 | T1 | [Name] | [X weeks] | [X weeks] | [H/M/L] |
| 2 | T3 | [Name] | [X weeks] | [X weeks] | [H/M/L] |
| 3 | T7 | [Name] | [X weeks] | [X weeks] | [H/M/L] |
| ... | ... | ... | ... | ... | ... |

**Critical Risks**: [Tasks on critical path with high risk of delay]

---

## Parallel Execution Opportunities

### Tasks That Can Run Simultaneously

**Parallel Set 1** (can all happen at same time):
- [Task A]
- [Task B]
- [Task C]

**Parallel Set 2** (can all happen at same time):
- [Task D]
- [Task E]

**Benefits of Parallelization**:
- Reduces timeline from [X] weeks to [Y] weeks
- Requires [X] people working simultaneously
- Increases coordination complexity: [Low / Medium / High]

---

## Bottleneck Tasks

### Tasks That Block Many Others

| Task | Blocks | Impact if Delayed | Mitigation |
|------|--------|-------------------|------------|
| [Task name] | [# of tasks] | [Describe impact] | [How to reduce risk] |

**High-Priority Bottlenecks** (focus here to avoid delays):
1. [Task] - blocks [X] tasks, [Y] weeks impact if delayed
2. [Task] - blocks [X] tasks, [Y] weeks impact if delayed
3. [Task] - blocks [X] tasks, [Y] weeks impact if delayed

---

## Visual Dependency Map

### Gantt Chart Format

```
Week:    1    2    3    4    5    6    7    8    9    10   11   12
Task 1:  [====]
Task 2:       [======]
Task 3:  [==]
Task 4:            [====]
Task 5:       [==========]
Task 6:                  [=====]
Task 7:                        [=======]
...

Legend:
[====] = Task duration
→      = Dependency relationship
```

### Network Diagram Format

```
         [Task 1]
            ↓
    ┌───────┴───────┐
    ↓               ↓
[Task 2]        [Task 3]
    ↓               ↓
    └───────┬───────┘
            ↓
         [Task 4]
            ↓
         [Task 5]
```

**Note**: For complex projects, use dedicated tools (MS Project, GanttProject, ProjectLibre, or online tools like TeamGantt, Monday.com)

---

## Timeline with Dependencies

### Month 1

| Week | Tasks Starting | Dependencies Met | Blockers |
|------|----------------|------------------|----------|
| 1 | [Tasks] | [Prerequisites satisfied] | [Any blockers] |
| 2 | [Tasks] | [Prerequisites satisfied] | [Any blockers] |
| 3 | [Tasks] | [Prerequisites satisfied] | [Any blockers] |
| 4 | [Tasks] | [Prerequisites satisfied] | [Any blockers] |

### Month 2

| Week | Tasks Starting | Dependencies Met | Blockers |
|------|----------------|------------------|----------|
| 5 | [Tasks] | [Prerequisites satisfied] | [Any blockers] |
| 6 | [Tasks] | [Prerequisites satisfied] | [Any blockers] |
| 7 | [Tasks] | [Prerequisites satisfied] | [Any blockers] |
| 8 | [Tasks] | [Prerequisites satisfied] | [Any blockers] |

[Continue for full project timeline...]

---

## Risk Assessment

### Dependency Risks

| Risk | Probability | Impact | Affected Tasks | Mitigation Strategy |
|------|-------------|--------|----------------|---------------------|
| [External dependency delayed] | [H/M/L] | [H/M/L] | [Task IDs] | [What to do] |
| [Resource unavailable] | [H/M/L] | [H/M/L] | [Task IDs] | [What to do] |
| [Technical blocker] | [H/M/L] | [H/M/L] | [Task IDs] | [What to do] |

### Delay Scenarios

**If [Task X] is delayed by [Y] weeks:**
- Impacts: [List affected tasks]
- New timeline: [Extended by Z weeks]
- Mitigation: [Options to reduce impact]

**If [External dependency] fails:**
- Plan B: [Alternative approach]
- Plan C: [Fallback option]
- Impact: [Timeline, cost, scope changes]

---

## Resource Allocation

### Who Does What When

| Week(s) | Team Member 1 | Team Member 2 | Team Member 3 | External Resources |
|---------|---------------|---------------|---------------|--------------------|
| 1-2 | [Tasks] | [Tasks] | [Tasks] | [Who/what] |
| 3-4 | [Tasks] | [Tasks] | [Tasks] | [Who/what] |
| 5-6 | [Tasks] | [Tasks] | [Tasks] | [Who/what] |

**Resource Conflicts**:
- Week [X]: [Person] overloaded with [Tasks A, B, C]
- Solution: [Adjust timeline, add help, prioritize]

---

## Monitoring & Updates

### Dependency Tracking

Track which dependencies have been satisfied:

| Task | Status | Dependencies Status | Expected Unblock Date | Actual Unblock Date | Variance |
|------|--------|---------------------|----------------------|---------------------|----------|
| T1 | [Status] | ✅ / ⏳ / ❌ | [Date] | [Date] | [+/- days] |
| T2 | [Status] | ✅ / ⏳ / ❌ | [Date] | [Date] | [+/- days] |

**Legend**:
- ✅ All dependencies met, ready to start
- ⏳ Waiting on dependencies
- ❌ Dependency blocked or failed

### Change Log

Track changes to the dependency map as project evolves:

| Date | Change | Reason | Impact on Timeline | Updated By |
|------|--------|--------|-------------------|------------|
| [Date] | [What changed] | [Why] | [+/- X weeks] | [Name] |

---

## Lessons Learned

### Dependency Planning Insights

**What Worked**:
- [Insight about dependency planning]

**What Didn't Work**:
- [Problem or oversight in dependency planning]

**Surprises**:
- [Unexpected dependencies discovered]
- [Dependencies that weren't actually required]

**Improvements for Next Time**:
- [How to improve dependency planning]

---

## Appendix: Dependency Mapping Best Practices

### How to Identify Dependencies

Ask for each task:
1. **What must exist before this can start?** (prerequisites)
2. **What information/approval is needed?** (decision dependencies)
3. **Who else must complete their work first?** (people dependencies)
4. **What external factors must align?** (external dependencies)
5. **What resources must be available?** (resource dependencies)

### Common Dependency Types

- **Finish-to-Start (FS)**: Task B can't start until Task A finishes (most common)
- **Start-to-Start (SS)**: Task B can't start until Task A starts (parallel but sequenced)
- **Finish-to-Finish (FF)**: Task B can't finish until Task A finishes (coordinated completion)
- **Start-to-Finish (SF)**: Task B can't finish until Task A starts (rare, specialized)

### Tips for Managing Dependencies

1. **Identify Early**: Map dependencies before starting work
2. **Track Actively**: Monitor dependency status weekly
3. **Communicate**: Ensure all task owners know their dependencies
4. **Buffer Critical Path**: Add 20-30% time buffer to critical path tasks
5. **Parallelize**: Find every opportunity to run tasks simultaneously
6. **Mitigate External**: Have backup plans for external dependencies
7. **Update Regularly**: Dependency maps change as projects evolve

---

**Map Status**: ☐ Draft ☐ Under Review ☐ Approved ☐ Active ☐ Complete

**Review Schedule**: [How often to review and update - weekly during execution recommended]

**Next Review Date**: [Date]

---

*"Dependencies reveal the true timeline. Map them early, manage them actively, and you'll avoid most project delays."*
— The Implementation Coach
