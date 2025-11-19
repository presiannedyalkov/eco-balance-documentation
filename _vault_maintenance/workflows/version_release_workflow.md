# Version Release & Git Commit Workflow

## Purpose
This workflow prepares a version release by analyzing changes, updating version files, generating changelogs, and preparing Git commits for user approval before execution.

---

## Trigger Command

```
"Summarize the work in this version and prepare to commit"
"Prepare version release"
"Ready to commit changes"
```

---

## Workflow Overview

```
User triggers → AI analyzes changes → Bumps version → Updates CHANGELOG 
→ Prepares commit message → Presents for approval → User approves 
→ AI executes commit → Done
```

---

## Detailed Workflow

### Phase 1: Change Analysis (AI)

**AI automatically:**

1. **Check Git status**
   ```bash
   git status
   git log --since="[last version date]" --oneline
   git diff [last-version-tag]..HEAD --stat
   ```

2. **Review completed tasks**
   - Read all files in `_vault_maintenance/tasks/completed/` since last version
   - Categorize changes by type (Added/Changed/Fixed/Removed)

3. **Scan for file changes**
   - New files created
   - Files modified
   - Files moved or renamed
   - Files deleted

4. **Check persona states**
   - Review all state files for significant improvements
   - Note health score changes

---

### Phase 2: Version Bump Proposal (AI)

**AI determines version increment:**

Based on [Semantic Versioning](https://semver.org/): MAJOR.MINOR.PATCH

**MAJOR (X.0.0)** - Breaking changes:
- Complete restructuring
- Major architectural changes
- Breaking API changes

**MINOR (x.X.0)** - New features:
- New personas added
- New major features
- Significant content additions
- New directories or structure

**PATCH (x.x.X)** - Bug fixes:
- Bug fixes
- Small improvements
- Documentation updates
- Task executions

**AI proposes increment and explains why**

---

### Phase 3: Generate Update Documents (AI)

#### 3.1 Update VERSION File

**Current version read from:** `/VERSION`

**Proposed version:** [Current] → [New]

Example:
```
Current: 1.0.0
Proposed: 1.1.0
Reason: Added vault maintenance system (new feature = MINOR bump)
```

#### 3.2 Generate CHANGELOG Entry

**Format following [Keep a Changelog](https://keepachangelog.com/):**

```markdown
## [1.1.0] - 2025-10-27

### Added
- Vault maintenance system with 6 specialized personas
- Complete workflow documentation for analysis and task execution
- State tracking system for all personas
- Task management structure with queue/priority/completed organization
- AI prompt reference and assistant guide
- Example tasks and analysis runs

### Changed
- Updated README with quick start links
- Enhanced archive organization structure

### Fixed
- [Any bug fixes completed]

### Deprecated
- [Any deprecated features]

### Removed
- [Any removed features]

### Security
- [Any security updates]
```

#### 3.3 Prepare Git Commit Message

**Format:**
```
[Commit Type]: [Brief summary]

[Detailed description of changes]

Changes include:
- [Change 1]
- [Change 2]
- [Change 3]

Tasks completed:
- [Task ID]: [Task title]
- [Task ID]: [Task title]

Version: [old] → [new]
```

**Commit types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation only
- `refactor:` Code restructuring
- `chore:` Maintenance tasks
- `release:` Version release

**Example:**
```
feat: Add vault maintenance system with AI personas

Added comprehensive vault maintenance system featuring 6 specialized
AI personas (Janitor, Curator, Archivist, Auditor, Librarian, Quality
Inspector) that analyze and maintain vault quality.

Changes include:
- 6 persona definitions with complete analysis checklists
- State tracking for all personas
- Task management workflow with queue system
- Complete documentation and examples
- AI prompt reference for easy triggering

Tasks completed:
- System design and architecture
- Persona creation and workflow documentation
- State file initialization
- Example tasks and analysis runs

Version: 1.0.0 → 1.1.0
```

---

### Phase 4: Present for Approval (AI)

**AI presents to user:**

```markdown
# Version Release Preparation

## Proposed Changes

**Current Version:** 1.0.0
**Proposed Version:** 1.1.0
**Version Type:** MINOR (new features added)

## Summary of Changes

**Git Stats:**
- Files changed: 28
- Insertions: 2,450 lines
- Deletions: 12 lines

**Changes by Category:**

### Added (8 items)
1. Vault maintenance system with 6 personas
2. State tracking for all personas
3. Task management structure
4. Workflow documentation
5. AI assistant guide
6. Prompt reference card
7. Example tasks (6)
8. Complete analysis run example

### Changed (2 items)
1. Updated README with quick start
2. Enhanced archive structure

### Fixed (0 items)

**Tasks Completed Since Last Version:**
- [None yet - first release with this system]

**Health Scores:**
- Janitor: Not yet analyzed
- Curator: Not yet analyzed
- [etc.]

---

## Files to Update

### 1. VERSION file
```
Current: 1.0.0
New:     1.1.0
```

### 2. CHANGELOG.md
[Shows the new entry that will be added]

### 3. Git Commit
**Message:**
```
feat: Add vault maintenance system with AI personas

Added comprehensive vault maintenance system featuring 6 specialized
AI personas that analyze and maintain vault quality.

[Full commit message as shown above]
```

**Files to commit:**
- All files in _vault_maintenance/ (28 files)
- VERSION
- CHANGELOG.md

---

## Actions to Execute

If you approve, I will:

1. ✓ Update VERSION file (1.0.0 → 1.1.0)
2. ✓ Add entry to CHANGELOG.md
3. ✓ Stage all changes: `git add .`
4. ✓ Create commit with message above
5. ✓ Create git tag: `v1.1.0`
6. ✓ Show status for your review before push

---

## Review Checklist

- [ ] Version number appropriate?
- [ ] CHANGELOG entry accurate?
- [ ] Commit message clear?
- [ ] All files ready to commit?
- [ ] Nothing sensitive in commit?

---

**Please review and respond:**
- "Approve" or "Continue" → I'll execute
- "Change version to X.X.X" → I'll update proposal
- "Update CHANGELOG: [changes]" → I'll revise
- "Update commit message: [changes]" → I'll revise
- "Cancel" → I'll stop
```

---

### Phase 5: User Approval

**User reviews and responds:**

- ✓ **"Approve"** / **"Continue"** / **"Looks good"** → Proceed to execution
- ✓ **"Change [something]"** → AI revises and re-presents
- ✓ **"Cancel"** → Stop without changes

---

### Phase 6: Execution (AI)

**Upon approval, AI executes:**

1. **Update VERSION file**
   ```bash
   echo "1.1.0" > VERSION
   ```

2. **Update CHANGELOG.md**
   - Insert new version entry at top
   - Update [Unreleased] section if exists

3. **Stage changes**
   ```bash
   git add .
   ```

4. **Create commit**
   ```bash
   git commit -m "[prepared message]"
   ```

5. **Create tag**
   ```bash
   git tag -a v1.1.0 -m "Release version 1.1.0"
   ```

6. **Show status**
   ```bash
   git status
   git log -1
   git tag
   ```

---

### Phase 7: Final Report (AI)

**AI reports back:**

```markdown
# Version Release Completed ✓

**Version:** 1.0.0 → 1.1.0
**Commit:** [commit hash]
**Tag:** v1.1.0

## What Was Done

✓ Updated VERSION file to 1.1.0
✓ Added CHANGELOG entry for v1.1.0
✓ Committed 28 files with changes
✓ Created git tag v1.1.0

## Git Status

```
On branch main
Your branch is ahead of 'origin/main' by 1 commit.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean
```

## Next Steps

**Ready to push?**

To push to remote:
```bash
git push origin main
git push origin v1.1.0
```

Or say: "Push to remote"

**Want to create release notes?**
Say: "Create release notes for v1.1.0"
```

---

## Edge Cases & Options

### If No Changes Detected

**AI responds:**
```
No significant changes detected since version 1.0.0.

Last commit: [date and message]
Files changed: 0
Tasks completed: 0

Do you still want to bump the version?
```

### If Conflicts or Issues

**AI stops and reports:**
```
⚠️ Issue detected: [description]

Cannot proceed with version release because:
- [Reason]

Suggested actions:
1. [Fix action 1]
2. [Fix action 2]

Would you like me to help resolve this?
```

### Creating Release Notes

**Additional command:** "Create release notes for v1.1.0"

**AI creates:** `_versions/v1.1.0/RELEASE_NOTES.md` with:
- User-friendly summary
- Key features
- Breaking changes (if any)
- Upgrade instructions (if needed)
- Known issues

---

## Quick Reference Commands

| User Says | AI Does |
|-----------|---------|
| "Summarize the work in this version and prepare to commit" | Full workflow |
| "Approve" / "Continue" | Executes commit |
| "Change version to X.X.X" | Updates version proposal |
| "Update CHANGELOG: ..." | Revises changelog |
| "Cancel" | Stops without changes |
| "Push to remote" | Pushes commits and tags |
| "Create release notes" | Generates release notes |

---

## Best Practices

1. **Regular Releases**: Don't let too many changes accumulate
2. **Clear Messages**: Commit messages should explain "why", not just "what"
3. **Review Carefully**: Always check the proposal before approving
4. **Tag Versions**: Always create Git tags for releases
5. **Update CHANGELOG**: Keep it current and accurate
6. **Test First**: Make sure everything works before version bump
7. **Document Breaking Changes**: Clearly mark any breaking changes

---

## Integration with Persona System

**Archivist's Role:**
- Monitors if VERSION/CHANGELOG are current
- Flags when version bump might be needed
- Verifies version documentation is complete

**But version releases are user-initiated:**
- User decides when to cut a version
- User approves all changes
- User controls timing of releases

---

## File Locations

```
VERSION                     → Current version number
CHANGELOG.md                → Complete change history
_versions/vX.X.X/           → Version-specific documentation
.git/                       → Git repository
```

---

*This workflow gives you full control over versioning while automating the tedious parts.*
