// React Imports
import React from "react";
import { Link } from "react-router-dom";

// Local Imports
import "./aboutus.scss";
import aboutData from "../../data/aboutus-banner.json";

// MUI Icon Imports
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

const AboutUs = () => {
  const { hero, philosophy, stats, story, team } = aboutData;

  return (
    <div className="ab-redesign">
      {/* ── Hero Section ── */}
      <header
        className="ab-redesign__hero"
        style={{ backgroundImage: `url(${hero.backgroundImage})` }}
      >
        <div className="ab-redesign__hero-overlay">
          <div className="ab-redesign__hero-content">
            <span className="ab-redesign__hero-badge">{hero.badge}</span>
            <h1 className="ab-redesign__hero-heading">{hero.title}</h1>
            <p className="ab-redesign__hero-desc">{hero.description}</p>
          </div>
        </div>
      </header>

      {/* ── Philosophy Section (Bento Grid) ── */}
      <section className="ab-redesign__philosophy">
        <div className="ab-redesign__section-container">
          <div className="ab-redesign__section-header">
            <span className="ab-redesign__eyebrow">{philosophy.eyebrow}</span>
            <h2 className="ab-redesign__section-title">{philosophy.title}</h2>
          </div>

          <div className="ab-redesign__bento-grid">
            {/* Main card — spans 2 of 3 columns */}
            <div className="ab-redesign__bento-card ab-redesign__bento-card--main">
              <VerifiedUserRoundedIcon className="ab-redesign__bento-icon" />
              <h3 className="ab-redesign__bento-title">
                {philosophy.mainCard.title}
              </h3>
              <p className="ab-redesign__bento-desc">
                {philosophy.mainCard.description}
              </p>
            </div>

            {/* Accent card — 1 of 3 columns, indigo bg */}
            <div className="ab-redesign__bento-card ab-redesign__bento-card--accent">
              <div className="ab-redesign__bento-accent-deco">
                <PublicRoundedIcon />
              </div>
              <h3 className="ab-redesign__bento-title ab-redesign__bento-title--light">
                {philosophy.accentCard.title}
              </h3>
              <p className="ab-redesign__bento-desc ab-redesign__bento-desc--light">
                {philosophy.accentCard.description}
              </p>
            </div>

            {/* Small card — 1 of 3 columns */}
            <div className="ab-redesign__bento-card ab-redesign__bento-card--small">
              <AutoAwesomeRoundedIcon className="ab-redesign__bento-icon ab-redesign__bento-icon--sm" />
              <h3 className="ab-redesign__bento-title ab-redesign__bento-title--sm">
                {philosophy.smallCard.title}
              </h3>
              <p className="ab-redesign__bento-desc ab-redesign__bento-desc--sm">
                {philosophy.smallCard.description}
              </p>
            </div>

            {/* Curator card — spans 2 of 3 columns */}
            <div className="ab-redesign__bento-card ab-redesign__bento-card--curator">
              <div className="ab-redesign__bento-curator-text">
                <h3 className="ab-redesign__bento-title ab-redesign__bento-title--sm">
                  {philosophy.curatorCard.title}
                </h3>
                <p className="ab-redesign__bento-desc ab-redesign__bento-desc--sm">
                  {philosophy.curatorCard.description}
                </p>
                <Link to="#" className="ab-redesign__bento-link">
                  {philosophy.curatorCard.linkText}
                  <ArrowForwardRoundedIcon fontSize="small" />
                </Link>
              </div>
              <div className="ab-redesign__bento-curator-img">
                <img
                  src={philosophy.curatorCard.image}
                  alt="Curator standard"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section className="ab-redesign__stats">
        <div className="ab-redesign__stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="ab-redesign__stat-item">
              <p className="ab-redesign__stat-number">{stat.number}</p>
              <p className="ab-redesign__stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Our Story Section ── */}
      <section className="ab-redesign__story">
        <div className="ab-redesign__section-container ab-redesign__story-layout">
          <div className="ab-redesign__story-media">
            <div className="ab-redesign__story-image-wrap">
              <img src={story.image} alt={story.imageAlt} />
            </div>
            <div className="ab-redesign__story-deco" aria-hidden="true">
              01
            </div>
          </div>

          <div className="ab-redesign__story-content">
            <h2 className="ab-redesign__story-title">{story.title}</h2>
            <div className="ab-redesign__story-body">
              {story.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="ab-redesign__story-ctas">
              <Link
                to={story.primaryCta.link}
                className="ab-redesign__cta-primary"
              >
                {story.primaryCta.label}
              </Link>
              <Link
                to={story.secondaryCta.link}
                className="ab-redesign__cta-secondary"
              >
                {story.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Team Section ── */}
      <section className="ab-redesign__team">
        <div className="ab-redesign__section-container">
          <div className="ab-redesign__team-header">
            <span className="ab-redesign__eyebrow">{team.eyebrow}</span>
            <h2 className="ab-redesign__section-title ab-redesign__section-title--center">
              {team.title}
            </h2>
          </div>

          <div className="ab-redesign__team-grid">
            {team.members.map((member, i) => (
              <div key={i} className="ab-redesign__team-card">
                <div className="ab-redesign__team-photo">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="ab-redesign__team-info">
                  <h4 className="ab-redesign__team-name">{member.name}</h4>
                  <p className="ab-redesign__team-role">{member.role}</p>
                  <p className="ab-redesign__team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
