---
task_id: AUD-2025-11-10-002
created_by: Auditor
created_date: 2025-11-10
priority: HIGH
category: consistency
status: queued
---

# Replace Overly Concrete Numbers with Adaptive Terms

## Description

The documentation contains many specific numbers (€20-30k, 1 hectare, 1-2 founders, 12-18 months) that create false precision for a project still in exploration phase. While these provide useful guidance, they can create unrealistic expectations and reduce flexibility. This audit identifies overly concrete numbers and prepares adaptive replacements that maintain useful ranges while emphasizing flexibility.

## Philosophy: Adaptive vs Concrete

**Current Problem**: Specific numbers like "€20-30k" or "1 hectare" read as fixed targets rather than adaptive ranges.

**Solution**: Replace with broader adaptive language that:
- Maintains useful ranges for planning
- Emphasizes "depends on opportunities and constraints"
- Uses phrases like "approximately", "typically", "target range", "varies based on"
- Separates minimum viable from ideal scenarios

## Categories of Overly Concrete Numbers

### Category 1: Budget Numbers (HIGH PRIORITY)

**Current Concrete Language:**
- "€20-30k Year 1 budget"
- "€25,000 (standard bootstrap scenario)"
- "€8-15k crowdfunding"
- "€5-10k friends & family"

**Adaptive Replacements:**
- "Approximately €20-30k Year 1 budget range (varies by funding pathway and location)"
- "Target range of €20-30k (minimum viable: €8-12k, ideal: €25-35k)"
- "Crowdfunding target: €8-15k range (actual amount depends on campaign success)"
- "Friends & family: €5-10k range (varies by network size and commitment)"

**Files Affected:**
- `01_Executive_Summary.md` (multiple instances)
- `30_Business_Model.md` (budget tables)
- `32_Funding_Strategy.md` (funding targets)
- `42_Adaptive_Timeline.md` (cost estimates)

---

### Category 2: Land Area (MEDIUM PRIORITY)

**Current Concrete Language:**
- "1 hectare pilot site"
- "1-hectare Year 1 pilot"
- "Expand to 2-5 hectares"

**Adaptive Replacements:**
- "Small pilot site (approximately 1 hectare, may vary based on available land and budget)"
- "Year 1 pilot: small-scale site (typically 0.5-1.5 hectares, depending on opportunity)"
- "Future expansion: moderate scale (2-5 hectares if results and funding justify)"

**Files Affected:**
- `01_Executive_Summary.md`
- `00_Eco_Balance_Hub.md`
- `20_Restoration_Methodology.md`
- `44_Site_Selection_Land_Acquisition.md`

---

### Category 3: Team Size (MEDIUM PRIORITY)

**Current Concrete Language:**
- "1-2 founders"
- "1-2 person founder team"
- "Core team: 1-2 founders"

**Adaptive Replacements:**
- "Small founder team (typically 1-2 people, may expand if additional committed founders join)"
- "Lean founder team (1-2 people initially, scales as project grows)"
- "Core team: small founder group (1-2 people, with potential for additional members if opportunities arise)"

**Files Affected:**
- `01_Executive_Summary.md`
- `12_Team_Roles.md`
- `43_Operations_Action_Plan.md`

---

### Category 4: Timelines (HIGH PRIORITY)

**Current Concrete Language:**
- "12-18 months baseline"
- "6-9 months fast track"
- "24-36 months ultra-lean"
- "Month 4-6 decision point"

**Adaptive Replacements:**
- "Approximately 12-18 months baseline (timeline adapts to funding, opportunities, and constraints)"
- "Faster pathway: 6-9 months if major funding secured early (optimistic scenario)"
- "Extended pathway: 24-36 months if ultra-lean approach (conservative scenario)"
- "Decision timeline: Months 4-6 target (may accelerate or extend based on what emerges)"

**Files Affected:**
- `01_Executive_Summary.md`
- `04_Current_Status_Assessment.md`
- `42_Adaptive_Timeline.md`

---

### Category 5: Specific Technology Costs (MEDIUM PRIORITY)

**Current Concrete Language:**
- "3-5 kW solar system (€8-15k)"
- "Rainwater harvesting (€500-1k)"
- "Tiny house (€6-10k)"

**Adaptive Replacements:**
- "Solar system: 3-5 kW range (cost approximately €8-15k, varies by location, installation approach, and equipment choices)"
- "Rainwater harvesting: basic setup (approximately €500-1k, scales with needs and budget)"
- "Housing: tiny house or caravan (approximately €6-10k, varies by condition, size, and DIY vs purchase)"

**Files Affected:**
- `21_Technology_Integration.md`
- `30_Business_Model.md`
- `45_Tiny_House_and_Living_Infrastructure.md`

---

### Category 6: Revenue Projections (MEDIUM PRIORITY)

**Current Concrete Language:**
- "Revenue Year 2: €2-5k"
- "Revenue Year 3: €5-12k"
- "€15-30k/year from diverse streams"

**Adaptive Replacements:**
- "Year 2 revenue target: €2-5k range (depends on workshop demand, consulting opportunities, and early partnerships)"
- "Year 3 revenue target: €5-12k range (scales with proven results and market interest)"
- "Revenue goal: €15-30k/year range (varies significantly by location, partnerships, and market conditions)"

**Files Affected:**
- `30_Business_Model.md`
- `40_Expansion_Growth_Strategy.md`

---

### Category 7: Community/Volunteer Numbers (LOW PRIORITY)

**Current Concrete Language:**
- "200-300 email list"
- "50-100 small donors"
- "30-50 volunteers/year"

**Adaptive Replacements:**
- "Email list: build to 200-300 range (actual size depends on outreach success and campaign momentum)"
- "Donor base: target 50-100 small donors (varies by network size and campaign reach)"
- "Volunteer engagement: aim for 30-50 participants/year (depends on community interest and project visibility)"

**Files Affected:**
- `32_Funding_Strategy.md`
- `60_Marketing_Communications_Strategy.md`

---

## Replacement Strategy

### Phase 1: High-Impact Documents (Priority Order)

1. **01_Executive_Summary.md** - First document readers see
2. **00_Eco_Balance_Hub.md** - Main navigation hub
3. **30_Business_Model.md** - Financial credibility
4. **32_Funding_Strategy.md** - Funding expectations
5. **42_Adaptive_Timeline.md** - Timeline expectations

### Phase 2: Supporting Documents

6. **04_Current_Status_Assessment.md**
7. **20_Restoration_Methodology.md**
8. **21_Technology_Integration.md**
9. **44_Site_Selection_Land_Acquisition.md**

### Replacement Pattern

**Before (Concrete):**
```markdown
Year 1 Capital Required: €20,000 - €30,000
```

**After (Adaptive):**
```markdown
Year 1 Capital Target: Approximately €20,000 - €30,000 (varies by funding pathway, location, and land acquisition approach)
```

**Before (Concrete):**
```markdown
1-hectare pilot site
```

**After (Adaptive):**
```markdown
Small pilot site (typically 0.5-1.5 hectares, final size depends on available land and budget)
```

**Before (Concrete):**
```markdown
12-18 months baseline
```

**After (Adaptive):**
```markdown
Approximately 12-18 months baseline timeline (adapts to funding availability, opportunities, and constraints)
```

## Impact

**Benefits:**
- ✅ Reduces false precision in exploration phase
- ✅ Maintains useful planning ranges
- ✅ Emphasizes adaptive, opportunity-driven approach
- ✅ Prevents unrealistic expectations
- ✅ Aligns with "Vision, Reality, Planning" framework

**Risks to Manage:**
- ⚠️ Don't make numbers so vague they lose all meaning
- ⚠️ Keep ranges useful for planning
- ⚠️ Maintain consistency across documents
- ⚠️ Ensure funders still get clear budget guidance

## Verification Criteria

Task complete when:
- [ ] Budget numbers include "approximately", "target range", or "varies by" language
- [ ] Land areas qualified with "typically", "approximately", or "depends on"
- [ ] Team sizes acknowledge potential variation
- [ ] Timelines emphasize adaptability
- [ ] Technology costs include variability factors
- [ ] Revenue projections acknowledge uncertainty
- [ ] All changes maintain useful planning ranges
- [ ] Documents still provide actionable guidance

## Notes

**Balance Required**: This is about making numbers more adaptive, not removing them entirely. Ranges like "€20-30k" are still useful - we just need to frame them as targets that adapt to reality, not fixed commitments.

**Context Matters**: Some numbers should stay concrete (e.g., legal entity costs are fixed by law). Others need flexibility (e.g., land size depends on what's available).

**User Intent**: The user wants to separate vision from reality from planning. Concrete numbers in planning documents can create false precision when reality is still uncertain.

---

**Status**: Queued, ready for execution  
**Priority**: HIGH - Affects credibility and flexibility messaging  
**Estimated Effort**: MODERATE (2-3 hours for strategic documents)

