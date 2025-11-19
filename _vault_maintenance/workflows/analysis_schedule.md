# Analysis Schedule Guide

## Purpose
This guide helps plan when to run each persona analysis for optimal vault maintenance.

## Schedule Types

### 1. Initial Baseline (One-Time)
**Goal:** Establish current state across all domains

**Schedule:**
- **Week 1, Day 1**: Janitor (organization baseline)
- **Week 1, Day 3**: Archivist (version/archive check)
- **Week 1, Day 5**: Auditor (completeness verification)
- **Week 2, Day 1**: Librarian (navigation mapping)
- **Week 2, Day 3**: Curator (content assessment)
- **Week 2, Day 5**: Quality Inspector (formatting review)

**Output:** Complete baseline state, initial task backlog

### 2. Regular Maintenance (Ongoing)
**Goal:** Keep vault in good condition with minimal effort

**Weekly Schedule:**
```
Week 1: Janitor + Quality Inspector
Week 2: Curator + Librarian
Week 3: Auditor + Archivist
Week 4: Quick health check (review all state files)
```

**Monthly:** Full rotation through all personas

### 3. Light Touch (Low Activity Periods)
**Goal:** Minimal maintenance when project is stable

**Bi-Weekly:**
- Rotate through one persona per session
- Focus on quick health checks
- Generate tasks only for critical issues

**Monthly:** Review task backlog, execute high-priority items

### 4. Intensive (High Activity Periods)
**Goal:** Keep up with rapid changes

**Weekly:** Run all 6 personas
**Daily:** Quick Janitor checks for organization
**As-Needed:** Triggered analyses when major changes occur

## Frequency Recommendations by Persona

| Persona | Regular Maintenance | Light Touch | Intensive |
|---------|-------------------|-------------|-----------|
| 🧹 Janitor | Weekly | Bi-weekly | 2x/week |
| 📚 Curator | Bi-weekly | Monthly | Weekly |
| 🗄️ Archivist | Monthly | Quarterly | Bi-weekly |
| 🔍 Auditor | Bi-weekly | Monthly | Weekly |
| 📖 Librarian | Weekly | Bi-weekly | 2x/week |
| ✨ Quality Inspector | Bi-weekly | Monthly | Weekly |

## Trigger-Based Analysis

Run these analyses when specific events occur:

### Janitor Triggers
- After bulk file additions
- After reorganization
- After merging branches
- Before major releases

### Curator Triggers
- After significant content additions
- After restructuring docs
- When users report confusion
- Before releases

### Archivist Triggers
- Before version releases
- After major milestones
- When preparing archives
- Quarterly reviews

### Auditor Triggers
- Before releases
- After template changes
- When standards updated
- After integration of new content

### Librarian Triggers
- After file movements
- After new content addition
- When navigation issues reported
- After link updates

### Quality Inspector Triggers
- Before releases
- After bulk content additions
- When style guide changes
- After formatting updates

## Sample Schedules

### Startup Phase (First Month)
```
Week 1: Initial baseline (all personas)
Week 2: Execute critical tasks from baseline
Week 3: Regular maintenance rotation begins
Week 4: Review and adjust based on learnings
```

### Steady State (Regular Operations)
```
Week 1: Mon - Janitor, Thu - Quality Inspector
Week 2: Mon - Curator, Thu - Librarian  
Week 3: Mon - Auditor, Thu - Archivist
Week 4: Mon - Review state files, Thu - Execute priority tasks
```

### Pre-Release (Preparing for v1.1.0)
```
Week -2: All personas run focused analyses
Week -1: Execute all HIGH+ priority tasks
Release week: Final quality check (all personas quick scan)
```

## Time Budgets

### Per Analysis Session
- Preparation: 5 min
- Analysis: 20-60 min (varies by persona)
- Task creation: 15-30 min
- Report writing: 15-20 min
- State update: 5-10 min
- **Total: 60-125 minutes per persona**

### Per Week (Regular Maintenance)
- 2 personas × 90 min average = **3 hours/week**
- Task execution: **2-3 hours/week**
- **Total: 5-6 hours/week vault maintenance**

### Per Month (Regular Maintenance)
- All 6 personas once = **6-8 hours**
- Task execution = **8-12 hours**
- **Total: 14-20 hours/month**

## Planning Your Schedule

### Step 1: Assess Activity Level
- High activity? Use Intensive schedule
- Steady work? Use Regular Maintenance
- Quiet period? Use Light Touch

### Step 2: Identify Priorities
Which personas address your current biggest issues?
- Organization messy? → Janitor
- Content gaps? → Curator + Auditor
- Navigation broken? → Librarian
- Quality issues? → Quality Inspector

### Step 3: Set Cadence
- Pick realistic frequency you can maintain
- Start conservative, increase if needed
- Better consistent light touch than sporadic intensive

### Step 4: Schedule Specific Times
- Block calendar time for analyses
- Treat as regular maintenance, not optional
- Pair with related work when possible

### Step 5: Review & Adjust
- Monthly: Review if schedule is working
- Adjust frequency based on findings
- Change focus based on vault health

## Quick Health Check Protocol

**When:** Weekly or bi-weekly between full analyses  
**Time:** 15-20 minutes  
**Process:**

1. Read all 6 state files (5 min)
2. Note any critical issues mentioned (2 min)
3. Review task queue for critical items (3 min)
4. Execute any trivial critical tasks (5 min)
5. Update if anything changed (5 min)

**Purpose:** Catch critical issues without full analysis overhead

## Signs You Need More Frequent Analysis

- Health scores declining
- Task backlog growing faster than execution
- Users reporting navigation/quality issues
- Recent major changes not yet stabilized
- Approaching release deadlines

## Signs You Can Reduce Frequency

- Health scores consistently 85+
- Task queue small and manageable
- Few new issues found in recent analyses
- Stable period with minimal changes
- All critical/high tasks complete

## Scheduling Tools

### State File Check
```bash
# Check last analysis dates
ls -lt _vault_maintenance/state/*_state.md | head -6
```

### Task Queue Check  
```bash
# Count pending tasks
find _vault_maintenance/tasks/queue -type f | wc -l
```

### Git Activity Check
```bash
# Recent commit count
git log --since="1 week ago" --oneline | wc -l
```

## Next Steps

1. Choose schedule type for your current phase
2. Calendar block specific analysis times
3. Run initial baseline if not done
4. Begin rotation
5. Adjust based on results

---

*Consistency beats intensity. Regular light maintenance prevents major issues.*
