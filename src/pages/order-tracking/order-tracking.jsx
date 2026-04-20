// React core
import React, { useState, useEffect } from "react";

// React Router
import { useNavigate, useParams } from "react-router-dom";

// MUI icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import NearMeIcon from "@mui/icons-material/NearMe";
import { CircularProgress } from "@mui/material";

// API
import { getOrderTrackingDetails } from "../../api/getOrderTracking";

// Page styles
import "./order-tracking.scss";

const TRACKING_STEPS = [
  { label: "Payment Confirmed", icon: <PaymentIcon /> },
  { label: "Order Confirmed", icon: <CheckCircleIcon /> },
  { label: "In Shipping", icon: <LocalShippingIcon /> },
  { label: "Delivered", icon: <Inventory2Icon /> },
];

const OrderTracking = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setError(null);
        setLoading(true);
        const data = await getOrderTrackingDetails(orderId);
        setOrder(data);
      } catch (err) {
        setError("Failed to fetch order details. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderData();
  }, [orderId]);

  const currentStatusIndex = order
    ? TRACKING_STEPS.findIndex(
        (step) => step.label.toLowerCase() === order.status.toLowerCase(),
      )
    : -1;

  const progressPct =
    currentStatusIndex >= 0
      ? (currentStatusIndex / (TRACKING_STEPS.length - 1)) * 100
      : 0;

  const handleCopy = () => {
    if (order?.trackingNumber) {
      navigator.clipboard.writeText(order.trackingNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="ot-page">
      <div className="ot-page__inner">
        {/* Breadcrumb / Back */}
        <div className="ot-page__back-row">
          <button
            className="ot-page__back-btn"
            onClick={() => navigate("/orders")}
            aria-label="Back to orders"
          >
            <ArrowBackIcon sx={{ fontSize: 16 }} />
            Back to orders
          </button>
          <h1 className="ot-page__title">Orders / Tracking</h1>
        </div>

        {/* Loading */}
        {loading && (
          <div className="ot-page__loading">
            <CircularProgress sx={{ color: "#1c0070" }} />
          </div>
        )}

        {/* Error */}
        {!loading && error && <div className="ot-page__error">{error}</div>}

        {/* Content */}
        {!loading && !error && order && (
          <>
            {/* Main Card */}
            <div className="ot-card">
              {/* Stepper */}
              <div className="ot-stepper">
                <div className="ot-stepper__track">
                  <div
                    className="ot-stepper__fill"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <div className="ot-stepper__steps">
                  {TRACKING_STEPS.map((step, index) => {
                    const done = index < currentStatusIndex;
                    const active = index === currentStatusIndex;
                    return (
                      <div key={step.label} className="ot-step">
                        <div
                          className={`ot-step__circle ${
                            done || active ? "ot-step__circle--active" : ""
                          } ${active ? "ot-step__circle--current" : ""}`}
                        >
                          {step.icon}
                        </div>
                        <div className="ot-step__label">
                          <p
                            className={`ot-step__name ${
                              done || active ? "ot-step__name--active" : ""
                            }`}
                          >
                            {step.label}
                          </p>
                          <p className="ot-step__sub">
                            {active ? (
                              <span className="ot-step__sub--active">
                                Est. {order.estimatedDelivery}
                              </span>
                            ) : done ? (
                              "Completed"
                            ) : (
                              "Pending"
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bento Grid */}
              <div className="ot-bento">
                {/* Bike Card */}
                <div className="ot-bike-card">
                  <div className="ot-bike-card__image-wrap">
                    <img
                      src={order.product.image}
                      alt={order.product.name}
                      className="ot-bike-card__image"
                    />
                  </div>
                  <div className="ot-bike-card__footer">
                    <div>
                      <span className="ot-bike-card__tag">Featured Item</span>
                      <h3 className="ot-bike-card__name">
                        {order.product.name}
                      </h3>
                      <p className="ot-bike-card__order-id">
                        Order ID: #{order.id}
                      </p>
                    </div>
                    <div className="ot-bike-card__price-col">
                      <p className="ot-bike-card__price">
                        ₹{order.product.price}
                      </p>
                      <button
                        className="ot-bike-card__view-more"
                        onClick={() =>
                          navigate(
                            `/bike/details/${order.product.brand_slug}/${order.product.model_slug}/${order.product.bike_id}`,
                          )
                        }
                      >
                        View Product
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Info Column */}
                <div className="ot-info-col">
                  {/* Est Delivery */}
                  <div className="ot-info-tile">
                    <span className="ot-info-tile__label">
                      Estimated Delivery
                    </span>
                    <h4 className="ot-info-tile__value">
                      {order.estimatedDelivery}
                    </h4>
                    <div className="ot-info-tile__sub">
                      <CalendarMonthIcon sx={{ fontSize: 16 }} />
                      <span>Scheduled via Express</span>
                    </div>
                  </div>

                  {/* Current Status */}
                  <div className="ot-info-tile ot-info-tile--dark">
                    <span className="ot-info-tile__label ot-info-tile__label--light">
                      Current Status
                    </span>
                    <h4 className="ot-info-tile__value ot-info-tile__value--light">
                      {order.status}
                    </h4>
                    <p className="ot-info-tile__hint">
                      Carrier: {order.carrier}
                    </p>
                    <LocalShippingIcon className="ot-info-tile__bg-icon" />
                  </div>

                  {/* Carrier Info */}
                  <div className="ot-info-tile ot-info-tile--wide">
                    <div className="ot-carrier-grid">
                      <div className="ot-carrier-item">
                        <span className="ot-carrier-item__label">Carrier</span>
                        <p className="ot-carrier-item__value">
                          {order.carrier}
                        </p>
                      </div>
                      <div className="ot-carrier-item">
                        <span className="ot-carrier-item__label">
                          Phone Support
                        </span>
                        <p className="ot-carrier-item__value">
                          {order.carrierContact}
                        </p>
                      </div>
                      <div className="ot-carrier-item">
                        <span className="ot-carrier-item__label">
                          Tracking Number
                        </span>
                        <div className="ot-carrier-item__copy-row">
                          <p className="ot-carrier-item__value">
                            {order.trackingNumber}
                          </p>
                          <button
                            className="ot-carrier-item__copy-btn"
                            onClick={handleCopy}
                            aria-label="Copy tracking number"
                          >
                            <ContentCopyIcon sx={{ fontSize: 16 }} />
                            {copied && (
                              <span className="ot-carrier-item__copied">
                                Copied!
                              </span>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Map Placeholder */}
                  <div className="ot-map">
                    <div className="ot-map__overlay" />
                    <div className="ot-map__footer">
                      <div className="ot-map__pin">
                        <NearMeIcon sx={{ fontSize: 20, color: "#fff" }} />
                      </div>
                      <div className="ot-map__info">
                        <p className="ot-map__info-title">
                          Live Tracking Enabled
                        </p>
                        <p className="ot-map__info-sub">
                          Last updated 2 mins ago
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="ot-help">
              <div className="ot-help__left">
                <div className="ot-help__icon-wrap">
                  <SupportAgentIcon sx={{ fontSize: 28, color: "#1c0070" }} />
                </div>
                <div>
                  <h5 className="ot-help__title">Need assistance?</h5>
                  <p className="ot-help__desc">
                    Our support team is available 24/7 for order help.
                  </p>
                </div>
              </div>
              <div className="ot-help__actions">
                <button className="ot-help__btn ot-help__btn--primary">
                  Live Chat
                </button>
                <button className="ot-help__btn ot-help__btn--secondary">
                  Help Center
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
