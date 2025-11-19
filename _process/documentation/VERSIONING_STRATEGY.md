# Versioning Strategy & Synchronization System

**Created:** November 12, 2025  
**Purpose:** Resolve version control chaos and establish synchronized versioning system  
**Status:** Enhanced Proposal

---

## Current Problem

- VERSION file: `2.0.0`
- 16 strategic files: `Document Version: 3.0.0`
- Hub file: `Version: 2.0.0`
- No `_versions/v2.0.0/` or `_versions/v3.0.0/` directories
- 7 files have duplicate footer metadata
- **Root Issue:** Files not synchronized - breaking changes don't propagate, local changes aren't tracked

**Impact:** Impossible to determine authoritative version. Files drift out of sync. Breaking changes don't propagate.

---

## Proposed Solution: Hierarchical Calendar Versioning with Synchronization

### Version Structure

**Format:** `YYYY.MM.DD HH:MM` (Global) + `YYYY.MM.DD HH:MM` (Local)

**Global Version (Monthly):** `YYYY.MM`
- Represents project-wide state
- Changes when breaking changes affect all files
- Example: `2025.11` → `2025.12` (monthly release)

**Local Subversion (File-Specific):** `YYYY.MM.DD HH:MM`
- Tracks individual file updates
- Changes when file is modified
- Example: `2025.11.12 10:31`

**Full Version Format:**
```
Document Version: 2025.11 (2025.11.12 10:31)
```

**Meaning:**
- `2025.11` = Project is in November 2025 release state
- `2025.11.12 10:31` = This file was last updated Nov 12 at 10:31

---

## Synchronization System

### Core Principle

**All files must be synchronized to the global version.** When global version changes (e.g., `2025.11` → `2025.12`), all files must be checked and updated.

### Breaking Changes vs Local Changes

**Breaking Changes (Global):**
- Framework terminology changes (e.g., "Bootstrap Model" → "Adaptive Framework")
- Version number format changes
- Metadata structure changes
- Cross-reference format changes
- Organizational structure changes

**Local Changes (File-Specific):**
- Content updates within a file
- New sections added
- Corrections and clarifications
- File-specific improvements

### Synchronization Rules

1. **Global Version Change:**
   - All files must update global version: `2025.11` → `2025.12`
   - All files must check if breaking changes apply
   - Local subversion updates to current date/time

2. **Local File Change:**
   - Only that file's local subversion updates
   - Global version remains unchanged
   - Other files remain unchanged

3. **Breaking Change Detection:**
   - When breaking change is identified, it triggers global version bump
   - All files are checked for compatibility
   - Incompatible files are updated automatically or flagged

---

## Changelog Journal System

### Structure

**Global Changelog:** `CHANGELOG.md`
- Tracks monthly releases
- Documents breaking changes
- Lists all files affected

**Journal System:** `_versions/vYYYY.MM/JOURNAL.md`
- Daily/hourly change tracking
- File-specific change logs
- Local subversion history

**File-Level Changelog:** Optional footer section
- Recent changes to this file
- Last N changes with dates

### Journal Format

```markdown
# Version Journal: 2025.11

## 2025-11-12

### 10:31 - 30_Business_Model.md
- Updated: Local subversion to 2025.11.12 10:31
- Change: Added funding pathway analysis
- Type: Local change

### 14:22 - 00_Eco_Balance_Hub.md
- Updated: Local subversion to 2025.11.12 14:22
- Change: Fixed broken cross-reference
- Type: Local change

## 2025-11-11

### 09:15 - BREAKING CHANGE: Framework Terminology
- Updated: All files (global version check triggered)
- Change: Standardized "Adaptive Framework" terminology
- Type: Breaking change
- Files affected: 12 files updated
- Global version: 2025.11 (unchanged, same month)
```

---

## Automated Synchronization Process

### Monthly Version Change Trigger

When global version changes (e.g., `2025.11` → `2025.12`):

1. **Detection:**
   - VERSION file updated to new month
   - Script detects change

2. **Synchronization Check:**
   ```bash
   # Pseudo-code
   NEW_VERSION = read(VERSION)  # e.g., "2025.12"
   for file in strategic_files:
       current_global = extract_global_version(file)
       if current_global != NEW_VERSION:
           flag_for_update(file)
   ```

3. **Breaking Change Check:**
   - Check `_versions/v[NEW_VERSION]/BREAKING_CHANGES.md`
   - For each breaking change:
     - Identify affected files
     - Check if change applies
     - Update or flag for manual review

4. **Version Update:**
   - Update global version in all flagged files
   - Update local subversion to current date/time
   - Log changes in journal

5. **Verification:**
   - Verify all files have correct global version
   - Check for inconsistencies
   - Generate synchronization report

### Implementation Script

```bash
#!/bin/bash
# sync_versions.sh - Synchronize all files to current global version

VERSION_FILE="VERSION"
CURRENT_VERSION=$(cat "$VERSION_FILE")
STRATEGIC_FILES=$(find docs/strategic -name "*.md")

echo "Synchronizing to version: $CURRENT_VERSION"

for file in $STRATEGIC_FILES; do
    # Extract current global version from file
    FILE_GLOBAL=$(grep -oP 'Document Version: \K[0-9]{4}\.[0-9]{2}' "$file" | head -1)
    
    if [ "$FILE_GLOBAL" != "$CURRENT_VERSION" ]; then
        echo "Updating $file: $FILE_GLOBAL -> $CURRENT_VERSION"
        
        # Update global version
        sed -i "s/Document Version: $FILE_GLOBAL/Document Version: $CURRENT_VERSION/" "$file"
        
        # Update local subversion to current date/time
        CURRENT_DATETIME=$(date +"%Y.%m.%d %H:%M")
        sed -i "s/([0-9]{4}\.[0-9]{2}\.[0-9]{2} [0-9]{2}:[0-9]{2})/($CURRENT_DATETIME)/" "$file"
        
        # Log to journal
        echo "$(date +"%Y-%m-%d %H:%M") - $file: Synced to $CURRENT_VERSION" >> "_versions/v${CURRENT_VERSION}/JOURNAL.md"
    fi
done

echo "Synchronization complete"
```

---

## Breaking Change Detection & Propagation

### Breaking Change Registry

**File:** `_versions/vYYYY.MM/BREAKING_CHANGES.md`

```markdown
# Breaking Changes: 2025.12

## BC-001: Framework Terminology Standardization
**Date:** 2025-12-01
**Type:** Terminology change
**Affects:** All files using "Bootstrap Model"
**Action Required:**
- Replace "Bootstrap Model" with "Adaptive Framework: Bootstrap Phase"
- Update section headers
- Add explanatory note

**Files Affected:**
- 30_Business_Model.md
- 32_Funding_Strategy.md
- 45_Tiny_House_and_Living_Infrastructure.md

**Status:** ✅ Applied to all files
```

### Breaking Change Application

When breaking change is registered:

1. **Identify Affected Files:**
   - Search for patterns/terms
   - List files that need updates

2. **Create Update Script:**
   - Automated replacements where possible
   - Manual review flags where needed

3. **Apply Changes:**
   - Run automated updates
   - Flag files for manual review
   - Update all affected files

4. **Verify:**
   - Check all files updated correctly
   - Verify no regressions
   - Update journal

---

## Migration Plan

### Phase 1: Establish Current State (Immediate)

1. **Set Current Global Version:**
   - Decision: `2025.11` (November 2025)
   - Update VERSION file

2. **Initialize All Files:**
   - Update all strategic files to: `Document Version: 2025.11 (2025.11.12 [current time])`
   - Remove duplicate footers
   - Standardize format

3. **Create Version Artifacts:**
   - Create `_versions/v2025.11/` directory
   - Create `_versions/v2025.11/JOURNAL.md`
   - Create `_versions/v2025.11/BREAKING_CHANGES.md` (empty initially)

**Effort:** 2-3 hours

---

### Phase 2: Implement Synchronization System (This Week)

1. **Create Synchronization Script:**
   - `scripts/sync_versions.sh`
   - Detects version mismatches
   - Updates files automatically
   - Logs to journal

2. **Create Breaking Change Registry:**
   - Template for documenting breaking changes
   - Process for registering changes
   - Application workflow

3. **Create Monthly Check Workflow:**
   - GitHub Actions or manual trigger
   - Runs when VERSION file changes
   - Synchronizes all files
   - Generates report

4. **Update Documentation:**
   - Versioning guide in quick reference
   - Breaking change process
   - Synchronization workflow

**Effort:** 4-6 hours

---

### Phase 3: Establish Process (Ongoing)

1. **Monthly Release Cycle:**
   - End of month: Review changes
   - Decide if global version bump needed
   - Run synchronization check
   - Create release notes

2. **Breaking Change Process:**
   - When breaking change identified:
     - Register in BREAKING_CHANGES.md
     - Apply to all affected files
     - Update global version if needed
     - Document in journal

3. **Local Change Process:**
   - File modified → Update local subversion only
   - Log in journal
   - No global version change

**Effort:** Ongoing (process establishment)

---

## File Footer Format

### Standard Format

```markdown
---
**Document Version:** 2025.11 (2025.11.12 10:31)
**Last Updated:** 2025-11-12 10:31
**Status:** Active
**Global Sync:** ✅ Synchronized
---
```

### Breaking Change Indicator

```markdown
---
**Document Version:** 2025.12 (2025.12.01 09:00)
**Last Updated:** 2025-12-01 09:00
**Status:** Active
**Global Sync:** ✅ Synchronized
**Breaking Changes Applied:** BC-001, BC-002
---
```

---

## Implementation Checklist

### Immediate Actions

- [ ] Update VERSION file to `2025.11`
- [ ] Update all strategic files to new format: `2025.11 (2025.11.12 [time])`
- [ ] Remove duplicate footers from 7 files
- [ ] Create `_versions/v2025.11/` directory structure
- [ ] Create `_versions/v2025.11/JOURNAL.md`
- [ ] Create `_versions/v2025.11/BREAKING_CHANGES.md`
- [ ] Create synchronization script

### Process Setup

- [ ] Create breaking change registry template
- [ ] Create monthly synchronization workflow
- [ ] Document versioning process in quick reference
- [ ] Create version update automation
- [ ] Test synchronization on sample files

### Ongoing

- [ ] Monthly version review process
- [ ] Breaking change detection and registration
- [ ] Journal maintenance
- [ ] Synchronization verification

---

## Benefits

1. **Synchronization:** All files stay in sync with global version
2. **Traceability:** Local subversions track individual file changes
3. **Breaking Change Management:** Systematic propagation of changes
4. **Changelog Journal:** Complete history of all changes
5. **Automation:** Scripts handle routine synchronization
6. **Clarity:** Clear distinction between global and local changes

---

## Example Workflow

### Scenario: Framework Terminology Change

1. **Identify Breaking Change:**
   - Decision: Standardize "Bootstrap Model" → "Adaptive Framework: Bootstrap Phase"

2. **Register Breaking Change:**
   - Add to `_versions/v2025.11/BREAKING_CHANGES.md`
   - Identify affected files (3 files)

3. **Apply Changes:**
   - Update 3 affected files
   - Update local subversions
   - Log in journal

4. **Monthly Version Bump (if needed):**
   - If significant enough, bump to `2025.12`
   - Run synchronization script
   - All files updated to `2025.12`
   - Breaking changes documented

5. **Verification:**
   - All files synchronized
   - Breaking changes applied
   - Journal updated
   - Release notes created

---

## Decision Required

**Approve this enhanced versioning system?**
- ✅ Hierarchical Calendar Versioning (YYYY.MM + YYYY.MM.DD HH:MM)
- ✅ Synchronization system
- ✅ Breaking change registry
- ✅ Changelog journal
- ✅ Automated synchronization scripts

**Once approved, execute Phase 1 immediately.**

---

**Next Steps:**
1. Get approval on enhanced versioning system
2. Execute Phase 1 (establish current state)
3. Implement Phase 2 (synchronization system)
4. Establish ongoing process (Phase 3)
