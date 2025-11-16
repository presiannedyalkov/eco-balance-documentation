# Documentation Export Guide

**Purpose:** Guide for exporting documentation to EPUB and PDF formats  
**Last Updated:** November 13, 2025

---

## Overview

The documentation can be exported to portable formats (EPUB and PDF) for offline reading, e-reader compatibility, and distribution.

---

## Prerequisites

### Required Tools

1. **Pandoc** - Document converter
   - Ubuntu/Debian: `sudo apt-get install pandoc`
   - macOS: `brew install pandoc`
   - Windows: `choco install pandoc`

2. **For PDF Export** - LaTeX engine and dependencies:
   - Ubuntu/Debian: 
     ```bash
     sudo apt-get install \
       texlive-latex-base \
       texlive-fonts-recommended \
       texlive-latex-extra \
       texlive-xetex \
       librsvg2-bin \
       fonts-dejavu-core \
       fonts-dejavu-extra
     ```
   - macOS: `brew install basictex librsvg`
   - Alternative: `wkhtmltopdf` (HTML to PDF converter)

---

## Manual Export

### Using the Export Script

Run the export script to generate both EPUB and PDF:

```bash
./scripts/export-docs.sh
```

The script will:
1. Collect all documentation files from `strategic/` and `docs/` directories
2. Exclude internal files (`_vault_maintenance/`, `_process/`, etc.)
3. Create a combined markdown document
4. Export to EPUB format
5. Export to PDF format (if LaTeX is available)

### Output Files

Exported files are saved to the `exports/` directory:
- `eco-balance-documentation-v[DATE].epub`
- `eco-balance-documentation-v[DATE].pdf`

Example:
- `eco-balance-documentation-v2025-11-16.epub`
- `eco-balance-documentation-v2025-11-16.pdf`

**Download Links:**
- **[GitHub Releases](https://github.com/presiannedyalkov/eco-balance-documentation/releases)** - All PDF and EPUB exports are listed here with direct download links

**Versioning:**
- Exports use **daily versions** (`v2025-11-16`) - date-based, created on each export
- Releases use **monthly versions** (`v2025.11`) - from `VERSION` file, for project milestones
- See [Versioning Concepts](VERSIONING_CONCEPTS.md) for details

---

## Automated Export (GitHub Actions)

### Automatic Export on Push

The export workflow runs automatically when:
- Documentation files change in `strategic/` or `docs/`
- `README.md`, `CONTRIBUTING.md`, or `VERSION` file changes
- Push to `main` branch

### Manual Trigger

You can manually trigger the export workflow:
1. Go to **Actions** tab in GitHub
2. Select **Export Documentation** workflow
3. Click **Run workflow**
4. Choose export format (both, epub, or pdf)
5. Click **Run workflow**

### Downloading Exports

Exported files are automatically attached to GitHub Releases:

- **[View all exports on GitHub Releases](https://github.com/presiannedyalkov/eco-balance-documentation/releases)**
- Each export creates a new release with the date (e.g., `export-2025-11-16`)
- Files are listed directly on the releases page with download buttons
- Releases are permanent (unlike artifacts which expire after 30 days)

---

## Export Configuration

### Included Files

The export includes:
- All files from `strategic/` directory (main files only, excludes detailed guides)
- All files from `docs/` directory
- `README.md`
- `CONTRIBUTING.md`

### Excluded Files

The export automatically excludes:
- `_vault_maintenance/` - Internal maintenance files
- `_process/` - Internal workflows
- `_templates/` - Document templates
- `_versions/` - Version snapshots
- `archive/` - Archived content
- `implementation_tasks/` - Task guides
- `ai_skills/` - AI framework
- `*.backup` - Backup files
- Detailed guide files (`*a_*`, `*b_*`, etc.) - Only main strategic files included

### Customization

To customize what's included/excluded, edit `scripts/export-docs.sh`:
- Modify `INCLUDE_DIRS` array
- Modify `EXCLUDE_PATTERNS` array
- Modify `INCLUDE_FILES` array

---

## Export Features

### EPUB Format

- Compatible with Kindle, Kobo, and other e-readers
- Table of contents with navigation
- Preserves headings and structure
- Includes metadata (title, author, version, date)

### PDF Format

- Print-friendly format
- Table of contents with page numbers
- Preserves formatting
- Includes metadata

---

## Troubleshooting

### Pandoc Not Found

**Error:** `Pandoc is not installed`

**Solution:** Install Pandoc using your package manager (see Prerequisites)

### PDF Export Fails

**Error:** PDF export fails or produces empty file

**Common Issues:**
1. **Missing LaTeX packages** (e.g., `xcolor.sty`):
   ```bash
   sudo apt-get install texlive-latex-extra texlive-fonts-extra
   ```

2. **Missing SVG converter** (`rsvg-convert`):
   ```bash
   sudo apt-get install librsvg2-bin
   ```

3. **Missing XeLaTeX** (for better Unicode support):
   ```bash
   sudo apt-get install texlive-xetex
   ```

**Solutions:**
1. Install all dependencies:
   ```bash
   sudo apt-get install \
     texlive-latex-base \
     texlive-fonts-recommended \
     texlive-latex-extra \
     texlive-xetex \
     librsvg2-bin \
     fonts-dejavu-core \
     fonts-dejavu-extra
   ```

2. Or use wkhtmltopdf as alternative: `sudo apt-get install wkhtmltopdf`
3. EPUB export should still work even if PDF fails

### Large File Sizes

**Issue:** Exported files are very large

**Solutions:**
1. Exclude detailed guide files (already done by default)
2. Export specific sections only (modify script)
3. Use compression for distribution

### Missing Images

**Issue:** Images don't appear in exported files

**Solution:** 
- Images in `docs/assets/` should be included
- Check image paths in markdown files
- Consider using absolute paths or copying images to export directory

---

## Best Practices

1. **Test Exports Regularly** - Verify exports work after major documentation changes
2. **Check File Sizes** - Large files may be difficult to distribute
3. **Review Table of Contents** - Ensure navigation works correctly
4. **Test on Target Devices** - Test EPUB on actual e-readers
5. **Version Control** - Keep exported files versioned or archived

---

## Future Enhancements

Potential improvements:
- Custom export templates (different styling)
- Section-specific exports (e.g., only strategic files)
- Image optimization for smaller file sizes
- Multi-language exports
- Automated release creation with exports

---

**Last Updated:** November 13, 2025

