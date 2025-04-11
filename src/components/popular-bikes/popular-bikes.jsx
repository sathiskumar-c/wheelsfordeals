import React from "react";
import "./popular-bikes.scss";
import popularBikesData from "../../../src/data/popular-bikes.json";

const PopularBikes = () => {
  return (
    <section className="popular-bike-container container-fluid">
      <h2 className="heading">{popularBikesData.title}</h2>
      <div className="cardContainer">
        {popularBikesData.popularbikedata.map((item) => (
          <div key={item.id} className="card">
            <img
              src={item.imgSrc}
              alt={item.title}
              title={item.title}
              className="image"
            />
            <p className="text">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularBikes;
