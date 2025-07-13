// React Imports
import React from "react";
import PropTypes from "prop-types";

// Local Imports
import "./terms-policies.scss";

const TermsPolicies = ({ data }) => {
  return (
    <main className="privacy-policy-page" aria-labelledby="policy-title">
      <header className="privacy-header">
        <h1 id="policy-title">{data.pageTitle}</h1>
      </header>

      <div className="policy-content container">
        {data.sections.map((section, index) => (
          <section className="policy-section" key={index}>
            <h2>{section.heading}</h2>
            {section.content.map((para, pIndex) => (
              <p key={pIndex}>{para}</p>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
};

TermsPolicies.propTypes = {
  data: PropTypes.object.isRequired,
};

export default TermsPolicies;
