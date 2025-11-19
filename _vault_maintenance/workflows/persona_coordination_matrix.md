# Persona Coordination Matrix

## Quick Reference: Who Works With Whom

| Persona | Primary Partners | Secondary Partners | Key Information Shared |
|---------|-----------------|-------------------|----------------------|
| 🧹 Janitor | All | - | File movements, organization changes |
| 📚 Curator | Librarian, Auditor | Janitor, Archivist | Content gaps, cross-references |
| 🗄️ Archivist | Janitor, Auditor | All | Version info, migration plans |
| 🔍 Auditor | All | - | Completeness gaps, inconsistencies |
| 📖 Librarian | Curator, Janitor | Quality Inspector | Links, navigation, orphans |
| ✨ Quality Inspector | All | - | Formatting issues, style violations |

## Detailed Coordination Patterns

### 🧹 Janitor Coordinates With:

**Everyone** - As the organizational foundation
- **Before They Analyze**: Provides stable file structure baseline
- **Shares**: File movements, renamed files, reorganization plans
- **Needs**: Heads-up before major content additions that will need organization

### 📚 Curator Coordinates With:

**Librarian** - Content & Navigation Partnership
- Shares: Content relationship maps, missing cross-references
- Needs: Navigation structure info, link validity data
- Why: Content connections inform navigation design

**Auditor** - Content & Compliance Partnership  
- Shares: Content completeness findings, gaps identified
- Needs: Consistency data, standards for content quality
- Why: Both focus on completeness from different angles

### 🗄️ Archivist Coordinates With:

**Janitor** - Organization & History Partnership
- Shares: What should be archived, version documentation
- Needs: Organization baseline before migrations
- Why: Archiving is special case of organization

**Auditor** - Versioning & Compliance Partnership
- Shares: Version history, historical context
- Needs: Completeness verification for archives
- Why: Both ensure nothing is lost or missing

### 🔍 Auditor Coordinates With:

**Everyone** - Verification Foundation
- **Before Analyzing**: Reviews all other personas' findings
- **Shares**: Completeness baselines, consistency issues, standards violations
- **Needs**: Domain-specific data from each persona
- **Why**: Provides verification layer for all other work

### 📖 Librarian Coordinates With:

**Janitor** - Structure & Navigation Partnership
- Shares: Broken links from file movements, orphaned content
- Needs: File movement notifications to update links
- Why: Organization changes directly impact navigation

**Curator** - Navigation & Content Partnership
- Shares: Navigation effectiveness data, discoverability issues
- Needs: Content relationship maps
- Why: Navigation should follow content relationships

### ✨ Quality Inspector Coordinates With:

**Everyone** - Polish Layer
- **After Others Analyze**: Reviews quality of all documentation
- **Shares**: Formatting issues, style violations, readability concerns
- **Needs**: Domain content to be stable before polishing
- **Why**: Quality review is final layer on top of other work

## Coordination Timing

### Sequential Dependencies

```
1. Janitor (organization baseline)
   ↓
2. Archivist (version/archive baseline) + Auditor (completeness baseline)
   ↓
3. Librarian (navigation mapping) + Curator (content assessment)
   ↓
4. Quality Inspector (polish & formatting)
```

### Parallel Opportunities

**Can Run Simultaneously:**
- Janitor + Quality Inspector (different domains)
- Archivist + Auditor (different focus)
- Librarian + Curator (share findings)

**Cannot Run Simultaneously:**
- Janitor before Librarian (need stable files for link checking)
- Curator before Quality Inspector (content before polish)

## Communication Channels

### Via State Files
Primary method - each persona updates their state file with coordination notes

**Format:**
```markdown
## Coordination Notes

### Information for Other Personas
**For [Persona]**: [Specific information or finding]

### Pending Items from Other Personas  
**From [Persona]**: [What I'm waiting for]
```

### Via Task References
Link related tasks when issues span multiple domains

**Format:**
```yaml
notes: |
  Related to Curator task CUR-2025-10-26-012
  Coordinate with Librarian on link updates
```

### Via Recommendations
Suggest when another persona should analyze

**Format:**
```markdown
## Recommendations

### Triggered Analyses
Recommend Librarian run focused analysis on navigation after these 
file movements are completed.
```

## Conflict Resolution

### Issue: Overlapping Recommendations

**Example:** Janitor wants to move file, Curator wants to expand it first

**Resolution:**
1. Curator expands content (task priority)
2. Then Janitor moves to proper location
3. Then Librarian updates links

**Principle:** Content work before organization work

### Issue: Contradictory Priorities

**Example:** Multiple CRITICAL tasks from different personas

**Resolution:**
1. Check dependencies (what blocks what)
2. Consider user impact (what's most visible)
3. Evaluate risk (what could cause problems)
4. Document decision in both state files

### Issue: Duplicate Findings

**Example:** Both Auditor and Curator find same missing content

**Resolution:**
1. First to document "owns" the finding
2. Second references first's task
3. Add supplementary perspective if valuable
4. Avoid creating duplicate tasks

## Best Practices

1. **Read Before You Write**: Check other state files before analyzing
2. **Tag Collaborators**: Mention relevant personas in your findings
3. **Link Tasks**: Reference related tasks from other personas
4. **Acknowledge Sources**: Credit other personas' findings when relevant
5. **Update Regularly**: Keep coordination notes current
6. **Be Specific**: "See Janitor task JAN-001" not "see Janitor"
7. **Think System**: Consider vault as whole, not just your domain

## Coordination Checklist

Before completing any analysis:
- [ ] Checked all relevant personas' recent state files
- [ ] Noted any dependencies discovered
- [ ] Tagged issues spanning multiple domains
- [ ] Added coordination notes for other personas
- [ ] Identified if any persona should run triggered analysis
- [ ] Documented any conflicts or questions

---

*The personas are a team. Effective coordination multiplies their impact.*
