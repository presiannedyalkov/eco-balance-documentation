/**
 * Quick script to check deployed site and console logs
 * Run: node tests/check-deployed-search.js
 */

const { chromium } = require('playwright');

async function checkDeployedSite() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  const logs = [];
  const errors = [];
  
  // Capture all console logs
  page.on('console', msg => {
    const text = msg.text();
    logs.push({
      type: msg.type(),
      text: text,
      timestamp: new Date().toISOString(),
    });
    console.log(`[${msg.type()}]`, text);
  });
  
  page.on('pageerror', error => {
    errors.push({
      message: error.message,
      stack: error.stack,
    });
    console.error('Page error:', String(error.message));
  });
  
  console.log('🔍 Navigating to https://docs.eco-balance.cc/...');
  await page.goto('https://docs.eco-balance.cc/', { waitUntil: 'networkidle' });
  
  console.log('\n⏳ Waiting 5 seconds for clientModules to load...');
  await page.waitForTimeout(5000);
  
  // Check for debug objects
  console.log('\n🔍 Checking debug objects...');
  const debugInfo = await page.evaluate(() => {
    return {
      clientModulesDebug: window.clientModulesDebug || null,
      meilisearchDebug: window.meilisearchDebug || null,
      hasWindow: typeof window !== 'undefined',
      hasDocument: typeof document !== 'undefined',
      readyState: typeof document !== 'undefined' ? document.readyState : 'N/A',
    };
  });
  
  console.log('Debug objects:', JSON.stringify(debugInfo, null, 2));
  
  // Check for wrapper element
  console.log('\n🔍 Checking DOM elements...');
  const domInfo = await page.evaluate(() => {
    const wrapper = document.getElementById('meilisearch-search-wrapper');
    const input = wrapper?.querySelector('input[type="search"]');
    const navbar = document.querySelector('.navbar');
    
    return {
      wrapperExists: !!wrapper,
      wrapperInfo: wrapper ? {
        id: wrapper.id,
        className: wrapper.className,
        isConnected: wrapper.isConnected,
        hasDataMounted: wrapper.hasAttribute('data-mounted'),
        children: wrapper.children.length,
        innerHTML: wrapper.innerHTML.substring(0, 200),
        styles: {
          display: window.getComputedStyle(wrapper).display,
          visibility: window.getComputedStyle(wrapper).visibility,
          opacity: window.getComputedStyle(wrapper).opacity,
          width: wrapper.offsetWidth,
          height: wrapper.offsetHeight,
        },
      } : null,
      inputExists: !!input,
      inputInfo: input ? {
        type: input.type,
        placeholder: input.placeholder,
        visible: input.offsetWidth > 0 && input.offsetHeight > 0,
        styles: {
          display: window.getComputedStyle(input).display,
          visibility: window.getComputedStyle(input).visibility,
          opacity: window.getComputedStyle(input).opacity,
        },
      } : null,
      navbarExists: !!navbar,
    };
  });
  
  console.log('DOM info:', JSON.stringify(domInfo, null, 2));
  
  // Check page source for clientModules
  console.log('\n🔍 Checking page source...');
  const pageContent = await page.content();
  const hasClientModules = pageContent.includes('clientModules') || 
                          pageContent.includes('client-modules') ||
                          pageContent.includes('MeilisearchSearchBar');
  
  console.log('Page source contains clientModules references:', hasClientModules);
  
  // Check network requests
  console.log('\n🔍 Checking network requests...');
  const networkRequests = [];
  page.on('request', request => {
    const url = request.url();
    if (url.includes('clientModules') || url.includes('client-modules') || url.includes('Meilisearch')) {
      networkRequests.push({ type: 'request', url });
    }
  });
  
  page.on('response', response => {
    const url = response.url();
    if (url.includes('clientModules') || url.includes('client-modules') || url.includes('Meilisearch')) {
      networkRequests.push({ 
        type: 'response', 
        url, 
        status: response.status(),
        statusText: response.statusText(),
      });
    }
  });
  
  // Reload to capture network requests
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  console.log('Network requests:', networkRequests);
  
  // Filter console logs
  const clientModulesLogs = logs.filter(log => 
    log.text.includes('[clientModules]') || 
    log.text.includes('clientModules') ||
    log.text.includes('Meilisearch')
  );
  
  console.log('\n📊 Summary:');
  console.log('  - Total console logs:', logs.length);
  console.log('  - ClientModules/Meilisearch logs:', clientModulesLogs.length);
  console.log('  - Errors:', errors.length);
  console.log('  - clientModulesDebug exists:', !!debugInfo.clientModulesDebug);
  console.log('  - meilisearchDebug exists:', !!debugInfo.meilisearchDebug);
  console.log('  - Wrapper exists:', domInfo.wrapperExists);
  console.log('  - Input exists:', domInfo.inputExists);
  console.log('  - Page source has references:', hasClientModules);
  
  if (clientModulesLogs.length === 0) {
    console.log('\n❌ NO CLIENTMODULES LOGS FOUND!');
    console.log('   This means clientModules.js is not loading.');
    console.log('\n   Possible issues:');
    console.log('   1. clientModules.js not in build output');
    console.log('   2. Docusaurus not loading clientModules.js');
    console.log('   3. Build cache issue');
  }
  
  if (!domInfo.wrapperExists) {
    console.log('\n❌ WRAPPER DIV NOT FOUND!');
    console.log('   The navbar HTML item is not rendering.');
  }
  
  if (domInfo.wrapperExists && !domInfo.inputExists) {
    console.log('\n❌ WRAPPER EXISTS BUT NO INPUT!');
    console.log('   React component is not mounting.');
  }
  
  // Save screenshot
  await page.screenshot({ path: 'test-results/deployed-site-check.png', fullPage: true });
  console.log('\n📸 Screenshot saved to test-results/deployed-site-check.png');
  
  await browser.close();
}

checkDeployedSite().catch(console.error);

