import React, { useState } from "react";
import "./Header.css";

/**
 * Header Component
 *
 * A responsive navigation header with mobile menu toggle.
 *
 * @param {Object} props
 * @param {string} props.title - The title to display in the header
 * @param {Array} props.links - Navigation links array of objects with label and url properties
 * @param {string} props.logo - URL to the logo image
 * @param {boolean} props.sticky - Whether the header should stick to the top when scrolling
 * @param {function} props.onThemeToggle - Function to handle theme toggle
 */
const Header = ({
  title = "My Website",
  links = [],
  logo,
  sticky = false,
  onThemeToggle,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`header ${sticky ? "sticky" : ""}`}>
      <div className="header-container">
        <div className="logo-container">
          {logo && <img src={logo} alt="Logo" className="logo" />}
          <h1 className="site-title">{title}</h1>
        </div>

        <button
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${mobileMenuOpen ? "open" : ""}`}></span>
        </button>

        <nav className={`navigation ${mobileMenuOpen ? "mobile-open" : ""}`}>
          <ul className="nav-links">
            {links.map((link, index) => (
              <li key={index} className="nav-item">
                <a href={link.url} className="nav-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {onThemeToggle && (
            <button
              className="theme-toggle"
              onClick={onThemeToggle}
              aria-label="Toggle theme"
            >
              <span className="theme-toggle-icon">🌓</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
