# GitHub Pages Deployment Setup Guide

**Status:** Ready for Configuration  
**Created:** November 2025  
**Purpose:** Guide for completing GitHub Pages deployment setup

---

## ✅ What's Already Done

1. **Docusaurus Configuration**
   - ✅ Updated `docusaurus.config.js` with correct repository information
   - ✅ Set production URL: `https://docs.eco-balance.cc`
   - ✅ Configured base URL: `/eco-balance-documentation/`
   - ✅ Updated all GitHub links to point to correct repository

2. **GitHub Actions Workflow**
   - ✅ Created `.github/workflows/deploy.yml`
   - ✅ Configured to deploy on push to `main` branch
   - ✅ Uses GitHub Pages deployment action (v4)
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

### Step 3: Trigger First Deployment

Once GitHub Pages is enabled, you can trigger deployment in one of two ways:

**Option A: Push to main branch (automatic)**
```bash
git add .
git commit -m "Set up GitHub Pages deployment"
git push origin main
```

**Option B: Manual trigger via GitHub UI**
1. Go to **Actions** tab in your repository
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow** → **Run workflow**

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

## 🔄 Automatic Updates

Once set up, the site will automatically update whenever you:
- Push changes to the `main` branch
- Merge a pull request to `main`

The workflow will:
1. Checkout the code
2. Install dependencies
3. Build the Docusaurus site
4. Deploy to GitHub Pages

**Typical deployment time:** 2-5 minutes

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

---

**Last Updated:** November 2025

