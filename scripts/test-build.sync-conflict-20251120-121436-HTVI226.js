#!/usr/bin/env node
/**
 * Test script to verify the Docusaurus build
 * 
 * Usage:
 *   node scripts/test-build.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '..', 'build');

function checkBuild() {
  console.log('🔨 Testing Docusaurus build...\n');
  
  try {
    // Run build
    console.log('📦 Running build...');
    execSync('npm run build', { 
      stdio: 'inherit',
      cwd: path.join(__dirname, '..'),
    });
    
    console.log('\n✅ Build completed successfully!\n');
    
    // Check if build directory exists and has content
    if (!fs.existsSync(BUILD_DIR)) {
      console.error('❌ Build directory not found after build');
      process.exit(1);
    }
    
    const buildFiles = fs.readdirSync(BUILD_DIR);
    if (buildFiles.length === 0) {
      console.error('❌ Build directory is empty');
      process.exit(1);
    }
    
    // Check for key files
    const keyFiles = [
      'index.html',
      'docs/intro/index.html',
    ];
    
    console.log('📋 Checking for key files...');
    for (const keyFile of keyFiles) {
      const filePath = path.join(BUILD_DIR, keyFile);
      if (fs.existsSync(filePath)) {
        console.log(`  ✅ ${keyFile}`);
      } else {
        console.log(`  ⚠️  ${keyFile} not found (may be normal)`);
      }
    }
    
    console.log('\n✅ Build test passed!');
    console.log('\n💡 Next steps:');
    console.log('   1. Run "npm run serve" to test locally');
    console.log('   2. Run "node scripts/test-links.js" to check for broken links');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Build failed!');
    console.error(String(error.message));
    process.exit(1);
  }
}

if (require.main === module) {
  checkBuild();
}

module.exports = { checkBuild };

