<!-- SAMPLE / REVIEW ONLY — shows the ON-SITE result of the provenance wiring for
     the two seeded citations in parameters/germany.md, produced by running the real
     engine:evidence -> sync -> engine:publish chain. Regenerated automatically during
     `npm run site:prepare`; this file is just a snapshot for review. -->

# 1. On the /evidence page (publish/build.js) — three-level block under each source

### Germany's dying forests… | The Guardian {#e1767917557913}

Source: [theguardian.com](https://www.theguardian.com/…) · _news_

Germany's forests, predominantly monoculture spruce plantations, are dying… (existing flat summary kept)

Cited in: [germany](/model/parameters/germany)

#### Did Germany's spruce-monoculture forestry fail under heat and bark beetle, and is mixed-species planting the response? {#de-mixed-planting}

**Our claim:** Germany's spruce monocultures coped badly with heat and bark beetle, pushing the country toward diverse, mixed planting.

**Source says:** [“replacing the dead spruce with saplings from the same species would probably guarantee catastrophe once again”](https://www.theguardian.com/environment/2026/jan/08/germany-forests-bark-beetle-spruce-co2-carbon-sink-monoculture-aoe#:~:text=replacing%20the%20dead%20spruce%20with%20saplings,would%20probably%20guarantee%20catastrophe%20once%20again) — The Guardian reports foresters concluding that replanting the same spruce monoculture would probably repeat the catastrophe, and documents the shift to planting a mixture of species for resilience.

---

# 2. Inline on the germany page (sync-vnext.js) — fold-together + ✓

> …how badly spruce monocultures coped with heat and bark beetle, which has pushed the country toward diverse, mixed planting ([Germany's dying forests](/evidence#de-mixed-planting) ✓, *news*).

The inline source link now points at the **claim** anchor (`#de-mixed-planting`, the three-level entry above), carries a ✓, and the raw `[^de-mixed-planting]` marker is stripped from the published copy. A Level-2 citation (no quoted passage) works the same way, linking to its reasoned entry without a deep-linked quote.
