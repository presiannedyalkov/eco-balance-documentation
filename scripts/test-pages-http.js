#!/usr/bin/env node

/**
 * Test Docusaurus pages using HTTP requests
 * Verifies that pages actually load and work
 */

const http = require('http');

const BASE_URL = 'localhost';
const PORT = 3023;
// For local development, baseUrl is '/', for production it's '/eco-balance-documentation/'
const BASE_PATH = process.env.NODE_ENV === 'production' ? '/eco-balance-documentation' : '';

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

function testPage(url) {
  return new Promise((resolve, reject) => {
    // Ensure URL doesn't end with / for consistency (except root)
    const cleanUrl = url === '/' ? url : url.replace(/\/$/, '');
    const path = `${BASE_PATH}${cleanUrl}`;
    
    // Sanitize path for logging
    const sanitizedPath = String(path || '').replace(/[\r\n]/g, ' ').substring(0, 200);
    console.log('  Testing:', `http://${BASE_URL}:${PORT}${sanitizedPath}`);

    const options = {
      hostname: BASE_URL,
      port: PORT,
      path: path,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Test Agent)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    };

    const req = http.get(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const status = res.statusCode;
        
        if (status !== 200) {
          reject(new Error(`HTTP ${status}`));
          return;
        }

        // Check for "Page Not Found" indicators (but not in script tags or comments)
        const bodyMatch = data.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        const bodyContent = bodyMatch ? bodyMatch[1] : data;
        
        if (bodyContent.includes('Page Not Found') || 
            bodyContent.includes('We could not find') ||
            bodyContent.includes('page not found') ||
            bodyContent.includes('Cannot GET')) {
          reject(new Error('Page shows "Not Found" message'));
          return;
        }

        // For Docusaurus, check if it's a valid page structure
        // Valid pages have React app structure
        if (!data.includes('docusaurus') && !data.includes('react') && data.length < 2000) {
          reject(new Error('Page does not appear to be a valid Docusaurus page'));
          return;
        }
        
        // Check if page has the basic Docusaurus structure
        if (!data.includes('main.js') && !data.includes('runtime')) {
          reject(new Error('Page missing Docusaurus JavaScript files'));
          return;
        }

        // Extract title if possible
        const titleMatch = data.match(/<title[^>]*>([^<]+)<\/title>/i);
        const title = titleMatch ? titleMatch[1].trim() : 'No title';

        // Sanitize title for logging
        const sanitizedTitle = String(title || '').replace(/[\r\n]/g, ' ').substring(0, 50);
        const sanitizedUrl = String(url || '').replace(/[\r\n]/g, ' ').substring(0, 200);
        console.log('  ✅', sanitizedUrl, '- OK', `(${status}, "${sanitizedTitle}...")`);
        resolve({ url, status: 'success', httpStatus: status, title });
      });
    });

    req.on('error', (error) => {
      if (error.code === 'ECONNREFUSED') {
        reject(new Error('Connection refused - server not running'));
      } else {
        reject(error);
      }
    });

    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function runTests() {
  console.log('🧪 Testing Docusaurus pages with HTTP requests...\n');
  console.log(`⚠️  Make sure server is running: npm start\n`);
  const sanitizedBasePath = String(BASE_PATH || '').replace(/[\r\n]/g, ' ').substring(0, 200);
  console.log('Testing:', `http://${BASE_URL}:${PORT}${sanitizedBasePath}\n`);

  const results = [];

  try {
    // Test each page
    for (const pageUrl of PAGES_TO_TEST) {
      try {
        const result = await testPage(pageUrl);
        results.push(result);
      } catch (error) {
        results.push({ url: pageUrl, status: 'failed', error: error.message });
      }
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
        // Sanitize error message and URL to prevent log injection - remove all control characters and limit length
        // Sanitize directly from source in console call to ensure CodeQL recognizes it
        console.log('  -', String(String(r?.url || '')
          .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Remove control characters
          .replace(/[\r\n]/g, ' ') // Replace newlines with spaces
          .substring(0, 100)), ':', String(String(r?.error || '') // Limit length
          .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Remove control characters
          .replace(/[\r\n]/g, ' ') // Replace newlines with spaces
          .substring(0, 200))); // Limit length
      });
      console.log('\n💡 Make sure the server is running: npm start');
      process.exit(1);
    } else {
      console.log('🎉 All pages working correctly!');
      process.exit(0);
    }
  } catch (error) {
    // Sanitize error message to prevent log injection
    const rawMessage = String(error?.message || 'Unknown error');
    const sanitizedError = rawMessage
      .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Remove control characters
      .replace(/[\r\n]/g, ' ') // Replace newlines with spaces
      .substring(0, 200); // Limit length
    // Use separate arguments - CodeQL recognizes sanitization when values are passed separately
    console.error('❌ Test error:', String(sanitizedError));
    if (sanitizedError.includes('ECONNREFUSED') || sanitizedError.includes('Connection refused')) {
      console.error('\n💡 Server is not running. Start it with:');
      console.error('   npm start');
    }
    process.exit(1);
  }
}

runTests();

