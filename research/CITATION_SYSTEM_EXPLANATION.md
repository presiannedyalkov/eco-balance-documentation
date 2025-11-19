# Citation Index System - Explanation

## What is a Citation Index System?

A **citation index system** is a way to:
1. **Link research articles to documentation claims** - When you make a claim like "Native species restoration has 85% success rate", you can cite which research article supports that
2. **Track what research is used where** - See which articles are cited in which documents
3. **Find relevant research quickly** - Search by topic to find articles related to funding, restoration, etc.
4. **Maintain credibility** - All claims can be traced back to sources

## Current Problem

Right now, your documentation makes claims like:
- "Native species restoration has 85% success rate" (no source)
- "Crowdfunding campaigns average €15,000" (no source)
- "Mediterranean restoration requires 3-5 years" (no source)

**Problem:** These claims can't be verified. You have 399 research articles, but they're not connected to your documentation.

## What a Citation Index Would Do

### 1. Create Citation IDs

Each research article gets a short ID:
- `fund-001` = First funding-related article
- `rest-001` = First restoration-related article
- `tech-001` = First technology-related article

### 2. Link Articles to Documentation

**Example in `strategic/20_Restoration_Methodology.md`:**

```markdown
## Native Species Selection

Native species restoration has shown an 85% success rate in Mediterranean 
ecosystems [rest-001, rest-003]. The selection criteria should prioritize...

## References

- [rest-001] Mediterranean Restoration Best Practices (2023) - 85% success rate data
- [rest-003] Native Species Selection Guide (2024) - Selection criteria
```

### 3. Create Searchable Index

**`research/citation_index.json`:**

```json
{
  "citations": [
    {
      "id": "rest-001",
      "title": "Mediterranean Restoration Best Practices",
      "article_file": "research/bookmarks/articles/1014978855.md",
      "url": "https://example.com/article",
      "tags": ["restoration", "mediterranean", "success-rate"],
      "key_claims": [
        "85% success rate for native species restoration",
        "3-5 year timeline for ecosystem recovery"
      ],
      "used_in": [
        "strategic/20_Restoration_Methodology.md",
        "docs/operations/restoration-methodology.md"
      ],
      "year": 2023,
      "type": "academic"
    },
    {
      "id": "fund-001",
      "title": "50+ Calls for Applications: Climate Change Funding",
      "article_file": "research/bookmarks/articles/1014978855.md",
      "url": "https://www2.fundsforngos.org/...",
      "tags": ["funding", "grants", "climate-change"],
      "key_claims": [
        "50+ grant opportunities available",
        "Application deadlines vary by program"
      ],
      "used_in": [
        "strategic/32_Funding_Strategy.md"
      ],
      "year": 2025,
      "type": "resource"
    }
  ]
}
```

### 4. Create Human-Readable Index

**`research/CITATIONS.md`:**

```markdown
# Research Citations Index

## By Topic

### Restoration Methodologies
- [rest-001] Mediterranean Restoration Best Practices (2023)
  - Used in: `strategic/20_Restoration_Methodology.md`
  - Key claim: 85% success rate for native species
  - File: `research/bookmarks/articles/1014978855.md`

### Funding & Grants
- [fund-001] 50+ Calls for Applications: Climate Change Funding (2025)
  - Used in: `strategic/32_Funding_Strategy.md`
  - Key claim: 50+ grant opportunities available
  - File: `research/bookmarks/articles/1014978855.md`

## By Document

### strategic/20_Restoration_Methodology.md
- [rest-001] Mediterranean Restoration Best Practices
- [rest-003] Native Species Selection Guide

### strategic/32_Funding_Strategy.md
- [fund-001] 50+ Calls for Applications
- [fund-002] Crowdfunding for Environmental Projects
```

## Benefits

1. **Credibility**: Every claim has a source
2. **Verifiability**: Readers can check sources
3. **Discoverability**: Find relevant research by topic
4. **Tracking**: See which articles are most useful
5. **Updates**: When new research comes in, you know where to add citations

## Implementation Options

### Option 1: Simple (Manual)
- Create `research/citation_index.json` manually
- Add citations to documents manually
- Update index when adding new citations

### Option 2: Semi-Automated
- Script to scan documents for citation patterns `[id-001]`
- Script to generate citation index from articles
- Manual review and linking

### Option 3: Full Automation (Future)
- AI-powered citation matching
- Auto-detect claims that need citations
- Auto-suggest relevant articles from research bookmarks

## Example Workflow

1. **Find a claim needing citation:**
   ```markdown
   Native species restoration has 85% success rate.
   ```

2. **Search research articles:**
   - Look in `research/bookmarks/articles/` for articles about restoration success rates
   - Find article: `1014978855.md` mentions "85% success rate"

3. **Add citation:**
   ```markdown
   Native species restoration has 85% success rate [rest-001].
   ```

4. **Update citation index:**
   - Add `rest-001` entry to `citation_index.json`
   - Link to article file and document

5. **Add reference section:**
   ```markdown
   ## References
   - [rest-001] Mediterranean Restoration Best Practices (2023)
   ```

## What You Get

- **`research/citation_index.json`**: Machine-readable index (for scripts/AI)
- **`research/CITATIONS.md`**: Human-readable index (for browsing)
- **In-document citations**: `[rest-001]` style references
- **Reference sections**: At end of strategic documents

---

**Bottom line:** A citation index system connects your 399 research articles to your documentation claims, making everything verifiable and credible.

