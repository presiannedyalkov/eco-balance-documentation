# 🔄 VAULT MAINTENANCE WORKFLOW

**Quick Reference Guide for Systematic Vault Maintenance**

---

## 📊 THE TWO-PHASE PROCESS

```
┌─────────────────────────────────────────────────────────────┐
│                    PHASE 1: AUDIT                           │
│                 (Use AUDIT_TASKS.md)                        │
│                                                             │
│  1. Open AUDIT_TASKS.md                                    │
│  2. Read persona file for each task                        │
│  3. Check one file with one persona                        │
│  4. Document findings:                                      │
│     ✅ No issues? → Mark "✅ PASS"                          │
│     ⚠️ Issues found? → ADD to FIX_TASKS.md                 │
│  5. Move to next audit task                                │
│  6. DO NOT FIX anything yet!                               │
│                                                             │
│  Repeat until all ~270 audit tasks complete                │
└─────────────────────────────────────────────────────────────┘
                            ↓
                    AUDIT COMPLETE?
                            ↓
                           YES
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                     PHASE 2: FIX                            │
│                  (Use FIX_TASKS.md)                         │
│                                                             │
│  1. Open FIX_TASKS.md                                      │
│  2. Start with CRITICAL priority                           │
│  3. Select one fix task                                     │
│  4. Read the task description                              │
│  5. Make the changes specified                             │
│  6. Verify the fix (checklist provided)                    │
│  7. Mark task complete with date                           │
│  8. Move to next task                                      │
│                                                             │
│  Work through: CRITICAL → HIGH → MEDIUM → LOW              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚨 CRITICAL RULES

### ❌ DON'T DO THIS:
- ❌ Don't start fixing during audit
- ❌ Don't skip audit tasks
- ❌ Don't work on fixes before audit is 100% complete
- ❌ Don't forget to document issues in FIX_TASKS.md

### ✅ DO THIS:
- ✅ Complete entire audit first
- ✅ Document ALL issues found
- ✅ Only start fixes after audit complete
- ✅ Work through fixes by priority
- ✅ Verify each fix before moving to next

---

## 📁 FILE LOCATIONS

All maintenance files are in: `_vault_maintenance/`

### Main Workflow Files:
- **AUDIT_TASKS.md** ← Phase 1: Systematic audit checklist
- **FIX_TASKS.md** ← Phase 2: Prioritized fix list
- **WORKFLOW.md** ← This file: Quick reference

### Supporting Files:
- **personas/** ← Persona definitions (Janitor, Curator, Auditor, etc.)
- **state/** ← Persona state tracking
- **tasks/** ← Task organization (completed, in-progress, etc.)
- **workflows/** ← Detailed workflow documentation

---

## 🎯 QUICK START

### Starting Fresh? Follow This Order:

1. **Read This File** (WORKFLOW.md) ← You are here!
2. **Open AUDIT_TASKS.md** ← Start Phase 1
3. **Review FIX_TASKS.md** ← Understand existing known issues
4. **Begin First Audit Task** ← High Priority section (docs 00-04)
5. **Continue Systematically** ← Work through all audit tasks
6. **Only After Audit Complete** ← Move to FIX_TASKS.md

### Mid-Process? Check Your Status:

**If you're in Phase 1 (Audit)**:
- Open AUDIT_TASKS.md
- Count completed tasks vs total (~270 tasks)
- % Complete = (Completed / 270) × 100
- If < 100% → Continue audit, do NOT fix yet

**If you're in Phase 2 (Fix)**:
- Open FIX_TASKS.md
- Work through by priority (CRITICAL first)
- Mark each task complete with date
- Track: ___ / ___ tasks complete

---

## 📊 PROGRESS TRACKING

### Phase 1: Audit Progress

```
AUDIT PROGRESS: [    ] 0% → [█   ] 25% → [██  ] 50% → [███ ] 75% → [████] 100%

Current Status:
- Strategic Documents (00-70): ___ / ~30 persona-tasks complete
- Implementation Tasks (44 files): ___ / 264 persona-tasks complete
- Meta Documents: ___ / 6 persona-tasks complete
- TOTAL: ___ / ~270 tasks complete
```

### Phase 2: Fix Progress

```
FIX PROGRESS BY PRIORITY:

🚨 CRITICAL: ___ / 4+ tasks complete
🔴 HIGH: ___ / 4+ tasks complete  
🟡 MEDIUM: ___ / 10+ tasks complete
🟢 LOW: ___ / 4+ tasks complete

TOTAL: ___ / 22+ tasks complete
```

---

## 💡 WHY TWO PHASES?

### Benefits of Audit First, Fix Second:

1. **Complete Picture**: See ALL issues before prioritizing
2. **Smart Decisions**: Know what's interconnected before fixing
3. **Avoid Rework**: Don't fix something that will change due to other fixes
4. **Better Prioritization**: Full context reveals true CRITICAL vs LOW priority
5. **Clean Process**: Separate discovery from execution
6. **Track Progress**: Clear completion criteria for each phase

### What Happens If You Skip Audit?

- ❌ Miss interconnected issues (fix A breaks B)
- ❌ Wrong priorities (spend time on low-impact issues)
- ❌ Rework (fix something, then have to re-fix it)
- ❌ Incomplete fixes (solve symptom, not root cause)
- ❌ Lost time (chaotic back-and-forth between discovery and fixing)

---

## 🔄 ITERATION PATTERN

This workflow prepares v2.0.0 for release. Future iterations can follow the same pattern:

```
Current: v2.0.0 Audit → v2.0.0 Fixes → v2.0.0 RELEASE-READY ✅
         ↓
Future: v2.1.0 Audit → v2.1.0 Fixes → v2.1.0 RELEASE-READY
         ↓
Later: Targeted Audit → Minor Fixes → Update release
```

Each round follows the same two-phase pattern.

---

## 📞 QUESTIONS?

**"Should I fix obvious errors during audit?"**
→ NO! Document them in FIX_TASKS.md and keep auditing. You'll fix them in Phase 2.

**"What if I find issues not covered by the persona checklist?"**
→ Great! Still add them to FIX_TASKS.md. The checklists are guides, not limits.

**"Can I start fixing CRITICAL issues while still auditing?"**
→ NO! Complete audit first. What seems CRITICAL now might be less so with full context.

**"What if audit reveals issues in FIX_TASKS.md itself?"**
→ Update FIX_TASKS.md with new info. It's a living document during audit phase.

**"How long should this take?"**
→ Audit: 10-20 hours. Fixes: 19-32 hours. Total: ~30-50 hours over 3-4 weeks.

---

## ✅ COMPLETION CHECKLIST

### Phase 1 Complete When:
- [ ] All ~270 audit tasks marked (✅ PASS or ⚠️ ISSUES FOUND)
- [ ] All issues documented in FIX_TASKS.md
- [ ] No unchecked audit tasks remain
- [ ] FIX_TASKS.md reviewed and organized by priority

### Phase 2 Complete When:
- [ ] All CRITICAL fix tasks complete
- [ ] All HIGH fix tasks complete
- [ ] All MEDIUM fix tasks complete
- [ ] All LOW fix tasks complete (optional but recommended)
- [ ] All fixes verified
- [ ] CHANGELOG.md updated with all changes
- [ ] VERSION file still shows 2.0.0 (no version bump needed)
- [ ] v2.0.0 is now RELEASE-READY ✅

### Ready for Release When:
- [ ] Phase 2 complete
- [ ] All strategic documents v2.0 compliant
- [ ] All cross-references functional
- [ ] No known critical issues
- [ ] Documentation polished and professional
- [ ] v2.0.0 Bootstrap Model ready for public use

---

**Last Updated**: 2025-11-07  
**Current Vault Version**: 2.0.0 (in preparation)  
**Goal**: Make v2.0.0 clean and release-ready