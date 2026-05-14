import { useEffect, useRef } from "react";
import "./About.css";
import aboutimg from "../assets/aboutimg.png";

// ── Icons ──────────────────────────────────────────────────

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none"
    stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24"
    fill="currentColor" aria-hidden="true">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
);

// ── Key highlights shown in the left content block ─────────
const highlights = [
  "No rushed appointments or unnecessary treatments",
  "Modern technology for comfortable, accurate care",
  "Transparent plans with honest recommendations",
];

// ── Small stat cards floating over the image (right side) ──
const stats = [
  { number: "10K+", label: "Smiles Transformed" },
  { number: "15+",  label: "Years of Experience" },
  { number: "4.9★", label: "Patient Satisfaction" },
];


// ── Main Component ─────────────────────────────────────────

export default function AboutSection({ onLearnMore }) {

  // Fade-up on scroll using IntersectionObserver
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("about--visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="about"
      ref={sectionRef}
      aria-label="About SmileCraft Dental Studio"
    >
      {/* Subtle background decoration */}
      <div className="about__bg-circle" aria-hidden="true" />

      <div className="about__inner">

        {/* ── LEFT — Text Content ── */}
        <div className="about__content">

          {/* Eyebrow */}
          <p className="about__eyebrow">
            <SparkleIcon />
            Dentistry That Feels Different
          </p>

          {/* Heading */}
          <h2 className="about__heading">
            A Better Experience Starts With{" "}
            <span className="about__heading-accent">Better Care</span>
          </h2>

          {/* Gold divider line */}
          <div className="about__gold-line" aria-hidden="true" />

          {/* Body paragraphs */}
          <p className="about__body">
            We believe visiting a dental clinic should feel calm, comfortable,
            and reassuring — not stressful or rushed.
          </p>

          <p className="about__body">
            Whether it's preventive care or a complete smile makeover, our team
            is dedicated to making every visit easy and stress-free, with
            technology and compassion working hand in hand.
          </p>

          {/* Highlight checklist */}
          <ul className="about__highlights" aria-label="What makes us different">
            {highlights.map((item, i) => (
              <li key={i} className="about__highlight-item">
                <span className="about__highlight-icon" aria-hidden="true">
                  <CheckIcon />
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* Tagline */}
          <p className="about__tagline">
            Gentle Hands.&nbsp; Honest Care.&nbsp; Beautiful Results.
          </p>

          {/* CTA */}
          <button
            className="btn btn--primary about__cta"
            onClick={onLearnMore}
            aria-label="Learn more about SmileCraft"
          >
            Discover Our Story
           
          </button>

        </div>

        {/* ── RIGHT — Visual / Image ── */}
        <div className="about__visual">

          {/* Main clinic image placeholder — replace src with real image */}
          <div className="about__img-wrap">
            <img
              src={aboutimg}
              alt="SmileCraft dental clinic interior — calm, modern, welcoming"
              className="about__img"
              loading="lazy"
            />

            {/* Gold frame accent */}
            <div className="about__img-frame" aria-hidden="true" />
          </div>

          {/* Floating stat cards */}
          <div className="about__stats" aria-label="Practice highlights">
            {stats.map((s, i) => (
              <div key={i} className="about__stat-card">
                <span className="about__stat-number">{s.number}</span>
                <span className="about__stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Small floating badge — bottom left of image */}
          <div className="about__badge" aria-label="Fear-free dental care">
            <span className="about__badge-dot" aria-hidden="true" />
            Fear-Free Dental Care
          </div>

        </div>

      </div>
    </section>
  );
}