import React from "react";
import { Link } from "react-router-dom";
import "./top-recommended-brand.scss";
import JSON from "../../data/top-recommended-brand.json";

const TopRecommendedBrand = () => {
  return (
    <section
      className="scroll-container component-parent"
      role="complementary"
      aria-labelledby="top-brands-title"
    >
      <h2 id="top-brands-title" className="section-title text-center">
        {JSON.title || "Top Recommended Motorcycle Brands"}
      </h2>
      <div
        className="scroll-track"
        role="list"
        aria-label="List of top recommended motorcycle brands"
      >
        {JSON.toprecommendeddata.map((brand) => (
          <article className="brand-card" key={brand.id} role="listitem">
            <Link
              to={`/brands/${brand.path}`}
              className="brand-link"
              aria-label={`Explore ${brand.name} ${brand.fuel_type} motorcycles`}
              title={`${brand.name} Motorcycles`}
            >
              <img
                src={brand.image}
                alt={brand.alt || `${brand.name} motorcycle logo`}
                className="brand-img"
                loading="lazy"
              />
              <p className="brand-name">{brand.name}</p>
              {/* <span className="fuel-type sr-only">
                {brand.fuel_type} powered
              </span> */}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TopRecommendedBrand;
