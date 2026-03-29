// React Imports
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Local Imports
import "./faq.scss";
import faqData from "../../data/frequently-asked-questions.json";

// MUI Icon Imports
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import SellRoundedIcon from "@mui/icons-material/SellRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

const CATEGORY_ICONS = {
  general: <DashboardRoundedIcon />,
  buying: <ShoppingBagRoundedIcon />,
  selling: <SellRoundedIcon />,
  curation: <VerifiedRoundedIcon />,
  shipping: <LocalShippingRoundedIcon />,
};

const { hero, sidebar, categories, callout } = faqData;

const FrequentlyAskedQuestions = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [openFaqId, setOpenFaqId] = useState(null);

  const currentCategory = categories.find((c) => c.id === activeCategory);

  const toggleFaq = (id) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="faq-redesign">
      {/* ── Hero ── */}
      <section className="faq-redesign__hero">
        <div className="faq-redesign__hero-blur" />
        <div className="faq-redesign__hero-inner">
          <h1 className="faq-redesign__hero-heading">{hero.heading}</h1>
          <div className="faq-redesign__search-wrap">
            <SearchRoundedIcon className="faq-redesign__search-icon" />
            <input
              type="text"
              className="faq-redesign__search-input"
              placeholder={hero.searchPlaceholder}
            />
          </div>
          <div className="faq-redesign__popular-tags">
            <span className="faq-redesign__popular-label">Popular:</span>
            {hero.popularTags.map((tag) => (
              <button key={tag} type="button" className="faq-redesign__tag">
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="faq-redesign__body">
        <div className="faq-redesign__layout">
          {/* Sidebar */}
          <aside className="faq-redesign__sidebar">
            <nav className="faq-redesign__sidebar-nav">
              <p className="faq-redesign__categories-label">
                {sidebar.categoriesLabel}
              </p>
              {sidebar.categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`faq-redesign__cat-item${
                    activeCategory === cat.id
                      ? " faq-redesign__cat-item--active"
                      : ""
                  }`}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenFaqId(null);
                  }}
                >
                  <span className="faq-redesign__cat-icon">
                    {CATEGORY_ICONS[cat.icon]}
                  </span>
                  {cat.label}
                </button>
              ))}
            </nav>

            {/* Help Card */}
            <div className="faq-redesign__help-card">
              <SupportAgentRoundedIcon className="faq-redesign__help-icon" />
              <h4 className="faq-redesign__help-title">
                {sidebar.helpCard.title}
              </h4>
              <p className="faq-redesign__help-desc">
                {sidebar.helpCard.description}
              </p>
              <Link to="/contact-us" className="faq-redesign__help-btn">
                {sidebar.helpCard.buttonLabel}
              </Link>
            </div>
          </aside>

          {/* Content */}
          <div className="faq-redesign__content">
            <header className="faq-redesign__content-header">
              <h2 className="faq-redesign__content-title">
                {currentCategory.title}
              </h2>
              <p className="faq-redesign__content-desc">
                {currentCategory.description}
              </p>
            </header>

            {/* Accordion */}
            <div className="faq-redesign__accordion">
              {currentCategory.faqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`faq-redesign__accordion-item${
                      isOpen ? " faq-redesign__accordion-item--open" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="faq-redesign__accordion-trigger"
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                    >
                      <span className="faq-redesign__accordion-question">
                        {faq.question}
                      </span>
                      <ExpandMoreRoundedIcon
                        className={`faq-redesign__accordion-chevron${
                          isOpen ? " faq-redesign__accordion-chevron--open" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="faq-redesign__accordion-body">
                        <p className="faq-redesign__accordion-answer">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Callout Banner */}
            <div className="faq-redesign__callout">
              <div className="faq-redesign__callout-overlay" />
              <div className="faq-redesign__callout-content">
                <h3 className="faq-redesign__callout-heading">
                  {callout.heading}
                </h3>
                <p className="faq-redesign__callout-desc">
                  {callout.description}
                </p>
                <button type="button" className="faq-redesign__callout-btn">
                  {callout.buttonLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FrequentlyAskedQuestions;
