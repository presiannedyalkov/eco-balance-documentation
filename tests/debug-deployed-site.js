/**
 * Comprehensive test to debug deployed site
 * Run: node tests/debug-deployed-site.js
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function debugDeployedSite() {
  console.log('🔍 Starting comprehensive site debug...\n');
  
  // Launch browser with visible window
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--start-maximized'],
  });
  const page = await browser.newPage();
  
  const allLogs = [];
  const allErrors = [];
  const networkRequests = [];
  const networkResponses = [];
  
  // Capture ALL console logs
  page.on('console', msg => {
    const entry = {
      type: msg.type(),
      text: msg.text(),
      location: msg.location(),
      timestamp: new Date().toISOString(),
    };
    allLogs.push(entry);
    console.log(`[${msg.type().toUpperCase()}]`, msg.text());
  });
  
  // Capture page errors
  page.on('pageerror', error => {
    const entry = {
      message: error.message,
      stack: error.stack,
      name: error.name,
    };
    allErrors.push(entry);
    console.error('❌ Page Error:', error.message);
  });
  
  // Capture ALL network requests
  page.on('request', request => {
    networkRequests.push({
      url: request.url(),
      method: request.method(),
      resourceType: request.resourceType(),
      headers: request.headers(),
    });
  });
  
  // Capture ALL network responses
  page.on('response', response => {
    networkResponses.push({
      url: response.url(),
      status: response.status(),
      statusText: response.statusText(),
      headers: response.headers(),
      resourceType: response.request().resourceType(),
    });
  });
  
  const url = 'https://docs.eco-balance.cc/';
  console.log(`🌐 Navigating to ${url}...`);
  
  try {
    await page.goto(url, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    console.log('✅ Page loaded\n');
    
    // Wait a bit for any async scripts
    console.log('⏳ Waiting 5 seconds for scripts to load...');
    await page.waitForTimeout(5000);
    
    // 1. Get page title and basic info
    console.log('\n📄 Page Information:');
    const pageInfo = await page.evaluate(() => {
      return {
        title: document.title,
        url: window.location.href,
        readyState: document.readyState,
        hasDocusaurus: typeof window.docusaurus !== 'undefined',
        docusaurusKeys: typeof window.docusaurus !== 'undefined' ? Object.keys(window.docusaurus) : [],
      };
    });
    console.log(JSON.stringify(pageInfo, null, 2));
    
    // 2. Get HTML source
    console.log('\n📝 Checking HTML source...');
    const htmlContent = await page.content();
    const htmlInfo = {
      length: htmlContent.length,
      hasClientModules: htmlContent.includes('clientModules') || htmlContent.includes('client-modules'),
      hasMeilisearch: htmlContent.includes('Meilisearch') || htmlContent.includes('meilisearch'),
      scriptTags: (htmlContent.match(/<script[^>]*>/gi) || []).length,
      scriptSources: [],
    };
    
    // Extract script sources (case-insensitive to match <SCRIPT> tags)
    const scriptMatches = htmlContent.match(/<script[^>]*src=["']([^"']+)["'][^>]*>/gi) || [];
    htmlInfo.scriptSources = scriptMatches.map(match => {
      const srcMatch = match.match(/src=["']([^"']+)["']/);
      return srcMatch ? srcMatch[1] : null;
    }).filter(Boolean);
    
    console.log('HTML Info:', JSON.stringify(htmlInfo, null, 2));
    console.log('Script sources found:', htmlInfo.scriptSources.length);
    htmlInfo.scriptSources.forEach((src, i) => {
      console.log(`  ${i + 1}. ${src}`);
    });
    
    // 3. Check for clientModules in loaded scripts
    console.log('\n🔍 Checking loaded JavaScript files...');
    const jsFiles = networkResponses.filter(r => 
      r.url.endsWith('.js') || 
      r.resourceType === 'script' ||
      r.url.includes('main.') ||
      r.url.includes('runtime.')
    );
    
    console.log(`Found ${jsFiles.length} JavaScript files:`);
    jsFiles.forEach((file, i) => {
      console.log(`  ${i + 1}. ${file.url} (${file.status})`);
    });
    
    // 4. Check for clientModules references in network
    const clientModulesRequests = networkRequests.filter(r => 
      r.url.includes('clientModules') || 
      r.url.includes('client-modules') ||
      r.url.includes('MeilisearchSearchBar')
    );
    
    console.log(`\n🔍 ClientModules-related requests: ${clientModulesRequests.length}`);
    clientModulesRequests.forEach((req, i) => {
      console.log(`  ${i + 1}. ${req.method} ${req.url}`);
    });
    
    // 5. Check window objects
    console.log('\n🔍 Checking window objects...');
    const windowObjects = await page.evaluate(() => {
      return {
        hasWindow: typeof window !== 'undefined',
        hasDocument: typeof document !== 'undefined',
        hasReact: typeof React !== 'undefined',
        hasReactDOM: typeof ReactDOM !== 'undefined',
        hasDocusaurus: typeof window.docusaurus !== 'undefined',
        clientModulesDebug: window.clientModulesDebug || null,
        meilisearchDebug: window.meilisearchDebug || null,
        allWindowKeys: Object.keys(window).filter(k => 
          k.includes('client') || 
          k.includes('Client') || 
          k.includes('module') || 
          k.includes('Module') ||
          k.includes('meilisearch') ||
          k.includes('Meilisearch')
        ),
      };
    });
    console.log(JSON.stringify(windowObjects, null, 2));
    
    // 6. Check DOM elements
    console.log('\n🔍 Checking DOM elements...');
    const domInfo = await page.evaluate(() => {
      const wrapper = document.getElementById('meilisearch-search-wrapper');
      const navbar = document.querySelector('.navbar');
      const allScripts = Array.from(document.querySelectorAll('script[src]'));
      
      return {
        wrapperExists: !!wrapper,
        wrapperInfo: wrapper ? {
          id: wrapper.id,
          innerHTML: wrapper.innerHTML,
          children: wrapper.children.length,
          attributes: Array.from(wrapper.attributes).map(a => ({ name: a.name, value: a.value })),
          computedStyle: {
            display: window.getComputedStyle(wrapper).display,
            visibility: window.getComputedStyle(wrapper).visibility,
            opacity: window.getComputedStyle(wrapper).opacity,
            width: wrapper.offsetWidth,
            height: wrapper.offsetHeight,
          },
        } : null,
        navbarExists: !!navbar,
        scriptTags: allScripts.map(s => ({
          src: s.src,
          type: s.type,
          async: s.async,
          defer: s.defer,
        })),
      };
    });
    console.log(JSON.stringify(domInfo, null, 2));
    
    // 7. Check for errors in console
    console.log('\n🔍 Console Analysis:');
    console.log(`  Total logs: ${allLogs.length}`);
    console.log(`  Errors: ${allErrors.length}`);
    console.log(`  Warnings: ${allLogs.filter(l => l.type === 'warning').length}`);
    
    const clientModulesLogs = allLogs.filter(l => 
      l.text.includes('[clientModules]') || 
      l.text.includes('clientModules') ||
      l.text.includes('MeilisearchSearchBar')
    );
    
    console.log(`  ClientModules-related logs: ${clientModulesLogs.length}`);
    if (clientModulesLogs.length > 0) {
      clientModulesLogs.forEach(log => {
        console.log(`    [${log.type}] ${log.text}`);
      });
    } else {
      console.log('    ❌ NO CLIENTMODULES LOGS FOUND!');
    }
    
    // 8. Check build output structure (if we can access it)
    console.log('\n🔍 Checking if we can access build files...');
    const buildCheck = await page.evaluate(async () => {
      const checks = [];
      
      // Try to fetch common build file paths
      const paths = [
        '/assets/js/main.js',
        '/assets/js/runtime.js',
        '/assets/js/app.js',
      ];
      
      for (const path of paths) {
        try {
          const response = await fetch(path, { method: 'HEAD' });
          checks.push({ path, exists: response.ok, status: response.status });
        } catch (e) {
          checks.push({ path, exists: false, error: e.message });
        }
      }
      
      return checks;
    });
    
    console.log('Build file checks:', JSON.stringify(buildCheck, null, 2));
    
    // 9. Save full HTML for inspection
    const outputDir = path.join(__dirname, '..', 'test-results');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(
      path.join(outputDir, 'deployed-site-html.html'),
      htmlContent
    );
    console.log('\n💾 Saved full HTML to test-results/deployed-site-html.html');
    
    // 10. Save network log
    fs.writeFileSync(
      path.join(outputDir, 'deployed-site-network.json'),
      JSON.stringify({
        requests: networkRequests,
        responses: networkResponses,
      }, null, 2)
    );
    console.log('💾 Saved network log to test-results/deployed-site-network.json');
    
    // 11. Save console log
    fs.writeFileSync(
      path.join(outputDir, 'deployed-site-console.json'),
      JSON.stringify({
        logs: allLogs,
        errors: allErrors,
      }, null, 2)
    );
    console.log('💾 Saved console log to test-results/deployed-site-console.json');
    
    // 12. Summary
    console.log('\n📊 SUMMARY:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`✅ Page loaded: ${pageInfo.title}`);
    console.log(`✅ Docusaurus loaded: ${pageInfo.hasDocusaurus}`);
    console.log(`❌ clientModules.js loaded: ${clientModulesLogs.length > 0 ? 'YES' : 'NO'}`);
    console.log(`❌ Wrapper has content: ${domInfo.wrapperInfo?.children > 0 ? 'YES' : 'NO'}`);
    console.log(`📦 JavaScript files loaded: ${jsFiles.length}`);
    console.log(`📝 Script tags in HTML: ${htmlInfo.scriptTags}`);
    console.log(`🔍 ClientModules in HTML: ${htmlInfo.hasClientModules ? 'YES' : 'NO'}`);
    console.log(`❌ Errors: ${allErrors.length}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    if (clientModulesLogs.length === 0) {
      console.log('\n❌ DIAGNOSIS: clientModules.js is NOT loading');
      console.log('   Possible causes:');
      console.log('   1. File not included in build output');
      console.log('   2. Docusaurus 3.x not loading clientModules.js automatically');
      console.log('   3. Build configuration issue');
      console.log('   4. File path or export issue');
    }
    
    // Take screenshot
    await page.screenshot({ 
      path: path.join(outputDir, 'deployed-site-full.png'), 
      fullPage: true 
    });
    console.log('📸 Screenshot saved to test-results/deployed-site-full.png');
    
  } catch (error) {
    console.error('❌ Error during test:', error);
  } finally {
    await browser.close();
  }
}

debugDeployedSite().catch(console.error);

