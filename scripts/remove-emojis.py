#!/usr/bin/env python3
"""
Remove emojis and problematic Unicode characters from markdown files
for PDF export compatibility.
"""

import re
import sys

def remove_emojis(input_file, output_file):
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove emojis and problematic Unicode characters
        # Includes: emojis, box-drawing characters, and other problematic Unicode
        emoji_pattern = re.compile('['
            u'\U0001F300-\U0001F9FF'  # Miscellaneous Symbols and Pictographs
            u'\U0001FA00-\U0001FAFF'  # Symbols and Pictographs Extended-A
            u'\u2600-\u26FF'          # Miscellaneous Symbols
            u'\u2700-\u27BF'          # Dingbats
            u'\uFE00-\uFE0F'          # Variation Selectors
            u'\u200D'                 # Zero Width Joiner
            u'\u200B'                 # Zero Width Space
            u'\u2500-\u257F'          # Box Drawing characters (├, ─, │, etc.)
            u'\u2580-\u259F'          # Block Elements
            u'\u25A0-\u25FF'          # Geometric Shapes
            u'\u23F0-\u23FF'          # Timer/clock symbols (⏳, etc.)
            ']+', flags=re.UNICODE)
        
        content = emoji_pattern.sub(' ', content)
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        return True
    except Exception as e:
        # Fallback: just copy the file
        import shutil
        shutil.copy(input_file, output_file)
        return False

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: remove-emojis.py <input> <output>", file=sys.stderr)
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    remove_emojis(input_file, output_file)

