# Vault Maintenance System

## 🤖 FOR CLAUDE CODE WEB (AUTONOMOUS EXECUTION)

**Using code.claude.com with autonomous merge requests?**

→ **🚀 USE THIS PROMPT**: [guides/CLAUDE_CODE_WEB_PROMPT.md](guides/CLAUDE_CODE_WEB_PROMPT.md) ← **START HERE!**

Copy-paste the prompt, Claude will:
1. Find next unchecked task
2. Complete it
3. Mark as done  
4. Create merge request

**Parallel Execution**: Run 3-5 agents simultaneously for faster completion!

---

## 🎯 FOR INTERACTIVE MAINTENANCE (MANUAL/CONVERSATIONAL)

**Preparing v2.0.0 Bootstrap Model for Release**

→ **Start Here**: Read [guides/WORKFLOW.md](guides/WORKFLOW.md) - The complete two-phase process  
→ **Phase 1 (Audit)**: Use [tasks/AUDIT_TASKS_*.md](tasks/) - Check every file systematically (persona-specific task lists)  
→ **Phase 2 (Fix)**: Use [tasks/FIX_TASKS_*.md](tasks/) - Fix all issues by priority (persona-specific fix lists)

**The Process**: 
1. **AUDIT** every file with every persona (~270 tasks) → Document issues in FIX_TASKS.md
2. **FIX** all documented issues by priority (CRITICAL → LOW)
3. Complete audit BEFORE starting fixes (avoid rework!)

**Goal**: Make v2.0.0 clean, consistent, and ready for release  
**Time Required**: ~30-50 hours over 3-4 weeks

---

## 🚀 Quick Start (For Interactive Use)

**Want to use this system right now?**

→ **For Users**: Read [guides/PROMPT_REFERENCE.md](guides/PROMPT_REFERENCE.md) - Just say "Run the Janitor"!  
→ **For AI Assistants**: Read [guides/AI_ASSISTANT_GUIDE.md](guides/AI_ASSISTANT_GUIDE.md) - Complete execution guide  
→ **New to the system?**: Read [guides/QUICKSTART.md](guides/QUICKSTART.md) - 5-minute introduction

---

## Overview

This directory contains a sophisticated AI-driven vault maintenance system designed to keep the Eco Restoration Project documentation clean, organized, and optimized. The system operates through specialized personas, each with distinct responsibilities and workflows.

## System Architecture

```
_vault_maintenance/
├── personas/              # AI persona definitions and skills
├── tasks/                 # Task management and tracking (AUDIT_TASKS_*, FIX_TASKS_*)
├── workflows/             # Process templates and procedures
├── state/                 # Current state tracking and history
├── guides/                # 👈 User guides and references
│   ├── PROMPT_REFERENCE.md    # Simple commands to trigger personas
│   ├── AI_ASSISTANT_GUIDE.md  # Full guide for AI execution
│   ├── QUICKSTART.md          # Get started in 5 minutes
│   ├── WORKFLOW.md            # Two-phase process guide
│   └── ...
├── plans/                 # Planning documents and strategies
├── audits/                # Audit reports and summaries
├── reports/               # Status reports and updates
└── README.md              # This file
```

## Core Principles

1. **Analyze First**: Every persona begins by analyzing the current state
2. **Plan Before Acting**: Tasks are created but not immediately executed
3. **Track Everything**: All changes and decisions are documented
4. **Collaborate**: Personas work together, not in isolation
5. **Preserve History**: Nothing is deleted; content is archived when moved

## Personas

**📋 See [PERSONA_CATEGORIZATION.md](PERSONA_CATEGORIZATION.md) for complete categorization and when to use each persona.**

### 🔧 Vault Maintenance Crew (6 personas)
**Purpose**: Keep documentation vault clean, organized, consistent, and discoverable  
**Use for**: Regular maintenance, pre-release checks, quality assurance

- 🧹 **The Janitor** - File organization and hygiene
- 📚 **The Curator** - Content quality and coherence
- 🗄️ **The Archivist** - Historical preservation and version control
- 🔍 **The Auditor** - Completeness and consistency verification
- 📖 **The Librarian** - Navigation and discoverability
- ✨ **The Quality Inspector** - Documentation standards and polish

### 🚀 Strategic & Operational Personas (5 personas)
**Purpose**: Project strategy, execution planning, research, security, stakeholder alignment  
**Use for**: Strategic decisions, planning phases, research synthesis, security reviews

- 🔬 **The Knowledge Synthesizer** - Research analysis & knowledge extraction
- 🔐 **The Security Auditor** - Information security & privacy compliance
- 🛠️ **The Implementation Coach** - Execution planning & operational readiness
- 🎯 **The Strategic Advisor** - Critical analysis & strategic challenge
- 👥 **The Stakeholder Advocate** - Multi-perspective review & audience alignment

**Quick Triggers**:
- Maintenance: "Run the Janitor" / "Check organization"
- Strategic: "Run the Strategic Advisor" / "Challenge strategy"
- See [guides/PROMPT_REFERENCE.md](guides/PROMPT_REFERENCE.md) for complete command list

## Using the System

### Simple Trigger Commands

Just say any of these to an AI assistant:

```
"Run the Janitor"           → Analyze file organization
"Execute tasks"             → Complete queued tasks
"Check vault health"        → Get health summary across all personas
"Run the Curator"           → Analyze content quality
```

See [guides/PROMPT_REFERENCE.md](guides/PROMPT_REFERENCE.md) for complete command list.

### Workflow

#### Phase 1: Analysis
Each persona examines the vault from their perspective and documents findings.

#### Phase 2: Task Creation
Based on analysis, personas create specific, actionable tasks in the task queue.

#### Phase 3: Review & Prioritization
Tasks are reviewed and prioritized before execution.

#### Phase 4: Execution
Another AI agent executes the approved tasks.

#### Phase 5: Verification
The relevant persona verifies the completed work.

## For AI Assistants

**When user triggers a persona:**

1. ✓ Immediately read persona file from `personas/[persona].md`
2. ✓ Load state file from `state/[persona]_state.md`
3. ✓ Follow the persona's analysis checklist systematically
4. ✓ Create task files for issues found
5. ✓ Calculate and report health score
6. ✓ Update state file with findings

**Full execution guide:** [guides/AI_ASSISTANT_GUIDE.md](guides/AI_ASSISTANT_GUIDE.md)

## For Humans

### Review & Prioritize
1. Check `tasks/queue/` for pending tasks
2. Move critical tasks to `tasks/priority/`
3. Assign tasks to AI for execution

### Monitor Progress
- Check state files for current health scores
- Review completed tasks
- Track improvements over time

## Task Management

```
tasks/
├── queue/         # New tasks awaiting review
├── priority/      # High-priority tasks
├── in-progress/   # Currently being worked on
├── completed/     # Finished tasks
└── archived/      # Historical tasks
```

## State Tracking

Each persona maintains a state file with:
- Last analysis timestamp
- Findings summary
- Current health score (0-100)
- Identified issues
- Recommended actions
- Next analysis schedule

**View all states:** Read all files in `state/` directory

## Documentation

### Essential Reading
- **[PERSONA_CATEGORIZATION.md](PERSONA_CATEGORIZATION.md)** - 👈 **Which persona to use when**
- **[guides/PROMPT_REFERENCE.md](guides/PROMPT_REFERENCE.md)** - Quick command reference
- **[guides/QUICKSTART.md](guides/QUICKSTART.md)** - Get started in 5 minutes
- **[guides/AI_ASSISTANT_GUIDE.md](guides/AI_ASSISTANT_GUIDE.md)** - Complete AI execution guide
- **[guides/TASK_SPLITTING_GUIDE.md](guides/TASK_SPLITTING_GUIDE.md)** - 👈 **How to split large tasks into smaller ones**

### Detailed Workflows
- **[analysis_workflow.md](workflows/analysis_workflow.md)** - How to run an analysis
- **[task_execution_workflow.md](workflows/task_execution_workflow.md)** - How to execute tasks
- **[coordination_workflow.md](workflows/coordination_workflow.md)** - How personas work together
- **[persona_coordination_matrix.md](workflows/persona_coordination_matrix.md)** - Coordination reference
- **[analysis_schedule.md](workflows/analysis_schedule.md)** - When to run analyses

### Examples
- **[example_analysis_run.md](workflows/examples/example_analysis_run.md)** - Complete analysis walkthrough
- **[example_*_task.md](workflows/examples/)** - Sample tasks from each persona

## Integration with Vault

This maintenance system:
- Works alongside Git version control
- Respects established directory structure
- Uses existing templates from `_templates/`
- Coordinates with process tracking in `_process/`
- Maintains changelog and version history

## Best Practices

1. **Regular Cadence**: Run analyses weekly or after major changes
2. **Full Coverage**: Rotate through all personas periodically
3. **Task Review**: Review tasks before execution
4. **Document Decisions**: Update state files with reasoning
5. **Coordinate Changes**: Consider impact on other personas' domains

## Quick Examples

### Example 1: First Time Use
```
User: "Run the Janitor"
AI: [Loads persona, analyzes vault, creates tasks, reports findings]
User: "Execute high priority tasks"
AI: [Completes tasks, reports results]
```

### Example 2: Regular Maintenance
```
User: "Check vault health"
AI: [Summarizes all persona health scores and issues]
User: "Run the Curator"
AI: [Analyzes content quality, creates improvement tasks]
```

### Example 3: Pre-Release Check
```
User: "Run all personas"
AI: [Runs complete baseline analysis across all 6 personas]
User: "Execute critical and high priority tasks"
AI: [Completes urgent improvements]
```

## Version History

- v1.1.0 (2025-10-27): Added AI trigger system and prompt guides
- v1.0.0 (2025-10-26): Initial vault maintenance system creation

## Support

For questions or improvements:
- Create task in `tasks/queue/`
- Document in relevant state file
- Review examples in `workflows/examples/`

---

**Ready to start?** Say "Run the Janitor" to your AI assistant! 🚀
