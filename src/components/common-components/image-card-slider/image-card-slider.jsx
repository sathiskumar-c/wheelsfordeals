// React Imports
import React from "react";
import PropTypes from "prop-types";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Local Imports
import "./image-card-slider.scss";

const ImageCardSlider = ({
  data,
  show,
  styles,
  breakpoints,
  componentClass,
}) => {
  const { title, cards } = data;

  return (
    <section className={`image-slider-wrapper ${componentClass}`}>
      {show?.title && (
        <div className="image-slider-heading">
          <h2 className="image-slider-title">{title}</h2>
        </div>
      )}

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        navigation
        breakpoints={breakpoints}
        className="image-slider-swiper"
      >
        {cards?.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="image-slider-card">
              <img
                src={item.image}
                alt={item.name}
                className="image-slider-image"
                style={{
                  aspectRatio: styles?.aspectRatio,
                }}
              />

              <div
                className="image-slider-overlay"
                style={{ background: styles?.image_bg }}
              >
                {show?.logo && (
                  <div
                    style={{ width: "fit-content" }}
                    className="image-slider-logo"
                  >
                    <img
                      src={item.logo.image}
                      alt={item.logo.title}
                      title={item.logo.title}
                    />
                    <div className="image-slider-brand">{item.brand}</div>
                  </div>
                )}

                {show?.content && (
                  <div className="image-slider-content">
                    <div className="image-slider-name">
                      <img
                        src={item.user_icon.image}
                        alt={item.user_icon.title}
                        title={item.user_icon.title}
                      />

                      <h5> {item.name}</h5>
                      <h5>{item.location ? ` | ${item.location}` : ""} </h5>
                    </div>
                    <p className="image-slider-quote">{item.quote}</p>
                  </div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
ImageCardSlider.propTypes = {
  data: PropTypes.object.isRequired,
  show: PropTypes.object,
  styles: PropTypes.object,
  breakpoints: PropTypes.object,
  componentClass: PropTypes.string,
};

export default ImageCardSlider;
