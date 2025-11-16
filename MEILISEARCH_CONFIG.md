# Meilisearch Configuration

**Status:** ✅ Configured with search-only key

---

## Current Configuration

- **Host:** `http://192.168.178.35:7777` (local network)
- **Search Key:** `e1eebc3950796ae3ead1c39d2c80f4148212c344a36fb6ba9e9ec91d7a7f4489`
- **Index:** `eco-balance-docs`

---

## For Local Development

The configuration is already set up for local development. Just run:

```bash
npm install
npm start
```

The search will connect to your local Meilisearch instance.

---

## For Production (GitHub Pages)

When deploying to production, you'll need to:

### 1. Expose Meilisearch via Cloudflare

1. Add subdomain to Cloudflare (e.g., `search.yourdomain.com`)
2. Point it to `192.168.178.35:7777`
3. Enable Cloudflare Proxy (orange cloud)
4. Configure rate limiting (see `MEILISEARCH_SECURITY.md`)

### 2. Update GitHub Secrets

Add to GitHub Repository Secrets:
- `MEILISEARCH_HOST` = `https://search.yourdomain.com`
- `MEILISEARCH_SEARCH_KEY` = `e1eebc3950796ae3ead1c39d2c80f4148212c344a36fb6ba9e9ec91d7a7f4489`

### 3. Update Deploy Workflow

The deploy workflow will automatically use these environment variables.

---

## Security Notes

✅ **Search-only key is safe to expose:**
- Can only search, cannot modify data
- Limited to `eco-balance-docs` index only
- No admin permissions

⚠️ **For production:**
- Use Cloudflare Proxy to hide server IP
- Enable rate limiting
- Consider using Cloudflare Workers for extra security
- See `MEILISEARCH_SECURITY.md` for details

---

## Testing

1. **Test locally:**
   ```bash
   npm start
   # Open http://localhost:3023
   # Try searching - should connect to local Meilisearch
   ```

2. **Test indexing:**
   ```bash
   npm run build
   # Check console output for indexing status
   ```

3. **Verify search key:**
   ```bash
   curl -X POST "http://192.168.178.35:7777/indexes/eco-balance-docs/search" \
     -H "Authorization: Bearer e1eebc3950796ae3ead1c39d2c80f4148212c344a36fb6ba9e9ec91d7a7f4489" \
     -H "Content-Type: application/json" \
     --data-binary '{"q": "test"}'
   ```

---

## Troubleshooting

### Search not working?

1. **Check Meilisearch is running:**
   ```bash
   curl http://192.168.178.35:7777/health
   ```

2. **Verify search key works:**
   ```bash
   curl -X GET "http://192.168.178.35:7777/keys" \
     -H "Authorization: Bearer e1eebc3950796ae3ead1c39d2c80f4148212c344a36fb6ba9e9ec91d7a7f4489"
   ```

3. **Check browser console** for errors

4. **Verify index exists:**
   ```bash
   curl -X GET "http://192.168.178.35:7777/indexes" \
     -H "Authorization: Bearer kYsKXHMJFnCqAumextwGjS"
   ```

---

**Last Updated:** November 16, 2025

