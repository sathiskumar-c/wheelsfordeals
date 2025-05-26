// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Local Imports
import "./utils.scss";

const BikeImageSwiper = ({ images }) => {
  if (!images || images.length === 0) {
    return <div>No images available.</div>;
  }

  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {images?.map((image, index) => (
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
