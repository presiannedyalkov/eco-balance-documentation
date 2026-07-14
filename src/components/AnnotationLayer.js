/**
 * Reader annotation layer.
 *
 * Lets a signed-in reader attach notes to a docs page — either to a TEXT
 * SELECTION or to a PARAGRAPH (hover a block, click the ✎ pin). Notes are held
 * as CLIENT-SIDE DRAFTS in localStorage (per page); nothing leaves the browser
 * until the reader hits "Send", which POSTs them to the eco-balance-mcp service
 * (`/api/annotations`), where each becomes a GitHub issue in the moderation
 * queue the Comment-responder proposer reads.
 *
 * Gated by Cloudflare Access on the same host as search/chat, so it only renders
 * for signed-in users (one probe of /health, three states: ready/signin/hidden).
 * Positioned bottom-LEFT so it doesn't collide with the chat bubble (bottom-right).
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

function getEnvVar(name, fallback) {
  if (typeof window !== 'undefined' && window[name]) return window[name];
  if (typeof process !== 'undefined' && process.env && process.env[name]) return process.env[name];
  return fallback;
}

const HOST = getEnvVar('DOCS_CHAT_HOST', 'https://docs-chat.eco-balance.cc');
const LOGIN_URL = getEnvVar('DOCS_CHAT_LOGIN_URL', HOST);
const TYPES = ['comment', 'suggestion', 'question'];

const keyFor = () =>
  'eco-annotations:' + (ExecutionEnvironment.canUseDOM ? window.location.pathname : '/');

function loadDrafts() {
  if (!ExecutionEnvironment.canUseDOM) return [];
  try { return JSON.parse(window.localStorage.getItem(keyFor()) || '[]'); } catch { return []; }
}
function saveDrafts(drafts) {
  if (!ExecutionEnvironment.canUseDOM) return;
  try { window.localStorage.setItem(keyFor(), JSON.stringify(drafts)); } catch { /* quota */ }
}

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

export default function AnnotationLayer() {
  const [access, setAccess] = useState('checking'); // checking | ready | signin | hidden
  const [drafts, setDrafts] = useState([]);
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState(null);   // { text, x, y }
  const [pin, setPin] = useState(null);   // { x, y, paragraphId, quote }
  const [sending, setSending] = useState(false);
  const [flash, setFlash] = useState('');

  // --- Access probe (same pattern as search/chat) ---------------------------
  const probe = useCallback(() => {
    let active = true;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    fetch(`${HOST}/health`, { method: 'GET', credentials: 'include', redirect: 'manual', cache: 'no-store', signal: controller.signal })
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
    setDrafts(loadDrafts());
    const onFocus = () => probe();
    window.addEventListener('focus', onFocus);
    return () => { cancel(); window.removeEventListener('focus', onFocus); };
  }, [probe]);

  // Reload drafts + reset transient UI on client-side route change.
  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return undefined;
    const onRoute = () => { setDrafts(loadDrafts()); setSel(null); setPin(null); };
    window.addEventListener('popstate', onRoute);
    return () => window.removeEventListener('popstate', onRoute);
  }, []);

  const persist = (next) => { setDrafts(next); saveDrafts(next); };

  const addDraft = (anchor) => {
    const url = ExecutionEnvironment.canUseDOM ? window.location.href.split('#')[0] : '';
    const pageTitle = ExecutionEnvironment.canUseDOM ? document.title.replace(/ \| .*$/, '') : '';
    const next = [...drafts, { id: uid(), type: 'comment', text: '', anchor, url, pageTitle }];
    persist(next);
    setOpen(true);
  };

  // Fire the shared "ask the docs" event the chat widget listens for, so both
  // actions live in one on-selection menu instead of two overlapping chips.
  const askDocs = (text) => {
    if (!ExecutionEnvironment.canUseDOM || !text) return;
    const url = window.location.href.split('#')[0];
    window.dispatchEvent(new CustomEvent('eco:ask-selection', { detail: { text, url } }));
  };

  // --- Text selection -> chip ----------------------------------------------
  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM || access !== 'ready') return undefined;
    const onMouseUp = () => {
      const s = window.getSelection && window.getSelection();
      const text = s ? String(s).trim() : '';
      if (!s || s.isCollapsed || text.length < 6) { setSel(null); return; }
      const node = s.anchorNode && (s.anchorNode.nodeType === 1 ? s.anchorNode : s.anchorNode.parentElement);
      if (node && node.closest && node.closest('.eco-annot, .docs-chat-widget')) { setSel(null); return; }
      let rect; try { rect = s.getRangeAt(0).getBoundingClientRect(); } catch { rect = null; }
      if (!rect || (!rect.width && !rect.height)) { setSel(null); return; }
      setSel({ text: text.slice(0, 1000), x: Math.min(rect.left + rect.width / 2, window.innerWidth - 120), y: rect.top - 8 });
    };
    const onScroll = () => { setSel(null); setPin(null); };
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('scroll', onScroll, true);
    return () => { document.removeEventListener('mouseup', onMouseUp); document.removeEventListener('scroll', onScroll, true); };
  }, [access, drafts]);

  // --- Paragraph hover -> pin ----------------------------------------------
  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM || access !== 'ready') return undefined;
    const SELECTOR = '.markdown p, .markdown li, .markdown h2, .markdown h3, .markdown h4, .markdown blockquote';
    const onOver = (e) => {
      const block = e.target.closest && e.target.closest(SELECTOR);
      if (!block || (block.closest && block.closest('.eco-annot'))) return;
      const rect = block.getBoundingClientRect();
      if (rect.height === 0) return;
      const quote = (block.textContent || '').trim().slice(0, 200);
      setPin({ x: rect.left - 26, y: rect.top + 2, paragraphId: block.id || '', quote });
    };
    document.addEventListener('mouseover', onOver);
    return () => document.removeEventListener('mouseover', onOver);
  }, [access]);

  const updateDraft = (id, patch) => persist(drafts.map((d) => (d.id === id ? { ...d, ...patch } : d)));
  const removeDraft = (id) => persist(drafts.filter((d) => d.id !== id));

  const send = async () => {
    const payload = drafts.filter((d) => d.text.trim());
    if (!payload.length || sending) return;
    setSending(true); setFlash('');
    try {
      const res = await fetch(`${HOST}/api/annotations`, {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ annotations: payload }),
      });
      if (res.status === 401 || res.status === 403 || res.type === 'opaqueredirect') { setAccess('signin'); setSending(false); return; }
      if (res.ok) {
        const sentIds = new Set(payload.map((d) => d.id));
        persist(drafts.filter((d) => !sentIds.has(d.id)));
        setFlash(`Sent ${payload.length} note${payload.length > 1 ? 's' : ''} — thank you!`);
      } else {
        const data = await res.json().catch(() => ({}));
        setFlash('⚠️ ' + (data.error || 'Could not send. Try again.'));
      }
    } catch {
      setFlash('⚠️ Could not reach the server.');
    } finally {
      setSending(false);
    }
  };

  if (access === 'checking' || access === 'hidden') return null;

  const withText = drafts.filter((d) => d.text.trim()).length;
  const btn = { position: 'fixed', left: 20, bottom: 20, zIndex: 500 };
  const menuBtn = { padding: '5px 10px', border: 'none', cursor: 'pointer', background: 'var(--ifm-color-primary)', color: '#fff', fontSize: 12, whiteSpace: 'nowrap' };
  const panel = {
    position: 'fixed', left: 20, bottom: 80, zIndex: 500, width: 'min(360px, calc(100vw - 40px))',
    maxHeight: 'min(70vh, 560px)', display: 'flex', flexDirection: 'column', borderRadius: 12, overflow: 'hidden',
    background: 'var(--ifm-background-surface-color, var(--ifm-background-color))',
    border: '1px solid var(--ifm-color-emphasis-300)', boxShadow: '0 10px 30px rgba(0,0,0,.3)',
  };

  return (
    <div className="eco-annot">
      {/* shared on-selection menu: ask the docs + add a note, side by side */}
      {access === 'ready' && sel && (
        <div
          style={{ position: 'fixed', left: sel.x, top: Math.max(sel.y, 8), transform: 'translate(-50%,-100%)', zIndex: 600,
            display: 'flex', gap: 1, borderRadius: 6, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,.25)' }}
        >
          <button
            onMouseDown={(e) => { e.preventDefault(); askDocs(sel.text); setSel(null); if (ExecutionEnvironment.canUseDOM) window.getSelection()?.removeAllRanges(); }}
            style={{ ...menuBtn, borderRight: '1px solid rgba(255,255,255,.25)' }}
          >💬 Ask the docs</button>
          <button
            onMouseDown={(e) => { e.preventDefault(); addDraft({ kind: 'selection', quote: sel.text }); setSel(null); if (ExecutionEnvironment.canUseDOM) window.getSelection()?.removeAllRanges(); }}
            style={menuBtn}
          >✎ Add note</button>
        </div>
      )}

      {/* paragraph pin */}
      {access === 'ready' && pin && (
        <button
          title="Note on this paragraph"
          onMouseDown={(e) => { e.preventDefault(); addDraft({ kind: 'paragraph', paragraphId: pin.paragraphId, quote: pin.quote }); setPin(null); }}
          style={{ position: 'fixed', left: pin.x, top: pin.y, zIndex: 590, width: 20, height: 20, lineHeight: '20px', textAlign: 'center',
            padding: 0, borderRadius: 5, border: 'none', cursor: 'pointer', background: 'var(--ifm-color-emphasis-300)', color: 'var(--ifm-font-color-base)', fontSize: 12 }}
        >✎</button>
      )}

      {/* toggle button */}
      <button onClick={() => setOpen((o) => !o)} style={{ ...btn, height: 44, padding: '0 14px', borderRadius: 22, border: 'none', cursor: 'pointer',
        background: 'var(--ifm-color-primary)', color: '#fff', fontSize: 14, boxShadow: '0 4px 14px rgba(0,0,0,.25)' }}>
        ✎ Notes{drafts.length ? ` (${drafts.length})` : ''}
      </button>

      {open && (
        <div style={panel}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--ifm-color-primary)', color: '#fff' }}>
            <strong>Your notes on this page</strong>
            <button onClick={() => setOpen(false)} aria-label="Close" style={{ background: 'none', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer' }}>×</button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
            {drafts.length === 0 && (
              <p style={{ opacity: 0.65, fontSize: 13 }}>Select text or hover a paragraph and click ✎ to add a note. Notes stay in your browser until you send them.</p>
            )}
            {drafts.map((d) => (
              <div key={d.id} style={{ marginBottom: 12, borderBottom: '1px solid var(--ifm-color-emphasis-200)', paddingBottom: 10 }}>
                {d.anchor?.quote && (
                  <div style={{ fontSize: 11, color: 'var(--ifm-color-emphasis-600)', marginBottom: 4, fontStyle: 'italic' }}>
                    {d.anchor.kind === 'paragraph' ? '¶ ' : '“'}{d.anchor.quote.slice(0, 90)}{d.anchor.quote.length > 90 ? '…' : ''}{d.anchor.kind === 'selection' ? '”' : ''}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                  <select value={d.type} onChange={(e) => updateDraft(d.id, { type: e.target.value })}
                    style={{ fontSize: 12, padding: '2px 4px', borderRadius: 6, border: '1px solid var(--ifm-color-emphasis-300)' }}>
                    {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <button onClick={() => removeDraft(d.id)} title="Delete" style={{ marginLeft: 'auto', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--ifm-color-emphasis-600)' }}>🗑</button>
                </div>
                <textarea value={d.text} onChange={(e) => updateDraft(d.id, { text: e.target.value })} placeholder="Write your note…" rows={2}
                  style={{ width: '100%', fontSize: 13, padding: 6, borderRadius: 6, border: '1px solid var(--ifm-color-emphasis-300)', resize: 'vertical' }} />
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid var(--ifm-color-emphasis-200)', padding: 10 }}>
            {flash && <div style={{ fontSize: 12, marginBottom: 6, color: flash.startsWith('⚠️') ? 'var(--ifm-color-danger)' : 'var(--ifm-color-success)' }}>{flash}</div>}
            {access === 'signin' ? (
              <a href={LOGIN_URL}>Sign in to send notes</a>
            ) : (
              <button onClick={send} disabled={sending || withText === 0} style={{ width: '100%', padding: '8px 0', borderRadius: 8, border: 'none',
                cursor: withText ? 'pointer' : 'not-allowed', opacity: withText ? 1 : 0.5, background: 'var(--ifm-color-primary)', color: '#fff', fontSize: 14 }}>
                {sending ? 'Sending…' : `Send ${withText || ''} note${withText === 1 ? '' : 's'}`.trim()}
              </button>
            )}
            <div style={{ fontSize: 11, color: 'var(--ifm-color-emphasis-600)', marginTop: 6 }}>Sent notes become issues the team reviews.</div>
          </div>
        </div>
      )}
    </div>
  );
}
