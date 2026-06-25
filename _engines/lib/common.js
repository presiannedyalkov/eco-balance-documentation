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
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  return m ? { front: m[1], body: m[2] } : { front: '', body: text };
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
