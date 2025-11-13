#!/bin/bash
# create_github_issues.sh - Create GitHub Issues from feature wishlist
# Requires: GitHub CLI (gh) installed and authenticated

set -e

REPO_OWNER="presiannedyalkov"
REPO_NAME="eco-balance-documentation"
WISHLIST_FILE="docs/resources/feature-wishlist.md"

echo "📝 Creating GitHub Issues from Feature Wishlist"
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

# Function to get milestone number by title
get_milestone_number() {
    local title="$1"
    gh api repos/$REPO_OWNER/$REPO_NAME/milestones \
        --jq ".[] | select(.title == \"$title\") | .number" 2>/dev/null | head -1
}

# Function to create issue
create_issue() {
    local title="$1"
    local body="$2"
    local milestone="$3"
    local labels="$4"
    
    echo "📌 Creating issue: $title"
    
    local milestone_num=""
    if [ -n "$milestone" ]; then
        milestone_num=$(get_milestone_number "$milestone")
        if [ -n "$milestone_num" ]; then
            echo "   → Linking to milestone: $milestone (#$milestone_num)"
        fi
    fi
    
    local issue_body="$body"
    if [ -n "$milestone_num" ]; then
        issue_body="$body

**Milestone:** $milestone"
    fi
    
    if [ -n "$labels" ]; then
        gh issue create \
            --repo "$REPO_OWNER/$REPO_NAME" \
            --title "$title" \
            --body "$issue_body" \
            --milestone "$milestone_num" \
            --label "$labels" 2>/dev/null || echo "⚠️  Issue may already exist: $title"
    else
        gh issue create \
            --repo "$REPO_OWNER/$REPO_NAME" \
            --title "$title" \
            --body "$issue_body" \
            --milestone "$milestone_num" 2>/dev/null || echo "⚠️  Issue may already exist: $title"
    fi
}

# Create issues for 2025.12 milestone
echo "📋 Creating Issues for 2025.12 - Versioning & Roadmap System..."
echo ""

# GitHub Milestones & Roadmap Integration
create_issue \
    "GitHub Milestones & Roadmap Integration" \
    "## Feature: GitHub Milestones & Roadmap Integration

**Source:** Feature Wishlist
**Priority:** High
**Estimated Effort:** 8-13 hours

### Description
Integrate GitHub Milestones, Issues, and Releases with the project roadmap and versioning system to create a visual, timeline-based roadmap that tracks feature progress, links branches to milestones, and automates release management.

### Implementation Checklist
- [ ] Create GitHub Milestones for next 3 months
- [ ] Create GitHub Issues for all features in wishlist
- [ ] Link issues to milestones
- [ ] Set up GitHub Actions workflows for automation
- [ ] Set up release automation
- [ ] Create roadmap sync script
- [ ] Test automation

### Related
- Plan: \`_process/documentation/GITHUB_MILESTONES_ROADMAP_PLAN.md\`
- Feature Wishlist: \`docs/resources/feature-wishlist.md\`" \
    "2025.12 - Versioning & Roadmap System" \
    "enhancement,documentation,high-priority"

echo ""
echo "📋 Creating Issues for 2026.01 - Content & Quality..."
echo ""

# Documentation Export Formats
create_issue \
    "Documentation Export Formats (EPUB & PDF)" \
    "## Feature: Documentation Export Formats

**Source:** Feature Wishlist
**Priority:** Medium
**Estimated Effort:** 6-10 hours

### Description
Enable exporting the entire documentation repository into portable formats for offline reading and distribution. Support EPUB format for Kindle and e-reader devices, and PDF format for universal document sharing and printing.

### Implementation Checklist
- [ ] Set up EPUB export (Pandoc or mdbook-epub)
- [ ] Set up PDF export (Pandoc or mdbook-pdf)
- [ ] Create GitHub Actions workflow for automated generation
- [ ] Add manual export script
- [ ] Test exports with sample content
- [ ] Document export process

### Related
- Feature Wishlist: \`docs/resources/feature-wishlist.md\`" \
    "2026.01 - Content & Quality" \
    "enhancement,documentation"

# Research Bookmarks Integration
create_issue \
    "Research Bookmarks Integration (Submodule)" \
    "## Feature: Research Bookmarks Integration

**Source:** Feature Wishlist
**Priority:** High
**Estimated Effort:** 10-14 hours

### Description
Add research repository as git submodule, organize bookmarks by topic/category, create citation system linking documents to sources, and add citations to key statistical claims.

### Implementation Checklist
- [ ] Add research repository as git submodule
- [ ] Organize bookmarks by topic/category
- [ ] Create citation system linking documents to sources
- [ ] Update AI context to include research submodule
- [ ] Create index/navigation for research sources
- [ ] Add citations to key statistical claims

### Related
- Feature Wishlist: \`docs/resources/feature-wishlist.md\`
- Pending Tasks: \`_process/documentation/PENDING_TASKS.md\`" \
    "2026.01 - Content & Quality" \
    "enhancement,documentation,high-priority"

echo ""
echo "✅ Issues created"
echo ""
echo "📝 Next steps:"
echo "1. Review issues in GitHub: https://github.com/$REPO_OWNER/$REPO_NAME/issues"
echo "2. Add more issues manually or extend this script"
echo "3. Link PRs to issues using: Closes #<issue-number>"
echo ""

