# Algolia DocSearch Setup Guide

**Purpose:** Fast, full-text search for documentation  
**Status:** Integration ready, awaiting Algolia approval

---

## Setup Process

### Step 1: Apply for Free Open Source Plan

1. **Go to:** https://docsearch.algolia.com/apply/
2. **Fill out the application form:**
   - **Repository URL:** `https://github.com/presiannedyalkov/eco-balance-documentation`
   - **Site URL:** `https://presiannedyalkov.github.io/eco-balance-documentation/`
   - **Description:** "Open source documentation for ecological restoration project - creating habitat for wildlife through biodiversity restoration"
   - **Contact email:** Your email address
   - **Project type:** Documentation site
   - **Framework:** Docusaurus
3. **Submit application**
4. **Wait for approval** (usually 1-3 business days)

### Step 2: After Approval

Algolia will email you with:
- `appId` - Application ID
- `apiKey` - Search-only API key (safe to commit)
- `indexName` - Index name for your documentation

### Step 3: Configure

**Option A: Environment Variables (Recommended for Production)**

1. Add to GitHub Actions secrets:
   - `ALGOLIA_APP_ID`
   - `ALGOLIA_API_KEY`
   - `ALGOLIA_INDEX_NAME`

2. Update `.github/workflows/deploy.yml` to pass these as build environment variables

**Option B: Direct Configuration (For Testing)**

1. Edit `docusaurus.config.js`
2. Replace placeholder values:
   ```javascript
   algolia: {
     appId: 'YOUR_APP_ID',
     apiKey: 'YOUR_SEARCH_API_KEY',
     indexName: 'YOUR_INDEX_NAME',
   }
   ```

### Step 4: Test

1. Build the site: `npm run build`
2. Start server: `npm run serve`
3. Test search functionality
4. Verify results are relevant and fast

---

## What's Already Configured

✅ **Algolia Config** - Added to `docusaurus.config.js`  
✅ **Search UI** - Docusaurus will automatically show search in navbar  
✅ **Contextual Search** - Enabled for better results  
✅ **Search Page** - Available at `/search`

---

## Features

### What You Get

- **Fast Search:** Instant results as you type
- **Typo Tolerance:** Finds results even with spelling mistakes
- **Highlighted Results:** Shows where matches occur
- **Keyboard Shortcuts:** `/` to focus search, `Esc` to close
- **Mobile Friendly:** Works great on all devices

### How It Works

1. **Crawling:** Algolia crawls your site daily
2. **Indexing:** Content is indexed in Algolia's search engine
3. **Search:** Users search through Algolia's API
4. **Results:** Fast, relevant results displayed instantly

---

## Customization

### Search Parameters

Edit `docusaurus.config.js` → `algolia.searchParameters`:
```javascript
searchParameters: {
  // Highlight matches
  highlightPreTag: '<mark>',
  highlightPostTag: '</mark>',
  // Number of results
  hitsPerPage: 10,
}
```

### Custom Search Button

Create custom search component if needed (see Docusaurus docs).

---

## Troubleshooting

### Search Not Appearing

1. Check that Algolia config is uncommented in `docusaurus.config.js`
2. Verify credentials are correct
3. Check browser console for errors
4. Ensure site is built with production config

### No Results

1. Wait 24-48 hours after approval for initial crawl
2. Check Algolia dashboard for indexing status
3. Verify site is publicly accessible
4. Check that `baseUrl` matches your actual site URL

---

## Alternative: Local Search

If Algolia approval is delayed, Docusaurus has built-in local search:

1. Remove Algolia config from `docusaurus.config.js`
2. Docusaurus will automatically use local search
3. Less powerful but works immediately

---

**Last Updated:** November 16, 2025

