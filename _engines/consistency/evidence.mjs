#!/usr/bin/env node
// Evidence renderer — Phase-2 companion to check-citations.mjs.
//
// Reuses the shared eco-balance adapter and provenance-cite to build the
// three-level evidence model (question → claim → exact passage with a #:~:text=
// deep link), then emits a machine artifact the CJS publish/sync engines read:
//
//   research/citation_provenance.json
//     bySource[id]        -> [ {key, doc, question, claim, supports, quote,
//                               deepLink, stance, confidence} ]   (publish: the
//                            three-level blocks + #<key> anchors on /evidence)
//     byDocId[doc][id]    -> {key}                                (sync: fold the
//                            inline source link to /evidence#<key> + ✓)
//
// Kept as JSON so the ESM/provenance-cite dependency stays here and the engines
// (CJS) don't need ESM interop. Optional --out writes the human markdown too.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildEvidenceModel, renderMarkdown } from "provenance-cite";
import { parseMarkdown } from "provenance-cite/loaders/markdown";
import { makeAdapter } from "./eco-adapter.mjs";

const ROOT = fileURLToPath(new URL("../../", import.meta.url));
const SRC_DIRS = ["template", "case", "parameters"];
const outArg = process.argv.indexOf("--out");
const OUT = outArg !== -1 ? process.argv[outArg + 1] : null;

const { resolveSource, discoverDocPaths } = makeAdapter(ROOT);
const docs = discoverDocPaths(SRC_DIRS).map(({ abs, rel }) =>
  parseMarkdown(rel, readFileSync(abs, "utf8"))
);

const model = await buildEvidenceModel(docs, resolveSource);

// Structured artifact for the publish + sync engines.
const bySource = {};
const byDocId = {};
for (const s of model.sources) {
  bySource[s.id] = s.citations.map((c) => ({
    key: c.key,
    doc: c.doc,
    question: c.question,
    claim: c.claim,
    supports: c.supports,
    quote: c.quote,
    deepLink: c.deepLink,
    stance: c.stance,
    confidence: c.confidence,
  }));
  for (const c of s.citations) {
    (byDocId[c.doc] ||= {})[s.id] = { key: c.key };
  }
}
const artifact = join(ROOT, "research/citation_provenance.json");
mkdirSync(dirname(artifact), { recursive: true });
writeFileSync(artifact, JSON.stringify({ bySource, byDocId }, null, 2) + "\n");

if (OUT) {
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, renderMarkdown(model, { title: "Evidence" }));
}

console.log(
  `Evidence: ${model.count} citation(s) across ${
    Object.keys(byDocId).length
  } doc(s) → research/citation_provenance.json` + (OUT ? ` + ${OUT}` : "")
);
