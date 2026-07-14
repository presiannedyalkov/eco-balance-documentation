# 🛰️ The Documentation Fleet

**Purpose:** A fleet of LLM agents that *propose* improvements to the docs as
small, cited, **review-gated pull requests** — never as direct commits. Every
change passes a human gate (Pres + Claude) before it can reach `main`.

**Last Updated:** 2026.07

---

## Two kinds of agent

The fleet has exactly two roles, and every agent is one or the other:

- **Proposers** *(generate content → open a PR).* New, generative roles. They
  live in [`proposers/`](proposers/). Each takes an input from a queue, drafts a
  change, and opens one small PR.
- **Reviewers** *(critique a proposal → never merge).* The 20 mature personas in
  this directory (`fact_checker`, `source_verifier`, `clarity_specialist`,
  `assumption_tester`, `readability_specialist`, `vision_guardian`, …). They
  shape a proposal before it reaches the human gate; they hold no merge power.

> This replaces the aspirational `ai_skills/` framework (1 of 13 templates ever
> written). The personas *are* the prompt library now. See `ai_skills/README.md`
> for the deprecation note.

## The proposer roster

| Proposer | Input queue | Produces |
|---|---|---|
| [Enricher](proposers/enricher.md) | `_engines/_reports/enrichment-worklist.md` (routed unused bookmarks) | Places a sourced insight into its target model/case doc |
| [Researcher](proposers/researcher.md) | A topic or a claim needing depth | A grounded, cited deepening via `research-service` (`research_*` tools) |
| [Gap-filler](proposers/gap_filler.md) | `_engines/_reports/quality.md`, `src/data/health.json` (low coverage/evidence) | Drafts the missing model/case content for a thin domain |
| [Case-writer](proposers/case_writer.md) | The model + `state/state.yaml` (on-the-ground reality) | Drafts/updates an our-case decision from the model |
| [Freshness](proposers/freshness.md) | Time-sensitive claims (stats, laws, prices) | Re-verifies and proposes updates to stale facts |
| [Comment-responder](proposers/comment_responder.md) | Reader annotations (⏳ pending the annotation feature) | Turns a reader remark into a proposed edit |

## The loop

```
queue item ─► Proposer drafts ─► Reviewer panel critiques + reshapes ─► HUMAN GATE (Pres + Claude) ─► merge ─► deploy
                                                                          └─ change / reject
```

Unlike the **deterministic engines** (`_engines/*`, e.g. the weekly
`site-refresh` PR) which are keyword classifiers and **auto-merge** with zero
touch, everything a proposer authors is LLM-written content and therefore
**never auto-merges** — the human gate is mandatory.

The engines and the fleet are complementary: the engines *route and check*
(feed → enrichment-worklist → consistency/quality reports); the fleet *places
the insight* the engines route. That placement step is the gap the fleet fills.

## Review matrix (which reviewers gate which proposer)

| Proposer | Always | Also |
|---|---|---|
| Enricher | source_verifier, fact_checker, clarity_specialist | vision_guardian, assumption_tester |
| Researcher | source_verifier, fact_checker | knowledge_synthesizer, readability_specialist |
| Gap-filler | vision_guardian, clarity_specialist | assumption_tester, document_length_tracker |
| Case-writer | vision_guardian, assumption_tester | stakeholder_advocate, status_accuracy_specialist |
| Freshness | fact_checker, source_verifier | update_tracker |
| Comment-responder | clarity_specialist, vision_guardian | fact_checker |

A reviewer may **fix** the draft (e.g. fact_checker tightening a claim) or
**block** it (raise an issue for the human gate). The panel runs *before* the
PR is presented, so the human sees an already-reshaped proposal plus the review
notes.

## PR conventions

- **One proposal per PR.** Small, focused, easy to review.
- **Branch prefix by proposer:** `enrich/*`, `research/*`, `gap/*`, `case/*`,
  `fresh/*`, `comment/*`.
- **Commit author** records the proposer, e.g. `Pres (via Enricher agent)`.
- **Cite in the house style** — bookmark links `([label](research/bookmarks/…​.md), *news*)`.
- **No auto-merge.** These PRs wait for the human gate. (The `AUTOMERGE_TOKEN`
  flow in `site-refresh.yml` is for deterministic regen only.)
- The PR body carries the **reviewer notes** (what each persona checked/changed).

## Phasing

- **Phase 1 (now):** Claude orchestrates the fleet interactively — pulls a queue
  item, runs proposer → reviewers, opens the PR, and reviews it with Pres.
- **Phase 2 (later):** the winning loops become scheduled GitHub Actions that
  spawn the agents and file review-gated PRs autonomously.

## Related

- Proposers: [`proposers/`](proposers/)
- Reviewers: the persona files in this directory
- Multi-agent precedent: `_vault_maintenance/guides/CLAUDE_CODE_WEB_PROMPT.md`
- Engines that feed the queues: `_engines/` (see `_engines/README.md`)
