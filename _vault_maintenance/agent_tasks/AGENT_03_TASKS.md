# 🤖 AGENT 3: Implementation Task Filenames Fix

**Priority**: 🔴 HIGH (CRITICAL for other personas)
**Estimated Time**: 15-20 minutes
**Difficulty**: Medium
**Files to Modify**: 1

---

## 📋 TASK SUMMARY

Fix incorrect implementation task filenames in AUDIT_TASKS.md. 35 out of 44 implementation task filenames are WRONG, preventing other personas from finding the correct files to audit.

**Source**: FIX-JAN-002 from FIX_TASKS_JANITOR.md

---

## 🎯 TASKS TO COMPLETE

### Task 1: Correct Implementation Task Filenames

**Priority**: 🔴 HIGH
**Task ID**: JAN-2025-11-07-002
**File**: `_vault_maintenance/AUDIT_TASKS.md`

**Issue**:
Lines 807-1014 contain INCORRECT filenames for 35 out of 44 implementation task files.

**Breakdown**:
- **site_selection**: 8 of 9 filenames WRONG (only 00_Overview correct)
- **reforestation**: All 7 filenames CORRECT ✅ (no changes needed)
- **biodiversity**: 6 of 7 filenames WRONG (only 00_Overview correct)
- **soil_restoration**: 5 of 7 filenames WRONG (00_Overview and 01 correct)
- **water_management**: 6 of 7 filenames WRONG (only 00_Overview correct)
- **community_engagement**: 5 of 7 filenames WRONG (00_Overview and 01 correct)

---

## ✅ EXECUTION STEPS

1. **Read** `_vault_maintenance/AUDIT_TASKS.md` lines 807-1014

2. **Replace the entire section** (lines 807-1014) with correct filenames:

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

3. **Verify** all filenames match actual files in filesystem

---

## 🔍 VERIFICATION CHECKLIST

- [ ] Lines 807-1014 in AUDIT_TASKS.md updated
- [ ] All 35 incorrect filenames corrected
- [ ] Reforestation section unchanged (was already correct)
- [ ] Verified filenames against actual filesystem
- [ ] File saved successfully

---

## 📝 COMPLETION REPORT TEMPLATE

```
✅ AGENT 3 COMPLETE

Tasks Completed:
- Corrected 35 implementation task filenames in AUDIT_TASKS.md

Files Modified:
- _vault_maintenance/AUDIT_TASKS.md

Categories Fixed:
- Site Selection: 8 filenames corrected
- Biodiversity: 6 filenames corrected
- Soil Restoration: 5 filenames corrected
- Water Management: 6 filenames corrected
- Community Engagement: 5 filenames corrected
- Reforestation: No changes (already correct)

Verification:
- All filenames verified against filesystem ✓
- AUDIT_TASKS.md now accurate ✓

Time Taken: [X] minutes
```

---

**Status**: Ready for execution
**Next Agent**: Agent 4 (can run in parallel - different files)
