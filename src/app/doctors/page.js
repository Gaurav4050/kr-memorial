'use client';
import { useState } from 'react';
import Link from 'next/link';
import { doctors, departments } from '@/data/hospital';
import styles from './doctors.module.css';

export default function DoctorsPage() {
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const filtered = doctors.filter(doc => {
    const matchSearch = doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(search.toLowerCase());
    const matchSpecialty = !specialty || doc.departmentId === specialty;
    return matchSearch && matchSpecialty;
  });

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <span className="section-tag" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>Our Medical Team</span>
          <h1>Meet Our Expert Doctors</h1>
          <p>15+ specialist departments, 50+ experienced doctors — find the right doctor for your healthcare needs.</p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className={styles.filterBar}>
        <div className={styles.filterInner}>
          <div className={styles.searchBox}>
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search by doctor name or specialty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} className={styles.filterSelect}>
            <option value="">All Departments</option>
            {departments.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
          <span className={styles.resultCount}>Showing {filtered.length} doctors</span>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className={styles.doctorsGrid}>
        <div className="container">
          <div className={styles.grid}>
            {filtered.map(doc => {
              const dept = departments.find(d => d.id === doc.departmentId);
              return (
                <div key={doc.id} className={styles.card} id={doc.id}>
                  <div className={styles.cardImg}>
                    <div className={styles.imgPlaceholder} style={{ background: `linear-gradient(135deg, ${dept?.color || '#0B3D91'}22, ${dept?.color || '#0B3D91'}08)` }}>
                      <span style={{ fontSize: '56px' }}>👨‍⚕️</span>
                    </div>
                    <span className={styles.expBadge}>{doc.experience}+ yrs exp</span>
                  </div>
                  <div className={styles.cardBody}>
                    <h3>{doc.name}</h3>
                    <p className={styles.qual}>{doc.qualification}</p>
                    <span className={styles.specialtyPill} style={{ background: `${dept?.color || '#0B3D91'}15`, color: dept?.color || '#0B3D91', borderColor: `${dept?.color}30` }}>
                      {dept?.icon} {doc.specialty}
                    </span>
                    <div className={styles.meta}>
                      <span>⭐ {doc.rating}</span>
                      <span className={styles.reviewCount}>({doc.reviews} reviews)</span>
                    </div>
                    <div className={styles.opdInfo}>
                      <span>🕐 OPD: {doc.opdDays}</span>
                      <span>📍 {doc.opdTime}</span>
                    </div>
                    <div className={styles.languages}>
                      🗣️ {doc.languages.join(', ')}
                    </div>
                    <div className={styles.cardBtns}>
                      <button className="btn btn-sm btn-outline" onClick={() => setSelectedDoctor(doc)}>View Profile</button>
                      <Link href="/appointment" className="btn btn-sm btn-primary">Book Now</Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className={styles.noResults}>
              <span style={{ fontSize: '48px' }}>🔍</span>
              <h3>No doctors found</h3>
              <p>Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Doctor Profile Modal */}
      {selectedDoctor && (
        <div className={styles.modalOverlay} onClick={() => setSelectedDoctor(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setSelectedDoctor(null)}>✕</button>
            <div className={styles.modalHeader}>
              <div className={styles.modalImg}>
                <span style={{ fontSize: '64px' }}>👨‍⚕️</span>
              </div>
              <div className={styles.modalInfo}>
                <h2>{selectedDoctor.name}</h2>
                <p className={styles.modalQual}>{selectedDoctor.qualification}</p>
                <span className={styles.specialtyPill} style={{ background: `${departments.find(d => d.id === selectedDoctor.departmentId)?.color || '#0B3D91'}15`, color: departments.find(d => d.id === selectedDoctor.departmentId)?.color }}>
                  {selectedDoctor.specialty}
                </span>
                <div className={styles.modalMeta}>
                  <span>⭐ {selectedDoctor.rating} ({selectedDoctor.reviews} reviews)</span>
                  <span>🏥 {selectedDoctor.experience}+ years experience</span>
                  <span>🗣️ {selectedDoctor.languages.join(', ')}</span>
                </div>
              </div>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalSection}>
                <h4>About</h4>
                <p>{selectedDoctor.bio}</p>
              </div>

              <div className={styles.modalSection}>
                <h4>Education & Training</h4>
                <ul>
                  {selectedDoctor.education.map((e, i) => <li key={i}>🎓 {e}</li>)}
                </ul>
              </div>

              <div className={styles.modalSection}>
                <h4>Achievements</h4>
                <ul>
                  {selectedDoctor.achievements.map((a, i) => <li key={i}>🏆 {a}</li>)}
                </ul>
              </div>

              <div className={styles.modalSection}>
                <h4>OPD Schedule</h4>
                <div className={styles.opdTable}>
                  <div><strong>Days:</strong> {selectedDoctor.opdDays}</div>
                  <div><strong>Timing:</strong> {selectedDoctor.opdTime}</div>
                  <div><strong>Designation:</strong> {selectedDoctor.designation}</div>
                </div>
              </div>

              <Link href="/appointment" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}>
                📅 Book Appointment with {selectedDoctor.name.split(' ')[0]}. {selectedDoctor.name.split(' ').slice(-1)[0]}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Management Team */}
      <section className={styles.managementSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Leadership</span>
            <h2>Hospital Management</h2>
            <p>Dedicated leaders driving excellence in healthcare delivery and patient care.</p>
          </div>
          <div className={styles.mgmtGrid}>
            {[
              { name: 'Dr. Rajendra Prasad', role: 'Hospital Director', desc: 'Leading KR Memorial with a vision to make quality healthcare accessible to every household in Rajasthan.' },
              { name: 'Dr. Anand Verma', role: 'Medical Superintendent', desc: 'Overseeing clinical operations and ensuring highest standards of patient care and safety.' },
              { name: 'Mrs. Sunita Mathur', role: 'Chief Nursing Officer', desc: 'Leading 200+ nursing team with dedication to compassionate patient care and clinical excellence.' },
              { name: 'Mr. Vijay Pratap', role: 'Admin Head', desc: 'Ensuring smooth hospital operations, infrastructure, and patient support services.' },
            ].map((m, i) => (
              <div key={i} className={styles.mgmtCard}>
                <div className={styles.mgmtAvatar}>
                  <span style={{ fontSize: '40px' }}>{i < 2 ? '👨‍💼' : i === 2 ? '👩‍💼' : '👨‍💼'}</span>
                </div>
                <h4>{m.name}</h4>
                <span className={styles.mgmtRole}>{m.role}</span>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
