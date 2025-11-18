# Sentry Integration Status

**Status:** ✅ **Configured and Ready**

## ✅ What's Done

1. **Sentry Project Created**
   - Project: `eco-balance-documentation`
   - Organization: `presian-nedyalkov`
   - Region: German (de.sentry.io)

2. **GitHub Secrets Added**
   - ✅ `SENTRY_DSN` - Added
   - ✅ `SENTRY_ORG` - Added (`presian-nedyalkov`)
   - ✅ `SENTRY_PROJECT` - Added (`eco-balance-documentation`)
   - ✅ `SENTRY_AUTH_TOKEN` - Added (org:ci scope)

3. **Code Integration**
   - ✅ Sentry SDK installed (`@sentry/react`)
   - ✅ Sentry initialization component created
   - ✅ Error boundary component created
   - ✅ Integrated into client modules
   - ✅ Webpack plugin configured to inject DSN
   - ✅ Release workflow created

## 📋 Configuration Details

### DSN
```
https://7f9e8c1ce2f39229323e42f86569d198@o4510176150028288.ingest.de.sentry.io/4510382653374544
```

### Organization & Project
- **Organization:** `presian-nedyalkov`
- **Project:** `eco-balance-documentation`
- **Region:** German (de.sentry.io)

### Auth Token
- **Scope:** `org:ci` (CI/CD scope - should work for releases)
- **Note:** The `org:ci` scope provides broad permissions for CI/CD operations and should work for creating releases and uploading source maps.

## 🚀 Next Steps

1. **Merge the Sentry Integration PR**
   - PR: https://github.com/presiannedyalkov/eco-balance-documentation/pull/184
   - After merge, the next deployment will automatically:
     - Initialize Sentry in the browser
     - Track errors in production
     - Create releases on each deployment

2. **Test Error Tracking**
   - After deployment, visit: https://docs.eco-balance.cc/
   - Open browser console (F12)
   - Run: `throw new Error('Test Sentry integration')`
   - Check Sentry dashboard: https://presian-nedyalkov.sentry.io/projects/eco-balance-documentation/
   - Error should appear within a few seconds

3. **Verify Release Creation**
   - After deployment, check the "Sentry Release" workflow
   - Should create a release with the git commit SHA
   - Source maps will be uploaded (if build directory exists)

## 🔧 Token Scope Verification

The `org:ci` scope should provide the necessary permissions for:
- ✅ Creating releases
- ✅ Uploading source maps
- ✅ Reading project information

If you encounter permission errors, you may need to create a token with more specific scopes:
- `project:read`
- `project:releases`
- `org:read`

However, `org:ci` typically has broader permissions and should work.

## 📊 Monitoring

After deployment, you can monitor:
- **Errors:** https://presian-nedyalkov.sentry.io/projects/eco-balance-documentation/issues/
- **Releases:** https://presian-nedyalkov.sentry.io/projects/eco-balance-documentation/releases/
- **Performance:** https://presian-nedyalkov.sentry.io/projects/eco-balance-documentation/performance/

## 🐛 Troubleshooting

### Errors Not Appearing
1. Check that `SENTRY_DSN` is set correctly
2. Verify the site is in production mode (`NODE_ENV=production`)
3. Check browser console for Sentry initialization messages
4. Verify Sentry project is active

### Release Creation Failing
1. Check `SENTRY_AUTH_TOKEN` has correct permissions
2. Verify `SENTRY_ORG` and `SENTRY_PROJECT` match your Sentry project
3. Check workflow logs for specific error messages
4. The `org:ci` scope should work, but if not, create a token with `project:releases` scope

### Source Maps Not Uploading
1. Verify build directory exists in workflow
2. Check that source maps are generated during build
3. Verify auth token has `project:releases` permission (or `org:ci` which includes it)

---

**Last Updated:** November 17, 2025

