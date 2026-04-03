'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { doctors as staticDoctors, departments } from '@/data/hospital';
import styles from './doctors.module.css';

export default function DoctorsPage() {
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctors, setDoctors] = useState([...staticDoctors].reverse());

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetch(`${API_URL}/doctors`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.length > 0) {
          setDoctors([...data.data].reverse());
        }
      })
      .catch(console.error);
  }, [API_URL]);

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
                <div key={doc._id || doc.id} className={styles.card} id={doc._id || doc.id}>
                  <div className={styles.cardImg}>
                    {doc.imageUrl ? (
                      <img src={doc.imageUrl} alt={doc.name} style={{ width: '100%', height: '100%', objectFit: 'cover',
                        objectPosition:'top center'
                       }} />
                    ) : (
                      <div className={styles.imgPlaceholder} style={{ background: `linear-gradient(135deg, ${dept?.color || '#0B3D91'}22, ${dept?.color || '#0B3D91'}08)` }}>
                        <span style={{ fontSize: '56px' }}>👨‍⚕️</span>
                      </div>
                    )}
                    <span className={styles.expBadge}>{doc.experience}+ yrs exp</span>
                  </div>
                  <div className={styles.cardBody}>
                    <h3>{doc.name}</h3>
                    <p className={styles.qual}>{doc.qualification}</p>
                    {doc.designation && <p className={styles.designation}>{doc.designation}</p>}
                    <span className={styles.specialtyPill} style={{ background: `${dept?.color || '#0B3D91'}15`, color: dept?.color || '#0B3D91', borderColor: `${dept?.color}30` }}>
                      {dept?.icon} {doc.specialty}
                    </span>
                    <div className={styles.opdInfo}>
                      <span>🕐 OPD: {doc.opdDays}</span>
                      <span>📍 {doc.opdTime}</span>
                    </div>
                    {doc.languages && doc.languages.length > 0 && (
                      <div className={styles.languages}>
                        🗣️ {doc.languages.join(', ')}
                      </div>
                    )}
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
                {selectedDoctor.imageUrl ? (
                  <img src={selectedDoctor.imageUrl} alt={selectedDoctor.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '64px' }}>👨‍⚕️</span>
                )}
              </div>
              <div className={styles.modalInfo}>
                <h2>{selectedDoctor.name}</h2>
                <p className={styles.modalQual}>{selectedDoctor.qualification}</p>
                {selectedDoctor.designation && <p className={styles.modalDes}>{selectedDoctor.designation}</p>}
                <span className={styles.specialtyPill} style={{ background: `${departments.find(d => d.id === selectedDoctor.departmentId)?.color || '#0B3D91'}15`, color: departments.find(d => d.id === selectedDoctor.departmentId)?.color }}>
                  {selectedDoctor.specialty}
                </span>
                <div className={styles.modalMeta}>
                  <span>🏥 {selectedDoctor.experience}+ years experience</span>
                  {selectedDoctor.languages && selectedDoctor.languages.length > 0 && (
                    <span>🗣️ {selectedDoctor.languages.join(', ')}</span>
                  )}
                  <span>🕐 {selectedDoctor.opdDays} | {selectedDoctor.opdTime}</span>
                </div>
              </div>
            </div>

            <div className={styles.modalBody}>
              {selectedDoctor.bio && (
                <div className={styles.modalSection}>
                  <h4>About</h4>
                  <p>{selectedDoctor.bio}</p>
                </div>
              )}

              <div className={styles.modalSection}>
                <h4>Availability</h4>
                <ul>
                  <li>📅 OPD Days: {selectedDoctor.opdDays}</li>
                  <li>⏰ OPD Time: {selectedDoctor.opdTime}</li>
                  <li>📞 Experience: {selectedDoctor.experience}+ years</li>
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
      {/* <section className={styles.managementSection}>
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
      </section> */}
    </>
  );
}
