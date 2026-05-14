import { useState, useEffect, useRef } from "react";
import "./Choose.css";
const reasons = [
  {
    id: 1,
    icon: "🔬",
    eyebrow: "Technology",
    title: "Advanced Technology",
    body: "Smart digital tools for accurate and comfortable treatment. From 3D imaging to laser dentistry — precision at every step.",
    stat: "3D",
    statLabel: "Imaging",
    accent: "#17324D",
  },
  {
    id: 2,
    icon: "🤍",
    eyebrow: "Comfort",
    title: "Comfort-First Care",
    body: "Gentle dentistry designed to reduce fear and discomfort. We move at your pace, always.",
    stat: "0",
    statLabel: "Pain Promise",
    accent: "#D4B06A",
  },
  {
    id: 3,
    icon: "🎓",
    eyebrow: "Expertise",
    title: "Experienced Specialists",
    body: "Dedicated professionals with 15+ years of clinical excellence, focused on results that last a lifetime.",
    stat: "15+",
    statLabel: "Years",
    accent: "#17324D",
  },
  {
    id: 4,
    icon: "📋",
    eyebrow: "Honesty",
    title: "Transparent Approach",
    body: "Clear treatment plans with honest recommendations. No hidden costs. No unnecessary procedures. Ever.",
    stat: "100%",
    statLabel: "Honest",
    accent: "#D4B06A",
  },
  {
    id: 5,
    icon: "🛡️",
    eyebrow: "Safety",
    title: "Premium Hygiene Standards",
    body: "Safe, sterilized environments that exceed clinical standards — for your absolute peace of mind.",
    stat: "A+",
    statLabel: "Sterile",
    accent: "#17324D",
  },
  {
    id: 6,
    icon: "🗓️",
    eyebrow: "Flexibility",
    title: "Flexible Appointments",
    body: "Convenient scheduling for busy lifestyles. Evenings, weekends — we fit around you, not the other way.",
    stat: "6",
    statLabel: "Days Open",
    accent: "#D4B06A",
  },
];

function useIntersect(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FeatureCard({ item, index, active, onHover }) {
  const isGold = index % 2 !== 0;
  const delay = index * 80;
  const [ref, visible] = useIntersect(0.1);

  return (
    <div
      ref={ref}
      className={`why-card ${active === item.id ? "why-card--active" : ""} ${visible ? "why-card--visible" : ""}`}
      style={{ animationDelay: `${delay}ms`, "--card-delay": `${delay}ms` }}
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Gold line top accent */}
      <div className="why-card__line" />

      {/* Top row: icon + stat */}
      <div className="why-card__top">
        <span className="why-card__icon">{item.icon}</span>
        <div className="why-card__stat-wrap">
          <span className={`why-card__stat ${isGold ? "why-card__stat--gold" : ""}`}>{item.stat}</span>
          <span className="why-card__stat-label">{item.statLabel}</span>
        </div>
      </div>

      {/* Eyebrow */}
      <p className="why-card__eyebrow">{item.eyebrow}</p>

      {/* Title */}
      <h3 className="why-card__title">{item.title}</h3>

      {/* Body */}
      <p className="why-card__body">{item.body}</p>

      {/* Hover arrow */}
      <div className="why-card__arrow">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  const [activeCard, setActiveCard] = useState(null);
  const [headerRef, headerVisible] = useIntersect(0.2);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&display=swap');

        /* === Root Tokens (from variables.css) === */
        :root {
          --color-navy: #17324D;
          --color-navy-dark: #0F2236;
          --color-navy-mid: #1E3F5E;
          --color-navy-soft: rgba(23,50,77,0.08);
          --color-navy-border: rgba(23,50,77,0.20);
          --color-charcoal: #1F1F1F;
          --color-charcoal-mid: #4A4A4A;
          --color-charcoal-muted: #888888;
          --color-charcoal-border: rgba(31,31,31,0.10);
          --color-white: #FFFFFF;
          --color-ash: #F5F7FA;
          --color-ash-dark: #EAEEF3;
          --color-gold: #D4B06A;
          --color-gold-dark: #B8934A;
          --color-gold-light: rgba(212,176,106,0.15);
          --color-gold-border: rgba(212,176,106,0.40);
          --color-gold-glow: rgba(212,176,106,0.35);
          --color-gold-glow-hover: rgba(212,176,106,0.55);
          --font-display: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
          --font-body: 'DM Sans', 'Nunito', 'Helvetica Neue', sans-serif;
          --shadow-card: 0 2px 12px rgba(15,34,54,0.06), 0 1px 4px rgba(15,34,54,0.04);
          --shadow-card-hover: 0 16px 48px rgba(15,34,54,0.12), 0 4px 16px rgba(15,34,54,0.07);
          --shadow-navy: 0 4px 20px rgba(23,50,77,0.22), 0 2px 8px rgba(23,50,77,0.14);
          --ease-out: cubic-bezier(0.16,1,0.3,1);
          --ease-spring: cubic-bezier(0.34,1.56,0.64,1);
        }

        /* === Section wrapper === */
        .why-section {
          background: var(--color-ash);
          padding: 96px 0 112px;
          position: relative;
          overflow: hidden;
          font-family: var(--font-body);
        }

        /* Decorative background element */
        .why-section::before {
          content: '';
          position: absolute;
          top: -60px;
          right: -120px;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          border: 1px solid var(--color-navy-border);
          pointer-events: none;
          opacity: 0.4;
        }
        .why-section::after {
          content: '';
          position: absolute;
          bottom: -80px;
          left: -100px;
          width: 360px;
          height: 360px;
          border-radius: 50%;
          border: 1px solid var(--color-gold-border);
          pointer-events: none;
          opacity: 0.5;
        }

        .why-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(1.25rem, 4vw, 3rem);
        }

        /* === Header === */
        .why-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px 80px;
          align-items: end;
          margin-bottom: 72px;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out);
        }
        .why-header.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .why-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.20em;
          text-transform: uppercase;
          color: var(--color-navy);
          margin-bottom: 16px;
        }
        .why-eyebrow::before {
          content: '';
          display: block;
          width: 24px;
          height: 1px;
          background: var(--color-gold);
        }

        .why-heading {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 4vw, 3.2rem);
          font-weight: 600;
          color: var(--color-navy);
          line-height: 1.15;
          letter-spacing: -0.03em;
          margin: 0;
        }
        .why-heading em {
          font-style: italic;
          color: var(--color-gold);
        }

        .why-header-right {
          padding-bottom: 6px;
        }
        .why-subtext {
          font-size: 1.0625rem;
          color: var(--color-charcoal-mid);
          line-height: 1.8;
          max-width: 44ch;
          margin: 0 0 28px;
        }

        .why-cta-inline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--color-navy);
          color: #fff;
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0 28px;
          height: 52px;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          box-shadow: var(--shadow-navy);
          transition: background 0.25s var(--ease-out), box-shadow 0.25s var(--ease-out), transform 0.15s var(--ease-spring);
        }
        .why-cta-inline:hover {
          background: var(--color-navy-dark);
          box-shadow: 0 8px 32px rgba(23,50,77,0.30), 0 3px 12px rgba(23,50,77,0.18), 0 0 0 3px var(--color-gold-border);
          transform: translateY(-2px);
        }
        .why-cta-inline svg {
          transition: transform 0.25s var(--ease-spring);
        }
        .why-cta-inline:hover svg {
          transform: translateX(4px);
        }

        /* === Cards grid === */
        .why-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          position: relative;
          z-index: 1;
        }

        /* === Individual card === */
        .why-card {
          background: var(--color-white);
          border-radius: 24px;
          padding: 36px 32px 32px;
          border: 1px solid var(--color-charcoal-border);
          box-shadow: var(--shadow-card);
          cursor: default;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 0;
          opacity: 0;
          transform: translateY(32px);
          transition:
            opacity 0.6s var(--ease-out),
            transform 0.6s var(--ease-out),
            box-shadow 0.35s var(--ease-out),
            border-color 0.35s var(--ease-out);
        }
        .why-card.why-card--visible {
          opacity: 1;
          transform: translateY(0);
          transition-delay: var(--card-delay, 0ms);
        }
        .why-card:hover,
        .why-card--active {
          box-shadow: var(--shadow-card-hover);
          border-color: var(--color-gold-border);
          transform: translateY(-6px) !important;
        }

        /* Hover shimmer wash */
        .why-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(212,176,106,0.06) 0%, transparent 60%);
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.35s;
          pointer-events: none;
        }
        .why-card:hover::before,
        .why-card--active::before {
          opacity: 1;
        }

        /* Gold top line */
        .why-card__line {
          position: absolute;
          top: 0;
          left: 32px;
          right: 32px;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, var(--color-gold) 50%, transparent 100%);
          border-radius: 0 0 2px 2px;
          opacity: 0;
          transition: opacity 0.35s;
        }
        .why-card:hover .why-card__line,
        .why-card--active .why-card__line {
          opacity: 1;
        }

        /* Top row */
        .why-card__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .why-card__icon {
          font-size: 1.75rem;
          line-height: 1;
          display: block;
        }
        .why-card__stat-wrap {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .why-card__stat {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1;
        }
        .why-card__stat--gold {
          color: var(--color-gold-dark);
        }
        .why-card__stat-label {
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-charcoal-muted);
          margin-top: 2px;
        }

        /* Eyebrow */
        .why-card__eyebrow {
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-gold-dark);
          margin: 0 0 8px;
        }

        /* Title */
        .why-card__title {
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 600;
          color: var(--color-navy);
          line-height: 1.3;
          margin: 0 0 12px;
          letter-spacing: -0.01em;
        }

        /* Body */
        .why-card__body {
          font-size: 0.9rem;
          color: var(--color-charcoal-mid);
          line-height: 1.7;
          margin: 0;
          flex: 1;
        }

        /* Arrow */
        .why-card__arrow {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          color: var(--color-gold);
          margin-top: 20px;
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.25s, transform 0.25s var(--ease-spring);
        }
        .why-card:hover .why-card__arrow,
        .why-card--active .why-card__arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* === Bottom trust band === */
        .why-trust {
          margin-top: 64px;
          padding: 32px 40px;
          background: var(--color-navy);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
          overflow: hidden;
        }
        .why-trust::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 80% at 50% 110%, rgba(212,176,106,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .why-trust__item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255,255,255,0.85);
        }
        .why-trust__dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-gold);
          flex-shrink: 0;
        }
        .why-trust__text {
          font-size: 0.875rem;
          letter-spacing: 0.02em;
        }
        .why-trust__text strong {
          color: #fff;
          font-weight: 600;
        }

        .why-trust__divider {
          width: 1px;
          height: 32px;
          background: rgba(255,255,255,0.12);
          flex-shrink: 0;
        }

        /* === Responsive === */
        @media (max-width: 1024px) {
          .why-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .why-header {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .why-header-right {
            padding-bottom: 0;
          }
        }

        @media (max-width: 640px) {
          .why-section {
            padding: 64px 0 80px;
          }
          .why-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .why-trust {
            flex-direction: column;
            align-items: flex-start;
            padding: 24px;
          }
          .why-trust__divider {
            display: none;
          }
          .why-card {
            padding: 28px 24px 24px;
          }
        }
      `}</style>

      <section className="why-section" id="technology">
        <div className="why-container">

          {/* Header */}
          <div ref={headerRef} className={`why-header${headerVisible ? " visible" : ""}`}>
            <div>
              <p className="why-eyebrow">Why Choose Us</p>
              <h2 className="why-heading">
                Modern Dentistry,<br />
                <em>Human Care</em>
              </h2>
            </div>
            <div className="why-header-right">
              <p className="why-subtext">
                We combine the precision of modern dental science with the warmth of a clinic that genuinely cares — because your smile deserves both.
              </p>
              <button className="why-cta-inline">
                Book Consultation
                
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="why-grid">
            {reasons.map((item, i) => (
              <FeatureCard
                key={item.id}
                item={item}
                index={i}
                active={activeCard}
                onHover={setActiveCard}
              />
            ))}
          </div>

          {/* Trust band */}
          <div className="why-trust">
            <div className="why-trust__item">
              <div className="why-trust__dot" />
              <p className="why-trust__text"><strong>10,000+</strong> Smiles Transformed</p>
            </div>
            <div className="why-trust__divider" />
            <div className="why-trust__item">
              <div className="why-trust__dot" />
              <p className="why-trust__text"><strong>15+ Years</strong> Clinical Experience</p>
            </div>
            <div className="why-trust__divider" />
            <div className="why-trust__item">
              <div className="why-trust__dot" />
              <p className="why-trust__text"><strong>4.9★</strong> Patient Satisfaction</p>
            </div>
            <div className="why-trust__divider" />
            <div className="why-trust__item">
              <div className="why-trust__dot" />
              <p className="why-trust__text"><strong>Fear-Free</strong> Dental Care</p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}