'use client';
import { useState } from 'react';
import { hospitalInfo, departments, faqs } from '@/data/hospital';
import styles from './contact.module.css';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', department: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('message');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        name: form.name,
        phone: form.phone,
        email: form.email || '',
        subject: form.subject || '',
        department: form.department || '',
        message: form.message,
      };

      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setForm({ name: '', phone: '', email: '', subject: '', department: '', message: '' });
        setTimeout(() => setSubmitted(false), 6000);
      } else {
        setError(data.message || 'Failed to submit the form. Please try again.');
      }
    } catch (err) {
      console.error('❌ [CONTACT FORM] Error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactCards = [
    { icon: 'ðŸ"ž', title: 'Call Us', main: '8006005111', sub: '8006005105 / 01423-220320', href: 'tel:8006005111', color: '#DC2626' },
    { icon: '📧', title: 'Email Us', main: hospitalInfo.email, sub: 'We respond within 2 hours', href: `mailto:${hospitalInfo.email}`, color: '#0B3D91' },
    { icon: '📍', title: 'Visit Us', main: 'Radhaswami Bagh, NH52, Sikar Road, Chomu, Jaipur', sub: 'Jaipur, Rajasthan 303702', href: hospitalInfo.mapUrl, color: '#10B981' },
    { icon: '🕐', title: 'Working Hours', main: 'OPD: 8 AM – 8 PM', sub: 'Emergency: 24/7', href: null, color: '#F59E0B' },
  ];

  return (
    <>
      {/* ════════════════════════════════
          01. EMERGENCY BANNER
      ════════════════════════════════ */}
      <div className={styles.emergencyBar}>
        <span className={styles.emergencyPulse} />
        <span>🚨 Life-Threatening Emergency? Call immediately:</span>
        <a href="tel:8006005111" className={styles.emergencyNum}>8006005111</a>
        <span className={styles.emergencyDiv}>|</span>        <a href="tel:8006005105" className={styles.emergencyNum}>8006005105</a>
          <span className={styles.emergencyDiv}>|</span>        <a href="tel:01423220320" className={styles.emergencyNum}>01423-220320</a>
      </div>

      {/* ════════════════════════════════
          02. HERO
      ════════════════════════════════ */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGrid} />
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.heroLeft}>
              <span className={styles.heroTag}>Get in Touch</span>
              <h1 className={styles.heroH1}>Contact <em>KR Memorial</em><br />Hospital</h1>
              <p className={styles.heroSub}>We&apos;re here to help with appointments, queries, or any assistance you need. Reach us by phone, email, or visit us in person.</p>
            </div>
            {/* Hero contact quick info */}
            <div className={styles.heroRight}>
              <div className={styles.heroQuickInfo}>
                <a href="tel:8006005111" className={styles.heroInfoRow}>
                  <div className={styles.heroInfoIcon} style={{ background: '#DC262618' }}>📞</div>
                  <div>
                    <strong>Emergency & Helpline</strong>
                    <span>8006005111 | 01423-220320</span>
                  </div>
                </a>
                <a href={hospitalInfo.mapUrl} target="_blank" rel="noopener noreferrer" className={styles.heroInfoRow}>
                  <div className={styles.heroInfoIcon} style={{ background: '#10B98118' }}>📍</div>
                  <div>
                    <strong>Our Location</strong>
                    <span>Radhaswami Bagh, NH52, Sikar Road, Chomu, Jaipur</span>
                  </div>
                </a>
                <a href={`mailto:${hospitalInfo.email}`} className={styles.heroInfoRow}>
                  <div className={styles.heroInfoIcon} style={{ background: '#0B3D9118' }}>📧</div>
                  <div>
                    <strong>Email Us</strong>
                    <span>{hospitalInfo.email}</span>
                  </div>
                </a>
                <div className={styles.heroInfoRow}>
                  <div className={styles.heroInfoIcon} style={{ background: '#F59E0B18' }}>🕐</div>
                  <div>
                    <strong>OPD Hours</strong>
                    <span>Mon–Sat: 8 AM – 8 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          03. CONTACT CARDS (overlapping)
      ════════════════════════════════ */}
      <section className={styles.cardsSection}>
        <div className="container">
          <div className={styles.cardsGrid}>
            {contactCards.map((card, i) => (
              card.href ? (
                <a key={i} href={card.href} target={card.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className={styles.infoCard} style={{ '--cc': card.color }}>
                  <div className={styles.infoCardIcon} style={{ background: card.color + '18', color: card.color }}>{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p className={styles.infoMain}>{card.main}</p>
                  <p className={styles.infoSub}>{card.sub}</p>
                  <span className={styles.infoArrow} style={{ color: card.color }}>→</span>
                </a>
              ) : (
                <div key={i} className={styles.infoCard} style={{ '--cc': card.color }}>
                  <div className={styles.infoCardIcon} style={{ background: card.color + '18', color: card.color }}>{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p className={styles.infoMain}>{card.main}</p>
                  <p className={styles.infoSub}>{card.sub}</p>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          04. FORM + MAP (CKSH-style tabs)
      ════════════════════════════════ */}
      <section className={styles.formSection}>
        <div className="container">
          <div className={styles.formGrid}>
            {/* LEFT: Form with tabs */}
            <div className={styles.formWrap}>
              <div className={styles.formHeader}>
                <h2>How can we help you?</h2>
                <p>Fill out the form below and our team will get back to you within 2 business hours.</p>
              </div>
              {/* Tabs */}
              <div className={styles.formTabs}>
                <button className={`${styles.formTab} ${activeTab === 'message' ? styles.formTabActive : ''}`} onClick={() => setActiveTab('message')}>
                  💬 Send Message
                </button>
                <button className={`${styles.formTab} ${activeTab === 'appointment' ? styles.formTabActive : ''}`} onClick={() => setActiveTab('appointment')}>
                  📅 Book Appointment
                </button>
              </div>

              {submitted ? (
                <div className={styles.successBox}>
                  <div className={styles.successIcon}>✅</div>
                  <h3>Message Sent Successfully!</h3>
                  <p>Our team will contact you within 2 hours during working hours. You will receive a confirmation shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  {error && (
                    <div className={styles.errorBox}>
                      <span>⚠️</span>
                      <p>{error}</p>
                    </div>
                  )}

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="contact-name">Full Name *</label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your full name"
                        disabled={loading}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="contact-phone">Phone Number *</label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 XXXXXXXXXX"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="contact-email">Email Address</label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      disabled={loading}
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="contact-subject">Subject</label>
                      <select
                        id="contact-subject"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        disabled={loading}
                      >
                        <option value="">Select Subject</option>
                        <option>Appointment Inquiry</option>
                        <option>Billing Query</option>
                        <option>Feedback</option>
                        <option>Careers</option>
                        <option>Media Inquiry</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="contact-dept">Department</label>
                      <select
                        id="contact-dept"
                        value={form.department}
                        onChange={(e) => setForm({ ...form, department: e.target.value })}
                        disabled={loading}
                      >
                        <option value="">Select Department</option>
                        {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="contact-message">Message *</label>
                    <textarea
                      id="contact-message"
                      rows="5"
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="How can we help you?"
                      disabled={loading}
                    />
                  </div>

                  <button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading ? (
                      <><span className={styles.spinner} /> Sending…</>
                    ) : (
                      <>Send Message 📤</>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* RIGHT: Map */}
            <div className={styles.mapWrap}>
              <div className={styles.mapHeader}>
                <h3>📍 Find Us on Map</h3>
                <p>Radhaswami Bagh, NH52, Sikar Road, Chomu, Jaipur, Rajasthan 303702</p>
              </div>
              <div className={styles.mapEmbed}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28398.5!2d75.7284!3d27.1663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db1f16f4b06b7%3A0x8d15f0a7c7c4a6e0!2sChomu%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '16px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="KR Memorial Hospital Location"
                />
              </div>
              <div className={styles.mapActions}>
                <a href={hospitalInfo.mapUrl} target="_blank" rel="noopener noreferrer" className={styles.dirBtn}>
                  📍 Get Directions on Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          05. OPD TIMINGS TABLE
      ════════════════════════════════ */}
      {/* <section className={styles.opdSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">OPD Schedule</span>
            <h2>Department-wise OPD Timings</h2>
            <p>Walk-in and prior appointment OPD timings for all departments.</p>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Department</th>
                  <th>OPD Days</th>
                  <th>Timing</th>
                </tr>
              </thead>
              <tbody>
                {departments.map(dept => (
                  <tr key={dept.id}>
                    <td>
                      <span className={styles.deptCell}>
                        <span style={{ fontSize: '18px' }}>{dept.icon}</span>
                        <span>{dept.name}</span>
                      </span>
                    </td>
                    <td>{dept.opdDays}</td>
                    <td>{dept.opdTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section> */}

      {/* ════════════════════════════════
          06. SOCIAL MEDIA
      ════════════════════════════════ */}
      <section className={styles.socialSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Stay Connected</span>
            <h2>Follow Us on Social Media</h2>
            <p>Stay updated with health tips, news, and events from KR Memorial Hospital.</p>
          </div>
          <div className={styles.socialGrid}>
            {[
              { href: hospitalInfo.social.facebook, icon: '📘', name: 'Facebook', handle: '@krmhofficial', color: '#1877F2' },
              { href: hospitalInfo.social.instagram, icon: '📸', name: 'Instagram', handle: '@krmhospital', color: '#E4405F' },
              { href: hospitalInfo.social.twitter, icon: '🐦', name: 'Twitter / X', handle: '@KRMHospital', color: '#000' },
              { href: hospitalInfo.social.whatsapp, icon: '💬', name: 'WhatsApp', handle: 'Chat with us', color: '#25D366' },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className={styles.socialCard} style={{ '--sc': s.color }}>
                <div className={styles.socialIcon} style={{ background: s.color + '15', color: s.color }}>{s.icon}</div>
                <h4>{s.name}</h4>
                <p>{s.handle}</p>
                <span className={styles.socialArrow} style={{ color: s.color }}>Follow →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          07. FAQ ACCORDION
      ════════════════════════════════ */}
      <section className={styles.faqSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">FAQ</span>
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers to the most common questions about KR Memorial Hospital.</p>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq, i) => (
              <div key={i} className={`${styles.faqItem} ${openFaq === i ? styles.faqOpen : ''}`}>
                <button className={styles.faqQuestion} onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                  <span className={styles.faqQ}>{faq.question}</span>
                  <span className={styles.faqToggle}>{openFaq === i ? '−' : '+'}</span>
                </button>
                <div className={`${styles.faqAnswer} ${openFaq === i ? styles.faqAnswerOpen : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
