#!/usr/bin/env node

/**
 * Simple page test - assumes server is already running
 * Tests pages using Playwright
 */

const { chromium } = require('playwright');

const BASE_URL = 'http://localhost:3023/eco-balance-documentation';

// Pages to test
const PAGES_TO_TEST = [
  '/', // Homepage
  '/vision-strategy/executive-summary',
  '/vision-strategy/project-vision',
  '/vision-strategy/success-factors',
  '/vision-strategy/current-status',
  '/organization/organizational-structure',
  '/operations/restoration-methodology',
  '/business/business-model',
  '/resources/quick-reference',
  '/resources/roadmap',
];

async function testPage(browser, url) {
  const page = await browser.newPage();
  try {
    const fullUrl = `${BASE_URL}${url}`;
    console.log(`  Testing: ${fullUrl}`);
    
    const response = await page.goto(fullUrl, {
      waitUntil: 'networkidle',
      timeout: 15000,
    });

    if (!response) {
      throw new Error('No response from server');
    }

    const status = response.status();
    if (status !== 200) {
      throw new Error(`HTTP ${status}`);
    }

    // Wait for content to load
    await page.waitForSelector('body', { timeout: 5000 });

    // Check for "Page Not Found" text
    const content = await page.content();
    const bodyText = await page.textContent('body');
    
    if (content.includes('Page Not Found') || 
        content.includes('404') || 
        content.includes('We could not find') ||
        content.includes('page not found')) {
      throw new Error('Page shows "Not Found" message');
    }

    // Check if page has meaningful content
    if (!bodyText || bodyText.trim().length < 100) {
      throw new Error('Page appears empty or has insufficient content');
    }

    // Check for title
    const title = await page.title();
    if (!title || title.includes('404') || title.includes('Not Found')) {
      throw new Error('Page title indicates error');
    }

    // Sanitize title and URL for logging
    const sanitizedTitle = String(title || '').replace(/[\r\n]/g, ' ').substring(0, 50);
    const sanitizedUrl = String(url || '').replace(/[\r\n]/g, ' ').substring(0, 200);
    console.log('  ✅', sanitizedUrl, '- OK', `(${status}, "${sanitizedTitle}...")`);
    return { url, status: 'success', httpStatus: status, title };
  } catch (error) {
    // Sanitize error message and URL to prevent log injection
    // Sanitize error message and URL to prevent log injection (inline sanitization like in meilisearch-plugin.js)
    const sanitizedError = error?.message ? String(error.message).replace(/[\r\n]/g, ' ').substring(0, 200) : 'Unknown error';
    const sanitizedUrl = url ? String(url).replace(/[\r\n]/g, ' ').substring(0, 200) : 'Unknown URL';
    console.error('  ❌', sanitizedUrl, '- FAILED:', sanitizedError);
    return { url, status: 'failed', error: error.message };
  } finally {
    await page.close();
  }
}

async function runTests() {
  console.log('🧪 Testing Docusaurus pages...\n');
  console.log('⚠️  Make sure server is running: npm start\n');

  let browser = null;
  const results = [];

  try {
    // Launch browser
    browser = await chromium.launch({ headless: true });
    console.log('✅ Browser launched\n');

    // Test each page
    for (const pageUrl of PAGES_TO_TEST) {
      const result = await testPage(browser, pageUrl);
      results.push(result);
    }

    // Summary
    console.log('\n📊 Test Summary:');
    console.log('='.repeat(60));
    const passed = results.filter(r => r.status === 'success').length;
    const failed = results.filter(r => r.status === 'failed').length;
    
    console.log('✅ Passed:', `${passed}/${results.length}`);
    if (failed > 0) {
      console.log('❌ Failed:', `${failed}/${results.length}`);
      console.log('\nFailed pages:');
      results.filter(r => r.status === 'failed').forEach(r => {
        // Sanitize error message and URL to prevent log injection
        const rawError = String(r?.error || '');
        const rawUrl = String(r?.url || '');
        const sanitizedError = rawError
          .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Remove control characters
          .replace(/[\r\n]/g, ' ') // Replace newlines with spaces
          .substring(0, 200); // Limit length
        const sanitizedUrl = rawUrl
          .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Remove control characters
          .replace(/[\r\n]/g, ' ') // Replace newlines with spaces
          .substring(0, 200); // Limit length
        // Use separate arguments - CodeQL recognizes sanitization when values are passed separately
        console.log('  -', sanitizedUrl + ':', sanitizedError);
      });
      process.exit(1);
    } else {
      console.log('🎉 All pages working correctly!');
      process.exit(0);
    }
  } catch (error) {
    // Sanitize error message to prevent log injection (inline sanitization like in meilisearch-plugin.js)
    const sanitizedMessage = error?.message ? String(error.message).replace(/[\r\n]/g, ' ').substring(0, 200) : 'Unknown error';
    console.error('❌ Test error:', sanitizedMessage);
    if (error?.message && (error.message.includes('ECONNREFUSED') || error.message.includes('connect'))) {
      console.error('\n💡 Make sure the server is running:');
      console.error('   npm start');
    }
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

runTests();

