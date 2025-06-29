// React Imports
import React from "react";

// Local Imports
import "./aboutus-banner.scss";
import JSON from "../../data/aboutus-banner.json";

const AboutUsBanner = () => {
  return (
    <section className="aboutus-banner">
      <div className="aboutus-container">
        <div className="aboutus-left">
          <p className="aboutus-label">{JSON.label}</p>
          <h2 className="aboutus-title">
            {JSON.title}{" "}
            {JSON.highlightedText.map((text, index) => (
              <span key={index} className="highlight">
                {text}
                {index < JSON.highlightedText.length - 1 ? ", " : " "}
              </span>
            ))}
            {JSON.description}
          </h2>

          <div className="aboutus-stats">
            {JSON.stats.map((stat, index) => (
              <p key={index} className="stat-inline">
                <span className="stat-number">{stat.number}</span>{" "}
                <span className="stat-label">{stat.label}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="aboutus-right">
          <img src={JSON.image} alt={JSON.altText} className="aboutus-image" />
        </div>
      </div>
    </section>
  );
};

export default AboutUsBanner;
