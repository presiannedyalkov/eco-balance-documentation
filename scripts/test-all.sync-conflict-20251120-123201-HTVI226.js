#!/usr/bin/env node
/**
 * Run all tests for the documentation site
 * 
 * Usage:
 *   node scripts/test-all.js
 */

const { execSync } = require('child_process');

console.log('🧪 Running all documentation tests...\n');

try {
  // Test 1: Build
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Test 1: Build Verification');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  execSync('node scripts/test-build.js', { 
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
  });
  
  console.log('\n');
  
  // Test 2: Link checking
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Test 2: Link Validation');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  execSync('node scripts/test-links.js', { 
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
  });
  
  console.log('\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ All tests passed!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  process.exit(0);
} catch (error) {
  console.error('\n❌ Tests failed!');
  process.exit(1);
}

