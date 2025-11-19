---
task_id: JAN-2025-11-10-001
created_by: Janitor
created_date: 2025-11-10
priority: LOW
category: placement
status: queued
---

# Relocate add_metadata.py to Tools Directory

## Description

The `add_metadata.py` utility script is currently in the root directory. For better organization, it should be moved to a tools or scripts directory within `_vault_maintenance/`.

## Current State

- **File**: `add_metadata.py`
- **Current Location**: Root directory (`/add_metadata.py`)
- **Purpose**: Utility script to add standard metadata to implementation task files
- **Status**: Script is functional, just in suboptimal location

## Desired State

- **File**: `add_metadata.py`
- **Recommended Location**: `_vault_maintenance/tools/add_metadata.py` or `_vault_maintenance/scripts/add_metadata.py`
- **Reason**: Utility scripts should be in tools/scripts directories, not root
- **Impact**: Better organization, cleaner root directory

## Action Required

1. **Check target directory exists**:
   - Verify `_vault_maintenance/tools/` exists (it does - contains `check_wiki_links.py`)
   - Or verify `_vault_maintenance/scripts/` exists (if preferred)

2. **Move the file**:
   - Move `add_metadata.py` to `_vault_maintenance/tools/add_metadata.py`
   - Or move to `_vault_maintenance/scripts/add_metadata.py` (if scripts directory preferred)

3. **Check for references**:
   - Search for any references to `add_metadata.py` in documentation
   - Update references if found (unlikely, but check)

4. **Verify script still works**:
   - Test script from new location (if needed)
   - Update any documentation that references the script location

## Impact

- ✅ Better organization - utility scripts in tools directory
- ✅ Cleaner root directory - only essential files in root
- ✅ Consistent with other tools (check_wiki_links.py is already in tools/)
- ⚠️ Low impact - doesn't affect functionality, purely organizational

## Affected Files

- `add_metadata.py` (to be moved)
- Any documentation referencing the script (if any)

## Verification Criteria

- [ ] File moved to `_vault_maintenance/tools/` or `_vault_maintenance/scripts/`
- [ ] Root directory no longer contains `add_metadata.py`
- [ ] Any references to script location updated (if found)
- [ ] Script still functional from new location (if tested)

## Estimated Effort

**TRIVIAL** - Simple file move operation, minimal verification needed

## Notes

- This is a LOW priority cosmetic improvement
- Doesn't affect functionality - script will work from any location
- Root directory will be slightly cleaner (31 files → 30 files)
- Consistent with existing tool organization (check_wiki_links.py is in tools/)
- Can be deferred if not urgent - organizational improvement only

