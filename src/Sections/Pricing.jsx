
import React, { useEffect, useRef } from 'react';
import './Pricing.css';

// ─── Treatment Data ───────────────────────────────────────────
const TREATMENTS = [
  {
    id: 1,
    name: 'Teeth Cleaning',
    tagline: 'Preventive Care',
    price: '₹999',
    featured: false,
    badge: null,
  },
  {
    id: 2,
    name: 'Root Canal Treatment',
    tagline: 'Restorative · Pain Relief',
    price: '₹3,999',
    featured: false,
    badge: null,
  },
  {
    id: 3,
    name: 'Teeth Whitening',
    tagline: 'Cosmetic · Instant Radiance',
    price: '₹4,999',
    featured: false,
    badge: null,
  },
  {
    id: 4,
    name: 'Braces & Aligners',
    tagline: 'Orthodontic · Smile Alignment',
    price: '₹29,999',
    featured: true,
    badge: '✦ Most Popular',
  },
  {
    id: 5,
    name: 'Dental Implants',
    tagline: 'Permanent · Natural Feel',
    price: '₹24,999',
    featured: false,
    badge: null,
  },
  {
    id: 6,
    name: 'Smile Makeover',
    tagline: 'Comprehensive · Transformative',
    price: 'Custom',
    featured: false,
    badge: null,
  },
  {
    id: 7,
    name: 'Kids Dentistry',
    tagline: 'Preventive · Gentle Care',
    price: '₹799',
    featured: false,
    badge: null,
  },
  {
    id: 8,
    name: 'Tooth Extraction',
    tagline: 'Relief · Stress-Free',
    price: '₹1,499',
    featured: false,
    badge: null,
  },
];

// ─── Format index as zero-padded string ──────────────────────
const formatIndex = (n) => String(n).padStart(2, '0');

// ─── Single Treatment Row ─────────────────────────────────────
const PriceRow = ({ treatment }) => {
  const { id, name, tagline, price, featured, badge } = treatment;

  return (
    <li className={`prow${featured ? ' prow--featured' : ''}`}>
      {/* Index */}
      <span className="prow__index" aria-hidden="true">
        {formatIndex(id)}
      </span>

      {/* Info */}
      <div className="prow__info">
        <span className="prow__name">{name}</span>
        <span className="prow__tagline">{tagline}</span>
      </div>

      {/* Price */}
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

// ─── Main Pricing Section ─────────────────────────────────────
const Pricing = () => {
  const sectionRef   = useRef(null);
  const sidebarRef   = useRef(null);
  const ctaStripRef  = useRef(null);

  useEffect(() => {
    const targets = [
      sidebarRef.current,
      ctaStripRef.current,
      ...(sectionRef.current?.querySelectorAll('.prow') ?? []),
    ].filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="pricing" id="pricing" ref={sectionRef}>
      <div className="pricing__inner">
        <div className="pricing__layout">

          {/* ── Left Sidebar ── */}
          <aside className="pricing__sidebar" ref={sidebarRef}>
            <p className="pricing__eyebrow">Treatment Plans</p>

            <h2 className="pricing__title">
              Transparent Care,<br />
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

            <a href="#contact" className="btn btn--accent">
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
            <div className="pricing__cta-strip" ref={ctaStripRef}>
              <p className="pricing__cta-note">
                Not sure which treatment suits you?{' '}
                <strong>Our specialists will guide you every step of the way.</strong>
              </p>
              <div className="pricing__cta-buttons">
                <a href="#contact" className="btn btn--accent">
                   Book Consultation
                </a>
                <a href="tel:+919876543210" className="btn btn--inverse">
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