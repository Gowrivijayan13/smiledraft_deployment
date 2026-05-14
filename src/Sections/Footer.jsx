import "./Footer.css";
import logodental from "../assets/logodental(1).png";
const navLinks = [
  { label: "Home", href: "#" },
  { label: "Treatments", href: "#treatments" },
  { label: "Smile Stories", href: "#before-after" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const treatments = [
  { label: "Teeth Cleaning", href: "#treatments" },
  { label: "Root Canal Treatment", href: "#treatments" },
  { label: "Teeth Whitening", href: "#treatments" },
  { label: "Braces & Aligners", href: "#treatments" },
  { label: "Dental Implants", href: "#treatments" },
  { label: "Smile Makeover", href: "#treatments" },
  { label: "Kids Dentistry", href: "#treatments" },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    name: "Google Reviews",
    href: "#",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="footer" id="footer">

      {/* ── Ambient glow layer ── */}
      <div className="footer-glow" aria-hidden="true" />

      {/* ── Centered brand block ── */}
      <div className="footer-brand-center">

        {/* ── Logo image — replace src with your actual logo path ── */}
        <div className="footer-emblem">
          <img src={logodental} alt="SmileCraft Dental Studio" className="footer-emblem__img" />
        </div>

        <a href="#" className="footer-logo">
         
          <span className="footer-logo__text">&nbsp;Where Every Visit Ends With a Smile&nbsp;</span>
        </a>

        <p className="footer-tagline">Crafting Smiles, Creating Confidence.</p>

        <p className="footer-desc">
          Modern dentistry designed around comfort, care, and confidence —
          because every smile deserves something exceptional.
        </p>

        {/* Rating + social row */}
        <div className="footer-meta-row">
          <div className="footer-badge">
            <div className="footer-badge__stars">{"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}</div>
            <span className="footer-badge__text">4.9 · 10,000+ Smiles</span>
          </div>

          <div className="footer-social">
            {socialLinks.map((s) => (
              <a key={s.name} href={s.href} className="footer-social__link" aria-label={s.name}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Full-width gold hairline ── */}
      <div className="footer-separator" aria-hidden="true" />

      {/* ── Horizontal links block ── */}
      <div className="footer-links-block">

        {/* Quick Links */}
        <div className="footer-links-row-wrap">
          <span className="footer-links-label">Quick Links</span>
          <span className="footer-links-rule" aria-hidden="true" />
          <ul className="footer-links-row">
            {navLinks.map((l, i) => (
              <li key={l.label} className="footer-links-row__item">
                <a href={l.href} className="footer-row-link">{l.label}</a>
                {i < navLinks.length - 1 && <span className="footer-dot" aria-hidden="true">·</span>}
              </li>
            ))}
          </ul>
        </div>

        {/* Treatments */}
        <div className="footer-links-row-wrap">
          <span className="footer-links-label">Treatments</span>
          <span className="footer-links-rule" aria-hidden="true" />
          <ul className="footer-links-row">
            {treatments.map((t, i) => (
              <li key={t.label} className="footer-links-row__item">
                <a href={t.href} className="footer-row-link">{t.label}</a>
                {i < treatments.length - 1 && <span className="footer-dot" aria-hidden="true">·</span>}
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* ── Divider with tooth icon ── */}
      <div className="footer-divider-wrap">
        <div className="footer-divider-line" />
        <div className="footer-divider-tooth" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C6.5 2 3 7 3 12c0 3.5 1.5 6 3 8.5.5.8 1.5 1.5 3 1.5.8 0 1.5-.3 2-.5.5-.2 1-.5 1-.5s.5.3 1 .5c.5.2 1.2.5 2 .5 1.5 0 2.5-.7 3-1.5C20 18 21 15.5 21 12c0-5-3.5-10-9-10z"/>
          </svg>
        </div>
        <div className="footer-divider-line" />
      </div>

      {/* ── Bottom bar — centered copyright + tagline ── */}
      <div className="footer-bottom">
        <p className="footer-copyright">© 2026 SmileCraft Dental Studio. All Rights Reserved.</p>
    
      </div>

    </footer>
  );
}