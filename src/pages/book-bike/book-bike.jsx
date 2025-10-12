import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  Stack,
  CircularProgress,
  // ...existing code...
  IconButton,
  Divider,
  useMediaQuery,
  useTheme,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  Chip,
  Card,
  CardContent,
  Grid,
  Alert,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import PlaceIcon from "@mui/icons-material/Place";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CalculateIcon from "@mui/icons-material/Calculate";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import axios from "axios";
import dayjs from "dayjs";
import "./book-bike.scss";

// Google Maps API Key from environment variables
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Booking configuration
const BOOKING_CONFIG = {
  maxDeliveryDistance: 50, // km
  minDownPayment: 10000, // ₹
  maxLoanTenure: 60, // months
  documentUploadLimit: 5, // MB per file
  bankPartners: [
    { id: "hdfc", name: "HDFC Bank", interestRate: 11.5, processingFee: 2500 },
    {
      id: "icici",
      name: "ICICI Bank",
      interestRate: 12.0,
      processingFee: 3000,
    },
    { id: "sbi", name: "SBI", interestRate: 12.5, processingFee: 2000 },
    {
      id: "kotak",
      name: "Kotak Bank",
      interestRate: 11.8,
      processingFee: 2800,
    },
    { id: "axis", name: "Axis Bank", interestRate: 12.2, processingFee: 3200 },
  ],
  loanTenures: [12, 18, 24, 36, 48, 60],
  requiredDocuments: [
    { id: "aadhar", name: "Aadhar Card", required: true },
    // { id: "pan", name: "PAN Card", required: false },
    { id: "license", name: "Driving License", required: true },
    // { id: "income", name: "Income Proof", required: false },
    // { id: "bank", name: "Bank Statement", required: false },
  ],
};

// Calculate EMI function
const calculateEMI = (principal, interestRate, tenure) => {
  const monthlyRate = interestRate / 12 / 100;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
    (Math.pow(1 + monthlyRate, tenure) - 1);
  return Math.round(emi);
};

// Steps for the booking process
const steps = [
  "Personal Details",
  "Financial Planning",
  "Documentation",
  "Delivery Setup",
  "Payment & Confirmation",
];

const BookBike = () => {
  // Form errors state
  const [formErrors, setFormErrors] = useState({});
  const { brand, model, bike_id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Stepper state
  const [activeStep, setActiveStep] = useState(0);

  // Form data state
  const [formData, setFormData] = useState({
    // Personal Details
    personalDetails: {
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
    },
    // Address Information
    addressInfo: {
      billingAddress: "",
      billingCity: "",
      billingState: "",
      billingPincode: "",
      billingLandmark: "",
      sameAsDelivery: true,
      deliveryAddress: "",
      deliveryCity: "",
      deliveryState: "",
      deliveryPincode: "",
      deliveryLandmark: "",
    },
    // Financial Planning
    financialPlanning: {
      paymentMethod: "emi", // "cash", "emi", "exchange"
      downPayment: "",
      loanTenure: 24,
      selectedBank: "",
      hasExchangeBike: false,
      exchangeBikeDetails: {
        brand: "",
        model: "",
        year: "",
        kmDriven: "",
        condition: "",
        expectedValue: "",
      },
    },
    // Documentation
    documentation: {
      uploadedDocs: {},
      kycVerified: false,
    },
    // Delivery Scheduling
    deliveryScheduling: {
      preferredDate: null,
      preferredTime: "",
      deliveryType: "home", // "home", "showroom"
      specialInstructions: "",
    },
    // Agreement
    agreements: {
      termsAccepted: false,
      privacyAccepted: false,
      newsletterSubscribe: false,
    },
  });

  // Loading states
  const [loading, setLoading] = useState({
    locationLoading: false,
    emiCalculating: false,
    documentUploading: false,
    submitting: false,
  });

  // EMI Calculation state
  const [emiDetails, setEmiDetails] = useState({
    monthlyEMI: 0,
    totalInterest: 0,
    totalAmount: 0,
    processingFee: 0,
  });

  // Bike data state (would normally come from API/props)
  const [bikeData] = useState({
    brand: brand || "Honda",
    model: model || "Activa 6G",
    price: 95000,
    discountedPrice: 85000,
    id: bike_id || "1",
    image: "/images/bikes/honda-activa.jpg",
    specifications: {
      engine: "109.51 cc",
      mileage: "60 kmpl",
      fuelType: "Petrol",
    },
  });

  // Location/suggestions state
  const [, setLocationData] = useState({
    coordinates: null,
    searchSuggestions: [],
    showSuggestions: false,
    searchQuery: "",
  });

  // Delivery slots state
  const [deliverySlots] = useState([
    "10:00 AM - 12:00 PM",
    "12:00 PM - 2:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
  ]);

  // File upload refs
  const fileInputRefs = useRef({});

  // Google Places API setup
  const autocompleteService = useRef(null);
  const placesService = useRef(null);

  // Initialize Google Places API
  useEffect(() => {
    const loadGoogleMapsAPI = () => {
      if (window.google && window.google.maps) {
        initializeGoogleServices();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleServices;
      document.head.appendChild(script);
    };

    const initializeGoogleServices = () => {
      if (window.google && window.google.maps) {
        autocompleteService.current =
          new window.google.maps.places.AutocompleteService();
        placesService.current = new window.google.maps.places.PlacesService(
          document.createElement("div")
        );
      }
    };

    loadGoogleMapsAPI();
  }, []);

  // Calculate EMI when financial details change
  useEffect(() => {
    if (formData.financialPlanning.paymentMethod === "emi") {
      calculateEMIDetails();
    }
  }, [
    formData.financialPlanning.downPayment,
    formData.financialPlanning.loanTenure,
    formData.financialPlanning.selectedBank,
  ]);

  // Handle form field changes
  const handleFieldChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));

    // Clear related errors
    setFormErrors((prev) => ({
      ...prev,
      [`${section}.${field}`]: undefined,
    }));
  };

  // Handle nested field changes (like exchange bike details)
  const handleNestedFieldChange = (section, nestedSection, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [nestedSection]: {
          ...prev[section][nestedSection],
          [field]: value,
        },
      },
    }));
  };

  // Calculate EMI details
  const calculateEMIDetails = () => {
    setLoading((prev) => ({ ...prev, emiCalculating: true }));

    setTimeout(() => {
      const downPayment =
        parseFloat(formData.financialPlanning.downPayment) || 0;
      const principal = bikeData.discountedPrice - downPayment;
      const selectedBank = BOOKING_CONFIG.bankPartners.find(
        (bank) => bank.id === formData.financialPlanning.selectedBank
      );

      if (selectedBank && principal > 0) {
        const monthlyEMI = calculateEMI(
          principal,
          selectedBank.interestRate,
          formData.financialPlanning.loanTenure
        );

        const totalAmount = monthlyEMI * formData.financialPlanning.loanTenure;
        const totalInterest = totalAmount - principal;

        setEmiDetails({
          monthlyEMI,
          totalInterest,
          totalAmount: totalAmount + downPayment,
          processingFee: selectedBank.processingFee,
        });
      }

      setLoading((prev) => ({ ...prev, emiCalculating: false }));
    }, 500);
  };

  // Handle file upload
  const handleFileUpload = (docType, file) => {
    if (!file) return;

    if (file.size > BOOKING_CONFIG.documentUploadLimit * 1024 * 1024) {
      setFormErrors((prev) => ({
        ...prev,
        [`documentation.${docType}`]: `File size should be less than ${BOOKING_CONFIG.documentUploadLimit}MB`,
      }));
      return;
    }

    setLoading((prev) => ({ ...prev, documentUploading: true }));

    // Simulate file upload
    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        documentation: {
          ...prev.documentation,
          uploadedDocs: {
            ...prev.documentation.uploadedDocs,
            [docType]: {
              name: file.name,
              size: file.size,
              uploadedAt: new Date().toISOString(),
            },
          },
        },
      }));

      setLoading((prev) => ({ ...prev, documentUploading: false }));
    }, 1000);
  };

  // Get current location
  const getCurrentLocation = () => {
    setLoading((prev) => ({ ...prev, locationLoading: true }));

    if (!navigator.geolocation) {
      setFormErrors((prev) => ({
        ...prev,
        location: "Geolocation is not supported by your browser.",
      }));
      setLoading((prev) => ({ ...prev, locationLoading: false }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocationData((prev) => ({
          ...prev,
          coordinates: { latitude, longitude },
        }));

        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          const address = response.data.display_name;
          handleFieldChange("addressInfo", "billingAddress", address);
        } catch (error) {
          console.error("Error fetching address:", error);
        } finally {
          setLoading((prev) => ({ ...prev, locationLoading: false }));
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLoading((prev) => ({ ...prev, locationLoading: false }));
      }
    );
  };

  // Validate current step
  const validateCurrentStep = () => {
    const errors = {};

    switch (activeStep) {
      case 0: // Personal Details
        if (!formData.personalDetails.firstName.trim()) {
          errors["personalDetails.firstName"] = "First name is required";
        }
        if (!formData.personalDetails.lastName.trim()) {
          errors["personalDetails.lastName"] = "Last name is required";
        }
        if (!formData.personalDetails.mobile.trim()) {
          errors["personalDetails.mobile"] = "Mobile number is required";
        } else if (!/^[6-9]\d{9}$/.test(formData.personalDetails.mobile)) {
          errors["personalDetails.mobile"] =
            "Enter a valid Indian mobile number";
        }
        if (!formData.personalDetails.email.trim()) {
          errors["personalDetails.email"] = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.personalDetails.email)) {
          errors["personalDetails.email"] = "Enter a valid email address";
        }
        if (!formData.addressInfo.billingAddress.trim()) {
          errors["addressInfo.billingAddress"] = "Billing address is required";
        }
        break;

      case 1: // Financial Planning
        if (formData.financialPlanning.paymentMethod === "emi") {
          if (!formData.financialPlanning.downPayment) {
            errors["financialPlanning.downPayment"] =
              "Down payment is required";
          } else if (
            parseFloat(formData.financialPlanning.downPayment) <
            BOOKING_CONFIG.minDownPayment
          ) {
            errors[
              "financialPlanning.downPayment"
            ] = `Minimum down payment is ₹${BOOKING_CONFIG.minDownPayment.toLocaleString()}`;
          }
          if (!formData.financialPlanning.selectedBank) {
            errors["financialPlanning.selectedBank"] = "Please select a bank";
          }
        }
        break;

      case 2: {
        // Documentation: Require either Aadhar OR Driving License
        const aadharUploaded = !!formData.documentation.uploadedDocs["aadhar"];
        const licenseUploaded =
          !!formData.documentation.uploadedDocs["license"];
        if (!aadharUploaded && !licenseUploaded) {
          errors["documentation.either"] =
            "Aadhar Card or Driving License is required";
        }
        break;
      }

      case 3: // Delivery Scheduling
        if (!formData.deliveryScheduling.preferredDate) {
          errors["deliveryScheduling.preferredDate"] =
            "Preferred delivery date is required";
        }
        if (!formData.deliveryScheduling.preferredTime) {
          errors["deliveryScheduling.preferredTime"] =
            "Preferred delivery time is required";
        }
        break;

      case 4: // Final agreements
        if (!formData.agreements.termsAccepted) {
          errors["agreements.termsAccepted"] =
            "You must accept the terms and conditions";
        }
        if (!formData.agreements.privacyAccepted) {
          errors["agreements.privacyAccepted"] =
            "You must accept the privacy policy";
        }
        break;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle next step
  const handleNext = () => {
    if (validateCurrentStep()) {
      setActiveStep((prev) => prev + 1);
    }
  };

  // Handle previous step
  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  // Handle final submission
  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setLoading((prev) => ({ ...prev, submitting: true }));

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const bookingData = {
        ...formData,
        bikeDetails: bikeData,
        emiDetails,
        bookingId: `BK${Date.now()}`,
        bookingDate: new Date().toISOString(),
      };

      console.log("Booking submitted:", bookingData);

      // Navigate to success page or show success dialog
      alert(
        "Booking submitted successfully! You will receive a confirmation email shortly."
      );
    } catch (error) {
      console.error("Booking submission error:", error);
      alert("Error submitting booking. Please try again.");
    } finally {
      setLoading((prev) => ({ ...prev, submitting: false }));
    }
  };

  // Render step content
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return renderPersonalDetailsStep();
      case 1:
        return renderFinancialPlanningStep();
      case 2:
        return renderDocumentationStep();
      case 3:
        return renderDeliveryStep();
      case 4:
        return renderConfirmationStep();
      default:
        return null;
    }
  };

  // Personal Details Step
  const renderPersonalDetailsStep = () => (
    <Stack spacing={2}>
      <Box>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontWeight: 600,
            color: "#333",
            mb: 0.5,
          }}
        >
          👤 Personal Information
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Please provide your contact information
        </Typography>
      </Box>

      <div className="personal-details-row single-row">
        <div className="quarter-width">
          <TextField
            label="First Name"
            fullWidth
            value={formData.personalDetails.firstName}
            onChange={(e) =>
              handleFieldChange("personalDetails", "firstName", e.target.value)
            }
            error={!!formErrors["personalDetails.firstName"]}
            helperText={formErrors["personalDetails.firstName"]}
            required
          />
        </div>
        <div className="quarter-width">
          <TextField
            label="Last Name"
            fullWidth
            value={formData.personalDetails.lastName}
            onChange={(e) =>
              handleFieldChange("personalDetails", "lastName", e.target.value)
            }
            error={!!formErrors["personalDetails.lastName"]}
            helperText={formErrors["personalDetails.lastName"]}
            required
          />
        </div>
        <div className="quarter-width">
          <TextField
            label="Mobile Number"
            fullWidth
            value={formData.personalDetails.mobile}
            onChange={(e) =>
              handleFieldChange(
                "personalDetails",
                "mobile",
                e.target.value.replace(/\D/g, "")
              )
            }
            error={!!formErrors["personalDetails.mobile"]}
            helperText={formErrors["personalDetails.mobile"]}
            inputProps={{ maxLength: 10 }}
            required
          />
        </div>
        <div className="quarter-width">
          <TextField
            label="Email Address"
            fullWidth
            type="email"
            value={formData.personalDetails.email}
            onChange={(e) =>
              handleFieldChange("personalDetails", "email", e.target.value)
            }
            error={!!formErrors["personalDetails.email"]}
            helperText={formErrors["personalDetails.email"]}
            required
          />
        </div>
      </div>

      <Divider sx={{ my: 4, background: "#f0f0f0" }} />

      <Box>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontWeight: 600,
            color: "#333",
            mb: 0.5,
          }}
        >
          🏠 Address Information
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Where should we deliver your bike?
        </Typography>
      </Box>

      <div className="address-details-row single-row">
        <div
          className="full-width address-paper"
          style={{
            display: "flex",
            alignItems: "center",
            border: formErrors["addressInfo.billingAddress"]
              ? "1px solid red"
              : "1px solid #e0e0e0",
            background: "#fafafa",
            borderRadius: "8px",
            padding: "2px 4px",
            maxHeight: "fit-content",
          }}
        >
          <span className="address-icon" style={{ marginRight: 8 }}>
            <PlaceIcon />
          </span>
          <TextField
            variant="standard"
            placeholder="🏠 Billing Address"
            value={formData.addressInfo.billingAddress}
            onChange={(e) =>
              handleFieldChange("addressInfo", "billingAddress", e.target.value)
            }
            InputProps={{ disableUnderline: true, style: { flex: 1 } }}
            fullWidth
          />
          <IconButton
            onClick={getCurrentLocation}
            disabled={loading.locationLoading}
            // sx={{ p: "10px" }}
          >
            {loading.locationLoading ? (
              <CircularProgress size={20} />
            ) : (
              <MyLocationIcon />
            )}
          </IconButton>
        </div>
        {formErrors["addressInfo.billingAddress"] && (
          <Typography
            color="error"
            variant="caption"
            sx={{ mt: 1, display: "block" }}
          >
            {formErrors["addressInfo.billingAddress"]}
          </Typography>
        )}
        <div className="third-width">
          <TextField
            label="City"
            fullWidth
            value={formData.addressInfo.billingCity}
            onChange={(e) =>
              handleFieldChange("addressInfo", "billingCity", e.target.value)
            }
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />
        </div>
        <div className="third-width">
          <TextField
            label="State"
            fullWidth
            value={formData.addressInfo.billingState}
            onChange={(e) =>
              handleFieldChange("addressInfo", "billingState", e.target.value)
            }
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />
        </div>
        <div className="third-width">
          <TextField
            label="Pincode"
            fullWidth
            value={formData.addressInfo.billingPincode}
            onChange={(e) =>
              handleFieldChange(
                "addressInfo",
                "billingPincode",
                e.target.value.replace(/\D/g, "")
              )
            }
            inputProps={{ maxLength: 6 }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />
        </div>
      </div>

      <FormControlLabel
        control={
          <Checkbox
            checked={formData.addressInfo.sameAsDelivery}
            onChange={(e) =>
              handleFieldChange(
                "addressInfo",
                "sameAsDelivery",
                e.target.checked
              )
            }
          />
        }
        label="Delivery address same as billing address"
      />

      {!formData.addressInfo.sameAsDelivery && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Delivery Address"
              fullWidth
              multiline
              rows={2}
              value={formData.addressInfo.deliveryAddress}
              onChange={(e) =>
                handleFieldChange(
                  "addressInfo",
                  "deliveryAddress",
                  e.target.value
                )
              }
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
          </Grid>
        </Grid>
      )}
    </Stack>
  );

  // Financial Planning Step
  const renderFinancialPlanningStep = () => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        💰 Financial Planning
      </Typography>

      <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            {bikeData.brand} {bikeData.model}
          </Typography>
          <div className="single-row financial-row">
            <div className="half-width">
              <Typography variant="body2" color="textSecondary">
                Original Price
              </Typography>
              <Typography
                variant="h6"
                sx={{ textDecoration: "line-through", color: "text.disabled" }}
              >
                ₹{bikeData.price.toLocaleString()}
              </Typography>
            </div>
            <div className="half-width">
              <Typography variant="body2" color="textSecondary">
                Discounted Price
              </Typography>
              <Typography variant="h6" color="primary">
                ₹{bikeData.discountedPrice.toLocaleString()}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>

      <FormControl component="fieldset">
        <FormLabel component="legend">Payment Method</FormLabel>
        <RadioGroup
          value={formData.financialPlanning.paymentMethod}
          onChange={(e) =>
            handleFieldChange(
              "financialPlanning",
              "paymentMethod",
              e.target.value
            )
          }
        >
          <FormControlLabel
            value="cash"
            control={<Radio />}
            label="💵 Full Cash Payment"
          />
          <FormControlLabel
            value="emi"
            control={<Radio />}
            label="💳 EMI / Loan"
          />
          <FormControlLabel
            value="exchange"
            control={<Radio />}
            label="🔄 Exchange + Cash/EMI"
          />
        </RadioGroup>
      </FormControl>

      {formData.financialPlanning.paymentMethod === "emi" && (
        <Card
          variant="outlined"
          sx={{ p: 3, borderRadius: 2, bgcolor: "primary.50" }}
        >
          <Typography variant="h6" gutterBottom>
            <CalculateIcon sx={{ mr: 1, verticalAlign: "middle" }} />
            EMI Calculator
          </Typography>

          <div className="single-row financial-row">
            <div className="third-width">
              <TextField
                label="Down Payment (₹)"
                fullWidth
                type="number"
                value={formData.financialPlanning.downPayment}
                onChange={(e) =>
                  handleFieldChange(
                    "financialPlanning",
                    "downPayment",
                    e.target.value
                  )
                }
                error={!!formErrors["financialPlanning.downPayment"]}
                helperText={
                  formErrors["financialPlanning.downPayment"] ||
                  `Minimum: ₹${BOOKING_CONFIG.minDownPayment.toLocaleString()}`
                }
                InputProps={{
                  startAdornment: (
                    <CurrencyRupeeIcon
                      sx={{ mr: 1, color: "text.secondary" }}
                    />
                  ),
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </div>
            <div className="third-width">
              <FormControl fullWidth>
                <InputLabel>Loan Tenure</InputLabel>
                <Select
                  value={formData.financialPlanning.loanTenure}
                  onChange={(e) =>
                    handleFieldChange(
                      "financialPlanning",
                      "loanTenure",
                      e.target.value
                    )
                  }
                  sx={{ borderRadius: 2 }}
                >
                  {BOOKING_CONFIG.loanTenures.map((tenure) => (
                    <MenuItem key={tenure} value={tenure}>
                      {tenure} months
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="third-width">
              <FormControl fullWidth>
                <InputLabel>Select Bank Partner</InputLabel>
                <Select
                  value={formData.financialPlanning.selectedBank}
                  onChange={(e) =>
                    handleFieldChange(
                      "financialPlanning",
                      "selectedBank",
                      e.target.value
                    )
                  }
                  error={!!formErrors["financialPlanning.selectedBank"]}
                  sx={{ borderRadius: 2 }}
                >
                  {BOOKING_CONFIG.bankPartners.map((bank) => (
                    <MenuItem key={bank.id} value={bank.id}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <span>{bank.name}</span>
                        <Chip
                          label={`${bank.interestRate}% interest`}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {formErrors["financialPlanning.selectedBank"] && (
                <Typography color="error" variant="caption">
                  {formErrors["financialPlanning.selectedBank"]}
                </Typography>
              )}
            </div>
          </div>

          {loading.emiCalculating ? (
            <Box sx={{ mt: 3, textAlign: "center" }}>
              <CircularProgress size={30} />
              <Typography variant="body2" sx={{ mt: 1 }}>
                Calculating EMI...
              </Typography>
            </Box>
          ) : (
            emiDetails.monthlyEMI > 0 && (
              <Box sx={{ mt: 3, p: 2, bgcolor: "success.50", borderRadius: 2 }}>
                <Typography variant="h6" color="success.main" gutterBottom>
                  💡 EMI Breakdown
                </Typography>
                <div className="single-row financial-row">
                  <div className="quarter-width">
                    <Typography variant="body2" color="textSecondary">
                      Monthly EMI
                    </Typography>
                    <Typography variant="h6">
                      ₹{emiDetails.monthlyEMI.toLocaleString()}
                    </Typography>
                  </div>
                  <div className="quarter-width">
                    <Typography variant="body2" color="textSecondary">
                      Total Interest
                    </Typography>
                    <Typography variant="h6">
                      ₹{emiDetails.totalInterest.toLocaleString()}
                    </Typography>
                  </div>
                  <div className="quarter-width">
                    <Typography variant="body2" color="textSecondary">
                      Processing Fee
                    </Typography>
                    <Typography variant="h6">
                      ₹{emiDetails.processingFee.toLocaleString()}
                    </Typography>
                  </div>
                  <div className="quarter-width">
                    <Typography variant="body2" color="textSecondary">
                      Total Amount
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ₹{emiDetails.totalAmount.toLocaleString()}
                    </Typography>
                  </div>
                </div>
              </Box>
            )
          )}
        </Card>
      )}

      {formData.financialPlanning.paymentMethod === "exchange" && (
        <Card variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            🔄 Exchange Bike Details
          </Typography>

          <FormControlLabel
            control={
              <Checkbox
                checked={formData.financialPlanning.hasExchangeBike}
                onChange={(e) =>
                  handleFieldChange(
                    "financialPlanning",
                    "hasExchangeBike",
                    e.target.checked
                  )
                }
              />
            }
            label="I have a bike to exchange"
          />

          {formData.financialPlanning.hasExchangeBike && (
            <>
              <div className="single-row exchange-row">
                <div className="quarter-width">
                  <TextField
                    label="Exchange Bike Brand"
                    fullWidth
                    value={formData.financialPlanning.exchangeBikeDetails.brand}
                    onChange={(e) =>
                      handleNestedFieldChange(
                        "financialPlanning",
                        "exchangeBikeDetails",
                        "brand",
                        e.target.value
                      )
                    }
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                </div>
                <div className="quarter-width">
                  <TextField
                    label="Exchange Bike Model"
                    fullWidth
                    value={formData.financialPlanning.exchangeBikeDetails.model}
                    onChange={(e) =>
                      handleNestedFieldChange(
                        "financialPlanning",
                        "exchangeBikeDetails",
                        "model",
                        e.target.value
                      )
                    }
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                </div>
                <div className="quarter-width">
                  <TextField
                    label="Year of Purchase"
                    fullWidth
                    type="number"
                    value={formData.financialPlanning.exchangeBikeDetails.year}
                    onChange={(e) =>
                      handleNestedFieldChange(
                        "financialPlanning",
                        "exchangeBikeDetails",
                        "year",
                        e.target.value
                      )
                    }
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                </div>
                <div className="quarter-width">
                  <TextField
                    label="KM Driven"
                    fullWidth
                    type="number"
                    value={
                      formData.financialPlanning.exchangeBikeDetails.kmDriven
                    }
                    onChange={(e) =>
                      handleNestedFieldChange(
                        "financialPlanning",
                        "exchangeBikeDetails",
                        "kmDriven",
                        e.target.value
                      )
                    }
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                </div>
              </div>
              <div className="single-row exchange-row">
                <div className="half-width">
                  <FormControl fullWidth>
                    <InputLabel>Condition</InputLabel>
                    <Select
                      value={
                        formData.financialPlanning.exchangeBikeDetails.condition
                      }
                      onChange={(e) =>
                        handleNestedFieldChange(
                          "financialPlanning",
                          "exchangeBikeDetails",
                          "condition",
                          e.target.value
                        )
                      }
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="excellent">Excellent</MenuItem>
                      <MenuItem value="good">Good</MenuItem>
                      <MenuItem value="fair">Fair</MenuItem>
                      <MenuItem value="poor">Poor</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="half-width">
                  {/* Placeholder for expected value or other info */}
                </div>
              </div>
            </>
          )}
        </Card>
      )}
    </Stack>
  );

  // Documentation Step
  const renderDocumentationStep = () => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        📄 Documentation
      </Typography>

      <Alert severity="info" sx={{ borderRadius: 2 }}>
        Please upload clear photos of your documents. Accepted formats: JPG,
        PNG, PDF (Max 5MB each). <br />
        <strong>
          Note: You only need to upload{" "}
          <span style={{ color: "green" }}>Aadhar Card</span> <b>or</b>{" "}
          <span style={{ color: "green" }}>Driving License</span>.
        </strong>
      </Alert>

      <Grid container spacing={3}>
        {/* Aadhar Card Upload */}
        <Grid item xs={12} sm={6}>
          <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography variant="subtitle1">Aadhar Card</Typography>
              {formData.documentation.uploadedDocs["aadhar"] && (
                <CheckCircleIcon color="success" />
              )}
            </Box>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) => handleFileUpload("aadhar", e.target.files[0])}
              style={{ display: "none" }}
              ref={(el) => (fileInputRefs.current["aadhar"] = el)}
            />
            <Button
              variant="outlined"
              fullWidth
              startIcon={<UploadFileIcon />}
              onClick={() => fileInputRefs.current["aadhar"]?.click()}
              disabled={loading.documentUploading}
              sx={{ borderRadius: 2 }}
            >
              {formData.documentation.uploadedDocs["aadhar"]
                ? "Replace Document"
                : "Upload Document"}
            </Button>
            {formData.documentation.uploadedDocs["aadhar"] && (
              <Box sx={{ mt: 1, p: 1, bgcolor: "success.50", borderRadius: 1 }}>
                <Typography variant="caption" color="success.main">
                  ✅ {formData.documentation.uploadedDocs["aadhar"].name}
                </Typography>
              </Box>
            )}
          </Card>
        </Grid>

        {/* OR Separator */}
        <Grid
          item
          xs={12}
          sm={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#888", mx: 2 }}
          >
            OR
          </Typography>
        </Grid>

        {/* Driving License Upload */}
        <Grid item xs={12} sm={6}>
          <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography variant="subtitle1">Driving License</Typography>
              {formData.documentation.uploadedDocs["license"] && (
                <CheckCircleIcon color="success" />
              )}
            </Box>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) => handleFileUpload("license", e.target.files[0])}
              style={{ display: "none" }}
              ref={(el) => (fileInputRefs.current["license"] = el)}
            />
            <Button
              variant="outlined"
              fullWidth
              startIcon={<UploadFileIcon />}
              onClick={() => fileInputRefs.current["license"]?.click()}
              disabled={loading.documentUploading}
              sx={{ borderRadius: 2 }}
            >
              {formData.documentation.uploadedDocs["license"]
                ? "Replace Document"
                : "Upload Document"}
            </Button>
            {formData.documentation.uploadedDocs["license"] && (
              <Box sx={{ mt: 1, p: 1, bgcolor: "success.50", borderRadius: 1 }}>
                <Typography variant="caption" color="success.main">
                  ✅ {formData.documentation.uploadedDocs["license"].name}
                </Typography>
              </Box>
            )}
          </Card>
        </Grid>
        {formErrors["documentation.either"] && (
          <Grid item xs={12}>
            <Typography color="error" variant="caption" sx={{ mt: 1 }}>
              {formErrors["documentation.either"]}
            </Typography>
          </Grid>
        )}
      </Grid>

      {loading.documentUploading && (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Uploading document...
          </Typography>
        </Box>
      )}
    </Stack>
  );

  // Delivery Step
  const renderDeliveryStep = () => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        🚚 Delivery Setup
      </Typography>

      <FormControl component="fieldset">
        <FormLabel component="legend">Delivery Preference</FormLabel>
        <RadioGroup
          value={formData.deliveryScheduling.deliveryType}
          onChange={(e) =>
            handleFieldChange(
              "deliveryScheduling",
              "deliveryType",
              e.target.value
            )
          }
        >
          <FormControlLabel
            value="home"
            control={<Radio />}
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <HomeIcon sx={{ mr: 1 }} />
                Home Delivery (Free within 50km)
              </Box>
            }
          />
          <FormControlLabel
            value="showroom"
            control={<Radio />}
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <StoreIcon sx={{ mr: 1 }} />
                Showroom Pickup
              </Box>
            }
          />
        </RadioGroup>
      </FormControl>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Preferred Delivery Date"
              value={formData.deliveryScheduling.preferredDate}
              onChange={(date) =>
                handleFieldChange("deliveryScheduling", "preferredDate", date)
              }
              minDate={dayjs().add(7, "day")} // 7 days from now
              maxDate={dayjs().add(30, "day")} // 30 days from now
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!formErrors["deliveryScheduling.preferredDate"],
                  helperText:
                    formErrors["deliveryScheduling.preferredDate"] ||
                    "Delivery available 7-30 days from booking",
                  sx: { "& .MuiOutlinedInput-root": { borderRadius: 2 } },
                },
              }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Preferred Time Slot</InputLabel>
            <Select
              value={formData.deliveryScheduling.preferredTime}
              onChange={(e) =>
                handleFieldChange(
                  "deliveryScheduling",
                  "preferredTime",
                  e.target.value
                )
              }
              error={!!formErrors["deliveryScheduling.preferredTime"]}
              sx={{ borderRadius: 2 }}
            >
              {deliverySlots.map((slot) => (
                <MenuItem key={slot} value={slot}>
                  {slot}
                </MenuItem>
              ))}
            </Select>
            {formErrors["deliveryScheduling.preferredTime"] && (
              <Typography color="error" variant="caption">
                {formErrors["deliveryScheduling.preferredTime"]}
              </Typography>
            )}
          </FormControl>
        </Grid>
      </Grid>

      <TextField
        label="Special Instructions (Optional)"
        fullWidth
        multiline
        rows={3}
        value={formData.deliveryScheduling.specialInstructions}
        onChange={(e) =>
          handleFieldChange(
            "deliveryScheduling",
            "specialInstructions",
            e.target.value
          )
        }
        placeholder="Any specific delivery instructions, contact person, etc."
        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
      />

      {formData.deliveryScheduling.deliveryType === "home" && (
        <Alert severity="info" sx={{ borderRadius: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Home Delivery Benefits:
          </Typography>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>Free delivery within 50km radius</li>
            <li>Expert will set up your bike</li>
            <li>Complete document handover</li>
            <li>Quick tutorial on bike features</li>
          </ul>
        </Alert>
      )}
    </Stack>
  );

  // Confirmation Step
  const renderConfirmationStep = () => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        ✅ Review & Confirm
      </Typography>

      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" color="primary" gutterBottom>
            Order Summary
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Bike Model
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {bikeData.brand} {bikeData.model}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Final Price
              </Typography>
              <Typography variant="h6" color="primary">
                ₹{bikeData.discountedPrice.toLocaleString()}
              </Typography>
            </Grid>

            {formData.financialPlanning.paymentMethod === "emi" &&
              emiDetails.monthlyEMI > 0 && (
                <>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">
                      Monthly EMI
                    </Typography>
                    <Typography variant="h6">
                      ₹{emiDetails.monthlyEMI.toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">
                      Down Payment
                    </Typography>
                    <Typography variant="h6">
                      ₹
                      {parseFloat(
                        formData.financialPlanning.downPayment || 0
                      ).toLocaleString()}
                    </Typography>
                  </Grid>
                </>
              )}

            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Delivery Date
              </Typography>
              <Typography variant="body1">
                {formData.deliveryScheduling.preferredDate?.format(
                  "DD MMM YYYY"
                )}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Delivery Time
              </Typography>
              <Typography variant="body1">
                {formData.deliveryScheduling.preferredTime}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Accordion sx={{ borderRadius: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1">📋 Customer Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Name
              </Typography>
              <Typography variant="body1">
                {formData.personalDetails.firstName}{" "}
                {formData.personalDetails.lastName}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Mobile
              </Typography>
              <Typography variant="body1">
                {formData.personalDetails.mobile}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                Address
              </Typography>
              <Typography variant="body1">
                {formData.addressInfo.billingAddress}
              </Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Stack spacing={2}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.agreements.termsAccepted}
              onChange={(e) =>
                handleFieldChange(
                  "agreements",
                  "termsAccepted",
                  e.target.checked
                )
              }
            />
          }
          label={
            <Typography variant="body2">
              I accept the{" "}
              <Button variant="text" size="small">
                Terms & Conditions
              </Button>
            </Typography>
          }
        />
        {formErrors["agreements.termsAccepted"] && (
          <Typography color="error" variant="caption">
            {formErrors["agreements.termsAccepted"]}
          </Typography>
        )}

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.agreements.privacyAccepted}
              onChange={(e) =>
                handleFieldChange(
                  "agreements",
                  "privacyAccepted",
                  e.target.checked
                )
              }
            />
          }
          label={
            <Typography variant="body2">
              I accept the{" "}
              <Button variant="text" size="small">
                Privacy Policy
              </Button>
            </Typography>
          }
        />
        {formErrors["agreements.privacyAccepted"] && (
          <Typography color="error" variant="caption">
            {formErrors["agreements.privacyAccepted"]}
          </Typography>
        )}

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.agreements.newsletterSubscribe}
              onChange={(e) =>
                handleFieldChange(
                  "agreements",
                  "newsletterSubscribe",
                  e.target.checked
                )
              }
            />
          }
          label="Subscribe to newsletter for offers & updates"
        />
      </Stack>

      <Alert severity="success" sx={{ borderRadius: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          🎉 You&apos;re almost done!
        </Typography>
        <Typography variant="body2">
          Click &quot;Complete Booking&quot; to finalize your purchase.
          You&apos;ll receive a confirmation email with all details.
        </Typography>
      </Alert>
    </Stack>
  );

  return (
    <div className="container">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box className="book-bike-container">
          {/* Header Section */}
          <Box sx={{ textAlign: "center", mb: 4, pt: 2 }}>
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: "34px",
                background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                WebkitBackgroundClip: "text",
                // WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                mb: 1,
              }}
            >
              🏍️ Book Your Dream Bike
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ fontWeight: 400 }}
            >
              Complete your purchase in just a few simple steps
            </Typography>
          </Box>

          {/* Progress Stepper */}
          <Card
            sx={{
              mb: 1,
              borderRadius: 4,
              background: "white",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stepper
                activeStep={activeStep}
                orientation={isMobile ? "vertical" : "horizontal"}
                sx={{
                  "& .MuiStepLabel-label": {
                    fontWeight: 500,
                    color: "#666",
                    "&.Mui-active": {
                      color: "#1976d2",
                      fontWeight: 600,
                    },
                    "&.Mui-completed": {
                      color: "#4caf50",
                      fontWeight: 600,
                    },
                  },
                }}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>

          {/* Step Content */}
          <Card
            sx={{
              borderRadius: 4,
              background: "white",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
              mb: 2,
            }}
          >
            <CardContent sx={{ p: 4 }}>{renderStepContent()}</CardContent>
          </Card>

          {/* Navigation Buttons */}
          <Card
            sx={{
              borderRadius: 4,
              background: "white",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  sx={{
                    borderRadius: 1,
                    px: 3,
                    py: 1.5,
                    fontWeight: 600,
                    color: "#666",
                    borderColor: "#ddd",
                    "&:hover": {
                      background: "#f5f5f5",
                      borderColor: "#bbb",
                    },
                  }}
                >
                  Previous
                </Button>

                {/* Progress indicator */}
                <Box sx={{ flex: 1, mx: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={(activeStep / (steps.length - 1)) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      background: "rgba(25, 118, 210, 0.1)",
                      "& .MuiLinearProgress-bar": {
                        background:
                          "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
                        borderRadius: 4,
                      },
                    }}
                  />
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    sx={{ mt: 1, display: "block", textAlign: "center" }}
                  >
                    Step {activeStep + 1} of {steps.length}
                  </Typography>
                </Box>

                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading.submitting}
                    startIcon={
                      loading.submitting ? (
                        <CircularProgress size={20} />
                      ) : (
                        <CheckCircleIcon />
                      )
                    }
                    sx={{
                      borderRadius: 1,
                      px: 3,
                      py: 1.5,
                      fontWeight: 600,
                      minWidth: 200,
                      background:
                        "linear-gradient(45deg, #4caf50 30%, #66bb6a 90%)",
                      boxShadow: "0 4px 12px rgba(76, 175, 80, 0.3)",
                      "&:hover": {
                        boxShadow: "0 6px 16px rgba(76, 175, 80, 0.4)",
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    {loading.submitting ? "Processing..." : "Complete Booking"}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{
                      borderRadius: 1,
                      px: 3,
                      py: 1.5,
                      fontWeight: 600,
                      background:
                        "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
                      boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
                      "&:hover": {
                        boxShadow: "0 6px 16px rgba(25, 118, 210, 0.4)",
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </LocalizationProvider>
    </div>
  );
};

export default BookBike;
