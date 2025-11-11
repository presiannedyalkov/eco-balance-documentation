# Documentation Structure & Synchronization

## Current Structure

This repository contains documentation in two locations:

### 1. Strategic Documentation (Source of Truth)
- **Location**: `strategic/` folder and root
- **Root files**: `00_Eco_Balance_Hub.md` (main hub), `README.md`
- **Strategic files**: `strategic/01_Executive_Summary.md` through `strategic/70_Case_Studies_Restoration_Examples.md` (24 files)
- **Restoration Playbook**: `strategic/restoration_playbook/` (50 files - template/playbook)
- Use Obsidian-style links: `[[strategic/01_Executive_Summary|Executive Summary]]`
- These are the primary documentation files (source of truth)
- May be used with Obsidian or other markdown tools

### 2. `docs/` Directory (Docusaurus Site)
- Files organized in subdirectories: `docs/vision-strategy/`, `docs/business/`, etc.
- Use standard markdown links: `[Project Hub](/docs/intro)`
- Include Docusaurus frontmatter (id, title, sidebar_position)
- Used to generate the public documentation website

## Current Status

**⚠️ Important:** These two sets of files are currently **NOT synchronized**. 

- The root files still contain older content (e.g., "Production Release - Ready for Execution")
- The `docs/` files have been updated with new, honest content reflecting the exploration phase
- Changes made to one location are NOT automatically reflected in the other

## Source of Truth: DECIDED

**✅ Strategic Files are the Source of Truth**

- Strategic files (`strategic/01_Executive_Summary.md`, etc.) are the primary documentation
- `00_Eco_Balance_Hub.md` in root is the main navigation hub
- These files should be edited and updated
- `docs/` files are generated from strategic files via sync process
- **Do NOT edit `docs/` files directly** - they will be overwritten by sync

## Sync Process

When root files are updated, run the sync process to update `docs/` files:

### Option 1: Use Sync Script (Recommended)

```bash
# Sync all files
node scripts/sync-docs.js

# Sync specific files
node scripts/sync-docs.js 01_Executive_Summary.md 04_Current_Status_Assessment.md
```

The sync script:
- Converts Obsidian-style links (`[[...]]`) to Docusaurus links
- Adds appropriate frontmatter (id, title, sidebar_position)
- Preserves all content
- Updates corresponding `docs/` files

### Option 2: Manual Sync Using Persona

Use the [Documentation Sync Persona](./_process/sync/DOCS_SYNC_PERSONA.md) to manually sync files when needed.

---

## Previous Options (For Reference)

### Option A: Root Files as Source of Truth
- Keep root files as primary documentation
- Copy/convert to `docs/` when needed for website
- Pros: Single source, easier to maintain
- Cons: Need conversion process (Obsidian links → Docusaurus links)

### Option B: `docs/` Files as Source of Truth
- Keep `docs/` files as primary documentation
- Root files become archive/reference
- Pros: Already formatted for Docusaurus, cleaner structure
- Cons: Lose Obsidian-style linking if you use Obsidian

### Option C: Keep Both Separate
- Root files for personal/private use (Obsidian)
- `docs/` files for public website (Docusaurus)
- Manually sync important changes
- Pros: Best of both worlds
- Cons: Manual sync required, risk of divergence

## Recommended Approach

**Option C (Keep Both Separate)** seems most practical:

1. **Root files** - Your working documentation (if you use Obsidian or similar)
   - Keep for personal reference and editing
   - Use Obsidian-style links for internal navigation
   - Can contain more detailed/internal information

2. **`docs/` files** - Public-facing documentation
   - Source of truth for the Docusaurus website
   - Updated with honest, current status
   - Cleaner, more organized for public consumption

3. **Sync Strategy:**
   - When making major updates, update both locations
   - Or: Update `docs/` as primary, copy important sections to root if needed
   - Document which location has the latest version of each document

## File Mapping

| Strategic File | `docs/` Location | Status |
|----------------|------------------|--------|
| `00_Eco_Balance_Hub.md` (root) | `docs/intro.md` | ✅ Synced |
| `strategic/01_Executive_Summary.md` | `docs/vision-strategy/executive-summary.md` | ✅ Synced |
| `strategic/04_Current_Status_Assessment.md` | `docs/vision-strategy/current-status.md` | ✅ Synced |
| `strategic/31_Financial_Projections.md` | `docs/business/financial-projections.md` | ✅ Synced |
| `strategic/32_Funding_Strategy.md` | `docs/business/funding-strategy.md` | ✅ Synced |
| `strategic/30_Business_Model.md` | `docs/business/business-model.md` | ✅ Synced |
| `strategic/42_Adaptive_Timeline.md` | `docs/growth/adaptive-timeline.md` | ✅ Synced |
| `strategic/44_Site_Selection_Land_Acquisition.md` | `docs/growth/site-selection.md` | ✅ Synced |
| `strategic/12_Team_Roles.md` | `docs/organization/team-roles.md` | ✅ Synced |
| `_process/documentation/ROADMAP.md` | `docs/resources/roadmap.md` | ✅ Synced |

## Current Structure (After Reorganization - 2025-11-11)

**Root Directory:**
- `README.md` - Project entry point
- `00_Eco_Balance_Hub.md` - Main navigation hub

**Strategic Documentation:**
- `strategic/` - All strategic planning documents (01-70)
- `strategic/restoration_playbook/` - Restoration playbook template (50 files)

**Meta/Documentation Files:**
- `_process/documentation/` - Documentation about documentation (CHANGELOG, ROADMAP, etc.)

**Sync Process:**
- Strategic files in `strategic/` are source of truth
- Sync script reads from `strategic/` folder (or root for hub file)
- Meta files read from `_process/documentation/` folder

## Next Steps

1. ✅ **Source of truth decided** - Strategic files are the source
2. ✅ **Reorganization complete** - Files organized in strategic/ folder
3. ✅ **Sync process updated** - Script handles new structure
4. **Workflow:**
   - Edit strategic files (source of truth in `strategic/` folder)
   - Run sync script when ready to update website
   - Commit both strategic and `docs/` changes together

## Questions to Consider

- Do you actively use the root files with Obsidian or another tool?
- Do you need the Obsidian-style `[[...]]` links?
- Is the public website (`docs/`) the primary output you care about?
- How often do you update documentation?
- Would automated sync be helpful, or is manual sync acceptable?

---

**Last Updated:** November 2025  
**Status:** Needs decision on synchronization strategy

