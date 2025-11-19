# ⚡ PARALLEL EXECUTION GUIDE

**Running Multiple Claude Code Agents Simultaneously**

---

## ⚠️ IMPORTANT: TRUE PARALLEL REQUIRES COORDINATION

**The Problem**: If all agents start simultaneously and look for "first unchecked task", they'll ALL pick the same task!

**The Solution**: Use one of three strategies below for TRUE parallel execution.

---

## 🚀 STRATEGY 1: TASK RANGE ASSIGNMENT (RECOMMENDED)

Divide the ~270 tasks into ranges and assign each agent a specific range.

### How It Works:

```
Agent 1: Tasks 1-54   (Strategic docs 00-04)
Agent 2: Tasks 55-108 (Organizational docs 10-13)  
Agent 3: Tasks 109-162 (Methodology & Business 20-32)
Agent 4: Tasks 163-216 (Growth & Performance 40-60)
Agent 5: Tasks 217-270 (Case studies & impl tasks)
```

All agents work simultaneously on DIFFERENT tasks - TRUE parallel execution!

### Setup:

1. Open 5 tabs of code.claude.com
2. In each tab, paste the appropriate prompt from CLAUDE_CODE_WEB_PROMPT.md
   - Tab 1: "Agent 1 Prompt" (tasks 1-54)
   - Tab 2: "Agent 2 Prompt" (tasks 55-108)
   - Tab 3: "Agent 3 Prompt" (tasks 109-162)
   - Tab 4: "Agent 4 Prompt" (tasks 163-216)
   - Tab 5: "Agent 5 Prompt" (tasks 217-270)
3. Hit enter in all tabs
4. Wait for 5 merge requests
5. Merge them all
6. Done! All 270 tasks completed in one parallel batch

### Pros:
- ✅ TRUE parallel execution
- ✅ No conflicts possible
- ✅ Fastest completion time
- ✅ Simple: Each agent gets one clear instruction

### Cons:
- ⚠️ Need to define task ranges upfront
- ⚠️ If one agent fails, that range incomplete

**Time Estimate**: ~2-4 hours total (all 270 tasks done simultaneously!)

---

## 🚀 STRATEGY 2: PERSONA ASSIGNMENT

Assign each agent a different persona. Each persona checks ALL files.

### How It Works:

```
Agent "Curator": Checks ALL files with Curator lens
Agent "Auditor": Checks ALL files with Auditor lens
Agent "Librarian": Checks ALL files with Librarian lens  
Agent "Quality Inspector": Checks ALL files with QI lens
Agent "Janitor": Checks ALL files with Janitor lens
Agent "Archivist": Checks ALL files with Archivist lens
```

All 6 agents work simultaneously, each doing their persona's checks on all files.

### Setup:

1. Open 6 tabs of code.claude.com
2. In each tab, paste the appropriate persona prompt from CLAUDE_CODE_WEB_PROMPT.md
   - Tab 1: "Agent Curator Prompt"
   - Tab 2: "Agent Auditor Prompt"
   - Tab 3: "Agent Librarian Prompt"
   - Tab 4: "Agent Quality Inspector Prompt"
   - Tab 5: "Agent Janitor Prompt"
   - Tab 6: "Agent Archivist Prompt"
3. Hit enter in all tabs
4. Wait for 6 merge requests (one per persona)
5. Merge them all
6. Done! All personas have checked all files

### Pros:
- ✅ TRUE parallel execution
- ✅ Natural division of work
- ✅ Each persona works independently
- ✅ No task range calculations needed

### Cons:
- ⚠️ Need 6 agents (one per persona)
- ⚠️ Merge requests are large (each covers all files)

**Time Estimate**: ~3-5 hours total (6 personas working simultaneously)

---

## 🚀 STRATEGY 3: SEQUENTIAL (SIMPLEST)

One agent at a time, but fast turnaround.

### How It Works:

```
You: Paste prompt
Agent: Completes 1 task → Creates MR
You: Merge MR immediately
You: Paste prompt again (agent picks next task)
Agent: Completes next task → Creates MR
...repeat...
```

**Not truly parallel**, but with fast merge cycles you can complete tasks quickly.

### Setup:

1. Open 1 tab of code.claude.com
2. Paste the "Sequential Batch" prompt from CLAUDE_CODE_WEB_PROMPT.md
3. Agent does one task, creates MR
4. Merge the MR
5. Paste prompt again immediately
6. Repeat ~270 times

### Pros:
- ✅ Simplest approach
- ✅ No conflicts possible
- ✅ Easy to monitor
- ✅ Can pause/resume anytime

### Cons:
- ❌ NOT parallel - sequential execution
- ❌ Slower - each task waits for previous
- ❌ Requires ~270 copy-paste cycles

**Time Estimate**: ~20-40 hours (depends on merge speed)

---

## 📊 STRATEGY COMPARISON

| Strategy | Parallel? | Speed | Complexity | Best For |
|----------|-----------|-------|------------|----------|
| **Range Assignment** | ✅ TRUE | ⚡⚡⚡ Fastest (2-4h) | Medium | Want done fast |
| **Persona Assignment** | ✅ TRUE | ⚡⚡ Fast (3-5h) | Low | Natural division |
| **Sequential** | ❌ Sequential | ⚡ Slow (20-40h) | Very Low | Simplicity |

---

## 💡 RECOMMENDED APPROACH

**For Audit Phase (270 tasks)**: 
- Use **STRATEGY 1** (Range Assignment) or **STRATEGY 2** (Persona Assignment)
- TRUE parallel = Fastest completion

**For Fix Phase (22+ tasks)**:
- Use **STRATEGY 3** (Sequential) - smaller task count, easier to manage

---

---

## 🎯 DETAILED EXAMPLE: STRATEGY 1 (RANGE ASSIGNMENT)

### Task Division:

Count total tasks in AUDIT_TASKS.md (~270 tasks total).

Divide by number of agents you want:
- 270 ÷ 5 agents = ~54 tasks per agent

### Agent Assignments:

```
AGENT 1: Tasks 1-54
Location: Strategic docs 00-04 (all 6 personas × ~9 files)
Files: 00_Eco_Balance_Hub.md (root) through 04_Current_Status_Assessment.md

AGENT 2: Tasks 55-108  
Location: Organizational docs 10-13 (all 6 personas × ~9 files)
Files: 10_Organizational_Structure.md through 13_Legal_Framework.md

AGENT 3: Tasks 109-162
Location: Methodology & Business docs 20-32 (all 6 personas × ~9 files)
Files: 20_Restoration_Methodology.md through 32_Funding_Strategy.md

AGENT 4: Tasks 163-216
Location: Growth & Performance docs 40-60 (all 6 personas × ~9 files)
Files: 40_Expansion_Growth_Strategy.md through 60_Marketing_Communications_Strategy.md

AGENT 5: Tasks 217-270
Location: Case studies & Implementation tasks start
Files: 70_Case_Studies.md + implementation_tasks/ beginning
```

### Execution Timeline:

```
00:00 - Paste all 5 prompts in 5 tabs
00:01 - All 5 agents start working on their ranges
02:00 - Agent 2 finishes first (smaller files)
02:30 - Agent 1 finishes
03:00 - Agent 3 finishes
03:30 - Agent 4 finishes  
04:00 - Agent 5 finishes (largest range)
04:15 - You merge all 5 MRs
04:20 - DONE! All 270 audit tasks complete!
```

**Result**: 4-5 hours total vs 20-40 hours sequential!

---

## 🎯 DETAILED EXAMPLE: STRATEGY 2 (PERSONA ASSIGNMENT)

### Persona Responsibilities:

```
CURATOR (Agent 1):
- Checks content quality for ALL files
- Looks for: gaps, coherence, cross-references
- Marks Curator tasks [x] done

AUDITOR (Agent 2):
- Checks data consistency for ALL files  
- Looks for: budget contradictions, version mismatches
- Marks Auditor tasks [x] done

LIBRARIAN (Agent 3):
- Checks navigation for ALL files
- Looks for: broken links, discoverability
- Marks Librarian tasks [x] done

QUALITY INSPECTOR (Agent 4):
- Checks formatting for ALL files
- Looks for: style, polish, readability
- Marks QI tasks [x] done

JANITOR (Agent 5):
- Checks organization for ALL files
- Looks for: file placement, naming, structure
- Marks Janitor tasks [x] done

ARCHIVIST (Agent 6):
- Checks version control for ALL files
- Looks for: history tracking, archival needs
- Marks Archivist tasks [x] done
```

### Execution Timeline:

```
00:00 - Paste all 6 persona prompts in 6 tabs
00:01 - All 6 personas start checking all files
03:00 - Curator finishes (most thorough checks)
03:15 - Auditor finishes
03:30 - Librarian finishes
03:45 - Quality Inspector finishes
04:00 - Janitor finishes
04:15 - Archivist finishes
04:30 - You merge all 6 MRs
04:35 - DONE! All personas have checked all files!
```

**Result**: 4-5 hours total with natural work division!

---

## 🛡️ WHY THESE STRATEGIES AVOID CONFLICTS

### Strategy 1 (Range Assignment):
- Agent 1 only touches tasks 1-54
- Agent 2 only touches tasks 55-108
- **No overlap = No conflicts!**

### Strategy 2 (Persona Assignment):
- Each persona marks different checkboxes
- Curator marks Curator tasks, Auditor marks Auditor tasks
- **Different checkboxes = No conflicts!**

### Strategy 3 (Sequential):
- Only one agent working at a time
- **No parallelism = No conflicts!**

---

---

## 📋 IMPLEMENTATION CHECKLIST

### Before Starting:

- [ ] Decide which strategy to use (Range / Persona / Sequential)
- [ ] Read CLAUDE_CODE_WEB_PROMPT.md for exact prompts
- [ ] Open required number of tabs (5 for Range, 6 for Persona, 1 for Sequential)
- [ ] Load vault in each tab

### During Execution:

- [ ] Paste appropriate prompts in each tab
- [ ] Monitor merge requests as they arrive
- [ ] Review MR quality (spot check, not every detail)
- [ ] Merge MRs promptly to keep agents unblocked
- [ ] Track progress (count checkboxes)

### After Completion:

- [ ] All audit tasks [x] checked in AUDIT_TASKS.md
- [ ] All issues documented in FIX_TASKS.md
- [ ] All MRs merged
- [ ] Ready to start Phase 2 (fixes)

---

## 📊 PROGRESS TRACKING

### Quick Count:

Open AUDIT_TASKS.md and count:
- `[x]` = Completed tasks
- `[ ]` = Remaining tasks

Progress % = (Completed / Total) × 100

### Expected Totals:

- Strategic docs (00-70): ~30-40 persona-tasks
- Implementation tasks: ~264 persona-tasks (44 files × 6 personas)
- **Total**: ~270-300 audit tasks

---

## ⚡ SPEED ESTIMATES

| Strategy | Setup Time | Execution Time | Total Time |
|----------|------------|----------------|------------|
| **Range Assignment (5 agents)** | 5 min | 2-4 hours | **2-4 hours** ⚡ |
| **Persona Assignment (6 agents)** | 5 min | 3-5 hours | **3-5 hours** ⚡ |
| **Sequential (1 agent)** | 1 min | 20-40 hours | **20-40 hours** |

**Recommendation**: Use Range or Persona for massive time savings!

---
## 💡 PRO TIPS

### For Range Assignment:
1. **Calculate ranges carefully**: Divide total tasks by number of agents
2. **Balance workload**: Some sections have more files than others
3. **Start all simultaneously**: Paste all prompts within 1 minute
4. **Review as batch**: Wait for all to complete, merge together

### For Persona Assignment:
1. **Natural division**: Each persona has clear responsibilities
2. **Independent work**: Personas don't interfere with each other
3. **One MR per persona**: Easy to review persona-specific findings
4. **Quality focus**: Each persona does deeper checks on all files

### For All Strategies:
1. **Spot check quality**: Review every 3-5 MRs thoroughly, skim others
2. **Trust but verify**: Agents are good but not perfect
3. **Save session**: Keep tabs open for re-running if needed
4. **Monitor progress**: Visual scan of checkboxes shows completion

---

## 🔧 TROUBLESHOOTING

### "How do I know which strategy to use?"
→ **Fast + willing to set up**: Range or Persona Assignment
→ **Simple + no rush**: Sequential
→ **Audit phase**: Parallel strategies (large task count)
→ **Fix phase**: Sequential okay (smaller task count)

### "Agent finished but tasks still unchecked"
→ Agent may have failed - check MR for errors
→ Re-run that agent's prompt
→ Review what went wrong

### "MR conflicts when merging"
→ For Range/Persona: Shouldn't happen (non-overlapping)
→ For Sequential: Previous MR not merged yet
→ Solution: Merge previous MRs first

### "Agent started fixing during audit"
→ WORKFLOW.md not read properly
→ Emphasize "AUDIT PHASE ONLY" in prompt
→ Discard fix MR, add reminder to prompt

### "How do I know audit is complete?"
→ Count tasks: All `[x]` checked in AUDIT_TASKS.md
→ Visual scan: No `[ ]` remaining
→ Agent confirmation: "All audit tasks complete"

### "Agent took too long / timed out"
→ Large task range may take 4-6 hours
→ This is normal - let it run
→ Or reduce range size (more agents, smaller ranges)

---

## 🎉 COMPLETION

You'll know you're done when:

1. **AUDIT_TASKS.md**: All tasks `[x]` checked
2. **FIX_TASKS.md**: All tasks marked Complete
3. **No pending MRs**: All merged
4. **VERSION file**: Still shows 2.0.0
5. **CHANGELOG**: Updated with all changes

Then: **v2.0.0 is RELEASE-READY!** 🚀

---

**Happy parallel processing!**