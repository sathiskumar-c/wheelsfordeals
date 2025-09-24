// React Imports
import React, { useState } from "react";

// MUI Imports
import {
  Button,
  Chip,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
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
} from "@mui/icons-material";

// Local Imports
import "./my-orders.scss";

const MyOrders = () => {
  const theme = useTheme();
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
        return <DeliveredIcon sx={{ color: "#4caf50" }} />;
      case "In Transit":
        return <ShippingIcon sx={{ color: "#2196f3" }} />;
      case "Processing":
        return <PendingIcon sx={{ color: "#ff9800" }} />;
      case "Cancelled":
        return <CancelIcon sx={{ color: "#f44336" }} />;
      default:
        return <PendingIcon sx={{ color: "#9e9e9e" }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "success";
      case "In Transit":
        return "info";
      case "Processing":
        return "warning";
      case "Cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <div className="my-orders-container">
      <div className="container">
        <div className="my-orders-header">
          <Typography
            variant={isMobile ? "h5" : "h4"}
            component="h1"
            className="page-title"
            tabIndex={0}
          >
            My Orders
          </Typography>
          <Typography variant="body1" className="page-subtitle" tabIndex={0}>
            View and track all your pending, delivered, and returned orders
            here.
          </Typography>
        </div>

        <div className="orders-list">
          {orders.map((order) => (
            <Card
              key={order.order_id}
              className="order-card"
              elevation={2}
              role="article"
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
                      tabIndex={0}
                    >
                      Order #{order.order_id}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="order-date"
                      tabIndex={0}
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
                      <Grid container spacing={2} alignItems="center">
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
                              tabIndex={0}
                            >
                              {bike.brand} {bike.model}
                            </Typography>
                            <Typography
                              variant="body2"
                              className="bike-seller"
                              tabIndex={0}
                            >
                              By: {bike.seller}
                            </Typography>
                            <div className="bike-specs">
                              <Typography variant="body2" tabIndex={0}>
                                Size: {bike.size} &nbsp; Qty: {bike.quantity}
                              </Typography>
                              <Typography
                                variant="h6"
                                className="bike-price"
                                tabIndex={0}
                              >
                                ₹{bike.price.toLocaleString()}
                              </Typography>
                            </div>
                          </div>
                        </Grid>

                        {/* Status & Delivery */}
                        <Grid item xs={12} sm={3} md={4}>
                          <div className="order-status">
                            <Box className="status-container">
                              {getStatusIcon(bike.status)}
                              <Chip
                                label={bike.status}
                                color={getStatusColor(bike.status)}
                                size="small"
                                className="status-chip"
                              />
                            </Box>
                            {bike.status === "Delivered" ? (
                              <Typography
                                variant="body2"
                                className="delivery-info"
                                tabIndex={0}
                              >
                                Delivered on {bike.delivered_date}
                              </Typography>
                            ) : bike.status === "Cancelled" ? (
                              <Typography
                                variant="body2"
                                className="delivery-info cancelled"
                                tabIndex={0}
                              >
                                {bike.cancellation_reason}
                              </Typography>
                            ) : (
                              <Typography
                                variant="body2"
                                className="delivery-info"
                                tabIndex={0}
                              >
                                Delivery Expected by {bike.delivery_expected}
                              </Typography>
                            )}
                          </div>
                        </Grid>

                        {/* Actions */}
                        <Grid item xs={12} sm={12} md={2}>
                          <div className="bike-actions">
                            {bike.status !== "Cancelled" && (
                              <>
                                <Tooltip title="Contact Seller">
                                  <IconButton
                                    color="primary"
                                    aria-label="Contact seller via phone"
                                  >
                                    <PhoneIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Email Support">
                                  <IconButton
                                    color="primary"
                                    aria-label="Email support"
                                  >
                                    <EmailIcon />
                                  </IconButton>
                                </Tooltip>
                              </>
                            )}
                            {bike.status === "Processing" && (
                              <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                startIcon={<CancelIcon />}
                                className="cancel-btn"
                                aria-label={`Cancel order for ${bike.brand} ${bike.model}`}
                              >
                                CANCEL ORDER
                              </Button>
                            )}
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="order-footer">
                  <div className="payment-info">
                    <Typography variant="body2" tabIndex={0}>
                      Paid using {order.payment_method}
                    </Typography>
                  </div>
                  <div className="order-total">
                    <Typography
                      variant="h6"
                      component="strong"
                      className="total-amount"
                      tabIndex={0}
                    >
                      ₹{order.total_amount.toLocaleString()}
                    </Typography>
                  </div>
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
