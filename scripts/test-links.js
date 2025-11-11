#!/usr/bin/env node
/**
 * Test script to check for broken links in the Docusaurus documentation site
 * 
 * Usage:
 *   npm run build
 *   node scripts/test-links.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BUILD_DIR = path.join(__dirname, '..', 'build');
const BASE_URL = '/eco-balance-documentation';

// Patterns to ignore (external links, anchors, etc.)
const IGNORE_PATTERNS = [
  /^https?:\/\//,  // External URLs
  /^mailto:/,      // Email links
  /^tel:/,         // Phone links
  /^#/,            // Anchors
  /^javascript:/,  // JavaScript links
  /\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/i, // Static assets
];

// Known good external links (add as needed)
const KNOWN_GOOD_EXTERNAL = [
  'https://www.un.org/sustainabledevelopment/climate-action/',
  'https://github.com/your-username/eco-balance-documentation',
];

function extractLinks(htmlContent, filePath) {
  const links = [];
  const linkRegex = /href=["']([^"']+)["']/g;
  let match;
  
  while ((match = linkRegex.exec(htmlContent)) !== null) {
    const href = match[1];
    
    // Skip ignored patterns
    if (IGNORE_PATTERNS.some(pattern => pattern.test(href))) {
      continue;
    }
    
    // Skip known good external links
    if (KNOWN_GOOD_EXTERNAL.includes(href)) {
      continue;
    }
    
    links.push({
      href,
      file: filePath,
    });
  }
  
  return links;
}

function checkLink(link, allFiles) {
  const { href, file } = link;
  
  // Remove base URL if present
  let normalizedHref = href;
  if (href.startsWith(BASE_URL)) {
    normalizedHref = href.substring(BASE_URL.length);
  }
  
  // Handle absolute paths (starting with /)
  if (normalizedHref.startsWith('/')) {
    // Remove leading slash for file system path
    let filePath = normalizedHref.substring(1);
    
    // Handle root/homepage - Docusaurus redirects / to /docs/intro
    if (filePath === '' || filePath === BASE_URL.substring(1)) {
      // Check if docs/intro exists (homepage redirects there)
      const introPath = path.join(BUILD_DIR, 'docs', 'intro', 'index.html');
      return {
        valid: fs.existsSync(introPath),
        target: 'docs/intro/index.html (homepage redirect)',
        file: path.relative(BUILD_DIR, file),
        href,
      };
    }
    
    // Handle directory paths (add index.html)
    if (filePath.endsWith('/')) {
      filePath = filePath + 'index.html';
    } else if (!filePath.endsWith('.html') && !filePath.includes('.')) {
      // If no extension, assume it's a directory
      const dirPath = path.join(BUILD_DIR, filePath);
      if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
        filePath = filePath + '/index.html';
      } else {
        // Try with .html extension
        filePath = filePath + '.html';
      }
    }
    
    const targetPath = path.join(BUILD_DIR, filePath);
    const exists = fs.existsSync(targetPath);
    
    return {
      valid: exists,
      target: filePath,
      file: path.relative(BUILD_DIR, file),
      href,
    };
  }
  
  // Handle relative paths
  const fileDir = path.dirname(file);
  let targetPath = path.resolve(fileDir, normalizedHref);
  
  // Normalize the path
  targetPath = path.normalize(targetPath);
  
  // Check if target exists
  const exists = fs.existsSync(targetPath);
  
  // Also check if it's a directory that should have index.html
  if (!exists && fs.existsSync(targetPath + '.html')) {
    return {
      valid: true,
      target: path.relative(BUILD_DIR, targetPath + '.html'),
      file: path.relative(BUILD_DIR, file),
      href,
    };
  }
  
  return {
    valid: exists,
    target: path.relative(BUILD_DIR, targetPath),
    file: path.relative(BUILD_DIR, file),
    href,
  };
}

function findAllHtmlFiles(dir) {
  const files = [];
  
  function walk(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.html')) {
        files.push(fullPath);
      }
    }
  }
  
  walk(dir);
  return files;
}

function main() {
  console.log('🔍 Checking for broken links in documentation site...\n');
  
  if (!fs.existsSync(BUILD_DIR)) {
    console.error('❌ Build directory not found. Please run "npm run build" first.');
    process.exit(1);
  }
  
  const htmlFiles = findAllHtmlFiles(BUILD_DIR);
  console.log(`📄 Found ${htmlFiles.length} HTML files to check\n`);
  
  const allLinks = [];
  
  // Extract all links from HTML files
  for (const htmlFile of htmlFiles) {
    const content = fs.readFileSync(htmlFile, 'utf-8');
    const links = extractLinks(content, htmlFile);
    allLinks.push(...links);
  }
  
  console.log(`🔗 Found ${allLinks.length} links to check\n`);
  
  // Check each link
  const brokenLinks = [];
  const validLinks = [];
  
  for (const link of allLinks) {
    const result = checkLink(link, htmlFiles);
    
    if (result.valid) {
      validLinks.push(result);
    } else {
      brokenLinks.push(result);
    }
  }
  
  // Report results
  console.log('📊 Results:\n');
  console.log(`✅ Valid links: ${validLinks.length}`);
  console.log(`❌ Broken links: ${brokenLinks.length}\n`);
  
  if (brokenLinks.length > 0) {
    console.log('❌ Broken Links:\n');
    for (const broken of brokenLinks) {
      console.log(`  File: ${broken.file}`);
      console.log(`  Link: ${broken.href}`);
      console.log(`  Target: ${broken.target}`);
      console.log('');
    }
    process.exit(1);
  } else {
    console.log('✅ All links are valid!');
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };

