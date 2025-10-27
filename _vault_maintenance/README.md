# Vault Maintenance System

## 🚀 Quick Start

**Want to use this system right now?**

→ **For Users**: Read [PROMPT_REFERENCE.md](PROMPT_REFERENCE.md) - Just say "Run the Janitor"!  
→ **For AI Assistants**: Read [AI_ASSISTANT_GUIDE.md](AI_ASSISTANT_GUIDE.md) - Complete execution guide  
→ **New to the system?**: Read [QUICKSTART.md](QUICKSTART.md) - 5-minute introduction

---

## Overview

This directory contains a sophisticated AI-driven vault maintenance system designed to keep the Eco Restoration Project documentation clean, organized, and optimized. The system operates through specialized personas, each with distinct responsibilities and workflows.

## System Architecture

```
_vault_maintenance/
├── personas/              # AI persona definitions and skills
├── tasks/                 # Task management and tracking
├── workflows/             # Process templates and procedures
├── state/                 # Current state tracking and history
├── PROMPT_REFERENCE.md    # 👈 Simple commands to trigger personas
├── AI_ASSISTANT_GUIDE.md  # 👈 Full guide for AI execution
├── QUICKSTART.md          # 👈 Get started in 5 minutes
└── README.md              # This file
```

## Core Principles

1. **Analyze First**: Every persona begins by analyzing the current state
2. **Plan Before Acting**: Tasks are created but not immediately executed
3. **Track Everything**: All changes and decisions are documented
4. **Collaborate**: Personas work together, not in isolation
5. **Preserve History**: Nothing is deleted; content is archived when moved

## Personas

### 🧹 The Janitor
**Role**: File organization and hygiene  
**Focus**: Proper file placement, redundancy elimination, naming conventions  
**Trigger**: "Run the Janitor" or "Check organization"

### 📚 The Curator
**Role**: Content quality and coherence  
**Focus**: Cross-references, content gaps, narrative flow  
**Trigger**: "Run the Curator" or "Check content quality"

### 🗄️ The Archivist
**Role**: Historical preservation and version control  
**Focus**: Archive management, changelog maintenance, version tracking  
**Trigger**: "Run the Archivist" or "Check archives"

### 🔍 The Auditor
**Role**: Completeness and consistency verification  
**Focus**: Gap analysis, standards compliance, structural integrity  
**Trigger**: "Run the Auditor" or "Check completeness"

### 📖 The Librarian
**Role**: Navigation and discoverability  
**Focus**: Index maintenance, link management, documentation maps  
**Trigger**: "Run the Librarian" or "Check links"

### ✨ The Quality Inspector
**Role**: Documentation standards and polish  
**Focus**: Formatting, style guide adherence, readability  
**Trigger**: "Run Quality Inspector" or "Check formatting"

## Using the System

### Simple Trigger Commands

Just say any of these to an AI assistant:

```
"Run the Janitor"           → Analyze file organization
"Execute tasks"             → Complete queued tasks
"Check vault health"        → Get health summary across all personas
"Run the Curator"           → Analyze content quality
```

See [PROMPT_REFERENCE.md](PROMPT_REFERENCE.md) for complete command list.

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

**Full execution guide:** [AI_ASSISTANT_GUIDE.md](AI_ASSISTANT_GUIDE.md)

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
- **[PROMPT_REFERENCE.md](PROMPT_REFERENCE.md)** - Quick command reference
- **[QUICKSTART.md](QUICKSTART.md)** - Get started in 5 minutes
- **[AI_ASSISTANT_GUIDE.md](AI_ASSISTANT_GUIDE.md)** - Complete AI execution guide

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
