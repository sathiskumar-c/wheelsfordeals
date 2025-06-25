// React Imports
import React, { useState } from "react";
import PropTypes from "prop-types";

// Component Imports
import CommonAccordion from "../common-components/accordion/accordion";

// Local Imports
import "./frequently-asked-questions.scss";

const FrequentlyAskedQuestions = ({ JSON }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <section
      className="container faq-parent component-parent"
      aria-labelledby="frequently-asked-questions"
      role="region"
    >
      <h3 className="section-title text-center" id="faq-title">
        {JSON?.faq_data?.title}
      </h3>

      <div className="faq-list" role="list">
        {JSON.faq_data?.faqData.map((item, index) => {
          const panelId = `panel${index}`;
          return (
            <CommonAccordion
              key={panelId}
              id={panelId}
              expanded={expanded}
              onChange={handleChange}
              question={item.question}
              answer={item.answer}
            />
          );
        })}
      </div>
    </section>
  );
};

FrequentlyAskedQuestions.propTypes = {
  JSON: PropTypes.object.isRequired,
};

export default FrequentlyAskedQuestions;
