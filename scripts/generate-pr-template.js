#!/usr/bin/env node
/**
 * Generate PR template with pre-filled checkboxes based on branch name
 * This script is called by a GitHub Action to generate the PR body
 */

const branchName = process.env.GITHUB_HEAD_REF || process.argv[2] || '';

// Determine change type from branch name
let checkedType = '';
let checkedIndex = -1;

if (branchName.startsWith('feature/')) {
  checkedType = 'New feature';
  checkedIndex = 1; // 0-indexed, so 1 = second item
} else if (branchName.startsWith('fix/')) {
  checkedType = 'Bug fix';
  checkedIndex = 0;
} else if (branchName.startsWith('docs/')) {
  checkedType = 'Documentation update';
  checkedIndex = 3;
} else if (branchName.startsWith('chore/')) {
  checkedType = 'Chore';
  checkedIndex = 4;
} else if (branchName.startsWith('refactor/')) {
  checkedType = 'Refactoring';
  checkedIndex = 5;
}

// Read the template
const fs = require('fs');
const path = require('path');
const templatePath = path.join(__dirname, '..', '.github', 'PULL_REQUEST_TEMPLATE.md');
let template = fs.readFileSync(templatePath, 'utf8');

// Replace checkboxes based on detected type
if (checkedIndex >= 0) {
  const checkboxes = [
    '- [ ] Bug fix',
    '- [ ] New feature',
    '- [ ] Breaking change',
    '- [ ] Documentation update',
    '- [ ] Chore',
    '- [ ] Refactoring'
  ];
  
  // Replace the appropriate checkbox with checked version
  const uncheckedPattern = checkboxes[checkedIndex];
  const checkedPattern = uncheckedPattern.replace('[ ]', '[x]');
  template = template.replace(uncheckedPattern, checkedPattern);
  
  // Also update the comment
  template = template.replace(
    /<!-- Auto-selected for .*? branches -->/,
    `<!-- ✅ Auto-selected: ${checkedType} (branch: ${branchName}) -->`
  );
}

console.log(template);

