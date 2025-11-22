# BaseUrl Error Prevention

## Why This Error Wasn't Caught

### The Problem
On November 21, 2025, the deployed site at `https://docs.eco-balance.cc/` showed a Docusaurus baseUrl error banner, indicating that JavaScript wasn't loading correctly. The root cause was missing GitHub repository variables (`CUSTOM_DOMAIN_URL` and `CUSTOM_DOMAIN_BASE_URL`), which caused the deployment workflow to use the wrong `BASE_URL` (`/eco-balance-documentation/` instead of `/`).

### Why It Wasn't Detected

1. **Build Succeeded**: The deployment workflow completed successfully - the build process itself didn't fail, it just built with the wrong `baseUrl`.

2. **Deployment Tests Were Too Lenient**: The existing deployment verification tests (`tests/deployment.spec.js`) checked:
   - ✅ Page loads (HTTP 200)
   - ✅ Content is visible
   - ✅ Links work (but they might work with wrong baseUrl if JavaScript isn't needed)
   - ✅ Navigation works
   
   But they **did NOT check**:
   - ❌ Docusaurus baseUrl error banner
   - ❌ `window.docusaurus` initialization
   - ❌ JavaScript functionality (SPA navigation)

3. **No Pre-Deployment Validation**: The deploy workflow didn't validate that `BASE_URL` matched the expected value for the configured custom domain.

4. **Silent Failure**: Docusaurus can render static HTML even with a wrong `baseUrl`, so the page appears to work, but JavaScript-based features (like SPA navigation, search, etc.) fail silently.

## How We're Preventing It Now

### 1. Pre-Deployment Validation
Added a `Validate BASE_URL configuration` step in `.github/workflows/deploy.yml` that:
- Checks if `CUSTOM_DOMAIN_URL` is set
- Verifies that `BASE_URL` is `/` when custom domain is configured
- Fails the build if there's a mismatch
- Provides clear error messages with fix instructions

### 2. Enhanced Deployment Tests
Added a new test `'Docusaurus baseUrl is correctly configured'` in `tests/deployment.spec.js` that:
- Checks for the Docusaurus baseUrl error banner
- Verifies `window.docusaurus` is initialized
- Tests that `window.docusaurus.navigate` is available
- Catches JavaScript errors that would prevent Docusaurus from working
- Provides specific error messages pointing to GitHub Actions variables

### 3. Workflow Improvements
- The validation step runs **before** the build, catching issues early
- Clear error messages guide developers to the fix
- The test runs **after** deployment, providing a safety net

## Prevention Checklist

When setting up a new deployment or custom domain:

- [ ] Set `CUSTOM_DOMAIN_URL` in GitHub repository variables
- [ ] Set `CUSTOM_DOMAIN_BASE_URL` to `/` for custom domains
- [ ] Verify the validation step passes in the deploy workflow
- [ ] Check that deployment verification tests pass
- [ ] Manually verify `window.docusaurus` exists in browser console

## Related Files

- `.github/workflows/deploy.yml` - Deployment workflow with validation
- `.github/workflows/verify-deployment.yml` - Post-deployment verification
- `tests/deployment.spec.js` - Deployment tests including baseUrl check
- `docusaurus.config.js` - Docusaurus configuration with baseUrl fallback

## Future Improvements

1. **Add a smoke test script** that can be run locally to verify baseUrl configuration
2. **Add a pre-commit hook** that checks if GitHub variables are documented
3. **Add monitoring** that alerts if `window.docusaurus` is not initialized on the live site
4. **Add a health check endpoint** that returns baseUrl configuration status

