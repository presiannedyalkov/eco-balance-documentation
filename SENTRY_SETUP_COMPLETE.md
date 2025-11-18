# Sentry Integration - Setup Guide

This guide will help you complete the Sentry integration for your Docusaurus documentation site.

## ✅ What's Already Done

- ✅ Sentry packages installed (`@sentry/react`, `@sentry/webpack-plugin`)
- ✅ Sentry initialization component created (`src/components/SentryInit.js`)
- ✅ Error boundary component created (`src/components/SentryErrorBoundary.js`)
- ✅ Sentry integrated into client modules
- ✅ Release workflow created (`.github/workflows/sentry-release.yml`)
- ✅ Build workflow updated to pass Sentry environment variables

## 📋 What You Need to Do

### Step 1: Create a Sentry Project

1. **Go to Sentry Dashboard**
   - Visit: https://sentry.io/
   - Log in to your account

2. **Create a New Project**
   - Click **"Create Project"** or go to: https://sentry.io/organizations/[your-org]/projects/new/
   - Select **"React"** as the platform
   - Project name: `eco-balance-documentation` (or your preferred name)
   - Click **"Create Project"**

3. **Get Your DSN**
   - After creating the project, you'll see the **DSN** (Data Source Name)
   - It looks like: `https://xxxxx@xxxxx.ingest.sentry.io/xxxxx`
   - **Copy this DSN** - you'll need it in the next step

### Step 2: Get Your Organization and Project Slugs

1. **Organization Slug**
   - Go to: https://sentry.io/settings/organizations/
   - Find your organization
   - The slug is in the URL: `https://sentry.io/organizations/[ORG-SLUG]/`
   - **Copy the ORG-SLUG**

2. **Project Slug**
   - Go to your project settings: https://sentry.io/settings/[ORG-SLUG]/projects/[PROJECT-SLUG]/
   - The slug is in the URL: `[PROJECT-SLUG]`
   - **Copy the PROJECT-SLUG**

### Step 3: Create an Auth Token

1. **Go to Auth Tokens**
   - Visit: https://sentry.io/settings/account/api/auth-tokens/
   - Click **"Create New Token"**

2. **Configure Token**
   - Name: `eco-balance-documentation-releases` (or your preferred name)
   - Scopes needed:
     - ✅ `project:read`
     - ✅ `project:releases`
     - ✅ `org:read`
   - Click **"Create Token"**

3. **Copy the Token**
   - **Important:** Copy the token immediately - you won't be able to see it again!
   - It looks like: `sntrys_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Step 4: Add GitHub Secrets

1. **Go to Repository Settings**
   - Visit: https://github.com/presiannedyalkov/eco-balance-documentation/settings/secrets/actions

2. **Add the Following Secrets:**

   Click **"New repository secret"** for each:

   - **Name:** `SENTRY_DSN`
     - **Value:** Your DSN from Step 1
     - Example: `https://xxxxx@xxxxx.ingest.sentry.io/xxxxx`

   - **Name:** `SENTRY_ORG`
     - **Value:** Your organization slug from Step 2
     - Example: `my-org`

   - **Name:** `SENTRY_PROJECT`
     - **Value:** Your project slug from Step 2
     - Example: `eco-balance-documentation`

   - **Name:** `SENTRY_AUTH_TOKEN`
     - **Value:** Your auth token from Step 3
     - Example: `sntrys_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Step 5: Test the Integration

1. **Trigger a Deployment**
   - Push a commit to `main` branch, or
   - Manually trigger the workflow: Actions → Deploy to GitHub Pages → Run workflow

2. **Check Sentry Dashboard**
   - Go to your Sentry project: https://sentry.io/organizations/[ORG]/projects/[PROJECT]/
   - You should see:
     - A new release created (with the git commit SHA)
     - Source maps uploaded (if build completed successfully)

3. **Test Error Tracking**
   - Visit your deployed site: https://docs.eco-balance.cc/
   - Open browser console (F12)
   - Run: `throw new Error('Test Sentry integration')`
   - Check Sentry dashboard - you should see the error appear within a few seconds

## 🎯 How It Works

### Error Tracking
- Automatically catches JavaScript errors in production
- Includes stack traces, browser info, and user context
- Errors appear in your Sentry dashboard

### Source Maps
- Source maps are uploaded during deployment
- Better error tracking with original source code
- Automatically linked to releases

### Releases
- Each deployment creates a Sentry release
- Links errors to specific git commits
- Helps track which version has issues

### Performance Monitoring
- Tracks page load times (10% sample rate)
- Monitors API calls
- Session replay for error sessions (100% of errors)

## 🔧 Configuration

### Adjust Sample Rates

Edit `src/components/SentryInit.js`:

```javascript
tracesSampleRate: 0.1,              // 10% of transactions
replaysSessionSampleRate: 0.1,      // 10% of sessions
replaysOnErrorSampleRate: 1.0,      // 100% of error sessions
```

### Disable in Development

Sentry is automatically disabled in development mode (won't send errors).

### Add Custom Context

Edit `src/components/SentryInit.js` in the `beforeSend` function to add:
- User information
- Custom tags
- Additional context

## 🐛 Troubleshooting

### Sentry Not Working

1. **Check DSN is set correctly**
   - Verify `SENTRY_DSN` secret exists
   - Check DSN format (should start with `https://`)

2. **Check browser console**
   - Look for `✅ [Sentry] Initialized successfully`
   - If you see `ℹ️ [Sentry] DSN not configured`, the secret isn't being passed correctly

3. **Verify project is active**
   - Check Sentry dashboard that project exists and is active

### Source Maps Not Uploading

1. **Check auth token permissions**
   - Verify `SENTRY_AUTH_TOKEN` has `project:releases` scope
   - Token must have access to the project

2. **Check organization and project slugs**
   - Verify `SENTRY_ORG` and `SENTRY_PROJECT` match your Sentry project
   - Check for typos or extra spaces

3. **Check workflow logs**
   - Go to Actions → Sentry Release
   - Look for errors in the logs

### No Errors Appearing

1. **Verify production mode**
   - Sentry only works in production (`NODE_ENV=production`)
   - Check that deployed site is in production mode

2. **Check DSN is exposed**
   - The DSN needs to be available in the browser
   - Check that `SENTRY_DSN` is set in build environment

## 📚 Resources

- [Sentry React Documentation](https://docs.sentry.io/platforms/javascript/guides/react/)
- [Sentry Docusaurus Integration](https://docs.sentry.io/platforms/javascript/guides/react/guides/docusaurus/)
- [Sentry Release Management](https://docs.sentry.io/product/releases/)

---

**Last Updated:** November 17, 2025

