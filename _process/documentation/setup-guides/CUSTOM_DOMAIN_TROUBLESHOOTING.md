# Custom Domain Troubleshooting

**Issue:** Site shows wrong baseUrl error after configuring custom domain

---

## Quick Fix

After updating GitHub Variables, you need to trigger a new build:

### Option 1: Manual Workflow Trigger (Fastest)

1. Go to: **Actions** tab in GitHub
2. Select: **Deploy to GitHub Pages** workflow
3. Click: **Run workflow** button
4. Select branch: `main`
5. Click: **Run workflow**

This will immediately trigger a new build with the updated variables.

### Option 2: Make a Small Change

Make any small change to trigger the workflow:
- Update a file
- Add a comment
- Commit and push

The workflow will automatically run.

---

## Verify Variables Are Set

1. Go to: **Settings → Secrets and variables → Actions → Variables**
2. Verify these variables exist:
   - `CUSTOM_DOMAIN_BASE_URL` = `/`
   - `CUSTOM_DOMAIN_URL` = `https://docs.eco-balance.cc`

---

## Check Build Logs

After triggering the build:

1. Go to: **Actions** tab
2. Click on the latest workflow run
3. Check the "Build website" step
4. Look for: `BASE_URL: /` (should show `/` not `/eco-balance-documentation/`)

If it still shows `/eco-balance-documentation/`, the variables aren't being read correctly.

---

## Common Issues

### Variables Not Found

**Symptom:** Build still uses `/eco-balance-documentation/`

**Fix:**
- Ensure variables are set at **Repository** level (not organization)
- Variable names must match exactly: `CUSTOM_DOMAIN_BASE_URL` and `CUSTOM_DOMAIN_URL`
- Variables are case-sensitive

### Build Not Triggering

**Symptom:** No new build after updating variables

**Fix:**
- Manually trigger workflow (see Option 1 above)
- Or make a commit to trigger automatic build

### Still Shows Old baseUrl

**Symptom:** Site still shows error about `/eco-balance-documentation/`

**Fix:**
1. Clear browser cache
2. Wait for build to complete (check Actions tab)
3. Verify build used correct BASE_URL (check logs)
4. Try incognito/private browsing mode

---

## Expected Build Output

When build runs correctly, you should see in logs:

```
Building Docusaurus site...
NODE_ENV: production
BASE_URL: /
SITE_URL: https://docs.eco-balance.cc
```

If you see:
```
BASE_URL: /eco-balance-documentation/
```

Then variables aren't being read. Check variable names and repository level.

---

## After Build Completes

1. Wait for deployment (usually 1-2 minutes)
2. Visit: `https://docs.eco-balance.cc`
3. Should load without baseUrl error
4. All links should work correctly

---

**Last Updated:** November 16, 2025

