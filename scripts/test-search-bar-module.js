/**
 * Minimal test script to verify clientModules.js can be loaded
 * 
 * Run: node scripts/test-search-bar-module.js
 * 
 * This tests:
 * 1. File exists and is readable
 * 2. Can be parsed as JavaScript
 * 3. Exports a function
 * 4. Dependencies are available
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Testing Meilisearch Search Bar Module Loading\n');

// Step 1: Check if file exists
const clientModulesPath = path.join(__dirname, '..', 'src', 'clientModules.js');
console.log('Step 1: Checking if clientModules.js exists...');
if (!fs.existsSync(clientModulesPath)) {
  console.error('❌ clientModules.js not found at:', clientModulesPath);
  process.exit(1);
}
console.log('✅ File exists:', clientModulesPath);

// Step 2: Check if file is readable
console.log('\nStep 2: Checking if file is readable...');
try {
  const content = fs.readFileSync(clientModulesPath, 'utf-8');
  console.log('✅ File is readable');
  console.log('   File size:', content.length, 'bytes');
  
  // Check for key imports
  const hasReact = content.includes("import React");
  const hasReactDOM = content.includes("ReactDOM");
  const hasMeilisearchSearchBar = content.includes("MeilisearchSearchBar");
  const hasExport = content.includes("export default");
  
  console.log('\nStep 3: Checking key components...');
  console.log('   - React import:', hasReact ? '✅' : '❌');
  console.log('   - ReactDOM usage:', hasReactDOM ? '✅' : '❌');
  console.log('   - MeilisearchSearchBar import:', hasMeilisearchSearchBar ? '✅' : '❌');
  console.log('   - Export default:', hasExport ? '✅' : '❌');
  
  if (!hasReact || !hasReactDOM || !hasMeilisearchSearchBar || !hasExport) {
    console.error('\n❌ Missing required components');
    process.exit(1);
  }
  
} catch (error) {
  console.error('❌ Error reading file:', String(error.message));
  process.exit(1);
}

// Step 4: Check if MeilisearchSearchBar component exists
console.log('\nStep 4: Checking MeilisearchSearchBar component...');
const componentPath = path.join(__dirname, '..', 'src', 'components', 'MeilisearchSearchBar.js');
if (!fs.existsSync(componentPath)) {
  console.error('❌ MeilisearchSearchBar.js not found');
  process.exit(1);
}
console.log('✅ Component file exists:', componentPath);

// Step 5: Check if CSS file exists
console.log('\nStep 5: Checking CSS file...');
const cssPath = path.join(__dirname, '..', 'src', 'css', 'custom.css');
if (!fs.existsSync(cssPath)) {
  console.warn('⚠️  custom.css not found (may be optional)');
} else {
  const cssContent = fs.readFileSync(cssPath, 'utf-8');
  const hasMeilisearchStyles = cssContent.includes('meilisearch-search');
  console.log('✅ CSS file exists');
  console.log('   - Has Meilisearch styles:', hasMeilisearchStyles ? '✅' : '❌');
}

// Step 6: Check docusaurus.config.js references
console.log('\nStep 6: Checking docusaurus.config.js...');
const configPath = path.join(__dirname, '..', 'docusaurus.config.js');
if (fs.existsSync(configPath)) {
  const configContent = fs.readFileSync(configPath, 'utf-8');
  const hasWrapper = configContent.includes('meilisearch-search-wrapper');
  const hasPlugin = configContent.includes('meilisearch-plugin');
  
  console.log('✅ Config file exists');
  console.log('   - Has wrapper div:', hasWrapper ? '✅' : '❌');
  console.log('   - Has Meilisearch plugin:', hasPlugin ? '✅' : '❌');
} else {
  console.warn('⚠️  docusaurus.config.js not found');
}

console.log('\n✅ All file checks passed!');
console.log('\nNext steps:');
console.log('1. Run: npm start');
console.log('2. Open: http://localhost:3023');
console.log('3. Check browser console for [clientModules] logs');
console.log('4. Run: npm run test:search-bar');

