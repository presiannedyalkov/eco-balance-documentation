#!/usr/bin/env node
// Generate the data the interactive React pages consume:
//   src/data/params.json  — bioregion profiles for /explorer
// (the dashboard imports state/status.json directly)
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { walk, splitFrontmatter } = require('../lib/common');

const ROOT = path.resolve(__dirname, '../..');
const params = [];
for (const f of walk(path.join(ROOT, 'parameters'))) {
  try {
    const { front } = splitFrontmatter(fs.readFileSync(f, 'utf8'));
    const d = yaml.load(front);
    if (d && d.kind === 'parameter-profile') params.push(d);
  } catch (e) {}
}
fs.mkdirSync(path.join(ROOT, 'src/data'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'src/data/params.json'), JSON.stringify(params, null, 2) + '\n');
console.log('Widgets data: src/data/params.json (' + params.length + ' bioregions).');
