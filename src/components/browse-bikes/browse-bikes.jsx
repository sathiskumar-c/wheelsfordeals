// React Imports
import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Local Imports
import "./browse-bikes.scss";
import JSON from "../../data/browse-bikes.json";

const BrowseBikesBy = () => {
  // State management
  const [activeCategory, setActiveCategory] = useState("brand");

  const handleCategoryChange = (categoryValue) => {
    setActiveCategory(categoryValue);
  };

  // Get the active category data
  const getCategoryData = (categoryValue) => {
    switch (categoryValue) {
      case "brand":
        return JSON.browsebybrand?.data || [];
      case "price":
        return JSON.browsebyprice?.data || [];
      case "displacement":
        return JSON.browsebydisplacement?.data || [];
      case "evtech":
        return JSON.browsebyevtech?.data || [];
      default:
        return [];
    }
  };

  return (
    <section className="browse-bikes-container">
      {/* Header Section */}
      <header className="browse-bikes__header">
        <p className="browse-bikes__subtitle">{JSON.subtitle}</p>
        <h1 className="browse-bikes__title">
          Curated Selection
          <br />
          <span style={{ color: "#6c45c0" }}>by Preference</span>
        </h1>
      </header>

      {/* Browse Bikes Split Layout */}
      <div className="browse-bikes__wrapper">
        {/* Left Sidebar */}
        <aside className="browse-bikes__sidebar">
          <nav className="browse-bikes__categories">
            {JSON.categories.map((category) => (
              <div
                key={category.id}
                className={`browse-bikes__category-item ${activeCategory === category.value ? "active" : ""}`}
                onClick={() => handleCategoryChange(category.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleCategoryChange(category.value);
                  }
                }}
                role="button"
                tabIndex="0"
                aria-pressed={activeCategory === category.value}
              >
                <span className="browse-bikes__category-number">
                  {category.categoryNumber}
                </span>
                <h3 className="browse-bikes__category-label">
                  {category.icon && (
                    <span className="material-symbols-outlined browse-bikes__category-icon">
                      {category.icon}
                    </span>
                  )}
                  {category.label}
                </h3>
              </div>
            ))}
          </nav>
          <div className="browse-bikes__quote">
            <p>{JSON.tagline}</p>
          </div>
        </aside>

        {/* Right Content Area */}
        <div className="browse-bikes__content">
          {activeCategory === "brand" ? (
            // Brand Grid (Simple Card Style)
            <div className="browse-bikes__brand-section">
              <div className="browse-bikes__brand-header">
                <h2 className="browse-bikes__brand-title">
                  {JSON.browsebybrand?.title}
                </h2>
                <p className="browse-bikes__brand-subtitle">
                  {JSON.browsebybrand?.subtitle}
                </p>
              </div>
              <div className="browse-bikes__brand-grid">
                {getCategoryData("brand").map((brand) => (
                  <Link
                    key={brand.id}
                    to={`/bikes/brands/${brand.path}`}
                    className="browse-bikes__brand-card"
                    aria-label={`View bikes from ${brand.name}`}
                  >
                    <div className="browse-bikes__brand-card-logo">
                      <img
                        src={brand.image}
                        alt={brand.alt}
                        className="browse-bikes__brand-card-logo-img"
                      />
                    </div>
                    <h3 className="browse-bikes__brand-card-name">
                      {brand.name}
                    </h3>
                    <p className="browse-bikes__brand-card-description">
                      {brand.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ) : activeCategory === "price" ? (
            // Budget Grid
            <div className="browse-bikes__budget-section">
              <div className="browse-bikes__budget-header">
                <h2 className="browse-bikes__budget-title">
                  {JSON.browsebyprice?.title}
                </h2>
                <p className="browse-bikes__budget-subtitle">
                  {JSON.browsebyprice?.subtitle}
                </p>
              </div>
              <div className="browse-bikes__budget-grid">
                {getCategoryData("price").map((item) => (
                  <Link
                    key={item.id}
                    to={`/bikes/budget/${item.path}`}
                    className={`browse-bikes__budget-card ${item.isFlagship ? "flagship" : ""}`}
                  >
                    <div className="browse-bikes__budget-card-icon">
                      <span className="material-symbols-outlined">
                        {item.icon}
                      </span>
                    </div>
                    <div className="browse-bikes__budget-card-content">
                      <span className="browse-bikes__budget-category">
                        {item.category}
                      </span>
                      <h3 className="browse-bikes__budget-card-title">
                        {item.title}
                      </h3>
                    </div>
                    <p className="browse-bikes__budget-card-description">
                      {item.description}
                    </p>
                  </Link>
                ))}

                {/* Custom Quote Empty State */}
                <div className="browse-bikes__budget-card browse-bikes__budget-card--empty">
                  <p className="browse-bikes__budget-empty-text">
                    Can&apos;t find your range?
                  </p>
                  <button className="browse-bikes__budget-custom-btn">
                    Request Custom Quote
                  </button>
                </div>
              </div>
            </div>
          ) : activeCategory === "displacement" ? (
            // Displacement Bento Grid
            <div className="browse-bikes__displacement-section">
              <div className="browse-bikes__displacement-header">
                <h2 className="browse-bikes__displacement-title">
                  {JSON.browsebydisplacement?.title}
                </h2>
                <p className="browse-bikes__displacement-subtitle">
                  {JSON.browsebydisplacement?.subtitle}
                </p>
              </div>
              <div className="browse-bikes__bento-grid">
                {getCategoryData("displacement").map((item) => (
                  <Link
                    key={item.id}
                    to={`/bikes/displacement/${item.path}`}
                    className={`browse-bikes__bento-card ${item.featured ? "featured" : ""} ${item.isFlagship ? "flagship" : ""}`}
                  >
                    <div className="browse-bikes__bento-card-content">
                      <span className="browse-bikes__bento-category">{`CATEGORY: ${item.category.toUpperCase()}`}</span>
                      <h3 className="browse-bikes__bento-title">
                        {item.title}
                      </h3>
                    </div>
                    <div className="browse-bikes__bento-footer">
                      <p className="browse-bikes__bento-description">
                        {item.description}
                      </p>
                      <span className="material-symbols-outlined browse-bikes__bento-icon">
                        {item.icon}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : activeCategory === "evtech" ? (
            // EV Tech Bento Grid
            <div className="browse-bikes__evtech-section">
              <div className="browse-bikes__evtech-header">
                <h2 className="browse-bikes__evtech-title">
                  {JSON.browsebyevtech?.title}
                </h2>
                <p className="browse-bikes__evtech-subtitle">
                  {JSON.browsebyevtech?.subtitle}
                </p>
              </div>
              <div className="browse-bikes__bento-grid">
                {getCategoryData("evtech").map((item) => (
                  <Link
                    key={item.id}
                    to={`/bikes/evtech/${item.path}`}
                    className={`browse-bikes__bento-card ${item.featured ? "featured" : ""} ${item.isFlagship ? "flagship" : ""}`}
                  >
                    <div className="browse-bikes__bento-card-content">
                      <span className="browse-bikes__bento-category">{`CATEGORY: ${item.category.toUpperCase()}`}</span>
                      <h3 className="browse-bikes__bento-title">
                        {item.title}
                      </h3>
                    </div>
                    <div className="browse-bikes__bento-footer">
                      <p className="browse-bikes__bento-description">
                        {item.description}
                      </p>
                      <span className="material-symbols-outlined browse-bikes__bento-icon">
                        {item.icon}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          {/* Pagination */}
          {activeCategory === "brand" && (
            <div className="browse-bikes__pagination">
              <p>
                Showing{" "}
                <span className="browse-bikes__pagination-count">
                  {getCategoryData("brand").length}
                </span>{" "}
                premier partners
              </p>
              <Link to="/bikes/all" className="browse-bikes__view-all">
                VIEW ALL BRANDS
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BrowseBikesBy;
