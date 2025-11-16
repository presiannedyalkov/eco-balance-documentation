#!/usr/bin/env node

/**
 * Fix frontmatter parsing errors in markdown files
 * Ensures all frontmatter values are properly quoted if they contain special characters
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'docs');

function fixFrontmatter(content) {
  // Match frontmatter block
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return content; // No frontmatter, return as-is
  }
  
  const frontmatterBlock = match[1];
  const lines = frontmatterBlock.split('\n');
  const fixedLines = [];
  
  for (const line of lines) {
    if (!line.trim() || line.startsWith('#')) {
      fixedLines.push(line);
      continue;
    }
    
    // Match key: value pattern
    const keyValueMatch = line.match(/^(\s*)([^:]+):\s*(.+)$/);
    if (!keyValueMatch) {
      fixedLines.push(line);
      continue;
    }
    
    const [, indent, key, value] = keyValueMatch;
    const trimmedValue = value.trim();
    
    // Check if value needs quoting
    const needsQuoting = 
      trimmedValue.includes(':') ||
      trimmedValue.includes("'") ||
      trimmedValue.includes('"') ||
      trimmedValue.includes('&') ||
      trimmedValue.includes('[') ||
      trimmedValue.includes(']') ||
      trimmedValue.includes('{') ||
      trimmedValue.includes('}') ||
      trimmedValue.includes('|') ||
      trimmedValue.includes('*') ||
      trimmedValue.includes('#') ||
      trimmedValue.includes('!') ||
      trimmedValue.startsWith('@') ||
      /^\d+$/.test(trimmedValue) === false && trimmedValue.includes(' ') ||
      trimmedValue === 'true' ||
      trimmedValue === 'false' ||
      trimmedValue === 'null';
    
    // Skip if already quoted
    if ((trimmedValue.startsWith('"') && trimmedValue.endsWith('"')) ||
        (trimmedValue.startsWith("'") && trimmedValue.endsWith("'"))) {
      fixedLines.push(line);
      continue;
    }
    
    if (needsQuoting) {
      // Escape quotes and wrap in double quotes
      const escapedValue = trimmedValue.replace(/"/g, '\\"');
      fixedLines.push(`${indent}${key}: "${escapedValue}"`);
    } else {
      fixedLines.push(line);
    }
  }
  
  const fixedFrontmatter = fixedLines.join('\n');
  return content.replace(frontmatterRegex, `---\n${fixedFrontmatter}\n---\n`);
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixed = fixFrontmatter(content);
    
    if (content !== fixed) {
      fs.writeFileSync(filePath, fixed, 'utf8');
      console.log(`✅ Fixed: ${path.relative(process.cwd(), filePath)}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function processDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`⚠️  Directory not found: ${dir}`);
    return;
  }
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let fixedCount = 0;
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      fixedCount += processDirectory(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      if (processFile(fullPath)) {
        fixedCount++;
      }
    }
  }
  
  return fixedCount;
}

console.log('🔧 Fixing frontmatter in markdown files...\n');
const fixed = processDirectory(DOCS_DIR);
console.log(`\n✅ Fixed ${fixed || 0} file(s)`);

