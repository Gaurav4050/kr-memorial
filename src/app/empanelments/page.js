'use client';
import { useState } from 'react';
import Link from 'next/link';
import { empanelments } from '@/data/hospital';
import styles from './empanelments.module.css';

const typeConfig = {
  'Government':        { icon: '🏛️', color: '#0B3D91', label: 'Government' },
  'PSU Insurance':     { icon: '🏢', color: '#10B981', label: 'PSU Insurance' },
  'Private Insurance': { icon: '🛡️', color: '#D97706', label: 'Private Insurance' },
  'Government/PSU':    { icon: '🏛️', color: '#0B3D91', label: 'Govt / PSU' },
  'TPA':               { icon: '📋', color: '#8B5CF6', label: 'TPA' },
};

const steps = [
  { icon: '🔍', title: 'Check Empanelment',  desc: 'Verify if your insurance company is empanelled with us below.' },
  { icon: '🪪', title: 'Carry Documents',     desc: 'Bring your insurance card, photo ID & any previous medical records.' },
  { icon: '✅', title: 'TPA Verification',    desc: 'Our dedicated TPA desk verifies your coverage in minutes.' },
  { icon: '🏥', title: 'Receive Treatment',   desc: 'Get treated — we handle all insurance paperwork on your behalf.' },
  { icon: '🎉', title: 'Cashless Discharge',  desc: 'Leave without paying (within sum insured limits) — stress-free.' },
];

export default function EmpanelmentsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const types = ['All', ...Object.keys(typeConfig)];

  const filtered = empanelments.filter(e => {
    const q = search.toLowerCase();
    return (e.name.toLowerCase().includes(q) || e.fullName.toLowerCase().includes(q))
      && (filter === 'All' || e.type === filter);
  });

  // Stats
  const govCount  = empanelments.filter(e => e.type === 'Government' || e.type === 'Government/PSU').length;
  const psuCount  = empanelments.filter(e => e.type === 'PSU Insurance').length;
  const privCount = empanelments.filter(e => e.type === 'Private Insurance').length;
  const tpaCount  = empanelments.filter(e => e.type === 'TPA').length;

  return (
    <>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOrb1} /><div className={styles.heroOrb2} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.heroGrid}>
            {/* Left */}
            <div className={styles.heroLeft}>
              <span className={styles.heroTag}>💳 Cashless Treatment</span>
              <h1 className={styles.heroH1}>
                Insurance &amp;<br /><em>Empanelments</em>
              </h1>
              <p className={styles.heroSub}>
                Cashless treatment available with 20+ insurance companies and government health schemes — so healthcare costs never stand between you and your recovery.
              </p>
              <div className={styles.heroBtns}>
                <a href="tel:8006005111" className="btn btn-primary btn-lg" title="Call: 8006005111 or 8006005105">📞 Call TPA Desk</a>
                <Link href="/appointment" className="btn btn-secondary btn-lg">📅 Book Appointment</Link>
              </div>
            </div>

            {/* Right — 2x2 stat boxes */}
            <div className={styles.heroRight}>
              {[
                { num: `${empanelments.length}+`, label: 'Total Partners',    icon: '🤝', color: '#FCD34D' },
                { num: `${govCount}`,             label: 'Govt Schemes',      icon: '🏛️', color: '#60A5FA' },
                { num: `${privCount + psuCount}`,  label: 'Private Insurers',  icon: '🛡️', color: '#34D399' },
                { num: `${tpaCount}`,             label: 'TPA Networks',       icon: '📋', color: '#F472B6' },
              ].map((s, i) => (
                <div key={i} className={styles.heroStatBox}>
                  <span className={styles.heroStatIcon}>{s.icon}</span>
                  <div className={styles.heroStatNum} style={{ color: s.color }}>{s.num}</div>
                  <div className={styles.heroStatLabel}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CASHLESS PROCESS ── */}
      <section className={styles.processSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">How It Works</span>
            <h2>Cashless Treatment — <em>Step by Step</em></h2>
            <p>Getting cashless treatment at K.R. Memorial is simple, quick, and hassle-free.</p>
          </div>
          <div className={styles.steps}>
            {steps.map((step, i) => (
              <div key={i} className={styles.step}>
                <div className={styles.stepNum}>{i + 1}</div>
                <div className={styles.stepIconWrap}>{step.icon}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
                {i < steps.length - 1 && <div className={styles.stepLine} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTER + LIST ── */}
      <section className={styles.listSection}>
        <div className="container">
          <div className={styles.filterBar}>
            <div className={styles.searchWrap}>
              <span>🔍</span>
              <input
                type="text"
                placeholder="Search your insurance provider…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className={styles.searchInput}
              />
              {search && <button className={styles.clearBtn} onClick={() => setSearch('')}>✕</button>}
            </div>

            <div className={styles.typeTabs}>
              {types.map(t => {
                const cfg = typeConfig[t];
                const isActive = filter === t;
                
                let activeStyle = {};
                if (isActive) {
                  if (cfg) {
                    activeStyle = { background: cfg.color, borderColor: cfg.color, color: '#fff' };
                  } else {
                    activeStyle = { background: '#E2E8F0', borderColor: '#94A3B8', color: '#000' };
                  }
                }

                return (
                  <button
                    key={t}
                    className={`${styles.typeTab} ${isActive ? styles.typeTabActive : ''}`}
                    style={activeStyle}
                    onClick={() => setFilter(t)}
                  >
                    {cfg?.icon} {cfg?.label || 'All'}
                  </button>
                );
              })}
            </div>

            <div className={styles.resultInfo}>
              <span className={styles.resultNum}>{filtered.length}</span> providers found
            </div>
          </div>

          {/* Cards Grid */}
          {filtered.length === 0 ? (
            <div className={styles.noResults}>
              <span>🔍</span>
              <h3>No insurance provider found</h3>
              <p>Contact our TPA desk to check your insurance coverage.</p>
              <a href="tel:8006005111" className="btn btn-primary" title="Call: 8006005111 or 8006005105">📞 Call TPA Desk</a>
            </div>
          ) : (
            <div className={styles.grid}>
              {filtered.map(emp => {
                const cfg = typeConfig[emp.type] || { icon: '🛡️', color: '#0B3D91', label: emp.type };
                return (
                  <div key={emp.id} className={styles.card} style={{ '--epc': cfg.color }}>
                    <div className={styles.cardTop}>
                      <div className={styles.cardIconBox} style={{ background: `${cfg.color}14`, color: cfg.color }}>
                        {cfg.icon}
                      </div>
                      <span className={styles.cardType} style={{ color: cfg.color, background: `${cfg.color}12`, border: `1px solid ${cfg.color}30` }}>
                        {cfg.label}
                      </span>
                    </div>
                    <h4 className={styles.cardName}>{emp.name}</h4>
                    <p className={styles.cardFull}>{emp.fullName}</p>
                    <p className={styles.cardDesc}>{emp.description}</p>
                    <div className={styles.cardFooter}>
                      <span className={styles.cardCashless}>✅ Cashless Available</span>
                    </div>
                    <div className={styles.cardAccent} style={{ background: cfg.color }} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── TPA HELPDESK ── */}
      <section className={styles.tpaSection}>
        <div className="container">
          <div className={styles.tpaCard}>
            <div className={styles.tpaLeft}>
              <span className={styles.tpaTag}>🏥 TPA Helpdesk</span>
              <h3>Insurance &amp; TPA<br /><em>Help Center</em></h3>
              <p>Our dedicated TPA team assists with pre-authorization, claim processing, document submission, and all insurance queries — from admission to discharge.</p>
              <div className={styles.tpaDocList}>
                {['Insurance Card / Policy Document', 'Valid Photo ID (Aadhaar / Voter ID)', "Doctor's Referral Letter (if applicable)", 'Previous Medical Records / Reports'].map((doc, i) => (
                  <div key={i} className={styles.tpaDoc}>
                    <span className={styles.tpaDocCheck}>✓</span>
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.tpaRight}>
              <div className={styles.tpaContactCard}>
                <div className={styles.tpaContactIcon}>📞</div>
                <div className={styles.tpaContactTitle}>Call Our TPA Desk</div>
                  <div className={styles.tpaContactNum}>8006005111 / 8006005105</div>
                <div className={styles.tpaContactSub}>Available 24/7 for insurance queries</div>
                  <a href="tel:8006005111" className="btn btn-primary btn-lg" style={{ marginTop: '12px' }} title="Call: 8006005111 or 8006005105">
                  Call Now
                </a>
              </div>
              <a href="mailto:wecare@krmemorialhospital.com" className={styles.emailBtn}>
                📧 Email Your Query
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <div>
            <h2>Don&apos;t See Your Insurance?</h2>
            <p>Contact us to verify coverage, or ask your insurer to be added. We also offer affordable self-pay packages &amp; EMI options.</p>
          </div>
          <div className={styles.ctaBtns}>
            <Link href="/contact" className="btn btn-primary btn-lg">📞 Contact Us</Link>
            <Link href="/patient-services" className="btn btn-secondary btn-lg">💰 Self-Pay Options</Link>
          </div>
        </div>
      </section>
    </>
  );
}
