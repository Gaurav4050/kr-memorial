const fs = require('fs');
const path = require('path');

const targetDir = path.resolve('../sidhivinayak');

// Helper to replace all occurrences
function replaceInFile(filePath, replacements) {
  const fullPath = path.join(targetDir, filePath);
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');
  for (const [from, to] of replacements) {
    content = content.replaceAll(from, to);
  }
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Updated: ${filePath}`);
}

// 1. About page
const aboutPageJs = `'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { managementTeam, directorProfiles, groupInstitutions, ourTeam, hospitalInfo } from '@/data/hospital';
import styles from './about.module.css';

const timeline = [
  { year: '2017', title: 'Foundation & Vision', desc: 'Siddhi Vinayak Hospital established with a commitment to bring advanced multi-speciality healthcare and research to Chomu and Jaipur Rural.', icon: '🏥' },
  { year: '2018', title: 'Modular OT Complex', desc: 'State-of-the-art operation theatre complex inaugurated with laminar airflow and high-definition laparoscopy equipment.', icon: '🔬' },
  { year: '2019', title: 'ICU & Critical Care', desc: 'Comprehensive Intensive Care Units (ICU/CCU) with invasive monitoring, ventilators, and emergency resuscitation bays.', icon: '💉' },
  { year: '2021', title: 'Nephrology & 24/7 Dialysis', desc: 'Dedicated Nephrology department and 15-station Haemodialysis Centre with advanced RO filtration.', icon: '🩺' },
  { year: '2023', title: 'Cath Lab & Cardiac Sciences', desc: 'Advanced Digital Flat-Panel Cath Lab launched for 24/7 emergency primary angioplasty, pacemaker implants, and angiography.', icon: '🫀' },
  { year: '2025', title: '200+ Beds Super Specialty', desc: 'Expanded to 200+ beds, 18 clinical specialties, Level III NICU, and 50+ doctor panel.', icon: '🌟' },
  { year: '2026', title: 'Today & Beyond', desc: 'Serving over 35,000+ patients annually with cutting-edge medical technology, ethical care, and cashless government schemes.', icon: '🚀' },
];

const infraItems = [
  { icon: '🫀', title: 'Advanced Cardiac Cath Lab', desc: 'State-of-the-art flat-panel cath lab for coronary angiography, emergency angioplasty (PTCA), and 24/7 primary PCI capability.' },
  { icon: '🏗️', title: 'Laminar Airflow Modular OTs', desc: 'Multi-specialty modular operation theatres with strict HEPA air filtration and 4K laparoscopic surgical towers.' },
  { icon: '🔬', title: '24/7 ICU & Critical Care', desc: 'Intensive Coronary Care Unit (ICCU), Surgical ICU, and Medical ICU with dedicated intensivist and ventilator coverage.' },
  { icon: '🩺', title: '15-Station Haemodialysis Unit', desc: 'Round-the-clock modern dialysis facility with isolated machines, online clearance monitoring, and high-purity RO water.' },
  { icon: '👶', title: 'Level III NICU & PICU', desc: 'Specialized neonatal intensive care with incubators, warmers, and phototherapy for premature and critical infants.' },
  { icon: '🧪', title: '24/7 Diagnostic Pathology & Radiology', desc: 'Automated analyzers, digital X-Ray, CT Scan, Ultrasound, 2D Echo, and fast-track trauma emergency triage.' },
];

const accreditations = [
  { icon: '🏆', label: 'Excellence in Rural Healthcare Award' },
  { icon: '📜', label: 'ISO 9001:2015 Certified Hospital' },
  { icon: '🏛️', label: 'Empanelled with RGHS, ECHS & Ayushman Bharat' },
  { icon: '🎖️', label: 'Leading Super Multi-Specialty Centre 2025' },
  { icon: '🌟', label: 'Top Rated by Patients in Jaipur Rural' },
];

export default function AboutPage() {
  const [activeTimeline, setActiveTimeline] = useState(null);
  const [activeGroup, setActiveGroup] = useState(0);

  return (
    <>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGrid} />
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.heroLeft}>
              <span className={styles.heroTag}>About Our Hospital</span>
              <h1 className={styles.heroH1}>Healing Lives in the<br /><em>Heart of Rajasthan</em></h1>
              <p className={styles.heroSub}>
                Siddhi Vinayak Hospital & Research Centre is a premier 200+ bedded super multi-speciality hospital in Chomu, Jaipur. We bring together 50+ experienced doctors, advanced Cath Lab, 24/7 Dialysis, and comprehensive emergency care at accessible costs.
              </p>
              <div className={styles.heroCtas}>
                <Link href="/appointment" className="btn btn-primary btn-lg">📅 Book Appointment</Link>
                <Link href="/contact" className="btn btn-secondary btn-lg">📞 Contact Us</Link>
              </div>
            </div>
            <div className={styles.heroRight}>
              <div className={styles.heroStatsGrid}>
                {[
                  { num: 'Est.\\n2017', label: 'Founded' },
                  { num: '200+', label: 'Hospital Beds' },
                  { num: '50+', label: 'Doctor Team' },
                  { num: '35,000+', label: 'Patients Treated' }
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

      {/* VISION & MISSION */}
      <section className="section-padding">
        <div className="container">
          <div className={styles.visionGrid}>
            <div className={styles.visionCard}>
              <span className={styles.cardIcon}>🎯</span>
              <h2>Our Vision</h2>
              <p>
                To be the most trusted, patient-centric super multi-speciality hospital and research centre in Rajasthan, providing compassionate, technologically advanced, and affordable medical care.
              </p>
            </div>
            <div className={styles.visionCard}>
              <span className={styles.cardIcon}>🚀</span>
              <h2>Our Mission</h2>
              <p>
                To deliver prompt 24/7 emergency care, interventional cardiology, neurosciences, renal care, and maternal healthcare through state-of-the-art infrastructure and skilled medical practitioners.
              </p>
            </div>
            <div className={styles.visionCard}>
              <span className={styles.cardIcon}>💎</span>
              <h2>Core Values</h2>
              <p>
                Clinical Excellence, Unwavering Integrity, Compassion, Transparency, and Commitment to Community Health and Patient Safety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE */}
      <section className={"section-padding " + styles.infraSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">World-Class Facilities</span>
            <h2>Our Advanced Infrastructure</h2>
            <p>Built to meet the highest national healthcare standards with modular operation suites, cath lab, and critical care units.</p>
          </div>

          <div className={styles.infraGrid}>
            {infraItems.map((item, idx) => (
              <div key={idx} className={styles.infraCard}>
                <div className={styles.infraIcon}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Journey</span>
            <h2>Milestones of Excellence</h2>
            <p>Tracing our evolution into Jaipur Rural leading super multi-speciality hospital.</p>
          </div>

          <div className={styles.timelineList}>
            {timeline.map((item, idx) => (
              <div key={idx} className={styles.timelineItem}>
                <div className={styles.timelineYearBadge}>{item.year}</div>
                <div className={styles.timelineContent}>
                  <h3><span>{item.icon}</span> {item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP & DIRECTORS */}
      <section className={"section-padding " + styles.leadershipSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Clinical & Executive Leadership</span>
            <h2>Board of Directors & Management</h2>
            <p>Guiding Siddhi Vinayak Hospital with medical excellence and ethical healthcare administration.</p>
          </div>

          <div className={styles.directorsGrid}>
            {directorProfiles.map((dir) => (
              <div key={dir.id} className={styles.directorCard}>
                <div className={styles.dirAvatar}>👨‍⚕️</div>
                <h3>{dir.name}</h3>
                <div className={styles.dirRole}>{dir.role}</div>
                <p>{dir.bio}</p>
                <div className={styles.dirExpertise}>
                  {dir.expertise.map((exp, i) => (
                    <span key={i} className={styles.expTag}>• {exp}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GROUP INSTITUTIONS */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Healthcare & Education Network</span>
            <h2>Group Institutions & Allied Facilities</h2>
          </div>

          <div className={styles.groupsGrid}>
            {groupInstitutions.map((grp, idx) => (
              <div key={idx} className={styles.groupCard}>
                <h3>{grp.group}</h3>
                <p className={styles.groupFocus}>{grp.focus}</p>
                <div className={styles.instList}>
                  {grp.institutions.map((inst, i) => (
                    <div key={i} className={styles.instRow}>
                      <strong>{inst.name}</strong>
                      <span>{inst.activity} ({inst.capacity})</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
`;

fs.writeFileSync(path.join(targetDir, 'src/app/about/page.js'), aboutPageJs, 'utf8');
console.log('About page written.');

// 2. Contact page
const contactPageJs = `'use client';
import { useState } from 'react';
import { hospitalInfo, departments, faqs } from '@/data/hospital';
import styles from './contact.module.css';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', department: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      setSubmitted(true);
      setForm({ name: '', phone: '', email: '', subject: '', department: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err) {
      setError('Failed to submit the form. Please call our helpline.');
    } finally {
      setLoading(false);
    }
  };

  const contactCards = [
    { icon: '📞', title: 'Emergency Helplines', main: '01423-294228', sub: '01423-294440 / 9829000000', href: 'tel:01423294228', color: '#DC2626' },
    { icon: '📧', title: 'Email Us', main: hospitalInfo.email, sub: 'Quick inquiry response', href: 'mailto:' + hospitalInfo.email, color: '#008891' },
    { icon: '📍', title: 'Hospital Address', main: 'Near Samod Puliya, Samod Road', sub: 'Chomu, Jaipur, Rajasthan 303702', href: hospitalInfo.mapUrl, color: '#10B981' },
    { icon: '🕐', title: 'Service Hours', main: 'OPD: 8 AM – 8 PM (Mon–Sat)', sub: 'Emergency & Casualty: 24/7 Open', href: null, color: '#FF7700' },
  ];

  return (
    <>
      {/* EMERGENCY BANNER */}
      <div className={styles.emergencyBar}>
        <span className={styles.emergencyPulse} />
        <span>🚨 Life-Threatening Emergency? Call immediately:</span>
        <a href="tel:01423294228" className={styles.emergencyNum}>01423-294228</a>
        <span className={styles.emergencyDiv}>|</span>
        <a href="tel:01423294440" className={styles.emergencyNum}>01423-294440</a>
      </div>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGrid} />
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.heroLeft}>
              <span className={styles.heroTag}>24/7 Assistance & Directions</span>
              <h1 className={styles.heroH1}>Contact <em>Siddhi Vinayak</em><br />Hospital & Research Centre</h1>
              <p className={styles.heroSub}>
                We are here to assist with doctor appointments, emergency admissions, health checkups, and cashless insurance queries.
              </p>
            </div>
            <div className={styles.heroRight}>
              <div className={styles.heroQuickInfo}>
                <a href="tel:01423294228" className={styles.heroInfoRow}>
                  <div className={styles.heroInfoIcon} style={{ background: '#DC262618' }}>📞</div>
                  <div>
                    <strong>Emergency Helpline</strong>
                    <span>01423-294228 | 01423-294440</span>
                  </div>
                </a>
                <a href={hospitalInfo.mapUrl} target="_blank" rel="noopener noreferrer" className={styles.heroInfoRow}>
                  <div className={styles.heroInfoIcon} style={{ background: '#00889118' }}>📍</div>
                  <div>
                    <strong>Hospital Location</strong>
                    <span>Near Samod Puliya, Samod Road, Chomu</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="section-padding-sm">
        <div className="container">
          <div className={styles.cardsGrid}>
            {contactCards.map((card, idx) => (
              <div key={idx} className={styles.contactCard}>
                <div className={styles.cardIconBox} style={{ color: card.color }}>{card.icon}</div>
                <h3>{card.title}</h3>
                {card.href ? (
                  <a href={card.href} className={styles.cardMainLink}>{card.main}</a>
                ) : (
                  <div className={styles.cardMainText}>{card.main}</div>
                )}
                <div className={styles.cardSubText}>{card.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP & INQUIRY FORM */}
      <section className="section-padding">
        <div className="container">
          <div className={styles.formAndMapGrid}>
            <div className={styles.formCol}>
              <h2>Send Us a Message</h2>
              <p>Fill out the form below and our front desk support team will get in touch with you shortly.</p>

              {submitted && (
                <div className={styles.successMsg}>
                  ✅ Thank you! Your message has been received. Our team will contact you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.contactForm}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Email (Optional)</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Department / Specialty</label>
                    <select
                      value={form.department}
                      onChange={(e) => setForm({ ...form, department: e.target.value })}
                    >
                      <option value="">Select Department</option>
                      {departments.map((d) => (
                        <option key={d.id} value={d.name}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Message / Inquiries *</label>
                  <textarea
                    required
                    rows="4"
                    placeholder="How can we help you?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                  {loading ? 'Submitting...' : '📨 Send Message'}
                </button>
              </form>
            </div>

            <div className={styles.mapCol}>
              <h2>Find Us On Map</h2>
              <p>Conveniently located near Samod Puliya on Samod Road in Chomu, Jaipur.</p>
              <div className={styles.mapContainer}>
                <iframe
                  title="Siddhi Vinayak Hospital Location Map"
                  src={hospitalInfo.mapEmbed}
                  width="100%"
                  height="360"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className={styles.mapActions}>
                <a href={hospitalInfo.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  📍 Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
`;

fs.writeFileSync(path.join(targetDir, 'src/app/contact/page.js'), contactPageJs, 'utf8');
console.log('Contact page written.');

// 3. Empanelments page, Appointment page, Patient Services, Doctors page
replaceInFile('src/app/appointment/page.js', [
  ['K.R. Memorial', 'Siddhi Vinayak'],
  ['8306005111', '01423-294228'],
  ['8306005105', '01423-294440'],
  ['01423-220320', '01423-294228'],
]);

replaceInFile('src/app/empanelments/page.js', [
  ['K.R. Memorial Hospital', 'Siddhi Vinayak Hospital & Research Centre'],
  ['K.R. Memorial', 'Siddhi Vinayak Hospital'],
  ['8306005111', '01423-294228'],
  ['8306005105', '01423-294440'],
]);

replaceInFile('src/app/doctors/page.js', [
  ['K.R. Memorial Hospital', 'Siddhi Vinayak Hospital & Research Centre'],
  ['K.R. Memorial', 'Siddhi Vinayak Hospital'],
  ['8306005111', '01423-294228'],
  ['8306005105', '01423-294440'],
]);

replaceInFile('src/app/patient-services/page.js', [
  ['K.R. Memorial Hospital', 'Siddhi Vinayak Hospital & Research Centre'],
  ['K.R. Memorial', 'Siddhi Vinayak Hospital'],
  ['8306005111', '01423-294228'],
  ['8306005105', '01423-294440'],
  ['wecare@krmemorialhospital.com', 'infosiddhi@gmail.com'],
]);

replaceInFile('src/app/departments/page.js', [
  ['K.R. Memorial Hospital', 'Siddhi Vinayak Hospital & Research Centre'],
  ['K.R. Memorial', 'Siddhi Vinayak Hospital'],
  ['8306005111', '01423-294228'],
]);

replaceInFile('src/app/departments/[slug]/page.js', [
  ['K.R. Memorial Hospital', 'Siddhi Vinayak Hospital & Research Centre'],
  ['K.R. Memorial', 'Siddhi Vinayak Hospital'],
  ['8306005111', '01423-294228'],
  ['8306005105', '01423-294440'],
]);

replaceInFile('src/app/gallery/page.js', [
  ['K.R. Memorial Hospital', 'Siddhi Vinayak Hospital & Research Centre'],
  ['K.R. Memorial', 'Siddhi Vinayak Hospital'],
]);

replaceInFile('src/app/blog/page.js', [
  ['K.R. Memorial Hospital', 'Siddhi Vinayak Hospital & Research Centre'],
  ['K.R. Memorial', 'Siddhi Vinayak Hospital'],
]);

replaceInFile('src/app/sitemap.js', [
  ['https://krmemorialhospital.com', 'https://siddhivinayakhospitalchomu.com'],
]);

replaceInFile('src/app/robots.js', [
  ['https://krmemorialhospital.com', 'https://siddhivinayakhospitalchomu.com'],
]);

console.log('All pages customized successfully for Siddhi Vinayak Hospital!');
