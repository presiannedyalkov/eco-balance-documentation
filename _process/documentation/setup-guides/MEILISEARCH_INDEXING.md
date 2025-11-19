# Meilisearch Indexing Setup

## Problem

The search bar is visible but returns no results because the index is empty. This happens because:

1. **Indexing requires write permissions** - The build process needs to add documents to Meilisearch
2. **Search-only keys can't write** - The current setup uses a search-only key which is safe for frontend but can't index
3. **Indexing happens during build** - Content is indexed when `npm run build` runs in GitHub Actions

## Solution

Use **two different API keys**:

1. **Master Key** (for indexing during build) - Has write permissions, kept secret in GitHub Secrets
2. **Search Key** (for frontend) - Read-only, safe to expose in frontend code

## Setup Instructions

### Step 1: Get Your Meilisearch Master Key

If you're self-hosting Meilisearch, you should have a master key. This is the key you use to:
- Create indexes
- Add documents
- Configure settings

**⚠️ Security:** Keep this key secret! Never commit it to the repository.

### Step 2: Add Master Key to GitHub Secrets

1. Go to your repository: https://github.com/presiannedyalkov/eco-balance-documentation
2. Navigate to: **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `MEILISEARCH_MASTER_KEY`
5. Value: Your Meilisearch master key
6. Click **Add secret**

### Step 3: Verify Search Key

The search key (read-only) is already configured. It's safe to use in the frontend because it only has read permissions.

Current search key location:
- GitHub Secret: `MEILISEARCH_SEARCH_KEY` (if set)
- Or default: `e1eebc3950796ae3ead1c39d2c80f4148212c344a36fb6ba9e9ec91d7a7f4489`

### Step 4: How It Works

**During Build (GitHub Actions):**
- Uses `MEILISEARCH_MASTER_KEY` (from secrets) to index all documentation pages
- This key has write permissions, so it can add documents to the index

**In Frontend (Browser):**
- Uses `MEILISEARCH_SEARCH_KEY` (read-only) to search the index
- This key is safe to expose because it can only read, not modify

### Step 5: Test Indexing

After adding the master key:

1. **Trigger a new deployment** (push to main or manually trigger workflow)
2. **Check build logs** for indexing messages:
   ```
   🔍 Meilisearch: Starting indexing...
   ✅ Indexed batch 1/3
   ✅ Meilisearch: Indexed 45 documents
   ```
3. **Test search** on https://docs.eco-balance.cc/ - should now return results!

## Troubleshooting

### "Index not found" error

If you see `Index 'eco-balance-docs' not found`:
- The index will be created automatically on first indexing
- Make sure `MEILISEARCH_MASTER_KEY` is set correctly
- Check that Meilisearch is accessible from GitHub Actions

### "API key invalid" error

- Verify the master key is correct
- Check that the key has write permissions
- Ensure the key is set in GitHub Secrets (not Variables)

### Indexing skipped warnings

If you see:
```
⚠️  Meilisearch indexing skipped: Key doesn't have write permissions
```

This means:
- The master key is not set, OR
- The wrong key is being used (search key instead of master key)

**Fix:** Add `MEILISEARCH_MASTER_KEY` to GitHub Secrets

## Security Best Practices

1. ✅ **Master key in secrets** - Never commit master key to code
2. ✅ **Search key in frontend** - Safe to expose, read-only
3. ✅ **HTTPS only** - Meilisearch should be behind HTTPS
4. ✅ **Rate limiting** - Consider rate limiting if public

## Manual Indexing (Alternative)

If you prefer to index manually instead of during build:

1. Remove `MEILISEARCH_MASTER_KEY` from GitHub Secrets
2. Run indexing manually:
   ```bash
   MEILISEARCH_MASTER_KEY=your_master_key npm run build
   ```
3. Or use a separate script to index after deployment

## Related Files

- `src/plugins/meilisearch-plugin.js` - Indexing plugin
- `.github/workflows/deploy.yml` - Build workflow
- `docusaurus.config.js` - Meilisearch configuration

---

**Last Updated:** November 17, 2025

