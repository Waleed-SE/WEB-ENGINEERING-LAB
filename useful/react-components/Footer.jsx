import React from "react";
import "./Footer.css";

/**
 * Footer Component
 *
 * A responsive footer with multiple sections for links, contact info, and social media.
 *
 * @param {Object} props
 * @param {string} props.companyName - Company or website name
 * @param {Object} props.links - Object containing sections with arrays of links
 * @param {Object} props.contact - Contact information object
 * @param {Array} props.socialLinks - Array of social media link objects
 * @param {string} props.copyrightText - Copyright text override
 */
const Footer = ({
  companyName = "My Company",
  links = {},
  contact = {},
  socialLinks = [],
  copyrightText,
}) => {
  const year = new Date().getFullYear();
  const copyright =
    copyrightText || `© ${year} ${companyName}. All rights reserved.`;

  // Links sections object structure:
  // { "Products": [{label: "Product 1", url: "/product1"}, ...], "Company": [{...}], ... }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <h2 className="footer-title">{companyName}</h2>
            {contact.description && (
              <p className="footer-description">{contact.description}</p>
            )}
          </div>

          {/* Render each link section */}
          {Object.entries(links).map(([sectionName, sectionLinks]) => (
            <div className="footer-section" key={sectionName}>
              <h3 className="section-title">{sectionName}</h3>
              <ul className="footer-links">
                {sectionLinks.map((link, index) => (
                  <li key={index} className="footer-link-item">
                    <a href={link.url} className="footer-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact information section */}
          {(contact.email || contact.phone || contact.address) && (
            <div className="footer-section">
              <h3 className="section-title">Contact Us</h3>
              <ul className="contact-info">
                {contact.email && (
                  <li className="contact-item">
                    <span className="contact-icon">✉️</span>
                    <a
                      href={`mailto:${contact.email}`}
                      className="contact-link"
                    >
                      {contact.email}
                    </a>
                  </li>
                )}
                {contact.phone && (
                  <li className="contact-item">
                    <span className="contact-icon">📞</span>
                    <a href={`tel:${contact.phone}`} className="contact-link">
                      {contact.phone}
                    </a>
                  </li>
                )}
                {contact.address && (
                  <li className="contact-item">
                    <span className="contact-icon">📍</span>
                    <span className="contact-text">{contact.address}</span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Social links */}
        {socialLinks.length > 0 && (
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                className="social-link"
                title={social.name}
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon || social.name}
              </a>
            ))}
          </div>
        )}

        {/* Copyright */}
        <div className="copyright">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
