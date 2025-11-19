/**
 * Test by actually opening a browser and checking console
 * Run: node tests/test-browser-console.js
 */

const { chromium } = require('playwright');

async function testBrowserConsole() {
  console.log('🌐 Starting browser test...\n');
  
  const browser = await chromium.launch({ headless: false }); // Visible browser
  const page = await browser.newPage();
  
  const allLogs = [];
  
  // Capture ALL console messages
  page.on('console', msg => {
    const text = msg.text();
    allLogs.push({
      type: msg.type(),
      text: text,
      timestamp: new Date().toISOString(),
    });
    
    // Print all logs to terminal
    const prefix = msg.type() === 'error' ? '❌' : msg.type() === 'warn' ? '⚠️' : '📝';
    console.log(`${prefix} [${msg.type().toUpperCase()}] ${text}`);
  });
  
  console.log('Navigating to http://localhost:3023/...');
  console.log('(Make sure dev server is running: npm start)\n');
  console.log('Waiting 10 seconds for you to check the browser...\n');
  
  try {
    await page.goto('http://localhost:3023/', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(10000); // Wait 10 seconds
    
    // Check window objects
    const windowCheck = await page.evaluate(() => {
      return {
        __clientModulesModuleImported: window.__clientModulesModuleImported || false,
        clientModulesDebug: window.clientModulesDebug || null,
        meilisearchDebug: window.meilisearchDebug || null,
        wrapperExists: !!document.getElementById('meilisearch-search-wrapper'),
        inputExists: !!document.querySelector('#meilisearch-search-wrapper input'),
      };
    });
    
    console.log('\n📊 Window Objects Check:');
    console.log(JSON.stringify(windowCheck, null, 2));
    
    // Filter clientModules logs
    const clientModulesLogs = allLogs.filter(l => 
      l.text.includes('[clientModules]') || 
      l.text.includes('clientModules') ||
      l.text.includes('MeilisearchSearchBar')
    );
    
    console.log(`\n📊 Summary:`);
    console.log(`  Total console logs: ${allLogs.length}`);
    console.log(`  ClientModules logs: ${clientModulesLogs.length}`);
    console.log(`  __clientModulesModuleImported: ${windowCheck.__clientModulesModuleImported}`);
    console.log(`  clientModulesDebug exists: ${!!windowCheck.clientModulesDebug}`);
    
    if (clientModulesLogs.length === 0) {
      console.log('\n❌ NO CLIENTMODULES LOGS IN BROWSER CONSOLE!');
      console.log('   The module is not executing in the browser.');
    } else {
      console.log('\n✅ Found clientModules logs!');
    }
    
  } catch (error) {
    console.error('❌ Error:', String(error.message));
  }
  
  console.log('\n⏸️  Browser will stay open for 5 more seconds...');
  await page.waitForTimeout(5000);
  
  await browser.close();
}

testBrowserConsole().catch(console.error);

