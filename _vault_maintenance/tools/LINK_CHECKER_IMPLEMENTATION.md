# 🔗 Automated Link Checker - Implementation Guide

**Estimated Setup Time**: 1-2 hours
**Maintenance**: <5 minutes/month
**ROI**: Very High (prevents future broken links)

---

## 📋 OVERVIEW

This documentation uses **wiki-style links** (`[[file]]`, `[[file|text]]`) which standard link checkers don't handle well. We need a custom solution.

### Recommended Approach

**3-Layer Strategy**:
1. **Custom Python script** - Validates wiki-style internal links (90% of links)
2. **Standard link checker** - Validates markdown/HTTP links (10% of links)
3. **Pre-commit hook** - Prevents broken links from being committed

---

## 🛠️ IMPLEMENTATION

### Layer 1: Custom Wiki-Link Validator

**File**: `_vault_maintenance/tools/check_wiki_links.py`

```python
#!/usr/bin/env python3
"""
Wiki-style link checker for Obsidian/internal documentation.

Validates [[file]] and [[file|text]] style links.
"""

import re
import sys
from pathlib import Path
from typing import List, Tuple, Set
from collections import defaultdict

# ANSI color codes
RED = '\033[91m'
GREEN = '\033[92m'
YELLOW = '\033[93m'
BLUE = '\033[94m'
RESET = '\033[0m'

class WikiLinkChecker:
    def __init__(self, root_dir: Path):
        self.root_dir = root_dir
        self.all_md_files = set()
        self.broken_links = defaultdict(list)
        self.link_count = 0
        self.broken_count = 0

    def scan_repository(self):
        """Build index of all markdown files."""
        print(f"{BLUE}Scanning repository...{RESET}")

        # Get all .md files
        for md_file in self.root_dir.rglob('*.md'):
            # Skip hidden files and node_modules
            if any(part.startswith('.') for part in md_file.parts):
                continue
            if 'node_modules' in md_file.parts:
                continue

            # Store both absolute and relative paths
            rel_path = md_file.relative_to(self.root_dir)
            self.all_md_files.add(str(rel_path))
            # Also store without .md extension (common in wiki links)
            self.all_md_files.add(str(rel_path.with_suffix('')))

        print(f"  Found {len(self.all_md_files)} markdown files")

    def extract_wiki_links(self, content: str) -> List[Tuple[str, int]]:
        """Extract all wiki-style links from content."""
        links = []

        # Pattern: [[target]] or [[target|display]]
        pattern = r'\[\[([^\]|]+)(?:\|[^\]]*)?\]\]'

        for match in re.finditer(pattern, content):
            target = match.group(1).strip()
            # Get line number
            line_num = content[:match.start()].count('\n') + 1
            links.append((target, line_num))

        return links

    def resolve_link(self, source_file: Path, target: str) -> bool:
        """Check if a wiki link target exists."""
        # Remove .md if present
        clean_target = target.replace('.md', '')

        # Try relative to source file's directory
        source_dir = source_file.parent

        # Patterns to try
        candidates = [
            # Direct relative path
            (source_dir / f"{clean_target}.md").relative_to(self.root_dir),
            # Relative with ../
            (source_dir / f"{target}.md").relative_to(self.root_dir) if '/' in target else None,
            # Root-level file
            Path(f"{clean_target}.md"),
            # With .md extension already
            Path(f"{target}") if target.endswith('.md') else None,
        ]

        for candidate in candidates:
            if candidate and str(candidate) in self.all_md_files:
                return True
            if candidate and str(candidate.with_suffix('')) in self.all_md_files:
                return True

        # Also try absolute from root
        if clean_target in self.all_md_files:
            return True
        if f"{clean_target}.md" in self.all_md_files:
            return True

        return False

    def check_file(self, file_path: Path) -> int:
        """Check all links in a single file."""
        try:
            content = file_path.read_text(encoding='utf-8')
        except Exception as e:
            print(f"{RED}Error reading {file_path}: {e}{RESET}")
            return 0

        links = self.extract_wiki_links(content)
        if not links:
            return 0

        broken_in_file = 0
        for target, line_num in links:
            self.link_count += 1

            if not self.resolve_link(file_path, target):
                self.broken_count += 1
                broken_in_file += 1
                self.broken_links[str(file_path)].append({
                    'target': target,
                    'line': line_num
                })

        return broken_in_file

    def check_all(self) -> bool:
        """Check all markdown files."""
        print(f"\n{BLUE}Checking wiki-style links...{RESET}")

        md_files = [f for f in self.root_dir.rglob('*.md')
                    if not any(part.startswith('.') for part in f.parts)
                    and 'node_modules' not in f.parts]

        files_with_broken = 0

        for md_file in sorted(md_files):
            broken = self.check_file(md_file)
            if broken > 0:
                files_with_broken += 1

        return self.report()

    def report(self) -> bool:
        """Print report and return True if all links valid."""
        print(f"\n{'='*70}")
        print(f"{BLUE}LINK CHECK REPORT{RESET}")
        print(f"{'='*70}\n")

        print(f"Total wiki-style links checked: {self.link_count}")
        print(f"Broken links found: {self.broken_count}")
        print(f"Files with broken links: {len(self.broken_links)}")

        if self.broken_count == 0:
            print(f"\n{GREEN}✓ All wiki-style links are valid!{RESET}\n")
            return True

        print(f"\n{RED}✗ Broken links found:{RESET}\n")

        for file_path, links in sorted(self.broken_links.items()):
            print(f"{YELLOW}{file_path}{RESET}")
            for link in sorted(links, key=lambda x: x['line']):
                print(f"  Line {link['line']:4d}: [[{link['target']}]]")
            print()

        print(f"{RED}Fix these {self.broken_count} broken links before committing.{RESET}\n")
        return False


def main():
    """Main entry point."""
    import argparse

    parser = argparse.ArgumentParser(
        description='Check wiki-style links in markdown documentation'
    )
    parser.add_argument(
        'path',
        nargs='?',
        default='.',
        help='Path to documentation root (default: current directory)'
    )
    parser.add_argument(
        '--verbose', '-v',
        action='store_true',
        help='Verbose output'
    )

    args = parser.parse_args()
    root_dir = Path(args.path).resolve()

    if not root_dir.is_dir():
        print(f"{RED}Error: {root_dir} is not a directory{RESET}")
        sys.exit(1)

    print(f"{BLUE}Wiki Link Checker{RESET}")
    print(f"Checking: {root_dir}\n")

    checker = WikiLinkChecker(root_dir)
    checker.scan_repository()
    success = checker.check_all()

    sys.exit(0 if success else 1)


if __name__ == '__main__':
    main()
```

**Usage**:
```bash
# Check all links
python3 _vault_maintenance/tools/check_wiki_links.py

# Check specific directory
python3 _vault_maintenance/tools/check_wiki_links.py implementation_tasks/

# Exit code 0 = all links valid, 1 = broken links found
```

---

### Layer 2: Standard Markdown Link Checker

For the few standard markdown links `[text](url)` and external URLs:

**Option A: markdown-link-check (Recommended)**

```bash
# Install (one-time)
npm install -g markdown-link-check

# Create config
cat > .markdown-link-check.json <<'EOF'
{
  "ignorePatterns": [
    {
      "pattern": "^#"
    },
    {
      "pattern": "^\\[\\["
    }
  ],
  "httpHeaders": [
    {
      "urls": ["https://"],
      "headers": {
        "User-Agent": "Mozilla/5.0"
      }
    }
  ],
  "timeout": "10s",
  "retryOn429": true,
  "retryCount": 3,
  "fallbackRetryDelay": "5s"
}
EOF

# Check all markdown files
find . -name "*.md" ! -path "./_vault_maintenance/*" \
  -exec markdown-link-check --config .markdown-link-check.json {} \;
```

**Option B: lychee (Rust-based, very fast)**

```bash
# Install (one-time)
cargo install lychee
# or: brew install lychee (macOS)

# Create config
cat > lychee.toml <<'EOF'
# Exclude patterns
exclude = [
  "^\\[\\[.*\\]\\]$",  # Wiki-style links
  "^mailto:",          # Email links
]

# Network settings
timeout = 10
max_redirects = 5
max_retries = 3

# Only check markdown files
include = ["\\.md$"]

# Exclude paths
exclude_path = [
  "_vault_maintenance/completed/",
  "node_modules/",
]
EOF

# Run check
lychee --config lychee.toml .
```

---

### Layer 3: Pre-Commit Hook

**File**: `.git/hooks/pre-commit`

```bash
#!/bin/bash
# Pre-commit hook to check links in staged markdown files

echo "🔗 Checking links in staged markdown files..."

# Get list of staged markdown files
STAGED_MD_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep '\.md$')

if [ -z "$STAGED_MD_FILES" ]; then
    echo "No markdown files staged, skipping link check."
    exit 0
fi

# Check wiki-style links
echo ""
echo "Checking wiki-style links..."
python3 _vault_maintenance/tools/check_wiki_links.py

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Broken wiki-style links found!"
    echo "Fix the links above or use 'git commit --no-verify' to bypass this check."
    exit 1
fi

echo "✅ All wiki-style links valid!"

# Optional: Check standard markdown links (slower)
# Uncomment if you want to check external URLs too
# echo ""
# echo "Checking standard markdown links..."
# for file in $STAGED_MD_FILES; do
#     markdown-link-check "$file" || exit 1
# done

echo ""
echo "✅ Link check passed!"
exit 0
```

**Make executable**:
```bash
chmod +x .git/hooks/pre-commit
```

---

### Layer 4: GitHub Actions (CI/CD)

**File**: `.github/workflows/link-check.yml`

```yaml
name: Link Checker

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  schedule:
    # Run weekly on Mondays at 9am
    - cron: '0 9 * * 1'

jobs:
  check-links:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.11'

    - name: Check wiki-style links
      run: |
        python3 _vault_maintenance/tools/check_wiki_links.py

    - name: Install markdown-link-check
      run: npm install -g markdown-link-check

    - name: Check markdown links
      run: |
        find . -name "*.md" ! -path "./_vault_maintenance/completed/*" \
          -exec markdown-link-check --config .markdown-link-check.json {} \;

    - name: Report results
      if: failure()
      run: |
        echo "::error::Broken links found in documentation"
        exit 1
```

---

## 📊 IMPLEMENTATION PLAN

### Phase 1: Core Setup (30 minutes)

```bash
cd /home/presi/projects/eco-balance-documentation

# 1. Create the wiki link checker
mkdir -p _vault_maintenance/tools
# Copy check_wiki_links.py from above

# 2. Make it executable
chmod +x _vault_maintenance/tools/check_wiki_links.py

# 3. Test it
python3 _vault_maintenance/tools/check_wiki_links.py

# Expected output:
# Wiki Link Checker
# Checking: /home/presi/projects/eco-balance-documentation
#
# Scanning repository...
#   Found 95 markdown files
#
# Checking wiki-style links...
#
# ======================================================================
# LINK CHECK REPORT
# ======================================================================
#
# Total wiki-style links checked: 487
# Broken links found: 0
# Files with broken links: 0
#
# ✓ All wiki-style links are valid!
```

### Phase 2: Standard Link Checker (20 minutes)

```bash
# Option A: Using markdown-link-check (easier)
npm install -g markdown-link-check

# Create config file
cat > .markdown-link-check.json <<'EOF'
{
  "ignorePatterns": [
    { "pattern": "^#" },
    { "pattern": "^\\[\\[" }
  ],
  "timeout": "10s"
}
EOF

# Test on a single file
markdown-link-check --config .markdown-link-check.json 00_Eco_Balance_Hub.md (root)

# Option B: Using lychee (faster, recommended for large docs)
# Install: cargo install lychee
# or: brew install lychee (macOS)
# or: cargo install lychee (Linux)
```

### Phase 3: Pre-Commit Hook (15 minutes)

```bash
# Create pre-commit hook
cat > .git/hooks/pre-commit <<'EOF'
#!/bin/bash
echo "🔗 Checking links..."
python3 _vault_maintenance/tools/check_wiki_links.py
if [ $? -ne 0 ]; then
    echo "❌ Broken links found! Fix them or use --no-verify to bypass."
    exit 1
fi
echo "✅ Links OK!"
exit 0
EOF

# Make executable
chmod +x .git/hooks/pre-commit

# Test it
git add 00_Eco_Balance_Hub.md (root)
git commit -m "test" --dry-run
# Should run link check before committing
```

### Phase 4: CI/CD Integration (15 minutes)

```bash
# Create GitHub Actions workflow
mkdir -p .github/workflows

cat > .github/workflows/link-check.yml <<'EOF'
name: Link Check
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-python@v4
      with:
        python-version: '3.11'
    - name: Check links
      run: python3 _vault_maintenance/tools/check_wiki_links.py
EOF

# Commit and push
git add .github/workflows/link-check.yml
git commit -m "Add automated link checking to CI/CD"
git push
```

---

## 🎯 EXPECTED RESULTS

### After Setup

**Manual Check**:
```bash
$ python3 _vault_maintenance/tools/check_wiki_links.py

Wiki Link Checker
Checking: /home/presi/projects/eco-balance-documentation

Scanning repository...
  Found 95 markdown files

Checking wiki-style links...

======================================================================
LINK CHECK REPORT
======================================================================

Total wiki-style links checked: 487
Broken links found: 0
Files with broken links: 0

✓ All wiki-style links are valid!
```

**Pre-Commit Hook**:
```bash
$ git commit -m "Update documentation"

🔗 Checking links...
Scanning repository...
  Found 95 markdown files
Checking wiki-style links...

✓ All wiki-style links are valid!

✅ Links OK!
[main abc1234] Update documentation
 1 file changed, 10 insertions(+), 5 deletions(-)
```

**If Broken Link Found**:
```bash
$ git commit -m "Add new section"

🔗 Checking links...

======================================================================
LINK CHECK REPORT
======================================================================

Total wiki-style links checked: 488
Broken links found: 1
Files with broken links: 1

✗ Broken links found:

02_Project_Vision.md
  Line   45: [[strategic/99_Nonexistent_File]]

❌ Broken links found! Fix them or use --no-verify to bypass.
```

---

## 🔧 CUSTOMIZATION

### For Your Specific Needs

**1. Exclude Certain Patterns**

Edit `check_wiki_links.py`:
```python
def should_skip_link(self, target: str) -> bool:
    """Skip certain link patterns."""
    skip_patterns = [
        'http://',   # External URLs (handled by other tool)
        'https://',  # External URLs
        'mailto:',   # Email links
        # Add your patterns here
    ]
    return any(target.startswith(p) for p in skip_patterns)
```

**2. Different Link Formats**

If you use `[text](file.md)` instead of `[[file]]`:
```python
# Add this pattern
pattern = r'\]\(([^)]+\.md)\)'
```

**3. Performance Optimization**

For very large documentation (1000+ files):
```python
# Add caching
import pickle

def save_index(self):
    with open('.link_index.pkl', 'wb') as f:
        pickle.dump(self.all_md_files, f)

def load_index(self):
    if Path('.link_index.pkl').exists():
        with open('.link_index.pkl', 'rb') as f:
            self.all_md_files = pickle.load(f)
        return True
    return False
```

---

## 📈 BENEFITS

### Immediate Benefits

1. **Catch Broken Links Early**
   - Before they reach production
   - Before other team members see them
   - Prevent documentation rot

2. **Fast Feedback**
   - ~1 second check on commit
   - Clear error messages with line numbers
   - No manual verification needed

3. **Confidence**
   - Know all links work
   - Safe to refactor/rename files
   - Automated regression prevention

### Long-Term Benefits

4. **Maintainability**
   - Documentation stays navigable
   - Easy to find and fix issues
   - Quality metrics tracked over time

5. **Collaboration**
   - Team members can't accidentally break links
   - PRs automatically checked
   - Consistent quality standards

6. **Scalability**
   - Handles 1000s of files efficiently
   - Runs in CI/CD automatically
   - Zero ongoing maintenance

---

## 🚀 QUICK START (15 minutes)

**Minimal viable setup**:

```bash
# 1. Create the checker (copy script from above)
mkdir -p _vault_maintenance/tools
nano _vault_maintenance/tools/check_wiki_links.py
# Paste the Python script
chmod +x _vault_maintenance/tools/check_wiki_links.py

# 2. Run it once manually
python3 _vault_maintenance/tools/check_wiki_links.py

# 3. Add to git
git add _vault_maintenance/tools/check_wiki_links.py
git commit -m "Add automated wiki-link checker"

# 4. (Optional) Add pre-commit hook
cat > .git/hooks/pre-commit <<'EOF'
#!/bin/bash
python3 _vault_maintenance/tools/check_wiki_links.py || exit 1
EOF
chmod +x .git/hooks/pre-commit

# Done! Links now checked automatically.
```

**That's it!** You now have automated link checking in <15 minutes.

---

## 📋 MAINTENANCE

### Weekly/Monthly

```bash
# Run full check
python3 _vault_maintenance/tools/check_wiki_links.py

# Check external URLs (slower, optional)
markdown-link-check *.md
```

### After Major Refactoring

```bash
# Before renaming files
python3 _vault_maintenance/tools/check_wiki_links.py

# After renaming
python3 _vault_maintenance/tools/check_wiki_links.py

# Fix any broken links found
```

### Continuous Monitoring

GitHub Actions runs automatically:
- On every push to main
- On every pull request
- Weekly (scheduled)

No manual intervention needed!

---

## 💡 TIPS & TRICKS

### Speed Up Checks

```bash
# Check only changed files
git diff --name-only | grep '\.md$' | while read file; do
    python3 _vault_maintenance/tools/check_wiki_links.py "$file"
done
```

### Generate Link Report

Add to `check_wiki_links.py`:
```python
def generate_report(self, output_file='link_report.md'):
    """Generate markdown report of all links."""
    with open(output_file, 'w') as f:
        f.write(f"# Link Report\n\n")
        f.write(f"- Total links: {self.link_count}\n")
        f.write(f"- Valid links: {self.link_count - self.broken_count}\n")
        # ... more stats
```

### Integrate with VS Code

Add to `.vscode/tasks.json`:
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Check Links",
      "type": "shell",
      "command": "python3 _vault_maintenance/tools/check_wiki_links.py",
      "problemMatcher": [],
      "presentation": {
        "reveal": "always"
      }
    }
  ]
}
```

Run with `Ctrl+Shift+B` → "Check Links"

---

## ✅ VALIDATION

After setup, test with intentional broken link:

```bash
# 1. Add broken link
echo "[[Nonexistent_File]]" >> test.md
git add test.md

# 2. Try to commit
git commit -m "test"

# Expected: Pre-commit hook catches broken link
# ❌ Broken links found!
# test.md
#   Line    1: [[Nonexistent_File]]

# 3. Fix and retry
git reset HEAD test.md
rm test.md
```

If this works, your link checker is properly installed! ✅

---

**Total Setup Time**: ~1-2 hours first time, ~15 minutes for future projects
**Maintenance**: ~0 minutes (runs automatically)
**Value**: Prevents broken links forever ✅
