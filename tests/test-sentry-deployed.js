/**
 * Test Sentry on deployed site
 * Run: node tests/test-sentry-deployed.js
 */

const { chromium } = require('playwright');

async function testSentry() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push({ type: msg.type(), text: msg.text() });
    console.log(`[${msg.type()}]`, msg.text());
  });
  
  console.log('🔍 Navigating to https://docs.eco-balance.cc/...');
  await page.goto('https://docs.eco-balance.cc/', { waitUntil: 'networkidle' });
  
  console.log('\n⏳ Waiting 5 seconds for modules to load...');
  await page.waitForTimeout(5000);
  
  console.log('\n🔍 Checking Sentry status...');
  const sentryInfo = await page.evaluate(() => {
    // Sentry v10+ compatible - getCurrentHub() was removed
    return {
      hasSentry: typeof window.Sentry !== 'undefined',
      isInitialized: window.Sentry?.isInitialized?.() || false,
      canCapture: typeof window.Sentry?.captureException === 'function',
    };
  });
  
  console.log('\n📊 Sentry Info:');
  console.log(JSON.stringify(sentryInfo, null, 2));
  
  console.log('\n📋 Console Messages (Sentry-related):');
  const sentryMessages = consoleMessages.filter(m => 
    m.text.includes('Sentry') || m.text.includes('sentry')
  );
  if (sentryMessages.length > 0) {
    sentryMessages.forEach(m => {
      console.log(`  [${m.type}] ${m.text}`);
    });
  } else {
    console.log('  No Sentry-related console messages found');
  }
  
  if (sentryInfo.hasSentry && sentryInfo.canCapture) {
    console.log('\n✅ Sentry is initialized!');
    console.log(`   Initialized: ${sentryInfo.isInitialized ? '✅ Yes' : '❌ No'}`);
    console.log(`   Can capture errors: ${sentryInfo.canCapture ? '✅ Yes' : '❌ No'}`);
    
    console.log('\n🧪 Testing error capture...');
    const captureResult = await page.evaluate(() => {
      try {
        if (window.Sentry?.captureException) {
          const eventId = window.Sentry.captureException(new Error('Test error from Playwright - ' + Date.now()));
          return { success: true, eventId: eventId, message: 'Error sent to Sentry' };
        }
        return { success: false, message: 'captureException not available' };
      } catch (error) {
        return { success: false, message: error.message };
      }
    });
    console.log('Capture result:', captureResult);
    
    if (captureResult.success) {
      console.log(`\n✅ Error captured! Event ID: ${captureResult.eventId}`);
      console.log('   Check your Sentry dashboard for the error');
    } else {
      console.log(`\n❌ Error capture failed: ${captureResult.message}`);
    }
  } else {
    console.log('\n❌ Sentry is NOT properly initialized');
    console.log(`   Has Sentry object: ${sentryInfo.hasSentry}`);
    console.log(`   Can capture errors: ${sentryInfo.canCapture}`);
    console.log(`   Is initialized: ${sentryInfo.isInitialized}`);
  }
  
  await browser.close();
}

testSentry().catch(console.error);

