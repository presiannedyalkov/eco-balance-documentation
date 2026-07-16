// Shared helpers for the engines. Dependency-free.
const fs = require('fs');
const path = require('path');

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}
function splitFrontmatter(text) {
  // Normalise CRLF (and a stray BOM) before matching.
  //
  // This regex used to require LF, so any file written with \r\n silently fell
  // through to { front: '' } — the entry then had no parseable entry_id and was
  // dropped from the corpus entirely, while still being cited in the docs. That
  // made the feed engine re-propose insights already placed (a "duplicate" that
  // was really an invisible twin), and it quietly shrank the corpus every engine
  // sees. The bookmarks submodule is a separate repo, so the docs repo's
  // .gitattributes never normalised it — parse defensively here instead.
  const t = String(text).replace(/^﻿/, '').replace(/\r\n/g, '\n');
  const m = t.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  return m ? { front: m[1], body: m[2] } : { front: '', body: t };
}
function frontField(front, key) {
  const m = front.match(new RegExp('^' + key + ':\\s*(.*)$', 'm'));
  return m ? m[1].trim().replace(/^["']|["']$/g, '') : null;
}
function frontList(front, key) {
  const inline = front.match(new RegExp('^' + key + ':\\s*(\\[.*\\])\\s*$', 'm'));
  if (inline) return inline[1].replace(/^\[|\]$/g, '').split(',').map(s => s.trim()).filter(Boolean);
  const lines = front.split('\n'); const out = []; let cap = false;
  for (const l of lines) {
    if (new RegExp('^' + key + ':\\s*$').test(l)) { cap = true; continue; }
    if (cap) { const mm = l.match(/^\s*-\s*(.+)$/); if (mm) out.push(mm[1].trim()); else if (/^\S/.test(l)) break; }
  }
  return out;
}
module.exports = { walk, splitFrontmatter, frontField, frontList };
