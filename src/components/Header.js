'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { hospitalInfo, departments } from '@/data/hospital';
import styles from './Header.module.css';

const socialLinks = [
  { icon: 'f', label: 'Facebook', href: 'https://facebook.com/krmhofficial' },
  { icon: 'in', label: 'Instagram', href: 'https://instagram.com/krmhospital' },
  { icon: 'tw', label: 'Twitter', href: 'https://twitter.com/KRMHospital' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [deptOpen, setDeptOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close dropdown when clicking outside (desktop)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDeptOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close everything and navigate
  const closeAll = () => {
    setMobileOpen(false);
    setDeptOpen(false);
  };

  return (
    <>
      {/* EMERGENCY BAR */}
      <div className={styles.emergencyBar}>
        <span className={styles.emergencyContent}>
          <span className={styles.pulse}></span>
          <span>🚨 24/7 Emergency:</span>
          <a href="tel:8006005111">8006005111</a>
          <span className={styles.divider}>|</span>
          <a href="tel:01423220320">01423-220320</a>
        </span>
      </div>

      {/* NAVBAR */}
      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
        <div className={styles.navInner}>
          <Link href="/" className={styles.logo} onClick={closeAll}>
            <Image
              src="/logo.jpeg"
              alt="K.R. Memorial Hospital Logo"
              width={68}
              height={68}
              className={styles.logoImage}
              priority
            />
            <div className={styles.logoText}>
              <strong>K.R. Memorial Hospital</strong>
              <span>Jaipur, Rajasthan</span>
            </div>
          </Link>

          {/* Mobile Overlay — rendered BEFORE navLinks so navLinks sits on top */}
          {mobileOpen && <div className={styles.overlay} onClick={() => setMobileOpen(false)}></div>}

          <ul className={`${styles.navLinks} ${mobileOpen ? styles.navLinksOpen : ''}`}>
            <li><Link href="/" onClick={closeAll}>Home</Link></li>
            <li><Link href="/about" onClick={closeAll}>About Us</Link></li>

            {/* Departments dropdown */}
            <li className={styles.hasDropdown} ref={dropdownRef}>
              <button
                onClick={() => setDeptOpen(!deptOpen)}
                className={`${styles.dropBtn} ${deptOpen ? styles.dropBtnActive : ''}`}
              >
                Departments <span className={`${styles.arrow} ${deptOpen ? styles.arrowOpen : ''}`}>▾</span>
              </button>
              <div className={`${styles.dropdown} ${deptOpen ? styles.dropdownOpen : ''}`}>
                {departments.map(dept => (
                  <Link
                    key={dept.id}
                    href={`/departments/${dept.id}`}
                    onClick={closeAll}
                  >
                    <span>{dept.icon}</span> {dept.shortName}
                  </Link>
                ))}
                <Link
                  href="/departments"
                  className={styles.viewAll}
                  onClick={closeAll}
                >
                  View All Departments →
                </Link>
              </div>
            </li>

            <li><Link href="/doctors" onClick={closeAll}>Doctors</Link></li>
            <li><Link href="/gallery" onClick={closeAll}>Gallery</Link></li>
            <li><Link href="/empanelments" onClick={closeAll}>Empanelments</Link></li>
            <li><Link href="/contact" onClick={closeAll}>Contact Us</Link></li>
            {/* <li><Link href="/blog" onClick={closeAll}>Health Blog</Link></li> */}
            <li>
              <Link href="/appointment" className={styles.navCta} onClick={closeAll}>
                📅 Book Appointment
              </Link>
            </li>
          </ul>

          <button
            className={styles.hamburger}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.hamburgerOpen : ''}`}></span>
          </button>
        </div>
      </nav>
    </>
  );
}
