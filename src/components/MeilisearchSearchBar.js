/**
 * Meilisearch search bar component for Docusaurus
 * 
 * This component provides a search interface that connects to your Meilisearch instance
 */

import React, { useState, useEffect, useRef } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

function MeilisearchSearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);

  // Get config from environment or window (set at build time)
  // Production: https://search.eco-balance.cc (via Cloudflare)
  // Local development: Set MEILISEARCH_HOST to local network address
  // Note: process.env is only available at build time via webpack DefinePlugin
  // In browser, we use window variables or fallback to defaults
  const getEnvVar = (name, defaultValue) => {
    if (typeof window !== 'undefined' && window[name]) {
      return window[name];
    }
    // process.env is replaced by webpack at build time, but we need to check if it exists
    if (typeof process !== 'undefined' && process.env && process.env[name]) {
      return process.env[name];
    }
    return defaultValue;
  };
  
  const meilisearchHost = getEnvVar('MEILISEARCH_HOST', 'https://search.eco-balance.cc');
  const searchKey = getEnvVar('MEILISEARCH_SEARCH_KEY', 'e1eebc3950796ae3ead1c39d2c80f4148212c344a36fb6ba9e9ec91d7a7f4489');
  const indexName = 'eco-balance-docs';

  useEffect(() => {
    // Close on route change
    const handleRouteChange = () => {
      setIsOpen(false);
      setQuery('');
    };
    
    // Listen for navigation events
    if (ExecutionEnvironment.canUseDOM) {
      window.addEventListener('popstate', handleRouteChange);
      // Also listen for Docusaurus navigation by intercepting pushState
      const originalPushState = window.history.pushState;
      if (originalPushState) {
        window.history.pushState = function(...args) {
          originalPushState.apply(window.history, args);
          handleRouteChange();
        };
      }
    }
    
    return () => {
      if (ExecutionEnvironment.canUseDOM) {
        window.removeEventListener('popstate', handleRouteChange);
      }
    };
  }, []);

  useEffect(() => {
    // Close on outside click
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Keyboard shortcuts
    const handleKeyDown = (event) => {
      if (event.key === '/' && event.target.tagName !== 'INPUT' && !event.target.isContentEditable) {
        event.preventDefault();
        searchRef.current?.querySelector('input')?.focus();
        setIsOpen(true);
      }
      if (event.key === 'Escape') {
        setIsOpen(false);
        searchRef.current?.querySelector('input')?.blur();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const search = async (searchQuery) => {
    if (!searchQuery.trim() || !meilisearchHost || !searchKey) {
      console.log('🔍 [MeilisearchSearchBar] Search skipped:', {
        hasQuery: !!searchQuery.trim(),
        hasHost: !!meilisearchHost,
        hasKey: !!searchKey,
      });
      setResults([]);
      return;
    }

    console.log('🔍 [MeilisearchSearchBar] Starting search:', searchQuery);
    setIsLoading(true);
    try {
      const url = `${meilisearchHost}/indexes/${indexName}/search`;
      console.log('🔍 [MeilisearchSearchBar] Fetching:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${searchKey}`,
        },
        body: JSON.stringify({
          q: searchQuery,
          limit: 10,
          attributesToHighlight: ['title', 'content', 'headings'],
        }),
      });

      console.log('🔍 [MeilisearchSearchBar] Response status:', response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ [MeilisearchSearchBar] Search failed:', response.status, errorText);
        setResults([]);
        return;
      }

      const data = await response.json();
      console.log('✅ [MeilisearchSearchBar] Search results:', {
        hits: data.hits?.length || 0,
        estimatedTotal: data.estimatedTotalHits || 0,
        processingTimeMs: data.processingTimeMs || 'N/A',
      });
      setResults(data.hits || []);
    } catch (error) {
      console.error('❌ [MeilisearchSearchBar] Search error:', error);
      console.error('  - Error name:', error.name);
      console.error('  - Error message:', error.message);
      console.error('  - Error stack:', error.stack);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) {
        search(query);
        setIsOpen(true);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300); // Debounce

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleResultClick = (url) => {
    if (ExecutionEnvironment.canUseDOM) {
      // Use Docusaurus navigation if available, otherwise use window.location
      if (window.docusaurus && window.docusaurus.navigate) {
        window.docusaurus.navigate(url);
      } else {
        window.location.href = url;
      }
    }
    setIsOpen(false);
    setQuery('');
  };

  // Debug logging - always log when component renders
  useEffect(() => {
    console.log('🔍 [MeilisearchSearchBar] ============================================');
    console.log('🔍 [MeilisearchSearchBar] Component mounted/rendered');
    console.log('  - meilisearchHost:', meilisearchHost ? `✅ ${meilisearchHost}` : '❌ missing');
    console.log('  - searchKey:', searchKey ? `✅ configured (${searchKey.substring(0, 10)}...)` : '❌ missing');
    console.log('  - indexName:', indexName);
    console.log('  - wrapperExists:', typeof document !== 'undefined' && !!document.getElementById('meilisearch-search-wrapper'));
    console.log('  - window.location:', typeof window !== 'undefined' ? window.location.href : 'N/A');
    console.log('  - React version:', React.version);
    
    // Check if component is actually visible
    if (typeof document !== 'undefined') {
      const container = document.querySelector('.meilisearch-search-container');
      if (container) {
        const styles = window.getComputedStyle(container);
        console.log('  - Container visibility:', {
          display: styles.display,
          visibility: styles.visibility,
          opacity: styles.opacity,
          width: container.offsetWidth,
          height: container.offsetHeight,
          position: styles.position,
          zIndex: styles.zIndex,
        });
      }
    }
    
    // Test Meilisearch connection
    if (meilisearchHost && searchKey) {
      console.log('🔍 [MeilisearchSearchBar] Testing Meilisearch connection...');
      fetch(`${meilisearchHost}/health`, { method: 'GET' })
        .then(response => {
          console.log('✅ [MeilisearchSearchBar] Health check response:', response.status, response.statusText);
          return response.json();
        })
        .then(data => {
          console.log('✅ [MeilisearchSearchBar] Health check data:', data);
        })
        .catch(error => {
          console.error('❌ [MeilisearchSearchBar] Health check failed:', error);
          console.error('  - Error message:', error.message);
          console.error('  - Error stack:', error.stack);
        });
      
      // Test search endpoint
      fetch(`${meilisearchHost}/indexes/${indexName}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${searchKey}`,
        },
        body: JSON.stringify({ q: '', limit: 0 }),
      })
        .then(response => {
          console.log('🔍 [MeilisearchSearchBar] Search endpoint test:', response.status, response.statusText);
          if (!response.ok) {
            return response.text().then(text => {
              console.error('❌ [MeilisearchSearchBar] Search endpoint error:', text);
            });
          }
          return response.json();
        })
        .then(data => {
          console.log('✅ [MeilisearchSearchBar] Search endpoint accessible, estimated documents:', data.estimatedTotalHits || 'N/A');
        })
        .catch(error => {
          console.error('❌ [MeilisearchSearchBar] Search endpoint test failed:', error);
          console.error('  - Error message:', error.message);
          console.error('  - This might be a CORS issue or network problem');
        });
    }
    
    // Also log to page for debugging
    if (typeof window !== 'undefined') {
      window.meilisearchDebug = {
        mounted: true,
        timestamp: new Date().toISOString(),
        host: meilisearchHost,
        hasKey: !!searchKey,
        indexName,
        componentRendered: true,
      };
      console.log('🔍 [MeilisearchSearchBar] Debug info available at window.meilisearchDebug');
    }
    
    console.log('🔍 [MeilisearchSearchBar] ============================================');
  }, []);

  // Always render the search bar (even if Meilisearch isn't configured, show a placeholder)
  // This helps debug if the component is mounting at all
  if (!meilisearchHost || !searchKey) {
    console.warn('⚠️ [MeilisearchSearchBar] Meilisearch not configured:', { meilisearchHost, searchKey });
    console.warn('⚠️ [MeilisearchSearchBar] Rendering placeholder to verify component mounting');
    // Still render a placeholder so we can see if the component is mounting
    return (
      <div 
        className="meilisearch-search-container" 
        style={{ 
          position: 'relative', 
          display: 'flex', 
          alignItems: 'center',
        }}
      >
        <div className="navbar__search" style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="search"
            placeholder="Search (Meilisearch not configured)"
            disabled
            className="navbar__search-input"
            style={{
              padding: '8px 12px',
              border: '1px solid var(--ifm-color-emphasis-300)',
              borderRadius: '4px',
              fontSize: '14px',
              width: '200px',
              opacity: 0.5,
              display: 'block',
            }}
          />
        </div>
      </div>
    );
  }

  console.log('🔍 [MeilisearchSearchBar] Rendering search bar component');
  
  return (
    <div 
      ref={searchRef} 
      className="meilisearch-search-container" 
      style={{ 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center',
      }}
    >
      <div className="navbar__search" style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="search"
          placeholder="Search docs (Press '/' to focus)"
          value={query}
          onChange={(e) => {
            console.log('🔍 [MeilisearchSearchBar] Input changed:', e.target.value);
            setQuery(e.target.value);
          }}
          onFocus={() => {
            console.log('🔍 [MeilisearchSearchBar] Input focused');
            setIsOpen(true);
          }}
          onBlur={() => {
            console.log('🔍 [MeilisearchSearchBar] Input blurred');
          }}
          className="navbar__search-input"
        />
      </div>

      {isOpen && (query || results.length > 0) && (
        <div
          className="meilisearch-search-results"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '8px',
            backgroundColor: 'var(--ifm-background-color)',
            border: '1px solid var(--ifm-color-emphasis-300)',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            maxHeight: '400px',
            overflowY: 'auto',
            zIndex: 1000,
            minWidth: '400px',
          }}
        >
          {isLoading && (
            <div style={{ padding: '16px', textAlign: 'center' }}>Searching...</div>
          )}

          {!isLoading && results.length === 0 && query && (
            <div style={{ padding: '16px', textAlign: 'center', color: 'var(--ifm-color-emphasis-600)' }}>
              No results found
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div>
              {results.map((hit, index) => (
                <div
                  key={index}
                  onClick={() => handleResultClick(hit.url)}
                  style={{
                    padding: '12px 16px',
                    cursor: 'pointer',
                    borderBottom: '1px solid var(--ifm-color-emphasis-200)',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--ifm-color-emphasis-100)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div
                    style={{
                      fontWeight: 'bold',
                      marginBottom: '4px',
                      color: 'var(--ifm-color-primary)',
                    }}
                    dangerouslySetInnerHTML={{
                      __html: hit._formatted?.title || hit.title,
                    }}
                  />
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'var(--ifm-color-emphasis-600)',
                      marginBottom: '4px',
                    }}
                  >
                    {hit.url}
                  </div>
                  {hit._formatted?.content && (
                    <div
                      style={{
                        fontSize: '13px',
                        color: 'var(--ifm-color-emphasis-700)',
                        lineHeight: '1.4',
                      }}
                      dangerouslySetInnerHTML={{
                        __html: hit._formatted.content.substring(0, 150) + '...',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MeilisearchSearchBar;

