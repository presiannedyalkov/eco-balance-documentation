#!/bin/bash
# Wrapper script for AI assistant to always use create-branch.sh
# This enforces using the proper branch creation script
# Usage: ./scripts/ai-create-branch.sh fix/name

set -e

if [ -z "$1" ]; then
  echo "❌ Error: Branch name required"
  echo "Usage: ./scripts/ai-create-branch.sh fix/name"
  exit 1
fi

echo "🤖 AI Assistant: Creating branch using proper workflow..."
echo ""

# Always use the create-branch.sh script
exec ./scripts/create-branch.sh "$@"

