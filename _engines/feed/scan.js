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

// Dedupe by ARTICLE (url), not just entry_id.
//
// The corpus contains duplicate captures of the same article under different
// (usually adjacent) entry_ids. Upstream fixes stop NEW duplicates being made
// (bookmarks-bot's check-url probe; bookmarks-mcp's list_urls "dedup surface
// for the feed engine"), but they can't remove the historical twins already in
// the corpus — and this engine only ever filtered on entry_id. So citing one
// twin left the other "unused" forever and the queue kept re-proposing insights
// that were already placed. Filtering on the url fixes it here, defensively,
// regardless of what the corpus contains.
const norm = (u) => String(u || '').trim().replace(/#.*$/, '').replace(/\/+$/, '');

// A URL counts as used if ANY entry sharing it is cited.
const citedUrls = new Set();
for (const c of corpus) if (cited.has(c.id) && norm(c.url)) citedUrls.add(norm(c.url));

const rawUnused = corpus.filter(c => !cited.has(c.id));
let cand = rawUnused.filter(c => !(norm(c.url) && citedUrls.has(norm(c.url))));
const dupesOfCited = rawUnused.length - cand.length;

cand.sort((a, b) => String(b.downloaded).localeCompare(String(a.downloaded)));

// Collapse twins that are BOTH uncited — keep the newest capture only.
const seenUrl = new Set();
const beforeCollapse = cand.length;
cand = cand.filter((c) => {
  const u = norm(c.url);
  if (!u) return true;                 // no url recorded — can't dedupe, keep
  if (seenUrl.has(u)) return false;    // a newer capture of this article is already queued
  seenUrl.add(u);
  return true;
});
const dupeTwins = beforeCollapse - cand.length;
const suppressed = dupesOfCited + dupeTwins;

fs.mkdirSync(OUT, { recursive: true });
const top = cand.slice(0, 40);
let md = `# Feed queue\n\nCorpus: ${corpus.length} Climate Change articles. Already used: ${cited.size}. Duplicate captures suppressed: ${suppressed} (${dupesOfCited} already cited under another entry_id, ${dupeTwins} twin captures collapsed). Not yet used: ${cand.length}.\n\nNewest unused first (top ${top.length}):\n\n| entry_id | title | source | downloaded |\n|---|---|---|---|\n`;
for (const c of top) md += `| ${c.id} | ${c.title.slice(0, 70).replace(/\|/g, '/')} | ${c.domain} | ${c.downloaded.slice(0, 10)} |\n`;
fs.writeFileSync(path.join(OUT, 'feed-queue.md'), md);
fs.writeFileSync(path.join(OUT, 'feed-queue.json'), JSON.stringify({ generated: new Date().toISOString(), corpus: corpus.length, used: cited.size, suppressed_duplicates: suppressed, duplicates_of_cited: dupesOfCited, duplicate_twins_collapsed: dupeTwins, unused: cand.length, candidates: cand }, null, 2));
console.log(`Feed: ${corpus.length} corpus, ${cited.size} used, ${suppressed} duplicate captures suppressed, ${cand.length} unused -> _engines/_reports/feed-queue.md`);
