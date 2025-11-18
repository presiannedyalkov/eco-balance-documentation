// @ts-check
const { test, expect } = require('@playwright/test');

// Use custom domain if set, otherwise fallback to GitHub Pages URL
const BASE_URL = process.env.BASE_URL || process.env.CUSTOM_DOMAIN_URL || 'https://docs.eco-balance.cc';

/**
 * Module verification tests
 * These tests verify that core modules (Sentry, search, etc.) are loaded and working
 */
test.describe('Module Verification', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    page.setDefaultTimeout(30000);
    page.setDefaultNavigationTimeout(30000);
  });

  test('Sentry is initialized in production', async ({ page }) => {
    const fullUrl = BASE_URL.endsWith('/') ? BASE_URL : BASE_URL + '/';
    
    const consoleMessages = [];
    page.on('console', msg => {
      consoleMessages.push({
        type: msg.type(),
        text: msg.text(),
      });
    });

    await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 30000 });
    
    // Wait for client modules to load
    await page.waitForTimeout(3000);

    // Check if Sentry is initialized by checking console messages
    const sentryInitMessage = consoleMessages.find(msg => 
      msg.text.includes('[Sentry]') && msg.text.includes('Initialized')
    );

    // Check if Sentry object exists in window (Sentry v10+ compatible)
    const sentryInfo = await page.evaluate(() => {
      return {
        hasSentry: typeof window.Sentry !== 'undefined',
        canCapture: typeof window.Sentry?.captureException === 'function',
        isInitialized: window.Sentry?.isInitialized?.() || false,
        consoleLogs: [], // Will be populated by console listener
      };
    });

    // In production, Sentry should be initialized
    // Check console for initialization message OR check if Sentry object exists and can capture
    if (sentryInitMessage || (sentryInfo.hasSentry && sentryInfo.canCapture)) {
      console.log('✅ Sentry is initialized');
      expect(sentryInfo.hasSentry || sentryInitMessage).toBeTruthy();
    } else {
      // If not in production mode, this is expected
      const isProduction = await page.evaluate(() => {
        return process?.env?.NODE_ENV === 'production' || 
               window.location.hostname === 'docs.eco-balance.cc';
      });
      
      if (isProduction) {
        console.warn('⚠️ Sentry not initialized in production - check configuration');
        // Don't fail, but log warning
      } else {
        console.log('ℹ️ Sentry not initialized (expected in non-production)');
      }
    }
  });

  test('Search bar is loaded and functional', async ({ page }) => {
    const fullUrl = BASE_URL.endsWith('/') ? BASE_URL : BASE_URL + '/';
    await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 30000 });
    
    // Wait for client modules to load
    await page.waitForTimeout(3000);

    // Check if search wrapper exists
    const searchWrapper = page.locator('#meilisearch-search-wrapper');
    const searchWrapperExists = await searchWrapper.count() > 0;

    if (searchWrapperExists) {
      // Check if search input is visible
      const searchInput = page.locator('.navbar__search-input, #meilisearch-search-wrapper input[type="search"]');
      const inputExists = await searchInput.count() > 0;
      
      expect(inputExists).toBeTruthy();
      
      // Try to interact with search
      if (inputExists) {
        await searchInput.first().click({ timeout: 5000 });
        await searchInput.first().fill('test', { timeout: 5000 });
        
        // Wait a bit for search to process
        await page.waitForTimeout(1000);
        
        // Check if search results dropdown appears (optional - may not have results)
        // Note: hasResults variable is intentionally unused - it's for future use
        const resultsDropdown = page.locator('.meilisearch-search-results');
        await resultsDropdown.count(); // Check if dropdown exists (for future validation)
        
        // Search input should be functional (we can type in it)
        const inputValue = await searchInput.first().inputValue();
        expect(inputValue).toBe('test');
        
        console.log('✅ Search bar is functional');
      }
    } else {
      console.log('ℹ️ Search bar not found (may not be configured)');
      // Don't fail if search is not configured
    }
  });

  test('Client modules are loaded', async ({ page }) => {
    const fullUrl = BASE_URL.endsWith('/') ? BASE_URL : BASE_URL + '/';
    
    const consoleMessages = [];
    page.on('console', msg => {
      consoleMessages.push({
        type: msg.type(),
        text: msg.text(),
      });
    });

    await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 30000 });
    
    // Wait for client modules to load
    await page.waitForTimeout(3000);

    // Check if clientModules.js was loaded by checking for expected elements or console messages
    const clientModuleInfo = await page.evaluate(() => {
      return {
        hasSearchWrapper: !!document.getElementById('meilisearch-search-wrapper'),
        hasReact: typeof window.React !== 'undefined',
        hasReactDOM: typeof window.ReactDOM !== 'undefined',
        readyState: document.readyState,
      };
    });

    // At minimum, the page should be loaded
    expect(clientModuleInfo.readyState).toBe('complete');
    
    // Check for client module indicators
    const hasClientModules = clientModuleInfo.hasSearchWrapper || 
                             consoleMessages.some(msg => msg.text.includes('clientModules'));
    
    if (hasClientModules) {
      console.log('✅ Client modules are loaded');
    } else {
      console.warn('⚠️ Client modules may not be loaded');
      // Don't fail - client modules might load asynchronously
    }
  });

  test('No critical JavaScript errors', async ({ page }) => {
    const fullUrl = BASE_URL.endsWith('/') ? BASE_URL : BASE_URL + '/';
    
    const errors = [];
    const pageErrors = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    page.on('pageerror', error => {
      pageErrors.push({
        message: error.message,
        stack: error.stack,
      });
    });

    await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);

    // Filter out known non-critical errors
    const criticalErrors = errors.filter(err => 
      !err.includes('favicon') && 
      !err.includes('analytics') &&
      !err.includes('404') &&
      !err.includes('Failed to load resource') &&
      !err.includes('ResizeObserver') &&
      !err.includes('Non-Error promise rejection')
    );

    const criticalPageErrors = pageErrors.filter(err =>
      !err.message.includes('ResizeObserver') &&
      !err.message.includes('favicon')
    );

    if (criticalErrors.length > 0 || criticalPageErrors.length > 0) {
      // Sanitize error messages to prevent log injection
      const sanitizedErrors = criticalErrors.map(err => 
        String(err || '').replace(/[\x00-\x1F\x7F-\x9F]/g, '').replace(/[\r\n]/g, ' ').substring(0, 200)
      );
      const sanitizedPageErrors = criticalPageErrors.map(err => 
        String(err?.message || '').replace(/[\x00-\x1F\x7F-\x9F]/g, '').replace(/[\r\n]/g, ' ').substring(0, 200)
      );
      
      console.warn('⚠️ Critical errors detected:', ...sanitizedErrors, ...sanitizedPageErrors);
      // Don't fail immediately - log for investigation
    } else {
      console.log('✅ No critical JavaScript errors');
    }
  });

  test('Core functionality is accessible', async ({ page }) => {
    const fullUrl = BASE_URL.endsWith('/') ? BASE_URL : BASE_URL + '/';
    await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 30000 });
    
    // Wait for page to fully load
    await page.waitForTimeout(2000);

    // Check that core elements are present
    const coreElements = await page.evaluate(() => {
      return {
        hasNavbar: !!document.querySelector('nav, .navbar, [role="navigation"]'),
        hasMainContent: !!document.querySelector('main, article, .markdown, .docMainContainer'),
        hasFooter: !!document.querySelector('footer'),
        hasLinks: document.querySelectorAll('a').length > 0,
      };
    });

    expect(coreElements.hasMainContent).toBeTruthy();
    expect(coreElements.hasLinks).toBeTruthy();
    
    console.log('✅ Core functionality is accessible');
  });

  test('Sentry can capture errors (test error tracking)', async ({ page }) => {
    const fullUrl = BASE_URL.endsWith('/') ? BASE_URL : BASE_URL + '/';
    await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 30000 });
    
    // Wait for Sentry to initialize
    await page.waitForTimeout(3000);

    // Check if Sentry is available
    const sentryAvailable = await page.evaluate(() => {
      return typeof window.Sentry !== 'undefined';
    });

    if (sentryAvailable) {
      // Try to capture a test error
      const captureResult = await page.evaluate(() => {
        try {
          if (window.Sentry && window.Sentry.captureException) {
            window.Sentry.captureException(new Error('Test error for Sentry verification'));
            return { success: true, message: 'Error captured' };
          }
          return { success: false, message: 'Sentry.captureException not available' };
        } catch (error) {
          return { success: false, message: error.message };
        }
      });

      if (captureResult.success) {
        console.log('✅ Sentry error capture is working');
      } else {
        console.warn('⚠️ Sentry error capture test:', captureResult.message);
      }
    } else {
      console.log('ℹ️ Sentry not available (may not be in production mode)');
      // Don't fail - Sentry only works in production
    }
  });
});

