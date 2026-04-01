// React Imports
import React from "react";

// Local Imports
import "./popular-bikes.scss";
import data from "../../../src/data/popular-bikes.json";
import InfoCard from "../common-components/cards/info-card/infor-card";

const PopularBikes = () => {
  return (
    <section className="popular-bikes container">
      <div className="popular-bikes__header">
        <h2 className="popular-bikes__title">{data.title}</h2>
        {/* <p className="popular-bikes__subtitle">{data.subtitle}</p> */}
      </div>

      <div className="popular-bikes__grid">
        {data.popularbikedata.map((item) => (
          <InfoCard
            key={item.id}
            imageUrl={item.imgSrc}
            title={item.cardTitle}
            description={item.description}
            actionText={item.actionText}
            actionLink={item.path}
            badge={item.badge}
            badgeVariant={item.badgeVariant}
          />
        ))}
      </div>
    </section>
  );
};

export default PopularBikes;
