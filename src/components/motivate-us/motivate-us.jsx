// React Import
import React from "react";

// SwiperJs Import
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Local Import
import "./motivate-us.scss";
import JSON from "../../data/motivate-us.json";
import { Link } from "react-router-dom";

const MotivateUs = () => {
  return (
    <section
      className="motivateus-section component-parent"
      aria-labelledby="motivateus-heading"
    >
      <div className="motivateus-wrapper">
        <aside className="motivateus-sidebar">
          <h3 id="motivateus-heading" className="section-title pb-0">
            {JSON.title}
          </h3>
          <p className="motivateus-rating">
            <strong>{JSON.ratingValue}</strong> {JSON.ratingLabel}
          </p>
          <div className="motivateus-store-links">
            {JSON.apps.map((item) => {
              return (
                <Link to={item.path}>
                  <img src={item.image} alt={item.alt} title={item.label} />
                </Link>
              );
            })}
          </div>
        </aside>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1300: { slidesPerView: 4 },
          }}
          className="motivateus-slider"
        >
          {JSON.reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <article className="motivateus-card">
                <header className="card-header">
                  <img src={review.avatar} alt={`${review.name}'s avatar`} />
                  <h3>{review.name}</h3>
                </header>
                <p className="card-text">{review.text}</p>
                <time className="card-date" dateTime={review.date}>
                  {review.date}
                </time>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default MotivateUs;
