import { useState, useEffect, useRef } from "react";
import "./Doctorsection.css"
const doctors = [
  {
    id: 1,
    name: "Dr. Priya Raman",
    role: "Senior Dental Specialist & Lead Cosmetic Surgeon",
    experience: "15+ Years",
    quote: "Exceptional dentistry begins with trust, patience, and compassion.",
    bio: "Dr. Priya leads SmileCraft's cosmetic division with a philosophy rooted in listening first. She has transformed over 4,000 smiles across Chennai — from subtle corrections to complete makeovers.",
    specializations: [
      "Cosmetic Dentistry",
      "Smile Makeovers",
      "Root Canal Therapy",
      "Dental Implants",
    ],
    stats: [
      { value: "4,000+", label: "Smiles" },
      { value: "15+", label: "Years" },
      { value: "4.9★", label: "Rating" },
    ],
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80&fit=crop&crop=face",
    badge: "Lead Specialist",
    featured: true,
  },
  {
    id: 2,
    name: "Dr. Arvind Narayanan",
    role: "Orthodontics & Aligners Expert",
    experience: "11 Years",
    quote: "A straight smile is a confident smile.",
    bio: "Specializing in modern orthodontic solutions, Dr. Arjun brings precision and artistry to every alignment case — from teens to adults.",
    specializations: [
      "Braces & Aligners",
      "Jaw Corrections",
      "Retainer Therapy",
      "Teen Orthodontics",
    ],
    stats: [
      { value: "2,500+", label: "Cases" },
      { value: "11", label: "Years" },
      { value: "98%", label: "Success" },
    ],
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80&fit=crop&crop=face",
    badge: "Orthodontics",
    featured: false,
  },
  {
    id: 3,
    name: "Dr. Meera Krishnan",
    role: "Paediatric & Preventive Dentist",
    experience: "9 Years",
    quote: "Little smiles need the biggest care.",
    bio: "Dr. Meena has built a reputation as Chennai's most patient and playful kids dentist — turning nervous first-timers into enthusiastic regulars.",
    specializations: [
      "Kids Dentistry",
      "Preventive Care",
      "Pit & Fissure Sealing",
      "Habit Counselling",
    ],
    stats: [
      { value: "3,200+", label: "Kids" },
      { value: "9", label: "Years" },
      { value: "100%", label: "Gentle" },
    ],
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80&fit=crop&crop=face",
    badge: "Paediatrics",
    featured: false,
  },
];

function useVisible(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="7" cy="7" r="7" fill="#D4B06A" fillOpacity="0.18" />
      <path d="M4 7l2 2 4-4" stroke="#B8934A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FeaturedDoctorCard({ doc }) {
  const [ref, visible] = useVisible(0.1);
  return (
    <div ref={ref} className={`doc-featured${visible ? " doc--visible" : ""}`}>
      {/* Image col */}
      <div className="doc-featured__img-wrap">
        <div className="doc-featured__img-frame">
          <img src={doc.image} alt={doc.name} className="doc-featured__img" />
          {/* Floating badge */}
          <div className="doc-featured__badge">
            <span className="doc-badge__dot" />
            {doc.badge}
          </div>
          {/* Floating experience pill */}
          <div className="doc-featured__exp-pill">
            <span className="doc-exp__number">{doc.experience}</span>
            <span className="doc-exp__label">Experience</span>
          </div>
        </div>
        {/* Decorative ring behind image */}
        <div className="doc-featured__ring" />
      </div>

      {/* Content col */}
      <div className="doc-featured__content">
        <p className="doc__eyebrow">Featured Specialist</p>

        <h3 className="doc-featured__name">{doc.name}</h3>
        <p className="doc-featured__role">{doc.role}</p>

        {/* Gold line */}
        <div className="doc__gold-line" />

        {/* Quote */}
        <blockquote className="doc-featured__quote">
          <span className="doc-quote__mark">"</span>
          {doc.quote}
          <span className="doc-quote__mark">"</span>
        </blockquote>

        <p className="doc-featured__bio">{doc.bio}</p>

        {/* Specializations */}
        <div className="doc-featured__specs">
          {doc.specializations.map((s) => (
            <div key={s} className="doc-spec__item">
              <CheckIcon />
              <span>{s}</span>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="doc-featured__stats">
          {doc.stats.map((st) => (
            <div key={st.label} className="doc-stat">
              <span className="doc-stat__value">{st.value}</span>
              <span className="doc-stat__label">{st.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="doc-featured__actions">
          <button className="doc-btn doc-btn--primary">Book with Dr. Priya</button>
          <button className="doc-btn doc-btn--ghost">View Full Profile</button>
        </div>
      </div>
    </div>
  );
}

function SmallDoctorCard({ doc, index }) {
  const [ref, visible] = useVisible(0.1);
  return (
    <div
      ref={ref}
      className={`doc-card${visible ? " doc--visible" : ""}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Image */}
      <div className="doc-card__img-wrap">
        <img src={doc.image} alt={doc.name} className="doc-card__img" />
        <div className="doc-card__badge">{doc.badge}</div>
      </div>

      {/* Info */}
      <div className="doc-card__body">
        <div className="doc-card__header">
          <div>
            <h4 className="doc-card__name">{doc.name}</h4>
            <p className="doc-card__role">{doc.role}</p>
          </div>
          <div className="doc-card__exp">
            <span className="doc-card__exp-num">{doc.experience}</span>
          </div>
        </div>

        <p className="doc-card__quote">"{doc.quote}"</p>

        <div className="doc-card__specs">
          {doc.specializations.slice(0, 3).map((s) => (
            <span key={s} className="doc-spec__tag">{s}</span>
          ))}
        </div>

        <div className="doc-card__stats">
          {doc.stats.map((st) => (
            <div key={st.label} className="doc-card__stat">
              <span className="doc-card__stat-val">{st.value}</span>
              <span className="doc-card__stat-lbl">{st.label}</span>
            </div>
          ))}
        </div>

        <button className="doc-card__cta">Book Appointment →</button>
      </div>
    </div>
  );
}

export default function DoctorSection() {
  const [headerRef, headerVisible] = useVisible(0.15);
  const [gridRef, gridVisible] = useVisible(0.08);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&display=swap');

        :root {
          --navy: #17324D; --navy-dark: #0F2236; --navy-mid: #1E3F5E;
          --navy-soft: rgba(23,50,77,0.07); --navy-border: rgba(23,50,77,0.18);
          --charcoal: #1F1F1F; --charcoal-mid: #4A4A4A; --charcoal-muted: #888888;
          --char-border: rgba(31,31,31,0.10);
          --white: #FFFFFF; --ash: #F5F7FA; --ash-dark: #EAEEF3;
          --gold: #D4B06A; --gold-dark: #B8934A; --gold-light: rgba(212,176,106,0.14);
          --gold-border: rgba(212,176,106,0.38); --gold-glow: rgba(212,176,106,0.32);
          --font-d: 'Cormorant Garamond',Georgia,serif;
          --font-b: 'DM Sans','Helvetica Neue',sans-serif;
          --ease-out: cubic-bezier(0.16,1,0.3,1);
          --ease-spring: cubic-bezier(0.34,1.56,0.64,1);
          --sh-card: 0 2px 12px rgba(15,34,54,0.06),0 1px 4px rgba(15,34,54,0.04);
          --sh-card-hover: 0 20px 56px rgba(15,34,54,0.13),0 6px 20px rgba(15,34,54,0.07);
          --sh-navy: 0 4px 20px rgba(23,50,77,0.22),0 2px 8px rgba(23,50,77,0.14);
        }

        /* ── SECTION ── */
        .doc-section {
          background: var(--white);
          padding: 96px 0 112px;
          font-family: var(--font-b);
          position: relative;
          overflow: hidden;
        }
        .doc-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent 0%, var(--gold) 40%, var(--gold-dark) 60%, transparent 100%);
          opacity: 0.5;
        }

        /* Background texture dots */
        .doc-section::after {
          content: '';
          position: absolute;
          top: 60px; right: -80px;
          width: 380px; height: 380px;
          border-radius: 50%;
          border: 1px solid var(--navy-border);
          opacity: 0.25;
          pointer-events: none;
        }

        .doc-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(1.25rem, 4vw, 3rem);
        }

        /* ── HEADER ── */
        .doc-header {
          text-align: center;
          margin-bottom: 72px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out);
        }
        .doc-header.doc--visible { opacity:1; transform:translateY(0); }

        .doc-eyebrow, .doc__eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-b); font-size: 0.64rem; font-weight: 600;
          letter-spacing: 0.20em; text-transform: uppercase; color: var(--navy);
          margin-bottom: 16px;
        }
        .doc-eyebrow::before, .doc__eyebrow::before {
          content: ''; display: block; width: 24px; height: 1px; background: var(--gold);
        }

        .doc-heading {
          font-family: var(--font-d);
          font-size: clamp(2.4rem, 4.5vw, 3.4rem);
          font-weight: 600; color: var(--navy);
          line-height: 1.15; letter-spacing: -0.03em;
          margin: 0 0 16px;
        }
        .doc-heading em { font-style: italic; color: var(--gold); }

        .doc-header-sub {
          font-size: 1.0625rem; color: var(--charcoal-mid);
          line-height: 1.75; max-width: 48ch; margin: 0 auto;
        }

        /* ── REVEAL ANIMATION BASE ── */
        .doc-featured, .doc-card {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.65s var(--ease-out), transform 0.65s var(--ease-out),
                      box-shadow 0.35s var(--ease-out), border-color 0.35s var(--ease-out);
        }
        .doc--visible { opacity: 1; transform: translateY(0); }

        /* ══════════════════════════════════════
           FEATURED DOCTOR — full editorial card
        ══════════════════════════════════════ */
        .doc-featured {
          display: grid;
          grid-template-columns: 420px 1fr;
          gap: 0;
          background: var(--white);
          border-radius: 28px;
          border: 1px solid var(--char-border);
          box-shadow: var(--sh-card);
          overflow: hidden;
          margin-bottom: 56px;
        }

        /* Image side */
        .doc-featured__img-wrap {
          position: relative;
          background: var(--ash);
          min-height: 560px;
        }
        .doc-featured__ring {
          position: absolute;
          top: 40px; left: 40px;
          width: 200px; height: 200px;
          border-radius: 50%;
          border: 1px solid var(--gold-border);
          opacity: 0.6;
          pointer-events: none;
        }
        .doc-featured__img-frame {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .doc-featured__img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center top;
          filter: saturate(0.92) contrast(1.04);
          transition: transform 0.6s var(--ease-out), filter 0.6s;
        }
        .doc-featured:hover .doc-featured__img {
          transform: scale(1.03);
          filter: saturate(1) contrast(1.06);
        }

        /* Floating badge top-left */
        .doc-featured__badge {
          position: absolute; top: 24px; left: 24px;
          display: flex; align-items: center; gap: 8px;
          background: var(--navy); color: #fff;
          font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 8px 16px; border-radius: 9999px;
          box-shadow: var(--sh-navy);
        }
        .doc-badge__dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--gold); flex-shrink: 0;
          box-shadow: 0 0 6px var(--gold-glow);
          animation: docPulse 2s ease-in-out infinite;
        }
        @keyframes docPulse {
          0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.7;transform:scale(1.2)}
        }

        /* Floating experience pill bottom-left */
        .doc-featured__exp-pill {
          position: absolute; bottom: 28px; left: 24px;
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(8px);
          border: 1px solid var(--gold-border);
          border-radius: 16px; padding: 12px 20px;
          display: flex; flex-direction: column; align-items: center;
          box-shadow: 0 8px 24px rgba(15,34,54,0.12);
        }
        .doc-exp__number {
          font-family: var(--font-d); font-size: 1.6rem; font-weight: 700;
          color: var(--navy); line-height: 1;
        }
        .doc-exp__label {
          font-size: 0.62rem; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--charcoal-muted); margin-top: 2px;
        }

        /* Content side */
        .doc-featured__content {
          padding: 52px 48px 48px;
          display: flex; flex-direction: column;
        }

        .doc-featured__name {
          font-family: var(--font-d);
          font-size: clamp(1.8rem, 2.5vw, 2.4rem);
          font-weight: 600; color: var(--navy);
          line-height: 1.2; letter-spacing: -0.02em;
          margin: 0 0 8px;
        }
        .doc-featured__role {
          font-size: 0.875rem; color: var(--charcoal-muted);
          letter-spacing: 0.04em; margin: 0 0 24px;
        }

        .doc__gold-line {
          width: 56px; height: 1.5px;
          background: linear-gradient(90deg, var(--gold) 0%, var(--gold-dark) 100%);
          border-radius: 2px; margin-bottom: 24px;
        }

        .doc-featured__quote {
          font-family: var(--font-d);
          font-size: 1.35rem; font-style: italic;
          color: var(--navy-mid); line-height: 1.5;
          margin: 0 0 20px; border: none; padding: 0;
        }
        .doc-quote__mark {
          color: var(--gold); font-size: 1.6rem; line-height: 0;
          vertical-align: -6px; font-style: normal;
        }

        .doc-featured__bio {
          font-size: 0.9375rem; color: var(--charcoal-mid);
          line-height: 1.75; margin: 0 0 24px; max-width: 48ch;
        }

        /* Specializations */
        .doc-featured__specs {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 10px; margin-bottom: 32px;
        }
        .doc-spec__item {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.875rem; color: var(--charcoal);
        }

        /* Stats */
        .doc-featured__stats {
          display: flex; gap: 28px; margin-bottom: 36px;
          padding: 20px 24px;
          background: var(--ash); border-radius: 14px;
          border: 1px solid var(--char-border);
        }
        .doc-stat {
          display: flex; flex-direction: column; align-items: center; flex: 1;
        }
        .doc-stat__value {
          font-family: var(--font-d); font-size: 1.5rem; font-weight: 700;
          color: var(--navy); line-height: 1;
        }
        .doc-stat__label {
          font-size: 0.6rem; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--charcoal-muted); margin-top: 4px;
        }

        /* Actions */
        .doc-featured__actions { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; }

        .doc-btn--primary {
          background: var(--navy); color: #fff; border: 2px solid var(--navy);
          font-family: var(--font-b); font-size: 0.8rem; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase;
          padding: 0 28px; height: 50px; border-radius: 9999px;
          cursor: pointer; box-shadow: var(--sh-navy);
          transition: background 0.25s var(--ease-out), box-shadow 0.25s, transform 0.15s var(--ease-spring), border-color 0.25s;
        }
        .doc-btn--primary:hover {
          background: var(--navy-dark); border-color: var(--gold);
          box-shadow: 0 8px 32px rgba(23,50,77,0.28), 0 0 0 3px var(--gold-border);
          transform: translateY(-2px);
        }
        .doc-btn--ghost {
          background: transparent; color: var(--navy);
          border: none; font-family: var(--font-b); font-size: 0.875rem;
          font-weight: 500; cursor: pointer; padding: 0;
          position: relative; transition: color 0.2s;
        }
        .doc-btn--ghost::after {
          content: ''; position: absolute; bottom: -2px; left: 0;
          width: 0; height: 1.5px; background: var(--gold);
          transition: width 0.3s var(--ease-out);
        }
        .doc-btn--ghost:hover::after { width: 100%; }
        .doc-btn--ghost:hover { color: var(--gold-dark); }

        /* ══════════════════════════════════════
           SMALL DOCTOR CARDS
        ══════════════════════════════════════ */
        .doc-grid-label {
          font-family: var(--font-b); font-size: 0.64rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--charcoal-muted); margin-bottom: 24px;
          display: flex; align-items: center; gap: 10px;
        }
        .doc-grid-label::after {
          content: ''; flex: 1; height: 1px; background: var(--char-border);
        }

        .doc-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;
        }

        .doc-card {
          background: var(--white); border-radius: 24px;
          border: 1px solid var(--char-border);
          box-shadow: var(--sh-card); overflow: hidden;
        }
        .doc-card:hover {
          box-shadow: var(--sh-card-hover); border-color: var(--gold-border);
          transform: translateY(-5px) !important;
        }

        /* Card image */
        .doc-card__img-wrap {
          position: relative; height: 220px; overflow: hidden;
          background: var(--ash);
        }
        .doc-card__img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center top;
          filter: saturate(0.9);
          transition: transform 0.5s var(--ease-out), filter 0.5s;
        }
        .doc-card:hover .doc-card__img {
          transform: scale(1.05); filter: saturate(1);
        }
        .doc-card__badge {
          position: absolute; bottom: 14px; right: 14px;
          background: var(--navy); color: #fff;
          font-size: 0.62rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 5px 12px; border-radius: 9999px;
        }

        /* Card body */
        .doc-card__body { padding: 24px 24px 28px; }

        .doc-card__header {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 12px; margin-bottom: 12px;
        }
        .doc-card__name {
          font-family: var(--font-d); font-size: 1.3rem; font-weight: 600;
          color: var(--navy); line-height: 1.2; margin: 0 0 4px;
        }
        .doc-card__role {
          font-size: 0.78rem; color: var(--charcoal-muted); margin: 0; line-height: 1.4;
        }
        .doc-card__exp {
          background: var(--gold-light); border: 1px solid var(--gold-border);
          border-radius: 10px; padding: 8px 12px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .doc-card__exp-num {
          font-family: var(--font-d); font-size: 1rem; font-weight: 700;
          color: var(--gold-dark); white-space: nowrap;
        }

        .doc-card__quote {
          font-family: var(--font-d); font-style: italic;
          font-size: 0.975rem; color: var(--navy-mid);
          line-height: 1.5; margin: 0 0 16px;
        }

        /* Specialty tags */
        .doc-card__specs { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px; }
        .doc-spec__tag {
          font-size: 0.68rem; font-weight: 600; letter-spacing: 0.08em;
          background: var(--navy-soft); color: var(--navy);
          border-radius: 9999px; padding: 4px 12px;
          border: 1px solid var(--navy-border);
        }

        /* Card stats */
        .doc-card__stats { display: flex; gap: 0; margin-bottom: 20px; }
        .doc-card__stat {
          flex: 1; display: flex; flex-direction: column; align-items: center;
          padding: 12px 8px; background: var(--ash); border-radius: 10px;
          margin-right: 6px;
        }
        .doc-card__stat:last-child { margin-right: 0; }
        .doc-card__stat-val {
          font-family: var(--font-d); font-size: 1.1rem; font-weight: 700;
          color: var(--navy); line-height: 1;
        }
        .doc-card__stat-lbl {
          font-size: 0.58rem; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--charcoal-muted); margin-top: 3px;
        }

        /* Card CTA */
        .doc-card__cta {
          width: 100%; background: transparent; color: var(--navy);
          border: 1.5px solid var(--navy-border);
          font-family: var(--font-b); font-size: 0.8rem; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase;
          padding: 12px; border-radius: 9999px; cursor: pointer;
          transition: background 0.25s, border-color 0.25s, color 0.25s, transform 0.15s var(--ease-spring);
        }
        .doc-card__cta:hover {
          background: var(--navy); color: #fff; border-color: var(--navy);
          transform: translateY(-1px);
        }

        /* ── BOTTOM BAND ── */
        .doc-bottom {
          margin-top: 64px; padding: 36px 44px;
          background: linear-gradient(135deg, var(--navy) 0%, var(--navy-dark) 100%);
          border-radius: 20px; display: flex;
          align-items: center; justify-content: space-between;
          gap: 24px; flex-wrap: wrap; position: relative; overflow: hidden;
        }
        .doc-bottom::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 50% 80% at 50% 110%, rgba(212,176,106,0.14) 0%, transparent 70%);
          pointer-events: none;
        }
        .doc-bottom__left {}
        .doc-bottom__eyebrow {
          font-size: 0.6rem; font-weight: 600; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--gold);
          margin: 0 0 8px; display: flex; align-items: center; gap: 8px;
        }
        .doc-bottom__eyebrow::before {
          content: ''; display: block; width: 20px; height: 1px; background: var(--gold);
        }
        .doc-bottom__heading {
          font-family: var(--font-d); font-size: 1.5rem; font-weight: 600;
          color: #fff; margin: 0; line-height: 1.3;
        }
        .doc-bottom__heading em { font-style: italic; color: var(--gold); }
        .doc-bottom__actions { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }

        .doc-btn--inverse {
          background: transparent; color: #fff;
          border: 1.5px solid rgba(255,255,255,0.4);
          font-family: var(--font-b); font-size: 0.78rem; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase;
          padding: 0 24px; height: 48px; border-radius: 9999px; cursor: pointer;
          transition: background 0.25s, border-color 0.25s, transform 0.15s var(--ease-spring);
        }
        .doc-btn--inverse:hover {
          background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.85);
          transform: translateY(-2px);
        }
        .doc-btn--gold {
          background: var(--gold); color: var(--navy-dark);
          border: 2px solid var(--gold);
          font-family: var(--font-b); font-size: 0.78rem; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase;
          padding: 0 24px; height: 48px; border-radius: 9999px; cursor: pointer;
          box-shadow: 0 4px 20px var(--gold-glow);
          transition: background 0.25s, box-shadow 0.25s, transform 0.15s var(--ease-spring);
        }
        .doc-btn--gold:hover {
          background: var(--gold-dark); border-color: var(--gold-dark);
          box-shadow: 0 8px 32px rgba(212,176,106,0.50); transform: translateY(-2px);
        }

        /* ── RESPONSIVE ── */
        @media(max-width:1024px){
          .doc-featured { grid-template-columns: 1fr; }
          .doc-featured__img-wrap { min-height: 380px; }
          .doc-featured__content { padding: 36px 32px 40px; }
          .doc-featured__specs { grid-template-columns: 1fr 1fr; }
        }
        @media(max-width:768px){
          .doc-section { padding: 64px 0 80px; }
          .doc-grid { grid-template-columns: 1fr; }
          .doc-bottom { flex-direction: column; align-items: flex-start; padding: 28px 24px; }
          .doc-featured__specs { grid-template-columns: 1fr; }
          .doc-featured__content { padding: 28px 24px 32px; }
        }
        @media(max-width:480px){
          .doc-featured__img-wrap { min-height: 300px; }
          .doc-featured__actions { flex-direction: column; align-items: stretch; }
          .doc-btn--primary { text-align: center; }
        }
      `}</style>

      <section className="doc-section" id="experts">
        <div className="doc-container">

          {/* Section header */}
          <div ref={headerRef} className={`doc-header${headerVisible ? " doc--visible" : ""}`}>
            <p className="doc-eyebrow">Meet Your Experts</p>
            <h2 className="doc-heading">
              Care Led by <em>Experience</em>
            </h2>
            <p className="doc-header-sub">
              Our team of specialists brings decades of combined expertise — and a genuine commitment to making every visit feel exceptional.
            </p>
          </div>

          {/* Featured doctor */}
          <FeaturedDoctorCard doc={doctors[0]} />

          {/* Label for secondary doctors */}
          <p className="doc-grid-label">Also on our team</p>

          {/* Secondary doctors grid */}
          <div ref={gridRef} className="doc-grid">
            {doctors.slice(1).map((doc, i) => (
              <SmallDoctorCard key={doc.id} doc={doc} index={i} />
            ))}
          </div>

          {/* Bottom CTA band */}
          <div className="doc-bottom">
            <div className="doc-bottom__left">
              <p className="doc-bottom__eyebrow">Your Smile, Our Priority</p>
              <h3 className="doc-bottom__heading">
                Ready to meet your <em>smile expert?</em>
              </h3>
            </div>
            <div className="doc-bottom__actions">
              <button className="doc-btn--inverse">View All Doctors</button>
              <button className="doc-btn--gold">Book Consultation</button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}