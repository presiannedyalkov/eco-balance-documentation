# Quick Testing Guide

## Local Testing

### 1. Start Development Server
```bash
npm start
```
Opens at `http://localhost:3000`

### 2. Build and Serve Production Build
```bash
npm run build
npm run serve
```
Serves production build at `http://localhost:3000`

## Automated Testing

### Run All Tests
```bash
npm test
```

### Individual Tests
```bash
npm run test:build    # Verify build succeeds
npm run test:links    # Check for broken links
```

## What Gets Tested

✅ Build process completes successfully  
✅ All internal links are valid  
✅ Key files are present  
✅ Navigation structure is correct  

## Notes

- The link checker may report some "broken" links to `/` (homepage) - these are false positives as Docusaurus redirects the homepage to `/docs/intro`
- External links are not validated (network-dependent)
- Static assets (CSS, JS, images) are skipped

For detailed testing information, see [TESTING.md](./TESTING.md).

