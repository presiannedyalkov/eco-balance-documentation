#!/bin/bash
# setup_github_milestones.sh - Create GitHub Milestones and Issues from wishlist
# Requires: GitHub CLI (gh) installed and authenticated

set -e

REPO_OWNER="presiannedyalkov"
REPO_NAME="eco-balance-documentation"
WISHLIST_FILE="docs/resources/feature-wishlist.md"

echo "🚀 Setting up GitHub Milestones and Issues"
echo "Repository: $REPO_OWNER/$REPO_NAME"
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ Error: GitHub CLI (gh) is not installed"
    echo "Install from: https://cli.github.com/"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Error: Not authenticated with GitHub CLI"
    echo "Run: gh auth login"
    exit 1
fi

# Function to create milestone
create_milestone() {
    local title="$1"
    local description="$2"
    local due_date="$3"
    
    echo "📅 Creating milestone: $title"
    
    if [ -n "$due_date" ]; then
        gh api repos/$REPO_OWNER/$REPO_NAME/milestones \
            -X POST \
            -f title="$title" \
            -f description="$description" \
            -f due_on="$due_date" \
            --jq '.number' || echo "⚠️  Milestone may already exist"
    else
        gh api repos/$REPO_OWNER/$REPO_NAME/milestones \
            -X POST \
            -f title="$title" \
            -f description="$description" \
            --jq '.number' || echo "⚠️  Milestone may already exist"
    fi
}

# Function to get milestone number by title
get_milestone_number() {
    local title="$1"
    gh api repos/$REPO_OWNER/$REPO_NAME/milestones \
        --jq ".[] | select(.title == \"$title\") | .number" | head -1
}

# Create milestones
echo "📋 Creating Milestones..."
echo ""

# 2025.11 - Documentation Platform Launch (COMPLETED)
create_milestone \
    "2025.11 - Documentation Platform Launch" \
    "Public Documentation Website deployment and automation. ✅ COMPLETED" \
    "2025-11-30T23:59:59Z"

# 2025.12 - Versioning & Roadmap System
create_milestone \
    "2025.12 - Versioning & Roadmap System" \
    "Calendar Versioning implementation, GitHub Milestones integration, Release management, Roadmap documentation sync" \
    "2025-12-31T23:59:59Z"

# 2026.01 - Content & Quality
create_milestone \
    "2026.01 - Content & Quality" \
    "Language audit completion, Document length management, Research bookmarks integration, Documentation export formats (EPUB & PDF)" \
    "2026-01-31T23:59:59Z"

# 2026.Q1 - Interactive Features
create_milestone \
    "2026.Q1 - Interactive Features" \
    "AI Chatbot Interface, Community Feedback System, SSO Authentication, Multi-language Support" \
    "2026-03-31T23:59:59Z"

# 2026.Q2 - Advanced Features
create_milestone \
    "2026.Q2 - Advanced Features" \
    "Inline Commenting System, Task Tracking Visibility, Advanced Search, Notification System" \
    "2026-06-30T23:59:59Z"

echo ""
echo "✅ Milestones created"
echo ""
echo "📝 Next steps:"
echo "1. Review milestones in GitHub: https://github.com/$REPO_OWNER/$REPO_NAME/milestones"
echo "2. Run: ./scripts/create_github_issues.sh to create issues from wishlist"
echo "3. Link issues to milestones manually or via the script"
echo ""

