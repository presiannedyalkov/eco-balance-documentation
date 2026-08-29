// Shared eco-balance adapter for the provenance-cite validator + renderer.
//
// This teaches the shared `provenance-cite` core how to resolve THIS project's
// sources: a corpus `entry_id` -> the bookmark's url/title AND its article body
// text, so anchor quotes are verified VERBATIM against the source (not just
// warned about). A bare URL resolves to itself. Both check-citations.mjs and
// evidence.mjs import from here so there's one adapter, no drift.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

function splitFront(t) {
  const s = String(t).replace(/^﻿/, "").replace(/\r\n/g, "\n");
  const m = s.match(/^---\n([\s\S]*?)\n---/);
  return m ? m[1] : "";
}
function bodyOf(t) {
  const s = String(t).replace(/^﻿/, "").replace(/\r\n/g, "\n");
  const m = s.match(/^---\n[\s\S]*?\n---\n?/);
  return m ? s.slice(m[0].length) : s;
}
function field(front, key) {
  const m = front.match(new RegExp("^" + key + ":\\s*(.*)$", "m"));
  return m ? m[1].trim().replace(/^["']|["']$/g, "") : "";
}
export function walkMd(dir) {
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

// Build { resolveSource, discoverDocPaths } bound to a repo root.
export function makeAdapter(root) {
  const CORPUS = join(root, "research/bookmarks");
  let corpus = null;
  function buildCorpus() {
    if (corpus) return corpus;
    corpus = new Map();
    for (const f of walkMd(CORPUS)) {
      const raw = readFileSync(f, "utf8");
      const front = splitFront(raw);
      const id = field(front, "entry_id");
      if (!id) continue;
      corpus.set(id, {
        id,
        url: field(front, "url"),
        title: field(front, "title") || id,
        text: bodyOf(raw), // full article body → verbatim anchor verification
      });
    }
    return corpus;
  }
  const isUrl = (v) => typeof v === "string" && /^https?:\/\/\S+$/i.test(v);
  function resolveSource(ref) {
    if (isUrl(ref)) return { id: ref, url: ref };
    return buildCorpus().get(String(ref)) || null; // lazy: corpus read only when needed
  }
  function discoverDocPaths(srcDirs) {
    const out = [];
    for (const d of srcDirs) {
      for (const f of walkMd(join(root, d))) {
        out.push({ abs: f, rel: relative(root, f).split(sep).join("/") });
      }
    }
    return out;
  }
  return { resolveSource, discoverDocPaths };
}
