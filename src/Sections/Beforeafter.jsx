import "./BeforeAfter.css";

import "./Beforeafter.css";
import onea from "../assets/onea.png";
import oneb from "../assets/oneb.png";
import alignersb from "../assets/5tb.png";
import alignersa from "../assets/5ta.png";
import implantsb from "../assets/4tb.png";
import implantsa from "../assets/4ta.png";
import whiteningb from "../assets/3tb.png";
import whiteninga from "../assets/3ta.png";
import Bracesb from "../assets/2tb.png";
import Bracesa from "../assets/2ta.png";
// ── Icons ──────────────────────────────────────────────────

const ArrowsIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M15 7l5 5-5 5M9 17l-5-5 5-5" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);

// ── Data ───────────────────────────────────────────────────

const categories = [
  { id: "makeover", label: "Smile Makeover" },
  { id: "braces", label: "Braces" },
  { id: "whitening", label: "Whitening" },
  { id: "implants", label: "Implants" },
  { id: "aligners", label: "Aligners" },
];

const slides = {
  makeover: {
    before:oneb,
    after: onea,
    label: "Smile Makeover",
  },
  braces: { before: Bracesb, after: Bracesa, label: "Braces" },
  whitening: {
    before: whiteningb,
    after: whiteninga,
    label: "Whitening",
  },
  implants: { before: implantsb, after: implantsa, label: "Implants" },
  aligners: { before:alignersb, after: alignersa, label: "Aligners" },
};

// ════════════════════════════════════════════════════════════
// DragSlider Component
// ════════════════════════════════════════════════════════════
//
//  ALL React hooks removed. Replaced with:
//  - Plain JS variables for state  (position, dragging, hinted)
//  - ref callbacks instead of useRef + useEffect
//  - Direct DOM manipulation instead of setState re-renders
//
// ════════════════════════════════════════════════════════════

function DragSlider({ before, after, label }) {
  // ── REPLACED: useState + useRef → plain JS variables ──────
  //
  //  OLD:
  //    const [position, setPosition] = useState(50);
  //    const [dragging, setDragging] = useState(false);
  //    const [hinted,   setHinted]   = useState(false);
  //    const containerRef            = useRef(null);
  //
  //  NEW: module-scope mutable object — one per slider instance
  //
  const state = {
    position: 50,
    dragging: false,
    hinted: false,
    hintTimer: null,
  };

  // DOM node refs (populated by ref callbacks below)
  let containerEl = null;
  let beforeWrapEl = null;
  let lineEl = null;
  let handleEl = null;

  // ── Helper: update DOM position directly ──────────────────
  function applyPosition(pct) {
    state.position = Math.min(100, Math.max(0, pct));
    const p = state.position + "%";
    if (beforeWrapEl) beforeWrapEl.style.width = p;
    if (lineEl) lineEl.style.left = p;
    if (handleEl) {
      handleEl.style.left = p;
      handleEl.setAttribute("aria-valuenow", Math.round(state.position));
    }
  }

  function calcFromClientX(clientX) {
    if (!containerEl) return;
    const rect = containerEl.getBoundingClientRect();
    applyPosition(((clientX - rect.left) / rect.width) * 100);
  }

  // ── REPLACED: useCallback drag handlers → plain functions ─
  //
  //  OLD:
  //    const onMouseMove = useCallback((e) => { if (dragging) calcPosition(e.clientX); }, [dragging, calcPosition]);
  //    const onMouseUp   = useCallback(()  => setDragging(false), []);
  //    ... etc
  //
  //  NEW: plain named functions, close over `state`

  function onMouseDown(e) {
    e.preventDefault();
    state.dragging = true;
    markHinted();
    containerEl && containerEl.classList.add("ba-slider--dragging");
  }

  function onMouseMove(e) {
    if (state.dragging) calcFromClientX(e.clientX);
  }

  function onMouseUp() {
    state.dragging = false;
    containerEl && containerEl.classList.remove("ba-slider--dragging");
  }

  function onTouchStart() {
    state.dragging = true;
    markHinted();
    containerEl && containerEl.classList.add("ba-slider--dragging");
  }

  function onTouchMove(e) {
    if (state.dragging) calcFromClientX(e.touches[0].clientX);
  }

  function onTouchEnd() {
    state.dragging = false;
    containerEl && containerEl.classList.remove("ba-slider--dragging");
  }

  function onKeyDown(e) {
    if (e.key === "ArrowLeft") applyPosition(state.position - 2);
    if (e.key === "ArrowRight") applyPosition(state.position + 2);
  }

  // ── REPLACED: hint useEffect → plain timer ───────────────
  //
  //  OLD:
  //    useEffect(() => {
  //      if (hinted) return;
  //      const t = setTimeout(() => setHinted(true), 1200);
  //      return () => clearTimeout(t);
  //    }, [hinted]);
  //
  //  NEW:

  function markHinted() {
    if (state.hinted) return;
    state.hinted = true;
    clearTimeout(state.hintTimer);
    handleEl && handleEl.classList.remove("ba-slider__handle--hint");
  }

  function scheduleHint() {
    state.hintTimer = setTimeout(markHinted, 1200);
  }

  // ── REPLACED: useEffect event listeners → ref callback ────
  //
  //  OLD:
  //    useEffect(() => {
  //      if (dragging) {
  //        window.addEventListener("mousemove", onMouseMove);
  //        window.addEventListener("mouseup",   onMouseUp);
  //        ...
  //      }
  //      return () => { window.removeEventListener(...) };
  //    }, [dragging, ...]);
  //
  //  NEW: attach global listeners once on mount via ref callback.
  //       `state.dragging` flag gates them internally.

  function handleContainerRef(el) {
    if (!el) {
      // Unmount — clean up global listeners
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      clearTimeout(state.hintTimer);
      return;
    }
    containerEl = el;
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    scheduleHint();
  }

  return (
    <div
      className={`ba-slider`}
      ref={handleContainerRef}
      aria-label={`Before and after comparison for ${label}`}
    >
      {/* After image — full-width base */}
      <img
        src={onea}
        alt={`After ${label} treatment`}
        className="ba-slider__img ba-slider__img--after"
        draggable={false}
      />

      {/* Before image — clipped */}
      <div
        className="ba-slider__before-wrap"
        ref={(el) => {
          beforeWrapEl = el;
        }}
        style={{ width: "50%" }}
      >
        <img
          src={oneb}
          alt={`Before ${label} treatment`}
          className="ba-slider__img ba-slider__img--before"
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="ba-slider__line"
        ref={(el) => {
          lineEl = el;
        }}
        style={{ left: "50%" }}
      />

      {/* Drag handle */}
      <div
        className="ba-slider__handle ba-slider__handle--hint"
        ref={(el) => {
          handleEl = el;
        }}
        style={{ left: "50%" }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onKeyDown={onKeyDown}
        role="slider"
        aria-valuenow={50}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Drag to compare before and after"
        tabIndex={0}
      >
        <ArrowsIcon />
      </div>

      <span
        className="ba-slider__label ba-slider__label--before"
        aria-hidden="true"
      >
        Before
      </span>
      <span
        className="ba-slider__label ba-slider__label--after"
        aria-hidden="true"
      >
        After
      </span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// BeforeAfterSection Component
// ════════════════════════════════════════════════════════════

export default function BeforeAfterSection({ onExplore }) {
  // ── REPLACED: useState → plain JS variable ───────────────
  //
  //  OLD:  const [activeTab, setActiveTab] = useState("makeover");
  //  NEW:

  let activeTab = "makeover";

  // Tab button DOM nodes (to toggle classes without re-render)
  let tabEls = [];

  // ── REPLACED: useEffect IntersectionObserver → ref callback

  function handleSectionRef(el) {
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("ba--visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
  }

  // ── Tab click — direct DOM swap, no setState ─────────────
  //
  //  OLD:
  //    <button onClick={() => setActiveTab(cat.id)}> ... </button>
  //    (React re-renders entire section + remounts DragSlider via key={activeTab})
  //
  //  NEW: swap active class on tabs + swap DragSlider src images directly.
  //  We keep key={activeTab} on DragSlider so React still remounts it on switch
  //  (that resets the slider position to 50%) — but the tab state is plain JS.

  // Slider container ref so we can swap images on tab switch
  let sliderWrapEl = null;

  function switchTab(newTab) {
    if (newTab === activeTab) return;
    activeTab = newTab;

    // Update tab button styles
    tabEls.forEach((btn) => {
      const isActive = btn.dataset.tab === newTab;
      btn.classList.toggle("ba__tab--active", isActive);
      btn.setAttribute("aria-selected", String(isActive));
    });

    // Re-render the slider by replacing innerHTML
    // (simplest way to remount DragSlider logic without React state)
    renderSlider();
  }

  // ── Render slider HTML + rebind DragSlider logic ──────────

  function renderSlider() {
    if (!sliderWrapEl) return;
    const data = slides[activeTab];

    // Create fresh slider DOM
    sliderWrapEl.innerHTML = `
      <div
        class="ba-slider"
        aria-label="Before and after comparison for ${data.label}"
      >
        <img
          src="${data.after}"
          alt="After ${data.label} treatment"
          class="ba-slider__img ba-slider__img--after"
          draggable="false"
        />
        <div class="ba-slider__before-wrap" style="width:50%">
          <img
            src="${data.before}"
            alt="Before ${data.label} treatment"
            class="ba-slider__img ba-slider__img--before"
            draggable="false"
          />
        </div>
        <div class="ba-slider__line" style="left:50%"></div>
        <div
          class="ba-slider__handle ba-slider__handle--hint"
          style="left:50%"
          role="slider"
          aria-valuenow="50"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="Drag to compare before and after"
          tabindex="0"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.2"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12h14M15 7l5 5-5 5M9 17l-5-5 5-5"/>
          </svg>
        </div>
        <span class="ba-slider__label ba-slider__label--before" aria-hidden="true">Before</span>
        <span class="ba-slider__label ba-slider__label--after"  aria-hidden="true">After</span>
      </div>
    `;

    // Wire up drag logic on the new DOM nodes
    initSliderLogic(sliderWrapEl.querySelector(".ba-slider"));
  }

  // ── Drag logic applied to a slider DOM node ───────────────

  function initSliderLogic(sliderEl) {
    const beforeWrap = sliderEl.querySelector(".ba-slider__before-wrap");
    const lineEl = sliderEl.querySelector(".ba-slider__line");
    const handleEl = sliderEl.querySelector(".ba-slider__handle");

    let position = 50;
    let dragging = false;
    let hinted = false;
    let hintTimer = null;

    function applyPosition(pct) {
      position = Math.min(100, Math.max(0, pct));
      const p = position + "%";
      beforeWrap.style.width = p;
      lineEl.style.left = p;
      handleEl.style.left = p;
      handleEl.setAttribute("aria-valuenow", Math.round(position));
    }

    function calcFromClientX(clientX) {
      const rect = sliderEl.getBoundingClientRect();
      applyPosition(((clientX - rect.left) / rect.width) * 100);
    }

    function markHinted() {
      if (hinted) return;
      hinted = true;
      clearTimeout(hintTimer);
      handleEl.classList.remove("ba-slider__handle--hint");
    }

    function onMouseDown(e) {
      e.preventDefault();
      dragging = true;
      markHinted();
      sliderEl.classList.add("ba-slider--dragging");
    }
    function onMouseMove(e) {
      if (dragging) calcFromClientX(e.clientX);
    }
    function onMouseUp() {
      dragging = false;
      sliderEl.classList.remove("ba-slider--dragging");
    }
    function onTouchStart() {
      dragging = true;
      markHinted();
      sliderEl.classList.add("ba-slider--dragging");
    }
    function onTouchMove(e) {
      if (dragging) calcFromClientX(e.touches[0].clientX);
    }
    function onTouchEnd() {
      dragging = false;
      sliderEl.classList.remove("ba-slider--dragging");
    }
    function onKeyDown(e) {
      if (e.key === "ArrowLeft") applyPosition(position - 2);
      if (e.key === "ArrowRight") applyPosition(position + 2);
    }

    handleEl.addEventListener("mousedown", onMouseDown);
    handleEl.addEventListener("touchstart", onTouchStart, { passive: true });
    handleEl.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    hintTimer = setTimeout(markHinted, 1200);
  }

  // ── sliderWrap ref callback — init slider on first render ─

  function handleSliderWrapRef(el) {
    if (!el) return;
    sliderWrapEl = el;
    renderSlider();
  }

  // ── tabList ref callback — collect tab button nodes ───────

  function handleTabListRef(el) {
    if (!el) return;
    tabEls = Array.from(el.querySelectorAll(".ba__tab"));
  }

  return (
    <section
      id="smile-stories"
      className="ba"
      ref={handleSectionRef}
      aria-label="Before and After Smile Transformations"
    >
      <div className="ba__bg-blob" aria-hidden="true" />

      {/* HEADER */}
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

      {/* TABS */}
      <div
        className="ba__tabs"
        role="tablist"
        aria-label="Treatment categories"
        ref={handleTabListRef}
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`ba__tab ${cat.id === "makeover" ? "ba__tab--active" : ""}`}
            role="tab"
            aria-selected={cat.id === "makeover"}
            data-tab={cat.id}
            onClick={() => switchTab(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* SLIDER — managed by imperative DOM via ref callback */}
      <div className="ba__slider-wrap" ref={handleSliderWrapRef} />

      {/* FOOTER */}
      <div className="ba__footer">
        <div className="ba__footer-text">
          <h3 className="ba__footer-heading">Precision Meets Confidence</h3>
          <p className="ba__footer-body">
            From subtle corrections to complete transformations — we create
            smiles that feel natural, healthy, and confident.
          </p>
        </div>
        <a href="#reviews">
          <button
            className="btn btn--primary ba__cta"
            onClick={onExplore}
            aria-label="Explore more smile stories"
          >
            Explore More Smile Stories
            <ArrowRightIcon />
          </button>
        </a>
      </div>
    </section>
  );
}
