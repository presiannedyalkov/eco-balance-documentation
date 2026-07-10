---
title: "Format — Case decision record"
type: convention
date: 2026-06-22
---

# How to write a Decision record

Decision records live in `case/decisions/` (`NNNN-slug.md`). They capture **what we chose and why** — a thin overlay that *references* the model, never restates it.

## Voice

- **Committed, past/present**: "We chose…", "Our constraint is…".
- Concise and honest, including doubts and what would change our mind.
- No meta about the documentation system.

## Structure

```
---
id: NNNN-slug
domain: <D0…D10>
status: proposed | decided | revisit | deferred
date: <YYYY-MM-DD>
supersedes: <id or none>
evidence: [<entry_id>, …]
---

# <Decision title>

## Context
<What decision, why now.>

## Options considered
<Link the model's option set; one line each on why kept/dropped. Don't restate the model.>

## Decision
<What we chose.>

## Why
<Rationale against our real constraints.>

## Constraints
<The binding limits: budget, country, skills, time.>

## Revisit when
<The trigger that reopens this.>
```

## Hypothesis block (for testable decisions)

When a decision is a prediction about the land, add:

```
## Hypothesis
- **Prediction:** <expected outcome + timeframe>
- **Test design:** <baseline, treatments, controls/reference, what & how & how-often measured, success criteria set in advance>
- **Outcome:** <confirmed | refuted | partial — with data> (filled in later)
- **Model update:** <what changed in the template as a result>
```

These turn the plot into a portfolio of field studies. Set success/failure criteria *before* measuring. Be honest about confidence; small-scale studies still count if their limits are stated.
