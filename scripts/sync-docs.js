#!/usr/bin/env node

/**
 * Documentation Sync Script
 * 
 * Syncs changes from root directory files (source of truth) to docs/ directory (Docusaurus site)
 * 
 * Usage:
 *   node scripts/sync-docs.js [file1] [file2] ...
 *   node scripts/sync-docs.js  # syncs all mapped files
 */

const fs = require('fs');
const path = require('path');

// File mapping: root file -> { docs path, id, title, sidebar_position, category }
const FILE_MAPPING = {
  '00_Eco_Balance_Hub.md': {
    docsPath: 'docs/intro.md',
    id: 'intro',
    title: 'Project Hub',
    sidebarPosition: 0,
    category: 'Home'
  },
  '01_Executive_Summary.md': {
    docsPath: 'docs/vision-strategy/executive-summary.md',
    id: 'executive-summary',
    title: 'Executive Summary',
    sidebarPosition: 1,
    category: 'Vision & Strategy'
  },
  '02_Project_Vision.md': {
    docsPath: 'docs/vision-strategy/project-vision.md',
    id: 'project-vision',
    title: 'Project Vision & Context',
    sidebarPosition: 2,
    category: 'Vision & Strategy'
  },
  '03_Success_Factors.md': {
    docsPath: 'docs/vision-strategy/success-factors.md',
    id: 'success-factors',
    title: 'Success Factors & Assumptions',
    sidebarPosition: 3,
    category: 'Vision & Strategy'
  },
  '04_Current_Status_Assessment.md': {
    docsPath: 'docs/vision-strategy/current-status.md',
    id: 'current-status',
    title: 'Current Status & Assessment',
    sidebarPosition: 4,
    category: 'Vision & Strategy'
  },
  '10_Organizational_Structure.md': {
    docsPath: 'docs/organization/organizational-structure.md',
    id: 'organizational-structure',
    title: 'Organizational Structure',
    sidebarPosition: 1,
    category: 'Organization'
  },
  '11_Governance.md': {
    docsPath: 'docs/organization/governance.md',
    id: 'governance',
    title: 'Governance Framework',
    sidebarPosition: 2,
    category: 'Organization'
  },
  '12_Team_Roles.md': {
    docsPath: 'docs/organization/team-roles.md',
    id: 'team-roles',
    title: 'Team Roles',
    sidebarPosition: 3,
    category: 'Organization'
  },
  '13_Legal_Framework.md': {
    docsPath: 'docs/organization/legal-framework.md',
    id: 'legal-framework',
    title: 'Legal Framework',
    sidebarPosition: 4,
    category: 'Organization'
  },
  '20_Restoration_Methodology.md': {
    docsPath: 'docs/operations/restoration-methodology.md',
    id: 'restoration-methodology',
    title: 'Restoration Methodology',
    sidebarPosition: 1,
    category: 'Operations'
  },
  '21_Technology_Integration.md': {
    docsPath: 'docs/operations/technology-integration.md',
    id: 'technology-integration',
    title: 'Technology Integration',
    sidebarPosition: 2,
    category: 'Operations'
  },
  '22_Restoration_Challenges_Solutions.md': {
    docsPath: 'docs/operations/challenges-solutions.md',
    id: 'challenges-solutions',
    title: 'Restoration Challenges & Solutions',
    sidebarPosition: 3,
    category: 'Operations'
  },
  '30_Business_Model.md': {
    docsPath: 'docs/business/business-model.md',
    id: 'business-model',
    title: 'Business Model',
    sidebarPosition: 1,
    category: 'Business'
  },
  '31_Financial_Projections.md': {
    docsPath: 'docs/business/financial-projections.md',
    id: 'financial-projections',
    title: 'Financial Projections',
    sidebarPosition: 2,
    category: 'Business'
  },
  '32_Funding_Strategy.md': {
    docsPath: 'docs/business/funding-strategy.md',
    id: 'funding-strategy',
    title: 'Funding Strategy',
    sidebarPosition: 3,
    category: 'Business'
  },
  '40_Expansion_Growth_Strategy.md': {
    docsPath: 'docs/growth/expansion-strategy.md',
    id: 'expansion-strategy',
    title: 'Expansion Strategy',
    sidebarPosition: 1,
    category: 'Growth'
  },
  '42_Adaptive_Timeline.md': {
    docsPath: 'docs/growth/adaptive-timeline.md',
    id: 'adaptive-timeline',
    title: 'Adaptive Timeline',
    sidebarPosition: 2,
    category: 'Growth'
  },
  '43_Operations_Action_Plan.md': {
    docsPath: 'docs/growth/operations-action-plan.md',
    id: 'operations-action-plan',
    title: 'Operations Action Plan',
    sidebarPosition: 3,
    category: 'Growth'
  },
  '44_Site_Selection_Land_Acquisition.md': {
    docsPath: 'docs/growth/site-selection.md',
    id: 'site-selection',
    title: 'Site Selection',
    sidebarPosition: 4,
    category: 'Growth'
  },
  '45_Tiny_House_and_Living_Infrastructure.md': {
    docsPath: 'docs/growth/tiny-house-infrastructure.md',
    id: 'tiny-house-infrastructure',
    title: 'Tiny House Infrastructure',
    sidebarPosition: 5,
    category: 'Growth'
  },
  '50_Risk_Assessment.md': {
    docsPath: 'docs/performance/risk-assessment.md',
    id: 'risk-assessment',
    title: 'Risk Assessment',
    sidebarPosition: 1,
    category: 'Performance'
  },
  '51_Key_Performance_Indicators.md': {
    docsPath: 'docs/performance/kpis.md',
    id: 'kpis',
    title: 'Key Performance Indicators',
    sidebarPosition: 2,
    category: 'Performance'
  },
  '60_Marketing_Communications_Strategy.md': {
    docsPath: 'docs/engagement/marketing-communications.md',
    id: 'marketing-communications',
    title: 'Marketing & Communications',
    sidebarPosition: 1,
    category: 'Engagement'
  },
  '70_Case_Studies_Restoration_Examples.md': {
    docsPath: 'docs/learning/case-studies.md',
    id: 'case-studies',
    title: 'Case Studies & Examples',
    sidebarPosition: 1,
    category: 'Learning'
  },
  'ROADMAP.md': {
    docsPath: 'docs/resources/roadmap.md',
    id: 'roadmap',
    title: 'Roadmap',
    sidebarPosition: 2,
    category: 'Resources',
    sourcePath: '_process/documentation/ROADMAP.md'
  },
  'QUICK_REFERENCE_GUIDE.md': {
    docsPath: 'docs/resources/quick-reference.md',
    id: 'quick-reference',
    title: 'Quick Reference Guide',
    sidebarPosition: 1,
    category: 'Resources',
    sourcePath: '_process/documentation/QUICK_REFERENCE_GUIDE.md'
  },
  'FEATURE_WISHLIST.md': {
    docsPath: 'docs/resources/feature-wishlist.md',
    id: 'feature-wishlist',
    title: 'Feature Wishlist',
    sidebarPosition: 3,
    category: 'Resources',
    sourcePath: '_process/documentation/FEATURE_WISHLIST.md'
  }
};

// Reverse mapping for link conversion: root filename -> docs path
const LINK_MAPPING = {};
Object.entries(FILE_MAPPING).forEach(([rootFile, config]) => {
  const rootName = rootFile.replace(/\.md$/, '');
  LINK_MAPPING[rootName] = config.docsPath.replace(/^docs\//, '/docs/').replace(/\.md$/, '');
  
  // Also add mapping without numbers (for section links)
  const rootNameNoNumbers = rootName.replace(/^\d+_/, '');
  if (rootNameNoNumbers !== rootName) {
    LINK_MAPPING[rootNameNoNumbers] = config.docsPath.replace(/^docs\//, '/docs/').replace(/\.md$/, '');
  }
});

// Special link mappings
LINK_MAPPING['00_Eco_Balance_Hub'] = '/docs/intro';
LINK_MAPPING['Eco_Balance_Hub'] = '/docs/intro';
LINK_MAPPING['ROADMAP'] = '/docs/resources/roadmap';
LINK_MAPPING['QUICK_REFERENCE_GUIDE'] = '/docs/resources/quick-reference';
LINK_MAPPING['FEATURE_WISHLIST'] = '/docs/resources/feature-wishlist';

/**
 * Convert Obsidian-style links to Docusaurus links
 * @param {string} content - The markdown content to convert
 * @param {Set} unmappedSet - Optional set to track unmapped links
 */
function convertLinks(content, unmappedSet = null) {
  // Pattern: [[filename|display text]] or [[filename]] or [[filename#section|display]]
  const obsidianLinkPattern = /\[\[([^\]]+)\]\]/g;
  
  // Internal files that should be skipped (not part of public docs)
  const internalFiles = [
    '_versions', '_process', '_templates', '_vault_maintenance', 
    'archive', 'ai_skills', 'implementation_tasks', 'CHANGELOG'
  ];
  
  return content.replace(obsidianLinkPattern, (match, linkContent) => {
    const parts = linkContent.split('|');
    const linkPart = parts[0].trim();
    const displayText = parts[1] ? parts[1].trim() : linkPart.split('#')[0].split('/').pop();
    
    // Check for section links (filename#section)
    const sectionMatch = linkPart.match(/^([^#]+)#(.+)$/);
    const filename = sectionMatch ? sectionMatch[1].trim() : linkPart.trim();
    const section = sectionMatch ? sectionMatch[2].trim() : null;
    
    // Check if it's an internal file (skip silently - these aren't in public docs)
    const isInternal = internalFiles.some(internal => 
      filename.startsWith(internal) || 
      filename.startsWith('_') || 
      filename.includes('/') ||
      filename === 'CHANGELOG' ||
      filename === 'CHANGELOG.md'
    );
    if (isInternal) {
      // For internal files, just remove the link and keep the text
      // These files aren't part of the public documentation site
      return displayText;
    }
    
    // Check if we have a mapping for this file
    if (LINK_MAPPING[filename]) {
      const baseLink = LINK_MAPPING[filename];
      const anchor = section ? `#${section.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}` : '';
      return `[${displayText}](${baseLink}${anchor})`;
    }
    
    // If no mapping, try to find it in FILE_MAPPING
    const rootFile = filename + '.md';
    if (FILE_MAPPING[rootFile]) {
      const docsPath = FILE_MAPPING[rootFile].docsPath.replace(/^docs\//, '/docs/').replace(/\.md$/, '');
      const anchor = section ? `#${section.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}` : '';
      return `[${displayText}](${docsPath}${anchor})`;
    }
    
    // Try removing .md extension
    const rootFileNoExt = filename;
    if (FILE_MAPPING[rootFileNoExt + '.md']) {
      const docsPath = FILE_MAPPING[rootFileNoExt + '.md'].docsPath.replace(/^docs\//, '/docs/').replace(/\.md$/, '');
      const anchor = section ? `#${section.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}` : '';
      return `[${displayText}](${docsPath}${anchor})`;
    }
    
    // If still no mapping, check if it's a section link to a known file
    // Try to extract just the filename part (before any # or /)
    const baseFilename = filename.split('#')[0].split('/').pop().replace(/\.md$/, '');
    
    // Try with .md extension
    if (FILE_MAPPING[baseFilename + '.md']) {
      const docsPath = FILE_MAPPING[baseFilename + '.md'].docsPath.replace(/^docs\//, '/docs/').replace(/\.md$/, '');
      const anchor = section ? `#${section.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}` : '';
      return `[${displayText}](${docsPath}${anchor})`;
    }
    
    // Try matching by number prefix (e.g., "20_Restoration_Methodology" -> "20_Restoration_Methodology.md")
    const numberedMatch = Object.keys(FILE_MAPPING).find(key => {
      const keyBase = key.replace(/\.md$/, '');
      return keyBase === baseFilename || keyBase.endsWith('_' + baseFilename);
    });
    if (numberedMatch) {
      const docsPath = FILE_MAPPING[numberedMatch].docsPath.replace(/^docs\//, '/docs/').replace(/\.md$/, '');
      const anchor = section ? `#${section.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}` : '';
      return `[${displayText}](${docsPath}${anchor})`;
    }
    
    // If still no mapping and it's not clearly an internal file, keep original
    // Track for summary (but don't warn - these are likely internal files or placeholders)
    if (unmappedSet && !filename.startsWith('_') && !filename.includes('/') && 
        filename !== 'link' && filename !== 'filename' && filename.length > 2) {
      unmappedSet.add(match);
    }
    return match;
  });
}

/**
 * Generate Docusaurus frontmatter
 */
function generateFrontmatter(config) {
  // Add slug: / for intro page (homepage)
  if (config.id === 'intro') {
    return `---
id: ${config.id}
title: ${config.title}
sidebar_position: ${config.sidebarPosition}
slug: /
---
`;
  } else {
    return `---
id: ${config.id}
title: ${config.title}
sidebar_position: ${config.sidebarPosition}
---
`;
  }
}

// Track unmapped links for summary
const unmappedLinks = new Set();

/**
 * Sync a single file
 */
function syncFile(rootFile) {
  const mapping = FILE_MAPPING[rootFile];
  
  if (!mapping) {
    console.error(`❌ No mapping found for: ${rootFile}`);
    return false;
  }
  
  // Files are now in strategic/ folder (except 00_Eco_Balance_Hub.md which is in root)
  // Meta files are in _process/documentation/
  let rootPath;
  if (rootFile === '00_Eco_Balance_Hub.md') {
    rootPath = path.join(process.cwd(), rootFile);
  } else if (mapping.sourcePath) {
    rootPath = path.join(process.cwd(), mapping.sourcePath);
  } else {
    rootPath = path.join(process.cwd(), 'strategic', rootFile);
  }
  const docsPath = path.join(process.cwd(), mapping.docsPath);
  
  // Check if root file exists
  if (!fs.existsSync(rootPath)) {
    console.error(`❌ Root file not found: ${rootPath}`);
    return false;
  }
  
  // Read root file
  let content = fs.readFileSync(rootPath, 'utf8');
  
  // Remove existing frontmatter if present (we'll add our own)
  content = content.replace(/^---\n[\s\S]*?\n---\n\n?/, '');
  
  // Convert links (clears unmappedLinks for this file)
  const fileUnmapped = new Set();
  content = convertLinks(content, fileUnmapped);
  
  // Add to global set
  fileUnmapped.forEach(link => unmappedLinks.add(link));
  
  // Add Docusaurus frontmatter
  const frontmatter = generateFrontmatter(mapping);
  content = frontmatter + '\n' + content;
  
  // Ensure directory exists
  const docsDir = path.dirname(docsPath);
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }
  
  // Write to docs file
  fs.writeFileSync(docsPath, content, 'utf8');
  
  console.log(`✅ Synced: ${rootFile} → ${mapping.docsPath}`);
  return true;
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);
  const filesToSync = args.length > 0 ? args : Object.keys(FILE_MAPPING);
  
  // Clear unmapped links set
  unmappedLinks.clear();
  
  console.log('🔄 Starting documentation sync...\n');
  console.log(`📝 Files to sync: ${filesToSync.length}\n`);
  
  let successCount = 0;
  let failCount = 0;
  
  filesToSync.forEach(file => {
    if (syncFile(file)) {
      successCount++;
    } else {
      failCount++;
    }
  });
  
  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  
  if (unmappedLinks.size > 0) {
    console.log(`\n📋 Note: ${unmappedLinks.size} links couldn't be automatically converted:`);
    console.log(`   These are likely internal files (_process/, _versions/, etc.) or placeholders.`);
    console.log(`   They've been kept as-is or converted to plain text.`);
  }
  
  if (failCount === 0) {
    console.log(`\n🎉 All files synced successfully!`);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { syncFile, convertLinks, FILE_MAPPING };

