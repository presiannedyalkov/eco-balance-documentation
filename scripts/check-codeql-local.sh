#!/bin/bash
# Local CodeQL check script
# Run this before committing/deploying to catch security issues early

set -e

echo "🔍 CodeQL Local Check"
echo "===================="
echo ""

# Check if CodeQL CLI is installed
if ! command -v codeql &> /dev/null; then
    echo "❌ CodeQL CLI not found!"
    echo ""
    echo "📦 To install CodeQL CLI:"
    echo ""
    echo "Option 1: Download binary (Recommended)"
    echo "   1. Visit: https://github.com/github/codeql-cli-binaries/releases"
    echo "   2. Download codeql-bundle-linux64.tar.gz"
    echo "   3. Extract: tar -xzf codeql-bundle-linux64.tar.gz"
    echo "   4. Add to PATH: export PATH=\$PATH:\$(pwd)/codeql"
    echo ""
    echo "Option 2: Use GitHub CLI extension"
    echo "   gh extension install github/gh-codeql"
    echo ""
    echo "Option 3: Use npm script (simpler, no install needed)"
    echo "   npm run check:codeql:simple"
    echo ""
    exit 1
fi

echo "✅ CodeQL CLI found: $(codeql version --format=json 2>/dev/null | python3 -c 'import sys, json; print(json.load(sys.stdin).get("version", "unknown"))' 2>/dev/null || echo 'installed')"
echo ""

# Create CodeQL database directory
DB_DIR=".codeql-db"
mkdir -p "$DB_DIR"

# Clean previous database
if [ -d "$DB_DIR/javascript" ]; then
    echo "🧹 Cleaning previous database..."
    rm -rf "$DB_DIR/javascript"
fi

echo "📦 Creating CodeQL database..."
echo "   This may take a few minutes..."
codeql database create "$DB_DIR/javascript" \
    --language=javascript \
    --source-root=. \
    --command="npm install" \
    --overwrite 2>&1 | grep -E "(Creating|Successfully|Error)" || true

if [ ! -d "$DB_DIR/javascript" ]; then
    echo "❌ Failed to create CodeQL database"
    exit 1
fi

echo ""
echo "🔍 Running CodeQL analysis..."
echo "   Checking for security issues..."

# Run analysis with security queries
codeql database analyze "$DB_DIR/javascript" \
    --format=sarif-latest \
    --output=codeql-results.sarif \
    javascript-security-and-quality.qls 2>&1 | tail -5

if [ -f "codeql-results.sarif" ]; then
    echo ""
    echo "📊 Results saved to: codeql-results.sarif"
    
    # Try to extract summary
    if command -v jq &> /dev/null; then
        echo ""
        echo "📋 Summary:"
        jq -r '.runs[0].results | length as $count | "   Found \($count) potential issues"' codeql-results.sarif 2>/dev/null || echo "   (Install jq for detailed summary)"
    fi
    
    echo ""
    echo "💡 To view results:"
    echo "   - Install VS Code CodeQL extension"
    echo "   - Open codeql-results.sarif in VS Code"
    echo "   - Or view in GitHub Security tab after push"
    echo ""
    echo "✅ Local CodeQL check complete!"
else
    echo "⚠️  Analysis completed but no results file found"
fi

