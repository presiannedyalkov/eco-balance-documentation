#!/bin/bash

# Export Documentation to EPUB and PDF
# This script exports the documentation repository to EPUB and PDF formats
# using Pandoc for offline reading and distribution.

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
EXPORT_DIR="exports"
VERSION=$(cat VERSION 2>/dev/null || echo "unknown")
EXPORT_DATE=$(date +"%Y-%m-%d")
TITLE="Eco Balance Documentation"
AUTHOR="Eco Balance Project"
PUBLISHER="Eco Balance"

# Directories to include
INCLUDE_DIRS=(
  "strategic"
  "docs"
)

# Directories to exclude
EXCLUDE_PATTERNS=(
  "_vault_maintenance"
  "_process"
  "_templates"
  "_versions"
  "archive"
  "implementation_tasks"
  "ai_skills"
  "node_modules"
  ".git"
  "exports"
  "*.backup"
)

# Files to include (main entry points)
INCLUDE_FILES=(
  "README.md"
  "CONTRIBUTING.md"
)

echo -e "${GREEN}📚 Eco Balance Documentation Export${NC}"
echo "=========================================="
echo ""

# Check if Pandoc is installed
if ! command -v pandoc &> /dev/null; then
    echo -e "${RED}❌ Error: Pandoc is not installed${NC}"
    echo ""
    echo "Please install Pandoc:"
    echo "  Ubuntu/Debian: sudo apt-get install pandoc"
    echo "  macOS: brew install pandoc"
    echo "  Windows: choco install pandoc"
    echo ""
    echo "For PDF support, you also need:"
    echo "  Ubuntu/Debian: sudo apt-get install texlive-latex-base texlive-fonts-recommended"
    echo "  macOS: brew install basictex"
    echo ""
    exit 1
fi

# Check Pandoc version
PANDOC_VERSION=$(pandoc --version | head -n 1)
echo -e "${GREEN}✓${NC} Found: $PANDOC_VERSION"
echo ""

# Create export directory
mkdir -p "$EXPORT_DIR"
echo -e "${GREEN}✓${NC} Created export directory: $EXPORT_DIR"
echo ""

# Create temporary directory for processing
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

echo -e "${YELLOW}📝 Collecting documentation files...${NC}"

# Function to check if file should be excluded
should_exclude() {
    local file="$1"
    for pattern in "${EXCLUDE_PATTERNS[@]}"; do
        if [[ "$file" == *"$pattern"* ]]; then
            return 0
        fi
    done
    return 1
}

# Collect all markdown files
FILES=()

# Add main files
for file in "${INCLUDE_FILES[@]}"; do
    if [ -f "$file" ]; then
        FILES+=("$file")
    fi
done

# Add files from include directories
for dir in "${INCLUDE_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        while IFS= read -r -d '' file; do
            if ! should_exclude "$file"; then
                FILES+=("$file")
            fi
        done < <(find "$dir" -name "*.md" -type f -print0 2>/dev/null | sort -z)
    fi
done

# Filter out backup files and detailed guides (keep only main strategic files)
FILTERED_FILES=()
for file in "${FILES[@]}"; do
    # Skip backup files
    if [[ "$file" == *.backup ]]; then
        continue
    fi
    # Skip detailed guide files (keep only main files)
    if [[ "$file" == *"a_"* ]] || [[ "$file" == *"b_"* ]] || [[ "$file" == *"c_"* ]] || \
       [[ "$file" == *"d_"* ]] || [[ "$file" == *"e_"* ]] || [[ "$file" == *"f_"* ]] || \
       [[ "$file" == *"g_"* ]]; then
        continue
    fi
    FILTERED_FILES+=("$file")
done

FILE_COUNT=${#FILTERED_FILES[@]}
echo -e "${GREEN}✓${NC} Found $FILE_COUNT documentation files"
echo ""

if [ $FILE_COUNT -eq 0 ]; then
    echo -e "${RED}❌ Error: No documentation files found${NC}"
    exit 1
fi

# Create combined markdown file
COMBINED_FILE="$TEMP_DIR/combined.md"
echo -e "${YELLOW}📄 Creating combined document...${NC}"

# Add title page
cat > "$COMBINED_FILE" <<EOF
---
title: "$TITLE"
author: "$AUTHOR"
date: "$EXPORT_DATE"
version: "$VERSION"
---

# $TITLE

**Version:** $VERSION  
**Export Date:** $EXPORT_DATE  
**Author:** $AUTHOR

---

# Table of Contents

EOF

# Add table of contents entries
for file in "${FILTERED_FILES[@]}"; do
    # Extract title from first heading or filename
    TITLE_LINE=$(head -n 20 "$file" | grep -E "^# " | head -n 1 | sed 's/^# //' || basename "$file" .md)
    echo "- [$TITLE_LINE](#$(echo "$TITLE_LINE" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd '[:alnum:]-'))" >> "$COMBINED_FILE"
done

echo "" >> "$COMBINED_FILE"
echo "---" >> "$COMBINED_FILE"
echo "" >> "$COMBINED_FILE"

# Append each file
for i in "${!FILTERED_FILES[@]}"; do
    file="${FILTERED_FILES[$i]}"
    echo "Adding: $file"
    
    # Extract title from first heading
    TITLE_LINE=$(head -n 20 "$file" | grep -E "^# " | head -n 1 | sed 's/^# //' || basename "$file" .md)
    
    # Add page break before new major sections (except first file and after TOC)
    if [ $i -gt 0 ]; then
        # Add page break marker for EPUB (using HTML div that Pandoc will process)
        echo "" >> "$COMBINED_FILE"
        echo '<div style="page-break-before: always;"></div>' >> "$COMBINED_FILE"
        echo "" >> "$COMBINED_FILE"
    fi
    
    # Add file as section
    echo "" >> "$COMBINED_FILE"
    echo "# $TITLE_LINE" >> "$COMBINED_FILE"
    echo "" >> "$COMBINED_FILE"
    echo "*Source: \`$file\`*" >> "$COMBINED_FILE"
    echo "" >> "$COMBINED_FILE"
    
    # Remove frontmatter if present and add content
    if grep -q "^---" "$file"; then
        # Skip frontmatter (between first two --- lines)
        sed -n '/^---$/,/^---$/!p' "$file" | sed '1d' >> "$COMBINED_FILE"
    else
        cat "$file" >> "$COMBINED_FILE"
    fi
    
    echo "" >> "$COMBINED_FILE"
    echo "---" >> "$COMBINED_FILE"
    echo "" >> "$COMBINED_FILE"
done

echo -e "${GREEN}✓${NC} Combined document created ($(wc -l < "$COMBINED_FILE") lines)"
echo ""

# Export to EPUB
echo -e "${YELLOW}📱 Exporting to EPUB...${NC}"
EPUB_FILE="$EXPORT_DIR/eco-balance-documentation-v${VERSION}-${EXPORT_DATE}.epub"

# Build EPUB with styling and page breaks
EPUB_OPTS=(
    --from=markdown
    --to=epub3
    --output="$EPUB_FILE"
    --metadata=title:"$TITLE"
    --metadata=author:"$AUTHOR"
    --metadata=date:"$EXPORT_DATE"
    --metadata=version:"$VERSION"
    --toc
    --toc-depth=3
    --epub-chapter-level=1
    --standalone
)

# Add CSS stylesheet if available (use --css instead of --epub-stylesheet in newer Pandoc)
if [ -f "scripts/epub-style.css" ]; then
    EPUB_OPTS+=(--css="scripts/epub-style.css")
    echo "  Using custom CSS styling"
fi

# Try with cover image first, fallback without
if [ -f "docs/assets/logo.png" ]; then
    EPUB_OPTS+=(--epub-cover-image="docs/assets/logo.png")
    echo "  Adding cover image"
fi

# Generate EPUB
if pandoc "${EPUB_OPTS[@]}" "$COMBINED_FILE" 2>&1 | grep -v "WARNING" | tail -10; then
    if [ -f "$EPUB_FILE" ] && [ -s "$EPUB_FILE" ]; then
        EPUB_SIZE=$(du -h "$EPUB_FILE" | cut -f1)
        echo -e "${GREEN}✓${NC} EPUB created: $EPUB_FILE ($EPUB_SIZE)"
    else
        echo -e "${RED}❌ Error: EPUB file not created${NC}"
        exit 1
    fi
else
    echo -e "${RED}❌ Error: EPUB export failed${NC}"
    exit 1
fi
echo ""

# Export to PDF
echo -e "${YELLOW}📄 Exporting to PDF...${NC}"
PDF_FILE="$EXPORT_DIR/eco-balance-documentation-v${VERSION}-${EXPORT_DATE}.pdf"

# Check for required LaTeX packages and tools
MISSING_DEPS=()
if ! command -v rsvg-convert &> /dev/null; then
    MISSING_DEPS+=("librsvg2-bin (for SVG conversion)")
fi

# Try PDF generation with emoji/Unicode support
PDF_SUCCESS=false

# Method 1: Try HTML to PDF conversion FIRST (best Unicode/emoji support)
# HTML-to-PDF handles emojis and Unicode natively, no filtering needed
if command -v wkhtmltopdf &> /dev/null || command -v weasyprint &> /dev/null || command -v chromium &> /dev/null || command -v chromium-browser &> /dev/null || command -v google-chrome &> /dev/null || command -v chrome &> /dev/null; then
    echo "  Trying HTML to PDF conversion (preserves emojis and Unicode)..."
    
    # Create HTML with proper styling
    pandoc "$COMBINED_FILE" \
        --from=markdown \
        --to=html \
        --output="$TEMP_DIR/temp.html" \
        --standalone \
        --toc \
        --toc-depth=3 \
        --css='<style>
            @charset "UTF-8";
            body {
                font-family: "DejaVu Sans", "Liberation Sans", Arial, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                line-height: 1.6;
                color: #333;
            }
            h1, h2, h3 {
                color: #2c5aa0;
                page-break-after: avoid;
            }
            h1 {
                border-bottom: 2px solid #4a90e2;
                padding-bottom: 0.3em;
            }
            code {
                background-color: #f5f5f5;
                padding: 0.2em 0.4em;
                border-radius: 3px;
                font-family: "DejaVu Sans Mono", "Liberation Mono", monospace;
            }
            pre {
                background-color: #f5f5f5;
                padding: 1em;
                border-radius: 4px;
                overflow-x: auto;
            }
            table {
                border-collapse: collapse;
                width: 100%;
                margin: 1em 0;
            }
            th, td {
                border: 1px solid #ddd;
                padding: 0.5em;
            }
            th {
                background-color: #4a90e2;
                color: white;
            }
            @media print {
                body { padding: 0.5em; }
                h1, h2 { page-break-after: avoid; }
            }
        </style>'
    
    # Try wkhtmltopdf first
    if command -v wkhtmltopdf &> /dev/null; then
        if wkhtmltopdf \
            --page-size A4 \
            --margin-top 20mm \
            --margin-bottom 20mm \
            --margin-left 20mm \
            --margin-right 20mm \
            --encoding UTF-8 \
            --enable-local-file-access \
            "$TEMP_DIR/temp.html" \
            "$PDF_FILE" 2>/dev/null; then
            if [ -f "$PDF_FILE" ] && [ -s "$PDF_FILE" ]; then
                PDF_SUCCESS=true
                echo "    ✓ Used wkhtmltopdf (emojis preserved)"
            fi
        fi
    fi
    
    # Try WeasyPrint if wkhtmltopdf didn't work
    if [ "$PDF_SUCCESS" = false ] && command -v weasyprint &> /dev/null; then
        if weasyprint "$TEMP_DIR/temp.html" "$PDF_FILE" 2>/dev/null; then
            if [ -f "$PDF_FILE" ] && [ -s "$PDF_FILE" ]; then
                PDF_SUCCESS=true
                echo "    ✓ Used WeasyPrint (emojis preserved)"
            fi
        fi
    fi
    
    # Try headless Chrome/Chromium if available (best emoji support)
    if [ "$PDF_SUCCESS" = false ]; then
        CHROME_CMD=""
        for cmd in chromium chromium-browser google-chrome chrome; do
            if command -v "$cmd" &> /dev/null; then
                CHROME_CMD="$cmd"
                break
            fi
        done
        
        if [ -n "$CHROME_CMD" ]; then
            echo "    Trying headless Chrome/Chromium (best emoji support)..."
            HTML_PATH="file://$(realpath "$TEMP_DIR/temp.html")"
            if "$CHROME_CMD" \
                --headless \
                --disable-gpu \
                --print-to-pdf="$PDF_FILE" \
                --print-to-pdf-no-header \
                "$HTML_PATH" 2>/dev/null; then
                if [ -f "$PDF_FILE" ] && [ -s "$PDF_FILE" ]; then
                    PDF_SUCCESS=true
                    echo "    ✓ Used headless Chrome/Chromium (emojis preserved)"
                fi
            fi
        fi
    fi
fi

# Method 2: Try with xelatex (supports Unicode, but emoji support depends on fonts)
if [ "$PDF_SUCCESS" = false ] && command -v xelatex &> /dev/null; then
    echo "  Trying XeLaTeX engine (Unicode support, limited emoji support)..."
    
    if pandoc "$COMBINED_FILE" \
        --from=markdown \
        --to=pdf \
        --output="$PDF_FILE" \
        --metadata=title:"$TITLE" \
        --metadata=author:"$AUTHOR" \
        --metadata=date:"$EXPORT_DATE" \
        --metadata=version:"$VERSION" \
        --toc \
        --toc-depth=3 \
        --pdf-engine=xelatex \
        --variable=geometry:margin=1in \
        --variable=fontsize:11pt \
        --variable=documentclass:article \
        --variable=colorlinks:true \
        --variable=linkcolor:blue \
        --variable=urlcolor:blue \
        --variable=toccolor:black \
        --variable=mainfont:"Liberation Sans" \
        --variable=monofont:"Liberation Mono" \
        2>&1 | grep -v "WARNING\|rsvg-convert\|fontspec" | tail -20; then
        if [ -f "$PDF_FILE" ] && [ -s "$PDF_FILE" ]; then
            PDF_SUCCESS=true
            echo "    ✓ Used XeLaTeX (some emojis may not render)"
        fi
    fi
fi

# Method 3: Try with lualatex (supports Unicode, but emoji support depends on fonts)
if [ "$PDF_SUCCESS" = false ] && command -v lualatex &> /dev/null; then
    echo "  Trying LuaLaTeX engine (Unicode support, limited emoji support)..."
    
    if pandoc "$COMBINED_FILE" \
        --from=markdown \
        --to=pdf \
        --output="$PDF_FILE" \
        --metadata=title:"$TITLE" \
        --metadata=author:"$AUTHOR" \
        --metadata=date:"$EXPORT_DATE" \
        --metadata=version:"$VERSION" \
        --toc \
        --toc-depth=3 \
        --pdf-engine=lualatex \
        --variable=geometry:margin=1in \
        --variable=fontsize:11pt \
        --variable=documentclass:article \
        --variable=colorlinks:true \
        --variable=linkcolor:blue \
        --variable=urlcolor:blue \
        --variable=toccolor:black \
        2>&1 | grep -v "WARNING\|rsvg-convert\|font\|metric" | tail -20; then
        if [ -f "$PDF_FILE" ] && [ -s "$PDF_FILE" ]; then
            PDF_SUCCESS=true
            echo "    ✓ Used LuaLaTeX (some emojis may not render)"
        fi
    fi
fi

# Method 4: Fallback - remove emojis and use pdflatex (no emoji support)
if [ "$PDF_SUCCESS" = false ] && command -v pdflatex &> /dev/null; then
    echo "  Trying PDFLaTeX engine (removing emojis - no emoji support)..."
    
    # Function to remove emojis for pdflatex fallback
    remove_emojis() {
        local input_file="$1"
        local output_file="$2"
        if [ -f "scripts/remove-emojis.py" ] && command -v python3 &> /dev/null; then
            python3 scripts/remove-emojis.py "$input_file" "$output_file" 2>/dev/null || cp "$input_file" "$output_file"
        elif command -v python3 &> /dev/null; then
            python3 << 'PYTHON_SCRIPT'
import re
import sys
input_file = sys.argv[1]
output_file = sys.argv[2]
try:
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    emoji_pattern = re.compile('['
        u'\U0001F300-\U0001F9FF'
        u'\U0001FA00-\U0001FAFF'
        u'\u2600-\u26FF'
        u'\u2700-\u27BF'
        u'\uFE00-\uFE0F'
        u'\u200D'
        u'\u200B'
        u'\u2500-\u257F'
        u'\u2580-\u259F'
        u'\u25A0-\u25FF'
        u'\u23F0-\u23FF'  # Timer/clock symbols (⏳, etc.)
        ']+', flags=re.UNICODE)
    content = emoji_pattern.sub(' ', content)
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)
except:
    import shutil
    shutil.copy(input_file, output_file)
PYTHON_SCRIPT
 "$input_file" "$output_file" 2>/dev/null || cp "$input_file" "$output_file"
        else
            sed 's/[🌍🌿📚📄📱✅❌⚠️🎯🟡📋📝🔗🚀👥💡💰🔧📖📊📝🌍├─│└┌┐┘┴┬┤├⏳]/ /g' "$input_file" > "$output_file" 2>/dev/null || cp "$input_file" "$output_file"
        fi
    }
    
    TEMP_PDF_INPUT="$TEMP_DIR/combined-pdf.md"
    remove_emojis "$COMBINED_FILE" "$TEMP_PDF_INPUT"
    
    if pandoc "$TEMP_PDF_INPUT" \
        --from=markdown \
        --to=pdf \
        --output="$PDF_FILE" \
        --metadata=title:"$TITLE" \
        --metadata=author:"$AUTHOR" \
        --metadata=date:"$EXPORT_DATE" \
        --metadata=version:"$VERSION" \
        --toc \
        --toc-depth=3 \
        --pdf-engine=pdflatex \
        --variable=geometry:margin=1in \
        --variable=fontsize:11pt \
        --variable=documentclass:article \
        --variable=colorlinks:true \
        --variable=linkcolor:blue \
        --variable=urlcolor:blue \
        --variable=toccolor:black \
        2>&1 | grep -v "WARNING\|rsvg-convert" | tail -20; then
        if [ -f "$PDF_FILE" ] && [ -s "$PDF_FILE" ]; then
            PDF_SUCCESS=true
            echo "    ✓ Used PDFLaTeX (emojis removed)"
        fi
    fi
fi


# Report results
if [ "$PDF_SUCCESS" = true ] && [ -f "$PDF_FILE" ] && [ -s "$PDF_FILE" ]; then
    PDF_SIZE=$(du -h "$PDF_FILE" | cut -f1)
    echo -e "${GREEN}✓${NC} PDF created: $PDF_FILE ($PDF_SIZE)"
else
    echo -e "${YELLOW}⚠${NC}  PDF export failed"
    if [ ${#MISSING_DEPS[@]} -gt 0 ]; then
        echo "Missing dependencies:"
        for dep in "${MISSING_DEPS[@]}"; do
            echo "  - $dep"
        done
        echo ""
        echo "Install with:"
        echo "  Ubuntu/Debian: sudo apt-get install librsvg2-bin texlive-latex-extra"
        echo "  macOS: brew install librsvg basictex"
    else
        echo "PDF generation failed. EPUB export completed successfully."
        echo "You may need additional LaTeX packages:"
        echo "  sudo apt-get install texlive-latex-extra texlive-fonts-extra"
    fi
fi
echo ""

# Summary
echo -e "${GREEN}✅ Export Complete!${NC}"
echo "=========================================="
echo ""
echo "Exported files:"
if [ -f "$EPUB_FILE" ]; then
    echo "  📱 EPUB: $EPUB_FILE"
fi
if [ -f "$PDF_FILE" ]; then
    echo "  📄 PDF:  $PDF_FILE"
fi
echo ""
echo "Files included: $FILE_COUNT documentation files"
echo "Version: $VERSION"
echo "Date: $EXPORT_DATE"
echo ""

