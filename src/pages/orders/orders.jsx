// React core
import React, { useState } from "react";

// React Router — programmatic navigation
import { useNavigate } from "react-router-dom";

// MUI icons
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ScheduleIcon from "@mui/icons-material/Schedule";
import FilterListIcon from "@mui/icons-material/FilterList";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";

// Page styles
import "./orders.scss";

const Orders = () => {
  const navigate = useNavigate();

  const [orders] = useState([
    {
      order_id: "WFD037491503",
      order_placed: "Thu, 17th Nov 24",
      total_amount: 2850,
      payment_method: "Credit Card ending with 7243",
      bikes: [
        {
          bike_id: "HON4237-NT1942",
          brand: "Honda",
          model: "CBR150R",
          year: 2024,
          image: "https://static.toiimg.com/photo/80452572.cms?imgsize=156776",
          price: 1250,
          size: "150cc",
          quantity: 1,
          status: "In Transit",
          delivery_expected: "24 December 2025",
          seller: "Honda Motors",
        },
        {
          bike_id: "KTM5547-AD2156",
          brand: "KTM",
          model: "Duke 200",
          year: 2024,
          image:
            "https://cdn.bikedekho.com/processedimages/kawasaki/kawasaki-ninja-zx-10r/source/kawasaki-ninja-zx-10r674008194e755.jpg",
          price: 1600,
          size: "200cc",
          quantity: 1,
          status: "In Transit",
          delivery_expected: "24 December 2025",
          seller: "KTM India",
        },
      ],
    },
    {
      order_id: "WFD045823109",
      order_placed: "Mon, 12th Nov 24",
      total_amount: 4200,
      payment_method: "UPI Payment",
      bikes: [
        {
          bike_id: "RYL8834-MN3421",
          brand: "Royal Enfield",
          model: "Classic 350",
          year: 2024,
          image:
            "https://images.overdrive.in/wp-content/odgallery/2022/08/63809_2022_Royal_Enfield_Hunter_350_468x263.jpg",
          price: 2100,
          size: "350cc",
          quantity: 2,
          status: "Delivered",
          delivery_expected: "20 November 2024",
          delivered_date: "18 November 2024",
          seller: "Royal Enfield",
        },
      ],
    },
    {
      order_id: "WFD089456712",
      order_placed: "Fri, 8th Nov 24",
      total_amount: 3200,
      payment_method: "Debit Card ending with 8956",
      bikes: [
        {
          bike_id: "YAM7823-PQ4567",
          brand: "Yamaha",
          model: "R15 V4",
          year: 2024,
          image: "https://beepkart.com/images/blogs/fastest-bikes.webp",
          price: 1600,
          size: "155cc",
          quantity: 2,
          status: "Processing",
          delivery_expected: "28 December 2025",
          seller: "Yamaha Motor",
        },
      ],
    },
    {
      order_id: "WFD098234567",
      order_placed: "Wed, 5th Nov 24",
      total_amount: 1850,
      payment_method: "Net Banking",
      bikes: [
        {
          bike_id: "BAJ9876-XY1234",
          brand: "Bajaj",
          model: "Pulsar NS200",
          year: 2024,
          image: "https://static.toiimg.com/photo/80452572.cms?imgsize=156776",
          price: 1850,
          size: "200cc",
          quantity: 1,
          status: "Cancelled",
          cancellation_reason: "Requested by customer",
          seller: "Bajaj Auto",
        },
      ],
    },
  ]);

  const getStatusConfig = (status) => {
    switch (status) {
      case "Delivered":
        return {
          icon: <CheckCircleIcon sx={{ fontSize: 16 }} />,
          className: "status-badge status-badge--delivered",
          footerIcon: <VerifiedIcon sx={{ fontSize: 16, color: "#16a34a" }} />,
          footerText: (bike) => `Delivered on ${bike.delivered_date}`,
        };
      case "In Transit":
        return {
          icon: <LocalShippingIcon sx={{ fontSize: 16 }} />,
          className: "status-badge status-badge--transit",
          footerIcon: <InfoOutlinedIcon sx={{ fontSize: 16 }} />,
          footerText: (bike) =>
            `Expected delivery by ${bike.delivery_expected}`,
        };
      case "Processing":
        return {
          icon: <ScheduleIcon sx={{ fontSize: 16 }} />,
          className: "status-badge status-badge--processing",
          footerIcon: <InfoOutlinedIcon sx={{ fontSize: 16 }} />,
          footerText: (bike) =>
            `Expected delivery by ${bike.delivery_expected}`,
        };
      case "Cancelled":
        return {
          icon: <CancelIcon sx={{ fontSize: 16 }} />,
          className: "status-badge status-badge--cancelled",
          footerIcon: null,
          footerText: (bike) => bike.cancellation_reason,
        };
      default:
        return {
          icon: <ScheduleIcon sx={{ fontSize: 16 }} />,
          className: "status-badge status-badge--processing",
          footerIcon: <InfoOutlinedIcon sx={{ fontSize: 16 }} />,
          footerText: () => "",
        };
    }
  };

  return (
    <div className="my-orders">
      <div className="my-orders__inner">
        {/* Page Header */}
        <div className="my-orders__header">
          <div>
            <nav className="my-orders__breadcrumb">
              <span
                className="my-orders__breadcrumb-link"
                onClick={() => navigate("/")}
              >
                Home
              </span>
              <span className="my-orders__breadcrumb-sep">›</span>
              <span className="my-orders__breadcrumb-current">My Orders</span>
            </nav>
            <h1 className="my-orders__title">My Orders</h1>
            <p className="my-orders__subtitle">
              Manage your bike acquisitions and track their delivery progress in
              real-time.
            </p>
          </div>
          <div className="my-orders__filters">
            <div className="filter-chip">
              <FilterListIcon sx={{ fontSize: 16 }} />
              <span>Filter by Status</span>
            </div>
            <div className="filter-chip">
              <CalendarTodayIcon sx={{ fontSize: 16 }} />
              <span>Last 3 Months</span>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="orders-list">
          {orders.map((order) =>
            order.bikes.map((bike) => {
              const config = getStatusConfig(bike.status);
              const isCancelled = bike.status === "Cancelled";

              return (
                <div
                  key={bike.bike_id}
                  className={`order-card ${isCancelled ? "order-card--cancelled" : ""}`}
                >
                  {/* Bike Image */}
                  <div
                    className={`order-card__image-wrap ${isCancelled ? "order-card__image-wrap--grayscale" : ""}`}
                  >
                    <img
                      src={bike.image}
                      alt={`${bike.brand} ${bike.model}`}
                      className="order-card__image"
                      loading="lazy"
                    />
                    <span className="order-card__asset-tag">
                      #{order.order_id}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="order-card__body">
                    {/* Top row */}
                    <div className="order-card__top">
                      <div>
                        <h3
                          className={`order-card__bike-name ${isCancelled ? "order-card__bike-name--cancelled" : ""}`}
                        >
                          {bike.brand} {bike.model} ({bike.year})
                        </h3>
                        <div className="order-card__meta">
                          <span className="order-card__order-id">
                            ORDER ID: #{order.order_id}
                          </span>
                          <span className="order-card__dot">•</span>
                          <span>Placed on {order.order_placed}</span>
                        </div>
                      </div>
                      <span className={config.className}>
                        {config.icon}
                        {bike.status}
                      </span>
                    </div>

                    {/* Data Grid */}
                    {!isCancelled && (
                      <div className="order-card__grid">
                        <div className="order-card__data-item">
                          <span className="order-card__data-label">
                            Purchase Price
                          </span>
                          <span className="order-card__data-value order-card__data-value--price">
                            Rs.{bike.price.toLocaleString()}
                          </span>
                        </div>
                        <div className="order-card__data-item">
                          <span className="order-card__data-label">
                            {bike.status === "Delivered"
                              ? "Delivered On"
                              : "Est. Arrival"}
                          </span>
                          <span className="order-card__data-value">
                            {bike.status === "Delivered"
                              ? bike.delivered_date
                              : bike.delivery_expected}
                          </span>
                        </div>
                        <div className="order-card__data-item">
                          <span className="order-card__data-label">Seller</span>
                          <span className="order-card__data-value">
                            {bike.seller}
                          </span>
                        </div>
                        <div className="order-card__data-item">
                          <span className="order-card__data-label">
                            Payment
                          </span>
                          <span className="order-card__data-value">
                            {order.payment_method}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="order-card__footer">
                      <div className="order-card__footer-note">
                        {config.footerIcon && (
                          <span className="order-card__footer-icon">
                            {config.footerIcon}
                          </span>
                        )}
                        <span>{config.footerText(bike)}</span>
                      </div>
                      {!isCancelled && (
                        <div className="order-card__actions">
                          <button
                            className="order-card__btn order-card__btn--secondary"
                            aria-label={`View details for ${bike.brand} ${bike.model}`}
                          >
                            View Details
                          </button>
                          <button
                            className="order-card__btn order-card__btn--primary"
                            aria-label={`Track order ${order.order_id}`}
                            onClick={() =>
                              navigate(`/track-my-order/${order.order_id}`)
                            }
                          >
                            Track Order
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            }),
          )}
        </div>

        {orders.length === 0 && (
          <div className="my-orders__empty">
            <p>No orders found</p>
            <p>You haven&apos;t placed any orders yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
