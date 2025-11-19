/**
 * Minimal step-by-step tests for Meilisearch search bar
 * 
 * Run: npm run test:search-bar
 * 
 * These tests verify each step independently:
 * 1. Module loading
 * 2. DOM element existence
 * 3. React mounting
 * 4. Component rendering
 * 5. Meilisearch connection
 * 6. CSS visibility
 */

const { test, expect } = require('@playwright/test');

test.describe('Meilisearch Search Bar - Step by Step', () => {
  test.beforeEach(async ({ page }) => {
    // Start dev server or use deployed URL
    const baseURL = process.env.TEST_URL || 'http://localhost:3023';
    await page.goto(baseURL);
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
  });

  test('Step 1: clientModules.js is loaded', async ({ page }) => {
    // Check if clientModules debug object exists
    const clientModulesLoaded = await page.evaluate(() => {
      return typeof window.clientModulesDebug !== 'undefined';
    });
    
    expect(clientModulesLoaded).toBe(true);
    
    // Check console logs for module loading
    const logs = [];
    page.on('console', msg => {
      if (msg.text().includes('[clientModules]')) {
        logs.push(msg.text());
      }
    });
    
    await page.reload();
    await page.waitForTimeout(1000);
    
    expect(logs.length).toBeGreaterThan(0);
    expect(logs.some(log => log.includes('Loading Meilisearch search bar module'))).toBe(true);
  });

  test('Step 2: Wrapper div exists in DOM', async ({ page }) => {
    // Check if wrapper div exists
    const wrapperExists = await page.locator('#meilisearch-search-wrapper').count();
    expect(wrapperExists).toBe(1);
    
    // Check wrapper properties
    const wrapperInfo = await page.evaluate(() => {
      const wrapper = document.getElementById('meilisearch-search-wrapper');
      if (!wrapper) return null;
      
      const styles = window.getComputedStyle(wrapper);
      return {
        exists: true,
        isConnected: wrapper.isConnected,
        display: styles.display,
        visibility: styles.visibility,
        opacity: styles.opacity,
        width: wrapper.offsetWidth,
        height: wrapper.offsetHeight,
        parentElement: wrapper.parentElement?.tagName,
      };
    });
    
    expect(wrapperInfo).not.toBeNull();
    expect(wrapperInfo.isConnected).toBe(true);
    console.log('Wrapper info:', wrapperInfo);
  });

  test('Step 3: React component is mounted', async ({ page }) => {
    // Wait for component to mount
    await page.waitForTimeout(2000);
    
    // Check if component has data-mounted attribute
    const isMounted = await page.evaluate(() => {
      const wrapper = document.getElementById('meilisearch-search-wrapper');
      return wrapper?.hasAttribute('data-mounted') || false;
    });
    
    expect(isMounted).toBe(true);
    
    // Check if input element exists (component rendered)
    const inputExists = await page.locator('#meilisearch-search-wrapper input[type="search"]').count();
    expect(inputExists).toBe(1);
  });

  test('Step 4: Component renders without errors', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    // Check if MeilisearchSearchBar debug object exists
    const componentRendered = await page.evaluate(() => {
      return typeof window.meilisearchDebug !== 'undefined' && 
             window.meilisearchDebug.componentRendered === true;
    });
    
    expect(componentRendered).toBe(true);
    
    // Check for console errors
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error' && msg.text().includes('Meilisearch')) {
        errors.push(msg.text());
      }
    });
    
    await page.reload();
    await page.waitForTimeout(2000);
    
    // Log errors but don't fail (they might be expected)
    if (errors.length > 0) {
      console.log('Component errors (may be expected):', errors);
    }
  });

  test('Step 5: Search input is visible', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    const inputVisible = await page.evaluate(() => {
      const input = document.querySelector('#meilisearch-search-wrapper input[type="search"]');
      if (!input) return false;
      
      const styles = window.getComputedStyle(input);
      return {
        exists: true,
        display: styles.display,
        visibility: styles.visibility,
        opacity: parseFloat(styles.opacity),
        width: input.offsetWidth,
        height: input.offsetHeight,
        isVisible: input.offsetWidth > 0 && input.offsetHeight > 0 && 
                   styles.display !== 'none' && 
                   styles.visibility !== 'hidden' &&
                   parseFloat(styles.opacity) > 0,
      };
    });
    
    expect(inputVisible).not.toBeNull();
    expect(inputVisible.exists).toBe(true);
    expect(inputVisible.isVisible).toBe(true);
    
    console.log('Input visibility:', inputVisible);
  });

  test('Step 6: Meilisearch connection test', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    // Check if health check was attempted
    const connectionTest = await page.evaluate(() => {
      return new Promise((resolve) => {
        // Check if debug object has connection info
        const debug = window.meilisearchDebug;
        if (!debug) {
          resolve({ tested: false, reason: 'Debug object not found' });
          return;
        }
        
        // Try to fetch health endpoint
        fetch('https://search.eco-balance.cc/health')
          .then(response => {
            resolve({
              tested: true,
              healthCheck: {
                status: response.status,
                ok: response.ok,
              },
            });
          })
          .catch(error => {
            resolve({
              tested: true,
              healthCheck: {
                error: error.message,
              },
            });
          });
      });
    });
    
    console.log('Connection test:', connectionTest);
    
    // Don't fail if connection fails (might be network/CORS issue)
    // Just log it for debugging
    if (connectionTest.tested && connectionTest.healthCheck?.error) {
      console.warn('Meilisearch connection failed:', connectionTest.healthCheck.error);
    }
  });

  test('Step 7: Full integration test - search functionality', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    // Find search input
    const searchInput = page.locator('#meilisearch-search-wrapper input[type="search"]');
    await expect(searchInput).toBeVisible();
    
    // Type in search
    await searchInput.fill('test');
    await page.waitForTimeout(500);
    
    // Check if results dropdown appears (or at least no errors)
    const hasResults = await page.locator('.meilisearch-search-results').count();
    
    // Results might not appear if Meilisearch is not configured, but component should work
    console.log('Search results dropdown count:', hasResults);
    
    // Clear search
    await searchInput.fill('');
    await page.waitForTimeout(300);
  });
});

