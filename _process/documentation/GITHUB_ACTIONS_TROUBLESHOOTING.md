# GitHub Actions Troubleshooting Guide

**Purpose:** Diagnose and fix GitHub Actions deployment errors  
**Created:** November 2025

---

## Quick Check Script

Use the provided script to check workflow status:

```bash
GITHUB_TOKEN=your_token node scripts/check-github-actions.js
```

**Token Requirements:**
- Create at: https://github.com/settings/tokens
- Scopes needed: `repo`, `actions:read`

---

## Common Errors & Fixes

### 1. "Permission denied" or "403 Forbidden"

**Cause:** Missing or insufficient permissions

**Fix:**
1. Go to: `Settings` → `Actions` → `General`
2. Under "Workflow permissions", select:
   - ✅ "Read and write permissions"
   - ✅ "Allow GitHub Actions to create and approve pull requests"

### 2. "No such file or directory: build"

**Cause:** Build step failed before deployment

**Fix:**
- Check build logs in Actions tab
- Test locally: `npm run build`
- Verify `package.json` has all dependencies
- Check Node.js version compatibility

### 3. "Pages build failed"

**Cause:** Build errors in Docusaurus

**Common Issues:**
- Missing dependencies
- Broken markdown links
- Configuration errors
- Node version mismatch

**Fix:**
1. Test build locally:
   ```bash
   npm ci
   npm run build
   ```
2. Fix any errors shown
3. Check for broken links: `npm run test:links`

### 4. "Error: Resource not accessible by integration"

**Cause:** GitHub Pages not enabled or wrong source selected

**Fix:**
1. Go to: `Settings` → `Pages`
2. Under "Source", select: **GitHub Actions**
3. Save settings

### 5. "Workflow run failed" (no specific error)

**Cause:** Various - check logs

**Fix:**
1. Go to Actions tab
2. Click on failed workflow run
3. Expand each step to see error details
4. Look for red X marks indicating failed steps

---

## Workflow File Checks

### Verify Permissions

The workflow should have:
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

### Verify Steps

All steps should be present:
1. ✅ Checkout
2. ✅ Setup Node.js
3. ✅ Install dependencies (`npm ci`)
4. ✅ Build website (`npm run build`)
5. ✅ Setup Pages
6. ✅ Upload artifact
7. ✅ Deploy to GitHub Pages

---

## Testing Locally

Before pushing, test the build:

```bash
# Install dependencies
npm ci

# Build the site
npm run build

# Check for broken links
npm run test:links

# Test build output
npm run serve
```

---

## Getting Help

1. **Check Actions Logs:**
   - Go to Actions tab
   - Click on failed workflow
   - Expand failed steps
   - Copy error messages

2. **Use Debug Logging:**
   - Go to: `Settings` → `Secrets and variables` → `Actions`
   - Add secret: `ACTIONS_STEP_DEBUG` = `true`
   - Add secret: `ACTIONS_RUNNER_DEBUG` = `true`
   - Re-run workflow

3. **Share Error Details:**
   - Copy the error message from Actions logs
   - Share which step failed
   - Include any relevant log excerpts

---

## Quick Fixes Checklist

- [ ] GitHub Pages enabled with "GitHub Actions" as source
- [ ] Workflow permissions set to "Read and write"
- [ ] Build works locally (`npm run build`)
- [ ] No broken links (`npm run test:links`)
- [ ] All dependencies in `package.json`
- [ ] Node.js version matches (18.x)
- [ ] `docusaurus.config.js` has correct repository info

---

**Last Updated:** November 2025

