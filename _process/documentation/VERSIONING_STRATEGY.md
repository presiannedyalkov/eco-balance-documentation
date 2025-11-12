# Versioning Strategy & Migration Plan

**Created:** November 12, 2025  
**Purpose:** Resolve version control chaos and establish clear versioning system  
**Status:** Proposal

---

## Current Problem

- VERSION file: `2.0.0`
- 16 strategic files: `Document Version: 3.0.0`
- Hub file: `Version: 2.0.0`
- No `_versions/v2.0.0/` or `_versions/v3.0.0/` directories
- 7 files have duplicate footer metadata

**Impact:** Impossible to determine authoritative version. Creates confusion.

---

## Proposed Solution: Calendar Versioning (CalVer)

### Why Calendar Versioning?

**Current System (SemVer):** MAJOR.MINOR.PATCH
- **Problem:** Doesn't reflect actual project state
- **Problem:** "Breaking changes" concept doesn't apply to documentation
- **Problem:** Version numbers become arbitrary after major refactors

**Proposed System (CalVer):** YYYY.MM.DD or YYYY.MM
- **Benefits:**
  - Clear chronological progression
  - No confusion about "what version is current"
  - Reflects actual update dates
  - Easy to understand: "November 2025 version"
  - No need to decide "is this major or minor?"

### Format Options

**Option A: YYYY.MM.DD** (Date-based)
- Example: `2025.11.12`
- Pros: Precise, clear date
- Cons: Many version numbers if frequent updates

**Option B: YYYY.MM** (Month-based) ⭐ **RECOMMENDED**
- Example: `2025.11`
- Pros: Clean, monthly releases, easy to track
- Cons: Less precise for multiple releases per month

**Option C: YYYY.MM.REV** (Month + Revision)
- Example: `2025.11.1`, `2025.11.2`
- Pros: Multiple releases per month
- Cons: Slightly more complex

---

## Recommended: YYYY.MM Format

### Version Format: `YYYY.MM`

**Examples:**
- `2025.11` - November 2025 release (Adaptive Framework transformation)
- `2025.12` - December 2025 release
- `2026.01` - January 2026 release

### When to Bump Version

**Monthly Release Cycle:**
- Create new version at end of month (or when significant changes accumulate)
- Include all changes since last version
- Update all strategic files to new version
- Create version artifact directory

**Exception:**
- Major milestone reached mid-month → Create version immediately
- Example: Location decision finalized → `2025.11.1` (if needed)

---

## Migration Plan

### Phase 1: Resolve Current Chaos (Immediate)

1. **Decide Current Version**
   - Based on Adaptive Framework transformation (Nov 6-10, 2025)
   - **Decision:** Current version is `2025.11` (November 2025)

2. **Update All Files**
   - VERSION file: `2025.11`
   - All strategic files: `Document Version: 2025.11`
   - Hub file: `Version: 2025.11`
   - Remove duplicate footers from 7 files

3. **Create Version Artifacts**
   - Create `_versions/v2025.11/` directory
   - Create `_versions/v2025.11/RELEASE_NOTES.md`
   - Document Adaptive Framework transformation

4. **Update Documentation**
   - Update `_versions/README.md` with new versioning system
   - Update versioning guides in quick reference

**Effort:** 2-3 hours

---

### Phase 2: Establish Process (This Week)

1. **Create Version Release Workflow**
   - Document when to create new version
   - Create checklist for version release
   - Update `_vault_maintenance/workflows/version_release_workflow.md`

2. **Update Footer Template**
   - Standardize footer format:
     ```
     ---
     **Document Version:** 2025.11
     **Last Updated:** 2025-11-12
     **Status:** Active
     ---
     ```

3. **Create Automation Script** (Optional)
   - Script to update all footers to new version
   - Script to create version artifact directory

**Effort:** 2-3 hours

---

### Phase 3: Historical Migration (Optional)

1. **Migrate Old Versions**
   - v1.0.0 → `2025.10` (October 2025)
   - v2.0.0 → `2025.11` (November 2025 - Bootstrap Model)
   - Create release notes for historical versions

2. **Update References**
   - Update all documentation mentioning old version numbers
   - Update CHANGELOG with new format

**Effort:** 1-2 hours (optional)

---

## Implementation Checklist

### Immediate Actions

- [ ] Update VERSION file to `2025.11`
- [ ] Update all strategic files (00-70 range) to `Document Version: 2025.11`
- [ ] Update Hub file to `Version: 2025.11`
- [ ] Remove duplicate footers from 7 files
- [ ] Create `_versions/v2025.11/` directory
- [ ] Create `_versions/v2025.11/RELEASE_NOTES.md`
- [ ] Update `_versions/README.md` with CalVer explanation

### Process Updates

- [ ] Update version release workflow
- [ ] Create footer template
- [ ] Document versioning strategy in quick reference
- [ ] Update any automation scripts

### Optional

- [ ] Migrate historical versions
- [ ] Update CHANGELOG format
- [ ] Create version update script

---

## Benefits of Calendar Versioning

1. **Clarity:** "2025.11" clearly means "November 2025 version"
2. **No Arbitrary Numbers:** No need to decide "major vs minor"
3. **Chronological:** Versions naturally progress with time
4. **Simple:** Easy to understand and communicate
5. **Flexible:** Can add revision number if needed (`2025.11.1`)

---

## Alternative: Keep SemVer but Fix Process

If you prefer to keep Semantic Versioning:

1. **Establish Authority:** VERSION file is source of truth
2. **Sync Process:** All footers must match VERSION file
3. **Automation:** Script to update all footers when VERSION changes
4. **Documentation:** Clear rules for when to bump MAJOR/MINOR/PATCH

**Recommendation:** Calendar Versioning is simpler for documentation projects.

---

## Decision Required

**Choose one:**
1. ✅ **Calendar Versioning (YYYY.MM)** - Recommended
2. Semantic Versioning (with fixed process)
3. Other system (specify)

**Once decided, execute Phase 1 immediately.**

---

**Next Steps:**
1. Get approval on versioning system
2. Execute Phase 1 (resolve current chaos)
3. Establish monthly release cycle

