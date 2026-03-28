'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  departments,
  doctors,
  testimonials,
  empanelments,
  hospitalInfo,
  corporateProfile,
  groupInstitutions,
  directorProfiles,
  strategicOutlook,
} from '@/data/hospital';
import styles from './page.module.css';

export default function Home() {
  const statsRef = useRef(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !counted.current) {
        counted.current = true;
        document.querySelectorAll('[data-target]').forEach(el => {
          const target = +el.dataset.target;
          let current = 0;
          const step = target / 50;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = target >= 1000 
              ? Math.floor(current).toLocaleString('en-IN') + '+'
              : Math.floor(current) + (target > 10 ? '+' : '');
          }, 30);
        });
      }
    }, { threshold: 0.3 });

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const getInitials = (name) =>
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part[0])
      .join('')
      .toUpperCase();

  const directorAccents = ['#F59E0B', '#0EA5A4', '#0B3D91'];

  const executiveSummaryRows = [
    { label: 'Company Name', value: corporateProfile.companyName },
    { label: 'Registered Office', value: corporateProfile.registeredOffice },
    { label: 'Incorporation Date', value: corporateProfile.incorporationDate },
    { label: 'Registration No.', value: corporateProfile.registrationNo },
    { label: 'CIN', value: corporateProfile.cin },
    { label: 'PAN', value: corporateProfile.pan },
    { label: 'Constitution', value: corporateProfile.constitution },
    { label: 'Authorized Capital', value: corporateProfile.authorizedCapital },
    { label: 'Paid Up Capital', value: corporateProfile.paidUpCapital },
  ];

  return (
    <>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        {/* Layered background elements */}
        <div className={styles.heroBg}></div>
        <div className={styles.heroOrb1}></div>
        <div className={styles.heroOrb2}></div>
        <div className={styles.heroOrb3}></div>
        <div className={styles.heroGrid}></div>

        <div className={styles.heroInner}>
          {/* ── LEFT CONTENT ── */}
          <div className={styles.heroContent}>
            {/* Accreditation / trust badge row */}
            <div className={styles.heroTrustRow}>
              <span className={styles.heroBadge}>
                <span className={styles.badgeDot}></span>
                Jaipur&apos;s #1 Multi-Specialty Hospital
              </span>
              <span className={styles.heroAccred}>🏅 NABH Accredited</span>
            </div>

            <h1 className={styles.heroH1}>
              Your Health Is<br />
              <span className={styles.heroHighlight}>Our</span>{' '}
              <span className={styles.heroHighlight2}>Sacred Mission.</span>
            </h1>

            <p className={styles.heroDesc}>
              K.R. Memorial Hospital — a <strong>200+ bedded</strong>, ultra-modern multi-super specialty hospital
              bringing <strong>world-class healthcare</strong> to Rajasthan at affordable prices since&nbsp;2009.
            </p>

            {/* CTA Buttons */}
            <div className={styles.heroBtns}>
              <Link href="/appointment" className={styles.heroCtaPrimary}>
                <span>📅</span> Book Appointment
              </Link>
              <Link href="/doctors" className={styles.heroCtaOutline}>
                <span>👨‍⚕️</span> Meet Our Doctors
              </Link>
              <a href="tel:8006005111" className={styles.heroCtaCall}>
                <span>🚑</span> Emergency
              </a>
            </div>

            {/* Feature pills */}
            <div className={styles.heroPills}>
              {['✅ Cashless Treatment', '🔬 Advanced Lab', '🚑 24/7 Ambulance', '💊 In-house Pharmacy'].map(p => (
                <span key={p} className={styles.heroPill}>{p}</span>
              ))}
            </div>

            {/* Stat strip */}
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <div className={styles.statNum}>200<span className={styles.statPlus}>+</span></div>
                <div className={styles.statLbl}>Hospital Beds</div>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.stat}>
                <div className={styles.statNum}>15<span className={styles.statPlus}>+</span></div>
                <div className={styles.statLbl}>Specialties</div>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.stat}>
                <div className={styles.statNum}>50<span className={styles.statPlus}>+</span></div>
                <div className={styles.statLbl}>Expert Doctors</div>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.stat}>
                <div className={styles.statNum}>24<span className={styles.statSuffix}>/7</span></div>
                <div className={styles.statLbl}>Emergency Care</div>
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className={styles.heroVisual}>
            {/* Floating ambient cards */}
            <div className={`${styles.floatCard} ${styles.floatCard1}`}>
              <span>🏥</span>
              <div>
                <strong>25,000+</strong>
                <small>Patients Treated</small>
              </div>
            </div>
            <div className={`${styles.floatCard} ${styles.floatCard2}`}>
              <span>⭐</span>
              <div>
                <strong>4.8 / 5</strong>
                <small>Patient Rating</small>
              </div>
            </div>
            <div className={`${styles.floatCard} ${styles.floatCard3}`}>
              <span>🛡️</span>
              <div>
                <strong>20+ Insurers</strong>
                <small>Cashless Network</small>
              </div>
            </div>

            {/* Main booking card */}
            <div className={styles.heroCard}>
              <div className={styles.heroCardHeader}>
                <div className={styles.iconCircle}>📅</div>
                <div>
                  <h3>Quick Appointment</h3>
                  <p>Available 7 days a week</p>
                </div>
              </div>

              <div className={styles.heroCardDivider}></div>

              <form className={styles.quickBookForm} onSubmit={(e) => e.preventDefault()}>
                <label className={styles.formLabel}>Department</label>
                <select defaultValue="">
                  <option value="" disabled>Select Department</option>
                  {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>

                <label className={styles.formLabel}>Your Name</label>
                <input type="text" placeholder="e.g. Ramesh Kumar" />

                <label className={styles.formLabel}>Phone Number</label>
                <input type="tel" placeholder="+91 80060 05111" />

                <button type="submit" className={styles.btnBook}>
                  Book Appointment →
                </button>
              </form>

              <div className={styles.heroCardFooter}>
                <span>🔒 Your data is safe &amp; secure</span>
                <span>·</span>
                <span>⚡ Instant confirmation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK ACCESS ── */}
      <section className={styles.quickAccess}>
        <div className={styles.quickAccessInner}>
          <div className={styles.quickTiles}>
            <Link href="/appointment" className={styles.quickTile}>
              <div className={styles.tileIcon}>📅</div>
              <div className={styles.tileLbl}>Book OPD</div>
            </Link>
            <Link href="/doctors" className={styles.quickTile}>
              <div className={styles.tileIcon}>🩺</div>
              <div className={styles.tileLbl}>Find a Doctor</div>
            </Link>
            <a href="tel:8006005111" className={styles.quickTile}>
              <div className={styles.tileIcon}>🚑</div>
              <div className={styles.tileLbl}>Emergency</div>
            </a>
            <Link href="/patient-services" className={styles.quickTile}>
              <div className={styles.tileIcon}>💊</div>
              <div className={styles.tileLbl}>Pharmacy 24/7</div>
            </Link>
            <Link href="/departments" className={styles.quickTile}>
              <div className={styles.tileIcon}>🏥</div>
              <div className={styles.tileLbl}>Departments</div>
            </Link>
            <Link href="/empanelments" className={styles.quickTile}>
              <div className={styles.tileIcon}>🛡️</div>
              <div className={styles.tileLbl}>Insurance</div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── EXECUTIVE SUMMARY ── */}
      {/* <section className={styles.executiveSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Executive Summary</span>
            <h2>Kaluram Memorial Hospitals Pvt. Ltd.</h2>
            <p>A structured corporate profile covering governance, activities, and group footprint.</p>
          </div>

          <div className={styles.executiveGrid}>
            <div className={styles.summaryCard}>
              {executiveSummaryRows.map((item) => (
                <div key={item.label} className={styles.summaryRow}>
                  <div className={styles.summaryLabel}>{item.label}</div>
                  <div className={styles.summaryValue}>{item.value}</div>
                </div>
              ))}
            </div>

            <div className={styles.executiveMeta}>
              <div className={styles.executiveBlock}>
                <h3>Line of Activity</h3>
                <ul>
                  {corporateProfile.lineOfActivity.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.executiveBlock}>
                <h3>Group Companies</h3>
                <div className={styles.groupChips}>
                  {corporateProfile.groupCompanies.map((item) => (
                    <span key={item} className={styles.groupChip}>{item}</span>
                  ))}
                </div>
              </div>

              <div className={styles.executiveBlock}>
                <h3>Company Background</h3>
                <p>{corporateProfile.introduction}</p>
                <p>{corporateProfile.briefHistory}</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* ── STATS ── */}
      <section className={styles.statsSection} ref={statsRef}>
        <div className={styles.statsInner}>
          <div className={styles.statItem}><span className={styles.num} data-target="200">0</span><div className={styles.lbl}>Hospital Beds</div></div>
          <div className={styles.statItem}><span className={styles.num} data-target="50">0</span><div className={styles.lbl}>Expert Doctors</div></div>
          <div className={styles.statItem}><span className={styles.num} data-target="15">0</span><div className={styles.lbl}>Specialties</div></div>
          <div className={styles.statItem}><span className={styles.num} data-target="25000">0</span><div className={styles.lbl}>Patients Treated</div></div>
          <div className={styles.statItem}><span className={styles.num} data-target="20">0</span><div className={styles.lbl}>Insurance Partners</div></div>
        </div>
      </section>

      {/* ── GROUP ECOSYSTEM ── */}
      <section className={styles.groupSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Group Ecosystem</span>
            <h2>Healthcare and Education Network</h2>
            <p>Integrated institutions serving patient care, skilling, and long-term social development.</p>
          </div>

          <div className={styles.groupGrid}>
            {groupInstitutions.map((group) => (
              <article key={group.group} className={styles.groupCard}>
                <h3>{group.group}</h3>
                <p>{group.focus}</p>
                <div className={styles.groupInstitutionList}>
                  {group.institutions.map((institution) => (
                    <div key={institution.name} className={styles.groupInstitutionRow}>
                      <div className={styles.groupInstitutionName}>{institution.name}</div>
                      <div className={styles.groupInstitutionActivity}>{institution.activity}</div>
                      <div className={styles.groupInstitutionCapacity}>{institution.capacity}</div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEPARTMENTS ── */}
      <section className={styles.departments}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Specialties</span>
            <h2>World-Class Departments</h2>
            <p>15 super-specialties under one roof, staffed by experienced consultants with state-of-the-art infrastructure.</p>
          </div>
          <div className={styles.deptGrid}>
            {departments.map(dept => (
              <Link href={`/departments/${dept.id}`} key={dept.id} className={styles.deptCard}>
                <div className={styles.deptIcon} style={{ '--dept-color': dept.color }}>{dept.icon}</div>
                <h4>{dept.name}</h4>
                <p>{dept.description}</p>
                <span className={styles.deptArrow}>→</span>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/departments" className="btn btn-outline">View All Departments →</Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ── */}
      <section className={styles.whySection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Why KR Memorial</span>
            <h2>Healthcare You Can Trust</h2>
            <p>We combine advanced technology with compassionate care to deliver the best outcomes for every patient.</p>
          </div>
          <div className={styles.whyGrid}>
            <div className={styles.whyCard}>
              <span className={styles.whyIcon}>🏥</span>
              <h3>Ultra-Modern Infrastructure</h3>
              <p>State-of-the-art OT, advanced diagnostics, MRI, CT & Cath Lab with latest medical equipment.</p>
            </div>
            <div className={styles.whyCard}>
              <span className={styles.whyIcon}>👨‍⚕️</span>
              <h3>Expert Medical Team</h3>
              <p>50+ experienced specialists across 15 departments trained at premier Indian & international institutions.</p>
            </div>
            <div className={styles.whyCard}>
              <span className={styles.whyIcon}>💰</span>
              <h3>Affordable Healthcare</h3>
              <p>World-class quality at accessible prices — our commitment to Tier-3 city communities in Rajasthan.</p>
            </div>
            <div className={styles.whyCard}>
              <span className={styles.whyIcon}>🌍</span>
              <h3>Rajasthan Outreach</h3>
              <p>Expanding rural reach through peripheral centers, health camps and telemedicine across Rajasthan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIRECTORS SHOWCASE ── */}
      <section className={styles.directorsSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Directors</span>
            <h2 style={{ color: '#fff' }}>Leadership Behind the Vision</h2>
            <p>Founder-directors driving quality healthcare, education, and long-term institutional trust.</p>
          </div>

          <div className={styles.directorGrid}>
            {directorProfiles.map((director, index) => (
              <article
                key={director.id}
                className={styles.directorCard}
                style={{ '--director-accent': directorAccents[index % directorAccents.length] }}
              >
                <div className={styles.directorVisual}>
                  <div className={styles.directorHalo}></div>
                  <div className={styles.directorCutout} style={{ backgroundImage: `url(${director.image})` }}>
                    <span className={styles.directorInitials}>{getInitials(director.name)}</span>
                  </div>
                </div>

                <div className={styles.directorInfoWrap}>
                  <h3>{director.name}</h3>
                  <span className={styles.directorTitle}>{director.title}</span>
                  <p className={styles.directorTagline}>{director.tagline}</p>
                  <p className={styles.directorBio}>{director.shortBio}</p>

                  <div className={styles.directorMetaGrid}>
                    <span><strong>Experience:</strong> {director.experience}</span>
                    <span><strong>Qualification:</strong> {director.qualification}</span>
                    <span><strong>PAN:</strong> {director.pan}</span>
                    <span><strong>DIN:</strong> {director.din}</span>
                  </div>

                  <div className={styles.directorSkillList}>
                    {director.expertise.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION AND STRATEGY ── */}
      <section className={styles.strategySection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Future Roadmap</span>
            <h2>Vision, Mission and Expansion Plans</h2>
            <p>Focused growth model combining tertiary care, education, outreach, and digital transformation.</p>
          </div>

          <div className={styles.strategyTop}>
            <div className={styles.visionCard}>
              <h3>Vision</h3>
              <p>{strategicOutlook.vision}</p>
              <div className={styles.valuesWrap}>
                {strategicOutlook.coreValues.map((value) => (
                  <span key={value}>{value}</span>
                ))}
              </div>
            </div>

            <div className={styles.missionCard}>
              <h3>Mission Priorities</h3>
              <ul>
                {strategicOutlook.mission.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.strategyBottom}>
            <div className={styles.planCard}>
              <h4>Social and Community Outreach</h4>
              <ul>
                {strategicOutlook.socialInitiatives.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.planCard}>
              <h4>Future Expansion Plans</h4>
              <ul>
                {strategicOutlook.futurePlans.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED DOCTORS ── */}
      <section className={styles.doctorsSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Experts</span>
            <h2>Meet Our Specialist Doctors</h2>
            <p>Expert medical professionals dedicated to providing the highest quality care for you and your family.</p>
          </div>
          <div className={styles.doctorsScroll}>
            {doctors.slice(0, 6).map(doc => (
              <div key={doc.id} className={styles.doctorCard}>
                <div className={styles.doctorImg}>
                  <div className={styles.doctorImgPlaceholder} style={{ background: `linear-gradient(135deg, ${departments.find(d => d.id === doc.departmentId)?.color || '#0B3D91'}22, ${departments.find(d => d.id === doc.departmentId)?.color || '#0B3D91'}11)` }}>
                    <span style={{ fontSize: '48px' }}>👨‍⚕️</span>
                  </div>
                  <span className={styles.expBadge}>{doc.experience}+ yrs</span>
                </div>
                <div className={styles.doctorInfo}>
                  <h4>{doc.name}</h4>
                  <p className={styles.doctorQual}>{doc.qualification}</p>
                  <span className={styles.specialtyBadge} style={{ background: `${departments.find(d => d.id === doc.departmentId)?.color || '#0B3D91'}18`, color: departments.find(d => d.id === doc.departmentId)?.color || '#0B3D91' }}>
                    {doc.specialty}
                  </span>
                  <div className={styles.doctorMeta}>
                    <span className={styles.rating}>⭐ {doc.rating}</span>
                    <span className={styles.reviews}>({doc.reviews} reviews)</span>
                  </div>
                  <div className={styles.doctorBtns}>
                    <Link href={`/doctors#${doc.id}`} className="btn btn-sm btn-outline">View Profile</Link>
                    <Link href="/appointment" className="btn btn-sm btn-primary">Book Now</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/doctors" className="btn btn-outline">View All Doctors →</Link>
          </div>
        </div>
      </section>

      {/* ── 24x7 SERVICES ── */}
      <section className={styles.servicesSection}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span className="section-tag" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}>Always Available</span>
            <h2 style={{ color: '#fff' }}>24 × 7 Facilities</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>Round-the-clock services so you&apos;re never left without care.</p>
          </div>
          <div className={styles.servicesGrid}>
            {[
              { icon: '🚑', title: 'Emergency', desc: 'Fully equipped emergency unit with rapid response trauma team', href: 'tel:8006005111' },
              { icon: '🔬', title: 'Laboratory', desc: 'Comprehensive diagnostic lab with quick turnaround on critical reports', href: '/patient-services' },
              { icon: '💊', title: 'Pharmacy', desc: 'In-house pharmacy stocked with all essential medications and supplies', href: '/patient-services' },
              { icon: '🚐', title: 'Ambulance', desc: 'Advanced life support ambulances available for immediate response', href: 'tel:8006005111' },
            ].map((svc, i) => (
              <a key={i} href={svc.href} className={styles.serviceCard}>
                <div className={styles.serviceIconWrap}>
                  <span>{svc.icon}</span>
                  <div className={styles.pulseRing} style={{ animationDelay: `${i * 0.5}s` }}></div>
                </div>
                <span className={styles.serviceBadge}>24/7</span>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className={styles.testimonials}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Patient Stories</span>
            <h2>What Our Patients Say</h2>
            <p>Real experiences from patients who trusted us with their health journey.</p>
          </div>
          <div className={styles.testiGrid}>
            {testimonials.map(t => (
              <div key={t.id} className={styles.testiCard}>
                <div className={styles.testiStars}>{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
                <p className={styles.testiText}>&ldquo;{t.text}&rdquo;</p>
                <div className={styles.testiAuthor}>
                  <div className={styles.testiAvatar}>{t.initial}</div>
                  <div>
                    <div className={styles.testiName}>{t.name}</div>
                    <div className={styles.testiSub}>{t.treatment} Patient • {t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMPANELMENTS TICKER ── */}
      <section className={styles.empaSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Cashless Treatment</span>
            <h2>Trusted by Major Insurers</h2>
            <p>20+ insurance & government empanelments for cashless admission and treatment.</p>
          </div>
        </div>
        <div className={styles.empaTickerWrap}>
          <div className={styles.empaTicker}>
            {[...empanelments, ...empanelments].map((e, i) => (
              <div key={i} className={styles.empaChip}>
                {e.type === 'Government' ? '🏛️' : e.type === 'TPA' ? '📋' : '🛡️'} {e.name}
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link href="/empanelments" className="btn btn-outline btn-sm">View All Empanelments →</Link>
        </div>
      </section>

      {/* ── CONTACT STRIP ── */}
      <section className={styles.contactStrip}>
        <div className={styles.contactInner}>
          <div className={styles.contactInfo}>
            <span className="section-tag">Get in Touch</span>
            <h2>Find Us & Contact</h2>
            <p>Located on NH-11, Sikar Road in Chomu — easily accessible from Jaipur and surrounding districts.</p>
            <div className={styles.contactItems}>
              <div className={styles.contactItem}>
                <div className={styles.ciIcon}>📍</div>
                <div className={styles.ciText}>
                  <strong>Address</strong>
                  <a href={hospitalInfo.mapUrl} target="_blank" rel="noopener noreferrer">{hospitalInfo.address}</a>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.ciIcon}>📞</div>
                <div className={styles.ciText}>
                  <strong>Phone (24/7)</strong>
                  <a href="tel:8006005111">8006005111</a> | <a href="tel:01423220320">01423-220320</a>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.ciIcon}>📧</div>
                <div className={styles.ciText}>
                  <strong>Email</strong>
                  <a href={`mailto:${hospitalInfo.email}`}>{hospitalInfo.email}</a>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.ciIcon}>🕐</div>
                <div className={styles.ciText}>
                  <strong>OPD Hours</strong>
                  <span>{hospitalInfo.opdHours}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.contactMap}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28398.5!2d75.7284!3d27.1663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db1f16f4b06b7%3A0x8d15f0a7c7c4a6e0!2sChomu%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '20px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="KR Memorial Hospital Location"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}
