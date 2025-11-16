# Tools Setup Guide

**Created:** November 16, 2025  
**Purpose:** Guide for setting up external tools and services

---

## 🔐 Account Requirements

### CodeQL ✅ No Account Needed
- **Status:** Built into GitHub
- **Setup:** Already configured in `.github/workflows/codeql-analysis.yml`
- **How it works:** GitHub automatically runs CodeQL analysis on your code
- **Results:** View in GitHub Security tab → Code scanning alerts
- **Action needed:** None - it's already working!

### Lighthouse CI ✅ No Account Needed (Basic)
- **Status:** Works without account using temporary public storage
- **Setup:** Already configured in `.github/workflows/lighthouse-ci.yml`
- **How it works:** 
  - Runs Lighthouse audits on your site
  - Stores results temporarily (7 days) in public storage
  - Results available in workflow artifacts
- **Optional:** Can connect to Lighthouse CI service for longer storage/history
- **Action needed:** None - it's already working!

---

## 🔗 Link Checking Service (lychee) ✅

### How It Works

**What is lychee?**
- Command-line tool that checks links in markdown files
- Runs in GitHub Actions (no account needed)
- Checks both internal and external links
- Reports broken links, timeouts, and redirects

**How it works:**
1. Scans all markdown files in repository
2. Extracts all links (both `[text](url)` and `<url>`)
3. Makes HTTP requests to check if links are valid
4. Reports results (broken links, timeouts, etc.)
5. Can be configured to skip certain domains/patterns

**Benefits:**
- Catch broken external links before they affect users
- Monitor link health over time
- Can run on schedule or on PRs
- No account needed - runs entirely in GitHub Actions

**Setup:** ✅ Already added in `.github/workflows/check-links.yml`

**Configuration:**
- Runs on PRs (when markdown files change)
- Runs weekly on Monday at 3 AM UTC
- Accepts HTTP 200, 201, 202, 301, 302, 303, 307, 308 as valid
- Excludes private/internal links
- Excludes email addresses
- 20 second timeout per link
- Max 10 concurrent checks

---

## 🐛 Sentry Error Tracking ✅

### Setup (You Already Have Account)

Since you already have Sentry for another project, setup is easy:

**What you need:**
- DSN (Data Source Name) from your Sentry project
- Organization slug
- Project slug
- Auth token (for source maps)

**How to get DSN:**
1. Go to your Sentry project (or create new one)
2. Settings → Client Keys (DSN)
3. Copy the DSN

**How to get Auth Token:**
1. Sentry → Settings → Auth Tokens
2. Create New Token
3. Scopes: `project:read`, `project:releases`, `org:read`
4. Copy the token

**What's already added:**
- ✅ Sentry SDK (`@sentry/react`) in `package.json`
- ✅ Error initialization in `src/components/SentryInit.js`
- ✅ Client module in `website/clientModules.js`
- ✅ Release workflow in `.github/workflows/sentry-release.yml`
- ✅ Docusaurus plugin configuration

**Setup Steps:**
1. Add GitHub Secrets:
   - `SENTRY_DSN` - Your DSN
   - `SENTRY_ORG` - Organization slug
   - `SENTRY_PROJECT` - Project slug
   - `SENTRY_AUTH_TOKEN` - Auth token

2. That's it! Sentry will automatically:
   - Track errors in production
   - Upload source maps
   - Create releases on deployment
   - Monitor performance (10% sample rate)

**See:** `SENTRY_SETUP.md` for detailed instructions

---

## 🔍 Algolia DocSearch ✅

### Setup Process

**Step 1: Apply for Free Open Source Plan**
1. Go to: https://docsearch.algolia.com/apply/
2. Fill out application form:
   - **Repository:** `presiannedyalkov/eco-balance-documentation`
   - **Site URL:** `https://presiannedyalkov.github.io/eco-balance-documentation/`
   - **Description:** "Open source documentation for ecological restoration project - creating habitat for wildlife through biodiversity restoration"
   - **Contact email:** Your email
   - **Framework:** Docusaurus
3. Wait for approval (usually 1-3 business days)

**Step 2: After Approval**
- Algolia will email you with:
  - `appId` - Application ID
  - `apiKey` - Search-only key (safe to commit)
  - `indexName` - Index name

**Step 3: Add Credentials**

**Option A: Environment Variables (Recommended)**
1. Add to GitHub Secrets:
   - `ALGOLIA_APP_ID`
   - `ALGOLIA_API_KEY`
   - `ALGOLIA_INDEX_NAME`
2. Update deploy workflow to pass as build env vars

**Option B: Direct Config (For Testing)**
1. Edit `docusaurus.config.js`
2. Replace `YOUR_APP_ID`, `YOUR_SEARCH_API_KEY`, `YOUR_INDEX_NAME`

**What's already added:**
- ✅ Algolia configuration in `docusaurus.config.js`
- ✅ Search UI will appear automatically in navbar
- ✅ Contextual search enabled
- ✅ Search page at `/search`

**Benefits:**
- Fast, full-text search (instant results)
- Typo tolerance
- Highlighted results
- Keyboard shortcuts (`/` to focus)
- Free for open source projects

**See:** `ALGOLIA_SETUP.md` for detailed instructions

---

## 📋 Setup Checklist

### Immediate (No Account Needed)
- [x] CodeQL - Already working
- [x] Lighthouse CI - Already working
- [ ] Lychee link checking - Will add workflow
- [ ] Algolia DocSearch - Will add integration code (add keys after approval)

### After You Provide Info
- [ ] Sentry - Need DSN from your existing project
- [ ] Algolia - Need keys after approval

---

**Last Updated:** November 16, 2025

