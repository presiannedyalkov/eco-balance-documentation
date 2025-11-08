#!/usr/bin/env python3
"""Verify all internal links resolve correctly."""

import re
from pathlib import Path

def check_link(source_file, link_path):
    """Check if a wiki-link resolves to an existing file."""
    source_dir = source_file.parent

    # Remove any alias text (e.g., "DOC|Display Text" -> "DOC")
    if '|' in link_path:
        link_path = link_path.split('|')[0]

    # Handle relative links (../ or ../../)
    if link_path.startswith('../'):
        # Navigate up from source directory
        target = source_dir / link_path
        target = target.resolve()

        # Try with .md extension
        if target.with_suffix('.md').exists():
            return True, "OK"
        elif target.exists():
            return True, "OK"
        else:
            return False, f"NOT FOUND: {target}"

    # Handle absolute references from root (e.g., "30_Business_Model")
    elif not '/' in link_path:
        # Could be in root or same directory
        # First try same directory
        target = source_dir / f"{link_path}.md"
        if target.exists():
            return True, "OK (same dir)"

        # Then try root
        root = Path('.')
        target = root / f"{link_path}.md"
        if target.exists():
            return True, "OK (root)"

        return False, f"NOT FOUND: {link_path}"

    # Handle relative references within subdirectories
    else:
        target = source_dir / f"{link_path}.md"
        if target.exists():
            return True, "OK"
        else:
            return False, f"NOT FOUND: {link_path}"

def verify_file(filepath):
    """Verify all links in a file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all wiki-links: [[link]] or [[link|text]]
    links = re.findall(r'\[\[([^\]]+?)\]\]', content)

    broken = []
    for link in links:
        # Skip external links or special patterns
        if link.startswith('http') or link.startswith('#'):
            continue

        is_valid, status = check_link(filepath, link)
        if not is_valid:
            broken.append(f"  ❌ {link}: {status}")

    return broken

def main():
    """Verify all implementation task files."""
    base_path = Path('implementation_tasks')
    all_broken = {}
    total_links = 0
    total_broken = 0

    print("=" * 60)
    print("LINK VERIFICATION REPORT")
    print("=" * 60)

    for md_file in sorted(base_path.rglob('*.md')):
        broken = verify_file(md_file)
        total_links += len(re.findall(r'\[\[([^\]]+?)\]\]', md_file.read_text()))

        if broken:
            all_broken[str(md_file)] = broken
            total_broken += len(broken)

    if all_broken:
        print("\n❌ BROKEN LINKS FOUND:\n")
        for filepath, links in all_broken.items():
            print(f"📄 {filepath}:")
            for link in links:
                print(link)
            print()
        print(f"\n{'=' * 60}")
        print(f"❌ FAILED: Found {total_broken} broken links in {len(all_broken)} files")
        print(f"Total links checked: {total_links}")
        print("=" * 60)
        return 1
    else:
        print("\n✅ ALL LINKS VERIFIED - No broken links found!")
        print(f"\nTotal links checked: {total_links}")
        print("=" * 60)
        return 0

if __name__ == '__main__':
    exit(main())
