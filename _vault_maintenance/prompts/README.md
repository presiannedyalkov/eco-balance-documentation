# 🚀 PERSONA MASTER PROMPTS - USER GUIDE

**Location**: `_vault_maintenance/prompts/`

This folder contains 6 self-progressing master prompts for autonomous vault audit execution via code.claude.com.

---

## 📁 FILES IN THIS FOLDER

1. **CURATOR_MASTER.md** - Content quality, cross-references, narrative flow
2. **AUDITOR_MASTER.md** - Data consistency, v2.0 compliance, completeness
3. **LIBRARIAN_MASTER.md** - Link testing, navigation, broken references
4. **QUALITY_INSPECTOR_MASTER.md** - Formatting, presentation, polish
5. **JANITOR_MASTER.md** - Organization, file placement, naming
6. **ARCHIVIST_MASTER.md** - Version tracking, changelog, historical preservation

---

## 🎯 HOW TO USE (SIMPLE METHOD)

### Step 1: Open code.claude.com

Open 6 tabs in code.claude.com (connected to your GitHub repo).

### Step 2: Start Each Persona

In each tab, say:

**Tab 1 (Curator):**
```
You are the Curator persona. Read and execute this file:
_vault_maintenance/prompts/CURATOR_MASTER.md
```

**Tab 2 (Auditor):**
```
You are the Auditor persona. Read and execute this file:
_vault_maintenance/prompts/AUDITOR_MASTER.md
```

**Tab 3 (Librarian):**
```
You are the Librarian persona. Read and execute this file:
_vault_maintenance/prompts/LIBRARIAN_MASTER.md
```

**Tab 4 (Quality Inspector):**
```
You are the Quality Inspector persona. Read and execute this file:
_vault_maintenance/prompts/QUALITY_INSPECTOR_MASTER.md
```

**Tab 5 (Janitor):**
```
You are the Janitor persona. Read and execute this file:
_vault_maintenance/prompts/JANITOR_MASTER.md
```

**Tab 6 (Archivist):**
```
You are the Archivist persona. Read and execute this file:
_vault_maintenance/prompts/ARCHIVIST_MASTER.md
```

### Step 3: Let Them Work

Each agent will:
1. Auto-detect which step it's on (1-5)
2. Execute that step
3. Create a merge request
4. Tell you "Step X complete. Run this prompt again for Step X+1."

### Step 4: Continue Each Persona

After each merge request:
1. Merge it
2. In that tab, say: **"Continue to next step"**
3. Agent will auto-detect Step X+1 and execute it

### Step 5: Repeat Until Complete

Keep saying "Continue to next step" in each tab until that persona finishes all 5 steps.

---

## 📊 WHAT HAPPENS

### Each Persona Works Through 5 Steps:

**Step 1**: Strategic Entry Docs (00-04) - 5 files  
**Step 2**: Organizational Docs (10-13) - 4 files  
**Step 3**: Methodology & Business (20-32) - 6 files  
**Step 4**: Growth & Operations (40-70) - 10 files  
**Step 5**: Implementation Tasks - 44 files  

### Each Step Creates:

- ✅ Checked boxes in AUDIT_TASKS.md
- 📝 New issues added to FIX_TASKS.md
- 🔀 One merge request per step per persona

### Final Result:

After all 6 personas complete all 5 steps:
- **30 merge requests total** (6 personas × 5 steps)
- **270 audit tasks complete** 
- **Complete issue inventory** in FIX_TASKS.md
- **Ready for Phase 2** (fixing issues)

---

## ⏱️ TIMELINE

**Per Persona:**
- Step 1: 20-60 min
- Step 2: 15-45 min
- Step 3: 20-60 min
- Step 4: 30-90 min
- Step 5: 60-120 min (44 files)

**Total per persona**: 2-6 hours across 5 steps

**All 6 personas (parallel)**: 2-6 hours to complete entire audit!

---

## 🎭 PERSONA QUICK REFERENCE

| Persona | Focus | Speed | Priority |
|---------|-------|-------|----------|
| **Curator** | Content quality, v2.0 compliance | Medium | HIGH |
| **Auditor** | Data consistency, specs | Medium | HIGH |
| **Librarian** | Links, navigation | Fast | HIGH |
| **Quality Inspector** | Formatting, polish | Medium | MEDIUM |
| **Janitor** | Organization | Very Fast | LOW |
| **Archivist** | Version tracking | Fast | MEDIUM |

---

## 💡 TIPS

### For Fastest Execution:

1. **Start all 6 personas simultaneously** (6 tabs)
2. **After each merge**, immediately say "Continue to next step"
3. **Don't wait** - each persona works independently
4. **High priority first**: Focus on Curator, Auditor, Librarian if time-limited

### If You Get Interrupted:

Just say "Continue to next step" again - the persona will auto-detect where it left off!

### If Something Fails:

Say "Start over from Step 1" or specify: "Execute Step 3"

---

## 📋 ALTERNATIVE: COPY/PASTE METHOD

If you prefer to copy/paste instead of using file links:

1. Open one of the 6 `*_MASTER.md` files
2. Copy the ENTIRE contents
3. Paste into code.claude.com
4. Agent will execute automatically

**Benefit**: No file reading needed  
**Drawback**: Have to copy/paste for each step

---

## 🎉 COMPLETION CHECKLIST

After all personas finish:

- [ ] 6 personas × 5 steps = 30 merge requests merged
- [ ] AUDIT_TASKS.md: All [x] checked
- [ ] FIX_TASKS.md: Complete issue list (likely 50-100 tasks)
- [ ] Review FIX_TASKS.md priorities (CRITICAL → HIGH → MEDIUM → LOW)
- [ ] Ready to start Phase 2 (fixes)

---

## 🔧 TROUBLESHOOTING

**Q: Agent says "I can't find the file"**  
A: Copy/paste the prompt contents directly instead

**Q: Agent starts over from Step 1**  
A: Check AUDIT_TASKS.md - are previous steps marked [x]? If not, agent correctly detected Step 1

**Q: Multiple agents editing same task**  
A: Not possible - each persona has different tasks. They work on different aspects of same files.

**Q: How do I know which step I'm on?**  
A: Just say "Continue to next step" - agent auto-detects!

---

## 📚 FOR MORE DETAILS

See the full workflow documentation:
- `_vault_maintenance/WORKFLOW.md` - Complete two-phase process
- `_vault_maintenance/AUDIT_TASKS.md` - Full task list with instructions
- `_vault_maintenance/FIX_TASKS.md` - Issues found during audit

---

**Ready to start?** Open code.claude.com and begin with the simple commands above! 🚀
