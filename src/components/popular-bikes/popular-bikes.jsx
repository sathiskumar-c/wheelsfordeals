// React Imports
import React from "react";
import { Link } from "react-router-dom";

// Component Imports
import InfoCard from "../common-components/cards/info-card/infor-card";

// Local Imports
import "./popular-bikes.scss";
import JSON from "../../../src/data/popular-bikes.json";

const PopularBikes = () => {
  return (
    <section className="popular-bike-container container-fluid component-parent">
      <h3 className="section-title text-center">{JSON.title}</h3>
      <div className="cardContainer">
        {JSON.popularbikedata.map((item) => (
          <Link key={item.id} to={item.path} className="popularbike-link">
            <InfoCard
              imageUrl={JSON.popularbikedata[0].imgSrc}
              title={item.title}
              description={item.description}
              actionText={item.actionText || "Learn More"}
              actionLink={item.actionLink || item.path}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularBikes;
