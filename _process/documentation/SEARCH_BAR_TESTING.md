# Meilisearch Search Bar - Step-by-Step Testing Guide

This guide provides minimal tests to identify where the search bar functionality breaks.

## Quick Start

```bash
# 1. Test file structure and syntax
node scripts/test-search-bar-module.js

# 2. Start dev server
npm start

# 3. Run Playwright tests (in another terminal)
npm run test:search-bar

# 4. Test isolated component
# Open: http://localhost:3023/test-search-bar-isolated.html
```

## Test Steps (Minimal)

### Step 1: File Structure Test
**Command:** `node scripts/test-search-bar-module.js`

**What it tests:**
- ✅ `src/clientModules.js` exists and is readable
- ✅ File has required imports (React, ReactDOM, MeilisearchSearchBar)
- ✅ File exports a default function
- ✅ Component file exists
- ✅ CSS file exists and has styles
- ✅ Config file references the wrapper

**Expected output:**
```
✅ All file checks passed!
```

**If it fails:** Check file paths and syntax errors.

---

### Step 2: Module Loading Test
**Command:** `npm start` then open browser console

**What to check:**
1. Open: http://localhost:3023
2. Open browser console (F12)
3. Look for: `🔍 [clientModules] Loading Meilisearch search bar module...`
4. Check: `window.clientModulesDebug` exists

**Expected:**
```javascript
window.clientModulesDebug = {
  loaded: true,
  timestamp: "...",
  canUseDOM: true,
  readyState: "complete"
}
```

**If it fails:** 
- Module not loading → Check Docusaurus 3.x clientModules.js loading
- `canUseDOM: false` → SSR issue, check ExecutionEnvironment

---

### Step 3: DOM Element Test
**Command:** In browser console, run:

```javascript
// Check if wrapper exists
document.getElementById('meilisearch-search-wrapper')

// Check navbar structure
document.querySelector('.navbar')

// Check wrapper visibility
const wrapper = document.getElementById('meilisearch-search-wrapper');
if (wrapper) {
  const styles = window.getComputedStyle(wrapper);
  console.log({
    display: styles.display,
    visibility: styles.visibility,
    opacity: styles.opacity,
    width: wrapper.offsetWidth,
    height: wrapper.offsetHeight
  });
}
```

**Expected:**
- Wrapper element exists
- `display: flex` or `block`
- `visibility: visible`
- `opacity: 1`
- `width > 0` and `height > 0`

**If it fails:**
- Wrapper not found → Check `docusaurus.config.js` navbar items
- Hidden by CSS → Check `src/css/custom.css`

---

### Step 4: React Mounting Test
**Command:** In browser console, run:

```javascript
// Check if mounted
document.getElementById('meilisearch-search-wrapper')?.hasAttribute('data-mounted')

// Check if input exists
document.querySelector('#meilisearch-search-wrapper input[type="search"]')

// Check React root
const wrapper = document.getElementById('meilisearch-search-wrapper');
console.log('Children:', wrapper?.children.length);
console.log('Has input:', !!wrapper?.querySelector('input'));
```

**Expected:**
- `data-mounted="true"` attribute exists
- Input element exists inside wrapper
- `window.meilisearchDebug.componentRendered === true`

**If it fails:**
- No `data-mounted` → React mounting failed, check console errors
- No input → Component didn't render, check React errors

---

### Step 5: Component Rendering Test
**Command:** In browser console, check:

```javascript
// Check component debug object
window.meilisearchDebug

// Check component visibility
const input = document.querySelector('#meilisearch-search-wrapper input[type="search"]');
if (input) {
  const styles = window.getComputedStyle(input);
  console.log({
    display: styles.display,
    visibility: styles.visibility,
    opacity: styles.opacity,
    width: input.offsetWidth,
    height: input.offsetHeight,
    isVisible: input.offsetWidth > 0 && input.offsetHeight > 0
  });
}
```

**Expected:**
- `window.meilisearchDebug` exists with `componentRendered: true`
- Input is visible (`width > 0`, `height > 0`)
- No red/green debug borders (if removed)

**If it fails:**
- Component not rendering → Check React component errors
- Component hidden → Check CSS visibility

---

### Step 6: Meilisearch Connection Test
**Command:** In browser console, run:

```javascript
// Test health endpoint
fetch('https://search.eco-balance.cc/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);

// Test search endpoint
fetch('https://search.eco-balance.cc/indexes/eco-balance-docs/search', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer e1eebc3950796ae3ead1c39d2c80f4148212c344a36fb6ba9e9ec91d7a7f4489'
  },
  body: JSON.stringify({ q: '', limit: 0 })
})
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
```

**Expected:**
- Health check returns `{ status: "available" }` or similar
- Search endpoint returns `{ hits: [], estimatedTotalHits: ... }`

**If it fails:**
- CORS error → Check Meilisearch CORS configuration
- Network error → Check Meilisearch server status
- 401/403 → Check API key permissions

---

### Step 7: Full Integration Test
**Command:** `npm run test:search-bar`

**What it tests:**
- All steps above automatically
- Search functionality (typing, results)

**Expected:**
- All tests pass
- Search input is visible and functional

---

## Isolated Component Test

**File:** `static/test-search-bar-isolated.html`

**Purpose:** Test React mounting without Docusaurus

**Usage:**
1. Start dev server: `npm start`
2. Open: http://localhost:3023/test-search-bar-isolated.html
3. Check test results on page

**What it tests:**
- React/ReactDOM loading
- Wrapper div existence
- React component mounting
- Meilisearch connection

---

## Minimal Test Checklist

Run these in order to find where it breaks:

- [ ] **File structure:** `node scripts/test-search-bar-module.js`
- [ ] **Module loading:** Check browser console for `[clientModules]` logs
- [ ] **DOM element:** `document.getElementById('meilisearch-search-wrapper')` exists
- [ ] **React mounting:** `data-mounted` attribute exists
- [ ] **Component render:** Input element exists and is visible
- [ ] **Meilisearch:** Health check succeeds
- [ ] **Full test:** `npm run test:search-bar` passes

---

## Common Issues & Solutions

### Issue: Module not loading
**Symptoms:** No `[clientModules]` logs in console
**Solution:** 
- Check Docusaurus version (3.x requires `export default function`)
- Verify file is at `src/clientModules.js`
- Check browser console for import errors

### Issue: Wrapper not found
**Symptoms:** `document.getElementById('meilisearch-search-wrapper')` returns `null`
**Solution:**
- Check `docusaurus.config.js` navbar items
- Verify HTML is rendered (check page source)
- Check if Docusaurus is rendering navbar

### Issue: React mounting fails
**Symptoms:** No `data-mounted` attribute, console errors
**Solution:**
- Check React/ReactDOM versions
- Check for React context errors
- Verify component imports are correct

### Issue: Component hidden
**Symptoms:** Input exists but `offsetWidth === 0`
**Solution:**
- Check CSS: `display`, `visibility`, `opacity`
- Check parent element visibility
- Check z-index and positioning

### Issue: Meilisearch connection fails
**Symptoms:** CORS errors or network errors
**Solution:**
- Check Meilisearch CORS configuration
- Verify API key permissions
- Check network connectivity

---

## Debugging Commands

```bash
# Test file structure
node scripts/test-search-bar-module.js

# Start dev server
npm start

# Run Playwright tests
npm run test:search-bar

# Check build output
npm run build
ls -la build/

# Check for clientModules in build
grep -r "clientModules" build/
```

---

## Next Steps

After identifying where it breaks:

1. **File structure issue** → Fix imports/exports
2. **Module loading issue** → Check Docusaurus clientModules.js loading
3. **DOM issue** → Fix navbar config or CSS
4. **React mounting issue** → Fix React component or context
5. **Visibility issue** → Fix CSS styles
6. **Connection issue** → Fix Meilisearch config or CORS

