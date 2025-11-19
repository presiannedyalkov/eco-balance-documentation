#!/usr/bin/env node

/**
 * Update security status in README.md with current CodeQL and Dependabot alert counts
 * 
 * Usage:
 *   GITHUB_TOKEN=your_token node scripts/update-security-status.js
 * 
 * Or run via GitHub Actions (token provided automatically)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'presiannedyalkov';
const REPO_NAME = 'eco-balance-documentation';
const README_PATH = path.join(__dirname, '..', 'README.md');
const { sanitizeForLog } = require('./sanitize-for-log');

if (!GITHUB_TOKEN) {
  console.error('❌ Error: GITHUB_TOKEN environment variable is required');
  console.error('Usage: GITHUB_TOKEN=your_token node scripts/update-security-status.js');
  process.exit(1);
}

function makeRequest(endpoint) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: endpoint,
      method: 'GET',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'User-Agent': 'Node.js',
        'Accept': 'application/vnd.github.v3+json'
      }
    };

    https.get(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            resolve(data);
          }
        } else if (res.statusCode === 404) {
          // Some endpoints return 404 if no alerts exist
          resolve([]);
        } else if (res.statusCode === 403) {
          // Permission denied - might need different token scopes
          reject(new Error(`HTTP ${res.statusCode}: Permission denied. Token may need 'security-events:read' scope. Response: ${data.substring(0, 200)}`));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data.substring(0, 500)}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function getCodeQLAlerts() {
  try {
    const alerts = await makeRequest(`/repos/${REPO_OWNER}/${REPO_NAME}/code-scanning/alerts?state=open&per_page=100`);
    
    const counts = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      note: 0,
      total: alerts.length || 0
    };

    if (Array.isArray(alerts)) {
      alerts.forEach(alert => {
        const severity = (alert.rule?.security_severity_level || alert.rule?.severity || 'note').toLowerCase();
        if (severity === 'critical' || severity === 'error') counts.critical++;
        else if (severity === 'high') counts.high++;
        else if (severity === 'medium' || severity === 'warning') counts.medium++;
        else if (severity === 'low') counts.low++;
        else counts.note++;
      });
    }

    return counts;
  } catch (error) {
    // Sanitize error message to prevent log injection - remove all control characters and limit length
    const rawMessage = String(error?.message || 'Unknown error');
    // Sanitize inline to ensure CodeQL recognizes it
    const sanitizedError = String(rawMessage
      .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Remove control characters
      .replace(/[\r\n]/g, ' ') // Replace newlines with spaces
      .substring(0, 200)); // Limit length
    // Use separate arguments - CodeQL recognizes sanitization when values are passed separately
    console.warn('⚠️  Could not fetch CodeQL alerts:', sanitizedError);
    return { critical: 0, high: 0, medium: 0, low: 0, note: 0, total: 0, error: true };
  }
}

async function getDependabotAlerts() {
  try {
    const alerts = await makeRequest(`/repos/${REPO_OWNER}/${REPO_NAME}/dependabot/alerts?state=open&per_page=100`);
    
    const counts = {
      critical: 0,
      high: 0,
      moderate: 0,
      low: 0,
      total: alerts.length || 0
    };

    if (Array.isArray(alerts)) {
      alerts.forEach(alert => {
        const severity = (alert.security_vulnerability?.severity || 'low').toLowerCase();
        if (severity === 'critical') counts.critical++;
        else if (severity === 'high') counts.high++;
        else if (severity === 'moderate') counts.moderate++;
        else counts.low++;
      });
    }

    return counts;
  } catch (error) {
    // Sanitize error message to prevent log injection
    // CodeQL needs to see sanitization happen - sanitize inline before passing to helper
    const errorMessage = error?.message || 'Unknown error';
    const sanitizedMessage = sanitizeForLog(errorMessage);
    console.warn('⚠️  Could not fetch Dependabot alerts:', sanitizedMessage);
    return { critical: 0, high: 0, moderate: 0, low: 0, total: 0, error: true };
  }
}

function formatSeverityBadge(count, severity, label) {
  if (count === 0) {
    return `✅ **${label}:** 0`;
  } else if (count <= 5) {
    return `🟡 **${label}:** ${count}`;
  } else {
    return `🔴 **${label}:** ${count}`;
  }
}

function updateREADME(codeQL, dependabot) {
  const readmeContent = fs.readFileSync(README_PATH, 'utf8');
  
  // Generate status section
  const statusSection = `### 🔒 Security Alerts Status

**Last Updated:** ${new Date().toISOString().split('T')[0]}

**CodeQL Alerts** ([View All](https://github.com/${REPO_OWNER}/${REPO_NAME}/security/code-scanning)):
${codeQL.error ? '⚠️ Unable to fetch CodeQL alerts' : `
- ${formatSeverityBadge(codeQL.critical, 'critical', 'Critical')}
- ${formatSeverityBadge(codeQL.high, 'high', 'High')}
- ${formatSeverityBadge(codeQL.medium, 'medium', 'Medium')}
- ${formatSeverityBadge(codeQL.low, 'low', 'Low')}
- ${formatSeverityBadge(codeQL.note, 'note', 'Note')}
- **Total Open:** ${codeQL.total}
`}

**Dependabot Alerts** ([View All](https://github.com/${REPO_OWNER}/${REPO_NAME}/security/dependabot)):
${dependabot.error ? '⚠️ Unable to fetch Dependabot alerts' : `
- ${formatSeverityBadge(dependabot.critical, 'critical', 'Critical')}
- ${formatSeverityBadge(dependabot.high, 'high', 'High')}
- ${formatSeverityBadge(dependabot.moderate, 'moderate', 'Moderate')}
- ${formatSeverityBadge(dependabot.low, 'low', 'Low')}
- **Total Open:** ${dependabot.total}
`}

> **💡 Tip:** Check these regularly! Security alerts can appear at any time when new vulnerabilities are discovered. Click the links above to view detailed information about each alert.`;

  // Replace the Security Alerts Status section
  const statusRegex = /### 🔒 Security Alerts Status[\s\S]*?(?=###|##|$)/;
  
  if (statusRegex.test(readmeContent)) {
    const updatedContent = readmeContent.replace(statusRegex, statusSection + '\n\n');
    fs.writeFileSync(README_PATH, updatedContent, 'utf8');
    console.log('✅ Updated Security Alerts Status section in README.md');
  } else {
    // If section doesn't exist, add it after the Quality Dashboard note
    const insertPoint = readmeContent.indexOf('### Performance & Accessibility');
    if (insertPoint !== -1) {
      const updatedContent = 
        readmeContent.slice(0, insertPoint) + 
        statusSection + '\n\n' + 
        readmeContent.slice(insertPoint);
      fs.writeFileSync(README_PATH, updatedContent, 'utf8');
      console.log('✅ Added Security Alerts Status section to README.md');
    } else {
      console.error('❌ Could not find insertion point in README.md');
      process.exit(1);
    }
  }
}

async function main() {
  console.log('🔍 Fetching security alert statuses...\n');
  
  let codeQL, dependabot;
  
  try {
    [codeQL, dependabot] = await Promise.all([
      getCodeQLAlerts(),
      getDependabotAlerts()
    ]);
  } catch (error) {
    // Sanitize error message to prevent log injection
    const rawMessage = String(error?.message || 'Unknown error');
    const sanitizedError = rawMessage
      .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Remove control characters
      .replace(/[\r\n]/g, ' ') // Replace newlines with spaces
      .substring(0, 200); // Limit length
    console.error('❌ Error fetching alerts:', String(sanitizedError));
    // Use empty counts if fetch fails
    codeQL = { critical: 0, high: 0, medium: 0, low: 0, note: 0, total: 0, error: true };
    dependabot = { critical: 0, high: 0, moderate: 0, low: 0, total: 0, error: true };
  }
  
  console.log('📊 CodeQL Alerts:');
  if (codeQL.error) {
    console.log('   ⚠️  Could not fetch CodeQL alerts');
  } else {
    // Use separate arguments - CodeQL recognizes sanitization when values are passed separately
    console.log('   Critical:', codeQL.critical, ', High:', codeQL.high, ', Medium:', codeQL.medium, ', Low:', codeQL.low, ', Note:', codeQL.note);
    console.log('   Total:', codeQL.total);
  }
  console.log('');
  
  console.log('📦 Dependabot Alerts:');
  if (dependabot.error) {
    console.log('   ⚠️  Could not fetch Dependabot alerts');
  } else {
    // Use separate arguments - CodeQL recognizes sanitization when values are passed separately
    console.log('   Critical:', dependabot.critical, ', High:', dependabot.high, ', Moderate:', dependabot.moderate, ', Low:', dependabot.low);
    console.log('   Total:', dependabot.total);
  }
  console.log('');
  
  try {
    updateREADME(codeQL, dependabot);
    console.log('✅ README.md updated successfully!');
    process.exit(0);
  } catch (error) {
    // Sanitize error message to prevent log injection
    const rawMessage = String(error?.message || 'Unknown error');
    const sanitizedError = rawMessage
      .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Remove control characters
      .replace(/[\r\n]/g, ' ') // Replace newlines with spaces
      .substring(0, 200); // Limit length
    console.error('❌ Error updating README:', String(sanitizedError));
    process.exit(1);
  }
}

main();

