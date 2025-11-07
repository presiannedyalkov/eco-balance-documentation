# 🎭 CURATOR FIX TASKS

**Persona**: Curator
**Focus**: Issues found during Curator's content quality, coherence, and v2.0 compliance audits
**Total Issues Found**: 12
**Status**: All documented, awaiting Phase 2 (Fix phase) to begin
**Version**: 2.0.0 (Bootstrap Model)

---

## 📋 PURPOSE

This file contains **only** the fix tasks discovered by the **CURATOR** persona during audit, extracted from the master FIX_TASKS.md to prevent merge conflicts when multiple personas work simultaneously.

**Important**: This is PHASE 2 work. Do NOT start fixes until the full vault audit is 100% complete.

---

## 🚨 WORKFLOW INSTRUCTIONS

### For Curator Persona (During Fix Phase)

1. **Wait for audit complete**: Check that all personas have finished their audits
2. **Work by priority**: CRITICAL → HIGH → MEDIUM → LOW
3. **Fix one task at a time**: Make changes, verify, mark complete
4. **Update this file**: Change status to `[x] Complete (Date: 2025-11-XX)`
5. **Create merge request** after completing each fix

### Merge Strategy

When ready to merge:
- Your branch will only modify THIS file (FIX_TASKS_CURATOR.md) and the files being fixed
- Other personas modify their own fix files
- Reduced merge conflicts!

---

## 📊 FIX TASKS BY PRIORITY

### 🚨 CRITICAL PRIORITY

None - All Curator-found issues are HIGH, MEDIUM, or LOW priority

---

### 🔴 HIGH PRIORITY

### ⚠️ FIX-024: Fix Broken Cross-Reference to 22_Research_Framework

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🔴 HIGH
**Task ID**: CUR-2025-11-07-024
**Found By**: Curator during Step 3 audit of Methodology & Business Docs

**Files**: Multiple files linking to "22_Research_Framework"

**Issue**:
Links throughout vault reference `[[22_Research_Framework]]` but the actual file is named `22_Restoration_Challenges_Solutions.md`. This creates broken navigation.

**Files Affected** (known):
- 01_Executive_Summary.md
- 02_Project_Vision.md
- 03_Success_Factors.md
- 04_Current_Status_Assessment.md
- Potentially others

**Current State**:
- File exists: ✅ `22_Restoration_Challenges_Solutions.md`
- Links point to: ❌ `22_Research_Framework.md` (doesn't exist)
- Result: All links broken

**Fix Options** (Choose one):

**Option A: Rename File to Match Links**
- Rename `22_Restoration_Challenges_Solutions.md` → `22_Research_Framework.md`
- Advantage: Fixes all links immediately, no link updates needed
- Disadvantage: File name may not accurately describe content

**Option B: Update All Links to Match File**
- Find all instances of `[[22_Research_Framework]]`
- Replace with `[[22_Restoration_Challenges_Solutions]]`
- Update link text if needed
- Advantage: File name remains accurate
- Disadvantage: Must update multiple files

**Option C: Both Files Needed (Create Missing Doc)**
- Current file is about challenges/solutions (keep as is)
- Create NEW `22_Research_Framework.md` for research methodology
- Update links based on which doc they should reference
- Advantage: Both topics covered properly
- Disadvantage: More work, must determine link destinations

**Recommendation**: Option B (update links) - File name "Restoration_Challenges_Solutions" likely describes content better than "Research_Framework". Update all links to match actual file.

**Search Command**:
```bash
grep -r "22_Research_Framework" /home/user/eco-balance-documentation/ --include="*.md"
```

**Verification**:
- [ ] All links to doc 22 functional
- [ ] Link text accurately describes destination
- [ ] File name matches content
- [ ] No broken references remaining

**Related Tasks**:
- Similar to FIX-005, FIX-006, FIX-007, FIX-008 (cross-reference fixes)
- Part of systematic link cleanup

---

### ⚠️ FIX-025: Site Selection Implementation Files Contain v1.0 Large-Scale Budget Assumptions

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🔴 HIGH
**Task ID**: CUR-2025-11-07-025
**Found By**: Curator during Step 5 Group 1 audit of Implementation Tasks

**Files**:
- `implementation_tasks/site_selection/00_Site_Selection_Overview.md`
- `implementation_tasks/site_selection/02_Evaluate_Land_Condition.md`
- `implementation_tasks/site_selection/03_Estimate_Restoration_Potential.md`
- `implementation_tasks/site_selection/04_Consider_Accessibility.md`

**Issue**:
Site selection implementation files contain budget assumptions and cost estimates from v1.0 Large-Scale Model that are incompatible with v2.0 Bootstrap Model budget constraints.

**Specific Problems**:

**File 00 (Overview)**:
- Line 158: "€17,000-50,000 before purchase" for site selection process
- Line 159: "€2,000-20,000/hectare" land acquisition cost
- These are v1.0 assumptions for evaluating multiple 5-10 ha sites

**File 02 (Evaluate Land Condition)**:
- Line 82: "€2,000-5,000 per site visit"
- Excessive for Bootstrap evaluating 3-5 sites with €20-30k total Y1 budget

**File 03 (Estimate Restoration Potential)**:
- Line 18: "€5,000-10,000/hectare" (Low difficulty)
- Line 26: "€10,000-20,000/hectare" (Medium difficulty)
- Line 34: "€20,000-40,000+/hectare" (High difficulty)
- These per-hectare costs are incompatible with €20-30k TOTAL Year 1 budget

**File 04 (Consider Accessibility)**:
- Line 198: "€30,000-100,000+ per building" for on-site accommodation
- Lines 195-206: All infrastructure costs scaled for v1.0 Large-Scale

**Fix Required**:

**Update all budget figures to v2.0 Bootstrap scale:**

**File 00 - Site Selection Overview**:
- Line 158: Change to "€1,000-3,000 before purchase" (desktop research, 1-2 site visits)
- Line 159: Update to "€2,000-15,000/hectare (or lease options)" with note about Bootstrap targeting 1 ha
- Add context: "For Bootstrap Model: Simplified site selection focusing on 1 hectare pilot within €20-30k Year 1 budget"

**File 02 - Evaluate Land Condition**:
- Line 82: Change to "€500-1,500 per site visit" (founders conducting assessment, minimal lab tests)
- Add note: "Bootstrap approach: Founders conduct assessments with expert consultation as needed"

**File 03 - Estimate Restoration Potential**:
- Update cost framework to reflect Bootstrap 1 ha pilot:
  - Low difficulty: "€3,000-5,000 total for 1 ha Bootstrap pilot"
  - Medium difficulty: "€5,000-8,000 total for 1 ha Bootstrap pilot"
  - High difficulty: "€8,000-12,000 total for 1 ha Bootstrap pilot"
- Add prominent note: "These figures are for v2.0 Bootstrap Model (1 ha pilot, €20-30k Year 1 total budget including land, infrastructure, and operations)"

**File 04 - Consider Accessibility**:
- Line 198: Change to "€8,000-12,000 for DIY tiny house (Bootstrap Model)"
- Lines 195-206: Update ALL infrastructure costs to Bootstrap scale:
  - Road improvements: "€500-2,000 minor improvements if needed"
  - Grid electricity: "Off-grid solar (€3-5k) recommended for Bootstrap"
  - Well drilling: "€1,000-5,000 or rainwater harvesting"
  - Internet: "€0-500 (mobile hotspot or satellite)"
- Add section: "Bootstrap Model Accessibility: Focus on sites with basic access already present to minimize infrastructure investment"

**General Updates to All Files**:
- Add Bootstrap context boxes where budget figures appear
- Reference [[30_Business_Model|Business Model]] for v2.0 budget framework
- Note that larger-scale costs apply to post-pilot expansion phases

**Verification**:
- [ ] All budget figures compatible with €20-30k Year 1 Bootstrap budget
- [ ] 1 hectare pilot scale reflected in all estimates
- [ ] Founder-level operations assumed (not large team)
- [ ] Bootstrap context clearly noted where relevant
- [ ] Cross-references to v2.0 compliant docs (30, 32, 42, 43) included

**Related Tasks**:
- FIX-001 through FIX-004 (Strategic docs conversion)
- FIX-009 through FIX-012 (Organizational docs conversion)
- Part of systematic v2.0 Bootstrap alignment

---

### ⚠️ FIX-027: Site Selection Shortlist File Contains v1.0 Scale Assumption (5-10 ha vs 1 ha)

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🔴 HIGH
**Task ID**: CUR-2025-11-07-027
**Found By**: Curator during Step 5 Group 2 audit of Implementation Tasks

**File**: `implementation_tasks/site_selection/08_Make_Shortlist.md`

**Issue**:
File contains critical v1.0 Large-Scale assumption about site size in the essential criteria section. States "5-10 ha for Year 1" when v2.0 Bootstrap Model is 1 hectare pilot.

**Specific Problem**:
- Line 53: "**Size Appropriate:** Meets minimum size requirements (5-10 ha for Year 1)"
- This is in the "Essential Criteria (Must-Haves)" section for site selection
- States wrong scale entirely - v2.0 Bootstrap is 1 ha pilot, NOT 5-10 ha

**Impact**:
- Fundamental misalignment with v2.0 Bootstrap Model
- Could lead to selecting wrong-sized sites
- 5-10 ha is v1.0 Large-Scale approach
- Would require significantly higher budget (€50-500k vs €20-30k Year 1)

**Fix Required**:

**Line 53 - Change Essential Criterion**:

Change:
```markdown
- [ ] **Size Appropriate:** Meets minimum size requirements (5-10 ha for Year 1)
```

To:
```markdown
- [ ] **Size Appropriate:** 1 hectare for Bootstrap pilot (v2.0 Model)
```

**Add Context Note** (after line 53 or in new section):

Add clarification about Bootstrap scale:
```markdown
**Bootstrap Model Site Size:**
- Year 1-3: 1 hectare pilot site (prove the model)
- Post-pilot: If successful, consider 5-10 ha replication sites
- Focus: Validation at small scale, not immediate large-scale operation
- Budget: 1 ha site fits within €20-30k Year 1 budget
```

**Review Throughout Document**:
- Check other size references in the file
- Line 241: "Size: [Hectares, with breakdown of terrain types]" - add note about 1 ha target
- Ensure scoring examples reflect 1 ha scale
- Update any cost estimates that assume 5-10 ha

**Verification**:
- [ ] Line 53 states "1 hectare" for Bootstrap pilot
- [ ] No references to "5-10 ha for Year 1" remain
- [ ] Bootstrap scale context clearly explained
- [ ] Consistent with v2.0 compliant docs (30, 32, 42, 43, 44)
- [ ] Site size aligns with €20-30k Year 1 budget

**Related Tasks**:
- FIX-001 through FIX-004 (Strategic docs v2.0 conversion)
- FIX-025 (Site selection budget issues)
- Part of systematic v2.0 Bootstrap scale alignment

---

### ⚠️ FIX-030: Protected Areas File Uses 50 Hectare Example (Should Be 1 Hectare Bootstrap)

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🔴 HIGH
**Task ID**: CUR-2025-11-07-030
**Found By**: Curator during Step 5 Group 5 audit of Implementation Tasks

**File**: `implementation_tasks/biodiversity/03_Create_Protected_Areas.md`

**Issue**:
File contains detailed example using 50-hectare site instead of 1 hectare Bootstrap Model. Example is 50 times larger than v2.0 scale.

**Specific Problem**:
- Lines 478-533: "Example for 50-hectare Site:"
  - Zone allocation across 50 ha (8 ha core, 15 ha buffer, 20 ha restoration, 7 ha public)
  - Budget €10,700 for infrastructure (signage €3,500, fencing/barriers €2,000, trail work €4,000, camera traps €1,200)
  - This is completely incompatible with 1 ha Bootstrap Model
  - 50 ha is appropriate for post-pilot expansion, NOT Year 1 Bootstrap

**Impact**:
- Fundamental misalignment with v2.0 Bootstrap approach
- Budget examples 50x too large for Bootstrap site
- Could create unrealistic expectations about Bootstrap scope
- Examples should reflect 1 ha pilot scale

**Fix Required**:

**Lines 478-533 - Replace 50 Hectare Example**:

See FIX-030 in master FIX_TASKS.md for complete 1-hectare Bootstrap replacement example.

**Verification**:
- [ ] Example uses 1 hectare Bootstrap scale
- [ ] Zone allocations appropriate for small pilot site
- [ ] Budget compatible with €20-30k Year 1 Bootstrap budget
- [ ] Infrastructure realistic for 1-2 founders to implement
- [ ] Bootstrap context clearly noted
- [ ] Consistent with v2.0 compliant docs (30, 32, 42, 43)

**Related Tasks**:
- FIX-027 (File 08 site selection uses 5-10 ha assumption)
- FIX-031 (File 06 biodiversity monitoring uses 50 ha example)
- Part of systematic v2.0 Bootstrap scale alignment

---

## 🟡 MEDIUM PRIORITY

### ⚠️ FIX-026: Remove Deprecated AWG Technology Reference from Site Selection File

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🟡 MEDIUM
**Task ID**: CUR-2025-11-07-026
**Found By**: Curator during Step 5 Group 1 audit of Implementation Tasks

**File**: `implementation_tasks/site_selection/04_Consider_Accessibility.md`

**Issue**:
File contains reference to "Atmospheric Water Generation" (AWG), which is deprecated v1.0 Large-Scale technology. v2.0 Bootstrap Model uses rainwater harvesting instead.

**Specific Problem**:
- Line 59: "Atmospheric water generation feasibility → [[21_Technology_Integration|Technology]]"
- AWG was removed from v2.0 due to high cost (€15-30k), high energy requirements (3-5 kW continuous), and complexity
- v2.0 uses rainwater harvesting with IBC tanks (€500-2,000 total)

**Fix Required**:

**Line 59 - Replace AWG reference**:

Change:
```markdown
**Water:**
- Municipal water supply available?
- Well drilling required?
- Distance to nearest water source?
- Water quality testing needed?
- Atmospheric water generation feasibility → [[21_Technology_Integration|Technology]]
```

To:
```markdown
**Water:**
- Municipal water supply available?
- Well drilling required?
- Distance to nearest water source?
- Water quality testing needed?
- Rainwater harvesting potential (roof area, annual rainfall) → [[21_Technology_Integration|Technology]]
```

**Additional Context to Add** (after line 59):

Add a note in the Water section:
```markdown
**Bootstrap Model Water Strategy:**
- Primary: Rainwater harvesting (IBC tanks, €500-2k)
- Secondary: Well drilling if groundwater accessible (€1-5k)
- Tertiary: Municipal connection if available nearby
- Avoid: Atmospheric water generation (expensive, energy-intensive)
```

**Verification**:
- [ ] No AWG references remain in file
- [ ] Rainwater harvesting mentioned as v2.0 approach
- [ ] Cross-reference to Technology Integration doc (21) accurate
- [ ] Bootstrap water strategy clearly stated
- [ ] Consistent with 21_Technology_Integration.md (confirmed v2.0 compliant)

**Related Tasks**:
- Part of systematic removal of v1.0 AWG technology
- Related to FIX-025 (same file, budget issues)
- Complements v2.0 technology alignment

---

### ⚠️ FIX-028: Reforestation Seedling Sourcing File Uses 2 Hectare Examples (Should Be 1 Hectare)

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🟡 MEDIUM
**Task ID**: CUR-2025-11-07-028
**Found By**: Curator during Step 5 Group 3 audit of Implementation Tasks

**File**: `implementation_tasks/reforestation/02_Source_Seedlings.md`

**Issue**:
File contains calculation examples using 2 hectares instead of 1 hectare Bootstrap Model scale. Examples should reflect v2.0 Bootstrap approach.

**Specific Problems**:
- Lines 94-100: Example calculation uses "Area: 2 hectares"
  - "Total hectares: 2 hectares"
  - "Density: 1,000 trees/hectare"
  - "Base need: 2,000 seedlings"
  - Should use 1 hectare for Bootstrap examples

- Lines 102-107: Species breakdown based on 2,500 seedlings (2 ha + buffer)
- Lines 214-217: Budget example "For 2,000 seedlings" (2 ha scale)

**Fix Required**:

See FIX-028 in master FIX_TASKS.md for detailed fix instructions with updated calculations.

**Verification**:
- [ ] All examples use 1 hectare as baseline
- [ ] Seedling quantities reflect 1,000-1,250 range (with buffer)
- [ ] Budget estimates compatible with €20-30k Year 1 Bootstrap budget
- [ ] Bootstrap context clearly noted
- [ ] Consistent with 00_Reforestation_Overview.md (1,000-2,000 trees Year 1)

**Related Tasks**:
- Part of systematic v2.0 Bootstrap scale alignment
- Related to FIX-025, FIX-027 (other scale corrections)
- Ensures consistency with reforestation methodology

---

### ⚠️ FIX-029: Reforestation Monitoring and Management Files Use 2 Hectare Budget Examples

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🟡 MEDIUM
**Task ID**: CUR-2025-11-07-029
**Found By**: Curator during Step 5 Group 4 audit of Implementation Tasks

**Files**:
- `implementation_tasks/reforestation/05_Monitor_Growth.md`
- `implementation_tasks/reforestation/06_Long_Term_Management.md`

**Issue**:
Files contain budget examples using 2 hectares instead of 1 hectare Bootstrap Model scale. Multi-year budget projections should reflect v2.0 approach.

**Specific Problems**:

**File 05 (Monitor Growth)**:
- Lines 339-342: "Annual Monitoring Budget (2 hectares):"
  - Basic program: €2,000-4,000
  - Enhanced with technology: €5,000-10,000
  - Should reflect 1 hectare scale

**File 06 (Long Term Management)**:
- Lines 361-382: All annual management budget examples use "2 hectares"
  - Year 1-3: €5,000-11,000/year for 2 hectares
  - Year 4-7: €2,600-5,400/year for 2 hectares
  - Year 8+: €2,000-4,000/year for 2 hectares
  - 10-Year Total: €35,000-70,000 for 2 hectares
  - Should use 1 hectare for Bootstrap examples

**Fix Required**:

See FIX-029 in master FIX_TASKS.md for detailed budget updates and Bootstrap context notes.

**Verification**:
- [ ] All budget examples use 1 hectare as baseline
- [ ] Budget ranges compatible with Bootstrap financial model
- [ ] 10-year total reflects realistic 1 ha management costs
- [ ] Bootstrap context clearly noted
- [ ] Consistent with other reforestation files and business model (30)

**Related Tasks**:
- FIX-028 (File 02 uses 2 ha examples)
- Part of systematic v2.0 Bootstrap scale alignment
- All reforestation files have consistent 2 ha pattern that needs updating

---

### ⚠️ FIX-031: Biodiversity Monitoring File Uses 50 Hectare Example (Should Be 1 Hectare Bootstrap)

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🟡 MEDIUM
**Task ID**: CUR-2025-11-07-031
**Found By**: Curator during Step 5 Group 5 audit of Implementation Tasks

**File**: `implementation_tasks/biodiversity/06_Monitor_Biodiversity.md`

**Issue**:
File contains sample monitoring program using 50-hectare site instead of 1 hectare Bootstrap Model. Budget examples 50 times larger than appropriate for v2.0 scale.

**Specific Problem**:
- Lines 552-589: "For 50-hectare restoration site:"
  - Year 1: ~80 field days, €15,000
  - Years 2-5: ~50 field days/year, €10,000/year
  - Years 6+: ~30 field days/year, €7,000/year
  - 10-Year Total: ~€110,000 (~€11,000/year average)
  - 30 vegetation plots, 15 bird points, 20 cameras for 50 ha

**Fix Required**:

See FIX-031 in master FIX_TASKS.md for complete 1-hectare Bootstrap replacement example with founder-led monitoring approach.

**Verification**:
- [ ] Example uses 1 hectare Bootstrap scale
- [ ] Monitoring effort realistic for 1-2 founders
- [ ] Budget compatible with Bootstrap operational costs
- [ ] Founder-led approach emphasized
- [ ] Technology used to multiply capacity
- [ ] Bootstrap context clearly noted
- [ ] Consistent with biodiversity targets (50+ species Year 1)

**Related Tasks**:
- FIX-030 (File 03 uses 50 ha protected areas example)
- Part of systematic v2.0 Bootstrap scale alignment

---

### ⚠️ FIX-033: Clarify Bootstrap vs Phase 1 Terminology in 40_Expansion_Growth_Strategy.md

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🟡 MEDIUM
**Task ID**: CUR-2025-11-07-001
**Found By**: Curator during Step 4 audit (Growth & Operations 40-70)

**File**: `40_Expansion_Growth_Strategy.md`

**Issue**:
Document's "Phase 1" (Year 1) describes €250-500k budget and 3-4 person team, which are post-bootstrap scaling targets. This conflicts with v2.0 Bootstrap Model (€20-30k, 1-2 founders). The document is otherwise excellent but needs clearer distinction between "Bootstrap Phase" and "Phase 1" scaling.

**Specific Problems**:
- Line 11: "Phase 1: Foundation & Pilot (Year 1)" describes v1.0 scale, not v2.0 Bootstrap
- Line 24: "Purchase first 5-10 hectares" (should note Bootstrap = 1 ha, Phase 1 expansion = 5-10 ha)
- Line 66: "Core 3-4 person team in place" (Bootstrap = 1-2 founders)
- Line 68: "€250-500k secured" (Bootstrap Year 1 = €20-30k)
- Throughout: Need to clarify that "Phase 1" assumes successful bootstrap completion

**Fix Required**:

See FIX-033 in master FIX_TASKS.md for recommended approach to add Bootstrap Phase section and update terminology.

**Verification**:
- [ ] Clear distinction between Bootstrap (1 ha) and Phase 1 (5-10 ha)
- [ ] Bootstrap Phase section added or clearly referenced
- [ ] No confusion about which phase reader should focus on for Year 1
- [ ] Cross-references to Bootstrap docs (42, 43, 44) intact
- [ ] "Immediate Next Steps" section clarifies it's Bootstrap, not Phase 1

**Related Tasks**:
- Related to FIX-000 through FIX-004 (other v2.0 clarifications)
- Content otherwise excellent, just needs terminology clarity

---

### ⚠️ FIX-034: Align Year 1 Funding Goal in 60_Marketing_Communications_Strategy.md

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🟡 MEDIUM
**Task ID**: CUR-2025-11-07-002
**Found By**: Curator during Step 4 audit (Growth & Operations 40-70)

**File**: `60_Marketing_Communications_Strategy.md`

**Issue**:
Marketing strategy references "Year 1 Goal: €250-500k" which conflicts with v2.0 Bootstrap budget of €20-30k total for Year 1. This creates confusion about fundraising targets for the bootstrap phase.

**Specific Problem**:
- Line 70: "**Year 1 Goal**: €250-500k → See [[32_Funding_Strategy|Funding Strategy]]"

**Fix Required**:

Change line 70 from:
```markdown
- **Year 1 Goal**: €250-500k → See [[32_Funding_Strategy|Funding Strategy]]
```

To:
```markdown
- **Bootstrap Year 1 Goal**: €10-15k crowdfunding + €10-15k personal/F&F = €20-30k total
- **After Bootstrap Success**: Scale to €250-500k for multi-site expansion
- → See [[32_Funding_Strategy|Funding Strategy]] for complete bootstrap fundraising plan
```

**Alternative (More Concise)**:
```markdown
- **Year 1 Goal (Bootstrap)**: €20-30k → See [[32_Funding_Strategy|Funding Strategy]]
- **Post-Bootstrap Scale Goal**: €250-500k for 5-10 ha expansion
```

**Verification**:
- [ ] Year 1 funding target reflects v2.0 Bootstrap (€20-30k)
- [ ] Larger funding goals contextualized as post-bootstrap scaling
- [ ] Cross-reference to 32_Funding_Strategy.md maintained
- [ ] No other v1.0 budget references in file
- [ ] Aligns with bootstrap crowdfunding goal in doc 42 (€10-15k campaign)

**Related Tasks**:
- Similar to FIX-033 (terminology alignment in doc 40)
- Part of overall v2.0 budget consistency
- Content quality otherwise good

---

## 🟢 LOW PRIORITY

### ⚠️ FIX-023: Standardize Currency Symbols ($ to €) in Soil Restoration and Water Management Files

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🟢 LOW
**Task ID**: CUR-2025-11-07-032
**Found By**: Curator during Step 5 Groups 6-7 audit of Implementation Tasks

**Files** (13+ files total):

**Soil Restoration (7 files)**:
- `implementation_tasks/soil_restoration/00_Soil_Restoration_Overview.md`
- `implementation_tasks/soil_restoration/01_Assess_Soil_Health.md`
- `implementation_tasks/soil_restoration/02_Add_Organic_Matter.md`
- `implementation_tasks/soil_restoration/03_Reduce_Tillage.md`
- `implementation_tasks/soil_restoration/04_Rotate_Crops.md`
- `implementation_tasks/soil_restoration/05_Manage_Pests_Diseases.md`
- `implementation_tasks/soil_restoration/06_Monitor_Soil_Health.md`

**Water Management (6+ files, likely all 7)**:
- `implementation_tasks/water_management/00_Water_Management_Overview.md`
- `implementation_tasks/water_management/01_Assess_Water_Needs.md`
- `implementation_tasks/water_management/02_Rainwater_Harvesting.md`
- `implementation_tasks/water_management/03_Build_Water_Storage_Structures.md`
- (Files 04-06 likely also use $)

**Issue**:
All soil restoration and water management files use USD ($) for budget estimates instead of EUR (€) like the rest of the documentation. This creates minor currency inconsistency across two complete categories.

**Context**:
- Files provide scale-neutral guidance (appropriate for any site size)
- NO scale alignment issues - content is excellent throughout
- ONLY issue is currency symbol ($ vs €)
- Likely sourced from US-based materials
- Lowest priority cosmetic fix

**Fix Required**:

**Search and Replace $ with €** in all soil restoration and water management files - symbol replacement only, do NOT adjust numerical values.

See FIX-023 in master FIX_TASKS.md for specific line references.

**Note on Currency Conversion**:
- Do NOT adjust numerical values (e.g., $500 → €500, not €460)
- This is a symbol replacement only
- Budget ranges are approximate and scale-neutral

**Verification**:
- [ ] All "$" instances replaced with "€" in 13+ files
- [ ] Currency now consistent with rest of documentation
- [ ] No numerical values changed (symbol only)
- [ ] Content guidance unchanged (still scale-neutral)

**Related Tasks**:
- None - isolated cosmetic issue

---

### ⚠️ FIX-035: Update Site Size Reference in implementation_tasks/site_selection/08_Make_Shortlist.md

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🟢 LOW
**Task ID**: CUR-2025-11-07-003
**Found By**: Curator during Step 5 audit (Implementation Tasks 44 files)

**File**: `implementation_tasks/site_selection/08_Make_Shortlist.md`

**Issue**:
Line 53 contains a v1.0 scale reference in the "Essential Criteria" section that conflicts with v2.0 Bootstrap model.

**Specific Problem**:
- Line 53: "**Size Appropriate:** Meets minimum size requirements (5-10 ha for Year 1)"
- Should reflect v2.0 Bootstrap (1 ha Year 1, with 5-10 ha as post-bootstrap expansion)

**Context**:
- This is the ONLY v2.0 scale issue found across all 44 implementation task files
- Implementation tasks are otherwise exceptionally high quality and scale-flexible
- Minor fix with low impact (implementation task, not strategic document)

**Fix Required**:

Change line 53 from:
```markdown
- [ ] **Size Appropriate:** Meets minimum size requirements (5-10 ha for Year 1)
```

To:
```markdown
- [ ] **Size Appropriate:** Meets minimum size requirements (1 ha for Year 1 bootstrap, 5-10 ha for post-bootstrap expansion)
```

**Alternative (More Concise)**:
```markdown
- [ ] **Size Appropriate:** Meets size requirements (1 ha bootstrap / 5-10 ha scale phase)
```

**Alternative (Most Flexible)**:
```markdown
- [ ] **Size Appropriate:** Meets project size requirements per strategic plan ([[44_Site_Selection_Land_Acquisition|Site Selection Strategy]])
```

**Verification**:
- [ ] Line 53 updated to reflect v2.0 bootstrap scale (1 ha Year 1)
- [ ] Larger scale (5-10 ha) contextualized as post-bootstrap expansion
- [ ] Essential criteria checklist still functional
- [ ] No other v1.0 scale references in file

**Related Tasks**:
- None - isolated issue in single implementation task file
- Does not affect other implementation tasks or strategic documents

**Notes**:
- This is the only v2.0 scale issue found in all 44 implementation task files
- All other implementation files are scale-flexible and version-agnostic
- Overall implementation task quality: EXCELLENT

---

## 📊 CURATOR FIX SUMMARY

**Total Curator-Found Issues**: 12

**By Priority**:
- 🚨 **CRITICAL**: 0 tasks
- 🔴 **HIGH**: 4 tasks (FIX-024, FIX-025, FIX-027, FIX-030)
- 🟡 **MEDIUM**: 6 tasks (FIX-026, FIX-028, FIX-029, FIX-031, FIX-033, FIX-034)
- 🟢 **LOW**: 2 tasks (FIX-023, FIX-035)

**Completion Status**:
- [ ] HIGH Priority: ___ / 4 complete
- [ ] MEDIUM Priority: ___ / 6 complete
- [ ] LOW Priority: ___ / 2 complete
- [ ] **TOTAL**: ___ / 12 complete

**Estimated Time**: 8-12 hours total for all Curator fixes

---

## 🔗 RELATED FILES

- **Audit Tasks**: `_vault_maintenance/AUDIT_TASKS_CURATOR.md`
- **Persona Definition**: `_vault_maintenance/personas/curator.md`
- **Workflow**: `_vault_maintenance/WORKFLOW.md`
- **Master Fix Tasks**: `_vault_maintenance/FIX_TASKS.md` (shared file, use with caution)

---

**Status**: Ready for Phase 2 (Fix phase) - awaiting full audit completion
**Next Action**: Wait for all personas to complete audits, then start fixes by priority
