# Persona Coordination Workflow

## Purpose
Personas work together as a team. This workflow defines how they coordinate, share information, and avoid conflicts.

## Coordination Principles

1. **Information Flows Freely**: State files are the communication medium
2. **No Duplicate Work**: Check what others have found before analyzing
3. **Respect Domains**: Each persona has primary responsibility for their area
4. **Collaborative Problem-Solving**: Complex issues may need multiple personas
5. **Sequential When Needed**: Some analyses depend on others completing first

## Coordination Matrix

| Persona | Works Closely With | Shares What | Needs From Them |
|---------|-------------------|-------------|-----------------|
| Janitor | All | File movements, organization changes | Heads-up before major content changes |
| Curator | Librarian, Auditor | Content gaps, cross-reference issues | Navigation structure, completeness data |
| Archivist | Janitor, Auditor | Migration plans, version info | Organization baseline, completeness data |
| Auditor | All | Completeness gaps, inconsistencies | Domain-specific findings |
| Librarian | Curator, Janitor | Broken links, orphan documents | File movements, content relationships |
| Quality Inspector | All | Formatting issues, style violations | Domain-specific concerns |

## Information Sharing Mechanism

### State Files
Each persona updates their state file with:
- **Coordination Notes** section
- **Information for Other Personas** subsection
- **Pending Items from Other Personas** subsection

**Example:**
```markdown
## Coordination Notes

### Information for Other Personas
**For Librarian**: 15 files were moved in this analysis. 
See task JAN-2025-10-26-005 for list of file movements.

**For Curator**: Found duplicate content in files A and B. 
May need content consolidation beyond just file moves.

### Pending Items from Other Personas
**From Auditor**: Awaiting completeness baseline before 
deep organizational restructuring.
```

## Coordination Patterns

### Pattern 1: Sequential Analysis

**When:** One persona's work depends on another's completion

**Example Flow:**
1. Janitor establishes file organization baseline
2. Librarian maps navigation (needs stable file structure)
3. Curator assesses content (needs working cross-references)
4. Quality Inspector polishes (needs stable content)

**Process:**
- First persona completes analysis and tasks
- Updates state file with relevant information
- Next persona reads predecessor's state before starting
- Incorporates findings into their analysis

### Pattern 2: Parallel Analysis

**When:** Personas can work independently

**Example:**
- Janitor checks file organization
- Quality Inspector checks formatting
- Both happening simultaneously

**Process:**
- Both personas run analyses independently
- Each updates their own state file
- Review coordination notes after both complete
- Create integration tasks if needed

### Pattern 3: Collaborative Problem-Solving

**When:** Issue spans multiple persona domains

**Example:** 
Content is scattered across files (Janitor), duplicated (Curator), 
with broken links (Librarian), and inconsistent data (Auditor)

**Process:**
1. First persona to discover issue documents it fully
2. Tags issue with multiple persona codes in task
3. Notes which other personas should be involved
4. Other personas add their perspective when they analyze
5. Synthesize into comprehensive solution

### Pattern 4: Triggered Analysis

**When:** One persona's findings suggest another should analyze

**Example:**
- Janitor finds major file disorganization
- Suggests Librarian should check links after files move
- Librarian analysis is triggered out of normal schedule

**Process:**
1. First persona notes trigger in state file
2. Creates recommendation for specific persona to analyze
3. Notes urgency and specific focus areas
4. Tagged persona runs focused analysis

## Running Multiple Personas

### First-Time Vault Analysis (Complete Baseline)

**Recommended Sequence:**
1. **Janitor** - Establish organizational baseline
2. **Archivist** - Verify version control and archives
3. **Auditor** - Check completeness and consistency
4. **Librarian** - Map navigation and links
5. **Curator** - Assess content quality
6. **Quality Inspector** - Review formatting and polish

**Timeline:** Spread over 1-2 weeks

### Regular Maintenance (Rotating Focus)

**Week 1:** Janitor + Quality Inspector
**Week 2:** Curator + Librarian  
**Week 3:** Auditor + Archivist
**Week 4:** Quick check of all personas' critical items

### Post-Major Change (Targeted)

**After Content Addition:**
- Curator (content quality)
- Auditor (completeness)
- Librarian (links updated)

**After Reorganization:**
- Janitor (verify organization)
- Librarian (fix broken links)
- Archivist (update references)

## Conflict Resolution

### Overlapping Concerns

**Example:** Both Janitor and Curator want to consolidate files

**Resolution:**
1. Janitor focuses on WHERE files should be
2. Curator focuses on WHAT content should be merged
3. Create joint task referencing both perspectives
4. Execute in two phases: content merge, then file organization

### Contradictory Recommendations

**Example:** 
- Archivist says "archive this old document"
- Curator says "this content is still referenced and needed"

**Resolution:**
1. Document the conflict in both state files
2. Review the specific case together
3. Often solution is: update/refactor content, don't archive yet
4. Create task that addresses both concerns

### Priority Conflicts

**Example:** Multiple critical tasks from different personas

**Resolution:**
1. Review impact of each task
2. Check for dependencies
3. Prioritize based on:
   - User impact
   - Blocking other work
   - Risk if not done
4. Document priority decision

## Communication Templates

### Requesting Input
```markdown
**For [Persona]**: Please check [specific area] when you next 
analyze. I found [issue] that may relate to your domain.
```

### Sharing Findings
```markdown
**For [Persona]**: FYI, I found [finding] which may affect 
your analysis of [area]. See task [task-id] for details.
```

### Noting Dependency
```markdown
**For [Persona]**: My task [task-id] depends on your 
task [task-id] being completed first. Please prioritize.
```

### Suggesting Triggered Analysis
```markdown
**For [Persona]**: Based on my findings in [area], recommend 
you run focused analysis on [specific aspect] soon.
```

## Coordination Meetings (Async)

### Monthly Review
- Read all state files
- Identify coordination opportunities
- Resolve any conflicts
- Plan next month's analysis schedule

### Post-Analysis Check
After each persona analysis:
- Review coordination notes
- Check if actions needed by other personas
- Update affected personas' pending items
- Schedule follow-up analyses if needed

## Best Practices

1. **Read Before You Analyze**: Check other personas' latest state files
2. **Write Clear Notes**: Future personas need context
3. **Tag Related Issues**: Reference related tasks from other personas
4. **Don't Duplicate**: If another persona found it, reference them
5. **Ask Questions**: Use state files to request clarification
6. **Think Holistically**: Consider vault as integrated system
7. **Respect Timing**: Honor dependencies and sequences
8. **Document Decisions**: If personas coordinated, record why

## Coordination Checklist

Before completing any analysis:
- [ ] Read relevant other personas' state files
- [ ] Note any information needed by other personas
- [ ] Document dependencies discovered
- [ ] Tag issues spanning multiple domains
- [ ] Update coordination notes section
- [ ] Check if any persona should be triggered

---

*The personas are a team. Coordination ensures they work in harmony, not conflict.*
