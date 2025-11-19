# Example Task: Curator - Add Missing Cross-References

```yaml
task_id: CUR-2025-10-26-012
created_by: Curator
created_date: 2025-10-26
priority: HIGH
category: cross-reference
status: queued

title: Link restoration methodology to implementation tasks

description: |
  The Restoration_Methodology document describes various restoration 
  approaches, but doesn't link to the detailed implementation task 
  directories where step-by-step procedures exist. Readers learning 
  about methodology have no clear path to actionable implementation steps.

current_state: |
  20_Restoration_Methodology.md mentions:
  - Reforestation approaches
  - Soil restoration techniques
  - Water management strategies
  - Biodiversity enhancement
  
  But provides no links to implementation_tasks/ subdirectories where 
  detailed procedures exist for each area.

desired_state: |
  Each methodology section includes clear links to corresponding 
  implementation task directories with callout text explaining the 
  connection.

action_required: |
  1. Open 20_Restoration_Methodology.md
  2. For each major methodology section, add links:
     - Reforestation → implementation_tasks/reforestation/
     - Soil restoration → implementation_tasks/soil_restoration/
     - Water management → implementation_tasks/water_management/
     - Biodiversity → implementation_tasks/biodiversity/
  3. Add introductory text: "For step-by-step implementation, see [link]"
  4. Verify all links work
  5. Check that link text is descriptive

impact: |
  - Readers can easily move from theory to practice
  - Implementation tasks become discoverable
  - Better connection between strategy and execution
  - Improved user journey through documentation

affected_files:
  - 20_Restoration_Methodology.md
  - implementation_tasks/ directories (target of links)

estimated_effort: MINOR

verification_criteria: |
  - [ ] All methodology sections have links to implementation
  - [ ] Link text is descriptive and clear
  - [ ] All links tested and working
  - [ ] Context text explains the connection

notes: |
  Consider adding bidirectional links - updating implementation task 
  README files to reference the methodology document. Create follow-up 
  task for Librarian to verify full bidirectional linking.
```
