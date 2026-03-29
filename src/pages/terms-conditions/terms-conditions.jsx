// React Imports
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Local Imports
import "./terms-conditions.scss";
import tcData from "../../data/terms-conditions.json";

// MUI Icon Imports
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import DirectionsBikeRoundedIcon from "@mui/icons-material/DirectionsBikeRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";

const NAV_ICONS = {
  introduction: <GavelRoundedIcon />,
  "user-accounts": <PersonRoundedIcon />,
  "listing-rules": <DirectionsBikeRoundedIcon />,
  payments: <PaymentsRoundedIcon />,
  liability: <SecurityRoundedIcon />,
  "privacy-policy-link": <VisibilityRoundedIcon />,
};

const { hero, sidebar, sections, ipBanner, footerCta } = tcData;

const TermsandConditions = () => {
  const [activeId, setActiveId] = useState("introduction");

  const handleNavClick = (id) => {
    setActiveId(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 96;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="tc-redesign">
      {/* ── Hero Header ── */}
      <header className="tc-redesign__hero">
        <div className="tc-redesign__hero-inner">
          <span className="tc-redesign__hero-badge">{hero.badge}</span>
          <h1 className="tc-redesign__hero-title">{hero.title}</h1>
          <p className="tc-redesign__hero-desc">{hero.description}</p>
        </div>
      </header>

      {/* ── Two-column layout ── */}
      <div className="tc-redesign__body">
        {/* Sidebar */}
        <aside className="tc-redesign__sidebar">
          <div className="tc-redesign__sidebar-card">
            <div className="tc-redesign__sidebar-header">
              <div className="tc-redesign__sidebar-title-row">
                <GavelRoundedIcon className="tc-redesign__sidebar-icon" />
                <span className="tc-redesign__sidebar-title">
                  {sidebar.title}
                </span>
              </div>
              <span className="tc-redesign__sidebar-meta">
                {sidebar.lastUpdated}
              </span>
            </div>
            <nav className="tc-redesign__sidebar-nav">
              {sidebar.navItems.map((item) =>
                item.link ? (
                  <Link
                    key={item.id}
                    to={item.link}
                    className="tc-redesign__nav-item"
                  >
                    <span className="tc-redesign__nav-icon">
                      {NAV_ICONS[item.id]}
                    </span>
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    type="button"
                    className={`tc-redesign__nav-item${
                      activeId === item.id
                        ? " tc-redesign__nav-item--active"
                        : ""
                    }`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <span className="tc-redesign__nav-icon">
                      {NAV_ICONS[item.id]}
                    </span>
                    {item.label}
                  </button>
                ),
              )}
            </nav>
            <div className="tc-redesign__sidebar-footer">
              <button type="button" className="tc-redesign__download-btn">
                <DownloadRoundedIcon />
                {sidebar.downloadLabel}
              </button>
            </div>
          </div>
        </aside>

        {/* Content */}
        <article className="tc-redesign__content">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="tc-redesign__section"
            >
              <div className="tc-redesign__section-heading">
                <span className="tc-redesign__section-rule" />
                <h2 className="tc-redesign__section-title">
                  {section.number}. {section.title}
                </h2>
              </div>

              {/* Plain body paragraphs (payments, liability — no quick take) */}
              {section.body && !section.quickTake && (
                <div className="tc-redesign__body-text">
                  {section.body.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}

              {/* Introduction — body paragraphs + quick take sidebar card */}
              {section.body && section.quickTake && (
                <div className="tc-redesign__intro-grid">
                  <div className="tc-redesign__body-text">
                    {section.body.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                  <aside className="tc-redesign__quick-take">
                    <h4 className="tc-redesign__quick-take-title">
                      {section.quickTake.title}
                    </h4>
                    <p className="tc-redesign__quick-take-text">
                      {section.quickTake.text}
                    </p>
                  </aside>
                </div>
              )}

              {/* Eligibility — bordered card with check items */}
              {section.checkItems && (
                <div className="tc-redesign__eligibility-card">
                  <ul className="tc-redesign__eligibility-list">
                    {section.checkItems.map((item, i) => (
                      <li key={i} className="tc-redesign__eligibility-item">
                        <CheckCircleRoundedIcon className="tc-redesign__eligibility-icon" />
                        <div>
                          <h5 className="tc-redesign__eligibility-title">
                            {item.title}
                          </h5>
                          <p className="tc-redesign__eligibility-desc">
                            {item.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* User Conduct — intro + 2-col prohibited / best grid */}
              {section.conduct && (
                <>
                  <p className="tc-redesign__conduct-intro">{section.intro}</p>
                  <div className="tc-redesign__conduct-grid">
                    <div className="tc-redesign__conduct-card tc-redesign__conduct-card--prohibited">
                      <h4 className="tc-redesign__conduct-card-title tc-redesign__conduct-card-title--prohibited">
                        <BlockRoundedIcon />
                        {section.conduct.prohibited.title}
                      </h4>
                      <ul className="tc-redesign__conduct-list">
                        {section.conduct.prohibited.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="tc-redesign__conduct-card tc-redesign__conduct-card--best">
                      <h4 className="tc-redesign__conduct-card-title tc-redesign__conduct-card-title--best">
                        <VerifiedRoundedIcon />
                        {section.conduct.best.title}
                      </h4>
                      <ul className="tc-redesign__conduct-list">
                        {section.conduct.best.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </section>
          ))}

          {/* ── IP Rights Banner ── */}
          <div className="tc-redesign__ip-banner" id="intellectual-property">
            <div className="tc-redesign__ip-blur" />
            <h2 className="tc-redesign__ip-title">{ipBanner.title}</h2>
            <p className="tc-redesign__ip-desc">{ipBanner.description}</p>
            <div className="tc-redesign__ip-actions">
              {ipBanner.buttons.map((btn, i) => (
                <button
                  key={i}
                  type="button"
                  className={`tc-redesign__ip-btn tc-redesign__ip-btn--${btn.variant}`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Footer CTA ── */}
          <div className="tc-redesign__footer-cta">
            <div>
              <p className="tc-redesign__footer-caption">{footerCta.caption}</p>
              <h4 className="tc-redesign__footer-heading">
                {footerCta.heading}
              </h4>
            </div>
            <button type="button" className="tc-redesign__footer-btn">
              {footerCta.buttonLabel}
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default TermsandConditions;
