'use client';
import { useState, useEffect } from 'react';
import styles from './admin.module.css';

export default function AdminPage() {
  const [token, setToken] = useState(null);
  
  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  // Dashboard State
  const [activeTab, setActiveTab] = useState('appointments'); // appointments, doctors
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dateFilter, setDateFilter] = useState('');
  
  // Doctor form state
  const [docForm, setDocForm] = useState({
    name: '', departmentId: '', specialty: '', qualification: '', experience: '',
    designation: 'Senior Consultant', opdDays: 'Mon-Sat', opdTime: '09:00 AM - 05:00 PM', bio: ''
  });
  const [docImage, setDocImage] = useState(null);
  const [docAdding, setDocAdding] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('kr_admin_token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      if (activeTab === 'appointments') {
        fetchAppointments();
      } else if (activeTab === 'doctors') {
        fetchDoctors();
      }
    }
  }, [token, activeTab, page, dateFilter]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');
    try {
      const res = await fetch(`${API_URL}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setOtpSent(true);
      } else {
        setLoginError(data.message || 'Error sending OTP');
      }
    } catch (err) {
      setLoginError('Server error, please try again.');
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');
    try {
      const res = await fetch(`${API_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, otp }),
      });
      const data = await res.json();
      if (data.success) {
        setToken(data.token);
        localStorage.setItem('kr_admin_token', data.token);
      } else {
        setLoginError(data.message || 'Invalid Credentials or OTP');
      }
    } catch (err) {
      setLoginError('Server error, please try again.');
    }
    setLoading(false);
  };

  const fetchAppointments = async () => {
    try {
      let url = `${API_URL}/appointments?page=${page}&limit=10`;
      if (dateFilter) url += `&date=${dateFilter}`;
      
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setAppointments(data.data);
        setTotalPages(data.totalPages || 1);
      } else if (res.status === 401) {
        handleLogout();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await fetch(`${API_URL}/doctors`);
      const data = await res.json();
      if (data.success) setDoctors(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await fetch(`${API_URL}/appointments/${id}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ status })
      });
      fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    setDocAdding(true);
    const formData = new FormData();
    Object.keys(docForm).forEach(key => formData.append(key, docForm[key]));
    if (docImage) formData.append('image', docImage);

    try {
      const res = await fetch(`${API_URL}/doctors`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        alert('Doctor added successfully!');
        setDocForm({ name: '', departmentId: '', specialty: '', qualification: '', experience: '', designation: 'Senior Consultant', opdDays: 'Mon-Sat', opdTime: '09:00 AM - 05:00 PM', bio: '' });
        setDocImage(null);
        fetchDoctors();
      } else {
        alert(data.message || 'Error adding doctor');
      }
    } catch (err) {
      alert('Network Error');
    }
    setDocAdding(false);
  };

  const handleDeleteDoctor = async (id) => {
    if (!confirm('Are you sure you want to delete this doctor?')) return;
    try {
      await fetch(`${API_URL}/doctors/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchDoctors();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('kr_admin_token');
    setToken(null);
    setOtpSent(false);
    setOtp('');
    setPassword('');
  };

  if (!token) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <h2>Admin Portal</h2>
          <p>Secure Two-Step Verification Required</p>
          {loginError && <p className={styles.error}>{loginError}</p>}
          
          {!otpSent ? (
            <form onSubmit={handleSendOtp}>
              <div className={styles.formGroup}>
                <label>Admin Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <button type="submit" disabled={loading} className="btn btn-primary" style={{width: '100%', marginTop: '1rem'}}>
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <div className={styles.formGroup}>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className={styles.formGroup}>
                <label>OTP (Check Email)</label>
                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required placeholder="6-digit OTP" />
              </div>
              <button type="submit" disabled={loading} className="btn btn-primary" style={{width: '100%', marginTop: '1rem'}}>
                {loading ? 'Verifying...' : 'Login securely'}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminLayout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.brand}>KRM Admin</div>
        <nav className={styles.nav}>
          <button className={activeTab === 'appointments' ? styles.activeTab : ''} onClick={() => setActiveTab('appointments')}>📅 Appointments</button>
          <button className={activeTab === 'doctors' ? styles.activeTab : ''} onClick={() => setActiveTab('doctors')}>👨‍⚕️ Doctors</button>
        </nav>
        <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {activeTab === 'appointments' && (
          <div>
            <div className={styles.headerFlex}>
              <h2>Latest Appointments</h2>
              <div className={styles.filterBox}>
                <label>Date Filter:</label>
                <input type="date" value={dateFilter} onChange={(e) => { setDateFilter(e.target.value); setPage(1); }} />
                {dateFilter && <button onClick={() => setDateFilter('')} className="btn btn-sm btn-outline">Clear</button>}
              </div>
            </div>

            <div className={styles.tableResp}>
              <table className={styles.adminTable}>
                <thead>
                  <tr>
                    <th>Date / Time</th>
                    <th>Patient</th>
                    <th>Status</th>
                    <th>Dept / Doctor</th>
                    <th>Contact</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.length === 0 && <tr><td colSpan="6" style={{textAlign: 'center', padding: '2rem'}}>No appointments found</td></tr>}
                  {appointments.map(app => (
                    <tr key={app._id}>
                      <td>{app.date}<br/><small>{app.time}</small></td>
                      <td><strong>{app.name}</strong><br/><small>{app.age} Y / {app.gender}</small></td>
                      <td>
                        <select 
                          value={app.status} 
                          onChange={(e) => updateStatus(app._id, e.target.value)}
                          className={`${styles.statusBadge} ${styles[app.status]}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>{app.departmentName}<br/><small>{app.doctorName}</small></td>
                      <td>{app.phone}<br/><small>{app.email}</small></td>
                      <td>
                        <button className="btn btn-sm btn-outline" onClick={() => alert(app.reason || 'No reason specified')}>Note</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button disabled={page === 1} onClick={() => setPage(page-1)}>Prev</button>
                <span>Page {page} of {totalPages}</span>
                <button disabled={page === totalPages} onClick={() => setPage(page+1)}>Next</button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'doctors' && (
          <div>
            <h2>Manage Doctors</h2>
            
            <div className={styles.addDoctorCard}>
              <h3>Add New Doctor</h3>
              <form onSubmit={handleAddDoctor} className={styles.docForm}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}><label>Name</label><input type="text" value={docForm.name} onChange={e => setDocForm({...docForm, name: e.target.value})} required/></div>
                  <div className={styles.formGroup}><label>Department ID (e.g. cardiology)</label><input type="text" value={docForm.departmentId} onChange={e => setDocForm({...docForm, departmentId: e.target.value})} required/></div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}><label>Specialty</label><input type="text" value={docForm.specialty} onChange={e => setDocForm({...docForm, specialty: e.target.value})} required/></div>
                  <div className={styles.formGroup}><label>Qualification</label><input type="text" value={docForm.qualification} onChange={e => setDocForm({...docForm, qualification: e.target.value})} required/></div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}><label>Experience (Years)</label><input type="number" value={docForm.experience} onChange={e => setDocForm({...docForm, experience: e.target.value})} required/></div>
                  <div className={styles.formGroup}><label>Languages (comma separated)</label><input type="text" value={docForm.languages} onChange={e => setDocForm({...docForm, languages: e.target.value})}/></div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}><label>OPD Days</label><input type="text" value={docForm.opdDays} onChange={e => setDocForm({...docForm, opdDays: e.target.value})}/></div>
                  <div className={styles.formGroup}><label>OPD Timing</label><input type="text" value={docForm.opdTime} onChange={e => setDocForm({...docForm, opdTime: e.target.value})}/></div>
                </div>
                <div className={styles.formGroup}>
                  <label>Doctor Photo</label>
                  <input type="file" accept="image/*" onChange={(e) => setDocImage(e.target.files[0])} required/>
                </div>
                <button type="submit" className="btn btn-primary" disabled={docAdding}>{docAdding ? 'Uploading & Saving...' : 'Add Doctor'}</button>
              </form>
            </div>

            <div className={styles.docList}>
              <h3>Current Doctors</h3>
              <div className={styles.docGrid}>
                {doctors.map(doc => (
                  <div key={doc._id} className={styles.docCard}>
                    <img src={doc.imageUrl} alt={doc.name} className={styles.docImg} />
                    <div className={styles.docInfo}>
                      <h4>{doc.name}</h4>
                      <p>{doc.specialty}</p>
                      <button onClick={() => handleDeleteDoctor(doc._id)} className="btn btn-sm btn-outline" style={{borderColor: 'red', color: 'red'}}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
