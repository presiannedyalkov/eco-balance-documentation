# Example Task: Librarian - Fix Broken Hub Links

```yaml
task_id: LIB-2025-10-27-003
created_by: Librarian
created_date: 2025-10-27
priority: CRITICAL
category: links
status: queued

title: Repair broken links in main hub page

description: |
  The 00_Eco_Balance_Hub.md (root) serves as the main navigation entry point. 
  Link integrity check found 3 broken links that prevent users from 
  accessing important documentation. This blocks the primary navigation 
  pathway through the vault.

current_state: |
  00_Eco_Balance_Hub.md (root) contains these broken links:
  1. Link to "31_Revenue_Strategy.md" (file doesn't exist)
  2. Link to "implementation/site-selection" (should be "implementation_tasks/site_selection")
  3. Link to "../archive/README.md" (incorrect relative path, should be "archive/README.md")

desired_state: |
  All links in hub page work correctly, pointing to existing files with 
  correct paths. Users can navigate from hub to all major documentation 
  sections without hitting dead ends.

action_required: |
  1. Open 00_Eco_Balance_Hub.md (root)
  2. Fix link #1:
     - Determine if 31_Revenue_Strategy.md should exist
     - If yes: Create placeholder or remove link temporarily
     - If no: Update to correct file (possibly 30_Business_Model.md)
  3. Fix link #2:
     - Change "implementation/site-selection" to "implementation_tasks/site_selection"
     - Verify correct path
  4. Fix link #3:
     - Correct relative path to "archive/README.md"
     - Test that link works
  5. Run full link check on hub page after fixes
  6. Verify all major sections are now reachable

impact: |
  - Hub page becomes fully functional navigation center
  - Users can access all documentation from single entry point
  - No dead ends in primary navigation flow
  - Critical for vault usability

affected_files:
  - 00_Eco_Balance_Hub.md (root)

estimated_effort: TRIVIAL

verification_criteria: |
  - [ ] All 3 broken links are fixed
  - [ ] Each link tested and verified working
  - [ ] No new broken links introduced
  - [ ] Hub page provides complete navigation coverage

notes: |
  This is CRITICAL priority because hub is main entry point. After fixing, 
  coordinate with Auditor to determine if missing file (31) should exist. 
  Also recommend adding hub page to regular link check rotation.

related_tasks:
  - Follow-up: Comprehensive hub page review for completeness
  - Coordinate: Check with Auditor about file 31
```
