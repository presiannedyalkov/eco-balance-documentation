#!/usr/bin/env node
// Citation-provenance gate — Phase 1 of research/CITATION_PROVENANCE_MODEL.md.
//
// Consumes the shared `provenance-cite` package (NOT a bespoke reimplementation).
// This file is only eco-balance's *adapter*: it teaches the shared validator how
// to resolve THIS project's sources (corpus entry_ids -> bookmark url/title), then
// hands off to provenance-cite for the actual checking.
//
// A doc opts in by adding a `citations:` block to its frontmatter and marking the
// defended sentence with [^key]. Until a doc does, this is a no-op (0 records ->
// passes), so it's safe to land ahead of adoption.
//
// Run:  node _engines/consistency/check-citations.mjs [--strict]
//   --strict exits 1 on any error (used by pr-checks). Without it, reports only.
//
// ESM (.mjs) on purpose: the engines are CommonJS, but provenance-cite is ESM.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { validate } from "provenance-cite";
import { parseMarkdown } from "provenance-cite/loaders/markdown";

const ROOT = fileURLToPath(new URL("../../", import.meta.url));
const SRC_DIRS = ["template", "case", "parameters"];
const CORPUS = join(ROOT, "research/bookmarks");
const strict = process.argv.includes("--strict");

// ── eco-balance adapter ─────────────────────────────────────────────
// entry_id -> { id, url, title } from the corpus bookmark frontmatter. Flat
// key: value fields, so a line regex is enough (no YAML dep needed here). claims/
// text are omitted for now — Phase 2 emits `claims:` from the distil pass, at
// which point source_claim/anchor checks light up automatically.
function splitFront(t) {
  const s = String(t).replace(/^﻿/, "").replace(/\r\n/g, "\n");
  const m = s.match(/^---\n([\s\S]*?)\n---/);
  return m ? m[1] : "";
}
function field(front, key) {
  const m = front.match(new RegExp("^" + key + ":\\s*(.*)$", "m"));
  return m ? m[1].trim().replace(/^["']|["']$/g, "") : "";
}
function walkMd(dir) {
  const out = [];
  let names;
  try { names = readdirSync(dir); } catch { return out; }
  for (const n of names) {
    const p = join(dir, n);
    let st;
    try { st = statSync(p); } catch { continue; }
    if (st.isDirectory()) out.push(...walkMd(p));
    else if (n.endsWith(".md")) out.push(p);
  }
  return out;
}

let corpus = null;
function buildCorpus() {
  if (corpus) return corpus;
  corpus = new Map();
  for (const f of walkMd(CORPUS)) {
    const front = splitFront(readFileSync(f, "utf8"));
    const id = field(front, "entry_id");
    if (!id) continue;
    corpus.set(id, { id, url: field(front, "url"), title: field(front, "title") || id });
  }
  return corpus;
}
const isUrl = (v) => typeof v === "string" && /^https?:\/\/\S+$/i.test(v);
function resolveSource(ref) {
  if (isUrl(ref)) return { id: ref, url: ref };
  return buildCorpus().get(String(ref)) || null; // lazy: corpus only read if a citation needs it
}

// ── discover source docs + their citation records ───────────────────
const docs = [];
for (const d of SRC_DIRS) {
  for (const f of walkMd(join(ROOT, d))) {
    const rel = relative(ROOT, f).split(sep).join("/");
    docs.push(parseMarkdown(rel, readFileSync(f, "utf8")));
  }
}

const report = await validate(docs, resolveSource, { requireLevel2: true });

for (const d of report.documents) {
  if (!d.problems.length) continue;
  console.log(d.doc);
  for (const p of d.problems) {
    console.log(`  ${p.severity === "error" ? "ERROR" : " warn"} [${p.key}] ${p.message}`);
  }
}
const cv = report.coverage;
console.log(
  `Citations: ${cv.n} across ${docs.length} docs · ` +
    `${report.errors} error(s), ${report.warnings} warning(s)` +
    (cv.n ? ` · L1 ${cv.l1} L2 ${cv.l2} L3 ${cv.l3}` : " (none yet)")
);

if (strict && !report.ok) {
  console.error("FAIL (--strict): citation provenance errors above.");
  process.exit(1);
}
