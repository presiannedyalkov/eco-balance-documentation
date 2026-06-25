#!/usr/bin/env node
// Feed engine: scan the bookmark corpus for articles not yet used in the
// model or case, newest first, and write a queue for the enrichment step.
const fs = require('fs');
const path = require('path');
const { walk, splitFrontmatter, frontField } = require('../lib/common');

const ROOT = path.resolve(__dirname, '../..');
const CORPUS = path.join(ROOT, 'research/bookmarks/Climate Change');
const SRC = ['template', 'case', 'parameters'].map(d => path.join(ROOT, d));
const OUT = path.join(ROOT, '_engines/_reports');

const corpus = [];
for (const f of walk(CORPUS)) {
  const { front } = splitFrontmatter(fs.readFileSync(f, 'utf8'));
  const id = frontField(front, 'entry_id');
  if (!id) continue;
  corpus.push({
    id, title: frontField(front, 'title') || '',
    domain: frontField(front, 'domain') || '',
    downloaded: frontField(front, 'downloaded') || '',
    article_type: frontField(front, 'article_type') || '',
    url: frontField(front, 'url') || '',
  });
}

const cited = new Set();
for (const base of SRC) for (const f of walk(base)) {
  const txt = fs.readFileSync(f, 'utf8');
  for (const m of txt.matchAll(/(\d{10,})\.md/g)) cited.add(m[1]);
  for (const m of txt.matchAll(/\b(\d{13})\b/g)) cited.add(m[1]); // entry_ids in sources/evidence
}

const cand = corpus.filter(c => !cited.has(c.id));
cand.sort((a, b) => String(b.downloaded).localeCompare(String(a.downloaded)));

fs.mkdirSync(OUT, { recursive: true });
const top = cand.slice(0, 40);
let md = `# Feed queue\n\nCorpus: ${corpus.length} Climate Change articles. Already used: ${cited.size}. Not yet used: ${cand.length}.\n\nNewest unused first (top ${top.length}):\n\n| entry_id | title | source | downloaded |\n|---|---|---|---|\n`;
for (const c of top) md += `| ${c.id} | ${c.title.slice(0, 70).replace(/\|/g, '/')} | ${c.domain} | ${c.downloaded.slice(0, 10)} |\n`;
fs.writeFileSync(path.join(OUT, 'feed-queue.md'), md);
fs.writeFileSync(path.join(OUT, 'feed-queue.json'), JSON.stringify({ generated: new Date().toISOString(), corpus: corpus.length, used: cited.size, unused: cand.length, candidates: cand }, null, 2));
console.log(`Feed: ${corpus.length} corpus, ${cited.size} used, ${cand.length} unused -> _engines/_reports/feed-queue.md`);
