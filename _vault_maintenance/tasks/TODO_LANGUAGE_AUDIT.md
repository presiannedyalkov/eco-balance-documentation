# TODO: Language Audit - Remove AI-Generated Turgid Phrases

**Created:** November 12, 2025  
**Priority:** High  
**Status:** Pending  
**Assigned To:** Content Quality Persona (Agent 2 - Curator)

---

## Problem Statement

The documentation contains AI-generated grandiose phrases that don't reflect the reality of a 1-hectare pilot project. These phrases create misalignment between vision and execution, potentially undermining credibility with stakeholders.

**Example:**
- ❌ "combating climate change at scale"
- ✅ "demonstrating ecological restoration methods on a small pilot site"

---

## Audit Scope

### Files to Review

**Primary Focus:**
- `docs/vision-strategy/project-vision.md`
- `docs/engagement/marketing-communications.md`
- `docs/growth/expansion-strategy.md`
- `docs/learning/case-studies.md`
- `docs/resources/roadmap.md`

**Secondary Review:**
- All strategic files (00-70 range)
- All public-facing documentation

---

## Phrases to Identify and Replace

### Category 1: Grandiose Scale Claims

**Patterns to Find:**
- "at scale"
- "combating climate change"
- "restoring ecological balance" (when used grandiosely)
- "ecosystem restoration at scale"
- "transformative impact"
- "revolutionary approach"
- "game-changing"

**Replacement Strategy:**
- Replace with specific, realistic language
- Focus on pilot/demonstration nature
- Emphasize proof-of-concept value
- Use concrete numbers (1 hectare, €20-30K budget)

### Category 2: Overly Ambitious Language

**Patterns to Find:**
- "holistic ecosystem restoration"
- "comprehensive solution"
- "addressing global challenges"
- "systemic change"
- "paradigm shift"

**Replacement Strategy:**
- Use "demonstration project"
- "Proof-of-concept for..."
- "Small-scale pilot testing..."
- "Validating methods for potential scale-up"

### Category 3: Vague Impact Claims

**Patterns to Find:**
- "significant impact"
- "meaningful change"
- "substantial contribution"
- "major transformation"

**Replacement Strategy:**
- Quantify where possible
- Use "demonstrating potential for..."
- "Testing feasibility of..."
- "Learning from small-scale implementation"

---

## Audit Process

### Step 1: Automated Search

```bash
# Search for common turgid phrases
grep -r "at scale\|combating climate\|transformative\|revolutionary" docs/
grep -r "holistic\|comprehensive solution\|systemic change" docs/
grep -r "significant impact\|meaningful change\|major transformation" docs/
```

### Step 2: Manual Review

- Review each instance in context
- Determine if phrase is appropriate or needs replacement
- Consider target audience (funders vs. community vs. volunteers)

### Step 3: Replacement

- Replace with realistic, specific language
- Maintain professional tone
- Preserve enthusiasm but ground in reality
- Add context about pilot nature where needed

### Step 4: Verification

- Review changes for consistency
- Ensure tone matches throughout document
- Check that replacements don't create new issues

---

## Examples of Good Replacements

### Before → After

**Vision Statement:**
- ❌ "Eco Balance is a restoration project aimed at combating climate change and restoring ecological balance at scale."
- ✅ "Eco Balance is a 1-hectare demonstration project testing ecological restoration methods that could be scaled to larger areas if proven effective."

**Marketing Copy:**
- ❌ "We're not just planting trees; we're rebuilding ecosystems at scale."
- ✅ "We're testing comprehensive restoration methods on a small pilot site to validate approaches for potential larger-scale application."

**Expansion Strategy:**
- ❌ "Implement proven soil regeneration protocols at scale"
- ✅ "If pilot succeeds, expand validated methods to 10-100 hectare sites"

---

## Success Criteria

- [ ] All grandiose phrases identified
- [ ] All instances reviewed in context
- [ ] Replacements made with realistic language
- [ ] Tone consistent across all documents
- [ ] Vision-execution alignment improved
- [ ] Stakeholder credibility risk reduced

---

## Estimated Effort

- **Search & Identify:** 1-2 hours
- **Review & Context Check:** 2-3 hours
- **Replacement & Editing:** 3-4 hours
- **Verification:** 1 hour

**Total:** 7-10 hours

---

## Related Issues

- Vision-Execution Misalignment (Audit Summary - Critical #2)
- Stakeholder Readiness Gaps (Agent 10 - Critical findings)
- Strategic Decision Paralysis (Agent 8 - Critical #1)

---

## Notes

- This audit should be done by human reviewer or Content Quality persona
- AI-generated content often uses these phrases - need human judgment
- Balance: Maintain enthusiasm while being realistic
- Consider creating style guide to prevent future issues

---

**Next Action:** Assign to Content Quality persona or schedule manual review session.

