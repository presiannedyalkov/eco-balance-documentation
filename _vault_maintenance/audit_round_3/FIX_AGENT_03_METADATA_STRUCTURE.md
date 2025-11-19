# 🟡 FIX AGENT 03 - Metadata & Structure Standardization

**Priority**: MEDIUM (with some HIGH elements)
**Agent**: FIX-AGENT-03
**Issues**: 20+ metadata and structure issues
**Files**: 20+
**Est. Time**: 2-3 hours

---

## 🎯 MISSION

Standardize metadata across all documentation types to ensure consistency and completeness. This includes adding missing frontmatter, version footers, and standardizing process documentation.

**Impact**: Ensures all documents have proper version tracking and status indicators.

---

## 📋 TASK 1: ADD MISSING FRONTMATTER (2 files - HIGH PRIORITY)

### File 1: implementation_tasks/soil_restoration/00_Soil_Restoration_Overview.md

**Status**: CRITICAL - This is the ONLY file completely missing frontmatter

**Add at line 1 (before existing content):**

```markdown
---
**Document Version:** 2.0.0
**Last Updated:** 2025-11-08
**Status:** Active
**Aligned with:** Bootstrap Model v2.0
---

# Soil Restoration Overview

[Rest of existing content...]
```

### File 2: implementation_tasks/water_management/00_Water_Management_Overview.md

**Status**: HIGH - Missing standard frontmatter

**Add at line 1 (before existing content):**

```markdown
---
**Document Version:** 2.0.0
**Last Updated:** 2025-11-08
**Status:** Active
**Aligned with:** Bootstrap Model v2.0
---

# Water Management Overview

[Rest of existing content...]
```

### Verification

After adding frontmatter:
- [ ] Both files have complete frontmatter before first heading
- [ ] Formatting matches template exactly
- [ ] Date is 2025-11-08 (not 2024)
- [ ] Version is 2.0.0
- [ ] Bootstrap Model alignment noted

---

## 📋 TASK 2: ADD VERSION FOOTERS (5 files - MEDIUM PRIORITY)

Add standardized version footer to bottom of each file (after all content):

**Template:**
```markdown
---

**Document Version:** 2.0.0 | **Last Updated:** 2025-11-08 | **Status:** Active
```

### File 1: 13_Legal_Framework.md

Add footer after final line of content:

```markdown
---

**Document Version:** 2.0.0 | **Last Updated:** 2025-11-08 | **Status:** Active
```

### File 2: 40_Expansion_Growth_Strategy.md

Add footer after final line of content:

```markdown
---

**Document Version:** 2.0.0 | **Last Updated:** 2025-11-08 | **Status:** Active
```

### File 3: implementation_tasks/reforestation/00_Reforestation_Overview.md

Add footer after final line of content:

```markdown
---

**Document Version:** 2.0.0 | **Last Updated:** 2025-11-08 | **Status:** Active
```

### File 4: implementation_tasks/site_selection/00_Site_Selection_Overview.md

Add footer after final line of content:

```markdown
---

**Document Version:** 2.0.0 | **Last Updated:** 2025-11-08 | **Status:** Active
```

### File 5: implementation_tasks/community_engagement/00_Community_Engagement_Overview.md

Add footer after final line of content:

```markdown
---

**Document Version:** 2.0.0 | **Last Updated:** 2025-11-08 | **Status:** Active
```

### Verification

After adding footers:
- [ ] All 5 files have version footer at end
- [ ] Format is consistent across all files
- [ ] No duplicate footers added
- [ ] Footer appears after final content line

---

## 📋 TASK 3: STANDARDIZE PROCESS DOCUMENTATION (8 files)

Process documentation needs consistent metadata formatting.

### File 1: _process/audit/README.md

**Current**: Missing standard metadata
**Add at top:**

```markdown
---
**Process:** Documentation Audit
**Version:** 2.0.0
**Last Updated:** 2025-11-08
**Status:** Active Process
---

# Documentation Audit Process

[Rest of existing content...]
```

**Also fix Line 47:**
```markdown
<!-- BEFORE -->
Last updated: November 2024

<!-- AFTER -->
Last updated: 2025-11-08
```

### File 2: _process/conversion/README.md

**Current**: Missing standard metadata
**Add at top:**

```markdown
---
**Process:** Bootstrap Model Conversion
**Version:** 2.0.0
**Last Updated:** 2025-11-08
**Status:** Complete (Historical Reference)
---

# Bootstrap Model Conversion Process

[Rest of existing content...]
```

**Also fix Line 57:**
```markdown
<!-- BEFORE -->
Conversion period: October-November 2024

<!-- AFTER -->
Conversion period: October-November 2024 (Complete)
Last updated: 2025-11-08
```

### File 3: _process/planning/README.md

**Current**: Missing standard metadata
**Add at top:**

```markdown
---
**Process:** Project Planning & Iteration
**Version:** 2.0.0
**Last Updated:** 2025-11-08
**Status:** Active Process
---

# Project Planning Process

[Rest of existing content...]
```

**Also fix Line 85:**
```markdown
<!-- BEFORE -->
Last updated: November 2024

<!-- AFTER -->
Last updated: 2025-11-08
```

### Files 4-5: Date Format Standardization

**File**: _process/documentation/README.md
**Line 76**:
```markdown
<!-- BEFORE -->
Last updated: November 2024

<!-- AFTER -->
Last updated: 2025-11-08
```

**File**: _process/git/README.md
**Line 83**:
```markdown
<!-- BEFORE -->
Last updated: November 2024

<!-- AFTER -->
Last updated: 2025-11-08
```

### Files 6-7: Complete Incomplete Dates

**File**: _process/planning/INTEGRATION_PLAN_Phase3.md
**Line 2**:
```markdown
<!-- BEFORE -->
**Date:** 2024-11-XX

<!-- AFTER -->
**Date:** 2024-11-08 (Planning document - historical)
```

**File**: _process/planning/INTEGRATION_PROGRESS_TRACKER.md
**Line 2**:
```markdown
<!-- BEFORE -->
**Date:** 2024-11-XX

<!-- AFTER -->
**Date:** 2024-11-08 (Last updated: 2025-11-08)
```

### Verification for Process Docs

After standardization:
- [ ] All 3 main README files have metadata headers
- [ ] All dates use YYYY-MM-DD format
- [ ] No "XX" placeholders remain
- [ ] Historical documents marked as such
- [ ] Active processes clearly indicated

---

## 📋 TASK 4: MARK HISTORICAL DOCUMENTS

### File: _process/migration/MIGRATION_ANALYSIS_COMPLETE.md

**Add notice at top (after existing metadata if present):**

```markdown
> **📁 HISTORICAL DOCUMENT**
> This document records the completion of the migration process in November 2024.
> Status: Complete - Kept for historical reference only.
> For current processes, see _process/README.md

---
```

### File: GIT_PUSH_INSTRUCTIONS.md (if still exists)

**Decision Point**: Either update for v2.0 or mark as historical.

**Option A - Mark as Historical:**
```markdown
> **⚠️ HISTORICAL DOCUMENT - v1.0.0**
> This document reflects v1.0.0 workflow from October 2024.
> Current version is v2.0.0 (November 2024).
> For current Git processes, see _process/git/README.md

---
```

**Option B - Update to v2.0:**
- Update all version references: 1.0.0 → 2.0.0
- Update bootstrap model references
- Update dates

**Recommendation**: Option A (mark historical) unless file is actively used.

### Verification for Historical Docs

After marking:
- [ ] Historical documents clearly labeled
- [ ] Reference to current documentation provided
- [ ] Completion/archive dates noted
- [ ] Still accessible but status is clear

---

## 📋 TASK 5: METADATA CONSISTENCY FIXES

### Content Consistency Issues to Address

**File**: 13_Legal_Framework.md
**Issue**: Cost summary inconsistency
- Line 445: Shows €30-35k
- Line 351: Shows €28-33k

**Fix**: Review both sections and align to single consistent range. Recommended: €28-35k (encompassing both ranges with note about variance).

**File**: implementation_tasks/README.md
**Line 39**: Biodiversity phase shows 8 tasks, actually 7
**Line 11**: Total shows 42 files, actually 44

**Fix**:
```markdown
<!-- Line 39 BEFORE -->
**Biodiversity Conservation** (8 tasks)

<!-- Line 39 AFTER -->
**Biodiversity Conservation** (7 tasks)

<!-- Line 11 BEFORE -->
This directory contains 42 implementation task files...

<!-- Line 11 AFTER -->
This directory contains 44 implementation task files...
```

---

## 🤖 AUTOMATION SCRIPT (Optional)

For adding metadata headers systematically:

```bash
#!/bin/bash
# add_metadata.sh - Add standard metadata to files missing it

add_frontmatter() {
    local file=$1
    local doc_type=$2

    # Create temp file with frontmatter
    cat > /tmp/frontmatter.md <<EOF
---
**Document Version:** 2.0.0
**Last Updated:** 2025-11-08
**Status:** Active
**Aligned with:** Bootstrap Model v2.0
---

EOF

    # Prepend to file
    cat /tmp/frontmatter.md "$file" > /tmp/newfile.md
    mv /tmp/newfile.md "$file"
    echo "✓ Added frontmatter to $file"
}

add_footer() {
    local file=$1

    # Append footer
    cat >> "$file" <<EOF

---

**Document Version:** 2.0.0 | **Last Updated:** 2025-11-08 | **Status:** Active
EOF

    echo "✓ Added footer to $file"
}

# Usage examples:
# add_frontmatter "implementation_tasks/soil_restoration/00_Soil_Restoration_Overview.md" "overview"
# add_footer "13_Legal_Framework.md"
```

**Note**: Manual addition is recommended to avoid errors. Use script only if comfortable with bash.

---

## ✅ VERIFICATION CHECKLIST

### Frontmatter
- [ ] soil_restoration/00_Soil_Restoration_Overview.md has complete frontmatter
- [ ] water_management/00_Water_Management_Overview.md has complete frontmatter
- [ ] Both use 2025-11-08 date (not 2024)
- [ ] Both show v2.0.0

### Version Footers
- [ ] All 5 strategic/overview files have footers
- [ ] Footer format is consistent
- [ ] No duplicate footers

### Process Documentation
- [ ] 3 main README files have metadata headers
- [ ] All dates in YYYY-MM-DD format
- [ ] No incomplete dates (XX) remain
- [ ] Historical status clearly marked

### Historical Documents
- [ ] MIGRATION_ANALYSIS_COMPLETE.md marked historical
- [ ] GIT_PUSH_INSTRUCTIONS.md updated or marked historical
- [ ] Archive notices include references to current docs

### Content Consistency
- [ ] 13_Legal_Framework.md cost ranges aligned
- [ ] implementation_tasks/README.md counts corrected

### Search Verification
Run these to verify no issues remain:
```bash
# Find files missing metadata
grep -L "Document Version" implementation_tasks/*/00_*.md

# Find incomplete dates
grep -r "2024-11-XX" _process/

# Find old date format
grep -r "November 2024" _process/ --include="README.md"
```

---

## 📤 DELIVERABLES

1. **Modified Files**: 20+ files with standardized metadata
2. **Metadata Template**: Document showing standard formats used
3. **Before/After Comparison**: Screenshots or diffs showing changes
4. **Verification Report**: Results of search verification commands
5. **Pull Request**:
   - Branch: `fix-round-3/agent-03-metadata-structure`
   - Title: "Fix Round 3: Agent 03 - Metadata & Structure Standardization"
   - Description: "Standardized metadata across 20+ files: added missing frontmatter (2 files), version footers (5 files), process doc metadata (8 files), marked historical documents"

---

## 🚨 IMPORTANT NOTES

1. **Frontmatter Position**: Must be at very top of file, before any content
2. **Footer Position**: Must be at very bottom, after all content
3. **Date Consistency**: Use 2025-11-08 for "Last Updated" (not 2024)
4. **Version Consistency**: All active docs should show 2.0.0
5. **Don't Duplicate**: Check if metadata already exists before adding
6. **Format Exactly**: Maintain exact format for consistency

---

**Status**: Ready for Execution
**Priority**: 🟡 MEDIUM (but includes HIGH-priority frontmatter additions)
**Dependencies**: Can run in parallel with other agents
**Estimated Completion**: 2-3 hours
