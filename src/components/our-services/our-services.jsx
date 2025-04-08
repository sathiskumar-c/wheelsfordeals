import React from "react";
import "../our-services/our-servcies.scss";
import OurServicesData from "../../../src/data/our-services.json";

const OurServices = () => {
  return (
    <section className="services-section">
      <h2 className="services-heading">Our Services</h2>
      <div className="services-container">
        {OurServicesData.ourservicesdata.map((service, index) => (
          <div className="service-item" key={index}>
            <img
              src={service.imgSrc}
              alt={service.title}
              className="service-icon"
            />
            <div className="service-title">{service.title}</div>
            <div className="service-description">{service.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
