/**
 * Test clientModules locally without deployment
 * Run: node tests/test-local-search.js
 * 
 * This will:
 * 1. Build the site locally
 * 2. Serve it
 * 3. Test if clientModules loads
 * 4. Clean up
 */

const { chromium } = require('playwright');
const { spawn } = require('child_process');

let serveProcess = null;

async function testLocal() {
  console.log('🔍 Testing clientModules locally...\n');
  
  // Step 1: Build
  console.log('📦 Step 1: Building site...');
  const buildResult = await new Promise((resolve) => {
    const build = spawn('npm', ['run', 'build'], {
      stdio: 'inherit',
      shell: true,
    });
    build.on('close', (code) => resolve(code === 0));
  });
  
  if (!buildResult) {
    console.error('❌ Build failed!');
    process.exit(1);
  }
  console.log('✅ Build successful\n');
  
  // Step 2: Start local server
  console.log('🌐 Step 2: Starting local server...');
  const port = 3024; // Different port to avoid conflicts
  serveProcess = spawn('npm', ['run', 'serve', '--', '--port', port.toString()], {
    stdio: 'pipe',
    shell: true,
  });
  
  // Wait for server to start
  await new Promise((resolve) => {
    serveProcess.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Local:') || output.includes('http://')) {
        console.log('✅ Server started\n');
        setTimeout(resolve, 2000); // Give it a moment to fully start
      }
    });
    
    // Fallback timeout
    setTimeout(() => {
      console.log('⏳ Server should be ready (timeout fallback)\n');
      resolve();
    }, 5000);
  });
  
  // Step 3: Test with Playwright
  console.log('🧪 Step 3: Testing with Playwright...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const logs = [];
  const errors = [];
  
  page.on('console', msg => {
    logs.push({ type: msg.type(), text: msg.text() });
    if (msg.text().includes('[clientModules]') || msg.text().includes('Meilisearch')) {
      console.log(`  [${msg.type()}] ${msg.text()}`);
    }
  });
  
  page.on('pageerror', error => {
    errors.push(error);
    console.error('  ❌ Error:', String(error.message));
  });
  
  const url = `http://localhost:${port}/`;
  console.log(`  Navigating to ${url}...`);
  
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000); // Wait for clientModules to load
    
    // Check results
    const results = await page.evaluate(() => {
      return {
        title: document.title,
        hasClientModulesDebug: typeof window.clientModulesDebug !== 'undefined',
        hasMeilisearchDebug: typeof window.meilisearchDebug !== 'undefined',
        wrapperExists: !!document.getElementById('meilisearch-search-wrapper'),
        wrapperHasContent: document.getElementById('meilisearch-search-wrapper')?.children.length > 0,
        inputExists: !!document.querySelector('#meilisearch-search-wrapper input'),
      };
    });
    
    const clientModulesLogs = logs.filter(l => 
      l.text.includes('[clientModules]') || 
      l.text.includes('MeilisearchSearchBar')
    );
    
    console.log('\n📊 Results:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`  Page Title: ${results.title}`);
    console.log(`  clientModules.js loaded: ${clientModulesLogs.length > 0 ? '✅ YES' : '❌ NO'}`);
    console.log(`  window.clientModulesDebug: ${results.hasClientModulesDebug ? '✅ YES' : '❌ NO'}`);
    console.log(`  window.meilisearchDebug: ${results.hasMeilisearchDebug ? '✅ YES' : '❌ NO'}`);
    console.log(`  Wrapper exists: ${results.wrapperExists ? '✅ YES' : '❌ NO'}`);
    console.log(`  Wrapper has content: ${results.wrapperHasContent ? '✅ YES' : '❌ NO'}`);
    console.log(`  Input element exists: ${results.inputExists ? '✅ YES' : '❌ NO'}`);
    console.log(`  ClientModules logs: ${clientModulesLogs.length}`);
    console.log(`  Errors: ${errors.length}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    if (clientModulesLogs.length > 0 && results.hasClientModulesDebug && results.inputExists) {
      console.log('\n✅ SUCCESS! clientModules.js is loading correctly!');
      console.log('   The search bar should work after deployment.');
    } else {
      console.log('\n❌ FAILED! clientModules.js is still not loading.');
      console.log('   Check the configuration in docusaurus.config.js');
      if (clientModulesLogs.length === 0) {
        console.log('   - No clientModules logs found');
      }
      if (!results.hasClientModulesDebug) {
        console.log('   - window.clientModulesDebug not found');
      }
      if (!results.inputExists) {
        console.log('   - Search input not mounted');
      }
    }
    
    await browser.close();
    
  } catch (error) {
    console.error('❌ Test failed:', String(error.message));
    await browser.close();
  } finally {
    // Cleanup: Kill server
    if (serveProcess) {
      console.log('\n🧹 Cleaning up...');
      serveProcess.kill();
      serveProcess = null;
    }
  }
}

// Handle cleanup on exit
process.on('SIGINT', () => {
  if (serveProcess) {
    serveProcess.kill();
  }
  process.exit(0);
});

testLocal().catch(console.error);

