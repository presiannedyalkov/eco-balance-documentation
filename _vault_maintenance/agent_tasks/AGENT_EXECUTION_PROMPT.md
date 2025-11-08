# 🤖 UNIVERSAL AGENT EXECUTION PROMPT

**Version**: 1.0.0
**Purpose**: Template for executing agent tasks from the routing master

---

## 📋 HOW TO USE THIS PROMPT

Replace `N` with the agent number (1-20) and execute:

```
You are Agent N executing fix tasks for the Eco Balance documentation project.

INSTRUCTIONS:
1. Read the routing master: /home/presi/projects/eco-balance-documentation/_vault_maintenance/agent_tasks/AGENT_ROUTING_MASTER.md
2. Find the section for Agent N
3. Read your specific task file: /home/presi/projects/eco-balance-documentation/_vault_maintenance/agent_tasks/AGENT_0N_TASKS.md (pad with zero if N < 10)
4. Execute ALL tasks listed in your task file
5. Follow the verification checklist in your task file
6. Report completion using the template provided in your task file

IMPORTANT:
- Read files before editing them
- Use the Edit tool for precise changes
- Preserve existing formatting and context
- Verify all changes before marking complete
- Report any issues or blockers encountered

Begin execution now.
```

---

## 🎯 QUICK REFERENCE FOR EACH AGENT

### Agent 1: Marketing Strategy Link Fix
- **File**: [AGENT_01_TASKS.md](./AGENT_01_TASKS.md)
- **Task**: Fix 10 broken cross-references to 60_Marketing_Communications_Strategy
- **Files**: 6 strategic docs
- **Time**: 20-30 min

### Agent 2: Research Framework Link Fix
- **File**: [AGENT_02_TASKS.md](./AGENT_02_TASKS.md)
- **Task**: Fix broken cross-references to 22_Restoration_Challenges_Solutions
- **Files**: 6+ strategic docs
- **Time**: 20-30 min

### Agent 3: Implementation Task Filenames Fix
- **File**: [AGENT_03_TASKS.md](./AGENT_03_TASKS.md)
- **Task**: Correct 35 incorrect filenames in AUDIT_TASKS.md
- **Files**: 1 file
- **Time**: 15-20 min

### Agent 4: Expansion Strategy Terminology
- **Task**: Clarify Bootstrap vs Phase 1 in 40_Expansion_Growth_Strategy.md
- **Source**: FIX-033 (Curator)
- **Time**: 30-45 min

### Agent 5: Site Selection Overview Budget
- **Task**: Update 00_Site_Selection_Overview.md (€17-50k → €1-3k)
- **Source**: FIX-025 Part 1
- **Time**: 30-45 min

### Agent 6: Site Selection Land Condition Budget
- **Task**: Update 02_Evaluate_Land_Condition.md (€2-5k → €500-1.5k)
- **Source**: FIX-025 Part 2
- **Time**: 20-30 min

### Agent 7: Site Selection Restoration Potential Budget
- **Task**: Update 03_Estimate_Restoration_Potential.md (per-ha to Bootstrap totals)
- **Source**: FIX-025 Part 3
- **Time**: 30-40 min

### Agent 8: Site Selection Accessibility Budget
- **Task**: Update 04_Consider_Accessibility.md (infrastructure costs)
- **Source**: FIX-025 Part 4
- **Time**: 40-50 min

### Agent 9: Site Selection Shortlist Scale
- **Task**: Update 08_Make_Shortlist.md (5-10 ha → 1 ha)
- **Source**: FIX-027
- **Time**: 15-20 min

### Agent 10: Site Selection AWG Removal
- **Task**: Remove AWG reference from 04_Consider_Accessibility.md
- **Source**: FIX-026
- **Time**: 10-15 min

### Agent 11: Protected Areas Bootstrap Example
- **Task**: Replace 50 ha example with 1 ha in 03_Create_Protected_Areas.md
- **Source**: FIX-030
- **Time**: 60-75 min

### Agent 12: Biodiversity Monitoring Bootstrap Example
- **Task**: Replace 50 ha monitoring example with 1 ha in 06_Monitor_Biodiversity.md
- **Source**: FIX-031
- **Time**: 60-75 min

### Agent 13: Reforestation Seedling Sourcing Scale
- **Task**: Update 02_Source_Seedlings.md (2 ha → 1 ha)
- **Source**: FIX-028
- **Time**: 30-40 min

### Agent 14: Reforestation Monitoring Budget (Part 1)
- **Task**: Update 05_Monitor_Growth.md (2 ha → 1 ha budget)
- **Source**: FIX-029 Part 1
- **Time**: 20-30 min

### Agent 15: Reforestation Monitoring Budget (Part 2)
- **Task**: Update 06_Long_Term_Management.md (2 ha → 1 ha budget)
- **Source**: FIX-029 Part 2
- **Time**: 30-40 min

### Agent 16: Marketing Communications Funding Goal
- **Task**: Update 60_Marketing_Communications_Strategy.md (€250-500k → €20-30k)
- **Source**: FIX-034
- **Time**: 15-20 min

### Agent 17: Archive README Version Update
- **Task**: Update archive/README.md (v1.0.0 → v2.0.0)
- **Source**: FIX-024 (Archivist)
- **Time**: 10-15 min

### Agent 18: Currency Symbols (Soil Restoration)
- **Task**: Replace $ with € in 7 soil_restoration files
- **Source**: FIX-023 Part 1
- **Time**: 15-20 min

### Agent 19: Currency Symbols (Water Management)
- **Task**: Replace $ with € in 7 water_management files
- **Source**: FIX-023 Part 2
- **Time**: 15-20 min

### Agent 20: Navigation & Formatting Polish
- **Task**: Standardize navigation patterns + fix back link formatting
- **Source**: FIX-023 (QI) + FIX-024 (QI)
- **Time**: 20-30 min

---

## 📊 EXECUTION BEST PRACTICES

1. **Always read files first** - Use Read tool before Edit
2. **Make targeted edits** - Use Edit tool with specific old_string/new_string
3. **Verify line numbers** - Line numbers may shift after edits
4. **Test links** - Ensure cross-references point to existing files
5. **Preserve formatting** - Match existing markdown style
6. **Report blockers** - If stuck, report and move on

---

## ✅ COMPLETION TRACKING

Mark your agent as complete in the routing master:

```markdown
- [x] Agent N: [Task Name] ✅ Complete
```

---

**Status**: Ready for agent execution
**Total Agents**: 20
**Estimated Total Time**: 60-90 minutes (if all run in parallel)
