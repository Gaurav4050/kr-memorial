const fs = require('fs');
const path = require('path');

const targetDir = path.resolve('../sidhivinayak');

// 1. Home page
const homePageJs = `'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  departments,
  doctors as staticDoctors,
  testimonials,
  empanelments,
  hospitalInfo,
  faqs,
} from '@/data/hospital';
import styles from './page.module.css';

/* ── Hero Carousel Slides ── */
const heroSlides = [
  {
    id: 1,
    tag: 'Chomu, Jaipur’s Leading Super Multi-Speciality Hospital',
    heading: 'Most Trusted Super Multi Speciality Hospital & Doctors',
    sub: 'Cardiology & Neurology 50+ Doctors Team • 200+ Beds Super Multi-Speciality Facility • 24/7 Emergency & Cath Lab Services',
    cta1: { label: 'Book Appointment', href: '/appointment', icon: '📅' },
    cta2: { label: 'Our Doctors', href: '/doctors', icon: '👨‍⚕️' },
    accent: '#FF7700',
    overlay: 'linear-gradient(120deg, rgba(0, 95, 102, 0.95) 0%, rgba(0, 136, 145, 0.75) 60%, rgba(0, 136, 145, 0.35) 100%)',
    bgDesktop: '/slide1.jpeg',
    bgMobile: '/slide1.jpeg',
    features: [
      { icon: '🚑', label: 'Emergency Service', sub: '24/7 On-Call' },
      { icon: '🛏️', label: '200+ Beds', sub: 'ICU / CCU / Suite' },
      { icon: '🔬', label: 'Laboratory & Cath Lab', sub: 'Advanced Diagnostics' },
    ],
    helpline: 'Emergency Helpline: 01423-294228, 01423-294440',
  },
  {
    id: 2,
    tag: 'Cardiology, Neurology & Renal Care',
    heading: 'State-of-the-Art Cath Lab & 24/7 Dialysis Centre',
    sub: 'Equipped with advanced Digital Flat-Panel Cath Lab for primary angioplasty, 15-station Haemodialysis Unit, and Modular Laminar Flow Operation Theatres.',
    cta1: { label: 'Explore Specialties', href: '/departments', icon: '🏥' },
    cta2: { label: 'Call Emergency', href: 'tel:01423294228', icon: '🚨' },
    accent: '#FF7700',
    overlay: 'linear-gradient(120deg, rgba(11, 26, 32, 0.92) 0%, rgba(0, 136, 145, 0.7) 60%, rgba(0, 136, 145, 0.3) 100%)',
    bgDesktop: '/departments/cardiology.jpg',
    bgMobile: '/departments/cardiology.jpg',
    features: [
      { icon: '❤️', label: 'Cardiac Cath Lab', sub: '24/7 Angioplasty' },
      { icon: '🧠', label: 'Brain & Spine Unit', sub: 'Micro-Neurosurgery' },
      { icon: '🩺', label: 'Haemodialysis Unit', sub: '15 Dialysis Beds' },
    ],
    helpline: 'Emergency Helpline: 01423-294228, 01423-294440',
  },
  {
    id: 3,
    tag: 'Cashless Hospitalization & Ethical Care',
    heading: 'World-Class Medicine Accessible For Every Family',
    sub: 'Cashless healthcare benefits under RGHS, ECHS, Ayushman Bharat, and 25+ leading private insurance TPAs so treatment is never delayed.',
    cta1: { label: 'View Empanelments', href: '/empanelments', icon: '🛡️' },
    cta2: { label: 'Get Directions', href: hospitalInfo?.mapUrl || '#', icon: '📍' },
    accent: '#FF7700',
    overlay: 'linear-gradient(120deg, rgba(0, 75, 80, 0.95) 0%, rgba(0, 120, 130, 0.7) 60%, rgba(0, 120, 130, 0.3) 100%)',
    bgDesktop: '/slide1.jpeg',
    bgMobile: '/slide1.jpeg',
    features: [
      { icon: '🛡️', label: 'RGHS & ECHS', sub: 'Cashless Treatment' },
      { icon: '🤝', label: '25+ Insurance TPAs', sub: 'Hassle-Free Approval' },
      { icon: '👶', label: 'Level III NICU', sub: 'Mother & Child Care' },
    ],
    helpline: 'Emergency Helpline: 01423-294228, 01423-294440',
  },
];

/* ── Why Choose Siddhi Vinayak — Flip Cards ── */
const whyCards = [
  {
    icon: '🫀',
    title: 'Cath Lab & Cardiology',
    front: 'Advanced Digital Flat-Panel Cath Lab for 24/7 emergency primary angioplasty.',
    back: 'Complete cardiac care from diagnostic angiography, single/dual-chamber pacemaker implantations to coronary intensive care (CCU) under experienced cardiologists.',
    color: '#008891',
  },
  {
    icon: '🧠',
    title: 'Neuro & Spine Surgery',
    front: 'Microsurgical neuro-navigation and high-speed drills for brain and spine care.',
    back: 'Dedicated Neuro-ICU for acute stroke thrombolysis, traumatic head injury management, brain tumor excision, and minimally invasive disc surgery.',
    color: '#FF7700',
  },
  {
    icon: '🩺',
    title: '24/7 Dialysis & Renal Unit',
    front: '15-station modern Haemodialysis unit with advanced RO water treatment plant.',
    back: 'Round-the-clock emergency dialysis for acute kidney injuries, permanent catheter insertions, and specialized care by senior nephrologists.',
    color: '#008891',
  },
  {
    icon: '🏥',
    title: '200+ Beds & Modular OTs',
    front: 'Laminar airflow operation theatres with zero-infection sterilization standards.',
    back: 'Equipped with 4K Laparoscopy towers, C-Arm image intensifiers, modern ICU ventilators, and Level-III NICU for comprehensive critical care.',
    color: '#008891',
  },
];

export default function Home() {
  const statsRef = useRef(null);
  const [slide, setSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const [featuredDoctors] = useState(staticDoctors);

  /* Hero carousel auto-advance */
  const goToSlide = useCallback((idx) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setSlide(idx);
      setIsTransitioning(false);
    }, 350);
  }, [isTransitioning]);

  useEffect(() => {
    const timer = setInterval(() => {
      goToSlide((slide + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slide, goToSlide]);

  const currentSlide = heroSlides[slide];

  return (
    <div className={styles.homeWrapper}>
      {/* HERO BANNER */}
      <section className={styles.heroCarousel}>
        <div
          className={styles.carouselBg}
          style={{
            backgroundImage: "url('" + currentSlide.bgDesktop + "')",
          }}
        />
        <div
          className={styles.carouselOverlay}
          style={{ background: currentSlide.overlay }}
        />
        <div className={styles.carouselGrid} />

        <div className={styles.carouselContent}>
          <div className={styles.heroTagBadge}>
            <span className={styles.heroTagDot}></span>
            <span>{currentSlide.tag}</span>
          </div>

          <h1 className={styles.heroTitle}>{currentSlide.heading}</h1>
          <p className={styles.heroSub}>{currentSlide.sub}</p>

          {/* Highlights from Billboard banner */}
          <div className={styles.bannerBadgeRow}>
            {currentSlide.features.map((feat, idx) => (
              <div key={idx} className={styles.bannerBadgeCard}>
                <div className={styles.badgeIconCircle}>{feat.icon}</div>
                <div className={styles.badgeTextCol}>
                  <strong className={styles.badgeLabel}>{feat.label}</strong>
                  <span className={styles.badgeSub}>{feat.sub}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Emergency Helpline Pill */}
          <div className={styles.helplinePill}>
            <span className={styles.helplineIcon}>🚨</span>
            <span className={styles.helplineText}>
              Emergency Helpline: <a href="tel:01423294228">01423-294228</a>, <a href="tel:01423294440">01423-294440</a>
            </span>
          </div>

          <div className={styles.heroActions}>
            <Link href={currentSlide.cta1.href} className="btn btn-primary btn-lg">
              <span>{currentSlide.cta1.icon}</span> {currentSlide.cta1.label}
            </Link>
            <Link href={currentSlide.cta2.href} className="btn btn-secondary btn-lg">
              <span>{currentSlide.cta2.icon}</span> {currentSlide.cta2.label}
            </Link>
          </div>
        </div>

        {/* Carousel indicators */}
        <div className={styles.carouselDots}>
          {heroSlides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => goToSlide(idx)}
              className={styles.dot + (slide === idx ? " " + styles.dotActive : "")}
              aria-label={"Go to slide " + (idx + 1)}
            />
          ))}
        </div>
      </section>

      {/* QUICK STATS */}
      <section className={styles.statsStrip} ref={statsRef}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <div className={styles.statNumber}>200+</div>
              <div className={styles.statLabel}>Hospital Beds Capacity</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>Specialist & Super Specialist Doctors</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statNumber}>18+</div>
              <div className={styles.statLabel}>Clinical Specialties & OTs</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statNumber}>24/7</div>
              <div className={styles.statLabel}>Emergency, Cath Lab & Dialysis</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Center of Clinical Excellence</span>
            <h2>Why Choose Siddhi Vinayak Hospital?</h2>
            <p>
              Combining state-of-the-art medical technology with empathetic patient-first care to serve the families of Chomu, Jaipur Rural, Sikar, and surrounding areas.
            </p>
          </div>

          <div className={styles.whyGrid}>
            {whyCards.map((card, idx) => (
              <div key={idx} className={styles.whyCard}>
                <div className={styles.whyIcon}>{card.icon}</div>
                <h3>{card.title}</h3>
                <p className={styles.whyFront}>{card.front}</p>
                <p className={styles.whyBack}>{card.back}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPARTMENTS */}
      <section className={"section-padding " + styles.deptSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Super Speciality Care</span>
            <h2>Our Medical & Surgical Departments</h2>
            <p>
              From complex heart catheterizations to emergency trauma, neurosurgery, and mother & child healthcare.
            </p>
          </div>

          <div className={styles.deptGrid}>
            {departments.slice(0, 8).map((dept) => (
              <div key={dept.id} className={styles.deptCard}>
                <div className={styles.deptCardTop}>
                  <span className={styles.deptIconBadge}>{dept.icon}</span>
                  <span className={styles.deptTimeBadge}>{dept.opdDays}</span>
                </div>
                <h3>{dept.name}</h3>
                <p>{dept.description}</p>
                <div className={styles.deptTreatments}>
                  {dept.treatments.slice(0, 3).map((t, i) => (
                    <span key={i} className={styles.treatmentTag}>✓ {t}</span>
                  ))}
                </div>
                <Link href={"/departments/" + dept.id} className={styles.deptLink}>
                  Explore Department & Doctors →
                </Link>
              </div>
            ))}
          </div>

          <div className={styles.viewAllDeptsRow}>
            <Link href="/departments" className="btn btn-primary btn-lg">
              View All 18+ Specialties & Facilities →
            </Link>
          </div>
        </div>
      </section>

      {/* DOCTORS */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Experienced Medical Panel</span>
            <h2>Meet Our Leading Doctors & Specialists</h2>
            <p>
              Our doctors are experienced consultants committed to evidence-based healthcare and patient safety.
            </p>
          </div>

          <div className={styles.doctorsGrid}>
            {featuredDoctors.slice(0, 6).map((doc) => (
              <div key={doc.id} className={styles.doctorCard}>
                <div className={styles.doctorHeader}>
                  <div className={styles.docAvatarCircle}>
                    <span>👨‍⚕️</span>
                  </div>
                  <div className={styles.docInfoCol}>
                    <h3>{doc.name}</h3>
                    <div className={styles.docSpecialty}>{doc.specialty}</div>
                    <div className={styles.docQual}>{doc.qualification}</div>
                  </div>
                </div>
                <div className={styles.docDetails}>
                  <div className={styles.docDetailRow}>
                    <span>Experience:</span>
                    <strong>{doc.experience}+ Years</strong>
                  </div>
                  <div className={styles.docDetailRow}>
                    <span>OPD Schedule:</span>
                    <strong>{doc.opdDays} ({doc.opdTime})</strong>
                  </div>
                </div>
                <p className={styles.docBioShort}>{doc.bio}</p>
                <div className={styles.docCardActions}>
                  <Link href="/appointment" className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                    Book Consultation
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.viewAllDocsRow}>
            <Link href="/doctors" className="btn btn-outline btn-lg">
              View Complete Medical Panel (50+ Doctors) →
            </Link>
          </div>
        </div>
      </section>

      {/* EMPANELMENTS */}
      <section className={"section-padding-sm " + styles.empanelSection}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '36px' }}>
            <span className="section-tag">Cashless Hospitalization</span>
            <h2>Empanelled Insurance & Government Schemes</h2>
            <p>
              Get 100% cashless hospitalization under RGHS, ECHS, Ayushman Bharat, and major private health insurance policies.
            </p>
          </div>

          <div className={styles.empanelGrid}>
            {empanelments.map((emp, i) => (
              <div key={i} className={styles.empanelCard}>
                <div className={styles.empanelType}>{emp.type}</div>
                <h4>{emp.name}</h4>
                <p>{emp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Patient Stories</span>
            <h2>What Our Patients Say</h2>
            <p>Real experiences from families who trusted Siddhi Vinayak Hospital during critical medical moments.</p>
          </div>

          <div className={styles.testiGrid}>
            {testimonials.map((t) => (
              <div key={t.id} className={styles.testiCard}>
                <div className={styles.testiStars}>★★★★★</div>
                <p className={styles.testiComment}>“{t.comment}”</p>
                <div className={styles.testiAuthor}>
                  <strong>{t.name}</strong>
                  <span>{t.location} • {t.department} Department</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={"section-padding-sm " + styles.faqSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Common Inquiries</span>
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className={styles.faqList}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={styles.faqItem + (activeFaq === idx ? " " + styles.faqItemActive : "")}
                onClick={() => setActiveFaq(activeFaq === idx ? -1 : idx)}
              >
                <div className={styles.faqQuestion}>
                  <span>{faq.question}</span>
                  <span className={styles.faqToggle}>{activeFaq === idx ? "−" : "+"}</span>
                </div>
                {activeFaq === idx && (
                  <div className={styles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className={styles.ctaBanner}>
        <div className="container">
          <div className={styles.ctaInner}>
            <div className={styles.ctaTextCol}>
              <h2>Need Immediate Medical Care or Consultation?</h2>
              <p>
                Our 24/7 emergency trauma team, Cath Lab, and outpatient specialist clinics are ready to serve you.
              </p>
              <div className={styles.ctaNumbers}>
                <span>Emergency: <strong>01423-294228</strong></span>
                <span>Helpline: <strong>01423-294440</strong></span>
              </div>
            </div>
            <div className={styles.ctaBtnCol}>
              <Link href="/appointment" className="btn btn-primary btn-lg">
                📅 Book Online Appointment
              </Link>
              <a href="tel:01423294228" className="btn btn-secondary btn-lg">
                🚨 Call Emergency
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
`;

fs.writeFileSync(path.join(targetDir, 'src/app/page.js'), homePageJs, 'utf8');
console.log('src/app/page.js written successfully');
