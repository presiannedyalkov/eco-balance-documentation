# Release Notes - 2025.11

**Release Date:** November 12, 2025  
**Global Version:** 2025.11  
**Previous Version:** 2.0.0

---

## 🎉 What's New

### Versioning System Migration

This release marks the migration from Semantic Versioning (SemVer) to Calendar Versioning (CalVer) using the format `YYYY.MM`.

**Key Changes:**
- Global version format: `2.0.0` → `2025.11`
- Document version format: `Document Version: 2025.11 (YYYY.MM.DD HH:MM)`
- All strategic documents synchronized to new version format
- Version directory structure created: `_versions/v2025.11/`

### Documentation Platform Launch

- ✅ Public documentation website deployed to GitHub Pages
- ✅ Automatic deployment on every push to `main`
- ✅ Post-deployment verification tests with Playwright
- ✅ Automatic rollback mechanism if tests fail
- ✅ Site live at: https://docs.eco-balance.cc/

### Workflow Improvements

- ✅ Branch protection enabled (no direct pushes to `main`)
- ✅ PR templates and contribution guidelines
- ✅ Git hooks to prevent pushing to `main` locally
- ✅ GitHub Actions workflows for deployment and verification

---

## 📊 Statistics

- **Documents Updated:** All strategic files (00-70 range)
- **Version Format:** Migrated to Calendar Versioning
- **Breaking Changes:** Version format change (documented in BREAKING_CHANGES.md)

---

## 🔄 Migration Details

### Version Format Change

**Old Format:**
```
Document Version: 2.0.0
```

**New Format:**
```
Document Version: 2025.11 (2025.11.12 HH:MM)
```

Where:
- `2025.11` = Global version (November 2025)
- `2025.11.12 HH:MM` = Local subversion (file-specific update time)

### Files Affected

All strategic documentation files have been updated to the new version format:
- Core Strategy (01-04)
- Organization (10-13)
- Operations (20-22)
- Business (30-32)
- Growth (40-44)
- Performance (50-51)
- Engagement (60)
- Resources (70)

---

## 📝 Next Steps

- Continue with language audit (tone down grandiose phrases)
- Implement GitHub Milestones & Roadmap integration
- Begin document length management
- Plan research bookmarks integration

---

## 🔗 Related

- [Versioning Strategy](../_process/documentation/VERSIONING_STRATEGY.md)
- [Breaking Changes](BREAKING_CHANGES.md)
- [Version Journal](JOURNAL.md)

---

**Status:** Initial migration complete. All documents synchronized to 2025.11.

