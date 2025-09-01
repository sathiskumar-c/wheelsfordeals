// React Imports
import React, { useState } from "react";

// Material UI Imports & Lib Imports
import { Button, Typography, Box, Stack, Alert, Divider } from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

// Local Imports
import "./hold-bike.scss";

const PER_DAY_COST = 149;

const HoldBike = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    fromDate: null,
    toDate: null,
  });
  const [formErrors, setFormErrors] = useState({});
  const [costDetails, setCostDetails] = useState({
    days: 0,
    total: 0,
  });
  const [submitted, setSubmitted] = useState(false);

  // Calculate days and total cost
  const calculateCost = (fromDate, toDate) => {
    if (!fromDate || !toDate) return { days: 0, total: 0 };
    const start = dayjs(fromDate);
    const end = dayjs(toDate);
    const diff = end.diff(start, "day") + 1;
    const days = diff > 0 ? diff : 0;
    return {
      days,
      total: days * PER_DAY_COST,
    };
  };

  // Update cost when dates change
  React.useEffect(() => {
    setCostDetails(calculateCost(formData.fromDate, formData.toDate));
  }, [formData.fromDate, formData.toDate]);

  // Handle field changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // Validation
  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!formData.mobile.trim()) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      errors.mobile = "Enter a valid 10-digit mobile number";
    }
    if (!formData.fromDate) {
      errors.fromDate = "From date is required";
    }
    if (!formData.toDate) {
      errors.toDate = "To date is required";
    }
    if (formData.fromDate && formData.toDate) {
      const start = dayjs(formData.fromDate);
      const end = dayjs(formData.toDate);
      if (end.isBefore(start, "day")) {
        errors.toDate = "To date must be after From date";
      }
    }
    if (costDetails.days <= 0) {
      errors.toDate = "Select a valid date range";
    }
    return errors;
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setSubmitted(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        className="hold-bike-container"
        style={{
          boxShadow: "0 8px 32px rgba(25, 118, 210, 0.12)",
          borderRadius: 24,
          background: "#f8fafc",
          padding: 0,
          maxWidth: 520,
          margin: "48px auto",
        }}
      >
        {/* Premium Header */}
        <Box
          className="hold-bike-header"
          style={{
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            background: "linear-gradient(120deg, #2196f3 0%, #21cbf3 100%)",
            padding: "25px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Box
            style={{
              background: "#fff",
              borderRadius: "50%",
              padding: 16,
              boxShadow: "0 2px 8px rgba(33, 203, 243, 0.12)",
              marginRight: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LockRoundedIcon sx={{ fontSize: 24, color: "#1976d2" }} />
          </Box>
          <Box>
            <Typography
              variant="h5"
              style={{
                color: "#fff",
                fontWeight: 700,
                marginBottom: 4,
                letterSpacing: 1,
                fontSize: "1.6rem",
              }}
            >
              Hold Your Bike 🚲🔒
            </Typography>
            <Typography
              variant="body2"
              style={{ color: "#e3f2fd", fontSize: "1rem" }}
            >
              Reserve your dream ride for the perfect time! ⏳✨
              <br />
              <span style={{ fontWeight: 600 }}>Just ₹100/day</span> to keep
              your bike waiting for you! 💸
            </Typography>
          </Box>
        </Box>

        <Box style={{ padding: "25px" }}>
          <form className="hold-bike-form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={2}>
              <Box
                style={{
                  display: "flex",
                  gap: 10,
                  justifyContent: "center",
                  marginBottom: 8,
                }}
              >
                <DatePicker
                  label="From Date"
                  value={formData.fromDate}
                  onChange={(newDate) => handleChange("fromDate", newDate)}
                  minDate={dayjs()}
                  maxDate={dayjs()}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!formErrors.fromDate,
                      helperText: formErrors.fromDate,
                      required: true,
                      className: "hold-bike-date-input",
                    },
                  }}
                />
                <DatePicker
                  label="To Date"
                  value={formData.toDate}
                  onChange={(newDate) => handleChange("toDate", newDate)}
                  minDate={dayjs()}
                  maxDate={dayjs().add(7, "day")}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!formErrors.toDate,
                      helperText: formErrors.toDate,
                      required: true,
                      className: "hold-bike-date-input",
                    },
                  }}
                />
              </Box>
              <Box
                style={{
                  background:
                    "linear-gradient(120deg, #e3f2fd 0%, #b3e5fc 100%)",
                  padding: 20,
                  borderRadius: 16,
                  boxShadow: "0 2px 8px rgba(33, 203, 243, 0.08)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Typography
                  variant="h6"
                  style={{
                    color: "#1976d2",
                    fontWeight: 700,
                    marginBottom: 8,
                    fontSize: "1.2rem",
                  }}
                >
                  Hold Summary 📝
                </Typography>
                <Divider style={{ width: "100%", marginBottom: 12 }} />
                <Typography
                  variant="body2"
                  style={{ color: "#1976d2", marginBottom: 8, fontWeight: 500 }}
                >
                  Ready to lock in your ride? Let&apos;s roll! 🚀
                </Typography>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="body1"
                    style={{
                      color: "#607d8b",
                      marginBottom: 4,
                      fontWeight: 500,
                    }}
                  >
                    Days{" "}
                    <span role="img" aria-label="calendar">
                      📅
                    </span>
                    :{" "}
                    <span style={{ fontWeight: 700 }}>{costDetails.days}</span>
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{
                      color: "#607d8b",
                      marginBottom: 4,
                      fontWeight: 500,
                    }}
                  >
                    Per Day{" "}
                    <span role="img" aria-label="money">
                      💰
                    </span>
                    : <span style={{ fontWeight: 700 }}>₹{PER_DAY_COST}</span>
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{
                      color: "#1976d2",
                      fontWeight: 700,
                      marginBottom: 4,
                    }}
                  >
                    Total{" "}
                    <span role="img" aria-label="tag">
                      🏷️
                    </span>
                    :{" "}
                    <span style={{ fontWeight: 700 }}>
                      ₹{costDetails.total}
                    </span>
                  </Typography>
                </Box>
              </Box>
              {submitted && (
                <Alert
                  severity="success"
                  style={{
                    marginTop: 16,
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: "1rem",
                    boxShadow: "0 2px 8px rgba(76, 175, 80, 0.12)",
                  }}
                >
                  <span role="img" aria-label="celebrate">
                    🎉
                  </span>{" "}
                  Your bike is now on hold! Get ready to ride soon!{" "}
                  <span role="img" aria-label="bike">
                    🏍️
                  </span>
                </Alert>
              )}
              <Button
                type="submit"
                variant="contained"
                color="warning"
                size="large"
                style={{
                  fontWeight: "bold",
                  padding: "8px 0",
                  fontSize: "16px",
                  boxShadow: "0 2px 8px rgba(251, 140, 0, 0.18)",
                  background:
                    "linear-gradient(90deg, #ffa726 0%, #fb8c00 100%)",
                  color: "#fff",
                  letterSpacing: 1,
                }}
              >
                Hold My Bike Now!{" "}
                <span role="img" aria-label="bike">
                  🚲
                </span>
                <span role="img" aria-label="fire">
                  🔥
                </span>
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default HoldBike;
