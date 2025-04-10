import React from "react";
import "./insight-driven.scss";
import insightsData from "../../../src/data//insight-driven.json";

const Insights = () => {
  return (
    <section className="insights-section">
      <h2 className="section-title">{insightsData.title}</h2>
      <div className="insights-grid">
        {insightsData.data.map((insight, index) => (
          <div key={index} className="insight-card">
            <img src={insight.image} alt="icon" className="insight-icon" />
            <div className="insight-content">
              <h3 className="insight-value">{insight.value}</h3>
              <p className="insight-text">{insight.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Insights;
