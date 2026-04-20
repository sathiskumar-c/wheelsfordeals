// React Imports
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Local Imports
import "./main-banner.scss";

const MainBanner = ({ data }) => {
  const { hero, features } = data;

  return (
    <div className="main-banner">
      <main className="main-banner-main">
        <section className="main-banner-hero">
          {/* Background Image */}
          <div className="main-banner-hero-bg">
            <img
              src={hero.backgroundImage}
              alt={hero.backgroundAlt}
              className="main-banner-hero-bg-img"
            />
            <div className="main-banner-hero-gradient" />
          </div>

          {/* Content Grid */}
          <div className="main-banner-hero-container">
            {/* Left Side Editorial */}
            <div className="main-banner-hero-left">
              <div className="main-banner-hero-content">
                <span className="main-banner-tagline">{hero.tagline}</span>
                <h2 className="main-banner-hero-heading">{hero.heading}</h2>
                <p className="main-banner-hero-description">
                  {hero.description}
                </p>
              </div>

              <div className="main-banner-buttons">
                {hero.buttons.map((btn, idx) => (
                  <Link key={idx} to={btn.href}>
                    <button
                      className={`main-banner-btn main-banner-btn-${btn.type}`}
                    >
                      {btn.label}
                    </button>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Side Featured Card */}
            <div className="main-banner-hero-right">
              <div className="main-banner-featured-card">
                <div className="main-banner-featured-shadow" />
                <div className="main-banner-featured-content">
                  <div className="main-banner-featured-media">
                    <img
                      src={hero.featuredCard.image}
                      alt={hero.featuredCard.imageAlt}
                      className="main-banner-featured-img"
                    />

                    {/* Status Badge */}
                    <div className="main-banner-featured-badge">
                      <span className="main-banner-badge-dot" />
                      <span className="main-banner-badge-text">
                        {hero.featuredCard.badge}
                      </span>
                    </div>

                    {/* Metadata Overlay */}
                    <div className="main-banner-featured-overlay">
                      <div className="main-banner-featured-meta">
                        <div>
                          <p className="main-banner-lot-number">
                            {hero.featuredCard.lotNumber}
                          </p>
                          <h3 className="main-banner-featured-title">
                            {hero.featuredCard.title}
                          </h3>
                        </div>
                        <Link to={hero.featuredCard.exploreLink}>
                          <button className="main-banner-featured-btn">
                            <span className="material-symbols-outlined">
                              arrow_outward
                            </span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Card */}
              <div className="main-banner-stats-card">
                <div className="main-banner-stats-header">
                  <span className="material-symbols-outlined main-banner-stats-icon">
                    verified
                  </span>
                  <span className="main-banner-stats-badge">
                    {hero.statsCard.badge}
                  </span>
                </div>

                <div className="main-banner-stats-list">
                  {hero.statsCard.stats.map((stat, idx) => (
                    <div key={idx} className="main-banner-stat-item">
                      <div className="main-banner-stat-row">
                        <span className="main-banner-stat-label">
                          {stat.label}
                        </span>
                        <span className="main-banner-stat-value">
                          {stat.value}
                        </span>
                      </div>
                      {stat.percentage && (
                        <div className="main-banner-stat-bar">
                          <div
                            className="main-banner-stat-progress"
                            style={{ width: `${stat.percentage}%` }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="main-banner-features">
          <div className="main-banner-features-container">
            {features.map((feature, idx) => (
              <div key={idx} className="main-banner-feature-card">
                <span className="material-symbols-outlined main-banner-feature-icon">
                  {feature.icon}
                </span>
                <h4 className="main-banner-feature-title">{feature.title}</h4>
                <p className="main-banner-feature-description">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

MainBanner.propTypes = {
  data: PropTypes.shape({
    hero: PropTypes.object.isRequired,
    features: PropTypes.array.isRequired,
  }).isRequired,
};

export default MainBanner;
