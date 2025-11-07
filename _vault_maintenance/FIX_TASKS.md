# 🔧 VAULT FIX TASKS

**Purpose**: Specific fixes needed based on audit findings  
**Priority Order**: CRITICAL → HIGH → MEDIUM → LOW  
**For**: Claude on the web (code.claude.com) - autonomous execution with merge requests  
**Version**: 2.0.0 (Bootstrap Model)  
**Date Created**: 2025-11-07  
**Last Updated**: 2025-11-07

---

## 🤖 FOR AUTONOMOUS CLAUDE CODE WEB EXECUTION

**If you're an AI agent reading this:**

1. **Check if audit complete**: Look at AUDIT_TASKS.md - are all tasks `[x]` checked?
   - If NO: Stop! Go work on AUDIT_TASKS.md instead
   - If YES: Continue below
2. **Find FIRST UNCHECKED task** below (marked with `[ ] Not Started`)
3. **Complete the fix** following task instructions
4. **Verify the fix** using verification checklist
5. **Mark as DONE**: Change to `[x] Complete (Date: 2025-11-XX)`
6. **Create merge request** with title: "Fix: FIX-XXX [Brief description]"

**Parallel Execution Safety**:
- ✅ Safe: Tasks touching different files
- ❌ Not safe: Tasks touching same file or marked as "Related Tasks"
- Check "Related Tasks" field before starting

---

## 🚨 CRITICAL: THIS IS PHASE 2 - DO NOT START UNTIL AUDIT COMPLETE!

### Two-Phase Workflow:

**PHASE 1: AUDIT (Use AUDIT_TASKS.md)** ← **DO THIS FIRST!**
- Work through all ~270 audit tasks
- When you find issues, ADD them to this file (FIX_TASKS.md)
- Continue until 100% of audit complete
- DO NOT start fixing during audit

**PHASE 2: FIX (Use THIS file)** ← **YOU ARE HERE (but only after audit!)**
- Only start AFTER audit is 100% complete
- Work through fix tasks by priority (CRITICAL → HIGH → MEDIUM → LOW)
- Fix one task at a time, verify, mark complete
- Move to next task

### Current Status of This File:

📋 **Pre-populated Tasks**: 22 tasks already listed (from Curator's partial analysis)
📝 **Your Audit Tasks**: You will ADD more tasks here during your audit
🎯 **Total Tasks**: Will grow as you complete the full audit

**IMPORTANT**: The tasks below (FIX-001 through FIX-022) were created from the Curator's initial findings. Your comprehensive audit will likely find MORE issues. Add them to the appropriate priority sections as you go!

---

## 📚 HOW TO USE THIS FILE

### Before You Start: Is the Audit Complete?

**✅ Audit 100% complete** → Proceed with fixes below  
**❌ Audit not complete** → STOP! Go back to AUDIT_TASKS.md and finish audit first

### Fix Process (Only After Audit Complete)

1. **Select highest priority uncompleted task** from the list below
2. **Read the task description** carefully - includes specific changes needed
3. **Open the file(s)** specified in the task
4. **Make the changes** as described
5. **Verify the fix** - check the "Verification" section
6. **Mark task complete** - Check the box and add date
7. **Move to next task**

### During Audit: Adding New Tasks

If you're still in the audit phase and found an issue, add it here:

1. **Choose priority level**: CRITICAL / HIGH / MEDIUM / LOW (see guidelines in AUDIT_TASKS.md)
2. **Copy the fix task template** (from AUDIT_TASKS.md)
3. **Add to appropriate section** below (scroll to your priority level)
4. **Fill in all fields**: File, Issue, Fix Required, Verification
5. **Assign task number**: Use next available number (FIX-023, FIX-024, etc.)
6. **Return to audit** - continue with next audit task

### Task Format

Each fix task includes:
- **Priority**: CRITICAL / HIGH / MEDIUM / LOW
- **File(s)**: Which file(s) to modify
- **Issue**: What's wrong
- **Fix**: Specific changes to make
- **Verification**: How to confirm fix is correct
- **Related Tasks**: Other tasks that may be affected

---

## 🚨 CRITICAL PRIORITY FIXES

These fixes are blocking correct understanding of the project. Must complete immediately.

### ❌ FIX-001: Convert 01_Executive_Summary.md to v2.0 Bootstrap Model

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🚨 CRITICAL  
**Task ID**: CUR-2025-11-07-001  
**Assigned Persona**: Curator (but any persona can execute)

**File**: `01_Executive_Summary.md`

**Issue**: 
Executive Summary still references v1.0 Large-Scale model instead of v2.0 Bootstrap Model. This creates fundamental contradiction and misleads readers about project scope, budget, and approach.

**Specific Problems Found**:
1. **Budget**: States €250k-500k initial capital (should be €20-30k Year 1, €50-75k total)
2. **Land Scale**: References 5-10 hectares Year 1 (should be 1 hectare pilot)
3. **Team**: May reference full team (should be 1-2 founders)
4. **Technology**: Mentions "atmospheric water generation" (removed in v2.0, replaced with rainwater harvesting)
5. **Solar**: May reference 5-20 kW solar (should be 3-5 kW system)
6. **Approach**: Large-scale launch narrative (should be proof-of-concept pilot)

**Fix Required**:

Replace v1.0 assumptions with v2.0 Bootstrap Model throughout:

1. **Budget & Financial**:
   - €250k-500k → €20-30k Year 1
   - €500k-2M total → €50-75k total (3-year pilot)
   - Remove any large grant references
   - Add crowdfunding as primary funding method

2. **Scale & Timeline**:
   - 5-10 hectares → 1 hectare pilot
   - "Large-scale" → "Proof-of-concept"
   - Multi-phase parallel → Sequential validation approach
   - Year 1 full operation → Year 1-2 pilot, Year 3+ scaling consideration

3. **Technology**:
   - Remove "Atmospheric Water Generator (AWG)" completely
   - Replace with "Rainwater harvesting with IBC tank storage"
   - 5-20 kW solar → 3-5 kW solar system
   - Total tech budget: €15-20k (solar + water + tools)

4. **Team & Organization**:
   - Core team → 1-2 founders
   - Multiple departments → Founders wear multiple hats
   - Professional staff → DIY-first with expert consultation

5. **Approach & Messaging**:
   - Emphasize "prove first, scale later"
   - Highlight bootstrap nature: minimal capital, maximum learning
   - Focus on validation, documentation, and replicability
   - Frame as "demonstration project" not "operational enterprise"

**Reference Documents** (Use these as v2.0 examples):
- `20_Restoration_Methodology.md` - Correct 1 ha approach
- `21_Technology_Integration.md` - v2.0 tech specs (no AWG, 3-5 kW solar)
- `30_Business_Model.md` - v2.0 financial figures
- `32_Funding_Strategy.md` - Bootstrap funding approach
- `42_Next_Steps_90_Days.md` - Realistic immediate actions
- `43_Operations_Action_Plan.md` - Founder-level operations
- `44_Site_Selection_Land_Acquisition.md` - 1 ha site criteria
- `45_Tiny_House_and_Living_Infrastructure.md` - Bootstrap living setup

**Verification**:
- [ ] All budget figures are €20-30k Y1, €50-75k total
- [ ] Land scale is 1 hectare
- [ ] No mention of AWG
- [ ] Solar system is 3-5 kW
- [ ] Messaging emphasizes pilot/proof-of-concept
- [ ] Team described as 1-2 founders
- [ ] No contradictions with v2.0 compliant documents

**Related Tasks**: 
- This fix may affect FIX-002 (broken links)
- Completion enables FIX-003 (converting other strategic docs)

---

### ❌ FIX-002: Convert 02_Project_Vision.md to v2.0 Bootstrap Model

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🚨 CRITICAL  
**Task ID**: New (Curator suspects v1.0 content)

**File**: `02_Project_Vision.md`

**Issue**: 
Project Vision likely contains v1.0 Large-Scale assumptions. Needs verification and conversion.

**Fix Required**:

1. **Audit the file** for v1.0 assumptions:
   - Large-scale language
   - High budget references
   - Multi-hectare vision
   - Large team assumptions
   - AWG technology

2. **Convert vision to v2.0 Bootstrap**:
   - Vision: "Prove restoration model works at small scale, then replicate"
   - Approach: "Start small, document thoroughly, scale systematically"
   - Success: "Successful 1 ha pilot that others can replicate"
   - Timeline: "3-year pilot phase, then growth consideration"

3. **Maintain aspirational tone** while being realistic:
   - Long-term: Still aim for large-scale restoration
   - Short-term: Focus on validation and learning
   - Bridge: "Pilot proves model → Replication → Movement"

**Reference Documents**:
- `02_Project_Vision.md` in v1.0.0 archive (if exists) - see what changed
- v2.0 compliant docs for consistent vision messaging

**Verification**:
- [ ] Vision reflects Bootstrap approach
- [ ] No contradictions with v2.0 scale/budget
- [ ] Aspirational yet realistic
- [ ] Consistent with 01_Executive_Summary (after FIX-001)

---

### ❌ FIX-003: Convert 03_Success_Factors.md to v2.0 Bootstrap Model

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🚨 CRITICAL  
**Task ID**: New (Curator suspects v1.0 content)

**File**: `03_Success_Factors.md`

**Issue**: 
Success factors for 1 ha pilot differ significantly from large-scale operation. Needs v2.0 alignment.

**Fix Required**:

Update success factors to reflect Bootstrap priorities:

**v2.0 Bootstrap Success Factors**:
1. **Validation**: Successfully prove restoration methods work
2. **Documentation**: Thorough documentation for replication
3. **Budget Discipline**: Stay within €50-75k total budget
4. **Technical Success**: Off-grid systems reliable and sufficient
5. **Learning**: Capture lessons learned comprehensively
6. **Community**: Build local relationships and trust
7. **Efficiency**: Achieve results with minimal external inputs
8. **Replicability**: Model can be copied by others
9. **Resilience**: Founder sustainability (avoid burnout)
10. **Credibility**: Data-driven proof for future scaling

**Remove Large-Scale Success Factors** (if present):
- Large team coordination
- Multi-site management
- Institutional partnerships (unless grassroots)
- Large capital mobilization
- Complex operational systems

**Verification**:
- [ ] Success factors appropriate for 1 ha pilot
- [ ] Focus on validation, not operational excellence
- [ ] Founder-level achievements, not organizational
- [ ] Consistent with v2.0 compliant documents

---

### ❌ FIX-004: Convert 04_Current_Status_Assessment.md to v2.0 Bootstrap Model

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🚨 CRITICAL  
**Task ID**: New (Curator suspects v1.0 content)

**File**: `04_Current_Status_Assessment.md`

**Issue**: 
Current status should reflect v2.0 Bootstrap Model adoption and realistic current state.

**Fix Required**:

**Update to reflect November 2025 v2.0 Bootstrap status**:

1. **Planning Complete**: 
   - ✅ Bootstrap Model defined (v2.0.0)
   - ✅ 1 ha pilot approach documented
   - ✅ Budget framework: €20-30k Y1, €50-75k total
   - ✅ Technology specs defined (3-5 kW solar, rainwater)
   - ✅ Implementation tasks created

2. **Pre-Launch Phase**:
   - Current: Documentation and preparation
   - Next: Crowdfunding campaign preparation
   - Target: Launch crowdfunding Q1 2026
   - Goal: Secure €20-30k for Year 1

3. **Key Decisions Made**:
   - Model: Bootstrap proof-of-concept (not large-scale launch)
   - Scale: 1 hectare pilot site
   - Technology: Off-grid essentials (solar + rainwater)
   - Living: DIY tiny house (€8-12k)
   - Approach: Prove first, scale later

4. **Current Priorities**:
   - Finalize site selection criteria
   - Prepare crowdfunding materials
   - Build community interest
   - Refine budget and timeline

**Remove v1.0 Status Items** (if present):
- Large capital secured
- Multi-hectare site selected
- Large team assembled
- Complex systems in place

**Verification**:
- [ ] Status reflects v2.0 Bootstrap reality
- [ ] Timeline current (November 2025)
- [ ] Next steps align with 42_Next_Steps_90_Days.md
- [ ] No contradictions with v2.0 compliant documents

---

### ❌ FIX-023: Convert 00_Eco_Balance_Hub.md to v2.0 Bootstrap Model

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🚨 CRITICAL
**Task ID**: CUR-2025-11-07-023
**Found By**: Curator during Step 1 audit of Strategic Entry Docs

**File**: `00_Eco_Balance_Hub.md`

**Issue**:
The main project hub (front door) has severe version confusion and contains extensive v1.0 Large-Scale content despite claiming to be v2.0.0. This is the most critical issue as it's the first document users see.

**Specific Problems Found**:

1. **Version Confusion**:
   - Line 3: Claims "Version: 2.0.0 (Bootstrap Model)"
   - Line 41: Shows "Current version number (1.0.0)"
   - Line 298: States "Current Version:** 1.0.0 (Production Release)"
   - Clear internal contradiction throughout

2. **v1.0 Large-Scale Project Goals** (Lines 162-166):
   - "Initial Investment Ask:** €250,000-€500,000" (should be €20-30k Y1)
   - "Year 1 Goal: [...] secure 5-10 hectares" (should be 1 hectare)
   - "plant 1,000+ trees" (should be 500-1,000 for 1 ha)
   - "engage 100+ community members" (unrealistic for Bootstrap)
   - "Long-term Vision (10 years): 10,000+ hectares" (aspirational but needs context)

3. **v1.0 90-Day and Year 1 Goals** (Lines 208-221):
   - "€50k+ in funding pipeline" (should be crowdfunding prep)
   - "€250k+ funding secured" (should be €20-30k)
   - "Land site acquired (5-10 ha)" (should be 1 ha)
   - "Core team hired (3 staff)" (should be 1-2 founders)
   - "First plantings completed (1,000+ trees)" (should be initial plantings appropriate for 1 ha)

4. **Broken Cross-References**:
   - Line 69: [[22_Restoration_Challenges_Solutions]] (doesn't exist)
   - Line 86: [[31_Financial_Projections]] (doesn't exist)
   - Line 132: [[41_Phase_1_Foundation]] (doesn't exist)
   - Line 67: Links to [[40_Expansion_Growth_Strategy]] but text says "Implementation Roadmap" (name mismatch)

5. **Release Announcement Confusion** (Lines 11-30):
   - Announces "VERSION 2.0.0 RELEASED!" with Bootstrap details
   - But data throughout file contradicts this announcement
   - Creates misleading impression that conversion is complete

**Fix Required**:

**Phase 1: Fix Version Confusion**:
1. Determine actual current version (recommend: 2.0.0)
2. Make version number consistent throughout (lines 3, 41, 298, 445, etc.)
3. Remove any v1.0 version references unless clearly marked as "archived"

**Phase 2: Update Project Data to v2.0 Bootstrap**:

Lines 162-166 "Project at a Glance":
```markdown
**Initial Investment Ask:** €20,000-€30,000 (Year 1 crowdfunding goal)

**Year 1 Goal:**
- Prepare crowdfunding campaign
- Secure site (1 hectare, lease or low-cost purchase)
- Establish DIY tiny house and off-grid systems
- Begin initial restoration work (soil prep, first plantings)
- Build local community relationships

**3-Year Pilot Goal:**
- Complete 1 hectare proof-of-concept restoration
- Validate methods, document thoroughly
- Demonstrate financial sustainability model
- Create replicable blueprint for others

**Long-term Vision (10+ years):**
- Pilot proves model works → Others replicate globally
- Movement of small-scale restoration projects
- Thousands of hectares restored through replication
```

Lines 208-221 "Next Major Milestones":
```markdown
**90-Day Goals:**
- [ ] Finalize crowdfunding campaign materials
- [ ] Identify 5-10 potential 1 ha sites for evaluation
- [ ] Build pre-launch audience (200-500 people)
- [ ] Prepare detailed Year 1 budget (€20-30k)
- [ ] Create pitch video and documentation
- [ ] Begin community outreach in target regions

**Year 1 Goals:**
- [ ] Crowdfunding campaign successful (€20-30k raised)
- [ ] Site selected and secured (1 hectare)
- [ ] Founders committed full-time or part-time
- [ ] Off-grid systems installed (tiny house, solar, water)
- [ ] Initial restoration work begun
- [ ] Documentation system established

**Year 2-3 Goals:**
- [ ] Restoration work continues (planting, monitoring)
- [ ] Data collection and methodology refinement
- [ ] Community engagement and volunteer programs
- [ ] Financial sustainability demonstrated
- [ ] Complete documentation for replication
```

**Phase 3: Fix Cross-References**:
- Fix broken links (see FIX-005, FIX-006, FIX-007, FIX-008)
- Ensure all hub navigation links functional

**Phase 4: Align Release Announcement**:
- Update v2.0 release announcement (lines 11-30) to be accurate
- Either: Complete v2.0 conversion, then announcement is accurate
- Or: Modify announcement to say "v2.0 Bootstrap Model DEFINED" (not "released")

**Reference Documents** (Use these as v2.0 examples):
- `20_Restoration_Methodology.md` - v2.0 compliant
- `21_Technology_Integration.md` - v2.0 compliant
- `30_Business_Model.md` - v2.0 compliant
- `32_Funding_Strategy.md` - v2.0 compliant
- `42_Next_Steps_90_Days.md` - v2.0 compliant
- `43_Operations_Action_Plan.md` - v2.0 compliant
- `44_Site_Selection_Land_Acquisition.md` - v2.0 compliant
- `45_Tiny_House_and_Living_Infrastructure.md` - v2.0 compliant

**Verification**:
- [ ] Version number consistent throughout file (one version only)
- [ ] All "Project at a Glance" data is v2.0 Bootstrap (€20-30k, 1 ha, etc.)
- [ ] All milestone goals are v2.0 Bootstrap appropriate
- [ ] No contradictions between announcement and content
- [ ] All cross-references functional
- [ ] No v1.0 Large-Scale data (except in historical/archive context)
- [ ] Document reads as coherent, professional "front door"

**Priority Justification**:
This is the PROJECT HUB - the main entry point and navigation center. It must be accurate and consistent. Version confusion here undermines trust in entire documentation system. **CRITICAL** priority justified.

**Related Tasks**:
- FIX-001 through FIX-004 (other strategic entry docs)
- FIX-005 through FIX-008 (cross-reference fixes)
- Should be fixed early to establish correct foundation

---

## 🔴 HIGH PRIORITY FIXES

These fixes are important for vault integrity and user trust. Complete after CRITICAL fixes.

### ⚠️ FIX-005: Fix Broken Cross-Reference to 22_Research_Framework

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🔴 HIGH  
**Task ID**: CUR-2025-11-07-002 (partial)

**File**: `01_Executive_Summary.md` (and any other files linking to doc 22)

**Issue**: 
Link to [[22_Research_Framework|Research Framework]] points to non-existent file.

**Fix Options** (Choose one):

**Option A: Create Document 22**
- Create `22_Research_Framework.md`
- Document scientific approach, monitoring protocols, data collection
- Align with v2.0 Bootstrap scale (1 ha pilot research, not multi-site)
- Use strategic_document_template.md

**Option B: Redirect to Existing Content**
- Update link to point to `20_Restoration_Methodology.md` (scientific approach section)
- Add research framework section to doc 20 if needed
- Update link text: [[20_Restoration_Methodology#research-approach|Research Framework]]

**Option C: Remove Reference**
- If research framework detail not critical, remove the link
- Ensure surrounding text still flows well

**Recommendation**: Option B (redirect) - Research framework naturally belongs in Methodology document.

**Verification**:
- [ ] Link functional (goes to existing content)
- [ ] Link text accurate (describes where it goes)
- [ ] No other references to doc 22 remaining

**Related Tasks**: FIX-001 (may resolve link during Executive Summary rewrite)

---

### ⚠️ FIX-006: Fix Broken Cross-Reference to 31_Financial_Projections

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🔴 HIGH  
**Task ID**: CUR-2025-11-07-002 (partial)

**File**: `01_Executive_Summary.md` (and any other files linking to doc 31)

**Issue**: 
Link to [[31_Financial_Projections|Financial Projections]] points to non-existent file.

**Fix Options** (Choose one):

**Option A: Create Document 31**
- Create `31_Financial_Projections.md`
- Provide 3-5 year financial projections for Bootstrap Model
- Include: Y1 €20-30k, Y2 €15-20k, Y3 €10-15k, then reassess
- Revenue projections from crowdfunding, workshops, consulting
- Use strategic_document_template.md

**Option B: Redirect to Existing Content**
- Update link to point to `30_Business_Model.md` (financial section)
- Or point to `32_Funding_Strategy.md` (funding timeline section)
- Update link text accordingly

**Option C: Remove Reference**
- Remove detailed projections reference
- Keep financial summary in Executive Summary itself

**Recommendation**: Option A (create) - Financial projections are important for investor/funder confidence, even for Bootstrap scale.

**Verification**:
- [ ] Link functional
- [ ] Financial projections present and v2.0 compliant
- [ ] No contradictions with Business Model (30) or Funding Strategy (32)

**Related Tasks**: FIX-001 (may affect financial section in Executive Summary)

---

### ⚠️ FIX-007: Fix Broken Cross-Reference to 41_Phase_1_Foundation

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🔴 HIGH  
**Task ID**: CUR-2025-11-07-002 (partial)

**File**: `01_Executive_Summary.md` (and possibly other files)

**Issue**: 
Link to [[41_Phase_1_Foundation|Phase 1]] points to non-existent file.

**Fix Options** (Choose one):

**Option A: Create Document 41**
- Create `41_Phase_1_Foundation.md`
- Detail Phase 1 (Bootstrap Pilot): Years 1-3, 1 ha, €50-75k
- Distinguish from Phase 2 (Scaling Consideration): Years 4+
- Use strategic_document_template.md

**Option B: Redirect to Existing Content**
- Update link to point to `42_Next_Steps_90_Days.md` (immediate actions)
- Or point to `43_Operations_Action_Plan.md` (Phase 1 operations)
- Update link text: [[42_Next_Steps_90_Days|Phase 1 Actions]]

**Option C: Remove Reference**
- If phased approach detail not critical, remove link
- Simplify to "initial phase" without separate document

**Recommendation**: Option B (redirect to 42) - Next Steps document covers Phase 1 launch adequately, or Option A if detailed phasing important.

**Verification**:
- [ ] Link functional
- [ ] Phase 1 content aligns with Bootstrap Model
- [ ] No contradictions with operations, next steps, expansion docs

---

### ⚠️ FIX-008: Fix Mismatched Cross-Reference to 40 (Implementation Roadmap vs Expansion Growth)

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🔴 HIGH  
**Task ID**: CUR-2025-11-07-002 (partial)

**File**: `01_Executive_Summary.md` (line ~55) and any other files with mismatch

**Issue**: 
Link text says [[40_Implementation_Roadmap|Roadmap]] but file 40 is actually `40_Expansion_Growth_Strategy.md`.

**Fix Options** (Choose one):

**Option A: Update Link Text**
- Change to: [[40_Expansion_Growth_Strategy|Growth Roadmap]]
- Or: [[40_Expansion_Growth_Strategy|Implementation Roadmap]] (if doc 40 covers implementation)

**Option B: Update File 40 Name**
- Rename `40_Expansion_Growth_Strategy.md` to `40_Implementation_Roadmap.md`
- Ensure content matches new name (implementation + growth)
- Update all references

**Option C: Create New Doc 40, Rename Current to 41**
- Create new `40_Implementation_Roadmap.md` (overall roadmap)
- Rename current to `41_Expansion_Growth_Strategy.md`
- Update all references (may solve FIX-007 too!)

**Recommendation**: Option A (simplest) - Just update link text to match actual file name.

**Verification**:
- [ ] Link functional
- [ ] Link text accurately describes destination
- [ ] All other references to doc 40 checked and updated if needed

---

### ⚠️ FIX-024: Fix Mismatched Cross-Reference to 22 (Research Framework vs Restoration Challenges Solutions)

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

## 🟡 MEDIUM PRIORITY FIXES

These improve vault quality and consistency. Complete after HIGH priority fixes.

### ⚠️ FIX-009: Convert 10_Organizational_Structure.md to v2.0 Bootstrap Model

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🟡 MEDIUM  
**Task ID**: New

**File**: `10_Organizational_Structure.md`

**Issue**: 
Organizational structure for 1 ha pilot (1-2 founders) differs drastically from large-scale operation.

**Fix Required**:

**v2.0 Bootstrap Organizational Structure**:

1. **Flat Structure**: 
   - Founder(s): All decisions, wearing multiple hats
   - No departments, no hierarchy
   - Expert consultants as needed (not employees)

2. **Roles Covered by Founders**:
   - Project management
   - Site work (restoration, building)
   - Technology (solar, water)
   - Finance and administration
   - Community engagement
   - Documentation and reporting

3. **External Support**:
   - Legal: Lawyer for gGmbH setup (one-time)
   - Technical: Occasional expert consultations
   - Community: Volunteer engagement
   - Financial: Accountant for annual reporting

4. **Growth Path**:
   - Phase 1 (Y1-3): Founders only
   - Phase 2 (Y4+): Consider first hire if scaling
   - Phased team growth tied to proven revenue

**Remove Large-Scale Org Elements** (if present):
- Department structure
- Multiple management layers
- Full-time staff beyond founders
- Complex governance structures (keep simple for gGmbH)

**Verification**:
- [ ] Structure reflects 1-2 founders
- [ ] No contradiction with 11_Governance.md
- [ ] Aligned with 12_Team_Roles.md
- [ ] Realistic for €50-75k total budget

---

### ⚠️ FIX-010: Convert 11_Governance.md to v2.0 Bootstrap Model

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🟡 MEDIUM  
**Task ID**: New

**File**: `11_Governance.md`

**Issue**: 
Governance for small Bootstrap venture should be simpler than large organization.

**Fix Required**:

**v2.0 Bootstrap Governance**:

1. **Legal Structure**: gGmbH (gemeinnützige GmbH - non-profit LLC)
   - Founders as Geschäftsführer (managing directors)
   - Simple decision-making: Founder consensus
   - Annual general assembly (founders + advisors)

2. **Decision-Making**:
   - Strategic: Founder(s) decide
   - Operational: Founder(s) execute
   - Financial: Founder(s) approve (within budget)
   - Major changes: Document and discuss (transparency)

3. **Accountability**:
   - Financial: Annual reports to authorities
   - Community: Regular updates to supporters/funders
   - Impact: Quarterly documentation of restoration progress
   - Transparency: Public reporting of funds and results

4. **Governance Evolution**:
   - Phase 1: Founder governance only
   - Phase 2: Advisory board if scaling
   - Phase 3: Formal board if becoming large organization

**Remove Complex Governance** (if present):
- Multi-stakeholder boards
- Complex committee structures
- Elaborate decision matrices
- Large-organization policies

**Verification**:
- [ ] Governance appropriate for gGmbH
- [ ] Simple and founder-centric
- [ ] Consistent with 10_Organizational_Structure.md
- [ ] Meets legal requirements for German non-profit

---

### ⚠️ FIX-011: Convert 12_Team_Roles.md to v2.0 Bootstrap Model

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🟡 MEDIUM  
**Task ID**: New (Curator marked as CRITICAL in analysis)

**File**: `12_Team_Roles.md`

**Issue**: 
Team roles for Bootstrap Model: 1-2 founders wearing multiple hats, not specialized roles.

**Fix Required**:

**v2.0 Bootstrap Team Roles**:

**Founder Role (1-2 people)**:
- **Primary**: Visionary, Decision-Maker, On-Site Worker
- **Responsibilities**:
  - Site restoration work (planting, building, maintenance)
  - Technology management (solar, water systems)
  - Financial management (budgets, crowdfunding, reporting)
  - Community engagement (relationships, volunteers, updates)
  - Documentation (progress tracking, lessons learned)
  - Administration (legal, contracts, compliance)

**Skills Needed**:
- Permaculture/Restoration knowledge
- Basic construction and DIY skills
- Off-grid technology understanding
- Project management
- Communication and fundraising
- Resilience and adaptability

**External Roles** (as needed, not employees):
- Legal advisor (gGmbH setup, contracts)
- Technical consultants (complex systems)
- Accountant (annual reports)
- Volunteer coordinators (community projects)

**Remove Specialized Roles** (if present):
- Full-time staff positions
- Department heads
- Specialized managers
- Large team structure

**Verification**:
- [ ] Roles reflect 1-2 founders
- [ ] Multi-hat approach clear
- [ ] Consistent with 10_Organizational_Structure.md
- [ ] Skills align with Bootstrap requirements

---

### ⚠️ FIX-012: Verify and Align 13_Legal_Framework.md with v2.0 Bootstrap Model

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🟡 MEDIUM  
**Task ID**: New

**File**: `13_Legal_Framework.md`

**Issue**: 
Legal requirements and costs should reflect Bootstrap scale, not large organization.

**Fix Required**:

**Verify v2.0 Bootstrap Legal Requirements**:

1. **gGmbH Formation**:
   - Formation cost: €1,500-3,000 (legal + notary)
   - Minimum capital: €1 (symbolic, but €5,000-10,000 recommended)
   - Registration: Trade register, tax office

2. **Ongoing Compliance**:
   - Annual financial statements
   - Tax returns (non-profit status)
   - Purpose documentation (restoration activities)
   - Minimal administrative burden

3. **Land Acquisition/Lease**:
   - Purchase agreement or lease contract
   - Land registration
   - Building permits (for tiny house, if required)
   - Environmental permits (restoration activities)

4. **Employment/Founder Status**:
   - Founders can be Geschäftsführer (managing directors)
   - Self-employment or minimal salary
   - Insurance requirements (health, liability)

5. **Bootstrap Considerations**:
   - Keep legal costs minimal (€2-3k one-time)
   - Annual compliance: €500-1,000 (accountant)
   - Liability insurance: €300-500/year
   - Total legal/admin: €3-4k in budget

**Remove Large-Organization Legal Complexity** (if present):
- Complex partnership agreements (keep simple for 1-2 founders)
- Large staff employment contracts
- Multi-entity structures
- Extensive legal departments/budgets

**Verification**:
- [ ] Legal costs align with v2.0 budget (€3-4k)
- [ ] gGmbH requirements accurate for Germany
- [ ] Consistent with 10_Organizational_Structure.md and 11_Governance.md
- [ ] Practical for 1-2 founders to manage

---

### ⚠️ FIX-013: Verify 40_Expansion_Growth_Strategy.md Aligns with v2.0 Bootstrap Phasing

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🟡 MEDIUM  
**Task ID**: New

**File**: `40_Expansion_Growth_Strategy.md`

**Issue**: 
Expansion strategy should clearly reflect Bootstrap Model phasing: Prove first (Phase 1), then scale (Phase 2+).

**Fix Required**:

**Verify v2.0 Bootstrap Phasing**:

**Phase 1: Proof-of-Concept (Years 1-3)**
- Scale: 1 hectare pilot
- Budget: €50-75k total
- Team: 1-2 founders
- Goal: Validate restoration model
- Outcome: Data, documentation, proof of concept

**Phase 2: Replication Consideration (Years 4-5)**
- Decision point: Did Phase 1 succeed?
- If YES: Seek funding for replication (5-10 ha)
- If PARTIAL: Refine and extend pilot
- If NO: Document lessons, pivot or conclude

**Phase 3: Scale (Years 6+)**
- Only if Phase 2 successful
- Multiple sites, larger scale (10+ hectares)
- Team growth (3-10 people)
- Budget: €100k-500k+ (per site)
- Model: Replicate, don't centralize

**Key Principles**:
- No assumptions about Phase 2+ happening
- Each phase conditional on previous success
- Documentation enables replication by others (movement, not just one org)
- Bootstrap forever: even Phase 3 sites start small

**Remove Large-Scale Launch Assumptions** (if present):
- Simultaneous multi-site expansion
- Large capital mobilization in early years
- Assumption of automatic growth
- Central organization managing many sites

**Verification**:
- [ ] Clear phasing: Pilot → Prove → Consider scaling
- [ ] Phase 1 focus on validation, not operation
- [ ] Expansion contingent on success
- [ ] Consistent with Bootstrap Model principles

---

### ⚠️ FIX-014: Verify 50_Risk_Assessment.md Reflects v2.0 Bootstrap Risks

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🟡 MEDIUM  
**Task ID**: New

**File**: `50_Risk_Assessment.md`

**Issue**: 
Risk profile for 1 ha Bootstrap pilot differs from large-scale operation.

**Fix Required**:

**v2.0 Bootstrap Risk Assessment**:

**Financial Risks** (MEDIUM-LOW for Bootstrap):
- Total exposure: €50-75k (not €500k-2M)
- Crowdfunding may fail: Mitigation = pre-validate interest
- Budget overruns: Mitigation = DIY-first, contingency buffer
- No revenue Phase 1: Expected, mitigated by low founder salaries

**Technical Risks** (MEDIUM):
- Off-grid systems fail: Solar, water critical for living
- Restoration methods don't work: Pilot's purpose is to test
- Site unsuitable: Thorough site selection process
- Climate challenges: Choose climate-appropriate techniques

**Operational Risks** (MEDIUM):
- Founder burnout: Major risk with 1-2 people
- Skills gaps: Founders may lack some expertise
- Isolation: Remote site = limited support
- Time underestimation: Common in restoration projects

**Reputational Risks** (LOW-MEDIUM):
- Failed pilot: Acceptable if documented well
- Community relations: Critical for small project
- Funder trust: Must deliver on promises (transparency)

**Legal/Regulatory Risks** (LOW):
- Permits delayed: Plan for bureaucracy
- gGmbH compliance: Manageable with accountant
- Land access issues: Lease preferred over purchase initially

**Remove Large-Scale Risks** (if present):
- Multi-million euro financial exposure
- Complex team coordination failures
- Multi-site operational risks
- Large institutional reputation risks

**Verification**:
- [ ] Risk levels appropriate for €50-75k pilot
- [ ] Mitigation strategies realistic for 1-2 founders
- [ ] Major risks identified: burnout, crowdfunding, site selection
- [ ] Consistent with Bootstrap Model constraints

---

### ⚠️ FIX-015: Verify 51_Key_Performance_Indicators.md Scaled for v2.0 Bootstrap

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🟡 MEDIUM  
**Task ID**: New

**File**: `51_Key_Performance_Indicators.md`

**Issue**: 
KPIs must be appropriate for 1 ha pilot, not large-scale operation.

**Fix Required**:

**v2.0 Bootstrap KPIs** (1 hectare, 3 years):

**Restoration KPIs**:
- Trees planted: 500-1,000 (not 10,000)
- Native species diversity: 15-25 species
- Survival rate Year 1: >70%
- Soil organic matter: +1-2% increase over 3 years
- Water retention: Measurable improvement (runoff reduction)

**Technology KPIs**:
- Solar system uptime: >95%
- Water catchment: Meet 100% of needs in wet season, >80% annual
- Off-grid autonomy: >90% energy independence
- System costs: Within €15-20k budget

**Financial KPIs**:
- Crowdfunding: Raise €20-30k for Year 1
- Budget adherence: Stay within €50-75k total (3 years)
- Cost per hectare: Document for replication model
- Volunteer engagement: 20-50 volunteer days/year

**Documentation KPIs**:
- Monthly progress reports: 12/year
- Photographic documentation: Monthly minimum
- Lessons learned: Quarterly reflection documents
- Methodology documentation: Complete by Year 3

**Community KPIs**:
- Local partnerships: 3-5 active relationships
- Visitor days: 10-30 educational visits/year
- Online engagement: Build audience of 500-2,000 (crowdfunding + updates)
- Volunteer satisfaction: >80% would recommend

**Impact KPIs** (Qualitative for pilot):
- Model validation: Restoration techniques work at this scale
- Replicability: Others can copy the model (documentation quality)
- Learning: Capture 10-20 key lessons
- Proof: Data supports claims (credibility for scaling)

**Remove Large-Scale KPIs** (if present):
- Multi-hectare metrics (10+ ha)
- Large team productivity measures
- Multi-site coordination metrics
- Large revenue/profit targets
- Large-scale carbon credit generation

**Verification**:
- [ ] All KPIs scaled for 1 hectare
- [ ] Targets realistic for 1-2 founders
- [ ] Mix of quantitative and qualitative appropriate for pilot
- [ ] KPIs support "prove first" objective
- [ ] Consistent with methodology (20) and operations (43)

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

### ⚠️ FIX-016: Verify 60_Marketing_Communications_Strategy.md for Bootstrap Approach

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🟡 MEDIUM  
**Task ID**: New

**File**: `60_Marketing_Communications_Strategy.md`

**Issue**: 
Marketing strategy should reflect grassroots/crowdfunding approach, not large PR campaigns.

**Fix Required**:

**v2.0 Bootstrap Marketing Strategy**:

**Phase 1: Pre-Launch (Crowdfunding Prep)**
- Goal: Build audience of 500-2,000 interested people
- Channels: 
  - Social media (Instagram, YouTube): Free, visual storytelling
  - Blog/Website: Document planning process
  - Email list: 200-500 subscribers before launch
  - Local media: Pitch human interest story
- Budget: €500-1,000 (website, basic tools)

**Phase 2: Crowdfunding Campaign**
- Goal: Raise €20-30k from 100-300 backers
- Strategy:
  - Video pitch (DIY production)
  - Tiered rewards ($10-500)
  - Regular updates
  - Personal outreach
- Budget: €1,000-2,000 (platform fees, video production)

**Phase 3: Ongoing Communications**
- Goal: Keep supporters engaged, attract volunteers/partners
- Frequency: Monthly updates minimum
- Content:
  - Progress photos and videos
  - Lessons learned
  - Community engagement opportunities
  - Transparent challenges and wins
- Budget: €200-500/year (tools, subscriptions)

**Messaging Focus**:
- "Proof-of-concept": We're testing, learning, documenting
- "Replicable model": You can copy this approach
- "Transparent journey": Sharing everything (success and failure)
- "Community-powered": Your support makes this possible

**Remove Large-Scale Marketing** (if present):
- Professional PR agency (€10k+ budgets)
- Large advertising spend
- Corporate partnerships focus
- Multi-channel campaign complexity
- Professional marketing staff

**Verification**:
- [ ] Marketing budget: €2-4k total (realistic for Bootstrap)
- [ ] Strategy focuses on crowdfunding and community
- [ ] Messaging emphasizes pilot/proof-of-concept
- [ ] DIY-first approach (not professional agencies)
- [ ] Consistent with 32_Funding_Strategy.md

---

### ⚠️ FIX-017: Verify 70_Case_Studies_Restoration_Examples.md for Relevant Scale

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🟡 MEDIUM  
**Task ID**: New

**File**: `70_Case_Studies_Restoration_Examples.md`

**Issue**: 
Case studies should include small-scale examples relevant to 1 ha Bootstrap pilot.

**Fix Required**:

**Ensure Case Study Mix**:

**Small-Scale Examples** (Priority for v2.0):
- 0.5-2 hectare restoration projects
- Founder-led or small team projects
- Bootstrap or low-budget approaches
- DIY methods and appropriate technology
- Documented challenges and real costs

**Medium-Scale Examples**:
- 5-10 hectare projects
- Community-led initiatives
- Growth path from pilot to operation
- Replication strategies

**Large-Scale Examples** (Context only):
- Large restoration projects (for inspiration)
- Note: "This is our long-term vision, not Year 1"
- Lessons applicable to small-scale

**For Each Case Study, Document**:
- Scale (hectares)
- Budget (total and per hectare)
- Team size
- Timeline
- Key challenges
- Lessons learned
- Replicability factors

**Verification**:
- [ ] At least 3-5 small-scale case studies (0.5-2 ha)
- [ ] Budgets documented (show range of possibilities)
- [ ] Mix of scales (small, medium, large)
- [ ] Clear relevance to 1 ha Bootstrap Model
- [ ] Lessons applicable to Eco Balance approach

---

### ⚠️ FIX-018: Standardize Terminology Across All Documents

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🟡 MEDIUM  
**Task ID**: CUR-2025-11-07-004

**Files**: All vault documents

**Issue**: 
After v1.0 → v2.0 conversion, terminology may be inconsistent across documents.

**Fix Required**:

**Create and Apply Terminology Standards**:

1. **Create Terminology Glossary** (`_vault_maintenance/TERMINOLOGY.md`):

**Standard Terms (v2.0 Bootstrap)**:
- **Model**: "Bootstrap Model" or "v2.0 Bootstrap"
- **Scale**: "1 hectare pilot" (not "small-scale" which is vague)
- **Budget**: "€20-30k Year 1, €50-75k total" (specific)
- **Team**: "1-2 founders" or "founder(s)"
- **Timeline**: "3-year pilot phase" or "Phase 1: Years 1-3"
- **Solar**: "3-5 kW off-grid solar system"
- **Water**: "Rainwater harvesting with IBC tank storage"
- **Living**: "DIY tiny house (€8-12k)"
- **Approach**: "Proof-of-concept" or "validation pilot"
- **Success**: "Prove first, scale later"

**Deprecated Terms** (Remove these):
- "Atmospheric Water Generator (AWG)" → Remove completely
- "Large-scale launch" → "Pilot launch"
- "Multi-site operation" → Not mentioned in Phase 1 docs
- "5-10 hectares" → Only in expansion/Phase 2 context
- "€250k-500k" → Only historical context (v1.0)

**Ambiguous Terms to Clarify**:
- "Phase 1" → Always specify: "Phase 1: Bootstrap Pilot (Y1-3, 1 ha)"
- "Restoration site" → Specify: "1 hectare pilot site"
- "Team" → Clarify: "Founder team (1-2 people)"

2. **Search and Replace** across all documents:
   - Search for deprecated terms
   - Replace with standard terms
   - Ensure consistency

3. **Verification Audit**:
   - Run search for "AWG"
   - Run search for "€250" or "€500"
   - Run search for "5-10 hectare" or "10 hectare"
   - Run search for "atmospheric water"
   - Verify all instances corrected or contextualized

**Verification**:
- [ ] Terminology glossary created
- [ ] All deprecated terms removed (except historical context)
- [ ] Standard terms used consistently
- [ ] Ambiguous terms clarified throughout

**Related Tasks**: This affects all conversion tasks (FIX-001 through FIX-017)

---

## 🟢 LOW PRIORITY FIXES

These enhance vault quality but are not urgent. Complete after all higher priority fixes.

### ⚠️ FIX-019: Create Terminology Index (Enhancement)

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🟢 LOW  
**Task ID**: CUR-2025-11-07-006

**File**: Create new `_vault_maintenance/TERMINOLOGY.md`

**Issue**: 
No centralized terminology reference for consistency. Terminology glossary created in FIX-018 serves as foundation.

**Fix Required**:

**Create Comprehensive Terminology Index**:

1. **Standard Terms** (from FIX-018 glossary)
2. **Technical Terms**:
   - Permaculture techniques
   - Restoration ecology terms
   - Off-grid technology specifications
3. **Financial Terms**:
   - Budget categories
   - Funding sources
   - Cost definitions
4. **Organizational Terms**:
   - Legal structures
   - Roles and responsibilities
   - Governance terms
5. **Project Phases**:
   - Phase definitions
   - Timeline terminology
   - Milestone markers

**Format**:
- Alphabetical list
- Term: Definition and usage guidance
- Example usage in context
- Related terms (cross-references)

**Verification**:
- [ ] Terminology index complete
- [ ] All key terms defined
- [ ] Usage examples provided
- [ ] Referenced in README or QUICKSTART

---

### ⚠️ FIX-020: Polish Implementation Task Cross-References

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🟢 LOW  
**Task ID**: New

**Files**: All `implementation_tasks/` files (44 files)

**Issue**: 
After strategic document updates, ensure implementation tasks link correctly to updated strategic docs.

**Fix Required**:

**For Each Implementation Task Category**:

1. **Verify Strategic Document Links**:
   - Links to methodology (20)
   - Links to technology (21)
   - Links to business model (30)
   - Links to operations (43)
   - Links to site selection (44)
   - Links to other relevant strategic docs

2. **Verify Inter-Task Links**:
   - Cross-references between related tasks
   - Sequential task dependencies
   - Category overview links

3. **Update if Broken**:
   - Fix any broken links from strategic doc changes
   - Add helpful links if missing
   - Remove outdated references

**Priority Order** (if time limited):
1. Site selection tasks (most immediately relevant)
2. Reforestation and biodiversity tasks (core restoration)
3. Water management and soil restoration (foundational)
4. Community engagement (supporting activities)

**Verification**:
- [ ] All implementation task links functional
- [ ] Links to strategic docs updated
- [ ] Inter-task cross-references accurate
- [ ] No broken links remaining

---

### ⚠️ FIX-021: Update QUICK_REFERENCE_GUIDE.md for v2.0 Clarity

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🟢 LOW  
**Task ID**: New (for completeness)

**File**: `QUICK_REFERENCE_GUIDE.md`

**Issue**: 
Quick reference should prominently feature v2.0 Bootstrap Model key facts.

**Fix Required**:

**Add Bootstrap Model Quick Reference Section** (at top):

```markdown
## 🚀 v2.0 Bootstrap Model Quick Facts

**Project Scale**: 1 hectare pilot site  
**Timeline**: 3-year validation phase (Phase 1)  
**Budget**: €20-30k Year 1, €50-75k total  
**Team**: 1-2 founders (multi-hat roles)  
**Technology**: 3-5 kW solar + rainwater harvesting (€15-20k)  
**Living**: DIY tiny house (€8-12k)  
**Funding**: Crowdfunding + bootstrap capital  
**Goal**: Prove restoration model works, then consider scaling  

**Phase 1 Success = Model Validation + Documentation + Proof-of-Concept**
```

**Verify Navigation**:
- [ ] All links in quick reference functional
- [ ] Most relevant documents highlighted
- [ ] v2.0 Bootstrap facts prominent
- [ ] Easy to scan and use

**Verification**:
- [ ] Bootstrap Model facts added
- [ ] Navigation links functional
- [ ] Information current and accurate
- [ ] Helpful for quick orientation

---

### ⚠️ FIX-022: Update CHANGELOG.md to Document All Maintenance Work

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete (Date: _____)

**Priority**: 🟢 LOW  
**Task ID**: New (after all fixes complete)

**File**: `CHANGELOG.md`

**Issue**: 
After completing fixes, document all changes made during this maintenance cycle.

**Fix Required**:

**Add Maintenance Entry to v2.0.0 Section**:

```markdown
## [2.0.0] - 2025-11-[DD]

### Added
- Complete Bootstrap Model documentation (1 ha pilot approach)
- Comprehensive implementation tasks across 6 categories
- Vault maintenance system with 6 personas
- Systematic audit and fix workflow

### Changed
- **CRITICAL**: Converted remaining strategic docs to v2.0 Bootstrap Model
  - 01_Executive_Summary.md: Updated to €20-30k Y1, 1 ha pilot scale
  - 02_Project_Vision.md: Aligned with Bootstrap approach
  - 03_Success_Factors.md: Updated for pilot validation goals
  - 04_Current_Status_Assessment.md: Reflects current v2.0 state
  - 10-13_Organizational docs: Scaled for 1-2 founders
  - All financial projections: Aligned with Bootstrap budget
- **FIXED**: All broken cross-references repaired
  - Fixed/redirected links to docs 22, 31, 41
  - Corrected doc 40 reference mismatch
- **STANDARDIZED**: Terminology consistent across all documents
  - Removed all v1.0 Large-Scale references
  - Applied standard v2.0 Bootstrap terminology
  - Created terminology reference

### Removed
- **Atmospheric Water Generator (AWG)** - Replaced with rainwater harvesting
- **v1.0 Large-Scale assumptions** - All converted to v2.0 Bootstrap Model
  - €250k-500k budgets → €20-30k Y1
  - 5-10 hectare scale → 1 hectare pilot
  - Large team → 1-2 founders

### Fixed
- Broken cross-references in strategic documents
- Version inconsistencies between documents
- Budget contradictions across files
- Technology spec discrepancies
- Organizational structure misalignment with Bootstrap scale

### Status
- **Content Health Score**: 72/100 → 95+/100
- **v2.0 Compliance**: 8/22 strategic docs → 22/22 strategic docs
- **Broken Links**: 4 → 0
- **Terminology**: Inconsistent → Standardized

**Version 2.0.0 Status**: ✅ RELEASE-READY
```

**Verification**:
- [ ] All completed fixes documented
- [ ] Changes categorized clearly
- [ ] Metrics show improvement
- [ ] v2.0.0 marked as release-ready (not draft/working)

---

## 📊 FIX COMPLETION TRACKING

### Summary Statistics

**Total Fix Tasks**: 24 tasks (updated 2025-11-07)

**By Priority**:
- 🚨 **CRITICAL**: 5 tasks (FIX-001 to FIX-004, FIX-023)
- 🔴 **HIGH**: 5 tasks (FIX-005 to FIX-008, FIX-024)
- 🟡 **MEDIUM**: 10 tasks (FIX-009 to FIX-018)
- 🟢 **LOW**: 4 tasks (FIX-019 to FIX-022)

**Completion Status**:
- [ ] CRITICAL Priority: ___ / 5 complete
- [ ] HIGH Priority: ___ / 5 complete
- [ ] MEDIUM Priority: ___ / 10 complete
- [ ] LOW Priority: ___ / 4 complete
- [ ] **TOTAL**: ___ / 24 complete

### Estimated Time to Complete

**CRITICAL Fixes** (Must do immediately):
- FIX-001: 2-3 hours (Executive Summary rewrite)
- FIX-002: 1-2 hours (Project Vision conversion)
- FIX-003: 1-2 hours (Success Factors conversion)
- FIX-004: 1-2 hours (Status Assessment conversion)
- FIX-023: 2-3 hours (Hub/Front Door conversion - ADDED 2025-11-07)
- **Total CRITICAL**: 8-12 hours

**HIGH Fixes** (Do next):
- FIX-005 to FIX-008, FIX-024: 3-5 hours (cross-reference fixes)
- **Total HIGH**: 3-5 hours

**MEDIUM Fixes** (Then these):
- FIX-009 to FIX-018: 10-15 hours (remaining conversions + standardization)
- **Total MEDIUM**: 10-15 hours

**LOW Fixes** (Nice to have):
- FIX-019 to FIX-022: 2-4 hours (enhancements)
- **Total LOW**: 2-4 hours

**GRAND TOTAL**: 23-37 hours of focused work

**Recommended Pace**:
- **Week 1**: Complete CRITICAL fixes (5-9 hours, ~1 hour/day)
- **Week 2**: Complete HIGH fixes (2-4 hours, ~30 min/day)
- **Week 3**: Complete MEDIUM fixes (10-15 hours, ~2 hours/day)
- **Week 4**: Complete LOW fixes (2-4 hours, ~30 min/day)

---

## 🎯 SUCCESS CRITERIA

### Fix Completion Goals

**Minimum Viable Fix State** (CRITICAL + HIGH complete):
- ✅ All strategic entry documents (00-04) v2.0 compliant
- ✅ All broken cross-references fixed
- ✅ No contradictory information in key documents
- ✅ Vault usable and trustworthy for readers

**Full Fix State** (CRITICAL + HIGH + MEDIUM complete):
- ✅ All strategic documents v2.0 compliant
- ✅ All organizational documents v2.0 aligned
- ✅ Terminology consistent throughout
- ✅ Vault professional and comprehensive

**Polished State** (All fixes complete):
- ✅ Terminology index available
- ✅ All enhancements complete
- ✅ Vault optimized for maintenance
- ✅ Documentation exemplary

### Expected Outcomes

**After CRITICAL Fixes**:
- Content Health Score: 72 → 85
- User trust restored
- No contradictory guidance
- Entry documents excellent

**After HIGH Fixes**:
- Content Health Score: 85 → 90
- All navigation functional
- Professional integrity
- Reader confidence high

**After MEDIUM Fixes**:
- Content Health Score: 90 → 95
- Full vault consistency
- All docs v2.0 compliant
- Terminology standardized

**After LOW Fixes**:
- Content Health Score: 95 → 98
- Enhancement complete
- Best practices implemented
- Vault exemplary
- **v2.0.0 RELEASE-READY** ✅

---

## 📋 COORDINATION NOTES

### For Other Personas

**After Fixes Complete**:

**For Janitor:**
- Some files may have been created (22, 31, 41 if Option A chosen)
- File organization should be reviewed
- Consider archiving any v1.0 content moved

**For Archivist:**
- Version 2.0.1 should be tagged when fixes complete
- Document conversion decisions (which options chosen)
- Update version control records

**For Auditor:**
- Re-audit strategic documents after conversion
- Verify data consistency across all updates
- Confirm v2.0 compliance comprehensive

**For Librarian:**
- Re-check all cross-references after fixes
- Verify navigation flows correctly
- Update link maps if significant changes

**For Quality Inspector:**
- Polish converted documents after content fixes
- Ensure formatting consistent across updates
- Final quality pass on all changes

**For Curator:**
- Schedule follow-up analysis in 1 week
- Re-assess content health score
- Verify all issues resolved

---

**End of Fix Task List**  
**Status**: Ready for systematic execution  
**Next Action**: Start with FIX-001 (Executive Summary conversion)  
**Expected Completion**: 3-4 weeks at steady pace