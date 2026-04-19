// React Imports
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

// Local Imports
import "./card-carousel.scss";

const CardCarousel = ({
  items = [],
  config = {},
  filterKey = null,
  headerData = {},
  showHeader = true,
  showViewAllLink = false,
  viewAllPath = "/",
  renderCard = null,
}) => {
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Filter items if needed
  const filteredItems = filterKey
    ? items.filter((item) => item[filterKey] !== filterKey)
    : items;

  const handlePrevSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -400, behavior: "smooth" });
      setActiveSlide(Math.max(0, activeSlide - 1));
    }
  };

  const handleNextSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 400, behavior: "smooth" });
      setActiveSlide(Math.min(filteredItems.length - 1, activeSlide + 1));
    }
  };

  const handleDotClick = (index) => {
    setActiveSlide(index);
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0]?.offsetWidth || 400;
      const gap = 32; // 2rem = 32px
      const scrollPosition = (cardWidth + gap) * index;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="carousel-section">
      {showHeader && (headerData.title || headerData.subtitle) && (
        <div className="carousel-header">
          <div className="carousel-header__left">
            {headerData.subtitle && (
              <span className="carousel-header__eyebrow">
                {headerData.subtitle}
              </span>
            )}
            {headerData.title && (
              <h2 className="carousel-header__title">{headerData.title}</h2>
            )}
          </div>
          {showViewAllLink && (
            <div className="carousel-header__right">
              <Link to={viewAllPath} className="carousel-header__link">
                View All
                <span className="carousel-header__arrow">→</span>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Carousel Section */}
      <div className="carousel-container">
        {/* Navigation Buttons */}
        <button
          className="carousel-nav-btn carousel-nav-btn--prev"
          onClick={handlePrevSlide}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          className="carousel-nav-btn carousel-nav-btn--next"
          onClick={handleNextSlide}
          aria-label="Next slide"
        >
          ›
        </button>

        {/* Carousel Track */}
        <div className="carousel-track" ref={carouselRef}>
          {filteredItems.map((item, index) => {
            const itemConfig = config[item.id] || {};

            return (
              <Link
                to={item.path || "/"}
                className="carousel-card"
                key={item.id || index}
              >
                {renderCard ? (
                  renderCard(item, itemConfig)
                ) : (
                  <div className="carousel-card__wrapper">
                    {itemConfig.bgImage && (
                      <div className="carousel-card__image-wrap">
                        <img
                          src={itemConfig.bgImage}
                          alt={item.title}
                          className="carousel-card__image"
                        />
                        <div className="carousel-card__overlay" />
                      </div>
                    )}
                    <div className="carousel-card__content">
                      <h3 className="carousel-card__title">{item.title}</h3>

                      {itemConfig.features && (
                        <div className="carousel-card__features">
                          {itemConfig.features.map((feature, idx) => (
                            <div
                              key={idx}
                              className="carousel-card__feature-chip"
                            >
                              <img
                                src={feature.icon}
                                alt={feature.label}
                                className="carousel-card__feature-icon"
                                loading="lazy"
                              />
                              <span className="carousel-card__feature-label">
                                {feature.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      <p className="carousel-card__desc">
                        {itemConfig.fullDescription || item.description}
                      </p>
                      <div className="carousel-card__cta">
                        <span>Learn more</span>
                        <span className="carousel-card__arrow">→</span>
                      </div>
                    </div>
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Pagination Dots */}
        <div className="carousel-pagination">
          {filteredItems.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === activeSlide ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeSlide}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardCarousel;
