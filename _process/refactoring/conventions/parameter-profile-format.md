---
title: "Format — Bioregion / country parameter profile"
type: convention
date: 2026-06-22
---

# How to write a Parameter profile

Parameter profiles live in `parameters/` (e.g. `germany.md`, `portugal.md`). They resolve the variables the model leaves open — scale, species, calendar, legal form, funding landscape — for a specific place. **Engines read the structured YAML block**, so keep it machine-readable; the prose below it is for humans.

## Structured block (machine-readable)

```yaml
---
id: portugal
kind: parameter-profile
country: Portugal
climate_zone: mediterranean        # temperate | mediterranean | atlantic
rainfall_mm: [400, 600]
seasons: "hot dry summers, mild winters"
hazards: [summer_drought, fire]
target_ecosystem: "cork oak / holm oak / pine dryland forest"
native_palette: [Quercus suber, Quercus ilex, Pinus pinea, Arbutus unedo, Cistus, Rosmarinus]
plausible_hectares: [3, 5]         # steward-scale, 1–2 people
land_cost_band_eur_per_ha: [2000, 8000]
planting_window: "Oct–Feb"
legal_options: [Associacao, IPSS]
funding_landscape: [Fundo Ambiental, EU LIFE]
key_risks: [drought_stress, fire, water_scarcity]
sources: [<entry_id>, <entry_id>]
status: draft
---
```

## Human prose (below the block)

Short narrative notes per field where nuance matters — why these species, what the legal options really cost, where the funding bodies fit, what makes this place attractive or hard. Cite sources by `entry_id`.

## Rules

- Numbers as ranges `[min, max]` so the radars can score against them.
- Keep the YAML keys identical across profiles (same schema = comparable).
- Flag uncertain values and cite where each came from.
- This is the single place scale/species/calendar/legal/funding are pinned per place; model docs point here rather than hard-coding a country.
