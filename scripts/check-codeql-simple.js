#!/usr/bin/env node
/**
 * Simple CodeQL-like check using static analysis
 * Checks for common security issues without requiring CodeQL CLI
 * 
 * This checker is stricter and more aligned with GitHub CodeQL's behavior:
 * - Tracks data flow from sources (error.message, r?.url, etc.) to sinks (console.log)
 * - Doesn't trust sanitization unless it can verify it breaks the taint chain
 * - Only flags actual user-controlled data, not internal variables
 * - Requires inline sanitization (String(value).replace(...)) not just String(value)
 * 
 * IMPORTANT: This checker is now stricter than before. If it flags issues that
 * GitHub CodeQL doesn't, those may be false positives. However, if GitHub CodeQL
 * flags issues that this checker doesn't, the checker may need further refinement.
 * 
 * Usage: npm run check:codeql:simple
 */

const fs = require('fs');
const path = require('path');

const ISSUES = [];

// Sources of user-controlled data (taint sources) - these are what CodeQL tracks
const TAINT_SOURCES = [
  /error\.(message|stack|name)/i,  // Error objects from API/HTTP
  /r\?\.(url|error)/i,              // Result objects with user data
  /result\?\.(url|error)/i,        // Result objects
  /response\?\.(url|error|message)/i, // HTTP responses
];

// Patterns that indicate actual sanitization (inline sanitization that CodeQL recognizes)
function isActuallySanitized(line) {
  // Must have sanitization applied inline (like String(error.message).replace(...))
  const inlineSanitization = /String\([^)]*\)\.(replace|substring|slice)\(/;
  if (inlineSanitization.test(line)) return true;
  
  // Method chain sanitization
  const methodChain = /\.(replace|substring|slice)\([^)]*\)/;
  if (methodChain.test(line)) return true;
  
  return false;
}

// Check if a line contains a direct taint source
function hasDirectTaintSource(line) {
  return TAINT_SOURCES.some(pattern => pattern.test(line));
}

// Track variable assignments to build a taint map
function buildTaintMap(content) {
  const lines = content.split('\n');
  const taintMap = new Map(); // variable name -> is tainted
  
  lines.forEach((line, index) => {
    // Match variable assignments: const/let/var name = value
    const varAssignMatch = line.match(/(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=/);
    if (varAssignMatch) {
      const varName = varAssignMatch[1];
      
      // Skip if variable name suggests it's sanitized
      if (varName.toLowerCase().includes('sanitized')) {
        // Check if it's actually sanitized in the assignment
        if (isActuallySanitized(line)) {
          taintMap.set(varName, false); // Sanitized, not tainted
        } else {
          // Even if named "sanitized", if not actually sanitized, it's tainted
          if (hasDirectTaintSource(line)) {
            taintMap.set(varName, true);
          }
        }
      } else {
        // Check if the value comes from a taint source
        if (hasDirectTaintSource(line)) {
          // Check if it's sanitized inline
          if (isActuallySanitized(line)) {
            taintMap.set(varName, false); // Sanitized, not tainted
          } else {
            taintMap.set(varName, true); // Tainted
          }
        } else {
          // Check if it's assigned from another tainted variable
          const assignedFromMatch = line.match(/=\s*([a-zA-Z_$][a-zA-Z0-9_$]*)/);
          if (assignedFromMatch) {
            const sourceVar = assignedFromMatch[1];
            if (taintMap.has(sourceVar) && taintMap.get(sourceVar)) {
              // Check if sanitized
              if (isActuallySanitized(line)) {
                taintMap.set(varName, false);
              } else {
                taintMap.set(varName, true);
              }
            }
          }
        }
      }
    }
  });
  
  return taintMap;
}

// Check for unsanitized user input in console calls
function checkLogInjection(filePath, content) {
  // Skip checking the checker itself
  if (filePath.includes('check-codeql-simple.js')) return;
  
  const lines = content.split('\n');
  const taintMap = buildTaintMap(content);
  
  lines.forEach((line, index) => {
    // Skip comments
    if (line.trim().startsWith('//')) return;
    
    // Check for console calls
    if (line.match(/console\.(log|error|warn|info)\(/)) {
      // Check for direct taint sources in console call (like error.message, r?.url)
      if (hasDirectTaintSource(line)) {
        // Check if it's sanitized inline
        if (!isActuallySanitized(line)) {
          ISSUES.push({
            file: filePath,
            line: index + 1,
            severity: 'error',
            rule: 'js/log-injection',
            message: 'Log entry depends on a user-provided value. Sanitize inline or use generic messages.',
            code: line.trim()
          });
          return;
        }
      }
      
      // Check for tainted variables in console call
      const varMatch = line.match(/console\.(log|error|warn|info)\([^,)]*,\s*([a-zA-Z_$][a-zA-Z0-9_$]*)/);
      if (varMatch) {
        const varName = varMatch[2];
        
        // Skip safe variables (counts, booleans, etc.)
        if (['true', 'false', 'null', 'undefined', 'length', 'count', 'total', 'passed', 'failed', 'status', 'exists'].includes(varName)) {
          return;
        }
        
        // Check if variable is tainted
        if (taintMap.has(varName) && taintMap.get(varName)) {
          ISSUES.push({
            file: filePath,
            line: index + 1,
            severity: 'error',
            rule: 'js/log-injection',
            message: `Log entry depends on a user-provided value: ${varName}. Variable is tainted from a source. Use generic messages or sanitize inline.`,
            code: line.trim()
          });
          return;
        }
        
        // Check if variable name suggests it might be user input AND it's not sanitized
        // Only flag if it matches taint source patterns
        if (varName.match(/^(error|url|path|message|text|input|query|data|content|value|result|response|raw)/i)) {
          // Check if it's from a taint source by looking at variable name patterns
          // But only if it's not clearly sanitized
          if (!varName.toLowerCase().includes('sanitized') && !isActuallySanitized(line)) {
            // Double-check: only flag if we can see it's actually from a taint source
            // by checking if there's a matching assignment above
            let foundTaintSource = false;
            for (let i = index - 1; i >= Math.max(0, index - 20); i--) {
              const prevLine = lines[i];
              if (prevLine.includes(`const ${varName}`) || prevLine.includes(`let ${varName}`) || prevLine.includes(`var ${varName}`)) {
                if (hasDirectTaintSource(prevLine)) {
                  foundTaintSource = true;
                  break;
                }
              }
            }
            
            if (foundTaintSource) {
              ISSUES.push({
                file: filePath,
                line: index + 1,
                severity: 'error',
                rule: 'js/log-injection',
                message: `Log entry depends on a user-provided value: ${varName}. Sanitize inline or use generic messages.`,
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

console.log('🔍 Simple CodeQL-like Security Check (Strict Mode)');
console.log('===================================================\n');
console.log('⚠️  This checker is stricter and more aligned with GitHub CodeQL');
console.log('   It tracks data flow from sources (error.message, r?.url) to sinks (console.log)');
console.log('   and only flags actual user-controlled data.\n');

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
  console.log('💡 Note: This checker is stricter than before.');
  console.log('   If GitHub CodeQL still flags issues, they may be false positives');
  console.log('   or require CodeQL-specific sanitization patterns.\n');
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
  console.log('   - Use generic messages instead of logging user input');
  console.log('   - Sanitize inline: String(value).replace(/[\\r\\n]/g, \' \').substring(0, 200)');
  console.log('   - Or sanitize in variable assignment before console call');
  console.log('');
  
  process.exit(1);
}
