// React Imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI Imports
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  TrackChanges as TrackIcon,
  LocalShipping as ShippingIcon,
  Cancel as CancelIcon,
  CheckCircle as DeliveredIcon,
  Schedule as PendingIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  FileDownload as DownloadIcon,
} from "@mui/icons-material";

// Local Imports
import "./my-orders.scss";

const MyOrders = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <DeliveredIcon sx={{ color: "inherit" }} />;
      case "In Transit":
        return <ShippingIcon sx={{ color: "inherit" }} />;
      case "Processing":
        return <PendingIcon sx={{ color: "inherit" }} />;
      case "Cancelled":
        return <CancelIcon sx={{ color: "inherit" }} />;
      default:
        return <PendingIcon sx={{ color: "inherit" }} />;
    }
  };

  return (
    <div className="my-orders-container">
      <div
        className="container"
        role="main"
        aria-labelledby="orders-page-title"
      >
        <div className="my-orders-header">
          <Typography
            variant={isMobile ? "h5" : "h4"}
            component="h1"
            className="page-title"
            id="orders-page-title"
          >
            My Orders
          </Typography>
          <Typography variant="body1" className="page-subtitle">
            View and track all your pending, delivered, and returned orders
            here.
          </Typography>
        </div>

        <div className="orders-list" role="list">
          {orders.map((order) => (
            <Card
              key={order.order_id}
              className="order-card"
              elevation={2}
              role="listitem"
              aria-labelledby={`order-${order.order_id}-title`}
            >
              <CardContent className="order-content">
                {/* Order Header */}
                <div className="order-header">
                  <div className="order-info">
                    <Typography
                      variant="h6"
                      component="h2"
                      className="order-id"
                      id={`order-${order.order_id}-title`}
                    >
                      Order #{order.order_id}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="order-date"
                      aria-label={`Order placed on ${order.order_placed}`}
                    >
                      Order Placed: {order.order_placed}
                    </Typography>
                  </div>
                  <Button
                    variant="contained"
                    color="warning"
                    startIcon={<TrackIcon />}
                    className="track-order-btn"
                    aria-label={`Track order ${order.order_id}`}
                    onClick={() =>
                      navigate(`/track-my-order/${order.order_id}`)
                    }
                  >
                    TRACK ORDER
                  </Button>
                </div>

                {/* Bikes List */}
                <div className="bikes-list">
                  {order.bikes.map((bike) => (
                    <div
                      key={bike.bike_id}
                      className="bike-item"
                      role="group"
                      aria-labelledby={`bike-${bike.bike_id}-name`}
                    >
                      <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        {/* Bike Image */}
                        <Grid item xs={12} sm={3} md={2}>
                          <div className="bike-image-container">
                            <img
                              src={bike.image}
                              alt={`${bike.brand} ${bike.model}`}
                              className="bike-image"
                              loading="lazy"
                            />
                          </div>
                        </Grid>

                        {/* Bike Details */}
                        <Grid item xs={12} sm={6} md={4}>
                          <div className="bike-details">
                            <Typography
                              variant="h6"
                              component="h3"
                              className="bike-name"
                              id={`bike-${bike.bike_id}-name`}
                            >
                              {bike.brand} {bike.model}
                            </Typography>
                            <Typography variant="body2" className="bike-seller">
                              By: {bike.seller}
                            </Typography>
                            <div className="bike-specs">
                              <Typography variant="h6" className="bike-price">
                                <span
                                  style={{ color: "#444", fontSize: "18px" }}
                                >
                                  Price :
                                </span>{" "}
                                ₹{bike.price.toLocaleString()}
                              </Typography>
                            </div>
                          </div>
                        </Grid>

                        {/* Status & Delivery */}
                        <Grid item xs={12} sm={3} md={4}>
                          <div className="order-status">
                            <Button
                              variant="contained"
                              className="status-button"
                              style={{
                                marginBottom: "8px",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "5px 40px",
                                textTransform: "none",
                                transition: "all 0.3s ease",
                                borderRadius: "25px",
                                backgroundColor:
                                  bike.status === "Delivered"
                                    ? "#4caf50"
                                    : bike.status === "In Transit"
                                    ? "#2196f3"
                                    : bike.status === "Processing"
                                    ? "#ff9800"
                                    : bike.status === "Cancelled"
                                    ? "#f44336"
                                    : "#9e9e9e",
                                color: "#ffffff",
                              }}
                              onMouseEnter={(e) => {
                                const statusColor =
                                  bike.status === "Delivered"
                                    ? "#4caf50"
                                    : bike.status === "In Transit"
                                    ? "#2196f3"
                                    : bike.status === "Processing"
                                    ? "#ff9800"
                                    : bike.status === "Cancelled"
                                    ? "#f44336"
                                    : "#9e9e9e";
                                e.currentTarget.style.backgroundColor =
                                  "#ffffff";
                                e.currentTarget.style.color = statusColor;
                                const icon =
                                  e.currentTarget.querySelector(
                                    ".MuiSvgIcon-root"
                                  );
                                if (icon) icon.style.color = statusColor;
                              }}
                              onMouseLeave={(e) => {
                                const statusColor =
                                  bike.status === "Delivered"
                                    ? "#4caf50"
                                    : bike.status === "In Transit"
                                    ? "#2196f3"
                                    : bike.status === "Processing"
                                    ? "#ff9800"
                                    : bike.status === "Cancelled"
                                    ? "#f44336"
                                    : "#9e9e9e";
                                e.currentTarget.style.backgroundColor =
                                  statusColor;
                                e.currentTarget.style.color = "#ffffff";
                                const icon =
                                  e.currentTarget.querySelector(
                                    ".MuiSvgIcon-root"
                                  );
                                if (icon) icon.style.color = "#ffffff";
                              }}
                            >
                              <div className="status-icon">
                                {getStatusIcon(bike.status)}
                              </div>
                              <Typography variant="subtitle1" component="span">
                                {bike.status}
                              </Typography>
                            </Button>
                            <div
                              className="status-info"
                              style={{
                                animation: "fadeInUp 0.5s ease",
                                transform: "translateY(0)",
                                opacity: 1,
                                transition: "all 0.3s ease",
                              }}
                            >
                              {bike.status === "Delivered" ? (
                                <Typography
                                  variant="body2"
                                  className="delivery-info success"
                                  role="status"
                                  aria-label={`Order delivered on ${bike.delivered_date}`}
                                >
                                  Delivered on {bike.delivered_date}
                                </Typography>
                              ) : bike.status === "Cancelled" ? (
                                <Typography
                                  variant="body2"
                                  className="delivery-info cancelled"
                                  role="status"
                                  aria-label={`Order cancelled: ${bike.cancellation_reason}`}
                                >
                                  {bike.cancellation_reason}
                                </Typography>
                              ) : (
                                <Typography
                                  variant="body2"
                                  className="delivery-info"
                                  role="status"
                                  aria-label={`Expected delivery by ${bike.delivery_expected}`}
                                >
                                  Delivery Expected by {bike.delivery_expected}
                                </Typography>
                              )}
                            </div>
                          </div>
                        </Grid>

                        {/* Actions */}
                        <Grid item xs={12} sm={12} md={2}>
                          <div
                            className="bike-actions"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                justifyContent: "center",
                              }}
                            >
                              {bike.status !== "Cancelled" && (
                                <>
                                  <Tooltip title="Contact Seller">
                                    <IconButton
                                      color="primary"
                                      aria-label="Contact seller via phone"
                                      size="small"
                                    >
                                      <PhoneIcon />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Email Order Details">
                                    <IconButton
                                      color="primary"
                                      aria-label="Email Order Details"
                                      size="small"
                                    >
                                      <EmailIcon />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Download Invoice">
                                    <IconButton
                                      color="primary"
                                      aria-label="Download invoice"
                                      size="small"
                                    >
                                      <DownloadIcon />
                                    </IconButton>
                                  </Tooltip>
                                </>
                              )}
                            </div>
                            {bike.status === "Processing" && (
                              <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                startIcon={<CancelIcon />}
                                className="cancel-btn"
                                aria-label={`Cancel order for ${bike.brand} ${bike.model}`}
                                fullWidth
                              >
                                CANCEL ORDER
                              </Button>
                            )}
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              className="view-more-btn"
                              aria-label={`View details for ${bike.brand} ${bike.model}`}
                              fullWidth
                              style={{ padding: "5px 25px" }}
                            >
                              VIEW DETAILS
                            </Button>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="order-footer">
                  <div className="payment-info">
                    <Typography variant="body2">
                      *Paid using {order.payment_method}
                    </Typography>
                  </div>
                  {/* <div className="order-total">
                    <Typography
                      variant="h6"
                      component="strong"
                      className="total-amount"
                    >
                      ₹{order.total_amount.toLocaleString()}
                    </Typography>
                  </div> */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
          <div className="empty-orders" role="status" aria-live="polite">
            <Typography variant="h6" tabIndex={0}>
              No orders found
            </Typography>
            <Typography variant="body2" tabIndex={0}>
              You haven&apos;t placed any orders yet. Start shopping to see your
              orders here.
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
