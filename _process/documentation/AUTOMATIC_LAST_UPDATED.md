# Automatic Last Updated Dates

## Problem

Currently, "Last Updated" dates in documentation are manually maintained, which leads to:
- Dates becoming outdated when files are changed
- Forgetting to update dates after edits
- Inconsistent date formats
- Manual maintenance overhead

## Solution: Git-Based Automatic Updates

Use Git commit history to automatically determine and update "Last Updated" dates. This ensures dates always reflect the actual last modification time.

## Implementation Options

### Option 1: GitHub Action (Recommended)

Run automatically on every push/PR to update dates based on Git commit history.

**Pros:**
- Fully automated
- No manual intervention needed
- Works for all contributors
- Can be run on schedule or on push

**Cons:**
- Requires GitHub Actions minutes
- Slight delay in updates

### Option 2: Pre-commit Hook

Update dates automatically before each commit.

**Pros:**
- Updates happen immediately
- No external dependencies
- Works offline

**Cons:**
- Requires setup on each developer machine
- Can slow down commits slightly

### Option 3: Build-time Plugin

Docusaurus plugin that injects dates during build.

**Pros:**
- No file modifications needed
- Dates always accurate at build time
- Works with Docusaurus's built-in `lastUpdated` feature

**Cons:**
- Dates only visible in built site, not in source files
- Requires custom plugin development

## Recommended Approach: Hybrid

1. **GitHub Action** - Automatically updates source files on merge to main
2. **Docusaurus `lastUpdated`** - Uses Git dates for display (built-in feature)
3. **Script for manual updates** - When needed for specific files

## Implementation Plan

### Phase 1: Enable Docusaurus lastUpdated

Docusaurus has built-in support for showing last updated dates using Git commit history. This requires:
- Enabling `showLastUpdateTime` in docs config
- Using `lastUpdated` frontmatter or theme component

### Phase 2: Create Update Script

Script that:
- Reads Git commit dates for each file
- Updates "Last Updated" fields in markdown files
- Handles both frontmatter and footer formats
- Can be run manually or via GitHub Action

### Phase 3: GitHub Action

Workflow that:
- Runs on push to main
- Updates all changed files' "Last Updated" dates
- Commits changes back to repository
- Or creates a PR with updates

## File Locations

- Script: `scripts/update-last-updated.sh`
- GitHub Action: `.github/workflows/update-last-updated.yml`
- Documentation: This file

## Date Format Standards

- **Display Format**: `YYYY-MM-DD` (e.g., `2025-11-22`)
- **Source**: Git commit date (author date, not commit date)
- **Fallback**: File modification time if no Git history

## Next Steps

1. Create the update script
2. Test on a few files
3. Set up GitHub Action
4. Document usage
5. Remove manual date maintenance from workflow

