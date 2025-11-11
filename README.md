# 🌍 Eco Balance Documentation

**Ecosystem restoration project documentation - Creating habitat for wildlife through biodiversity restoration**

---

## 📖 About This Repository

This repository contains the complete documentation for the **Eco Balance** project - an initiative to restore degraded ecosystems in Europe through evidence-based, community-engaged, financially sustainable environmental restoration.

### Project Vision

Create a **habitat for wildlife** and **restore land to become a shelter and sanctuary for wildlife**. Through different trees, plants, mushrooms, and diverse areas, we promote different habitats and increase biodiversity. This is our primary purpose - to provide sanctuary and shelter for wildlife in the face of climate change and mass extinction.

**Current Status:** Exploration Phase - We're exploring pathways forward, no commitments made yet.

---

## 🚀 Quick Start

### Viewing the Documentation

**Option 1: View Online (if deployed)**
- Check if a documentation site is deployed (link will be added when available)

**Option 2: Run Locally**

```bash
# Install dependencies
npm install

# Start development server
npm start

# Or with custom port
npm run start:local
```

The documentation will be available at `http://localhost:3023`

### Building for Production

```bash
# Build static site
npm run build

# Serve built site
npm run serve
```

---

## 📚 Documentation Structure

### Core Sections

- **[Project Hub](/docs/intro)** - Main entry point and overview
- **[Vision & Strategy](/docs/vision-strategy/executive-summary)** - What we want to achieve and why
- **[Current Status](/docs/vision-strategy/current-status)** - Honest assessment of where we are now
- **[Business & Finance](/docs/business/business-model)** - Financial considerations and funding options
- **[Operations](/docs/operations/restoration-methodology)** - Restoration methodology and approaches
- **[Growth & Planning](/docs/growth/adaptive-timeline)** - Timeline and expansion considerations
- **[Organization](/docs/organization/organizational-structure)** - Legal structure and team considerations

### Key Documents

- **[Roadmap](/docs/resources/roadmap)** - Project phases and current questions
- **[Financial Projections](/docs/business/financial-projections)** - Cost and revenue considerations
- **[Funding Strategy](/docs/business/funding-strategy)** - Funding pathways to explore
- **[Site Selection](/docs/growth/site-selection)** - Location and land acquisition options

---

## 🎯 Understanding the Documentation

### Vision, Plans, and Reality

This documentation distinguishes between three types of content:

**Vision (Ours):**
- Our values, goals, and what we want to achieve
- The "why" behind this project
- Immutable core purpose: creating habitat for wildlife

**Plans (Created Together):**
- AI-assisted templates and frameworks based on best practices
- We customize these templates with our own data, decisions, and circumstances
- Plans are starting points, not fixed commitments
- They evolve as we learn and clarify our path forward

**Reality (Gathered by Us):**
- Actual current state: where we are, what we have, what we've done
- Our data: location, jobs, skills, constraints, opportunities
- Represented in documentation to keep plans grounded in reality

---

## 👥 Current Situation

**Who we are:**
- Living in Cologne, Germany
- Both working normal jobs (web developer + PhD biologist at NGO)
- Both vegan, animal rights advocates
- Want to deploy our skills, time, and resources for meaningful climate action

**What exists now:**
- ✅ Clear vision and values
- ✅ Research foundation (400+ bookmarks)
- ✅ Planning framework documented
- ✅ Skills: Web development, biology, NGO experience
- ❌ No funding secured
- ❌ No land identified or acquired
- ❌ No legal entity formed
- ❌ No public presence

**Phase:** Exploring pathways forward. No commitments made yet.

---

## 📝 Documentation Attribution & Disclaimer

### Contributors

This documentation is a collaborative effort:
- **Human Contributors:** The project founders - providing vision, values, real data, decisions, and review
- **AI Contributors:** Various AI assistants and platforms - providing templates, frameworks, structure, and questions to explore

The content represents a collaboration between human vision and AI-assisted organization and structuring.

### Important Disclaimer

**AI-Generated Content Notice:**

This documentation heavily relies on AI-generated text and frameworks. Like any human-generated content, it may contain:
- Errors or inaccuracies
- Misconceptions or outdated information
- Biases or incomplete perspectives
- Areas that need clarification or correction

**We acknowledge that:**
- AI-generated content is a tool, not a source of truth
- All information should be verified and validated
- Plans and frameworks are starting points, not final answers
- Real-world application may reveal gaps or needed adjustments

**We value your feedback:**
- We welcome corrections for any errors you find
- We appreciate different viewpoints and perspectives
- We encourage constructive criticism and suggestions
- We recognize that diverse opinions strengthen the project

If you notice errors, have different perspectives, or want to contribute feedback, please reach out. This documentation is a living document that improves through collaboration and real-world application.

---

## 📂 Documentation Structure

### Two Documentation Locations

This repository contains documentation in two locations:

1. **Root Directory** (`00_Eco_Balance_Hub.md`, `strategic/` folder)
   - Original source files with Obsidian-style links
   - Strategic documents in `strategic/` folder
   - Restoration playbook in `strategic/restoration_playbook/`
   - May be used with Obsidian or other markdown tools

2. **`docs/` Directory** (Docusaurus site)
   - Organized in subdirectories for the public website
   - Uses standard markdown links
   - Contains synced content from root files
   - **This is the source for the Docusaurus website**

**⚠️ Important:** 
- **Root files are the source of truth** - Edit files in root or `strategic/` folder
- **`docs/` files are synced** - Run `node scripts/sync-docs.js` after editing root files
- **Restoration playbook** is synced from `strategic/restoration_playbook/` to `docs/restoration-playbook/`

See [DOCUMENTATION_STRUCTURE.md](_process/documentation/DOCUMENTATION_STRUCTURE.md) for details on the sync process.

---

## 🛠️ Technical Details

### Built With

- **[Docusaurus](https://docusaurus.io/)** - Documentation framework
- **Markdown** - Content format
- **React** - UI components

### Project Structure

```
eco-balance-documentation/
├── docs/                    # Documentation content
│   ├── vision-strategy/     # Vision and strategy documents
│   ├── organization/         # Organizational structure
│   ├── operations/          # Restoration methodology
│   ├── business/            # Financial and business models
│   ├── growth/              # Expansion and planning
│   ├── performance/         # KPIs and risk assessment
│   ├── engagement/         # Marketing and communications
│   ├── learning/           # Case studies and examples
│   └── resources/          # Roadmap, guides, wishlist
├── website/                # Docusaurus configuration
├── scripts/                # Build and test scripts
└── package.json           # Dependencies and scripts
```

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run serve` - Serve built site
- `node scripts/sync-docs.js` - Sync root files to `docs/` directory
- `npm test` - Run tests (link checking, build validation)
- `npm run test:links` - Check all internal links
- `npm run test:build` - Validate build

### Documentation Workflow

1. **Edit root files** (source of truth) - Files in `strategic/` folder or root
2. **Run sync** - `node scripts/sync-docs.js` to convert and update `docs/` files
3. **Build site** - `npm run build` to generate the Docusaurus site
4. **Test** - `npm test` to verify links and build

The sync script automatically:
- Converts Obsidian-style links (`[[...]]`) to Docusaurus links
- Adds appropriate frontmatter (id, title, sidebar_position)
- Preserves all content

---

## 📋 Navigation Guide

### For New Readers

1. Start with **[Project Hub](/docs/intro)** - Overview and navigation
2. Read **[Executive Summary](/docs/vision-strategy/executive-summary)** - Vision and mission
3. Check **[Current Status](/docs/vision-strategy/current-status)** - Where we are now
4. Explore **[Roadmap](/docs/resources/roadmap)** - Project phases and questions

### For Potential Funders

1. **[Executive Summary](/docs/vision-strategy/executive-summary)** - Investment overview
2. **[Business Model](/docs/business/business-model)** - Revenue and sustainability
3. **[Financial Projections](/docs/business/financial-projections)** - Cost considerations
4. **[Funding Strategy](/docs/business/funding-strategy)** - Funding pathways

### For Potential Team Members

1. **[Current Status](/docs/vision-strategy/current-status)** - Where we are
2. **[Team Roles](/docs/organization/team-roles)** - Team structure and capacity
3. **[Operations Plan](/docs/growth/operations-action-plan)** - What we'll do
4. **[Roadmap](/docs/resources/roadmap)** - Project phases

### For Research Partners

1. **[Restoration Methodology](/docs/operations/restoration-methodology)** - Our approach
2. **[Technology Integration](/docs/operations/technology-integration)** - Innovation integration
3. **[Case Studies](/docs/learning/case-studies)** - Real-world examples
4. **[KPIs](/docs/performance/kpis)** - Success measurement

---

## 🤝 Contributing

We welcome feedback, corrections, and different perspectives. This is a living document that improves through collaboration.

**How to contribute:**
- Report errors or inaccuracies
- Suggest improvements or clarifications
- Share different viewpoints
- Provide constructive criticism

Please note that this documentation is primarily maintained by the project founders with AI assistance. Contributions are reviewed and integrated based on alignment with project goals and accuracy.

---

## 📄 License

[Add license information if applicable]

---

## 🔗 Links

- **Project Documentation:** [View on GitHub Pages](https://presiannedyalkov.github.io/eco-balance-documentation/) (when deployed)
- **Repository:** [GitHub Repository](https://github.com/presiannedyalkov/eco-balance-documentation)
- **Restoration Playbook:** [Restoration Playbook Template](/restoration-playbook/README) - Template for ecological restoration projects

---

## 📅 Last Updated

**November 2025** - Documentation version 2.0.0

**Status:** Exploration Phase - Actively exploring pathways forward

---

**Note:** This documentation is a working framework to help explore, organize, and make decisions. It does NOT contain concrete plans with specific dates, week numbers, or cost breakdowns - those can only be created together as we clarify our path forward.

