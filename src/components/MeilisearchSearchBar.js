/**
 * Meilisearch search bar component for Docusaurus
 * 
 * This component provides a search interface that connects to your Meilisearch instance
 */

import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from '@docusaurus/router';

function MeilisearchSearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const history = useHistory();
  const location = useLocation();

  // Get config from environment or window (set at build time)
  const meilisearchHost = 
    typeof window !== 'undefined' 
      ? (window.MEILISEARCH_HOST || process.env.MEILISEARCH_HOST)
      : process.env.MEILISEARCH_HOST;
  const searchKey = 
    typeof window !== 'undefined'
      ? (window.MEILISEARCH_SEARCH_KEY || process.env.MEILISEARCH_SEARCH_KEY)
      : process.env.MEILISEARCH_SEARCH_KEY;
  const indexName = 'eco-balance-docs';

  useEffect(() => {
    // Close on route change
    setIsOpen(false);
    setQuery('');
  }, [location.pathname]);

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
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${meilisearchHost}/indexes/${indexName}/search`,
        {
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
        }
      );

      const data = await response.json();
      setResults(data.hits || []);
    } catch (error) {
      console.error('Meilisearch error:', error);
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
    history.push(url);
    setIsOpen(false);
    setQuery('');
  };

  if (!meilisearchHost || !searchKey) {
    // Fallback to local search if Meilisearch not configured
    return null;
  }

  return (
    <div ref={searchRef} className="meilisearch-search-container" style={{ position: 'relative' }}>
      <div className="navbar__search" style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="search"
          placeholder="Search docs (Press '/' to focus)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="navbar__search-input"
          style={{
            padding: '8px 12px',
            border: '1px solid var(--ifm-color-emphasis-300)',
            borderRadius: '4px',
            fontSize: '14px',
            width: '200px',
          }}
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

