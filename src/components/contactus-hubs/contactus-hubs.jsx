// React Imports
import React from "react";

// Local Imports
import "./contactus-hubs.scss";
import JSON from "../../data/contactus-hubs.json";

// MUI Imports
import LocationOnIcon from "@mui/icons-material/LocationOn";

const ContactUsHubs = () => {
  return (
    <section className="contactus-hubs container-fluid">
      <h2 className="hubs-title">{JSON.title}</h2>
      <div className="hubs-wrapper">
        {JSON.hubs.map((hub, index) => (
          <div className="hub-card" key={index}>
            <div className="hub-image-wrapper">
              <img src={hub.image} alt={hub.title} className="hub-image" />
              <div className="hub-image-overlay">
                <p className="hub-title">{hub.title}</p>
                <div className="hub-location-icon">
                  <LocationOnIcon />
                </div>
              </div>
            </div>
            <div className="hub-info">
              <p className="hub-address">{hub.address}</p>
              <p className="hub-timing">{hub.timing}</p>
              <button className="hub-button">View {hub.cars} Cars</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactUsHubs;
