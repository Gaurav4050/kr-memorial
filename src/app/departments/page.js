import Link from 'next/link';
import { departments } from '@/data/hospital';
import styles from './departments.module.css';

export const metadata = {
  title: 'Our Departments — 15 Super Specialties Under One Roof | K.R. Memorial Hospital',
  description: 'Explore 15 super-specialty departments at K.R. Memorial Hospital Jaipur — Cardiology, Orthopaedics, Neurology, Nephrology, Oncology and more.',
};

export default function DepartmentsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOrb1} /><div className={styles.heroOrb2} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className={styles.heroTag}>🏥 Our Specialties</span>
          <h1 className={styles.heroH1}>
            15 World-Class<br /><em>Departments</em>
          </h1>
          <p className={styles.heroSub}>
            Comprehensive super-specialty care — all under one roof, staffed by experts with state-of-the-art infrastructure.
          </p>
          {/* Quick stats */}
          <div className={styles.heroStats}>
            {[
              { num: '19', label: 'Departments' },
              { num: '50+', label: 'Specialists' },
              { num: '200+', label: 'Beds' },
              { num: '24/7', label: 'Emergency' },
            ].map((s, i) => (
              <div key={i} className={styles.heroStat}>
                <div className={styles.heroStatNum}>{s.num}</div>
                <div className={styles.heroStatLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEPARTMENTS GRID ── */}
      <section className={styles.deptSection}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="section-tag">Quick Navigation</span>
            <h2>Explore All Specialties</h2>
            <p>Click any department to learn about treatments, doctors, and OPD timings.</p>
          </div>
          <div className={styles.grid}>
            {departments.map((dept, i) => (
              <Link
                href={`/departments/${dept.id}`}
                key={dept.id}
                className={styles.card}
                style={{ '--dc': dept.color, '--delay': `${i * 0.04}s` }}
              >
                {/* Top colored banner */}
                <div className={styles.cardBanner} style={{ background: `linear-gradient(135deg, ${dept.color}22, ${dept.color}10)` }}>
                  <div className={styles.cardIconWrap} style={{ background: dept.color + '20', border: `2px solid ${dept.color}30` }}>
                    <span className={styles.cardIcon}>{dept.icon}</span>
                  </div>
                  <span className={styles.cardArrow} style={{ color: dept.color }}>→</span>
                </div>

                {/* Body */}
                <div className={styles.cardBody}>
                  <h3 className={styles.cardName}>{dept.name}</h3>
                  <p className={styles.cardDesc}>{dept.description}</p>

                  {/* OPD info */}
                  <div className={styles.cardOpdRow}>
                    <span>🗓 {dept.opdDays}</span>
                    <span className={styles.dividerDot}>·</span>
                    <span>🕐 {dept.opdTime}</span>
                  </div>

                  {/* Treatment tags */}
                  <div className={styles.cardTags}>
                    {dept.treatments.slice(0, 3).map(t => (
                      <span key={t} className={styles.tag} style={{ background: `${dept.color}10`, color: dept.color, border: `1px solid ${dept.color}25` }}>
                        {t}
                      </span>
                    ))}
                    {dept.treatments.length > 3 && (
                      <span className={styles.tagMore} style={{ color: dept.color }}>
                        +{dept.treatments.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Animated bottom accent */}
                <div className={styles.cardAccent} style={{ background: dept.color }} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── INFRASTRUCTURE HIGHLIGHT ── */}
      <section className={styles.infraSection}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="section-tag">Why Choose Us</span>
            <h2>World-Class <em>Infrastructure</em></h2>
            <p>Our state-of-the-art facilities ensure precision diagnosis and the best possible treatment outcomes.</p>
          </div>
          <div className={styles.infraGrid}>
            {[
              { icon: '🏗️', title: 'Modular Operation Theatres', desc: 'Multiple laminar-airflow OTs with advanced laparoscopic & robotic surgery support.', color: '#0B3D91' },
              { icon: '🫀', title: 'Cardiac Cath Lab',           desc: 'Flat-panel cath lab for angiography, angioplasty & 24/7 primary PCI procedures.',  color: '#DC2626' },
              { icon: '🔬', title: 'ICU & Critical Care',        desc: '100+ bed ICU with multi-para monitors, ventilators, and 24/7 intensivist cover.',  color: '#D97706' },
              { icon: '💉', title: 'Dialysis Unit',              desc: 'Modern Fresenius hemodialysis machines with RO water plant and trained nurses.',    color: '#10B981' },
              { icon: '🧬', title: 'Diagnostics Lab',            desc: 'Fully automated pathology lab with NABL-aspirant quality and rapid reporting.',      color: '#8B5CF6' },
              { icon: '🚑', title: 'ALS Ambulances',             desc: 'Fleet of advanced life-support ambulances with trained paramedic teams 24×7.',      color: '#F59E0B' },
            ].map((item, i) => (
              <div key={i} className={styles.infraCard} style={{ '--ic': item.color }}>
                <div className={styles.infraIcon} style={{ background: item.color + '16', color: item.color }}>
                  {item.icon}
                </div>
                <div>
                  <h4 className={styles.infraTitle}>{item.title}</h4>
                  <p className={styles.infraDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaGlow} />
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <span className={styles.ctaTag}>Need Help?</span>
          <h2 className={styles.ctaH2}>Can&apos;t Decide Which <em>Department?</em></h2>
          <p className={styles.ctaSub}>
            Our reception team will guide you to the right specialist. Call us or book a General Medicine consultation.
          </p>
          <div className={styles.ctaBtns}>
            <a href="tel:8006005111" className="btn btn-primary btn-lg">📞 Call 8006005111</a>
            <Link href="/appointment" className="btn btn-secondary btn-lg">📅 Book Appointment</Link>
          </div>
        </div>
      </section>
    </>
  );
}
