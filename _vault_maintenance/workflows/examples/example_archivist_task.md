# Example Task: Archivist - Update CHANGELOG

```yaml
task_id: ARC-2025-10-26-007
created_by: Archivist
created_date: 2025-10-26
priority: HIGH
category: versioning
status: queued

title: Add recent changes to CHANGELOG for v1.0.0

description: |
  CHANGELOG.md has not been updated since version 1.0.0 was tagged. 
  Several significant changes have occurred that should be documented 
  before the next release, including the creation of the vault 
  maintenance system and new templates.

current_state: |
  CHANGELOG.md last entry: v1.0.0 release
  Git log shows multiple commits since then:
  - Vault maintenance system created
  - New persona files added
  - Workflow documentation created
  - State files initialized

desired_state: |
  CHANGELOG.md includes all significant changes since v1.0.0 in 
  "Unreleased" section, ready to be tagged for v1.1.0 when appropriate.

action_required: |
  1. Review Git commits since v1.0.0 tag
  2. Open CHANGELOG.md
  3. Add new "## [Unreleased]" section at top
  4. Document under appropriate headings:
     ### Added
     - Vault maintenance system with 6 personas
     - Workflow documentation (analysis, execution, coordination)
     - State tracking system
     - Task management structure
     
     ### Changed
     - [List any modified existing features]
     
     ### Fixed
     - [List any bug fixes]
  5. Follow keep-a-changelog.com format
  6. Keep entries concise but informative

impact: |
  - Clear record of project evolution
  - Easier to understand what changed between versions
  - Professional documentation practices
  - Prepares for next version release

affected_files:
  - CHANGELOG.md

estimated_effort: MODERATE

verification_criteria: |
  - [ ] All significant changes since v1.0.0 documented
  - [ ] Format follows keep-a-changelog.com standards
  - [ ] Entries are clear and informative
  - [ ] Grouped logically (Added/Changed/Fixed)
  - [ ] Dates included where appropriate

notes: |
  After completing, verify VERSION file is still accurate. If enough 
  changes warrant it, consider preparing for v1.1.0 release. Coordinate 
  with human owner on versioning strategy.

related_tasks:
  - Consider: Update VERSION file if releasing v1.1.0
  - Consider: Create release notes in _versions/v1.1.0/
```
