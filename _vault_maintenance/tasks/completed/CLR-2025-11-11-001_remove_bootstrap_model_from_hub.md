---
task_id: CLR-2025-11-11-001
created_by: Clarity Specialist
created_date: 2025-11-11
priority: CRITICAL
category: context
status: queued
---

# Remove Bootstrap Model Terminology from Hub Page

## Description

The hub page (`00_Eco_Balance_Hub.md`) contains extensive use of "Bootstrap Model" terminology and "was X, now Y" comparisons that assume readers know the version history and old approach. This makes the documentation incomprehensible to first-time readers who don't know what "Bootstrap Model" means or what the old approach was.

## Current State

**File**: `00_Eco_Balance_Hub.md`

**Issues Found:**
1. Line 3: `Version: 2.0.0 (Bootstrap Model)` - Model name in version
2. Line 14: `MAJOR METHODOLOGY CHANGE: Large-Scale Model → Bootstrap Model` - Assumes knowledge of both models
3. Lines 18-22: Multiple "was X, now Y" comparisons:
   - "was 10-30 ha" (readers don't know this was old approach)
   - "was €500k-2M" (readers don't know this was old budget)
   - "was 20-100 people" (readers don't know this was old team size)
   - "was 20 kW, AWG" (readers don't know this was old technology)
4. Line 24: `What Changed in v2.0.0:` - Requires version history knowledge
5. Line 34: `v2.0.0 Bootstrap Model` - Version-specific model name
6. Line 19: `Bootstrap Model v2.0` - Version-specific model name

## Desired State

All references should be self-contained and descriptive:
- Remove "Bootstrap Model" terminology
- Remove "was X, now Y" comparisons
- Replace with direct descriptions of current approach
- Remove "What Changed" language
- Describe what IS, not what changed

**Example Transformations:**
- `Version: 2.0.0 (Bootstrap Model)` → `Version: 2.0.0`
- `MAJOR METHODOLOGY CHANGE: Large-Scale Model → Bootstrap Model` → Remove or replace with descriptive text
- `was 10-30 ha, now 0.5-1.5 ha` → `Small pilot scale: typically 0.5-1.5 hectares`
- `was €500k-2M, now €20-30k` → `Approximately €20-30k Year 1 budget range`
- `What Changed in v2.0.0:` → Remove or move to version history

## Action Required

1. **Remove model name from version** (line 3):
   - Change: `Version: 2.0.0 (Bootstrap Model)`
   - To: `Version: 2.0.0`

2. **Remove or rewrite "MAJOR METHODOLOGY CHANGE" section** (line 14):
   - Option A: Remove entirely
   - Option B: Replace with: "This release focuses on a small-scale pilot approach designed for immediate viability with founder-level resources."

3. **Replace "was X, now Y" comparisons** (lines 18-22):
   - Remove all "(was X)" parentheticals
   - Keep only current state descriptions
   - Example: `Small Pilot Scale - Immediate viability focus (typically 0.5-1.5 hectares)` (remove "was 10-30 ha")

4. **Remove "What Changed" section** (line 24):
   - Delete or move to version history
   - Replace with direct description of current approach

5. **Remove version-specific model names** (lines 19, 34):
   - Change: `Bootstrap Model v2.0` → Remove "Bootstrap Model"
   - Change: `v2.0.0 Bootstrap Model` → Remove "Bootstrap Model"

6. **Update "Bootstrap Model Approach" callout** (line 34):
   - Change: `v2.0.0 Bootstrap Model starts with...`
   - To: `This approach starts with a small Year 1 pilot...`

## Impact

- ✅ Hub page becomes self-contained and clear
- ✅ First-time readers understand current approach without prior knowledge
- ✅ No assumptions about version history
- ✅ Direct descriptions replace comparative language
- ⚠️ **CRITICAL** - Hub is the first document readers see

## Affected Files

- `00_Eco_Balance_Hub.md` (8+ instances to fix)

## Verification Criteria

- [ ] All "Bootstrap Model" terminology removed
- [ ] All "was X, now Y" comparisons removed
- [ ] "What Changed" section removed or moved
- [ ] Version-specific model names removed
- [ ] Text describes current approach directly
- [ ] No assumptions about prior knowledge
- [ ] First-time reader can understand without version history

## Estimated Effort

**MODERATE** - Multiple sections need rewriting, but straightforward find-replace for most instances

## Notes

- Hub page is the entry point - critical for first impressions
- Removing comparative language makes text clearer
- Direct descriptions are more informative than comparisons
- Version history belongs in version artifacts, not main documentation

