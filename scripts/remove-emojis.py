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
            u'\U0001F1E0-\U0001F1FF'  # Regional Indicator Symbols (flag emojis)
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
        
        # Replace Unicode subscripts/superscripts with regular text (pdflatex can't handle them)
        # Subscripts: ₀₁₂₃₄₅₆₇₈₉
        subscript_map = {
            u'\u2080': '0', u'\u2081': '1', u'\u2082': '2', u'\u2083': '3', 
            u'\u2084': '4', u'\u2085': '5', u'\u2086': '6', u'\u2087': '7',
            u'\u2088': '8', u'\u2089': '9'
        }
        # Superscripts: ⁰¹²³⁴⁵⁶⁷⁸⁹
        superscript_map = {
            u'\u2070': '0', u'\u00B9': '1', u'\u00B2': '2', u'\u00B3': '3',
            u'\u2074': '4', u'\u2075': '5', u'\u2076': '6', u'\u2077': '7',
            u'\u2078': '8', u'\u2079': '9'
        }
        
        for char, replacement in subscript_map.items():
            content = content.replace(char, replacement)
        for char, replacement in superscript_map.items():
            content = content.replace(char, replacement)
        
        # Replace other problematic Unicode characters that pdflatex can't handle
        # Mathematical operators and symbols
        unicode_replacements = {
            u'\u2260': '!=',      # ≠ (not equal)
            u'\u2264': '<=',      # ≤ (less than or equal)
            u'\u2265': '>=',      # ≥ (greater than or equal)
            u'\u2212': '-',       # − (minus sign)
            u'\u00B0': ' degrees', # ° (degree sign)
            u'\u00A0': ' ',       # Non-breaking space -> regular space
            u'\u2013': '-',       # – (en dash)
            u'\u2014': '--',      # — (em dash)
            u'\u2018': "'",       # ' (left single quotation)
            u'\u2019': "'",       # ' (right single quotation)
            u'\u201C': '"',       # " (left double quotation)
            u'\u201D': '"',       # " (right double quotation)
            u'\u2026': '...',     # … (ellipsis)
        }
        
        for char, replacement in unicode_replacements.items():
            content = content.replace(char, replacement)
        
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

