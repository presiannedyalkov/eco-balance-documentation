#!/usr/bin/env node
// Quality engine — the structural layer of the §8 quality system.
// Scores each model domain on Model<->Case coverage, evidence density, and
// voice hygiene, detects structural drift (domain-id collisions, orphan
// decisions, off-convention decision statuses, incomplete parameter profiles),
// and writes a health report + src/data/health.json for the dashboard.
const fs = require('fs');
const path = require('path');
const { walk, splitFrontmatter, frontField } = require('../lib/common');

const ROOT = path.resolve(__dirname, '../..');
const TPL = path.join(ROOT, 'template');
const CASE = path.join(ROOT, 'case');
const PARAMS = path.join(ROOT, 'parameters');
const CORPUS = path.join(ROOT, 'research/bookmarks');
const OUT = path.join(ROOT, '_engines/_reports');
const rel = p => path.relative(ROOT, p).replace(/\\/g, '/');

const VOICE = ['delve', 'seamless', 'robust', 'leverage', 'foster', 'harness',
  'unlock', 'empower', 'embark', 'vibrant', 'tapestry', 'realm', 'testament',
  'utilize', 'groundbreaking', 'transformative', 'game-changing', 'cutting-edge',
  'furthermore', 'moreover', 'it is worth noting', 'it is important to note'];
const DECISION_STATUSES = ['proposed', 'decided', 'revisit'];
const PARAM_KEYS = ['id', 'kind', 'country', 'climate_zone', 'rainfall_mm', 'seasons',
  'hazards', 'target_ecosystem', 'native_palette', 'plausible_hectares',
  'land_cost_band_eur_per_ha', 'planting_window', 'legal_options',
  'funding_landscape', 'key_risks', 'sources', 'status'];

// Valid corpus ids, so citation counts only credit real articles.
const corpusIds = new Set();
for (const f of walk(CORPUS)) {
  const { front } = splitFrontmatter(fs.readFileSync(f, 'utf8'));
  const id = frontField(front, 'entry_id');
  if (id) corpusIds.add(id);
}
const esc = w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function scan(files) {
  let cites = 0, voice = 0;
  for (const f of files) {
    const { body } = splitFrontmatter(fs.readFileSync(f, 'utf8'));
    for (const m of body.matchAll(/\]\(([^)]+)\)/g)) {
      const idm = m[1].match(/(\d{10,})\.md/);
      if (idm && corpusIds.has(idm[1])) cites++;
    }
    const low = body.toLowerCase();
    for (const w of VOICE) voice += (low.match(new RegExp('\\b' + esc(w) + '\\b', 'g')) || []).length;
  }
  return { cites, voice };
}

// 1. Template domains: folder -> { ids, files, statuses }; and id -> folders.
const domains = {};
const idToFolders = {};
for (const d of fs.readdirSync(TPL, { withFileTypes: true }).filter(e => e.isDirectory())) {
  const files = walk(path.join(TPL, d.name));
  const ids = new Set();
  for (const f of files) { const { front } = splitFrontmatter(fs.readFileSync(f, 'utf8')); const id = frontField(front, 'domain'); if (id) ids.add(id); }
  domains[d.name] = { ids: [...ids], files };
  for (const id of ids) (idToFolders[id] ||= []).push(d.name);
}

// 2. Case decisions.
const decisions = [];
for (const f of walk(path.join(CASE, 'decisions'))) {
  const { front } = splitFrontmatter(fs.readFileSync(f, 'utf8'));
  decisions.push({ id: frontField(front, 'id') || path.basename(f, '.md'), domain: frontField(front, 'domain'), status: frontField(front, 'status') });
}
const decisionDomains = new Set(decisions.map(d => d.domain).filter(Boolean));
const deferredDomains = new Set(decisions.filter(d => /defer/i.test(d.status || '')).map(d => d.domain));

// 3. Structural issues.
const collisions = Object.entries(idToFolders).filter(([, f]) => f.length > 1).map(([id, f]) => `${id} used by: ${f.join(', ')}`);
const validIds = new Set(Object.keys(idToFolders));
const orphanDecisions = decisions.filter(d => d.domain && !validIds.has(d.domain)).map(d => `${d.id} -> ${d.domain} (no template domain)`);
const badStatus = decisions.filter(d => d.status && !DECISION_STATUSES.includes(d.status)).map(d => `${d.id}: "${d.status}"`);

// 4. Parameter completeness.
const paramGaps = [];
for (const f of walk(PARAMS)) {
  const { front } = splitFrontmatter(fs.readFileSync(f, 'utf8'));
  const missing = PARAM_KEYS.filter(k => !new RegExp('^' + k + ':', 'm').test(front));
  if (missing.length) paramGaps.push(`${path.basename(f)}: missing ${missing.join(', ')}`);
}

// 5. Per-domain health score.
const grade = h => h >= 85 ? 'A' : h >= 70 ? 'B' : h >= 55 ? 'C' : h >= 40 ? 'D' : 'F';
const domainReports = [];
for (const [name, info] of Object.entries(domains)) {
  const covered = info.ids.some(id => decisionDomains.has(id));
  const deferred = info.ids.some(id => deferredDomains.has(id));
  const { cites, voice } = scan(info.files);
  const coverageScore = (covered || deferred) ? 40 : 0;
  const evidenceScore = cites >= 6 ? 40 : cites >= 3 ? 28 : cites >= 1 ? 15 : 0;
  const voiceScore = Math.max(0, 20 - 8 * voice);
  const health = coverageScore + evidenceScore + voiceScore;
  const decs = decisions.filter(d => info.ids.includes(d.domain)).map(d => d.id);
  domainReports.push({ name, domain_id: info.ids.join(',') || '?', covered, deferred, decisions: decs, citations: cites, voiceHits: voice, docs: info.files.length, health, grade: grade(health) });
}
domainReports.sort((a, b) => a.health - b.health || a.name.localeCompare(b.name));
const overall = Math.round(domainReports.reduce((s, d) => s + d.health, 0) / (domainReports.length || 1));
const uncovered = domainReports.filter(d => !d.covered && !d.deferred).map(d => d.name);

// 6. Outputs.
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(path.join(ROOT, 'src/data'), { recursive: true });
const health = {
  generated: new Date().toISOString().slice(0, 16),
  overall, overall_grade: grade(overall),
  domains: domainReports,
  issues: {
    domain_id_collisions: collisions,
    orphan_decisions: orphanDecisions,
    off_convention_decision_status: badStatus,
    parameter_gaps: paramGaps,
    uncovered_domains: uncovered,
  },
};
fs.writeFileSync(path.join(ROOT, 'src/data/health.json'), JSON.stringify(health, null, 2));

let md = `# System health\n\nGenerated ${health.generated}. Overall ${overall}/100 (${health.overall_grade}), across ${domainReports.length} model domains.\n\n`;
md += `Score = coverage (a case decision or deferral, 40) + evidence (citations, up to 40) + voice hygiene (up to 20).\n\n`;
md += `## Domain scores\n\n| Domain | Grade | Health | Case decision | Citations | Voice hits |\n|---|---|---|---|---|---|\n`;
for (const d of domainReports) md += `| ${d.name} | ${d.grade} | ${d.health} | ${d.covered ? d.decisions.join(', ') : (d.deferred ? 'deferred' : '—')} | ${d.citations} | ${d.voiceHits} |\n`;
const sec = (t, a) => { md += `\n## ${t} (${a.length})\n\n` + (a.length ? a.map(x => `- ${x}`).join('\n') + '\n' : 'None.\n'); };
sec(`Model↔Case drift — uncovered domains`, uncovered.map(x => `${x} — no case decision or explicit deferral`));
sec('Domain-ID collisions', collisions);
sec('Orphan decisions', orphanDecisions);
sec('Off-convention decision status', badStatus);
sec('Incomplete parameter profiles', paramGaps);
fs.writeFileSync(path.join(OUT, 'quality.md'), md);

console.log(`Quality: overall ${overall}/100 (${health.overall_grade}); ${uncovered.length} uncovered, ${collisions.length} id-collisions, ${orphanDecisions.length} orphans, ${badStatus.length} bad-status, ${paramGaps.length} param-gaps.`);
