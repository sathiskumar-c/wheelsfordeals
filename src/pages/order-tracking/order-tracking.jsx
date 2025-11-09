// React Imports
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// MUI Imports
import {
  LocalShipping as ShippingIcon,
  Phone as PhoneIcon,
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
  Inventory as InventoryIcon,
  Payment as PaymentIcon,
} from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Component Imports
import AnimatedActionButton from "../../components/common-components/buttons/animated-action-button/animated-action-button";

// Local Imports
import "./order-tracking.scss";
import { getOrderTrackingDetails } from "../../api/getOrderTracking";

const OrderTracking = () => {
  // Hooks
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
  }, [orderId]); // Re-run the effect if the orderId changes

  const trackingSteps = [
    { name: "Payment confirmed", icon: <PaymentIcon /> },
    { name: "Order confirmed", icon: <CheckCircleIcon /> },
    { name: "In shipping", icon: <ShippingIcon /> },
    { name: "Delivered", icon: <InventoryIcon /> },
  ];

  const currentStatusIndex = order
    ? trackingSteps.findIndex((step) => step.name === order.status)
    : -1;

  return (
    <div className="order-tracking-container">
      <article className="tracking-wrapper">
        <header className="tracking-header">
          <span>My Orders / Tracking</span>
          <button
            className="btn btn-back-to-order"
            onClick={() => navigate("/my-orders")}
          >
            <ArrowBackIcon />
            <span style={{ marginLeft: "3px" }}>Back to orders</span>
          </button>
        </header>
        {loading ? (
          <div
            className="tracking-content"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "300px",
            }}
          >
            <CircularProgress />
          </div>
        ) : error ? (
          <div className="tracking-content">
            <p style={{ color: "red" }}>{error}</p>
          </div>
        ) : (
          <div className="tracking-content">
            <article className="tracking-info-box">
              <div className="order-details-wrapper">
                <h6>Order ID: {order.id}</h6>
                <div className="order-details">
                  <figure className="itemside mb-3">
                    <div className="aside">
                      <img
                        src={order.product.image}
                        className="img-sm border"
                        alt={order.product.name}
                      />
                    </div>
                    <figcaption className="info align-self-center">
                      <p className="title">
                        {order.product.name} - {order.product.category}
                      </p>
                      <span className="text-muted">₹{order.product.price}</span>
                      <AnimatedActionButton
                        text="View More"
                        onClick={() => {
                          alert("hi");
                        }}
                        icon={<ArrowForwardIcon className="icon" />}
                      />
                    </figcaption>
                  </figure>
                </div>
              </div>
              <div className="tracking-info-grid">
                <div className="col">
                  <strong>Estimated Delivery time:</strong>
                  {order.estimatedDelivery}
                </div>
                <div className="col">
                  <strong>Shipping BY:</strong>
                  {order.carrier} | <PhoneIcon className="phone-icon" />{" "}
                  {order.carrierContact}
                </div>
                <div className="col">
                  <strong>Status:</strong>
                  {order.status}
                </div>
                <div className="col">
                  <strong>Tracking #:</strong>
                  {order.trackingNumber}
                </div>
              </div>
            </article>

            <div className="track">
              {trackingSteps.map((step, index) => (
                <div
                  key={step.name}
                  className={`step ${
                    index <= currentStatusIndex ? "active" : ""
                  }`}
                >
                  <span className="icon">{step.icon}</span>
                  <span className="text">{step.name}</span>
                </div>
              ))}
            </div>

            <hr />
          </div>
        )}
      </article>
    </div>
  );
};

export default OrderTracking;
