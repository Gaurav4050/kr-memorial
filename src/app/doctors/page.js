'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { doctors as staticDoctors, departments } from '@/data/hospital';
import styles from './doctors.module.css';

const deptColor = (doc) => departments.find(d => d.id === doc.departmentId)?.color || '#0B3D91';
const deptIcon = (doc) => departments.find(d => d.id === doc.departmentId)?.icon || '🏥';

export default function DoctorsPage() {
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [selected, setSelected] = useState(null);
  const [doctors, setDoctors] = useState([...staticDoctors].reverse());
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetch(`${API_URL}/doctors`)
      .then(r => r.json())
      .then(d => { if (d.success && d.data.length > 0) setDoctors([...d.data].reverse()); })
      .catch(console.error);
  }, [API_URL]);

  const filtered = doctors.filter(doc => {
    const q = search.toLowerCase();
    return (doc.name.toLowerCase().includes(q) || doc.specialty.toLowerCase().includes(q))
      && (!specialty || doc.departmentId === specialty);
  });

  return (
    <>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOrb1} /><div className={styles.heroOrb2} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className={styles.heroTag}>Our Medical Team</span>
          <h1 className={styles.heroH1}>Meet Our <em>Expert Doctors</em></h1>
          <p className={styles.heroSub}>
            50+ experienced specialists across 15 super-specialty departments — your trusted partners in health.
          </p>
          <div className={styles.heroStats}>
            {[
              { num: '50+', label: 'Doctors' },
              { num: '15', label: 'Super Specialties' },
              { num: '150K+', label: 'Patients Treated' },
              { num: '15+', label: 'Avg Experience' },
            ].map((s, i) => (
              <div key={i} className={styles.heroStat}>
                <div className={styles.heroStatNum}>{s.num}</div>
                <div className={styles.heroStatLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <section className={styles.filterSection}>
        <div className={styles.filterCard}>
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search doctor name or specialty…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className={styles.clearBtn} onClick={() => setSearch('')}>✕</button>
            )}
          </div>
          <div className={styles.deptPillsWrap}>
            <button
              className={`${styles.deptPill} ${!specialty ? styles.deptPillActive : ''}`}
              onClick={() => setSpecialty('')}
            >All</button>
            {departments.map(d => (
              <button
                key={d.id}
                className={`${styles.deptPill} ${specialty === d.id ? styles.deptPillActive : ''}`}
                style={specialty === d.id ? { background: d.color, borderColor: d.color } : {}}
                onClick={() => setSpecialty(specialty === d.id ? '' : d.id)}
              >
                {d.icon} {d.name}
              </button>
            ))}
          </div>
          <div className={styles.resultBadge}>
            <span>{filtered.length}</span> doctor{filtered.length !== 1 ? 's' : ''} found
          </div>
        </div>
      </section>

      {/* ── DOCTORS GRID ── */}
      <section className={styles.gridSection}>
        <div className="container">
          {filtered.length === 0 ? (
            <div className={styles.noResults}>
              <span>🔍</span>
              <h3>No doctors found</h3>
              <p>Try a different search or clear the filter.</p>
              <button className="btn btn-outline" onClick={() => { setSearch(''); setSpecialty(''); }}>
                Reset Filters
              </button>
            </div>
          ) : (
            <div className={styles.grid}>
              {filtered.map(doc => {
                const color = deptColor(doc);
                const icon = deptIcon(doc);
                const dept = departments.find(d => d.id === doc.departmentId);
                return (
                  <article key={doc._id || doc.id} className={styles.card} id={doc._id || doc.id}>
                    {/* Photo */}
                    <div className={styles.cardPhoto} style={{ '--dc': color }}>
                      {doc.imageUrl ? (
                        <img src={doc.imageUrl} alt={doc.name} className={styles.cardPhotoImg} />
                      ) : (
                        <div className={styles.cardPhotoPlaceholder} style={{ background: `linear-gradient(135deg,${color}33,${color}11)` }}>
                          <span>👨‍⚕️</span>
                        </div>
                      )}
                      <div className={styles.cardPhotoGrad} style={{ background: `linear-gradient(0deg,${color}ee 0%,transparent 55%)` }} />
                      <span className={styles.cardSpecBadge} style={{ background: color }}>
                        {icon} {doc.specialty}
                      </span>
                    </div>

                    {/* Info */}
                    <div className={styles.cardBody}>
                      <h3 className={styles.cardName}>{doc.name}</h3>
                      <p className={styles.cardQual}>{doc.qualification}</p>

                      {(doc.opdDays || doc.opdTime) && (
                        <div className={styles.cardOpd}>
                          <span>🗓</span>
                          <span>{doc.opdDays}</span>
                          {doc.opdTime && <><span className={styles.dot} /><span>🕐 {doc.opdTime}</span></>}
                        </div>
                      )}

                      {doc.languages?.length > 0 && (
                        <div className={styles.cardLangs}>
                          🗣️ {doc.languages.join(' · ')}
                        </div>
                      )}

                      <div className={styles.cardActions}>
                        <button
                          className={styles.profileBtn}
                          onClick={() => setSelected(doc)}
                        >
                          View Profile
                        </button>
                        <Link href="/appointment" className={styles.bookBtn} style={{ background: color }}>
                          Book Now
                        </Link>
                      </div>
                    </div>

                    {/* Color accent bar */}
                    <div className={styles.cardAccent} style={{ background: color }} />
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className={styles.statsStrip}>
        <div className="container">
          <div className={styles.statsRow}>
            {[
              { icon: '🏥', num: '15+', label: 'Departments' },
              { icon: '👨‍⚕️', num: '50+', label: 'Specialists' },
              { icon: '📅', num: '500+', label: 'Daily OPD Visits' },
            ].map((s, i) => (
              <div key={i} className={styles.statItem}>
                <span className={styles.statIcon}>{s.icon}</span>
                <div className={styles.statNum}>{s.num}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFILE MODAL ── */}
      {selected && (
        <div className={styles.modalOverlay} onClick={() => setSelected(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setSelected(null)}>✕</button>

            {/* Modal header with gradient */}
            <div className={styles.modalHdr} style={{ '--mc': deptColor(selected) }}>
              <div className={styles.modalImgWrap}>
                {selected.imageUrl ? (
                  <img src={selected.imageUrl} alt={selected.name} className={styles.modalImg} />
                ) : (
                  <div className={styles.modalImgPlaceholder}>👨‍⚕️</div>
                )}
              </div>
              <div className={styles.modalHdrInfo}>
                <span className={styles.modalSpecPill} style={{ background: deptColor(selected) }}>
                  {deptIcon(selected)} {selected.specialty}
                </span>
                <h2 className={styles.modalName}>{selected.name}</h2>
                <p className={styles.modalQual}>{selected.qualification}</p>
                <div className={styles.modalMetaRow}>
                  {selected.languages?.length > 0 && <span>🗣️ {selected.languages.join(', ')}</span>}
                </div>
              </div>
            </div>

            {/* Modal body */}
            <div className={styles.modalBody}>
              {selected.bio && (
                <div className={styles.modalSection}>
                  <h4>About Dr. {selected.name.split(' ').pop()}</h4>
                  <p>{selected.bio}</p>
                </div>
              )}

              <div className={styles.modalScheduleGrid}>
                {[
                  { icon: '📅', label: 'OPD Days', value: selected.opdDays },
                  { icon: '🕐', label: 'OPD Time', value: selected.opdTime },
                ].filter(r => r.value).map((row, i) => (
                  <div key={i} className={styles.scheduleBox}>
                    <span className={styles.scheduleIcon}>{row.icon}</span>
                    <div>
                      <div className={styles.scheduleLabel}>{row.label}</div>
                      <div className={styles.scheduleValue}>{row.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/appointment"
                className="btn btn-primary btn-lg"
                style={{ width: '100%', justifyContent: 'center', marginTop: '20px', background: deptColor(selected) }}
              >
                📅 Book Appointment with {selected.name.split(' ')[0]}. {selected.name.split(' ').slice(-1)[0]}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
