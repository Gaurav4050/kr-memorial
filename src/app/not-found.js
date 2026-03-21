import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found — K.R. Memorial Hospital',
};

export default function NotFound() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 24px',
      textAlign: 'center',
      background: '#F8FAFC',
    }}>
      <span style={{ fontSize: '80px', marginBottom: '16px' }}>🏥</span>
      <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '48px', fontWeight: '700', color: '#0B3D91', marginBottom: '12px' }}>404</h1>
      <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '24px', marginBottom: '12px', color: '#1E293B' }}>Page Not Found</h2>
      <p style={{ color: '#64748B', marginBottom: '32px', maxWidth: '400px', lineHeight: '1.6' }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Let us help you find what you need.
      </p>
      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" className="btn btn-primary">🏠 Go Home</Link>
        <Link href="/appointment" className="btn btn-outline">📅 Book Appointment</Link>
        <a href="tel:8006005111" className="btn btn-teal">📞 Call Us</a>
      </div>
    </div>
  );
}
