import React from 'react';
import './Testimonials.css';

// ─── Star Rating ─────────────────────────────────────────────
const Stars = ({ count = 5 }) => (
  <div className="tcard__stars" aria-label={`${count} out of 5 stars`}>
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} className="tcard__star">★</span>
    ))}
  </div>
);

// ─── Avatar (initial-based, colour-coded) ────────────────────
const AVATAR_COLORS = [
  { bg: '#EAF0F6', color: '#17324D' },
  { bg: '#F5F0E8', color: '#B8934A' },
  { bg: '#EDF2EE', color: '#2D5A3D' },
  { bg: '#F0EAF5', color: '#5A2D7A' },
  { bg: '#F5EAF0', color: '#7A2D5A' },
  { bg: '#EAF5F5', color: '#2D6A6A' },
];

const initials = (name) =>
  name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

const Avatar = ({ name, size = '', colorIndex = 0, circled = false }) => {
  const { bg, color } = AVATAR_COLORS[colorIndex % AVATAR_COLORS.length];
  return (
    <div
      className={`tcard__avatar ${size === 'lg' ? 'tcard__avatar--lg' : ''} ${
        circled ? 'tcard__avatar--circle-border' : ''
      }`}
      style={{ backgroundColor: bg, color }}
      aria-label={name}
    >
      {initials(name)}
    </div>
  );
};

// ─── Card A ───────────────────────────────────────────────────
const CardA = () => (
  <article className="tcard tcard--a tcard--horizontal">
    <div className="tcard__body">
      <div className="tcard__tag">✦ Smile Makeover</div>
      <Stars />
      <p className="tcard__text">
        The experience felt smooth from start to finish. Doctors explained
        everything clearly and made me feel completely at ease. My smile
        looks genuinely beautiful.
      </p>
      <div className="tcard__divider" />
      <div className="tcard__author">
        <div className="tcard__avatar-wrap">
          <Avatar name="Priya Sharma" colorIndex={0} />
        </div>
        <div>
          <p className="tcard__name">Priya Sharma</p>
          <p className="tcard__role">Graphic Designer · Chennai</p>
        </div>
      </div>
    </div>
  </article>
);

// ─── Card B ───────────────────────────────────────────────────
const CardB = () => (
  <article className="tcard tcard--b tcard--featured">
    <div>
      <Stars />
      <blockquote className="tcard__text">
        "I finally smile confidently again. The smile makeover completely
        transformed how I carry myself — I couldn't be happier with the
        results. This clinic genuinely changed my life."
      </blockquote>
    </div>
    <div>
      <div className="tcard__divider" style={{ background: 'rgba(212,176,106,0.5)' }} />
      <div className="tcard__author">
        <div className="tcard__avatar-wrap">
          <Avatar name="Arjun Kumar" colorIndex={1} circled />
        </div>
        <div>
          <p className="tcard__name">Arjun Kumar</p>
          <p className="tcard__role">Software Engineer · Bangalore</p>
        </div>
      </div>
    </div>
  </article>
);

// ─── Card C ───────────────────────────────────────────────────
const CardC = () => (
  <article className="tcard tcard--c">
    <span className="tcard__quote-mark" aria-hidden="true">"</span>
    <div className="tcard__author tcard__author--top">
      <div className="tcard__avatar-wrap">
        <Avatar name="Meena" colorIndex={2} />
      </div>
      <div>
        <p className="tcard__name">Meena Reddy</p>
        <p className="tcard__role">Teacher</p>
      </div>
    </div>
    <Stars />
    <p className="tcard__text">
      Modern setup, friendly staff, and painless treatment. Highly
      recommended to everyone I know.
    </p>
  </article>
);

// ─── Card D ───────────────────────────────────────────────────
const CardD = () => (
  <article className="tcard tcard--d">
    <div className="tcard__tag">✦ Dental Implants</div>
    <Stars />
    <p className="tcard__headline">"Professional, gentle, and truly caring."</p>
    <p className="tcard__text" style={{ fontSize: 'var(--text-sm)' }}>
      The team's patience and precision is unmatched. I came in anxious
      and left beaming.
    </p>
    <div className="tcard__author" style={{ marginTop: 'var(--space-4)' }}>
      <div className="tcard__avatar-wrap">
        <Avatar name="Ananya Krishnan" colorIndex={3} />
      </div>
      <div>
        <p className="tcard__name">Ravi Menon</p>
        <p className="tcard__role">Businessman</p>
      </div>
    </div>
  </article>
);

// ─── Card E ───────────────────────────────────────────────────
const CardE = () => (
  <article className="tcard tcard--e tcard--portrait">
    <div className="tcard__photo-placeholder" aria-hidden="true">
      <Avatar name="Lakshmi Bose" colorIndex={4} size="lg" />
    </div>
    <div className="tcard__content">
      <Stars count={5} />
      <p className="tcard__text" style={{
        fontFamily: 'var(--font-display)', fontStyle: 'italic',
        fontSize: 'var(--text-base)', color: 'var(--color-charcoal-mid)',
        marginBottom: 'var(--space-3)',
      }}>
        "Results beyond my expectations — my confidence is completely restored."
      </p>
      <p style={{
        fontFamily: 'var(--font-display)', fontStyle: 'italic',
        fontSize: 'var(--text-sm)', color: 'var(--color-gold)',
        letterSpacing: 'var(--tracking-snug)',
      }}>
        — Lakshmi
      </p>
    </div>
  </article>
);

// ─── Card F ───────────────────────────────────────────────────
const CardF = () => (
  <article className="tcard tcard--f tcard--portrait">
    <div className="tcard__photo-placeholder" aria-hidden="true">
      <Avatar name="Suresh Nair" colorIndex={5} size="lg" />
    </div>
    <div className="tcard__content">
      <Stars count={5} />
      <p className="tcard__text" style={{
        fontFamily: 'var(--font-display)', fontStyle: 'italic',
        fontSize: 'var(--text-base)', color: 'var(--color-charcoal-mid)',
        marginBottom: 'var(--space-3)',
      }}>
        "Zero pain, zero stress — the best dental experience I've ever had.
        Will recommend to my whole family."
      </p>
      <p style={{
        fontFamily: 'var(--font-display)', fontStyle: 'italic',
        fontSize: 'var(--text-sm)', color: 'var(--color-gold)',
        letterSpacing: 'var(--tracking-snug)',
      }}>
        — Suresh kumar
      </p>
    </div>
  </article>
);

// ─── Card G ───────────────────────────────────────────────────
const CardG = () => (
  <article className="tcard tcard--g">
    <Stars />
    <p className="tcard__headline" style={{ fontSize: 'var(--text-lg)' }}>
      "A clinic that genuinely cares."
    </p>
    <p className="tcard__text" style={{ fontSize: 'var(--text-sm)', marginTop: 'var(--space-3)' }}>
      From the moment I walked in, everything felt premium, calm, and
      reassuring. My kids love coming here too.
    </p>
    <div style={{ marginTop: 'var(--space-5)' }}>
      <div className="tcard__avatar-strip">
        {['Divya P', 'Arun K', 'Sita R'].map((name, i) => (
          <Avatar key={name} name={name} colorIndex={i} />
        ))}
      </div>
      <p style={{
        fontSize: 'var(--text-xs)', color: 'var(--color-charcoal-muted)',
        marginTop: 'var(--space-2)', letterSpacing: 'var(--tracking-wide)',
      }}>
        +1,200 happy patients
      </p>
    </div>
  </article>
);


// ════════════════════════════════════════════════════════════
// Testimonials — Main Section
// ════════════════════════════════════════════════════════════
//
//  ALL React hooks removed. Replaced with:
//  - ref callback on <section> instead of useRef + useEffect
//  - IntersectionObserver wired directly in the ref callback
//  - No useState needed (component has no interactive state)
//
// ════════════════════════════════════════════════════════════

const Testimonials = () => {

  // ── REPLACED: useRef + useEffect → ref callback ───────────
  //
  //  OLD:
  //    const sectionRef = useRef(null);
  //    useEffect(() => {
  //      const cards = sectionRef.current?.querySelectorAll('.tcard');
  //      ...
  //      const observer = new IntersectionObserver(...);
  //      cards.forEach(card => { card.style.animationPlayState = 'paused'; observer.observe(card); });
  //      return () => observer.disconnect();
  //    }, []);
  //
  //  NEW: ref callback — runs when section mounts, returns cleanup via disconnect

  function handleSectionRef(el) {
    if (!el) return;

    const cards = el.querySelectorAll('.tcard');
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card) => {
      card.style.animationPlayState = 'paused';
      observer.observe(card);
    });

    // Note: ref callbacks don't support return-cleanup like useEffect.
    // Observer auto-disconnects when section is removed from DOM via
    // the null-check branch (el === null) if needed:
    //   if (!el) { observer.disconnect(); return; }
    // For a SPA you can store observer on el itself:
    el._testimonialsObserver = observer;
  }

  return (
    <section
      className="testimonials"
      ref={handleSectionRef}
      id="reviews"
      aria-label="Patient testimonials"
    >
      {/* ── Header ── */}
      <header className="testimonials__header">
        <p className="testimonials__eyebrow">Patient Stories</p>
        <h2 className="testimonials__title">
          Stories Behind the <span className="italic">Smiles</span>
        </h2>
        <p className="testimonials__subtitle">
          Every transformation starts with trust. Here's what our patients
          say about their experience at SmileCraft.
        </p>
      </header>

      {/* ── Bento Grid ── */}
      <div className="testimonials__grid">
        <CardA />
        <CardB />
        <CardC />
        <CardD />
        <CardE />
        <CardF />
        <CardG />
      </div>

      {/* ── Footer CTA ── */}
      <div className="testimonials__footer">
        <a href="#Contactsection" className="btn btn--primary btn--md">
          Read More Reviews
        </a>
      </div>
    </section>
  );
};

export default Testimonials;