#!/usr/bin/env node
// Consistency & quality engine: validates the source trees (template, case,
// parameters). Checks internal links resolve, citations point at real corpus
// articles, flags AI-voice tells, builds the citation index, and lists open
// decisions. Writes a health report.
const fs = require('fs');
const path = require('path');
const { walk, splitFrontmatter, frontField, frontList } = require('../lib/common');

const ROOT = path.resolve(__dirname, '../..');
const SRC = ['template', 'case', 'parameters'].map(d => path.join(ROOT, d));
const CORPUS = path.join(ROOT, 'research/bookmarks'); // all collections
const OUT = path.join(ROOT, '_engines/_reports');
const rel = p => path.relative(ROOT, p).replace(/\\/g, '/');

const corpusIds = new Set();
for (const f of walk(CORPUS)) {
  const { front } = splitFrontmatter(fs.readFileSync(f, 'utf8'));
  const id = frontField(front, 'entry_id');
  if (id) corpusIds.add(id);
}

const VOICE = ['delve', 'seamless', 'robust', 'leverage', 'foster', 'harness',
  'unlock', 'empower', 'embark', 'vibrant', 'tapestry', 'realm', 'testament',
  'utilize', 'groundbreaking', 'transformative', 'game-changing', 'cutting-edge',
  'furthermore', 'moreover', 'it is worth noting', 'it is important to note'];

const brokenLinks = [], badCitations = [], voiceHits = [], decisions = [];
const citationIndex = {};
let docCount = 0;

for (const base of SRC) for (const f of walk(base)) {
  docCount++;
  const txt = fs.readFileSync(f, 'utf8');
  const { front, body } = splitFrontmatter(txt);
  const dir = path.dirname(f);
  for (const m of body.matchAll(/\]\(([^)]+)\)/g)) {
    let target = m[1].split('#')[0].trim();
    if (!target || /^https?:|^mailto:/.test(target)) continue;
    if (target.includes('research/bookmarks')) {
      const idm = target.match(/(\d{10,})\.md/);
      if (idm) { if (!corpusIds.has(idm[1])) badCitations.push(`${rel(f)} -> ${idm[1]}`); else (citationIndex[idm[1]] ||= []).push(rel(f)); }
      continue;
    }
    if (!target.endsWith('.md')) continue;
    if (!fs.existsSync(path.resolve(dir, decodeURIComponent(target)))) brokenLinks.push(`${rel(f)} -> ${target}`);
  }
  for (const k of ['sources', 'evidence']) for (const v of frontList(front, k)) {
    const idm = String(v).match(/\d{10,}/);
    if (idm) { if (!corpusIds.has(idm[0])) badCitations.push(`${rel(f)} [${k}] -> ${idm[0]}`); else (citationIndex[idm[0]] ||= []).push(rel(f)); }
  }
  const low = body.toLowerCase();
  for (const w of VOICE) {
    const c = (low.match(new RegExp('\\b' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'g')) || []).length;
    if (c) voiceHits.push(`${rel(f)}: "${w}" x${c}`);
  }
  if (rel(f).includes('case/decisions')) decisions.push({ file: rel(f), status: frontField(front, 'status') });
}

fs.mkdirSync(OUT, { recursive: true });
const idx = {};
for (const id of Object.keys(citationIndex).sort()) idx[id] = [...new Set(citationIndex[id])];
fs.writeFileSync(path.join(ROOT, 'research/citation_index.json'), JSON.stringify(idx, null, 2));

let md = `# Consistency & quality report\n\nGenerated ${new Date().toISOString().slice(0, 16)}. Scanned ${docCount} source docs.\n\n`;
md += `## Summary\n\n- Broken internal links: ${brokenLinks.length}\n- Unresolved citations: ${badCitations.length}\n- Cited articles indexed: ${Object.keys(idx).length}\n- Voice-tell hits: ${voiceHits.length}\n- Decision records: ${decisions.length}\n\n`;
const section = (t, a) => { md += `## ${t} (${a.length})\n\n` + (a.length ? a.slice(0, 100).map(x => `- ${x}`).join('\n') + '\n\n' : 'None.\n\n'); };
section('Broken internal links', brokenLinks);
section('Unresolved citations', badCitations);
section('Voice tells to review', voiceHits);
md += `## Decisions\n\n` + decisions.map(d => `- ${d.file} — ${d.status || '?'}`).join('\n') + '\n';
fs.writeFileSync(path.join(OUT, 'health.md'), md);
console.log(`Consistency: ${brokenLinks.length} broken links, ${badCitations.length} bad citations, ${voiceHits.length} voice hits, ${Object.keys(idx).length} citations indexed.`);

// --strict: fail the run on broken links or citations that point at articles
// the corpus doesn't hold. Used by pr-checks so a PR (human or fleet) can't
// introduce an unresolvable citation.
//
// Deliberately NOT the default: corpus-refresh runs this engine too, and a
// citation can be stranded by something no PR did — the bookmarks vault
// deduping same-URL double-captures out from under a doc that cited one. Hard
// failing there would block every corpus refresh over pre-existing content, so
// that path reports instead (and sync unlinks the citation rather than shipping
// a broken anchor).
if (process.argv.includes('--strict') && (badCitations.length || brokenLinks.length)) {
  console.error(`\nFAIL (--strict): ${brokenLinks.length} broken link(s), ${badCitations.length} unresolved citation(s).`);
  for (const x of [...brokenLinks, ...badCitations].slice(0, 20)) console.error(`  - ${x}`);
  console.error(`\nAn unresolved citation points at a corpus article that isn't there.`);
  console.error(`If the vault deduped a same-URL double-capture, the surviving twin holds the`);
  console.error(`same URL under a different entry_id — repoint the citation at it.`);
  process.exit(1);
}
