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
// In Docusaurus 3.x, this should export a function that runs on client-side

export default function clientModule() {
  console.log('🔍 [clientModules] ============================================');
  console.log('🔍 [clientModules] Loading Meilisearch search bar module...');
  console.log('🔍 [clientModules] ExecutionEnvironment.canUseDOM:', ExecutionEnvironment.canUseDOM);
  console.log('🔍 [clientModules] typeof window:', typeof window);
  console.log('🔍 [clientModules] document.readyState:', typeof document !== 'undefined' ? document.readyState : 'N/A');
  
  // Store debug info globally for inspection
  if (typeof window !== 'undefined') {
    window.clientModulesDebug = {
      loaded: true,
      timestamp: new Date().toISOString(),
      canUseDOM: ExecutionEnvironment.canUseDOM,
      readyState: typeof document !== 'undefined' ? document.readyState : 'N/A',
    };
  }
  
  // Mount Meilisearch search bar when DOM is ready
  if (ExecutionEnvironment.canUseDOM) {
    console.log('🔍 [clientModules] DOM available, setting up search bar mounting...');
    
    function inspectDOM() {
      console.log('🔍 [clientModules] DOM Inspection:');
      console.log('  - document.body exists:', !!document.body);
      console.log('  - document.querySelector(".navbar"):', !!document.querySelector('.navbar'));
      console.log('  - document.getElementById("meilisearch-search-wrapper"):', !!document.getElementById('meilisearch-search-wrapper'));
      
      const wrapper = document.getElementById('meilisearch-search-wrapper');
      if (wrapper) {
        console.log('  - Wrapper element details:', {
          id: wrapper.id,
          className: wrapper.className,
          parentElement: wrapper.parentElement?.tagName,
          isConnected: wrapper.isConnected,
          offsetWidth: wrapper.offsetWidth,
          offsetHeight: wrapper.offsetHeight,
          computedStyle: window.getComputedStyle(wrapper).display,
          visibility: window.getComputedStyle(wrapper).visibility,
          opacity: window.getComputedStyle(wrapper).opacity,
        });
      }
      
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        console.log('  - Navbar element details:', {
          className: navbar.className,
          children: Array.from(navbar.children).map(c => ({
            tagName: c.tagName,
            id: c.id,
            className: c.className,
          })),
        });
      }
    }
    
    function mountSearchBar() {
      console.log('🔍 [clientModules] Attempting to mount search bar...');
      inspectDOM();
      
      const searchWrapper = document.getElementById('meilisearch-search-wrapper');
      
      if (!searchWrapper) {
        console.warn('⚠️ [clientModules] Search wrapper not found in DOM');
        console.warn('⚠️ [clientModules] Searching for alternative selectors...');
        
        // Try to find the wrapper with different methods
        const allDivs = document.querySelectorAll('div');
        console.log('  - Total divs in document:', allDivs.length);
        
        const divsWithId = Array.from(allDivs).filter(d => d.id);
        console.log('  - Divs with IDs:', divsWithId.map(d => d.id));
        
        const navbarItems = document.querySelectorAll('.navbar__items');
        console.log('  - Navbar items found:', navbarItems.length);
        navbarItems.forEach((item, i) => {
          console.log(`    Navbar item ${i}:`, {
            className: item.className,
            innerHTML: item.innerHTML.substring(0, 200),
            children: Array.from(item.children).map(c => c.tagName),
          });
        });
        
        return false;
      }
      
      if (searchWrapper.hasAttribute('data-mounted')) {
        console.log('✅ [clientModules] Search bar already mounted');
        return true;
      }
      
      console.log('🔍 [clientModules] Found wrapper, mounting React component...');
      console.log('  - Wrapper element:', searchWrapper);
      console.log('  - React available:', typeof React !== 'undefined');
      console.log('  - ReactDOM available:', typeof ReactDOM !== 'undefined');
      console.log('  - MeilisearchSearchBar available:', typeof MeilisearchSearchBar !== 'undefined');
      
      try {
        searchWrapper.setAttribute('data-mounted', 'true');
        
        // Mount the component directly (Docusaurus provides router context globally)
        const root = ReactDOM.createRoot(searchWrapper);
        console.log('🔍 [clientModules] React root created:', root);
        
        root.render(React.createElement(MeilisearchSearchBar));
        console.log('✅ [clientModules] Search bar mounted successfully!');
        
        // Verify it's actually rendered
        setTimeout(() => {
          const input = searchWrapper.querySelector('input');
          console.log('🔍 [clientModules] Post-mount verification:');
          console.log('  - Input element found:', !!input);
          console.log('  - Wrapper has children:', searchWrapper.children.length);
          if (input) {
            console.log('  - Input element details:', {
              type: input.type,
              placeholder: input.placeholder,
              visible: input.offsetWidth > 0 && input.offsetHeight > 0,
            });
          }
        }, 100);
        
        return true;
      } catch (error) {
        console.error('❌ [clientModules] Error mounting search bar:', error);
        console.error('  - Error stack:', error.stack);
        return false;
      }
    }

    // Try multiple times with different strategies
    let mountAttempts = 0;
    const maxAttempts = 10;
    
    function attemptMount() {
      mountAttempts++;
      console.log(`🔍 [clientModules] Mount attempt ${mountAttempts}/${maxAttempts}`);
      
      if (mountSearchBar()) {
        console.log('✅ [clientModules] Mount successful on attempt', mountAttempts);
        return true;
      }
      
      if (mountAttempts < maxAttempts) {
        // Use MutationObserver to watch for navbar changes
        const observer = new MutationObserver((mutations) => {
          console.log('🔍 [clientModules] DOM mutation detected:', mutations.length, 'changes');
          if (mountSearchBar()) {
            console.log('✅ [clientModules] Mounted after DOM mutation');
            observer.disconnect();
          }
        });
        
        // Observe the navbar container and document body
        const navbar = document.querySelector('.navbar');
        if (navbar) {
          observer.observe(navbar, { childList: true, subtree: true });
          console.log('🔍 [clientModules] Observing navbar for changes');
        }
        observer.observe(document.body, { childList: true, subtree: true });
        console.log('🔍 [clientModules] Observing document.body for changes');
        
        // Disconnect after 10 seconds to avoid memory leaks
        setTimeout(() => {
          observer.disconnect();
          console.log('🔍 [clientModules] MutationObserver disconnected after timeout');
        }, 10000);
      } else {
        console.error('❌ [clientModules] Failed to mount after', maxAttempts, 'attempts');
        console.error('❌ [clientModules] Final DOM state:');
        inspectDOM();
      }
      
      return false;
    }

    // Try immediately
    if (document.readyState === 'loading') {
      console.log('🔍 [clientModules] Document still loading, waiting for DOMContentLoaded...');
      document.addEventListener('DOMContentLoaded', () => {
        console.log('🔍 [clientModules] DOMContentLoaded fired');
        attemptMount();
      });
    } else {
      // DOM is already loaded
      console.log('🔍 [clientModules] DOM already loaded, attempting mount immediately');
      attemptMount();
    }
    
    // Also try after delays as fallback
    const delays = [100, 500, 1000, 2000, 3000, 5000];
    delays.forEach(delay => {
      setTimeout(() => {
        console.log(`🔍 [clientModules] Delayed mount attempt after ${delay}ms`);
        attemptMount();
      }, delay);
    });
    
    console.log('🔍 [clientModules] ============================================');
  } else {
    console.warn('⚠️ [clientModules] DOM not available, cannot mount search bar');
  }
}

