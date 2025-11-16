#!/bin/bash

# Quick test script for PDF export functionality
# This script helps verify that the export works correctly

set -e

echo "🧪 Testing PDF Export Functionality"
echo "===================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo "📋 Checking prerequisites..."
MISSING=0

if ! command -v pandoc &> /dev/null; then
    echo -e "${RED}❌ Pandoc not found${NC}"
    MISSING=1
else
    echo -e "${GREEN}✓${NC} Pandoc: $(pandoc --version | head -n 1)"
fi

if ! command -v pdflatex &> /dev/null; then
    echo -e "${RED}❌ PDFLaTeX not found${NC}"
    MISSING=1
else
    echo -e "${GREEN}✓${NC} PDFLaTeX: $(pdflatex --version | head -n 1)"
fi

if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python3 not found${NC}"
    MISSING=1
else
    echo -e "${GREEN}✓${NC} Python3: $(python3 --version)"
fi

if [ $MISSING -eq 1 ]; then
    echo ""
    echo -e "${RED}❌ Missing required tools. Please install them first.${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✓ All prerequisites met${NC}"
echo ""

# Run the export
echo "🚀 Running export script..."
echo ""

if ./scripts/export-docs.sh; then
    echo ""
    echo -e "${GREEN}✅ Export completed successfully!${NC}"
    echo ""
    
    # Check output files
    echo "📁 Checking output files..."
    
    EPUB_FILE=$(ls -t exports/*.epub 2>/dev/null | head -1)
    PDF_FILE=$(ls -t exports/*.pdf 2>/dev/null | head -1)
    
    if [ -f "$EPUB_FILE" ]; then
        EPUB_SIZE=$(du -h "$EPUB_FILE" | cut -f1)
        echo -e "${GREEN}✓${NC} EPUB: $EPUB_FILE ($EPUB_SIZE)"
    else
        echo -e "${RED}❌ EPUB file not found${NC}"
    fi
    
    if [ -f "$PDF_FILE" ]; then
        PDF_SIZE=$(du -h "$PDF_FILE" | cut -f1)
        echo -e "${GREEN}✓${NC} PDF:  $PDF_FILE ($PDF_SIZE)"
        
        # Verify PDF is valid
        if file "$PDF_FILE" | grep -q "PDF document"; then
            echo -e "${GREEN}✓${NC} PDF file is valid"
        else
            echo -e "${RED}❌ PDF file appears to be invalid${NC}"
        fi
        
        # Try to get page count (if pdftk or similar is available)
        if command -v pdfinfo &> /dev/null; then
            PAGES=$(pdfinfo "$PDF_FILE" 2>/dev/null | grep "Pages:" | awk '{print $2}')
            if [ -n "$PAGES" ]; then
                echo -e "${GREEN}✓${NC} PDF has $PAGES pages"
            fi
        fi
    else
        echo -e "${RED}❌ PDF file not found${NC}"
    fi
    
    echo ""
    echo "📖 To view the files:"
    echo "   EPUB: Open with an e-reader app (Calibre, Kindle, etc.)"
    echo "   PDF:  Open with any PDF viewer"
    echo ""
    echo "   Or on Linux:"
    if command -v xdg-open &> /dev/null; then
        echo "   xdg-open $PDF_FILE"
    fi
    
else
    echo ""
    echo -e "${RED}❌ Export failed. Check the error messages above.${NC}"
    exit 1
fi

