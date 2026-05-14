import { useEffect, useRef, useState } from "react";
import "./Treatments.css";

// ── Icons ──────────────────────────────────────────────────

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none"
    stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);

// ── Treatment Data ─────────────────────────────────────────

const treatments = [
  {
    id: 1,
    number: "01",
    name: "Teeth Cleaning",
    tagline: "Freshness You Can Feel",
    desc: "Healthy professional cleaning for brighter, stronger smiles that last.",
    tag: "Preventive",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6C14 6 9 11 9 17c0 4 1 7 2 10s2 6 5 6 4-4 4-4 1 4 4 4 4-3 5-6 2-6 2-10c0-6-5-11-11-11z"/>
        <path d="M15 18c1-2 3-3 5-3s4 1 5 3"/>
      </svg>
    ),
  },
  {
    id: 2,
    number: "02",
    name: "Root Canal",
    tagline: "Comfort Beyond Expectations",
    desc: "Gentle care designed to relieve pain, save your tooth, and restore comfort.",
    tag: "Restorative",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6C14 6 9 11 9 17c0 4 1 7 2 10s2 6 5 6 4-4 4-4 1 4 4 4 4-3 5-6 2-6 2-10c0-6-5-11-11-11z"/>
        <line x1="20" y1="16" x2="20" y2="28"/>
        <line x1="16" y1="22" x2="24" y2="22"/>
      </svg>
    ),
  },
  {
    id: 3,
    number: "03",
    name: "Teeth Whitening",
    tagline: "Brighter Smiles, Bigger Confidence",
    desc: "Safe, professional whitening for a radiant smile that turns heads.",
    tag: "Cosmetic",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6C14 6 9 11 9 17c0 4 1 7 2 10s2 6 5 6 4-4 4-4 1 4 4 4 4-3 5-6 2-6 2-10c0-6-5-11-11-11z"/>
        <path d="M26 8l2-3M30 12l3-1M28 17l3 1"/>
      </svg>
    ),
  },
  {
    id: 4,
    number: "04",
    name: "Braces & Aligners",
    tagline: "Straight Smiles Start Here",
    desc: "Modern alignment solutions — discreet, comfortable, and effective.",
    tag: "Orthodontic",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="15" width="24" height="10" rx="3"/>
        <line x1="14" y1="15" x2="14" y2="25"/>
        <line x1="20" y1="15" x2="20" y2="25"/>
        <line x1="26" y1="15" x2="26" y2="25"/>
        <line x1="8" y1="20" x2="32" y2="20"/>
      </svg>
    ),
  },
  {
    id: 5,
    number: "05",
    name: "Dental Implants",
    tagline: "Confidence, Restored",
    desc: "Natural-looking, permanent tooth replacements built to last a lifetime.",
    tag: "Implantology",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6C14 6 9 11 9 17c0 4 1 7 2 10s2 6 5 6 4-4 4-4 1 4 4 4 4-3 5-6 2-6 2-10c0-6-5-11-11-11z"/>
        <line x1="20" y1="30" x2="20" y2="36"/>
        <line x1="16" y1="34" x2="24" y2="34"/>
      </svg>
    ),
  },
  {
    id: 6,
    number: "06",
    name: "Kids Dentistry",
    tagline: "Little Smiles, Big Care",
    desc: "Friendly, fun dental experiences that build healthy lifelong habits.",
    tag: "Paediatric",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="18" r="8"/>
        <path d="M16 21c1 2 6 2 8 0"/>
        <circle cx="17" cy="16" r="1" fill="currentColor"/>
        <circle cx="23" cy="16" r="1" fill="currentColor"/>
        <path d="M12 30c0-4 3-6 8-6s8 2 8 6"/>
      </svg>
    ),
  },
  {
    id: 7,
    number: "07",
    name: "Smile Makeover",
    tagline: "Designed Around Your Dream Smile",
    desc: "Customized multi-treatment plans tailored to your unique smile goals.",
    tag: "Cosmetic",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6C14 6 9 11 9 17c0 4 1 7 2 10s2 6 5 6 4-4 4-4 1 4 4 4 4-3 5-6 2-6 2-10c0-6-5-11-11-11z"/>
        <path d="M28 6l2 2-10 10-3-3 10-10 1 1z"/>
      </svg>
    ),
  },
  {
    id: 8,
    number: "08",
    name: "Tooth Extraction",
    tagline: "Relief with Gentle Care",
    desc: "Safe, stress-free extractions when needed — with comfort at every step.",
    tag: "Surgical",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6C14 6 9 11 9 17c0 4 1 7 2 10s2 6 5 6 4-4 4-4 1 4 4 4 4-3 5-6 2-6 2-10c0-6-5-11-11-11z"/>
        <line x1="15" y1="15" x2="25" y2="25"/>
        <line x1="25" y1="15" x2="15" y2="25"/>
      </svg>
    ),
  },
];


// ── Main Component ─────────────────────────────────────────

export default function TreatmentsSection({ onViewAll }) {
  const sectionRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);

  // Scroll reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("treatments--visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="treatments"
      className="treatments"
      ref={sectionRef}
      aria-label="Our Dental Treatments"
    >
      {/* Background accents */}
      <div className="treatments__bg-dot treatments__bg-dot--1" aria-hidden="true" />
      <div className="treatments__bg-dot treatments__bg-dot--2" aria-hidden="true" />

      {/* ── HEADER ── */}
      <div className="treatments__header">
        <p className="treatments__eyebrow">Treatments Designed Around You</p>
        <h2 className="treatments__heading">
          Complete Care for <span className="treatments__heading-accent">Every Smile</span>
        </h2>
        <div className="treatments__gold-line" aria-hidden="true" />
        <p className="treatments__subtext">
          From routine cleaning to full smile transformations — every treatment
          is delivered with precision, care, and comfort in mind.
        </p>
      </div>

      {/* ── CARDS GRID ── */}
      <div className="treatments__grid" role="list">
        {treatments.map((t, i) => (
          <article
            key={t.id}
            className={`t-card ${activeCard === t.id ? "t-card--active" : ""}`}
            role="listitem"
            style={{ "--card-delay": `${i * 0.07}s` }}
            onMouseEnter={() => setActiveCard(t.id)}
            onMouseLeave={() => setActiveCard(null)}
            aria-label={t.name}
          >
            {/* Card number — top left */}
            <span className="t-card__number" aria-hidden="true">{t.number}</span>

            {/* Tag — top right */}
            <span className="t-card__tag">{t.tag}</span>

            {/* Icon */}
            <div className="t-card__icon" aria-hidden="true">
              {t.icon}
            </div>

            {/* Text */}
            <h3 className="t-card__name">{t.name}</h3>
            <p className="t-card__tagline">{t.tagline}</p>
            <p className="t-card__desc">{t.desc}</p>

            {/* Hover arrow CTA */}
            <span className="t-card__arrow" aria-hidden="true">
              <ArrowRightIcon />
            </span>

            {/* Gold bottom bar — slides in on hover */}
            <div className="t-card__bar" aria-hidden="true" />
          </article>
        ))}
      </div>

      {/* ── FOOTER CTA ── */}
      <div className="treatments__footer">
        <button
          className="btn btn--primary treatments__cta"
          onClick={onViewAll}
          aria-label="View all dental treatments"
        >
          View All Treatments
          
        </button>
      </div>

    </section>
  );
}