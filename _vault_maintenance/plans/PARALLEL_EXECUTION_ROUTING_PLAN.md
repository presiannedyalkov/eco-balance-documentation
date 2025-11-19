# Parallel Execution Routing Plan
## 5 New Personas - Claude Code Web Agents

**Created**: 2025-11-09
**Purpose**: Enable parallel agent execution without merge conflicts
**Strategy**: File isolation + sequential merging
**Estimated Time**: 6-12 hours total (1.5-3 hours per agent in parallel)

---

## Overview

This plan enables **5 Claude Code agents to work simultaneously** on implementing the 5 new personas, with **zero merge conflicts** through careful file isolation.

### Key Principles:
1. **File Isolation**: Each agent creates only their own persona files
2. **Branch Naming**: Clear, consistent branch names
3. **Sequential Merging**: Merge in defined order to avoid conflicts
4. **Shared Updates Last**: Main README updated in final merge only

---

## Agent Routing Strategy

### Agent 1: Knowledge Synthesizer
**Branch**: `feature/persona-knowledge-synthesizer`
**Time Estimate**: 2-3 hours
**Files Created** (isolated, no conflicts):
- `_vault_maintenance/personas/knowledge_synthesizer.md`
- `_vault_maintenance/state/knowledge_synthesizer_state.md`
- `_vault_maintenance/workflows/bookmark_synthesis_workflow.md`
- `_vault_maintenance/research/` (new directory)
  - `_vault_maintenance/research/synthesis_reports/.gitkeep`
  - `_vault_maintenance/research/best_practices/.gitkeep`
  - `_vault_maintenance/research/knowledge_maps/.gitkeep`
- `_templates/research_synthesis_report.md`

**Files Modified**: NONE (to avoid conflicts)

---

### Agent 2: Security Auditor
**Branch**: `feature/persona-security-auditor`
**Time Estimate**: 1.5-2 hours
**Files Created** (isolated, no conflicts):
- `_vault_maintenance/personas/security_auditor.md`
- `_vault_maintenance/state/security_auditor_state.md`
- `_vault_maintenance/workflows/security_audit_workflow.md`
- `_vault_maintenance/security/` (new directory)
  - `_vault_maintenance/security/sensitive_data_patterns.md`
  - `_vault_maintenance/security/security_classification_guide.md`
  - `_vault_maintenance/security/audit_reports/.gitkeep`
- `_templates/security_audit_report.md`

**Files Modified**: NONE (to avoid conflicts)

---

### Agent 3: Implementation Coach
**Branch**: `feature/persona-implementation-coach`
**Time Estimate**: 2-3 hours
**Files Created** (isolated, no conflicts):
- `_vault_maintenance/personas/implementation_coach.md`
- `_vault_maintenance/state/implementation_coach_state.md`
- `_vault_maintenance/workflows/playbook_creation_workflow.md`
- `_vault_maintenance/playbooks/` (new directory)
  - `_vault_maintenance/playbooks/ggmbh_registration_playbook.md`
  - `_vault_maintenance/playbooks/bootstrap_funding_playbook.md`
  - `_vault_maintenance/playbooks/land_acquisition_playbook.md`
- `_templates/execution_playbook.md`
- `_templates/weekly_action_plan.md`
- `_templates/dependency_map.md`

**Files Modified**: NONE (to avoid conflicts)

---

### Agent 4: Strategic Advisor
**Branch**: `feature/persona-strategic-advisor`
**Time Estimate**: 1.5-2.5 hours
**Files Created** (isolated, no conflicts):
- `_vault_maintenance/personas/strategic_advisor.md`
- `_vault_maintenance/state/strategic_advisor_state.md`
- `_vault_maintenance/workflows/strategic_review_workflow.md`
- `_templates/strategic_challenge_report.md`
- `_templates/scenario_analysis.md`

**Files Modified**: NONE (to avoid conflicts)

---

### Agent 5: Stakeholder Advocate
**Branch**: `feature/persona-stakeholder-advocate`
**Time Estimate**: 2-3 hours
**Files Created** (isolated, no conflicts):
- `_vault_maintenance/personas/stakeholder_advocate.md`
- `_vault_maintenance/state/stakeholder_advocate_state.md`
- `_vault_maintenance/workflows/stakeholder_review_workflow.md`
- `_vault_maintenance/stakeholders/` (new directory)
  - `_vault_maintenance/stakeholders/stakeholder_personas.md`
  - `_vault_maintenance/stakeholders/empathy_maps/.gitkeep`
  - `_vault_maintenance/stakeholders/stakeholder_reviews/.gitkeep`
- `_templates/stakeholder_review_report.md`
- `_templates/empathy_map.md`

**Files Modified**: NONE (to avoid conflicts)

---

### Agent 6: System Integration (FINAL)
**Branch**: `feature/personas-system-integration`
**Time Estimate**: 1-2 hours
**Runs After**: All 5 persona agents merged to main

**Files Modified** (after all persona branches merged):
- `_vault_maintenance/README.md` (add 5 new personas to Personas section)
- `_vault_maintenance/PROMPT_REFERENCE.md` (add trigger commands for new personas)
- `_vault_maintenance/AI_ASSISTANT_GUIDE.md` (add execution guidance)

**Files Created**:
- `_vault_maintenance/PERSONA_INTERACTION_MATRIX.md` (11×11 grid showing interactions)
- `_vault_maintenance/NEW_PERSONAS_QUICKSTART.md` (how to use the 5 new personas)

**Purpose**: Update system documentation only after all personas exist

---

## Merge Strategy (Sequential, Conflict-Free)

### Step 1: Merge Persona Branches (any order, no conflicts)
```bash
# These can be merged in ANY order since files don't overlap
git checkout main
git merge feature/persona-knowledge-synthesizer
git push

git merge feature/persona-security-auditor
git push

git merge feature/persona-implementation-coach
git push

git merge feature/persona-strategic-advisor
git push

git merge feature/persona-stakeholder-advocate
git push
```

**Why No Conflicts**: Each branch creates different files, no overlaps

### Step 2: Merge System Integration (LAST)
```bash
# After all 5 personas merged
git merge feature/personas-system-integration
git push
```

**Why Last**: This branch modifies shared files (README.md, etc.) that reference all 5 personas

---

## Agent Prompts (Copy-Paste Ready)

### Prompt for Agent 1: Knowledge Synthesizer

```
You are implementing the Knowledge Synthesizer persona for the Eco Balance documentation vault.

**Your Task**: Create the Knowledge Synthesizer persona following the implementation plan.

**Reference Document**: Read `_vault_maintenance/NEW_PERSONAS_IMPLEMENTATION_PLAN.md` (sections on Knowledge Synthesizer)

**Branch**: Create and work on branch `feature/persona-knowledge-synthesizer`

**Files to Create**:
1. `_vault_maintenance/personas/knowledge_synthesizer.md`
   - Follow format of existing personas (see `_vault_maintenance/personas/curator.md` as template)
   - Include all sections from implementation plan: Identity, Core Responsibilities, Analysis Checklist, Task Generation Guidelines, Interaction with Other Personas, Health Scoring, Analysis Output Format, Best Practices, Common Patterns, Tools & References, Success Metrics, Special Techniques
   - Use the detailed specifications in NEW_PERSONAS_IMPLEMENTATION_PLAN.md

2. `_vault_maintenance/state/knowledge_synthesizer_state.md`
   - Create state tracking file (see existing state files for format)

3. `_vault_maintenance/workflows/bookmark_synthesis_workflow.md`
   - Document the bookmark analysis and synthesis workflow

4. `_vault_maintenance/research/` directory with subdirectories:
   - `synthesis_reports/` (with .gitkeep)
   - `best_practices/` (with .gitkeep)
   - `knowledge_maps/` (with .gitkeep)

5. `_templates/research_synthesis_report.md`
   - Create template for synthesis report output

**Important**:
- Do NOT modify `_vault_maintenance/README.md` or any existing files
- Create ONLY the files listed above
- Follow the existing persona definition format exactly
- Use the specifications from NEW_PERSONAS_IMPLEMENTATION_PLAN.md

**When Complete**:
- Commit all changes with message: "[Persona] Add Knowledge Synthesizer persona"
- Push branch `feature/persona-knowledge-synthesizer`
- Create merge request to main

**Time Estimate**: 2-3 hours
```

---

### Prompt for Agent 2: Security Auditor

```
You are implementing the Security Auditor persona for the Eco Balance documentation vault.

**Your Task**: Create the Security Auditor persona following the implementation plan.

**Reference Document**: Read `_vault_maintenance/NEW_PERSONAS_IMPLEMENTATION_PLAN.md` (sections on Security Auditor)

**Branch**: Create and work on branch `feature/persona-security-auditor`

**Files to Create**:
1. `_vault_maintenance/personas/security_auditor.md`
   - Follow format of existing personas (see `_vault_maintenance/personas/auditor.md` as template)
   - Include all sections from implementation plan
   - Use the detailed specifications in NEW_PERSONAS_IMPLEMENTATION_PLAN.md

2. `_vault_maintenance/state/security_auditor_state.md`
   - Create state tracking file

3. `_vault_maintenance/workflows/security_audit_workflow.md`
   - Document the security audit workflow

4. `_vault_maintenance/security/` directory with files:
   - `sensitive_data_patterns.md` (regex patterns for detecting emails, phones, addresses, etc.)
   - `security_classification_guide.md` (PUBLIC, INTERNAL, CONFIDENTIAL framework)
   - `audit_reports/` subdirectory (with .gitkeep)

5. `_templates/security_audit_report.md`
   - Create template for security audit output

**Important**:
- Do NOT modify `_vault_maintenance/README.md` or any existing files
- Create ONLY the files listed above
- Follow the existing persona definition format exactly
- Include the regex patterns specified in the implementation plan

**When Complete**:
- Commit all changes with message: "[Persona] Add Security Auditor persona"
- Push branch `feature/persona-security-auditor`
- Create merge request to main

**Time Estimate**: 1.5-2 hours
```

---

### Prompt for Agent 3: Implementation Coach

```
You are implementing the Implementation Coach persona for the Eco Balance documentation vault.

**Your Task**: Create the Implementation Coach persona following the implementation plan.

**Reference Document**: Read `_vault_maintenance/NEW_PERSONAS_IMPLEMENTATION_PLAN.md` (sections on Implementation Coach)

**Branch**: Create and work on branch `feature/persona-implementation-coach`

**Files to Create**:
1. `_vault_maintenance/personas/implementation_coach.md`
   - Follow format of existing personas (see `_vault_maintenance/personas/curator.md` as template)
   - Include all sections from implementation plan
   - Use the detailed specifications in NEW_PERSONAS_IMPLEMENTATION_PLAN.md

2. `_vault_maintenance/state/implementation_coach_state.md`
   - Create state tracking file

3. `_vault_maintenance/workflows/playbook_creation_workflow.md`
   - Document the playbook creation workflow

4. `_vault_maintenance/playbooks/` directory with sample playbooks:
   - `ggmbh_registration_playbook.md` (week-by-week breakdown for gGmbH registration)
   - `bootstrap_funding_playbook.md` (week-by-week for €20-30k funding acquisition)
   - `land_acquisition_playbook.md` (week-by-week for 1-hectare site acquisition)

5. `_templates/` files:
   - `execution_playbook.md` (playbook template)
   - `weekly_action_plan.md` (weekly action plan template)
   - `dependency_map.md` (dependency mapping template)

**Important**:
- Do NOT modify `_vault_maintenance/README.md` or any existing files
- Create ONLY the files listed above
- Follow the existing persona definition format exactly
- Create detailed, actionable playbooks (see implementation plan for structure)

**When Complete**:
- Commit all changes with message: "[Persona] Add Implementation Coach persona with 3 playbooks"
- Push branch `feature/persona-implementation-coach`
- Create merge request to main

**Time Estimate**: 2-3 hours
```

---

### Prompt for Agent 4: Strategic Advisor

```
You are implementing the Strategic Advisor persona for the Eco Balance documentation vault.

**Your Task**: Create the Strategic Advisor persona following the implementation plan.

**Reference Document**: Read `_vault_maintenance/NEW_PERSONAS_IMPLEMENTATION_PLAN.md` (sections on Strategic Advisor)

**Branch**: Create and work on branch `feature/persona-strategic-advisor`

**Files to Create**:
1. `_vault_maintenance/personas/strategic_advisor.md`
   - Follow format of existing personas (see `_vault_maintenance/personas/curator.md` as template)
   - Include all sections from implementation plan
   - Use the detailed specifications in NEW_PERSONAS_IMPLEMENTATION_PLAN.md
   - Include the "Tough Questions to Ask" from the implementation plan

2. `_vault_maintenance/state/strategic_advisor_state.md`
   - Create state tracking file

3. `_vault_maintenance/workflows/strategic_review_workflow.md`
   - Document the strategic review and challenge workflow

4. `_templates/` files:
   - `strategic_challenge_report.md` (template for strategic review output)
   - `scenario_analysis.md` (template for best/worst/realistic scenario analysis)

**Important**:
- Do NOT modify `_vault_maintenance/README.md` or any existing files
- Create ONLY the files listed above
- Follow the existing persona definition format exactly
- Include the tough questions from implementation plan (funding, timeline, team, land)

**When Complete**:
- Commit all changes with message: "[Persona] Add Strategic Advisor persona"
- Push branch `feature/persona-strategic-advisor`
- Create merge request to main

**Time Estimate**: 1.5-2.5 hours
```

---

### Prompt for Agent 5: Stakeholder Advocate

```
You are implementing the Stakeholder Advocate persona for the Eco Balance documentation vault.

**Your Task**: Create the Stakeholder Advocate persona following the implementation plan.

**Reference Document**: Read `_vault_maintenance/NEW_PERSONAS_IMPLEMENTATION_PLAN.md` (sections on Stakeholder Advocate)

**Branch**: Create and work on branch `feature/persona-stakeholder-advocate`

**Files to Create**:
1. `_vault_maintenance/personas/stakeholder_advocate.md`
   - Follow format of existing personas (see `_vault_maintenance/personas/curator.md` as template)
   - Include all sections from implementation plan
   - Use the detailed specifications in NEW_PERSONAS_IMPLEMENTATION_PLAN.md

2. `_vault_maintenance/state/stakeholder_advocate_state.md`
   - Create state tracking file

3. `_vault_maintenance/workflows/stakeholder_review_workflow.md`
   - Document the multi-perspective review workflow

4. `_vault_maintenance/stakeholders/` directory with:
   - `stakeholder_personas.md` (detailed profiles of 5 stakeholder types from implementation plan)
   - `empathy_maps/` subdirectory (with .gitkeep)
   - `stakeholder_reviews/` subdirectory (with .gitkeep)

5. `_templates/` files:
   - `stakeholder_review_report.md` (template for stakeholder review output)
   - `empathy_map.md` (template for empathy mapping)

**Important**:
- Do NOT modify `_vault_maintenance/README.md` or any existing files
- Create ONLY the files listed above
- Follow the existing persona definition format exactly
- Include all 5 stakeholder personas from plan: Impact Investor Isabel, Foundation Officer Frederik, Village Mayor Maria, Professor Paulo, Volunteer Viktor

**When Complete**:
- Commit all changes with message: "[Persona] Add Stakeholder Advocate persona with 5 stakeholder profiles"
- Push branch `feature/persona-stakeholder-advocate`
- Create merge request to main

**Time Estimate**: 2-3 hours
```

---

### Prompt for Agent 6: System Integration (RUN LAST)

```
You are integrating the 5 new personas into the vault maintenance system documentation.

**Your Task**: Update system documentation to include the new personas.

**Prerequisites**:
- ALL 5 persona branches must be merged to main first
- Verify these files exist before starting:
  - `_vault_maintenance/personas/knowledge_synthesizer.md`
  - `_vault_maintenance/personas/security_auditor.md`
  - `_vault_maintenance/personas/implementation_coach.md`
  - `_vault_maintenance/personas/strategic_advisor.md`
  - `_vault_maintenance/personas/stakeholder_advocate.md`

**Branch**: Create and work on branch `feature/personas-system-integration`

**Files to Modify**:
1. `_vault_maintenance/README.md`
   - Add 5 new personas to the "Personas" section (after existing 6)
   - Format:
     ```markdown
     ### 🔬 The Knowledge Synthesizer
     **Role**: Research Analysis & Knowledge Extraction
     **Focus**: Transform bookmarks into actionable insights
     **Trigger**: "Run the Knowledge Synthesizer" or "Synthesize research"

     ### 🔐 The Security Auditor
     **Role**: Information Security & Privacy Compliance
     **Focus**: Prevent sensitive data exposure, ensure compliance
     **Trigger**: "Run the Security Auditor" or "Security scan"

     [etc. for all 5]
     ```

2. `_vault_maintenance/PROMPT_REFERENCE.md`
   - Add trigger commands for 5 new personas
   - Follow existing format

3. `_vault_maintenance/AI_ASSISTANT_GUIDE.md`
   - Add execution guidance for new personas
   - Include when to use each persona

**Files to Create**:
4. `_vault_maintenance/PERSONA_INTERACTION_MATRIX.md`
   - Create 11×11 matrix showing how all personas interact
   - Include existing 6 + new 5 personas

5. `_vault_maintenance/NEW_PERSONAS_QUICKSTART.md`
   - Quick-start guide for using the 5 new personas
   - When to use each one
   - Example commands

**Important**:
- Only run this AFTER all 5 persona branches are merged
- This is the only agent that modifies existing system files
- Ensure consistency with existing documentation format

**When Complete**:
- Commit all changes with message: "[Integration] Add 5 new personas to system documentation"
- Push branch `feature/personas-system-integration`
- Create merge request to main

**Time Estimate**: 1-2 hours
```

---

## Execution Workflow

### Parallel Execution (Agents 1-5)

**Start Simultaneously** (5 agents in parallel):
1. Agent 1: Knowledge Synthesizer
2. Agent 2: Security Auditor
3. Agent 3: Implementation Coach
4. Agent 4: Strategic Advisor
5. Agent 5: Stakeholder Advocate

**Estimated Wall-Clock Time**: 2-3 hours (all 5 running in parallel)

**Merge Order** (any order, no conflicts):
```bash
git checkout main
git pull

# Merge in any order - no conflicts
git merge feature/persona-knowledge-synthesizer
git push

git merge feature/persona-security-auditor
git push

git merge feature/persona-implementation-coach
git push

git merge feature/persona-strategic-advisor
git push

git merge feature/persona-stakeholder-advocate
git push
```

### Sequential Execution (Agent 6)

**Start After All 5 Merged**:
6. Agent 6: System Integration

**Estimated Time**: 1-2 hours

**Final Merge**:
```bash
git checkout main
git pull
git merge feature/personas-system-integration
git push
```

---

## Conflict Prevention Checklist

### ✅ No Conflicts Because:

1. **File Isolation**: Each agent creates different files
   - Agent 1: `knowledge_synthesizer.md`, `research/` directory
   - Agent 2: `security_auditor.md`, `security/` directory
   - Agent 3: `implementation_coach.md`, `playbooks/` directory
   - Agent 4: `strategic_advisor.md`, scenario templates
   - Agent 5: `stakeholder_advocate.md`, `stakeholders/` directory

2. **No Shared File Edits**: Only Agent 6 (final) modifies existing files
   - README.md, PROMPT_REFERENCE.md, AI_ASSISTANT_GUIDE.md only touched by Agent 6

3. **Sequential Integration**: Agent 6 runs AFTER all personas merged
   - By then all persona files exist, no conflicts

4. **Clear Directory Structure**: New directories don't overlap
   - `research/` (Agent 1 only)
   - `security/` (Agent 2 only)
   - `playbooks/` (Agent 3 only)
   - `stakeholders/` (Agent 5 only)

---

## Quality Assurance

### Each Agent Should:
- [ ] Follow existing persona format exactly (use curator.md/auditor.md as templates)
- [ ] Include all required sections (Identity, Responsibilities, Checklist, etc.)
- [ ] Use consistent formatting (markdown, YAML task templates)
- [ ] Create complete, usable templates
- [ ] Add meaningful content (not just placeholders)
- [ ] Use specifications from NEW_PERSONAS_IMPLEMENTATION_PLAN.md

### Integration Agent (6) Should:
- [ ] Verify all 5 personas exist before starting
- [ ] Update all relevant system docs
- [ ] Create comprehensive interaction matrix
- [ ] Provide clear quick-start guide
- [ ] Maintain consistency with existing documentation style

---

## Verification After Completion

### Check File Count:
```bash
# Should have 11 persona files
ls _vault_maintenance/personas/*.md | wc -l  # Should be 11

# Should have new directories
ls -d _vault_maintenance/{research,security,playbooks,stakeholders}
```

### Check Branches Merged:
```bash
git branch -r | grep persona
# Should show all 6 branches merged
```

### Check System Docs Updated:
```bash
grep -c "Knowledge Synthesizer\|Security Auditor\|Implementation Coach\|Strategic Advisor\|Stakeholder Advocate" _vault_maintenance/README.md
# Should be 5+ matches
```

### Run Link Checker:
```bash
python3 _vault_maintenance/tools/check_wiki_links.py
# Verify new persona files have no broken links
```

---

## Troubleshooting

### If Merge Conflict Occurs:

**Most Likely Cause**: Agent modified a file they shouldn't have (README.md before Agent 6)

**Resolution**:
1. Check which file has conflict
2. If it's a shared file (README.md, etc.):
   - Discard changes from persona agent
   - Let Agent 6 (Integration) handle it
3. If it's a persona file:
   - Should never happen (different files per agent)
   - Check branch routing was followed correctly

### If Branch Not Ready to Merge:

**Check**:
- Did agent create all required files?
- Are files following correct format?
- Did agent accidentally modify shared files?

**Fix**:
- Re-run agent with corrected prompt
- Or manually fix issues before merging

---

## Success Metrics

**After All 6 Agents Complete**:
- [ ] 11 total persona files (6 existing + 5 new)
- [ ] 5 new state files
- [ ] 5 new workflow files
- [ ] 4 new directories (research, security, playbooks, stakeholders)
- [ ] 10+ new template files
- [ ] System documentation updated (README, PROMPT_REFERENCE, AI_ASSISTANT_GUIDE)
- [ ] Persona interaction matrix created
- [ ] Quick-start guide created
- [ ] No merge conflicts
- [ ] All branches merged to main
- [ ] Link checker passes (no broken internal links)

**Total Time**: 6-12 hours (3-5 hours wall-clock time with parallel execution)

---

## Summary: Conflict-Free Parallel Execution

**Why This Works**:
1. Each agent creates **different files** → No file conflicts
2. Shared files only touched by **Agent 6 (last)** → No race conditions
3. Clear **branch naming** → Easy to track and merge
4. **Sequential integration** → References exist before linking
5. Defined **merge order** → Predictable, safe merging

**Expected Outcome**:
- 5 agents work simultaneously
- Each completes in 1.5-3 hours
- Wall-clock time: 2-3 hours (parallel)
- Merging: 30 minutes total
- Integration agent: 1-2 hours
- **Total wall-clock time: 4-6 hours** (vs 18-30 hours sequential)

**Ready to Execute**: Copy-paste agent prompts above into Claude Code web interface, one agent per window!

---

## Next Steps

1. **Review this routing plan** - Ensure strategy makes sense
2. **Copy Agent 1-5 prompts** - Paste into 5 Claude Code web sessions
3. **Start all 5 agents** - Run in parallel
4. **Monitor progress** - Check branches being created
5. **Merge Agents 1-5** - Any order, as they complete
6. **Run Agent 6** - After all 5 merged
7. **Final verification** - Check file count, run link checker
8. **Celebrate** - 11 personas, conflict-free! 🎉

---

**Document Status**: Ready for Execution
**Conflict Risk**: Zero (with proper routing)
**Time Savings**: 70% (parallel vs sequential)
