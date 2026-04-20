// React Imports
import React, { useState } from "react";

// Local Imports
import "./privacy-policy.scss";
import ppData from "../../data/privacy-policy.json";

// MUI Icon Imports
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import CookieRoundedIcon from "@mui/icons-material/CookieRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ContactPageRoundedIcon from "@mui/icons-material/ContactPageRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const NAV_ICONS = {
  intro: <InfoRoundedIcon />,
  "data-collection": <StorageRoundedIcon />,
  usage: <TuneRoundedIcon />,
  "third-parties": <ShareRoundedIcon />,
  cookies: <CookieRoundedIcon />,
  contact: <MailRoundedIcon />,
};

const DATA_CARD_ICONS = {
  person: <PersonRoundedIcon />,
  contact_page: <ContactPageRoundedIcon />,
  payments: <PaymentsRoundedIcon />,
};

const { hero, sidebar, sections } = ppData;

const PrivacyPolicy = () => {
  const [activeId, setActiveId] = useState("intro");

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
    <div className="pp-redesign">
      {/* ── Hero Header ── */}
      <header className="pp-redesign__hero">
        <div className="pp-redesign__hero-inner">
          <div className="pp-redesign__hero-badge">
            <SecurityRoundedIcon />
            {hero.badge}
          </div>
          <h1 className="pp-redesign__hero-title">{hero.title}</h1>
          <p className="pp-redesign__hero-desc">{hero.description}</p>
        </div>
      </header>

      {/* ── Two-column layout ── */}
      <div className="pp-redesign__body">
        {/* Sidebar */}
        <aside className="pp-redesign__sidebar">
          <div className="pp-redesign__sidebar-card">
            <div className="pp-redesign__sidebar-header">
              <span className="pp-redesign__sidebar-title">
                {sidebar.title}
              </span>
              <span className="pp-redesign__sidebar-meta">
                {hero.lastUpdated}
              </span>
            </div>
            <nav className="pp-redesign__sidebar-nav">
              {sidebar.navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`pp-redesign__nav-item${activeId === item.id ? " pp-redesign__nav-item--active" : ""}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <span className="pp-redesign__nav-icon">
                    {NAV_ICONS[item.id]}
                  </span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <article className="pp-redesign__content">
          {sections.map((section, sectionIndex) => (
            <section
              key={section.id}
              id={section.id}
              className="pp-redesign__section"
            >
              {sectionIndex > 0 && <hr className="pp-redesign__divider" />}
              <h2 className="pp-redesign__section-title">{section.title}</h2>

              {/* body paragraphs (intro + third-parties + contact) */}
              {section.body && (
                <div className="pp-redesign__body-text">
                  {section.body.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}

              {/* Core Principles card (intro section) */}
              {section.corePrinciples && (
                <div className="pp-redesign__principles-card">
                  <h3 className="pp-redesign__principles-title">
                    {section.corePrinciples.title}
                  </h3>
                  <div className="pp-redesign__principles-grid">
                    {section.corePrinciples.items.map((item, i) => (
                      <div key={i} className="pp-redesign__principle-item">
                        <span className="pp-redesign__principle-label">
                          {item.label}
                        </span>
                        <p className="pp-redesign__principle-desc">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Data Collection intro + cards */}
              {section.intro && !section.items && (
                <p className="pp-redesign__section-intro">{section.intro}</p>
              )}
              {section.dataCards && (
                <div className="pp-redesign__data-cards">
                  {section.dataCards.map((card, i) => (
                    <div key={i} className="pp-redesign__data-card">
                      <div className="pp-redesign__data-card-icon">
                        {DATA_CARD_ICONS[card.icon]}
                      </div>
                      <div>
                        <h4 className="pp-redesign__data-card-title">
                          {card.title}
                        </h4>
                        <p className="pp-redesign__data-card-desc">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Usage section — intro + checklist + banner */}
              {section.items && (
                <>
                  <p className="pp-redesign__section-intro">{section.intro}</p>
                  <ul className="pp-redesign__checklist">
                    {section.items.map((item, i) => (
                      <li key={i} className="pp-redesign__check-item">
                        <CheckCircleRoundedIcon className="pp-redesign__check-icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {section.bannerText && (
                    <div className="pp-redesign__banner">
                      <p className="pp-redesign__banner-text">
                        {section.bannerText}
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Cookie table */}
              {section.cookieTable && (
                <>
                  <p className="pp-redesign__section-intro">{section.intro}</p>
                  <div className="pp-redesign__table-wrap">
                    <table className="pp-redesign__table">
                      <thead>
                        <tr>
                          <th>Cookie Type</th>
                          <th>Purpose</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.cookieTable.map((row, i) => (
                          <tr key={i}>
                            <td className="pp-redesign__table-type">
                              {row.type}
                            </td>
                            <td>{row.purpose}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </section>
          ))}
        </article>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
