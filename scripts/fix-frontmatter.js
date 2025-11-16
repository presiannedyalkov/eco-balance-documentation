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
    
    // Skip if already quoted
    if ((trimmedValue.startsWith('"') && trimmedValue.endsWith('"')) ||
        (trimmedValue.startsWith("'") && trimmedValue.endsWith("'"))) {
      fixedLines.push(line);
      continue;
    }
    
    // Always quote all values to prevent parsing errors
    // This is the safest approach - YAML parsers can be finicky
    // Only exception: simple numbers and booleans that are already valid YAML
    const isSimpleNumber = /^-?\d+$/.test(trimmedValue); // e.g., 1, 42, -5
    const isSimpleFloat = /^-?\d+\.\d+$/.test(trimmedValue); // e.g., 1.0, 3.14
    const isBoolean = trimmedValue === 'true' || trimmedValue === 'false' || trimmedValue === 'null';
    const isEmpty = trimmedValue === '' || trimmedValue.length === 0;
    
    // Quote everything except simple numbers, floats, and booleans
    const needsQuoting = !isSimpleNumber && !isSimpleFloat && !isBoolean && !isEmpty;
    
    if (needsQuoting) {
      // Escape quotes and wrap in double quotes
      const escapedValue = trimmedValue.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
      fixedLines.push(`${indent}${key}: "${escapedValue}"`);
    } else {
      fixedLines.push(line);
    }
  }
  
  const fixedFrontmatter = fixedLines.join('\n');
  return content.replace(frontmatterRegex, `---\n${fixedFrontmatter}\n---\n`);
}

function processFile(filePath, verbose = false) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixed = fixFrontmatter(content);
    
    if (content !== fixed) {
      fs.writeFileSync(filePath, fixed, 'utf8');
      console.log(`✅ Fixed: ${path.relative(process.cwd(), filePath)}`);
      if (verbose) {
        console.log(`   Changed: ${content.substring(0, 100)}... → ${fixed.substring(0, 100)}...`);
      }
      return true;
    }
    if (verbose) {
      console.log(`✓ OK: ${path.relative(process.cwd(), filePath)}`);
    }
    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function processDirectory(dir, verbose = false) {
  if (!fs.existsSync(dir)) {
    console.log(`⚠️  Directory not found: ${dir}`);
    return 0;
  }
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let fixedCount = 0;
  let totalFiles = 0;
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      fixedCount += processDirectory(fullPath, verbose);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      totalFiles++;
      if (processFile(fullPath, verbose)) {
        fixedCount++;
      }
    }
  }
  
  if (verbose && totalFiles > 0) {
    console.log(`📊 Processed ${totalFiles} file(s) in ${path.relative(process.cwd(), dir)}`);
  }
  
  return fixedCount;
}

// Check for verbose flag
const verbose = process.argv.includes('--verbose') || process.argv.includes('-v');
const isCI = process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true';

console.log('🔧 Fixing frontmatter in markdown files...\n');
console.log(`📁 Processing directory: ${DOCS_DIR}`);
console.log(`📁 Directory exists: ${fs.existsSync(DOCS_DIR)}`);
if (isCI) {
  console.log(`🏗️  Running in CI environment`);
}
console.log('');

const fixed = processDirectory(DOCS_DIR, verbose || isCI);
console.log(`\n✅ Fixed ${fixed || 0} file(s)`);

// Verification: Check for any unquoted titles
if (fixed === 0) {
  console.log('\n🔍 Verifying files are properly fixed...');
  let unquotedCount = 0;
  function verifyDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        verifyDirectory(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n/);
          if (frontmatterMatch) {
            const frontmatter = frontmatterMatch[1];
            // Check for unquoted title values
            const titleMatch = frontmatter.match(/^title:\s*(.+)$/m);
            if (titleMatch) {
              const titleValue = titleMatch[1].trim();
              if (!titleValue.startsWith('"') && !titleValue.startsWith("'") && 
                  !/^-?\d+$/.test(titleValue) && !/^-?\d+\.\d+$/.test(titleValue) &&
                  titleValue !== 'true' && titleValue !== 'false' && titleValue !== 'null') {
                console.log(`⚠️  Unquoted title found: ${path.relative(process.cwd(), fullPath)} - "${titleValue}"`);
                unquotedCount++;
              }
            }
          }
        } catch (error) {
          // Skip errors during verification
        }
      }
    }
  }
  verifyDirectory(DOCS_DIR);
  if (unquotedCount > 0) {
    console.log(`\n⚠️  Found ${unquotedCount} file(s) with unquoted titles`);
  } else {
    console.log('✅ All titles are properly quoted');
  }
}

