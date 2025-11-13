# Pending Tasks Summary

**Last Updated:** November 12, 2025  
**Status:** Active Tracking

---

## 🎯 High Priority Tasks

### 1. Versioning Strategy Implementation ⏳
**Status:** Plan created, not yet executed  
**Priority:** High  
**Estimated Effort:** 2-4 hours

**What needs to be done:**
- [ ] Update `VERSION` file from `2.0.0` to `2025.11` (Calendar Versioning)
- [ ] Run `scripts/sync_versions.sh` to update all document versions
- [ ] Create `_versions/v2025.11/` directory structure
- [ ] Create `_versions/v2025.11/JOURNAL.md`
- [ ] Create `_versions/v2025.11/BREAKING_CHANGES.md`
- [ ] Create `_versions/v2025.11/RELEASE_NOTES.md`
- [ ] Update all strategic files (00-70 range) to new version format
- [ ] Remove duplicate footers from 7 files
- [ ] Update Hub file version

**Files:**
- `_process/documentation/VERSIONING_STRATEGY.md` (plan)
- `scripts/sync_versions.sh` (script ready)
- `VERSION` (currently: `2.0.0`)

**Next Step:** Execute Phase 1 of versioning strategy

---

### 2. Language Audit - Tone Down Grandiose Phrases ⏳
**Status:** TODO created, not started  
**Priority:** High  
**Estimated Effort:** 7-10 hours

**What needs to be done:**
- [ ] Search for grandiose phrases ("at scale", "combating climate change", etc.)
- [ ] Review each instance in context
- [ ] Replace with realistic, specific language
- [ ] Focus on 1-hectare pilot reality
- [ ] Update primary files:
  - `docs/vision-strategy/project-vision.md`
  - `docs/engagement/marketing-communications.md`
  - `docs/growth/expansion-strategy.md`
  - `docs/learning/case-studies.md`
  - `docs/resources/roadmap.md`

**Files:**
- `_vault_maintenance/tasks/TODO_LANGUAGE_AUDIT.md` (detailed instructions)

**Next Step:** Begin automated search, then manual review

---

## 🟡 Medium Priority Tasks

### 3. GitHub Milestones & Roadmap Integration ⏳
**Status:** Plan created, not implemented  
**Priority:** Medium  
**Estimated Effort:** 8-13 hours

**What needs to be done:**
- [ ] Create GitHub Milestones for next 3 months
- [ ] Create GitHub Issues for all features in wishlist
- [ ] Link issues to milestones
- [ ] Set up PR templates (✅ done)
- [ ] Create GitHub Actions workflows for automation
- [ ] Set up release automation
- [ ] Create roadmap sync script
- [ ] Test automation

**Files:**
- `_process/documentation/GITHUB_MILESTONES_ROADMAP_PLAN.md` (detailed plan)

**Next Step:** Start with Phase 1 (Initial Setup)

---

### 4. Document Length Management ⏳
**Status:** Persona created, not yet active  
**Priority:** Medium  
**Estimated Effort:** Ongoing

**What needs to be done:**
- [ ] Run initial scan for documents exceeding length thresholds
- [ ] Identify documents to split:
  - `00_Eco_Balance_Hub.md` (~900 lines)
  - `30_Business_Model.md` (~1,225 lines)
  - `20_Restoration_Methodology.md` (~1,072 lines)
  - `42_Adaptive_Timeline.md` (~780 lines)
  - `50_Risk_Assessment.md` (~1,251 lines)
  - `60_Marketing_Communications_Strategy.md` (~808 lines)
- [ ] Propose splitting strategies
- [ ] Execute document splits
- [ ] Update internal links

**Files:**
- `_vault_maintenance/personas/document_length_tracker.md` (persona definition)

**Next Step:** Run initial document length scan

---

### 5. Research Bookmarks Integration (Submodule) ⏳
**Status:** Feature request added, not implemented  
**Priority:** High (from wishlist)  
**Estimated Effort:** 10-14 hours

**What needs to be done:**
- [ ] Add research repository as git submodule
- [ ] Organize bookmarks by topic/category
- [ ] Create citation system linking documents to sources
- [ ] Update AI context to include research submodule
- [ ] Create index/navigation for research sources
- [ ] Add citations to key statistical claims

**Files:**
- `docs/resources/feature-wishlist.md` (feature description)
- `_process/documentation/FEATURE_WISHLIST.md` (feature description)

**Next Step:** Get access to research repository, then add as submodule

---

## 📋 Completed Recently ✅

- ✅ Public Documentation Website deployed to GitHub Pages
- ✅ Deployment automation with GitHub Actions
- ✅ Post-deployment verification tests
- ✅ Automatic rollback mechanism
- ✅ Branch protection and workflow enforcement
- ✅ CONTRIBUTING.md and PR templates
- ✅ Git hooks to prevent pushing to main

---

## 🎯 Recommended Order

1. **Versioning Strategy** (2-4 hours) - Foundation for everything else
2. **Language Audit** (7-10 hours) - High priority, improves credibility
3. **GitHub Milestones** (8-13 hours) - Better project management
4. **Document Length** (Ongoing) - Can be done incrementally
5. **Research Bookmarks** (10-14 hours) - Depends on repository access

---

## 📝 Notes

- Versioning strategy should be done first as it affects all documents
- Language audit can be done in parallel with other tasks
- GitHub Milestones can be set up incrementally
- Document length management is ongoing maintenance
- Research bookmarks need repository access first

---

**Next Action:** Decide which task to tackle first, or work on multiple in parallel.

