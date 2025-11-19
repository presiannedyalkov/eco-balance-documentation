#!/usr/bin/env python3
"""
Generate balanced agent assignments for Audit Round 2.
Distributes 95 files across 10 agents with balanced line counts.
"""

# File inventory with line counts (from MASTER_FILE_INVENTORY.md)
# Format: (file_path, lines, category)

FILES = [
    # CATEGORY 1: Strategic Documents (25 files)
    ("./00_Eco_Balance_Hub.md", 559, "strategic"),
    ("./01_Executive_Summary.md", 136, "strategic"),
    ("./02_Project_Vision.md", 227, "strategic"),
    ("./03_Success_Factors.md", 543, "strategic"),
    ("./04_Current_Status_Assessment.md", 443, "strategic"),
    ("./10_Organizational_Structure.md", 478, "strategic"),
    ("./11_Governance.md", 488, "strategic"),
    ("./12_Team_Roles.md", 532, "strategic"),
    ("./13_Legal_Framework.md", 455, "strategic"),
    ("./20_Restoration_Methodology.md", 855, "strategic"),
    ("./21_Technology_Integration.md", 471, "strategic"),
    ("./22_Restoration_Challenges_Solutions.md", 524, "strategic"),
    ("./30_Business_Model.md", 588, "strategic"),
    ("./32_Funding_Strategy.md", 1002, "strategic"),
    ("./40_Expansion_Growth_Strategy.md", 649, "strategic"),
    ("./42_Next_Steps_90_Days.md", 519, "strategic"),
    ("./43_Operations_Action_Plan.md", 868, "strategic"),
    ("./44_Site_Selection_Land_Acquisition.md", 721, "strategic"),
    ("./45_Tiny_House_and_Living_Infrastructure.md", 807, "strategic"),
    ("./50_Risk_Assessment.md", 592, "strategic"),
    ("./51_Key_Performance_Indicators.md", 466, "strategic"),
    ("./60_Marketing_Communications_Strategy.md", 293, "strategic"),
    ("./70_Case_Studies_Restoration_Examples.md", 743, "strategic"),
    ("./CHANGELOG.md", 286, "strategic"),
    ("./QUICK_REFERENCE_GUIDE.md", 635, "strategic"),

    # CATEGORY 2: Implementation Tasks (45 files)
    ("./implementation_tasks/README.md", 647, "implementation"),
    ("./implementation_tasks/biodiversity/00_Biodiversity_Overview.md", 135, "implementation"),
    ("./implementation_tasks/biodiversity/01_Assess_Biodiversity.md", 193, "implementation"),
    ("./implementation_tasks/biodiversity/02_Restore_Habitats.md", 408, "implementation"),
    ("./implementation_tasks/biodiversity/03_Create_Protected_Areas.md", 623, "implementation"),
    ("./implementation_tasks/biodiversity/04_Manage_Invasive_Species.md", 589, "implementation"),
    ("./implementation_tasks/biodiversity/05_Reintroduce_Lost_Species.md", 556, "implementation"),
    ("./implementation_tasks/biodiversity/06_Monitor_Biodiversity.md", 705, "implementation"),
    ("./implementation_tasks/community_engagement/00_Community_Engagement_Overview.md", 573, "implementation"),
    ("./implementation_tasks/community_engagement/01_Identify_Stakeholders.md", 740, "implementation"),
    ("./implementation_tasks/community_engagement/02_Communicate_Plans.md", 882, "implementation"),
    ("./implementation_tasks/community_engagement/03_Educate_Community.md", 841, "implementation"),
    ("./implementation_tasks/community_engagement/04_Involve_Community.md", 908, "implementation"),
    ("./implementation_tasks/community_engagement/05_Share_Benefits.md", 822, "implementation"),
    ("./implementation_tasks/community_engagement/06_Maintain_Communication.md", 830, "implementation"),
    ("./implementation_tasks/reforestation/00_Reforestation_Overview.md", 138, "implementation"),
    ("./implementation_tasks/reforestation/01_Identify_Native_Species.md", 240, "implementation"),
    ("./implementation_tasks/reforestation/02_Source_Seedlings.md", 337, "implementation"),
    ("./implementation_tasks/reforestation/03_Prepare_Land.md", 455, "implementation"),
    ("./implementation_tasks/reforestation/04_Plant_Seedlings.md", 236, "implementation"),
    ("./implementation_tasks/reforestation/05_Monitor_Growth.md", 439, "implementation"),
    ("./implementation_tasks/reforestation/06_Long_Term_Management.md", 500, "implementation"),
    ("./implementation_tasks/site_selection/00_Site_Selection_Overview.md", 226, "implementation"),
    ("./implementation_tasks/site_selection/01_Identify_Potential_Locations.md", 80, "implementation"),
    ("./implementation_tasks/site_selection/02_Evaluate_Land_Condition.md", 101, "implementation"),
    ("./implementation_tasks/site_selection/03_Estimate_Restoration_Potential.md", 171, "implementation"),
    ("./implementation_tasks/site_selection/04_Consider_Accessibility.md", 316, "implementation"),
    ("./implementation_tasks/site_selection/05_Research_Local_Regulations.md", 437, "implementation"),
    ("./implementation_tasks/site_selection/06_Contact_Landowners.md", 421, "implementation"),
    ("./implementation_tasks/site_selection/07_Visit_Sites.md", 537, "implementation"),
    ("./implementation_tasks/site_selection/08_Make_Shortlist.md", 562, "implementation"),
    ("./implementation_tasks/soil_restoration/00_Soil_Restoration_Overview.md", 199, "implementation"),
    ("./implementation_tasks/soil_restoration/01_Assess_Soil_Health.md", 358, "implementation"),
    ("./implementation_tasks/soil_restoration/02_Add_Organic_Matter.md", 405, "implementation"),
    ("./implementation_tasks/soil_restoration/03_Reduce_Tillage.md", 405, "implementation"),
    ("./implementation_tasks/soil_restoration/04_Rotate_Crops.md", 426, "implementation"),
    ("./implementation_tasks/soil_restoration/05_Manage_Pests_Diseases.md", 195, "implementation"),
    ("./implementation_tasks/soil_restoration/06_Monitor_Soil_Health.md", 516, "implementation"),
    ("./implementation_tasks/water_management/00_Water_Management_Overview.md", 328, "implementation"),
    ("./implementation_tasks/water_management/01_Assess_Water_Needs.md", 445, "implementation"),
    ("./implementation_tasks/water_management/02_Rainwater_Harvesting.md", 452, "implementation"),
    ("./implementation_tasks/water_management/03_Build_Water_Storage_Structures.md", 483, "implementation"),
    ("./implementation_tasks/water_management/04_Efficient_Irrigation.md", 494, "implementation"),
    ("./implementation_tasks/water_management/05_Drought_Management.md", 477, "implementation"),
    ("./implementation_tasks/water_management/06_Monitor_Water_Use.md", 805, "implementation"),

    # CATEGORY 3: Process Documentation (23 files)
    ("./_process/README.md", 478, "process"),
    ("./_process/audit/AUDIT_FIXES_TRACKER.md", 159, "process"),
    ("./_process/audit/BUDGET_CLARIFICATION_TABLE.md", 178, "process"),
    ("./_process/audit/COMPREHENSIVE_AUDIT_REPORT.md", 375, "process"),
    ("./_process/audit/README.md", 15, "process"),
    ("./_process/audit/SOLAR_CALCULATION_FIX.md", 133, "process"),
    ("./_process/conversion/README.md", 14, "process"),
    ("./_process/conversion/V2_BOOTSTRAP_CONVERSION_PLAN.md", 644, "process"),
    ("./_process/documentation/README.md", 15, "process"),
    ("./_process/documentation/STRUCTURE_VISUAL_GUIDE.md", 783, "process"),
    ("./_process/git/GIT_PUSH_INSTRUCTIONS.md", 204, "process"),
    ("./_process/git/README.md", 14, "process"),
    ("./_process/integration/INTEGRATION_CONTINUATION_GUIDE.md", 268, "process"),
    ("./_process/integration/INTEGRATION_PHASE_2_COMPLETE.md", 382, "process"),
    ("./_process/integration/INTEGRATION_PLAN_Phase3.md", 171, "process"),
    ("./_process/integration/INTEGRATION_PROGRESS_TRACKER.md", 67, "process"),
    ("./_process/migration/MIGRATION_ANALYSIS_COMPLETE.md", 407, "process"),
    ("./_process/migration/MIGRATION_CHECK_SUMMARY.md", 135, "process"),
    ("./_process/planning/POLISHING_PLAN.md", 233, "process"),
    ("./_process/planning/PUBLIC_PLATFORM_PLAN.md", 1100, "process"),
    ("./_process/planning/README.md", 13, "process"),
    ("./_process/refactoring/README_Refactor_Summary.md", 319, "process"),
    ("./_process/sessions/SESSION_SUMMARY_Phase1-2.md", 221, "process"),

    # CATEGORY 7: AI Skills (2 files)
    ("./ai_skills/README.md", 442, "ai_skills"),
    ("./ai_skills/documentation_curator.md", 1168, "ai_skills"),
]


def balance_assignment(files, num_agents=10):
    """
    Distribute files across agents with balanced line counts.
    Strategy: Distribute large files first, then fill with smaller files.
    """
    # Sort files by size (descending)
    sorted_files = sorted(files, key=lambda x: x[1], reverse=True)

    # Initialize agents
    agents = [{"files": [], "total_lines": 0} for _ in range(num_agents)]

    # Assign files to agent with smallest current load
    for file_path, lines, category in sorted_files:
        # Find agent with minimum lines
        min_agent = min(agents, key=lambda a: a["total_lines"])
        min_agent["files"].append((file_path, lines, category))
        min_agent["total_lines"] += lines

    return agents


def generate_agent_files(agents, output_dir="/home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_3"):
    """Generate individual agent assignment files."""
    import os

    for i, agent in enumerate(agents, 1):
        agent_num = f"{i:02d}"
        filename = f"{output_dir}/AGENT_{agent_num}_FILES.md"

        content = f"""# 📋 AGENT {agent_num} - FILE ASSIGNMENTS

**Agent**: {agent_num}
**Files Assigned**: {len(agent["files"])}
**Total Lines**: {agent["total_lines"]:,}
**Est. Token Usage**: ~{agent["total_lines"] * 3 + 10000:,} tokens
**Est. Audit Time**: {len(agent["files"]) * 4}-{len(agent["files"]) * 6} minutes

---

## 🎯 YOUR MISSION

Audit ALL files listed below using the 6 persona perspectives. NO SAMPLING - every file must be fully read and analyzed.

**Audit Criteria**: See [AUDIT_INSTRUCTIONS.md](./AUDIT_INSTRUCTIONS.md)

**Output Format**: Create findings in standardized format (see instructions)

---

## 📁 FILES TO AUDIT ({len(agent["files"])} files)

"""

        # Group by category
        categories = {}
        for file_path, lines, category in agent["files"]:
            if category not in categories:
                categories[category] = []
            categories[category].append((file_path, lines))

        # Write files grouped by category
        category_names = {
            "strategic": "Strategic Documents",
            "implementation": "Implementation Tasks",
            "process": "Process Documentation",
            "ai_skills": "AI Skills"
        }

        for cat_key in ["strategic", "implementation", "process", "ai_skills"]:
            if cat_key in categories:
                content += f"\n### {category_names[cat_key]} ({len(categories[cat_key])} files)\n\n"
                for file_path, lines in sorted(categories[cat_key]):
                    content += f"- [ ] `{file_path}` ({lines} lines)\n"

        # Add summary
        content += f"""

---

## 📊 WORKLOAD SUMMARY

| Category | Files | Lines |
|----------|-------|-------|
"""
        for cat_key in ["strategic", "implementation", "process", "ai_skills"]:
            if cat_key in categories:
                cat_files = len(categories[cat_key])
                cat_lines = sum(lines for _, lines in categories[cat_key])
                content += f"| {category_names[cat_key]} | {cat_files} | {cat_lines:,} |\n"

        content += f"| **TOTAL** | **{len(agent['files'])}** | **{agent['total_lines']:,}** |\n"

        content += """

---

## ✅ COMPLETION CHECKLIST

- [ ] All files read completely (no sampling)
- [ ] All 6 personas applied to each file
- [ ] Issues documented with severity levels
- [ ] Findings saved to output file
- [ ] Created PR with branch name: `audit-round-2/agent-{agent_num}`

---

**Status**: ⏸️ Ready for Execution
"""

        # Write file
        with open(filename, 'w') as f:
            f.write(content)

        print(f"✓ Generated: {filename}")


def generate_summary(agents):
    """Print distribution summary."""
    print("\n" + "="*60)
    print("AGENT ASSIGNMENT SUMMARY")
    print("="*60)

    for i, agent in enumerate(agents, 1):
        print(f"\nAgent {i:02d}:")
        print(f"  Files: {len(agent['files'])}")
        print(f"  Lines: {agent['total_lines']:,}")
        print(f"  Avg lines/file: {agent['total_lines'] // len(agent['files'])}")

        # Count by category
        cats = {}
        for _, _, category in agent["files"]:
            cats[category] = cats.get(category, 0) + 1
        print(f"  Categories: {cats}")

    # Overall stats
    total_files = sum(len(a["files"]) for a in agents)
    total_lines = sum(a["total_lines"] for a in agents)
    avg_files = total_files / len(agents)
    avg_lines = total_lines / len(agents)

    print("\n" + "-"*60)
    print(f"Total Files: {total_files}")
    print(f"Total Lines: {total_lines:,}")
    print(f"Avg Files/Agent: {avg_files:.1f}")
    print(f"Avg Lines/Agent: {avg_lines:,.0f}")

    # Check balance
    min_lines = min(a["total_lines"] for a in agents)
    max_lines = max(a["total_lines"] for a in agents)
    variance = ((max_lines - min_lines) / avg_lines) * 100

    print(f"\nLoad Balance:")
    print(f"  Min: {min_lines:,} lines")
    print(f"  Max: {max_lines:,} lines")
    print(f"  Variance: {variance:.1f}%")
    print("="*60 + "\n")


if __name__ == "__main__":
    print("Generating balanced agent assignments...")
    print(f"Total files: {len(FILES)}")
    print(f"Total lines: {sum(f[1] for f in FILES):,}")

    # Generate assignments
    agents = balance_assignment(FILES, num_agents=10)

    # Print summary
    generate_summary(agents)

    # Generate files
    generate_agent_files(agents)

    print("\n✅ All agent assignment files generated!")
