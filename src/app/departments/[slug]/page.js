import Link from 'next/link';
import { notFound } from 'next/navigation';
import { departments, doctors } from '@/data/hospital';
import { departmentDoctors } from '@/data/departmentDoctors';
import styles from './deptDetail.module.css';

export async function generateStaticParams() {
  return departments.map((dept) => ({ slug: dept.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const dept = departments.find(d => d.id === slug);
  if (!dept) return { title: 'Department Not Found' };
  return {
    title: `${dept.name} — Best ${dept.shortName} Department in Jaipur`,
    description: `${dept.fullDescription.slice(0, 160)}... Expert doctors, advanced equipment, and affordable care at K.R. Memorial Hospital, Jaipur.`,
    keywords: [`${dept.shortName} Jaipur`, `${dept.name} hospital`, `best ${dept.shortName} doctor Jaipur`, `${dept.shortName} treatment Chomu`],
    openGraph: {
      title: `${dept.name} — K.R. Memorial Hospital`,
      description: dept.description,
    },
  };
}

export default async function DepartmentDetail({ params }) {
  const { slug } = await params;
  const dept = departments.find(d => d.id === slug);
  if (!dept) notFound();

  const deptDoctors = [
    ...doctors.filter(doc => doc.departmentId === dept.id),
    ...(departmentDoctors.find(d => d.departmentId === dept.id)?.doctors || []),
  ];

  return (
    <>
      {/* Hero */}
      <section className={styles.hero} style={{ '--dept-color': dept.color }}>
        <div className="container">
          <div className={styles.heroContent}>
            <Link href="/departments" className={styles.breadcrumb}>← All Departments</Link>
            <div className={styles.heroIcon}>{dept.icon}</div>
            <h1>{dept.name}</h1>
            <p>{dept.description}</p>
            <div className={styles.heroBtns}>
              <Link href="/appointment" className="btn btn-primary btn-lg">📅 Book Appointment</Link>
              <a href="tel:8006005111" className="btn btn-secondary btn-lg">📞 Call Now</a>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className={styles.aboutSection}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutContent}>
              <span className="section-tag">About This Department</span>
              <h2>{dept.name}</h2>
              <p>{dept.fullDescription}</p>
              <div className={styles.opdBox}>
                <h4>OPD Schedule</h4>
                <div className={styles.opdRow}><span>📅 Days:</span> <strong>{dept.opdDays}</strong></div>
                <div className={styles.opdRow}><span>🕐 Time:</span> <strong>{dept.opdTime}</strong></div>
              </div>
            </div>
            <div className={styles.aboutSidebar}>
              <div className={styles.infoCard}>
                <div className={styles.infoCardIcon} style={{ background: `${dept.color}15` }}>{dept.icon}</div>
                <h4>Quick Contact</h4>
                <a href="tel:8006005111" className={styles.phoneLink}>📞 8006005111</a>
                <a href="tel:01423220320" className={styles.phoneLink}>📞 01423-220320</a>
                <Link href="/appointment" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}>Book Appointment</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments */}
      <section className={styles.treatSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Procedures & Treatments</span>
            <h2>What We Treat</h2>
          </div>
          <div className={styles.treatGrid}>
            {dept.treatments.map((t, i) => (
              <div key={i} className={styles.treatCard}>
                <span className={styles.treatNum}>{String(i + 1).padStart(2, '0')}</span>
                <h4>{t}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className={styles.equipSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Technology</span>
            <h2>Equipment & Infrastructure</h2>
          </div>
          <div className={styles.equipGrid}>
            {dept.equipment.map((eq, i) => (
              <div key={i} className={styles.equipCard}>
                <span>🔬</span>
                <h4>{eq}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Department Doctors */}
      {deptDoctors.length > 0 && (
        <section className={styles.docSection}>
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Our Team</span>
              <h2>Doctors in {dept.shortName}</h2>
            </div>
            <div className={styles.docGrid}>
              {deptDoctors.map(doc => (
                <div key={doc.id || doc._id} className={styles.docCard}>
                  <div className={styles.docPhotoWrap}>
                    {(doc.imageUrl || doc.image) && !String(doc.imageUrl || doc.image).includes('placeholder') ? (
                      <img
                        src={doc.imageUrl || doc.image}
                        alt={doc.name}
                        className={styles.docPhoto}
                      />
                    ) : (
                      <div className={styles.docAvatar} style={{ background: `linear-gradient(135deg,${dept.color}33,${dept.color}11)` }}>👨‍⚕️</div>
                    )}
                  </div>
                  <div className={styles.docInfo}>
                    <h4>{doc.name}</h4>
                    {doc.qualification && <p className={styles.docQual}>{doc.qualification}</p>}
                    {doc.designation && <span className={styles.desg}>{doc.designation}</span>}
                    <div className={styles.docMeta}>
                      {doc.experience && <span>🏥 {doc.experience}+ Yrs</span>}
                      {doc.languages && doc.languages.length > 0 && <span>🗣 {doc.languages.join(', ')}</span>}
                    </div>
                    {(doc.opdDays || doc.opdTime) && (
                      <div className={styles.docOpd}>
                        {doc.opdDays && <div className={styles.opdItem}><span>📅</span><span>{doc.opdDays}</span></div>}
                        {doc.opdTime && <div className={styles.opdItem}><span>🕐</span><span>{doc.opdTime}</span></div>}
                      </div>
                    )}
                  </div>
                  <Link href="/appointment" className="btn btn-sm btn-primary" style={{ justifyContent: 'center', background: dept.color, color: '#fff' }}>Book Appointment</Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Need a Consultation?</h2>
          <p>Book an appointment with our {dept.shortName} specialists today.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/appointment" className="btn btn-primary btn-lg">📅 Book Appointment</Link>
            <a href="tel:8006005111" className="btn btn-white btn-lg">📞 Call 8006005111</a>
          </div>
        </div>
      </section>
    </>
  );
}
