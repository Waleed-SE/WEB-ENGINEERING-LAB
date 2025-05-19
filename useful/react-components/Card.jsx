import React from "react";
import "./Card.css";

/**
 * Card Component
 *
 * A versatile card component for displaying content in a contained box.
 *
 * @param {Object} props
 * @param {string} props.title - The card title
 * @param {string} props.subtitle - Optional subtitle
 * @param {string|JSX.Element} props.image - Image URL or JSX element
 * @param {string} props.imageAlt - Image alt text (for accessibility)
 * @param {string|JSX.Element} props.content - Main content of the card
 * @param {Array|JSX.Element} props.actions - Actions/buttons for the card
 * @param {string} props.variant - Card style variant ('default', 'outlined', 'elevated')
 * @param {string} props.className - Additional CSS class
 * @param {function} props.onClick - Click handler for the entire card
 * @param {Object} props.children - Alternative to content prop (children elements)
 */
const Card = ({
  title,
  subtitle,
  image,
  imageAlt = "Card image",
  content,
  actions,
  variant = "default",
  className = "",
  onClick,
  children,
}) => {
  // Determine if card is clickable
  const isClickable = !!onClick;

  // Combine classes
  const cardClasses = `card card-${variant} ${
    isClickable ? "card-clickable" : ""
  } ${className}`;

  // Handle card click
  const handleCardClick = (e) => {
    if (isClickable && onClick) {
      onClick(e);
    }
  };

  return (
    <div
      className={cardClasses}
      onClick={handleCardClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      {/* Card image */}
      {image && (
        <div className="card-image-container">
          {typeof image === "string" ? (
            <img src={image} alt={imageAlt} className="card-image" />
          ) : (
            image
          )}
        </div>
      )}

      {/* Card content */}
      <div className="card-content">
        {title && <h3 className="card-title">{title}</h3>}
        {subtitle && <h4 className="card-subtitle">{subtitle}</h4>}

        {/* Render either content prop or children */}
        {content ? (
          <div className="card-body">
            {typeof content === "string" ? <p>{content}</p> : content}
          </div>
        ) : (
          children && <div className="card-body">{children}</div>
        )}
      </div>

      {/* Card actions */}
      {actions && <div className="card-actions">{actions}</div>}
    </div>
  );
};

export default Card;
