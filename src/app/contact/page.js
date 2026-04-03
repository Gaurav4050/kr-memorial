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

      console.log('📤 [CONTACT FORM] Sending payload:', JSON.stringify(payload, null, 2));

      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      console.log('📥 [CONTACT FORM] Response:', data);

      if (data.success) {
        setSubmitted(true);
        setForm({ name: '', phone: '', email: '', subject: '', department: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
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

  return (
    <>
      {/* Emergency Banner */}
      <section className={styles.emergencyBanner}>
        <div className="container">
          <span className={styles.pulseIcon}></span>
          For Life-Threatening Emergencies: <a href="tel:8006005111"><strong>Call 8006005111 NOW</strong></a>
        </div>
      </section>

      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <span className="section-tag" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>Get in Touch</span>
          <h1>Contact Us</h1>
          <p>We&apos;re here to help. Reach out for appointments, queries, or any assistance you need.</p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className={styles.contactCards}>
        <div className="container">
          <div className={styles.cardsGrid}>
            <a href="tel:8006005111" className={styles.infoCard}>
              <span className={styles.infoIcon}>📞</span>
              <h3>Call Us</h3>
              <p className={styles.infoMain}>8006005111</p>
              <p className={styles.infoSub}>01423-220320</p>
            </a>
            <a href={`mailto:${hospitalInfo.email}`} className={styles.infoCard}>
              <span className={styles.infoIcon}>📧</span>
              <h3>Email Us</h3>
              <p className={styles.infoMain}>{hospitalInfo.email}</p>
              <p className={styles.infoSub}>We respond within 2 hours</p>
            </a>
            <a href={hospitalInfo.mapUrl} target="_blank" rel="noopener noreferrer" className={styles.infoCard}>
              <span className={styles.infoIcon}>📍</span>
              <h3>Visit Us</h3>
              <p className={styles.infoMain}>NH-11, Sikar Road, Chomu</p>
              <p className={styles.infoSub}>Jaipur, Rajasthan 303702</p>
            </a>
            <div className={styles.infoCard}>
              <span className={styles.infoIcon}>🕐</span>
              <h3>Working Hours</h3>
              <p className={styles.infoMain}>OPD: 8 AM – 8 PM</p>
              <p className={styles.infoSub}>Emergency: 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className={styles.formSection}>
        <div className="container">
          <div className={styles.formGrid}>
            <div className={styles.formWrap}>
              <h2>Send Us a Message</h2>
              <p>Fill out the form below and our team will get back to you shortly.</p>
              {submitted ? (
                <div className={styles.successMsg}>
                  <span style={{ fontSize: '48px' }}>✅</span>
                  <h3>Message Sent Successfully!</h3>
                  <p>Our team will contact you within 2 hours during working hours. You will receive an email confirmation shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  {error && (
                    <div className={styles.errorMsg}>
                      <span style={{ fontSize: '24px' }}>⚠️</span>
                      <p>{error}</p>
                    </div>
                  )}
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Full Name *</label>
                      <input 
                        type="text" 
                        required 
                        value={form.name} 
                        onChange={(e) => setForm({ ...form, name: e.target.value })} 
                        placeholder="Your full name"
                        disabled={loading}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Phone Number *</label>
                      <input 
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
                    <label>Email</label>
                    <input 
                      type="email" 
                      value={form.email} 
                      onChange={(e) => setForm({ ...form, email: e.target.value })} 
                      placeholder="your@email.com"
                      disabled={loading}
                    />
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Subject</label>
                      <select 
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
                      <label>Department</label>
                      <select 
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
                    <label>Message *</label>
                    <textarea 
                      rows="4" 
                      required
                      value={form.message} 
                      onChange={(e) => setForm({ ...form, message: e.target.value })} 
                      placeholder="How can we help you?"
                      disabled={loading}
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg" 
                    style={{ width: '100%', justifyContent: 'center' }}
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
            <div className={styles.mapWrap}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28398.5!2d75.7284!3d27.1663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db1f16f4b06b7%3A0x8d15f0a7c7c4a6e0!2sChomu%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '20px', minHeight: '400px' }}
                allowFullScreen=""
                loading="lazy"
                title="KR Memorial Hospital Location"
              ></iframe>
              <a href={hospitalInfo.mapUrl} target="_blank" rel="noopener noreferrer" className={styles.dirBtn}>
                📍 Get Directions on Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* OPD Timings */}
      <section className={styles.opdSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">OPD Schedule</span>
            <h2>Department-wise OPD Timings</h2>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr><th>Department</th><th>OPD Days</th><th>Timing</th></tr>
              </thead>
              <tbody>
                {departments.map(dept => (
                  <tr key={dept.id}>
                    <td><span>{dept.icon}</span> {dept.name}</td>
                    <td>{dept.opdDays}</td>
                    <td>{dept.opdTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className={styles.socialSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Stay Connected</span>
            <h2>Follow Us on Social Media</h2>
          </div>
          <div className={styles.socialGrid}>
            <a href={hospitalInfo.social.facebook} target="_blank" rel="noopener noreferrer" className={styles.socialCard} style={{ '--social-color': '#1877F2' }}>
              <span style={{ fontSize: '32px' }}>📘</span>
              <h4>Facebook</h4>
              <p>@krmhofficial</p>
            </a>
            <a href={hospitalInfo.social.instagram} target="_blank" rel="noopener noreferrer" className={styles.socialCard} style={{ '--social-color': '#E4405F' }}>
              <span style={{ fontSize: '32px' }}>📸</span>
              <h4>Instagram</h4>
              <p>@krmhospital</p>
            </a>
            <a href={hospitalInfo.social.twitter} target="_blank" rel="noopener noreferrer" className={styles.socialCard} style={{ '--social-color': '#000' }}>
              <span style={{ fontSize: '32px' }}>🐦</span>
              <h4>Twitter / X</h4>
              <p>@KRMHospital</p>
            </a>
            <a href={hospitalInfo.social.whatsapp} target="_blank" rel="noopener noreferrer" className={styles.socialCard} style={{ '--social-color': '#25D366' }}>
              <span style={{ fontSize: '32px' }}>💬</span>
              <h4>WhatsApp</h4>
              <p>Chat with us</p>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">FAQ</span>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq, i) => (
              <div key={i} className={`${styles.faqItem} ${openFaq === i ? styles.faqOpen : ''}`}>
                <button className={styles.faqQuestion} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.question}</span>
                  <span className={styles.faqToggle}>{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className={styles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
