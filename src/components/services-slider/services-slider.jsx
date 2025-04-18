import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./services-slider.scss";
import JSON from "../../data/services-slider.json";
import { Link } from "react-router-dom";

const ServiceCards = () => {
  return (
    <section
      className="services-wrapper component-parent container mt-5"
      role="region"
      aria-labelledby="services-heading"
    >
      <h2
        id="services-heading"
        className="services-title section-title pb-0 mb-0"
      >
        {JSON.title}
      </h2>
      <Swiper
        loop={true}
        slidesPerView={4}
        centeredSlides={true}
        grabCursor={true}
        pagination={{ dynamicBullets: true }}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper cards-container"
        aria-label="Service cards carousel"
      >
        {JSON.ourservices.map((service) => (
          <SwiperSlide key={service.id}>
            <article
              className="service-card"
              style={{ backgroundColor: service.backgroundColor }}
              aria-labelledby={`service-title-${service.id}`}
            >
              <img
                src={service.image || "/images/brands/hero.png"}
                alt={`${service.title} - ${service.category}`}
                title={service.title}
                className="service-image"
                loading="lazy"
              />
              <div className="service-content">
                <div className="service-category-parent">
                  <span className="service-category">{service.category}</span>
                  <hr className="service-divider" />
                </div>
                <h3
                  id={`service-title-${service.id}`}
                  className="service-title mt-3"
                >
                  {service.title || "Service Title"}
                </h3>
                <ul
                  className="service-features"
                  aria-label={`Features of ${service.title}`}
                >
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <img
                        src={feature.icon}
                        alt={
                          feature.text ? `${feature.text} icon` : "Feature icon"
                        }
                        title={feature.text}
                        loading="lazy"
                      />
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/${service.path}`}
                  className="service-btn-link"
                  aria-label={`Learn more about ${service.title}`}
                >
                  <div className="service-btn">
                    {service.buttonText || "Learn More"}
                  </div>
                </Link>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ServiceCards;
