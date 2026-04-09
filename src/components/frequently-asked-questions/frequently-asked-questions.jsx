// React Imports
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// MUI Icon Imports
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import ContactSupportRoundedIcon from "@mui/icons-material/ContactSupportRounded";

// Local Imports
import "./frequently-asked-questions.scss";

const FrequentlyAskedQuestions = ({ JSON }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  const { home_section, faq_data, faq_content } = JSON;

  return (
    <section className="faq component-parent" aria-labelledby="faq-title">
      <div className="faq__inner">
        {/* ── Left: Branding & Description ── */}
        <div className="faq__left">
          <span className="faq__label">
            <AutoAwesomeRoundedIcon className="faq__label-icon" />
            {home_section.label}
          </span>

          <div className="faq__heading-group">
            <h2 className="faq__title" id="faq-title">
              {home_section.title}
            </h2>
            <p className="faq__desc">{home_section.description}</p>
          </div>

          <Link to={faq_content.button.path} className="faq__view-all">
            <span>{home_section.viewAllLabel}</span>
            <ArrowForwardRoundedIcon className="faq__view-all-arrow" />
          </Link>

          {/* Decorative image with quote */}
          <div className="faq__image-block">
            <div className="faq__image-wrap">
              <img
                src={faq_content.image.src}
                alt={faq_content.image.alt}
                className="faq__image"
              />
            </div>
            <div className="faq__quote-card">
              <p className="faq__quote-text">
                &ldquo;{home_section.quote}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* ── Right: Accordion + CTA ── */}
        <div className="faq__right">
          <div className="faq__accordion" role="list">
            {faq_data.faqData.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`faq__item${isOpen ? " faq__item--open" : ""}`}
                  role="listitem"
                >
                  <button
                    className="faq__question"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    {isOpen ? (
                      <RemoveRoundedIcon className="faq__toggle-icon" />
                    ) : (
                      <AddRoundedIcon className="faq__toggle-icon" />
                    )}
                  </button>
                  {isOpen && <p className="faq__answer">{item.answer}</p>}
                </div>
              );
            })}
          </div>

          {/* ── Help CTA Card ── */}
          <div className="faq__cta">
            <div className="faq__cta-content">
              <h3 className="faq__cta-title">{home_section.helpCard.title}</h3>
              <p className="faq__cta-desc">
                {home_section.helpCard.description}
              </p>
              <Link to={faq_content.button.path} className="faq__cta-btn">
                {home_section.helpCard.buttonLabel}
              </Link>
            </div>
            <ContactSupportRoundedIcon className="faq__cta-icon" />
          </div>
        </div>
      </div>
    </section>
  );
};

FrequentlyAskedQuestions.propTypes = {
  JSON: PropTypes.object.isRequired,
};

export default FrequentlyAskedQuestions;
