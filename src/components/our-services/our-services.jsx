// React Imports
import React from "react";
import { Link } from "react-router-dom";

// MUI Icons
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PaymentsIcon from "@mui/icons-material/Payments";
import DescriptionIcon from "@mui/icons-material/Description";
import CalculateIcon from "@mui/icons-material/Calculate";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Local Imports
import "../our-services/our-servcies.scss";
import servicesData from "../../../src/data/our-services.json";

const SERVICE_ICONS = {
  pedal_bike: <TwoWheelerIcon />,
  storefront: <StorefrontIcon />,
  payments: <PaymentsIcon />,
  description: <DescriptionIcon />,
  calculate: <CalculateIcon />,
};

const OurServices = () => {
  return (
    <section className="services-section">
      <div className="services-header">
        <div className="services-header__left">
          <span className="services-header__eyebrow">
            {servicesData.subtitle}
          </span>
          <h2 className="services-header__title">{servicesData.title}</h2>
        </div>
        <div className="services-header__right">
          <Link to="/our-services" className="services-header__link">
            <ArrowForwardIcon className="services-header__link-icon" />
            View Our Services
          </Link>
        </div>
      </div>
      <div className="services-container">
        {servicesData.ourservicesdata.map((service) => (
          <Link to={service.path} className="service-item" key={service.id}>
            <div className="service-item__icon-wrap">
              <span className="service-item__icon">
                {SERVICE_ICONS[service.icon]}
              </span>
            </div>
            <div className="service-item__title">{service.title}</div>
            <div className="service-item__description">
              {service.description}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
