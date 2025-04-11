import React from "react";
import { useNavigate } from "react-router-dom";
import "../our-services/our-servcies.scss";
import OurServicesData from "../../../src/data/our-services.json";

const OurServices = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    return navigate(path);
  };

  return (
    <section className="services-section">
      <h2 className="services-heading">{OurServicesData.title}</h2>
      <div className="services-container">
        {OurServicesData.ourservicesdata.map((service, index) => (
          <div
            onClick={() => handleNavigate(service.path)}
            className="service-item"
            key={index}
          >
            <img
              src={service.imgSrc}
              alt={service.title}
              title={service.title}
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
