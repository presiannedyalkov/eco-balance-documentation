# Persona Prompt Reference Card

## Quick Persona Triggers

Just say one of these phrases to trigger an analysis:

### 🧹 Janitor (File Organization)
```
"Run the Janitor"
"Run Janitor analysis"
"Check organization"
"Check file placement"
```

### 📚 Curator (Content Quality)
```
"Run the Curator"
"Run Curator analysis"
"Check content quality"
"Check for content gaps"
```

### 🗄️ Archivist (Version & History)
```
"Run the Archivist"
"Run Archivist analysis"
"Check archives"
"Check versioning"
```

### 🔍 Auditor (Completeness & Consistency)
```
"Run the Auditor"
"Run Auditor analysis"
"Check completeness"
"Verify consistency"
```

### 📖 Librarian (Navigation & Links)
```
"Run the Librarian"
"Run Librarian analysis"
"Check navigation"
"Check links"
"Find broken links"
```

### ✨ Quality Inspector (Formatting & Polish)
```
"Run Quality Inspector"
"Run QI analysis"
"Check formatting"
"Check quality"
"Polish documentation"
```

### 🔬 Knowledge Synthesizer (Research Analysis)
```
"Run the Knowledge Synthesizer"
"Run Knowledge Synthesizer analysis"
"Synthesize research"
"Analyze bookmarks"
"Extract research insights"
```

### 🔐 Security Auditor (Information Security)
```
"Run the Security Auditor"
"Run Security Auditor analysis"
"Security scan"
"Check for sensitive data"
"Audit privacy compliance"
```

### 🛠️ Implementation Coach (Execution Planning)
```
"Run the Implementation Coach"
"Run Implementation Coach analysis"
"Create playbook"
"Create execution plan"
"Break down implementation"
```

### 🎯 Strategic Advisor (Critical Analysis)
```
"Run the Strategic Advisor"
"Run Strategic Advisor analysis"
"Challenge strategy"
"Stress-test plan"
"Find blind spots"
```

### 👥 Stakeholder Advocate (Multi-Perspective Review)
```
"Run the Stakeholder Advocate"
"Run Stakeholder Advocate analysis"
"Review stakeholder fit"
"Check stakeholder messaging"
"Assess stakeholder value"
```

---

## Task Management

```
"Execute tasks"
"Run tasks"
"Execute high priority tasks"
"Show me the task queue"
"Complete task [task-id]"
```

---

## Version Release & Git

```
"Summarize the work in this version and prepare to commit"
"Prepare version release"
"Push to remote"
"Create release notes"
```

**See:** [PROMPT_REFERENCE_VERSION.md](PROMPT_REFERENCE_VERSION.md) for details

---

## Health Checks

```
"Check vault health"
"How's my vault?"
"Vault status"
"Show me health scores"
```

---

## Multi-Persona Commands

```
"Run all personas"
"Complete baseline analysis"
"Run weekly maintenance"
"Pre-release check"
```

---

## What Happens When You Trigger

When you say **"Run the Janitor"**, the AI will:

1. ✓ Load the Janitor persona file
2. ✓ Read the current state
3. ✓ Follow the analysis checklist
4. ✓ Find and document issues
5. ✓ Create task files for each issue
6. ✓ Calculate health score
7. ✓ Report findings to you
8. ✓ Update state file

**You get:** A complete analysis report + actionable tasks

---

## Example Conversations

### Scenario 1: First Analysis
```
You: "Run the Janitor"

AI: "Running Janitor analysis on your vault. This will take 
     approximately 30-45 minutes. I'll be checking file 
     placement, naming conventions, redundancies, archive 
     structure, and directory integrity. Starting now..."
     
     [Performs analysis]
     
     "Analysis complete! Health Score: 89/100 (Good)
     
     Found 4 issues:
     - High: 1 (numbering gaps investigation)
     - Medium: 1 (archive file placement)  
     - Low: 2 (minor cleanups)
     
     Created 4 tasks in queue.
     
     Would you like me to execute the high-priority tasks now?"
```

### Scenario 2: Task Execution
```
You: "Execute high priority tasks"

AI: "Found 3 HIGH priority tasks. Executing now...
     
     Task 1: Repair broken links in hub page
     ✓ Fixed 3 broken links
     ✓ Verified all links working
     
     Task 2: Link methodology to implementation
     ✓ Added 4 cross-reference links
     ✓ Tested all connections
     
     Task 3: Investigate numbering gaps
     ✓ Checked Git history
     ✓ Documented findings
     
     All high-priority tasks completed!
     2 medium and 2 low priority tasks remain."
```

### Scenario 3: Health Check
```
You: "How's my vault?"

AI: "Vault Health Summary:
     
     🧹 Janitor: 89/100 (Good) - Minor org issues
     📚 Curator: 92/100 (Excellent) - Content is solid
     🗄️ Archivist: Not analyzed yet
     🔍 Auditor: Not analyzed yet
     📖 Librarian: 78/100 (Good) - Some broken links
     ✨ Quality Inspector: Not analyzed yet
     
     Overall: Good shape with minor issues
     Recommendation: Run Archivist and Auditor next"
```

---

## Pro Tips

**Start simple:**
```
"Run the Janitor"
```

**Then execute:**
```
"Execute high priority tasks"
```

**Check progress:**
```
"Check vault health"
```

**Rotate through personas:**
```
"Run the Curator"
"Run the Librarian"
```

---

## Need Help?

**Full documentation:** `_vault_maintenance/AI_ASSISTANT_GUIDE.md`  
**Quick start:** `_vault_maintenance/QUICKSTART.md`  
**Examples:** `_vault_maintenance/workflows/examples/`

---

**Just copy-paste any command above and let the AI do the work!** 🚀
