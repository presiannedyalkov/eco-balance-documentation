# Research Bookmarks Integration Setup Guide

**Created:** November 13, 2025  
**Purpose:** Step-by-step guide to integrate research bookmarks as a git submodule  
**Status:** Ready to Execute (when repository access is available)

---

## Prerequisites

1. **Research Repository Access**: URL or access to the research bookmarks repository
2. **Git**: Ensure git is installed and configured
3. **Repository Write Access**: Ensure you can add submodules to this repository

---

## Quick Start

### Step 1: Add Research Repository as Submodule

```bash
# Navigate to project root
cd /home/presi/projects/eco-balance-documentation

# Add research repository as submodule
# Replace <research-repo-url> with actual repository URL
git submodule add <research-repo-url> research

# Initialize and update submodule
git submodule update --init --recursive
```

### Step 2: Organize Bookmarks by Topic/Category

```bash
# Create directory structure for organized bookmarks
mkdir -p research/bookmarks/{restoration,funding,legal,technology,community,case-studies}

# Or use existing organization if repository already has structure
```

### Step 3: Create Citation System

Create a citation reference file:

```bash
# Create citation index
touch research/CITATIONS.md
touch research/citation_index.json
```

### Step 4: Update AI Context

Add research submodule to AI context configuration (if applicable).

---

## Detailed Implementation

### 1. Adding the Submodule

**Option A: Public Repository**

```bash
git submodule add https://github.com/username/research-bookmarks.git research
```

**Option B: Private Repository**

```bash
# Use SSH URL for private repos
git submodule add git@github.com:username/research-bookmarks.git research

# Or use HTTPS with credentials
git submodule add https://github.com/username/research-bookmarks.git research
```

**Option C: Local Repository**

```bash
# If research is a local directory
git submodule add ../research-bookmarks research
```

### 2. Directory Structure

Recommended structure for research submodule:

```
research/
├── bookmarks/
│   ├── restoration/
│   │   ├── methodologies/
│   │   ├── species-selection/
│   │   └── case-studies/
│   ├── funding/
│   │   ├── grants/
│   │   ├── crowdfunding/
│   │   └── business-models/
│   ├── legal/
│   │   ├── organizational-structures/
│   │   ├── land-acquisition/
│   │   └── regulations/
│   ├── technology/
│   │   ├── off-grid-systems/
│   │   ├── monitoring/
│   │   └── tools/
│   └── community/
│       ├── engagement/
│       └── education/
├── CITATIONS.md          # Citation index
├── citation_index.json   # Machine-readable citations
├── README.md             # Research repository overview
└── .gitignore            # Exclude temporary files
```

### 3. Citation System

#### Create Citation Format

**CITATIONS.md** format:

```markdown
# Research Citations

## Restoration Methodologies

### [Source Title](URL)
- **Type:** Academic Paper / Article / Case Study
- **Year:** 2023
- **Relevance:** Species selection, native restoration
- **Key Points:**
  - Point 1
  - Point 2
- **Used in:** `strategic/20_Restoration_Methodology.md`

## Funding Models

### [Source Title](URL)
- **Type:** Report / Guide
- **Year:** 2024
- **Relevance:** Crowdfunding for environmental projects
- **Key Points:**
  - Point 1
  - Point 2
- **Used in:** `strategic/32_Funding_Strategy.md`
```

#### Citation Index JSON

**citation_index.json** format:

```json
{
  "citations": [
    {
      "id": "rest-001",
      "title": "Native Species Restoration Guide",
      "url": "https://example.com/guide",
      "type": "academic",
      "year": 2023,
      "topics": ["restoration", "species-selection"],
      "used_in": [
        "strategic/20_Restoration_Methodology.md"
      ],
      "key_points": [
        "Native species selection criteria",
        "Restoration timeline best practices"
      ]
    }
  ]
}
```

### 4. Adding Citations to Documents

#### In-Text Citation Format

```markdown
According to research on native species restoration [rest-001], 
the selection criteria should prioritize...

[rest-001]: Native Species Restoration Guide (2023)
```

#### Reference Section

Add at end of strategic documents:

```markdown
## References

- [rest-001] Native Species Restoration Guide (2023) - Species selection criteria
- [fund-001] Crowdfunding for Environmental Projects (2024) - Campaign strategies
```

### 5. Creating Index/Navigation

Create `research/INDEX.md`:

```markdown
# Research Bookmarks Index

## By Topic

### Restoration Methodologies
- [Native Species Selection](bookmarks/restoration/species-selection/)
- [Restoration Techniques](bookmarks/restoration/methodologies/)
- [Case Studies](bookmarks/restoration/case-studies/)

### Funding & Business Models
- [Grant Opportunities](bookmarks/funding/grants/)
- [Crowdfunding Strategies](bookmarks/funding/crowdfunding/)
- [Business Models](bookmarks/funding/business-models/)

## By Type

### Academic Papers
- [List of academic sources]

### Case Studies
- [List of case studies]

### Guides & Reports
- [List of guides and reports]
```

### 6. Updating AI Context

If using AI assistants, add research submodule to context:

**For Cursor/Claude:**
- Research submodule is automatically included if in workspace
- May need to explicitly reference `research/` directory in prompts

**For Documentation:**
- Add research index to main documentation navigation
- Link from strategic documents to relevant research

---

## Integration with Documentation

### Linking Research to Strategic Documents

Add research references section to key documents:

**Example in `strategic/20_Restoration_Methodology.md`:**

```markdown
## Research References

See `research/bookmarks/restoration/methodologies/` for:
- Native species selection guides
- Restoration technique case studies
- Best practices from similar projects

Key sources:
- [rest-001] Native Species Restoration Guide
- [rest-002] European Restoration Case Studies
```

### Adding Citations to Statistical Claims

When making statistical claims, add citations:

**Before:**
```markdown
Native species restoration has a 85% success rate.
```

**After:**
```markdown
Native species restoration has a 85% success rate [rest-001, rest-003].
```

---

## Maintenance

### Updating Submodule

```bash
# Update to latest version of research repository
git submodule update --remote research

# Commit the update
git add research
git commit -m "Update research submodule"
```

### Adding New Bookmarks

1. Add bookmark to appropriate category in `research/bookmarks/`
2. Update `research/CITATIONS.md` with new citation
3. Update `research/citation_index.json`
4. Commit changes to research submodule
5. Update main repository to reference new submodule commit

### Syncing with Main Repository

```bash
# Pull latest changes including submodule updates
git pull
git submodule update --init --recursive
```

---

## Troubleshooting

### Submodule Not Initialized

```bash
git submodule update --init --recursive
```

### Submodule Points to Wrong Commit

```bash
cd research
git checkout <correct-branch-or-commit>
cd ..
git add research
git commit -m "Update research submodule to correct version"
```

### Need to Remove Submodule

```bash
# Remove submodule
git submodule deinit research
git rm research
rm -rf .git/modules/research
```

---

## Next Steps

After submodule is added:

1. **Organize Bookmarks**: Categorize existing bookmarks by topic
2. **Create Citation Index**: Build comprehensive citation system
3. **Add Citations**: Link research sources to strategic documents
4. **Create Navigation**: Build index for easy research discovery
5. **Update Documentation**: Add research references to key documents
6. **Automate Updates**: Set up workflow to sync research submodule

---

## Related Documents

- `_process/documentation/PENDING_TASKS.md` - Task tracking
- `docs/resources/feature-wishlist.md` - Feature description
- `_vault_maintenance/personas/knowledge_synthesizer.md` - Research synthesis persona
- `_vault_maintenance/workflows/bookmark_synthesis_workflow.md` - Synthesis workflow

---

**Status:** Ready to execute when research repository URL is available.

