# Feature Wishlist

**Purpose:** Track desired features and enhancements without concrete timelines
**Status:** Living document - priorities may shift based on project needs
**Last Updated:** 2025.11 (2025.11.13 19:12)

---

## 📝 Documentation & Content

### Public Documentation Website (GitHub Pages)
**Status:** ✅ Completed
**Priority:** High
**Related:** Phase 3 (Public Platform)
**Completed:** November 12, 2025

**Description:**
Transform the documentation repository into a public-facing website using Docusaurus and GitHub Pages. This serves as a foundational step toward the full interactive platform described in Phase 3.

**Goals:**
- Make all strategic documentation publicly accessible online
- Provide professional, searchable documentation experience
- Enable automatic deployment on every repository update
- Exclude internal/maintenance files from public view
- Future-proof for interactive features (AI chatbot, commenting)

**Key Features:**
- React-based static site generation (Docusaurus)
- Clean navigation organized by content categories
- Full-text search across all documentation
- Mobile-responsive design
- Auto-deployment via GitHub Actions
- Version control integration

**Content Organization:**
- **Vision & Strategy**: Executive Summary, Project Vision, Success Factors
- **Organization**: Structure, Governance, Team Roles, Legal Framework
- **Operations**: Restoration Methodology, Technology, Challenges & Solutions
- **Business**: Business Model, Financial Projections, Funding Strategy
- **Growth**: Expansion Strategy, Site Selection, Timeline, Action Plan
- **Performance**: Risk Assessment, KPIs
- **Engagement**: Marketing & Communications Strategy
- **Learning**: Case Studies & Restoration Examples
- **Resources**: Quick Reference Guide, Roadmap

**Exclusions:**
- `_vault_maintenance/` - Internal quality control and audits
- `_process/` - Internal workflows and planning
- `_templates/` - Document templates
- `_versions/` - Historical snapshots
- `archive/` - Deprecated content
- `implementation_tasks/` - Detailed task guides (may be included later)
- `ai_skills/` - AI assistant framework (may be included later)

**Technical Stack:**
- **Framework:** Docusaurus (React-based)
- **Hosting:** GitHub Pages
- **Deployment:** GitHub Actions (auto-deploy on push to main)
- **Domain:** Default GitHub Pages URL initially (can add custom domain later)

**Benefits:**
- **Transparency:** Public access to project strategy and methodology
- **Credibility:** Professional documentation site builds trust with stakeholders
- **Foundation:** Ready for Phase 3 interactive features (chatbot, commenting)
- **Accessibility:** Easy to find, read, and share information
- **Maintenance:** Auto-updates when documentation changes

**Future Enhancements** (Phase 3):
- AI chatbot widget for Q&A
- Inline commenting and feedback system
- Community authentication (SSO)
- Task tracking visibility
- Multi-language support
- Custom React components for interactive content

**Dependencies:**
- None (can be implemented immediately)

**Implementation Status:**
- ✅ Docusaurus framework installed and configured
- ✅ Content structure organized in `docs/` directory
- ✅ GitHub Actions workflow created (`.github/workflows/deploy.yml`)
- ✅ Docusaurus config updated with repository information
- ✅ GitHub Pages settings enabled and configured
- ✅ Site deployed and live at: https://docs.eco-balance.cc/
- ✅ Automatic deployment on every push to main
- ✅ Post-deployment verification tests with Playwright
- ✅ Automatic rollback mechanism if tests fail

**Estimated Effort:**
- Initial setup: 2-4 hours
- Content organization: 1-2 hours
- Customization (branding, styling): 2-4 hours
- Total: 5-10 hours for MVP

**Success Metrics:**
- Documentation site live and accessible
- All main documentation files (00-70 series) rendered correctly
- Search functionality working
- Auto-deployment functioning on git push
- Mobile-responsive display
- Positive feedback from initial visitors

---

### Documentation Export Formats (EPUB & PDF)
**Status:** Planned
**Priority:** Medium
**Related:** Public Documentation Website

**Description:**
Enable exporting the entire documentation repository into portable formats for offline reading and distribution. Support EPUB format for Kindle and e-reader devices, and PDF format for universal document sharing and printing.

**Key Features:**
- **EPUB Export**: Export all documentation into a single EPUB file compatible with Kindle and other e-readers
- **PDF Export**: Export all documentation into a single PDF file for printing, sharing, and archival
- **Content Selection**: Option to include/exclude specific sections (e.g., exclude internal maintenance files)
- **Automatic Table of Contents**: Generate navigation structure based on document hierarchy
- **Formatting Preservation**: Maintain headings, lists, links, and basic formatting in exported formats
- **Metadata**: Include project information, version, and export date in exported files

**Export Options:**
- **Full Export**: All public documentation (00-70 series, main content)
- **Custom Export**: Select specific documents or sections to include
- **Exclusions**: Automatically exclude internal files (`_vault_maintenance/`, `_process/`, etc.)

**Technical Implementation:**
- **EPUB Generation**: Use markdown-to-epub conversion tools (e.g., Pandoc, mdbook-epub)
- **PDF Generation**: Use markdown-to-pdf conversion tools (e.g., Pandoc, mdbook-pdf, or headless browser rendering)
- **Automation**: GitHub Actions workflow to generate exports on documentation updates
- **Manual Trigger**: Script or command to generate exports on-demand

**Benefits:**
- **Offline Access**: Read documentation without internet connection
- **E-Reader Compatibility**: Read on Kindle, Kobo, and other e-reader devices
- **Print-Friendly**: PDF format for physical printing and archival
- **Distribution**: Easy sharing of complete documentation as single files
- **Accessibility**: Alternative format for users who prefer offline or e-reader access
- **Portability**: Single file contains entire documentation set

**Use Cases:**
- Reading documentation on e-reader during travel
- Printing documentation for physical reference
- Sharing complete documentation with stakeholders who prefer offline formats
- Archiving documentation in standard formats
- Distributing documentation to team members without internet access

**Dependencies:**
- Documentation structure and markdown files
- Conversion tools (Pandoc, mdbook, or similar)
- Optional: GitHub Actions for automated generation

**Estimated Effort:**
- EPUB export setup: 2-3 hours
- PDF export setup: 2-3 hours
- Automation (GitHub Actions): 1-2 hours
- Testing and refinement: 1-2 hours
- Total: 6-10 hours

**Success Metrics:**
- EPUB file generates successfully with all documentation
- PDF file generates successfully with all documentation
- Exported files open correctly in target applications (Kindle, PDF readers)
- Table of contents and navigation work in exported formats
- Formatting is preserved and readable
- Export process can be automated or run on-demand

---

### GitHub Milestones & Roadmap Integration
**Status:** Planned
**Priority:** High
**Related:** Roadmap, Versioning Strategy, Project Management

**Description:**
Integrate GitHub Milestones, Issues, and Releases with the project roadmap and versioning system to create a visual, timeline-based roadmap that tracks feature progress, links branches to milestones, and automates release management.

**Goals:**
- Create visual roadmap using GitHub Milestones
- Link all feature branches and PRs to milestones
- Integrate GitHub Releases with Calendar Versioning (YYYY.MM)
- Track completion of features and milestones automatically
- Keep roadmap documentation in sync with GitHub milestones

**Key Features:**
- **GitHub Milestones**: Organized by month/quarter (e.g., `2025.12 - Versioning System`, `2026.Q1 - Interactive Features`)
- **Issue Tracking**: All features from wishlist converted to GitHub Issues linked to milestones
- **Branch Integration**: Feature branches named with milestone (e.g., `feature/2025.12-versioning-system`)
- **PR Templates**: Automatic linking of PRs to milestones and issues
- **Release Management**: Monthly GitHub Releases integrated with Calendar Versioning
- **Automated Sync**: Roadmap documentation automatically synced from GitHub API
- **Progress Tracking**: Milestone completion percentages calculated automatically
- **Release Notes**: Auto-generated from closed issues and merged PRs

**Milestone Structure:**
- **Monthly Milestones**: `YYYY.MM - Description` (e.g., `2025.12 - Versioning System`)
- **Quarterly Milestones**: `YYYY.Q# - Description` (e.g., `2026.Q1 - Interactive Features`)
- **Annual Milestones**: `YYYY - Description` (e.g., `2026 - Platform Maturity`)

**Technical Implementation:**
- GitHub Milestones created and organized by timeline
- GitHub Issues created for each feature in wishlist
- PR templates with milestone linking
- GitHub Actions workflows for:
  - Auto-linking PRs to milestones
  - Milestone progress tracking
  - Automated release creation
  - Roadmap documentation sync
- Scripts for:
  - Generating release notes from GitHub API
  - Syncing roadmap from GitHub milestones
  - Version synchronization

**Workflow Integration:**
1. **Planning**: Create GitHub Issue from feature wishlist → Assign to milestone
2. **Development**: Create branch `feature/YYYY.MM-feature-name` → Link to issue
3. **Review**: Create PR with template → Auto-links to milestone
4. **Release**: End of month → Auto-create release → Update roadmap

**Benefits:**
- **Visual Progress**: See roadmap progress at a glance in GitHub
- **Clear Timeline**: Milestones provide concrete deadlines and timeline
- **Automatic Tracking**: Progress calculated automatically from closed issues
- **Integrated Workflow**: Branches, PRs, issues, and releases all connected
- **Documentation Sync**: Roadmap docs stay current with GitHub status
- **Release Management**: Monthly releases with auto-generated notes
- **Version Alignment**: GitHub Releases match Calendar Versioning system

**Use Cases:**
- Planning features for upcoming months/quarters
- Tracking progress on multiple features simultaneously
- Generating release notes automatically
- Keeping stakeholders informed of roadmap status
- Managing feature dependencies and priorities
- Creating visual roadmap for presentations

**Dependencies:**
- GitHub repository with Issues and Milestones enabled
- GitHub Actions for automation
- GitHub API access (via token)
- Calendar Versioning system (YYYY.MM)
- Roadmap documentation structure

**Estimated Effort:**
- Initial setup (milestones, issues): 1-2 hours
- Branch & PR integration: Ongoing (setup: 1 hour)
- Release management automation: 1-2 hours
- Roadmap sync automation: 2-3 hours
- GitHub Actions workflows: 2-3 hours
- Testing and refinement: 1-2 hours
- Total: 8-13 hours for full implementation

**Success Metrics:**
- All features have GitHub Issues
- All issues linked to milestones
- Milestone progress automatically calculated
- Roadmap documentation stays in sync with GitHub
- Monthly releases created automatically
- Release notes generated from closed issues
- Version tags match VERSION file
- All documentation versioned consistently

**Implementation Plan:**
See detailed plan: `_process/documentation/GITHUB_MILESTONES_ROADMAP_PLAN.md`

---

## 🤖 AI & Automation

### AI Skills Framework Implementation
**Status:** In Development
**Priority:** Medium
**Related:** Phase 3 (Public Platform)

**Description:**
Complete the AI skills framework with all 7 specialized roles to prevent AI problems (timeouts, context loss, focus drift, inconsistency) and enable systematic project execution.

**Roles to Implement:**
1. Project Coordinator - Overall project management
2. Documentation Curator - Maintain documentation quality (partially complete)
3. Research Analyst - Investigate questions and validate claims
4. Community Liaison - Interface with community via chatbot
5. Quality Auditor - Systematic quality checks
6. Task Manager - Manage task lifecycle
7. Moderator - Review community contributions

**Benefits:**
- Consistent AI behavior across sessions
- Clear scope boundaries prevent drift
- Systematic handoff between roles
- Quality standards enforcement
- Scalable project execution

---

### Team Role AI Personas
**Status:** Planned
**Priority:** Medium
**Related:** 12_Team_Roles.md, Maintenance Personas Framework

**Description:**
Create AI personas for active team member roles (similar to maintenance personas like CURATOR and AUDITOR) that can perform tasks and write tasks from each role's perspective. These personas help actual people in these roles by providing AI assistance with tasks, research, and organization, while ensuring the AI asks questions based on researched options rather than making assumptions.

**Key Features:**
- **Role-Specific Personas**: AI personas for active team roles (e.g., Project Manager, Restoration Ecologist, Fundraising Coordinator, Communications Lead)
- **Task Execution**: AI can perform tasks from each role's perspective, understanding their priorities, constraints, and decision-making context
- **Task Generation**: AI can write tasks from each role's perspective, ensuring tasks are framed appropriately for the person who will execute them
- **Research-Based Questioning**: AI personas research options and present questions to humans rather than assuming how something should work
- **Human-Centric Design**: These personas support actual people in these roles - AI assists with complex tasks but requires human decision-making for critical choices

**Persona Structure** (similar to maintenance personas):
- Identity and role definition
- Core responsibilities from that role's perspective
- Task execution guidelines
- Task generation guidelines
- Research and question-asking protocols
- Interaction patterns with other roles

**Benefits:**
- **Support for Team Members**: Helps actual people in these roles by providing AI assistance tailored to their specific needs
- **Context-Aware Task Management**: Tasks are written and executed from the appropriate role's perspective
- **Informed Decision-Making**: AI researches options and presents questions rather than making assumptions
- **Consistency**: Similar structure to maintenance personas ensures familiarity and systematic approach
- **Scalability**: As team grows, new role personas can be added following the same framework

**Implementation Approach:**
1. Expand team roles documentation (12_Team_Roles.md) with detailed role descriptions
2. Create persona files for each active team role (similar to `_vault_maintenance/personas/curator.md`)
3. Define task execution and generation guidelines for each role
4. Establish research and question-asking protocols that prevent assumption-making
5. Document interaction patterns between team role personas and maintenance personas

**Key Principle:**
These personas are tools to help real people in these roles. AI can assist with many tasks, research, and organization, but should not make assumptions about how something should work. Instead, AI should research options and ask questions based on that research, enabling informed human decision-making.

**Related Documents:**
- `12_Team_Roles.md` - Team structure and roles
- `_vault_maintenance/personas/` - Maintenance persona examples
- `_vault_maintenance/stakeholders/stakeholder_personas.md` - Stakeholder persona reference

---

## 🌐 Platform & Community

### Interactive Community Platform
**Status:** Planned
**Priority:** High (Phase 3)
**Related:** PUBLIC_PLATFORM_PLAN.md

**Description:**
Full implementation of the public platform with AI chatbot, inline commenting, community feedback system, and moderation pipeline as detailed in the Public Platform Plan.

**See:** `_process/planning/PUBLIC_PLATFORM_PLAN.md` for complete specification

---

## 📊 Data & Monitoring

### Ecological Monitoring Dashboard
**Status:** Future
**Priority:** Medium
**Related:** Phase 2 (Proof of Concept)

**Description:**
Public dashboard showing real-time ecological monitoring data from restoration sites.

**Features:**
- Soil health metrics over time
- Biodiversity indicators
- Water quality measurements
- Carbon sequestration estimates
- Photo documentation timeline
- Weather and climate data

**Benefits:**
- Transparency in restoration progress
- Scientific validation of methodology
- Engaging visual storytelling
- Data for research and analysis

---

## 🎓 Education & Training

### Restoration Training Portal
**Status:** Future
**Priority:** Low
**Related:** Phase 5 (Replication & Network)

**Description:**
Online training platform for practitioners wanting to replicate the Eco Balance methodology.

**Features:**
- Step-by-step implementation guides
- Video tutorials and demonstrations
- Certification program
- Community forum for practitioners
- Resource library
- Regional adaptation guidance

**Benefits:**
- Enable replication across regions
- Build network of practitioners
- Standardize quality
- Generate potential revenue stream

---

## 💰 Funding & Partnerships

### Integrated Crowdfunding Platform
**Status:** Future
**Priority:** Medium
**Related:** Phase 1 (Bootstrap Launch)

**Description:**
Embedded crowdfunding functionality within the documentation site, allowing visitors to contribute directly.

**Features:**
- Campaign management
- Donor profiles and recognition
- Impact tracking per donation
- Recurring donation options
- Integration with payment processors
- Transparent fund allocation

**Benefits:**
- Reduce third-party platform fees
- Direct relationship with supporters
- Flexible campaign structures
- Integration with project updates

---

## 🔧 Technical Enhancements

### API for External Integrations
**Status:** Future
**Priority:** Low
**Related:** Phase 4+ (Scaling)

**Description:**
Public API allowing external applications to access project data, documentation, and status.

**Use Cases:**
- Mobile applications
- Research integrations
- Partner dashboards
- Data analysis tools
- Third-party visualizations

---

## 📱 Mobile Experience

### Progressive Web App (PWA)
**Status:** Future
**Priority:** Low
**Related:** Phase 3+ (Public Platform)

**Description:**
Convert documentation site to Progressive Web App for offline access and mobile app-like experience.

**Features:**
- Offline reading capability
- Push notifications for updates
- Home screen installation
- Fast loading on mobile networks
- Native app feel

---

## 🌍 Internationalization

### Multi-Language Documentation
**Status:** Future
**Priority:** Medium
**Related:** Phase 3+ (Public Platform)

**Description:**
Translate documentation into multiple languages to expand reach across Southern Europe and globally.

**Target Languages:**
- Spanish (priority: Spain operations)
- Portuguese (priority: Portugal operations)
- French (priority: France operations)
- German (project team language)
- Catalan (regional relevance)
- Italian (regional relevance)

**Implementation:**
- AI-assisted translation with human review
- Native speaker validation
- Maintenance strategy for updates
- Language switching UI

---

## 🎮 Engagement & Gamification

### Contributor Recognition System
**Status:** Future
**Priority:** Low
**Related:** Phase 3+ (Public Platform)

**Description:**
Gamified contribution tracking with badges, leaderboards, and recognition for community members.

**Features:**
- Contribution badges and achievements
- Public leaderboard
- Reputation scores
- Community moderator pathway
- Annual contributor report
- Physical rewards for top contributors

---

## 📈 Analytics & Insights

### Public Impact Dashboard
**Status:** Future
**Priority:** Medium
**Related:** Phase 2+ (Proof of Concept)

**Description:**
Real-time public dashboard showing project impact metrics and progress toward goals.

**Metrics:**
- Hectares under restoration
- Carbon sequestered (estimated)
- Biodiversity indicators
- Community size and engagement
- Funds raised and allocated
- Research publications
- Partner organizations
- Replication sites

---

## Wishlist Maintenance

**How to Use This Document:**
- Add new feature ideas as they emerge
- Update status as features are implemented
- Adjust priorities based on project needs
- Link to detailed planning docs when created

**Statuses:**
- **Planned:** Defined and ready for implementation
- **In Development:** Actively being worked on
- **Future:** Desired but not yet scheduled
- **Completed:** Implemented and live
- **Deferred:** Not proceeding at this time

**Priorities:**
- **High:** Core functionality, high impact
- **Medium:** Valuable enhancement, moderate impact
- **Low:** Nice to have, lower impact

---

**Related Documents:**
- [ROADMAP.md](ROADMAP.md) - Phased project timeline
- [PUBLIC_PLATFORM_PLAN.md](_process/planning/PUBLIC_PLATFORM_PLAN.md) - Detailed platform specification
- [00_Eco_Balance_Hub.md](00_Eco_Balance_Hub.md) - Project hub and navigation

---

**Version History:**
- 2025.11 (2025.11.13 19:12): Added Research Bookmarks Integration, Visual Enhancements for Documents, and Timeline & Milestone Visualization features
- 2025.11 (2025.11.12 14:30): Updated Public Documentation Website status to "In Development" - deployment workflow created
- 2025.11 (2025.11.10 10:00): Added Documentation Export Formats (EPUB & PDF) feature
- 2025.11 (2025.11.10 09:00): Added Team Role AI Personas feature
- 2025.11 (2025.11.10 08:00): Initial wishlist created with Docusaurus documentation site as first feature
