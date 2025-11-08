# Git Workflow Documentation

## Purpose

This directory contains Git workflow procedures, version control guidelines, and snapshot documentation for the Eco Balance Documentation repository. It establishes consistent practices for committing, branching, and collaborating on documentation updates.

Proper version control ensures documentation changes are traceable, reversible, and collaborative - critical for maintaining a complex, multi-contributor knowledge base.

## Contents

| File | Description |
|------|-------------|
| GIT_PUSH_INSTRUCTIONS.md | Step-by-step guide for committing and pushing changes |
| git_status.txt | Snapshot of repository status at key milestones |

## Key Documents

- **GIT_PUSH_INSTRUCTIONS.md**: Essential workflow guide
  - Use when: Preparing to commit and push documentation changes
  - Contains: Command sequences, commit message guidelines, troubleshooting
  - Audience: All contributors making changes to the vault

## Git Workflow Principles

**Frequent, Focused Commits**
- Commit after completing discrete tasks (e.g., one document update)
- Clear, descriptive commit messages explaining what and why
- Small commits easier to review and revert if needed

**Meaningful Commit Messages**
- Format: `[Area] Brief description of change`
- Examples:
  - `[Budget] Clarify land acquisition costs in Site Selection`
  - `[Bootstrap] Add context notes to biodiversity tasks`
  - `[Fix] Correct solar panel calculations`

**Branch Strategy**
- `main`: Stable, reviewed documentation
- Feature branches: Major updates or multi-file changes
- Fix branches: Bug fixes, corrections, quick updates
- Branch naming: `feature/description` or `fix/description`

**Pull Before Push**
- Always pull latest changes before pushing
- Resolve conflicts promptly
- Communicate with team about major changes

## Common Git Operations

**Basic Workflow:**
```bash
# Check status
git status

# Add changes
git add [file(s)]

# Commit with message
git commit -m "[Area] Description"

# Pull latest
git pull

# Push changes
git push
```

**Creating Feature Branches:**
```bash
# Create and switch to branch
git checkout -b feature/bootstrap-updates

# Make changes, commit
git add .
git commit -m "[Bootstrap] Update all task files"

# Push branch
git push -u origin feature/bootstrap-updates
```

## Status

- **Last Updated**: November 2024
- **Maintained**: Active - procedures updated as workflow evolves
- **Usage**: All contributors should follow these guidelines

## Related Documentation

- [[../../CHANGELOG.md|Project Changelog]] - Complete change history
- [[../_vault_maintenance/|Vault Maintenance]] - Broader maintenance processes
- [[../audit/|Audit Process]] - Quality checks before committing

## Using This Documentation

**For New Contributors**: Read GIT_PUSH_INSTRUCTIONS.md before making your first commit to understand the workflow and standards.

**For Regular Contributors**: Reference commit message guidelines to maintain consistency and clarity in version history.

**For Project Maintainers**: Use git_status.txt to track repository state at major milestones (releases, major conversions, etc.).
