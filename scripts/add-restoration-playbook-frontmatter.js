const fs = require('fs');
const path = require('path');

const RESTORATION_PLAYBOOK_DIR = path.join(__dirname, '..', 'docs', 'restoration-playbook');

/**
 * Generate frontmatter for restoration playbook files
 */
function generateFrontmatter(filename, relativePath) {
  // Extract file info
  const basename = path.basename(filename, '.md');
  
  // Generate title from filename
  let title = basename
    .replace(/^[0-9]+_/, '') // Remove leading numbers
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
  
  // Special cases
  if (basename === 'README') {
    title = 'Restoration Playbook';
  }
  
  // Determine sidebar position from filename
  let sidebarPosition = 999;
  const numMatch = basename.match(/^(\d+)_/);
  if (numMatch) {
    sidebarPosition = parseInt(numMatch[1]);
  }
  
  // Escape title for YAML (quote if contains special characters)
  const escapedTitle = title.includes(':') || title.includes("'") || title.includes('"') || title.includes('&')
    ? `"${title.replace(/"/g, '\\"')}"`
    : title;
  
  return `---
title: ${escapedTitle}
sidebar_position: ${sidebarPosition}
---
`;
}

/**
 * Process a markdown file
 */
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Get relative path from restoration-playbook directory
  const relativePath = path.relative(RESTORATION_PLAYBOOK_DIR, filePath);
  const filename = path.basename(filePath);
  
  const frontmatter = generateFrontmatter(filename, relativePath);
  
  // Remove existing frontmatter if present
  if (content.startsWith('---')) {
    const frontmatterEnd = content.indexOf('---', 3);
    if (frontmatterEnd !== -1) {
      content = content.substring(frontmatterEnd + 3).trim();
    }
  }
  
  // Update "Back to Hub" links
  let updatedContent = content
    .replace(/← Back to \[\[.*?\|.*?\]\]/g, '[← Back to Project Hub](/)')
    .replace(/← Back to .*?Hub/g, '[← Back to Project Hub](/)');
  
  // Add frontmatter
  const newContent = frontmatter + '\n' + updatedContent;
  
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`✅ Processed: ${relativePath}`);
}

/**
 * Recursively process all markdown files
 */
function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      processFile(fullPath);
    }
  }
}

// Main execution
if (!fs.existsSync(RESTORATION_PLAYBOOK_DIR)) {
  console.error(`❌ Directory not found: ${RESTORATION_PLAYBOOK_DIR}`);
  process.exit(1);
}

console.log('🔄 Adding frontmatter to restoration playbook files...\n');
processDirectory(RESTORATION_PLAYBOOK_DIR);
console.log('\n✅ Done!');

