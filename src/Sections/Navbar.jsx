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
        section.getBoundingClientRect().top +
        window.pageYOffset -
        headerOffset;

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
            onClick={() => scrollToSection("home")}
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
          <Link to="/contact">
            <button className="btn">
              Book Consultation
            </button>
          </Link>
        </div>

        {/* MERGED PILL */}
        <div className={`header-merged ${scrolled ? "show" : ""}`}>
          <button
            className="merged-logo logo-btn"
            onClick={() => scrollToSection("home")}
          >
            <img src={logodental} alt="SmileCraft logo" />
          </button>

          <div className="merged-divider" />

          <nav className="merged-nav">
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

          <div className="merged-divider" />

          <Link to="/contact">
            <button className="btn merged-btn">
              Book Consultation
            </button>
          </Link>
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

        <Link to="/contact">
          <button
            className="btn"
            style={{ marginTop: "1rem" }}
            onClick={() => setMenuOpen(false)}
          >
            Book Consultation
          </button>
        </Link>
      </div>
    </>
  );
}

export default Header;