// React Imports
import React from "react";

// Components Imports
import ContactUsQuery from "../../components/contactus-query/contactus-query";
import ContactUsBanner from "../../components/contactus-banner/contactus-banner";
import ContactUsHubs from "../../components/contactus-hubs/contactus-hubs";
import Breadcrumb from "../../components/common-components/breadcrumb/breadcrumb";

// JSON Imports
import breadcrumbData from "../../data/breadcrumb.json";

// Local Imports
import "./contactus.scss";

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <Breadcrumb breadcrumbData={breadcrumbData.contactUs.breadcrumbs} />
      <ContactUsBanner />
      <ContactUsQuery />
      <ContactUsHubs />
    </div>
  );
};

export default ContactUs;
