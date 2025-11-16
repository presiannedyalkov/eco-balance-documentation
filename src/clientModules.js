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

// Mount Meilisearch search bar when DOM is ready
if (ExecutionEnvironment.canUseDOM) {
  function mountSearchBar() {
    const searchWrapper = document.getElementById('meilisearch-search-wrapper');
    if (searchWrapper && !searchWrapper.hasAttribute('data-mounted')) {
      // Check if the wrapper is actually in the DOM and visible
      if (searchWrapper.offsetParent !== null || searchWrapper.getBoundingClientRect().width > 0) {
        searchWrapper.setAttribute('data-mounted', 'true');
        
        // Mount the component directly (Docusaurus provides router context globally)
        const root = ReactDOM.createRoot(searchWrapper);
        root.render(React.createElement(MeilisearchSearchBar));
        return true;
      }
    }
    return false;
  }

  // Try immediately
  if (!mountSearchBar()) {
    // Also try on DOMContentLoaded (in case DOM isn't ready yet)
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        if (!mountSearchBar()) {
          // Use MutationObserver to watch for navbar changes
          const observer = new MutationObserver(() => {
            if (mountSearchBar()) {
              observer.disconnect();
            }
          });
          
          // Observe the navbar container
          const navbar = document.querySelector('.navbar');
          if (navbar) {
            observer.observe(navbar, { childList: true, subtree: true });
          }
          
          // Also try after delays as fallback
          setTimeout(() => {
            if (mountSearchBar()) observer.disconnect();
          }, 100);
          setTimeout(() => {
            if (mountSearchBar()) observer.disconnect();
          }, 500);
          setTimeout(() => {
            if (mountSearchBar()) observer.disconnect();
          }, 1000);
        }
      });
    } else {
      // DOM is already loaded, try mounting
      if (!mountSearchBar()) {
        // Use MutationObserver as fallback
        const observer = new MutationObserver(() => {
          if (mountSearchBar()) {
            observer.disconnect();
          }
        });
        
        const navbar = document.querySelector('.navbar');
        if (navbar) {
          observer.observe(navbar, { childList: true, subtree: true });
        }
        
        setTimeout(() => {
          if (mountSearchBar()) observer.disconnect();
        }, 100);
        setTimeout(() => {
          if (mountSearchBar()) observer.disconnect();
        }, 500);
      }
    }
  }
}

