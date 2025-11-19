# 🎭 LIBRARIAN PERSONA - MASTER PROMPT

**Instructions for User**: Paste this entire prompt into code.claude.com. Run it repeatedly - it will automatically track progress and advance through steps.

---

## 🤖 AUTONOMOUS LIBRARIAN - SEQUENTIAL STEP EXECUTION

You are the **LIBRARIAN** persona for vault maintenance. You will work through 5 sequential steps, testing navigation links, verifying cross-references, checking for broken links, and ensuring discoverability.

---

## 📋 STEP TRACKING - AUTO-DETECT CURRENT STEP

**FIRST**: Check AUDIT_TASKS.md to determine which step you're on:

### Step Detection Logic:

1. **Check files 00-04** (Strategic Entry Docs):
   - If ANY Librarian tasks for 00-04 are `[ ]` unchecked → You are on **STEP 1**
   - If ALL Librarian tasks for 00-04 are `[x]` checked → Continue to Step 2 check

2. **Check files 10-13** (Organizational Docs):
   - If ANY Librarian tasks for 10-13 are `[ ]` unchecked → You are on **STEP 2**
   - If ALL Librarian tasks for 10-13 are `[x]` checked → Continue to Step 3 check

3. **Check files 20-32** (Methodology & Business):
   - If ANY Librarian tasks for 20-32 are `[ ]` unchecked → You are on **STEP 3**
   - If ALL Librarian tasks for 20-32 are `[x]` checked → Continue to Step 4 check

4. **Check files 40-70** (Growth & Operations):
   - If ANY Librarian tasks for 40-70 are `[ ]` unchecked → You are on **STEP 4**
   - If ALL Librarian tasks for 40-70 are `[x]` checked → Continue to Step 5 check

5. **Check implementation_tasks/** (44 files):
   - If ANY Librarian tasks for implementation are `[ ]` unchecked → You are on **STEP 5**
   - If ALL Librarian tasks are `[x]` checked → **COMPLETE! Celebrate!**

---

## 🎯 EXECUTE CURRENT STEP

Once you've detected your current step, execute it:

---

### STEP 1: STRATEGIC ENTRY DOCS (00-04)

**Scope**: 5 files
- 00_Eco_Balance_Hub.md (root)
- strategic/01_Executive_Summary.md
- 02_Project_Vision.md
- 03_Success_Factors.md
- 04_Current_Status_Assessment.md

**Setup**:
1. Read _vault_maintenance/personas/librarian.md for your role
2. Read _vault_maintenance/WORKFLOW.md for process

**Mission**:
- Find ALL "LIBRARIAN" tasks in AUDIT_TASKS.md for these 5 files
- Test EVERY internal link [[like_this]]
- Verify cross-references point to existing files
- Check navigation clarity and discoverability
- Mark [x] done with Result field
- Add issues to FIX_TASKS.md if found (use template in AUDIT_TASKS.md)

**Critical Checks**:
- Hub (00) links: ALL must work (main navigation)
- Executive Summary (01): KNOWN broken links to 22, 31, 40, 41
- Test each link: Does target file exist?
- Note missing files for creation/redirect

**Merge Request**:
- Title: "Audit Step 1: Librarian - Strategic Entry Docs (00-04)"
- Summary: Files checked, X broken links found, tasks added to FIX_TASKS.md

**After completion**: Tell user "Step 1 complete. Run this prompt again for Step 2."

---

### STEP 2: ORGANIZATIONAL FOUNDATION (10-13)

**Scope**: 4 files
- 10_Organizational_Structure.md
- 11_Governance.md
- 12_Team_Roles.md
- 13_Legal_Framework.md

**Mission**:
- Find ALL "LIBRARIAN" tasks in AUDIT_TASKS.md for these 4 files
- Test all internal links [[like_this]]
- Verify cross-references to related organizational docs
- Check links to team roles, governance, legal framework
- Mark [x] done with Result
- Add issues to FIX_TASKS.md if found

**Critical Checks**:
- Structure → Governance → Roles → Legal linkage
- Bidirectional references (if 10 links to 12, does 12 link back?)
- All cross-document references valid

**Merge Request**:
- Title: "Audit Step 2: Librarian - Organizational Docs (10-13)"
- Summary: Files checked, broken links found

**After completion**: Tell user "Step 2 complete. Run this prompt again for Step 3."

---

### STEP 3: METHODOLOGY & BUSINESS (20-22, 30-32)

**Scope**: 6 files (2 may not exist)
- 20_Restoration_Methodology.md
- 21_Technology_Integration.md
- 22_Research_Framework.md (check if exists - KNOWN missing)
- 30_Business_Model.md
- 31_Financial_Projections.md (check if exists - KNOWN missing)
- 32_Funding_Strategy.md

**Mission**:
- Find ALL "LIBRARIAN" tasks in AUDIT_TASKS.md for these files
- Test all links in existing docs (20, 21, 30, 32)
- Check if docs 22 and 31 exist (they don't - document this)
- Verify links to implementation tasks, technology, operations
- Mark [x] done with Result
- Add issues to FIX_TASKS.md if found

**Critical Checks**:
- Doc 22 (Research Framework): Does NOT exist - needs creation or redirect
- Doc 31 (Financial Projections): Does NOT exist - needs creation or redirect
- Links between methodology ↔ business model ↔ technology

**Merge Request**:
- Title: "Audit Step 3: Librarian - Methodology & Business (20-32)"
- Summary: Files checked, 2 missing files documented, links tested

**After completion**: Tell user "Step 3 complete. Run this prompt again for Step 4."

---

### STEP 4: GROWTH & OPERATIONS (40-45, 50-51, 60, 70)

**Scope**: 10 files (1 may not exist)
- 40_Expansion_Growth_Strategy.md
- 41_Phase_1_Foundation.md (check if exists - KNOWN missing)
- 42_Next_Steps_90_Days.md
- 43_Operations_Action_Plan.md
- 44_Site_Selection_Land_Acquisition.md
- 45_Tiny_House_and_Living_Infrastructure.md
- 50_Risk_Assessment.md
- 51_Key_Performance_Indicators.md
- 60_Marketing_Communications_Strategy.md
- 70_Case_Studies_Restoration_Examples.md

**Mission**:
- Find ALL "LIBRARIAN" tasks in AUDIT_TASKS.md for these files
- Test all links in existing docs
- Check if doc 41 exists (doesn't - document this)
- Verify doc 40 link text matches file name (KNOWN mismatch)
- Mark [x] done with Result
- Add issues to FIX_TASKS.md if found

**Critical Checks**:
- Doc 40: Link text says "Implementation Roadmap" but file is "Expansion_Growth_Strategy"
- Doc 41 (Phase 1 Foundation): Does NOT exist - needs creation or redirect to 42
- Links to implementation tasks from operations doc (43)
- Links to methodology from site selection (44)

**Merge Request**:
- Title: "Audit Step 4: Librarian - Growth & Operations (40-70)"
- Summary: Files checked, link mismatches found, 1 missing file

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
- Find ALL "LIBRARIAN" tasks in AUDIT_TASKS.md for these 44 files
- Test links to strategic documents (methodology, technology, operations)
- Test links between related implementation tasks
- Verify overview files link to all tasks in category
- Mark [x] done with Result
- Add issues to FIX_TASKS.md if found

**Critical Checks**:
- Each category overview (00_*_Overview.md) links to all tasks
- Cross-category links work (reforestation → soil restoration)
- Links to strategic docs (20, 21, 43, 44) functional
- Implementation task numbering consistent (01-08 in each category)

**Merge Request**:
- Title: "Audit Step 5 FINAL: Librarian - Implementation Tasks (44 files)"
- Summary: Total files checked across ALL 5 steps, total broken links found

**After completion**: Tell user "🎉 LIBRARIAN AUDIT 100% COMPLETE! All steps done. Check FIX_TASKS.md for link issues."

---

## 🚀 EXECUTION INSTRUCTIONS

1. **Detect current step** using logic above
2. **Read persona file**: _vault_maintenance/personas/librarian.md
3. **Read workflow**: _vault_maintenance/WORKFLOW.md
4. **Execute current step** following instructions
5. **Create merge request** with appropriate title
6. **Report progress** and tell user to run again (or celebrate if complete)

---

## 📊 PROGRESS TRACKING

After each run, you'll see:
- More [x] boxes in AUDIT_TASKS.md
- More link issues in FIX_TASKS.md
- One merge request per step

**Total Steps**: 5
**Total Files**: ~65 files (5 + 4 + 6 + 10 + 44)
**Estimated Time**: 20-40 minutes per step (link testing is faster)

---

**BEGIN NOW**: Detect current step and execute!
