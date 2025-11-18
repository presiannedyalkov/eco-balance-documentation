# Meilisearch CORS Configuration Fix

## Problem

The Meilisearch server at `https://search.eco-balance.cc` is blocking requests from `https://docs.eco-balance.cc` due to missing CORS headers.

**Error:**
```
Access to fetch at 'https://search.eco-balance.cc/health' from origin 'https://docs.eco-balance.cc' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present
```

## Solution

You need to configure CORS on your Meilisearch server to allow requests from `https://docs.eco-balance.cc`.

### Option 1: Configure CORS in Meilisearch (Recommended)

Meilisearch supports CORS configuration. You need to set the allowed origins.

**If using Meilisearch directly:**

1. **Set CORS via environment variable:**
   ```bash
   export MEILI_CORS_ALLOWED_ORIGINS="https://docs.eco-balance.cc"
   ```

2. **Or in docker-compose.yml:**
   ```yaml
   environment:
     - MEILI_CORS_ALLOWED_ORIGINS=https://docs.eco-balance.cc
   ```

3. **Or via Meilisearch config file:**
   ```toml
   [http]
   cors_allowed_origins = ["https://docs.eco-balance.cc"]
   ```

### Option 2: Configure CORS via Nginx/Proxy (If using Nginx Proxy Manager)

If Meilisearch is behind Nginx Proxy Manager, you can add CORS headers there:

**In Nginx Proxy Manager:**
1. Go to your `search.eco-balance.cc` proxy host
2. Add Custom Location or Advanced tab
3. Add these headers:
   ```
   Access-Control-Allow-Origin: https://docs.eco-balance.cc
   Access-Control-Allow-Methods: GET, POST, OPTIONS
   Access-Control-Allow-Headers: Content-Type, Authorization
   Access-Control-Max-Age: 86400
   ```

### Option 3: Configure CORS via Cloudflare (If using Cloudflare Workers)

If you're using Cloudflare Workers as a proxy, add CORS headers in the worker:

```javascript
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://docs.eco-balance.cc',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

// Handle OPTIONS preflight
if (request.method === 'OPTIONS') {
  return new Response(null, { headers: corsHeaders });
}

// Add CORS headers to all responses
const response = await fetch(meilisearchUrl, {
  method: request.method,
  headers: request.headers,
  body: request.body,
});

return new Response(response.body, {
  status: response.status,
  headers: { ...corsHeaders, ...response.headers },
});
```

## Testing

After configuring CORS, test with:

```bash
curl -X OPTIONS https://search.eco-balance.cc/health \
  -H "Origin: https://docs.eco-balance.cc" \
  -H "Access-Control-Request-Method: GET" \
  -v
```

You should see:
```
< HTTP/1.1 204 No Content
< Access-Control-Allow-Origin: https://docs.eco-balance.cc
< Access-Control-Allow-Methods: GET, POST, OPTIONS
```

## Current Status

- ✅ Search bar code is correct
- ✅ Search functionality works (when CORS is fixed)
- ❌ CORS headers missing on Meilisearch server
- ⚠️  This needs to be fixed on the server side

## Next Steps

1. **Identify your Meilisearch setup:**
   - Direct Meilisearch instance?
   - Behind Nginx Proxy Manager?
   - Behind Cloudflare Workers?
   - Docker container?

2. **Apply the appropriate CORS configuration** from the options above

3. **Test the search** on https://docs.eco-balance.cc after fixing CORS

4. **Verify** the deployment tests pass without CORS errors

