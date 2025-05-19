import React, { useEffect, useRef } from "react";
import "./Modal.css";

/**
 * Modal Component
 *
 * A customizable modal dialog component.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {function} props.onClose - Function to call when the modal is closed
 * @param {string} props.title - Modal title
 * @param {JSX.Element} props.footer - Modal footer content
 * @param {string} props.size - Modal size ('small', 'medium', 'large', 'full')
 * @param {boolean} props.closeOnOverlayClick - Whether clicking the overlay closes the modal
 * @param {boolean} props.closeOnEsc - Whether pressing Escape closes the modal
 * @param {string} props.className - Additional CSS classes
 * @param {JSX.Element} props.children - Modal content
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  footer,
  size = "medium",
  closeOnOverlayClick = true,
  closeOnEsc = true,
  className = "",
  children,
}) => {
  const modalRef = useRef(null);

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscKey = (event) => {
      if (closeOnEsc && event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = ""; // Restore scrolling
    };
  }, [isOpen, onClose, closeOnEsc]);

  // Handle overlay click
  const handleOverlayClick = (event) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  // Focus trap inside modal
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const modalClasses = `modal-container modal-${size} ${className}`;

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={modalClasses} ref={modalRef}>
        {/* Modal header */}
        <div className="modal-header">
          {title && <h2 className="modal-title">{title}</h2>}
          <button
            className="modal-close-button"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Modal content */}
        <div className="modal-content">{children}</div>

        {/* Modal footer */}
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
