import Link from 'next/link';
import { departments } from '@/data/hospital';
import styles from './departments.module.css';

export const metadata = {
  title: 'Our Departments — 15 Super Specialties Under One Roof',
  description: 'Explore 15 super-specialty departments at K.R. Memorial Hospital Jaipur — Cardiology, Orthopaedics, Neurology, Nephrology, Oncology, General Surgery, ENT, OB-GYN, Urology, and more.',
  keywords: ['hospital departments Jaipur', 'cardiology department', 'orthopaedics department', 'neurosurgery Jaipur', 'multi specialty hospital departments'],
};

export default function DepartmentsPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-tag" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>Our Specialties</span>
          <h1>15 World-Class Departments</h1>
          <p>Comprehensive medical care across 15 super-specialties, all under one roof with state-of-the-art infrastructure.</p>
        </div>
      </section>

      <section className={styles.deptList}>
        <div className="container">
          <div className={styles.grid}>
            {departments.map((dept, i) => (
              <Link href={`/departments/${dept.id}`} key={dept.id} className={styles.card} style={{ '--delay': `${i * 0.05}s` }}>
                <div className={styles.cardTop}>
                  <div className={styles.iconWrap} style={{ background: `${dept.color}15` }}>
                    <span className={styles.icon}>{dept.icon}</span>
                  </div>
                  <span className={styles.arrow}>→</span>
                </div>
                <h3>{dept.name}</h3>
                <p>{dept.description}</p>
                <div className={styles.cardMeta}>
                  <span>🕐 OPD: {dept.opdDays}</span>
                  <span>📍 {dept.opdTime}</span>
                </div>
                <div className={styles.treatmentTags}>
                  {dept.treatments.slice(0, 3).map(t => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                  {dept.treatments.length > 3 && <span className={styles.tagMore}>+{dept.treatments.length - 3} more</span>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Can&apos;t decide which department?</h2>
          <p>Our reception team will guide you to the right specialist. Call us or book a General Medicine consultation.</p>
          <div className={styles.ctaBtns}>
            <a href="tel:8006005111" className="btn btn-primary btn-lg">📞 Call 8006005111</a>
            <Link href="/appointment" className="btn btn-white btn-lg">📅 Book Appointment</Link>
          </div>
        </div>
      </section>
    </>
  );
}
