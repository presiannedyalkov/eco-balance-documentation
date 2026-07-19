# Citation Provenance Model (three-level)

**Status:** design spec — supersedes the three 2025 design notes
**Created:** 2026-07-18
**Supersedes:** `CITATION_SYSTEM_EXPLANATION.md`, `CITATION_SYSTEM_OPTIONS.md`,
`CITATION_SYSTEM_ARCHITECTURE.md` (all Nov 2025)

---

## Why this exists

The three 2025 notes answered "how do we attach a source ID to a claim and pick a
tool to manage it" (Zotero vs BibTeX vs custom scripts, an `rest-001` index). That
question is settled: the live system uses a custom JSON index, and it works. What
those notes never modelled is the thing that actually matters for a documentation
vault whose claims will be read, challenged, and machine-checked:

> A citation should preserve not only the **URL** of the source, but a clear record
> of **what question we were asking** and **which sentences of the source** answer
> it.

That is a three-level model. Today's system captures only the first level. The
pieces needed for the other two already exist — they were just built in different
projects and never joined. This spec assembles them.

### Lineage (where the pieces already live)

- **Level 1 (URL / identity)** — the live `research/citation_index.json` plus the
  bookmark frontmatter. Working today.
- **Level 3 (which sentences)** — the bookmarks pipeline already distils each
  source into *"3-7 atomic claims, each a first-class linkable unit"*
  (`notes/pres/1_Projects/Consolidate Bookmarks/Flows.md`, distil pass, citing the
  Zettelkasten/Evergreen principle). A citation that points at one of those atomic
  claims *is* a citation to specific sentences. The atomicity work is specced; it
  was just never wired to eco-balance.
- **Level 2 (the question / why)** — the weakest everywhere. The closest are the
  `key_claims` field proposed (never built) in `CITATION_SYSTEM_EXPLANATION.md`,
  and the "why-retrieved" column of the Evidence Board in `Flows.md`. Neither is a
  structured, per-citation record.
- **Level 0 (source trust, below the URL)** — the domain ledger's provenance
  pattern: `source_type`, `factuality`, `perspective`, `funding`, `founded`
  (`notes/pres/1_Projects/Consolidate Bookmarks/Domain extraction rules (idea).md`
  and `TODO - Review domain ledger provenance.md`), plus the per-bookmark
  `verification_score`.

The one join that unlocks most of this: **the bookmarks pipeline already breaks
sources into atomic claims, and the eco-balance index already maps docs → sources.
Point a citation at an atomic claim instead of a whole bookmark and Level 3 comes
almost for free.**

---

## What the live system captures today

In `template/`, `case/`, `parameters/` a citation is a markdown link to a corpus
bookmark, or a frontmatter `sources:` / `evidence:` list entry:

```markdown
...Costa Rica funded major reforestation through PES
([Costa Rica PES](research/bookmarks/Climate%20Change/1717247274000.md)).
```

The consistency engine (`_engines/consistency/check.js`) scans those, records the
edge, and writes `research/citation_index.json` as a **reverse index**:

```json
{ "1717247274000": ["template/economics/revenue.md", "case/decisions/0008-economics-base-case.md"] }
```

The publish engine (`_engines/publish/build.js`) renders `docs/evidence.md`: one
entry per cited source, anchored `#e<entry_id>`, showing the source's `title`,
`url`, `ai_summary`, `article_type`, `verification_score`, and the list of docs
that cite it. `sync-vnext.js` rewrites the in-text link to `/evidence#e<entry_id>`.

**This captures exactly Level 1.** It records *that* a doc cites a source, and it
preserves the URL and a source-level summary. It records nothing about *what
question the citation answers* or *which passage of the source supports the
claim*. Every cite points at the whole article.

The hand-written "Sources" block in `strategic/41_Network_Model_and_Replication.md`
is the anti-pattern this spec fixes: plain external links plus prose "what for"
notes — Level 2 present but as unstructured prose, Level 3 absent, and outside the
index entirely.

---

## The three levels, defined

**Level 0 — trust.** How much weight the source itself carries, independent of any
one claim. Source type (peer-reviewed / news / NGO / gov / blog), factuality,
perspective/motive, funding, how long it has existed. Mostly per-*domain*, plus a
per-bookmark `verification_score`.

**Level 1 — identity.** The source: `entry_id` (corpus) or a bare URL (external),
title, canonical URL.

**Level 2 — linkage.** The reasoning edge between *our* text and the source: the
**question** the citation answers, and **why** this source answers it (what the
source actually says that supports our claim). This is the level a reader needs to
judge whether the citation is honest, and the level a reviewer checks.

**Level 3 — anchor.** *Which part* of the source. Either a reference to one of the
source's atomic claims (`source_claim: c3`) or an exact quoted span, rendered as a
[W3C text fragment](https://developer.mozilla.org/en-US/docs/Web/URI/Fragment/Text_fragments)
deep link (`url#:~:text=…`) so the reader lands on the sentence.

---

## Data model

Two principles: **extend, don't replace**, and **keep prose clean**.

`citation_index.json` stays exactly as it is — the `{ id: [docs] }` reverse index
is cheap, already consumed by `sync` and `publish`, and useful. The rich per-citation
record lives in the **citing document's frontmatter**, under a `citations:` key.
This matches a pattern `check.js` already parses (frontmatter `sources:` / `evidence:`
lists) and keeps the reasoning next to the claim it defends without cluttering the
prose.

### Per-citation record (in the citing doc's frontmatter)

```yaml
citations:
  - key: revenue-pes                       # stable id, unique within this doc
    claim: >                               # OUR sentence, the thing being defended
      Payments for ecosystem services can fund reforestation where a scheme exists.
    question: >                            # LEVEL 2 — what we were asking
      Is there real precedent for PES funding large-scale reforestation?
    source: 1717247274000                  # LEVEL 1 — corpus entry_id, OR a bare https URL
    source_claim: c2                        # LEVEL 3 — atomic-claim id within the source (optional)
    anchor: >                              # LEVEL 3 — exact quoted span (optional; drives #:~:text=)
      Costa Rica reversed deforestation, funding it largely through a national PES scheme.
    supports: >                            # LEVEL 2 — why the source answers the question
      Source documents Costa Rica's PES scheme as the primary funder of its
      reforestation turnaround — direct precedent, same mechanism.
    confidence: high                       # high | medium | low  (our assessment of the fit)
```

Required for a valid Level-2 citation: `key`, `claim`, `question`, `source`,
`supports`. `source_claim` and `anchor` are Level 3 and optional but strongly
encouraged. `confidence` is optional (defaults to `medium`).

**External sources** (not in the corpus — like the German legal grounding in file
41) use the same record with `source:` set to the URL directly. No bookmark
required. This is how ad-hoc grounding becomes structured instead of a prose block.

### In-text marker

Prose stays lightweight. The author marks the cited sentence with the citation
`key`:

```markdown
PES can fund reforestation where a scheme exists.[^revenue-pes]
```

The engine resolves `[^revenue-pes]` against the frontmatter record. This keeps the
existing `](research/bookmarks/…​.md)` links working (they remain valid Level-1
citations); the frontmatter block is the *enrichment* layer, added where a citation
deserves the full three levels. A doc can mix both during migration.

### Atomic claims on the source (Level 3 backing)

Level 3 needs the source decomposed into addressable claims. That is exactly the
bookmarks pipeline's distil pass (`Flows.md`). Formalise its output as a `claims:`
list in the bookmark frontmatter:

```yaml
# in research/bookmarks/<collection>/<entry_id>.md
claims:
  - id: c1
    text: "The Great Fen project began converting farmland to wetland in 2024."
    quote: "…has begun transforming Speechley's Farm into a wetland habitat…"  # verbatim, for #:~:text=
  - id: c2
    text: "The scheme targets sequestration of over 4,000 tonnes of carbon in peat."
    quote: "…to sequester over 4,000 tonnes of carbon in peat soil."
```

A citation's `source_claim: c2` then resolves to that claim's `text` (the
distilled assertion) and `quote` (the verbatim span → text fragment). This is the
join: the pipeline was already going to produce these; citations just reference them.

### Level 0 trust (rendered, not re-entered)

Trust is not stored per citation — it is looked up from the domain ledger
(`research/bookmarks/_domains/`, the provenance pattern from the notes) by the
source's domain, plus the bookmark's `verification_score`. The renderer attaches it
to the evidence entry so the reader sees source type / factuality / funding without
the author restating it.

---

## How the engines change

**`check.js` (consistency, already has `--strict`).** Extend to:

1. Parse each source doc's `citations:` frontmatter block.
2. Validate every record: required fields present; `source` resolves (corpus id in
   `corpusIds`, or a well-formed URL); if `source_claim` set, it exists in that
   bookmark's `claims:` list; if `anchor` set, it appears verbatim in the source.
3. Fold the `source` ids into `citation_index.json` exactly as today (backward
   compatible — the reverse index still lists every citing doc).
4. Under `--strict`, fail on: a `[^key]` marker with no matching record; a record
   missing `question` or `supports` (an un-reasoned citation); an `anchor` that
   isn't found verbatim in the named source. This is the Level-2/3 completeness gate,
   and it slots into the same `pr-checks` job that already runs `--strict`.

**`publish/build.js` (evidence page).** For each citation, render under the source's
`#e<id>` entry: the question, our claim, the `supports` reasoning, the quoted span,
and — when the source has a live URL — a deep link `url#:~:text=<anchor>` so the
reader jumps to the exact sentence. Show Level-0 trust (domain provenance +
verification_score) once per source. The evidence page stops being a flat source
list and becomes a question → source-passage map.

**`sync-vnext.js`.** Already gates links on the citation index (the stranded-citation
fix). Extend the `[^key]` resolution the same way: emit the enriched link when the
record resolves, degrade to plain text otherwise. Invariant unchanged — a rendered
citation never outlives its backing.

---

## How the fleet populates and checks it

The fleet already has the right shape for this.

- **Proposers** that add a claim must fill the `citations:` record for it — not just
  drop a link. The `question` and `supports` fields make a proposer state, in
  writing, what it was asking and why the source answers it. A proposer that can't
  fill `supports` honestly doesn't have a citation.
- **The `source_verifier` reviewer persona** (`_vault_maintenance/personas/source_verifier.md`)
  already exists to check that a source supports the claim made of it. This model
  gives it something concrete to check: does the `anchor`/`source_claim` actually
  say what `supports` claims, and does that answer the `question`? That is a
  mechanical, checkable review, not a vibe.
- The `--strict` gate in `pr-checks` enforces structural completeness so an
  un-reasoned or mis-anchored citation can't merge.

This closes the loop that the file-41 grounding exposed: fabricated figures with
plausible prose got in because nothing required a citation to name its source
passage and its reasoning. Under this model, that claim would have failed `--strict`
(no resolvable `anchor`), and `source_verifier` would have caught the mismatch.

---

## Migration (phased, backward compatible)

**Phase 0 — today.** `{ id: [docs] }` reverse index + evidence.md. Keep as-is;
nothing here breaks it.

**Phase 1 — Level 2.** Add the `citations:` frontmatter block + `[^key]` markers.
`check.js` validates presence of `question` / `supports`; `publish` renders them.
Old bare `](…​.md)` links keep working as Level-1 citations. Start with new
citations and the highest-stakes existing ones (the `case/decisions/*` evidence).

**Phase 2 — Level 3 structured.** Emit `claims:` from the bookmarks distil pass into
bookmark frontmatter. Citations gain `source_claim`. `check.js` validates the claim
id resolves.

**Phase 3 — Level 3 deep links + Level 0.** Add verbatim `anchor` spans → text
fragments in the rendered evidence page, and surface domain-ledger trust. At this
point a reader clicking a citation lands on the exact sentence of the source, under
a note of how much that source is trusted.

**Retro-fit target:** `strategic/41_Network_Model_and_Replication.md`'s hand-written
Sources block is the natural first external-source conversion — each grounded German
figure becomes a `citations:` record with the GNotKG/Stiftungsbehörde URL as
`source`, the question it answered, and the quoted span.

---

## Cross-references

- Live index + engines: `_engines/consistency/check.js`, `_engines/publish/build.js`,
  `scripts/sync-vnext.js`, `research/citation_index.json`.
- Reviewer: `_vault_maintenance/personas/source_verifier.md`; fleet:
  `_vault_maintenance/personas/FLEET.md`.
- Superseded design: `research/CITATION_SYSTEM_{EXPLANATION,OPTIONS,ARCHITECTURE}.md`.
- Notes lineage (read-only context, outside this repo):
  `Consolidate Bookmarks/Flows.md` (atomic-claims distil pass; Evidence Board
  "why-retrieved"), `Consolidate Bookmarks/Domain extraction rules (idea).md` and
  `TODO - Review domain ledger provenance.md` (Level-0 provenance pattern).
