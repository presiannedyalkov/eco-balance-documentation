---
id: feature-wishlist
title: Feature Wishlist
sidebar_position: 3
---

# Feature Wishlist

**Purpose:** Track desired features and enhancements without concrete timelines
**Status:** Living document - priorities may shift based on project needs
**Last Updated:** November 2025 (v1.3.0)

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
- ✅ Site deployed and live at: https://presiannedyalkov.github.io/eco-balance-documentation/
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

## 🤖 AI & Automation

### Research Bookmarks Integration (Submodule)
**Status:** Planned
**Priority:** High
**Related:** Knowledge Integration, Source Citations

**Description:**
Integrate the 400+ research bookmarks from the separate research vault repository into this documentation repository as a git submodule. This will make research sources available both in the public documentation (as citations) and to AI assistants as a knowledge source.

**Current Situation:**
- Research bookmarks exist in separate vault/repository
- 400+ carefully curated bookmarks mentioned in documentation
- Not currently accessible in this repository
- Cannot be used for citations or AI context

**Key Features:**
- **Git Submodule Integration:** Add research vault as submodule to `_research/` or `_sources/` directory
- **Documentation Integration:** Research sources visible in documentation for citation
- **AI Context Access:** Research bookmarks available to AI assistants as knowledge source
- **Citation System:** Link strategic documents to relevant research sources
- **Search & Discovery:** Enable searching research sources from documentation

**Technical Implementation:**
- Add research repository as git submodule
- Organize bookmarks by topic/category
- Create citation system linking documents to sources
- Update AI context to include research submodule
- Create index/navigation for research sources

**Directory Structure:**
```
_references/
├── bookmarks/          # Submodule: research vault
│   ├── restoration/
│   ├── biodiversity/
│   ├── soil-health/
│   └── ...
├── citations/          # Citation index
└── README.md          # Research integration guide
```

**Benefits:**
- **Credibility:** Sources available for verification
- **Evidence Base:** Strategic claims backed by research
- **AI Enhancement:** AI can reference actual research when answering questions
- **Knowledge Integration:** Research becomes part of documentation ecosystem
- **Transparency:** Stakeholders can verify claims

**Use Cases:**
- Adding citations to statistical claims in strategic documents
- AI assistant referencing research when answering questions
- Stakeholders verifying claims by checking sources
- Research synthesis into strategic recommendations

**Dependencies:**
- Research vault repository (must exist and be accessible)
- Git submodule support
- Citation system design

**Estimated Effort:**
- Submodule setup: 1 hour
- Organization & indexing: 2-3 hours
- Citation system: 3-4 hours
- AI context integration: 2-3 hours
- Documentation updates: 2-3 hours
- Total: 10-14 hours

**Success Metrics:**
- Research submodule successfully integrated
- Sources accessible from documentation
- AI can reference research in responses
- Citations added to key statistical claims
- Research index/navigation functional

---

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
**Related:** Public Platform Plan (internal document)

**Description:**
Full implementation of the public platform with AI chatbot, inline commenting, community feedback system, and moderation pipeline as detailed in the Public Platform Plan.

**See:** Public Platform Plan (internal document in repository: `_process/planning/PUBLIC_PLATFORM_PLAN.md`) for complete specification

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
- [Roadmap](/resources/roadmap) - Phased project timeline
- Public Platform Plan (internal document - see repository: `_process/planning/PUBLIC_PLATFORM_PLAN.md`) - Detailed platform specification
- [Project Hub](/) - Project hub and navigation

---

**Version History:**
- v1.3.0 (November 2025): Updated Public Documentation Website status to "In Development" - deployment workflow created
- v1.2.0 (November 10, 2025): Added Documentation Export Formats (EPUB & PDF) feature
- v1.1.0 (November 10, 2025): Added Team Role AI Personas feature
- v1.0.0 (November 10, 2025): Initial wishlist created with Docusaurus documentation site as first feature
