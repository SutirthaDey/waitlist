import logo from "../assets/zorvee.png";
import { PAGES } from "../constants/routes";

function Header({ activePage, onNavigate }) {
  return (
    <header className="top-header">
      <div className="brand">
        <button
          type="button"
          className="brand-logo-button"
          onClick={() => onNavigate(PAGES.WAITLIST)}
          aria-label="Go to waitlist page"
        >
          <img src={logo} alt="zorvee" className="brand-logo" />
        </button>
      </div>
      <nav className="header-nav" aria-label="Main navigation">
        <button
          type="button"
          className={activePage === PAGES.EXAMPLES ? "active" : ""}
          onClick={() => onNavigate(PAGES.EXAMPLES)}
        >
          Examples
        </button>
        <button
          type="button"
          className={activePage === PAGES.PRODUCT ? "active" : ""}
          onClick={() => onNavigate(PAGES.PRODUCT)}
        >
          Our Product
        </button>
        <button
          type="button"
          className={activePage === PAGES.WAITLIST ? "active" : ""}
          onClick={() => onNavigate(PAGES.WAITLIST)}
        >
          Join Waitlist
        </button>
      </nav>
    </header>
  );
}

export default Header;
