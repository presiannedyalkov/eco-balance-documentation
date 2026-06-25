#!/usr/bin/env node
// Ecology engine: turn each bioregion parameter profile into a starting
// planting brief (ecosystem, native palette, planting window, hazards).
// A site-specific plan refines this once land is chosen.
const fs = require('fs');
const path = require('path');
const { walk, splitFrontmatter, frontField, frontList } = require('../lib/common');

const ROOT = path.resolve(__dirname, '../..');
const PARAMS = path.join(ROOT, 'parameters');
const OUT = path.join(ROOT, '_engines/_reports');

let md = `# Planting briefs\n\nA starting palette per bioregion, generated from the parameter profiles. Refine to the actual site once chosen.\n\n`;
let n = 0;
for (const f of walk(PARAMS)) {
  const { front } = splitFrontmatter(fs.readFileSync(f, 'utf8'));
  if (frontField(front, 'kind') !== 'parameter-profile') continue;
  n++;
  const country = frontField(front, 'country') || frontField(front, 'id');
  const palette = frontList(front, 'native_palette');
  const hazards = frontList(front, 'hazards');
  md += `## ${country}\n\n`;
  md += `- **Climate zone:** ${frontField(front, 'climate_zone') || '?'}\n`;
  md += `- **Target ecosystem:** ${frontField(front, 'target_ecosystem') || '?'}\n`;
  md += `- **Planting window:** ${frontField(front, 'planting_window') || '?'}\n`;
  md += `- **Plausible hectares:** ${(frontList(front, 'plausible_hectares').join('–')) || '?'}\n`;
  md += `- **Key hazards:** ${hazards.join(', ') || '?'}\n`;
  md += `- **Starting palette (${palette.length}):** ${palette.join(', ')}\n\n`;
}
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'planting-briefs.md'), md);
console.log(`Ecology: ${n} bioregion briefs -> _engines/_reports/planting-briefs.md`);
