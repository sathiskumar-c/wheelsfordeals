// React Imports
import React from "react";
import { Link } from "react-router-dom";

// Local Imports
import "../our-services/our-servcies.scss";
import servicesData from "../../../src/data/our-services.json";

const OurServices = () => {
  return (
    <section className="services-section">
      <div className="services-header">
        <div className="services-header__left">
          <span className="services-header__eyebrow">
            {servicesData.subtitle}
          </span>
          <h2 className="services-header__title">{servicesData.title}</h2>
          <p className="services-header__description">
            {servicesData.description}
          </p>
        </div>
        <div className="services-header__right">
          <Link to="/our-services" className="services-header__link">
            View All Services
            <span className="services-header__arrow">→</span>
          </Link>
        </div>
      </div>

      {/* Services Grid */}
      <div className="services-grid">
        {servicesData.ourservicesdata
          .filter((service) => service.id !== "ourservices-visithub")
          .map((service) => (
            <Link
              to={service.path}
              className="service-item"
              key={service.id}
              title={service.title}
            >
              <div className="service-item__icon-wrap">
                <span className="material-symbols-outlined service-item__icon">
                  {service.icon}
                </span>
              </div>
              <h3 className="service-item__title">{service.title}</h3>
              <p className="service-item__description">{service.description}</p>
              <span className="service-item__cta">Learn more →</span>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default OurServices;
