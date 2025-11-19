# Example Task: Quality Inspector - Standardize Heading Hierarchy

```yaml
task_id: QI-2025-10-27-009
created_by: Quality_Inspector
created_date: 2025-10-27
priority: MEDIUM
category: formatting
status: queued

title: Fix heading hierarchy in Business Model document

description: |
  30_Business_Model.md has inconsistent heading hierarchy that hurts 
  readability and breaks document structure. Some H3 headers appear before 
  H2, and there's skipping from H1 to H3 without H2. This violates markdown 
  best practices and makes document harder to scan and navigate.

current_state: |
  30_Business_Model.md heading issues:
  - Line 15: H1 then immediately H3 (skips H2)
  - Line 42: H3 "Revenue Streams" should be H2 (main section)
  - Line 67: H4 appears with no H3 parent
  - Line 89: H2 follows H4 (illogical hierarchy)
  
  Makes document structure confusing and table of contents broken.

desired_state: |
  Proper heading hierarchy following markdown standards:
  - H1: Document title (only one)
  - H2: Main sections
  - H3: Subsections within H2
  - H4: Sub-subsections within H3
  - No level skipping
  - Logical nesting

action_required: |
  1. Open 30_Business_Model.md
  2. Review entire document heading structure
  3. Create proper hierarchy:
     - Ensure single H1 (document title)
     - Convert major topics to H2
     - Convert subtopics to H3
     - Use H4 only for sub-subtopics
  4. Specific fixes:
     - Line 15: Add proper H2 before the H3
     - Line 42: Change H3 to H2 (main section)
     - Line 67: Add H3 parent or change H4 to H3
     - Line 89: Fix hierarchy (likely make H3)
  5. Verify document flows logically
  6. Test if outline/TOC makes sense now

impact: |
  - Improved readability and scannability
  - Proper document structure for navigation
  - Better accessibility for screen readers
  - Professional presentation
  - Consistent with other vault documents

affected_files:
  - 30_Business_Model.md

estimated_effort: MINOR

verification_criteria: |
  - [ ] No heading levels skipped (no H1→H3 jumps)
  - [ ] Logical nesting (H3 under H2, H4 under H3)
  - [ ] Single H1 at document start
  - [ ] Document outline makes logical sense
  - [ ] Consistent with vault formatting standards

notes: |
  This is part of larger formatting consistency review. After fixing this 
  document, consider running heading hierarchy check on all numbered 
  documents. May want to create formatting standard document if one 
  doesn't exist.

related_tasks:
  - Future: Check all documents for heading hierarchy
  - Future: Create vault formatting standards guide
```
