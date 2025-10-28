# AI Skills Library

**Purpose:** Comprehensive guidance templates for AI assistants managing the Eco Restoration Project

**Version:** 1.0.0  
**Last Updated:** October 29, 2025

---

## Overview

This directory contains detailed "skill" templates that guide AI assistants in performing specific roles within the project. Each skill template prevents common AI problems like context loss, timeout errors, focus drift, and inconsistent output.

### What Are Skills?

Skills are **operational frameworks** that provide:
- Clear role definitions with explicit scope
- Step-by-step workflows with time limits
- Decision trees for common scenarios
- Quality standards and checklists
- Handoff protocols for coordination
- Examples and anti-patterns
- Performance tracking mechanisms

### Why Skills Matter

AI assistants face several challenges:
- **Context Loss**: Forgetting earlier conversation
- **Timeout Errors**: Tasks taking too long
- **Focus Drift**: Veering off-task
- **Inconsistency**: Variable quality
- **Scope Creep**: Tasks expanding beyond intent

Skills solve these by providing structure, boundaries, and clear guidance.

---

## Available Skills

### Core Roles

#### 🎯 Project Coordinator
**File:** `project_coordinator.md` *(Coming Soon)*  
**Purpose:** Overall project management and task orchestration  
**When to Use:** Triage feedback, assign tasks, coordinate roles, report status

#### 📝 Documentation Curator
**File:** `documentation_curator.md` ✅  
**Purpose:** Maintain documentation quality and accuracy  
**When to Use:** Update docs, integrate feedback, fix issues, maintain consistency

#### 🔍 Research Analyst
**File:** `research_analyst.md` *(Coming Soon)*  
**Purpose:** Investigate questions, validate claims, find evidence  
**When to Use:** Answer complex questions, validate technical claims, research new approaches

#### 🤝 Community Liaison
**File:** `community_liaison.md` *(Coming Soon)*  
**Purpose:** Interface with community, respond to feedback  
**When to Use:** Answer visitor questions, explain topics, collect feedback, acknowledge contributions

#### ✅ Quality Auditor
**File:** `quality_auditor.md` *(Coming Soon)*  
**Purpose:** Systematic quality checks and validation  
**When to Use:** Review completed work, check standards, validate accuracy, report metrics

#### 📊 Task Manager
**File:** `task_manager.md` *(Coming Soon)*  
**Purpose:** Manage task lifecycle and execution  
**When to Use:** Create tasks, break down large tasks, track progress, generate reports

#### 🛡️ Moderator
**File:** `moderator.md` *(Coming Soon)*  
**Purpose:** Review community contributions for quality and appropriateness  
**When to Use:** Pre-screen feedback, categorize contributions, flag issues, recommend actions

---

## How to Use Skills

### For AI Assistants

When a user invokes a role:

1. **Load the skill file immediately**
   ```
   Read: ai_skills/[role_name].md
   ```

2. **Follow the workflow systematically**
   - Don't skip steps
   - Respect time limits
   - Use decision trees when uncertain
   - Follow quality checklists

3. **Document your work**
   - Update task status
   - Create completion reports
   - Flag issues appropriately
   - Update state files

4. **Know when to escalate**
   - Follow handoff protocols
   - Don't guess on important decisions
   - Provide clear context in escalations

### For Humans

When managing AI assistants:

1. **Invoke roles explicitly**
   ```
   "Act as Documentation Curator and update X"
   "Use the Research Analyst skill to investigate Y"
   ```

2. **Review outputs against skill standards**
   - Check quality checklists
   - Verify time limits were respected
   - Ensure scope boundaries maintained

3. **Provide feedback to improve skills**
   - Update skill templates based on experience
   - Add new decision trees as patterns emerge
   - Refine time estimates
   - Expand examples

---

## Skill Template Structure

Every skill follows this format:

```markdown
# AI SKILL: [Role Name]

## 🎯 Role Definition
- Purpose
- Scope (IN/OUT)
- Authority Level

## 🔑 Activation Trigger
- When to use
- How user invokes
- Auto-activation conditions

## 📋 Workflow
- Phase 1: Initialization
- Phase 2: Analysis
- Phase 3: Execution
- Phase 4: Cross-Updates
- Phase 5: Quality Check
- Phase 6: Completion

## 🌳 Decision Trees
- Common scenarios
- If-then logic
- Escalation triggers

## ⚙️ Quality Standards
- Acceptance criteria
- Quality metrics
- Success indicators

## ⏱️ Time & Scope Limits
- Time limits
- When to stop
- Scope boundaries

## 🤝 Handoff Protocol
- When to escalate
- Information to provide
- Coordination with other roles

## ⚠️ Common Pitfalls
- Anti-patterns
- Warning signs
- Solutions

## 📚 Examples
- Real scenarios
- Good and bad approaches
- Time breakdowns

## 📖 Style Guide / Reference
- Role-specific guidelines
- Templates
- Resources

## 📊 Performance Tracking
- Metrics to collect
- Improvement areas

## ✅ Quick Reference Checklist
- Essential steps summary

## 🚨 Emergency Protocols
- Error handling
- Incident response
```

---

## Coordination Between Roles

### Primary Relationships

```
Project Coordinator
    ├─ coordinates → Documentation Curator
    ├─ coordinates → Research Analyst
    ├─ coordinates → Community Liaison
    ├─ coordinates → Task Manager
    └─ oversees → Moderator

Documentation Curator
    ├─ requests research → Research Analyst
    ├─ submits for review → Quality Auditor
    └─ creates tasks → Task Manager

Community Liaison
    ├─ routes complex questions → Research Analyst
    ├─ escalates feedback → Moderator
    └─ coordinates answers → Documentation Curator

Quality Auditor
    ├─ validates → All roles
    ├─ reports to → Project Coordinator
    └─ creates quality tasks → Task Manager
```

### Coordination Principles

1. **Clear Handoffs**: Use standardized templates
2. **Context Preservation**: Document state thoroughly
3. **No Gaps**: Every task has clear ownership
4. **No Overlaps**: Defined boundaries between roles
5. **Feedback Loops**: Continuous improvement

---

## Creating New Skills

### When to Create a New Skill

Create a new skill when:
- A distinct role emerges with unique responsibilities
- Existing skills become too broad
- New project phase requires different approach
- Pattern of escalations suggests need for specialization

### Skill Creation Process

1. **Define the role clearly**
   - What's the primary purpose?
   - What problems does this solve?
   - What are the boundaries?

2. **Map the workflow**
   - What are the key steps?
   - What decision points exist?
   - Where are the handoffs?

3. **Establish standards**
   - What's good quality look like?
   - What metrics matter?
   - What are the time limits?

4. **Document pitfalls**
   - What commonly goes wrong?
   - How to recognize issues?
   - What are the solutions?

5. **Create examples**
   - Show best practices
   - Demonstrate decision trees
   - Include real scenarios

6. **Test and refine**
   - Run pilot sessions
   - Collect feedback
   - Update based on experience
   - Iterate continuously

---

## Quality Standards for Skills

All skills must:

✓ **Be specific**: Clear, actionable guidance
✓ **Set boundaries**: Explicit IN/OUT scope
✓ **Include timers**: Prevent runaway sessions
✓ **Provide examples**: Show, don't just tell
✓ **Enable handoffs**: Clear escalation protocols
✓ **Track performance**: Measurable metrics
✓ **Evolve**: Regular review and updates

---

## Version Control

Skills follow semantic versioning:

- **MAJOR** (X.0.0): Fundamental role changes
- **MINOR** (x.X.0): New features, expanded workflows
- **PATCH** (x.x.X): Clarifications, bug fixes

Track changes in each skill's version history section.

---

## Best Practices

### For AI Execution

1. **Always read skill before starting**
2. **Follow workflows systematically**
3. **Respect time and scope limits**
4. **Use decision trees when uncertain**
5. **Document everything**
6. **Escalate appropriately**
7. **Track your performance**
8. **Learn from feedback**

### For Human Management

1. **Invoke roles explicitly**
2. **Review work against standards**
3. **Provide clear feedback**
4. **Update skills based on patterns**
5. **Celebrate good execution**
6. **Course-correct gently**
7. **Maintain skill library**

---

## Metrics & Improvement

### Track These Metrics

**Per Role:**
- Tasks completed
- Time per task
- Quality audit pass rate
- Escalation frequency
- Scope creep incidents

**Across System:**
- Inter-role coordination smoothness
- Overall project velocity
- Community satisfaction
- Documentation health
- Task backlog size

### Continuous Improvement

**Monthly:** Review role performance metrics  
**Quarterly:** Assess skill effectiveness  
**Annually:** Major skill library review

---

## Resources

### Templates
- Task completion report
- Escalation notice
- Handoff documentation
- Quality checklist
- State file format

### Tools
- Markdown linter
- Link checker
- Time tracker
- Performance dashboard

### Support
- Questions? Create task in priority queue
- Issues? Document in state file
- Improvements? Update skill and note in version history

---

## Roadmap

### Phase 1: Core Skills (Current)
- ✅ Documentation Curator
- ⏳ Project Coordinator
- ⏳ Research Analyst
- ⏳ Community Liaison

### Phase 2: Quality & Tasks
- ⏳ Quality Auditor
- ⏳ Task Manager
- ⏳ Moderator

### Phase 3: Specialized Roles
- ⏳ Technical Writer
- ⏳ Data Analyst
- ⏳ Outreach Coordinator
- ⏳ Grant Writer

### Phase 4: Advanced Features
- ⏳ Multi-role coordination workflows
- ⏳ Automated role selection
- ⏳ Performance analytics dashboard
- ⏳ Skill recommendation system

---

## Support & Contact

**For Questions:**
- Review relevant skill template
- Check decision trees
- Review examples
- If still uncertain, escalate

**For Issues:**
- Document in state file
- Create priority task
- Flag for Project Lead

**For Improvements:**
- Update skill template
- Document in version history
- Share with team
- Schedule review

---

**Remember:** Skills are living documents. They improve through use, feedback, and iteration. Your experience using them makes them better for everyone.

---

*This library enables AI assistants to work systematically, consistently, and effectively on the eco restoration project while maintaining quality and preventing common problems.*

**Version:** 1.0.0  
**Last Updated:** October 29, 2025  
**Next Review:** November 29, 2025
