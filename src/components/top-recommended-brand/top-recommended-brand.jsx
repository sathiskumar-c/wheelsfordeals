import React from "react";
import { useNavigate } from "react-router-dom";
import "./top-recommended-brand.scss";
import JSON from "../../data/top-recommended-brand.json";

const TopRecommendedBrand = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    return navigate(path);
  };

  return (
    <div className="scroll-container component-parent">
      <h3 className="section-title text-center">{JSON.title}</h3>
      <div className="scroll-track">
        {JSON.toprecommendeddata.map((brand, index) => (
          <div
            className="brand-card"
            key={index}
            onClick={() => handleNavigate(brand.path)}
          >
            <img src={brand.image} alt={brand.alt} className="brand-img" />
            <p className="brand-name">{brand.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TopRecommendedBrand;
