# Engines

Input -> process -> output loops that keep the system working. Each is a small
script you can run on its own; outputs land in `_engines/_reports/`.
Run them all with `npm run engine:all`.

| Engine | Run | In -> Out |
|---|---|---|
| Feed | `npm run engine:feed` | bookmark corpus -> queue of articles not yet used (newest first) |
| Enrichment | `npm run engine:enrich` | feed queue -> per-article suggested domain + ready citation (a worklist to approve) |
| Ecology | `npm run engine:ecology` | bioregion parameters -> starting planting brief per region |
| Consistency | `npm run engine:check` | source trees -> link/citation/voice checks, citation index, health report |

Enrichment is a routing aid: it suggests where an article belongs; a human (or
AI) places the insight, and the consistency engine then verifies it. Feed and
ecology read the corpus and the parameter profiles directly.

Planned next: land/site radar and grants radar (both need an inflow of listings
and grant calls that does not exist yet), and state tracking. See the system
vision in `_process/refactoring/` for the full picture.
