// React Imports
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Local Imports
import "./infor-card.scss";

const InfoCard = ({
  imageUrl,
  title,
  description,
  actionText,
  actionLink = "#",
  badge,
  badgeVariant,
}) => {
  return (
    <div className="info-card">
      <div className="info-card__image-wrap">
        <img src={imageUrl} alt={title} className="info-card__image" />
        {badge && (
          <span className={`info-card__badge info-card__badge--${badgeVariant}`}>
            {badge}
          </span>
        )}
      </div>

      <div className="info-card__content">
        <h3 className="info-card__title">{title}</h3>
        <p className="info-card__desc">{description}</p>
        <Link to={actionLink} className="info-card__action">
          <span>{actionText}</span>
          <span className="info-card__arrow">→</span>
        </Link>
      </div>
    </div>
  );
};

InfoCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  actionText: PropTypes.string.isRequired,
  actionLink: PropTypes.string,
  badge: PropTypes.string,
  badgeVariant: PropTypes.string,
};

export default InfoCard;
