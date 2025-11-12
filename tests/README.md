# Deployment Verification Tests

This directory contains Playwright tests that verify the deployed documentation site is working correctly.

## Overview

After each deployment to GitHub Pages, these tests automatically run to ensure:
- Pages load successfully
- Navigation works
- Internal links function
- Mobile responsive layout works
- Critical user flows are functional
- No broken images
- Footer links work

## Running Tests Locally

To run the tests against the deployed site:

```bash
BASE_URL="https://presiannedyalkov.github.io/eco-balance-documentation" npm run test:deployment
```

To run against a local server:

```bash
# Start local server
npm run serve

# In another terminal, run tests
BASE_URL="http://localhost:3023/eco-balance-documentation" npm run test:deployment
```

## Test Structure

- `deployment.spec.js` - Main test suite for deployment verification
  - Homepage loading
  - Navigation functionality
  - Key pages accessibility
  - Internal link validation
  - Search functionality
  - Mobile responsiveness
  - Critical user flows
  - Image validation
  - Footer links

## Automatic Rollback

If tests fail after deployment, the GitHub Actions workflow will:
1. Attempt to automatically revert the deployment commit
2. Create a GitHub issue documenting the failure
3. Comment on the commit with rollback information
4. Trigger a new deployment with the previous version

## Configuration

Tests are configured in `playwright.config.js`:
- Base URL: Set via `BASE_URL` environment variable
- Timeouts: 30-60 seconds for network operations
- Browser: Chromium (can be extended to other browsers)
- Retries: 2 retries on CI, 0 locally

