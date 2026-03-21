import Link from 'next/link';
import { managementTeam } from '@/data/hospital';
import styles from './about.module.css';

export const metadata = {
  title: 'About Us — Our Story, Mission, Vision & Leadership',
  description: 'Learn about K.R. Memorial Hospital — our journey from inception to becoming a 200+ bedded multi-specialty hospital in Jaipur. Our mission: affordable healthcare for Rajasthan.',
  keywords: ['about KR Memorial Hospital', 'hospital history Jaipur', 'hospital mission Chomu', 'healthcare vision Rajasthan'],
};

export default function AboutPage() {
  const timeline = [
    { year: '2009', title: 'Hospital Founded', desc: 'K.R. Memorial Hospital established with a mission to bring specialized healthcare to Chomu and rural Rajasthan.' },
    { year: '2011', title: 'First OT Complex', desc: 'State-of-the-art operation theatre complex inaugurated with two modular OTs.' },
    { year: '2013', title: 'ICU Expansion', desc: 'Advanced ICU with ventilators and multi-para monitors set up for critical care patients.' },
    { year: '2015', title: '100-Bed Milestone', desc: 'Hospital capacity expanded to 100 beds with new departments added.' },
    { year: '2017', title: 'Nephrology & Dialysis', desc: 'Dedicated Nephrology department and modern dialysis unit established.' },
    { year: '2019', title: 'Cath Lab & Cardiology', desc: 'Interventional Cardiology department launched with flat-panel cath lab — first in the region.' },
    { year: '2020', title: 'COVID ICU Established', desc: 'Rapidly set up dedicated COVID ICU to serve the community during the pandemic.' },
    { year: '2022', title: '200+ Beds Achieved', desc: 'Hospital capacity reaches 200+ beds with 15 super-specialties operational.' },
    { year: '2026', title: 'Today & Beyond', desc: 'Serving 25,000+ patients annually with a vision to reach every village in Rajasthan.' },
  ];

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <span className="section-tag" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>Our Story</span>
          <h1>Healing Lives in the<br />Heart of Rajasthan</h1>
          <p>Since 2009, K.R. Memorial Hospital has been committed to providing world-class healthcare at affordable prices to the people of Rajasthan.</p>
          <div className={styles.heroStats}>
            <div><strong>Est. 2009</strong><span>Founded</span></div>
            <div><strong>200+</strong><span>Beds</span></div>
            <div><strong>15</strong><span>Specialties</span></div>
            <div><strong>25,000+</strong><span>Patients/Year</span></div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className={styles.storySection}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyContent}>
              <span className="section-tag">Our Journey</span>
              <h2>From Vision to Reality</h2>
              <p className={styles.dropCap}>
                K.R. Memorial Hospital was born from a simple yet powerful vision — to bring world-class multi-specialty healthcare to the people of semi-urban and rural Rajasthan, where families often had to travel hundreds of kilometers to access advanced medical treatment.
              </p>
              <p>
                Located on NH-11, Sikar Road in Chomu, just 35 km from Jaipur, the hospital started as a modest facility and has grown into a 200+ bedded multi-super specialty hospital with 15 specialized departments, 50+ expert doctors, and the latest medical technology.
              </p>
              <p>
                What sets us apart is our unwavering commitment to providing best-in-class healthcare using fully equipped ultra-modern facilities — all at prices accessible to the communities we serve. From general medicine to complex cardiac surgeries, brain tumor operations to joint replacements, we handle it all under one roof.
              </p>
              <blockquote className={styles.pullQuote}>
                &ldquo;Our mission is to provide the best possible medical care using cutting-edge technology, delivered by compassionate professionals, at prices that are accessible to all.&rdquo;
              </blockquote>
            </div>
            <div className={styles.storyImage}>
              <div className={styles.imgPlaceholder}>
                <span style={{ fontSize: '80px' }}>🏥</span>
                <p>K.R. Memorial Hospital, Chomu</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className={styles.mvvSection}>
        <div className="container">
          <div className={styles.mvvGrid}>
            <div className={styles.mvvCard}>
              <span className={styles.mvvIcon}>🎯</span>
              <h3>Our Mission</h3>
              <p>Providing best-in-class healthcare through fully equipped ultra-modern facilities at affordable prices, ensuring every patient receives world-class medical care regardless of their economic background.</p>
            </div>
            <div className={styles.mvvCard}>
              <span className={styles.mvvIcon}>👁️</span>
              <h3>Our Vision</h3>
              <p>To reach every village in Rajasthan through peripheral outreach centers and telemedicine, making specialized healthcare accessible to the remotest communities of the state.</p>
            </div>
            <div className={styles.mvvCard}>
              <span className={styles.mvvIcon}>💎</span>
              <h3>Our Values</h3>
              <div className={styles.valuesList}>
                <span>Patient-First Care</span>
                <span>Medical Integrity</span>
                <span>Innovation</span>
                <span>Compassion</span>
                <span>Accessibility</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className={styles.timelineSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Journey</span>
            <h2>Milestones of Growth</h2>
          </div>
          <div className={styles.timeline}>
            {timeline.map((item, i) => (
              <div key={i} className={`${styles.timelineItem} ${i % 2 === 0 ? styles.left : styles.right}`}>
                <div className={styles.timelineContent}>
                  <span className={styles.timelineYear}>{item.year}</span>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className={styles.infraSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Facilities</span>
            <h2>Infrastructure Highlights</h2>
          </div>
          <div className={styles.infraGrid}>
            {[
              { icon: '🏗️', title: 'Ultra-Modern OT Complex', desc: 'Multiple modular operation theatres with laminar airflow, HD laparoscopic systems, and advanced surgical equipment.' },
              { icon: '🫀', title: 'Cardiac Cath Lab', desc: 'State-of-the-art flat-panel cath lab for coronary angiography, angioplasty, and 24/7 primary PCI capability.' },
              { icon: '🔬', title: 'Advanced ICU & Critical Care', desc: 'Multi-bed ICU with latest ventilators, multi-para monitors, CRRT machines, and round-the-clock intensivist coverage.' },
              { icon: '💉', title: 'Dedicated Dialysis Unit', desc: 'Modern hemodialysis center with Fresenius machines, RO water plant, and comfortable patient stations.' },
            ].map((item, i) => (
              <div key={i} className={styles.infraCard}>
                <span className={styles.infraIcon}>{item.icon}</span>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className={styles.leaderSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Leadership</span>
            <h2>Director&apos;s Message</h2>
          </div>
          <div className={styles.leaderCard}>
            <div className={styles.leaderAvatar}>
              <span style={{ fontSize: '60px' }}>👨‍💼</span>
            </div>
            <div className={styles.leaderContent}>
              <h3>Dr. Rajendra Prasad</h3>
              <span className={styles.leaderRole}>Hospital Director</span>
              <blockquote>
                &ldquo;At KR Memorial Hospital, we believe that quality healthcare is not a luxury but a right. Our mission is to provide the best possible medical care using cutting-edge technology, delivered by compassionate professionals, at prices that are accessible to all. We envision a Rajasthan where no family has to travel to distant cities for specialized treatment. Every day, we work towards making this vision a reality — one patient, one village at a time.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className={styles.accredSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Recognition</span>
            <h2>Accreditations & Awards</h2>
          </div>
          <div className={styles.accredGrid}>
            {['🏆 Quality Healthcare Award 2023', '📜 ISO 9001:2015 Certified', '🏛️ NABH Application In Progress', '🎖️ Best Multi-Specialty Hospital - Rajasthan 2022', '🩺 CGHS Empanelled Institution', '🌟 Top Rated Hospital - Google Reviews'].map((item, i) => (
              <div key={i} className={styles.accredCard}>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Join Our Growing Team</h2>
          <p>We&apos;re always looking for passionate medical professionals who share our vision of accessible healthcare in Rajasthan.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`mailto:${managementTeam?.[0]?.email || 'wecare@krmemorialhospital.com'}`} className="btn btn-primary btn-lg">📧 Send Your Resume</a>
            <Link href="/contact" className="btn btn-white btn-lg">📞 Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
