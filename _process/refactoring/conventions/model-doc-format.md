---
title: "Format — Model (template) document"
type: convention
date: 2026-06-22
---

# How to write a Model document

Model docs live in `template/`. They describe the **general, replicable model** anyone could fork — options and the science behind them, not our specific choices (those go in `case/` as decision records).

## Voice

- **Present / conditional**, addressed to a future steward: "Options are…", "Choose A when…".
- **No future-project boilerplate** ("We will plant…", "This will restore…").
- **No meta** — no talk of the documentation system, phases, blueprints, or AI. Just the subject.
- Plain, concrete, confident. Short sentences. Prose over bullet-soup, but lists are fine for options and steps.
- Follow [human-voice.md](human-voice.md): no AI filler, sparse em dashes, varied rhythm, commit to claims.

## Required structure

```
---
title: <Topic>
domain: <D0…D10>
status: draft | stable
parameters: [<parameter keys this depends on, e.g. climate-zone, hectares>]
related: [<other model docs>]
---

# <Topic>

<One or two sentences: what this is and why it matters.>

## Non-negotiables
<Few. The science-consensus constraints that always hold. Each one line.>

## Options & pathways
### <Option A — short name>
- **What it is:** …
- **Choose when:** …
- **Trade-offs:** … (honest pros/cons)
- **Evidence:** [insight](research/bookmarks/Climate%20Change/<entry_id>.md)
### <Option B …>

## Implementation
<Step-by-step, customizable. What to actually do.>

## Parameters this depends on
<Which bioregion/country parameters change the answer, e.g. rainfall → species.>

## Related
<Links to neighbouring model docs.>
```

## Rules

- Cite claims by bookmark `entry_id`; flag low-verification sources as *needs verification*.
- Keep options **honest** — every pathway gets real downsides.
- If a topic is decided differently for us, that belongs in a `case/` decision record, linked — never restate our choice here.
- Many model topics are also blog material; write them so a curious reader could learn from them directly.

## Mini example (voice only)

> ## Options & pathways
> ### Natural regeneration (ANR)
> - **What it is:** protect and assist what the land already wants to grow back.
> - **Choose when:** seed sources survive nearby and the site isn't severely degraded.
> - **Trade-offs:** cheapest and most resilient; slower and less predictable in species mix.
