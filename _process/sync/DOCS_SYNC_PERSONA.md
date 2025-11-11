# Documentation Sync Persona

## Role: Documentation Synchronizer

**Purpose:** Synchronize changes from root directory files (source of truth) to `docs/` directory (Docusaurus site)

---

## Source of Truth

**Strategic Files** are the source of truth:
- **Location**: `strategic/` folder (and root for hub file)
- Files like `strategic/01_Executive_Summary.md`, `strategic/02_Project_Vision.md`, etc.
- Hub file: `00_Eco_Balance_Hub.md` (in root)
- Use Obsidian-style links: `[[strategic/01_Executive_Summary|Executive Summary]]`
- These are the files that get edited and updated

**Target:** `docs/` directory files
- Files organized for Docusaurus website
- Need standard markdown links: `[Project Hub](/docs/intro)`
- Need Docusaurus frontmatter (id, title, sidebar_position)

---

## File Mapping

| Strategic File | `docs/` Location | Category |
|----------------|------------------|----------|
| `00_Eco_Balance_Hub.md` (root) | `docs/intro.md` | Home |
| `strategic/01_Executive_Summary.md` | `docs/vision-strategy/executive-summary.md` | Vision & Strategy |
| `strategic/02_Project_Vision.md` | `docs/vision-strategy/project-vision.md` | Vision & Strategy |
| `strategic/03_Success_Factors.md` | `docs/vision-strategy/success-factors.md` | Vision & Strategy |
| `strategic/04_Current_Status_Assessment.md` | `docs/vision-strategy/current-status.md` | Vision & Strategy |
| `strategic/10_Organizational_Structure.md` | `docs/organization/organizational-structure.md` | Organization |
| `strategic/11_Governance.md` | `docs/organization/governance.md` | Organization |
| `strategic/12_Team_Roles.md` | `docs/organization/team-roles.md` | Organization |
| `strategic/13_Legal_Framework.md` | `docs/organization/legal-framework.md` | Organization |
| `strategic/20_Restoration_Methodology.md` | `docs/operations/restoration-methodology.md` | Operations |
| `strategic/21_Technology_Integration.md` | `docs/operations/technology-integration.md` | Operations |
| `strategic/22_Restoration_Challenges_Solutions.md` | `docs/operations/challenges-solutions.md` | Operations |
| `strategic/30_Business_Model.md` | `docs/business/business-model.md` | Business |
| `strategic/31_Financial_Projections.md` | `docs/business/financial-projections.md` | Business |
| `strategic/32_Funding_Strategy.md` | `docs/business/funding-strategy.md` | Business |
| `strategic/40_Expansion_Growth_Strategy.md` | `docs/growth/expansion-strategy.md` | Growth |
| `strategic/42_Adaptive_Timeline.md` | `docs/growth/adaptive-timeline.md` | Growth |
| `strategic/43_Operations_Action_Plan.md` | `docs/growth/operations-action-plan.md` | Growth |
| `strategic/44_Site_Selection_Land_Acquisition.md` | `docs/growth/site-selection.md` | Growth |
| `strategic/45_Tiny_House_and_Living_Infrastructure.md` | `docs/growth/tiny-house-infrastructure.md` | Growth |
| `strategic/50_Risk_Assessment.md` | `docs/performance/risk-assessment.md` | Performance |
| `strategic/51_Key_Performance_Indicators.md` | `docs/performance/kpis.md` | Performance |
| `strategic/60_Marketing_Communications_Strategy.md` | `docs/engagement/marketing-communications.md` | Engagement |
| `strategic/70_Case_Studies_Restoration_Examples.md` | `docs/learning/case-studies.md` | Learning |
| `ROADMAP.md` | `docs/resources/roadmap.md` | Resources |
| `QUICK_REFERENCE_GUIDE.md` | `docs/resources/quick-reference.md` | Resources |
| `FEATURE_WISHLIST.md` | `docs/resources/feature-wishlist.md` | Resources |

---

## Sync Process

### Step 1: Detect Changes
- Check which root files have been modified (git diff, file timestamps, or manual trigger)
- Identify files that need syncing

### Step 2: Convert Content

For each file that needs syncing:

1. **Read root file** (source of truth)

2. **Convert Obsidian links to Docusaurus links:**
   - `[[strategic/00_Eco_Balance_Hub|Project Hub]]` → `[Project Hub](/docs/intro)`
   - `[[strategic/01_Executive_Summary|Executive Summary]]` → `[Executive Summary](/docs/vision-strategy/executive-summary)`
   - `[[_process/documentation/ROADMAP|Roadmap]]` → `[Roadmap](/docs/resources/roadmap)`
   - Use the file mapping table above for conversions

3. **Add/Update Docusaurus frontmatter:**
   ```yaml
   ---
   id: [id-from-mapping]
   title: [Title from root file or mapping]
   sidebar_position: [position from mapping]
   ---
   ```

4. **Update back links:**
   - `**← Back to [[strategic/00_Eco_Balance_Hub|Project Hub]]**` → `**← Back to [Project Hub](/docs/intro)**`

5. **Preserve all other content** - don't change the actual content, only links and frontmatter

### Step 3: Write to Target
- Write converted content to corresponding `docs/` file
- Ensure directory structure exists
- Preserve file permissions

### Step 4: Verify
- Check that links are valid
- Verify frontmatter is correct
- Ensure no content was lost

---

## Frontmatter Mapping

Each `docs/` file needs appropriate frontmatter. Use this mapping:

| Root File | id | title | sidebar_position |
|-----------|----|----|------------------|
| `00_Eco_Balance_Hub.md` | `intro` | `Project Hub` | `0` |
| `01_Executive_Summary.md` | `executive-summary` | `Executive Summary` | `1` |
| `02_Project_Vision.md` | `project-vision` | `Project Vision & Context` | `2` |
| `03_Success_Factors.md` | `success-factors` | `Success Factors & Assumptions` | `3` |
| `04_Current_Status_Assessment.md` | `current-status` | `Current Status & Assessment` | `4` |
| `10_Organizational_Structure.md` | `organizational-structure` | `Organizational Structure` | `1` |
| `11_Governance.md` | `governance` | `Governance Framework` | `2` |
| `12_Team_Roles.md` | `team-roles` | `Team Roles` | `3` |
| `13_Legal_Framework.md` | `legal-framework` | `Legal Framework` | `4` |
| `20_Restoration_Methodology.md` | `restoration-methodology` | `Restoration Methodology` | `1` |
| `21_Technology_Integration.md` | `technology-integration` | `Technology Integration` | `2` |
| `22_Restoration_Challenges_Solutions.md` | `challenges-solutions` | `Restoration Challenges & Solutions` | `3` |
| `30_Business_Model.md` | `business-model` | `Business Model` | `1` |
| `31_Financial_Projections.md` | `financial-projections` | `Financial Projections` | `2` |
| `32_Funding_Strategy.md` | `funding-strategy` | `Funding Strategy` | `3` |
| `40_Expansion_Growth_Strategy.md` | `expansion-strategy` | `Expansion Strategy` | `1` |
| `42_Adaptive_Timeline.md` | `adaptive-timeline` | `Adaptive Timeline` | `2` |
| `43_Operations_Action_Plan.md` | `operations-action-plan` | `Operations Action Plan` | `3` |
| `44_Site_Selection_Land_Acquisition.md` | `site-selection` | `Site Selection` | `4` |
| `45_Tiny_House_and_Living_Infrastructure.md` | `tiny-house-infrastructure` | `Tiny House Infrastructure` | `5` |
| `50_Risk_Assessment.md` | `risk-assessment` | `Risk Assessment` | `1` |
| `51_Key_Performance_Indicators.md` | `kpis` | `Key Performance Indicators` | `2` |
| `60_Marketing_Communications_Strategy.md` | `marketing-communications` | `Marketing & Communications` | `1` |
| `70_Case_Studies_Restoration_Examples.md` | `case-studies` | `Case Studies & Examples` | `1` |
| `ROADMAP.md` | `roadmap` | `Roadmap` | `2` |
| `QUICK_REFERENCE_GUIDE.md` | `quick-reference` | `Quick Reference Guide` | `1` |
| `FEATURE_WISHLIST.md` | `feature-wishlist` | `Feature Wishlist` | `3` |

---

## Link Conversion Rules

### Obsidian to Docusaurus Link Patterns

1. **Internal document links:**
   - `[[strategic/00_Eco_Balance_Hub|Project Hub]]` → `[Project Hub](/docs/intro)`
   - `[[strategic/01_Executive_Summary]]` → `[Executive Summary](/docs/vision-strategy/executive-summary)`
   - Pattern: `[[filename|display text]]` or `[[filename]]` → `[display text](/docs/path)`

2. **Back links:**
   - `**← Back to [[strategic/00_Eco_Balance_Hub|Project Hub]]**` → `**← Back to [Project Hub](/docs/intro)**`

3. **Section links (if needed):**
   - `[[strategic/00_Eco_Balance_Hub#Vision|Vision]]` → `[Vision](/docs/intro#vision)`

4. **Keep external links as-is:**
   - `[un.org](https://un.org)` stays the same

---

## Special Considerations

1. **Preserve AI-Assisted Template markers:**
   - Keep any `> **📋 AI-Assisted Template:**` blocks as-is
   - These are important markers in the docs

2. **Preserve Reality Document markers:**
   - Keep any `> **📍 Reality Document:**` blocks as-is

3. **Don't modify content:**
   - Only convert links and add frontmatter
   - Don't change actual content, formatting, or structure

4. **Handle edge cases:**
   - Files that don't exist in mapping (skip or log warning)
   - Links to files that don't exist (keep as-is or convert if known)
   - Multiple link formats in same file

---

## Execution

### Manual Sync (Current)
- When root files are updated, manually run sync process
- Use this persona to guide the conversion

### Automated Sync (Future)
- Could create a script (Node.js/Python) to automate this
- Run on git commit hook or scheduled task
- Or trigger manually when needed

---

## Example Conversion

**Root file (`01_Executive_Summary.md`):**
```markdown
# Executive Summary

**← Back to [[strategic/00_Eco_Balance_Hub|Project Hub]]**

See [[_process/documentation/ROADMAP|Roadmap]] for details.
```

**Converted to (`docs/vision-strategy/executive-summary.md`):**
```markdown
---
id: executive-summary
title: Executive Summary
sidebar_position: 1
---

# Executive Summary

**← Back to [Project Hub](/docs/intro)**

See [Roadmap](/docs/resources/roadmap) for details.
```

---

## Notes

- **Source of truth:** Root files - always edit these first
- **Target:** `docs/` files - generated from root, don't edit directly
- **Sync frequency:** When root files change
- **Verification:** Check links work, frontmatter correct, content preserved

---

**Last Updated:** November 2025  
**Status:** Active sync process

