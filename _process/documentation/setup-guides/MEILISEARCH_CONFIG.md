# Meilisearch Configuration

**Status:** ✅ Configured with search-only key

---

## Current Configuration

- **Host:** `https://search.eco-balance.cc` (public via Cloudflare)
- **Search Key:** `e1eebc3950796ae3ead1c39d2c80f4148212c344a36fb6ba9e9ec91d7a7f4489`
- **Index:** `eco-balance-docs`

✅ **Meilisearch is now publicly accessible** at https://search.eco-balance.cc/

---

## For Local Development

If you want to use local Meilisearch during development:

1. Set environment variable:
   ```bash
   export MEILISEARCH_HOST=http://192.168.178.35:7777
   npm start
   ```

2. Or create `.env` file:
   ```
   MEILISEARCH_HOST=http://192.168.178.35:7777
   ```

---

## For Production (GitHub Pages)

When deploying to production, you'll need to:

### 1. ✅ Meilisearch Exposed via Cloudflare

**Already configured!** Meilisearch is accessible at:
- **Public URL:** `https://search.eco-balance.cc`
- **Cloudflare Proxy:** Enabled (orange cloud)
- **HTTPS:** Enabled via Cloudflare

### 2. (Optional) Update GitHub Secrets

If you want to override the default host:
- `MEILISEARCH_HOST` = `https://search.eco-balance.cc`
- `MEILISEARCH_SEARCH_KEY` = `e1eebc3950796ae3ead1c39d2c80f4148212c344a36fb6ba9e9ec91d7a7f4489`

**Note:** The configuration already defaults to `https://search.eco-balance.cc`, so this is optional.

### 3. Deploy Workflow

The deploy workflow will automatically use the configured host.

---

## Security Notes

✅ **Search-only key is safe to expose:**
- Can only search, cannot modify data
- Limited to `eco-balance-docs` index only
- No admin permissions

✅ **Production Security (ACTIVE):**
- ✅ Cloudflare Proxy enabled (hides server IP, DDoS protection)
- ✅ Rate limiting configured: **10 calls per 10 seconds per IP**
- ✅ HTTPS enabled via Cloudflare
- ✅ Subdomain via Nginx Proxy Manager

**Current Security Level:** ⭐⭐⭐⭐ (Very Good)

See `MEILISEARCH_SECURITY.md` for full security details.

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

1. **Check Meilisearch is accessible:**
   ```bash
   curl https://search.eco-balance.cc/health
   # Should return: {"status":"Meilisearch is running"}
   ```

2. **Verify search key works:**
   ```bash
   curl -X POST "https://search.eco-balance.cc/indexes/eco-balance-docs/search" \
     -H "Authorization: Bearer e1eebc3950796ae3ead1c39d2c80f4148212c344a36fb6ba9e9ec91d7a7f4489" \
     -H "Content-Type: application/json" \
     --data-binary '{"q": "test"}'
   ```

3. **Check browser console** for errors (CORS, network, etc.)

4. **Verify index exists:**
   ```bash
   curl -X GET "https://search.eco-balance.cc/indexes" \
     -H "Authorization: Bearer e1eebc3950796ae3ead1c39d2c80f4148212c344a36fb6ba9e9ec91d7a7f4489"
   ```

5. **Check Cloudflare settings:**
   - Ensure proxy is enabled (orange cloud)
   - Check for any firewall rules blocking requests
   - Verify SSL/TLS is set to "Full" or "Full (strict)"

---

**Last Updated:** November 16, 2025

