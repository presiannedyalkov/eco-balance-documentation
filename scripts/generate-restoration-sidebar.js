const fs = require('fs');
const path = require('path');

const RESTORATION_PLAYBOOK_DIR = path.join(__dirname, '..', 'docs', 'restoration-playbook');

/**
 * Generate sidebar structure for restoration playbook
 */
function generateSidebarItems() {
  const items = [];
  
  // Add README first
  items.push('restoration-playbook/README');
  
  // Get all categories (directories)
  const entries = fs.readdirSync(RESTORATION_PLAYBOOK_DIR, { withFileTypes: true });
  const categories = entries
    .filter(e => e.isDirectory())
    .map(e => e.name)
    .sort();
  
  for (const category of categories) {
    const categoryPath = path.join(RESTORATION_PLAYBOOK_DIR, category);
    const files = fs.readdirSync(categoryPath)
      .filter(f => f.endsWith('.md'))
      .sort()
      .map(f => `restoration-playbook/${category}/${f.replace('.md', '')}`);
    
    if (files.length > 0) {
      const categoryLabel = category
        .split('_')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      
      items.push({
        type: 'category',
        label: categoryLabel,
        items: files,
      });
    }
  }
  
  return items;
}

// Generate and print sidebar structure
const sidebarItems = generateSidebarItems();
console.log(JSON.stringify(sidebarItems, null, 2));

