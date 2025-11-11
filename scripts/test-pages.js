#!/usr/bin/env node

/**
 * Test Docusaurus pages using Playwright
 * Verifies that pages actually load and work
 */

const { chromium } = require('playwright');
const { spawn } = require('child_process');

const BASE_URL = 'http://localhost:3023/eco-balance-documentation';
const PORT = 3023;

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

let serverProcess = null;

async function startServer() {
  return new Promise((resolve, reject) => {
    console.log('🚀 Starting Docusaurus server...');
    serverProcess = spawn('npm', ['start'], {
      stdio: 'pipe',
      shell: true,
    });

    let output = '';
    serverProcess.stdout.on('data', (data) => {
      output += data.toString();
      if (output.includes('compiled successfully') || output.includes('Local:')) {
        console.log('✅ Server started');
        // Wait a bit more for server to be ready
        setTimeout(resolve, 3000);
      }
    });

    serverProcess.stderr.on('data', (data) => {
      const text = data.toString();
      if (text.includes('Error') || text.includes('ERROR')) {
        console.error('❌ Server error:', text);
      }
    });

    // Timeout after 30 seconds
    setTimeout(() => {
      if (!output.includes('compiled')) {
        reject(new Error('Server start timeout'));
      }
    }, 30000);
  });
}

async function stopServer() {
  if (serverProcess) {
    console.log('🛑 Stopping server...');
    serverProcess.kill();
    serverProcess = null;
  }
}

async function testPage(browser, url) {
  const page = await browser.newPage();
  try {
    const fullUrl = `${BASE_URL}${url}`;
    console.log(`  Testing: ${fullUrl}`);
    
    const response = await page.goto(fullUrl, {
      waitUntil: 'networkidle',
      timeout: 10000,
    });

    if (!response) {
      throw new Error('No response');
    }

    const status = response.status();
    if (status !== 200) {
      throw new Error(`Status ${status}`);
    }

    // Check for "Page Not Found" text
    const content = await page.content();
    if (content.includes('Page Not Found') || content.includes('404') || content.includes('We could not find')) {
      throw new Error('Page shows "Not Found"');
    }

    // Check if page has content
    const bodyText = await page.textContent('body');
    if (!bodyText || bodyText.trim().length < 100) {
      throw new Error('Page appears empty');
    }

    console.log(`  ✅ ${url} - OK`);
    return { url, status: 'success' };
  } catch (error) {
    console.error(`  ❌ ${url} - FAILED: ${error.message}`);
    return { url, status: 'failed', error: error.message };
  } finally {
    await page.close();
  }
}

async function runTests() {
  console.log('🧪 Starting page tests...\n');

  let browser = null;
  const results = [];

  try {
    // Start server
    await startServer();

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
    
    console.log(`✅ Passed: ${passed}/${results.length}`);
    if (failed > 0) {
      console.log(`❌ Failed: ${failed}/${results.length}`);
      console.log('\nFailed pages:');
      results.filter(r => r.status === 'failed').forEach(r => {
        console.log(`  - ${r.url}: ${r.error}`);
      });
      process.exit(1);
    } else {
      console.log('🎉 All pages working correctly!');
      process.exit(0);
    }
  } catch (error) {
    console.error('❌ Test error:', error);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
    await stopServer();
  }
}

// Handle cleanup on exit
process.on('SIGINT', async () => {
  await stopServer();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await stopServer();
  process.exit(0);
});

runTests();

