// React Imports
import React from "react";
import PropTypes from "prop-types";

// Local Imports
import "./info-with-image-block.scss";

const InfoWithImageBlock = ({ content }) => {
  const { title, description, ctaText, ctaLink, imageSrc, imageAlt } = content;

  return (
    <section
      className="split-section py-3 px-3 py-md-5 px-md-5 mt-3 mt-md-5"
      aria-labelledby="section-heading"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <div className="split-text">
        <h2 id="section-heading" className="section-title" itemProp="name">
          <em>{title}</em>
        </h2>
        <p className="section-description" itemProp="description">
          {description}
        </p>
        {ctaText && ctaLink && (
          <a
            href={ctaLink}
            className="section-cta"
            itemProp="url"
            aria-label={ctaText}
          >
            {ctaText} <span className="arrow">›</span>
          </a>
        )}
      </div>
      <div className="split-image">
        <img src={imageSrc} alt={imageAlt} loading="lazy" itemProp="image" />
      </div>
    </section>
  );
};

InfoWithImageBlock.propTypes = {
  content: PropTypes.object.isRequired,
};

export default InfoWithImageBlock;
