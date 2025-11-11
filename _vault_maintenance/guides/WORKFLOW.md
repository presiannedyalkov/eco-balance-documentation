# 🔄 VAULT MAINTENANCE WORKFLOW

**Quick Reference Guide for Systematic Vault Maintenance**

---

## 📊 THE TWO-PHASE PROCESS

```
┌─────────────────────────────────────────────────────────────┐
│                    PHASE 1: AUDIT                           │
│          (Use AUDIT_TASKS_[PERSONA].md)                     │
│                                                             │
│  1. Open AUDIT_TASKS_[PERSONA].md (e.g., _CURATOR.md)     │
│  2. Read persona file for your role                        │
│  3. Check one file with one persona                        │
│  4. Document findings:                                      │
│     ✅ No issues? → Mark "✅ PASS"                          │
│     ⚠️ Issues found? → ADD to FIX_TASKS_[PERSONA].md       │
│  5. Move to next audit task                                │
│  6. DO NOT FIX anything yet!                               │
│                                                             │
│  Repeat until all your persona's audit tasks complete      │
└─────────────────────────────────────────────────────────────┘
                            ↓
                    AUDIT COMPLETE?
                            ↓
                           YES
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                     PHASE 2: FIX                            │
│           (Use FIX_TASKS_[PERSONA].md)                      │
│                                                             │
│  1. Open FIX_TASKS_[PERSONA].md (e.g., _CURATOR.md)       │
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
- **WORKFLOW.md** ← This file: Quick reference

### Persona-Specific Files (To Avoid Merge Conflicts):
- **AUDIT_TASKS_CURATOR.md** ← Curator audit tasks only
- **AUDIT_TASKS_JANITOR.md** ← Janitor audit tasks only (when created)
- **AUDIT_TASKS_LIBRARIAN.md** ← Librarian audit tasks only (when created)
- **AUDIT_TASKS_AUDITOR.md** ← Auditor audit tasks only (when created)
- **AUDIT_TASKS_ARCHIVIST.md** ← Archivist audit tasks only (when created)
- **AUDIT_TASKS_QUALITY_INSPECTOR.md** ← Quality Inspector audit tasks only (when created)

- **FIX_TASKS_CURATOR.md** ← Issues found by Curator
- **FIX_TASKS_JANITOR.md** ← Issues found by Janitor (when created)
- _(Similar for other personas)_

**Why Persona-Specific Files?**
- **Prevents merge conflicts**: Each persona works on their own branch with their own files
- **Parallel work**: Multiple personas can work simultaneously without conflicts
- **Clear ownership**: Easy to see which persona is responsible for which tasks
- **Better git workflow**: Cleaner merge requests with fewer conflicts
- **Manageable file sizes**: Master files were 100K+ each; persona files are 1-50K each

**How to Use**:
- If you're working as **Curator**: Use `AUDIT_TASKS_CURATOR.md` and `FIX_TASKS_CURATOR.md`
- If you're working as **another persona**: Use your persona-specific files (e.g., `AUDIT_TASKS_JANITOR.md`)
- **Note**: The master files (`AUDIT_TASKS.md` and `FIX_TASKS.md`) have been REMOVED - use only persona-specific files

### Supporting Files:
- **personas/** ← Persona definitions (Janitor, Curator, Auditor, etc.)
- **state/** ← Persona state tracking
- **tasks/** ← Task organization (completed, in-progress, etc.)
- **workflows/** ← Detailed workflow documentation

---

## 🎯 QUICK START

### Starting Fresh? Follow This Order:

1. **Read This File** (WORKFLOW.md) ← You are here!
2. **Identify your persona** ← Are you Curator, Janitor, Librarian, etc.?
3. **Open AUDIT_TASKS_[PERSONA].md** ← Your persona-specific audit file
4. **Review FIX_TASKS_[PERSONA].md** ← Understand issues already found
5. **Begin First Audit Task** ← Work through your persona's tasks
6. **Continue Systematically** ← Complete all your persona's audit tasks
7. **Only After Audit Complete** ← Move to FIX_TASKS_[PERSONA].md

### Mid-Process? Check Your Status:

**If you're in Phase 1 (Audit)**:
- Open AUDIT_TASKS_[PERSONA].md (e.g., AUDIT_TASKS_CURATOR.md)
- Count completed tasks vs total for your persona
- % Complete = (Completed / Total for your persona) × 100
- If < 100% → Continue audit, do NOT fix yet

**If you're in Phase 2 (Fix)**:
- Open FIX_TASKS_[PERSONA].md (e.g., FIX_TASKS_CURATOR.md)
- Work through by priority (CRITICAL first)
- Mark each task complete with date
- Track: ___ / ___ tasks complete for your persona

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
→ NO! Document them in your persona's FIX_TASKS file and keep auditing. You'll fix them in Phase 2.

**"What if I find issues not covered by the persona checklist?"**
→ Great! Still add them to FIX_TASKS_[PERSONA].md. The checklists are guides, not limits.

**"Can I start fixing CRITICAL issues while still auditing?"**
→ NO! Complete audit first. What seems CRITICAL now might be less so with full context.

**"What if audit reveals issues in FIX_TASKS_[PERSONA].md itself?"**
→ Update your persona's fix file with new info. It's a living document during audit phase.

**"How long should this take?"**
→ Audit: 10-20 hours. Fixes: 19-32 hours. Total: ~30-50 hours over 3-4 weeks.

---

## ✅ COMPLETION CHECKLIST

### Phase 1 Complete When:
- [ ] All audit tasks for YOUR persona marked (✅ PASS or ⚠️ ISSUES FOUND)
- [ ] All issues documented in FIX_TASKS_[PERSONA].md
- [ ] No unchecked audit tasks remain in your persona file
- [ ] FIX_TASKS_[PERSONA].md reviewed and organized by priority
- [ ] All personas have completed their audits (check with team)

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