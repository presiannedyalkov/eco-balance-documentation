# 🔴 FIX AGENT 04 - Geographic, Unit & Currency Corrections

**Priority**: HIGH
**Agent**: FIX-AGENT-04
**Issues**: 16 critical/high issues
**Files**: 5 implementation task files
**Est. Time**: 4-6 hours

---

## 🎯 MISSION

Fix geographic misalignment and unit system errors. Files contain US-specific content (plant species, drought resources, imperial units) and incorrect currency (USD instead of EUR) despite being a German/European project.

**Impact**: Implementation guidance is unusable for actual German operations.

---

## 📁 FILES TO FIX

### File 1: `implementation_tasks/water_management/02_Rainwater_Harvesting.md`

**Issue**: CRITICAL - Imperial units throughout (square feet, gallons, inches)

**Systematic Conversion Required**:

```markdown
# Find and replace:
"square feet" → "square meters"
"sq ft" → "m²"  
"gallons" → "liters"
"gal" → "L"
"inches" → "centimeters"  
"in" → "cm"
"feet" → "meters"
"ft" → "m"

# Calculations to update:
- Catchment area: Convert ft² × 0.0929 = m²
- Storage volume: Convert gallons × 3.785 = liters
- Rainfall depth: Convert inches × 2.54 = cm
```

**Example Fix**:

**Before**:
```markdown
A 1,000 square foot roof can collect:
1,000 sq ft × 0.623 gallons/sq ft/inch × 30 inches annual rainfall = 18,690 gallons
```

**After**:
```markdown
A 93 square meter roof (equivalent to 1,000 sq ft) can collect:
93 m² × 0.001 m³/m²/mm × 762mm annual rainfall = 70,866 liters (71 m³)

*Note: Using average rainfall for Central Germany (~762mm/year)*
```

---

### File 2: `implementation_tasks/water_management/05_Drought_Management.md`

**Issues** (2 critical):

1. **US Plant Species** - CRITICAL
   - **Location**: Line ~60, Drought-Tolerant Plant Examples
   - **Current**: Lists Texas sage, California poppy, Arizona agave
   - **Fix**: Replace with German/European native drought-tolerant species:
     ```markdown
     **Drought-Tolerant Native Species for Germany**:

     Trees:
     - Scots Pine (Pinus sylvestris)
     - Sessile Oak (Quercus petraea)
     - Common Juniper (Juniperus communis)

     Shrubs:
     - Sea Buckthorn (Hippophae rhamnoides)
     - Dog Rose (Rosa canina)
     - Common Hawthorn (Crataegus monogyna)

     Groundcover:
     - Wild Thyme (Thymus serpyllum)
     - Sedum species (Sedum acre, Sedum album)
     - Sheep's Fescue (Festuca ovina)
     ```

2. **US Drought Resources** - HIGH
   - **Location**: Line ~180, Monitoring Resources section
   - **Current**: "Use US Drought Monitor at droughtmonitor.unl.edu"
   - **Fix**: Replace with European/German resources:
     ```markdown
     **Drought Monitoring Resources for Germany/Europe**:

     - **European Drought Observatory (EDO)**
       - URL: edo.jrc.ec.europa.eu
       - Provides: EU-wide drought indicators, forecasts, maps

     - **German Weather Service (DWD) - Deutscher Wetterdienst**
       - URL: dwd.de
       - Provides: Regional drought indices, soil moisture maps

     - **Helmholtz Centre for Environmental Research (UFZ)**
       - URL: ufz.de/duerreindex
       - Provides: German drought monitor, historical data

     - **Copernicus Climate Data Store**
       - URL: climate.copernicus.eu
       - Provides: Climate data, drought indicators, projections
     ```

---

### File 3: `implementation_tasks/water_management/04_Efficient_Irrigation.md`

**Issue**: Mixed units (gallons per minute, acre-inches)

**Fixes**:
```markdown
# Conversions:
"gallons per minute" → "liters per minute"
"gpm" → "L/min"
"acre-inch" → "cubic meters per hectare"
"acre-feet" → "cubic meters"

# Example:
Before: "Drip irrigation uses 0.5-2 gpm per emitter"
After: "Drip irrigation uses 2-8 L/min per emitter"

Before: "Apply 1 acre-inch of water weekly"
After: "Apply 100 m³/ha (10mm depth) weekly"
```

---

### File 4: `implementation_tasks/soil_restoration/03_Reduce_Tillage.md`

**Issue**: Acres instead of hectares

**Fixes**:
```markdown
# Find and replace:
"acre" → "hectare"
"acres" → "hectares"

# Update area calculations:
Before: "10-50 acre field"
After: "4-20 hectare field"

# Conversion note at top of document:
> **📏 Units Note**: All measurements use metric system (hectares, meters, kilograms).
> For reference: 1 hectare = 2.47 acres; 1 acre = 0.405 hectares.
```

---

### File 5: `implementation_tasks/community_engagement/02_Communicate_Plans.md`

**Issue**: USD currency ($) instead of EUR (€)

**Fixes**:
```markdown
# Find and replace:
"$" → "€"
"USD" → "EUR"
"dollars" → "euros"

# Update example amounts if needed:
Before: "$50,000 investment"
After: "€20,000-€30,000 Bootstrap investment (Year 1)"

# Note: Some amounts may need adjustment beyond just symbol:
- US examples might use larger dollar amounts
- Adjust to realistic Euro amounts for German context
```

---

## 🤖 AUTOMATED CONVERSION APPROACH

### Python Script for Unit Conversions

```python
#!/usr/bin/env python3
"""Convert imperial units to metric in markdown files."""

import re

CONVERSIONS = {
    # Area
    r'(\d+(?:\.\d+)?)\s*square feet': lambda m: f"{float(m.group(1)) * 0.0929:.1f} square meters",
    r'(\d+(?:\.\d+)?)\s*sq\s*ft': lambda m: f"{float(m.group(1)) * 0.0929:.1f} m²",
    r'(\d+(?:\.\d+)?)\s*acres?': lambda m: f"{float(m.group(1)) * 0.405:.1f} hectares",

    # Volume
    r'(\d+(?:,\d+)?(?:\.\d+)?)\s*gallons?': lambda m: f"{float(m.group(1).replace(',','')) * 3.785:.0f} liters",
    r'(\d+(?:\.\d+)?)\s*gpm': lambda m: f"{float(m.group(1)) * 3.785:.1f} L/min",

    # Length
    r'(\d+(?:\.\d+)?)\s*inches?': lambda m: f"{float(m.group(1)) * 2.54:.1f} centimeters",
    r'(\d+(?:\.\d+)?)\s*feet': lambda m: f"{float(m.group(1)) * 0.3048:.1f} meters",
    r'(\d+(?:\.\d+)?)\s*ft(?![a-z])': lambda m: f"{float(m.group(1)) * 0.3048:.1f} m",

    # Currency  
    r'\$(\d+(?:,\d+)?(?:\.\d+)?)': lambda m: f"€{m.group(1)}",
    r'USD': 'EUR',
    r'dollars?': 'euros',
}

def convert_units(content):
    """Apply all conversions to content."""
    for pattern, replacement in CONVERSIONS.items():
        if callable(replacement):
            content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)
        else:
            content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)
    return content

# Use with caution - manual review required!
```

**WARNING**: This script provides a starting point but requires manual review of every conversion!

---

## 📋 SPECIFIC CONTENT REPLACEMENTS

### US Plant Species → German Equivalents

| US Species | German Replacement | Latin Name |
|------------|-------------------|------------|
| Texas Sage | Wild Sage | Salvia pratensis |
| California Poppy | Corn Poppy | Papaver rhoeas |
| Arizona Agave | Sea Holly | Eryngium maritimum |
| Prairie Grass | Tufted Hair-grass | Deschampsia cespitosa |
| Buffalo Grass | Red Fescue | Festuca rubra |

### Climate Data Sources

| US Resource | European Equivalent |
|-------------|---------------------|
| US Drought Monitor | European Drought Observatory (EDO) |
| NOAA Climate Data | Copernicus Climate Data Store |
| USDA Hardiness Zones | European Plant Hardiness Zones |
| State Extension Offices | National Agricultural Research Agencies |

---

## ✅ VERIFICATION CHECKLIST

- [ ] All imperial units converted to metric
- [ ] All US plant species replaced with German natives
- [ ] All US resources replaced with EU/German equivalents
- [ ] All currency symbols changed from $ to €
- [ ] Budget amounts adjusted to realistic EUR values
- [ ] Climate data matches German conditions (not Mediterranean or US)
- [ ] Conversion formulas verified for accuracy
- [ ] Added metric reference notes where helpful

---

## 📤 DELIVERABLES

1. **Fixed Files**: 5 implementation task files with corrected units and geography
2. **Conversion Log**: List of all units converted with verification
3. **Pull Request**:
   - Branch: `fix-round-2/agent-04-geographic-units`
   - Title: "Fix Round 2: Agent 04 - Geographic & Unit Corrections"
   - Description: "Converted imperial to metric, replaced US content with German equivalents"

---

**Status**: Ready for Execution
**Priority**: 🔴 HIGH - Execute in parallel with Agent 03
