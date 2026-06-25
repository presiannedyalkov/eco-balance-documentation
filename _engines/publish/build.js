#!/usr/bin/env node
// Publish engine: make the evidence resolve on the public site.
//  docs/evidence.md  — every cited source, anchored (#e<id>), distilled, linked, back-linked.
//  docs/research/*   — the synthesis briefs, bookmark links pointed at source URLs.
const fs = require('fs');
const path = require('path');
const { walk, splitFrontmatter, frontField } = require('../lib/common');

const ROOT = path.resolve(__dirname, '../..');
const BOOK = path.join(ROOT, 'research/bookmarks');
const BRIEFS = path.join(ROOT, 'research/briefs');
const DOCS = path.join(ROOT, 'docs');
const CITES = path.join(ROOT, 'research/citation_index.json');

const san = s => (s || '').replace(/[<>{}]/g, '').replace(/\|/g, '/');
const clip = (s, n) => (s && s.length > n ? s.slice(0, n).replace(/\s+\S*$/, '') + '…' : s);
const host = u => { try { return new URL(u).host.replace(/^www\./, ''); } catch (e) { return 'source'; } };

const meta = {};
for (const f of walk(BOOK)) {
  const { front } = splitFrontmatter(fs.readFileSync(f, 'utf8'));
  const id = frontField(front, 'entry_id'); if (!id) continue;
  meta[id] = {
    title: frontField(front, 'title') || id, url: frontField(front, 'url') || '',
    summary: frontField(front, 'ai_summary') || frontField(front, 'ai_main_topic') || '',
    type: frontField(front, 'article_type') || '', verif: frontField(front, 'verification_score'),
  };
}
let cited = {}; try { cited = JSON.parse(fs.readFileSync(CITES, 'utf8')); } catch (e) {}

function route(p) {
  let r = p.replace(/\.md$/, '');
  if (r.startsWith('template/')) r = '/model/' + r.slice(9);
  else if (r.startsWith('parameters/')) r = '/model/parameters/' + r.slice(11);
  else if (r.startsWith('case/')) r = '/our-case/' + r.slice(5);
  else r = '/' + r;
  return { r, label: p.split('/').pop().replace(/\.md$/, '').replace(/-/g, ' ') };
}
function group(p) {
  if (p.startsWith('template/method/')) return 'Method';
  if (p.startsWith('template/')) return p.split('/')[1].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  if (p.startsWith('parameters/')) return 'Parameters';
  if (p.startsWith('case/')) return 'Our case';
  return 'Other';
}

const ids = Object.keys(cited).sort();
const groups = {};
for (const id of ids) (groups[group(cited[id][0] || '')] ||= []).push(id);
let md = `---\ntitle: Evidence\nsidebar_position: 3\n---\n\n# Evidence\n\nEvery source cited across the model and our case, distilled to a line and linked to the original. ${ids.length} sources. The full classified library is under Research.\n\n`;
for (const g of Object.keys(groups).sort()) {
  md += `## ${g}\n\n`;
  for (const id of groups[g]) {
    const m = meta[id] || { title: id, url: '', summary: '' };
    const v = (m.verif && parseFloat(m.verif) < 1) ? ' · _needs verification_' : '';
    md += `### ${san(m.title)} {#e${id}}\n\n`;
    md += `Source: [${host(m.url)}](${m.url})${m.type ? ` · _${m.type}_` : ''}${v}\n\n`;
    if (m.summary) md += `${san(clip(m.summary, 300))}\n\n`;
    md += `Cited in: ${cited[id].map(p => { const { r, label } = route(p); return `[${label}](${r})`; }).join(' · ')}\n\n`;
  }
}
fs.writeFileSync(path.join(DOCS, 'evidence.md'), md);

const RES = path.join(DOCS, 'research');
fs.rmSync(RES, { recursive: true, force: true }); fs.mkdirSync(RES, { recursive: true });
fs.writeFileSync(path.join(RES, '_category_.json'), JSON.stringify({ label: 'Research', position: 4 }, null, 2) + '\n');
let nb = 0;
for (const f of fs.readdirSync(BRIEFS)) {
  if (!f.endsWith('.md')) continue;
  let c = fs.readFileSync(path.join(BRIEFS, f), 'utf8');
  c = c.replace(/\]\(research\/bookmarks\/[^)]*?(\d{10,})\.md\)/g, (mm, id) => (meta[id] && meta[id].url) ? `](${meta[id].url})` : mm);
  c = c.replace(/[<>{}]/g, '');
  const out = f.replace(/^_index\.md$/, 'index.md').replace(/^_assumptions\.md$/, 'assumptions.md');
  if (!c.startsWith('---')) c = `---\ntitle: ${out.replace(/\.md$/, '').replace(/__/g, ' / ').replace(/-/g, ' ')}\nhide_table_of_contents: true\n---\n\n` + c;
  fs.writeFileSync(path.join(RES, out), c); nb++;
}
console.log(`Publish: evidence.md (${ids.length} sources) + ${nb} research pages.`);
