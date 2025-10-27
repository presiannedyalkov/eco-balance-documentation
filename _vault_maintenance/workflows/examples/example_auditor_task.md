# Example Task: Auditor - Verify File Sequence Completeness

```yaml
task_id: AUD-2025-10-26-018
created_by: Auditor
created_date: 2025-10-26
priority: MEDIUM
category: completeness
status: queued

title: Check for gaps in numbered document sequence

description: |
  The vault uses numbered prefixes (00-99) for main documents to indicate 
  reading order and relationships. Audit revealed potential gaps in the 
  numbering sequence that may indicate missing planned documents or 
  inconsistent numbering.

current_state: |
  Current sequence has these files:
  - 00, 01, 02, 03, 04 (foundation docs)
  - 10, 11, 12, 13 (organizational)
  - 20, 21, 22 (methodology)
  - 30, 32 (business) - MISSING 31
  - 40, 42, 43, 44 (operations) - MISSING 41
  - 50, 51 (risk/KPIs)
  - 60 (marketing)
  - 70 (case studies)

desired_state: |
  Either:
  A) Missing numbers explained (intentionally skipped), OR
  B) Missing documents created as placeholders with TODOs, OR
  C) Sequence renumbered to remove gaps

action_required: |
  1. Review existing documents to understand numbering logic
  2. For each gap (31, 41):
     a. Check if document was planned but not created
     b. Check Git history for deleted files at those numbers
     c. Review related documents for references to missing numbers
  3. Make recommendation:
     - If planned: Create placeholder with TODO
     - If never planned: Document gap as intentional
     - If should be renumbered: Create renumbering task
  4. Document findings and rationale
  5. Update any index or hub that lists these documents

impact: |
  - Clarity on whether documents are missing or numbering is intentional
  - Better understanding of documentation scope
  - Consistent numbering system
  - No confusion about "missing" documents

affected_files:
  - Potentially 31_*.md, 41_*.md (if created)
  - 00_Eco_Balance_Hub.md (may need update)
  - QUICK_REFERENCE_GUIDE.md (may need update)

estimated_effort: MODERATE

verification_criteria: |
  - [ ] Each gap (31, 41) has been investigated
  - [ ] Decision made: create, document, or renumber
  - [ ] Rationale documented in audit report
  - [ ] Hub/index updated if needed
  - [ ] No remaining unexplained gaps

notes: |
  This is part of comprehensive completeness audit. May reveal other 
  numbering inconsistencies. Consider creating standard for when to skip 
  numbers vs keep continuous sequence.

related_tasks:
  - May trigger: Renumbering task if gaps should be closed
  - May trigger: Content creation tasks if documents were planned
```
