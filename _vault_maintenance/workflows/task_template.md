# Task Template Reference

## Standard Task Template

```yaml
task_id: [PERSONA_CODE]-YYYY-MM-DD-###
created_by: [Persona Name]
created_date: YYYY-MM-DD
priority: [LOW|MEDIUM|HIGH|CRITICAL]
category: [persona-specific category]
status: queued

title: [Clear, action-oriented title]

description: |
  Detailed description of the issue and why it needs attention.
  Provide enough context for someone else to understand the problem.

current_state: |
  What the current situation is. Be specific with examples.

desired_state: |
  What it should be after task completion. Clear success criteria.

action_required: |
  Specific steps to take:
  1. First step with specifics
  2. Second step with specifics
  3. Additional steps as needed

impact: |
  - What improves if this is done
  - What risks exist if not done
  - Who/what is affected

affected_files:
  - path/to/file1.md
  - path/to/file2.md
  - path/to/directory/

estimated_effort: [TRIVIAL|MINOR|MODERATE|MAJOR]

verification_criteria: |
  How to verify the task was completed correctly:
  - [ ] Check 1
  - [ ] Check 2
  - [ ] Check 3

notes: |
  Any additional context, considerations, or references.

related_tasks:
  - [Optional] Link to related tasks
```

## Persona Code Reference

- `JAN` - Janitor
- `CUR` - Curator
- `ARC` - Archivist
- `AUD` - Auditor
- `LIB` - Librarian
- `QI` - Quality Inspector

## Priority Guidelines

### CRITICAL
- Blocks project progress
- Data loss risk
- Causes confusion that could lead to errors
- Essential functionality broken

### HIGH
- Significantly impacts usability
- Important quality issues
- Notable inconsistencies
- Should be fixed within days

### MEDIUM
- Moderate improvements needed
- Noticeable but not blocking
- Should be addressed within weeks

### LOW
- Nice-to-have improvements
- Cosmetic issues
- Enhancements
- Can be done when convenient

## Effort Estimation

### TRIVIAL (< 5 minutes)
- Simple file rename
- Quick text fix
- Single link update

### MINOR (5-15 minutes)
- Move a few files
- Update multiple links
- Small content addition

### MODERATE (15-45 minutes)
- Reorganize a directory
- Substantial content edit
- Multiple related changes

### MAJOR (> 45 minutes)
- Large-scale reorganization
- Extensive content creation
- Complex multi-file changes

## Category Examples by Persona

### Janitor Categories
- `placement` - File in wrong location
- `redundancy` - Duplicate content
- `naming` - Naming convention issues
- `archive` - Archival needs
- `structure` - Directory structure issues

### Curator Categories
- `content-quality` - Depth, completeness issues
- `cross-reference` - Linking between docs
- `gap` - Missing content
- `flow` - Narrative issues
- `coherence` - Contradictions, inconsistencies
- `terminology` - Term usage problems

### Archivist Categories
- `structure` - Archive organization
- `versioning` - VERSION/CHANGELOG issues
- `context` - Historical context missing
- `migration` - Content needs archiving
- `legacy` - Historical doc improvements
- `integrity` - Reference issues

### Auditor Categories
- `completeness` - Missing required content
- `consistency` - Data mismatches
- `standards` - Compliance issues
- `validation` - Cross-doc problems
- `gap` - Coverage gaps
- `redundancy` - Unnecessary duplication

### Librarian Categories
- `index` - Index issues
- `links` - Link problems
- `navigation` - Navigation structure
- `discovery` - Discoverability issues
- `maps` - Documentation maps
- `orphans` - Unreachable content

### Quality Inspector Categories
- `formatting` - Markdown formatting
- `style` - Style guide adherence
- `readability` - Clarity issues
- `polish` - Grammar, typos
- `ux` - User experience problems

## File Naming Convention

`[PERSONA_CODE]-YYYY-MM-DD-###-brief-description.md`

**Examples:**
- `JAN-2025-10-26-001-move-stray-files.md`
- `CUR-2025-10-26-015-add-missing-cross-refs.md`
- `LIB-2025-10-27-003-fix-broken-links.md`

**Tips:**
- Keep description brief (3-5 words)
- Use hyphens, not spaces
- Use lowercase
- Be descriptive enough to identify at a glance

## Task Storage Locations

```
tasks/
├── queue/           # New tasks awaiting review
├── priority/        # High-priority tasks
├── in-progress/     # Currently being worked on
├── completed/       # Finished tasks
└── archived/        # Old or no-longer-relevant tasks
```

## Tips for Writing Good Tasks

1. **Be Specific**: "Fix navigation" is vague; "Add links from hub page to all implementation task directories" is specific

2. **One Task, One Focus**: Don't combine multiple unrelated issues

3. **Provide Context**: Explain WHY, not just WHAT

4. **Make It Actionable**: Reader should know exactly what to do

5. **Include Examples**: Show the problem with specific instances

6. **Clear Success Criteria**: No ambiguity about when it's done

7. **Estimate Realistically**: Better to overestimate than underestimate

8. **Link Related Tasks**: Help executor see the bigger picture

---

*Good tasks are the bridge between analysis and action.*
