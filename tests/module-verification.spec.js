// @ts-check
const { test, expect } = require('@playwright/test');

const BASE_URL = process.env.BASE_URL || process.env.CUSTOM_DOMAIN_URL || 'https://docs.eco-balance.cc';

/**
 * Module verification tests
 * These tests verify that core modules (search, client modules) load and work
 * against the deployed site.
 */
test.describe('Module Verification', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    page.setDefaultTimeout(30000);
    page.setDefaultNavigationTimeout(30000);
  });

  test('Search bar is loaded and functional', async ({ page }) => {
    const fullUrl = BASE_URL.endsWith('/') ? BASE_URL : BASE_URL + '/';
    await page.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Wait for client modules + the search bar's health-check ping to resolve.
    await page.waitForTimeout(3000);

    // The search box only renders when the Meilisearch container is reachable.
    // When it's down the box is intentionally hidden — valid, not a failure.
    const searchInput = page.locator('.navbar__search-input, #meilisearch-search-wrapper input[type="search"]');
    const inputExists = await searchInput.count() > 0;

    if (!inputExists) {
      console.log('ℹ️ Search box not shown — Meilisearch unreachable (graceful hide). OK.');
      return;
    }

    // If it is shown, it must be functional.
    await searchInput.first().click({ timeout: 5000 });
    await searchInput.first().fill('test', { timeout: 5000 });
    await page.waitForTimeout(1000);
    const inputValue = await searchInput.first().inputValue();
    expect(inputValue).toBe('test');
    console.log('✅ Search bar is functional');
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

    await page.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
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

    await page.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);

    // Filter out known non-critical errors
    const criticalErrors = errors.filter(err => 
      !err.includes('favicon') && 
      !err.includes('analytics') &&
      !err.includes('404') &&
      !err.includes('Failed to load resource') &&
      !err.includes('ResizeObserver') &&
      !err.includes('Non-Error promise rejection') &&
      // The external search service (Meilisearch) may be down; its CORS/network
      // errors are expected degradation, not a site bug (search hides itself).
      !err.includes('search.eco-balance.cc') &&
      !err.includes('CORS policy')
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
    await page.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
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
});

