# State File Template

## Purpose
State files track the current status of each persona's analysis and findings. They serve as memory between analysis runs and help coordinate between personas.

## Structure

```markdown
# [Persona Name] State File

**Last Updated**: YYYY-MM-DD HH:MM  
**Last Analysis**: YYYY-MM-DD HH:MM (`[analysis_report_filename.md]`)  
**Next Scheduled Analysis**: YYYY-MM-DD  
**Current Health Score**: XX/100  
**Total Analyses Recorded**: X  
**Last Run Number**: #  
**State Reset Date**: YYYY-MM-DD HH:MM (set if state contents were cleared after a run)

## Current Status

### Overall Assessment
[Brief summary of current vault state from this persona's perspective]

### Recent Changes
- [Change 1]
- [Change 2]
- [Change 3]

### Active Issues
**Critical**: X
**High**: X
**Medium**: X
**Low**: X

## Last Analysis Summary

### Key Findings
1. [Finding 1]
2. [Finding 2]
3. [Finding 3]

### Tasks Generated
- Total: X
- Completed since last analysis: X
- Still pending: X

### Improvements Made
- [Improvement 1]
- [Improvement 2]

## Current Focus Areas

### Immediate Priorities
1. [Priority 1]
2. [Priority 2]

### Watching Closely
- [Area 1]
- [Area 2]

### Long-term Initiatives
- [Initiative 1]
- [Initiative 2]

## Coordination Notes

### Information for Other Personas
**For [Persona]**: [Relevant information]

### Pending Items from Other Personas
**From [Persona]**: [Expected information or action]

## Metrics Tracking

| Metric | Last Analysis | Current | Trend |
|--------|--------------|---------|-------|
| [Metric 1] | XX | XX | ↑/↓/→ |
| [Metric 2] | XX | XX | ↑/↓/→ |

## Analysis History

| Run # | Date & Time | Report File | Summary |
|-------|-------------|-------------|---------|
| 01 | YYYY-MM-DD HH:MM | `[persona]_analysis_YYYY-MM-DD.md` | [One-line summary] |
| 02 | YYYY-MM-DD HH:MM | `[persona]_analysis_YYYY-MM-DD.md` | [One-line summary] |

## Historical Context

### Previous Health Scores
- Run 01 (YYYY-MM-DD): XX/100
- Run 02 (YYYY-MM-DD): XX/100
- Run 03 (YYYY-MM-DD): XX/100

### Trends
[Notable patterns or changes over time. If the state was reset, keep prior run summaries here for continuity.]

## Next Analysis Plan

### Focus Areas
1. [Area to emphasize]
2. [Area to check]

### Expected Changes
[What should be different by next analysis]

### Special Checks
[Any specific items to verify next time]

## Notes
[Any additional context, observations, or reminders]
```
