// React Imports
import React from "react";
import PropTypes from "prop-types";

// MUI Imports
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Local Imports
import "./infor-card.scss";
import AnimatedActionButton from "../../buttons/animated-action-button/animated-action-button";

const InfoCard = ({
  imageUrl,
  title,
  description,
  actionText,
  actionLink = "#",
}) => {
  // Open link in same tab for now
  const handleAction = (e) => {
    e.preventDefault();
    if (actionLink && actionLink !== "#") {
      window.location.href = actionLink;
    }
  };

  return (
    <div className="info-card">
      <div
        className="info-card__image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>

      <div className="info-card__content">
        <a href={actionLink}>
          <span className="info-card__title">{title}</span>
        </a>

        <p className="info-card__desc">{description}</p>

        <AnimatedActionButton
          text={actionText}
          onClick={handleAction}
          icon={<ArrowForwardIcon className="icon" />}
        />
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
};

export default InfoCard;
