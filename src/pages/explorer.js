import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import params from '@site/src/data/params.json';

const wrap = { maxWidth: 820, margin: '0 auto', padding: '2rem 1rem' };
const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 12, margin: '18px 0' };
const card = { border: '1px solid var(--ifm-color-emphasis-200)', borderRadius: 12, padding: 14 };
const klabel = { fontSize: '.8rem', opacity: 0.7 };
const rng = a => (a ? `${a[0]}–${a[1]}` : '?');
const pills = a => (a || []).map((x, i) => (
  <span key={i} style={{ display: 'inline-block', background: 'var(--ifm-color-emphasis-100)', borderRadius: 999, padding: '2px 10px', margin: '2px 4px 2px 0', fontSize: '.85rem' }}>{x}</span>
));

export default function Explorer() {
  const [i, setI] = useState(0);
  const p = params[i] || {};
  return (
    <Layout title="Explorer" description="Pick a bioregion for a tailored starting plan">
      <main style={wrap}>
        <h1>Start your own</h1>
        <p>Pick a bioregion to get a tailored starting plan from the model.</p>
        <p><label>Bioregion:{' '}
          <select value={i} onChange={e => setI(Number(e.target.value))}>
            {params.map((x, idx) => <option key={idx} value={idx}>{x.country}</option>)}
          </select>
        </label></p>
        <h2>{p.country}</h2>
        <div style={grid}>
          <div style={card}><div style={klabel}>Climate</div><div>{p.climate_zone}, {rng(p.rainfall_mm)} mm</div></div>
          <div style={card}><div style={klabel}>Plausible hectares</div><div>{rng(p.plausible_hectares)}</div></div>
          <div style={card}><div style={klabel}>Land €/ha</div><div>{rng(p.land_cost_band_eur_per_ha)}</div></div>
          <div style={card}><div style={klabel}>Planting window</div><div>{p.planting_window}</div></div>
        </div>
        <p><b>Target ecosystem:</b> {p.target_ecosystem}</p>
        <p><b>Native palette:</b><br />{pills(p.native_palette)}</p>
        <p><b>Key hazards:</b> {pills(p.key_risks || p.hazards)}</p>
        <p><b>Legal options:</b> {pills(p.legal_options)} <b>Funding:</b> {pills(p.funding_landscape)}</p>
        <h2>Your starting plan</h2>
        <ul>
          <li>Score parcels against the <Link to="/model/site-and-land/choosing-a-site">site criteria</Link>.</li>
          <li>Pick a <Link to="/model/method/00-overview">method</Link> mix for {p.climate_zone} conditions.</li>
          <li>Build a species list from the palette above; plant in the {p.planting_window} window.</li>
          <li>Choose a <Link to="/model/organization/legal-entity">legal form</Link>.</li>
        </ul>
      </main>
    </Layout>
  );
}
