# Task: Remove Bootstrap Model References

**Status:** Pending  
**Priority:** Medium  
**Assigned to:** Maintenance Crew AI  
**Created:** 2025-11-11

---

## Objective

Remove all references to "Bootstrap Model" from the restoration playbook and related documentation. The playbook has been reframed as a template/playbook system, and bootstrap-specific language is no longer appropriate.

---

## Scope

### Files to Check

1. **restoration_playbook/** directory
   - All markdown files in all subdirectories
   - README.md
   - All overview files (00_*.md)
   - All task files (01_*.md, 02_*.md, etc.)

2. **Root documentation files** that reference implementation tasks
   - 00_Eco_Balance_Hub.md (root)
   - 20_Restoration_Methodology.md
   - Other strategic documents

### What to Remove/Replace

1. **"Bootstrap Model" references:**
   - "Bootstrap Model (Year 1)"
   - "Bootstrap approach"
   - "Year 1 Bootstrap pilot"
   - "Bootstrap budget"
   - Any version references like "Aligned with: Bootstrap Model v2.0"

2. **Budget references:**
   - "Bootstrap (Year 1): €X-Y" → Replace with pathway-based budgets or remove if not needed
   - "Professional (Year 2+): €X-Y" → Keep as pathway option

3. **Context boxes:**
   - Remove entire "Bootstrap Model (Year 1) Context" boxes
   - Replace with template/playbook context if needed

---

## Guidelines

### DO:
- Remove bootstrap-specific language
- Replace with template/playbook language where appropriate
- Keep pathway options (Professional, Community Science, Hybrid) as these are still relevant
- Maintain budget information if it's useful for pathway selection
- Keep scientific and technical content intact

### DON'T:
- Remove all budget information (pathway budgets are still useful)
- Remove pathway distinctions (these are still valid)
- Change scientific content or methodology
- Remove template/playbook language that was just added

---

## Examples of Changes

### Before:
```markdown
> **📘 Bootstrap Model (Year 1) Context**:
>
> This document describes the complete implementation approach.
> For the Year 1 Bootstrap pilot (1 hectare, €20-30k budget):
> - Focus on core activities only (marked with 🎯)
```

### After:
```markdown
**This is a template.** When you start your actual project, customize this with your specific site data and context.
```

### Before:
```markdown
**Budget:**
- **Bootstrap (Year 1):** €500-1,000 - DIY assessment
- **Professional (Year 2+):** €2-5k - Full professional assessment
```

### After:
```markdown
**Budget (varies by pathway):**
- **Community Science Approach:** €500-1,000
- **Professional Approach:** €2-5k
- **Hybrid Approach:** €1,000-2,500
```

---

## Verification

After completion, verify:
- [ ] No "Bootstrap Model" references remain in restoration_playbook/
- [ ] No "Bootstrap" references in budget sections (unless part of pathway name)
- [ ] Template/playbook language is consistent
- [ ] All pathway options are still clear
- [ ] Scientific content is unchanged

---

## Notes

- The system is permissive - there are few non-negotiables
- Focus on removing bootstrap-specific framing, not changing the content itself
- Pathway-based approaches (Professional, Community Science, Hybrid) should remain as they're still valid options

---

**Status:** Ready for assignment to maintenance crew AI

