---
task_id: AUD-2025-11-10-001
created_by: Auditor
created_date: 2025-11-10
priority: CRITICAL
category: consistency
status: completed
completed_date: 2025-11-10
completed_by: Auto (AI Assistant)
---

# Align gGmbH Cost and Legal Structure Messaging

## Description

`30_Business_Model.md` still recommends forming a gGmbH in Year 2 and states formation costs of **€1,000-3,000**, even though both `10_Organizational_Structure.md` and `13_Legal_Framework.md` document the legally mandated **€25,000 share capital** plus **€3,000-8,000 setup fees** (total €28,000-35,000). This reintroduces the €37k contradiction that v2.0 was supposed to resolve.

## Current State

- `30_Business_Model.md` (L1104-L1123) → gGmbH recommended with €1-3k formation cost  
- `10_Organizational_Structure.md` (L100-L114) → gGmbH requires €40k+ and is deferred until later phases  
- `13_Legal_Framework.md` (L80-L87) → Confirms €28k-35k total initial capital requirement  
- `ROADMAP.md` (L33-L36) still lists “Legal structure cost contradiction” as an open blocker because of this mismatch

## Desired State

- Year 1 plan clearly states **no gGmbH formation** until the project can afford €30k+ capital (e.g., Year 3-5)
- Recommended legal structure for bootstrap phase updated to e.V. (Germany) or equivalent association in chosen country
- All legal cost figures aligned across `30`, `10`, `13`, `32`, and supporting docs
- Roadmap blocker can be marked resolved once messaging is consistent

## Action Required

1. Update `30_Business_Model.md` “Legal Structure & Tax Status” section to:
   - Recommend e.V. (or association) for Year 1 bootstrap operations
   - Move gGmbH discussion to “future scaling” with full €28-35k cost breakdown
   - Clarify Year 1 operates informally or under e.V. depending on location
2. Cross-check `32_Funding_Strategy.md`, `43_Operations_Action_Plan.md`, and any other docs referencing “Begin gGmbH registration” so Year 1 tasks match the updated plan.
3. Ensure the corrected costs match the numbers in `10_Organizational_Structure.md` and `13_Legal_Framework.md`.
4. Update `ROADMAP.md` blockers once the contradiction is removed.

## Impact

- Restores financial credibility of the bootstrap plan  
- Prevents underestimating legal startup costs by €37k  
- Enables funders to trust the budget and legal roadmap  
- Clears a critical blocker identified in the roadmap

## Affected Files

- `30_Business_Model.md`
- `32_Funding_Strategy.md`
- `43_Operations_Action_Plan.md`
- `10_Organizational_Structure.md`
- `13_Legal_Framework.md`
- `ROADMAP.md`

## Verification Criteria

- “Formation Costs” in `30_Business_Model.md` reflect €28-35k (or remove cost if gGmbH deferred)  
- Year 1 plan recommends e.V./association or informal partnership, not gGmbH  
- No documents suggest gGmbH can be created for €1-3k in Year 1-2  
- Roadmap blocker removed or marked resolved with supporting notes

## Notes

Confirm whether the team intends to pursue e.V. (Germany) or an association in the final location so messaging stays consistent once location is chosen.

