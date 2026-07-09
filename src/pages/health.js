import React from 'react';
import Layout from '@theme/Layout';
import health from '@site/src/data/health.json';

const wrap = { maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' };
const gradeColor = { A: '#2e7d32', B: '#558b2f', C: '#f9a825', D: '#ef6c00', F: '#c62828' };
const badge = (g) => ({ display: 'inline-block', minWidth: 22, textAlign: 'center', padding: '1px 8px', borderRadius: 6, color: '#fff', background: gradeColor[g] || '#777', fontWeight: 600 });
const th = { textAlign: 'left', borderBottom: '2px solid var(--ifm-color-emphasis-300)', padding: '6px 8px', fontSize: '.85rem' };
const td = { borderBottom: '1px solid var(--ifm-color-emphasis-200)', padding: '6px 8px' };
const barWrap = { height: 10, background: 'var(--ifm-color-emphasis-200)', borderRadius: 6, overflow: 'hidden', minWidth: 70 };

function Issues({ title, items, empty }) {
  const list = items || [];
  return (
    <>
      <h2>{title} <span style={{ opacity: 0.55, fontWeight: 400 }}>({list.length})</span></h2>
      {list.length ? <ul>{list.map((x, i) => <li key={i}>{x}</li>)}</ul> : <p style={{ opacity: 0.7 }}>{empty}</p>}
    </>
  );
}

export default function Health() {
  const h = health || {};
  const domains = h.domains || [];
  const iss = h.issues || {};
  return (
    <Layout title="System health" description="Automated health of the Eco Balance documentation">
      <main style={wrap}>
        <h1>System health</h1>
        <p><em>Generated {h.generated} · every model domain scored on Model↔Case coverage, evidence, and voice.</em></p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '12px 0 24px' }}>
          <div style={{ fontSize: '2.4rem', fontWeight: 700, lineHeight: 1 }}>{h.overall}<span style={{ fontSize: '1rem', opacity: 0.6 }}>/100</span></div>
          <span style={badge(h.overall_grade)}>{h.overall_grade}</span>
          <span style={{ opacity: 0.7 }}>overall system health</span>
        </div>

        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead><tr>
            <th style={th}>Domain</th><th style={th}>Grade</th><th style={th}>Health</th>
            <th style={th}>Case decision</th><th style={th}>Citations</th><th style={th}>Voice</th>
          </tr></thead>
          <tbody>
            {domains.map((d) => (
              <tr key={d.name}>
                <td style={td}>{d.name}</td>
                <td style={td}><span style={badge(d.grade)}>{d.grade}</span></td>
                <td style={td}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={barWrap}><div style={{ height: '100%', width: `${d.health}%`, background: gradeColor[d.grade] || '#777' }} /></div>
                    <span>{d.health}</span>
                  </div>
                </td>
                <td style={td}>{d.covered ? d.decisions.join(', ') : (d.deferred ? 'deferred' : '—')}</td>
                <td style={td}>{d.citations}</td>
                <td style={td}>{d.voiceHits}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ fontSize: '.85rem', opacity: 0.6, marginTop: 8 }}>
          Score = coverage (a case decision or deferral, 40) + evidence (citations, up to 40) + voice hygiene (up to 20).
        </p>

        <Issues title="Model↔Case drift — uncovered domains" items={iss.uncovered_domains} empty="Every domain has a case decision or deferral." />
        <Issues title="Domain-ID collisions" items={iss.domain_id_collisions} empty="Every domain ID is unique." />
        <Issues title="Orphan decisions" items={iss.orphan_decisions} empty="Every decision maps to a model domain." />
        <Issues title="Off-convention decision status" items={iss.off_convention_decision_status} empty="All decision statuses are valid." />
        <Issues title="Incomplete parameter profiles" items={iss.parameter_gaps} empty="All parameter profiles are complete." />
      </main>
    </Layout>
  );
}
