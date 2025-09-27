// React Import
import React from "react";

// Components Imports
import AboutusBanner from "../../components/aboutus-banner/aboutus-banner";
import Breadcrumb from "../../components/common-components/breadcrumb/breadcrumb";

//JSON Imports
import breadcrumbData from "../../data/breadcrumb.json";

// Local Imports
import "./aboutus.scss";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <Breadcrumb breadcrumbData={breadcrumbData.aboutUs.breadcrumbs} />
      <AboutusBanner />
    </div>
  );
};

export default AboutUs;
