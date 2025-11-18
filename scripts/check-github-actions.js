#!/usr/bin/env node

/**
 * Check GitHub Actions workflow status
 * Usage: GITHUB_TOKEN=your_token node scripts/check-github-actions.js
 */

const https = require('https');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'presiannedyalkov';
const REPO_NAME = 'eco-balance-documentation';
const WORKFLOW_NAME = 'Deploy to GitHub Pages';

if (!GITHUB_TOKEN) {
  console.error('❌ Error: GITHUB_TOKEN environment variable is required');
  console.error('Usage: GITHUB_TOKEN=your_token node scripts/check-github-actions.js');
  console.error('\n📝 Token Requirements:');
  console.error('   Classic Token: Select "repo" scope (includes Actions access)');
  console.error('   Fine-grained Token: Select "Repository permissions" → "Actions: Read-only"');
  console.error('   Create at: https://github.com/settings/tokens');
  process.exit(1);
}

function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: path,
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
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function checkWorkflows() {
  try {
    console.log('🔍 Checking GitHub Actions workflows...\n');

    // Get workflow runs
    const runs = await makeRequest(
      `/repos/${REPO_OWNER}/${REPO_NAME}/actions/runs?per_page=5`
    );

    if (!runs.workflow_runs || runs.workflow_runs.length === 0) {
      console.log('⚠️  No workflow runs found');
      return;
    }

    // Find our deployment workflow
    const deployRuns = runs.workflow_runs.filter(
      run => run.name === WORKFLOW_NAME || run.path.includes('deploy.yml')
    );

    if (deployRuns.length === 0) {
      console.log('⚠️  No deployment workflow runs found');
      console.log('Available workflows:', runs.workflow_runs.map(r => r.name).join(', '));
      return;
    }

    const latestRun = deployRuns[0];
    console.log(`📋 Latest workflow run: ${latestRun.name}`);
    console.log(`   Status: ${latestRun.status}`);
    console.log(`   Conclusion: ${latestRun.conclusion || 'pending'}`);
    console.log(`   Created: ${new Date(latestRun.created_at).toLocaleString()}`);
    console.log(`   URL: ${latestRun.html_url}\n`);

      if (latestRun.conclusion === 'failure') {
      console.log('❌ Workflow failed! Fetching job details...\n');

      // Get jobs for this run
      const jobs = await makeRequest(latestRun.jobs_url);
      
      if (jobs.jobs && jobs.jobs.length > 0) {
        for (const job of jobs.jobs) {
          console.log(`\n📦 Job: ${job.name}`);
          console.log(`   Status: ${job.status}`);
          console.log(`   Conclusion: ${job.conclusion || 'pending'}`);
          
          if (job.conclusion === 'failure') {
            console.log(`   ❌ Failed steps:`);
            
            // Get steps
            if (job.steps) {
              for (const step of job.steps) {
                if (step.conclusion === 'failure') {
                  console.log(`      - ${step.name}: ${step.conclusion}`);
                  if (step.number) {
                    console.log(`         Logs: https://github.com/${REPO_OWNER}/${REPO_NAME}/actions/runs/${latestRun.id}/job/${job.id}`);
                  }
                }
              }
            }
          }
        }
      }

      console.log(`\n🔗 View full logs: ${latestRun.html_url}`);
      console.log(`\n💡 Common fixes:`);
      console.log(`   1. Check if GitHub Pages is enabled in repository settings`);
      console.log(`   2. Verify workflow permissions in Settings → Actions → General`);
      console.log(`   3. Check build errors in the Actions tab`);
      console.log(`   4. Ensure package.json and dependencies are correct`);
    } else if (latestRun.conclusion === 'success') {
      console.log('✅ Workflow completed successfully!');
      console.log(`   Site should be available at: https://${REPO_OWNER}.github.io/${REPO_NAME}/`);
    } else {
      console.log('⏳ Workflow is still running...');
    }

  } catch (error) {
    // Sanitize error message to prevent log injection - remove all control characters and limit length
    const rawMessage = String(error?.message || 'Unknown error');
    const sanitizedError = rawMessage
      .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Remove control characters
      .replace(/[\r\n]/g, ' ') // Replace newlines with spaces
      .substring(0, 200); // Limit length
    // Construct safe message with sanitized value - CodeQL recognizes sanitized variables
    const safeMessage = '❌ Error checking workflows: ' + sanitizedError;
    console.error(safeMessage);
    if (sanitizedError.includes('401') || sanitizedError.includes('403')) {
      console.error('\n💡 Token may be invalid or missing required permissions');
      console.error('   Classic Token: Need "repo" scope');
      console.error('   Fine-grained Token: Need "Actions: Read-only" permission');
      console.error('   Try: https://github.com/settings/tokens');
    }
    process.exit(1);
  }
}

checkWorkflows();

