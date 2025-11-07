# 📚 LIBRARIAN FIX TASKS

**Persona**: Librarian
**Focus**: Navigation, links, discoverability, cross-references
**Total Issues Found**: 2
**Status**: All documented, awaiting Phase 2 (Fix phase) to begin
**Version**: 2.0.0 (Bootstrap Model)

---

## 📋 PURPOSE

This file contains **only** the fix tasks discovered by the **LIBRARIAN** persona during audit.

**Important**: This is PHASE 2 work. Do NOT start fixes until the full vault audit is 100% complete.

---

## 🚨 WORKFLOW INSTRUCTIONS

### For Librarian Persona (During Fix Phase)

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
Links reference [[60_Marketing_Strategy|...]] but the actual file is `60_Marketing_Communications_Strategy.md`, NOT `60_Marketing_Strategy.md`.

**Fix Required**:

Update all links to use correct filename:
- FROM: `[[60_Marketing_Strategy|...]]`
- TO: `[[60_Marketing_Communications_Strategy|...]]`

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
Links reference [[60_Marketing_Strategy|...]] but the actual file is `60_Marketing_Communications_Strategy.md`, NOT `60_Marketing_Strategy.md`.

**Fix Required**:

Update all links to use correct filename:
- FROM: `[[60_Marketing_Strategy|...]]`
- TO: `[[60_Marketing_Communications_Strategy|...]]`

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
- Line 23: "→ See [[20_Restoration_Methodology]]"
- Line 68: "→ See [[21_Technology_Integration]]"
- Line 99: "Navigate: [[implementation_tasks/site_selection/00_Site_Selection_Overview]]"
- Line 202: "→ Full assessment: [[04_Current_Status_Assessment]]"

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


---

## 📊 LIBRARIAN FIX SUMMARY

**Total Librarian-Found Issues**: 2

**By Priority**:
- 🚨 **CRITICAL**: 0 tasks
- 🔴 **HIGH**: 1 tasks
- 🟡 **MEDIUM**: 1 tasks
- 🟢 **LOW**: 1 tasks

**Completion Status**:
- [ ] CRITICAL Priority: ___ / 0 complete
- [ ] HIGH Priority: ___ / 1 complete
- [ ] MEDIUM Priority: ___ / 1 complete
- [ ] LOW Priority: ___ / 1 complete
- [ ] **TOTAL**: ___ / 2 complete

---

## 🔗 RELATED FILES

- **Audit Tasks**: `_vault_maintenance/AUDIT_TASKS_LIBRARIAN.md`
- **Persona Definition**: `_vault_maintenance/personas/librarian.md`
- **Workflow**: `_vault_maintenance/WORKFLOW.md`

---

**Status**: Ready for Phase 2 (Fix phase) - awaiting full audit completion
**Next Action**: Wait for all personas to complete audits, then start fixes by priority
