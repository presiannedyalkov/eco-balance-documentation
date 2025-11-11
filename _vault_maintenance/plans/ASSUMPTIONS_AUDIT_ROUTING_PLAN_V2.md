# Assumptions Audit - Parallel Execution Routing Plan V2
## INCREMENTAL OUTPUT - Prevents Hanging

**Created**: 2025-11-09
**Version**: 2.0 (Fixed: Incremental file creation)
**Purpose**: Systematic assumptions audit with smaller, manageable outputs
**Strategy**: Multiple small files per agent instead of one large file

---

## CRITICAL CHANGE FROM V1:

**Problem**: Agents trying to write 10,000+ line files in one operation → hanging
**Solution**: Each agent creates **one file per document analyzed** (4-6 small files instead of 1 large file)

---

## Agent Routing Strategy (UPDATED)

### Agent 1: Vision & Status
**Branch**: `feature/assumptions-audit-vision-status`

**Files to Analyze & Create** (one output file per analyzed file):
1. Analyze `01_Executive_Summary.md` → Create `_vault_maintenance/assumptions_audit/agent_01/FILE_01_EXECUTIVE_SUMMARY.md`
2. Analyze `02_Project_Vision.md` → Create `_vault_maintenance/assumptions_audit/agent_01/FILE_02_PROJECT_VISION.md`
3. Analyze `03_Success_Factors.md` → Create `_vault_maintenance/assumptions_audit/agent_01/FILE_03_SUCCESS_FACTORS.md`
4. Analyze `04_Current_Status_Assessment.md` → Create `_vault_maintenance/assumptions_audit/agent_01/FILE_04_CURRENT_STATUS.md`
5. Create summary → `_vault_maintenance/assumptions_audit/agent_01/SUMMARY.md`

**Token per file**: ~2,000-4,000 (manageable)

---

### Agent 2: Organization & Legal
**Branch**: `feature/assumptions-audit-organization`

**Files to Analyze & Create**:
1. Analyze `10_Organizational_Structure.md` → Create `_vault_maintenance/assumptions_audit/agent_02/FILE_10_ORGANIZATIONAL_STRUCTURE.md`
2. Analyze `11_Governance.md` → Create `_vault_maintenance/assumptions_audit/agent_02/FILE_11_GOVERNANCE.md`
3. Analyze `12_Team_Roles.md` → Create `_vault_maintenance/assumptions_audit/agent_02/FILE_12_TEAM_ROLES.md`
4. Analyze `13_Legal_Framework.md` → Create `_vault_maintenance/assumptions_audit/agent_02/FILE_13_LEGAL_FRAMEWORK.md`
5. Create summary → `_vault_maintenance/assumptions_audit/agent_02/SUMMARY.md`

---

### Agent 3: Methodology & Technology
**Branch**: `feature/assumptions-audit-methodology`

**Files to Analyze & Create**:
1. Analyze `20_Restoration_Methodology.md` → Create `_vault_maintenance/assumptions_audit/agent_03/FILE_20_RESTORATION_METHODOLOGY.md`
2. Analyze `21_Technology_Integration.md` → Create `_vault_maintenance/assumptions_audit/agent_03/FILE_21_TECHNOLOGY_INTEGRATION.md`
3. Create summary → `_vault_maintenance/assumptions_audit/agent_03/SUMMARY.md`

---

### Agent 4: Financial & Funding
**Branch**: `feature/assumptions-audit-financial`

**Files to Analyze & Create**:
1. Analyze `30_Business_Model.md` → Create `_vault_maintenance/assumptions_audit/agent_04/FILE_30_BUSINESS_MODEL.md`
2. Analyze `32_Funding_Strategy.md` → Create `_vault_maintenance/assumptions_audit/agent_04/FILE_32_FUNDING_STRATEGY.md`
3. Create summary → `_vault_maintenance/assumptions_audit/agent_04/SUMMARY.md`

---

### Agent 5: Implementation & Roadmap
**Branch**: `feature/assumptions-audit-implementation`

**Files to Analyze & Create**:
1. Analyze `40_Expansion_Growth_Strategy.md` → Create `_vault_maintenance/assumptions_audit/agent_05/FILE_40_EXPANSION_GROWTH_STRATEGY.md`
2. Analyze `42_Next_Steps_90_Days.md` → Create `_vault_maintenance/assumptions_audit/agent_05/FILE_42_NEXT_STEPS_90_DAYS.md`
3. Analyze `43_Operations_Action_Plan.md` → Create `_vault_maintenance/assumptions_audit/agent_05/FILE_43_OPERATIONS_ACTION_PLAN.md`
4. Analyze `44_Site_Selection_Land_Acquisition.md` → Create `_vault_maintenance/assumptions_audit/agent_05/FILE_44_SITE_SELECTION_LAND_ACQUISITION.md`
5. Create summary → `_vault_maintenance/assumptions_audit/agent_05/SUMMARY.md`

---

### Agent 6: Assessment & Communications
**Branch**: `feature/assumptions-audit-assessment`

**Files to Analyze & Create**:
1. Analyze `50_Risk_Assessment.md` → Create `_vault_maintenance/assumptions_audit/agent_06/FILE_50_RISK_ASSESSMENT.md`
2. Analyze `51_Key_Performance_Indicators.md` → Create `_vault_maintenance/assumptions_audit/agent_06/FILE_51_KEY_PERFORMANCE_INDICATORS.md`
3. Analyze `60_Marketing_Communications_Strategy.md` → Create `_vault_maintenance/assumptions_audit/agent_06/FILE_60_MARKETING_COMMUNICATIONS_STRATEGY.md`
4. Create summary → `_vault_maintenance/assumptions_audit/agent_06/SUMMARY.md`

---

### Agent 7: Consolidation (RUNS LAST)
**Branch**: `feature/assumptions-audit-consolidation`

**Tasks** (smaller outputs):
1. Read all agent summaries
2. Create `_vault_maintenance/assumptions_audit/CRITICAL_QUESTIONS.md` (top 20 questions only)
3. Create `_vault_maintenance/assumptions_audit/TOP_20_ASSUMPTIONS.md` (most critical ones)
4. Create `_vault_maintenance/assumptions_audit/CONTRADICTIONS_FOUND.md` (cross-file issues)

---

## Simplified Output Format (Per File Analysis)

**Maximum length**: 500 lines per file

**Template for each file analysis**:

```markdown
# Assumptions Analysis: [File Name]

**Analyzed**: [File name]
**Agent**: Agent X
**Date**: 2025-11-09

---

## Summary

[2-3 sentences: What assumptions found, priority level]

---

## Assumptions Found

### Assumption 1: [Brief Title]

**Quote**: "[Exact text from file]"
**Location**: Line X or Section Y
**Type**: Legal / Geographic / Financial / Team / Timeline / Technical

**The Assumption**: [State clearly in one sentence]

**Why This Exists**: [One sentence]

**Alternatives**:
- **Current**: [Brief]
- **Option B**: [Brief alternative]
- **Option C**: [Brief alternative if relevant]

**Critical Questions**:
1. [Question 1]
2. [Question 2]

**Priority**: CRITICAL / HIGH / MEDIUM / LOW
**Uncertainty**: HIGH / MEDIUM / LOW

---

### Assumption 2: [Brief Title]

[Repeat format - KEEP IT BRIEF]

---

[Continue for 5-10 assumptions per file, MAX]

---

## Statistics

- Assumptions found: X
- Critical: X
- High: X
- Medium: X
- Low: X
```

**KEY**: Keep each assumption to ~10-15 lines maximum. Don't write essays.

---

## Updated Agent Prompts (Shorter, Incremental)

### Prompt for Agent 1: Vision & Status

```
You are Agent 1 conducting assumptions audit for Vision & Status documents.

**IMPORTANT**: Create SMALL files, one per document analyzed. Do NOT try to write one huge file.

**Branch**: `feature/assumptions-audit-vision-status`

**Your Task**: Analyze 4 files, create 5 small output files (one per analyzed file + summary)

**Process** (ONE FILE AT A TIME):

**Step 1**: Analyze `01_Executive_Summary.md`
- Identify 5-10 key assumptions (not everything, just important ones)
- Create `_vault_maintenance/assumptions_audit/agent_01/FILE_01_EXECUTIVE_SUMMARY.md`
- Use template from ASSUMPTIONS_AUDIT_ROUTING_PLAN_V2.md
- Keep brief: ~200-400 lines MAX

**Step 2**: Analyze `02_Project_Vision.md`
- Identify 5-10 key assumptions
- Create `_vault_maintenance/assumptions_audit/agent_01/FILE_02_PROJECT_VISION.md`
- Keep brief: ~200-400 lines MAX

**Step 3**: Analyze `03_Success_Factors.md`
- Identify 5-10 key assumptions
- Create `_vault_maintenance/assumptions_audit/agent_01/FILE_03_SUCCESS_FACTORS.md`
- Keep brief: ~200-400 lines MAX

**Step 4**: Analyze `04_Current_Status_Assessment.md`
- Identify 5-10 key assumptions
- Create `_vault_maintenance/assumptions_audit/agent_01/FILE_04_CURRENT_STATUS.md`
- Keep brief: ~200-400 lines MAX

**Step 5**: Create summary
- Create `_vault_maintenance/assumptions_audit/agent_01/SUMMARY.md`
- List: Total assumptions found, top 5 critical ones, key questions
- Keep brief: ~100-200 lines MAX

**Focus on QUALITY over QUANTITY**: 5-10 important assumptions per file is better than 50 minor ones.

**What to look for**:
- Geographic assumptions (where operations? where founders?)
- Timeline assumptions (durations realistic?)
- Team assumptions (1-2 founders sufficient?)
- Budget assumptions (€20-30k available?)

**When Complete**:
- Commit: "[Assumptions Audit] Agent 1 - Vision & Status (5 files)"
- Push branch
- Create merge request

**Time**: 1 hour
```

---

### Prompt for Agent 2: Organization & Legal

```
You are Agent 2 conducting assumptions audit for Organization & Legal documents.

**IMPORTANT**: Create SMALL files, one per document analyzed. Do NOT try to write one huge file.

**Branch**: `feature/assumptions-audit-organization`

**Your Task**: Analyze 4 files, create 5 small output files

**Process** (ONE FILE AT A TIME):

**Step 1**: Analyze `10_Organizational_Structure.md`
- **CRITICAL**: Investigate gGmbH vs e.V. assumption
- **CRITICAL**: Investigate Germany vs Portugal location
- Identify 5-10 key assumptions
- Create `_vault_maintenance/assumptions_audit/agent_02/FILE_10_ORGANIZATIONAL_STRUCTURE.md`
- Keep brief: ~200-400 lines MAX

**Step 2**: Analyze `11_Governance.md`
- Identify 5-10 key assumptions
- Create `_vault_maintenance/assumptions_audit/agent_02/FILE_11_GOVERNANCE.md`
- Keep brief: ~200-400 lines MAX

**Step 3**: Analyze `12_Team_Roles.md`
- Identify 5-10 key assumptions
- Create `_vault_maintenance/assumptions_audit/agent_02/FILE_12_TEAM_ROLES.md`
- Keep brief: ~200-400 lines MAX

**Step 4**: Analyze `13_Legal_Framework.md`
- Identify 5-10 key assumptions
- Create `_vault_maintenance/assumptions_audit/agent_02/FILE_13_LEGAL_FRAMEWORK.md`
- Keep brief: ~200-400 lines MAX

**Step 5**: Create summary
- Create `_vault_maintenance/assumptions_audit/agent_02/SUMMARY.md`
- **MUST INCLUDE**: gGmbH vs e.V. question, Germany vs Portugal question
- Keep brief: ~100-200 lines MAX

**Critical Questions to Ask User**:
1. gGmbH (€25k capital + €15k setup = €40k) vs e.V. (€500)?
2. Germany registration vs Portugal registration?
3. Do you have €40k before operations start?
4. Where do you live now? Where during Year 1?

**When Complete**:
- Commit: "[Assumptions Audit] Agent 2 - Organization & Legal (5 files)"
- Push branch
- Create merge request

**Time**: 1 hour
```

---

### Prompt for Agent 3: Methodology & Technology

```
You are Agent 3 conducting assumptions audit for Methodology & Technology documents.

**IMPORTANT**: Create SMALL files, one per document analyzed.

**Branch**: `feature/assumptions-audit-methodology`

**Your Task**: Analyze 2 files, create 3 small output files

**Process** (ONE FILE AT A TIME):

**Step 1**: Analyze `20_Restoration_Methodology.md`
- Identify 5-10 key assumptions
- Create `_vault_maintenance/assumptions_audit/agent_03/FILE_20_RESTORATION_METHODOLOGY.md`
- Keep brief: ~200-400 lines MAX

**Step 2**: Analyze `21_Technology_Integration.md`
- Identify 5-10 key assumptions (solar viability, water generation, etc.)
- Create `_vault_maintenance/assumptions_audit/agent_03/FILE_21_TECHNOLOGY_INTEGRATION.md`
- Keep brief: ~200-400 lines MAX

**Step 3**: Create summary
- Create `_vault_maintenance/assumptions_audit/agent_03/SUMMARY.md`
- Keep brief: ~100-200 lines MAX

**Focus**:
- Technology viability (proven or assumed?)
- Methodology effectiveness (evidence-based?)
- Scaling assumptions (1ha → 10ha realistic?)

**When Complete**:
- Commit: "[Assumptions Audit] Agent 3 - Methodology & Technology (3 files)"
- Push branch
- Create merge request

**Time**: 45 minutes
```

---

### Prompt for Agent 4: Financial & Funding

```
You are Agent 4 conducting assumptions audit for Financial & Funding documents.

**IMPORTANT**: Create SMALL files, one per document analyzed.

**Branch**: `feature/assumptions-audit-financial`

**Your Task**: Analyze 2 files, create 3 small output files

**Process** (ONE FILE AT A TIME):

**Step 1**: Analyze `30_Business_Model.md`
- **CRITICAL**: Where does €20-30k come from?
- Identify 5-10 key assumptions
- Create `_vault_maintenance/assumptions_audit/agent_04/FILE_30_BUSINESS_MODEL.md`
- Keep brief: ~200-400 lines MAX

**Step 2**: Analyze `32_Funding_Strategy.md`
- **CRITICAL**: Funding timeline realistic?
- Identify 5-10 key assumptions
- Create `_vault_maintenance/assumptions_audit/agent_04/FILE_32_FUNDING_STRATEGY.md`
- Keep brief: ~200-400 lines MAX

**Step 3**: Create summary
- Create `_vault_maintenance/assumptions_audit/agent_04/SUMMARY.md`
- **MUST INCLUDE**: Budget availability question, funding source question
- Keep brief: ~100-200 lines MAX

**Critical Questions**:
1. Where does €20-30k Bootstrap budget come from?
2. Is 6-month funding timeline realistic?
3. Are friends/family capacity assumptions validated?

**When Complete**:
- Commit: "[Assumptions Audit] Agent 4 - Financial & Funding (3 files)"
- Push branch
- Create merge request

**Time**: 45 minutes
```

---

### Prompt for Agent 5: Implementation & Roadmap

```
You are Agent 5 conducting assumptions audit for Implementation & Roadmap documents.

**IMPORTANT**: Create SMALL files, one per document analyzed.

**Branch**: `feature/assumptions-audit-implementation`

**Your Task**: Analyze 4 files, create 5 small output files

**Process** (ONE FILE AT A TIME):

**Step 1**: Analyze `40_Expansion_Growth_Strategy.md`
- Identify 5-10 key assumptions
- Create `_vault_maintenance/assumptions_audit/agent_05/FILE_40_EXPANSION_GROWTH_STRATEGY.md`
- Keep brief: ~200-400 lines MAX

**Step 2**: Analyze `42_Next_Steps_90_Days.md`
- Identify 5-10 key assumptions (timeline realistic?)
- Create `_vault_maintenance/assumptions_audit/agent_05/FILE_42_NEXT_STEPS_90_DAYS.md`
- Keep brief: ~200-400 lines MAX

**Step 3**: Analyze `43_Operations_Action_Plan.md`
- Identify 5-10 key assumptions
- Create `_vault_maintenance/assumptions_audit/agent_05/FILE_43_OPERATIONS_ACTION_PLAN.md`
- Keep brief: ~200-400 lines MAX

**Step 4**: Analyze `44_Site_Selection_Land_Acquisition.md`
- Identify 5-10 key assumptions (land availability, pricing)
- Create `_vault_maintenance/assumptions_audit/agent_05/FILE_44_SITE_SELECTION_LAND_ACQUISITION.md`
- Keep brief: ~200-400 lines MAX

**Step 5**: Create summary
- Create `_vault_maintenance/assumptions_audit/agent_05/SUMMARY.md`
- Keep brief: ~100-200 lines MAX

**Focus**:
- Timeline realism (buffers included?)
- Land availability assumptions
- 1-2 person team sufficiency

**When Complete**:
- Commit: "[Assumptions Audit] Agent 5 - Implementation & Roadmap (5 files)"
- Push branch
- Create merge request

**Time**: 1 hour
```

---

### Prompt for Agent 6: Assessment & Communications

```
You are Agent 6 conducting assumptions audit for Assessment & Communications documents.

**IMPORTANT**: Create SMALL files, one per document analyzed.

**Branch**: `feature/assumptions-audit-assessment`

**Your Task**: Analyze 3 files, create 4 small output files

**Process** (ONE FILE AT A TIME):

**Step 1**: Analyze `50_Risk_Assessment.md`
- Identify 5-10 key assumptions (risk probabilities validated?)
- Create `_vault_maintenance/assumptions_audit/agent_06/FILE_50_RISK_ASSESSMENT.md`
- Keep brief: ~200-400 lines MAX

**Step 2**: Analyze `51_Key_Performance_Indicators.md`
- Identify 5-10 key assumptions (KPIs achievable?)
- Create `_vault_maintenance/assumptions_audit/agent_06/FILE_51_KEY_PERFORMANCE_INDICATORS.md`
- Keep brief: ~200-400 lines MAX

**Step 3**: Analyze `60_Marketing_Communications_Strategy.md`
- Identify 5-10 key assumptions (stakeholder engagement realistic?)
- Create `_vault_maintenance/assumptions_audit/agent_06/FILE_60_MARKETING_COMMUNICATIONS_STRATEGY.md`
- Keep brief: ~200-400 lines MAX

**Step 4**: Create summary
- Create `_vault_maintenance/assumptions_audit/agent_06/SUMMARY.md`
- Keep brief: ~100-200 lines MAX

**When Complete**:
- Commit: "[Assumptions Audit] Agent 6 - Assessment & Communications (4 files)"
- Push branch
- Create merge request

**Time**: 45 minutes
```

---

### Prompt for Agent 7: Consolidation (SIMPLIFIED)

```
You are Agent 7 creating final consolidation (SIMPLIFIED VERSION).

**Branch**: `feature/assumptions-audit-consolidation`

**Prerequisites**: All 6 agent branches merged to main

**Your Task**: Read agent summaries and create 3 SHORT consolidated files

**Process**:

**Step 1**: Read all 6 SUMMARY.md files from agents
- `_vault_maintenance/assumptions_audit/agent_01/SUMMARY.md`
- `_vault_maintenance/assumptions_audit/agent_02/SUMMARY.md`
- `_vault_maintenance/assumptions_audit/agent_03/SUMMARY.md`
- `_vault_maintenance/assumptions_audit/agent_04/SUMMARY.md`
- `_vault_maintenance/assumptions_audit/agent_05/SUMMARY.md`
- `_vault_maintenance/assumptions_audit/agent_06/SUMMARY.md`

**Step 2**: Create `CRITICAL_QUESTIONS.md`
- Extract top 20 questions across all agents
- Prioritize: CRITICAL first
- Format for user to answer easily
- Keep brief: ~300-500 lines MAX

**Step 3**: Create `TOP_20_ASSUMPTIONS.md`
- List 20 most critical/uncertain assumptions
- Include source file and question
- Keep brief: ~200-300 lines MAX

**Step 4**: Create `CONTRADICTIONS_FOUND.md`
- List cross-file contradictions (e.g., gGmbH Germany vs Portugal operations)
- Keep brief: ~200-300 lines MAX

**When Complete**:
- Commit: "[Assumptions Audit] Consolidation - 3 final outputs"
- Push branch
- Create merge request

**Time**: 45 minutes
```

---

## One-Line Prompts (UPDATED)

**Agents 1-6**:
```
You are Agent N conducting assumptions audit. Execute task from _vault_maintenance/ASSUMPTIONS_AUDIT_ROUTING_PLAN_V2.md (search for "Agent N:"). Create SMALL files one at a time, commit, and push branch.
```

**Agent 7**:
```
You are Agent 7 for consolidation. Execute task from _vault_maintenance/ASSUMPTIONS_AUDIT_ROUTING_PLAN_V2.md (search for "Agent 7:"). Read summaries, create 3 SHORT consolidated files, commit, and push branch.
```

---

## Success Metrics

**Per Agent**:
- [ ] 2-5 small analysis files created (one per document)
- [ ] 1 summary file created
- [ ] Each file under 500 lines
- [ ] Total 5-10 key assumptions per analyzed document
- [ ] No hanging or timeout issues

**Overall**:
- [ ] 24 analysis files from 6 agents
- [ ] 6 summary files
- [ ] 3 consolidated files from Agent 7
- [ ] Top 20 critical questions extracted
- [ ] Zero merge conflicts

---

**Document Status**: V2 - Fixed for incremental output
**Issue Resolved**: Agents no longer try to write huge files
**Expected Success Rate**: 100%
