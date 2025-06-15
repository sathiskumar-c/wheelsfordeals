// React Imports
import { useMemo } from "react";

// Local Imports
import "./utils.scss";

// Reusable component for each label-value pair
const OverviewItem = ({ label, value }) => (
  <div className="bike-overview-item">
    <div className="bike-overview-label">{label}</div>
    <div className="bike-overview-value">{value}</div>
  </div>
);

// Reusable component for a row
const OverviewRow = ({ children, className = "" }) => (
  <div className={`bike-overview-row ${className}`}>{children}</div>
);

const BikeDetailsOverview = ({ bike }) => {
  if (!bike) return null;

  const discountedPrice = useMemo(() => {
    const price = bike?.price;
    if (price?.discount_percent) {
      return (
        price.original_price -
        (price.original_price * price.discount_percent) / 100
      );
    }
    return price?.original_price;
  }, [bike]);

  return (
    <div className="bike-overview-container">
      <h2 className="bike-overview-title section-title mb-0">Bike Overview</h2>
      <div className="bike-overview-card">
        <div className="bike-overview-note">
          <span className="note-star">*</span>
          <span>All details are as per documents and latest inspection.</span>
        </div>

        <div className="bike-overview-grid">
          <OverviewRow>
            <OverviewItem label="Brand" value={bike?.brand} />
            <OverviewItem label="Model" value={bike?.model} />
            <OverviewItem label="Year" value={bike?.year_of_model} />
          </OverviewRow>

          <OverviewRow>
            <OverviewItem
              label="Registration Year"
              value={bike?.registration_year}
            />
            <OverviewItem
              label="Km Driven"
              value={`${bike?.km_driven?.toLocaleString()} km`}
            />
            <OverviewItem label="Owner" value={bike?.owner_count} />
          </OverviewRow>

          <OverviewRow>
            <OverviewItem label="Condition" value={bike?.bike_condition} />
            <OverviewItem label="Color" value={bike?.color} />
            <OverviewItem label="Body Type" value={bike?.body_type} />
          </OverviewRow>

          <OverviewRow>
            <OverviewItem
              label="Fuel Type"
              value={bike?.engine_and_performance?.fuel_type}
            />
            <OverviewItem
              label="Engine (cc)"
              value={bike?.engine_and_performance?.engine_cc}
            />
            <OverviewItem
              label="Transmission"
              value={
                <>
                  {bike?.engine_and_performance?.transmission_type}
                  <span
                    className="info-icon"
                    title={bike?.engine_and_performance?.transmission_type}
                    role="img"
                    aria-label="Transmission Info"
                  >
                    <svg height="16" width="16" viewBox="0 0 16 16">
                      <circle cx="8" cy="8" r="8" fill="#26003c" />
                      <text
                        x="8"
                        y="12"
                        textAnchor="middle"
                        fontSize="12"
                        fill="white"
                        fontFamily="Arial"
                      >
                        i
                      </text>
                    </svg>
                  </span>
                </>
              }
            />
          </OverviewRow>

          <OverviewRow>
            <OverviewItem
              label="Insurance"
              value={
                bike?.documents?.insurance?.is_valid
                  ? `Valid (${bike.documents.insurance.validity_period})`
                  : "Not Available"
              }
            />
            <OverviewItem label="RTO" value={bike?.rto?.location_code} />
            <OverviewItem label="Location" value={bike?.location} />
          </OverviewRow>

          <OverviewRow>
            <OverviewItem
              label="Price"
              value={
                <>
                  ₹{discountedPrice?.toLocaleString()}
                  {bike?.price?.discount_percent && (
                    <span className="original-price-strike">
                      ₹{bike.price.original_price.toLocaleString()}
                    </span>
                  )}
                </>
              }
            />
            <OverviewItem
              label="ABS"
              value={bike?.brakes?.abs ? "Yes" : "No"}
            />
            <OverviewItem
              label="Test Ride"
              value={
                bike?.test_ride?.availability
                  ? `Available (${bike.test_ride.range_km} km)`
                  : "Not Available"
              }
            />
          </OverviewRow>
        </div>
      </div>
    </div>
  );
};

export default BikeDetailsOverview;
