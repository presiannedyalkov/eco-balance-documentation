# Testing Guide for Eco Balance Documentation Site

This guide explains how to test the Docusaurus documentation site locally and verify all links work correctly.

## Prerequisites

- Node.js 18+ installed
- Dependencies installed: `npm install`

## Quick Start

### 1. Build the Site

```bash
npm run build
```

This creates a production build in the `build/` directory.

### 2. Test Locally

```bash
npm run serve
```

This starts a local server (usually at `http://localhost:3000`) where you can browse the documentation site.

### 3. Run Automated Tests

```bash
# Run all tests
npm test

# Or run individual tests
npm run test:build    # Test build process
npm run test:links    # Test for broken links
```

## Testing Scripts

### `test-build.js`

Verifies that:
- The build completes successfully
- Build directory is created with content
- Key files are present

**Usage:**
```bash
npm run test:build
```

### `test-links.js`

Checks all internal links in the built site to ensure:
- All relative links point to existing files
- All absolute links within the site are valid
- External links are skipped (not validated)

**Usage:**
```bash
npm run build      # Build first
npm run test:links # Then test links
```

**What it checks:**
- ✅ Internal documentation links (`/docs/...`)
- ✅ Relative links between pages
- ✅ Navigation links
- ⏭️ External URLs (skipped)
- ⏭️ Email/phone links (skipped)
- ⏭️ Anchor links (skipped)

### `test-all.js`

Runs all tests in sequence:
1. Build verification
2. Link validation

**Usage:**
```bash
npm test
```

## Manual Testing Checklist

### Content Verification
- [ ] All documents load correctly
- [ ] Navigation sidebar works
- [ ] Search functionality works
- [ ] Mobile responsive design works
- [ ] Dark mode works

### Link Verification
- [ ] All internal links work
- [ ] "Back to Project Hub" links work
- [ ] Cross-references between documents work
- [ ] Footer links work
- [ ] Navigation menu links work

### Visual Verification
- [ ] Branding colors display correctly
- [ ] Logo appears (if added)
- [ ] Homepage displays correctly
- [ ] Footer displays correctly
- [ ] Typography is readable

### Functionality
- [ ] Search works
- [ ] Sidebar navigation works
- [ ] Breadcrumbs work
- [ ] Previous/Next navigation works
- [ ] Code blocks render (if any)

## Common Issues

### Build Fails
- Check for MDX syntax errors (e.g., unescaped `<` characters)
- Verify all frontmatter is correct
- Check for broken markdown syntax

### Links Fail
- Verify link paths are correct
- Check that target documents exist
- Ensure baseUrl is set correctly in `docusaurus.config.js`

### Local Server Issues
- Clear cache: `npm run clear`
- Rebuild: `npm run build`
- Restart server: `npm run serve`

## Continuous Integration

These tests can be integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions
- name: Build and test
  run: |
    npm install
    npm run build
    npm test
```

## Next Steps

After local testing passes:
1. Update GitHub repository URL in `docusaurus.config.js`
2. Set up GitHub Actions for auto-deployment
3. Configure GitHub Pages
4. Deploy to production

---

**Note:** The link checker validates internal links only. External links are not validated to avoid false positives from network issues.

