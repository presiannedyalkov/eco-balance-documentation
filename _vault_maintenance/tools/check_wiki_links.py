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

        print(f"  Found {len(self.all_md_files) // 2} markdown files")

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
            # Direct relative path from source directory
            (source_dir / f"{clean_target}.md").relative_to(self.root_dir) if not target.startswith('/') else None,
            # Relative with ../ (already in target)
            (source_dir / f"{target}.md").relative_to(self.root_dir) if '/' in target else None,
            # Root-level file
            Path(f"{clean_target}.md"),
            # With .md extension already
            Path(f"{target}") if target.endswith('.md') else None,
        ]

        for candidate in candidates:
            if candidate is None:
                continue
            try:
                if str(candidate) in self.all_md_files:
                    return True
                if str(candidate.with_suffix('')) in self.all_md_files:
                    return True
            except ValueError:
                # Path outside root
                continue

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
