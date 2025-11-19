#!/usr/bin/env python3
"""
Verify 100% file coverage for Audit Round 2.
Ensures all 95 files are assigned to exactly one agent.
"""

import os
import re
from pathlib import Path


# Expected file inventory (from MASTER_FILE_INVENTORY.md)
EXPECTED_FILES = {
    # Strategic Documents (25)
    "./00_Eco_Balance_Hub.md",
    "./01_Executive_Summary.md",
    "./02_Project_Vision.md",
    "./03_Success_Factors.md",
    "./04_Current_Status_Assessment.md",
    "./10_Organizational_Structure.md",
    "./11_Governance.md",
    "./12_Team_Roles.md",
    "./13_Legal_Framework.md",
    "./20_Restoration_Methodology.md",
    "./21_Technology_Integration.md",
    "./22_Restoration_Challenges_Solutions.md",
    "./30_Business_Model.md",
    "./32_Funding_Strategy.md",
    "./40_Expansion_Growth_Strategy.md",
    "./42_Next_Steps_90_Days.md",
    "./43_Operations_Action_Plan.md",
    "./44_Site_Selection_Land_Acquisition.md",
    "./45_Tiny_House_and_Living_Infrastructure.md",
    "./50_Risk_Assessment.md",
    "./51_Key_Performance_Indicators.md",
    "./60_Marketing_Communications_Strategy.md",
    "./70_Case_Studies_Restoration_Examples.md",
    "./CHANGELOG.md",
    "./QUICK_REFERENCE_GUIDE.md",

    # Implementation Tasks (45)
    "./implementation_tasks/README.md",
    "./implementation_tasks/biodiversity/00_Biodiversity_Overview.md",
    "./implementation_tasks/biodiversity/01_Assess_Biodiversity.md",
    "./implementation_tasks/biodiversity/02_Restore_Habitats.md",
    "./implementation_tasks/biodiversity/03_Create_Protected_Areas.md",
    "./implementation_tasks/biodiversity/04_Manage_Invasive_Species.md",
    "./implementation_tasks/biodiversity/05_Reintroduce_Lost_Species.md",
    "./implementation_tasks/biodiversity/06_Monitor_Biodiversity.md",
    "./implementation_tasks/community_engagement/00_Community_Engagement_Overview.md",
    "./implementation_tasks/community_engagement/01_Identify_Stakeholders.md",
    "./implementation_tasks/community_engagement/02_Communicate_Plans.md",
    "./implementation_tasks/community_engagement/03_Educate_Community.md",
    "./implementation_tasks/community_engagement/04_Involve_Community.md",
    "./implementation_tasks/community_engagement/05_Share_Benefits.md",
    "./implementation_tasks/community_engagement/06_Maintain_Communication.md",
    "./implementation_tasks/reforestation/00_Reforestation_Overview.md",
    "./implementation_tasks/reforestation/01_Identify_Native_Species.md",
    "./implementation_tasks/reforestation/02_Source_Seedlings.md",
    "./implementation_tasks/reforestation/03_Prepare_Land.md",
    "./implementation_tasks/reforestation/04_Plant_Seedlings.md",
    "./implementation_tasks/reforestation/05_Monitor_Growth.md",
    "./implementation_tasks/reforestation/06_Long_Term_Management.md",
    "./implementation_tasks/site_selection/00_Site_Selection_Overview.md",
    "./implementation_tasks/site_selection/01_Identify_Potential_Locations.md",
    "./implementation_tasks/site_selection/02_Evaluate_Land_Condition.md",
    "./implementation_tasks/site_selection/03_Estimate_Restoration_Potential.md",
    "./implementation_tasks/site_selection/04_Consider_Accessibility.md",
    "./implementation_tasks/site_selection/05_Research_Local_Regulations.md",
    "./implementation_tasks/site_selection/06_Contact_Landowners.md",
    "./implementation_tasks/site_selection/07_Visit_Sites.md",
    "./implementation_tasks/site_selection/08_Make_Shortlist.md",
    "./implementation_tasks/soil_restoration/00_Soil_Restoration_Overview.md",
    "./implementation_tasks/soil_restoration/01_Assess_Soil_Health.md",
    "./implementation_tasks/soil_restoration/02_Add_Organic_Matter.md",
    "./implementation_tasks/soil_restoration/03_Reduce_Tillage.md",
    "./implementation_tasks/soil_restoration/04_Rotate_Crops.md",
    "./implementation_tasks/soil_restoration/05_Manage_Pests_Diseases.md",
    "./implementation_tasks/soil_restoration/06_Monitor_Soil_Health.md",
    "./implementation_tasks/water_management/00_Water_Management_Overview.md",
    "./implementation_tasks/water_management/01_Assess_Water_Needs.md",
    "./implementation_tasks/water_management/02_Rainwater_Harvesting.md",
    "./implementation_tasks/water_management/03_Build_Water_Storage_Structures.md",
    "./implementation_tasks/water_management/04_Efficient_Irrigation.md",
    "./implementation_tasks/water_management/05_Drought_Management.md",
    "./implementation_tasks/water_management/06_Monitor_Water_Use.md",

    # Process Documentation (23)
    "./_process/README.md",
    "./_process/audit/AUDIT_FIXES_TRACKER.md",
    "./_process/audit/BUDGET_CLARIFICATION_TABLE.md",
    "./_process/audit/COMPREHENSIVE_AUDIT_REPORT.md",
    "./_process/audit/README.md",
    "./_process/audit/SOLAR_CALCULATION_FIX.md",
    "./_process/conversion/README.md",
    "./_process/conversion/V2_BOOTSTRAP_CONVERSION_PLAN.md",
    "./_process/documentation/README.md",
    "./_process/documentation/STRUCTURE_VISUAL_GUIDE.md",
    "./_process/git/GIT_PUSH_INSTRUCTIONS.md",
    "./_process/git/README.md",
    "./_process/integration/INTEGRATION_CONTINUATION_GUIDE.md",
    "./_process/integration/INTEGRATION_PHASE_2_COMPLETE.md",
    "./_process/integration/INTEGRATION_PLAN_Phase3.md",
    "./_process/integration/INTEGRATION_PROGRESS_TRACKER.md",
    "./_process/migration/MIGRATION_ANALYSIS_COMPLETE.md",
    "./_process/migration/MIGRATION_CHECK_SUMMARY.md",
    "./_process/planning/POLISHING_PLAN.md",
    "./_process/planning/PUBLIC_PLATFORM_PLAN.md",
    "./_process/planning/README.md",
    "./_process/refactoring/README_Refactor_Summary.md",
    "./_process/sessions/SESSION_SUMMARY_Phase1-2.md",

    # AI Skills (2)
    "./ai_skills/README.md",
    "./ai_skills/documentation_curator.md",
}


def parse_agent_file(filepath):
    """Extract file assignments from an agent file."""
    assigned_files = []

    with open(filepath, 'r') as f:
        content = f.read()

    # Find all file paths in checkboxes: - [ ] `filepath`
    pattern = r'- \[ \] `([^`]+)`'
    matches = re.findall(pattern, content)

    assigned_files.extend(matches)

    return assigned_files


def verify_coverage(agent_dir="/home/presi/projects/eco-balance-documentation/_vault_maintenance/audit_round_2"):
    """Verify 100% coverage across all agent files."""

    print("=" * 70)
    print("AUDIT ROUND 2 - COVERAGE VERIFICATION")
    print("=" * 70)

    # Find all agent files
    agent_files = sorted(Path(agent_dir).glob("AGENT_*_FILES.md"))

    if not agent_files:
        print("❌ ERROR: No agent files found!")
        return False

    print(f"\nFound {len(agent_files)} agent files\n")

    # Collect all assigned files
    all_assigned = {}  # file -> list of agents

    for agent_file in agent_files:
        agent_num = re.search(r'AGENT_(\d+)_FILES', agent_file.name).group(1)
        assigned = parse_agent_file(agent_file)

        print(f"Agent {agent_num}: {len(assigned)} files")

        for filepath in assigned:
            if filepath not in all_assigned:
                all_assigned[filepath] = []
            all_assigned[filepath].append(agent_num)

    # Verify coverage
    print("\n" + "-" * 70)
    print("COVERAGE ANALYSIS")
    print("-" * 70)

    assigned_set = set(all_assigned.keys())
    expected_set = EXPECTED_FILES

    # Check totals
    print(f"\nExpected files: {len(expected_set)}")
    print(f"Assigned files: {len(assigned_set)}")

    # Find missing files
    missing = expected_set - assigned_set
    if missing:
        print(f"\n❌ MISSING FILES ({len(missing)}):")
        for f in sorted(missing):
            print(f"   - {f}")
    else:
        print(f"\n✅ All {len(expected_set)} expected files are assigned!")

    # Find extra files
    extra = assigned_set - expected_set
    if extra:
        print(f"\n⚠️  EXTRA FILES ({len(extra)}):")
        for f in sorted(extra):
            print(f"   - {f}")

    # Find duplicate assignments
    duplicates = {f: agents for f, agents in all_assigned.items() if len(agents) > 1}
    if duplicates:
        print(f"\n⚠️  DUPLICATE ASSIGNMENTS ({len(duplicates)}):")
        for f, agents in sorted(duplicates.items()):
            print(f"   - {f}: agents {', '.join(agents)}")
    else:
        print(f"\n✅ No duplicate assignments (each file assigned to exactly one agent)")

    # Final verdict
    print("\n" + "=" * 70)

    success = (
        len(missing) == 0 and
        len(extra) == 0 and
        len(duplicates) == 0 and
        len(assigned_set) == len(expected_set)
    )

    if success:
        print("✅ VERIFICATION PASSED - 100% COVERAGE CONFIRMED")
        print("=" * 70)
        print("\nAll 95 files are assigned to exactly one agent.")
        print("Ready for parallel execution!")
        return True
    else:
        print("❌ VERIFICATION FAILED")
        print("=" * 70)
        print("\nIssues found - please review and fix before execution.")
        return False


if __name__ == "__main__":
    success = verify_coverage()
    exit(0 if success else 1)
