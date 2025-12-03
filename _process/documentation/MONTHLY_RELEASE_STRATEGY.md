# Monthly Release Strategy

**Created:** December 2025  
**Purpose:** Transition from continuous deployment to monthly scheduled releases  
**Status:** Strategy Document - Pending Implementation

---

## 📋 Executive Summary

This document outlines the strategy to transition from **continuous deployment** (every push to `main` triggers deployment) to **monthly scheduled releases** (deployments happen once per month at the end of the month).

### Current State
- ✅ Deployment triggers on every push to `main` branch
- ✅ Changes deploy immediately when merged
- ✅ Release automation exists but requires manual VERSION file update
- ✅ Version format: `YYYY-MM` (e.g., `2025-11`)

### Target State
- 🎯 Monthly automatic releases (e.g., `2025-12`)
- 🎯 Automatic deployment at end of month
- 🎯 Changes accumulate during month, deploy once
- 🎯 Comprehensive changelog and diff for each release
- 🎯 Stable, traceable releases

---

## 🎯 Goals

1. **Reduce Deployment Frequency**: From continuous to monthly
2. **Improve Stability**: Content changes are batched and tested together
3. **Better Traceability**: Clear changelogs and diffs per release
4. **Automated Process**: No manual intervention required
5. **Maintain Flexibility**: Manual trigger option for urgent releases

---

## 📊 Current Architecture

### Workflows

1. **`deploy.yml`** - Deploys on push to `main`
   - Triggers: Push to `main` (when specific paths change)
   - Action: Builds and deploys to GitHub Pages
   - Frequency: Every change

2. **`release-automation.yml`** - Creates GitHub releases
   - Triggers: When `VERSION` file changes
   - Action: Creates GitHub release with changelog
   - Frequency: Manual (when VERSION updated)

3. **`sentry-release.yml`** - Creates Sentry releases
   - Triggers: After successful deployment
   - Action: Creates Sentry release for error tracking

### Version Management

- **VERSION file**: Contains current version (e.g., `2025-11`)
- **Release notes**: Stored in `_versions/v2025.11/RELEASE_NOTES.md`
- **Git tags**: Created as `v2025-11` format

---

## 🔄 Proposed Architecture

### New Monthly Release Workflow

**Workflow Name:** `monthly-release.yml`

**Schedule:**
- Runs on the **last day of each month at 23:59 UTC**
- Also supports manual trigger (`workflow_dispatch`)

**Process Flow:**

```
1. Schedule Trigger (end of month)
   ↓
2. Determine next version (YYYY-MM format)
   ↓
3. Check if changes exist since last release
   ↓
4. Generate changelog (commits, files changed, diff)
   ↓
5. Update VERSION file automatically
   ↓
6. Create release notes in _versions/vYYYY.MM/
   ↓
7. Trigger deployment (deploy.yml)
   ↓
8. Create GitHub release (release-automation.yml)
   ↓
9. Create Sentry release (sentry-release.yml)
```

### Modified Workflows

1. **`deploy.yml`** - Modified to:
   - ❌ Remove automatic trigger on push to `main`
   - ✅ Keep manual trigger (`workflow_dispatch`)
   - ✅ Add trigger from monthly-release workflow
   - ✅ Add condition to only deploy when VERSION changed

2. **`release-automation.yml`** - Enhanced to:
   - ✅ Generate more detailed changelogs
   - ✅ Include file diff statistics
   - ✅ Link to commit range
   - ✅ Generate diff summary

---

## 📝 Implementation Details

### 1. Monthly Release Workflow (`monthly-release.yml`)

**Key Features:**

- **Automatic Version Calculation**: 
  - Reads current month from date
  - Formats as `YYYY-MM` (e.g., `2025-12`)
  - Compares with current VERSION file

- **Change Detection**:
  - Finds last release tag (e.g., `v2025-11`)
  - Compares `last-tag..HEAD` to detect changes
  - Skips release if no changes found

- **Changelog Generation**:
  - Lists all commits since last release
  - Shows file statistics (added/modified/deleted)
  - Generates diff summary
  - Categorizes changes (docs, config, content, etc.)

- **Release Notes Creation**:
  - Creates `_versions/vYYYY.MM/RELEASE_NOTES.md`
  - Includes changelog, statistics, and diff summary
  - Commits to repository

- **Deployment Trigger**:
  - Updates VERSION file
  - Commits changes
  - Triggers deploy.yml workflow

### 2. Modified Deploy Workflow

**Changes:**

```yaml
# BEFORE
on:
  push:
    branches:
      - main
    paths:
      - 'docs/**'
      # ... other paths

# AFTER
on:
  workflow_call:  # Can be called by other workflows
  workflow_dispatch:  # Manual trigger
  push:
    branches:
      - main
    paths:
      - 'VERSION'  # Only deploy when VERSION changes
```

**Logic:**
- Only deploys when VERSION file changes
- Can be triggered manually for urgent deployments
- Can be called by monthly-release workflow

### 3. Enhanced Release Automation

**Improvements:**

- **Better Changelog**:
  - Groups commits by type (feat, fix, docs, etc.)
  - Shows file change statistics
  - Includes diff summary link

- **Diff Generation**:
  - Creates diff between last release and current
  - Stores in release notes
  - Links to GitHub compare view

- **Statistics**:
  - Files changed count
  - Lines added/removed
  - Commit count
  - Contributors (if applicable)

---

## 📅 Release Schedule

### Automatic Schedule

- **Trigger Time**: Last day of month at 23:59 UTC
- **Example**: December 31, 2025 at 23:59 UTC → Creates `2025-12` release
- **Deployment**: Happens immediately after release creation

### Manual Override

- Can trigger manually via `workflow_dispatch`
- Useful for:
  - Urgent fixes
  - Testing the workflow
  - Early releases if needed

### Release Naming

- **Format**: `vYYYY-MM` (e.g., `v2025-12`)
- **Release Name**: `Release v2025-12 (Monthly)`
- **Tag**: `v2025-12`

---

## 📊 Changelog Format

### Release Notes Structure

```markdown
# Release Notes - 2025.12

**Release Date:** December 31, 2025  
**Version:** 2025.12  
**Previous Version:** 2025.11

---

## 📈 Statistics

- **Commits:** 45 commits since v2025-11
- **Files Changed:** 23 files
  - Added: 5 files
  - Modified: 17 files
  - Deleted: 1 file
- **Lines Changed:** +1,234 / -567
- **Contributors:** 1

---

## 🔄 Changes Since Last Release

### Commits
[List of commits with links]

### Files Changed
[List of changed files with categories]

### Diff Summary
[Link to GitHub compare view: v2025-11...v2025-12]

---

## 📝 Detailed Changelog

[Grouped by category: Added, Changed, Fixed, etc.]

---

## 🔗 Related

- [Full Diff](https://github.com/.../compare/v2025-11...v2025-12)
- [Documentation](https://docs.eco-balance.cc/)
```

---

## ✅ Benefits

1. **Stability**: Changes are batched and tested together
2. **Traceability**: Clear record of what changed each month
3. **Reduced Noise**: Fewer deployments = cleaner history
4. **Better Planning**: Monthly cadence allows for better release planning
5. **Automation**: No manual steps required
6. **Flexibility**: Manual trigger available for urgent needs

---

## ⚠️ Considerations

### Potential Issues

1. **Urgent Fixes**: 
   - **Solution**: Manual trigger available
   - **Alternative**: Create hotfix workflow for critical issues

2. **No Changes in Month**:
   - **Solution**: Workflow checks for changes and skips if none
   - **Result**: No unnecessary releases

3. **Timezone Considerations**:
   - **Solution**: Uses UTC for consistency
   - **Note**: 23:59 UTC may be different local time

4. **Failed Deployments**:
   - **Solution**: Existing rollback mechanism remains
   - **Note**: Monthly releases give more time to fix issues

### Migration Path

1. **Phase 1**: Create monthly-release workflow (doesn't affect current system)
2. **Phase 2**: Test monthly-release workflow manually
3. **Phase 3**: Modify deploy.yml to only trigger on VERSION changes
4. **Phase 4**: Enable scheduled trigger
5. **Phase 5**: Monitor first few monthly releases

---

## 🔧 Implementation Steps

### Step 1: Create Monthly Release Workflow
- [ ] Create `.github/workflows/monthly-release.yml`
- [ ] Implement version calculation logic
- [ ] Implement change detection
- [ ] Implement changelog generation
- [ ] Implement release notes creation
- [ ] Test workflow manually

### Step 2: Modify Deploy Workflow
- [ ] Update trigger conditions
- [ ] Add workflow_call support
- [ ] Keep manual trigger
- [ ] Test deployment trigger

### Step 3: Enhance Release Automation
- [ ] Improve changelog generation
- [ ] Add diff statistics
- [ ] Test release creation

### Step 4: Documentation
- [ ] Update deployment documentation
- [ ] Create release process guide
- [ ] Update versioning concepts

### Step 5: Enable Schedule
- [ ] Enable scheduled trigger
- [ ] Monitor first release
- [ ] Adjust if needed

---

## 🧪 Testing Strategy

### Manual Testing

1. **Test Monthly Release Workflow**:
   ```bash
   # Trigger manually via GitHub UI
   # Verify version calculation
   # Verify changelog generation
   # Verify VERSION file update
   ```

2. **Test Deployment Trigger**:
   ```bash
   # Manually update VERSION file
   # Verify deployment triggers
   # Verify deployment succeeds
   ```

3. **Test Release Creation**:
   ```bash
   # Verify GitHub release created
   # Verify release notes format
   # Verify tags created
   ```

### Dry Run

- First release will be a test
- Can be triggered manually before enabling schedule
- Allows verification of all components

---

## 📚 Documentation Updates Needed

1. **`DEPLOYMENT_READY.md`**: Update to reflect monthly releases
2. **`VERSIONING_CONCEPTS.md`**: Add monthly release process
3. **`GITHUB_PAGES_SETUP.md`**: Update deployment frequency
4. **Create**: `MONTHLY_RELEASE_PROCESS.md` - User guide

---

## 🎯 Success Criteria

- [ ] Monthly releases happen automatically at end of month
- [ ] Changelogs are comprehensive and accurate
- [ ] Deployments only happen monthly (unless manual)
- [ ] Release notes are well-formatted and useful
- [ ] No manual intervention required for normal releases
- [ ] Manual trigger works for urgent deployments

---

## 🔄 Rollback Plan

If issues arise:

1. **Disable Schedule**: Remove `schedule` trigger from workflow
2. **Revert Deploy Changes**: Restore original deploy.yml triggers
3. **Manual Releases**: Use existing release-automation.yml manually
4. **Gradual Rollout**: Can test with specific months first

---

## 📅 Timeline

- **Week 1**: Strategy review and approval
- **Week 2**: Implementation (workflows, testing)
- **Week 3**: Documentation updates
- **Week 4**: Enable schedule, monitor first release

---

## 🤔 Questions to Consider

1. **What if no changes in a month?**
   - ✅ Skip release (workflow checks for changes)

2. **What about urgent fixes?**
   - ✅ Manual trigger available
   - ✅ Can create hotfix workflow if needed

3. **What timezone for "end of month"?**
   - ✅ UTC 23:59 (consistent, predictable)

4. **What if deployment fails?**
   - ✅ Existing rollback mechanism
   - ✅ Can retry manually

5. **How to handle multiple changes in a day?**
   - ✅ All changes in month are included in one release

---

**Status:** Strategy Document - Ready for Review  
**Next Step:** Review and approve strategy, then proceed with implementation

