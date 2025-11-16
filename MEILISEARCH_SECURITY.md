# Meilisearch Security Guide

**Purpose:** Secure your self-hosted Meilisearch instance when exposing via Cloudflare subdomain  
**Status:** Security recommendations

---

## Security Concerns

### ⚠️ Risks of Direct Exposure

1. **Unauthorized Access**
   - Anyone with the URL can access your Meilisearch instance
   - Search-only keys can be extracted from frontend code
   - Potential for abuse (excessive queries, scraping)

2. **Data Exposure**
   - Indexed content is accessible
   - Metadata and document structure visible
   - Potential for information disclosure

3. **Resource Abuse**
   - No rate limiting by default
   - DDoS vulnerability
   - High bandwidth usage

4. **Key Exposure**
   - Search keys in frontend JavaScript are visible
   - Master key must NEVER be exposed

---

## Security Recommendations

### ✅ Option 1: Cloudflare Proxy + Rate Limiting (Recommended)

**Setup:**
1. **Enable Cloudflare Proxy (Orange Cloud)**
   - This hides your server IP
   - Provides DDoS protection
   - Enables Cloudflare security features

2. **Configure Rate Limiting**
   - Go to Cloudflare Dashboard → Security → Rate Limiting
   - Create rule: Limit requests per IP
   - Example: 100 requests per minute per IP

3. **Use Search-Only Key**
   - Create a search-only API key in Meilisearch
   - This key can only search, not modify data
   - Still visible in frontend, but limited permissions

4. **IP Access Rules (Optional)**
   - Restrict to specific IPs if needed
   - Or use Cloudflare Access for authentication

**Security Level:** ⭐⭐⭐ (Good for public documentation)

---

### ✅ Option 2: Cloudflare Access (Best Security)

**Setup:**
1. **Enable Cloudflare Access**
   - Requires authentication before accessing Meilisearch
   - Can use email, SSO, or API tokens

2. **Configure Access Policy**
   - Only allow authenticated requests
   - Can restrict to specific users/emails

3. **Use in Frontend**
   - Frontend gets access token
   - Token included in requests to Meilisearch

**Security Level:** ⭐⭐⭐⭐⭐ (Excellent, but requires user auth)

**Best for:** Private/internal documentation

---

### ✅ Option 3: Backend Proxy (Most Secure)

**Setup:**
1. **Create Backend API Endpoint**
   - Your server acts as proxy
   - Frontend calls your API, not Meilisearch directly
   - Your API calls Meilisearch with master key

2. **Benefits:**
   - Master key never exposed
   - Full control over rate limiting
   - Can add authentication
   - Can filter/modify queries

3. **Implementation:**
   - Simple Express.js endpoint
   - Or use Cloudflare Workers
   - Or use GitHub Pages Functions (if available)

**Security Level:** ⭐⭐⭐⭐⭐ (Excellent)

**Best for:** Maximum security, full control

---

### ✅ Option 4: Cloudflare Workers Proxy (Recommended for Public)

**Setup:**
1. **Create Cloudflare Worker**
   - Acts as proxy between frontend and Meilisearch
   - Worker has master key (server-side only)
   - Frontend only calls Worker

2. **Benefits:**
   - Master key never exposed
   - Can add rate limiting
   - Can add request validation
   - Free tier available

3. **Example Worker:**
   ```javascript
   addEventListener('fetch', event => {
     event.respondWith(handleRequest(event.request))
   })

   async function handleRequest(request) {
     // Validate request
     // Add rate limiting
     // Proxy to Meilisearch with master key
     const response = await fetch('http://your-meilisearch:7700/indexes/docs/search', {
       method: 'POST',
       headers: {
         'Authorization': `Bearer ${MASTER_KEY}`,
         'Content-Type': 'application/json',
       },
       body: await request.text(),
     })
     return response
   }
   ```

**Security Level:** ⭐⭐⭐⭐ (Very Good)

**Best for:** Public documentation with good security

---

## Recommended Setup for Your Use Case

### For Public Documentation Site:

**Use: Cloudflare Proxy + Search-Only Key + Rate Limiting**

1. **Create Search-Only Key in Meilisearch:**
   ```bash
   curl -X POST 'http://your-meilisearch:7700/keys' \
     -H 'Authorization: Bearer YOUR_MASTER_KEY' \
     -H 'Content-Type: application/json' \
     --data-binary '{
       "description": "Public search key",
       "actions": ["search"],
       "indexes": ["eco-balance-docs"],
       "expiresAt": null
     }'
   ```

2. **Enable Cloudflare Proxy:**
   - Add subdomain to Cloudflare
   - Enable "Proxy" (orange cloud)
   - This hides your server IP

3. **Configure Rate Limiting:**
   - Cloudflare Dashboard → Security → Rate Limiting
   - Rule: Limit to 100 requests/minute per IP
   - Action: Challenge or Block

4. **Use Search-Only Key in Frontend:**
   - Key is visible in JavaScript (acceptable for search-only)
   - Can only search, cannot modify data
   - Rate limiting prevents abuse

**Security Assessment:**
- ✅ Search-only key (limited permissions)
- ✅ Cloudflare proxy (hides IP, DDoS protection)
- ✅ Rate limiting (prevents abuse)
- ⚠️ Key visible in frontend (acceptable for search-only)
- ⚠️ No authentication (public access)

**Risk Level:** Low to Medium (acceptable for public documentation)

---

## Additional Security Measures

### 1. Firewall Rules
- Only allow Cloudflare IPs to access Meilisearch
- Block direct access from internet
- Use Cloudflare IP ranges: https://www.cloudflare.com/ips/

### 2. Meilisearch Configuration
- Disable admin endpoints on public interface
- Use separate admin interface on different port
- Enable HTTPS only

### 3. Monitoring
- Monitor request patterns
- Set up alerts for unusual activity
- Track rate limit hits

### 4. Index Security
- Only index public content
- Don't index sensitive information
- Use separate indexes for different access levels

---

## Comparison

| Method | Security | Complexity | Cost | Best For |
|--------|----------|------------|------|----------|
| Direct + Search Key | ⭐⭐ | Low | Free | Testing only |
| Cloudflare Proxy + Rate Limit | ⭐⭐⭐ | Low | Free | Public docs |
| Cloudflare Access | ⭐⭐⭐⭐⭐ | Medium | Paid | Private docs |
| Backend Proxy | ⭐⭐⭐⭐⭐ | High | Free | Maximum security |
| Cloudflare Workers | ⭐⭐⭐⭐ | Medium | Free | Public docs (best) |

---

## Recommendation

**For your public documentation site:**

1. **Use Cloudflare Workers Proxy** (if you want best security)
   - Master key stays server-side
   - Can add rate limiting
   - Free tier available

2. **OR Use Cloudflare Proxy + Search-Only Key** (simpler)
   - Enable Cloudflare proxy
   - Add rate limiting
   - Use search-only key
   - Acceptable security for public docs

**Both are secure enough for public documentation.** The Workers approach is more secure but requires more setup.

---

## Implementation Steps

### Option A: Cloudflare Proxy + Search Key (Simpler)

1. Add subdomain to Cloudflare (e.g., `search.yourdomain.com`)
2. Enable Proxy (orange cloud)
3. Point to your Meilisearch instance
4. Create search-only key in Meilisearch
5. Configure rate limiting in Cloudflare
6. Use search-only key in frontend

### Option B: Cloudflare Workers (More Secure)

1. Create Cloudflare Worker
2. Add Meilisearch master key as Worker secret
3. Worker proxies requests to Meilisearch
4. Frontend calls Worker endpoint
5. Configure rate limiting in Worker or Cloudflare

---

## Testing Security

After setup, test:
1. Try accessing Meilisearch directly (should be blocked or rate-limited)
2. Try excessive requests (should be rate-limited)
3. Check that master key is not exposed
4. Verify search-only key works but cannot modify data

---

**Last Updated:** November 16, 2025

