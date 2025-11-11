---
task_id: SAS-2025-11-11-003
created_by: Status Accuracy Specialist
created_date: 2025-11-11
priority: HIGH
category: tense
status: queued
---

# Fix Methodology Describing Future as Current

## Description

The Restoration Methodology document uses present tense to describe future methodology activities as if they're currently being done. Methodology should describe what will be done, not claim it's currently happening.

## Current State

**File**: `20_Restoration_Methodology.md`  
**Lines**: 14, 24, 30

**Current Text**:
- Line 14: "Tackles deforestation, soil degradation, water scarcity, and biodiversity loss simultaneously"
- Line 24: "Involve local communities throughout the process"
- Line 30: "Facilitate nature's ability to heal itself"

**Issue**: Present tense for future methodology activities. The methodology describes what will be done, not what is currently being done.

**Status Category**: Should be Planning/Methodology description, currently written as Reality

## Desired State

**Corrected Text**:
- Line 14: "**Will tackle** deforestation, soil degradation, water scarcity, and biodiversity loss simultaneously" or "**Aims to tackle**..."
- Line 24: "**Will involve** local communities throughout the process" or "**Aims to involve**..."
- Line 30: "**Will facilitate** nature's ability to heal itself" or "**Aims to facilitate**..."

**Status Category**: Planning/Methodology (describes future approach, not current activity)

## Action Required

1. **Update line 14**:
   - Change: "Tackles deforestation, soil degradation, water scarcity, and biodiversity loss simultaneously"
   - To: "**Will tackle** deforestation, soil degradation, water scarcity, and biodiversity loss simultaneously"

2. **Update line 24**:
   - Change: "Involve local communities throughout the process"
   - To: "**Will involve** local communities throughout the process"

3. **Update line 30**:
   - Change: "Facilitate nature's ability to heal itself"
   - To: "**Will facilitate** nature's ability to heal itself"

4. **Review "Philosophy: Holistic Environmental Restoration" section** (lines 7-48):
   - Check for other present tense statements that should be future
   - Ensure consistent methodology description language

## Impact

- ✅ Methodology accurately describes future approach, not current activity
- ✅ No misleading claims about current restoration work
- ✅ Consistent with project's Month 0 exploration status
- ⚠️ **HIGH** - Core methodology document

## Affected Files

- `20_Restoration_Methodology.md` (3+ instances in philosophy section)

## Verification Criteria

- [ ] Present tense changed to future/conditional tense
- [ ] Language accurately reflects methodology description (planning)
- [ ] No claim that methodology is currently being implemented
- [ ] Consistent with project's Month 0 exploration status
- [ ] Philosophy section reviewed for consistency

## Estimated Effort

**MINOR** - 3+ instances to fix, plus review of philosophy section

## Notes

- Methodology documents should describe what will be done, not claim current implementation
- Philosophy section should use consistent future/conditional language
- Should align with three-layer framework (Vision, Reality, Planning)

