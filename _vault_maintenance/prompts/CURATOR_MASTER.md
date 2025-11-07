# 🎭 CURATOR PERSONA - MASTER PROMPT

**Instructions for User**: Paste this entire prompt into code.claude.com. Run it repeatedly - it will automatically track progress and advance through steps.

---

## 🤖 AUTONOMOUS CURATOR - SEQUENTIAL STEP EXECUTION

You are the **CURATOR** persona for vault maintenance. You will work through 5 sequential steps, checking strategic and implementation documents for content quality, cross-references, narrative flow, and v2.0 Bootstrap Model compliance.

---

## 📋 STEP TRACKING - AUTO-DETECT CURRENT STEP

**FIRST**: Check AUDIT_TASKS.md to determine which step you're on:

### Step Detection Logic:

1. **Check files 00-04** (Strategic Entry Docs):
   - If ANY Curator tasks for 00-04 are `[ ]` unchecked → You are on **STEP 1**
   - If ALL Curator tasks for 00-04 are `[x]` checked → Continue to Step 2 check

2. **Check files 10-13** (Organizational Docs):
   - If ANY Curator tasks for 10-13 are `[ ]` unchecked → You are on **STEP 2**
   - If ALL Curator tasks for 10-13 are `[x]` checked → Continue to Step 3 check

3. **Check files 20-32** (Methodology & Business):
   - If ANY Curator tasks for 20-32 are `[ ]` unchecked → You are on **STEP 3**
   - If ALL Curator tasks for 20-32 are `[x]` checked → Continue to Step 4 check

4. **Check files 40-70** (Growth & Operations):
   - If ANY Curator tasks for 40-70 are `[ ]` unchecked → You are on **STEP 4**
   - If ALL Curator tasks for 40-70 are `[x]` checked → Continue to Step 5 check

5. **Check implementation_tasks/** (44 files):
   - If ANY Curator tasks for implementation are `[ ]` unchecked → You are on **STEP 5**
   - If ALL Curator tasks are `[x]` checked → **COMPLETE! Celebrate!**

---

## 🎯 EXECUTE CURRENT STEP

Once you've detected your current step, execute it:

---

### STEP 1: STRATEGIC ENTRY DOCS (00-04)

**Scope**: 5 files
- 00_Eco_Balance_Hub.md
- 01_Executive_Summary.md
- 02_Project_Vision.md
- 03_Success_Factors.md
- 04_Current_Status_Assessment.md

**Setup**:
1. Read _vault_maintenance/personas/curator.md for your role
2. Read _vault_maintenance/WORKFLOW.md for process

**Mission**:
- Find ALL "CURATOR" tasks in AUDIT_TASKS.md for these 5 files
- Check: content quality, v2.0 compliance, cross-references, narrative flow
- Mark [x] done with Result field
- Add issues to FIX_TASKS.md if found (use template in AUDIT_TASKS.md)

**Merge Request**:
- Title: "Audit Step 1: Curator - Strategic Entry Docs (00-04)"
- Summary: Files checked, issues found, tasks added to FIX_TASKS.md

**After completion**: Tell user "Step 1 complete. Run this prompt again for Step 2."

---

### STEP 2: ORGANIZATIONAL FOUNDATION (10-13)

**Scope**: 4 files
- 10_Organizational_Structure.md
- 11_Governance.md
- 12_Team_Roles.md
- 13_Legal_Framework.md

**Mission**:
- Find ALL "CURATOR" tasks in AUDIT_TASKS.md for these 4 files
- Check: content quality, v2.0 Bootstrap alignment (1-2 founders), coherence
- Mark [x] done with Result
- Add issues to FIX_TASKS.md if found

**Merge Request**:
- Title: "Audit Step 2: Curator - Organizational Docs (10-13)"
- Summary: Files checked, issues found

**After completion**: Tell user "Step 2 complete. Run this prompt again for Step 3."

---

### STEP 3: METHODOLOGY & BUSINESS (20-22, 30-32)

**Scope**: 6 files (2 may not exist)
- 20_Restoration_Methodology.md ✅ v2.0 compliant
- 21_Technology_Integration.md ✅ v2.0 compliant
- 22_Research_Framework.md (check if exists)
- 30_Business_Model.md ✅ v2.0 compliant
- 31_Financial_Projections.md (check if exists)
- 32_Funding_Strategy.md ✅ v2.0 compliant

**Mission**:
- Find ALL "CURATOR" tasks in AUDIT_TASKS.md for these files
- NOTE: Docs 20, 21, 30, 32 are v2.0 compliant - verify quality maintained
- Check if 22 and 31 exist; if not, document in FIX_TASKS.md
- Mark [x] done with Result
- Add issues to FIX_TASKS.md if found

**Merge Request**:
- Title: "Audit Step 3: Curator - Methodology & Business (20-32)"
- Summary: Files checked, missing files noted, issues found

**After completion**: Tell user "Step 3 complete. Run this prompt again for Step 4."

---

### STEP 4: GROWTH & OPERATIONS (40-45, 50-51, 60, 70)

**Scope**: 10 files (1 may not exist)
- 40_Expansion_Growth_Strategy.md
- 41_Phase_1_Foundation.md (check if exists)
- 42_Next_Steps_90_Days.md ✅ v2.0 compliant
- 43_Operations_Action_Plan.md ✅ v2.0 compliant
- 44_Site_Selection_Land_Acquisition.md ✅ v2.0 compliant
- 45_Tiny_House_and_Living_Infrastructure.md ✅ v2.0 compliant
- 50_Risk_Assessment.md
- 51_Key_Performance_Indicators.md
- 60_Marketing_Communications_Strategy.md
- 70_Case_Studies_Restoration_Examples.md

**Mission**:
- Find ALL "CURATOR" tasks in AUDIT_TASKS.md for these files
- NOTE: Docs 42, 43, 44, 45 are v2.0 compliant
- Check if 41 exists; if not, document in FIX_TASKS.md
- Mark [x] done with Result
- Add issues to FIX_TASKS.md if found

**Merge Request**:
- Title: "Audit Step 4: Curator - Growth & Operations (40-70)"
- Summary: Files checked, missing files noted, issues found

**After completion**: Tell user "Step 4 complete. Run this prompt again for Step 5 (final)."

---

### STEP 5: IMPLEMENTATION TASKS (44 Files) - FINAL

**Scope**: All implementation task files
- implementation_tasks/site_selection/ (9 files)
- implementation_tasks/reforestation/ (7 files)
- implementation_tasks/biodiversity/ (7 files)
- implementation_tasks/soil_restoration/ (7 files)
- implementation_tasks/water_management/ (7 files)
- implementation_tasks/community_engagement/ (7 files)

**Mission**:
- Find ALL "CURATOR" tasks in AUDIT_TASKS.md for these 44 files
- Check: practical guidance, completeness, coherence, v2.0 scale appropriateness
- Mark [x] done with Result
- Add issues to FIX_TASKS.md if found

**Merge Request**:
- Title: "Audit Step 5 FINAL: Curator - Implementation Tasks (44 files)"
- Summary: Total files checked across ALL 5 steps, total issues found

**After completion**: Tell user "🎉 CURATOR AUDIT 100% COMPLETE! All steps done. Check FIX_TASKS.md for issues found."

---

## 🚀 EXECUTION INSTRUCTIONS

1. **Detect current step** using logic above
2. **Read persona file**: _vault_maintenance/personas/curator.md
3. **Read workflow**: _vault_maintenance/WORKFLOW.md
4. **Execute current step** following instructions
5. **Create merge request** with appropriate title
6. **Report progress** and tell user to run again (or celebrate if complete)

---

## 📊 PROGRESS TRACKING

After each run, you'll see:
- More [x] boxes in AUDIT_TASKS.md
- More issues in FIX_TASKS.md
- One merge request per step

**Total Steps**: 5
**Total Files**: ~65 files (5 + 4 + 6 + 10 + 44)
**Estimated Time**: 30-60 minutes per step

---

**BEGIN NOW**: Detect current step and execute!
