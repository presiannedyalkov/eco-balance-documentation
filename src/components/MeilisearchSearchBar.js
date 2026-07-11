/**
 * Meilisearch search bar for Docusaurus.
 *
 * Pings the Meilisearch container once on mount. If it is unreachable (or not
 * configured) the search box is hidden entirely — rather than rendering a
 * broken input and spamming the console. When healthy, it offers a debounced
 * search over the index with a "/" focus shortcut.
 */

import React, { useState, useEffect, useRef } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

function getEnvVar(name, fallback) {
  if (typeof window !== 'undefined' && window[name]) return window[name];
  if (typeof process !== 'undefined' && process.env && process.env[name]) return process.env[name];
  return fallback;
}

const HOST = getEnvVar('MEILISEARCH_HOST', 'https://search.eco-balance.cc');
const KEY = getEnvVar('MEILISEARCH_SEARCH_KEY', 'e1eebc3950796ae3ead1c39d2c80f4148212c344a36fb6ba9e9ec91d7a7f4489');
const INDEX = 'eco-balance-docs';

export default function MeilisearchSearchBar() {
  const [healthy, setHealthy] = useState(null); // null = checking, false = down/off, true = up
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);

  // Health check: ping the container once. If it doesn't answer, hide the box.
  useEffect(() => {
    if (!HOST || !KEY) { setHealthy(false); return; }
    let active = true;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    fetch(`${HOST}/health`, { method: 'GET', signal: controller.signal })
      .then((r) => { if (active) setHealthy(r.ok); })
      .catch(() => { if (active) setHealthy(false); }) // down/unreachable — hide, no console noise
      .finally(() => clearTimeout(timer));
    return () => { active = false; controller.abort(); };
  }, []);

  // Outside-click, Esc, route change, and "/" focus shortcut.
  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return undefined;
    const onClickOutside = (e) => { if (searchRef.current && !searchRef.current.contains(e.target)) setIsOpen(false); };
    const onKeyDown = (e) => {
      if (e.key === '/' && e.target.tagName !== 'INPUT' && !e.target.isContentEditable) {
        e.preventDefault(); searchRef.current?.querySelector('input')?.focus(); setIsOpen(true);
      }
      if (e.key === 'Escape') { setIsOpen(false); searchRef.current?.querySelector('input')?.blur(); }
    };
    const onRoute = () => { setIsOpen(false); setQuery(''); };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('popstate', onRoute);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('popstate', onRoute);
    };
  }, []);

  // Debounced search.
  useEffect(() => {
    const id = setTimeout(async () => {
      const q = query.trim();
      if (!q) { setResults([]); setIsOpen(false); return; }
      setIsLoading(true); setIsOpen(true);
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 8000);
        const res = await fetch(`${HOST}/indexes/${INDEX}/search`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${KEY}` },
          body: JSON.stringify({ q, limit: 10, attributesToHighlight: ['title', 'content', 'headings'] }),
          signal: controller.signal,
        });
        clearTimeout(timer);
        const data = res.ok ? await res.json() : { hits: [] };
        setResults(data.hits || []);
      } catch {
        setResults([]); // transient failure — show "no results", not an error dump
      } finally {
        setIsLoading(false);
      }
    }, 300);
    return () => clearTimeout(id);
  }, [query]);

  const go = (url) => {
    if (ExecutionEnvironment.canUseDOM) {
      if (window.docusaurus?.navigate) window.docusaurus.navigate(url);
      else window.location.href = url;
    }
    setIsOpen(false); setQuery('');
  };

  // Hide while checking, and whenever the container is down or unconfigured.
  if (healthy !== true) return null;

  return (
    <div ref={searchRef} className="meilisearch-search-container" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <div className="navbar__search" style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="search"
          placeholder="Search docs (/)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="navbar__search-input"
        />
      </div>

      {isOpen && (query || results.length > 0) && (
        <div className="meilisearch-search-results">
          {isLoading && <div style={{ padding: 16, textAlign: 'center' }}>Searching…</div>}

          {!isLoading && results.length === 0 && query && (
            <div style={{ padding: 16, textAlign: 'center', color: 'var(--ifm-color-emphasis-600)' }}>No results found</div>
          )}

          {!isLoading && results.length > 0 && (
            <div>
              {results.map((hit, i) => (
                <div
                  key={i}
                  onClick={() => go(hit.url)}
                  style={{ padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid var(--ifm-color-emphasis-200)', transition: 'background-color 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--ifm-color-emphasis-100)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  <div
                    style={{ fontWeight: 'bold', marginBottom: 4, color: 'var(--ifm-color-primary)' }}
                    dangerouslySetInnerHTML={{ __html: hit._formatted?.title || hit.title }}
                  />
                  <div style={{ fontSize: 12, color: 'var(--ifm-color-emphasis-600)', marginBottom: 4 }}>{hit.url}</div>
                  {hit._formatted?.content && (
                    <div
                      style={{ fontSize: 13, color: 'var(--ifm-color-emphasis-700)', lineHeight: 1.4 }}
                      dangerouslySetInnerHTML={{ __html: hit._formatted.content.substring(0, 150) + '…' }}
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
