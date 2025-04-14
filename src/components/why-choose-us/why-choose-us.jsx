import React from "react";
import JSON from "../../data/why-choose-us.json";
import "./why-choose-us.scss";

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us component-parent">
      <div className="container">
        <h3 className="section-title">{JSON.title}</h3>
        <div className="grid">
          {JSON.whychooseusdata.map((item, index) => (
            <div key={index} className="card">
              <img src={item.icon} alt={item.title} className="icon" />
              <h3 className="card-title">{item.title}</h3>
              <p className="card-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
