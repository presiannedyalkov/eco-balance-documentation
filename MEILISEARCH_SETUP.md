# Meilisearch Setup for Docusaurus

**Purpose:** Integrate self-hosted Meilisearch for documentation search  
**Status:** Ready to configure

> **⚠️ Security Note:** If exposing Meilisearch via public subdomain, see `MEILISEARCH_SECURITY.md` for security best practices.

---

## Why Meilisearch is Great for Your Project

### ✅ Advantages Over Local Search

1. **Typo Tolerance** - Finds results even with spelling mistakes
2. **Faster** - Especially for large documentation sites
3. **Better Relevancy** - More intelligent ranking
4. **Highlighted Results** - Shows where matches occur
5. **Faceted Search** - Can filter by categories/sections
6. **Real-time Updates** - Index updates immediately when content changes

### ✅ Advantages Over Algolia

1. **Self-Hosted** - Full control over your data
2. **Free** - No per-query costs
3. **No Approval** - Works immediately
4. **Privacy** - Data stays on your server
5. **Customizable** - Full control over indexing and ranking
6. **Simple** - Easier to configure than Algolia

### Comparison Summary

| Feature | Local Search | Meilisearch | Algolia |
|---------|-------------|-------------|---------|
| Typo Tolerance | ❌ | ✅ | ✅ |
| Speed | Good | Excellent | Excellent |
| Setup Complexity | None | Medium | Easy (after approval) |
| Cost | Free | Free (self-hosted) | Free (open source) |
| Approval Needed | ❌ | ❌ | ✅ |
| Data Control | Full | Full | Limited |
| Offline | ✅ | ❌ | ❌ |
| Best For | Small sites | Medium-large sites | Enterprise |

---

## Setup Instructions

### Prerequisites

- ✅ Meilisearch instance running (you have this!)
- Meilisearch URL (e.g., `https://search.yourdomain.com`)
- Master key or search key from Meilisearch

### Step 1: Install Dependencies

```bash
npm install meilisearch
```

### Step 2: Create Meilisearch Plugin

We'll create a custom plugin that:
- Indexes your documentation at build time
- Provides search UI component
- Connects to your Meilisearch instance

### Step 3: Configure

Add to `docusaurus.config.js`:
- Meilisearch host URL
- API key (search key, safe to commit)
- Index name

### Step 4: Index Content

The plugin will automatically:
- Index all documentation pages at build time
- Update index on each deployment
- Handle search queries

---

## Configuration

### Environment Variables (Recommended)

Add to GitHub Secrets:
- `MEILISEARCH_HOST` - Your Meilisearch URL
- `MEILISEARCH_SEARCH_KEY` - Search-only API key (safe to commit)

### Direct Configuration

Add to `docusaurus.config.js`:
```javascript
meilisearch: {
  host: process.env.MEILISEARCH_HOST || 'https://search.yourdomain.com',
  searchKey: process.env.MEILISEARCH_SEARCH_KEY || 'your_search_key',
  indexName: 'eco-balance-docs',
}
```

---

## Features You'll Get

- ✅ **Instant Search** - Results as you type
- ✅ **Typo Tolerance** - Finds "restoraton" when searching "restoration"
- ✅ **Highlighted Results** - Shows matching text
- ✅ **Keyboard Shortcuts** - `/` to focus, `Esc` to close
- ✅ **Mobile Friendly** - Works great on all devices
- ✅ **Fast** - Sub-50ms search results
- ✅ **Relevant** - Smart ranking of results

---

## Indexing Strategy

The plugin will index:
- Page titles
- Page content (markdown)
- Headings (H1, H2, H3)
- Code blocks
- Metadata (tags, categories)

Searchable fields:
- `title` - Page title
- `content` - Full page content
- `headings` - All headings
- `url` - Page URL

---

## Next Steps

1. **Provide Meilisearch Details:**
   - Host URL
   - Search key (or master key if you prefer)

2. **I'll create:**
   - Custom Docusaurus plugin
   - Search UI component
   - Build-time indexing script
   - Configuration in `docusaurus.config.js`

3. **Test:**
   - Build site
   - Verify indexing
   - Test search functionality

---

## Security Notes

- Use **search key** (not master key) in frontend
- Search key should have only `search` permissions
- Host Meilisearch behind HTTPS
- Consider rate limiting if public

---

**Last Updated:** November 16, 2025

