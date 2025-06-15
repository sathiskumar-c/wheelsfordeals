// React Imports
import React from "react";

// Component Imports
import BikeProductDetailCard from "./utils/product-details-card";

// Local Imports
import "./utils/utils.scss";
import "./product-details.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import EMICalculator from "../../components/emi-calculator/emi-calculator";
import BikeDetailsOverview from "../product-list/utils/bike-details-overview";

const bikeData = {
  bike_id: "HON4237-NT1942",
  brand: "Honda",
  model: "CBR150R",
  year_of_model: 2024,
  registration_year: 2024,
  posted_date: "2024-11-27",
  price: {
    original_price: 363399.0,
    discount_percent: 5,
  },
  bike_condition: "Good",
  km_driven: 38666,
  owner_count: "1st Owner",
  location: "Bangalore",
  color: "Matte Black",
  images: [
    {
      url: "https://static.toiimg.com/photo/80452572.cms?imgsize=156776",
      alt: "Front view of Honda CBR150R",
      title: "Front View",
    },
    {
      url: "https://images.overdrive.in/wp-content/odgallery/2022/08/63809_2022_Royal_Enfield_Hunter_350_468x263.jpg",
      alt: "Side profile of Honda CBR150R",
      title: "Side View",
    },
    {
      url: "https://cdn.bikedekho.com/processedimages/kawasaki/kawasaki-ninja-zx-10r/source/kawasaki-ninja-zx-10r674008194e755.jpg",
      alt: "Rear view of Honda CBR150R",
      title: "Rear View",
    },
    {
      url: "https://beepkart.com/images/blogs/fastest-bikes.webp",
      alt: "Close-up of odometer showing 38666 km",
      title: "Odometer Reading",
    },
  ],
  engine_and_performance: {
    engine_cc: 403.1,
    max_torque: "32.1 Nm @ 7917 rpm",
    top_speed_kmph: 152,
    mileage_kmpl: 32,
    transmission_type: "Manual",
    gear_count: 5,
    fuel_type: "Petrol",
    fuel_tank_capacity_litres: 13.7,
    emission_standard: "BS4",
  },
  brakes: {
    brake_type: {
      front: "Disc",
      rear: "Disc",
    },
    abs: false,
  },
  tyre_condition: "Good",
  body_type: "Commuter",
  documents: {
    rc_available: true,
    insurance: {
      is_valid: false,
      validity_period: "Expired",
    },
    accident_history: false,
    service_history: true,
  },
  rto: {
    rg_number: "CO43 65 NT 1942",
    location_code: "CO43",
  },
  seller_type: "Dealer",
  test_ride: {
    availability: false,
    range_km: "0",
  },
  exchange: {
    availability: true,
    condition: "Based on vehicle",
  },
  accessories_included: ["Guards", "Mirrors", "Tank Bag", "Gloves"],
  hold: {
    is_held: true,
    held_by_user_id: "user_93797",
    hold_start_time: "2025-05-16T18:58:50.980431Z",
    hold_expiry_time: "2025-05-17T18:58:50.980431Z",
  },
  selling_status: "available",
  dealer_details: {
    name: "Rapid Motors",
    dealer_id: "dealer_002",
  },
  offers: ["service_package", "insurance"],
  slug: {
    brand: "honda",
    model: "cbr150r",
  },
  key_points: ["Less Driven", "Most popular", "High Quality"],
  emi_and_payments: {
    emi: {
      is_emi_available: true,
      intrest_rate_percent: 12,
      emi_type: "flat",
      min_duration_months: 12,
      max_duration_months: 48,
      default_duration_months: 24,
      loan_tenure_options_months: [12, 18, 24, 36, 48],
      max_loan_percent_of_price: 80,
      processing_fee_percent: 1,
      gst_applicable: true,
      pre_closure: {
        allowed: true,
        charge_percent: 2.5,
      },
      approval_required: true,
      requires_kyc: true,
    },
    payments: {
      is_downpayment_required: true,
      downpayment_percent_min: 10,
      allow_custom_downpayment: true,
    },
  },
};

const ProductDetails = () => {
  return (
    <React.Fragment>
      <div className="product-details container">
        <div className="row">
          <div className="col-md-8">
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              {bikeData?.images.map((item) => {
                return (
                  <SwiperSlide key={item.title}>
                    <img src={item.url} alt={item.title} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div className="col-md-4">
            <BikeProductDetailCard bikeData={bikeData} />
          </div>

          <BikeDetailsOverview bike={bikeData} />

          <div className="row">
            <div className="col-md-8">
              <EMICalculator
                price={(
                  bikeData.price.original_price *
                  (1 - bikeData.price.discount_percent / 100)
                ).toFixed(0)}
                emiDetails={bikeData.emi_and_payments}
              />
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductDetails;
