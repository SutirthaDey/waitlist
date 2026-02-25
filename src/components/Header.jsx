import { useEffect, useState } from "react";
import logo from "../assets/zorvee.png";
import { PAGES } from "../constants/routes";

function Header({ activePage, onNavigate }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 980) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const handleNavigate = (page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="top-header">
      <div className="brand">
        <button
          type="button"
          className="brand-logo-button"
          onClick={() => handleNavigate(PAGES.WAITLIST)}
          aria-label="Go to waitlist page"
        >
          <img src={logo} alt="zorvee" className="brand-logo" />
        </button>
      </div>
      <button
        type="button"
        className="mobile-menu-toggle"
        aria-label="Toggle navigation menu"
        aria-expanded={isMobileMenuOpen}
        aria-controls="main-navigation"
        onClick={() => setIsMobileMenuOpen((current) => !current)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav
        id="main-navigation"
        className={`header-nav ${isMobileMenuOpen ? "mobile-open" : ""}`}
        aria-label="Main navigation"
      >
        <button
          type="button"
          className="mobile-menu-close"
          aria-label="Close navigation menu"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Close
        </button>
        <button
          type="button"
          className={activePage === PAGES.EXAMPLES ? "active" : ""}
          onClick={() => handleNavigate(PAGES.EXAMPLES)}
        >
          See Examples
        </button>
        <button
          type="button"
          className={activePage === PAGES.PRODUCT ? "active" : ""}
          onClick={() => handleNavigate(PAGES.PRODUCT)}
        >
          Product
        </button>
        <button
          type="button"
          className={activePage === PAGES.WAITLIST ? "active" : ""}
          onClick={() => handleNavigate(PAGES.WAITLIST)}
        >
          Join Waitlist
        </button>
      </nav>
      {isMobileMenuOpen ? (
        <button
          type="button"
          className="header-nav-overlay"
          aria-label="Close navigation menu"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      ) : null}
    </header>
  );
}

export default Header;
