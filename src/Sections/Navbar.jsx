import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
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

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth scroll function
  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      const headerOffset = 100; // adjust to navbar height
      const sectionPosition =
        section.getBoundingClientRect().top + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: sectionPosition,
        behavior: "smooth",
      });
    }

    setMenuOpen(false);
  };

  return (
    <>
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        {/* LEFT — Logo */}
        <div className="header-logo">
  <button
    className="logo-btn"
    onClick={() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }}
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
          <a href="/contact#Contactsection" className="btn">
            Book Consultation
          </a>
        </div>

      {/* MERGED PILL */}
<div className={`header-merged ${scrolled ? "show" : ""}`}>
  <button
    className="merged-logo logo-btn"
    onClick={() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }}
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
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
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

  <a href="/contact#Contactsection">
    <button className="btn merged-btn">
      Book Consultation
    </button>
  </a>
</div>
        {/* Mobile Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </header>

      {/* Mobile Overlay */}
      <div
        className={`mobile-overlay ${menuOpen ? "show" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>
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
            onClick={() => setMenuOpen(false)}
          >
            Book Consultation
          </button>
        </a>
      </div>
    </>
  );
}

export default Header;
