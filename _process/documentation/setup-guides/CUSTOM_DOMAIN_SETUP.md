# Custom Domain Setup for GitHub Pages

**Custom Domain:** `docs.eco-balance.cc`  
**Purpose:** Set up custom domain for documentation site

---

## DNS Configuration (Cloudflare)

### CNAME Record

Create a CNAME record in your Cloudflare DNS:

| Type | Name | Target | Proxy Status |
|------|------|--------|--------------|
| CNAME | `docs` | `presiannedyalkov.github.io` | DNS only (gray cloud) |

**Important:** 
- Use **DNS only** (gray cloud) initially for DNS verification
- After verification, you can enable proxy (orange cloud) if desired
- Do NOT use proxy during initial setup

---

## GitHub Configuration

### Step 1: Add Custom Domain in GitHub

1. Go to your repository: `presiannedyalkov/eco-balance-documentation`
2. Navigate to: **Settings → Pages**
3. Under **Custom domain**, enter: `docs.eco-balance.cc`
4. Click **Save**

### Step 2: Verify Domain

GitHub will automatically:
- Create a CNAME file in your repository
- Verify the DNS record
- Enable HTTPS (may take a few minutes)

**Verification process:**
- GitHub checks for CNAME record pointing to `presiannedyalkov.github.io`
- Once verified, HTTPS certificate is automatically provisioned
- This can take 5-60 minutes

---

## Docusaurus Configuration Update

When using a custom domain, you need to update the `baseUrl`:

**Current (project pages):**
```javascript
baseUrl: '/eco-balance-documentation/'
```

**With custom domain:**
```javascript
baseUrl: '/'
```

This is because custom domains serve at the root, not under `/eco-balance-documentation/`.

---

## Complete Setup Steps

### 1. Create DNS Record (Cloudflare)

1. Log in to Cloudflare
2. Select domain: `eco-balance.cc`
3. Go to **DNS → Records**
4. Click **Add record**
5. Configure:
   - **Type:** CNAME
   - **Name:** `docs`
   - **Target:** `presiannedyalkov.github.io`
   - **Proxy status:** DNS only (gray cloud)
6. Click **Save**

### 2. Add Domain in GitHub

1. Repository → **Settings → Pages**
2. **Custom domain:** `docs.eco-balance.cc`
3. Click **Save**
4. Wait for verification (check indicator)

### 3. Update Docusaurus Config

Update `docusaurus.config.js`:
```javascript
baseUrl: process.env.BASE_URL || (process.env.NODE_ENV === 'production' ? '/' : '/'),
```

Or for custom domain specifically:
```javascript
baseUrl: '/',
```

### 4. Update Deploy Workflow

Update `.github/workflows/deploy.yml`:
```yaml
env:
  NODE_ENV: production
  NODE_OPTIONS: '--max-old-space-size=4096'
  BASE_URL: '/'  # Changed from '/eco-balance-documentation/'
```

### 5. Wait for HTTPS

- GitHub automatically provisions SSL certificate
- Usually takes 5-60 minutes
- Check status in repository Settings → Pages

### 6. (Optional) Enable Cloudflare Proxy

After verification:
1. Go to Cloudflare DNS
2. Change `docs` CNAME record
3. Enable **Proxy** (orange cloud)
4. This adds DDoS protection and caching

---

## Verification Checklist

- [ ] CNAME record created in Cloudflare
- [ ] DNS record points to `presiannedyalkov.github.io`
- [ ] Custom domain added in GitHub Pages settings
- [ ] Domain verified (green checkmark in GitHub)
- [ ] HTTPS enabled (lock icon in browser)
- [ ] `baseUrl` updated in `docusaurus.config.js`
- [ ] Deploy workflow updated with new `BASE_URL`
- [ ] Site accessible at `https://docs.eco-balance.cc`

---

## Troubleshooting

### Domain Not Verifying

1. **Check DNS propagation:**
   ```bash
   dig docs.eco-balance.cc CNAME
   # Should return: presiannedyalkov.github.io
   ```

2. **Verify CNAME record:**
   - Must point to `presiannedyalkov.github.io` (not `www` version)
   - Must be CNAME, not A record
   - Wait 5-10 minutes for DNS propagation

3. **Check GitHub Pages settings:**
   - Custom domain should show as "Verified"
   - If not, remove and re-add

### HTTPS Not Working

- Wait 5-60 minutes for certificate provisioning
- Check GitHub Pages settings for certificate status
- Ensure DNS is pointing correctly

### Site Shows 404

- Verify `baseUrl` is set to `/` in `docusaurus.config.js`
- Rebuild and redeploy the site
- Clear browser cache

### Mixed Content Warnings

- Ensure all assets use HTTPS
- Check that `baseUrl` is correct
- Verify all links are relative or use HTTPS

---

## DNS Record Details

**For Cloudflare:**

```
Type: CNAME
Name: docs
Content: presiannedyalkov.github.io
Proxy: Off (DNS only) - initially
TTL: Auto
```

**After verification, you can:**
- Enable Proxy (orange cloud) for DDoS protection
- Keep DNS only (gray cloud) for direct connection

---

## References

- [GitHub Pages Custom Domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)
- [Managing Custom Domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

---

**Last Updated:** November 16, 2025

