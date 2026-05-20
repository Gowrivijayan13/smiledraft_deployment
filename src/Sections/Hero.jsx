import React from "react";
import "./Hero.css";
import herobg from "../assets/herobg.png";

// ─── SVG Icons ────────────────────────────────────────────────
const ToothIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2C8.5 2 5 5 5 9c0 2.5.5 4.5 1 6.5.5 2 1 4.5 3 4.5s2.5-3 3-3 1 3 3 3 2.5-2.5 3-4.5c.5-2 1-4 1-6.5 0-4-3.5-7-7-7z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24"
    fill="currentColor" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);


// ════════════════════════════════════════════════════════════
// HeroSection
// ════════════════════════════════════════════════════════════
//
//  ALL React hooks removed. Replaced with:
//  - useRef(stripRef) + useEffect(parallax) → ref callback
//    The scroll handler is registered directly when the node mounts
//    and removed when the node unmounts (null branch).
//
// ════════════════════════════════════════════════════════════

export default function HeroSection({
  bgImage = herobg,
  onBookConsultation,
  onSpeakExpert,
  onViewServices,
}) {

  // ── REPLACED: useRef + useEffect → ref callback ───────────
  //
  //  OLD:
  //    const stripRef = useRef(null);
  //    useEffect(() => {
  //      const el = stripRef.current;
  //      if (!el) return;
  //      const handleScroll = () => {
  //        el.style.transform = `translateY(${window.scrollY * 0.08}px)`;
  //      };
  //      window.addEventListener("scroll", handleScroll, { passive: true });
  //      return () => window.removeEventListener("scroll", handleScroll);
  //    }, []);
  //
  //  NEW: ref callback — attach on mount, detach on unmount (null branch).
  //  handleScroll is stored on the element so the same reference is passed
  //  to both addEventListener and removeEventListener.

  function handleStripRef(el) {
    if (!el) {
      // Unmount — remove listener using the stored reference
      window.removeEventListener("scroll", el?._parallax);
      return;
    }

    const handleScroll = () => {
      el.style.transform = `translateY(${window.scrollY * 0.08}px)`;
    };

    el._parallax = handleScroll; // store so we can remove it on unmount
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // apply on mount in case page loads mid-scroll
  }

  return (
    <section
      id="hero"
      className="hero"
      aria-label="Hero — SmileCraft Dental Studio"
    >
      {/* ── HERO BACKGROUND BLOBS ── */}
      <div className="hero__bg-blob hero__bg-blob--1" aria-hidden="true" />
      <div className="hero__bg-blob hero__bg-blob--2" aria-hidden="true" />
      <div className="hero__bg-blob hero__bg-blob--3" aria-hidden="true" />

      {/* ── CENTER CONTENT ── */}
      <div className="hero__center">

        {/* Badge */}
        <div className="hero__badge-pill hero__badge-pill--top" aria-label="Professional Services">
          <div className="hero__badge-icon">
            <ToothIcon />
          </div>
          <span className="hero__badge-text">Professional Services</span>
        </div>

        {/* Main heading */}
        <h1 className="hero__heading">
          <span className="hero__heading-line">We Take Care of</span>

          <span className="hero__heading-smile-row">
            <span className="hero__tooth-toggle" aria-hidden="true">
              <span className="hero__tooth-toggle-knob">
                <ToothIcon />
              </span>
            </span>

            <span className="hero__heading-your">
              Your{" "}
              <span className="hero__smile-word">
                Smile
                <svg
                  className="hero__smile-arc"
                  viewBox="0 0 120 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M4 4 Q60 22 116 4"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </span>

            <span className="hero__badge-pill hero__badge-pill--inline" aria-label="Advanced Treatments">
              <span className="hero__badge-icon hero__badge-icon--check">
                <CheckIcon />
              </span>
              <span className="hero__badge-text">Advanced Treatments</span>
            </span>
          </span>
        </h1>

        {/* Sub-description */}
        <p className="hero__subtext">
          Experience gentle, personalised dental care designed to keep your
          smile healthy and radiant. From routine check-ups to advanced
          treatments, we&rsquo;re here to make every visit stress-free.
        </p>

        {/* CTA buttons */}
        <div className="hero__cta-group">
          <a href="/contact#Contactsection">
            <button
              className="btn btn--primary btn--lg"
              onClick={onBookConsultation}
              aria-label="Book a free consultation"
            >
              Book Consultation
            </button>
          </a>
          <a href="#cta">
            <button
              className="btn btn--secondary btn--lg"
              onClick={onSpeakExpert}
              aria-label="Speak to a smile expert"
            >
              <PhoneIcon />
              Speak to Expert
            </button>
          </a>
        </div>

        {/* Trust stats */}
        <div className="hero__trust-row" aria-label="Key practice statistics">
          <div className="hero__trust-item">
            <div className="hero__stars" aria-label="Rated 4.9 out of 5 stars">
              {[1, 2, 3, 4, 5].map((i) => (
                <StarIcon key={i} />
              ))}
              <span className="hero__stars-text">4.9 Rated</span>
            </div>
            <span className="hero__trust-label">Happy Patients</span>
          </div>
          <div className="hero__trust-divider" aria-hidden="true" />
          <div className="hero__trust-item">
            <span className="hero__trust-number">10K+</span>
            <span className="hero__trust-label">Smiles Treated</span>
          </div>
          <div className="hero__trust-divider" aria-hidden="true" />
          <div className="hero__trust-item">
            <span className="hero__trust-number">15+</span>
            <span className="hero__trust-label">Years Experience</span>
          </div>
        </div>
      </div>

      {/* ── TOOTH COLLAGE IMAGE STRIP — ref callback replaces useRef + useEffect ── */}
      <div className="hero__image-strip" ref={handleStripRef}>
        <div className="hero__pill-group hero__pill-group--left" aria-hidden="true">
          <span className="hero__pill hero__pill--professional">
            <span className="hero__pill-dot" />
            Professional Services
          </span>
        </div>

        <div className="hero__pill-group hero__pill-group--right" aria-hidden="true">
          <span className="hero__pill hero__pill--advanced">
            <span className="hero__pill-dot" />
            Advanced Treatments
          </span>
        </div>

        <img
          src={bgImage}
          alt="SmileCraft patients and dental team — tooth-shaped photo collage"
          className="hero__strip-img"
          draggable={false}
        />
      </div>
    </section>
  );
}