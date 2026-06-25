# State

`state.yaml` is the project's execution state: the single, hand-edited source of
truth for where things actually stand. Update it when reality changes (money
raised, entity registered, land secured, a phase gate passed).

Run `npm run engine:state` to render it into a readable snapshot
(`_engines/_reports/status.md`) and a machine copy (`state/status.json`) that a
dashboard can read later.

## What belongs here

Project-execution facts: phase, people, land-search status, entity, funding,
budget, milestones, next steps.

## What does not belong here

The land and its ecosystem. Flattening a living system into a few numbers is the
reductionism we reject. Restoration progress gets its own field module — plant
records, a journal, observations of states and relationships and cycles — built
when we are on the ground. See the method docs and the scientific learning loop.
