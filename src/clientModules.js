/**
 * Client-side modules for Docusaurus
 * 
 * This file runs in the browser and can be used to:
 * - Mount React components
 * - Add event listeners
 * - Initialize third-party libraries
 * 
 * Docusaurus automatically loads this file if it exists in src/clientModules.js
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import MeilisearchSearchBar from './components/MeilisearchSearchBar';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// Client-side module for Docusaurus 3.x
// Docusaurus automatically loads this file from src/clientModules.js
// Can export a function or execute code directly

console.log('[clientModules] Loading Meilisearch search bar module...');

// Mount Meilisearch search bar when DOM is ready
if (ExecutionEnvironment.canUseDOM) {
  console.log('[clientModules] DOM available, setting up search bar mounting...');
  
  function initSearchBar() {
    function mountSearchBar() {
      const searchWrapper = document.getElementById('meilisearch-search-wrapper');
      if (searchWrapper && !searchWrapper.hasAttribute('data-mounted')) {
        console.log('[Meilisearch] Mounting search bar...', searchWrapper);
        searchWrapper.setAttribute('data-mounted', 'true');
        
        // Mount the component directly (Docusaurus provides router context globally)
        const root = ReactDOM.createRoot(searchWrapper);
        root.render(React.createElement(MeilisearchSearchBar));
        console.log('[Meilisearch] Search bar mounted successfully');
        return true;
      }
      if (!searchWrapper) {
        console.warn('[Meilisearch] Search wrapper not found in DOM');
      }
      return false;
    }

    // Try multiple times with different strategies
    function attemptMount() {
      if (mountSearchBar()) {
        return true;
      }
      
      // If not found, wait a bit and try again
      setTimeout(() => {
        if (!mountSearchBar()) {
          // Use MutationObserver to watch for navbar changes
          const observer = new MutationObserver(() => {
            if (mountSearchBar()) {
              observer.disconnect();
            }
          });
          
          // Observe the navbar container and document body
          const navbar = document.querySelector('.navbar');
          if (navbar) {
            observer.observe(navbar, { childList: true, subtree: true });
          }
          observer.observe(document.body, { childList: true, subtree: true });
          
          // Disconnect after 10 seconds to avoid memory leaks
          setTimeout(() => observer.disconnect(), 10000);
        }
      }, 100);
      
      return false;
    }

    // Try immediately
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', attemptMount);
    } else {
      // DOM is already loaded
      attemptMount();
    }
    
    // Also try after delays as fallback
    setTimeout(attemptMount, 500);
    setTimeout(attemptMount, 1000);
    setTimeout(attemptMount, 2000);
    setTimeout(attemptMount, 3000);
  }
  
  // Start initialization
  initSearchBar();
}

