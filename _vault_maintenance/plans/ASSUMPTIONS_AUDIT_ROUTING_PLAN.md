# Assumptions Audit - Parallel Execution Routing Plan
## Strategic Advisor Comprehensive Assumptions Analysis

**Created**: 2025-11-09
**Purpose**: Systematic identification and validation of all strategic assumptions
**Strategy**: File isolation + parallel execution + zero conflicts
**Estimated Time**: 4-8 hours total (1-2 hours per agent in parallel)

---

## Overview

This plan orchestrates a comprehensive assumptions audit using the **Strategic Advisor persona** to identify, categorize, and question every assumption across all strategic documentation.

### Key Principles:
1. **File Isolation**: Each agent analyzes different files and writes to separate output files
2. **Branch Naming**: Clear, consistent branch names for tracking
3. **Sequential Merging**: Merge in defined order to avoid conflicts
4. **Conservative Token Usage**: Each agent handles 4-6 files (~15,000-25,000 tokens)

---

## What Are We Looking For?

### Assumption Categories:

**1. Legal/Organizational**
- Entity type (gGmbH vs e.V. vs Associação)
- Registration location (Germany vs Portugal vs Spain)
- Share capital requirements
- Governance structure

**2. Geographic**
- Where operations will be based
- Where founders will live
- Target countries for land acquisition
- Cross-border complexity

**3. Financial**
- Budget availability (€20-30k for Year 1)
- Funding sources accessible
- Timeline to secure funding
- Revenue model viability

**4. Team**
- Number of founders available
- Expertise present vs. needed
- Time commitment realistic
- Roles fillable

**5. Timeline**
- Process durations realistic
- Dependencies properly sequenced
- Buffer included for delays
- Seasonal constraints considered

**6. Land/Site**
- Land availability in target area
- Price assumptions realistic
- Legal acquisition feasible
- Expansion possible from pilot site

**7. Technical**
- Technology viability (solar, water generation)
- Methodology effectiveness
- Scaling assumptions
- Resource requirements

**8. Community/Stakeholder**
- Community acceptance likely
- Partnership interest present
- Regulatory approval obtainable
- Volunteer engagement realistic

---

## Agent Routing Strategy

### Agent 1: Vision & Status (4 files)
**Branch**: `feature/assumptions-audit-vision-status`
**Files to Analyze**:
- strategic/01_Executive_Summary.md
- 02_Project_Vision.md
- 03_Success_Factors.md
- 04_Current_Status_Assessment.md

**Output File**: `_vault_maintenance/assumptions_audit/AGENT_01_VISION_STATUS.md`
**Token Estimate**: ~20,000 tokens
**Focus Areas**: Strategic vision assumptions, maturity assessment, success factor assumptions

---

### Agent 2: Organization & Legal (4 files)
**Branch**: `feature/assumptions-audit-organization`
**Files to Analyze**:
- 10_Organizational_Structure.md
- 11_Governance.md
- 12_Team_Roles.md
- 13_Legal_Framework.md

**Output File**: `_vault_maintenance/assumptions_audit/AGENT_02_ORGANIZATION.md`
**Token Estimate**: ~22,000 tokens
**Focus Areas**: **gGmbH vs e.V. decision**, legal structure, team availability, governance assumptions

---

### Agent 3: Methodology & Technology (2 files)
**Branch**: `feature/assumptions-audit-methodology`
**Files to Analyze**:
- 20_Restoration_Methodology.md
- 21_Technology_Integration.md

**Output File**: `_vault_maintenance/assumptions_audit/AGENT_03_METHODOLOGY.md`
**Token Estimate**: ~18,000 tokens
**Focus Areas**: Restoration method assumptions, technology viability, scaling feasibility

---

### Agent 4: Financial & Funding (3 files)
**Branch**: `feature/assumptions-audit-financial`
**Files to Analyze**:
- 30_Business_Model.md
- 31_Financial_Projections.md (if exists, else note missing)
- 32_Funding_Strategy.md

**Output File**: `_vault_maintenance/assumptions_audit/AGENT_04_FINANCIAL.md`
**Token Estimate**: ~20,000 tokens
**Focus Areas**: Budget availability, funding timeline, revenue assumptions, cost estimates

---

### Agent 5: Implementation & Roadmap (5 files)
**Branch**: `feature/assumptions-audit-implementation`
**Files to Analyze**:
- 40_Expansion_Growth_Strategy.md
- 42_Next_Steps_90_Days.md
- 43_Operations_Action_Plan.md
- 44_Site_Selection_Land_Acquisition.md

**Output File**: `_vault_maintenance/assumptions_audit/AGENT_05_IMPLEMENTATION.md`
**Token Estimate**: ~25,000 tokens
**Focus Areas**: Timeline realism, site availability, expansion assumptions, operational readiness

---

### Agent 6: Assessment & Communications (3 files)
**Branch**: `feature/assumptions-audit-assessment`
**Files to Analyze**:
- 50_Risk_Assessment.md
- 51_Key_Performance_Indicators.md
- 60_Marketing_Communications_Strategy.md

**Output File**: `_vault_maintenance/assumptions_audit/AGENT_06_ASSESSMENT.md`
**Token Estimate**: ~20,000 tokens
**Focus Areas**: Risk probability assumptions, KPI achievability, stakeholder engagement assumptions

---

### Agent 7: Consolidation (FINAL - runs after all 6 complete)
**Branch**: `feature/assumptions-audit-consolidation`
**Input Files**: All 6 agent outputs (AGENT_01 through AGENT_06)

**Output Files**:
- `_vault_maintenance/assumptions_audit/CONSOLIDATED_ASSUMPTIONS_AUDIT.md`
- `_vault_maintenance/assumptions_audit/CRITICAL_QUESTIONS_FOR_USER.md`
- `_vault_maintenance/assumptions_audit/ASSUMPTIONS_BY_CATEGORY.md`

**Token Estimate**: ~15,000 tokens
**Tasks**:
1. Merge all findings from Agents 1-6
2. Categorize assumptions across all categories
3. Identify contradictions between files
4. Prioritize assumptions by impact and uncertainty
5. Create comprehensive question list for user validation
6. Generate assumption dependency map

---

## Zero-Conflict File Isolation

### Why No Conflicts:

| Agent | Creates File | Modifies Files |
|-------|-------------|----------------|
| Agent 1 | `AGENT_01_VISION_STATUS.md` | NONE |
| Agent 2 | `AGENT_02_ORGANIZATION.md` | NONE |
| Agent 3 | `AGENT_03_METHODOLOGY.md` | NONE |
| Agent 4 | `AGENT_04_FINANCIAL.md` | NONE |
| Agent 5 | `AGENT_05_IMPLEMENTATION.md` | NONE |
| Agent 6 | `AGENT_06_ASSESSMENT.md` | NONE |
| Agent 7 | 3 consolidated files | NONE (only reads agent outputs) |

**Result**: Perfect file isolation → Zero conflicts guaranteed

---

## Agent Prompt Template

Each agent will receive a standardized prompt to ensure consistent output format.

### Output Format Required:

```markdown
# Assumptions Audit: [Category Name]

**Agent**: Agent X
**Files Analyzed**: [List]
**Analysis Date**: 2025-11-09
**Total Assumptions Found**: X

---

## Summary

[2-3 sentence overview of key findings]

---

## Assumptions by Category

### Legal/Organizational Assumptions

#### Assumption [Category]-1: [Title]

**Statement**: [Exact assumption as stated in documentation]

**Location**: [File name]:[Line number or section]

**Type**: [Stated explicitly / Implied / Default choice]

**Why This Exists**: [Research-based / Convenience / Common practice / etc.]

**Alternative Options**:
1. **Option A**: [Current assumption]
   - Pros: [List]
   - Cons: [List]

2. **Option B**: [Alternative]
   - Pros: [List]
   - Cons: [List]

3. **Option C**: [Another alternative if relevant]
   - Pros: [List]
   - Cons: [List]

**Critical Questions for User**:
1. [Question 1]
2. [Question 2]

**Dependencies**: [What breaks if this assumption is wrong?]

**Validation Method**: [How to test this assumption?]

**Priority**: [CRITICAL / HIGH / MEDIUM / LOW]

**Impact if Wrong**: [What happens if this is incorrect?]

**Uncertainty Level**: [HIGH / MEDIUM / LOW]

---

[Repeat for each assumption found]

---

## Cross-File Contradictions

[List any contradictions between files analyzed]

---

## Missing Information / Unstated Assumptions

[What's not mentioned but should be?]

---

## Statistics

- Total assumptions identified: X
- Critical priority: X
- High priority: X
- Medium priority: X
- Low priority: X
- High uncertainty: X
- Cross-file contradictions: X
```

---

## Copy-Paste Ready Agent Prompts

### Prompt for Agent 1: Vision & Status

```
You are Agent 1 conducting a Strategic Advisor assumptions audit for Eco Balance documentation.

**Your Task**: Identify and analyze ALL assumptions in vision and status documents.

**Branch**: Create and work on branch `feature/assumptions-audit-vision-status`

**Files to Analyze**:
1. strategic/01_Executive_Summary.md
2. 02_Project_Vision.md
3. 03_Success_Factors.md
4. 04_Current_Status_Assessment.md

**Output File to Create**:
`_vault_maintenance/assumptions_audit/AGENT_01_VISION_STATUS.md`

**Your Mission**:
Systematically scan each file and identify ALL assumptions including:

**What to Look For**:
- "Will" statements (assumed futures)
- "Should" statements (assumed best paths)
- "Can" statements (assumed capabilities)
- Specific numbers without ranges/contingencies
- Stated timelines without buffers
- Geographic assumptions (location, operations, target areas)
- Team assumptions (size, expertise, availability)
- Funding assumptions (sources, amounts, timelines)
- Legal/organizational assumptions (entity type, structure)

**Format**: Use the template from ASSUMPTIONS_AUDIT_ROUTING_PLAN.md

**Critical Assumption to Investigate**:
- 3-Phase Growth Strategy assumptions (1ha Year 1, 5-10ha Year 2-3, 50+ ha Year 4+)
- €20-30k Bootstrap funding availability and timeline
- 1-2 founder team sufficiency for Year 1
- Southern Europe geography (but WHERE exactly?)
- Success factors (are they proven or assumed?)

For EACH assumption:
1. State it clearly with exact quote and location
2. Explain why it exists
3. Present 2-3 alternative options with pros/cons
4. Ask critical questions for user validation
5. Identify dependencies (what breaks if wrong?)
6. Assess priority (CRITICAL/HIGH/MEDIUM/LOW)
7. Rate uncertainty (HIGH/MEDIUM/LOW)

**Important**:
- Create directory `_vault_maintenance/assumptions_audit/` if needed
- Do NOT modify any existing files
- Create ONLY your output file
- Be thorough - every assumption matters

**When Complete**:
- Commit with message: "[Assumptions Audit] Agent 1 - Vision & Status analysis"
- Push branch `feature/assumptions-audit-vision-status`
- Create merge request to main

**Time Estimate**: 1-2 hours
```

---

### Prompt for Agent 2: Organization & Legal

```
You are Agent 2 conducting a Strategic Advisor assumptions audit for Eco Balance documentation.

**Your Task**: Identify and analyze ALL assumptions in organizational and legal documents.

**Branch**: Create and work on branch `feature/assumptions-audit-organization`

**Files to Analyze**:
1. 10_Organizational_Structure.md
2. 11_Governance.md
3. 12_Team_Roles.md
4. 13_Legal_Framework.md

**Output File to Create**:
`_vault_maintenance/assumptions_audit/AGENT_02_ORGANIZATION.md`

**Your Mission**:
Systematically scan each file and identify ALL assumptions.

**CRITICAL Focus Areas**:

1. **gGmbH vs e.V. Decision** (File 10):
   - Why gGmbH chosen over e.V. (Verein)?
   - €25,000 share capital assumption
   - Germany vs Portugal registration location
   - Limited liability necessity assumption
   - Commercial activities importance assumption

2. **Bootstrap Strategy** (File 10 mentions):
   - Year 1 informal partnership assumption
   - Year 2 formal gGmbH assumption
   - Timing assumptions

3. **Team Structure** (File 12):
   - Role requirements and expertise assumptions
   - Hiring timeline assumptions
   - Salary/compensation assumptions
   - Volunteer vs paid staff assumptions

4. **Governance** (File 11):
   - Board composition assumptions
   - Decision-making process assumptions
   - Stakeholder representation assumptions

**What to Look For**:
- Legal entity type choices (stated vs alternatives)
- Registration location assumptions (Germany/Portugal/Spain)
- Capital requirements and availability
- Team size and composition assumptions
- Expertise availability assumptions
- Governance structure assumptions
- Compliance requirements assumptions

**Format**: Use the template from ASSUMPTIONS_AUDIT_ROUTING_PLAN.md

For EACH assumption:
1. State it clearly with exact quote and location
2. Explain why it exists
3. Present 2-3 alternative options with pros/cons
4. Ask critical questions for user validation
5. Identify dependencies (what breaks if wrong?)
6. Assess priority (CRITICAL/HIGH/MEDIUM/LOW)
7. Rate uncertainty (HIGH/MEDIUM/LOW)

**Important**:
- Do NOT modify any existing files
- Create ONLY your output file
- Pay special attention to gGmbH vs e.V. - this is a major unvalidated assumption

**When Complete**:
- Commit with message: "[Assumptions Audit] Agent 2 - Organization & Legal analysis"
- Push branch `feature/assumptions-audit-organization`
- Create merge request to main

**Time Estimate**: 1-2 hours
```

---

### Prompt for Agent 3: Methodology & Technology

```
You are Agent 3 conducting a Strategic Advisor assumptions audit for Eco Balance documentation.

**Your Task**: Identify and analyze ALL assumptions in methodology and technology documents.

**Branch**: Create and work on branch `feature/assumptions-audit-methodology`

**Files to Analyze**:
1. 20_Restoration_Methodology.md
2. 21_Technology_Integration.md

**Output File to Create**:
`_vault_maintenance/assumptions_audit/AGENT_03_METHODOLOGY.md`

**Your Mission**:
Systematically scan each file and identify ALL assumptions.

**Focus Areas**:

1. **Restoration Methodology** (File 20):
   - Native species selection assumptions
   - Soil regeneration approach assumptions
   - Timeline to ecosystem recovery
   - Methodology effectiveness assumptions
   - Climate suitability assumptions
   - Mediterranean context applicability

2. **Technology Integration** (File 21):
   - Solar energy viability (output, cost, maintenance)
   - Atmospheric water generation feasibility
   - IoT monitoring reliability
   - Drone reforestation effectiveness
   - Technology cost assumptions
   - Expertise required assumptions
   - Maintenance requirements

3. **Scaling Assumptions**:
   - 1ha methodology transferable to 5-10ha?
   - Technology scales linearly?
   - Complexity increases manageable?

**What to Look For**:
- Methodology effectiveness assumptions (proven vs assumed)
- Technology viability assumptions
- Cost estimates for technology
- Expertise requirements
- Maintenance assumptions
- Climate/geography suitability
- Timeline to results
- Scaling assumptions (1ha → 10ha → 100ha)

**Format**: Use the template from ASSUMPTIONS_AUDIT_ROUTING_PLAN.md

For EACH assumption:
1. State it clearly with exact quote and location
2. Explain why it exists (research-based? common practice?)
3. Present 2-3 alternative options with pros/cons
4. Ask critical questions for user validation
5. Identify dependencies (what breaks if wrong?)
6. Assess priority (CRITICAL/HIGH/MEDIUM/LOW)
7. Rate uncertainty (HIGH/MEDIUM/LOW)

**Important**:
- Do NOT modify any existing files
- Create ONLY your output file
- Question technological assumptions - are they proven in this context?

**When Complete**:
- Commit with message: "[Assumptions Audit] Agent 3 - Methodology & Technology analysis"
- Push branch `feature/assumptions-audit-methodology`
- Create merge request to main

**Time Estimate**: 1-2 hours
```

---

### Prompt for Agent 4: Financial & Funding

```
You are Agent 4 conducting a Strategic Advisor assumptions audit for Eco Balance documentation.

**Your Task**: Identify and analyze ALL assumptions in financial and funding documents.

**Branch**: Create and work on branch `feature/assumptions-audit-financial`

**Files to Analyze**:
1. 30_Business_Model.md
2. 32_Funding_Strategy.md

(Note: 31_Financial_Projections.md may not exist - note if missing)

**Output File to Create**:
`_vault_maintenance/assumptions_audit/AGENT_04_FINANCIAL.md`

**Your Mission**:
Systematically scan each file and identify ALL assumptions.

**CRITICAL Focus Areas**:

1. **Bootstrap Budget** (File 30):
   - €20-30k availability assumption
   - Source of this capital (friends/family?)
   - Timeline to secure it
   - Budget allocation realism
   - Cost estimates accuracy

2. **Funding Strategy** (File 32):
   - Funding sources accessibility
   - Timeline to funding (6 months? 12 months?)
   - Success rate assumptions
   - Friends/family capacity assumptions
   - Grant eligibility assumptions
   - Impact investor interest assumptions

3. **Revenue Model** (File 30):
   - Revenue stream viability (eco-tourism, carbon credits, energy)
   - Timeline to revenue
   - Revenue amounts realistic?
   - Market demand assumptions
   - Pricing assumptions

4. **Financial Sustainability**:
   - Path to self-sustainability assumptions
   - Timeline assumptions
   - Break-even point assumptions

**What to Look For**:
- Budget availability (where does €20-30k come from?)
- Funding timeline realism
- Funding source accessibility
- Revenue model viability
- Cost estimates (are they researched or guessed?)
- Financial projections (optimistic or realistic?)
- Self-sustainability timeline
- Grant eligibility requirements

**Format**: Use the template from ASSUMPTIONS_AUDIT_ROUTING_PLAN.md

For EACH assumption:
1. State it clearly with exact quote and location
2. Explain why it exists
3. Present 2-3 alternative options with pros/cons
4. Ask critical questions for user validation (Does user have €20-30k? From where?)
5. Identify dependencies (what breaks if wrong?)
6. Assess priority (CRITICAL/HIGH/MEDIUM/LOW)
7. Rate uncertainty (HIGH/MEDIUM/LOW)

**Important**:
- Do NOT modify any existing files
- Create ONLY your output file
- Financial assumptions are CRITICAL - be thorough

**When Complete**:
- Commit with message: "[Assumptions Audit] Agent 4 - Financial & Funding analysis"
- Push branch `feature/assumptions-audit-financial`
- Create merge request to main

**Time Estimate**: 1-2 hours
```

---

### Prompt for Agent 5: Implementation & Roadmap

```
You are Agent 5 conducting a Strategic Advisor assumptions audit for Eco Balance documentation.

**Your Task**: Identify and analyze ALL assumptions in implementation and roadmap documents.

**Branch**: Create and work on branch `feature/assumptions-audit-implementation`

**Files to Analyze**:
1. 40_Expansion_Growth_Strategy.md
2. 42_Next_Steps_90_Days.md
3. 43_Operations_Action_Plan.md
4. 44_Site_Selection_Land_Acquisition.md

**Output File to Create**:
`_vault_maintenance/assumptions_audit/AGENT_05_IMPLEMENTATION.md`

**Your Mission**:
Systematically scan each file and identify ALL assumptions.

**Focus Areas**:

1. **Timeline Assumptions**:
   - 90-day action plan realistic?
   - Year 1 timeline achievable?
   - Process duration estimates accurate?
   - Dependencies properly sequenced?
   - Buffer for delays included?

2. **Site Selection** (File 44):
   - Land availability assumptions
   - Price range realistic (€5-15k or €500-2k/year lease)?
   - Legal acquisition process understood?
   - Expansion from 1ha to 5-10ha feasible on same site?
   - Community acceptance assumed?

3. **Operations** (File 43):
   - 1-2 person team sufficiency for Year 1
   - Expertise gaps acknowledged?
   - Tool/equipment availability
   - Operational complexity realistic?

4. **Expansion Strategy** (File 40):
   - Scaling assumptions (1ha → 10ha → 100ha)
   - Funding availability for each phase
   - Team scaling assumptions
   - Replication feasibility

**What to Look For**:
- Timeline realism (are buffers included?)
- Land availability and pricing
- Legal process assumptions
- Team capacity assumptions
- Expertise requirements
- Operational complexity
- Scaling assumptions
- Geographic specificity (Portugal? Spain? Where exactly?)

**Format**: Use the template from ASSUMPTIONS_AUDIT_ROUTING_PLAN.md

For EACH assumption:
1. State it clearly with exact quote and location
2. Explain why it exists
3. Present 2-3 alternative options with pros/cons
4. Ask critical questions for user validation
5. Identify dependencies (what breaks if wrong?)
6. Assess priority (CRITICAL/HIGH/MEDIUM/LOW)
7. Rate uncertainty (HIGH/MEDIUM/LOW)

**Important**:
- Do NOT modify any existing files
- Create ONLY your output file
- Timeline assumptions are often over-optimistic - challenge them

**When Complete**:
- Commit with message: "[Assumptions Audit] Agent 5 - Implementation & Roadmap analysis"
- Push branch `feature/assumptions-audit-implementation`
- Create merge request to main

**Time Estimate**: 1-2 hours
```

---

### Prompt for Agent 6: Assessment & Communications

```
You are Agent 6 conducting a Strategic Advisor assumptions audit for Eco Balance documentation.

**Your Task**: Identify and analyze ALL assumptions in assessment and communications documents.

**Branch**: Create and work on branch `feature/assumptions-audit-assessment`

**Files to Analyze**:
1. 50_Risk_Assessment.md
2. 51_Key_Performance_Indicators.md
3. 60_Marketing_Communications_Strategy.md

**Output File to Create**:
`_vault_maintenance/assumptions_audit/AGENT_06_ASSESSMENT.md`

**Your Mission**:
Systematically scan each file and identify ALL assumptions.

**Focus Areas**:

1. **Risk Assessment** (File 50):
   - Risk probability assumptions (are they validated?)
   - Mitigation effectiveness assumptions
   - Risk priority rankings (based on data or intuition?)
   - Worst-case scenario planning
   - Risk interdependencies

2. **KPIs** (File 51):
   - Target achievability (realistic or aspirational?)
   - Measurement feasibility
   - Timeline to achieve targets
   - Baseline assumptions
   - Success criteria realism

3. **Communications** (File 60):
   - Stakeholder engagement assumptions
   - Marketing effectiveness assumptions
   - Channel accessibility (social media, website)
   - Message resonance assumptions
   - Community receptivity assumptions
   - Partnership interest assumptions

**What to Look For**:
- Risk probability estimates (data-based or guessed?)
- Mitigation strategy effectiveness
- KPI achievability (proven or aspirational?)
- Measurement capability assumptions
- Stakeholder engagement assumptions
- Marketing channel effectiveness
- Message resonance with audiences
- Community acceptance assumptions

**Format**: Use the template from ASSUMPTIONS_AUDIT_ROUTING_PLAN.md

For EACH assumption:
1. State it clearly with exact quote and location
2. Explain why it exists
3. Present 2-3 alternative options with pros/cons
4. Ask critical questions for user validation
5. Identify dependencies (what breaks if wrong?)
6. Assess priority (CRITICAL/HIGH/MEDIUM/LOW)
7. Rate uncertainty (HIGH/MEDIUM/LOW)

**Important**:
- Do NOT modify any existing files
- Create ONLY your output file
- Risk assessments often underestimate - challenge optimism

**When Complete**:
- Commit with message: "[Assumptions Audit] Agent 6 - Assessment & Communications analysis"
- Push branch `feature/assumptions-audit-assessment`
- Create merge request to main

**Time Estimate**: 1-2 hours
```

---

### Prompt for Agent 7: Consolidation (RUN LAST)

```
You are Agent 7 conducting the FINAL consolidation of the Strategic Advisor assumptions audit.

**Your Task**: Consolidate all findings from Agents 1-6 into comprehensive analysis.

**Branch**: Create and work on branch `feature/assumptions-audit-consolidation`

**Prerequisites**:
- ALL 6 agent branches must be merged to main first
- Verify these files exist:
  - `_vault_maintenance/assumptions_audit/AGENT_01_VISION_STATUS.md`
  - `_vault_maintenance/assumptions_audit/AGENT_02_ORGANIZATION.md`
  - `_vault_maintenance/assumptions_audit/AGENT_03_METHODOLOGY.md`
  - `_vault_maintenance/assumptions_audit/AGENT_04_FINANCIAL.md`
  - `_vault_maintenance/assumptions_audit/AGENT_05_IMPLEMENTATION.md`
  - `_vault_maintenance/assumptions_audit/AGENT_06_ASSESSMENT.md`

**Output Files to Create**:
1. `_vault_maintenance/assumptions_audit/CONSOLIDATED_ASSUMPTIONS_AUDIT.md`
2. `_vault_maintenance/assumptions_audit/CRITICAL_QUESTIONS_FOR_USER.md`
3. `_vault_maintenance/assumptions_audit/ASSUMPTIONS_BY_CATEGORY.md`

**Your Mission**:

1. **Read all 6 agent outputs** and extract ALL assumptions

2. **Create CONSOLIDATED_ASSUMPTIONS_AUDIT.md**:
   - Merge all findings into single comprehensive document
   - Total count of assumptions across all files
   - Statistics by category (Legal, Geographic, Financial, etc.)
   - Priority distribution (Critical, High, Medium, Low)
   - Uncertainty distribution (High, Medium, Low)
   - Cross-file contradictions identified
   - Top 20 most critical assumptions (ranked)

3. **Create CRITICAL_QUESTIONS_FOR_USER.md**:
   - Extract ALL questions from agent outputs
   - Organize by category
   - Prioritize by impact (answer these first)
   - Format for easy user response
   - Start with: gGmbH vs e.V. decision (this is CRITICAL)
   - Include: Geographic location (Germany vs Portugal)
   - Include: Budget availability (where does €20-30k come from?)
   - Include: Team composition (who are the 1-2 founders?)

4. **Create ASSUMPTIONS_BY_CATEGORY.md**:
   - Reorganize all assumptions by category:
     - Legal/Organizational
     - Geographic
     - Financial
     - Team
     - Timeline
     - Land/Site
     - Technical
     - Community/Stakeholder
   - For each category, list all assumptions with:
     - Source file
     - Priority
     - Uncertainty
     - Key questions

**Format for CRITICAL_QUESTIONS_FOR_USER.md**:

```markdown
# Critical Questions for User Validation
## Strategic Advisor Assumptions Audit

**Purpose**: Validate or revise strategic assumptions before execution
**Total Questions**: X across Y categories
**Priority**: Answer CRITICAL questions first

---

## ⚠️ CRITICAL PRIORITY (Must Answer Immediately)

### Question 1: Legal Structure - gGmbH vs e.V.

**The Assumption**:
[Quote from File 10 about gGmbH]

**The Issue**:
- gGmbH requires €25,000 share capital
- This is 83-125% of Year 1 Bootstrap budget (€20-30k)
- Also requires €15k-€20k setup costs
- Total: €40-45k needed before operations begin

**Alternative**: e.V. (eingetragener Verein)
- €0-€500 setup costs
- No share capital requirement
- Requires 7 members minimum
- Democratic governance
- May limit commercial activities

**Your Questions**:
1. Do you have €25,000 available for share capital + €15k for setup? (€40k total)
2. If no, is Bootstrap model actually feasible with gGmbH?
3. Would e.V. work for Year 1, then convert to gGmbH Year 2?
4. Can you find 7 members for e.V. if that's the path?

**What breaks if this is wrong**: Entire legal structure, funding timeline, operational budget

---

### Question 2: Geographic Base - Germany vs Portugal

**The Assumption**:
- File 10 says: gGmbH registered in Bonn, Germany
- File 02 says: Operations in Southern Europe (Portugal/Spain)
- NEW Playbook says: Portuguese non-profit structure

**The Issue**: Contradiction - where will you actually be?

**Your Questions**:
1. Where do you currently live? (Germany? Portugal? Other?)
2. Where will you live during Year 1 Bootstrap? (moving to Portugal?)
3. If Germany-based, why not register in Portugal where operations are?
4. If Portugal-based, why German gGmbH instead of Portuguese Associação?

**What breaks if this is wrong**: Legal registration location, tax implications, complexity

---

[Continue for all CRITICAL questions...]

---

## 🔴 HIGH PRIORITY (Answer Within Week)

[High priority questions organized by category...]

---

## 🟡 MEDIUM PRIORITY (Answer Within Month)

[Medium priority questions...]

---

## 🟢 LOW PRIORITY (Can Defer)

[Low priority questions...]
```

**Important**:
- Do NOT modify any existing strategic files
- Create ONLY the 3 consolidation files
- This is synthesis work, not new analysis
- Focus on making user questions ACTIONABLE

**When Complete**:
- Commit with message: "[Assumptions Audit] Consolidation - Complete analysis ready for user validation"
- Push branch `feature/assumptions-audit-consolidation`
- Create merge request to main

**Time Estimate**: 1.5-2 hours
```

---

## Merge Strategy (Sequential, Conflict-Free)

### Step 1: Merge Agent Branches (any order, no conflicts)
```bash
# These can be merged in ANY order since files don't overlap
git checkout main
git merge feature/assumptions-audit-vision-status
git push

git merge feature/assumptions-audit-organization
git push

git merge feature/assumptions-audit-methodology
git push

git merge feature/assumptions-audit-financial
git push

git merge feature/assumptions-audit-implementation
git push

git merge feature/assumptions-audit-assessment
git push
```

**Why No Conflicts**: Each branch creates different file in `assumptions_audit/` directory

### Step 2: Merge Consolidation (LAST)
```bash
# After all 6 agent branches merged
git merge feature/assumptions-audit-consolidation
git push
```

**Why Last**: This branch reads all 6 agent outputs to create consolidated analysis

---

## Execution Workflow

### Parallel Execution (Agents 1-6)

**Start Simultaneously** (6 agents in parallel):
1. Agent 1: Vision & Status
2. Agent 2: Organization & Legal
3. Agent 3: Methodology & Technology
4. Agent 4: Financial & Funding
5. Agent 5: Implementation & Roadmap
6. Agent 6: Assessment & Communications

**Estimated Wall-Clock Time**: 1-2 hours (all 6 running in parallel)

### Sequential Execution (Agent 7)

**Start After All 6 Merged**:
7. Agent 7: Consolidation

**Estimated Time**: 1.5-2 hours

**Total Wall-Clock Time**: 3-4 hours (vs 10-14 hours sequential)

---

## One-Line Prompts

For each agent, use this format and substitute N:

**Agents 1-6**:
```
You are Agent N conducting assumptions audit. Execute task from _vault_maintenance/ASSUMPTIONS_AUDIT_ROUTING_PLAN.md (search for "Agent N:"). Analyze assigned files, identify assumptions, create output file, commit, and push branch.
```

**Agent 7** (run after all 6 merged):
```
You are Agent 7 for consolidation. Execute task from _vault_maintenance/ASSUMPTIONS_AUDIT_ROUTING_PLAN.md (search for "Agent 7:"). Read all agent outputs, create 3 consolidated files, commit, and push branch.
```

---

## Success Metrics

### After All 7 Agents Complete:

**Deliverables**:
- [ ] 6 detailed agent analysis files (AGENT_01 through AGENT_06)
- [ ] 1 consolidated assumptions audit
- [ ] 1 critical questions document (prioritized for user)
- [ ] 1 assumptions by category document
- [ ] Zero merge conflicts
- [ ] All branches merged to main

**Expected Results**:
- 50-100+ assumptions identified across all files
- 10-20 critical priority assumptions requiring immediate validation
- 20-30 high priority assumptions
- Clear contradictions identified (e.g., gGmbH Germany vs Portugal operations)
- Actionable question list for user to validate plan

**Total Time**: 3-4 hours wall-clock (vs 10-14 hours sequential)

---

## Ready to Execute

**Next Steps**:
1. **Review this plan** - Validate approach
2. **Open 6 Claude Code web sessions** - One per agent
3. **Copy-paste Agent 1-6 prompts** - Start all simultaneously
4. **Monitor progress** - Check branches being created
5. **Merge Agents 1-6** - Any order, as they complete
6. **Run Agent 7** - After all 6 merged
7. **Review consolidated outputs** - Answer critical questions
8. **Revise strategic plan** - Based on validated assumptions

---

## Output Location

All outputs will be in:
```
_vault_maintenance/assumptions_audit/
├── AGENT_01_VISION_STATUS.md
├── AGENT_02_ORGANIZATION.md
├── AGENT_03_METHODOLOGY.md
├── AGENT_04_FINANCIAL.md
├── AGENT_05_IMPLEMENTATION.md
├── AGENT_06_ASSESSMENT.md
├── CONSOLIDATED_ASSUMPTIONS_AUDIT.md
├── CRITICAL_QUESTIONS_FOR_USER.md
└── ASSUMPTIONS_BY_CATEGORY.md
```

---

**Document Status**: Ready for Execution
**Conflict Risk**: Zero (with proper routing)
**Time Savings**: 70% (parallel vs sequential)
**Expected Value**: Systematic validation of all strategic assumptions before execution
