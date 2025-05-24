import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./utils.scss";
import { EffectCreative } from "swiper/modules";

const BikeImageSwiper = ({ images }) => {
  if (!images || images.length === 0) {
    return <div>No images available.</div>;
  }

  return (
    <Swiper
      grabCursor={true}
      effect={"creative"}
      creativeEffect={{
        prev: {
          shadow: true,
          translate: [0, 0, -400],
        },
        next: {
          translate: ["100%", 0, 0],
        },
      }}
      modules={[EffectCreative]}
      className="mySwiper"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="slide-container">
            <img
              src={image.url}
              alt={image.alt}
              title={image.title}
              className="bike-image"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BikeImageSwiper;
