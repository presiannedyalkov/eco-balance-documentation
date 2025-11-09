# Strategic Review Workflow

**Purpose**: Systematic process for challenging assumptions, identifying blind spots, and stress-testing strategic plans using The Strategic Advisor persona.

**When to Use**:
- Before major strategic decisions (funding, partnerships, expansion)
- Quarterly strategic health checks
- When significant plan changes are proposed
- Before external presentations (investors, partners)
- When timeline or budget assumptions seem too optimistic
- After receiving new strategic information that affects plans

**Expected Duration**: 2-4 hours per strategic review cycle

---

## Workflow Overview

```
1. Preparation → 2. Document Review → 3. Assumption Challenge →
4. Blind Spot Hunt → 5. Scenario Analysis → 6. Feasibility Test →
7. Report Generation → 8. Task Creation → 9. Follow-up
```

---

## Phase 1: Preparation (15-30 minutes)

### Objectives
- Define scope of strategic review
- Gather relevant documents
- Review previous analyses
- Set critical questions to answer

### Steps

1. **Define Review Scope**
   - [ ] Identify which strategic area to review (funding, timeline, land, team, etc.)
   - [ ] Determine specific documents to analyze
   - [ ] Note any triggering concerns or recent changes
   - [ ] Set specific questions you want answered

2. **Gather Documents**
   - [ ] Collect all relevant strategic files
   - [ ] Review recent changes via Git log
   - [ ] Note version dates and authors
   - [ ] Identify cross-document dependencies

3. **Review Context**
   - [ ] Read previous Strategic Advisor state file
   - [ ] Review findings from other personas (Curator, Auditor, etc.)
   - [ ] Check if any previous strategic tasks were completed
   - [ ] Note any external changes (market, regulatory, etc.)

4. **Set Critical Questions**
   - [ ] List 3-5 specific strategic questions to answer
   - [ ] Identify key assumptions to validate
   - [ ] Note specific scenarios to model
   - [ ] Define success criteria for the review

### Outputs
- Review scope document
- List of documents to analyze
- 3-5 critical strategic questions
- Context from previous analyses

---

## Phase 2: Document Review (30-60 minutes)

### Objectives
- Deep read of strategic documents
- Extract all assumptions (stated and implicit)
- Map strategic logic and dependencies
- Identify what's missing

### Steps

1. **Initial Read-Through**
   - [ ] Read each document completely
   - [ ] Take notes on overall strategic narrative
   - [ ] Note tone (optimistic, realistic, cautious)
   - [ ] Identify key strategic claims

2. **Assumption Extraction**
   - [ ] List every stated assumption ("We assume...", "We expect...", "We believe...")
   - [ ] Identify implicit assumptions (what's taken for granted but not stated)
   - [ ] Note dependencies ("If X, then Y" logic)
   - [ ] Extract timeline assumptions (how long things will take)
   - [ ] Extract budget assumptions (how much things will cost)
   - [ ] Extract capability assumptions (what team can do)

3. **Strategic Logic Mapping**
   - [ ] Draw flow: Vision → Strategy → Tactics → Actions
   - [ ] Map dependencies between strategic elements
   - [ ] Identify critical path items
   - [ ] Note bottlenecks or single points of failure
   - [ ] Chart timeline sequencing

4. **Gap Identification**
   - [ ] What's not addressed at all?
   - [ ] What questions are raised but not answered?
   - [ ] What stakeholders are not mentioned?
   - [ ] What risks are not acknowledged?
   - [ ] What alternatives are not considered?

### Outputs
- Complete assumption list (stated + implicit)
- Strategic logic map/dependency chart
- List of gaps and missing elements
- Initial strategic concerns noted

---

## Phase 3: Assumption Challenge (45-90 minutes)

### Objectives
- Test each assumption rigorously
- Research base rates and benchmarks
- Calculate probability of assumption failure
- Identify highest-risk assumptions

### Steps

1. **For Each Major Assumption**

   **A. State the Assumption Clearly**
   - [ ] Write it out explicitly
   - [ ] Identify who/what it depends on
   - [ ] Note if it's critical or nice-to-have

   **B. Ask "What If This Is Wrong?"**
   - [ ] What happens if assumption fails?
   - [ ] Is there a backup plan?
   - [ ] Can the project continue without this?
   - [ ] What's the cascade effect?

   **C. Research Base Rates**
   - [ ] Find similar projects/situations
   - [ ] What actually happened vs what was planned?
   - [ ] What's the historical success rate?
   - [ ] What's the median outcome (not best case)?

   **D. Assess Evidence**
   - [ ] What evidence supports this assumption?
   - [ ] Is evidence anecdotal or systematic?
   - [ ] Is source credible and relevant?
   - [ ] Is there disconfirming evidence?

   **E. Calculate Probability**
   - [ ] Estimate likelihood assumption holds: High/Medium/Low
   - [ ] Estimate impact if it fails: High/Medium/Low
   - [ ] Calculate risk score: Probability × Impact
   - [ ] Prioritize high-risk assumptions

2. **Challenge Specific Assumption Types**

   **Timeline Assumptions**
   - [ ] Compare to similar project benchmarks
   - [ ] Add up actual hours/days required
   - [ ] Account for dependencies and waiting periods
   - [ ] Include buffer for unknowns (typically 25-50%)
   - [ ] Check for seasonal or regulatory constraints

   **Budget Assumptions**
   - [ ] Break down into detailed line items
   - [ ] Research actual costs (quotes, market rates)
   - [ ] Include contingency (typically 10-20%)
   - [ ] Account for hidden costs
   - [ ] Verify funding source viability

   **Capability Assumptions**
   - [ ] List required skills and expertise
   - [ ] Assess current team capabilities honestly
   - [ ] Identify gaps between required and available
   - [ ] Estimate learning curve for new skills
   - [ ] Consider available time vs required effort

3. **Document Challenge Results**
   - [ ] Create table: Assumption | Evidence | Probability | Impact | Risk Level
   - [ ] Rank assumptions by risk score
   - [ ] Identify top 5 riskiest assumptions
   - [ ] Note which need immediate validation
   - [ ] Flag assumptions without any supporting evidence

### Outputs
- Comprehensive assumption challenge table
- Risk rankings for all major assumptions
- Top 5 riskiest assumptions highlighted
- Evidence gaps identified
- Specific validation research needed

---

## Phase 4: Blind Spot Hunt (30-45 minutes)

### Objectives
- Find what's not in the documents but should be
- Identify overlooked stakeholders, risks, dependencies
- Uncover hidden complexity
- Surface unconscious assumptions

### Steps

1. **Systematic Blind Spot Questions**

   **What's Not Mentioned?**
   - [ ] What failure modes are not discussed?
   - [ ] What risks are not acknowledged?
   - [ ] What stakeholders are not considered?
   - [ ] What costs are not budgeted?
   - [ ] What approvals/permits are not mentioned?
   - [ ] What expertise gaps are not recognized?

   **What's Invisible?**
   - [ ] What dependencies are unstated?
   - [ ] What's assumed to be easy/free/quick?
   - [ ] What external factors could disrupt plans?
   - [ ] What seasonal/timing constraints exist?
   - [ ] What regulations apply?
   - [ ] What could competitors/others do?

   **What's Assumed Available?**
   - [ ] What resources are taken for granted?
   - [ ] What expertise is assumed learnable?
   - [ ] What support is assumed from others?
   - [ ] What access is assumed (land, permits, data)?
   - [ ] What technology is assumed to work?

2. **Stakeholder Blind Spot Check**
   - [ ] Who could support this project (not mentioned)?
   - [ ] Who could oppose this project (not considered)?
   - [ ] Who needs to approve or permit (overlooked)?
   - [ ] Who else is doing similar work (competition)?
   - [ ] Who has veto power (not acknowledged)?

3. **Temporal Blind Spot Check**
   - [ ] What seasonal factors matter?
   - [ ] What phases of moon/tide/migration matter?
   - [ ] What holidays/vacation periods affect timeline?
   - [ ] What fiscal year or funding cycles apply?
   - [ ] What regulatory deadlines exist?

4. **Expertise Blind Spot Check**
   - [ ] What skills are needed but not available?
   - [ ] What professional services required (legal, accounting, etc.)?
   - [ ] What technical knowledge is assumed?
   - [ ] What local knowledge is needed?
   - [ ] What languages are required?

### Outputs
- Categorized blind spot list
- Overlooked stakeholder identification
- Hidden dependencies surfaced
- Expertise gap analysis
- Temporal/seasonal factors noted

---

## Phase 5: Scenario Analysis (45-60 minutes)

### Objectives
- Model best, realistic, and worst case scenarios
- Calculate probabilities for each scenario
- Develop contingency plans
- Prepare decision trees

### Steps

1. **Best Case Scenario Development**
   - [ ] Assume everything works as planned
   - [ ] Map timeline: When does each milestone hit?
   - [ ] Calculate outcome: What's achieved and when?
   - [ ] Estimate probability: How likely is this? (typically 5-15%)
   - [ ] Note assumptions: What must all go right?

2. **Realistic Scenario Development**
   - [ ] Assume typical delays and obstacles
   - [ ] Add buffer to timelines (25-50% typical)
   - [ ] Increase budgets by contingency (10-20%)
   - [ ] Account for learning curves and mistakes
   - [ ] Model timeline: When do milestones actually hit?
   - [ ] Calculate adjusted outcome
   - [ ] Estimate probability: How likely? (typically 60-80%)
   - [ ] List expected obstacles and how to handle

3. **Worst Case Scenario Development**
   - [ ] Assume major components fail
   - [ ] Model: What if funding falls through?
   - [ ] Model: What if key person quits?
   - [ ] Model: What if land acquisition fails?
   - [ ] Model: What if permits denied?
   - [ ] Calculate impact: Can project survive?
   - [ ] Estimate probability: How likely? (typically 15-35%)
   - [ ] Develop contingency: What's Plan B?

4. **Scenario Comparison**
   - [ ] Create table comparing all three scenarios
   - [ ] Note decision points where paths diverge
   - [ ] Identify early warning indicators
   - [ ] Determine when to pivot or abort
   - [ ] Document triggers for contingency plans

5. **Contingency Planning**
   - [ ] For each worst-case element, create Plan B
   - [ ] Identify what can be pre-prepared
   - [ ] Note what would trigger contingency activation
   - [ ] Estimate cost/time of contingency plans
   - [ ] Validate project viability even in worst case

### Outputs
- Three complete scenarios with timelines and outcomes
- Probability estimates for each scenario
- Decision tree showing branching points
- Early warning indicators identified
- Contingency plans for worst-case elements
- Scenario comparison table

---

## Phase 6: Feasibility Test (30-45 minutes)

### Objectives
- Validate timelines are achievable
- Verify budgets are adequate
- Assess team capacity vs workload
- Test critical path dependencies

### Steps

1. **Timeline Feasibility**
   - [ ] For each major task, estimate actual time required
   - [ ] Add up all task hours
   - [ ] Compare to available time (team capacity × time period)
   - [ ] Check if timeline is: Comfortable / Tight / Unrealistic
   - [ ] Account for parallel vs sequential work
   - [ ] Include waiting/approval periods
   - [ ] Add buffer for unknowns (25-50%)
   - [ ] Compare to similar project benchmarks
   - [ ] Flag aggressive timelines requiring validation

2. **Budget Feasibility**
   - [ ] Break down each major cost category
   - [ ] Research actual market rates
   - [ ] Get quotes where possible
   - [ ] Sum total costs
   - [ ] Add contingency (10-20%)
   - [ ] Compare to available funding
   - [ ] Calculate funding gap if exists
   - [ ] Assess: Adequate / Tight / Insufficient
   - [ ] Identify cost categories that could expand

3. **Resource Feasibility**
   - [ ] List all required expertise and skills
   - [ ] Assess current team capabilities
   - [ ] Identify gaps: Critical / Important / Nice-to-have
   - [ ] Estimate cost to fill gaps (hire, contract, train)
   - [ ] Check if resources can be obtained when needed
   - [ ] Assess: Available / Obtainable / Unrealistic
   - [ ] Note which resources are on critical path

4. **Dependency Feasibility**
   - [ ] Map all critical dependencies
   - [ ] Categorize: Internal control / External / Unknown
   - [ ] For each external dependency:
     - Who controls it?
     - What's their incentive to support?
     - What's backup if they don't?
   - [ ] Count single points of failure
   - [ ] Assess overall dependency risk: Low / Medium / High

5. **Workload Reality Check**
   - [ ] Calculate total person-hours required
   - [ ] Assess available person-hours (team size × time × availability)
   - [ ] Calculate workload ratio (required / available)
   - [ ] If > 1.0, plan is infeasible without changes
   - [ ] If 0.8-1.0, plan is very tight with no buffer
   - [ ] If 0.5-0.8, plan is feasible with normal buffer
   - [ ] If < 0.5, plan is comfortable or team underutilized

### Outputs
- Timeline feasibility assessment with specific concerns
- Budget feasibility assessment with gap analysis
- Resource feasibility with capability gaps identified
- Dependency map with risk ratings
- Workload analysis showing required vs available capacity
- Overall feasibility rating: Feasible / Tight / Needs Adjustment / Unrealistic

---

## Phase 7: Report Generation (45-60 minutes)

### Objectives
- Synthesize all findings
- Calculate Strategic Soundness Score
- Prioritize challenges and recommendations
- Create actionable output

### Steps

1. **Compile Findings**
   - [ ] Gather all analysis outputs from Phases 2-6
   - [ ] Organize by priority (Critical → High → Medium → Low)
   - [ ] Group related findings
   - [ ] Eliminate redundant points

2. **Calculate Strategic Soundness Score**

   **Assumption Validity (25 points)**
   - 25 pts: All assumptions validated with evidence
   - 20 pts: Most assumptions reasonable, few need validation
   - 15 pts: Several assumptions questionable
   - 10 pts: Many assumptions lack evidence
   - 5 pts: Core assumptions problematic

   **Risk Management (25 points)**
   - 25 pts: All major risks identified with mitigation plans
   - 20 pts: Most risks identified, plans exist
   - 15 pts: Key risks noted but mitigation incomplete
   - 10 pts: Significant risks overlooked
   - 5 pts: Risk management inadequate

   **Scenario Preparedness (20 points)**
   - 20 pts: Complete scenarios with contingencies
   - 15 pts: Scenarios modeled, some contingencies
   - 10 pts: Limited scenario thinking
   - 5 pts: Only best case considered

   **Strategic Alignment (15 points)**
   - 15 pts: Perfect coherence across all documents
   - 12 pts: Minor inconsistencies
   - 9 pts: Some contradictions or misalignment
   - 6 pts: Significant alignment issues
   - 3 pts: Strategic incoherence

   **Feasibility (15 points)**
   - 15 pts: Realistic timelines, budgets, resources
   - 12 pts: Tight but feasible
   - 9 pts: Optimistic, needs adjustment
   - 6 pts: Unrealistic in multiple areas
   - 3 pts: Infeasible without major changes

   - [ ] Calculate total score (0-100)
   - [ ] Interpret score and overall assessment

3. **Write Executive Summary**
   - [ ] 2-3 sentences on strategic soundness
   - [ ] Note Strategic Soundness Score
   - [ ] Highlight top 1-2 concerns
   - [ ] State key recommendation

4. **Document Critical Challenges**
   - [ ] For each critical challenge:
     - Current assumption
     - Why it might fail
     - Potential impact
     - Recommended action
   - [ ] Prioritize by impact × probability

5. **List Blind Spots**
   - [ ] For each blind spot:
     - What's missing
     - Why it matters
     - How to address

6. **Present Scenario Analysis**
   - [ ] Include all three scenarios
   - [ ] Show probabilities
   - [ ] Highlight decision points
   - [ ] Present contingency plans

7. **Provide Feasibility Assessment**
   - [ ] Timeline assessment
   - [ ] Budget assessment
   - [ ] Resource assessment
   - [ ] Overall feasibility rating

8. **Create Tough Questions List**
   - [ ] List 5-10 critical questions requiring answers
   - [ ] Explain why each matters
   - [ ] Note who should answer or research needed

9. **Make Strategic Recommendations**
   - [ ] Immediate actions (next 2 weeks)
   - [ ] Short-term strengthening (1-3 months)
   - [ ] Long-term considerations

10. **Format Report**
    - [ ] Use standard template (see `_templates/strategic_challenge_report.md`)
    - [ ] Include all required sections
    - [ ] Add specific examples and evidence
    - [ ] Keep constructive and actionable

### Outputs
- Complete Strategic Challenge Report
- Strategic Soundness Score calculated and explained
- Prioritized recommendations
- Specific tough questions to answer

---

## Phase 8: Task Creation (15-30 minutes)

### Objectives
- Convert findings into actionable tasks
- Prioritize by urgency and impact
- Assign to appropriate personas or team members
- Set deadlines and dependencies

### Steps

1. **Create Critical Tasks**
   - [ ] For each critical challenge, create task
   - [ ] Use standard task template (SAV-YYYY-MM-DD-###)
   - [ ] Set priority: CRITICAL
   - [ ] Define clear validation or action needed
   - [ ] Assign deadline (usually immediate)

2. **Create High Priority Tasks**
   - [ ] For each high-priority finding, create task
   - [ ] Set priority: HIGH
   - [ ] Define specific research or validation needed
   - [ ] Note dependencies
   - [ ] Assign reasonable deadline

3. **Create Medium/Low Tasks**
   - [ ] For improvement opportunities, create tasks
   - [ ] Set appropriate priority
   - [ ] Can be batched or scheduled for later
   - [ ] Note as long-term initiatives if appropriate

4. **Coordinate with Other Personas**
   - [ ] Identify tasks for Knowledge Synthesizer (research needed)
   - [ ] Identify tasks for Implementation Coach (playbook validation)
   - [ ] Identify tasks for Stakeholder Advocate (stakeholder analysis)
   - [ ] Identify tasks for Curator (document consistency)

5. **Save Tasks**
   - [ ] Save to task queue: `_vault_maintenance/tasks/queue/`
   - [ ] Update state file with task count
   - [ ] Note tasks in strategic review report

### Outputs
- Complete set of actionable tasks
- Tasks properly prioritized and categorized
- Tasks assigned to appropriate personas
- Task dependencies noted

---

## Phase 9: Follow-up & Monitoring (Ongoing)

### Objectives
- Track progress on strategic tasks
- Monitor early warning indicators
- Update strategy as needed
- Schedule next review

### Steps

1. **Update State File**
   - [ ] Record analysis date and findings
   - [ ] Update Strategic Soundness Score
   - [ ] Note tasks generated
   - [ ] Update metrics tracking table
   - [ ] Record key insights for next review

2. **Set Monitoring Plan**
   - [ ] Identify early warning indicators to watch
   - [ ] Set check-in dates for critical assumptions
   - [ ] Schedule validation research
   - [ ] Note external events that could change assessment

3. **Schedule Next Review**
   - [ ] Quarterly strategic reviews (standard)
   - [ ] Ad-hoc review if major changes
   - [ ] Pre-decision review before major commitments
   - [ ] Define focus areas for next review

4. **Communicate Findings**
   - [ ] Share report with project leadership
   - [ ] Present findings if needed
   - [ ] Answer clarifying questions
   - [ ] Facilitate strategic discussion

5. **Track Action Items**
   - [ ] Monitor completion of strategic tasks
   - [ ] Check if assumptions were validated
   - [ ] Verify contingency plans developed
   - [ ] Note if strategic adjustments made

### Outputs
- Updated state file
- Monitoring plan with indicators and check-in dates
- Next review scheduled
- Communication of findings complete

---

## Success Criteria

A successful strategic review achieves:

- ✅ All major assumptions identified and challenged
- ✅ 3-5 significant blind spots surfaced
- ✅ Three complete scenarios modeled (best/realistic/worst)
- ✅ Feasibility assessment across time/budget/resources
- ✅ Strategic Soundness Score calculated
- ✅ 5-10 tough questions requiring answers
- ✅ Actionable recommendations prioritized
- ✅ No fatal flaws overlooked
- ✅ Tasks created for all critical findings
- ✅ State file updated with insights

---

## Common Pitfalls to Avoid

1. **Being Too Negative**: Challenge to strengthen, not discourage
2. **Nitpicking Details**: Focus on strategic significance, not minutiae
3. **Ignoring Context**: Consider project stage and resources
4. **Missing Strengths**: Note what's working well, not just problems
5. **Vague Criticism**: Be specific and actionable
6. **Paralysis by Analysis**: Set scope and time-box review
7. **Forgetting Probability**: Not just "what could go wrong" but "how likely"
8. **No Solutions**: Always suggest alternatives, not just problems

---

## Templates & Tools

- **Strategic Challenge Report Template**: `_templates/strategic_challenge_report.md`
- **Scenario Analysis Template**: `_templates/scenario_analysis.md`
- **State File**: `_vault_maintenance/state/strategic_advisor_state.md`
- **Task Template**: In persona definition file

---

## Integration with Other Workflows

**Before This Workflow**:
- Janitor organizes documents
- Curator ensures content quality
- Auditor verifies completeness

**After This Workflow**:
- Knowledge Synthesizer provides evidence for assumptions
- Implementation Coach validates execution feasibility
- Stakeholder Advocate checks stakeholder alignment

**Triggers for This Workflow**:
- Quarterly calendar reminder
- Major strategic decision pending
- New strategic document created
- External environment changes
- Stakeholder or persona raises strategic concern

---

## Notes

The Strategic Advisor workflow is intentionally rigorous and challenging. The goal is to identify weaknesses before they become failures, validate assumptions before they're tested by reality, and prepare contingencies before they're needed.

Remember: **Strong strategies welcome strong challenges. Weak strategies reveal themselves early when challenged.**

Use this workflow to strengthen and validate strategy, ensuring the project succeeds not through luck but through robust planning that survives contact with reality.
