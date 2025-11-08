# 🤖 AGENT TASK DISTRIBUTION SYSTEM

**Created**: November 8, 2025
**Purpose**: Distribute 18 fix tasks across 20 parallel agents for efficient execution
**Status**: ✅ Ready for Execution

---

## 📂 WHAT'S IN THIS DIRECTORY

### Core Documents

1. **[AGENT_ROUTING_MASTER.md](./AGENT_ROUTING_MASTER.md)** - Master routing document
   - Complete task distribution overview
   - Agent assignments 1-20
   - Progress tracking checklist
   - Execution statistics

2. **[AGENT_EXECUTION_PROMPT.md](./AGENT_EXECUTION_PROMPT.md)** - Universal execution template
   - Quick reference for all agents
   - Execution best practices
   - Completion tracking

3. **AGENT_01_TASKS.md through AGENT_20_TASKS.md** - Individual agent task files
   - Agents 1-3: Detailed task files (cross-reference fixes)
   - Agents 4-20: Reference files (point to routing master for details)

---

## 🚀 HOW TO USE THIS SYSTEM

### Quick Start

**To execute a specific agent**, use this prompt format:

```
execute the tasks for agent [NUMBER] from this list: /home/presi/projects/eco-balance-documentation/_vault_maintenance/agent_tasks/AGENT_ROUTING_MASTER.md
```

**Examples**:

```bash
# Execute Agent 1 (Marketing Strategy Link Fix)
execute the tasks for agent 1 from this list: /home/presi/projects/eco-balance-documentation/_vault_maintenance/agent_tasks/AGENT_ROUTING_MASTER.md

# Execute Agent 5 (Site Selection Budget Fix)
execute the tasks for agent 5 from this list: /home/presi/projects/eco-balance-documentation/_vault_maintenance/agent_tasks/AGENT_ROUTING_MASTER.md

# Execute Agent 18 (Currency Symbol Fix)
execute the tasks for agent 18 from this list: /home/presi/projects/eco-balance-documentation/_vault_maintenance/agent_tasks/AGENT_ROUTING_MASTER.md
```

### Step-by-Step Process

1. **Choose an agent** (1-20) from the routing master
2. **Copy the execution prompt** and replace `[NUMBER]`
3. **Send the prompt** to Claude Code
4. **Agent will**:
   - Read the routing master
   - Find its specific tasks
   - Read detailed instructions from source FIX_TASKS files
   - Execute all assigned tasks
   - Verify changes
   - Report completion

5. **Mark as complete** in the routing master checklist

---

## 📊 TASK DISTRIBUTION SUMMARY

### By Priority

**🔴 HIGH PRIORITY** (10 agents - do these first):
- Agent 1: Marketing Strategy Links (20-30 min)
- Agent 2: Research Framework Links (20-30 min)
- Agent 3: Implementation Filenames (15-20 min)
- Agent 5: Site Selection Overview Budget (30-45 min)
- Agent 6: Site Selection Land Condition Budget (20-30 min)
- Agent 7: Site Selection Restoration Potential Budget (30-40 min)
- Agent 8: Site Selection Accessibility Budget (40-50 min)
- Agent 9: Site Selection Shortlist Scale (15-20 min)
- Agent 11: Protected Areas Bootstrap Example (60-75 min)

**🟡 MEDIUM PRIORITY** (8 agents - do these next):
- Agent 4: Expansion Strategy Terminology (30-45 min)
- Agent 10: Site Selection AWG Removal (10-15 min)
- Agent 12: Biodiversity Monitoring Bootstrap (60-75 min)
- Agent 13: Reforestation Seedling Sourcing (30-40 min)
- Agent 14: Reforestation Monitoring Part 1 (20-30 min)
- Agent 15: Reforestation Monitoring Part 2 (30-40 min)
- Agent 16: Marketing Funding Goal (15-20 min)
- Agent 17: Archive Version Update (10-15 min)

**🟢 LOW PRIORITY** (2 agents - do these last):
- Agent 18: Currency Symbols Soil Restoration (15-20 min)
- Agent 19: Currency Symbols Water Management (15-20 min)
- Agent 20: Navigation & Formatting Polish (20-30 min)

### By File Category

**Cross-Reference Fixes** (Agents 1-3):
- Marketing strategy links: 10 instances
- Research framework links: 6+ instances
- Implementation task filenames: 35 corrections

**Budget/Scale Alignment** (Agents 4-17):
- Site selection files: 4 files
- Biodiversity files: 2 files
- Reforestation files: 3 files
- Strategic docs: 3 files

**Cosmetic Polish** (Agents 18-20):
- Currency symbols: 14 files
- Navigation patterns: 1 file
- Back link formatting: 3 files

---

## ⏱️ TIME ESTIMATES

**Total if executed serially**: 8-12 hours
**Total if executed in parallel** (all 20 agents): **60-90 minutes**

**Recommended Approach**: Run in batches by priority
- **Batch 1** (HIGH): Agents 1-3, 5-9, 11 (parallel) → ~75 min
- **Batch 2** (MEDIUM): Agents 4, 10, 12-17 (parallel) → ~75 min
- **Batch 3** (LOW): Agents 18-20 (parallel) → ~20 min

---

## 🎯 EXECUTION STRATEGIES

### Strategy 1: Complete Parallelization (Fastest)
Run all 20 agents simultaneously in separate sessions
- **Time**: 60-90 minutes
- **Complexity**: High (managing 20 sessions)
- **Risk**: Medium (coordination overhead)

### Strategy 2: Priority Batches (Recommended)
Run in 3 batches by priority
- **Time**: 2-3 hours
- **Complexity**: Medium
- **Risk**: Low (easier to track)

### Strategy 3: Sequential Execution (Safest)
Run agents one at a time in priority order
- **Time**: 8-12 hours
- **Complexity**: Low
- **Risk**: Very low (full control)

### Strategy 4: Category-Based (Organized)
Group by file category:
- **Round 1**: Cross-references (Agents 1-3)
- **Round 2**: Site selection (Agents 5-10)
- **Round 3**: Biodiversity (Agents 11-12)
- **Round 4**: Reforestation (Agents 13-15)
- **Round 5**: Strategic docs (Agents 4, 16-17)
- **Round 6**: Polish (Agents 18-20)

---

## ✅ PROGRESS TRACKING

See [AGENT_ROUTING_MASTER.md](./AGENT_ROUTING_MASTER.md) for the master checklist.

Quick status check:
```bash
grep -c "\\[x\\]" ./_vault_maintenance/agent_tasks/AGENT_ROUTING_MASTER.md
```

This will show how many agents have been completed.

---

## 📝 COMPLETION CRITERIA

**All agents complete when**:
- ✅ All 20 checkboxes marked in routing master
- ✅ All source FIX_TASKS files show tasks as complete
- ✅ No broken links remain in documentation
- ✅ All budget figures aligned to v2.0 Bootstrap Model
- ✅ All files pass verification checklists

---

## 🔧 TROUBLESHOOTING

### Agent can't find task file
- Verify path: `/home/presi/projects/eco-balance-documentation/_vault_maintenance/agent_tasks/`
- Check file exists: `AGENT_XX_TASKS.md` (with zero padding)

### Agent doesn't know what to do
- Agents 1-3 have detailed instructions in their task files
- Agents 4-20 reference the routing master for details
- Always provide full path to AGENT_ROUTING_MASTER.md

### Multiple agents modifying same file
- Check the routing master "Files Modified" for each agent
- Agents are designed to work on different files
- Exception: Agents 8 and 10 both touch site_selection/04_Consider_Accessibility.md (run Agent 8 first)

### Want to verify before executing
- Read the routing master: [AGENT_ROUTING_MASTER.md](./AGENT_ROUTING_MASTER.md)
- Read specific agent task file: `AGENT_XX_TASKS.md`
- Check source FIX_TASKS files in parent directory

---

## 📚 RELATED DOCUMENTATION

- **Source Fix Tasks**: `../*.md` (FIX_TASKS_CURATOR.md, FIX_TASKS_LIBRARIAN.md, etc.)
- **Audit Reports**: `../AUDIT_TASKS_*.md`
- **Workflow**: `../WORKFLOW.md`
- **Project Hub**: `../../00_Eco_Balance_Hub.md`

---

## 🎉 FINAL NOTES

This distribution system was designed to:
1. **Maximize parallelization** - Most agents work on different files
2. **Balance workload** - Each agent gets 1-3 related tasks
3. **Minimize complexity** - Clear instructions and verification
4. **Enable progress tracking** - Easy to see what's done
5. **Support different execution strategies** - Parallel, batched, or sequential

**Total Fix Tasks**: 18 unique fixes
**Total Files to Modify**: ~45-50 files
**Total Agents**: 20
**Expected Outcome**: Complete v2.0 Bootstrap Model alignment

---

**Ready to begin?** Start with Agent 1 using the execution prompt format above!

**Questions?** Check [AGENT_ROUTING_MASTER.md](./AGENT_ROUTING_MASTER.md) for complete details.

---

**Status**: ✅ All systems ready for execution
**Created by**: Claude Code (Sonnet 4.5)
**Date**: November 8, 2025
