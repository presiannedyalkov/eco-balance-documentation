# Vault Maintenance Quick Start

## What Is This?

An AI-driven system with 6 specialized personas that keep your vault clean, organized, and high-quality:

- 🧹 **Janitor** - File organization & hygiene
- 📚 **Curator** - Content quality & connections  
- 🗄️ **Archivist** - History & versioning
- 🔍 **Auditor** - Completeness & consistency
- 📖 **Librarian** - Navigation & links
- ✨ **Quality Inspector** - Formatting & polish

## Get Started in 5 Minutes

### 1. Pick a Persona (1 min)

**First time?** Start with the Janitor:
```
_vault_maintenance/personas/janitor.md
```

**Choose based on your concern:**
- Files messy? → Janitor
- Content gaps? → Curator
- Broken links? → Librarian
- Bad formatting? → Quality Inspector
- Missing docs? → Auditor
- Version issues? → Archivist

### 2. Read the Persona File (2 min)

Open the persona file and skim:
- Core Responsibilities
- Analysis Checklist
- What they look for

### 3. Check Current State (1 min)

Read the state file:
```
_vault_maintenance/state/[persona]_state.md
```

See what was found last time (or if first run, it'll say "awaiting first analysis")

### 4. Run Analysis (30-60 min)

Follow the persona's checklist:
- Go through vault systematically
- Document what you find
- Calculate health score
- Create tasks for issues

### 5. Review Tasks (1 min)

Check what tasks were created:
```
_vault_maintenance/tasks/queue/
```

## Your First Analysis

### Running the Janitor (Easiest Start)

**Open these files:**
1. `personas/janitor.md` (the persona)
2. `state/janitor_state.md` (current state)
3. `workflows/analysis_workflow.md` (the process)

**Follow the checklist in janitor.md:**
- [ ] Scan all directories
- [ ] Check file naming
- [ ] Find misplaced files
- [ ] Identify redundancies
- [ ] Review archive structure

**Create tasks** for issues found:
- Use template in `workflows/task_template.md`
- Save to `tasks/queue/`
- Name like: `JAN-2025-10-27-001-move-stray-files.md`

**Update state file:**
- Add your findings
- Set health score
- Document next steps

**Done!** You've run your first analysis.

## Quick Commands for AI Assistants

### Read a Persona
```
"Please read the Janitor persona file and run an analysis of the vault"
```

### Execute Tasks
```
"Please review tasks in the queue and execute the high-priority ones"
```

### Quick Health Check
```
"Please read all state files and give me a health summary"
```

## Common Workflows

### Weekly Maintenance (30 min)
```
1. Quick health check (read all state files) - 5 min
2. Run 1 persona analysis - 15 min  
3. Execute 2-3 small tasks - 10 min
```

### Before Release (2 hours)
```
1. Run Auditor (completeness check) - 30 min
2. Run Quality Inspector (polish) - 30 min
3. Execute all CRITICAL tasks - 45 min
4. Quick verification - 15 min
```

### After Major Changes (1 hour)
```
1. Run Janitor (organization) - 20 min
2. Run Librarian (fix links) - 20 min
3. Execute urgent tasks - 20 min
```

## File Locations Cheat Sheet

```
_vault_maintenance/
├── personas/          → Read these to understand each role
├── state/             → Current health & findings
├── tasks/
│   ├── queue/         → New tasks to review
│   ├── priority/      → Urgent tasks
│   ├── in-progress/   → Currently working on
│   ├── completed/     → Done
│   └── archived/      → Old/irrelevant
└── workflows/         → How-to guides
```

## Task Lifecycle

```
1. Persona creates task → saves to queue/
2. You review & prioritize → move to priority/ if urgent
3. AI executes task → moves to in-progress/
4. Task completed → moves to completed/
5. Old tasks → eventually archived/
```

## Health Score Guide

Each persona rates vault 0-100:

- **90-100**: Excellent ✨
- **75-89**: Good ✓
- **60-74**: Fair ⚠️
- **40-59**: Poor ⚠️⚠️
- **0-39**: Critical 🚨

**Goal:** Keep all scores above 75

## Need Help?

### Full Documentation
- **System Overview**: `README.md`
- **How to Analyze**: `workflows/analysis_workflow.md`
- **How to Execute Tasks**: `workflows/task_execution_workflow.md`
- **Coordination**: `workflows/coordination_workflow.md`
- **Scheduling**: `workflows/analysis_schedule.md`

### Examples
- See `workflows/examples/` for sample tasks from each persona

### Templates
- **Task template**: `workflows/task_template.md`
- **State template**: `state/state_template.md`

## Pro Tips

1. **Start Small**: Run one persona, execute a few tasks, see the impact
2. **Be Consistent**: Better weekly light maintenance than sporadic deep dives
3. **Read State Files**: They tell you what's happening across the vault
4. **Coordinate**: Check what other personas found before analyzing
5. **Don't Skip Verification**: Always check tasks were completed correctly
6. **Update States**: Keep state files current for next analysis

## Common Questions

**Q: Which persona should I run first?**  
A: Janitor. Organization is the foundation for everything else.

**Q: How often should I run analyses?**  
A: Weekly for active projects, bi-weekly for stable ones. See `workflows/analysis_schedule.md`

**Q: Do I need to run all personas?**  
A: Eventually yes, but you can rotate. See scheduling guide.

**Q: What if I find too many issues?**  
A: Normal for first analysis! Prioritize CRITICAL and HIGH, do others over time.

**Q: Can personas run in parallel?**  
A: Some can, some need sequence. See `workflows/persona_coordination_matrix.md`

**Q: How long does maintenance take?**  
A: ~5-6 hours/week for regular maintenance (2 analyses + task execution)

## Next Steps

1. ✅ Read this quickstart
2. ⬜ Pick a persona (suggest: Janitor)
3. ⬜ Run your first analysis
4. ⬜ Execute 1-2 tasks
5. ⬜ Plan regular schedule
6. ⬜ Explore other personas

---

**Ready to start?** Pick a persona and dive in! The vault will thank you. ✨
