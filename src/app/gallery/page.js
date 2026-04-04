'use client';
import { useState } from 'react';
import Image from 'next/image';
import { galleryImages } from '@/data/hospital';
import styles from './gallery.module.css';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const categories = ['All', ...new Set(galleryImages.map(img => img.category))];
  const filtered = activeCategory === 'All' ? galleryImages : galleryImages.filter(img => img.category === activeCategory);

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-tag" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>Hospital Gallery</span>
          <h1>A Glimpse into KR Memorial</h1>
          <p>Explore our state-of-the-art infrastructure, advanced equipment, and the spaces where healing happens every day.</p>
        </div>
      </section>

      <section className={styles.gallerySection}>
        <div className="container">
          <div className={styles.filterTabs}>
            {categories.map(cat => (
              <button key={cat} className={`${styles.tab} ${activeCategory === cat ? styles.tabActive : ''}`} onClick={() => setActiveCategory(cat)}>
                {cat} {cat !== 'All' && `(${galleryImages.filter(i => i.category === cat).length})`}
              </button>
            ))}
          </div>

          <div className={styles.grid}>
            {filtered.map((img, i) => (
              <div key={img.id} className={styles.card} style={{ '--delay': `${i * 0.05}s` }} onClick={() => setLightbox(img)}>
                <div className={styles.imgContainer}>
                  <Image 
                    src={img.src} 
                    alt={img.title}
                    fill
                    className={styles.imgTag}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={i < 2}
                  />
                </div>
                <div className={styles.cardOverlay}>
                  <span className={styles.catTag}>{img.category}</span>
                  <h4>{img.title}</h4>
                  <p>{img.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Gallery */}
      {/* <section className={styles.videoSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Videos</span>
            <h2>Video Gallery</h2>
            <p>Watch hospital tours, doctor introductions, and patient stories.</p>
          </div>
          <div className={styles.videoGrid}>
            {['Hospital Tour', 'Meet Our Doctors', 'Patient Testimonials', 'Health Camp Highlights'].map((title, i) => (
              <div key={i} className={styles.videoCard}>
                <div className={styles.videoThumb}>
                  <span className={styles.playBtn}>▶</span>
                </div>
                <h4>{title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Virtual Tour CTA */}
      {/* <section className={styles.tourCta}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '56px', display: 'block', marginBottom: '16px' }}>🏥</span>
          <h2>Virtual 360° Tour</h2>
          <p>Take a virtual walk through K.R. Memorial Hospital from the comfort of your home.</p>
          <button className="btn btn-primary btn-lg">🔗 Launch Virtual Tour</button>
        </div>
      </section> */}

      {/* Lightbox */}
      {lightbox && (
        <div className={styles.lightboxOverlay} onClick={() => setLightbox(null)}>
          <div className={styles.lightbox} onClick={e => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setLightbox(null)}>✕</button>
            <div className={styles.lightboxImgContainer}>
              <Image 
                src={lightbox.src} 
                alt={lightbox.title}
                fill
                className={styles.lightboxImage}
                sizes="90vw"
                priority
              />
            </div>
            <div className={styles.lightboxInfo}>
              <span className={styles.catTag}>{lightbox.category}</span>
              <h3>{lightbox.title}</h3>
              <p>{lightbox.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
