'use client';
import { useState } from 'react';
import Link from 'next/link';
import { empanelments } from '@/data/hospital';
import styles from './empanelments.module.css';

export default function EmpanelmentsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const types = ['All', 'Government', 'Private Insurance', 'PSU Insurance', 'Government/PSU', 'TPA'];
  const filtered = empanelments.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.fullName.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || e.type === filter;
    return matchSearch && matchFilter;
  });

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-tag" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>Cashless Treatment</span>
          <h1>Insurance & Empanelments</h1>
          <p>Cashless treatment available for 20+ insurance companies and government health schemes.</p>
          <div className={styles.heroStats}>
            <div><strong>20+</strong><span>Partners</span></div>
            <div><strong>100%</strong><span>Cashless</span></div>
            <div><strong>Quick</strong><span>Claims</span></div>
            <div><strong>Dedicated</strong><span>TPA Desk</span></div>
          </div>
        </div>
      </section>

      {/* Cashless Process */}
      <section className={styles.processSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">How It Works</span>
            <h2>Cashless Treatment Process</h2>
          </div>
          <div className={styles.steps}>
            {[
              { num: '1', icon: '🔍', title: 'Check Empanelment', desc: 'Verify if your insurance is empanelled with us' },
              { num: '2', icon: '🪪', title: 'Carry Documents', desc: 'Bring your insurance card & valid photo ID' },
              { num: '3', icon: '✅', title: 'TPA Verification', desc: 'Our TPA desk verifies your coverage' },
              { num: '4', icon: '🏥', title: 'Get Treatment', desc: 'Receive treatment — we handle paperwork' },
              { num: '5', icon: '🎉', title: 'Discharge', desc: 'Get discharged without paying (within limits)' },
            ].map((step, i) => (
              <div key={i} className={styles.step}>
                <div className={styles.stepIcon}>{step.icon}</div>
                <span className={styles.stepNum}>Step {step.num}</span>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
                {i < 4 && <div className={styles.stepArrow}>→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className={styles.listSection}>
        <div className="container">
          <div className={styles.filterBar}>
            <div className={styles.searchBox}>
              <span>🔍</span>
              <input type="text" placeholder="Search your insurance provider..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className={styles.filterTabs}>
              {types.map(t => (
                <button key={t} className={`${styles.tab} ${filter === t ? styles.tabActive : ''}`} onClick={() => setFilter(t)}>{t}</button>
              ))}
            </div>
          </div>

          <div className={styles.grid}>
            {filtered.map(emp => (
              <div key={emp.id} className={styles.card}>
                <div className={styles.cardIcon}>
                  {emp.type === 'Government' ? '🏛️' : emp.type === 'TPA' ? '📋' : emp.type.includes('PSU') ? '🏢' : '🛡️'}
                </div>
                <h4>{emp.name}</h4>
                <p className={styles.fullName}>{emp.fullName}</p>
                <span className={styles.typeBadge} data-type={emp.type}>{emp.type}</span>
                <p className={styles.desc}>{emp.description}</p>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className={styles.noResults}>
              <span style={{ fontSize: '48px' }}>🔍</span>
              <h3>Insurance provider not found</h3>
              <p>Contact our TPA desk to check if your insurance is covered.</p>
              <a href="tel:8006005111" className="btn btn-primary">📞 Call TPA Desk</a>
            </div>
          )}
        </div>
      </section>

      {/* TPA Desk */}
      <section className={styles.tpaSection}>
        <div className="container">
          <div className={styles.tpaCard}>
            <div>
              <h3>Insurance & TPA Helpdesk</h3>
              <p>Our dedicated TPA desk is available to assist with all insurance-related queries, pre-authorization, and cashless claim processing.</p>
              <ul className={styles.tpaDocs}>
                <li>📋 Insurance Card / Policy Document</li>
                <li>🪪 Valid Photo ID (Aadhaar/Voter ID)</li>
                <li>📝 Doctor&apos;s Referral (if any)</li>
                <li>🏥 Previous Medical Records</li>
              </ul>
            </div>
            <div className={styles.tpaContact}>
              <a href="tel:8006005111" className="btn btn-primary btn-lg">📞 Call TPA Desk</a>
              <a href="mailto:wecare@krmemorialhospital.com" className="btn btn-outline btn-lg">📧 Email Query</a>
            </div>
          </div>
        </div>
      </section>

      {/* Not Covered CTA */}
      <section className={styles.ctaSection}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Don&apos;t See Your Insurance?</h2>
          <p>Contact us to check coverage or request your provider to be added. We also offer affordable self-pay packages and EMI options.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary btn-lg">📞 Contact Us</Link>
            <Link href="/patient-services" className="btn btn-white btn-lg">💰 Self-Pay Options</Link>
          </div>
        </div>
      </section>
    </>
  );
}
