# 🎭 CURATOR FIX TASKS

**Persona**: Curator
**Focus**: Content quality, completeness, coherence, narrative flow, cross-references
**Total Issues Found**: 12
**Status**: All documented, awaiting Phase 2 (Fix phase) to begin
**Version**: 2.0.0 (Bootstrap Model)

---

## 📋 PURPOSE

This file contains **only** the fix tasks discovered by the **CURATOR** persona during audit.

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
- Your branch will only modify THIS file and the files being fixed
- Other personas modify their own fix files
- Reduced merge conflicts!

---

## 📊 FIX TASKS BY PRIORITY


### 🔴 HIGH PRIORITY

### ⚠️ FIX-024: Fix Broken Cross-Reference to 60_Marketing_Strategy

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🔴 HIGH
**Task ID**: CUR-2025-11-07-024
**Found By**: Curator during Step 3 audit of Methodology & Business Docs

**Files**: Multiple files linking to "22_Research_Framework"

**Issue**:
Links throughout vault reference `[[strategic/22_Research_Framework]]` but the actual file is named `22_Restoration_Challenges_Solutions.md`. This creates broken navigation.

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
- Find all instances of `[[strategic/22_Research_Framework]]`
- Replace with `[[strategic/22_Restoration_Challenges_Solutions]]`
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
- Reference [[strategic/30_Business_Model|Business Model]] for v2.0 budget framework
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
**Task ID**: LIB-2025-11-07-003
**Found By**: Librarian during audit of strategic docs 01-04

**File**: Multiple files link to doc 60 with wrong filename

**Files Affected**:
- `01_Executive_Summary.md` (line 35)
- `02_Project_Vision.md` (lines 78, 188)
- `03_Success_Factors.md` (lines 71, 239)
- `04_Current_Status_Assessment.md` (line 230)
- `50_Risk_Assessment.md` (line 322) - Added from Step 4 audit
- `51_Key_Performance_Indicators.md` (lines 129, 275, 462) - Added from Step 4 audit

**Issue**:
Links reference [[strategic/60_Marketing_Strategy|...]] but the actual file is `60_Marketing_Communications_Strategy.md`, NOT `60_Marketing_Strategy.md`.

**Fix Required**:

Update all links to use correct filename:
- FROM: `[[strategic/60_Marketing_Strategy|...]]`
- TO: `[[strategic/60_Marketing_Communications_Strategy|...]]`

**Files to Update** (10 instances):
1. 01_Executive_Summary.md (line 35)
2. 02_Project_Vision.md (line 78)
3. 02_Project_Vision.md (line 188)
4. 03_Success_Factors.md (line 71)
5. 03_Success_Factors.md (line 239)
6. 04_Current_Status_Assessment.md (line 230)
7. 50_Risk_Assessment.md (line 322)
8. 51_Key_Performance_Indicators.md (line 129)
9. 51_Key_Performance_Indicators.md (line 275)
10. 51_Key_Performance_Indicators.md (line 462)

**Verification**:
- [ ] All 10 links now functional
- [ ] All links point to 60_Marketing_Communications_Strategy.md
- [ ] Link text still makes sense
- [ ] No other references to 60_Marketing_Strategy remaining

**Related Tasks**: FIX-001 through FIX-004 (may update some links during rewrites)

---

## 🟡 MEDIUM PRIORITY FIXES

These improve vault quality and consistency. Complete after HIGH priority fixes.


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

Change entire section to reflect 1 hectare Bootstrap:

```markdown
## 📊 Sample Protection Plan

**Example for 1-Hectare Bootstrap Site:**

### Zone Allocation

**Core Protection (0.15 ha = 15%):**
- Location: Small wetland area or remnant vegetation patch (1,500 m²)
- Access: Research/monitoring only, by founders
- Features: Critical nesting site, seed bank for native plants, sensitive microhabitats
- Purpose: Undisturbed reference area

**Buffer Zone (0.25 ha = 25%):**
- Location: 10-20m buffer around core zone
- Access: Founders only for essential restoration work
- Purpose: Protect core from disturbance, reduce edge effects

**Active Restoration (0.5 ha = 50%):**
- Location: Former degraded areas, main planting zone
- Access: Founders, volunteers (supervised), researchers
- Activities: Reforestation, soil work, habitat creation, main project focus

**Public Access/Demo (0.1 ha = 10%):**
- Location: Entry area near tiny house, small demonstration zone
- Access: Visitors during tours (by appointment)
- Features: Interpretive elements, "before/after" examples, community workshops

### Seasonal Restrictions

**March 15 - July 31 (Breeding Season):**
- Core zone: Completely closed (bird nesting, amphibian breeding)
- Buffer zone: Essential monitoring only
- Restoration zone: Avoid noisy work near core
- Demo area: Tours restricted to quiet observation

**August 1 - March 14 (Non-Breeding):**
- Core zone: Quarterly monitoring only
- Buffer zone: Restoration work allowed
- Restoration zone: Full access for work
- Demo area: Tours and workshops allowed

### Infrastructure

**Signage: 6-8 signs total**
- 3-4 zone boundary markers (wooden posts with simple signs)
- 2-3 interpretive panels (wildlife, restoration progress)
- 1-2 directional markers for visitors
- Materials: DIY wooden signs, weatherproof printing

**Barriers:**
- Natural barriers primarily (dense plantings, existing features)
- Simple rope or split-rail markers at core zone entry (50m)
- Log barriers for path delineation (10-15 logs from site clearing)

**Monitoring:**
- 2-3 camera traps (rotate positions)
- Founder-led observations (daily/weekly)
- Quarterly documentation

**Budget (Bootstrap Scale):**
- Signage materials: €150-300 (DIY approach)
- Rope/barriers: €50-100
- Camera traps (2-3): €300-600
- Trail markers (rocks/logs): €0-50 (use on-site materials)
- **Total: €500-1,050** (vs €10,700 for 50 ha example)
- Annual maintenance: €100-200

**Notes:**
- 1 ha Bootstrap scale focuses on essential protection
- Founders conduct most monitoring (minimal external labor)
- DIY approach keeps costs within €20-30k Year 1 budget
- Simple but effective protection strategy
- Can expand protection zones as project scales post-pilot
```

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


---


### 🟡 MEDIUM PRIORITY

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
- Reference [[strategic/30_Business_Model|Business Model]] for v2.0 budget framework
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
**Task ID**: LIB-2025-11-07-003
**Found By**: Librarian during audit of strategic docs 01-04

**File**: Multiple files link to doc 60 with wrong filename

**Files Affected**:
- `01_Executive_Summary.md` (line 35)
- `02_Project_Vision.md` (lines 78, 188)
- `03_Success_Factors.md` (lines 71, 239)
- `04_Current_Status_Assessment.md` (line 230)
- `50_Risk_Assessment.md` (line 322) - Added from Step 4 audit
- `51_Key_Performance_Indicators.md` (lines 129, 275, 462) - Added from Step 4 audit

**Issue**:
Links reference [[strategic/60_Marketing_Strategy|...]] but the actual file is `60_Marketing_Communications_Strategy.md`, NOT `60_Marketing_Strategy.md`.

**Fix Required**:

Update all links to use correct filename:
- FROM: `[[strategic/60_Marketing_Strategy|...]]`
- TO: `[[strategic/60_Marketing_Communications_Strategy|...]]`

**Files to Update** (10 instances):
1. 01_Executive_Summary.md (line 35)
2. 02_Project_Vision.md (line 78)
3. 02_Project_Vision.md (line 188)
4. 03_Success_Factors.md (line 71)
5. 03_Success_Factors.md (line 239)
6. 04_Current_Status_Assessment.md (line 230)
7. 50_Risk_Assessment.md (line 322)
8. 51_Key_Performance_Indicators.md (line 129)
9. 51_Key_Performance_Indicators.md (line 275)
10. 51_Key_Performance_Indicators.md (line 462)

**Verification**:
- [ ] All 10 links now functional
- [ ] All links point to 60_Marketing_Communications_Strategy.md
- [ ] Link text still makes sense
- [ ] No other references to 60_Marketing_Strategy remaining

**Related Tasks**: FIX-001 through FIX-004 (may update some links during rewrites)

---

## 🟡 MEDIUM PRIORITY FIXES

These improve vault quality and consistency. Complete after HIGH priority fixes.


---

### ⚠️ FIX-026: Remove Deprecated AWG Technology Reference from Site Selection File

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🟡 MEDIUM
**Task ID**: CUR-2025-11-07-026
**Found By**: Curator during Step 5 Group 1 audit of Implementation Tasks

**File**: `implementation_tasks/site_selection/04_Consider_Accessibility.md`

**Issue**:
File contains reference to "Atmospheric Water Generation" (AWG), which is deprecated v1.0 Large-Scale technology. v2.0 Bootstrap Model uses rainwater harvesting instead.

**Specific Problem**:
- Line 59: "Atmospheric water generation feasibility → [[strategic/21_Technology_Integration|Technology]]"
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
- Atmospheric water generation feasibility → [[strategic/21_Technology_Integration|Technology]]
```

To:
```markdown
**Water:**
- Municipal water supply available?
- Well drilling required?
- Distance to nearest water source?
- Water quality testing needed?
- Rainwater harvesting potential (roof area, annual rainfall) → [[strategic/21_Technology_Integration|Technology]]
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

**Impact**:
- Minor misalignment with v2.0 Bootstrap Model
- Could confuse users about appropriate scale
- Budget examples higher than necessary for 1 ha pilot
- Examples should reflect actual Bootstrap implementation

**Fix Required**:

**Lines 94-100 - Update Example Calculation**:

Change:
```markdown
**Example Calculation:**
```
Area: 2 hectares
Density: 1,000 trees/hectare
Base need: 2,000 seedlings
Buffer (25%): 500 seedlings
Total order: 2,500 seedlings
```
```

To:
```markdown
**Example Calculation (Bootstrap Model - 1 hectare):**
```
Area: 1 hectare
Density: 1,000 trees/hectare (dense restoration planting)
Base need: 1,000 seedlings
Buffer (25%): 250 seedlings
Total order: 1,250 seedlings
```
```

**Lines 102-107 - Update Species Breakdown**:

Change calculations to reflect 1,250 total seedlings instead of 2,500:
- 30% Oak = 375 seedlings (not 750)
- 20% Pine = 250 seedlings (not 500)
- 15% Carob = 188 seedlings (not 375)
- etc.

**Lines 214-217 - Update Budget Example**:

Change:
```markdown
**For 2,000 seedlings:**
- Budget estimate: €5,000-15,000
- Add 20% contingency: €6,000-18,000
```

To:
```markdown
**For 1,000-1,250 seedlings (1 hectare Bootstrap):**
- Budget estimate: €2,500-8,000
- Add 20% contingency: €3,000-10,000
```

**Add Bootstrap Context Note** (after the example):

Add clarification:
```markdown
**Bootstrap Model Note:**
- 1 hectare pilot site requires 1,000-1,250 seedlings (with buffer)
- Dense planting (1,000 trees/ha) for faster canopy closure
- Seedling budget fits within €20-30k Year 1 total budget
- For larger sites post-pilot, scale calculations proportionally
```

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

**Impact**:
- Minor misalignment with v2.0 Bootstrap Model
- Budget examples higher than necessary for 1 ha pilot
- Could create confusion about actual Bootstrap costs
- Examples should reflect realistic 1 ha implementation

**Fix Required**:

**File 05 - Lines 339-342 - Update Monitoring Budget**:

Change:
```markdown
**Annual Monitoring Budget (2 hectares):**
- Basic program: €2,000-4,000
- Enhanced with technology: €5,000-10,000
```

To:
```markdown
**Annual Monitoring Budget (1 hectare Bootstrap):**
- Basic program: €1,000-2,000
- Enhanced with technology: €2,500-5,000
```

**File 06 - Lines 361-382 - Update Management Budgets**:

Change all references from "2 hectares" to "1 hectare Bootstrap":

**Year 1-3 (Intensive):**
- Labor: €1,500-3,000/year (was €3,000-6,000)
- Water: €250-750/year (was €500-1,500)
- Mulch/supplies: €250-500/year (was €500-1,000)
- Replacements: €500-1,500/year (was €1,000-3,000)
- **Total: €2,500-5,750/year** (was €5,000-11,000)

**Year 4-7 (Moderate):**
- Labor: €1,000-2,000/year (was €2,000-4,000)
- Water: €150-400/year (was €300-800)
- Tools/supplies: €150-300/year (was €300-600)
- **Total: €1,300-2,700/year** (was €2,600-5,400)

**Year 8+ (Light):**
- Labor: €500-1,000/year (was €1,000-2,000)
- Monitoring: €250-500/year (was €500-1,000)
- Occasional interventions: €250-500/year (was €500-1,000)
- **Total: €1,000-2,000/year** (was €2,000-4,000)

**10-Year Total: €17,500-35,000 for 1 hectare** (was €35,000-70,000 for 2 hectares)

**Add Bootstrap Context Note** (after budget tables):

Add clarification:
```markdown
**Bootstrap Model Note:**
- These budgets reflect 1 hectare pilot site management
- Costs are within the total €20-30k Year 1 + ongoing funding model
- Year 1 is most intensive, costs decrease as trees establish
- For larger sites post-pilot, scale proportionally (but not always linearly - some economies of scale)
- Many tasks can be done by founders, reducing labor costs
```

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

**Impact**:
- Minor misalignment with v2.0 Bootstrap Model
- Budget examples much higher than necessary for 1 ha pilot
- Could create impression Bootstrap requires extensive monitoring budget
- Examples should reflect realistic Bootstrap monitoring scope

**Fix Required**:

**Lines 552-589 - Replace with 1 Hectare Bootstrap Example**:

Change:
```markdown
**For 50-hectare restoration site:**

### Year 1 (Baseline)
**Comprehensive Surveys:**
- Vegetation plots (30 permanent plots)
- Bird point counts (15 points, 6 visits each)
- Camera trap array (20 cameras, continuous)
- Amphibian call surveys (8 points, 6 visits)
- Butterfly transects (2 routes, 15 weeks)
- One-time surveys of mammals, reptiles, invertebrates

**Effort:** ~80 field days, €15,000
```

To:
```markdown
**For 1-Hectare Bootstrap Site:**

### Year 1 (Baseline - Founder-Led)
**Comprehensive Surveys:**
- Vegetation plots (6 permanent 10m² plots)
- Bird point counts (3 points, 6 visits each by founders)
- Camera traps (2-3 cameras, continuous)
- Amphibian call surveys (2 points, 4-6 visits)
- Butterfly transects (1 route, 10-15 weeks)
- Opportunistic observations (mammals, reptiles, invertebrates)
- iNaturalist documentation (community science)

**Effort:** ~20-30 founder field days, ~€2,000-3,000
- Camera traps: €300-600
- Identification resources: €100-200
- Soil samples for biodiversity: €300-500
- Expert consultation (2-3 days): €800-1,200
- Materials (flagging, data sheets, etc.): €200-500
```

**Update Years 2-5**:
```markdown
### Years 2-5 (Frequent Monitoring - Bootstrap)

**Annual Surveys (Founder-Led):**
- Vegetation plots (annual, spring)
- Bird surveys (breeding season, 4-6 visits)
- Camera traps (continuous, founders check weekly)
- Amphibian surveys (breeding season, 3-4 visits)
- Butterfly/pollinator observations (10 weeks, casual)
- iNaturalist ongoing documentation

**Effort:** ~15-20 founder field days/year, ~€1,500-2,500/year
- Camera maintenance/batteries: €100-200
- Annual expert consultation: €500-800
- Lab tests (soil biodiversity, etc.): €300-500
- Materials and apps: €100-300
- Photo documentation: €0-200
```

**Update Years 6+**:
```markdown
### Years 6+ (Long-Term Monitoring - Bootstrap)

**Reduced Frequency (Maintenance):**
- Vegetation: Every 2 years
- Birds: Annually (breeding season)
- Camera traps: Continuous (founders)
- Other groups: Every 2-3 years
- Ongoing iNaturalist observations

**Effort:** ~10-15 founder field days/year, ~€1,000-1,500/year
- Camera costs: €100-200
- Periodic expert review: €300-500
- Materials: €100-200
- Community science engagement: €0-200
```

**Update 10-Year Total**:
```markdown
### Total 10-Year Cost (Bootstrap)

**~€17,000-25,000** (~€1,700-2,500/year average)

**Bootstrap Approach:**
- Founders conduct most monitoring (labor = time, not cash)
- Strategic use of camera traps multiplies capacity
- Community science (iNaturalist) supplements formal monitoring
- Annual expert consultation for quality control
- Focus on key indicators rather than comprehensive surveys
- Budget fits within Bootstrap ongoing operations
```

**Add Bootstrap Context Note**:

Add after example:
```markdown
**Bootstrap Model Notes:**
- 1 ha pilot requires scaled-down monitoring
- Founders are primary observers (reduces costs dramatically)
- Camera traps provide 24/7 data with minimal effort
- Community science platforms extend reach
- Annual expert consultation ensures quality
- Monitoring budget ~€1,500-2,500/year fits within operational costs
- As project scales post-pilot, monitoring expands proportionally
```

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

**Option A (Recommended)**: Add Bootstrap Phase clarification at beginning:
1. Add new section after Overview (before Phase 1):
   ```markdown
   ## Bootstrap Phase (Months 1-12): Proof of Concept

   **Goal:** Validate restoration approach at 1 hectare pilot scale

   **This is Year 0** - proving the model before Phase 1 expansion. See:
   - [[strategic/42_Next_Steps_90_Days|First 90 Days]]: Campaign & land acquisition
   - [[strategic/43_Operations_Action_Plan|Operations Guide]]: Bootstrap operations
   - [[strategic/44_Site_Selection_Land_Acquisition|Site Selection]]: Finding 1 ha site

   **Bootstrap Success Metrics**:
   - 1 hectare secured and operational
   - 100-200 trees planted with 70%+ survival
   - €20-30k Year 1 budget managed effectively
   - Restoration methods documented
   - Model proven viable for scaling

   **After Bootstrap Success** → Phase 1 expansion begins (below)

   ---
   ```

2. Update Phase 1 header (line 11):
   ```markdown
   ## Phase 1: Foundation & Scale (Years 2-3)

   **Prerequisite:** Successful 1 hectare Bootstrap pilot complete

   **Goal:** Scale proven approach to 5-10 hectares
   ```

3. Add note in "Immediate Next Steps (90 Days)" section (line 562):
   ```markdown
   ## Immediate Next Steps (90 Days)

   **NOTE**: These are Bootstrap Phase actions. The "Phase 1" expansion described above
   begins AFTER successful completion of 1 hectare pilot (typically Year 2+).

   **These expansion plans begin after:**
   ```

**Option B (Alternative)**: Rename phases to make Bootstrap explicit throughout

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
- Line 70: "**Year 1 Goal**: €250-500k → See [[strategic/32_Funding_Strategy|Funding Strategy]]"

**Fix Required**:

Change line 70 from:
```markdown
- **Year 1 Goal**: €250-500k → See [[strategic/32_Funding_Strategy|Funding Strategy]]
```

To:
```markdown
- **Bootstrap Year 1 Goal**: €10-15k crowdfunding + €10-15k personal/F&F = €20-30k total
- **After Bootstrap Success**: Scale to €250-500k for multi-site expansion
- → See [[strategic/32_Funding_Strategy|Funding Strategy]] for complete bootstrap fundraising plan
```

**Alternative (More Concise)**:
```markdown
- **Year 1 Goal (Bootstrap)**: €20-30k → See [[strategic/32_Funding_Strategy|Funding Strategy]]
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


---


### 🟢 LOW PRIORITY

### ⚠️ FIX-023: Standardize Navigation Patterns in 00_Eco_Balance_Hub.md

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
- (Files 04-06 not yet audited but likely also use $)

**Issue**:
All soil restoration and water management files use USD ($) for budget estimates instead of EUR (€) like the rest of the documentation. This creates minor currency inconsistency across two complete categories.

**Context**:
- Files provide per-acre or scale-neutral guidance (appropriate for any site size)
- NO scale alignment issues - content is excellent throughout
- ONLY issue is currency symbol ($ vs €)
- Likely sourced from US-based materials or created separately from other docs
- Both categories have consistent pattern suggesting same source
- Lowest priority cosmetic fix

**Fix Required**:

**Search and Replace $ with €** in all soil restoration and water management files:

**File 00**:
- Line 62-65: Budget estimates

**File 01**:
- Lines 177-178: Equipment costs
- Lines 222-228: Budget estimates
- All instances of "$" → "€"

**File 02**:
- Lines 222-228: Budget estimates
- All instances of "$" → "€"

**File 03**:
- Lines 233-238: Budget considerations
- All instances of "$" → "€"

**File 04**:
- Lines 243-249: Budget estimates
- Line 249: "$500-1,500+" → "€500-1,500+"
- All instances of "$" → "€"

**File 05**:
- Lines 100, 102: Budget estimates
- All instances of "$" → "€"

**Note on Currency Conversion**:
- Do NOT adjust numerical values (e.g., $500 → €500, not €460)
- This is a symbol replacement only
- Budget ranges are approximate and scale-neutral
- Exact currency conversion not necessary for implementation guidance

**Verification**:
- [ ] All "$" instances replaced with "€" in 6 soil restoration files
- [ ] Currency now consistent with rest of documentation
- [ ] No numerical values changed (symbol only)
- [ ] Content guidance unchanged (still scale-neutral and appropriate)

**Related Tasks**:
- None - isolated cosmetic issue
- Does not affect any other fixes or content
**Task ID**: LIB-2025-11-07-004
**Found By**: Librarian during audit of 00_Eco_Balance_Hub.md

**File**: `_templates/README.md` (CREATE)

**Issue**:
The Hub file (00_Eco_Balance_Hub.md) links to `[[_templates/README|_templates/]]` (line 46), but `_templates/README.md` does NOT exist. The _templates directory exists with 4 template files but no README.

**Existing Templates**:
- changelog_entry_template.md
- implementation_task_template.md
- release_notes_template.md
- strategic_document_template.md

**Fix Required**:

Create `_templates/README.md` that documents the template system:

1. **Purpose**: Explain why templates exist (consistency, quality, efficiency)
2. **Available Templates**: List and describe each template
3. **Usage Instructions**: How to use each template
4. **When to Use**: Guidance on which template for which task
5. **Customization**: How to adapt templates

**Content Structure**:
```markdown
# Documentation Templates

Purpose: Maintain consistency across vault documents

## Available Templates
1. Strategic Document Template - For files 00-70
2. Implementation Task Template - For implementation_tasks/
3. Release Notes Template - For _versions/vX.Y.Z/
4. Changelog Entry Template - For CHANGELOG.md updates

## Usage Instructions
[For each template...]

## Contributing
[How to improve templates]
```

**Verification**:
- [ ] File created at _templates/README.md
- [ ] Link from Hub (line 46) now functional
- [ ] All 4 templates documented
- [ ] Usage instructions clear and helpful

**Related Tasks**: None (standalone documentation enhancement)
**Task ID**: QI-2025-11-07-001
**Found By**: Quality Inspector during audit of 00_Eco_Balance_Hub.md

**File**: `00_Eco_Balance_Hub.md`

**Issue**:
Navigation link patterns are inconsistent throughout the Hub document, reducing professional polish and creating slight user experience friction.

**Specific Inconsistencies Found**:
- Some sections use "→ See [[link]]"
- Other sections use "→ Details in [[link]]"
- Other sections use "Navigate: [[link]]"
- Some sections use direct [[links]] with no prefix
- Some use "→ Full assessment: [[link]]"

**Examples**:
- Line 23: "→ See [[strategic/20_Restoration_Methodology]]"
- Line 68: "→ See [[strategic/21_Technology_Integration]]"
- Line 99: "Navigate: [[strategic/restoration_playbook/site_selection/00_Site_Selection_Overview]]"
- Line 202: "→ Full assessment: [[strategic/04_Current_Status_Assessment]]"

**Fix Required**:

Choose ONE navigation pattern and apply consistently. Recommended pattern:

**Option A** (Recommended): Use "→ See [[link]]" for all navigation
- Consistent with most of the document
- Clear and concise
- Easy to scan

**Option B**: Use direct [[links]] with no prefix
- Clean, minimal
- Relies on link text for context

**Implementation**:
1. Search for all navigation patterns in the file
2. Standardize to chosen pattern (recommend Option A)
3. Ensure consistency throughout
4. Verify all link text remains clear and descriptive

**Verification**:
- [ ] All navigation links follow same pattern
- [ ] No mixing of "→ See" / "→ Details in" / "Navigate:" patterns
- [ ] Link text remains clear and descriptive
- [ ] Professional polish improved

**Related Tasks**: None - standalone polish improvement

**Estimated Effort**: TRIVIAL (10-15 minutes)

---


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
- Issue is in the decision criteria checklist for site shortlisting
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
- [ ] **Size Appropriate:** Meets project size requirements per strategic plan ([[strategic/44_Site_Selection_Land_Acquisition|Site Selection Strategy]])
```

**Verification**:
- [ ] Line 53 updated to reflect v2.0 bootstrap scale (1 ha Year 1)
- [ ] Larger scale (5-10 ha) contextualized as post-bootstrap expansion
- [ ] Essential criteria checklist still functional
- [ ] No other v1.0 scale references in file
- [ ] Cross-reference to strategic doc maintained if using Alternative 3

**Related Tasks**:
- None - isolated issue in single implementation task file
- Does not affect other implementation tasks or strategic documents
- Implementation tasks otherwise excellent (see CURATOR audit result)

**Notes**:
- This is the only v2.0 scale issue found in all 44 implementation task files
- All other implementation files are scale-flexible and version-agnostic
- Overall implementation task quality: EXCELLENT

---

### UPDATED SUMMARY STATISTICS

**Total Fix Tasks**: 29 tasks (was 28, +1 from Curator Step 5 audit)

**By Priority**:
- 🚨 **CRITICAL**: 5 tasks (FIX-000 to FIX-004) - No change
- 🔴 **HIGH**: 5 tasks (FIX-005 to FIX-008, FIX-015 moved here) - No change
- 🟡 **MEDIUM**: 14 tasks (FIX-009 to FIX-014, FIX-016 to FIX-018, FIX-023, FIX-033, FIX-034) - No change
- 🟢 **LOW**: 7 tasks (FIX-019 to FIX-022, FIX-024, FIX-025, FIX-035) - Was 6, now 7

**Completion Status**:
- [ ] CRITICAL Priority: ___ / 5 complete
- [ ] HIGH Priority: ___ / 5 complete
- [ ] MEDIUM Priority: ___ / 14 complete
- [ ] LOW Priority: ___ / 7 complete (was 6, +1 from Curator Step 5 audit)
- [ ] **TOTAL**: ___ / 29 complete (was 28, +1 from Curator Step 5 audit)

### UPDATED TIME ESTIMATES

**CRITICAL Fixes**: 7-12 hours (no change)

**HIGH Fixes**: 4-6 hours (was 2-4, added FIX-015 upgrade = +2 hours)

**MEDIUM Fixes**: 14-20 hours (no change)

**LOW Fixes**: 3-5.5 hours (was 2.5-5, added FIX-035 = +0.5 hour)

**GRAND TOTAL**: 28-43.5 hours (was 27.5-43 hours, +0.5 hour from Curator Step 5)

**Impact of Re-Audit**: Added 5.5-6 hours of additional work, discovered 3 new tasks + upgraded 1 existing task severity.

---

**End of Fix Task List**
**Status**: Ready for systematic execution (RE-AUDIT COMPLETE)
**Next Action**: Start with FIX-000 (Hub document - HIGHEST PRIORITY)
**Expected Completion**: 3-5 weeks at steady pace (adjusted for new tasks)
**Re-Audit Date**: November 7, 2025 - Systematic verification complete
---


---

## 📊 CURATOR FIX SUMMARY

**Total Curator-Found Issues**: 12

**By Priority**:
- 🚨 **CRITICAL**: 0 tasks
- 🔴 **HIGH**: 4 tasks
- 🟡 **MEDIUM**: 7 tasks
- 🟢 **LOW**: 2 tasks

**Completion Status**:
- [ ] CRITICAL Priority: ___ / 0 complete
- [ ] HIGH Priority: ___ / 4 complete
- [ ] MEDIUM Priority: ___ / 7 complete
- [ ] LOW Priority: ___ / 2 complete
- [ ] **TOTAL**: ___ / 12 complete

---

## 🔗 RELATED FILES

- **Audit Tasks**: `_vault_maintenance/AUDIT_TASKS_CURATOR.md`
- **Persona Definition**: `_vault_maintenance/personas/curator.md`
- **Workflow**: `_vault_maintenance/WORKFLOW.md`

---

**Status**: Ready for Phase 2 (Fix phase) - awaiting full audit completion
**Next Action**: Wait for all personas to complete audits, then start fixes by priority
