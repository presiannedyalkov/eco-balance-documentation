# 🚀 AUDIT ROUND 2 - QUICK START GUIDE

**Total Agents**: 10
**Total Files**: 95
**Avg Files/Agent**: 9-10 files
**Est. Time/Agent**: 40-60 minutes

---

## 🎯 COPY-PASTE PROMPTS (Super Simple!)

Just copy one of these into a Claude Code web session:

**Agent 01**: `You are Agent 01, go to /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/QUICK_START.md to get your tasks`

**Agent 02**: `You are Agent 02, go to /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/QUICK_START.md to get your tasks`

**Agent 03**: `You are Agent 03, go to /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/QUICK_START.md to get your tasks`

**Agent 04**: `You are Agent 04, go to /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/QUICK_START.md to get your tasks`

**Agent 05**: `You are Agent 05, go to /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/QUICK_START.md to get your tasks`

**Agent 06**: `You are Agent 06, go to /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/QUICK_START.md to get your tasks`

**Agent 07**: `You are Agent 07, go to /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/QUICK_START.md to get your tasks`

**Agent 08**: `You are Agent 08, go to /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/QUICK_START.md to get your tasks`

**Agent 09**: `You are Agent 09, go to /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/QUICK_START.md to get your tasks`

**Agent 10**: `You are Agent 10, go to /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/QUICK_START.md to get your tasks`

---

## 📋 INSTRUCTIONS FOR AGENTS

**Welcome, Agent!** Here's what you need to do:

### Step 1: Read Your Assignment File

Find your agent number above and read your specific file assignment:

- **Agent 01**: `/home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AGENT_01_FILES.md`
- **Agent 02**: `/home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AGENT_02_FILES.md`
- **Agent 03**: `/home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AGENT_03_FILES.md`
- **Agent 04**: `/home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AGENT_04_FILES.md`
- **Agent 05**: `/home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AGENT_05_FILES.md`
- **Agent 06**: `/home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AGENT_06_FILES.md`
- **Agent 07**: `/home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AGENT_07_FILES.md`
- **Agent 08**: `/home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AGENT_08_FILES.md`
- **Agent 09**: `/home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AGENT_09_FILES.md`
- **Agent 10**: `/home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AGENT_10_FILES.md`

### Step 2: Read Audit Instructions

Read the comprehensive audit criteria here:
`/home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AUDIT_INSTRUCTIONS.md`

This tells you:
- What to audit (6 personas: Curator, Janitor, Librarian, Auditor, Archivist, Quality Inspector)
- How to categorize issues (CRITICAL/HIGH/MEDIUM/LOW)
- Output format for findings
- What NOT to do (NO SAMPLING!)

### Step 3: Audit ALL Your Assigned Files

**CRITICAL**: Audit ALL files in your assignment list. NO SAMPLING. Read every file completely.

Apply all 6 personas to each file. Document all issues found.

### Step 4: Create Findings File

Create your findings file at:
`/home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/findings/AUDIT_FINDINGS_AGENT_[YOUR_NUMBER].md`

Include:
- Summary stats (total files, issues by severity/persona)
- Issues grouped by file
- Clear fix recommendations

### Step 5: Submit Pull Request

Create a PR with:
- Branch name: `audit-round-2/agent-[YOUR_NUMBER]`
- PR title: "Audit Round 2: Agent [YOUR_NUMBER] Findings"
- Include only your findings file (do not modify source files)

---

## 📊 MONITORING PROGRESS

### Check Agent Completion

```bash
# Count completed PRs
gh pr list --search "audit-round-2" --state open

# View specific agent findings
cat _vault_maintenance/audit_round_2/findings/AUDIT_FINDINGS_AGENT_01.md
```

### Track Coverage

```bash
# Run coverage verification
python3 _vault_maintenance/audit_round_2/verify_coverage.py
```

---

## 🎯 EXPECTED OUTPUTS

Each agent will create:

1. **Findings File**: `_vault_maintenance/audit_round_2/findings/AUDIT_FINDINGS_AGENT_[XX].md`
2. **Pull Request**: Branch `audit-round-2/agent-[XX]`
3. **Summary Stats**: At top of findings file

---

## ✅ POST-EXECUTION

After all 10 agents complete:

1. **Verify Coverage**: Ensure all 95 files were audited
2. **Merge PRs**: Review and merge all findings PRs
3. **Consolidate Findings**: Aggregate all issues by severity
4. **Create Fix Tasks**: Generate FIX_TASKS files for next phase
5. **Archive Round 2**: Move to completed folder

---

## 📈 SUCCESS METRICS

- ✅ 100% file coverage (all 95 files audited)
- ✅ Zero file sampling (every file read completely)
- ✅ All 10 agents completed successfully
- ✅ Issues categorized by severity
- ✅ Findings ready for fix phase

---

## 🔧 TROUBLESHOOTING

### Agent Runs Out of Context
- **Cause**: Files larger than expected or complex analysis
- **Fix**: Agent should still complete all files; findings may be condensed

### Agent Doesn't Read All Files
- **Cause**: Agent misunderstood instructions
- **Fix**: Re-run with explicit "NO SAMPLING" reminder

### Duplicate Issues Across Agents
- **Expected**: Same file issues may be found by multiple agents
- **Fix**: Deduplication happens in consolidation phase

---

**Status**: ✅ Ready for Parallel Execution
**Next Action**: Copy prompts and execute in 10 parallel Claude Code sessions
