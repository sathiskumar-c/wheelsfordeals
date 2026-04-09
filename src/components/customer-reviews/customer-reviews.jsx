// React Import
import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// SwiperJs Import
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Local Import
import "./customer-reviews.scss";
import data from "../../data/customer-reviews.json";

// Star rating sub-component
const StarRating = ({ count = 5 }) => (
  <div className="cr-stars" aria-label={`${count} out of 5 stars`} role="img">
    {Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`cr-star${i < count ? " cr-star--filled" : ""}`}
        aria-hidden="true"
      >
        ★
      </span>
    ))}
  </div>
);

// Featured (first) card
const FeaturedCard = ({ review }) => (
  <article
    className="cr-card cr-card--featured"
    aria-label={`Featured review by ${review.name}`}
  >
    <div className="cr-card__glow" aria-hidden="true" />
    <div className="cr-card__body">
      <span className="cr-quote-icon" aria-hidden="true">
        ❝
      </span>
      <blockquote className="cr-card__text">
        &ldquo;{review.text}&rdquo;
      </blockquote>
    </div>
    <div className="cr-card__author">
      <img
        src={review.avatar}
        alt={`${review.name}'s profile photo`}
        className="cr-author__avatar cr-author__avatar--lg"
        loading="lazy"
      />
      <div>
        <h4 className="cr-author__name cr-author__name--light">
          {review.name}
        </h4>
        <p className="cr-author__role cr-author__role--light">{review.role}</p>
      </div>
    </div>
  </article>
);

// Standard review card
const ReviewCard = ({ review }) => (
  <article
    className="cr-card cr-card--default"
    aria-label={`Review by ${review.name}`}
  >
    <div>
      <StarRating count={review.rating} />
      <blockquote className="cr-card__text cr-card__text--dark">
        &ldquo;{review.text}&rdquo;
      </blockquote>
    </div>
    <div className="cr-card__author cr-card__author--bordered">
      {review.avatar ? (
        <img
          src={review.avatar}
          alt={`${review.name}'s profile photo`}
          className="cr-author__avatar"
          loading="lazy"
        />
      ) : (
        <div className="cr-author__initials" aria-hidden="true">
          {review.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </div>
      )}
      <div>
        <h4 className="cr-author__name">{review.name}</h4>
        <p className="cr-author__role">{review.role}</p>
      </div>
    </div>
  </article>
);

StarRating.propTypes = {
  count: PropTypes.number,
};

FeaturedCard.propTypes = {
  review: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string,
    avatar: PropTypes.string,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

ReviewCard.propTypes = {
  review: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string,
    avatar: PropTypes.string,
    rating: PropTypes.number,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

const CustomerReviews = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section
      className="cr-section component-parent"
      aria-labelledby="cr-heading"
    >
      <div className="cr-container">
        {/* Section Label */}
        <div className="cr-label-row">
          <span className="cr-label-line" aria-hidden="true" />
          <span className="cr-label">{data.sectionLabel}</span>
        </div>

        {/* Header */}
        <div className="cr-header">
          <h2 id="cr-heading" className="cr-title">
            {data.title}{" "}
            <span className="cr-title--accent">{data.titleHighlight}</span>
          </h2>

          <div
            className="cr-rating-badge"
            aria-label={`Rated ${data.ratingValue} ${data.ratingLabel}`}
          >
            <div className="cr-rating-avatars" aria-hidden="true">
              {data.reviews.slice(0, 3).map((review, i) => (
                <img
                  key={review.id}
                  src={review.avatar}
                  alt=""
                  className="cr-rating-avatar"
                  style={{ zIndex: 3 - i }}
                />
              ))}
            </div>
            <div>
              <StarRating count={4} />
              <p className="cr-rating-label">
                <strong>{data.ratingValue}</strong> {data.ratingLabel}
              </p>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="cr-carousel-wrapper">
          <button
            ref={prevRef}
            className="cr-nav-btn cr-nav-btn--prev"
            aria-label="Previous review"
          >
            &#8249;
          </button>
          <button
            ref={nextRef}
            className="cr-nav-btn cr-nav-btn--next"
            aria-label="Next review"
          >
            &#8250;
          </button>

          <Swiper
            modules={[Pagination, Navigation]}
            pagination={{ clickable: true }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onSwiper={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            slidesPerView="auto"
            spaceBetween={24}
            className="cr-swiper"
            a11y={{
              prevSlideMessage: "Previous review",
              nextSlideMessage: "Next review",
            }}
          >
            {data.reviews.map((review, index) => (
              <SwiperSlide
                key={review.id}
                className={`cr-slide${index === 0 ? " cr-slide--featured" : ""}`}
              >
                {index === 0 ? (
                  <FeaturedCard review={review} />
                ) : (
                  <ReviewCard review={review} />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Footer CTAs */}
        <div className="cr-footer">
          <div className="cr-footer__info">
            <h3 className="cr-footer__title">{data.footerTitle}</h3>
            <p className="cr-footer__subtitle">{data.subtitle}</p>
          </div>
          <div className="cr-footer__actions">
            <Link
              to={data.ctaPrimary.path}
              className="cr-btn cr-btn--primary"
              aria-label={data.ctaPrimary.label}
            >
              {data.ctaPrimary.label}
              <span className="cr-btn__arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <Link
              to={data.ctaSecondary.path}
              className="cr-btn cr-btn--secondary"
              aria-label={data.ctaSecondary.label}
            >
              {data.ctaSecondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
