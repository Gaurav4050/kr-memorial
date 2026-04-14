'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  departments,
  doctors as staticDoctors,
  testimonials,
  empanelments,
  hospitalInfo,
  directorProfilesHome,
} from '@/data/hospital';
import styles from './page.module.css';

/* ── Hero Carousel Slides ── */
const heroSlides = [
  {
    id: 1,
    tag: "Jaipur's #1 Multi-Specialty Hospital",
    heading: 'Advanced Healthcare,\nCompassionate Care',
    sub: 'K.R. Memorial Hospital — a 200+ bedded, ultra-modern multi-super specialty hospital bringing world-class healthcare to Rajasthan since 2020.',
    cta1: { label: 'Book Appointment', href: '/appointment', icon: '📅' },
    cta2: { label: 'Meet Our Doctors', href: '/doctors', icon: '👨‍⚕️' },
    accent: '#F59E0B',
    overlay: 'linear-gradient(120deg, rgba(11,61,145,0.92) 0%, rgba(11,61,145,0.65) 60%, rgba(11,61,145,0.3) 100%)',
    bgDesktop: '/hero-hospital6.png',
    bgMobile: '/hero-hospital6.png',
  },
  {
    id: 2,
    tag: '',
    heading: '',
    sub: '',
    cta1: null,
    cta2: null,
    accent: '#DC2626',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)',
    bgDesktop: 'https://res.cloudinary.com/dwarzikes/image/upload/q_auto/f_auto/v1776196828/Dr._Amar_Sharma__Leading_Surgeon_Expertise_ittbm8.png',
    bgTablet: 'https://res.cloudinary.com/dwarzikes/image/upload/q_auto/f_auto/v1775923929/Gemini_Generated_Image_7h9cwp7h9cwp7h9c_dbfmdn.png',
    bgMobile: 'https://res.cloudinary.com/dwarzikes/image/upload/q_auto/f_auto/v1776197026/ChatGPT_Image_Apr_15_2026_01_33_13_AM_zsun2u.png',
    imageOnly: true,
  },
  {
    id: 3,
    tag: 'Affordable World-Class Care',
    heading: 'Quality Medicine\nFor Every Family',
    sub: 'Cashless treatment through 20+ insurance empanelments including CGHS, RGHS, and Ayushman Bharat — so cost never comes between you and your health.',
    cta1: { label: 'View Empanelments', href: '/empanelments', icon: '🛡️' },
    cta2: { label: 'Get Directions', href: hospitalInfo?.mapUrl || '#', icon: '📍' },
    accent: '#0EA5A4',
    overlay: 'linear-gradient(120deg, rgba(5,40,50,0.92) 0%, rgba(5,80,80,0.65) 60%, rgba(5,80,80,0.3) 100%)',
    bgDesktop: '/hero-hospital6.png',
    bgMobile: '/hero-hospital6.png',
  },
];

/* ── Why Choose KR — Flip Cards ── */
const whyCards = [
  { icon: '🏥', title: 'Ultra-Modern OT', front: 'State-of-the-art modular operation theatres with laminar airflow.', back: 'Multiple OTs equipped with HD laparoscopic systems, advanced surgical equipment,  and strict sterile protocols for the best surgical outcomes.', color: '#0B3D91' },
  { icon: '👨‍⚕️', title: 'Only Best Doctors', front: '50+ experienced specialists across 15 super-specialty departments.', back: 'Our team is trained at premier Indian & international institutions, bringing you the gold standard in medical expertise right here in Rajasthan.', color: '#10B981' },
  { icon: '🫀', title: 'Cath Lab & Cardiology', front: 'First flat-panel cath lab in the region for cardiac interventions.', back: 'Complete cardiac care from diagnostic angiography to 24/7 primary PCI — the full spectrum of interventional cardiology under one roof.', color: '#DC2626' },
  { icon: '💰', title: 'Affordable Care', front: 'World-class quality at prices accessible to Tier-3 city families.', back: 'We firmly believe quality healthcare is a right, not a privilege. Our pricing is transparent, and we work with 50+ insurers for cashless treatment.', color: '#F59E0B' },
];

export default function Home() {
  const statsRef = useRef(null);
  const counted = useRef(false);
  const [slide, setSlide] = useState(0);
  const [testiSlide, setTestiSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [featuredDoctors, setFeaturedDoctors] = useState([...staticDoctors].reverse());
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  /* Fetch live doctors */
  useEffect(() => {
    fetch(`${API_URL}/doctors`)
      .then(res => res.json())
      .then((data) => {
        if (data.success && data.data.length > 0) setFeaturedDoctors([...data.data].reverse());
      })
      .catch(console.error);
  }, [API_URL]);

  /* Hero carousel auto-advance */
  const goToSlide = useCallback((idx) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setSlide(idx);
      setIsTransitioning(false);
    }, 400);
  }, [isTransitioning]);

  useEffect(() => {
    const timer = setInterval(() => {
      goToSlide((slide + 1) % heroSlides.length);
    }, 400000);
    return () => clearInterval(timer);
  }, [slide, goToSlide]);

  /* Testimonial carousel */
  const testiCount = Math.ceil(testimonials.length / 3);
  useEffect(() => {
    const t = setInterval(() => setTestiSlide(prev => (prev + 1) % testiCount), 5000);
    return () => clearInterval(t);
  }, [testiCount]);

  /* Stats counter */
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !counted.current) {
        counted.current = true;
        document.querySelectorAll('[data-target]').forEach(el => {
          const target = +el.dataset.target;
          let current = 0;
          const step = target / 60;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = target >= 1000
              ? Math.floor(current).toLocaleString('en-IN') + '+'
              : Math.floor(current) + (target > 10 ? '+' : '');
          }, 25);
        });
      }
    }, { threshold: 0.3 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  /* Scroll reveal */
  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.revealed);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    items.forEach((item, i) => {
      item.classList.add(styles.reveal);
      item.style.setProperty('--rd', `${Math.min(i * 80, 400)}ms`);
      obs.observe(item);
    });
    return () => obs.disconnect();
  }, []);

  const current = heroSlides[slide];
  const deptColor = (doc) => departments.find(d => d.id === doc.departmentId)?.color || '#0B3D91';
  const getInitials = (name) => name.split(' ').filter(Boolean).slice(0, 2).map(p => p[0]).join('').toUpperCase();

  return (
    <>
      {/* ══════════════════════════════════════════════
          01. HERO CAROUSEL
      ══════════════════════════════════════════════ */}
      <section className={styles.heroCarousel} aria-label="Hospital highlights carousel">
        {/* Background image */}
        <div
          className={`${styles.carouselBg} ${isTransitioning ? styles.carouselBgFade : ''} ${current.imageOnly ? styles.carouselBgImageOnly : ''}`}
          style={{ 
            '--bg-desktop': `url(${current.bgDesktop})`,
            '--bg-tablet': `url(${current.bgTablet})`,
            '--bg-mobile': `url(${current.bgMobile})`
          }}
        />
        {/* Gradient overlay — hidden for image-only slides so colours stay true */}
        {!current.imageOnly && <div className={styles.carouselOverlay} style={{ background: current.overlay }} />}
        {/* Grid noise */}
        <div className={styles.carouselGrid} />

        <div className={styles.carouselInner}>
          {!current.imageOnly && (
            <div className={`${styles.carouselContent} ${isTransitioning ? styles.contentFade : styles.contentVisible}`}>
              {current.tag && (
                <span className={styles.carouselTag} style={{ borderColor: current.accent, color: current.accent }}>
                  <span className={styles.tagDot} style={{ background: current.accent }} />
                  {current.tag}
                </span>
              )}
              {current.heading && (
                <h1 className={styles.carouselH1}>
                  {current.heading.split('\n').map((line, i) => (
                    <span key={i}>{i === 1 ? <em style={{ color: current.accent }}>{line}</em> : line}<br /></span>
                  ))}
                </h1>
              )}
              {current.sub && <p className={styles.carouselSub}>{current.sub}</p>}
              {(current.cta1 || current.cta2) && (
                <div className={styles.carouselBtns}>
                  {current.cta1 && (
                    <Link href={current.cta1.href} className={styles.carouselCta1} style={{ background: current.accent }}>
                      <span>{current.cta1.icon}</span> {current.cta1.label}
                    </Link>
                  )}
                  {current.cta2 && (
                    <Link href={current.cta2.href} className={styles.carouselCta2}>
                      <span>{current.cta2.icon}</span> {current.cta2.label}
                    </Link>
                  )}
                </div>
              )}
              {/* Pills */}
              <div className={styles.heroPills}>
                {['✅ Cashless Treatment', '🔬 Advanced Lab', '🚑 24/7 Ambulance', '💊 In-house Pharmacy'].map(p => (
                  <span key={p} className={styles.heroPill}>{p}</span>
                ))}
              </div>
            </div>
          )}

          {/* Right: floating info cards — only on non-imageOnly slides */}
          {!current.imageOnly && (
            <div className={styles.carouselRight}>
              <div className={`${styles.floatCard} ${styles.fc1}`}>
                <span>🏥</span><div><strong>150000+</strong><small>Patients Treated</small></div>
              </div>
              <div className={`${styles.floatCard} ${styles.fc2}`}>
                <span>⭐</span><div><strong>4.8 / 5</strong><small>Patient Rating</small></div>
              </div>
              <div className={`${styles.floatCard} ${styles.fc3}`}>
                <span>🛡️</span><div><strong>50+ Insurers</strong><small>Cashless Network</small></div>
              </div>
            </div>
          )}
        </div>

        {/* Slide dots */}
        <div className={styles.carouselDots}>
          {heroSlides.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === slide ? styles.dotActive : ''}`}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={i === slide ? { background: current.accent } : undefined}
            />
          ))}
        </div>

        {/* Arrow nav */}
        <button className={`${styles.carouselArrow} ${styles.arrowLeft}`} onClick={() => goToSlide((slide - 1 + heroSlides.length) % heroSlides.length)} aria-label="Previous slide">‹</button>
        <button className={`${styles.carouselArrow} ${styles.arrowRight}`} onClick={() => goToSlide((slide + 1) % heroSlides.length)} aria-label="Next slide">›</button>
      </section>

      {/* ══════════════════════════════════════════════
          02. OVERLAPPING STATS BAR (like CKSH)
      ══════════════════════════════════════════════ */}
      <section className={styles.statsBar} ref={statsRef}>
        <div className={styles.statsBarInner}>
          {[
            { target: 200, label: 'Hospital Beds', icon: '🛏️' },
            { target: 50, label: 'Expert Doctors', icon: '👨‍⚕️' },
            { target: 15, label: 'Super Specialties', icon: '🏥' },
            { target: 150000, label: 'Patients Treated', icon: '❤️' },
            { target: 50, label: 'Insurance Partners', icon: '🛡️' },
          ].map((s, i) => (
            <div key={i} className={styles.statBox} data-reveal>
              <div className={styles.statBoxIcon}>{s.icon}</div>
              <div className={styles.statBoxNum} data-target={s.target}>0</div>
              <div className={styles.statBoxLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          03. QUICK ACCESS TILES
      ══════════════════════════════════════════════ */}
      <section className={styles.quickAccess}>
        <div className="container">
          <div className={styles.quickGrid}>
            {[
              { href: '/appointment', icon: '📅', label: 'Book OPD', color: '#0B3D91' },
              { href: '/doctors', icon: '🩺', label: 'Find a Doctor', color: '#10B981' },
              { href: 'tel:8006005111', icon: '🚑', label: 'Emergency', color: '#DC2626' },
              { href: '/patient-services', icon: '💊', label: 'Pharmacy 24/7', color: '#8B5CF6' },
              { href: '/departments', icon: '🏥', label: 'Departments', color: '#F59E0B' },
              { href: '/empanelments', icon: '🛡️', label: 'Insurance', color: '#0EA5A4' },
            ].map((tile, i) => (
              <Link key={i} href={tile.href} className={styles.quickTile} data-reveal style={{ '--tc': tile.color }}>
                <div className={styles.tileIcon}>{tile.icon}</div>
                <div className={styles.tileLbl}>{tile.label}</div>
                <div className={styles.tileArrow}>→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          04. ABOUT SPLIT SECTION (CKSH-style asymmetric)
      ══════════════════════════════════════════════ */}
      <section className={styles.aboutSection}>
        <div className="container">
          <div className={styles.aboutGrid}>
            {/* Left image with curve cutout */}
            <div className={styles.aboutImageWrap} data-reveal>
              <div className={styles.aboutImageCurve}>
                <Image src="/hero-hospital6.png" alt="K.R. Memorial Hospital" fill className={styles.aboutImg} sizes="(max-width:768px) 100vw, 50vw" />
                <div className={styles.aboutImgOverlay} />
              </div>
              {/* Experience badge */}
              <div className={styles.aboutBadge}>
                <strong>6+</strong>
                <span>Years of Excellence</span>
              </div>
            </div>

            {/* Right content */}
            <div className={styles.aboutContent} data-reveal>
              <span className="section-tag">About Us</span>
              <h2>Your Health Is Our<br /><em>Sacred Mission</em></h2>
              <div className={styles.aboutAccentLine} />
              <p>K.R. Memorial Hospital was born from a powerful vision — to bring world-class, multi-specialty healthcare to the people of semi-urban and rural Rajasthan.</p>
              <p>Located on NH-11, Sikar Road in Chomu, just 35 km from Jaipur, we've grown into a 200+ bedded super-specialty hospital with 15 departments, 50+ expert doctors, and cutting-edge medical technology — all at affordable prices.</p>

              <div className={styles.aboutPoints}>
                {[
                  { icon: '🎯', title: 'Our Mission', desc: 'Best-in-class care using ultra-modern facilities at affordable prices for Rajasthan.' },
                  { icon: '👁️', title: 'Our Vision', desc: 'To reach every village through peripheral centers and telemedicine.' },
                ].map((pt, i) => (
                  <div key={i} className={styles.aboutPoint}>
                    <span className={styles.aboutPointIcon}>{pt.icon}</span>
                    <div>
                      <strong>{pt.title}</strong>
                      <p>{pt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.aboutBtns}>
                <Link href="/about" className="btn btn-primary">Read Our Story →</Link>
                <Link href="/appointment" className="btn btn-outline">Book Appointment</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          05. WHY CHOOSE KR — FLIP CARDS (CKSH pattern)
      ══════════════════════════════════════════════ */}
      <section className={styles.whySection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Why KR Memorial</span>
            <h2>Healthcare You Can Trust</h2>
            <p>We combine advanced technology with compassionate care to deliver the best outcomes for every patient.</p>
          </div>
          <div className={styles.flipGrid}>
            {whyCards.map((card, i) => (
              <div key={i} className={styles.flipCard} data-reveal>
                <div className={styles.flipInner}>
                  {/* Front */}
                  <div className={styles.flipFront} style={{ '--fc': card.color }}>
                    <div className={styles.flipFrontIcon} style={{ background: card.color + '18', color: card.color }}>
                      <span>{card.icon}</span>
                    </div>
                    <h3>{card.title}</h3>
                    <p>{card.front}</p>
                    <div className={styles.flipHint}>Hover to learn more</div>
                  </div>
                  {/* Back */}
                  <div className={styles.flipBack} style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}cc)` }}>
                    <span className={styles.flipBackIcon}>{card.icon}</span>
                    <h3>{card.title}</h3>
                    <p>{card.back}</p>
                    <Link href="/about" className={styles.flipCta}>Learn More →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════
          07. LEADERSHIP SECTION — PREMIUM redesign
      ══════════════════════════════════════════════ */}
      <section className={styles.directorsSection}>
        {/* Decorative blobs */}
        <div className={styles.dirBlob1} />
        <div className={styles.dirBlob2} />
        <div className={styles.dirBlob3} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.dirHeader}>
            <span className={styles.dirTag}>Our Visionaries</span>
            <h2 className={styles.dirHeading}>
              The Minds Behind<br />
              <em>K.R. Memorial Hospital</em>
            </h2>
            <p className={styles.dirSubtext}>
              Three dedicated leader-founders who turned a vision of accessible healthcare<br className={styles.brDsk} />
              into Rajasthan&apos;s most trusted multi-specialty institution.
            </p>
          </div>

          <div className={styles.directorGrid}>
            {directorProfilesHome.map((d, i) => (
              <article key={d.id} className={`${styles.directorCard} ${i === 1 ? styles.dirCardCenter : ''}`} data-reveal>
                {/* Glow ring behind photo */}
                <div className={styles.dirRing} />

                {/* Photo / Avatar */}
                <div className={styles.dirPhotoWrap}>
                  <div className={styles.dirPhoto}>
                    <Image
                      src={d.image}
                      alt={d.name}
                      fill
                      sizes="160px"
                      className={styles.dirPhotoImg}
                    />
                    <div className={styles.dirPhotoSheen} />
                  </div>
                  <div className={styles.dirExpRibbon}>{d.experience}</div>
                </div>

                {/* Content */}
                <div className={styles.dirContent}>
                  <h3 className={styles.dirName}>{d.name}</h3>
                  <span className={styles.dirRole}>{d.title}</span>
                  <span className={styles.dirQual}>{d.qualification}</span>

                  <div className={styles.dirDivider} />

                  <p className={styles.dirBio}>{d.tagline}</p>

                  <div className={styles.dirExpertise}>
                    {d.expertise.slice(0, 2).map((item, ei) => (
                      <span key={ei} className={styles.dirTag2}>{item}</span>
                    ))}
                  </div>
                </div>

                {/* Hover bottom glow */}
                <div className={styles.dirBottomGlow} />
              </article>
            ))}
          </div>

          <div className={styles.dirCta}>
            <Link href="/about" className="btn btn-secondary btn-lg">
              Meet the Full Leadership Team →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          06. DEPARTMENTS GRID
      ══════════════════════════════════════════════ */}
      <section className={styles.deptSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Specialties</span>
            <h2>World-Class Departments</h2>
            <p>15 super-specialties under one roof, staffed by experienced consultants with state-of-the-art infrastructure.</p>
          </div>
          <div className={styles.deptGrid}>
            {departments.map(dept => (
              <Link href={`/departments/${dept.id}`} key={dept.id} className={styles.deptCard} data-reveal style={{ '--dc': dept.color }}>
                <div className={styles.deptIconWrap} style={{ background: dept.color + '15' }}>
                  <span className={styles.deptIcon}>{dept.icon}</span>
                </div>
                <h4>{dept.name}</h4>
                <p>{dept.description}</p>
                <span className={styles.deptArrow} style={{ color: dept.color }}>→</span>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/departments" className="btn btn-outline">View All Departments →</Link>
          </div>
        </div>
      </section>



      {/* ══════════════════════════════════════════════
          08. FEATURED DOCTORS — PREMIUM CARDS
      ══════════════════════════════════════════════ */}
      <section className={styles.doctorsSection}>
        <div className={styles.doctorsBg} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.doctorsHeader}>
            <div>
              <span className="section-tag">Our Experts</span>
              <h2>Meet Our Specialist Doctors</h2>
              <p>Expert medical professionals dedicated to the highest quality care for you and your family.</p>
            </div>
            <Link href="/doctors" className="btn btn-outline">View All Doctors →</Link>
          </div>
          <div className={styles.doctorsGrid}>
            {featuredDoctors.slice(0, 6).map(doc => (
              <div key={doc._id || doc.id} className={styles.doctorCard} data-reveal>
                {/* Photo half */}
                <div className={styles.doctorPhotoHalf}>
                  {doc.imageUrl ? (
                    <img src={doc.imageUrl} alt={doc.name} className={styles.doctorPhoto} />
                  ) : (
                    <div className={styles.doctorPhotoPlaceholder} style={{ background: `linear-gradient(135deg, ${deptColor(doc)}, ${deptColor(doc)}99)` }}>
                      <span style={{ fontSize: '52px' }}>👨‍⚕️</span>
                    </div>
                  )}
                  <div className={styles.doctorPhotoOverlay} style={{ background: `linear-gradient(0deg, ${deptColor(doc)}ee 0%, transparent 55%)` }} />
                  {/* Specialty badge at bottom of photo */}
                  <span className={styles.doctorSpecBadge} style={{ background: deptColor(doc) }}>
                    {doc.specialty}
                  </span>
                  {/* Years badge top-right */}
                  {/* <span className={styles.doctorYrBadge}>{doc.experience}+ yrs</span> */}
                </div>

                <div className={styles.doctorInfoHalf}>
                  <h4 className={styles.doctorName}>{doc.name}</h4>
                  <p className={styles.doctorQualText}>{doc.qualification}</p>
                  {doc.opdTime && (
                    <div className={styles.doctorOpdRow}>
                      <span>🕐</span>
                      <span>{doc.opdDays} · {doc.opdTime}</span>
                    </div>
                  )}
                  <div className={styles.doctorActions}>
                    <Link href={`/doctors#${doc._id || doc.id}`} className={styles.doctorBtnOutline}>Profile</Link>
                    <Link href="/appointment" className={styles.doctorBtnPrimary} style={{ background: deptColor(doc) }}>Book Now</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          09. 24×7 SERVICES (colored cards)
      ══════════════════════════════════════════════ */}
      <section className={styles.servicesSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Always Available</span>
            <h2>24 × 7 Facilities</h2>
            <p>Round-the-clock services so you're never left without care.</p>
          </div>
          <div className={styles.servicesGrid}>
            {[
              { icon: '🚑', title: 'Emergency', desc: 'Fully equipped emergency unit with rapid response trauma team', href: 'tel:8006005111', color: '#DC2626' },
              { icon: '🔬', title: 'Laboratory', desc: 'Comprehensive diagnostic lab with quick turnaround on critical reports', href: '/patient-services', color: '#0B3D91' },
              { icon: '💊', title: 'Pharmacy', desc: 'In-house pharmacy stocked with all essential medications and supplies', href: '/patient-services', color: '#10B981' },
              { icon: '🚐', title: 'Ambulance', desc: 'Advanced life support ambulances available for immediate response', href: 'tel:8006005111', color: '#F59E0B' },
            ].map((svc, i) => (
              <a key={i} href={svc.href} className={styles.serviceCard} data-reveal style={{ '--svc': svc.color }}>
                <div className={styles.serviceIconBubble} style={{ background: svc.color + '18', color: svc.color }}>
                  <span>{svc.icon}</span>
                  <div className={styles.pulseRing} style={{ borderColor: svc.color, animationDelay: `${i * 0.5}s` }} />
                </div>
                <span className={styles.serviceBadge} style={{ background: svc.color }}>24/7</span>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
                <span className={styles.serviceArrow} style={{ color: svc.color }}>Learn More →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          10. TESTIMONIALS CAROUSEL (CKSH style)
      ══════════════════════════════════════════════ */}
      <section className={styles.testiSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Patient Stories</span>
            <h2>What Our Patients Say</h2>
            <p>Real experiences from patients who trusted us with their health journey.</p>
          </div>

          <div className={styles.testiCarouselWrap}>
            <div className={styles.testiCarousel} style={{ transform: `translateX(-${testiSlide * 100}%)` }}>
              {Array.from({ length: testiCount }).map((_, pageIdx) => (
                <div key={pageIdx} className={styles.testiPage}>
                  {testimonials.slice(pageIdx * 3, pageIdx * 3 + 3).map(t => (
                    <div key={t.id} className={styles.testiCard} data-reveal>
                      <div className={styles.testiQuote}>"</div>
                      <div className={styles.testiStars}>{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
                      <p className={styles.testiText}>{t.text}</p>
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
              ))}
            </div>
          </div>

          <div className={styles.testiDots}>
            {Array.from({ length: testiCount }).map((_, i) => (
              <button
                key={i}
                className={`${styles.tDot} ${i === testiSlide ? styles.tDotActive : ''}`}
                onClick={() => setTestiSlide(i)}
                aria-label={`Go to testimonials page ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          11. EMPANELMENTS — PREMIUM SECTION
      ══════════════════════════════════════════════ */}
      <section className={styles.empaSection}>
        <div className={styles.empaInnerBg} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* ── Header row ── */}
          <div className={styles.empaTopRow}>
            <div className={styles.empaTopLeft}>
              <span className={styles.empaTag}>Cashless Treatment</span>
              <h2 className={styles.empaHeading}>
                Trusted by<br /><em>Major Insurers</em>
              </h2>
              <p className={styles.empaSub}>
                We are empanelled with 20+ government schemes and private insurers so that finances never become a barrier to life-saving treatment.
              </p>
            </div>
            <div className={styles.empaStats}>
              {[
                { num: '50+', label: 'Insurers', icon: '🛡️' },
                { num: '₹0', label: 'Upfront Cost', icon: '💳' },
                { num: 'RGHS', label: 'State Scheme', icon: '🏢' },
              ].map((s, i) => (
                <div key={i} className={styles.empaStat}>
                  <span className={styles.empaStatIcon}>{s.icon}</span>
                  <div>
                    <div className={styles.empaStatNum}>{s.num}</div>
                    <div className={styles.empaStatLabel}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Category pills ── */}
          <div className={styles.empaCategories}>
            {[
              { label: 'Government', icon: '🏛️', color: '#0B3D91', count: empanelments.filter(e => e.type === 'Government').length },
              { label: 'PSU Insurance', icon: '🏢', color: '#10B981', count: empanelments.filter(e => e.type === 'PSU Insurance').length },
              { label: 'Private Insurance', icon: '🛡️', color: '#F59E0B', count: empanelments.filter(e => e.type === 'Private Insurance').length },
              { label: 'TPA', icon: '📋', color: '#8B5CF6', count: empanelments.filter(e => e.type === 'TPA').length },
            ].map((cat, i) => (
              <div key={i} className={styles.empaCategoryCard} style={{ '--catc': cat.color }}>
                <span className={styles.empaCatIcon}>{cat.icon}</span>
                <div>
                  <div className={styles.empaCatNum}>{cat.count}</div>
                  <div className={styles.empaCatLabel}>{cat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Double ticker ── */}
        <div className={styles.empaTickersWrap}>
          {/* Row 1: Government + PSU */}
          <div className={styles.empaTickerWrap}>
            <div className={styles.empaTicker}>
              {[...empanelments.filter(e => e.type === 'Government' || e.type === 'PSU Insurance'),
              ...empanelments.filter(e => e.type === 'Government' || e.type === 'PSU Insurance')].map((e, i) => (
                <div key={i} className={styles.empaChip} style={{ '--chc': e.type === 'Government' ? '#0B3D91' : '#10B981' }}>
                  <span>{e.type === 'Government' ? '🏛️' : '🏢'}</span>
                  <span>{e.name}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Row 2: Private + TPA (reversed direction) */}
          <div className={styles.empaTickerWrap}>
            <div className={`${styles.empaTicker} ${styles.empaTickerReverse}`}>
              {[...empanelments.filter(e => e.type === 'Private Insurance' || e.type === 'TPA'),
              ...empanelments.filter(e => e.type === 'Private Insurance' || e.type === 'TPA')].map((e, i) => (
                <div key={i} className={styles.empaChip} style={{ '--chc': e.type === 'Private Insurance' ? '#D97706' : '#8B5CF6' }}>
                  <span>{e.type === 'Private Insurance' ? '🛡️' : '📋'}</span>
                  <span>{e.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '36px', position: 'relative', zIndex: 2 }}>
          <Link href="/empanelments" className="btn btn-primary btn-lg">
            View All Empanelments →
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          12. CONTACT STRIP
      ══════════════════════════════════════════════ */}
      <section className={styles.contactStrip}>
        <div className={styles.contactInner}>
          <div className={styles.contactInfo} data-reveal>
            <span className="section-tag">Get in Touch</span>
            <h2>Find Us &amp; Contact</h2>
            <p>Located on NH-11, Sikar Road in Chomu — easily accessible from Jaipur and surrounding districts.</p>
            <div className={styles.contactItems}>
              {[
                { icon: '📍', label: 'Address', value: hospitalInfo.address, href: hospitalInfo.mapUrl },
                { icon: '📞', label: 'Phone (24/7)', value: '8006005111 | 01423-220320', href: 'tel:8006005111' },
                { icon: '📧', label: 'Email', value: hospitalInfo.email, href: `mailto:${hospitalInfo.email}` },
                { icon: '🕐', label: 'OPD Hours', value: hospitalInfo.opdHours, href: null },
              ].map((item, i) => (
                <div key={i} className={styles.contactItem} data-reveal>
                  <div className={styles.ciIcon}>{item.icon}</div>
                  <div className={styles.ciText}>
                    <strong>{item.label}</strong>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{item.value}</a>
                    ) : (
                      <span>{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.contactMap} data-reveal>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28398.5!2d75.7284!3d27.1663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db1f16f4b06b7%3A0x8d15f0a7c7c4a6e0!2sChomu%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '20px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="KR Memorial Hospital Location"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          13. CTA BANNER
      ══════════════════════════════════════════════ */}
      <section className={styles.ctaBanner}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Ready to Experience World-Class Care?</h2>
          <p>Book your appointment today and let our expert team take care of your health needs.</p>
          <div className={styles.ctaBannerBtns}>
            <Link href="/appointment" className="btn btn-primary btn-lg">📅 Book Appointment</Link>
            <a href="tel:8006005111" className="btn btn-secondary btn-lg">🚑 Emergency: 8006005111</a>
          </div>
        </div>
      </section>
    </>
  );
}
