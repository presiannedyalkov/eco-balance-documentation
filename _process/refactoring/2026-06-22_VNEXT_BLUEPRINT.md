---
title: "Eco Balance — System Vision & Architecture (v-next)"
status: DRAFT v3 — north-star vision for review
author: Pres + AI
date: 2026-06-22
supersedes: V2_BOOTSTRAP_CONVERSION_PLAN.md; treats all current docs as DRAFT/spine, not canon
scope: the whole system — purpose, knowledge core, inflows, engines, outflows, platform, roadmap
---

# Eco Balance — System Vision & Architecture

> The current documentation is a **spine**, not canon. It is ~80% right in substance and ~0% right in form: an AI-assembled draft of the correct ideas. This document re-envisions the whole thing — what it should *be*, not how to patch what exists.

---

## 0. The leap in one picture

Today Eco Balance is a **pile of documents**. The vision is to make it a **living system** — a small organism with a metabolism: it takes in signals from the world, digests them into knowledge and decisions, tends a living model of reality, and gives value back out to the world.

```
            INFLOWS                  CORE (living memory)                 OUTFLOWS
   ┌────────────────────┐      ┌───────────────────────────┐     ┌────────────────────┐
   │ evidence/bookmarks  │     │  template/  (the model)    │     │ public platform     │
   │ land & site data    │     │  case/      (our instance) │     │ (Docusaurus, lvl-up)│
   │ ecology data        │ ──► │  parameters/(bioregions)   │ ──► │ forkable model pkg  │
   │ funding signals      │    │  decisions/ (why we chose) │     │ funder reports      │
   │ policy / legal       │    │  state/     (live reality) │     │ exports (EPUB/PDF)  │
   │ field / sensors      │    │  evidence/  (cited corpus) │     │ field journal       │
   │ network / partners   │    └───────────────────────────┘     │ bioregional commons │
   └────────────────────┘                  ▲                      └────────────────────┘
              │                             │                                ▲
              └──────────────►  ENGINES (processing)  ◄─────────────────────┘
                 feed · enrichment · decision · radars (land/grants) ·
                 ecology · state-tracking · synthesis · quality/consistency
```

Bookmarks→docs is just **one inflow into one engine**. The Docusaurus site is just **one outflow**. The work is to build the whole metabolism — and to make each part excellent.

And it is **modular and grows over time.** The system is not one app; it's a platform that accretes **dedicated tools** as the project's real needs activate them — a donor CRM when we start fundraising, a research module for the corpus, a grants tool that hunts opportunities, a field tool for the actual plot. We **design the system right first, then bring it alive** with processes and outflows. (See the module suite, §6.5.)

---

## 1. Mission & principles

**Mission.** Acquire **1–4 ha of degraded land** (ideally former farmland with a great view), build a **house**, live there, and restore the land with **perma-forestry and indigenous restoration methods** until the ecosystem is healed — a horizon of **centuries**, so the endpoint is **stewardship and handoff**, not ownership. Two outputs: heal **our** place, and give the world a **replicable model** so other groups can do it with less friction.

**Principles (the non-negotiables of the system itself):**
1. **Two artifacts, never entangled** — a forkable *model* and an honest *case*.
2. **Holistic by default** — soil–water–fungi–species–community–climate as one system; track states, relationships, and cycles, never isolated parts. *(The docs already lean this way; Van Peborgh's bioregional-commons piece, bookmark `1782154194931`, corroborates rather than originates it.)*
3. **Everything is a parameter or a decision** — generic options live in the model; our choices live as recorded decisions with evidence.
4. **Evidence-bound** — claims carry citations to the corpus; low-verification sources are flagged, never laundered into fact.
5. **Living, not frozen** — inflows keep arriving, state keeps updating; a document that can't change is a dead link.
6. **Open by design** — we share the model and our process publicly as a gift and an invitation.
7. **Adaptive scale** — hectares, methods, calendars, legal form all resolve from bioregion, not from a hardcoded number.
8. **Modular & growing** — the system accretes dedicated tools (research, donor CRM, grants, field/restoration) as needs activate; we design first, then bring each alive with processes and outflows.
9. **Pragmatic & opportunistic** — start small and real; the legal/handoff status is a *fragile wrapper*, not the point. The real, durable thing is the trees and the ecosystem. Stay opportunistic about form.
10. **Scientific by default** — everything is a *hypothesis* tested against real data; predictions from literature are only a model, the land is ground truth. The system runs a full scientific learning loop (§4.5): predict → design → measure → evaluate → update → publish.

### What "amazing" means (definition of success)

This system succeeds when three things are true:
1. **Others use it** — people see real value and replicate, contribute to, or build on it.
2. **It raises money** — it convinces institutions and donors to fund actual execution.
3. **It executes** — not paper, but a working realization that **tracks success and failure, learns from them to inform others, and improves itself.**

These three are the bar. Every design choice should serve at least one.

**Mission deltas the current docs don't yet hold** (new work, not migration):
- A **house to live in**, not a bootstrap tiny-house framing.
- **Perma-forest + indigenous methods** as the actual method (current methodology is generic reforestation).
- **Heal-then-handoff over centuries** — a whole **stewardship & succession** domain that does not exist today.

---

## 2. The Core — living memory

Six stores. Together they are the single source of truth that every inflow updates and every outflow draws from.

### 2.1 `template/` — the model (forkable archetype)
Generic, present/conditional voice. Each doc uses the canonical **decision-tree format**: *Non-negotiables (science consensus) → Options & Pathways (pros/cons, when-to-use) → Implementation → Customization.* Organized into **ten domains** (§3).

### 2.2 `case/` — our instance
Our reality and our choices. Case docs are **thin decision overlays** that *reference* the template, never restate it. Committed past voice ("we chose X because…").

### 2.3 `parameters/` — bioregion profiles
The mechanism that resolves "how much land / which species / when to plant / which legal form." A `_schema.md` plus filled profiles (`germany.md`, `portugal.md`, …) and `climate-zones.md` (Temperate / Mediterranean / Atlantic — already implicit in the docs). Consumed directly by the radars and the ecology engine.

### 2.4 `decisions/` — the why
ADR-style records: Context · Options (link template) · Decision · Rationale · Constraints · Evidence (`entry_id`s) · Status · Revisit-when. This is the connective tissue between model and case, and the audit trail of the project's reasoning.

**Testable decisions also carry a hypothesis block** (§4.5): Prediction (expected outcome + timeframe) · Test design (baseline, treatments, controls, what/how/when measured, pre-set success criteria) · Outcome (confirmed/refuted/partial, with data) · Model-update (what changed in the template as a result). This turns the plot into a portfolio of field studies.

### 2.5 `state/` — project state (not the land)
Structured, queryable state of the **project's execution only**: funding raised, donor pipeline, entity/legal status, site-search status, task/phase progress, budget actuals. Feeds dashboards and reports. **The land/ecosystem is deliberately NOT here** — flattening a living system into metrics is the reductionism we reject. The land gets its own dedicated tool — a **restoration / field module** (plant records, planting plans, a field journal that captures states, relationships, and cycles, not a KPI readout) — built when we're on the ground. See the module suite (§6.5).

### 2.6 `evidence/` — the cited corpus
The bookmark corpus (475 Climate Change + steady inflow), with a real **citation index** so every claim is traceable and every source is one click away.

---

## 3. The ten domains (expanded)

Consolidates the ~54 strategic files + 44 playbook tasks. For each: what the **model** holds, what the **case** records, the **decisions** it forces, the **inflows** that feed it, the **outflows** it produces. The `a/b/c` companion-file sprawl collapses into one model doc per topic + case decision records.

**D0 · Foundation** — *(01/02/03 + hub)*
Model: why restore degraded land; the Vision→Plan→Reality frame; success-factor checklist; glossary. Case: our vision & success bets. Feeds: evidence. Produces: the public "about/why".

**D1 · Current reality** — *(04)*
Inherently case. The narrative companion to `state/`. Feeds: field data, our own updates. Produces: public progress page.

**D2 · Method (the heart)** — *(20/22 + entire playbook)*
Model: holistic philosophy; **perma-forestry, syntropic agroforestry, Miyawaki, ANR, indigenous/traditional techniques**; the 6 pillars (site, reforestation, soil, water, biodiversity, community) each in decision-tree format; the adaptive-management loop; monitoring protocols. Case: our chosen methods per pillar tied to our biome. Decisions: method per pillar. Feeds: ecology data, evidence, field data. Produces: species & planting plans, the public "how" + interactive playbook.

**D3 · Site & land** — *(44 + playbook/site_selection)*
Model: country options; acquisition options (buy/lease/partner/public); due-diligence checklist; **site-scoring rubric**. Case: candidate countries (DE/PT), scored shortlist. Decisions: country, parcel, acquisition mode. Feeds: land listings, geo/soil/climate, policy. Produces: scored shortlist (Land radar output).

**D4 · Infrastructure & living** — *(21 + 45)*
Model: **house** options; power (solar tiers); water (5 strategies by climate); internet; tools; monitoring tech tiers. Case: our house + sized systems. Decisions: house type, system sizing. Feeds: geo/climate, parameters. Produces: build spec, off-grid sizing.

**D5 · Organization** — *(10/11/12/13)*
Model: legal-entity options (e.V./gGmbH/Associação/…); governance mechanics + decision tiers; team work-models + scaling triggers; compliance by country. Case: our entity, governance, roles. Decisions: legal form, governance, who-does-what. Feeds: policy/legal. Produces: compliance calendar, governance docs.

**D6 · Stewardship & handoff** — *(NEW — absent today; pursued pragmatically, not preciously)*
Model: multi-century succession options — land trust, conservation easement, foundation, community/commons ownership, rights-of-nature. Case: our chosen legacy vehicle. Decisions: the handoff mechanism. Feeds: policy/legal, network. Produces: legacy/charter docs. **Framing:** the legal status is a *fragile wrapper* — important but secondary. The durable thing is the living ecosystem; start small, stay opportunistic about the legal form, don't over-invest here early.

**D7 · Funding** — *(32 + 32a–g)*
Model: each pathway as a reusable play (crowdfunding, friends&family, small grants, major grants, founder capital, research partnerships) + integrated timeline. Case: our funding mix + live pipeline. Decisions: pathway priority, asks. Feeds: grant calls/deadlines, network. Produces: **grants pipeline + calendar** (Grants radar), campaign assets, funder reports.

**D8 · Economics** — *(30/31)*
Model: cost model (minimal/standard/comfortable tiers); revenue-stream options; financial scenarios; capex/opex two-phase model. Case: our budget, chosen scenario, revenue plan. Decisions: budget tier, revenue bets. Feeds: our spend data, evidence. Produces: budget, projections, the financial section of funder reports.

**D9 · Growth & operations** — *(40/42/43)*
Model: expansion options A/B/C with phase-gate triggers; adaptive-timeline template; operations/task-calendar template. Case: our phase plan + operating cadence. Decisions: phase gates, cadence. Feeds: state (triggers). Produces: roadmap, recurring task lists.

**D10 · Risk · KPIs · Engagement · Learning** — *(50/51/60/70)*
Model: risk-register template; KPI/state-tracking framework; comms playbook; case-study library + how-to-learn-from-it. Case: our risks, KPIs, comms plan. Decisions: risk responses, metric targets. Feeds: evidence, field data, network. Produces: risk register, **KPI dashboard**, public field journal, case-study syntheses.

---

## 4. Cross-cutting mechanisms (formalize what already recurs)

Make these first-class so every domain uses them identically and the engines can read them:
1. **Decision-tree doc format** (the playbook's structure) — for *all* model docs.
2. **Parameter profiles** — bioregion + climate zone; the resolver for scale/species/calendar/legal.
3. **Budget tiers** — one canonical minimal/standard/comfortable definition referenced everywhere.
4. **Phase gates** — bootstrap → establish → expand → institutionalize, advanced by success-metric triggers.
5. **Vision→Plan→Reality** — the spine relating model (Vision+Plan) to case (chosen Plan + live Reality).
6. **Evidence & citation** — one-line insight + `entry_id`, verification flags, a real citation index.

---

## 4.5 The scientific learning loop (how it "improves itself")

"Improves itself" is meant **literally and rigorously: the scientific method as the project's operating system.** Every prediction is a **hypothesis**, the land is the **experiment**, reality is the **referee**.

The loop:
1. **Hypothesis** — from literature + evidence + bioregion parameters, predict an outcome. *E.g. "At this site, trees (x, y, z) with shrubs (a, b, c) will promote target species (d, e, f) and improve soil/water/canopy over N years."*
2. **Design** — a valid methodology to test it: baseline, treatments, control/reference plots where feasible, what we measure, how, how often, and **success/failure criteria set in advance.**
3. **Execute & measure** — implement; the Field module captures real data rigorously over time.
4. **Evaluate** — prediction vs reality: confirmed, refuted, or partial — honestly, failures included.
5. **Update the model** — the template's options gain *tested* results ("tried here; worked/didn't; conditions were…"); confidence becomes evidence-based, not literature-only.
6. **Publish** — results flow out as real studies + posts + open data, contributing to the commons and earning scientific credibility.

This is why **a good feedback channel for real data matters more than more sources** — predictions are only a model; the land is ground truth. It reframes the artifacts:
- **Decisions become hypotheses** — testable decision records carry a prediction, a test design, and (later) an outcome (§8).
- **The case becomes a portfolio of field studies** — our plot is a research site, not just a garden.
- **The Field module is an instrument** — baseline + treatments + measurements designed for inference, not vanity metrics.
- **Research partnerships fit naturally** — universities want exactly this; rigor is also a funding/credibility asset (audience: institutions/backers).

**Pragmatism caveat:** full rigor (replication, controls, statistics) isn't always possible at 1–4 ha with two people. We design the **best valid study the scale allows**, state confidence levels honestly, and lean on partnerships for rigor where it matters most.

---

## 5. Inflows (collect signals)

| Inflow | Source | Capture | Maturity | Engine it feeds |
|---|---|---|---|---|
| Evidence / articles | bookmarks-mcp, 6-hourly Gitea sync | auto | **have (crude)** | Feed → Enrichment |
| Land & site listings | property portals per country | API/scrape + manual | none | Land radar |
| Geo / soil / climate | open geodata, soil maps, rainfall, DEM/aspect | API | none | Land radar, Ecology |
| Ecology reference | GBIF, iNaturalist, native-species DBs | API | none | Ecology |
| Funding signals | grant portals, EU/national/foundation calls | feed/scrape | none | Grants radar |
| Policy / legal | country regulators, conservation law | manual + alerts | ad hoc | Org, Stewardship |
| Field / sensors | weather station, trail-cams, planting logs, surveys | device + app | future | State-tracking |
| Network / partners | other projects, mentors, suppliers | CRM-lite | none | many |
| Our notes & decisions | us | direct | partial | Decision |

The principle: **most knowledge work fails for lack of structured inputs.** Build the taps first.

---

## 6. Engines (processing)

An engine is an **input → process → output** loop that produces something operational. Several already exist in embryo and should be *finished and wired*, not reinvented.

| Engine | In → Process → Out | Reuses existing | Maturity |
|---|---|---|---|
| **Feed** | new bookmarks → dedup (`list_urls`) + cluster + score → enrichment queue | 6-hourly sync, bookmarks-mcp | crude |
| **Enrichment** | article + target doc → insight + template/case routing + citation → edited doc | citation system, BOOKMARKS_ENRICHMENT | semi-manual |
| **Decision** | template options → weigh vs constraints + evidence → decision record | `_templates/scenario_analysis` | manual |
| **Land/Site radar** | listings + geo + soil + climate → score vs bioregion params → ranked shortlist | parameters/, site rubric | none |
| **Grants radar** | calls + deadlines → match to our profile → pipeline + calendar | funding plays | none |
| **Ecology** | site/region → native palette + planting design → species & planting plan | climate-zone params, method | none |
| **State-tracking** | field data + events → update states/relationships/cycles → dashboards | KPI docs, monitoring tiers | none |
| **Synthesis** | clusters of evidence → thematic briefs → model/case enrichment + reports | `_templates/research_synthesis` | none |
| **Learning / Study** | hypotheses + measured outcomes → prediction-vs-reality evaluation → model updates + publishable studies | decision hypotheses, Field module | none |
| **Quality / Consistency** | template+case+build → checks → clean build + health report | vault personas, CI | designed, redo (§8) |

**Operators.** The `ai_skills/` persona idea becomes the set of **agent charters** that run these engines (a Research Analyst runs Synthesis; a Curator runs Quality; etc.) — focused, scoped, with clear handoffs, instead of 18 overlapping personas.

---

## 6.5 The module suite — the tools we'll actually use

The system grows into a **suite of modules**. Each module is a *vertical*: it owns a domain, holds its own working data/state, runs its own engine(s), gives the team a working surface (the tool they use day-to-day), and emits outflows — some valuable enough to others that they become public goods. **None of these exist yet** — they are what this system becomes as the project matures. Each is born when its domain goes active, so the platform grows *with* the project rather than all at once.

| Module | Domain | The tool we use | Its data/state | Engine(s) | Outflow / value to others |
|---|---|---|---|---|---|
| **Research** | D2 / evidence | the corpus as a working knowledge tool: capture → cluster → cite → synthesize | corpus + citation index + syntheses | Feed, Enrichment, Synthesis | a public **blog/feed** of curated primary info |
| **Funding & Grants** | D7 | an **AI tool that hunts grants + income options** (grants, carbon credits, solar/energy sales, payments-for-ecosystem-services) and fills a live table/feed | opportunities, deadlines, eligibility | Grants radar | the **opportunities feed** — useful to every project in the space |
| **Donor CRM** | D7 | a lightweight CRM: relationships, asks, stewardship, campaigns | contacts, pipeline, interactions | CRM workflows | aggregate stats for funder reports |
| **Site & Land** | D3 | scores candidate parcels against bioregion parameters | listings, geo/soil/climate, scores | Land radar | a **scored-shortlist method** others can reuse |
| **Restoration / Field** | D2 on-ground | the land's own tool: plant records, planting plans, a **field journal** AND a **study instrument** — baseline, treatments, measurements designed for inference (testing our hypotheses, §4.5), capturing states/relationships/cycles; not vanity metrics | plants, observations, treatments, seasons, events | Ecology, field capture, Learning | open field data + living journal + studies |
| **Project state** | D1 / D9 | the execution dashboard: funding, entity, site, phase, budget | `state/` store | State-tracking | live progress on the public site |
| **Publishing** | all | the public platform (the model + our journey) | rendered from core | Quality / Consistency | the docs + the **forkable model** |

**Design, then bring alive.** First get the system's design right (this vision → area docs → scaffold). Then *animate* it — and you've already named the ways: **publish the docs**, ship a **cloneable tool others can run**, **share our primary info** as a blog/feed, run the **grants AI** that fills a feed useful to everyone. Bringing-alive = wiring a module's engines to its inflows and pointing its outflow at the world.

**From module to app — the `projects/` folder.** Modules begin life inside the knowledge system (structured docs + light automation). When one needs to become *real software* — a CRM, the grants-hunting AI, a clone-and-run tool — it **breaks out into its own application in `projects/`** (the sibling folder that exists exactly for this). The documentation system stays the **spine and hub**: it holds the model, links to each app, ingests their outputs, and presents them publicly. So the architecture spans the full spectrum — knowledge base at the center, breakout apps at the edges — without cramming software into markdown.

---

## 6.6 Audiences (who we tailor for)

Outflows are written for people. Six audiences, each needing a different register:

| Audience | They want | We give them |
|---|---|---|
| **Institutions / backers** (foundations, grant-makers) | credibility, rigor, evidence, accountability, track record | the model's scientific grounding, citations, the live progress + learning record |
| **Replicators / would-be stewards** | a usable how-to they can fork | the model (decision trees, parameters), honest lessons, the clone-and-run kit |
| **Topic-interested / learners** | accessible, inspiring explainers | the blog (method options, studies, examples), the story |
| **Potential donors** (individuals) | a human story, tangible impact, trust, an easy way to help | our journey, vision, impact, clear asks |
| **Collaborators / peers** (projects, researchers, volunteers) | to connect, contribute, share data/methods | the commons, shared data/feeds, contribution paths |
| **Us (founders)** | a system one person can actually manage and grow | a good-looking, low-friction, maintainable core |

The last row is a hard constraint, not an afterthought: **it has to be manageable by you.**

---

## 7. Outflows (give value back) — *level this up*

The public presence is not a build step; it is **how the project earns trust, recruits help, attracts funding, and gifts the model.** Today it's a competent static doc site. The vision:

### 7.1 The public platform (Docusaurus, re-imagined)
- **Two clear faces:** *The Model* (forkable, anyone can use) and *Our Journey* (the live case — progress, decisions, setbacks, in the open).
- **Interactive model explorer** — the decision trees as a clickable tool: pick your bioregion/budget/goals → get a tailored starting plan (the template's parameters made interactive).
- **Live state dashboards** — funding, site, restoration indicators over time, pulled from `state/`. The project visibly *alive*.
- **Evidence browser** — the cited corpus searchable, each claim → its sources.
- **Forkable "starter kit"** — one click to take the model and begin your own case (the gift, operationalized).
- **Field journal / blog** — narrative updates, the human story, seasons on the land.
- **Design & IA overhaul** — beautiful, fast, mobile, multilingual (DE/PT/EN), accessible; a presence worthy of a multi-century project.
- **Two-way:** structured feedback, contributions, and a path for other stewards to connect.

### 7.2 Other outflows
- **Cloneable tools** — modules (esp. the grants tool and the model itself) packaged so others can clone and *run* them, not just read them.
- **Opportunities feed** — the Funding & Grants module's live table of grants + income options (carbon credits, energy sales, PES) shared publicly — high value to every project in the space.
- **Research blog / feed** — our curated primary info (the bookmark corpus, syntheses) shared as it flows in.
- **Forkable model package** — the template as a downloadable/cloneable kit with the parameter schema.
- **Funder & partner reports** — generated from `state/` + economics + decisions.
- **Exports** — EPUB/PDF (already automated) for offline/print.
- **Bioregional commons contribution** — share methods, data, and lessons with the wider restoration network; connect with peer projects.

### 7.3 Content as a primary outflow (the blog engine)

**The entire system is the source for the blog — not just method.** Every domain throws off publishable material: each options-space ("what legal forms exist and when to pick each"; "site-selection criteria"; "funding pathways compared"), each decision we make and the reasoning behind it, each bioregion comparison, the evidence syntheses, and the running journey itself. Method ("what restoration methods exist, up/down-sides, when to choose each, with studies + example projects") is just *one* post among many.

Because the model is already structured as **options + decisions + evidence**, blog posts fall out of the work almost for free — our thinking-in-the-open doubles as the public's how-to. The **core → Synthesis → blog** pipeline is a primary outflow. (Method, like everything else, stays deliberately *unanchored*: we present options from the evidence, not prescriptions.)

---

## 8. Quality & consistency engine (the vault-maintenance redo)

The 18-persona system was a first crack; it's overlapping, manual, and heavy. Replace it with a **three-layer model**, mostly automated:

1. **Mechanical (CI, automatic):** build, links, spelling, markdown lint, frontmatter schema, accessibility/perf (Lighthouse). Already largely present — keep and tighten.
2. **Structural (scripts, scheduled):** template/case **drift detection** (every template option has a case decision or explicit "deferred"; no orphan decisions), citation integrity (every claim resolves), voice/tense checks, parameter-completeness, broken cross-store references. A single **health score** per domain.
3. **Editorial (scoped AI review agents + human gates):** a small set of focused review charters (clarity, factual integrity, vision-alignment, stakeholder lens) that run on changed files and *propose* edits; strategic changes require a human gate. Replaces the persona zoo with a few sharp tools.

Output: a **system health dashboard** (also an outflow) — the project's documentation visibly maintained.

---

## 9. Technical architecture

- **Repo layout:** `template/`, `case/`, `parameters/`, `decisions/`, `state/`, `research/` (evidence submodule), `_engines/` (engine code + charters), `_platform/` (build/sync/CI), `archive/`.
- **State store:** structured data (YAML/JSON, or a light DB) under `state/`, rendered into dashboards at build — single source for site + reports.
- **Build/publish:** Docusaurus reads `template/` + `case/` (sync reworked from `strategic/`); sidebar = two faces; monthly calendar versioning + releases retained; EPUB/PDF exports retained.
- **Automation:** existing ~20 GitHub Actions kept and extended — the 6-hourly bookmark sync is the Feed tap; add scheduled jobs for radars and drift checks.
- **Evidence:** finish `research/citation_index.json`; every doc citation resolves to a corpus entry.
- **MCP/agents:** engines run via scheduled scripts + AI agents with the charters from §6/§8; bookmarks-mcp already in place; add taps per §5.

---

## 10. Execution roadmap

**Sequencing principle (your steer):** first a **genuinely good-looking, one-person-manageable core + publishing** — something you're proud to show and can actually run alone. *Then* add modules and collaborators. **The grants tool comes last.**

- **Phase 0 — Vision** *(this doc)* → your review & shaping.
- **Phase 1 — Decompose & scaffold:** turn each section here into a focused design doc under `_process/refactoring/areas/`; create `template/ case/ parameters/ decisions/ state/ _engines/` skeletons + the canonical formats; rework sync + sidebars to read new trees alongside old (site stays green).
- **Phase 2 — Pilot a vertical slice:** one domain end-to-end **through the whole metabolism** — e.g. **Site & land**: parameters (DE/PT) → Land radar (even manual first) → scored shortlist → decisions → case + model docs → published on the leveled-up site. Proves inflow→core→engine→outflow, not just a doc split.
- **Phase 3 — Rollout** the other domains (table §3); add the new Stewardship & handoff domain; retire `strategic/` into `archive/` as converted.
- **Phase 4 — Engines:** finish Feed/Enrichment/Citation; build Land radar, Ecology, State-tracking, Synthesis; replace vault maintenance with the §8 quality engine. **The Grants tool / radar comes last**, once the core is polished and collaborative (and likely breaks out into `projects/`).
- **Phase 5 — Outflow level-up:** the re-imagined public platform (interactive explorer, live dashboards, evidence browser, starter kit, design/i18n).
- **Phase 6 — Steady state:** the living system runs; engines on schedule; we tend it.

---

## 11. Open questions for you

1. **Format of the next step** — should I now decompose this vision into the per-area design docs (one per domain + one per engine + one for the platform), or do you want to react to this whole first?
2. **Pilot slice** — Site & land (best end-to-end metabolism demo, gives you a real scored DE/PT shortlist) or Method (the heart, perma-forest/indigenous)?
3. **Ambition vs pragmatism on the platform** — full re-imagining (interactive explorer + live dashboards) as the target, or a leveled-up-but-static site first?
4. **State store** — comfortable introducing a small structured data layer (YAML/JSON → dashboards), or keep everything as prose for now?
5. **Case visibility** — publish the live case ("Our Journey") openly, or keep it private behind the public model?
6. **Handoff vehicle** — any early lean (land trust / easement / foundation / commons), or keep fully open in the model?

---

*Status: DRAFT v3 — north-star vision. Nothing in the current docs is treated as canon. On your shaping, Phase 1 decomposes this into area design docs and scaffolds the new structure.*
