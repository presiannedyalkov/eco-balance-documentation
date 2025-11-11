---
task_id: CLR-2025-11-11-003
created_by: Clarity Specialist
created_date: 2025-11-11
priority: HIGH
category: context
status: queued
---

# Remove Bootstrap Model References from Restoration Methodology

## Description

The Restoration Methodology document (`20_Restoration_Methodology.md`) uses "v2.0 Bootstrap Model" as a section header and includes comparisons to unknown old approaches ("not 10-30 hectares", "not 5-10 person team"). This assumes readers know the version history and old approach.

## Current State

**File**: `20_Restoration_Methodology.md`

**Issues Found:**
1. Line 52: `## v2.0 Bootstrap Model: Starting Small, Proving the Model` - Version-specific model name in header
2. Line 57: `1 hectare pilot site (not 10-30 hectares)` - Comparison to unknown old approach
3. Line 58: `1-2 founders (not 5-10 person team)` - Comparison to unknown old approach
4. Line 89: `Bootstrap viability` - Bootstrap terminology

## Desired State

Replace with direct, self-contained descriptions:
- Remove version-specific model name from header
- Remove "not X" comparisons
- Describe current approach directly
- Use descriptive language instead of model names

**Example Transformations:**
- `## v2.0 Bootstrap Model: Starting Small, Proving the Model` → `## Starting Small, Proving the Model` or `## Small-Scale Pilot Approach`
- `1 hectare pilot site (not 10-30 hectares)` → `1 hectare pilot site` (remove comparison)
- `1-2 founders (not 5-10 person team)` → `1-2 founders` (remove comparison)
- `Bootstrap viability` → `Achievable at small scale` or `Founder-level viability`

## Action Required

1. **Update section header** (line 52):
   - Change: `## v2.0 Bootstrap Model: Starting Small, Proving the Model`
   - To: `## Starting Small, Proving the Model` or `## Small-Scale Pilot Approach`

2. **Remove "not X" comparisons** (lines 57-58):
   - Change: `1 hectare pilot site (not 10-30 hectares)`
   - To: `1 hectare pilot site`
   - Change: `1-2 founders (not 5-10 person team)`
   - To: `1-2 founders`

3. **Replace "Bootstrap viability"** (line 89):
   - Change: `Bootstrap viability - achievable at 1 hectare with 1-2 founders`
   - To: `Achievable at small scale - 1 hectare with 1-2 founders` or `Founder-level viability - achievable at 1 hectare with 1-2 founders`

4. **Review "What This Is NOT" section** (lines 64-68):
   - Consider if this section is helpful or if it assumes knowledge of old approach
   - If kept, ensure it describes what current approach is NOT in general terms, not compared to old approach

## Impact

- ✅ Restoration Methodology becomes self-contained
- ✅ Core methodology document doesn't assume prior knowledge
- ✅ Direct descriptions replace comparative language
- ✅ No version-specific terminology
- ⚠️ **HIGH** - Core methodology document

## Affected Files

- `20_Restoration_Methodology.md` (4 instances to fix)

## Verification Criteria

- [ ] Version-specific model name removed from header
- [ ] "not X" comparisons removed
- [ ] "Bootstrap" terminology replaced with descriptive language
- [ ] Text describes current approach directly
- [ ] No assumptions about old approach
- [ ] First-time reader can understand without version history

## Estimated Effort

**MINOR** - Few instances, straightforward replacements

## Notes

- Restoration Methodology is a core technical document
- Removing comparisons makes text clearer
- Direct descriptions are more informative
- "What This Is NOT" section may be helpful if it describes general approach, not compared to old approach

