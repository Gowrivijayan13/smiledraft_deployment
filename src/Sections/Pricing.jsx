import React from "react";
import "./Pricing.css";

// ─── Treatment Data ───────────────────────────────────────────
const TREATMENTS = [
  {
    id: 1,
    name: "Teeth Cleaning",
    tagline: "Preventive Care",
    price: "₹999",
    featured: false,
    badge: null,
  },
  {
    id: 2,
    name: "Root Canal Treatment",
    tagline: "Restorative · Pain Relief",
    price: "₹3,999",
    featured: false,
    badge: null,
  },
  {
    id: 3,
    name: "Teeth Whitening",
    tagline: "Cosmetic · Instant Radiance",
    price: "₹4,999",
    featured: false,
    badge: null,
  },
  {
    id: 4,
    name: "Braces & Aligners",
    tagline: "Orthodontic · Smile Alignment",
    price: "₹29,999",
    featured: true,
    badge: "✦ Most Popular",
  },
  {
    id: 5,
    name: "Dental Implants",
    tagline: "Permanent · Natural Feel",
    price: "₹24,999",
    featured: false,
    badge: null,
  },
  {
    id: 6,
    name: "Smile Makeover",
    tagline: "Comprehensive · Transformative",
    price: "Custom",
    featured: false,
    badge: null,
  },
  {
    id: 7,
    name: "Kids Dentistry",
    tagline: "Preventive · Gentle Care",
    price: "₹799",
    featured: false,
    badge: null,
  },
  {
    id: 8,
    name: "Tooth Extraction",
    tagline: "Relief · Stress-Free",
    price: "₹1,499",
    featured: false,
    badge: null,
  },
];

// ─── Format index as zero-padded string ──────────────────────
const formatIndex = (n) => String(n).padStart(2, "0");

// ─── Single Treatment Row ─────────────────────────────────────
const PriceRow = ({ treatment }) => {
  const { id, name, tagline, price, featured, badge } = treatment;

  return (
    <li className={`prow${featured ? " prow--featured" : ""}`}>
      <span className="prow__index" aria-hidden="true">
        {formatIndex(id)}
      </span>
      <div className="prow__info">
        <span className="prow__name">{name}</span>
        <span className="prow__tagline">{tagline}</span>
      </div>
      <div className="prow__price-wrap">
        <span className="prow__from">From</span>
        <span className="prow__price" aria-label={`Starting from ${price}`}>
          {price}
        </span>
        {badge && <span className="prow__badge">{badge}</span>}
      </div>
    </li>
  );
};

// ─── Gold Rule Divider ────────────────────────────────────────
const GoldRule = () => (
  <div className="pricing__gold-rule" aria-hidden="true">
    <div className="pricing__gold-rule-dot" />
  </div>
);


// ════════════════════════════════════════════════════════════
// Pricing — Main Section
// ════════════════════════════════════════════════════════════
//
//  ALL React hooks removed. Replaced with:
//  - ref callbacks instead of useRef + useEffect
//  - IntersectionObserver wired directly inside ref callbacks
//  - No useState needed (component has no interactive state)
//
// ════════════════════════════════════════════════════════════

const Pricing = () => {

  // ── REPLACED: useRef + useEffect → ref callbacks ──────────
  //
  //  OLD:
  //    const sectionRef  = useRef(null);
  //    const sidebarRef  = useRef(null);
  //    const ctaStripRef = useRef(null);
  //
  //    useEffect(() => {
  //      const targets = [
  //        sidebarRef.current,
  //        ctaStripRef.current,
  //        ...(sectionRef.current?.querySelectorAll(".prow") ?? []),
  //      ].filter(Boolean);
  //      const observer = new IntersectionObserver((entries) => {
  //        entries.forEach((entry) => {
  //          if (entry.isIntersecting) {
  //            entry.target.classList.add("in-view");
  //            observer.unobserve(entry.target);
  //          }
  //        });
  //      }, { threshold: 0.12 });
  //      targets.forEach((el) => observer.observe(el));
  //      return () => observer.disconnect();
  //    }, []);
  //
  //  NEW: one shared observer created once, targets registered
  //  as each ref callback fires. Pattern mirrors BeforeAfter's
  //  handleSectionRef / handleTabListRef / handleSliderWrapRef.

  // Shared observer — created lazily on first ref callback
  let observer = null;

  function getObserver() {
    if (observer) return observer;
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    return observer;
  }

  // ── Sidebar ref callback ───────────────────────────────────
  //
  //  OLD: ref={sidebarRef}  (populated by React, read in useEffect)
  //  NEW: ref={handleSidebarRef} (wires observer immediately on mount)

  function handleSidebarRef(el) {
    if (!el) return;
    getObserver().observe(el);
  }

  // ── CTA strip ref callback ─────────────────────────────────
  //
  //  OLD: ref={ctaStripRef}
  //  NEW: ref={handleCtaStripRef}

  function handleCtaStripRef(el) {
    if (!el) return;
    getObserver().observe(el);
  }

  // ── Section ref callback — observes all .prow rows ─────────
  //
  //  OLD: ref={sectionRef}  then querySelectorAll(".prow") inside useEffect
  //  NEW: ref={handleSectionRef} — querySelectorAll runs right here

  function handleSectionRef(el) {
    if (!el) return;
    el.querySelectorAll(".prow").forEach((row) => getObserver().observe(row));
    el._pricingObserver = getObserver(); // store for potential cleanup
  }

  return (
    <section className="pricing" id="pricing" ref={handleSectionRef}>
      <div className="pricing__inner">
        <div className="pricing__layout">

          {/* ── Left Sidebar ── */}
          <aside className="pricing__sidebar" ref={handleSidebarRef}>
            <p className="pricing__eyebrow">Treatment Plans</p>

            <h2 className="pricing__title">
              Transparent Care,
              <br />
              <span className="italic">Honest</span> Pricing
            </h2>

            <p className="pricing__desc">
              No hidden fees, no surprises. Every treatment listed at its
              starting price — your final plan is crafted just for you.
            </p>

            <GoldRule />

            <p className="pricing__disclaimer">
              Final treatment cost may vary after consultation. We always
              provide a clear breakdown before any procedure begins.
            </p>

            <a href="#Contactsection" className="btn btn--accent">
              Get Free Estimate
            </a>
          </aside>

          {/* ── Right: Menu List ── */}
          <div>
            <ul className="pricing__menu" role="list">
              {TREATMENTS.map((t) => (
                <PriceRow key={t.id} treatment={t} />
              ))}
            </ul>

            {/* CTA Strip */}
            <div className="pricing__cta-strip" ref={handleCtaStripRef}>
              <p className="pricing__cta-note">
                Not sure which treatment suits you?{" "}
                <strong>
                  Our specialists will guide you every step of the way.
                </strong>
              </p>
              <div className="pricing__cta-buttons">
                <a href="#Contactsection" className="btn btn--accent">
                  Book Consultation
                </a>
                <a href="#Contactsection" className="btn btn--inverse">
                  Call Us
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Pricing;