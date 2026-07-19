# Pre-v2.0.0 orphans

Files recovered from the old Gitea repository (history root `dcd1fa2f`,
2025-10-29) that never existed in this repository's history. That repo was a
separate, unrelated git history — a snapshot of the vault before the v2.0.0
restructure — and it was overwritten during the migration to Gitea, so anything
only present there would have been lost.

Its two substantive orphans were restored to their siblings in `strategic/`:

- `strategic/00b_Project_Model_and_Approach.md`
- `strategic/41_Network_Model_and_Replication.md` (filled the 40 → 42 gap)

What's kept here instead of `strategic/` is the file that no longer points at
anything real:

## AI_START_HERE.md

A pointer file for AI assistants, superseded on every axis:

- Its job was to direct the reader to `_process/BOOTSTRAP_STATE.md`, which does
  not exist in this repository. The file's entire reason for existing points at
  nothing.
- AI workflow is now `_vault_maintenance/personas/FLEET.md` (proposer/reviewer
  agents, review-gated PRs, a human gate) plus the "For AI Assistants" section
  of `CONTRIBUTING.md`.
- Live status is now `state/state.yaml`, `state/status.json`, `case/status.md` —
  not the frozen snapshot it hardcodes ("Phase 1, 17% complete").
- Its six "Important Principles" are now wrong. It asserts 2–5 ha, €30–60k land,
  "Germany/EU, not Southern Europe", and "e.V. then Stiftung". The live model
  says 1–2 ha (`parameters/germany.md`), keeps Portugal a live candidate
  (`case/decisions/0001-candidate-countries.md`), and defers the legal form
  entirely (`case/decisions/0002-legal-form.md`).

Kept as a record of how the project thought about itself in Oct 2025. Do not
follow it.
