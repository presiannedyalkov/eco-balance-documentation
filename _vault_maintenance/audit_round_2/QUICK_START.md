# 🚀 AUDIT ROUND 2 - QUICK START GUIDE

**Total Agents**: 10
**Total Files**: 95
**Avg Files/Agent**: 9-10 files
**Est. Time/Agent**: 40-60 minutes

---

## 📋 PRE-EXECUTION CHECKLIST

Before running agents:

- [ ] All agent assignment files generated (AGENT_01_FILES.md through AGENT_10_FILES.md)
- [ ] Audit instructions ready (AUDIT_INSTRUCTIONS.md)
- [ ] Repository on main branch
- [ ] No uncommitted changes
- [ ] 100% coverage verified (run verify_coverage.py)

---

## 🎯 EXECUTION PROMPTS

Copy and paste these prompts into separate Claude Code web sessions.

### Agent 01

```
I am Agent 01 for Audit Round 2. Read my assignment file at: /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AGENT_01_FILES.md

Then audit ALL files listed using the criteria in: /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AUDIT_INSTRUCTIONS.md

Create comprehensive findings and submit a PR.
```

### Agent 02

```
I am Agent 02 for Audit Round 2. Read my assignment file at: /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AGENT_02_FILES.md

Then audit ALL files listed using the criteria in: /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AUDIT_INSTRUCTIONS.md

Create comprehensive findings and submit a PR.
```

### Agent 03

```
I am Agent 03 for Audit Round 2. Read my assignment file at: /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AGENT_03_FILES.md

Then audit ALL files listed using the criteria in: /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AUDIT_INSTRUCTIONS.md

Create comprehensive findings and submit a PR.
```

### Agent 04

```
I am Agent 04 for Audit Round 2. Read my assignment file at: /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AGENT_04_FILES.md

Then audit ALL files listed using the criteria in: /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AUDIT_INSTRUCTIONS.md

Create comprehensive findings and submit a PR.
```

### Agent 05

```
I am Agent 05 for Audit Round 2. Read my assignment file at: /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AGENT_05_FILES.md

Then audit ALL files listed using the criteria in: /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AUDIT_INSTRUCTIONS.md

Create comprehensive findings and submit a PR.
```

### Agent 06

```
I am Agent 06 for Audit Round 2. Read my assignment file at: /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AGENT_06_FILES.md

Then audit ALL files listed using the criteria in: /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AUDIT_INSTRUCTIONS.md

Create comprehensive findings and submit a PR.
```

### Agent 07

```
I am Agent 07 for Audit Round 2. Read my assignment file at: /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AGENT_07_FILES.md

Then audit ALL files listed using the criteria in: /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AUDIT_INSTRUCTIONS.md

Create comprehensive findings and submit a PR.
```

### Agent 08

```
I am Agent 08 for Audit Round 2. Read my assignment file at: /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AGENT_08_FILES.md

Then audit ALL files listed using the criteria in: /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AUDIT_INSTRUCTIONS.md

Create comprehensive findings and submit a PR.
```

### Agent 09

```
I am Agent 09 for Audit Round 2. Read my assignment file at: /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AGENT_09_FILES.md

Then audit ALL files listed using the criteria in: /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AUDIT_INSTRUCTIONS.md

Create comprehensive findings and submit a PR.
```

### Agent 10

```
I am Agent 10 for Audit Round 2. Read my assignment file at: /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AGENT_10_FILES.md

Then audit ALL files listed using the criteria in: /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AUDIT_INSTRUCTIONS.md

Create comprehensive findings and submit a PR.
```

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
