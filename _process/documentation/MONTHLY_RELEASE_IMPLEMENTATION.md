# Monthly Release Implementation

**Created:** December 2025  
**Status:** ✅ Implemented - Ready for Testing

---

## ✅ Implementation Complete

The monthly release strategy has been fully implemented. All workflows have been created and modified according to the strategy document.

---

## 📁 Files Created/Modified

### 1. Created: `.github/workflows/monthly-release.yml`
- **Purpose**: Monthly scheduled release workflow
- **Features**:
  - Runs on last day of each month at 23:59 UTC
  - Manual trigger with optional version and force inputs
  - Automatic version calculation (YYYY-MM format)
  - Change detection (skips if no changes)
  - Comprehensive changelog generation
  - Release notes creation in `_versions/vYYYY.MM/`
  - Automatic VERSION file update
  - Commits and pushes changes

### 2. Modified: `.github/workflows/deploy.yml`
- **Changes**:
  - ❌ Removed: Automatic trigger on push to `main` for content changes
  - ✅ Added: Trigger only on `VERSION` file changes
  - ✅ Added: `workflow_call` support (can be called by other workflows)
  - ✅ Kept: Manual trigger (`workflow_dispatch`)

**Before:**
```yaml
on:
  push:
    branches: [main]
    paths:
      - 'docs/**'
      - 'strategic/**'
      # ... other paths
```

**After:**
```yaml
on:
  push:
    branches: [main]
    paths:
      - 'VERSION'  # Only deploy when VERSION changes
  workflow_call:   # Can be called by monthly-release
  workflow_dispatch:  # Manual trigger
```

### 3. Enhanced: `.github/workflows/release-automation.yml`
- **Improvements**:
  - Enhanced changelog with statistics
  - File change counts (added/modified/deleted)
  - Lines changed statistics
  - Better formatted release notes
  - Diff URL links

---

## 🔄 Workflow Process

### Monthly Release Flow

```
1. Schedule Trigger (last day of month, 23:59 UTC)
   ↓
2. Check if it's actually the last day
   ↓
3. Calculate next version (YYYY-MM)
   ↓
4. Check if version already exists
   ↓
5. Check for changes since last release
   ↓
6. Generate changelog and statistics
   ↓
7. Create release notes in _versions/vYYYY.MM/
   ↓
8. Update VERSION file
   ↓
9. Commit and push changes
   ↓
10. VERSION file change triggers deploy.yml
    ↓
11. Deployment happens automatically
    ↓
12. Release automation creates GitHub release
    ↓
13. Sentry release created
```

---

## 🎯 Key Features

### Automatic Scheduling
- Runs on last day of each month at 23:59 UTC
- Checks if it's actually the last day (handles months with different day counts)
- Skips if not the last day

### Change Detection
- Compares with last release tag
- Counts commits since last release
- Skips release if no changes (unless forced)

### Comprehensive Changelog
- Commit list with hashes
- File statistics (added/modified/deleted)
- Lines changed statistics
- Diff URL for full comparison

### Release Notes
- Created in `_versions/vYYYY.MM/RELEASE_NOTES.md`
- Includes all statistics and changelog
- Committed to repository

### Version Management
- Automatic version calculation (YYYY-MM format)
- Updates VERSION file automatically
- Commits changes automatically

---

## 🧪 Testing

### Manual Testing Steps

1. **Test Monthly Release Workflow**:
   ```bash
   # Go to GitHub Actions
   # Select "Monthly Release" workflow
   # Click "Run workflow"
   # Optionally provide version or force flag
   ```

2. **Verify Version Calculation**:
   - Check that version is calculated correctly
   - Verify format is YYYY-MM

3. **Verify Change Detection**:
   - Test with changes present
   - Test with no changes (should skip)

4. **Verify Deployment Trigger**:
   - After VERSION file update, verify deploy.yml triggers
   - Check deployment succeeds

5. **Verify Release Creation**:
   - Check GitHub release is created
   - Verify release notes format
   - Check tags are created

### Test Scenarios

#### Scenario 1: Normal Monthly Release
- **Trigger**: Scheduled (last day of month)
- **Expected**: 
  - Version calculated
  - Changes detected
  - Release notes created
  - VERSION updated
  - Deployment triggered
  - GitHub release created

#### Scenario 2: No Changes
- **Trigger**: Scheduled (last day of month)
- **Condition**: No commits since last release
- **Expected**: 
  - Workflow runs
  - Detects no changes
  - Skips release creation
  - No deployment

#### Scenario 3: Manual Trigger
- **Trigger**: Manual (workflow_dispatch)
- **Expected**:
  - Can provide version manually
  - Can force release even if no changes
  - Works same as scheduled

#### Scenario 4: Version Already Exists
- **Trigger**: Any
- **Condition**: VERSION file already has target version
- **Expected**:
  - Detects existing version
  - Skips (unless forced)

---

## 📅 Schedule Details

### Cron Expression
```yaml
schedule:
  - cron: '59 23 28-31 * *'
```

This runs daily on days 28-31 at 23:59 UTC. The workflow checks if it's the last day of the month by comparing tomorrow's month with today's month.

### Timezone
- All times are in **UTC**
- 23:59 UTC on last day of month
- Adjusts for different month lengths automatically

---

## 🚨 Important Notes

### Branch Protection
If branch protection is enabled:
- The workflow may fail to push directly to `main`
- In this case, changes will be prepared but need manual push or PR
- Consider using a bot token or adjusting branch protection rules

### First Release
- The first monthly release will compare against the beginning of the repository
- All commits will be included in the changelog

### Manual Overrides
- Use `workflow_dispatch` for urgent deployments
- Can provide version manually
- Can force release even if no changes

---

## 🔧 Configuration

### Workflow Inputs (Manual Trigger)

- **version** (optional): Version number in YYYY-MM format
  - If not provided, auto-calculated from current date
  
- **force** (optional): Force release even if no changes
  - Default: false
  - Set to true to create release regardless of changes

### Environment Variables

No additional environment variables required. Uses standard GitHub Actions secrets:
- `GITHUB_TOKEN` (automatically provided)

---

## 📊 Expected Behavior

### Normal Operation

1. **During the Month**:
   - Developers make changes to `main` branch
   - Changes accumulate but don't deploy
   - No deployments triggered

2. **End of Month**:
   - Monthly release workflow runs automatically
   - Checks for changes
   - Generates changelog
   - Updates VERSION file
   - Triggers deployment
   - Creates GitHub release

3. **After Release**:
   - Site is deployed with all accumulated changes
   - Release notes document what changed
   - GitHub release provides full diff

### Urgent Deployments

For urgent fixes:
1. Use manual trigger on `deploy.yml`
2. Or use manual trigger on `monthly-release.yml` with force flag
3. Or temporarily update VERSION file manually

---

## ✅ Verification Checklist

Before considering implementation complete:

- [x] Monthly release workflow created
- [x] Deploy workflow modified
- [x] Release automation enhanced
- [ ] Test workflow manually (first run)
- [ ] Verify changelog generation
- [ ] Verify release notes creation
- [ ] Verify deployment trigger
- [ ] Verify GitHub release creation
- [ ] Monitor first scheduled release

---

## 🐛 Troubleshooting

### Workflow Doesn't Run
- Check GitHub Actions is enabled
- Verify cron schedule is correct
- Check workflow file syntax

### Release Skipped Unexpectedly
- Check if it's actually the last day of month
- Verify there are changes since last release
- Check version doesn't already exist

### Deployment Doesn't Trigger
- Verify VERSION file was updated
- Check deploy.yml trigger conditions
- Verify workflow permissions

### Release Notes Not Created
- Check `_versions/vYYYY.MM/` directory exists
- Verify git permissions
- Check workflow logs for errors

---

## 📚 Related Documentation

- [Monthly Release Strategy](./MONTHLY_RELEASE_STRATEGY.md) - Original strategy document
- [Versioning Concepts](./VERSIONING_CONCEPTS.md) - Version format details
- [Deployment Ready](./DEPLOYMENT_READY.md) - Deployment setup

---

**Status:** ✅ Implementation Complete  
**Next Step:** Test workflow manually, then monitor first scheduled release

