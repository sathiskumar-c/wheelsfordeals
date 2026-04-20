/**
 * TabsComponent
 *
 * Description:
 * A reusable tabbed layout component that displays different cards based on selected tab.
 *
 * Usage:
 * Used across multiple pages such as:
 * - HomePage.jsx
 *
 * Related Components:
 * - Benefits Component - Home.jsx
 * - ExplorByBodyType Component - Home.jsx
 *
 * SCSS Styles:
 * - Defined in `tabs-component.scss`
 */

// React imports
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Local imports
import "./horizontal-tabs.scss";

const FALLBACK_BADGES = [
  "Verification",
  "Convenience",
  "Protection",
  "Support",
];
const CTA_KEYWORD_LABELS = Object.freeze({
  apply: "Apply",
  continue: "Continue",
  learn_more: "Learn More",
});

const resolveKeywordLabel = (keyword) => {
  if (!keyword) return "Learn More";

  const normalizedKeyword = keyword.toLowerCase();
  return (
    CTA_KEYWORD_LABELS[normalizedKeyword] ||
    normalizedKeyword
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
};

const resolveCta = (item, defaultKeyword) => {
  const keyword = item.btn_keyword || defaultKeyword;

  return {
    label: resolveKeywordLabel(keyword),
    path: item.btn_path || item.path || "/",
  };
};

const HTML_TAB_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA3INN3wsoK_4OjDTrhx9kaN_GCbOoxaDG1uWDWnwZxVFZwybSVaROLz56nAUwX87huNxMBLjY5LrpNI8ZFtQWC3vRzasKW2LgCJmdqOuZSV8h0vxzv1mUyDeepoj57z8qXiXc532u_J7HJDxOa9hOxKcN7S7TrCMPdLLGNjkJUi-EZWtb6Yn6nD8iiqwJvKDC2YJJ_M5czneqxsKNiN5jc45IPfi4c2-kELOviAaHfFhOVazb8QMZwXvS2tYpkjBmySB3QEzccUjY",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCwkgppadKT1P36tOnk4L3Kj-iaWvJvud3pWY07JCmaFSMxkX4c5dX8OwOGs4uFtYaNcfgOVLG6ynnRIrVJElUS6y1QK7p48fFpwMara60o6YfmvdCOs-_IXIeEuTVmago9letX_N5f1BvpczeH035xBpz1EdC-6yNrmVv48vAc8Xr2VGN6I5OrOS1tlQOdxQ25ncLMOMJVZG97HOaOwycNiNrLAS0zMAu9alAmG_5PetJE9jw6WoV6pNkWXeS2iUfX-hH7lbuax9E",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAlc-8T6ZVs-exeaqUi_Oyc33JGMJI_Ix2Ewkb0AoXZwo5vVP_ZTlTmYNB78dBqoNnrKLY_9vuCnalCYEqyQU8FbEjTKIRDG1z7AW-6-VS078tGRfsbR0w0GBrxXLU8RaGdox-QbIhDDusWwD4dZ_3dWBbz4nJwaP0PICAhecSbm-MdY9QR0i75zzsKl5YUJ86W9QR565hySKBHhmgwDHJeD0lRzHBHpPfvo9v1BwMF7c-3LNYVZ0laoQy1XmEKU3SOGP3k4t9llkk",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBIG0iTSezBkdEx-1UNFJMbxZDOWTxWDq3vkPjEfN3GHLo5fdUFDaYBwow_zNXY_4ccSPz8QHlGfhzO36NVmJjTi-5bZ_igYaNFBSKoLHmHgOLLMIuRG5MkESnIMtCiA7yyCnQeUBbAsRSzSi0xZqfrtG0806k2cAjQ561KAI0KFKn4r9sQLayinXRYIF8oQPUkICGDfDYEmlmTrdyEUhNIOB9XEBOjzvJJSAPukbs9NPpY5CZ7hJ7ecfyLlBEtpv08mU4JXgAUq_k",
];

const HorizontalTabs = ({ data }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const tabsTagline = data.tagline || "Elevated Experiences";
  const defaultBtnKeyword = data.default_btn_keyword || "learn_more";

  const availableTabs = data.tabs || [];
  const currentTab = availableTabs[tabIndex] || availableTabs[0] || {};
  const currentTabKey = currentTab.key;
  const tabsData = data[currentTabKey] || [];

  return (
    <section
      className="component-parent tabs-container"
      role="region"
      aria-labelledby={data.aria_labelledby}
    >
      <div className="tabs-shell">
        <div className="tabs-header text-center">
          <span className="tabs-tagline">{tabsTagline}</span>

          <h2 id={data.aria_labelledby} className="tabs-title">
            {data.title}
          </h2>

          <div
            className="tabs-switcher"
            role="tablist"
            aria-label={data.aria_label}
          >
            {availableTabs.map((tab, index) => (
              <button
                key={tab.id || index}
                type="button"
                className={`tabs-trigger ${tabIndex === index ? "is-active" : ""}`}
                onClick={() => setTabIndex(index)}
                role="tab"
                id={tab.id}
                aria-selected={tabIndex === index}
                aria-controls={tab.aria_controls}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div
          role="tabpanel"
          id={currentTab.aria_controls}
          aria-labelledby={currentTab.id}
          className="tabs-panel"
        >
          <div className="tabs-grid">
            {tabsData.map((res, index) => {
              const cta = resolveCta(res, defaultBtnKeyword);

              return (
                <article
                  className="tabs-card"
                  key={res.id || res.title || index}
                >
                  <Link
                    to={cta.path}
                    aria-label={`${cta.label} for ${res.title}`}
                    title={res.title}
                    className="tabs-card-link"
                  >
                    <div className="tabs-media">
                      <img
                        src={HTML_TAB_IMAGES[index % HTML_TAB_IMAGES.length]}
                        alt={res.alt || `${res.title} illustration`}
                        title={res.title}
                        className="tabs-image"
                        loading="lazy"
                        onError={(e) => {
                          if (e.target) e.target.src = "/images/default.png";
                        }}
                      />
                      <div className="tabs-overlay" />
                    </div>

                    <div className="tabs-card-content">
                      <span className="tabs-badge">
                        {res.badge ||
                          FALLBACK_BADGES[index % FALLBACK_BADGES.length]}
                      </span>
                      <h3 className="tabs-heading">{res.title}</h3>
                      <p className="tabs-description">{res.description}</p>
                      <span className="tabs-cta">
                        {cta.label}
                        <span className="tabs-cta-arrow" aria-hidden="true">
                          {"->"}
                        </span>
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

HorizontalTabs.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    tagline: PropTypes.string,
    default_btn_keyword: PropTypes.string,
    aria_labelledby: PropTypes.string.isRequired,
    aria_label: PropTypes.string.isRequired,
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string.isRequired,
        aria_controls: PropTypes.string,
        key: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default HorizontalTabs;
