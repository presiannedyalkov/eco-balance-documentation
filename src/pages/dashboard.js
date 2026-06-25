import React from 'react';
import Layout from '@theme/Layout';
import status from '@site/state/status.json';

const wrap = { maxWidth: 820, margin: '0 auto', padding: '2rem 1rem' };
const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 12, margin: '18px 0' };
const card = { border: '1px solid var(--ifm-color-emphasis-200)', borderRadius: 12, padding: 14 };
const klabel = { fontSize: '.8rem', textTransform: 'uppercase', opacity: 0.7 };

function Card({ k, v }) {
  return <div style={card}><div style={klabel}>{k}</div><div style={{ fontSize: '1.05rem', marginTop: 4 }}>{v}</div></div>;
}

export default function Dashboard() {
  const s = status || {};
  const f = s.funding || {};
  const pct = f.target_eur ? Math.round((100 * (f.raised_eur || 0)) / f.target_eur) : null;
  return (
    <Layout title="Status" description="Eco Balance project status">
      <main style={wrap}>
        <h1>Project status</h1>
        <p><em>Updated {(s.updated || '').slice(0, 10)} · phase: <b>{s.phase}</b></em></p>
        <div style={grid}>
          <Card k="People" v={s.people ? `${s.people.founders} in ${s.people.location}, ${s.people.capacity}` : '?'} />
          <Card k="Land" v={s.land ? `${s.land.status} — target ${s.land.hectares_target || '?'} ha` : '?'} />
          <Card k="Entity" v={s.entity ? s.entity.status : '?'} />
          <Card k="On land" v={(s.restoration && s.restoration.on_land) ? 'yes' : 'no'} />
        </div>
        <h2>Funding</h2>
        {pct !== null ? (
          <div>
            <div style={{ height: 14, background: 'var(--ifm-color-emphasis-200)', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: 'var(--ifm-color-primary)' }} />
            </div>
            <p>{pct}% — €{f.raised_eur || 0} of €{f.target_eur}</p>
          </div>
        ) : (
          <p>{f.started ? 'In progress' : 'Not started'} — €{f.raised_eur || 0} raised. {f.approach || ''}</p>
        )}
        {s.milestones && <><h2>Milestones</h2><ul>{s.milestones.map((m, i) => <li key={i}>{(m.date || '').slice(0, 10)} — {m.note}</li>)}</ul></>}
        {s.next && <><h2>Next</h2><ul>{s.next.map((x, i) => <li key={i}>{x}</li>)}</ul></>}
      </main>
    </Layout>
  );
}
