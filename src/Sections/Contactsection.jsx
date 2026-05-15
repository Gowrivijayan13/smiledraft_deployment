import { useState, useEffect } from "react";
import "./Contactsection.css";

// ─── AUTO_CLOSE duration (ms) ─────────────────────────────────
const AUTO_CLOSE_MS = 5000;

// ─── Booking Confirmation Modal ───────────────────────────────
const BookingModal = ({ isOpen, onClose }) => {
  const [secondsLeft, setSecondsLeft] = useState(AUTO_CLOSE_MS / 1000);

  useEffect(() => {
    if (!isOpen) return;

    setSecondsLeft(AUTO_CLOSE_MS / 1000);

    const closeTimer = setTimeout(() => {
      onClose();
    }, AUTO_CLOSE_MS);

    const countdownTicker = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTicker);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(closeTimer);
      clearInterval(countdownTicker);
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="booking-overlay booking-overlay--visible"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="booking-modal">

        {/* Gold progress bar */}
        <div className="booking-modal__progress-track">
          <div
            className="booking-modal__progress-bar"
            style={{ animationDuration: `${AUTO_CLOSE_MS}ms` }}
          />
        </div>

        {/* Close button with countdown */}
        <button className="booking-modal__close" onClick={onClose} aria-label="Close">
          <span className="booking-modal__close-count">{secondsLeft}</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Animated checkmark */}
        <div className="booking-modal__icon-wrap">
          <svg className="booking-modal__check" viewBox="0 0 52 52" fill="none">
            <circle className="booking-modal__check-circle" cx="26" cy="26" r="24"
              stroke="url(#checkGold)" strokeWidth="2.5" fill="none"/>
            <polyline className="booking-modal__check-tick" points="14,27 22,35 38,18"
              stroke="url(#checkGold)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <defs>
              <linearGradient id="checkGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4B06A"/>
                <stop offset="100%" stopColor="#F0D080"/>
              </linearGradient>
            </defs>
          </svg>
          <div className="booking-modal__icon-glow" />
        </div>

        {/* Eyebrow */}
        <p className="booking-modal__eyebrow">Request Received</p>

        {/* Heading */}
        <h3 className="booking-modal__title" id="modal-title">
          You&rsquo;re on your way to a<br />
          <span className="booking-modal__title-accent">brighter smile</span> ✦
        </h3>

        {/* Body */}
        <p className="booking-modal__body">
          Our team has received your consultation request and will reach out
          within <strong>24 hours</strong> to confirm your appointment time.
          Sit tight — great things are coming!
        </p>

        {/* Info strip */}
        <div className="booking-modal__info-strip">
          <div className="booking-modal__info-item">
            <span className="booking-modal__info-icon"></span>
            <div>
              <p className="booking-modal__info-label">Next Step</p>
              <p className="booking-modal__info-value">Confirmation Call</p>
            </div>
          </div>
          <div className="booking-modal__info-divider" />
          <div className="booking-modal__info-item">
            <span className="booking-modal__info-icon"></span>
            <div>
              <p className="booking-modal__info-label">Response Time</p>
              <p className="booking-modal__info-value">Within 24 Hours</p>
            </div>
          </div>
          <div className="booking-modal__info-divider" />
          <div className="booking-modal__info-item">
            <div>
              <p className="booking-modal__info-label">Your Data</p>
              <p className="booking-modal__info-value">100% Secure</p>
            </div>
          </div>
        </div>

        {/* Auto-close notice */}
        <p className="booking-modal__auto-notice">
          This window closes automatically in{' '}
          <span className="booking-modal__auto-count">{secondsLeft}s</span>
        </p>

        {/* CTA */}
        <button className="booking-modal__btn" onClick={onClose}>
          Back to Homepage
        </button>

        {/* Decorative sparkles */}
        <div className="booking-modal__sparkle booking-modal__sparkle--1" />
        <div className="booking-modal__sparkle booking-modal__sparkle--2" />
        <div className="booking-modal__sparkle booking-modal__sparkle--3" />
      </div>
    </div>
  );
};

// ─── Main Contact Section ─────────────────────────────────────
export default function Contactsection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
  });
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalOpen(true);
    // Reset form after submission
    setFormData({ name: "", phone: "", service: "", message: "" });
  };

  return (
    <section className="contact-section" id="Contactsection">
      {/* ── Geometric tooth pattern background ── */}
      <div className="contact-bg-pattern" aria-hidden="true">
        <svg className="contact-bg-svg" viewBox="0 0 1400 800" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <path id="tooth"
              d="M12 0 C5.4 0 0 5.8 0 13 c0 5 3 9.3 7.4 11.1 L12 30 l4.6-5.9 C20.9 22.3 24 18 24 13 C24 5.8 18.6 0 12 0 z
                 M12 4 c4.4 0 8 3.8 8 9 c0 3.3-1.7 6.2-4.2 7.8 L12 24 l-3.8-3.2 C5.7 19.2 4 16.3 4 13 C4 7.8 7.6 4 12 4 z"
            />
            <path id="diamond" d="M6 0 L12 6 L6 12 L0 6 Z" />
            <path id="plus" d="M4 0 L4 3 L7 3 L7 5 L4 5 L4 8 L2 8 L2 5 L-1 5 L-1 3 L2 3 L2 0 Z" />
          </defs>

          <use href="#tooth" x="60"   y="60"  transform="scale(2.2) translate(0,0)"   opacity="0.045" fill="#17324D"/>
          <use href="#tooth" x="280"  y="30"  transform="scale(1.6) translate(100,15)" opacity="0.035" fill="#17324D"/>
          <use href="#tooth" x="540"  y="80"  transform="scale(2.8) translate(160,25)" opacity="0.03"  fill="#D4B06A"/>
          <use href="#tooth" x="820"  y="20"  transform="scale(2.0) translate(340,8)"  opacity="0.04"  fill="#17324D"/>
          <use href="#tooth" x="1100" y="50"  transform="scale(1.8) translate(520,20)" opacity="0.03"  fill="#D4B06A"/>
          <use href="#tooth" x="1300" y="90"  transform="scale(2.4) translate(600,30)" opacity="0.04"  fill="#17324D"/>

          <use href="#tooth" x="140"  y="220" transform="scale(1.5) translate(60,120)" opacity="0.05"  fill="#17324D"/>
          <use href="#tooth" x="380"  y="200" transform="scale(3.0) translate(110,60)" opacity="0.025" fill="#D4B06A"/>
          <use href="#tooth" x="660"  y="240" transform="scale(1.8) translate(280,100)"opacity="0.045" fill="#17324D"/>
          <use href="#tooth" x="960"  y="180" transform="scale(2.2) translate(400,70)" opacity="0.035" fill="#D4B06A"/>
          <use href="#tooth" x="1200" y="230" transform="scale(1.6) translate(560,100)"opacity="0.04"  fill="#17324D"/>

          <use href="#tooth" x="80"   y="420" transform="scale(2.6) translate(20,170)" opacity="0.03"  fill="#D4B06A"/>
          <use href="#tooth" x="320"  y="400" transform="scale(1.4) translate(160,190)"opacity="0.05"  fill="#17324D"/>
          <use href="#tooth" x="580"  y="450" transform="scale(2.0) translate(230,165)"opacity="0.04"  fill="#17324D"/>
          <use href="#tooth" x="880"  y="380" transform="scale(1.7) translate(400,170)"opacity="0.045" fill="#D4B06A"/>
          <use href="#tooth" x="1140" y="430" transform="scale(2.4) translate(500,165)"opacity="0.03"  fill="#17324D"/>
          <use href="#tooth" x="1360" y="400" transform="scale(1.5) translate(650,170)"opacity="0.04"  fill="#D4B06A"/>

          <use href="#tooth" x="200"  y="610" transform="scale(1.9) translate(70,265)" opacity="0.04"  fill="#17324D"/>
          <use href="#tooth" x="470"  y="630" transform="scale(2.5) translate(160,240)"opacity="0.03"  fill="#D4B06A"/>
          <use href="#tooth" x="750"  y="600" transform="scale(1.6) translate(340,270)"opacity="0.045" fill="#17324D"/>
          <use href="#tooth" x="1020" y="640" transform="scale(2.2) translate(450,255)"opacity="0.035" fill="#D4B06A"/>
          <use href="#tooth" x="1280" y="610" transform="scale(1.8) translate(590,260)"opacity="0.04"  fill="#17324D"/>

          <use href="#diamond" x="180"  y="130" transform="scale(1.8) translate(70,50)"   opacity="0.07" fill="#D4B06A"/>
          <use href="#diamond" x="500"  y="340" transform="scale(1.4) translate(240,150)" opacity="0.06" fill="#17324D"/>
          <use href="#diamond" x="800"  y="110" transform="scale(2.0) translate(360,40)"  opacity="0.05" fill="#D4B06A"/>
          <use href="#diamond" x="1050" y="300" transform="scale(1.6) translate(490,130)" opacity="0.07" fill="#17324D"/>
          <use href="#diamond" x="1330" y="180" transform="scale(1.2) translate(660,80)"  opacity="0.06" fill="#D4B06A"/>
          <use href="#diamond" x="90"   y="540" transform="scale(1.5) translate(40,230)"  opacity="0.06" fill="#D4B06A"/>
          <use href="#diamond" x="690"  y="520" transform="scale(1.8) translate(310,220)" opacity="0.05" fill="#17324D"/>
          <use href="#diamond" x="1180" y="560" transform="scale(1.4) translate(570,240)" opacity="0.06" fill="#D4B06A"/>

          <use href="#plus" x="260"  y="160" transform="scale(2) translate(85,52)"    opacity="0.08" fill="#D4B06A"/>
          <use href="#plus" x="720"  y="70"  transform="scale(1.5) translate(310,24)" opacity="0.07" fill="#17324D"/>
          <use href="#plus" x="1000" y="460" transform="scale(2) translate(430,190)"  opacity="0.08" fill="#D4B06A"/>
          <use href="#plus" x="430"  y="560" transform="scale(1.8) translate(170,230)"opacity="0.07" fill="#17324D"/>
          <use href="#plus" x="1250" y="360" transform="scale(1.6) translate(590,145)"opacity="0.08" fill="#D4B06A"/>

          <g fill="none" stroke="#17324D" strokeWidth="0.8" opacity="0.06">
            <use href="#tooth" x="450"  y="120" transform="scale(3.5) translate(110,28)"/>
            <use href="#tooth" x="1080" y="550" transform="scale(3.2) translate(300,180)"/>
            <use href="#tooth" x="150"  y="700" transform="scale(2.8) translate(40,240)"/>
          </g>
          <g fill="none" stroke="#D4B06A" strokeWidth="0.6" opacity="0.07">
            <use href="#tooth" x="750"  y="650" transform="scale(2.6) translate(250,230)"/>
            <use href="#tooth" x="1320" y="650" transform="scale(2.0) translate(580,270)"/>
          </g>

          <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D4B06A" stopOpacity="0.06"/>
            <stop offset="100%" stopColor="#D4B06A" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#17324D" stopOpacity="0.05"/>
            <stop offset="100%" stopColor="#17324D" stopOpacity="0"/>
          </radialGradient>
          <ellipse cx="1100" cy="150" rx="340" ry="260" fill="url(#glow1)"/>
          <ellipse cx="200"  cy="600" rx="280" ry="200" fill="url(#glow2)"/>
          <ellipse cx="700"  cy="400" rx="200" ry="160" fill="url(#glow1)"/>
        </svg>
      </div>

      <div className="contact-container">
        {/* Left — Info Panel */}
        <div className="contact-info">
          <span className="contact-eyebrow">Get In Touch</span>
          <div className="contact-gold-line" />
          <h2 className="contact-heading">
            Let's Connect<br />
            <em>Your Smile Story</em><br />
            Starts Here
          </h2>
          <p className="contact-subtext">
            Whether you have a question, need a consultation, or just want to
            say hello — our team is always ready to welcome you.
          </p>

          <div className="contact-info-cards">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-card"
            >
              <div className="contact-info-card__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <p className="contact-info-card__label">Find Us</p>
                <p className="contact-info-card__value">SmileCraft Dental Studio<br />Anna Nagar, Chennai – 600040</p>
              </div>
              <span className="contact-info-card__arrow">↗</span>
            </a>

            <a href="tel:+919876543210" className="contact-info-card">
              <div className="contact-info-card__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 11.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 .84h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/>
                </svg>
              </div>
              <div>
                <p className="contact-info-card__label">Call Us</p>
                <p className="contact-info-card__value">+91 98765 43210</p>
              </div>
              <span className="contact-info-card__arrow">↗</span>
            </a>

            <a href="mailto:hello@smilecraftdental.com" className="contact-info-card">
              <div className="contact-info-card__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <p className="contact-info-card__label">Email Us</p>
                <p className="contact-info-card__value">hello@smilecraftdental.com</p>
              </div>
              <span className="contact-info-card__arrow">↗</span>
            </a>

            <div className="contact-info-card contact-info-card--hours">
              <div className="contact-info-card__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div>
                <p className="contact-info-card__label">Open Hours</p>
                <p className="contact-info-card__value">Mon – Sat &nbsp;·&nbsp; 9:00 AM – 8:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Form Panel */}
        <div className="contact-form-wrap">
          <div className="contact-form-inner">
            <p className="contact-form-title">Book a Consultation</p>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="contact-form-field">
                  <label className="contact-form-label">Full Name</label>
                  <input
                    className="contact-form-input"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact-form-field">
                  <label className="contact-form-label">Phone</label>
                  <input
                    className="contact-form-input"
                    type="tel"
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="contact-form-field">
                <label className="contact-form-label">Service Interested In</label>
                <select
                  className="contact-form-input contact-form-select"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option value="">Select a treatment</option>
                  <option value="cleaning">Teeth Cleaning</option>
                  <option value="whitening">Teeth Whitening</option>
                  <option value="braces">Braces & Aligners</option>
                  <option value="implants">Dental Implants</option>
                  <option value="rct">Root Canal Treatment</option>
                  <option value="makeover">Smile Makeover</option>
                  <option value="kids">Kids Dentistry</option>
                </select>
              </div>

              <div className="contact-form-field">
                <label className="contact-form-label">Message (Optional)</label>
                <textarea
                  className="contact-form-input contact-form-textarea"
                  name="message"
                  placeholder="Tell us about your concern..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <button type="submit" className="contact-form-btn">
                <span>Request Appointment</span>
              </button>
            </form>

            <p className="contact-form-note">
              No spam. No unnecessary treatments. Just honest, gentle care.
            </p>
          </div>

          {/* Map embed */}
          <div className="contact-map">
            <div className="contact-map__label">Anna Nagar, Chennai</div>
            <iframe
              title="SmileCraft Location"
              src="https://maps.google.com/maps?q=Anna+Nagar+Chennai&output=embed&z=14"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}