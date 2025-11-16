# Citation Index System - Tool Options & Recommendations

**Created:** November 16, 2025  
**Purpose:** Compare citation management tools and recommend best approach for this project

---

## 🎯 Requirements

Based on your setup:
- ✅ 399 markdown articles with YAML frontmatter
- ✅ GitHub-based workflow
- ✅ Pandoc already in use (for PDF/EPUB export)
- ✅ Markdown documentation files
- ✅ Need to link research to strategic documents

---

## 📊 Tool Comparison

### Option 1: Zotero + Pandoc (Recommended) ⭐

**Best for:** Academic-style citations with automatic formatting

**Pros:**
- ✅ Free and open-source
- ✅ Excellent markdown support via Pandoc
- ✅ Browser extension for easy article capture
- ✅ Can import from Raindrop.io (your current source)
- ✅ Supports BibTeX export (works with Pandoc)
- ✅ Collaborative features (Zotero Groups)
- ✅ API for automation
- ✅ Works with your existing Pandoc setup

**Cons:**
- ⚠️ Requires Zotero installation
- ⚠️ Need to manually import 399 articles (or script it)
- ⚠️ Separate tool from your markdown workflow

**Integration:**
```markdown
# In your markdown files:
Native species restoration has 85% success rate [@rest2023mediterranean].

# Pandoc converts to:
Native species restoration has 85% success rate (Mediterranean Restoration, 2023).

# Or with BibTeX:
\cite{rest2023mediterranean}
```

**Workflow:**
1. Import articles to Zotero (from Raindrop or manually)
2. Export to BibTeX format
3. Use Pandoc with `--citeproc` to process citations
4. Generate formatted references automatically

**Setup Effort:** 4-6 hours (import articles, configure Pandoc)

---

### Option 2: Custom Scripts + JSON Index (Lightweight) ⭐⭐

**Best for:** Full control, GitHub-native, no external tools

**Pros:**
- ✅ No external dependencies
- ✅ Works entirely in your repository
- ✅ Can auto-generate from existing article frontmatter
- ✅ Easy to version control
- ✅ Can integrate with GitHub Actions
- ✅ Simple JSON structure

**Cons:**
- ⚠️ Manual citation formatting
- ⚠️ No automatic style formatting
- ⚠️ Need to build citation lookup yourself

**Structure:**
```json
{
  "citations": {
    "rest-001": {
      "id": "rest-001",
      "title": "Mediterranean Restoration Best Practices",
      "article_file": "research/bookmarks/articles/1014978855.md",
      "url": "https://example.com/article",
      "year": 2023,
      "authors": ["Author Name"],
      "tags": ["restoration", "mediterranean"],
      "used_in": ["strategic/20_Restoration_Methodology.md"]
    }
  }
}
```

**Workflow:**
1. Script parses article frontmatter
2. Generates `citation_index.json`
3. Manual citation IDs in markdown: `[rest-001]`
4. Script generates reference sections

**Setup Effort:** 2-3 hours (create scripts)

---

### Option 3: Zotero + Obsidian Citations Plugin

**Best for:** If you use Obsidian for editing

**Pros:**
- ✅ Seamless Obsidian integration
- ✅ Visual citation picker
- ✅ Automatic reference formatting
- ✅ Works with Zotero database

**Cons:**
- ⚠️ Requires Obsidian (you may not use it)
- ⚠️ Obsidian-specific syntax
- ⚠️ Less portable

**Not recommended** unless you're already using Obsidian heavily.

---

### Option 4: BibTeX/BibLaTeX + Pandoc (Academic Standard)

**Best for:** Academic publications, formal citations

**Pros:**
- ✅ Industry standard format
- ✅ Works perfectly with Pandoc
- ✅ Thousands of citation styles (CSL)
- ✅ Can convert from Zotero
- ✅ Version control friendly (text-based)

**Cons:**
- ⚠️ Steeper learning curve
- ⚠️ Need to maintain `.bib` file
- ⚠️ Less user-friendly editing

**Structure:**
```bibtex
@article{rest2023mediterranean,
  title = {Mediterranean Restoration Best Practices},
  author = {Author, Name},
  year = {2023},
  url = {https://example.com/article},
  tags = {restoration, mediterranean}
}
```

**Workflow:**
1. Create/maintain `.bib` file
2. Use Pandoc with `--citeproc` and `--bibliography=references.bib`
3. Automatic citation formatting

**Setup Effort:** 3-4 hours (create BibTeX entries)

---

### Option 5: Hybrid: Zotero → BibTeX → Custom Scripts

**Best for:** Best of both worlds ⭐⭐⭐

**Pros:**
- ✅ Use Zotero for management (easy UI)
- ✅ Export to BibTeX (standard format)
- ✅ Custom scripts for GitHub integration
- ✅ Pandoc for PDF/EPUB with citations
- ✅ JSON index for web/search

**Cons:**
- ⚠️ More moving parts
- ⚠️ Need to sync between systems

**Workflow:**
1. **Manage in Zotero:** Import articles, organize, tag
2. **Export to BibTeX:** `references.bib` for Pandoc
3. **Generate JSON index:** Script converts BibTeX → JSON for web/search
4. **Use in markdown:** `[@rest2023mediterranean]` (Pandoc syntax)
5. **Auto-generate references:** Pandoc handles formatting

**Setup Effort:** 5-7 hours (but most flexible)

---

## 🎯 Recommended Approach: Hybrid System

### Phase 1: Quick Start (Custom Scripts) - 2-3 hours

**Immediate solution:**
1. Create script to parse article frontmatter
2. Generate `citation_index.json`
3. Create citation ID system (`rest-001`, `fund-001`, etc.)
4. Manual citations in markdown: `[rest-001]`
5. Script generates reference sections

**Files:**
- `research/citation_index.json` - Machine-readable index
- `research/CITATIONS.md` - Human-readable index
- `scripts/generate-citation-index.js` - Auto-generate from articles
- `scripts/add-citations.js` - Helper to add citations to docs

### Phase 2: Enhanced (Add Zotero) - 3-4 hours

**Add Zotero for better management:**
1. Import articles to Zotero (or sync from Raindrop)
2. Export to BibTeX: `research/references.bib`
3. Update scripts to sync BibTeX → JSON index
4. Use Pandoc citations: `[@rest2023mediterranean]`
5. Auto-format references in PDF/EPUB exports

**Additional Files:**
- `research/references.bib` - BibTeX database
- `scripts/sync-zotero-bibtex.js` - Sync Zotero → BibTeX
- `.github/workflows/update-citations.yml` - Auto-update citations

### Phase 3: Full Integration (Optional) - 2-3 hours

**Advanced features:**
1. Zotero API integration for auto-sync
2. Citation style customization (CSL)
3. Web interface for citation search
4. Auto-detect claims needing citations

---

## 🛠️ Implementation Plan

### Step 1: Create Citation Index Generator

**Script:** `scripts/generate-citation-index.js`

**What it does:**
- Scans `research/bookmarks/articles/*.md`
- Extracts frontmatter (title, url, tags, raindrop_id)
- Generates citation IDs based on tags + sequential number
- Creates `citation_index.json`
- Creates `CITATIONS.md` (human-readable)

**Output:**
```json
{
  "citations": {
    "fund-001": {
      "id": "fund-001",
      "title": "50+ Calls for Applications: Addressing Climate Change...",
      "article_file": "research/bookmarks/articles/1014978855.md",
      "url": "https://www2.fundsforngos.org/...",
      "tags": ["Climate_Change", "funding"],
      "year": 2025,
      "raindrop_id": "1014978855"
    }
  }
}
```

### Step 2: Create Citation Helper Script

**Script:** `scripts/add-citation.js`

**What it does:**
- Searches citation index by topic/title
- Suggests relevant citations
- Adds citation to markdown file
- Updates `used_in` field in index

**Usage:**
```bash
node scripts/add-citation.js \
  --file strategic/20_Restoration_Methodology.md \
  --topic "restoration success rate" \
  --claim "85% success rate"
```

### Step 3: Create Reference Generator

**Script:** `scripts/generate-references.js`

**What it does:**
- Scans markdown files for citation patterns `[id-001]`
- Generates reference sections
- Adds to end of documents

### Step 4: Integrate with Pandoc (Optional)

**Update:** `scripts/export-docs.sh`

**Add:**
- `--citeproc` flag for citation processing
- `--bibliography=research/references.bib` (if using BibTeX)
- Automatic reference formatting in PDF/EPUB

---

## 📋 Quick Comparison Table

| Feature | Custom Scripts | Zotero | BibTeX | Hybrid |
|---------|---------------|--------|--------|--------|
| **Setup Time** | 2-3 hours | 4-6 hours | 3-4 hours | 5-7 hours |
| **Ease of Use** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| **GitHub Integration** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Citation Formatting** | Manual | Automatic | Automatic | Automatic |
| **PDF/EPUB Support** | Manual | ✅ | ✅ | ✅ |
| **Maintenance** | Low | Medium | Medium | Medium |
| **Scalability** | Good | Excellent | Excellent | Excellent |

---

## 🎯 My Recommendation

**Start with Option 2 (Custom Scripts)** for immediate results, then **add Zotero (Option 5: Hybrid)** when you need better management.

**Why:**
1. ✅ Quick to implement (2-3 hours)
2. ✅ Works with your existing setup
3. ✅ No external dependencies
4. ✅ Can evolve into hybrid system later
5. ✅ GitHub-native (version controlled)

**Then add Zotero when:**
- You have 100+ citations to manage
- You need automatic citation formatting
- You want browser extension for easy capture
- You need collaborative features

---

## 🚀 Next Steps

1. **Choose approach** (I recommend starting with Custom Scripts)
2. **Create citation index generator script**
3. **Test with a few articles**
4. **Add citations to 1-2 strategic documents**
5. **Iterate and improve**

Would you like me to implement the **Custom Scripts** approach first? It's the quickest way to get started and can be enhanced later with Zotero.

