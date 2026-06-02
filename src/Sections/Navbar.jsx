import React from "react";
import "./Navbar.css";
import logodental from "../assets/logodental.png";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "treatments", label: "Treatments" },
  { id: "smile-stories", label: "Smile Stories" },
  { id: "technology", label: "Technology" },
  { id: "experts", label: "Experts" },
  { id: "reviews", label: "Reviews" },
];

// ════════════════════════════════════════════════════════════
// Header — Navbar
// ════════════════════════════════════════════════════════════
//
//  ALL React hooks removed. Replaced with:
//  - useState(menuOpen)  → plain JS flag + direct classList toggle
//  - useState(scrolled)  → plain JS flag + direct classList toggle
//  - useEffect(scroll)   → window scroll listener wired in ref callback
//
// ════════════════════════════════════════════════════════════

function Header() {
  // ── REPLACED: useState(menuOpen) → plain JS variable ──────
  //
  //  OLD:
  //    const [menuOpen, setMenuOpen] = useState(false);
  //    onClick={() => setMenuOpen(!menuOpen)}   // triggers re-render
  //    className={`mobile-menu ${menuOpen ? "show" : ""}`}
  //
  //  NEW: flip a flag and toggle the CSS class directly on the DOM nodes

  let menuOpen = false;

  // DOM node refs — populated by ref callbacks
  let mobileMenuEl = null;
  let mobileOverlayEl = null;
  let mobileToggleEl = null;

  function openMenu() {
    menuOpen = true;
    mobileMenuEl && mobileMenuEl.classList.add("show");
    mobileOverlayEl && mobileOverlayEl.classList.add("show");
    if (mobileToggleEl) mobileToggleEl.textContent = "✕";
  }

  function closeMenu() {
    menuOpen = false;
    mobileMenuEl && mobileMenuEl.classList.remove("show");
    mobileOverlayEl && mobileOverlayEl.classList.remove("show");
    if (mobileToggleEl) mobileToggleEl.textContent = "☰";
  }

  function toggleMenu() {
    menuOpen ? closeMenu() : openMenu();
  }

  // ── REPLACED: useState(scrolled) + useEffect → ref callback
  //
  //  OLD:
  //    const [scrolled, setScrolled] = useState(false);
  //    useEffect(() => {
  //      const onScroll = () => setScrolled(window.scrollY > 60);
  //      window.addEventListener("scroll", onScroll);
  //      return () => window.removeEventListener("scroll", onScroll);
  //    }, []);
  //    className={`header ${scrolled ? "scrolled" : ""}`}
  //    className={`header-merged ${scrolled ? "show" : ""}`}
  //
  //  NEW: scroll listener added in handleHeaderRef; toggles class directly

  let headerEl = null;
  let mergedEl = null;

  function onScroll() {
    const past = window.scrollY > 60;
    headerEl && headerEl.classList.toggle("scrolled", past);
    mergedEl && mergedEl.classList.toggle("show", past);
  }

  function handleHeaderRef(el) {
    if (!el) {
      window.removeEventListener("scroll", onScroll);
      return;
    }
    headerEl = el;
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // apply immediately in case page loads mid-scroll
  }

  // ── Smooth scroll — unchanged logic, just no setMenuOpen call ─
  function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
      const headerOffset = 100;
      const sectionPosition =
        section.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: sectionPosition, behavior: "smooth" });
    }
    closeMenu();
  }

  return (
    <>
      {/* ref callback replaces useRef + useEffect */}
      <header className="header" ref={handleHeaderRef}>
        {/* LEFT — Logo */}
        <div className="header-logo">
          <button
            className="logo-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img src={logodental} alt="SmileCraft logo" />
          </button>
        </div>

        {/* CENTER — Navigation */}
        <nav className="header-nav-pill">
          {navLinks.map((link) => (
            <button
              key={link.id}
              className="nav-link"
              onClick={() => scrollToSection(link.id)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* RIGHT — CTA */}
        <div className="header-join">
          <a href="#Contactsection" className="btn">
            Smile Checkup
          </a>
        </div>

        {/* MERGED PILL — ref callback instead of scrolled state */}
        <div
          className="header-merged"
          ref={(el) => {
            mergedEl = el;
          }}
        >
          <button
            className="merged-logo logo-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img src={logodental} alt="SmileCraft logo" />
          </button>

          <div className="merged-divider" />

          <nav className="merged-nav">
            {navLinks.map((link) => (
              <button
                key={link.id}
                className="nav-link"
                onClick={() => {
                  if (link.id === "home") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    scrollToSection(link.id);
                  }
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="merged-divider" />

          <a href="#Contactsection">
            <button className="btn merged-btn">Smile Checkup</button>
          </a>
        </div>

        {/* Mobile Toggle — ref callback to get node for icon swap */}
        <button
          className="mobile-toggle"
          ref={(el) => {
            mobileToggleEl = el;
          }}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </header>

      {/* Mobile Overlay — ref callback replaces menuOpen state */}
      <div
        className="mobile-overlay"
        ref={(el) => {
          mobileOverlayEl = el;
        }}
        onClick={closeMenu}
      />

      {/* Mobile Menu — ref callback replaces menuOpen state */}
      <div
        className="mobile-menu"
        ref={(el) => {
          mobileMenuEl = el;
        }}
      >
        {navLinks.map((link) => (
          <button
            key={link.id}
            className="nav-link"
            onClick={() => scrollToSection(link.id)}
          >
            {link.label}
          </button>
        ))}

        <a href="/contact#Contactsection">
          <button
            className="btn"
            style={{ marginTop: "1rem" }}
            onClick={closeMenu}
          >
            Smile Checkup
          </button>
        </a>
      </div>
    </>
  );
}

export default Header;
