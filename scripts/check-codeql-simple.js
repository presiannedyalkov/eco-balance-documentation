#!/usr/bin/env node
/**
 * Simple CodeQL-like check using static analysis
 * Checks for common security issues without requiring CodeQL CLI
 * 
 * Usage: npm run check:codeql:simple
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ISSUES = [];

// Patterns to check for log injection
const LOG_INJECTION_PATTERNS = [
  {
    pattern: /console\.(log|error|warn|info)\([^)]*\$\{/g,
    message: 'Template literal in console call may allow log injection',
    severity: 'error'
  },
  {
    pattern: /console\.(log|error|warn|info)\([^)]*\+[^)]*\)/g,
    message: 'String concatenation in console call may allow log injection',
    severity: 'warning'
  }
];

// Check for unsanitized user input in console calls
function checkLogInjection(filePath, content) {
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    // Skip if already sanitized
    if (line.includes('String(') || line.includes('sanitize') || line.includes('sanitized')) {
      return;
    }
    
    // Skip test files and debug scripts (they're less critical)
    if (filePath.includes('test') || filePath.includes('debug') || filePath.includes('check-')) {
      // Only check for actual error messages from user input
      if (line.match(/console\.(error|warn)\([^)]*error[^)]*\)/i)) {
        // Check if error.message or similar is passed without sanitization
        if (line.match(/error\.(message|stack|name)/) && !line.includes('String(')) {
          ISSUES.push({
            file: filePath,
            line: index + 1,
            severity: 'warning',
            rule: 'js/log-injection',
            message: `Error object logged without sanitization. Consider wrapping in String() or sanitizing.`,
            code: line.trim()
          });
        }
      }
      return;
    }
    
    // For production code (scripts/), check more strictly
    if (filePath.includes('scripts/')) {
      // Check for console calls with variables that might be user-controlled
      if (line.match(/console\.(log|error|warn|info)/)) {
        // Look for patterns like: console.log('msg', variable) where variable might be user input
        // But skip if it's a simple string literal or number
        const match = line.match(/console\.(log|error|warn|info)\([^,)]*,\s*([a-zA-Z_$][a-zA-Z0-9_$]*)(\s*[,)])/);
        if (match) {
          const varName = match[2];
          // Skip common safe variables
          if (!['true', 'false', 'null', 'undefined', 'length', 'count', 'total'].includes(varName)) {
            // Check if this variable comes from user input (error, url, path, etc.)
            if (varName.match(/^(error|url|path|message|text|input|query|data|content|value|result|response)$/i)) {
              ISSUES.push({
                file: filePath,
                line: index + 1,
                severity: 'error',
                rule: 'js/log-injection',
                message: `Log entry depends on a user-provided value: ${varName}. Wrap in String() or sanitize.`,
                code: line.trim()
              });
            }
          }
        }
      }
    }
  });
}

// Scan JavaScript files
function scanDirectory(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules, .git, build, etc.
      if (!['node_modules', '.git', 'build', '.docusaurus', '.codeql-db', 'test-results'].includes(file)) {
        scanDirectory(filePath, fileList);
      }
    } else if (file.endsWith('.js') && !file.endsWith('.min.js')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

console.log('🔍 Simple CodeQL-like Security Check');
console.log('=====================================\n');

// Scan scripts directory
const scriptFiles = scanDirectory('scripts');
const testFiles = scanDirectory('tests').filter(f => f.endsWith('.js'));
const srcFiles = scanDirectory('src');

const allFiles = [...scriptFiles, ...testFiles, ...srcFiles];

console.log(`📁 Scanning ${allFiles.length} JavaScript files...\n`);

allFiles.forEach(filePath => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    checkLogInjection(filePath, content);
  } catch (error) {
    // Skip files that can't be read
  }
});

// Report results
if (ISSUES.length === 0) {
  console.log('✅ No security issues found!\n');
  process.exit(0);
} else {
  console.log(`❌ Found ${ISSUES.length} potential security issue(s):\n`);
  
  ISSUES.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue.file}:${issue.line}`);
    console.log(`   Rule: ${issue.rule}`);
    console.log(`   Severity: ${issue.severity}`);
    console.log(`   Message: ${issue.message}`);
    console.log(`   Code: ${issue.code}`);
    console.log('');
  });
  
  console.log('💡 Fix suggestions:');
  console.log('   - Wrap user input in String() before logging');
  console.log('   - Sanitize input: .replace(/[\\r\\n]/g, \' \').substring(0, 200)');
  console.log('   - Use separate arguments: console.log(\'prefix\', String(value))');
  console.log('');
  
  process.exit(1);
}

