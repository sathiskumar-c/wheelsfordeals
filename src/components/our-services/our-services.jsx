import React from "react";
import { Link } from "react-router-dom"; // Use Link instead of useNavigate
import "../our-services/our-servcies.scss";
import JSON from "../../../src/data/our-services.json";

const OurServices = () => {
  return (
    <section className="services-section component-parent">
      <h3 className="section-title text-center">{JSON.title}</h3>
      <div className="services-container">
        {JSON.ourservicesdata.map((service, index) => (
          <Link to={service.path} className="service-item" key={index}>
            <img
              src={service.imgSrc}
              alt={service.title}
              title={service.title}
              className="service-icon"
            />
            <div className="service-title">{service.title}</div>
            <div className="service-description">{service.description}</div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
