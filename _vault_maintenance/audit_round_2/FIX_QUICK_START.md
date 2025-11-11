# 🚀 FIX ROUND 2 - QUICK START GUIDE

**Total Agents**: 6
**Total Issues**: 265
**Priority Distribution**: 18 CRITICAL, 29 HIGH, 133 MEDIUM, 85 LOW
**Est. Time**: 29-43 hours serial / 6-8 hours parallel

---

## 🎯 COPY-PASTE PROMPTS (Super Simple!)

Just copy one of these into a Claude Code web session:

**FIX-AGENT-01**: `You are FIX-AGENT-01, go to /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/FIX_QUICK_START.md to get your tasks`

**FIX-AGENT-02**: `You are FIX-AGENT-02, go to /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/FIX_QUICK_START.md to get your tasks`

**FIX-AGENT-03**: `You are FIX-AGENT-03, go to /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/FIX_QUICK_START.md to get your tasks`

**FIX-AGENT-04**: `You are FIX-AGENT-04, go to /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/FIX_QUICK_START.md to get your tasks`

**FIX-AGENT-05**: `You are FIX-AGENT-05, go to /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/FIX_QUICK_START.md to get your tasks`

**FIX-AGENT-06**: `You are FIX-AGENT-06, go to /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/FIX_QUICK_START.md to get your tasks`

---

## 📋 INSTRUCTIONS FOR FIX AGENTS

**Welcome, Fix Agent!** Here's what you need to do:

### Step 1: Read Your Task File

Find your agent number and read your specific fix tasks:

- **FIX-AGENT-01** (CRITICAL): `/home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/FIX_AGENT_01_BOOTSTRAP_STRATEGIC.md`
  - **Mission**: Fix Bootstrap Model alignment in 5 strategic documents
  - **Issues**: 21 critical/high issues
  - **Files**: strategic/01_Executive_Summary.md, 02_Project_Vision.md, 00_Eco_Balance_Hub.md (root), 03_Success_Factors.md, 04_Current_Status_Assessment.md
  - **Time**: 4-6 hours

- **FIX-AGENT-02** (CRITICAL): `/home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/FIX_AGENT_02_BOOTSTRAP_IMPLEMENTATION.md`
  - **Mission**: Fix Bootstrap alignment in planning docs + geographic scope
  - **Issues**: 21 critical/high issues
  - **Files**: 12_Team_Roles.md, 40_Expansion_Growth_Strategy.md, 50_Risk_Assessment.md, 30_Business_Model.md, 01_Identify_Potential_Locations.md
  - **Time**: 4-6 hours

- **FIX-AGENT-03** (HIGH): `/home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/FIX_AGENT_03_LINK_CORRECTIONS.md`
  - **Mission**: Fix systematic link path errors (../ → ../../)
  - **Issues**: 101 broken links
  - **Files**: All implementation task subdirectories
  - **Time**: 6-8 hours

- **FIX-AGENT-04** (HIGH): `/home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/FIX_AGENT_04_GEOGRAPHIC_UNITS.md`
  - **Mission**: Convert imperial to metric, replace US content with German
  - **Issues**: 16 critical/high issues
  - **Files**: 5 water management/soil restoration/community engagement files
  - **Time**: 4-6 hours

- **FIX-AGENT-05** (MEDIUM): `/home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/FIX_AGENT_05_METADATA.md`
  - **Mission**: Add metadata to all files, fix date errors
  - **Issues**: 52 issues
  - **Files**: 40+ implementation task files
  - **Time**: 3-4 hours

- **FIX-AGENT-06** (MEDIUM/LOW): `/home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/FIX_AGENT_06_CLARITY_POLISH.md`
  - **Mission**: Improve content clarity, fix inconsistencies, polish
  - **Issues**: 65 issues
  - **Files**: Various files across project
  - **Time**: 5-8 hours

### Step 2: Execute Fixes

Read your task file completely. It contains:
- List of all issues to fix
- Specific file locations and line numbers
- Before/after examples
- Automated scripts where applicable
- Verification checklists

Execute ALL fixes in your assignment.

### Step 3: Verify Your Changes

Each task file includes a verification checklist. Complete it before submitting.

### Step 4: Submit Pull Request

Create a PR with:
- Branch name: `fix-round-2/agent-[YOUR_NUMBER]-[description]`
  - Example: `fix-round-2/agent-01-bootstrap-strategic`
- PR title: "Fix Round 2: Agent [NUMBER] - [Brief Description]"
  - Example: "Fix Round 2: Agent 01 - Bootstrap Model Alignment (Strategic Docs)"
- Include only your modified files (no other changes)

---

## 📊 EXECUTION PRIORITY

### Phase 1: CRITICAL Fixes (Agents 1-2)
Execute **immediately** in parallel:
- FIX-AGENT-01: Bootstrap alignment (strategic)
- FIX-AGENT-02: Bootstrap alignment (implementation)

**Time**: 4-6 hours each

### Phase 2: HIGH Priority Fixes (Agents 3-4)
Execute after Phase 1 or in parallel:
- FIX-AGENT-03: Link path corrections
- FIX-AGENT-04: Geographic/unit corrections

**Time**: 4-8 hours each

### Phase 3: MEDIUM/LOW Priority (Agents 5-6)
Execute after higher priorities:
- FIX-AGENT-05: Metadata standardization
- FIX-AGENT-06: Content clarity & polish

**Time**: 3-8 hours each

---

## ⏱️ TIMELINE OPTIONS

### Serial Execution
- Phase 1: 8-12 hours
- Phase 2: 10-14 hours
- Phase 3: 8-12 hours
- **Total**: 26-38 hours

### Parallel Execution (Recommended)
- All 6 agents working simultaneously
- **Total**: 6-8 hours (real time)

---

## ✅ SUCCESS METRICS

After all agents complete:
- [ ] All 18 CRITICAL issues resolved
- [ ] All 29 HIGH issues resolved
- [ ] All 133 MEDIUM issues resolved
- [ ] 85 LOW issues addressed (where practical)
- [ ] 100% v2.0 Bootstrap Model alignment
- [ ] All links verified working
- [ ] All metadata standardized
- [ ] Geographic/unit content localized for Germany

---

## 📊 MONITORING PROGRESS

```bash
# Check open PRs
gh pr list --search "fix-round-2" --state open

# Check merged PRs
gh pr list --search "fix-round-2" --state merged

# Count remaining issues
# (Review findings files vs fix agent task files)
```

---

**Status**: ✅ Ready for Parallel Execution
**Next Action**: Copy prompts and execute in 6 Claude Code sessions
