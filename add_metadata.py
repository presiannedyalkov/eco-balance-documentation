#!/usr/bin/env python3
"""Add standard metadata to all implementation task files."""

from pathlib import Path
from datetime import date

METADATA_TEMPLATE = """---
**Document Version:** 2.0.0
**Last Updated:** {date}
**Status:** Active
**Aligned with:** Bootstrap Model v2.0
---

"""

def add_metadata(filepath):
    """Add metadata to file if missing."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if metadata already exists at the start
    if content.startswith('---\n**Document Version:'):
        return False, "Already has proper metadata"

    # Add metadata
    today = date.today().strftime('%Y-%m-%d')
    new_content = METADATA_TEMPLATE.format(date=today) + content

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    return True, "Metadata added"

def main():
    """Process all implementation task files."""
    base_path = Path('implementation_tasks')
    added_count = 0
    skipped_count = 0

    for md_file in base_path.rglob('*.md'):
        if md_file.name == 'README.md' or md_file.name.startswith('00_'):
            continue

        added, status = add_metadata(md_file)
        if added:
            added_count += 1
            print(f"✓ {md_file}: {status}")
        else:
            skipped_count += 1

    print(f"\n✅ Added metadata to {added_count} files")
    print(f"⏭️  Skipped {skipped_count} files (already had metadata)")

if __name__ == '__main__':
    main()
