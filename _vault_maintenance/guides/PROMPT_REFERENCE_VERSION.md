# Version Release & Git Commands

## Version Release Workflow

### Trigger
```
"Summarize the work in this version and prepare to commit"
"Prepare version release"
"Ready to commit changes"
```

### What Happens

**Phase 1: AI Analyzes Changes**
- Reviews Git history since last version
- Checks completed tasks
- Scans file changes
- Proposes version bump (MAJOR.MINOR.PATCH)

**Phase 2: AI Presents Proposal**
You get a complete report showing:
- Proposed new version number
- Generated CHANGELOG entry
- Prepared commit message
- Files that will be committed
- Summary of all changes

**Phase 3: You Review & Approve**
You can:
- Approve and continue
- Request changes to version/changelog/message
- Cancel the release

**Phase 4: AI Executes**
After your approval:
- Updates VERSION file
- Updates CHANGELOG.md
- Creates Git commit
- Creates version tag
- Reports completion

---

## Example Conversation

```
You: "Summarize the work in this version and prepare to commit"

AI: "Analyzing changes since version 1.0.0...
    
     Version Release Preparation
     
     Current Version: 1.0.0
     Proposed Version: 1.1.0 (MINOR - new features)
     
     Summary:
     - 28 files changed
     - Added vault maintenance system with 6 personas
     - Added complete workflow documentation
     - Added AI prompt guides
     
     CHANGELOG Entry:
     [Shows formatted changelog]
     
     Git Commit Message:
     feat: Add vault maintenance system with AI personas
     [Shows full message]
     
     Files to commit:
     - All _vault_maintenance/ files
     - VERSION
     - CHANGELOG.md
     
     Review checklist:
     ☐ Version number appropriate?
     ☐ CHANGELOG accurate?
     ☐ Commit message clear?
     
     Please review and say 'Approve' to continue or request changes."

You: "Approve"

AI: "Executing version release...
     
     ✓ Updated VERSION to 1.1.0
     ✓ Updated CHANGELOG.md
     ✓ Staged all changes
     ✓ Created commit [hash]
     ✓ Created tag v1.1.0
     
     Ready to push?
     Say 'Push to remote' when ready."

You: "Push to remote"

AI: "Pushing to remote...
     ✓ Pushed main branch
     ✓ Pushed tag v1.1.0
     
     Version 1.1.0 released successfully!"
```

---

## Related Commands

```
"Push to remote"              → Push commits and tags
"Create release notes"        → Generate release documentation
"Show git status"             → Check repository status
"Show recent commits"         → View commit history
"Undo last commit"            → Revert if needed (before push)
```

---

## When to Use

**Good times to release:**
- Completed significant features
- Fixed important bugs
- After successful persona analyses
- Before sharing with others
- Regular intervals (weekly/monthly)

**Not yet ready if:**
- Broken links or critical issues
- Tests failing
- Incomplete features
- Persona health scores declining

---

## Version Numbering Guide

**MAJOR.MINOR.PATCH** (e.g., 1.2.3)

**MAJOR (X.0.0)** - Breaking changes
- Complete restructuring
- Major rearchitecture
- Breaking changes to structure

**MINOR (x.X.0)** - New features
- New personas or systems
- Major content additions
- New directories or features

**PATCH (x.x.X)** - Small fixes
- Bug fixes
- Documentation updates
- Minor improvements

---

## Full Documentation

See: `workflows/version_release_workflow.md`
