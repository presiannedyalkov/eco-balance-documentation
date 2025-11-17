/**
 * Client-side modules for Docusaurus
 * 
 * This file runs in the browser and can be used to:
 * - Mount React components
 * - Add event listeners
 * - Initialize third-party libraries
 * 
 * Docusaurus 3.x requires explicit configuration in docusaurus.config.js:
 *   clientModules: [require.resolve('./src/clientModules.js')]
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import MeilisearchSearchBar from './components/MeilisearchSearchBar';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// Initialize Sentry for error tracking
import './components/SentryInit';

// Client-side module for Docusaurus 3.x
// This module is imported as a side effect by '@generated/client-modules'
// Top-level code executes when the module is imported in the browser

function clientModule() {
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
        
        // Mount the component directly
        // Note: React error boundaries are class components, but we'll catch errors in try/catch
        root.render(React.createElement(MeilisearchSearchBar));
        console.log('✅ [clientModules] Search bar mounted successfully!');
        
        // Verify it's actually rendered
        setTimeout(() => {
          const input = searchWrapper.querySelector('input');
          console.log('🔍 [clientModules] Post-mount verification:');
          console.log('  - Input element found:', !!input);
          console.log('  - Wrapper has children:', searchWrapper.children.length);
          console.log('  - Wrapper innerHTML length:', searchWrapper.innerHTML.length);
          if (input) {
            console.log('  - Input element details:', {
              type: input.type,
              placeholder: input.placeholder,
              visible: input.offsetWidth > 0 && input.offsetHeight > 0,
            });
          } else {
            console.warn('  - No input found, checking wrapper content:', searchWrapper.innerHTML.substring(0, 200));
          }
        }, 500); // Increased delay to allow React to render
        
        return true;
      } catch (error) {
        console.error('❌ [clientModules] Error mounting search bar:', error);
        console.error('  - Error message:', error.message);
        console.error('  - Error name:', error.name);
        console.error('  - Error stack:', error.stack);
        // Render error message as fallback
        searchWrapper.innerHTML = `<div style="padding: 8px; color: var(--ifm-color-danger);">Search Error: ${error.message}</div>`;
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

// CRITICAL: Execute immediately when module is imported
// This code runs in the browser when '@generated/client-modules' imports this file
// We MUST check for browser environment to avoid SSR errors

// Mark that module was imported (for debugging)
if (typeof window !== 'undefined') {
  window.__clientModulesModuleImported = true;
  console.log('🚀 [clientModules] MODULE IMPORTED in browser - window exists');
  
  // Execute immediately - the function handles DOM readiness internally
  // Use multiple strategies to ensure execution
  if (typeof document !== 'undefined') {
    console.log('🚀 [clientModules] document exists, readyState:', document.readyState);
    
    // Execute immediately if DOM is ready
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      console.log('🚀 [clientModules] Executing immediately (DOM ready)');
      clientModule();
    } else {
      console.log('🚀 [clientModules] DOM not ready, will wait for DOMContentLoaded');
      document.addEventListener('DOMContentLoaded', () => {
        console.log('🚀 [clientModules] DOMContentLoaded - executing now');
        clientModule();
      });
    }
    
    // Also try on window load as backup
    window.addEventListener('load', () => {
      console.log('🚀 [clientModules] Window load - executing as backup');
      clientModule();
    });
    
    // And try with a small delay
    setTimeout(() => {
      console.log('🚀 [clientModules] setTimeout execution');
      clientModule();
    }, 0);
  } else {
    console.warn('⚠️ [clientModules] document not available');
  }
} else {
  // This is SSR/build time - don't execute
  // The warning will only appear during build, not in browser
  if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
    console.log('ℹ️ [clientModules] Module loaded during build (SSR) - will execute in browser');
  }
}

// Export the function (for potential lifecycle hooks)
export default clientModule;
