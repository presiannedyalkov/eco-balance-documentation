# Documentation Site Implementation Plan

**Status:** Planning  
**Created:** 2025-11-11  
**Related:** [FEATURE_WISHLIST.md](../../FEATURE_WISHLIST.md#public-documentation-website-github-pages)

---

## Overview

This plan outlines the implementation of a public-facing documentation website using Docusaurus and GitHub Pages, transforming the Eco Balance documentation repository into a professional, searchable, and accessible online resource.

---

## Implementation Strategy

### Phase 1: Docusaurus Setup & Configuration

#### 1.1 Project Structure
```
eco-balance-documentation/
├── docs/                    # Docusaurus docs directory
│   ├── vision-strategy/    # 01-04 series
│   ├── organization/       # 10-13 series
│   ├── operations/         # 20-22 series
│   ├── business/           # 30-32 series
│   ├── growth/             # 40-44 series
│   ├── performance/        # 50-51 series
│   ├── engagement/         # 60 series
│   ├── learning/           # 70 series
│   └── resources/          # Quick Reference, Roadmap
├── website/                 # Docusaurus website config
│   ├── src/
│   │   ├── components/     # Custom React components
│   │   ├── css/            # Custom styles
│   │   └── pages/          # Custom pages (home, etc.)
│   └── static/             # Static assets
├── docusaurus.config.js    # Main Docusaurus config
├── package.json            # Dependencies
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions deployment
└── .gitignore              # Updated to exclude build artifacts
```

#### 1.2 Content Organization

**Navigation Structure:**
- **Vision & Strategy** (01-04)
  - Executive Summary
  - Project Vision
  - Success Factors
  - Current Status Assessment

- **Organization** (10-13)
  - Organizational Structure
  - Governance
  - Team Roles
  - Legal Framework

- **Operations** (20-22)
  - Restoration Methodology
  - Technology Integration
  - Challenges & Solutions

- **Business** (30-32)
  - Business Model
  - Financial Projections
  - Funding Strategy

- **Growth** (40-44)
  - Expansion Strategy
  - Site Selection
  - Adaptive Timeline
  - Operations Action Plan
  - Tiny House & Infrastructure

- **Performance** (50-51)
  - Risk Assessment
  - Key Performance Indicators

- **Engagement** (60)
  - Marketing & Communications Strategy

- **Learning** (70)
  - Case Studies & Restoration Examples

- **Resources**
  - Quick Reference Guide
  - Roadmap
  - Feature Wishlist

#### 1.3 Content Exclusions

The following directories will be excluded from the public site:
- `_vault_maintenance/` - Internal quality control
- `_process/` - Internal workflows (except this planning doc)
- `_templates/` - Document templates
- `_versions/` - Historical snapshots
- `archive/` - Deprecated content
- `implementation_tasks/` - May be included later
- `ai_skills/` - May be included later

**Implementation:** Files in these directories will not be copied to the `docs/` directory.

---

### Phase 2: Docusaurus Configuration

#### 2.1 Core Configuration (`docusaurus.config.js`)

**Key Settings:**
- **Title:** "Eco Balance Documentation"
- **Tagline:** "Ecological Restoration for Wildlife Habitat and Biodiversity"
- **URL:** `https://[username].github.io` (or custom domain later)
- **Base URL:** `/eco-balance-documentation/` (if using project pages) or `/` (if using user/organization pages)
- **Organization:** GitHub username/organization
- **Project Name:** "eco-balance-documentation"
- **Theme:** Default Docusaurus theme with customizations
- **Search:** Algolia DocSearch (free tier) or local search

#### 2.2 Navigation & Sidebar

**Sidebar Configuration:**
- Auto-generated from directory structure
- Custom ordering for strategic documents (01-70 series)
- Collapsible categories
- Breadcrumbs enabled

**Top Navigation:**
- Home
- Documentation (dropdown with categories)
- Resources
- GitHub (link to repository)

#### 2.3 Customization

**Branding:**
- Custom logo (if available)
- Color scheme aligned with Eco Balance branding
- Custom favicon

**Homepage:**
- Custom landing page highlighting:
  - Project vision
  - Quick navigation to key documents
  - Current version information
  - Link to GitHub repository

**Footer:**
- Copyright information
- Links to GitHub, roadmap, feature wishlist
- Version information

---

### Phase 3: Content Migration

#### 3.1 File Copying Strategy

**Process:**
1. Copy strategic documents (00-70 series) to appropriate `docs/` subdirectories
2. Rename files to remove numbering prefixes for cleaner URLs:
   - `01_Executive_Summary.md` → `executive-summary.md`
   - Keep numbering in frontmatter for ordering
3. Update internal links to use Docusaurus link format
4. Add frontmatter to each document:
   ```yaml
   ---
   id: executive-summary
   title: Executive Summary
   sidebar_position: 1
   ---
   ```

#### 3.2 Link Conversion

**Markdown Link Format:**
- Current: `[[01_Executive_Summary|Executive Summary]]`
- Docusaurus: `[Executive Summary](executive-summary)` or `[Executive Summary](/docs/vision-strategy/executive-summary)`

**Cross-References:**
- Convert all `[[...]]` style links to standard markdown links
- Update relative paths to work with Docusaurus routing

#### 3.3 Frontmatter Addition

Each document needs:
- `id`: URL-friendly identifier
- `title`: Display title
- `sidebar_position`: Order in sidebar
- Optional: `description`, `tags`, `last_update`

---

### Phase 4: GitHub Pages Deployment

#### 4.1 GitHub Actions Workflow

**Workflow File:** `.github/workflows/deploy.yml`

**Steps:**
1. Checkout repository
2. Setup Node.js
3. Install dependencies (`npm install`)
4. Build Docusaurus site (`npm run build`)
5. Deploy to GitHub Pages using `peaceiris/actions-gh-pages`

**Triggers:**
- Push to `main` branch
- Manual workflow dispatch

#### 4.2 GitHub Pages Settings

**Configuration:**
- Source: GitHub Actions
- Branch: `gh-pages` (auto-created)
- Path: `/` (root)

**Repository Settings:**
- Enable GitHub Pages
- Set source to GitHub Actions
- Configure custom domain (optional, future)

---

### Phase 5: Search & Features

#### 5.1 Search Implementation

**Option 1: Algolia DocSearch (Recommended)**
- Free for open-source projects
- Requires application to Algolia
- Automatic indexing
- Fast, full-text search

**Option 2: Local Search**
- Built into Docusaurus
- No external dependencies
- Works offline
- Slightly slower for large sites

**Decision:** Start with local search, migrate to Algolia if needed.

#### 5.2 Additional Features

**Versioning:**
- Future: Support multiple documentation versions
- Current: Single version (v2.0.0)

**Dark Mode:**
- Enabled by default in Docusaurus
- Custom theme colors for dark mode

**Mobile Responsiveness:**
- Built into Docusaurus
- Test on various devices

---

## Technical Details

### Dependencies

**Required Packages:**
```json
{
  "@docusaurus/core": "^3.0.0",
  "@docusaurus/preset-classic": "^3.0.0",
  "react": "^18.0.0",
  "react-dom": "^18.0.0"
}
```

**Dev Dependencies:**
- TypeScript (optional, for custom components)
- ESLint (optional)

### Build Process

1. **Development:**
   ```bash
   npm start
   ```
   - Starts local dev server
   - Hot reload on file changes
   - Access at `http://localhost:3000`

2. **Build:**
   ```bash
   npm run build
   ```
   - Generates static site in `build/` directory
   - Optimized for production

3. **Deploy:**
   - Automatic via GitHub Actions
   - Manual: Push to `gh-pages` branch

---

## Implementation Steps

### Step 1: Initialize Docusaurus
- Run `npx create-docusaurus@latest` or manual setup
- Configure basic settings
- Test local build

### Step 2: Organize Content Structure
- Create directory structure in `docs/`
- Copy and organize strategic documents
- Exclude internal directories

### Step 3: Configure Navigation
- Set up sidebar configuration
- Configure top navigation
- Test navigation flow

### Step 4: Customize Appearance
- Add branding (logo, colors)
- Customize homepage
- Configure footer
- Test responsive design

### Step 5: Fix Links & Frontmatter
- Convert all internal links
- Add frontmatter to all documents
- Verify all links work

### Step 6: Set Up Deployment
- Create GitHub Actions workflow
- Configure GitHub Pages
- Test deployment process

### Step 7: Testing & Refinement
- Test on multiple devices
- Verify search functionality
- Check all links
- Review content display

### Step 8: Launch
- Enable GitHub Pages
- Verify public access
- Update documentation with site URL
- Announce launch

---

## File Mapping

### Strategic Documents → Docusaurus Structure

| Original File | Docusaurus Location | Category |
|--------------|---------------------|----------|
| `00_Eco_Balance_Hub.md` | `docs/index.md` or custom homepage | Home |
| `01_Executive_Summary.md` | `docs/vision-strategy/executive-summary.md` | Vision & Strategy |
| `02_Project_Vision.md` | `docs/vision-strategy/project-vision.md` | Vision & Strategy |
| `03_Success_Factors.md` | `docs/vision-strategy/success-factors.md` | Vision & Strategy |
| `04_Current_Status_Assessment.md` | `docs/vision-strategy/current-status.md` | Vision & Strategy |
| `10_Organizational_Structure.md` | `docs/organization/organizational-structure.md` | Organization |
| `11_Governance.md` | `docs/organization/governance.md` | Organization |
| `12_Team_Roles.md` | `docs/organization/team-roles.md` | Organization |
| `13_Legal_Framework.md` | `docs/organization/legal-framework.md` | Organization |
| `20_Restoration_Methodology.md` | `docs/operations/restoration-methodology.md` | Operations |
| `21_Technology_Integration.md` | `docs/operations/technology-integration.md` | Operations |
| `22_Restoration_Challenges_Solutions.md` | `docs/operations/challenges-solutions.md` | Operations |
| `30_Business_Model.md` | `docs/business/business-model.md` | Business |
| `31_Financial_Projections.md` | `docs/business/financial-projections.md` | Business |
| `32_Funding_Strategy.md` | `docs/business/funding-strategy.md` | Business |
| `40_Expansion_Growth_Strategy.md` | `docs/growth/expansion-strategy.md` | Growth |
| `42_Adaptive_Timeline.md` | `docs/growth/adaptive-timeline.md` | Growth |
| `43_Operations_Action_Plan.md` | `docs/growth/operations-action-plan.md` | Growth |
| `44_Site_Selection_Land_Acquisition.md` | `docs/growth/site-selection.md` | Growth |
| `45_Tiny_House_and_Living_Infrastructure.md` | `docs/growth/tiny-house-infrastructure.md` | Growth |
| `50_Risk_Assessment.md` | `docs/performance/risk-assessment.md` | Performance |
| `51_Key_Performance_Indicators.md` | `docs/performance/kpis.md` | Performance |
| `60_Marketing_Communications_Strategy.md` | `docs/engagement/marketing-communications.md` | Engagement |
| `70_Case_Studies_Restoration_Examples.md` | `docs/learning/case-studies.md` | Learning |
| `QUICK_REFERENCE_GUIDE.md` | `docs/resources/quick-reference.md` | Resources |
| `ROADMAP.md` | `docs/resources/roadmap.md` | Resources |
| `FEATURE_WISHLIST.md` | `docs/resources/feature-wishlist.md` | Resources |

---

## Future Enhancements (Phase 3)

As mentioned in the feature wishlist, future enhancements include:
- AI chatbot widget for Q&A
- Inline commenting and feedback system
- Community authentication (SSO)
- Task tracking visibility
- Multi-language support
- Custom React components for interactive content

These will be added incrementally after the initial site is live and stable.

---

## Success Criteria

✅ Documentation site is live and publicly accessible  
✅ All strategic documents (00-70 series) are rendered correctly  
✅ Search functionality works across all content  
✅ Auto-deployment functions on git push to main  
✅ Site is mobile-responsive  
✅ All internal links work correctly  
✅ Navigation is intuitive and well-organized  
✅ Site loads quickly and performs well  

---

## Estimated Timeline

- **Initial Setup:** 1-2 hours
- **Content Organization:** 2-3 hours
- **Link Conversion & Frontmatter:** 2-3 hours
- **Customization:** 1-2 hours
- **Deployment Setup:** 1 hour
- **Testing & Refinement:** 1-2 hours
- **Total:** 8-13 hours

---

## Notes

- This plan focuses on MVP (Minimum Viable Product) - a functional, professional documentation site
- Future enhancements can be added incrementally
- The site structure is designed to be easily extensible
- All content remains in the repository; Docusaurus generates the site from source files
- The original markdown files are preserved; Docusaurus uses them as source

---

**Next Steps:** Review this plan, then proceed with implementation starting with Phase 1.

