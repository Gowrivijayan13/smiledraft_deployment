// ============================================================
//  SMILECRAFT DENTAL — Final CTA Section
//  Cta.jsx
//  + Booking Confirmation Modal with AUTO-CLOSE (5 seconds)
//  + Gold countdown progress bar
// ============================================================

import React, { useEffect, useRef, useState } from 'react';
import './Cta.css';

// ─── 3D Tooth SVG ─────────────────────────────────────────────
const ToothSVG = () => (
  <svg
    viewBox="0 0 220 280"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%', overflow: 'visible' }}
    aria-label="3D rendered dental tooth illustration"
    role="img"
  >
    <defs>
      <linearGradient id="crownBase" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#FDFAF4" />
        <stop offset="40%"  stopColor="#FFFFFF" />
        <stop offset="75%"  stopColor="#F0EBE0" />
        <stop offset="100%" stopColor="#DDD5C4" />
      </linearGradient>
      <linearGradient id="crownShadow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="rgba(0,0,0,0.0)" />
        <stop offset="60%"  stopColor="rgba(0,0,0,0.0)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.18)" />
      </linearGradient>
      <linearGradient id="rootLeft" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#E8E0D0" />
        <stop offset="50%"  stopColor="#D4C8B0" />
        <stop offset="100%" stopColor="#B8AA90" />
      </linearGradient>
      <linearGradient id="rootRight" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"   stopColor="#DDD5C4" />
        <stop offset="50%"  stopColor="#C8BA9E" />
        <stop offset="100%" stopColor="#A89880" />
      </linearGradient>
      <linearGradient id="sheen" x1="0%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%"   stopColor="rgba(255,255,255,0.85)" />
        <stop offset="35%"  stopColor="rgba(255,255,255,0.30)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
      </linearGradient>
      <linearGradient id="goldBand" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="rgba(212,176,106,0.0)" />
        <stop offset="30%"  stopColor="rgba(212,176,106,0.55)" />
        <stop offset="60%"  stopColor="rgba(228,200,140,0.70)" />
        <stop offset="100%" stopColor="rgba(212,176,106,0.0)" />
      </linearGradient>
      <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stopColor="rgba(0,0,0,0.40)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.0)" />
      </radialGradient>
      <linearGradient id="cuspSheen" x1="20%" y1="0%" x2="80%" y2="100%">
        <stop offset="0%"   stopColor="rgba(255,255,255,0.9)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
      </linearGradient>
      <linearGradient id="neckGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="#C8BA9E" />
        <stop offset="50%"  stopColor="#E8E0D0" />
        <stop offset="100%" stopColor="#B8AA90" />
      </linearGradient>
      <filter id="toothShadow" x="-20%" y="-10%" width="140%" height="130%">
        <feDropShadow dx="4" dy="8" stdDeviation="8" floodColor="rgba(0,0,0,0.35)" />
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(212,176,106,0.25)" />
      </filter>
    </defs>

    <ellipse cx="110" cy="268" rx="58" ry="10" fill="url(#groundShadow)" opacity="0.6" />
    <path d="M 72 155 C 68 170, 60 190, 56 215 C 53 230, 54 248, 58 258 C 60 263, 65 265, 68 262 C 72 258, 74 248, 76 235 C 78 218, 80 198, 84 178 Z" fill="url(#rootLeft)" />
    <path d="M 80 158 C 78 174, 74 194, 73 218 C 72 234, 73 250, 75 258" stroke="rgba(0,0,0,0.10)" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 96 158 C 94 175, 90 198, 88 222 C 86 238, 87 255, 90 263 C 92 268, 97 269, 100 265 C 104 260, 105 245, 106 228 C 107 208, 107 185, 108 165 Z" fill="url(#rootLeft)" opacity="0.9" />
    <path d="M 148 155 C 152 170, 160 190, 164 215 C 167 230, 166 248, 162 258 C 160 263, 155 265, 152 262 C 148 258, 146 248, 144 235 C 142 218, 140 198, 136 178 Z" fill="url(#rootRight)" />
    <path d="M 140 158 C 142 174, 146 194, 147 218 C 148 234, 147 250, 145 258" stroke="rgba(0,0,0,0.08)" strokeWidth="2" fill="none" strokeLinecap="round" />
    <ellipse cx="110" cy="160" rx="50" ry="10" fill="url(#neckGrad)" opacity="0.7" />
    <path d="M 52 130 C 52 108, 58 88, 62 78 C 66 68, 68 62, 72 56 C 80 44, 92 36, 110 34 C 128 32, 142 38, 150 48 C 158 58, 162 70, 164 84 C 167 98, 168 114, 168 132 C 168 142, 162 152, 150 157 C 138 162, 122 164, 110 164 C 98 164, 82 162, 70 157 C 58 152, 52 142, 52 130 Z" fill="url(#crownBase)" filter="url(#toothShadow)" />
    <path d="M 52 130 C 52 108, 58 88, 62 78 C 66 68, 68 62, 72 56 C 80 44, 92 36, 110 34 C 128 32, 142 38, 150 48 C 158 58, 162 70, 164 84 C 167 98, 168 114, 168 132 C 168 142, 162 152, 150 157 C 138 162, 122 164, 110 164 C 98 164, 82 162, 70 157 C 58 152, 52 142, 52 130 Z" fill="url(#crownShadow)" />
    <ellipse cx="72" cy="50" rx="16" ry="22" fill="url(#crownBase)" stroke="rgba(200,190,170,0.4)" strokeWidth="0.5" />
    <ellipse cx="70" cy="46" rx="8" ry="11" fill="url(#cuspSheen)" opacity="0.5" />
    <ellipse cx="96" cy="42" rx="16" ry="23" fill="url(#crownBase)" stroke="rgba(200,190,170,0.4)" strokeWidth="0.5" />
    <ellipse cx="94" cy="38" rx="8" ry="11" fill="url(#cuspSheen)" opacity="0.5" />
    <ellipse cx="124" cy="40" rx="16" ry="23" fill="url(#crownBase)" stroke="rgba(200,190,170,0.3)" strokeWidth="0.5" />
    <ellipse cx="122" cy="36" rx="8" ry="11" fill="url(#cuspSheen)" opacity="0.45" />
    <ellipse cx="148" cy="50" rx="15" ry="20" fill="url(#crownBase)" stroke="rgba(200,190,170,0.3)" strokeWidth="0.5" />
    <ellipse cx="146" cy="46" rx="7" ry="10" fill="url(#cuspSheen)" opacity="0.4" />
    <path d="M 88 90 C 96 80, 108 78, 120 82 C 130 86, 136 96, 132 108" stroke="rgba(160,148,128,0.35)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M 96 100 C 102 94, 112 92, 120 96" stroke="rgba(160,148,128,0.25)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <path d="M 80 112 C 88 108, 98 106, 108 110" stroke="rgba(160,148,128,0.20)" strokeWidth="1" fill="none" strokeLinecap="round" />
    <rect x="52" y="138" width="116" height="10" rx="4" fill="url(#goldBand)" opacity="0.70" />
    <path d="M 58 128 C 58 100, 64 72, 78 54 C 88 42, 96 37, 108 36 C 114 35, 108 50, 102 66 C 94 86, 76 110, 68 136 C 65 144, 58 142, 58 128 Z" fill="url(#sheen)" opacity="0.55" />
    <path d="M 78 46 C 82 42, 86 40, 90 42 C 88 52, 82 62, 76 68 C 74 60, 74 52, 78 46 Z" fill="rgba(255,255,255,0.65)" />
    <g transform="translate(68, 56)" opacity="0.8">
      <line x1="0" y1="-5" x2="0" y2="5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="-5" y1="0" x2="5" y2="0" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="-3" y1="-3" x2="3" y2="3" stroke="white" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
      <line x1="3" y1="-3" x2="-3" y2="3" stroke="white" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
    </g>
    <g transform="translate(148, 62)" opacity="0.5">
      <line x1="0" y1="-4" x2="0" y2="4" stroke="rgba(212,176,106,1)" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="-4" y1="0" x2="4" y2="0" stroke="rgba(212,176,106,1)" strokeWidth="1.2" strokeLinecap="round"/>
    </g>
    <circle cx="86" cy="72" r="1.5" fill="white" opacity="0.7" />
    <circle cx="130" cy="58" r="1.2" fill="rgba(212,176,106,0.9)" />
    <circle cx="106" cy="48" r="1.8" fill="white" opacity="0.6" />
    <path d="M 52 130 C 52 108, 58 88, 62 78 C 66 68, 68 62, 72 56 C 80 44, 92 36, 110 34 C 128 32, 142 38, 150 48 C 158 58, 162 70, 164 84 C 167 98, 168 114, 168 132 C 168 142, 162 152, 150 157 C 138 162, 122 164, 110 164 C 98 164, 82 162, 70 157 C 58 152, 52 142, 52 130 Z" fill="none" stroke="rgba(180,165,140,0.30)" strokeWidth="1" />
  </svg>
);

// ─── Floating Stat Card ───────────────────────────────────────
const StatCard = ({ className, icon, iconClass, label, value, sub }) => (
  <div className={`cta-stat-card ${className}`}>
    <div className={`stat-icon ${iconClass}`}>{icon}</div>
    <div>
      <p className="stat-label">{label}</p>
      <p className="stat-value">
        {value}
        {sub && <span className="sub"> {sub}</span>}
      </p>
    </div>
  </div>
);

// ─── Booking Confirmation Modal ───────────────────────────────
// AUTO_CLOSE_MS: how long the modal stays open (5 seconds)
const AUTO_CLOSE_MS = 5000;

const BookingModal = ({ isOpen, onClose }) => {
  // ── countdown: counts down from 5 → 0
  const [secondsLeft, setSecondsLeft] = useState(AUTO_CLOSE_MS / 1000);

  useEffect(() => {
    if (!isOpen) return;

    // Reset countdown every time modal opens
    setSecondsLeft(AUTO_CLOSE_MS / 1000);

    // ── Auto-close timer — fires once after AUTO_CLOSE_MS
    const closeTimer = setTimeout(() => {
      onClose();
    }, AUTO_CLOSE_MS);

    // ── Countdown ticker — fires every 1 second to decrement display
    const countdownTicker = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTicker);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // ── Keyboard close
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);

    // ── Lock background scroll
    document.body.style.overflow = 'hidden';

    // ── Cleanup: runs when modal closes early OR component unmounts
    return () => {
      clearTimeout(closeTimer);       // cancel auto-close if user closes early
      clearInterval(countdownTicker); // stop the ticker
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="booking-overlay booking-overlay--visible"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="booking-modal">

        {/* ── Gold progress bar — drains left to right over AUTO_CLOSE_MS ── */}
        <div className="booking-modal__progress-track">
          <div
            className="booking-modal__progress-bar"
            style={{ animationDuration: `${AUTO_CLOSE_MS}ms` }}
          />
        </div>

        {/* ── Close button with live countdown ── */}
        <button className="booking-modal__close" onClick={onClose} aria-label="Close">
          <span className="booking-modal__close-count">{secondsLeft}</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* ── Animated checkmark ── */}
        <div className="booking-modal__icon-wrap">
          <svg className="booking-modal__check" viewBox="0 0 52 52" fill="none">
            <circle className="booking-modal__check-circle" cx="26" cy="26" r="24"
              stroke="url(#checkGold)" strokeWidth="2.5" fill="none"/>
            <polyline className="booking-modal__check-tick" points="14,27 22,35 38,18"
              stroke="url(#checkGold)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <defs>
              <linearGradient id="checkGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4B06A"/>
                <stop offset="100%" stopColor="#F0D080"/>
              </linearGradient>
            </defs>
          </svg>
          <div className="booking-modal__icon-glow" />
        </div>

        {/* ── Eyebrow ── */}
        <p className="booking-modal__eyebrow">Request Received</p>

        {/* ── Heading ── */}
        <h3 className="booking-modal__title" id="modal-title">
          You&rsquo;re on your way to a<br />
          <span className="booking-modal__title-accent">brighter smile</span> ✦
        </h3>

        {/* ── Body ── */}
        <p className="booking-modal__body">
          Our team has received your consultation request and will reach out
          within <strong>24 hours</strong> to confirm your appointment time.
          Sit tight — great things are coming!
        </p>

        {/* ── Info strip ── */}
        <div className="booking-modal__info-strip">
          <div className="booking-modal__info-item">
            <span className="booking-modal__info-icon"></span>
            <div>
              <p className="booking-modal__info-label">Next Step</p>
              <p className="booking-modal__info-value">Confirmation Call</p>
            </div>
          </div>
          <div className="booking-modal__info-divider" />
          <div className="booking-modal__info-item">
            <span className="booking-modal__info-icon"></span>
            <div>
              <p className="booking-modal__info-label">Response Time</p>
              <p className="booking-modal__info-value">Within 24 Hours</p>
            </div>
          </div>
          <div className="booking-modal__info-divider" />
          <div className="booking-modal__info-item">
          
            <div>
              <p className="booking-modal__info-label">Your Data</p>
              <p className="booking-modal__info-value">100% Secure</p>
            </div>
          </div>
        </div>

        {/* ── Auto-close notice ── */}
        <p className="booking-modal__auto-notice">
          This window closes automatically in{' '}
          <span className="booking-modal__auto-count">{secondsLeft}s</span>
        </p>

        {/* ── CTA ── */}
        <button className="booking-modal__btn" onClick={onClose}>
          Back to Homepage
        </button>

        {/* ── Decorative sparkles ── */}
        <div className="booking-modal__sparkle booking-modal__sparkle--1" />
        <div className="booking-modal__sparkle booking-modal__sparkle--2" />
        <div className="booking-modal__sparkle booking-modal__sparkle--3" />
      </div>
    </div>
  );
};

// ─── Main CTA Component ───────────────────────────────────────
const Cta = () => {
  const bannerRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          banner.classList.add('in-view');
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(banner);
    return () => observer.disconnect();
  }, []);

  const handleBookingClick = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  return (
    <>
      <section className="cta-section" id="cta">
        <div className="cta-banner" ref={bannerRef}>

          <div className="cta-banner__content">
            <p className="cta-banner__eyebrow">Start Today</p>
            <h2 className="cta-banner__title">
              Your Best Smile<br />
              Starts <span className="italic">Here</span>
            </h2>
            <p className="cta-banner__body">
              A healthier, brighter, more confident smile is closer than you
              think. Book a consultation and let our specialists design your
              perfect smile — comfort-first, always.
            </p>
            <div className="cta-banner__buttons">
              <a href="#contact" className="btn--gold" onClick={handleBookingClick}>
                Book Consultation
                
              </a>
              <a href="tel:+919876543210" className="btn--ghost-light">
                Talk to Our Team
              </a>
            </div>
          </div>

          <div className="cta-banner__visual">
            <div className="cta-sparkle cta-sparkle--1" />
            <div className="cta-sparkle cta-sparkle--2" />
            <div className="cta-sparkle cta-sparkle--3" />
            <StatCard className="cta-stat-card--a" iconClass="stat-icon--gold" label="Patient Rating" value="4.9" sub="/ 5.0" />
            <StatCard className="cta-stat-card--b" iconClass="stat-icon--navy" label="Smiles Treated" value="10,000+" />
            <StatCard className="cta-stat-card--c" iconClass="stat-icon--green" label="Fear-Free Care" value="100%" />
            <div className="tooth-scene"><ToothSVG /></div>
          </div>

        </div>
      </section>

      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Cta;