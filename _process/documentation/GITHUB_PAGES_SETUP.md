# GitHub Pages Deployment Setup Guide

**Status:** ✅ Active - Monthly Release System  
**Created:** November 2025  
**Updated:** December 2025  
**Purpose:** Guide for GitHub Pages deployment with monthly release system

---

## ✅ What's Already Done

1. **Docusaurus Configuration**
   - ✅ Updated `docusaurus.config.js` with correct repository information
   - ✅ Set production URL: `https://docs.eco-balance.cc`
   - ✅ Configured base URL: `/eco-balance-documentation/`
   - ✅ Updated all GitHub links to point to correct repository

2. **GitHub Actions Workflows**
   - ✅ Created `.github/workflows/deploy.yml`
     - **Deployment Model:** Monthly releases (triggers only when `VERSION` file changes)
     - ✅ Supports manual trigger (`workflow_dispatch`)
     - ✅ Supports `workflow_call` for integration
   - ✅ Created `.github/workflows/monthly-release.yml`
     - **Schedule:** Automatic releases on last day of each month at 23:59 UTC
     - **Features:** Version calculation, changelog generation, release notes
   - ✅ Enhanced `.github/workflows/release-automation.yml`
     - **Trigger:** When `VERSION` file changes
     - **Features:** Comprehensive changelogs with statistics
   - ✅ Uses latest GitHub Actions (v6 for checkout, v5 for upload-artifact)
   - ✅ Includes proper permissions for Pages deployment

3. **Build Configuration**
   - ✅ Node.js 18 specified
   - ✅ NPM caching enabled
   - ✅ Production build configured

---

## 🔧 What Needs to Be Done

### Step 1: Enable GitHub Pages in Repository Settings

1. Go to your repository on GitHub: `https://github.com/presiannedyalkov/eco-balance-documentation`
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - **Source:** `GitHub Actions`
   - This enables the workflow to deploy automatically

### Step 2: Verify Workflow Permissions

The workflow file already includes the necessary permissions:
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

If you encounter permission issues:
1. Go to **Settings** → **Actions** → **General**
2. Under **Workflow permissions**, ensure:
   - ✅ "Read and write permissions" is selected
   - ✅ "Allow GitHub Actions to create and approve pull requests" is checked (if needed)

### Step 3: Understanding Monthly Releases

**Important:** The deployment system uses **monthly scheduled releases**:

- **Automatic Releases:** Happen on the last day of each month at 23:59 UTC
- **Manual Triggers:** Available via GitHub Actions UI for urgent updates
- **Deployment:** Only occurs when `VERSION` file changes (during monthly releases)
- **Changes During Month:** All changes accumulate and deploy together at month end

**Triggering Deployment:**

**Option A: Wait for automatic monthly release**
- First release: End of December 2025
- Subsequent releases: Last day of each month

**Option B: Manual monthly release trigger**
1. Go to **Actions** tab in your repository
2. Select **Monthly Release** workflow
3. Click **Run workflow** → **Run workflow**
4. Optionally specify version or force flag

**Option C: Manual deployment trigger (for urgent updates)**
1. Go to **Actions** tab in your repository
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow** → **Run workflow**

For detailed information, see: [Monthly Release Process Guide](MONTHLY_RELEASE_PROCESS.md)

---

## 📍 Deployment URL

Once deployed, your documentation will be available at:
**https://docs.eco-balance.cc/**

---

## 🔍 Verifying Deployment

### Check Workflow Status
1. Go to **Actions** tab in your repository
2. You should see the "Deploy to GitHub Pages" workflow running
3. Click on it to see detailed logs

### Check Pages Status
1. Go to **Settings** → **Pages**
2. You should see:
   - **Source:** GitHub Actions
   - **Status:** Active (green checkmark)
   - **URL:** Your site URL

### Test the Site
1. Visit: `https://docs.eco-balance.cc/`
2. Verify all pages load correctly
3. Test navigation and search functionality

---

## 🐛 Troubleshooting

### Workflow Fails

**Error: "Permission denied"**
- Check repository settings → Actions → General → Workflow permissions
- Ensure "Read and write permissions" is enabled

**Error: "Pages build failed"**
- Check the workflow logs in the Actions tab
- Common issues:
  - Build errors (check Docusaurus build locally: `npm run build`)
  - Missing dependencies (should be handled by `npm ci`)
  - Node version mismatch (workflow uses Node 18)

**Error: "No such file or directory: build"**
- The build step failed before deployment
- Check build logs for errors
- Test build locally: `npm run build`

### Site Not Accessible

**404 Error**
- Wait a few minutes after deployment (GitHub Pages can take 1-5 minutes to update)
- Clear browser cache
- Check that the base URL in `docusaurus.config.js` matches your repository name

**Wrong Base URL**
- If using project pages (repo name in URL), base URL should be `/eco-balance-documentation/`
- If using user/organization pages, base URL should be `/`
- Current config uses `/eco-balance-documentation/` which is correct for project pages

### Build Works Locally But Fails in GitHub Actions

- Check Node.js version (workflow uses 18, ensure compatibility)
- Verify all dependencies are in `package.json` (not just `package-lock.json`)
- Check for platform-specific issues (Windows vs Linux)

---

## 🔄 Monthly Release Process

The site now updates through **monthly scheduled releases**:

### Automatic Monthly Release Flow

1. **Last Day of Month (23:59 UTC):**
   - Monthly release workflow runs automatically
   - Calculates next version (YYYY-MM format)
   - Checks for changes since last release
   - Generates comprehensive changelog
   - Creates release notes in `_versions/vYYYY.MM/RELEASE_NOTES.md`
   - Updates `VERSION` file

2. **VERSION File Change:**
   - Triggers deployment workflow automatically
   - Builds Docusaurus site
   - Deploys to GitHub Pages

3. **Release Creation:**
   - Release automation workflow creates GitHub release
   - Includes changelog, statistics, and diff links
   - Creates git tag (vYYYY-MM format)

**Typical deployment time:** 2-5 minutes  
**Release frequency:** Once per month (end of month)

### Changes During the Month

- All changes to `main` branch accumulate during the month
- No deployment happens until the monthly release
- Monthly release batches all changes together
- Comprehensive changelog shows all changes since last release

For more details, see: [Monthly Release Process Guide](MONTHLY_RELEASE_PROCESS.md)

---

## 📝 Next Steps After Deployment

1. ✅ Verify site is accessible
2. ✅ Test all navigation links
3. ✅ Verify search functionality works
4. ✅ Check mobile responsiveness
5. ✅ Update README.md with live site link
6. ✅ Share the site URL with stakeholders

---

## 🔗 Related Documents

- [Monthly Release Process Guide](MONTHLY_RELEASE_PROCESS.md) - **NEW:** Complete guide to monthly releases
- [Versioning Concepts](VERSIONING_CONCEPTS.md) - Understanding monthly vs daily versions
- [Monthly Release Strategy](MONTHLY_RELEASE_STRATEGY.md) - Strategy document
- [Monthly Release Implementation](MONTHLY_RELEASE_IMPLEMENTATION.md) - Implementation details
- [Feature Wishlist](FEATURE_WISHLIST.md) - Original feature request
- [Documentation Site Plan](../planning/DOCUMENTATION_SITE_PLAN.md) - Implementation plan
- [Wishlist Review](WISHLIST_REVIEW_2025-11.md) - Status review findings

---

## 📞 Support

If you encounter issues:
1. Check the workflow logs in GitHub Actions
2. Review this troubleshooting section
3. Test build locally: `npm run build`
4. Check Docusaurus documentation: https://docusaurus.io/docs/deployment
5. Review monthly release logs if deployment doesn't trigger

---

**Last Updated:** December 2025 (Updated to reflect monthly release system)

