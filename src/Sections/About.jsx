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

// ── Data ───────────────────────────────────────────────────

const highlights = [
  "No rushed appointments or unnecessary treatments",
  "Modern technology for comfortable, accurate care",
  "Transparent plans with honest recommendations",
];

const stats = [
  { number: "10K+", label: "Smiles Transformed" },
  { number: "15+",  label: "Years of Experience" },
  { number: "4.9★", label: "Patient Satisfaction" },
];

// ── Main Component ─────────────────────────────────────────

export default function AboutSection({ onLearnMore }) {

  // ── REPLACED: useRef + useEffect with IntersectionObserver ──
  //
  //  OLD (React):
  //    const sectionRef = useRef(null);
  //    useEffect(() => {
  //      const el = sectionRef.current;
  //      const observer = new IntersectionObserver(([entry]) => {
  //        if (entry.isIntersecting) { el.classList.add("about--visible"); observer.disconnect(); }
  //      }, { threshold: 0.15 });
  //      observer.observe(el);
  //      return () => observer.disconnect();
  //    }, []);
  //
  //  NEW (plain JS — runs once when the component mounts via ref callback):
  function handleSectionRef(el) {
    if (!el) return;                                      // unmount guard
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
  }
  // ────────────────────────────────────────────────────────────

  return (
    <section
      id="abt"
      className="about"
      ref={handleSectionRef}         
      aria-label="About SmileCraft Dental Studio"
    >
      <div className="about__bg-circle" aria-hidden="true" />

      <div className="about__inner">

        {/* LEFT — Text Content */}
        <div className="about__content">

          <p className="about__eyebrow">
            <SparkleIcon />
            Dentistry That Feels Different
          </p>

          <h2 className="about__heading">
            A Better Experience Starts With{" "}
            <span className="about__heading-accent">Better Care</span>
          </h2>

          <div className="about__gold-line" aria-hidden="true" />

          <p className="about__body">
            We believe visiting a dental clinic should feel calm, comfortable,
            and reassuring — not stressful or rushed.
          </p>

          <p className="about__body">
            Whether it's preventive care or a complete smile makeover, our team
            is dedicated to making every visit easy and stress-free, with
            technology and compassion working hand in hand.
          </p>

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

          <p className="about__tagline">
            Gentle Hands.&nbsp; Honest Care.&nbsp; Beautiful Results.
          </p>

          <a href="#Contactsection">
            <button
              className="btn btn--primary about__cta"
              onClick={onLearnMore}
              aria-label="Learn more about SmileCraft"
            >
              Discover Our Story
              <ArrowRightIcon />
            </button>
          </a>

        </div>

        {/* RIGHT — Visual */}
        <div className="about__visual">

          <div className="about__img-wrap">
            <img
              src={aboutimg}
              alt="SmileCraft dental clinic interior — calm, modern, welcoming"
              className="about__img"
              loading="lazy"
            />
            <div className="about__img-frame" aria-hidden="true" />
          </div>

          <div className="about__stats" aria-label="Practice highlights">
            {stats.map((s, i) => (
              <div key={i} className="about__stat-card">
                <span className="about__stat-number">{s.number}</span>
                <span className="about__stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="about__badge" aria-label="Fear-free dental care">
            <span className="about__badge-dot" aria-hidden="true" />
            Fear-Free Dental Care
          </div>

        </div>

      </div>
    </section>
  );
}