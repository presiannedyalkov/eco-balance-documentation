#!/usr/bin/env bash
# Close open Dependabot PRs after a consolidated security PR is merged.
# Requires: gh auth login (read/write on repo)
set -euo pipefail

REPO="${1:-presiannedyalkov/eco-balance-documentation}"
SUPERSEDED_BY="${2:-}"

if ! gh auth status >/dev/null 2>&1; then
  echo "Run: gh auth login -h github.com"
  exit 1
fi

mapfile -t PRS < <(gh pr list --repo "$REPO" --state open --author app/dependabot --json number,title --jq '.[] | "\(.number)\t\(.title)"')

if [ "${#PRS[@]}" -eq 0 ]; then
  echo "No open Dependabot PRs."
  exit 0
fi

echo "Found ${#PRS[@]} open Dependabot PR(s)."
for line in "${PRS[@]}"; do
  num="${line%%$'\t'*}"
  title="${line#*$'\t'}"
  body="Superseded by consolidated dependency updates on main."
  [ -n "$SUPERSEDED_BY" ] && body="Superseded by #$SUPERSEDED_BY."
  echo "Closing #$num: $title"
  gh pr close "$num" --repo "$REPO" --comment "$body" || true
done

echo "Done."
