# Assumptions Audit - Parallel Execution Routing Plan V3
## MAXIMUM PARALLELIZATION - 15 Agents

**Created**: 2025-11-09
**Version**: 3.0 (Optimized: 1-2 files per agent)
**Purpose**: Maximum speed with minimal agent workload
**Strategy**: 15 lightweight agents instead of 6 heavy agents

---

## KEY IMPROVEMENT FROM V2:

**V2**: 6 agents, each analyzing 2-5 files (still somewhat heavy)
**V3**: **14 analysis agents** (each analyzing just 1-2 files) + **1 consolidation agent** = **15 total**

**Benefits**:
- ✅ Each agent completes in 15-30 minutes (vs 1-2 hours)
- ✅ Maximum parallelization (run all 14 simultaneously)
- ✅ Minimal token usage per agent (5,000-10,000 tokens)
- ✅ Zero risk of hanging (very small outputs)
- ✅ Faster overall completion (30-45 min wall-clock vs 2-3 hours)

---

## Agent Distribution (14 Analysis Agents)

### GROUP A: Strategic Vision (4 agents)

**Agent 1**: File 01 (Executive Summary)
**Agent 2**: File 02 (Project Vision)
**Agent 3**: File 03 (Success Factors)
**Agent 4**: File 04 (Current Status Assessment)

### GROUP B: Organization & Legal (4 agents)

**Agent 5**: File 10 (Organizational Structure) - **CRITICAL: gGmbH vs e.V.**
**Agent 6**: File 11 (Governance)
**Agent 7**: File 12 (Team Roles)
**Agent 8**: File 13 (Legal Framework)

### GROUP C: Methodology & Tech (2 agents)

**Agent 9**: File 20 (Restoration Methodology)
**Agent 10**: File 21 (Technology Integration)

### GROUP D: Financial (2 agents)

**Agent 11**: File 30 (Business Model) - **CRITICAL: Budget source**
**Agent 12**: File 32 (Funding Strategy)

### GROUP E: Implementation (3 agents)

**Agent 13**: File 40 (Expansion Growth Strategy)
**Agent 14**: Files 42 + 43 (Next Steps 90 Days + Operations)
**Agent 15**: File 44 (Site Selection)

### GROUP F: Assessment (3 agents)

**Agent 16**: File 50 (Risk Assessment)
**Agent 17**: File 51 (KPIs)
**Agent 18**: File 60 (Marketing Communications)

### FINAL: Consolidation (1 agent)

**Agent 19**: Consolidation (reads all 18 outputs, creates final summary)

---

## Standard Agent Template (For Agents 1-18)

### Output Structure

Each agent creates **ONE small file**:
- `_vault_maintenance/assumptions_audit/FILE_[XX]_[NAME].md`

**Maximum length**: 300 lines
**Focus**: 5-10 most important assumptions only

### Template Format

```markdown
# Assumptions Analysis: [File Name]

**File Analyzed**: [XX_File_Name.md]
**Agent**: Agent [N]
**Date**: 2025-11-09
**Category**: [Strategic/Organizational/Financial/etc.]

---

## Executive Summary

[2-3 sentences: Key assumptions found, priority level, critical questions]

---

## Critical Assumptions (Priority: CRITICAL)

### 1. [Assumption Title]
**Quote**: "[Exact text]"
**Location**: Section X or Line Y
**Type**: Legal/Geographic/Financial/Team/Timeline/Technical/Community

**Assumption**: [State in one clear sentence]

**Alternatives**:
- Current: [Brief - one line]
- Option B: [Brief alternative - one line]
- Option C: [Another alternative if relevant - one line]

**Critical Question**: [One key question for user]

**Impact if Wrong**: [One sentence]
**Uncertainty**: HIGH/MEDIUM/LOW

---

### 2. [Next Critical Assumption]
[Repeat format - keep each to 10-12 lines]

---

## High Priority Assumptions (Priority: HIGH)

[Same format, but briefer - 5-8 lines each]

---

## Medium Priority Assumptions (Priority: MEDIUM)

[List only - no need for full detail]
- Assumption: [Brief statement]
- Question: [Brief question]

---

## Summary Stats

- Total assumptions: X
- Critical: X
- High: X
- Medium: X
- Low: X

---

## Top 3 Questions for User

1. [Most critical question]
2. [Second most critical]
3. [Third most critical]
```

**KEY**: Keep it SHORT and FOCUSED. Quality over quantity.

---

## Agent-Specific Prompts (Copy-Paste Ready)

### Agent 1: File 01 (Executive Summary)

```
Agent 1: Analyze strategic/01_Executive_Summary.md for assumptions.

**Branch**: `feature/assumptions-file-01`

**Task**:
1. Read strategic/01_Executive_Summary.md
2. Identify 5-10 key assumptions
3. Create _vault_maintenance/assumptions_audit/FILE_01_EXECUTIVE_SUMMARY.md
4. Use template from ASSUMPTIONS_AUDIT_ROUTING_PLAN_V3.md
5. Keep under 300 lines

**Focus**:
- Strategic vision assumptions
- 3-phase growth assumptions (1ha→5-10ha→50+ha)
- €20-30k Bootstrap budget assumption
- Team size assumptions (1-2 founders)

**When done**: Commit "[Assumptions] File 01 analysis", push branch, create MR

**Time**: 20-30 minutes
```

---

### Agent 2: File 02 (Project Vision)

```
Agent 2: Analyze 02_Project_Vision.md for assumptions.

**Branch**: `feature/assumptions-file-02`

**Task**:
1. Read 02_Project_Vision.md
2. Identify 5-10 key assumptions
3. Create _vault_maintenance/assumptions_audit/FILE_02_PROJECT_VISION.md
4. Keep under 300 lines

**Focus**:
- Geographic assumptions (Southern Europe - but WHERE exactly?)
- Target countries (Portugal? Spain? Both?)
- Climate suitability assumptions
- Urgency assumptions (critical decade - is this validated?)

**When done**: Commit "[Assumptions] File 02 analysis", push branch, create MR

**Time**: 20-30 minutes
```

---

### Agent 3: File 03 (Success Factors)

```
Agent 3: Analyze 03_Success_Factors.md for assumptions.

**Branch**: `feature/assumptions-file-03`

**Task**:
1. Read 03_Success_Factors.md
2. Identify 5-10 key assumptions
3. Create _vault_maintenance/assumptions_audit/FILE_03_SUCCESS_FACTORS.md
4. Keep under 300 lines

**Focus**:
- Success factor assumptions (are these proven or assumed?)
- Community partnership assumptions
- Scientific foundation assumptions
- Scalability assumptions

**When done**: Commit "[Assumptions] File 03 analysis", push branch, create MR

**Time**: 20-30 minutes
```

---

### Agent 4: File 04 (Current Status)

```
Agent 4: Analyze 04_Current_Status_Assessment.md for assumptions.

**Branch**: `feature/assumptions-file-04`

**Task**:
1. Read 04_Current_Status_Assessment.md
2. Identify 5-10 key assumptions
3. Create _vault_maintenance/assumptions_audit/FILE_04_CURRENT_STATUS.md
4. Keep under 300 lines

**Focus**:
- Maturity level assessment (is "pre-seed" accurate?)
- Timeline assumptions (9-18 months to operations)
- Gap analysis (are these the right gaps?)
- Readiness assessment

**When done**: Commit "[Assumptions] File 04 analysis", push branch, create MR

**Time**: 20-30 minutes
```

---

### Agent 5: File 10 (Organizational Structure) ⚠️ CRITICAL

```
Agent 5: Analyze 10_Organizational_Structure.md for assumptions.

**Branch**: `feature/assumptions-file-10`

**Task**:
1. Read 10_Organizational_Structure.md
2. Identify 5-10 key assumptions
3. Create _vault_maintenance/assumptions_audit/FILE_10_ORGANIZATIONAL_STRUCTURE.md
4. Keep under 300 lines

**CRITICAL FOCUS**:
- **gGmbH vs e.V. decision** (€25k capital + €15k setup vs €500)
- **Germany vs Portugal** registration location
- Bootstrap strategy (informal Year 1 → formal Year 2)
- Share capital availability assumption

**Top Questions**:
1. Do you have €40k (€25k capital + €15k setup) available?
2. Where do you live now? Germany or Portugal?
3. Why gGmbH instead of e.V.?
4. Why Germany instead of Portugal (where operations are)?

**When done**: Commit "[Assumptions] File 10 analysis - CRITICAL", push branch, create MR

**Time**: 30-40 minutes (this is critical)
```

---

### Agent 6: File 11 (Governance)

```
Agent 6: Analyze 11_Governance.md for assumptions.

**Branch**: `feature/assumptions-file-11`

**Task**:
1. Read 11_Governance.md
2. Identify 5-10 key assumptions
3. Create _vault_maintenance/assumptions_audit/FILE_11_GOVERNANCE.md
4. Keep under 300 lines

**Focus**:
- Board composition assumptions
- Decision-making process assumptions
- Stakeholder representation assumptions
- Governance timeline assumptions

**When done**: Commit "[Assumptions] File 11 analysis", push branch, create MR

**Time**: 20-30 minutes
```

---

### Agent 7: File 12 (Team Roles)

```
Agent 7: Analyze 12_Team_Roles.md for assumptions.

**Branch**: `feature/assumptions-file-12`

**Task**:
1. Read 12_Team_Roles.md
2. Identify 5-10 key assumptions
3. Create _vault_maintenance/assumptions_audit/FILE_12_TEAM_ROLES.md
4. Keep under 300 lines

**Focus**:
- Team size assumptions (1-2 founders sufficient for Year 1?)
- Expertise assumptions (what skills exist vs needed?)
- Hiring timeline assumptions
- Salary/compensation assumptions

**When done**: Commit "[Assumptions] File 12 analysis", push branch, create MR

**Time**: 20-30 minutes
```

---

### Agent 8: File 13 (Legal Framework)

```
Agent 8: Analyze 13_Legal_Framework.md for assumptions.

**Branch**: `feature/assumptions-file-13`

**Task**:
1. Read 13_Legal_Framework.md
2. Identify 5-10 key assumptions
3. Create _vault_maintenance/assumptions_audit/FILE_13_LEGAL_FRAMEWORK.md
4. Keep under 300 lines

**Focus**:
- Legal process timeline assumptions
- Compliance requirements assumptions
- Registration process assumptions

**When done**: Commit "[Assumptions] File 13 analysis", push branch, create MR

**Time**: 20-30 minutes
```

---

### Agent 9: File 20 (Restoration Methodology)

```
Agent 9: Analyze 20_Restoration_Methodology.md for assumptions.

**Branch**: `feature/assumptions-file-20`

**Task**:
1. Read 20_Restoration_Methodology.md
2. Identify 5-10 key assumptions
3. Create _vault_maintenance/assumptions_audit/FILE_20_RESTORATION_METHODOLOGY.md
4. Keep under 300 lines

**Focus**:
- Methodology effectiveness (proven or assumed?)
- Native species selection assumptions
- Timeline to results assumptions
- Climate/geography suitability assumptions

**When done**: Commit "[Assumptions] File 20 analysis", push branch, create MR

**Time**: 20-30 minutes
```

---

### Agent 10: File 21 (Technology Integration)

```
Agent 10: Analyze 21_Technology_Integration.md for assumptions.

**Branch**: `feature/assumptions-file-21`

**Task**:
1. Read 21_Technology_Integration.md
2. Identify 5-10 key assumptions
3. Create _vault_maintenance/assumptions_audit/FILE_21_TECHNOLOGY_INTEGRATION.md
4. Keep under 300 lines

**Focus**:
- Solar energy viability assumptions
- Atmospheric water generation feasibility
- Technology cost assumptions
- Maintenance requirements assumptions
- Expertise needed assumptions

**When done**: Commit "[Assumptions] File 21 analysis", push branch, create MR

**Time**: 20-30 minutes
```

---

### Agent 11: File 30 (Business Model) ⚠️ CRITICAL

```
Agent 11: Analyze 30_Business_Model.md for assumptions.

**Branch**: `feature/assumptions-file-30`

**Task**:
1. Read 30_Business_Model.md
2. Identify 5-10 key assumptions
3. Create _vault_maintenance/assumptions_audit/FILE_30_BUSINESS_MODEL.md
4. Keep under 300 lines

**CRITICAL FOCUS**:
- **Where does €20-30k Bootstrap budget come from?**
- Budget allocation realism
- Revenue model viability (eco-tourism, carbon credits, energy)
- Cost estimate accuracy
- Path to self-sustainability

**Top Question**: Where is the €20-30k coming from? (Savings? Friends/family? Loan?)

**When done**: Commit "[Assumptions] File 30 analysis - CRITICAL", push branch, create MR

**Time**: 30-40 minutes (this is critical)
```

---

### Agent 12: File 32 (Funding Strategy)

```
Agent 12: Analyze 32_Funding_Strategy.md for assumptions.

**Branch**: `feature/assumptions-file-32`

**Task**:
1. Read 32_Funding_Strategy.md
2. Identify 5-10 key assumptions
3. Create _vault_maintenance/assumptions_audit/FILE_32_FUNDING_STRATEGY.md
4. Keep under 300 lines

**Focus**:
- Funding timeline assumptions (6 months realistic?)
- Funding source accessibility assumptions
- Friends/family capacity assumptions
- Grant eligibility assumptions
- Impact investor interest assumptions

**When done**: Commit "[Assumptions] File 32 analysis", push branch, create MR

**Time**: 20-30 minutes
```

---

### Agent 13: File 40 (Expansion Growth Strategy)

```
Agent 13: Analyze 40_Expansion_Growth_Strategy.md for assumptions.

**Branch**: `feature/assumptions-file-40`

**Task**:
1. Read 40_Expansion_Growth_Strategy.md
2. Identify 5-10 key assumptions
3. Create _vault_maintenance/assumptions_audit/FILE_40_EXPANSION_GROWTH_STRATEGY.md
4. Keep under 300 lines

**Focus**:
- Scaling assumptions (1ha→10ha→100ha)
- Funding availability for each phase
- Team scaling assumptions
- Replication feasibility assumptions

**When done**: Commit "[Assumptions] File 40 analysis", push branch, create MR

**Time**: 20-30 minutes
```

---

### Agent 14: Files 42 + 43 (Next Steps + Operations)

```
Agent 14: Analyze 42_Next_Steps_90_Days.md and 43_Operations_Action_Plan.md for assumptions.

**Branch**: `feature/assumptions-files-42-43`

**Task**:
1. Read both files
2. Identify 5-10 key assumptions across both
3. Create _vault_maintenance/assumptions_audit/FILES_42_43_NEXT_STEPS_OPERATIONS.md
4. Keep under 300 lines

**Focus**:
- 90-day timeline realistic?
- Task dependencies properly sequenced?
- 1-2 person team capacity assumptions
- Operational complexity assumptions

**When done**: Commit "[Assumptions] Files 42-43 analysis", push branch, create MR

**Time**: 30-40 minutes (2 files)
```

---

### Agent 15: File 44 (Site Selection)

```
Agent 15: Analyze 44_Site_Selection_Land_Acquisition.md for assumptions.

**Branch**: `feature/assumptions-file-44`

**Task**:
1. Read 44_Site_Selection_Land_Acquisition.md
2. Identify 5-10 key assumptions
3. Create _vault_maintenance/assumptions_audit/FILE_44_SITE_SELECTION.md
4. Keep under 300 lines

**Focus**:
- Land availability assumptions (is it actually available?)
- Price assumptions (€5-15k or €500-2k/year realistic?)
- Legal acquisition process assumptions
- Expansion potential assumptions (1ha→5-10ha on same site?)
- Community acceptance assumptions

**When done**: Commit "[Assumptions] File 44 analysis", push branch, create MR

**Time**: 20-30 minutes
```

---

### Agent 16: File 50 (Risk Assessment)

```
Agent 16: Analyze 50_Risk_Assessment.md for assumptions.

**Branch**: `feature/assumptions-file-50`

**Task**:
1. Read 50_Risk_Assessment.md
2. Identify 5-10 key assumptions
3. Create _vault_maintenance/assumptions_audit/FILE_50_RISK_ASSESSMENT.md
4. Keep under 300 lines

**Focus**:
- Risk probability assumptions (validated or guessed?)
- Mitigation effectiveness assumptions
- Risk priority rankings assumptions

**When done**: Commit "[Assumptions] File 50 analysis", push branch, create MR

**Time**: 20-30 minutes
```

---

### Agent 17: File 51 (KPIs)

```
Agent 17: Analyze 51_Key_Performance_Indicators.md for assumptions.

**Branch**: `feature/assumptions-file-51`

**Task**:
1. Read 51_Key_Performance_Indicators.md
2. Identify 5-10 key assumptions
3. Create _vault_maintenance/assumptions_audit/FILE_51_KEY_PERFORMANCE_INDICATORS.md
4. Keep under 300 lines

**Focus**:
- KPI target achievability (realistic or aspirational?)
- Measurement feasibility assumptions
- Timeline to achieve targets assumptions
- Baseline assumptions

**When done**: Commit "[Assumptions] File 51 analysis", push branch, create MR

**Time**: 20-30 minutes
```

---

### Agent 18: File 60 (Marketing Communications)

```
Agent 18: Analyze 60_Marketing_Communications_Strategy.md for assumptions.

**Branch**: `feature/assumptions-file-60`

**Task**:
1. Read 60_Marketing_Communications_Strategy.md
2. Identify 5-10 key assumptions
3. Create _vault_maintenance/assumptions_audit/FILE_60_MARKETING_COMMUNICATIONS_STRATEGY.md
4. Keep under 300 lines

**Focus**:
- Stakeholder engagement assumptions
- Marketing channel effectiveness assumptions
- Message resonance assumptions
- Community receptivity assumptions
- Partnership interest assumptions

**When done**: Commit "[Assumptions] File 60 analysis", push branch, create MR

**Time**: 20-30 minutes
```

---

### Agent 19: Consolidation (FINAL)

```
Agent 19: Consolidate all 18 assumptions analyses.

**Branch**: `feature/assumptions-consolidation`

**Prerequisites**: All 18 agent branches merged to main

**Task**:
1. Read all 18 analysis files
2. Create 3 SHORT consolidated files:
   - CRITICAL_QUESTIONS.md (top 20 questions, ~400 lines)
   - TOP_ASSUMPTIONS.md (top 30 assumptions, ~500 lines)
   - CONTRADICTIONS.md (cross-file issues, ~300 lines)

**Format for CRITICAL_QUESTIONS.md**:

Priority order:
1. gGmbH vs e.V. (Agent 5)
2. Germany vs Portugal (Agent 5)
3. Budget source (Agent 11)
4. Geographic specificity (Agent 2)
5. Timeline realism (Agent 14)
[... continue to 20]

**When done**: Commit "[Assumptions] Final consolidation", push branch, create MR

**Time**: 45-60 minutes
```

---

## Simplified One-Line Prompts

**For Agents 1-18** (substitute N with agent number 1-18):
```
You are Agent N. Execute from ASSUMPTIONS_AUDIT_ROUTING_PLAN_V3.md (search "Agent N:"). Analyze assigned file(s), create ONE small output file (<300 lines), commit, push branch.
```

**For Agent 19** (consolidation):
```
You are Agent 19 consolidation. Execute from ASSUMPTIONS_AUDIT_ROUTING_PLAN_V3.md (search "Agent 19:"). Read all 18 analyses, create 3 SHORT consolidated files, commit, push branch.
```

---

## Execution Workflow

### Phase 1: Launch All 18 Analysis Agents (Parallel)

**Open 18 Claude Code web sessions** and paste one-line prompt with N=1 to 18

**Wall-clock time**: 30-45 minutes (all running in parallel)

### Phase 2: Merge All 18 Branches (Any Order)

```bash
git checkout main
for i in {1..18}; do
  git merge feature/assumptions-file-$i
  git push
done
```

### Phase 3: Launch Agent 19 (Consolidation)

**After all 18 merged**: Run Agent 19

**Time**: 45-60 minutes

### Total Wall-Clock Time: 1.5-2 hours (vs 3-4 hours with V2)

---

## Zero-Conflict Guarantee

| Agent | Creates File | Modifies Files |
|-------|-------------|----------------|
| Agent 1 | FILE_01_EXECUTIVE_SUMMARY.md | NONE |
| Agent 2 | FILE_02_PROJECT_VISION.md | NONE |
| ... | ... | NONE |
| Agent 18 | FILE_60_MARKETING_COMMUNICATIONS_STRATEGY.md | NONE |
| Agent 19 | 3 consolidated files | NONE |

**Result**: Perfect file isolation → Zero conflicts

---

## Success Metrics

**Per Agent (1-18)**:
- [ ] 1 analysis file created (~200-300 lines)
- [ ] 5-10 key assumptions identified
- [ ] Top 3 questions listed
- [ ] Completed in 20-40 minutes
- [ ] No hanging issues

**Agent 19**:
- [ ] 3 consolidated files created
- [ ] Top 20 critical questions extracted
- [ ] Top 30 assumptions listed
- [ ] Contradictions identified

**Overall**:
- [ ] 18 analysis files
- [ ] 3 consolidated files
- [ ] Zero merge conflicts
- [ ] Total time: 1.5-2 hours wall-clock

---

## Expected Deliverables

```
_vault_maintenance/assumptions_audit/
├── FILE_01_EXECUTIVE_SUMMARY.md
├── FILE_02_PROJECT_VISION.md
├── FILE_03_SUCCESS_FACTORS.md
├── FILE_04_CURRENT_STATUS.md
├── FILE_10_ORGANIZATIONAL_STRUCTURE.md ⚠️ CRITICAL
├── FILE_11_GOVERNANCE.md
├── FILE_12_TEAM_ROLES.md
├── FILE_13_LEGAL_FRAMEWORK.md
├── FILE_20_RESTORATION_METHODOLOGY.md
├── FILE_21_TECHNOLOGY_INTEGRATION.md
├── FILE_30_BUSINESS_MODEL.md ⚠️ CRITICAL
├── FILE_32_FUNDING_STRATEGY.md
├── FILE_40_EXPANSION_GROWTH_STRATEGY.md
├── FILES_42_43_NEXT_STEPS_OPERATIONS.md
├── FILE_44_SITE_SELECTION.md
├── FILE_50_RISK_ASSESSMENT.md
├── FILE_51_KEY_PERFORMANCE_INDICATORS.md
├── FILE_60_MARKETING_COMMUNICATIONS_STRATEGY.md
├── CRITICAL_QUESTIONS.md (from Agent 19) ⭐
├── TOP_ASSUMPTIONS.md (from Agent 19)
└── CONTRADICTIONS.md (from Agent 19)
```

---

**Document Status**: V3 - Maximum Parallelization
**Agents**: 18 analysis + 1 consolidation = 19 total
**Time Savings**: 50% faster than V2, 80% faster than sequential
**Complexity Per Agent**: Minimal (just 1-2 files each)
**Expected Success Rate**: 100%

---

## SIMPLIFIED ONE-LINE PROMPTS (Change N Once Only)

**For Agents 1-18** (change N to 1, 2, 3... 18):
```
N=1; You are Agent $N. Execute from ASSUMPTIONS_AUDIT_ROUTING_PLAN_V3.md (search "Agent $N:"). Analyze assigned file(s), create ONE small output file (<300 lines), commit, push branch.
```

**For Agent 19** (consolidation):
```
You are Agent 19 consolidation. Execute from ASSUMPTIONS_AUDIT_ROUTING_PLAN_V3.md (search "Agent 19:"). Read all 18 analyses, create 3 SHORT consolidated files, commit, push branch.
```

**Examples**:
- Agent 1: Change `N=1;` to use agent 1
- Agent 2: Change `N=2;` to use agent 2
- Agent 5: Change `N=5;` to use agent 5 (CRITICAL - gGmbH vs e.V.)
- Agent 11: Change `N=11;` to use agent 11 (CRITICAL - Budget source)
- Agent 18: Change `N=18;` to use agent 18

**Just change the number once at N=X and the rest auto-updates!**

