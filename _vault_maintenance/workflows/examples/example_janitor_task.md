# Example Task: Janitor - Move Misplaced Files

```yaml
task_id: JAN-2025-10-26-001
created_by: Janitor
created_date: 2025-10-26
priority: MEDIUM
category: placement
status: queued

title: Move process history files to correct archive location

description: |
  During organizational scan, found several process-related files in the 
  main archive directory that should be in the archive/_process_history 
  subdirectory. These files document the integration and migration process 
  and belong with other process documentation.

current_state: |
  Files located in archive/ root:
  - INTEGRATION_ASSESSMENT_SUMMARY.md
  - INTEGRATION_COMPLETE.md
  - INTEGRATION_COMPLETION_PLAN.md

desired_state: |
  All integration process files organized in archive/_process_history/

action_required: |
  1. Verify archive/_process_history/ directory exists
  2. Move these three files to archive/_process_history/
  3. Search vault for references to old paths
  4. Update any references found
  5. Verify files accessible at new location

impact: |
  - Better organization of historical documentation
  - Easier to find integration process history
  - More consistent archive structure

affected_files:
  - archive/INTEGRATION_ASSESSMENT_SUMMARY.md
  - archive/INTEGRATION_COMPLETE.md
  - archive/INTEGRATION_COMPLETION_PLAN.md

estimated_effort: MINOR

verification_criteria: |
  - [ ] Files exist in archive/_process_history/
  - [ ] Original locations empty
  - [ ] No broken references
  - [ ] Files readable at new location

notes: |
  Notify Librarian after completion to check for broken links.
```
