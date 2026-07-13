/**
 * Docs chat widget — a floating "chat with the docs" assistant.
 *
 * Talks to the eco-balance-mcp service (POST /api/chat) which runs an agentic
 * search_docs loop over the model/case corpus and returns a grounded answer +
 * sources. The endpoint is gated by Cloudflare Access (same as search), so we
 * probe /health first and show one of:
 *   - ready  : reachable + authenticated -> floating chat bubble
 *   - signin : Access redirect / 401/403 -> a "Sign in to chat" bubble
 *   - hidden : unreachable -> nothing
 * Select text anywhere on a page and an "Ask about this" chip lets you drop the
 * selection into the chat as a quoted snippet (sent as `quotes` to the backend).
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

function getEnvVar(name, fallback) {
  if (typeof window !== 'undefined' && window[name]) return window[name];
  if (typeof process !== 'undefined' && process.env && process.env[name]) return process.env[name];
  return fallback;
}

const CHAT_HOST = getEnvVar('DOCS_CHAT_HOST', 'https://docs-chat.eco-balance.cc');
const LOGIN_URL = getEnvVar('DOCS_CHAT_LOGIN_URL', CHAT_HOST);

const wrap = { position: 'fixed', right: 20, bottom: 20, zIndex: 500, fontsize: 14 };
const bubble = {
  width: 52, height: 52, borderRadius: '50%', border: 'none', cursor: 'pointer',
  background: 'var(--ifm-color-primary)', color: '#fff', fontSize: 22, boxShadow: '0 4px 14px rgba(0,0,0,.25)',
};
const panel = {
  width: 'min(380px, calc(100vw - 32px))', height: 'min(560px, calc(100vh - 120px))',
  display: 'flex', flexDirection: 'column', borderRadius: 12, overflow: 'hidden',
  background: 'var(--ifm-background-surface-color, var(--ifm-background-color))',
  border: '1px solid var(--ifm-color-emphasis-300)', boxShadow: '0 10px 30px rgba(0,0,0,.3)',
};

export default function DocsChatWidget() {
  const [access, setAccess] = useState('checking'); // checking | ready | signin | hidden
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]); // {role:'user'|'assistant', content, sources?}
  const [quotes, setQuotes] = useState([]); // {text, url}
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sel, setSel] = useState(null); // { text, x, y }
  const scrollRef = useRef(null);

  // --- Access probe (mirrors the search bar) --------------------------------
  const probe = useCallback(() => {
    let active = true;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    fetch(`${CHAT_HOST}/health`, { method: 'GET', credentials: 'include', redirect: 'manual', cache: 'no-store', signal: controller.signal })
      .then((r) => {
        if (!active) return;
        if (r.type === 'opaqueredirect' || r.status === 401 || r.status === 403) setAccess('signin');
        else if (r.ok) setAccess('ready');
        else setAccess('hidden');
      })
      .catch(() => { if (active) setAccess('hidden'); })
      .finally(() => clearTimeout(timer));
    return () => { active = false; controller.abort(); };
  }, []);

  useEffect(() => {
    const cancel = probe();
    if (!ExecutionEnvironment.canUseDOM) return cancel;
    const onFocus = () => probe();
    window.addEventListener('focus', onFocus);
    return () => { cancel(); window.removeEventListener('focus', onFocus); };
  }, [probe]);

  // --- Highlight-to-quote ---------------------------------------------------
  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM || access !== 'ready') return undefined;
    const onMouseUp = () => {
      const s = window.getSelection && window.getSelection();
      const text = s ? String(s).trim() : '';
      if (!s || s.isCollapsed || text.length < 12) { setSel(null); return; }
      // Ignore selections inside the widget itself.
      const anchor = s.anchorNode && (s.anchorNode.nodeType === 1 ? s.anchorNode : s.anchorNode.parentElement);
      if (anchor && anchor.closest && anchor.closest('.docs-chat-widget')) { setSel(null); return; }
      let rect;
      try { rect = s.getRangeAt(0).getBoundingClientRect(); } catch { rect = null; }
      if (!rect || (!rect.width && !rect.height)) { setSel(null); return; }
      setSel({ text: text.slice(0, 1200), x: Math.min(rect.left + rect.width / 2, window.innerWidth - 130), y: rect.top - 8 });
    };
    const onScroll = () => setSel(null);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('scroll', onScroll, true);
    return () => { document.removeEventListener('mouseup', onMouseUp); document.removeEventListener('scroll', onScroll, true); };
  }, [access]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading, open]);

  const addQuote = () => {
    if (!sel) return;
    const url = ExecutionEnvironment.canUseDOM ? window.location.href.split('#')[0] : '';
    setQuotes((q) => (q.length >= 20 ? q : [...q, { text: sel.text, url }]));
    setSel(null);
    setOpen(true);
    if (ExecutionEnvironment.canUseDOM) window.getSelection()?.removeAllRanges();
  };

  const send = async () => {
    const q = input.trim();
    if ((!q && quotes.length === 0) || loading) return;
    const userMsg = { role: 'user', content: q || '(see the quoted passage)' };
    const history = [...messages, userMsg].map(({ role, content }) => ({ role, content }));
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);
    const sentQuotes = quotes;
    setQuotes([]);
    try {
      const res = await fetch(`${CHAT_HOST}/api/chat`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, quotes: sentQuotes }),
      });
      if (res.status === 401 || res.status === 403 || res.type === 'opaqueredirect') {
        setAccess('signin'); setLoading(false); return;
      }
      const data = await res.json().catch(() => ({}));
      if (data && data.answer) {
        setMessages((m) => [...m, { role: 'assistant', content: data.answer, sources: data.sources || [] }]);
      } else {
        setMessages((m) => [...m, { role: 'assistant', content: '⚠️ ' + (data.error || 'Something went wrong.'), sources: [] }]);
      }
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: '⚠️ Could not reach the assistant.', sources: [] }]);
    } finally {
      setLoading(false);
    }
  };

  if (access === 'checking' || access === 'hidden') {
    // Still render the selection chip only when ready; nothing otherwise.
    return null;
  }

  return (
    <div className="docs-chat-widget" style={wrap}>
      {/* Ask-about-this chip near a text selection */}
      {access === 'ready' && sel && (
        <button
          onClick={addQuote}
          style={{
            position: 'fixed', left: sel.x, top: Math.max(sel.y, 8), transform: 'translate(-50%, -100%)',
            zIndex: 600, padding: '4px 10px', borderRadius: 6, border: 'none', cursor: 'pointer',
            background: 'var(--ifm-color-primary)', color: '#fff', fontSize: 12, boxShadow: '0 2px 8px rgba(0,0,0,.25)',
          }}
        >
          💬 Ask about this
        </button>
      )}

      {open ? (
        <div style={panel}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--ifm-color-primary)', color: '#fff' }}>
            <strong>Ask the docs</strong>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer' }} aria-label="Close">×</button>
          </div>

          <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
            {access === 'signin' ? (
              <div style={{ padding: 12, textAlign: 'center' }}>
                <p style={{ marginBottom: 8 }}>The assistant is available to signed-in users.</p>
                <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer">Sign in to chat</a>
              </div>
            ) : (
              <>
                {messages.length === 0 && (
                  <p style={{ opacity: 0.65, fontSize: 13 }}>
                    Ask anything about the model or our case. Tip: select text on a page and click “Ask about this” to quote it.
                  </p>
                )}
                {messages.map((m, i) => (
                  <div key={i} style={{ margin: '10px 0', display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                    <div style={{
                      maxWidth: '85%', padding: '8px 12px', borderRadius: 10, fontSize: 14, lineHeight: 1.45,
                      background: m.role === 'user' ? 'var(--ifm-color-primary)' : 'var(--ifm-color-emphasis-100)',
                      color: m.role === 'user' ? '#fff' : 'inherit', whiteSpace: 'pre-wrap',
                    }}>
                      {m.content}
                      {m.role === 'assistant' && m.sources && m.sources.length > 0 && (
                        <div style={{ marginTop: 8, borderTop: '1px solid var(--ifm-color-emphasis-200)', paddingTop: 6, fontSize: 12 }}>
                          <div style={{ opacity: 0.6, marginBottom: 2 }}>Sources</div>
                          {m.sources.slice(0, 6).map((s, j) => (
                            <div key={j}><a href={s.url}>{s.title || s.url}</a></div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {loading && <div style={{ opacity: 0.6, fontSize: 13 }}>Thinking…</div>}
              </>
            )}
          </div>

          {access === 'ready' && (
            <div style={{ borderTop: '1px solid var(--ifm-color-emphasis-200)', padding: 8 }}>
              {quotes.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 6 }}>
                  {quotes.map((qt, i) => (
                    <span key={i} title={qt.text} style={{ fontSize: 11, background: 'var(--ifm-color-emphasis-200)', borderRadius: 6, padding: '2px 6px', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      “{qt.text}”
                      <button onClick={() => setQuotes((q) => q.filter((_, k) => k !== i))} style={{ marginLeft: 4, border: 'none', background: 'none', cursor: 'pointer' }}>×</button>
                    </span>
                  ))}
                </div>
              )}
              <div style={{ display: 'flex', gap: 6 }}>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
                  placeholder="Ask about the docs…"
                  style={{ flex: 1, padding: '8px 10px', borderRadius: 8, border: '1px solid var(--ifm-color-emphasis-300)', fontSize: 14 }}
                />
                <button onClick={send} disabled={loading} style={{ padding: '0 14px', borderRadius: 8, border: 'none', cursor: 'pointer', background: 'var(--ifm-color-primary)', color: '#fff' }}>Send</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button style={bubble} onClick={() => setOpen(true)} aria-label="Ask the docs" title="Ask the docs">💬</button>
      )}
    </div>
  );
}
