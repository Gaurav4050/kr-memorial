'use client';
import { useState, useEffect } from 'react';
import { departments, doctors as staticDoctors } from '@/data/hospital';
import styles from './appointment.module.css';

export default function AppointmentPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ department: '', doctor: '', date: '', time: '', name: '', age: '', gender: '', phone: '', email: '', reason: '', isNewPatient: true });
  const [submitted, setSubmitted] = useState(false);
  const [doctors, setDoctors] = useState(staticDoctors);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const timeSlots = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'];

  useEffect(() => {
    fetch(`${API_URL}/doctors`)
      .then(res => res.json())
      .then(data => { if (data.success && data.data.length > 0) setDoctors(data.data) })
      .catch(console.error);
  }, []);

  const getDoctorId = (doc) => doc._id || doc.id;
  const findDoctorById = (id) => doctors.find(d => getDoctorId(d) === id);
  const getDepartmentName = (departmentId) => departments.find(d => d.id === departmentId)?.name;
  const formatDoctorOption = (doc) => {
    const dept = getDepartmentName(doc.departmentId);
    const deptText = dept ? ` • ${dept}` : '';
    return `${doc.name} — ${doc.qualification} ${doc.designation ? `(${doc.designation})` : ''}${deptText}`;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const selectedDoc = findDoctorById(form.doctor);
      const departmentId = selectedDoc?.departmentId || form.department;
      const selectedDept = departments.find(d => d.id === departmentId);
      
      const payload = {
        ...form,
        department: departmentId,
        departmentName: selectedDept?.name,
        doctorId: form.doctor,
        doctorName: selectedDoc?.name || 'Any Available',
      };

      const res = await fetch(`${API_URL}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setForm({ ...form, appointmentId: data.data.appointmentId, department: departmentId });
        setSubmitted(true);
      } else {
        alert(data.message || 'Failed to book appointment');
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert('Error booking appointment. Please try again or call us.');
      setLoading(false);
    }
  };

  const getMinDate = () => { const d = new Date(); return d.toISOString().split('T')[0]; };

  if (submitted) {
    const apptId = form.appointmentId || 'KRM' + Date.now().toString().slice(-6);
    return (
      <section className={styles.successPage}>
        <div className={styles.successCard}>
          <span className={styles.successIcon}>✅</span>
          <h1>Appointment Booked!</h1>
          <p>Your appointment has been successfully scheduled.</p>
          <div className={styles.successDetails}>
            <div className={styles.detailRow}><span>Appointment ID:</span><strong>{apptId}</strong></div>
            <div className={styles.detailRow}><span>Patient:</span><strong>{form.name}</strong></div>
            {form.department && <div className={styles.detailRow}><span>Department:</span><strong>{getDepartmentName(form.department)}</strong></div>}
            <div className={styles.detailRow}><span>Doctor:</span><strong>{form.doctor ? findDoctorById(form.doctor)?.name : 'Any Available'}</strong></div>
            <div className={styles.detailRow}><span>Date:</span><strong>{form.date}</strong></div>
            <div className={styles.detailRow}><span>Time:</span><strong>{form.time}</strong></div>
          </div>
          <div className={styles.successActions}>
            <a href="tel:8006005111" className="btn btn-outline" title="Call: 8006005111 or 8006005105">📞 Confirm via Call</a>
            <button className="btn btn-primary" onClick={() => { setSubmitted(false); setStep(1); setForm({ department: '', doctor: '', date: '', time: '', name: '', age: '', gender: '', phone: '', email: '', reason: '', isNewPatient: true }); }}>📅 Book Another</button>
          </div>
          <div className={styles.whatToBring}>
            <h4>📋 What to Bring</h4>
            <ul>
              <li>Valid Photo ID (Aadhaar/Voter ID)</li>
              <li>Previous medical records & prescriptions</li>
              <li>Insurance card (if applicable)</li>
              <li>List of current medications</li>
            </ul>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-tag" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>Easy Booking</span>
          <h1>Book Your Appointment</h1>
          <p>Schedule your OPD appointment in just a few simple steps. We&apos;ll confirm your slot instantly.</p>
        </div>
      </section>

      <section className={styles.bookingSection}>
        <div className="container">
          {/* Progress Bar */}
          <div className={styles.progress}>
            {['Doctor & Schedule', 'Patient Details', 'Confirm'].map((label, i) => (
              <div key={i} className={`${styles.progressStep} ${step > i ? styles.completed : ''} ${step === i + 1 ? styles.active : ''}`}>
                <div className={styles.progressCircle}>{step > i + 1 ? '✓' : i + 1}</div>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className={styles.formCard}>
            {/* Step 1: Doctor & Schedule */}
            {step === 1 && (
              <div className={styles.stepContent}>
                <h2>Choose Doctor & Schedule</h2>
                <p>Select your preferred doctor (optional) and pick a date & time.</p>
                <div className={styles.formGroup}>
                  <label>Select Doctor (Optional)</label>
                  <select value={form.doctor} onChange={(e) => {
                    const doctorId = e.target.value;
                    const selectedDoc = findDoctorById(doctorId);
                    setForm({ ...form, doctor: doctorId, department: selectedDoc?.departmentId || '' });
                  }}>
                    <option value="">Any Available Doctor</option>
                    {doctors.map(doc => (
                      <option key={getDoctorId(doc)} value={getDoctorId(doc)}>
                        {formatDoctorOption(doc)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Select Date *</label>
                    <input type="date" min={getMinDate()} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Select Time Slot *</label>
                    <div className={styles.timeGrid}>
                      {timeSlots.map(slot => (
                        <button key={slot} type="button" className={`${styles.timeSlot} ${form.time === slot ? styles.timeSelected : ''}`} onClick={() => setForm({ ...form, time: slot })}>{slot}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles.stepBtns}>
                  <button className="btn btn-primary btn-lg" disabled={!form.date || !form.time} onClick={() => setStep(2)}>Continue →</button>
                </div>
              </div>
            )}

            {/* Step 2: Patient Details */}
            {step === 2 && (
              <div className={styles.stepContent}>
                <h2>Patient Details</h2>
                <p>Fill in the patient information for the appointment.</p>
                <div className={styles.patientToggle}>
                  <button className={`${styles.toggleBtn} ${form.isNewPatient ? styles.toggleActive : ''}`} onClick={() => setForm({ ...form, isNewPatient: true })}>New Patient</button>
                  <button className={`${styles.toggleBtn} ${!form.isNewPatient ? styles.toggleActive : ''}`} onClick={() => setForm({ ...form, isNewPatient: false })}>Existing Patient</button>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Full Name *</label>
                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Patient's full name" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Phone Number *</label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="10-digit Mobile Number" required />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Email Address</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@example.com (Optional)" />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Age *</label>
                    <input type="number" min="0" max="120" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} placeholder="Age in years" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Gender *</label>
                    <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} required>
                      <option value="">Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Reason for Visit</label>
                  <textarea rows="3" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} placeholder="Brief description of your symptoms or reason for consultation"></textarea>
                </div>
                <div className={styles.stepBtns}>
                  <button className="btn btn-outline" onClick={() => setStep(1)}>← Back</button>
                  <button className="btn btn-primary btn-lg" disabled={!form.name || !form.phone || !form.age || !form.gender} onClick={() => setStep(3)}>Continue →</button>
                </div>
              </div>
            )}

            {/* Step 3: Confirm */}
            {step === 3 && (
              <div className={styles.stepContent}>
                <h2>Confirm Appointment</h2>
                <p>Review your appointment details and confirm booking.</p>
                <div className={styles.summary}>
                  {form.department && <div className={styles.summaryRow}><span>Department:</span><strong>{getDepartmentName(form.department)}</strong></div>}
                  <div className={styles.summaryRow}><span>Doctor:</span><strong>{form.doctor ? findDoctorById(form.doctor)?.name : 'Any Available'}</strong></div>
                  <div className={styles.summaryRow}><span>Date:</span><strong>{form.date}</strong></div>
                  <div className={styles.summaryRow}><span>Time:</span><strong>{form.time}</strong></div>
                  <div className={styles.summaryRow}><span>Patient:</span><strong>{form.name}</strong></div>
                  <div className={styles.summaryRow}><span>Phone:</span><strong>{form.phone}</strong></div>
                  <div className={styles.summaryRow}><span>Age/Gender:</span><strong>{form.age} yrs / {form.gender}</strong></div>
                  {form.reason && <div className={styles.summaryRow}><span>Reason:</span><strong>{form.reason}</strong></div>}
                </div>
                <div className={styles.stepBtns}>
                  <button className="btn btn-outline" onClick={() => setStep(2)} disabled={loading}>← Back</button>
                  <button className="btn btn-primary btn-lg" onClick={handleSubmit} disabled={loading}>
                    {loading ? '⏳ Booking...' : '✅ Confirm Appointment'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
