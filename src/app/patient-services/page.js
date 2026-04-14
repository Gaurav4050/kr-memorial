import Link from 'next/link';
import { roomTypes, faqs } from '@/data/hospital';
import styles from './patientServices.module.css';

export const metadata = { title: 'Patient Services — Rooms, Billing, Admissions & Support', description: 'Patient services at K.R. Memorial Hospital Jaipur — admission process, room types with pricing, billing & payment methods (Cash, UPI, Insurance), visitor policy, and patient support.', keywords: ['hospital rooms Jaipur', 'hospital admission process', 'hospital billing payment', 'patient services Chomu'] };

export default function PatientServicesPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-tag" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>Patient Care</span>
          <h1>Patient Services</h1>
          <p>Everything you need to know for a comfortable and hassle-free hospital experience.</p>
        </div>
      </section>

      {/* Quick Links */}
      {/* <section className={styles.quickLinks}>
        <div className="container">
          <div className={styles.linksGrid}>
            {['🏥 Admission', '🛏️ Room Types', '💳 Billing', '👥 Visitors', '🍽️ Diet', '📋 Records', '💬 Feedback', '❓ FAQ'].map((item, i) => (
              <div key={i} className={styles.linkCard}>{item}</div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Admission Process */}
      <section className={styles.section}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'left' }}>
            <span className="section-tag">Process</span>
            <h2>Admission & Discharge</h2>
          </div>
          <div className={styles.processGrid}>
            <div className={styles.processCard}>
              <h3>🏥 OPD (Outpatient)</h3>
              <ol>
                <li>Visit OPD registration with photo ID</li>
                <li>Get registration card & OPD number</li>
                <li>Consult doctor in respective department</li>
                <li>Get prescriptions, tests ordered</li>
                <li>Collect reports, follow-up as advised</li>
              </ol>
            </div>
            <div className={styles.processCard}>
              <h3>🛏️ IPD (Inpatient)</h3>
              <ol>
                <li>Doctor advises admission</li>
                <li>Fill admission form at IPD counter</li>
                <li>Choose room type (General/Semi/Private/Suite)</li>
                <li>Submit insurance documents (if cashless)</li>
                <li>Get bed allotted & treatment begins</li>
              </ol>
            </div>
            <div className={styles.processCard}>
              <h3>✅ Discharge</h3>
              <ol>
                <li>Doctor clears for discharge</li>
                <li>Final bill prepared (24-48 hours notice)</li>
                <li>Insurance settlement / cash payment</li>
                <li>Collect discharge summary & medicines</li>
                <li>Follow-up appointment scheduled</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Room Types */}
      <section className={styles.roomSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Accommodation</span>
            <h2>Room Types & Pricing</h2>
            <p>Choose from a range of comfortable room options to suit your needs and budget.</p>
          </div>
          <div className={styles.roomGrid}>
            {roomTypes.map((room, i) => (
              <div key={i} className={styles.roomCard}>
                <div className={styles.roomImg}>
                  <span style={{ fontSize: '48px' }}>🛏️</span>
                </div>
                <div className={styles.roomInfo}>
                  <div className={styles.roomHeader}>
                    <h3>{room.type}</h3>
                    <span className={styles.price}>{room.price}</span>
                  </div>
                  <p>{room.description}</p>
                  <div className={styles.features}>
                    {room.features.map((f, j) => (
                      <span key={j} className={styles.feature}>✓ {f}</span>
                    ))}
                  </div>
                  <Link href="/appointment" className="btn btn-sm btn-primary">Book Now</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Billing & Payment */}
      <section className={styles.section} style={{ background: '#fff' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Payments</span>
            <h2>Billing & Payment Methods</h2>
          </div>
          <div className={styles.paymentGrid}>
            {[
              { icon: '💵', title: 'Cash', desc: 'Cash payments accepted at billing counter' },
              { icon: '💳', title: 'Cards', desc: 'All major credit & debit cards accepted' },
              { icon: '📱', title: 'UPI', desc: 'Google Pay, PhonePe, Paytm & other UPI apps' },
              { icon: '🛡️', title: 'Insurance', desc: 'Cashless with 50+ empanelled insurers' },
              { icon: '📊', title: 'EMI Options', desc: 'EMI available for select procedures' },
            ].map((item, i) => (
              <div key={i} className={styles.payCard}>
                <span className={styles.payIcon}>{item.icon}</span>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visitor Policy */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.visitorCard}>
            <div>
              <h3>👥 Visitor Policy & Hours</h3>
              <div className={styles.visitorRules}>
                <div className={styles.rule}><strong>General Ward:</strong> 4:00 PM – 6:00 PM daily</div>
                <div className={styles.rule}><strong>ICU Visiting:</strong> 12:00 PM & 5:00 PM (15 min, 1 attendant)</div>
                <div className={styles.rule}><strong>Private Rooms:</strong> One attendant allowed 24/7</div>
                <div className={styles.rule}><strong>Children:</strong> Under 12 not permitted in ICU/OT areas</div>
              </div>
            </div>
            <div>
              <h3>🍽️ Dietary Services</h3>
              <div className={styles.visitorRules}>
                <div className={styles.rule}><strong>Meals:</strong> Breakfast, Lunch, Evening, Dinner provided</div>
                <div className={styles.rule}><strong>Diet Plans:</strong> Customized by dietitian per doctor&apos;s orders</div>
                <div className={styles.rule}><strong>Special Diet:</strong> Diabetic, renal, post-surgery menus available</div>
                <div className={styles.rule}><strong>Canteen:</strong> Available for attendants & visitors</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Rights */}
      <section className={styles.section} style={{ background: '#fff' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Your Rights</span>
            <h2>Patient Rights & Responsibilities</h2>
          </div>
          <div className={styles.rightsGrid}>
            <div className={styles.rightsCard}>
              <h4>✅ Your Rights</h4>
              <ul>
                <li>Right to quality medical care</li>
                <li>Right to informed consent</li>
                <li>Right to privacy & confidentiality</li>
                <li>Right to a second opinion</li>
                <li>Right to itemized billing</li>
                <li>Right to lodge grievances</li>
              </ul>
            </div>
            <div className={styles.rightsCard}>
              <h4>📋 Your Responsibilities</h4>
              <ul>
                <li>Provide accurate health information</li>
                <li>Follow prescribed treatment plans</li>
                <li>Respect hospital staff & rules</li>
                <li>Settle financial obligations timely</li>
                <li>Report safety concerns</li>
                <li>Respect other patients&apos; privacy</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Need Assistance?</h2>
          <p>Our patient support team is here to help with any queries about services, billing, or your hospital stay.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:8006005111" className="btn btn-primary btn-lg">📞 Call Patient Support</a>
            <Link href="/contact" className="btn btn-white btn-lg">📧 Send Message</Link>
          </div>
        </div>
      </section>
    </>
  );
}
