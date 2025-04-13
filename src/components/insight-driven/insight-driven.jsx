import React from "react";
import "./insight-driven.scss";
import JSON from "../../../src/data//insight-driven.json";

const Insights = () => {
  return (
    <section className="insights-section component-parent">
      <h3 className="section-title text-center">{JSON.title}</h3>
      <div className="insights-grid">
        {JSON.data.map((insight, index) => (
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
