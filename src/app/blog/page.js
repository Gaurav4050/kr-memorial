'use client';
import { useState } from 'react';
import Link from 'next/link';
import { blogPosts, departments } from '@/data/hospital';
import styles from './blog.module.css';

export default function BlogPage() {
  const [category, setCategory] = useState('All');
  const categories = ['All', ...new Set(blogPosts.map(p => p.category))];
  const filtered = category === 'All' ? blogPosts : blogPosts.filter(p => p.category === category);
  const featured = blogPosts.filter(p => p.featured);

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-tag" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>Health Blog</span>
          <h1>Health Tips & Insights</h1>
          <p>Expert health articles written by our specialist doctors to keep you informed and healthy.</p>
        </div>
      </section>

      {/* Featured */}
      <section className={styles.featuredSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Featured Articles</h2>
          <div className={styles.featuredGrid}>
            {featured.map((post, i) => (
              <div key={post.id} className={`${styles.featuredCard} ${i === 0 ? styles.featuredLarge : ''}`}>
                <div className={styles.featuredImg} style={{ background: `hsl(${i * 80}, 40%, 88%)` }}>
                  <span style={{ fontSize: '48px' }}>📄</span>
                </div>
                <div className={styles.featuredContent}>
                  <span className={styles.catBadge}>{post.category}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className={styles.postMeta}>
                    <span>✍️ {post.author}</span>
                    <span>📅 {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span>⏱️ {post.readTime}</span>
                  </div>
                  <button className="btn btn-sm btn-outline">Read Article →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Articles */}
      <section className={styles.allSection}>
        <div className="container">
          <div className={styles.filterBar}>
            <h2 className={styles.sectionTitle}>All Articles</h2>
            <div className={styles.filterTabs}>
              {categories.map(cat => (
                <button key={cat} className={`${styles.tab} ${category === cat ? styles.tabActive : ''}`} onClick={() => setCategory(cat)}>{cat}</button>
              ))}
            </div>
          </div>

          <div className={styles.grid}>
            {filtered.map(post => (
              <div key={post.id} className={styles.card}>
                <div className={styles.cardImg} style={{ background: `hsl(${post.id?.length * 40 || 180}, 35%, 90%)` }}>
                  <span style={{ fontSize: '40px' }}>📄</span>
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.catBadge}>{post.category}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className={styles.postMeta}>
                    <span>✍️ {post.author}</span>
                    <span>⏱️ {post.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BMI Calculator */}
      <section className={styles.calcSection}>
        <div className="container">
          <div className={styles.calcCard}>
            <div className={styles.calcInfo}>
              <span className="section-tag">Health Tools</span>
              <h2>BMI Calculator</h2>
              <p>Check your Body Mass Index to understand if you&apos;re in a healthy weight range. A quick tool by KR Memorial Hospital doctors.</p>
              <BmiCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className={styles.ctaSection}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Subscribe to Health Tips</h2>
          <p>Get weekly health tips, seasonal advice, and hospital updates delivered to your inbox.</p>
          <form className={styles.newsletter} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email address" />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}

function BmiCalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const bmi = height && weight ? (weight / ((height / 100) ** 2)).toFixed(1) : null;
  const getCategory = (bmi) => {
    if (bmi < 18.5) return { text: 'Underweight', color: '#F59E0B' };
    if (bmi < 25) return { text: 'Normal', color: '#10B981' };
    if (bmi < 30) return { text: 'Overweight', color: '#F59E0B' };
    return { text: 'Obese', color: '#DC2626' };
  };

  return (
    <div className={styles.bmiForm}>
      <div className={styles.bmiInputs}>
        <input type="number" placeholder="Height (cm)" value={height} onChange={e => setHeight(e.target.value)} min="50" max="250" />
        <input type="number" placeholder="Weight (kg)" value={weight} onChange={e => setWeight(e.target.value)} min="10" max="300" />
      </div>
      {bmi && (
        <div className={styles.bmiResult} style={{ borderColor: getCategory(bmi).color }}>
          <span className={styles.bmiValue} style={{ color: getCategory(bmi).color }}>{bmi}</span>
          <span className={styles.bmiCategory} style={{ color: getCategory(bmi).color }}>{getCategory(bmi).text}</span>
        </div>
      )}
    </div>
  );
}
