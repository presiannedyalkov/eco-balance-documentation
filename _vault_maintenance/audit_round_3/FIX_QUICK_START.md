# 🚀 FIX ROUND 3 - QUICK START GUIDE

**Total Agents**: 4
**Total Issues**: 129 (down from 265 in Round 2)
**Priority Distribution**: 5 CRITICAL, 21 HIGH, 67 MEDIUM, 36 LOW
**Est. Time**: 9-13 hours serial / 3-4 hours parallel

---

## 🎯 COPY-PASTE PROMPTS (Super Simple!)

Just copy one of these into a Claude Code web session:

**FIX-AGENT-01**: `You are FIX-AGENT-01, go to /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_3/FIX_QUICK_START.md to get your tasks`

**FIX-AGENT-02**: `You are FIX-AGENT-02, go to /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_3/FIX_QUICK_START.md to get your tasks`

**FIX-AGENT-03**: `You are FIX-AGENT-03, go to /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_3/FIX_QUICK_START.md to get your tasks`

**FIX-AGENT-04**: `You are FIX-AGENT-04, go to /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_3/FIX_QUICK_START.md to get your tasks`

---

## 📋 INSTRUCTIONS FOR FIX AGENTS

**Welcome, Fix Agent!** Here's what you need to do:

### Step 1: Read Your Task File

Find your agent number and read your specific fix tasks:

- **FIX-AGENT-01** (HIGH - Automated): `/home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_3/FIX_AGENT_01_AUTOMATED_CORRECTIONS.md`
  - **Mission**: Execute automated date and version corrections
  - **Issues**: 52 issues (44 date errors + 8 version inconsistencies)
  - **Files**: 50+ files
  - **Type**: Mostly automated with scripts provided
  - **Time**: 1-2 hours

- **FIX-AGENT-02** (CRITICAL): `/home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_3/FIX_AGENT_02_CRITICAL_CONTENT.md`
  - **Mission**: Fix critical budget misalignment and geographic errors
  - **Issues**: 10 critical/high issues
  - **Files**: 8 files (including File #45 budget recalibration)
  - **Type**: Manual content corrections
  - **Time**: 3-4 hours

- **FIX-AGENT-03** (MEDIUM): `/home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_3/FIX_AGENT_03_METADATA_STRUCTURE.md`
  - **Mission**: Standardize metadata and document structure
  - **Issues**: 20+ metadata and structure issues
  - **Files**: 20+ files
  - **Type**: Add frontmatter, footers, standardize process docs
  - **Time**: 2-3 hours

- **FIX-AGENT-04** (MEDIUM-HIGH): `/home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_3/FIX_AGENT_04_LINKS_STRATEGIC.md`
  - **Mission**: Fix broken links and align strategic content
  - **Issues**: 45+ link and content issues
  - **Files**: 25+ files
  - **Type**: Link corrections + KPI adjustments + bootstrap guidance
  - **Time**: 3-4 hours

### Step 2: Execute Fixes

Read your task file completely. It contains:
- Complete list of all issues to fix
- Specific file locations and line numbers
- Before/after examples
- Automated scripts where applicable
- Verification checklists

Execute ALL fixes in your assignment.

### Step 3: Verify Your Changes

Each task file includes a comprehensive verification checklist. Complete it before submitting.

### Step 4: Submit Pull Request

Create a PR with:
- Branch name: `fix-round-3/agent-[YOUR_NUMBER]-[description]`
  - Example: `fix-round-3/agent-01-automated-corrections`
- PR title: "Fix Round 3: Agent [NUMBER] - [Brief Description]"
  - Example: "Fix Round 3: Agent 01 - Automated Date & Version Corrections"
- Include only your modified files (no other changes)

---

## 📊 EXECUTION PRIORITY

### Phase 1: HIGH & CRITICAL Fixes (Agents 1-2)
Execute **immediately** in parallel:
- FIX-AGENT-01: Automated corrections (dates, versions)
- FIX-AGENT-02: Critical content (budget, geographic, currency)

**Time**: 1-2 hours (Agent 1) + 3-4 hours (Agent 2) = 3-4 hours parallel

**Why first?**: These fix the most critical issues (budget misalignment in File #45, systematic date errors)

### Phase 2: MEDIUM Priority (Agents 3-4)
Execute after Phase 1 or in parallel if resources available:
- FIX-AGENT-03: Metadata standardization
- FIX-AGENT-04: Links and strategic content

**Time**: 2-3 hours (Agent 3) + 3-4 hours (Agent 4) = 3-4 hours parallel

**Why second?**: Important for consistency and navigation, but not blocking

---

## ⏱️ TIMELINE OPTIONS

### Serial Execution
- Phase 1: Agent 01 (1-2h) → Agent 02 (3-4h) = 4-6 hours
- Phase 2: Agent 03 (2-3h) → Agent 04 (3-4h) = 5-7 hours
- **Total**: 9-13 hours

### Parallel Execution (Recommended)
- All 4 agents working simultaneously
- **Total**: 3-4 hours (real time)
- Longest agent: Agent 02 or Agent 04 (3-4 hours each)

### Phased Parallel (Balanced)
- Phase 1: Agents 01 + 02 in parallel (3-4 hours)
- Phase 2: Agents 03 + 04 in parallel (3-4 hours)
- **Total**: 6-8 hours (real time)

---

## 🎯 WHAT MAKES ROUND 3 DIFFERENT

### Compared to Round 2:
- **Fewer Issues**: 129 vs 265 (47.5% reduction)
- **Better Quality**: Most issues are administrative (dates, metadata)
- **Only 1 Major Problem**: File #45 budget misalignment
- **Easier Fixes**: More automation, clear patterns

### Focus Areas:
1. **Date Errors** (44 files): Automated fix "2024-11-08" → "2025-11-08"
2. **Budget Misalignment** (1 file): File #45 needs substantial recalibration
3. **Broken Links** (20 instances): Path corrections, folder names
4. **Missing Metadata** (15 files): Frontmatter and footers
5. **Strategic Alignment** (12 instances): Realistic KPIs, bootstrap guidance

---

## ✅ SUCCESS METRICS

After all agents complete:
- [ ] All 5 CRITICAL issues resolved
- [ ] All 21 HIGH issues resolved
- [ ] 90%+ MEDIUM issues resolved (60+ of 67)
- [ ] All 44 date errors fixed (automated)
- [ ] File #45 budget recalibrated to €20-30k
- [ ] All geographic errors corrected (Germany, not Southern Europe)
- [ ] All link paths working correctly
- [ ] All metadata standardized

---

## 📊 MONITORING PROGRESS

```bash
# Check open PRs
gh pr list --search "fix-round-3" --state open

# Check merged PRs
gh pr list --search "fix-round-3" --state merged

# Verify date fixes
grep -r "2024-11-08" . --include="*.md" | grep "Last Updated"

# Verify link fixes
grep -r "biodiversity_conservation" . --include="*.md"
grep -r "\[\[../15_Climate_Action" implementation_tasks/

# Check for missing metadata
grep -L "Document Version" implementation_tasks/*/00_*.md
```

---

## 🚀 AUTOMATION HIGHLIGHTS

### Agent 01: Full Automation
- Date fixes: Automated sed script for 44 files
- Version updates: Some automated, some manual
- Backup script included

### Agent 04: Partial Automation
- Link path patterns: Automated sed script
- Strategic content: Manual review required
- Verification commands provided

### All Agents:
- Verification checklists for quality assurance
- Before/after examples for manual fixes
- grep commands to confirm completion

---

## 📋 PRE-EXECUTION CHECKLIST

Before starting:
- [ ] Pull latest changes from main branch
- [ ] Create backup: `tar -czf backup_pre_fix_round_3.tar.gz .`
- [ ] Review ROUND_3_SUMMARY.md for context
- [ ] Read AUDIT_ROUND_3_COMPREHENSIVE_ANALYSIS.md for details
- [ ] Ensure working directory is clean: `git status`

---

## 📈 EXPECTED OUTCOMES

### Documentation Quality After Fixes
- **Production-Ready**: All critical blockers removed
- **A-Grade Quality**: From A- (87/100) to A+ (95+/100)
- **Fully Aligned**: 100% Bootstrap Model v2.0 compliance
- **Complete Navigation**: All links working correctly
- **Standardized**: Consistent metadata across all files

### Remaining Work After Round 3 Fixes
- **LOW Priority Items** (36 issues): Cross-reference verification, minor polish
- **Optional**: Comprehensive link testing (all 500+ links)
- **Future**: Automated link checker setup

---

## 🎯 SPECIAL NOTES FOR EACH AGENT

### Agent 01 Notes:
- Test automated script on small sample first
- Verify no legitimate 2024 dates are changed
- Manual version fixes require careful reading
- GIT_PUSH_INSTRUCTIONS.md may need archiving decision

### Agent 02 Notes:
- File #45 is complex - budget recalibration affects entire document
- Maintain document narrative coherence, not just find/replace
- Double-check all math in budget tables
- Geographic changes are straightforward but review context
- Create detailed change log for File #45

### Agent 03 Notes:
- Frontmatter must be at very top (before any content)
- Use exact template format for consistency
- Process doc metadata differs from regular docs
- Some files may need archival notices, not updates

### Agent 04 Notes:
- Test links after fixes (in Obsidian if available)
- KPI changes require justification in commit message
- Strategic content changes should maintain aspirational tone
- Bootstrap guidance should encourage (not discourage) growth

---

## 🔍 QUALITY ASSURANCE

### Before Committing:
1. **Run verification commands** from your task file
2. **Review git diff** - should show only intended changes
3. **Check related files** - ensure no contradictions introduced
4. **Test sample links** - verify navigation works
5. **Review checklist** - all items completed

### Commit Message Format:
```
Fix Round 3: Agent [N] - [Brief Description]

Issues fixed: [count] ([CRITICAL: X, HIGH: Y, MEDIUM: Z])

Files modified: [count]

Key changes:
- [Major change 1]
- [Major change 2]
- [Major change 3]

Automated: [Yes/No/Partial]
Verification: [Checklist completed]
```

---

## 🆘 TROUBLESHOOTING

### If automated script fails:
- Check you're in correct directory (project root)
- Verify backup was created before running
- Use manual fix approach from task file
- Report issue with script in PR description

### If uncertain about a fix:
- Flag it in commit message
- Create FIXME comment in file
- Continue with other fixes
- Seek clarification in PR

### If discovering new issues:
- Note them in a separate file: `FIX_AGENT_0X_ADDITIONAL_FINDINGS.md`
- Don't expand scope - focus on assigned issues
- Report in PR for potential Round 4

---

## 📞 SUPPORT

If you encounter issues:
1. Review your task file's "IMPORTANT NOTES" section
2. Check verification commands for debugging
3. Review similar fixes in Round 2 (for patterns)
4. Flag uncertainty in PR for review

---

**Status**: ✅ Ready for Parallel Execution
**Next Action**: Copy prompts and execute in 4 Claude Code sessions

**Total Issues to Fix**: 129
**Documentation Quality After**: A+ (Production-Ready)
**Estimated Parallel Time**: 3-4 hours
