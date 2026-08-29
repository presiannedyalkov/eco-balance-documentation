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
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { validate } from "provenance-cite";
import { parseMarkdown } from "provenance-cite/loaders/markdown";
import { makeAdapter } from "./eco-adapter.mjs";

const ROOT = fileURLToPath(new URL("../../", import.meta.url));
const SRC_DIRS = ["template", "case", "parameters"];
const strict = process.argv.includes("--strict");

// The eco-balance adapter (entry_id -> url/title/body text) lives in
// eco-adapter.mjs, shared with the renderer. Supplying source text means anchor
// quotes are verified VERBATIM against the corpus, not just warned about.
const { resolveSource, discoverDocPaths } = makeAdapter(ROOT);

// ── discover source docs + their citation records ───────────────────
const docs = discoverDocPaths(SRC_DIRS).map(({ abs, rel }) =>
  parseMarkdown(rel, readFileSync(abs, "utf8"))
);

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
