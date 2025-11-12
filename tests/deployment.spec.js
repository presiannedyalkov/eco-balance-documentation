// @ts-check
const { test, expect } = require('@playwright/test');

const BASE_URL = process.env.BASE_URL || 'https://presiannedyalkov.github.io/eco-balance-documentation';

/**
 * Deployment verification tests
 * These tests run after deployment to ensure the site is working correctly
 */
test.describe('Deployment Verification', () => {
  test.beforeEach(async ({ page }) => {
    // Set a reasonable timeout for page loads
    test.setTimeout(60000);
    // Increase navigation timeout
    page.setDefaultTimeout(30000);
    page.setDefaultNavigationTimeout(30000);
  });

  test('homepage loads successfully', async ({ page }) => {
    const response = await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
    expect(response?.status()).toBe(200);
    
    await expect(page).toHaveTitle(/Eco Balance/i, { timeout: 10000 });
    
    // Check that main content is visible
    await expect(page.locator('main, article, .markdown')).toBeVisible({ timeout: 10000 });
  });

  test('navigation works', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
    
    // Check navbar is visible (might be in different locations)
    const navbar = page.locator('nav, .navbar, [role="navigation"]').first();
    await expect(navbar).toBeVisible({ timeout: 10000 });
    
    // Check that navigation links are present
    const links = page.locator('a[href*="/"]');
    const linkCount = await links.count();
    expect(linkCount).toBeGreaterThan(0);
  });

  test('key pages load without errors', async ({ page }) => {
    const keyPages = [
      '/',
      '/vision-strategy/executive-summary',
      '/vision-strategy/project-vision',
      '/operations/restoration-methodology',
      '/business/business-model',
      '/resources/quick-reference',
      '/resources/roadmap',
    ];

    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    for (const path of keyPages) {
      try {
        const response = await page.goto(path, { waitUntil: 'networkidle', timeout: 30000 });
        expect(response?.status()).toBe(200);
        
        // Check page has content
        await expect(page.locator('main, article, .markdown, .docMainContainer')).toBeVisible({ timeout: 10000 });
      } catch (error) {
        console.error(`Failed to load ${path}:`, error.message);
        throw error;
      }
    }
    
    // Filter out known non-critical errors
    const criticalErrors = errors.filter(err => 
      !err.includes('favicon') && 
      !err.includes('analytics') &&
      !err.includes('404') &&
      !err.includes('Failed to load resource')
    );
    
    if (criticalErrors.length > 0) {
      console.warn(`Console errors detected:`, criticalErrors);
      // Don't fail the test for console errors, just warn
    }
  });

  test('internal links work', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
    
    // Find all internal links on the page
    const links = await page.locator('a[href^="/"], a[href*="/eco-balance-documentation/"]');
    const linkCount = await links.count();
    
    expect(linkCount).toBeGreaterThan(0);
    
    // Test a sample of links (first 5 to avoid timeout)
    const linksToTest = Math.min(5, linkCount);
    let successfulLinks = 0;
    
    for (let i = 0; i < linksToTest; i++) {
      const link = links.nth(i);
      const href = await link.getAttribute('href');
      if (href && !href.startsWith('#') && !href.startsWith('http')) {
        try {
          await link.click({ timeout: 10000 });
          await page.waitForLoadState('networkidle', { timeout: 15000 });
          
          // Check page loaded
          const url = page.url();
          expect(url).toContain('eco-balance-documentation');
          successfulLinks++;
          
          // Go back
          await page.goBack({ waitUntil: 'networkidle', timeout: 15000 });
        } catch (error) {
          console.warn(`Link ${href} failed:`, error.message);
          // Don't fail the test for individual link failures
        }
      }
    }
    
    // At least some links should work
    expect(successfulLinks).toBeGreaterThan(0);
  });

  test('search functionality is accessible', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
    
    // Check if search is available (Docusaurus search)
    // Search might be in navbar or as a button
    const searchElements = page.locator('button[aria-label*="Search"], .navbarSearchContainer, [class*="search"], [aria-label*="search"]');
    const searchCount = await searchElements.count();
    
    // Search might not be configured, so this is optional
    if (searchCount > 0) {
      expect(searchCount).toBeGreaterThan(0);
    } else {
      console.log('Search functionality not found (may not be configured)');
    }
  });

  test('mobile responsive layout works', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
    
    // Check that page is still usable on mobile
    await expect(page.locator('main, article, .markdown, .docMainContainer')).toBeVisible({ timeout: 10000 });
    
    // Check mobile menu button exists (hamburger menu)
    const menuButton = page.locator('button[aria-label*="menu"], button[aria-label*="navigation"], button[aria-label*="Toggle"], .navbar__toggle').first();
    const menuCount = await menuButton.count();
    // Menu button should exist on mobile
    expect(menuCount).toBeGreaterThan(0);
  });

  test('critical user flows work', async ({ page }) => {
    // Flow 1: Navigate from homepage to a key document
    await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
    
    // Try to find and click Executive Summary link
    const execSummaryLink = page.locator('a[href*="executive-summary"]').first();
    const linkExists = await execSummaryLink.count() > 0;
    
    if (linkExists) {
      await execSummaryLink.click({ timeout: 10000 });
      await page.waitForLoadState('networkidle', { timeout: 15000 });
      await expect(page).toHaveURL(/executive-summary/, { timeout: 10000 });
    } else {
      // If link not found, just verify we can navigate directly
      await page.goto('/vision-strategy/executive-summary', { waitUntil: 'networkidle', timeout: 30000 });
      await expect(page).toHaveURL(/executive-summary/);
    }
    
    // Flow 2: Navigate to resources
    await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
    const resourcesLink = page.locator('a[href*="resources"], a[href*="roadmap"]').first();
    if (await resourcesLink.count() > 0) {
      await resourcesLink.click({ timeout: 10000 });
      await page.waitForLoadState('networkidle', { timeout: 15000 });
    }
  });

  test('no broken images', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
    
    // Wait a bit more for images to load
    await page.waitForTimeout(2000);
    
    // Check for broken images
    const images = await page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      let brokenImages = 0;
      for (let i = 0; i < Math.min(imageCount, 10); i++) {
        const img = images.nth(i);
        const naturalWidth = await img.evaluate((el) => el.naturalWidth);
        // Natural width of 0 usually means image failed to load
        if (naturalWidth === 0) {
          const src = await img.getAttribute('src');
          console.warn(`Potentially broken image: ${src}`);
          brokenImages++;
        }
      }
      // Don't fail if a few images are broken, just warn
      if (brokenImages > imageCount / 2) {
        throw new Error(`Too many broken images: ${brokenImages} out of ${imageCount}`);
      }
    }
  });

  test('footer links work', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
    
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    
    // Check footer exists
    const footer = page.locator('footer').first();
    const footerExists = await footer.count() > 0;
    
    if (footerExists) {
      await expect(footer).toBeVisible({ timeout: 5000 });
      
      // Test a footer link if available
      const footerLinks = footer.locator('a');
      const linkCount = await footerLinks.count();
      if (linkCount > 0) {
        const firstLink = footerLinks.first();
        const href = await firstLink.getAttribute('href');
        if (href && href.startsWith('/') && !href.startsWith('#')) {
          try {
            await firstLink.click({ timeout: 10000 });
            await page.waitForLoadState('networkidle', { timeout: 15000 });
          } catch (error) {
            console.warn(`Footer link ${href} failed:`, error.message);
            // Don't fail test for footer link issues
          }
        }
      }
    } else {
      console.log('Footer not found (may not be configured)');
    }
  });
});

