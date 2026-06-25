#!/usr/bin/env node
// Enrichment router: take the feed queue, read each candidate's summary/tags,
// suggest which model/case domain it belongs to, and write a worklist with a
// ready-to-paste citation. A human (or AI) approves and places; the
// consistency engine then checks the result.
const fs = require('fs');
const path = require('path');
const { splitFrontmatter, frontField } = require('../lib/common');

const ROOT = path.resolve(__dirname, '../..');
const CORPUS = path.join(ROOT, 'research/bookmarks/Climate Change');
const OUT = path.join(ROOT, '_engines/_reports');
const QUEUE = path.join(OUT, 'feed-queue.json');
const N = 30;

const DOMAINS = [
  ['method/reforestation', ['tree', 'forest', 'reforest', 'planting', 'seedling', 'afforest', 'woodland', 'canopy']],
  ['method/soil', ['soil', 'fungi', 'mycorrhiz', 'compost', 'erosion', 'microb', 'peat']],
  ['method/water', ['water', 'rain', 'drought', 'irrigation', 'river', 'groundwater', 'wetland', 'hydro']],
  ['method/biodiversity', ['biodiversity', 'wildlife', 'habitat', 'rewilding', 'pollinator', 'bird', 'insect', 'fauna', 'species']],
  ['method/community', ['community', 'indigenous', 'stakeholder', 'volunteer', 'traditional', 'social']],
  ['site-and-land', ['land use', 'parcel', 'acquisition', 'property', 'farmland']],
  ['infrastructure', ['solar', 'off-grid', 'tiny house', 'power', 'energy', 'building', 'tool']],
  ['organization', ['legal', 'governance', 'ngo', 'nonprofit', 'policy', 'regulation']],
  ['stewardship-handoff', ['trust', 'easement', 'succession', 'commons', 'rights of nature', 'permanence']],
  ['funding', ['grant', 'funding', 'crowdfund', 'donor', 'philanthrop']],
  ['economics', ['revenue', 'cost', 'budget', 'carbon credit', 'market', 'income', 'economic']],
  ['growth-operations', ['scale', 'expansion', 'operations', 'management']],
  ['risk', ['fire', 'wildfire', 'pest', 'disease', 'flood', 'hazard', 'threat', 'risk']],
  ['indicators', ['monitor', 'measure', 'indicator', 'metric', 'remote sensing', 'satellite']],
  ['engagement', ['communication', 'outreach', 'media', 'awareness']],
  ['learning', ['study', 'lesson', 'case study', 'evidence']],
  ['foundation', ['vision', 'sdg', 'climate change', 'conservation']],
];

function pick(text) {
  const t = text.toLowerCase();
  let best = null, bestScore = 0;
  for (const [dom, kws] of DOMAINS) {
    let s = 0;
    for (const k of kws) if (t.includes(k)) s++;
    if (s > bestScore) { bestScore = s; best = dom; }
  }
  return best ? { domain: best, score: bestScore } : { domain: 'foundation', score: 0 };
}

let q;
try { q = JSON.parse(fs.readFileSync(QUEUE, 'utf8')); }
catch (e) { console.error('Run `npm run engine:feed` first.'); process.exit(1); }

const rows = [];
for (const c of q.candidates.slice(0, N)) {
  const file = path.join(CORPUS, c.id + '.md');
  let summary = '', topic = '', tags = '';
  if (fs.existsSync(file)) {
    const { front } = splitFrontmatter(fs.readFileSync(file, 'utf8'));
    summary = frontField(front, 'ai_summary') || '';
    topic = frontField(front, 'ai_main_topic') || '';
    const tg = front.match(/tags:\n([\s\S]*?)(?:\n\w|$)/);
    tags = tg ? tg[1].replace(/\s*-\s*/g, ' ') : '';
  }
  const { domain, score } = pick([c.title, topic, tags, summary].join(' '));
  rows.push({ id: c.id, title: c.title, topic, domain, score, summary });
}

fs.mkdirSync(OUT, { recursive: true });
let md = `# Enrichment worklist\n\nTop ${rows.length} unused articles, routed to a suggested domain. Review, place the one-line insight in the doc, and paste the citation. The consistency engine checks the result.\n\n`;
for (const r of rows) {
  md += `### ${r.title}\n\n`;
  md += `- **Suggested domain:** \`template/${r.domain}\` (match ${r.score})\n`;
  if (r.topic) md += `- **Topic:** ${r.topic}\n`;
  if (r.summary) md += `- **Summary:** ${r.summary.slice(0, 240)}\n`;
  md += `- **Citation:** \`[${(r.topic || r.title).slice(0, 60)}](research/bookmarks/Climate%20Change/${r.id}.md)\`\n\n`;
}
fs.writeFileSync(path.join(OUT, 'enrichment-worklist.md'), md);
console.log(`Enrichment: routed ${rows.length} candidates -> _engines/_reports/enrichment-worklist.md`);
