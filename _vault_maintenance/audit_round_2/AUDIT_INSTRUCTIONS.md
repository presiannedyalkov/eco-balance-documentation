# 🔍 AUDIT ROUND 2 - COMPREHENSIVE QUALITY AUDIT

**Version**: 2.0
**Scope**: Option B (HIGH + MEDIUM Priority)
**Date**: 2025-11-08

---

## 🎯 MISSION

Conduct a comprehensive quality audit on assigned files to identify issues for fixing. This is an AUDIT phase - find and document problems, but DO NOT fix them.

**Critical Rule**: Audit ALL files assigned to you. NO SAMPLING. Read every file completely.

---

## 👥 AUDIT PERSONAS (Use All 6)

Apply each persona's perspective to every file:

### 1. 📊 CURATOR
**Focus**: Content quality, accuracy, completeness
- Are facts accurate and up-to-date?
- Is information complete or missing critical details?
- Are examples/data realistic and aligned with v2.0 Bootstrap Model?
- Is content well-structured and logical?

### 2. 🧹 JANITOR
**Focus**: Organization, file placement, naming, structure
- Are files in the correct directories?
- Do filenames follow conventions?
- Is formatting consistent (headers, lists, tables)?
- Are there broken internal links?

### 3. 📚 LIBRARIAN
**Focus**: Cross-references, links, documentation flow
- Do all internal links work correctly?
- Are cross-references accurate and helpful?
- Is navigation between documents clear?
- Are references to other docs up-to-date?

### 4. 🔍 AUDITOR
**Focus**: Consistency, standards compliance
- Are numbers/budgets consistent across documents?
- Does content align with v2.0 Bootstrap Model standards?
- Are there contradictions between files?
- Do calculations add up correctly?

### 5. 📜 ARCHIVIST
**Focus**: Version control, history, documentation
- Are version references correct (should be 2.0.0)?
- Is historical context preserved where relevant?
- Are change logs accurate?
- Is archival structure appropriate?

### 6. ✅ QUALITY INSPECTOR
**Focus**: Overall quality, professionalism, polish
- Is writing clear and professional?
- Are there typos, grammar issues, or unclear phrasing?
- Is tone consistent throughout?
- Does content meet publication quality standards?

---

## 📋 AUDIT PROCEDURE

For EACH file assigned to you:

### Step 1: Read Completely
- Read the ENTIRE file from start to finish
- Take notes on any issues you notice
- Consider all 6 persona perspectives

### Step 2: Document Issues
For each issue found, record:
- **File**: Path to the file
- **Persona**: Which persona found it (Curator, Janitor, etc.)
- **Severity**: CRITICAL / HIGH / MEDIUM / LOW
- **Location**: Line number or section
- **Issue**: Clear description of the problem
- **Fix Needed**: What should be done to fix it

### Step 3: Categorize by Severity

**🚨 CRITICAL** - Blocks project use, major errors
- Factually wrong information that could harm the project
- Broken critical navigation/links
- Major calculation errors
- Security/legal issues

**🔴 HIGH** - Significant issues affecting quality
- Missing important information
- Inconsistent data across documents
- Unclear or confusing critical sections
- Multiple broken links

**🟡 MEDIUM** - Quality improvements needed
- Minor inconsistencies
- Formatting issues
- Unclear phrasing
- Single broken links

**🟢 LOW** - Nice-to-have improvements
- Typos and grammar
- Minor formatting polish
- Optimization opportunities

---

## 📝 OUTPUT FORMAT

Create findings in this format:

```markdown
## File: [filepath]

### Issue 1: [Brief Title]
- **Persona**: [Curator/Janitor/Librarian/Auditor/Archivist/Quality Inspector]
- **Severity**: [CRITICAL/HIGH/MEDIUM/LOW]
- **Location**: Line [X] or Section "[Section Name]"
- **Issue**: [Detailed description]
- **Fix Needed**: [What to do]

### Issue 2: [Brief Title]
...
```

---

## 🔍 SPECIFIC THINGS TO CHECK

### v2.0 Bootstrap Model Alignment
- Project scale: 1 hectare (NOT 5-10 hectares)
- Budget: €20,000-€30,000 (NOT €250,000-€500,000)
- Timeline: 12-18 months for first site
- Team: 2-4 people initially

### Common Issues from Round 1
- Incorrect document references (e.g., pointing to renamed files)
- Inconsistent version numbers (should be 2.0.0)
- Budget mismatches between documents
- Missing cross-references
- Outdated process documentation

### Link Checking
- All `[[internal_links]]` work
- All `[markdown](links)` work
- References to implementation task files are correct
- Hub file (00_Eco_Balance_Hub.md (root)) links are accurate

---

## ⚠️ WHAT NOT TO DO

- ❌ **DO NOT SAMPLE** - Audit all assigned files completely
- ❌ **DO NOT FIX** - This is audit phase, not fix phase
- ❌ **DO NOT SKIP** - Every file must be reviewed
- ❌ **DO NOT ASSUME** - If unsure, document it as a potential issue
- ❌ **DO NOT EDIT FILES** - Only document findings

---

## 📤 DELIVERABLES

1. **Findings File**: `AUDIT_FINDINGS_AGENT_[XX].md`
   - All issues documented in standardized format
   - Grouped by file
   - Sorted by severity within each file

2. **Summary Stats**: At top of findings file
   - Total files audited: [X]
   - Total issues found: [X]
   - Issues by severity: CRITICAL [X], HIGH [X], MEDIUM [X], LOW [X]
   - Issues by persona: [breakdown]

3. **Pull Request**:
   - Branch name: `audit-round-2/agent-[XX]`
   - PR title: "Audit Round 2: Agent [XX] Findings"
   - Include findings file only (do not modify source files)

---

## ✅ QUALITY CHECKLIST

Before submitting:

- [ ] All assigned files were read completely (no sampling)
- [ ] All 6 personas were applied to each file
- [ ] Issues are clearly documented with severity levels
- [ ] File paths and line numbers are accurate
- [ ] Fix recommendations are actionable
- [ ] Summary statistics are included
- [ ] Findings file follows the standard format
- [ ] PR created with correct branch naming

---

## 🚀 EXECUTION PROMPT

When you're ready to execute as an agent, use:

```
I am Agent [XX] for Audit Round 2. Read my assignment file at: /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AGENT_[XX]_FILES.md

Then audit ALL files listed using the criteria in: /home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2/AUDIT_INSTRUCTIONS.md

Create comprehensive findings and submit a PR.
```

---

**Remember**: Quality over speed. Complete audits > fast sampling.
