/**
 * Meilisearch search bar for Docusaurus.
 *
 * The search service is gated behind Cloudflare Access. On mount we probe it
 * and pick one of three states:
 *   - ready   : reachable + authenticated  -> show the search box
 *   - signin  : Access redirect / 401 / 403 -> show a "Sign in to search" link
 *               (opens the Access login; search appears after signing in)
 *   - hidden  : unreachable (container down / unconfigured) -> render nothing
 * We re-probe when the tab regains focus, so signing in another tab upgrades
 * signin -> ready without a manual reload. No console noise on failure.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

function getEnvVar(name, fallback) {
  if (typeof window !== 'undefined' && window[name]) return window[name];
  if (typeof process !== 'undefined' && process.env && process.env[name]) return process.env[name];
  return fallback;
}

const HOST = getEnvVar('MEILISEARCH_HOST', 'https://search.eco-balance.cc');
const KEY = getEnvVar('MEILISEARCH_SEARCH_KEY', 'e1eebc3950796ae3ead1c39d2c80f4148212c344a36fb6ba9e9ec91d7a7f4489');
const LOGIN_URL = getEnvVar('MEILISEARCH_LOGIN_URL', HOST);
const INDEX = 'eco-balance-docs';

export default function MeilisearchSearchBar() {
  const [access, setAccess] = useState('checking'); // checking | ready | signin | hidden
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);

  // Probe the (Access-gated) search host. credentials:'include' carries the
  // CF_Authorization cookie; redirect:'manual' turns the Access login redirect
  // into an opaqueredirect we can detect without needing CORS on that response.
  const probe = useCallback(() => {
    if (!HOST || !KEY) { setAccess('hidden'); return () => {}; }
    let active = true;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    fetch(`${HOST}/health`, {
      method: 'GET',
      credentials: 'include',
      redirect: 'manual',
      cache: 'no-store',
      signal: controller.signal,
    })
      .then((r) => {
        if (!active) return;
        if (r.type === 'opaqueredirect' || r.status === 401 || r.status === 403) setAccess('signin');
        else if (r.ok) setAccess('ready');
        else setAccess('hidden');
      })
      .catch(() => { if (active) setAccess('hidden'); }) // down/unreachable — hide, no noise
      .finally(() => clearTimeout(timer));
    return () => { active = false; controller.abort(); };
  }, []);

  // Probe on mount + whenever the tab regains focus (e.g. after signing in).
  useEffect(() => {
    const cancel = probe();
    if (!ExecutionEnvironment.canUseDOM) return cancel;
    const onFocus = () => probe();
    window.addEventListener('focus', onFocus);
    return () => { cancel(); window.removeEventListener('focus', onFocus); };
  }, [probe]);

  // Outside-click, Esc, route change, and "/" focus shortcut (only when ready).
  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM || access !== 'ready') return undefined;
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
  }, [access]);

  // Debounced search (credentials:'include' so the Access cookie rides along).
  useEffect(() => {
    if (access !== 'ready') return undefined;
    const id = setTimeout(async () => {
      const q = query.trim();
      if (!q) { setResults([]); setIsOpen(false); return; }
      setIsLoading(true); setIsOpen(true);
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 8000);
        const res = await fetch(`${HOST}/indexes/${INDEX}/search`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${KEY}` },
          body: JSON.stringify({ q, limit: 10, attributesToHighlight: ['title', 'content', 'headings'] }),
          signal: controller.signal,
        });
        clearTimeout(timer);
        if (res.status === 401 || res.status === 403 || res.type === 'opaqueredirect') {
          setAccess('signin'); setResults([]); return; // session expired mid-use
        }
        const data = res.ok ? await res.json() : { hits: [] };
        setResults(data.hits || []);
      } catch {
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);
    return () => clearTimeout(id);
  }, [query, access]);

  const go = (url) => {
    if (ExecutionEnvironment.canUseDOM) {
      if (window.docusaurus?.navigate) window.docusaurus.navigate(url);
      else window.location.href = url;
    }
    setIsOpen(false); setQuery('');
  };

  if (access === 'signin') {
    return (
      <a
        className="meilisearch-signin navbar__item"
        href={LOGIN_URL}
        title="Search is available to signed-in users"
        style={{ fontSize: 14, whiteSpace: 'nowrap' }}
      >
        Sign in to search
      </a>
    );
  }

  if (access !== 'ready') return null; // checking or hidden

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
