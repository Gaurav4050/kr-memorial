'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { managementTeam, directorProfiles, groupInstitutions } from '@/data/hospital';
import styles from './about.module.css';

const timeline = [
  { year: '2020', title: 'Hospital Founded', desc: 'K.R. Memorial Hospital established with a mission to bring specialized healthcare to Chomu and rural Rajasthan.', icon: '🏥' },
  { year: '2011', title: 'First OT Complex', desc: 'State-of-the-art operation theatre complex inaugurated with two modular OTs.', icon: '🔬' },
  { year: '2013', title: 'ICU Expansion', desc: 'Advanced ICU with ventilators and multi-para monitors set up for critical care patients.', icon: '💉' },
  { year: '2015', title: '100-Bed Milestone', desc: 'Hospital capacity expanded to 100 beds with new departments added.', icon: '🛏️' },
  { year: '2017', title: 'Nephrology & Dialysis', desc: 'Dedicated Nephrology department and modern dialysis unit established.', icon: '🫁' },
  { year: '2019', title: 'Cath Lab & Cardiology', desc: 'Interventional Cardiology department launched with flat-panel cath lab — first in the region.', icon: '🫀' },
  { year: '2020', title: 'COVID ICU', desc: 'Rapidly set up dedicated COVID ICU to serve the community during the pandemic.', icon: '🩺' },
  { year: '2022', title: '200+ Beds Achieved', desc: 'Hospital capacity reaches 200+ beds with 15 super-specialties operational.', icon: '🌟' },
  { year: '2026', title: 'Today & Beyond', desc: 'Serving 25,000+ patients annually with a vision to reach every village in Rajasthan.', icon: '🚀' },
];

const infraItems = [
  { icon: '🏗️', title: 'Ultra-Modern OT Complex', desc: 'Multiple modular operation theatres with laminar airflow, HD laparoscopic systems, and advanced surgical equipment.' },
  { icon: '🫀', title: 'Cardiac Cath Lab', desc: 'State-of-the-art flat-panel cath lab for coronary angiography, angioplasty, and 24/7 primary PCI capability.' },
  { icon: '🔬', title: 'Advanced ICU & Critical Care', desc: 'Multi-bed ICU with latest ventilators, multi-para monitors, CRRT machines, and round-the-clock intensivist coverage.' },
  { icon: '💉', title: 'Dedicated Dialysis Unit', desc: 'Modern hemodialysis center with Fresenius machines, RO water plant, and comfortable patient stations.' },
];

const accreditations = [
  { icon: '🏆', label: 'Quality Healthcare Award 2023' },
  { icon: '📜', label: 'ISO 9001:2015 Certified' },
  { icon: '🏛️', label: 'NABH Accredited' },
  { icon: '🎖️', label: 'Best Multi-Specialty Hospital – Rajasthan 2022' },
  { icon: '🌟', label: 'Top Rated Hospital – Google Reviews' },
];

const groupIcons = {
  '🏥': (name) => /hospital/i.test(name),
  '🎓': (name) => /college|nursing|school|b\.sc|gnm/i.test(name),
  '🔬': (name) => /paramedical/i.test(name),
  '💊': (name) => /pharmacy|llp/i.test(name),
  '📚': (name) => /career|coaching|institute/i.test(name),
  '🏫': (name) => /school/i.test(name),
};

function getInstIcon(name) {
  if (/hospital/i.test(name)) return '🏥';
  if (/paramedical/i.test(name)) return '🔬';
  if (/pharmacy|llp/i.test(name)) return '💊';
  if (/career|coaching/i.test(name)) return '📚';
  if (/public school/i.test(name)) return '🏫';
  if (/college|nursing|school/i.test(name)) return '🎓';
  return '🏢';
}

const groupAccents = ['#0B3D91', '#00897B', '#F59E0B'];

export default function AboutPage() {
  const [activeTimeline, setActiveTimeline] = useState(null);
  const [activeGroup, setActiveGroup] = useState(0);

  return (
    <>
      {/* ════════════════════════════════
          01. HERO SECTION
      ════════════════════════════════ */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGrid} />
        <div className={styles.heroOrb1} />
        <div className={styles.heroOrb2} />
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.heroLeft}>
              <span className={styles.heroTag}>Our Story</span>
              <h1 className={styles.heroH1}>Healing Lives in the<br /><em>Heart of Rajasthan</em></h1>
              <p className={styles.heroSub}>Since 2020, K.R. Memorial Hospital has been committed to providing world-class healthcare at affordable prices to the people of Rajasthan.</p>
              <div className={styles.heroCtas}>
                <Link href="/appointment" className="btn btn-primary btn-lg">📅 Book Appointment</Link>
                <Link href="/contact" className="btn btn-secondary btn-lg">📞 Contact Us</Link>
              </div>
            </div>
            <div className={styles.heroRight}>
              <div className={styles.heroStatsGrid}>
                {[
                  { num: 'Est.\n2020', label: 'Founded' },
                  { num: '200+', label: 'Hospital Beds' },
                  { num: '15', label: 'Super Specialties' },
                  { num: '150000+', label: 'Patients treated' }
                ].map((stat, i) => (
                  <div key={i} className={styles.heroStatBox}>
                    <div className={styles.heroStatNum}>{stat.num}</div>
                    <div className={styles.heroStatLabel}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          02. STORY SECTION
      ════════════════════════════════ */}
      <section className={styles.storySection}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyImageWrap}>
              <div className={styles.storyImageFrame}>
                <Image
                  src="/hero-hospital6.png"
                  alt="K.R. Memorial Hospital building"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className={styles.storyImg}
                />
                <div className={styles.storyImgGradient} />
              </div>
              <div className={styles.storyYearBadge}>
                <span>Est.</span>
                <strong>2020</strong>
              </div>
              <div className={styles.storyNabhBadge}>
                <span>🏅</span>
                <div>
                  <strong>NABH</strong>
                  <small>Accredited</small>
                </div>
              </div>
            </div>

            <div className={styles.storyContent}>
              <span className="section-tag">Our Journey</span>
              <h2>From Vision to <em>Reality</em></h2>
              <div className={styles.accentLine} />
              <p className={styles.dropCap}>
                K.R. Memorial Hospital was born from a simple yet powerful vision — to bring world-class multi-specialty healthcare to the people of semi-urban and rural Rajasthan, where families often had to travel hundreds of kilometers to access advanced medical treatment.
              </p>
              <p>
                Located on Radhaswami Bagh, NH52, Sikar Road, Chomu, Jaipur, just 35 km from Jaipur, the hospital started as a modest facility and has grown into a 200+ bedded multi-super specialty hospital with 15 specialized departments, 50+ expert doctors, and the latest medical technology.
              </p>
              <p>
                What sets us apart is our unwavering commitment to providing best-in-class healthcare at prices accessible to the communities we serve. From general medicine to complex cardiac surgeries, we handle it all under one roof.
              </p>
              <blockquote className={styles.pullQuote}>
                &ldquo;Our mission is to provide the best possible medical care using cutting-edge technology, delivered by compassionate professionals, at prices accessible to all.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          03. MISSION / VISION / VALUES
      ════════════════════════════════ */}
      <section className={styles.mvvSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Core Values</span>
            <h2>Mission, Vision &amp; Values</h2>
            <p>The principles that guide everything we do at K.R. Memorial Hospital.</p>
          </div>
          <div className={styles.mvvGrid}>
            {[
              {
                icon: '🎯', title: 'Our Mission', color: '#0B3D91',
                body: 'Providing best-in-class healthcare through fully equipped ultra-modern facilities at affordable prices, ensuring every patient receives world-class medical care regardless of their economic background.',
                tags: ['Patient-First', 'Excellence', 'Compassion'],
              },
              {
                icon: '👁️', title: 'Our Vision', color: '#10B981',
                body: 'To reach every village in Rajasthan through peripheral outreach centers and telemedicine, making specialized healthcare accessible to the remotest communities of the state.',
                tags: ['Universal Access', 'Telemedicine', 'Community Reach'],
              },
              {
                icon: '💎', title: 'Our Values', color: '#F59E0B',
                body: 'We believe in transparency, ethics, and a deep commitment to patient welfare. Our culture is built on kindness, innovation, and academic excellence.',
                tags: ['Integrity', 'Innovation', 'Accessibility', 'Compassion'],
              },
            ].map((item, i) => (
              <div key={i} className={styles.mvvCard} style={{ '--mvc': item.color }}>
                <div className={styles.mvvIconCircle} style={{ background: item.color + '18', color: item.color }}>
                  <span>{item.icon}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <div className={styles.mvvTags}>
                  {item.tags.map(t => (
                    <span key={t} style={{ background: item.color + '14', color: item.color, border: `1px solid ${item.color}30` }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          04. LEADERSHIP TEAM — CKSH-style alternating rows
          Odd  → image LEFT  + text RIGHT  (white bg)
          Even → text LEFT  + image RIGHT  (light bg)
      ════════════════════════════════ */}
      <section className={styles.leaderSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Leadership</span>
            <h2>Our Leadership Team</h2>
            <p>Experienced professionals dedicated to excellence in healthcare and education across Rajasthan.</p>
          </div>
        </div>

        {/* Full-width alternating rows */}
        <div className={styles.leaderList}>
          {directorProfiles.map((director, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={director.id}
                className={`${styles.leaderRow} ${isReversed ? styles.leaderRowReverse : ''}`}
              >
                {/* ── IMAGE SIDE ── */}
                <div className={styles.leaderImgSide}>
                  {/* Outer card — the rounded box with border */}
                  <div className={styles.leaderImgCard}>
                    {/* Inner frame — photo overflows from top of card */}
                    <div className={styles.leaderImgFrame}>
                      <Image
                        src={director.image}
                        alt={director.name}
                        fill
                        sizes="(max-width:768px) 100vw, 400px"
                        className={styles.leaderImgPhoto}
                      />
                    </div>
                  </div>
                </div>

                {/* ── TEXT SIDE ── */}
                <div className={styles.leaderContentSide}>
                  {/* Name — large, CKSH-style blue heading */}
                  <h3 className={styles.leaderName}>{director.name}</h3>
                  {/* Title in parentheses below name */}
                  <p className={styles.leaderTitle}>( {director.title} )</p>
                  {/* Qualification in accent/orange color */}
                  {director.qualification && (
                    <p className={styles.leaderQual}>{director.qualification}</p>
                  )}
                  {/* Horizontal rule */}
                  <div className={styles.leaderDivider} />
                  {/* Full bio */}
                  <p className={styles.leaderBioText}>{director.shortBio}</p>
                  {/* Tagline in italics */}
                  {director.tagline && (
                    <p className={styles.leaderTagline}>&ldquo;{director.tagline}&rdquo;</p>
                  )}
                  {/* Expertise bullets */}
                  <ul className={styles.leaderExpertiseList}>
                    {director.expertise.slice(0, 3).map((item, i) => (
                      <li key={i} className={styles.leaderExpItem}>
                        <span className={styles.leaderExpDot} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {/* Badges row */}
                  {/* <div className={styles.leaderBadgeRow}>
                    <span className={styles.leaderExpBadge}>
                      🏆 {director.experience} Experience
                    </span>
                    {director.age && (
                      <span className={styles.leaderAgeBadge}>
                        👤 Age: {director.age}
                      </span>
                    )}
                  </div> */}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ════════════════════════════════
          05. TIMELINE
      ════════════════════════════════ */}
      {/* <section className={styles.timelineSection}> */}

      {/* ════════════════════════════════
          05-B. GROUP ECOSYSTEM
      ════════════════════════════════ */}
      <section className={styles.groupSection}>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* ── Header ── */}
          <div className={`section-header ${styles.groupHeader}`}>
            <span className={styles.groupSectionTag}>✦ K.R. Group Ecosystem ✦</span>
            <h2 className={styles.groupH2} style={{
              color:"#fff"
            }}>One Vision.<br /><em className={styles.groupH2Em}>Many Institutions.</em></h2>
            <p className={styles.groupSubtitle} style={{color:"#fff"}}>
              From super-specialty hospital care to world-class education — the K.R. Group is building a complete ecosystem for a healthier, more educated Rajasthan.
            </p>
          </div>

          {/* ── Stat counters ── */}
          <div className={styles.groupStats}>
            {[
              { num: groupInstitutions.reduce((acc, g) => acc + g.institutions.length, 0), label: 'Institutions', icon: '🏛️', color: '#F59E0B', glow: 'rgba(245,158,11,0.4)' },
              { num: groupInstitutions.length, label: 'Groups', icon: '🌐', color: '#00897B', glow: 'rgba(0,137,123,0.4)' },
              { num: '200+', label: 'Hospital Beds', icon: '🛏️', color: '#1a5eb8', glow: 'rgba(26,94,184,0.4)' },
              { num: '2000+', label: 'Seats / Students', icon: '🎓', color: '#10B981', glow: 'rgba(16,185,129,0.4)' },
            ].map((s, i) => (
              <div key={i} className={styles.groupStat} style={{ '--sc': s.color, '--sg': s.glow }}>
                <div className={styles.groupStatTop}>
                  <span className={styles.groupStatIcon}>{s.icon}</span>
                  <span className={styles.groupStatNum}>{s.num}</span>
                </div>
                <span className={styles.groupStatLabel}>{s.label}</span>
                <div className={styles.groupStatGlow} />
              </div>
            ))}
          </div>

          {/* ── Tab bar ── */}
          <div className={styles.groupTabs}>
            {groupInstitutions.map((g, i) => (
              <button
                key={i}
                className={`${styles.groupTab} ${activeGroup === i ? styles.groupTabActive : ''}`}
                style={{ '--ga': groupAccents[i] }}
                onClick={() => setActiveGroup(i)}
                aria-selected={activeGroup === i}
              >
                <span className={styles.groupTabDot} style={{ background: groupAccents[i] }} />
                <span className={styles.groupTabName}>{g.group}</span>
                <span className={styles.groupTabCount}>{g.institutions.length}</span>
              </button>
            ))}
          </div>

          {/* ── Panels ── */}
          {groupInstitutions.map((g, gi) => (
            <div
              key={gi}
              className={`${styles.groupPanel} ${activeGroup === gi ? styles.groupPanelVisible : ''}`}
              aria-hidden={activeGroup !== gi}
            >
              {/* Focus banner */}
              <div className={styles.groupFocusBanner} style={{ '--ga': groupAccents[gi] }}>
                <span className={styles.groupFocusIcon}>🎯</span>
                <p><strong>Focus: </strong>{g.focus}</p>
              </div>

              {/* Institution cards */}
              <div className={styles.groupCards}>
                {g.institutions.map((inst, ii) => (
                  <div
                    key={ii}
                    className={styles.groupCard}
                    style={{ '--ga': groupAccents[gi], animationDelay: `${ii * 0.07}s` }}
                  >
                    <div className={styles.groupCardIconWrap}>
                      <span className={styles.groupCardIcon}>{getInstIcon(inst.name)}</span>
                    </div>
                    <div className={styles.groupCardBody}>
                      <h4 className={styles.groupCardName}>{inst.name}</h4>
                      <p className={styles.groupCardActivity}>{inst.activity}</p>
                    </div>
                    {inst.capacity !== '-' && (
                      <div className={styles.groupCardCap} style={{ '--ga': groupAccents[gi] }}>
                        {inst.capacity}
                      </div>
                    )}
                    <div className={styles.groupCardShine} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ════════════════════════════════
          06. INFRASTRUCTURE
      ════════════════════════════════ */}
      <section className={styles.infraSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Facilities</span>
            <h2>Infrastructure Highlights</h2>
            <p>State-of-the-art infrastructure enabling complex procedures and superior patient outcomes.</p>
          </div>
          <div className={styles.infraGrid}>
            {infraItems.map((item, i) => (
              <div key={i} className={styles.infraCard}>
                <div className={styles.infraIconCircle}>{item.icon}</div>
                <div className={styles.infraBody}>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          07. ACCREDITATIONS
      ════════════════════════════════ */}
      <section className={styles.accredSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff' }}>Recognition</span>
            <h2 style={{ color: '#fff' }}>Accreditations &amp; Awards</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>Independent recognition of our commitment to excellence in patient care and safety.</p>
          </div>
          <div className={styles.accredGrid}>
            {accreditations.map((item, i) => (
              <div key={i} className={styles.accredCard}>
                <span className={styles.accredIcon}>{item.icon}</span>
                <span className={styles.accredLabel}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          08. CTA
      ════════════════════════════════ */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaInner}>
            <div className={styles.ctaLeft}>
              <h2>Join Our Growing Team</h2>
              <p>We&apos;re always looking for passionate medical professionals who share our vision of accessible healthcare in Rajasthan.</p>
            </div>
            <div className={styles.ctaBtns}>
              <a href={`mailto:${managementTeam?.[0]?.email || 'wecare@krmemorialhospital.com'}`} className="btn btn-primary btn-lg">📧 Send Your Resume</a>
              <Link href="/contact" className="btn btn-secondary btn-lg">📞 Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
