# Sentry Setup Guide

**Purpose:** Error tracking for Docusaurus documentation site  
**Status:** Ready to configure

---

## Quick Setup

Since you already have a Sentry account, setup is straightforward:

### Step 1: Get Your Sentry DSN

1. Go to your Sentry project (or create a new one for this documentation)
2. Navigate to: **Settings → Client Keys (DSN)**
3. Copy the **DSN** (looks like: `https://xxxxx@xxxxx.ingest.sentry.io/xxxxx`)

### Step 2: Add GitHub Secrets

Add these secrets to your repository:

1. Go to: **Repository Settings → Secrets and variables → Actions**
2. Add the following secrets:

   - **`SENTRY_DSN`** - Your Sentry DSN (from Step 1)
   - **`SENTRY_ORG`** - Your Sentry organization slug
   - **`SENTRY_PROJECT`** - Your Sentry project slug
   - **`SENTRY_AUTH_TOKEN`** - Create at: Sentry → Settings → Auth Tokens

### Step 3: Create Auth Token (if needed)

1. Go to Sentry → **Settings → Auth Tokens**
2. Click **Create New Token**
3. Scopes needed:
   - `project:read`
   - `project:releases`
   - `org:read`
4. Copy the token and add as `SENTRY_AUTH_TOKEN` secret

### Step 4: Update Build Configuration

The Sentry integration is already configured. It will:
- Automatically track errors in production
- Upload source maps for better error tracking
- Create releases on each deployment
- Track performance (10% sample rate)

### Step 5: Test

1. Deploy the site
2. Check Sentry dashboard for the new project
3. Errors will automatically appear in Sentry

---

## What's Already Configured

✅ **Sentry SDK** - Added to `package.json`  
✅ **Error Boundary** - Created in `src/components/SentryErrorBoundary.js`  
✅ **Client Module** - Created in `website/clientModules.js`  
✅ **Release Workflow** - Created in `.github/workflows/sentry-release.yml`  
✅ **Docusaurus Plugin** - Configured in `docusaurus.config.js`

---

## How It Works

1. **Error Tracking:**
   - Sentry automatically catches JavaScript errors
   - Errors are sent to your Sentry project
   - Includes stack traces, user context, and browser info

2. **Source Maps:**
   - Source maps are uploaded during build
   - Better error tracking with original source code
   - Automatically linked to releases

3. **Releases:**
   - Each deployment creates a Sentry release
   - Links errors to specific deployments
   - Helps track which version has issues

4. **Performance Monitoring:**
   - Tracks page load times
   - Monitors API calls
   - 10% sample rate (configurable)

---

## Configuration Options

### Disable in Development

Sentry is automatically disabled in development mode (won't send errors).

### Adjust Sample Rates

Edit `src/components/SentryInit.js`:
- `tracesSampleRate: 0.1` - 10% of transactions
- `replaysSessionSampleRate: 0.1` - 10% of sessions
- `replaysOnErrorSampleRate: 1.0` - 100% of error sessions

### Add Custom Context

Edit `src/components/SentryInit.js` to add:
- User information
- Custom tags
- Additional context

---

## Troubleshooting

### Sentry Not Working

1. Check that `SENTRY_DSN` secret is set correctly
2. Verify DSN format (should start with `https://`)
3. Check browser console for Sentry initialization messages
4. Verify Sentry project is active

### Source Maps Not Uploading

1. Check `SENTRY_AUTH_TOKEN` has correct permissions
2. Verify `SENTRY_ORG` and `SENTRY_PROJECT` are correct
3. Check workflow logs for upload errors

---

**Last Updated:** November 16, 2025

