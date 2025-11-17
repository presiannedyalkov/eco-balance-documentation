/**
 * Docusaurus plugin for Meilisearch integration
 * 
 * This plugin:
 * 1. Indexes documentation pages at build time
 * 2. Provides search functionality via Meilisearch
 */

function pluginMeilisearch(context, options) {
  const {
    host,
    searchKey,
    masterKey, // Optional: for indexing (write permissions)
    indexName = 'docs',
    batchSize = 100,
  } = options;

  if (!host) {
    console.warn('⚠️  Meilisearch plugin: host is required');
    return {};
  }

  // For indexing, use masterKey if available, otherwise searchKey
  // masterKey has write permissions needed for indexing
  const indexingKey = masterKey || searchKey;
  
  if (!indexingKey) {
    console.warn('⚠️  Meilisearch plugin: searchKey or masterKey is required');
    return {};
  }

  return {
    name: 'docusaurus-plugin-meilisearch',
    
    async contentLoaded({ actions, allContent }) {
      // Plugin loaded - indexing happens in postBuild
    },

    async postBuild({ outDir }) {
      // Index content after build
      console.log('🔍 Meilisearch: Starting indexing...');
      
      try {
        // Lazy-load dependencies only when needed
        const { MeiliSearch } = require('meilisearch');
        const { JSDOM } = require('jsdom');
        const fs = require('fs');
        const path = require('path');
        const { glob } = require('glob');

        // Use masterKey for indexing (has write permissions)
        // If masterKey not provided, try searchKey (may fail if read-only)
        const client = new MeiliSearch({
          host: host,
          apiKey: indexingKey,
        });

        const index = client.index(indexName);

        // Configure index settings (only if index doesn't exist or needs update)
        try {
          await index.updateSettings({
            searchableAttributes: ['title', 'content', 'headings'],
            displayedAttributes: ['title', 'content', 'url', 'headings'],
            filterableAttributes: [],
            sortableAttributes: ['title'],
          });
        } catch (error) {
          // Index might not exist yet or settings might already be configured
          console.warn('⚠️  Could not update index settings:', error.message);
        }

        // Read and index HTML files
        const htmlFiles = await glob(`${outDir}/**/*.html`, {
          ignore: ['**/404.html', '**/search.html'],
        });

        const documents = [];

        for (const filePath of htmlFiles) {
          try {
            const html = fs.readFileSync(filePath, 'utf-8');
            const dom = new JSDOM(html);
            const document = dom.window.document;

            // Extract content
            const title = document.querySelector('title')?.textContent || '';
            const mainContent = document.querySelector('main') || document.body;
            const content = mainContent.textContent || '';
            
            // Extract headings
            const headings = Array.from(mainContent.querySelectorAll('h1, h2, h3'))
              .map(h => h.textContent)
              .join(' ');

            // Get URL (relative to baseUrl)
            const relativePath = path.relative(outDir, filePath);
            const url = '/' + relativePath.replace(/\\/g, '/');

            documents.push({
              id: url,
              title: title.replace(' | Eco Balance Documentation', '').trim(),
              content: content.substring(0, 10000), // Limit content size
              headings: headings.substring(0, 1000),
              url: url,
            });
          } catch (error) {
            console.warn(`⚠️  Error processing ${filePath}:`, error.message);
          }
        }

        // Index in batches
        for (let i = 0; i < documents.length; i += batchSize) {
          const batch = documents.slice(i, i + batchSize);
          try {
            await index.addDocuments(batch);
            console.log(`✅ Indexed batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(documents.length / batchSize)}`);
          } catch (error) {
            // If key doesn't have write permissions, skip indexing
            if (error.message && error.message.includes('API key')) {
              console.warn(`⚠️  Meilisearch indexing skipped: Key doesn't have write permissions. This is expected if using a search-only key.`);
              console.warn(`   Indexing requires a key with write permissions. Search functionality will still work with existing index.`);
              return; // Exit early, don't try to index more
            }
            throw error; // Re-throw other errors
          }
        }

        console.log(`✅ Meilisearch: Indexed ${documents.length} documents`);
      } catch (error) {
        // If it's an API key error, it's expected with search-only keys
        if (error.message && error.message.includes('API key')) {
          console.warn('⚠️  Meilisearch indexing skipped: Using search-only key (expected behavior).');
          console.warn('   To enable indexing, use a key with write permissions or skip indexing during build.');
        } else {
          console.error('❌ Meilisearch indexing error:', error);
        }
        // Don't fail the build if indexing fails
      }
    },
  };
}

module.exports = pluginMeilisearch;

