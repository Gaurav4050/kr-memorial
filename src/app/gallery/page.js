'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { galleryImages } from '@/data/hospital';
import styles from './gallery.module.css';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox]   = useState(null);
  const [lbIndex, setLbIndex]     = useState(0);
  const gridRef = useRef(null);

  const categories = ['All', ...new Set(galleryImages.map(img => img.category))];
  const filtered   = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (img, idx) => { setLightbox(img); setLbIndex(idx); };
  const prevImg = () => {
    const idx = (lbIndex - 1 + filtered.length) % filtered.length;
    setLbIndex(idx); setLightbox(filtered[idx]);
  };
  const nextImg = () => {
    const idx = (lbIndex + 1) % filtered.length;
    setLbIndex(idx); setLightbox(filtered[idx]);
  };

  const catColors = {
    'Infrastructure': '#0B3D91',
    'OT Complex':     '#DC2626',
    'ICU':            '#D97706',
    'Equipment':      '#10B981',
    'Team':           '#8B5CF6',
    'Events':         '#F59E0B',
    'All':            '#0B3D91',
  };

  return (
    <>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOrb1} />
        <div className={styles.heroOrb2} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className={styles.heroTag}>📷 Hospital Gallery</span>
          <h1 className={styles.heroH1}>
            A Visual Journey Through<br /><em>K.R. Memorial Hospital</em>
          </h1>
          <p className={styles.heroSub}>
            Explore our state-of-the-art infrastructure, cutting-edge equipment, and the healing spaces that serve thousands every day.
          </p>
          {/* Quick stats */}
          <div className={styles.heroStats}>
            {[
              { num: `${galleryImages.length}+`, label: 'Gallery Photos' },
              { num: categories.length - 1, label: 'Categories' },
              { num: '200+', label: 'Beds' },
              { num: '15', label: 'Super Specialties' },
            ].map((s, i) => (
              <div key={i} className={styles.heroStat}>
                <div className={styles.heroStatNum}>{s.num}</div>
                <div className={styles.heroStatLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTER TABS ── */}
      <section className={styles.filterSection}>
        <div className={styles.filterInner}>
          {categories.map(cat => {
            const count = cat === 'All' ? galleryImages.length : galleryImages.filter(i => i.category === cat).length;
            const color = catColors[cat] || '#0B3D91';
            return (
              <button
                key={cat}
                className={`${styles.filterTab} ${activeCategory === cat ? styles.filterTabActive : ''}`}
                style={activeCategory === cat ? { background: color, borderColor: color } : {}}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
                <span className={styles.filterCount} style={activeCategory === cat ? { background: 'rgba(255,255,255,0.25)' } : { background: `${color}18`, color }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── MASONRY GRID ── */}
      <section className={styles.gallerySection}>
        <div className="container">
          <div className={styles.grid} ref={gridRef}>
            {filtered.map((img, i) => {
              const color = catColors[img.category] || '#0B3D91';
              const isFeatured = i % 7 === 0; // every 7th card is tall
              return (
                <div
                  key={img.id}
                  className={`${styles.card} ${isFeatured ? styles.cardFeatured : ''}`}
                  onClick={() => openLightbox(img, i)}
                  style={{ '--delay': `${(i % 12) * 0.04}s` }}
                >
                  <div className={styles.imgWrap}>
                    <Image
                      src={img.src}
                      alt={img.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={styles.img}
                      priority={i < 3}
                    />
                  </div>

                  {/* Hover overlay */}
                  <div className={styles.overlay}>
                    <div className={styles.overlayContent}>
                      <span className={styles.overlayCat} style={{ background: color }}>
                        {img.category}
                      </span>
                      <h4 className={styles.overlayTitle}>{img.title}</h4>
                      <p className={styles.overlayDesc}>{img.description}</p>
                      <span className={styles.overlayZoom}>🔍 View Full</span>
                    </div>
                  </div>

                  {/* Always-visible category pill */}
                  <span className={styles.catPill} style={{ background: color }}>
                    {img.category}
                  </span>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className={styles.empty}>
              <span>📷</span>
              <h3>No images in this category</h3>
            </div>
          )}
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div className={styles.lbOverlay} onClick={() => setLightbox(null)}>
          <button className={styles.lbClose} onClick={() => setLightbox(null)}>✕</button>

          {/* Prev / Next */}
          <button className={`${styles.lbNav} ${styles.lbPrev}`} onClick={e => { e.stopPropagation(); prevImg(); }}>‹</button>
          <button className={`${styles.lbNav} ${styles.lbNext}`} onClick={e => { e.stopPropagation(); nextImg(); }}>›</button>

          <div className={styles.lbBox} onClick={e => e.stopPropagation()}>
            <div className={styles.lbImgWrap}>
              <Image
                src={lightbox.src}
                alt={lightbox.title}
                fill
                sizes="90vw"
                className={styles.lbImg}
                priority
              />
            </div>
            <div className={styles.lbInfo}>
              <span className={styles.lbCat}>{lightbox.category}</span>
              <h3 className={styles.lbTitle}>{lightbox.title}</h3>
              <p className={styles.lbDesc}>{lightbox.description}</p>
              <div className={styles.lbCounter}>{lbIndex + 1} / {filtered.length}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
