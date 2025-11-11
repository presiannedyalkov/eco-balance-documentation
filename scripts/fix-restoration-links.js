const fs = require('fs');
const path = require('path');

const RESTORATION_PLAYBOOK_DIR = path.join(__dirname, '..', 'docs', 'restoration-playbook');

/**
 * Convert Obsidian-style links to Docusaurus links
 */
function convertLinks(content, filePath) {
  // Pattern: [[path|text]] or [[path]]
  const obsidianLinkPattern = /\[\[([^\]]+)\]\]/g;
  
  return content.replace(obsidianLinkPattern, (match, linkContent) => {
    const parts = linkContent.split('|');
    const linkPart = parts[0].trim();
    const displayText = parts[1] ? parts[1].trim() : linkPart.split('/').pop().replace(/\.md$/, '');
    
    // Handle relative paths
    let docusaurusPath = linkPart;
    
    // Remove .md extension if present
    docusaurusPath = docusaurusPath.replace(/\.md$/, '');
    
    // Handle relative paths (../../)
    if (docusaurusPath.startsWith('../')) {
      // For now, convert to absolute path from restoration-playbook root
      // This is a simplified conversion - may need refinement
      docusaurusPath = docusaurusPath.replace(/^\.\.\/\.\.\//, '');
      docusaurusPath = `/restoration-playbook/${docusaurusPath}`;
    } else if (!docusaurusPath.startsWith('/')) {
      // Relative path within same directory
      const dir = path.dirname(path.relative(RESTORATION_PLAYBOOK_DIR, filePath));
      if (dir === '.') {
        docusaurusPath = `/restoration-playbook/${docusaurusPath}`;
      } else {
        docusaurusPath = `/restoration-playbook/${dir}/${docusaurusPath}`;
      }
    }
    
    return `[${displayText}](${docusaurusPath})`;
  });
}

/**
 * Process a markdown file
 */
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const updatedContent = convertLinks(content, filePath);
  
  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`✅ Fixed links in: ${path.relative(RESTORATION_PLAYBOOK_DIR, filePath)}`);
  }
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
console.log('🔄 Fixing Obsidian links in restoration playbook...\n');
processDirectory(RESTORATION_PLAYBOOK_DIR);
console.log('\n✅ Done!');

