import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./image-card-slider.scss";

const ImageCardSlider = ({ data }) => {
  const { title, cards } = data;
  return (
    <section className="image-slider-wrapper">
      <div className="image-slider-heading">
        <h2 className="image-slider-title">{title}</h2>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        navigation
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="image-slider-swiper"
      >
        {cards.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="image-slider-card">
              <img
                src={item.image}
                alt={item.name}
                className="image-slider-image"
              />
              <div className="image-slider-overlay">
                <div style={{ width: "fit-content" }}>
                  <img
                    src={item.logo.image}
                    alt={item.logo.title}
                    title={item.logo.title}
                  />
                  <div className="image-slider-brand">{item.brand}</div>
                </div>
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
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ImageCardSlider;
