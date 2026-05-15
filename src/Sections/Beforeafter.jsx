import { useEffect, useRef, useState, useCallback } from "react";
import "./Beforeafter.css";
import onea from "../assets/onea.png";
import oneb from "../assets/oneb.png";

// ── Icons ──────────────────────────────────────────────────

const ArrowsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M15 7l5 5-5 5M9 17l-5-5 5-5" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24"
    fill="currentColor" aria-hidden="true">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none"
    stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);

// ── Categories ─────────────────────────────────────────────

const categories = [
  { id: "makeover",  label: "Smile Makeover" },
  { id: "braces",    label: "Braces"         },
  { id: "whitening", label: "Whitening"      },
  { id: "implants",  label: "Implants"       },
  { id: "aligners",  label: "Aligners"       },
];

// ── Slide data (replace image paths with your real images) ─

const slides = {
  makeover:  { before: {oneb},  after: {onea},  label: "Smile Makeover"  },
  braces:    { before: "/images/ba/braces-before.jpg",    after: "/images/ba/braces-after.jpg",    label: "Braces"          },
  whitening: { before: "/images/ba/whitening-before.jpg", after: "/images/ba/whitening-after.jpg", label: "Whitening"       },
  implants:  { before: "/images/ba/implants-before.jpg",  after: "/images/ba/implants-after.jpg",  label: "Implants"        },
  aligners:  { before: "/images/ba/aligners-before.jpg",  after: "/images/ba/aligners-after.jpg",  label: "Aligners"        },
};


// ── Drag Slider Component ──────────────────────────────────

function DragSlider({ before, after, label }) {
  const [position, setPosition]     = useState(50); // % from left
  const [dragging, setDragging]     = useState(false);
  const [hinted,   setHinted]       = useState(false);
  const containerRef                = useRef(null);

  // Calculate position from pointer/touch X
  const calcPosition = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x   = clientX - rect.left;
    const pct = Math.min(100, Math.max(0, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  // Mouse events
  const onMouseDown = (e) => { e.preventDefault(); setDragging(true); setHinted(true); };
  const onMouseMove = useCallback((e) => { if (dragging) calcPosition(e.clientX); }, [dragging, calcPosition]);
  const onMouseUp   = useCallback(()  => setDragging(false), []);

  // Touch events
  const onTouchStart = () => { setDragging(true); setHinted(true); };
  const onTouchMove  = useCallback((e) => { if (dragging) calcPosition(e.touches[0].clientX); }, [dragging, calcPosition]);
  const onTouchEnd   = useCallback(()  => setDragging(false), []);

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup",   onMouseUp);
      window.addEventListener("touchmove", onTouchMove, { passive: true });
      window.addEventListener("touchend",  onTouchEnd);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup",   onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend",  onTouchEnd);
    };
  }, [dragging, onMouseMove, onMouseUp, onTouchMove, onTouchEnd]);

  // Hint animation — nudge handle after 1s if user hasn't dragged
  useEffect(() => {
    if (hinted) return;
    const t = setTimeout(() => setHinted(true), 1200);
    return () => clearTimeout(t);
  }, [hinted]);

  return (
    <div
      className={`ba-slider ${dragging ? "ba-slider--dragging" : ""}`}
      ref={containerRef}
      aria-label={`Before and after comparison for ${label}`}
    >
      {/* AFTER image — full width base */}
      <img
        src={onea}
        alt={`After ${label} treatment`}
        className="ba-slider__img ba-slider__img--after"
        draggable={false}
      />

      {/* BEFORE image — clipped by position */}
      <div
        className="ba-slider__before-wrap"
        style={{ width: `${position}%` }}
      >
        <img
          src={oneb}
          alt={`Before ${label} treatment`}
          className="ba-slider__img ba-slider__img--before"
          draggable={false}
        />
      </div>

      {/* Drag line */}
      <div
        className="ba-slider__line"
        style={{ left: `${position}%` }}
      />

      {/* Drag handle */}
      <div
        className={`ba-slider__handle ${!hinted ? "ba-slider__handle--hint" : ""}`}
        style={{ left: `${position}%` }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        role="slider"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Drag to compare before and after"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft")  setPosition(p => Math.max(0,   p - 2));
          if (e.key === "ArrowRight") setPosition(p => Math.min(100, p + 2));
        }}
      >
        <ArrowsIcon />
      </div>

      {/* Before / After labels */}
      <span className="ba-slider__label ba-slider__label--before" aria-hidden="true">Before</span>
      <span className="ba-slider__label ba-slider__label--after"  aria-hidden="true">After</span>
    </div>
  );
}


// ── Main Section ───────────────────────────────────────────

export default function BeforeAfterSection({ onExplore }) {
  const [activeTab, setActiveTab]   = useState("makeover");
  const sectionRef                  = useRef(null);

  // Scroll reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("ba--visible"); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const current = slides[activeTab];

  return (
    <section
     id="smile-stories"
      className="ba"
      ref={sectionRef}
      aria-label="Before and After Smile Transformations"
    >
      {/* Background accents */}
      <div className="ba__bg-blob" aria-hidden="true" />

      {/* ── HEADER ── */}
      <div className="ba__header">
        <p className="ba__eyebrow">Real Smiles. Real Transformations.</p>
        <h2 className="ba__heading">
          See the Difference{" "}
          <span className="ba__heading-accent">Care Can Make</span>
        </h2>
        <div className="ba__gold-line" aria-hidden="true" />
        <p className="ba__subtext">
          Every smile has a story — and every transformation starts with trust.
        </p>
      </div>

      {/* ── CATEGORY TABS ── */}
      <div className="ba__tabs" role="tablist" aria-label="Treatment categories">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`ba__tab ${activeTab === cat.id ? "ba__tab--active" : ""}`}
            role="tab"
            aria-selected={activeTab === cat.id}
            onClick={() => setActiveTab(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ── SLIDER ── */}
      <div className="ba__slider-wrap">
        <DragSlider
          key={activeTab}           /* remount on tab change to reset position */
          before={current.before}
          after={current.after}
          label={current.label}
        />
      </div>

      {/* ── FOOTER CONTENT ── */}
      <div className="ba__footer">
        <div className="ba__footer-text">
          <h3 className="ba__footer-heading">Precision Meets Confidence</h3>
          <p className="ba__footer-body">
            From subtle corrections to complete transformations — we create smiles
            that feel natural, healthy, and confident.
          </p>
        </div>
        <a href="#reviews">
        <button
          className="btn btn--primary ba__cta"
          onClick={onExplore}
          aria-label="Explore more smile stories"
        >
          
          Explore More Smile Stories
          
        </button>
        </a>
      </div>

    </section>
  );
}