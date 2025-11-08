# 🧹 JANITOR FIX TASKS

**Persona**: Janitor
**Focus**: Organization, file placement, naming conventions, structure
**Total Issues Found**: 1
**Status**: All fixes complete (1/1) - 2025-11-08
**Version**: 2.0.0 (Bootstrap Model)

---

## 📋 PURPOSE

This file contains **only** the fix tasks discovered by the **JANITOR** persona during audit.

**Important**: This is PHASE 2 work. Do NOT start fixes until the full vault audit is 100% complete.

---

## 🚨 WORKFLOW INSTRUCTIONS

### For Janitor Persona (During Fix Phase)

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

### ⚠️ FIX-JAN-002: Correct Implementation Task Filenames in AUDIT_TASKS.md

**Status**: [x] Complete (Date: 2025-11-08)

**Priority**: 🔴 HIGH
**Task ID**: JAN-2025-11-07-002
**Found By**: Janitor (detailed file-by-file verification)

**File**: Multiple files link to doc 22 incorrectly

**Files Affected** (from Librarian audit):
- `01_Executive_Summary.md` (line 39)
- `02_Project_Vision.md` (line 184)
- `03_Success_Factors.md` (lines 28, 138)
- `04_Current_Status_Assessment.md` (line 210)
- `51_Key_Performance_Indicators.md` (lines 107, 255) - Added from Step 4 audit

**Issue**:
AUDIT_TASKS.md contains INCORRECT filenames for 35 out of 44 implementation task files. The actual files exist with different names than what's listed in AUDIT_TASKS.md. This will prevent other personas (Curator, Auditor, Librarian, Quality Inspector) from finding the correct files to audit.

**Detailed Breakdown**:
- **site_selection**: 8 of 9 filenames WRONG (only 00_Overview correct)
- **reforestation**: All 7 filenames CORRECT ✅
- **biodiversity**: 6 of 7 filenames WRONG (only 00_Overview correct)
- **soil_restoration**: 5 of 7 filenames WRONG (00_Overview and 01 correct)
- **water_management**: 6 of 7 filenames WRONG (only 00_Overview correct)
- **community_engagement**: 5 of 7 filenames WRONG (00_Overview and 01 correct)

**Fix Required**:

Replace lines 807-1014 in AUDIT_TASKS.md with the ACTUAL filenames found in the filesystem.

**Actual filenames to use**:

```markdown
#### Site Selection (9 files)
- [ ] **ALL PERSONAS** - File: `implementation_tasks/site_selection/00_Site_Selection_Overview.md`
- [ ] **ALL PERSONAS** - File: `implementation_tasks/site_selection/01_Identify_Potential_Locations.md`
- [ ] **ALL PERSONAS** - File: `implementation_tasks/site_selection/02_Evaluate_Land_Condition.md`
- [ ] **ALL PERSONAS** - File: `implementation_tasks/site_selection/03_Estimate_Restoration_Potential.md`
- [ ] **ALL PERSONAS** - File: `implementation_tasks/site_selection/04_Consider_Accessibility.md`
- [ ] **ALL PERSONAS** - File: `implementation_tasks/site_selection/05_Research_Local_Regulations.md`
- [ ] **ALL PERSONAS** - File: `implementation_tasks/site_selection/06_Contact_Landowners.md`
- [ ] **ALL PERSONAS** - File: `implementation_tasks/site_selection/07_Visit_Sites.md`
- [ ] **ALL PERSONAS** - File: `implementation_tasks/site_selection/08_Make_Shortlist.md`

#### Reforestation (7 files) - NO CHANGES NEEDED ✅
(Keep existing - all correct)

#### Biodiversity (7 files)
- [ ] **ALL PERSONAS** - File: `implementation_tasks/biodiversity/00_Biodiversity_Overview.md`
- [ ] **ALL PERSONAS** - File: `implementation_tasks/biodiversity/01_Assess_Biodiversity.md`
- [ ] **ALL PERSONAS** - File: `implementation_tasks/biodiversity/02_Restore_Habitats.md`
- [ ] **ALL PERSONAS** - File: `implementation_tasks/biodiversity/03_Create_Protected_Areas.md`
- [ ] **ALL PERSONAS** - File: `implementation_tasks/biodiversity/04_Manage_Invasive_Species.md`
- [ ] **ALL PERSONAS** - File: `implementation_tasks/biodiversity/05_Reintroduce_Lost_Species.md`
- [ ] **ALL PERSONAS** - File: `implementation_tasks/biodiversity/06_Monitor_Biodiversity.md`

#### Soil Restoration (7 files)
- [ ] **ALL PERSONAS** - File: `implementation_tasks/soil_restoration/00_Soil_Restoration_Overview.md`
- [ ] **ALL PERSONAS** - File: `implementation_tasks/soil_restoration/01_Assess_Soil_Health.md`
- [ ] **ALL PERSONAS** - File: `implementation_tasks/soil_restoration/02_Add_Organic_Matter.md`
- [ ] **ALL PERSONAS** - File: `implementation_tasks/soil_restoration/03_Reduce_Tillage.md`
- [ ] **ALL PERSONAS** - File: `implementation_tasks/soil_restoration/04_Rotate_Crops.md`
- [ ] **ALL PERSONAS** - File: `implementation_tasks/soil_restoration/05_Manage_Pests_Diseases.md`
- [ ] **ALL PERSONAS** - File: `implementation_tasks/soil_restoration/06_Monitor_Soil_Health.md`

#### Water Management (7 files)
- [ ] **ALL PERSONAS** - File: `implementation_tasks/water_management/00_Water_Management_Overview.md`
- [ ] **ALL PERSONAS** - File: `implementation_tasks/water_management/01_Assess_Water_Needs.md`
- [ ] **ALL PERSONAS** - File: `implementation_tasks/water_management/02_Rainwater_Harvesting.md`
- [ ] **ALL PERSONAS** - File: `implementation_tasks/water_management/03_Build_Water_Storage_Structures.md`
- [ ] **ALL PERSONAS** - File: `implementation_tasks/water_management/04_Efficient_Irrigation.md`
- [ ] **ALL PERSONAS** - File: `implementation_tasks/water_management/05_Drought_Management.md`
- [ ] **ALL PERSONAS** - File: `implementation_tasks/water_management/06_Monitor_Water_Use.md`

#### Community Engagement (7 files)
- [ ] **ALL PERSONAS** - File: `implementation_tasks/community_engagement/00_Community_Engagement_Overview.md`
- [ ] **ALL PERSONAS** - File: `implementation_tasks/community_engagement/01_Identify_Stakeholders.md`
- [ ] **ALL PERSONAS** - File: `implementation_tasks/community_engagement/02_Communicate_Plans.md`
- [ ] **ALL PERSONAS** - File: `implementation_tasks/community_engagement/03_Educate_Community.md`
- [ ] **ALL PERSONAS** - File: `implementation_tasks/community_engagement/04_Involve_Community.md`
- [ ] **ALL PERSONAS** - File: `implementation_tasks/community_engagement/05_Share_Benefits.md`
- [ ] **ALL PERSONAS** - File: `implementation_tasks/community_engagement/06_Maintain_Communication.md`
```

**Verification**:
- [ ] All links functional (pointing to 22_Restoration_Challenges_Solutions.md)
- [ ] Link text makes sense
- [ ] Check all 6 affected files updated (01, 02, 03, 04, 51)
- [ ] No other references to 22_Research_Framework remaining

**Related Tasks**: FIX-001 through FIX-004 (may update some links during rewrites)

---


---


---

## 📊 JANITOR FIX SUMMARY

**Total Janitor-Found Issues**: 1

**By Priority**:
- 🚨 **CRITICAL**: 0 tasks
- 🔴 **HIGH**: 1 tasks
- 🟡 **MEDIUM**: 0 tasks
- 🟢 **LOW**: 0 tasks

**Completion Status**:
- [x] CRITICAL Priority: 0 / 0 complete
- [x] HIGH Priority: 1 / 1 complete
- [x] MEDIUM Priority: 0 / 0 complete
- [x] LOW Priority: 0 / 0 complete
- [x] **TOTAL**: 1 / 1 complete

---

## 🔗 RELATED FILES

- **Audit Tasks**: `_vault_maintenance/AUDIT_TASKS_JANITOR.md`
- **Persona Definition**: `_vault_maintenance/personas/janitor.md`
- **Workflow**: `_vault_maintenance/WORKFLOW.md`

---

**Status**: Ready for Phase 2 (Fix phase) - awaiting full audit completion
**Next Action**: Wait for all personas to complete audits, then start fixes by priority
