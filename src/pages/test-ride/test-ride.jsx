// React Imports
import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

// MUI Date Picker
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Typography,
  IconButton,
  Box,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import axios from "axios";

// MUI Icon Imports
import MyLocationIcon from "@mui/icons-material/MyLocation";
import SearchIcon from "@mui/icons-material/Search";
import PlaceIcon from "@mui/icons-material/Place";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";

// Assets
import bikeImg from "../../../public/images/illustrations/bike.svg";

// Data
import timeSlotData from "../../data/time-slot-availability.json";

// Local Imports
import "./test-ride.scss";

// ── Constants ────────────────────────────────────────────────────────────────
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const SERVICE_CONFIG = {
  maxDistance: 10,
  pricing: {
    "0-1": { range: "Within 1km", price: 49, currency: "₹" },
    "1-2": { range: "1-2km", price: 69, currency: "₹" },
    "2-3": { range: "2-3km", price: 79, currency: "₹" },
    "3-4": { range: "3-4km", price: 89, currency: "₹" },
    "4-5": { range: "4-5km", price: 99, currency: "₹" },
    "5-6": { range: "5-6km", price: 119, currency: "₹" },
    "6-7": { range: "6-7km", price: 129, currency: "₹" },
    "7-8": { range: "7-8km", price: 139, currency: "₹" },
    "8-9": { range: "8-9km", price: 149, currency: "₹" },
    "9-10": { range: "9-10km", price: 159, currency: "₹" },
  },
};

const bikeBaseLocation = {
  latitude: 11.443487,
  longitude: 77.707368,
};

const calculateServicePrice = (distanceKm) => {
  const d = parseFloat(distanceKm);
  if (!d || d <= 0) return null;
  if (d <= 1) return SERVICE_CONFIG.pricing["0-1"];
  if (d <= 2) return SERVICE_CONFIG.pricing["1-2"];
  if (d <= 3) return SERVICE_CONFIG.pricing["2-3"];
  if (d <= 4) return SERVICE_CONFIG.pricing["3-4"];
  if (d <= 5) return SERVICE_CONFIG.pricing["4-5"];
  if (d <= 6) return SERVICE_CONFIG.pricing["5-6"];
  if (d <= 7) return SERVICE_CONFIG.pricing["6-7"];
  if (d <= 8) return SERVICE_CONFIG.pricing["7-8"];
  if (d <= 9) return SERVICE_CONFIG.pricing["8-9"];
  if (d <= 10) return SERVICE_CONFIG.pricing["9-10"];
  return null;
};

const calculateDistanceInKm = (lat1, lon1, lat2, lon2) => {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const FEATURES = [
  {
    icon: <HomeWorkRoundedIcon />,
    title: "Your Venue, Your Rules",
    desc: "We deliver the bike to your driveway, office, or favourite stretch of road. Test the performance where you live.",
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: "Concierge Support",
    desc: "Every demo is accompanied by a Product Specialist to walk you through the tech, charging, and custom tuning options.",
  },
  {
    icon: <BoltRoundedIcon />,
    title: "Full Charge Ready",
    desc: "The bike arrives fully charged and ready to unleash its potential. We provide a premium helmet and safety equipment.",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
const TestRide = () => {
  const { bike_brand, bike_model } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    date: null,
    time: "",
    location: "",
    agree: false,
  });
  const [errors, setErrors] = useState({});

  // Location state
  const [locationLoading, setLocationLoading] = useState(false);
  const [distanceKm, setDistanceKm] = useState(null);
  const [servicePricing, setServicePricing] = useState(null);
  const [nearestBranch, setNearestBranch] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const autocompleteService = useRef(null);
  const placesService = useRef(null);

  // Time slot state
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [timeSlotsLoading, setTimeSlotsLoading] = useState(false);

  // Confirmation dialog
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ── Google Maps Init ───────────────────────────────────────────────────────
  useEffect(() => {
    const init = () => {
      if (window.google && window.google.maps) {
        autocompleteService.current =
          new window.google.maps.places.AutocompleteService();
        placesService.current = new window.google.maps.places.PlacesService(
          document.createElement("div"),
        );
        return;
      }
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = init;
      document.head.appendChild(script);
    };
    init();
  }, []);

  // ── Fetch time slots when date / location changes ─────────────────────────
  useEffect(() => {
    if (formData.date) {
      fetchAvailableTimeSlots(
        formData.date,
        formData.location ? formData.location : "generic",
      );
    } else {
      setAvailableTimeSlots([]);
    }
  }, [formData.date, formData.location]);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const getNearestBranch = (userLat, userLng) => {
    let nearest = null;
    let minDist = Infinity;
    Object.entries(timeSlotData.branches).forEach(([id, branch]) => {
      const d = calculateDistanceInKm(
        userLat,
        userLng,
        branch.coordinates.latitude,
        branch.coordinates.longitude,
      );
      if (d < minDist && d <= branch.serviceRadius) {
        minDist = d;
        nearest = { id, ...branch, distance: d };
      }
    });
    return nearest;
  };

  const getTimeSlotsFromData = (selectedDate, branchId) => {
    try {
      const dateStr = dayjs(selectedDate).format("YYYY-MM-DD");
      const dayOfWeek = dayjs(selectedDate).day();
      const isToday = dayjs(selectedDate).isSame(dayjs(), "day");
      const currentHour = dayjs().hour();
      const branch = timeSlotData.branches[branchId];
      if (!branch) return [];
      if (branch.holidays?.includes(dateStr)) return [];
      if (!branch.workingDays?.includes(dayOfWeek)) return [];

      let slots =
        dayOfWeek === 0 || dayOfWeek === 6
          ? [...timeSlotData.defaultAvailability.weekends.slots]
          : [
              ...(branch.timeSlots ||
                timeSlotData.defaultAvailability.weekdays.slots),
            ];

      if (isToday) {
        slots = slots.filter((slot) => {
          const hour = parseInt(slot.split(":")[0]);
          const isPM = slot.includes("PM");
          let adj = hour;
          if (isPM && hour !== 12) adj = hour + 12;
          else if (!isPM && hour === 12) adj = 0;
          return adj > currentHour;
        });
      }

      const occupied =
        timeSlotData.bookings?.[dateStr]?.[branchId]?.occupiedSlots || [];
      return slots.filter((s) => !occupied.includes(s));
    } catch {
      return [];
    }
  };

  const fetchAvailableTimeSlots = async (selectedDate, location) => {
    if (!selectedDate) {
      setAvailableTimeSlots([]);
      return;
    }
    setTimeSlotsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 400));
      let slots = [];

      if (location && location !== "generic" && coordinates) {
        const nearest = getNearestBranch(
          coordinates.latitude,
          coordinates.longitude,
        );
        if (nearest) {
          setNearestBranch(nearest);
          slots = getTimeSlotsFromData(selectedDate, nearest.id);
        } else {
          setNearestBranch(null);
        }
      } else {
        setNearestBranch(null);
        const dow = dayjs(selectedDate).day();
        const isToday = dayjs(selectedDate).isSame(dayjs(), "day");
        const curHour = dayjs().hour();
        slots =
          dow === 0 || dow === 6
            ? [...timeSlotData.defaultAvailability.weekends.slots]
            : [...timeSlotData.defaultAvailability.weekdays.slots];

        if (isToday) {
          slots = slots.filter((slot) => {
            const hour = parseInt(slot.split(":")[0]);
            const isPM = slot.includes("PM");
            let adj = hour;
            if (isPM && hour !== 12) adj = hour + 12;
            else if (!isPM && hour === 12) adj = 0;
            return adj > curHour;
          });
        }
      }

      setAvailableTimeSlots(slots);
      if (formData.time && !slots.includes(formData.time)) {
        setFormData((prev) => ({ ...prev, time: "" }));
      }
    } catch {
      setAvailableTimeSlots(timeSlotData.defaultAvailability.weekdays.slots);
    } finally {
      setTimeSlotsLoading(false);
    }
  };

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newVal = type === "checkbox" ? checked : value;
    if (name === "mobile") newVal = String(newVal).replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, [name]: newVal }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleDateChange = (newDate) => {
    setFormData((prev) => ({ ...prev, date: newDate, time: "" }));
    setErrors((prev) => ({ ...prev, date: undefined, time: undefined }));
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(false);
  };

  const handleSearchClick = () => {
    const q = searchQuery.trim();
    if (q.length > 2 && autocompleteService.current) {
      autocompleteService.current.getPlacePredictions(
        { input: q, componentRestrictions: { country: "in" } },
        (predictions, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            setSearchSuggestions(predictions);
            setShowSuggestions(true);
          } else {
            setSearchSuggestions([]);
            setShowSuggestions(false);
          }
        },
      );
    }
  };

  const handlePlaceSelect = (placeId, description) => {
    if (!placesService.current) return;
    placesService.current.getDetails(
      { placeId, fields: ["geometry", "formatted_address"] },
      (place, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          place
        ) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          const dist = calculateDistanceInKm(
            lat,
            lng,
            bikeBaseLocation.latitude,
            bikeBaseLocation.longitude,
          );
          const priceInfo = calculateServicePrice(dist.toFixed(2));
          setDistanceKm(dist.toFixed(2));
          setCoordinates({ latitude: lat, longitude: lng, accuracy: "exact" });
          setServicePricing(priceInfo);
          setFormData((prev) => ({
            ...prev,
            location: place.formatted_address || description,
          }));
          setSearchQuery("");
          setShowSuggestions(false);
          setErrors((prev) => ({ ...prev, location: undefined }));
        }
      },
    );
  };

  const getCurrentLocation = () => {
    setLocationLoading(true);
    if (!navigator.geolocation) {
      setErrors((prev) => ({
        ...prev,
        location: "Geolocation is not supported by your browser.",
      }));
      setLocationLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude, accuracy } }) => {
        setCoordinates({ latitude, longitude, accuracy });
        try {
          const res = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          );
          const userAddress = res.data.display_name;
          const dist = calculateDistanceInKm(
            latitude,
            longitude,
            bikeBaseLocation.latitude,
            bikeBaseLocation.longitude,
          );
          const priceInfo = calculateServicePrice(dist.toFixed(2));
          setDistanceKm(dist.toFixed(2));
          setServicePricing(priceInfo);
          setFormData((prev) => ({ ...prev, location: userAddress }));
          setErrors((prev) => ({ ...prev, location: undefined }));
        } catch {
          setErrors((prev) => ({
            ...prev,
            location: "Failed to fetch address. Please enter manually.",
          }));
        } finally {
          setLocationLoading(false);
        }
      },
      (err) => {
        const msgs = {
          1: "Location access denied. Please enable location permissions.",
          2: "Location information unavailable.",
          3: "Location request timed out.",
        };
        setErrors((prev) => ({
          ...prev,
          location: msgs[err.code] || "Unknown error fetching location.",
        }));
        setLocationLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 300000 },
    );
  };

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Full name is required.";
    if (!formData.mobile.trim()) {
      errs.mobile = "Mobile number is required.";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      errs.mobile =
        "Enter a valid 10-digit Indian mobile number starting with 6–9.";
    }
    if (!formData.date) {
      errs.date = "Please select a preferred date for your demo.";
    } else {
      const sel = dayjs(formData.date);
      const today = dayjs().startOf("day");
      if (sel.isBefore(today))
        errs.date = "Please select a date that hasn't passed.";
      else if (sel.isAfter(dayjs().add(30, "day")))
        errs.date = "Date must be within the next 30 days.";
    }
    if (!formData.time) {
      if (!formData.date)
        errs.time = "Select a date first to view available time slots.";
      else if (availableTimeSlots.length === 0)
        errs.time = "No time slots are available for the selected date.";
      else errs.time = "Please select a preferred time slot.";
    } else if (
      formData.date &&
      availableTimeSlots.length > 0 &&
      !availableTimeSlots.includes(formData.time)
    ) {
      errs.time =
        "The selected time slot is no longer available. Please choose another.";
    }
    if (!formData.location.trim())
      errs.location = "Please enter your demo location so we can reach you.";
    if (!formData.agree)
      errs.agree = "Please confirm your consent to be contacted for the demo.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    if (distanceKm && parseFloat(distanceKm) > SERVICE_CONFIG.maxDistance) {
      setErrors((prev) => ({
        ...prev,
        location: `Doorstep demo not available beyond ${SERVICE_CONFIG.maxDistance}km.`,
      }));
      return;
    }
    setConfirmDialogOpen(true);
  };

  const handleConfirmBooking = () => {
    setConfirmDialogOpen(false);
    setSubmitted(true);
    setFormData({
      name: "",
      mobile: "",
      date: null,
      time: "",
      location: "",
      agree: false,
    });
    setErrors({});
    setDistanceKm(null);
    setServicePricing(null);
    setNearestBranch(null);
    setAvailableTimeSlots([]);
    setTimeout(() => setSubmitted(false), 6000);
  };

  const bikeDisplayName =
    bike_brand && bike_model
      ? `${bike_brand.replace(/-/g, " ")} ${bike_model.replace(/-/g, " ")}`
      : "Your Dream Bike";

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="tr-redesign">
        {/* ── Split Hero ── */}
        <section className="tr-redesign__hero">
          {/* Left — Image panel */}
          <div
            className="tr-redesign__hero-image"
            style={{ backgroundImage: `url(${bikeImg})` }}
          >
            <div className="tr-redesign__hero-overlay">
              <span className="tr-redesign__hero-badge">Book a Test Drive</span>
              <h1 className="tr-redesign__hero-heading">
                Ride Before <br />
                <span className="tr-redesign__hero-heading--accent">
                  You Decide.
                </span>
              </h1>
              <p className="tr-redesign__hero-desc">
                Experience the {bikeDisplayName} at your convenience. We bring
                the bike straight to your doorstep.
              </p>
              <div className="tr-redesign__hero-stats">
                <div className="tr-redesign__hero-stat">
                  <span className="tr-redesign__hero-stat-label">Duration</span>
                  <span className="tr-redesign__hero-stat-value">45 Min</span>
                </div>
                <div className="tr-redesign__hero-stat">
                  <span className="tr-redesign__hero-stat-label">Slot</span>
                  <span className="tr-redesign__hero-stat-value">Flexible</span>
                </div>
                <div className="tr-redesign__hero-stat">
                  <span className="tr-redesign__hero-stat-label">Charge</span>
                  <span className="tr-redesign__hero-stat-value">Free</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form panel */}
          <div className="tr-redesign__hero-form-panel">
            <div className="tr-redesign__form-wrapper">
              <header className="tr-redesign__form-header">
                <h2 className="tr-redesign__form-title">Book Your Demo</h2>
                <p className="tr-redesign__form-subtitle">
                  We bring the bike to you. No showroom, no pressure !
                </p>
                <hr className="tr-redesign__form-divider" />
              </header>

              {submitted && (
                <div className="tr-redesign__success-banner">
                  <CheckCircleRoundedIcon />
                  <span>
                    Booking confirmed! Our team will contact you shortly.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                {/* Full Name */}
                <div className="tr-redesign__form-group">
                  <label className="tr-redesign__form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className={`tr-redesign__form-input${errors.name ? " tr-redesign__form-input--error" : ""}`}
                  />
                  {errors.name && (
                    <span className="tr-redesign__form-error">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Mobile Number */}
                <div className="tr-redesign__form-group">
                  <label className="tr-redesign__form-label">
                    Mobile Number
                  </label>
                  <div className="tr-redesign__form-phone-wrap">
                    <span className="tr-redesign__form-phone-prefix">+91</span>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Mmobile Number"
                      maxLength={10}
                      inputMode="numeric"
                      className={`tr-redesign__form-input tr-redesign__form-input--phone${errors.mobile ? " tr-redesign__form-input--error" : ""}`}
                    />
                  </div>
                  {errors.mobile && (
                    <span className="tr-redesign__form-error">
                      {errors.mobile}
                    </span>
                  )}
                </div>

                {/* Preferred Date */}
                <div className="tr-redesign__form-group">
                  <label className="tr-redesign__form-label">
                    Preferred Date
                  </label>
                  <DatePicker
                    value={formData.date}
                    onChange={handleDateChange}
                    minDate={dayjs()}
                    maxDate={dayjs().add(30, "day")}
                    openTo="day"
                    views={["year", "month", "day"]}
                    shouldDisableDate={(date) =>
                      date.isBefore(dayjs(), "day") ||
                      date.isAfter(dayjs().add(30, "day"), "day")
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.date,
                        helperText: errors.date,
                        className: "tr-redesign__mui-datepicker",
                      },
                    }}
                  />
                </div>

                {/* Time Slot */}
                <div className="tr-redesign__form-group">
                  <label className="tr-redesign__form-label">
                    Preferred Time
                  </label>
                  <div className="tr-redesign__form-time-wrap">
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      disabled={!formData.date || timeSlotsLoading}
                      className={`tr-redesign__form-select${!formData.time ? " tr-redesign__form-select--empty" : ""}${errors.time ? " tr-redesign__form-input--error" : ""}${!formData.date || timeSlotsLoading ? " tr-redesign__form-select--disabled" : ""}`}
                    >
                      <option value="">
                        {!formData.date
                          ? "Select a date to see slots"
                          : timeSlotsLoading
                            ? "Loading slots…"
                            : availableTimeSlots.length === 0
                              ? "No slots available"
                              : "Select time slot"}
                      </option>
                      {availableTimeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                    {timeSlotsLoading && (
                      <CircularProgress
                        size={16}
                        className="tr-redesign__time-spinner"
                      />
                    )}
                  </div>
                  {errors.time && (
                    <span className="tr-redesign__form-error">
                      {errors.time}
                    </span>
                  )}
                  {!errors.time && !formData.date && (
                    <span className="tr-redesign__form-hint">
                      Select a date to view available time slots.
                    </span>
                  )}
                  {!errors.time &&
                    formData.date &&
                    !formData.location &&
                    !timeSlotsLoading && (
                      <span className="tr-redesign__form-hint">
                        Add your location to see personalised slots.
                      </span>
                    )}
                </div>

                {/* Demo Location */}
                <div className="tr-redesign__form-group">
                  <label className="tr-redesign__form-label">
                    Demo Location
                  </label>

                  {/* Search bar */}
                  <div className="tr-redesign__location-search-wrap">
                    <div
                      className={`tr-redesign__location-search${errors.location ? " tr-redesign__location-search--error" : ""}`}
                    >
                      <PlaceIcon className="tr-redesign__location-place-icon" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        onKeyDown={(e) =>
                          e.key === "Enter" &&
                          (e.preventDefault(), handleSearchClick())
                        }
                        placeholder="Search your address…"
                        className="tr-redesign__location-input"
                      />
                      <button
                        type="button"
                        onClick={handleSearchClick}
                        className="tr-redesign__location-search-btn"
                        title="Search"
                      >
                        <SearchIcon />
                      </button>
                      <span className="tr-redesign__location-divider" />
                      <button
                        type="button"
                        onClick={getCurrentLocation}
                        disabled={locationLoading}
                        className="tr-redesign__location-gps-btn"
                        title="Use current location"
                      >
                        {locationLoading ? (
                          <CircularProgress size={18} />
                        ) : (
                          <MyLocationIcon />
                        )}
                      </button>
                    </div>

                    {/* Suggestions dropdown */}
                    {showSuggestions && searchSuggestions.length > 0 && (
                      <div className="tr-redesign__location-suggestions">
                        {searchSuggestions.map((pred) => (
                          <div
                            key={pred.place_id}
                            className="tr-redesign__location-suggestion-item"
                            onClick={() =>
                              handlePlaceSelect(pred.place_id, pred.description)
                            }
                          >
                            <PlaceIcon className="tr-redesign__location-suggestion-icon" />
                            {pred.description}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {errors.location && (
                    <span className="tr-redesign__form-error">
                      {errors.location}
                    </span>
                  )}

                  {/* Selected address display */}
                  {formData.location && (
                    <div className="tr-redesign__location-result">
                      <p className="tr-redesign__location-address">
                        📍 {formData.location}
                      </p>
                      {distanceKm && (
                        <p className="tr-redesign__location-distance">
                          Distance from service centre:{" "}
                          <strong>{distanceKm} km</strong>
                        </p>
                      )}
                      {servicePricing && parseFloat(distanceKm) > 0 && (
                        <div className="tr-redesign__location-pricing">
                          🏠{" "}
                          <strong>
                            Doorstep Demo: {servicePricing.currency}
                            {servicePricing.price}
                          </strong>
                          <br />
                          🏢 From: {nearestBranch?.name || "Nearest Branch"} (
                          {servicePricing.range})
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Agree checkbox */}
                <div className="tr-redesign__form-group tr-redesign__form-group--checkbox">
                  <label className="tr-redesign__form-checkbox-label">
                    <input
                      type="checkbox"
                      name="agree"
                      checked={formData.agree}
                      onChange={handleChange}
                      className="tr-redesign__form-checkbox"
                    />
                    <span>🤝 I agree to be contacted for my demo</span>
                  </label>
                  {errors.agree && (
                    <span className="tr-redesign__form-error">
                      {errors.agree}
                    </span>
                  )}
                </div>

                {/* Submit */}
                <div className="tr-redesign__form-submit-wrap">
                  <button type="submit" className="tr-redesign__form-submit">
                    Confirm Booking
                  </button>
                  <p className="tr-redesign__form-note">
                    No commitment required &nbsp;·&nbsp; Professional gear
                    provided
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* ── Features Section ── */}
        <section className="tr-redesign__features">
          <div className="tr-redesign__features-grid">
            {FEATURES.map((feature, i) => (
              <div key={i} className="tr-redesign__feature">
                <div className="tr-redesign__feature-icon">{feature.icon}</div>
                <h3 className="tr-redesign__feature-title">{feature.title}</h3>
                <p className="tr-redesign__feature-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Confirmation Dialog ── */}
        <Dialog
          open={confirmDialogOpen}
          onClose={() => setConfirmDialogOpen(false)}
          fullScreen={isMobile}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                👀 Review Your Demo Details
              </Typography>
              <IconButton onClick={() => setConfirmDialogOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2} sx={{ py: 1 }}>
              {[
                { label: "Name", value: formData.name },
                { label: "Mobile Number", value: formData.mobile },
                {
                  label: "Preferred Date",
                  value: formData.date
                    ? dayjs(formData.date).format("DD MMMM YYYY")
                    : "—",
                },
                { label: "Preferred Time", value: formData.time },
                { label: "Your Location", value: formData.location },
              ].map(({ label, value }) => (
                <Box key={label}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", color: "text.secondary" }}
                  >
                    {label}
                  </Typography>
                  <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
                    {value}
                  </Typography>
                </Box>
              ))}
              {distanceKm && (
                <Typography variant="body2" color="text.secondary">
                  Distance from service centre: <strong>{distanceKm} km</strong>
                </Typography>
              )}
              {servicePricing && parseFloat(distanceKm) > 0 && (
                <Box
                  sx={{
                    p: 1.5,
                    backgroundColor: "#f0fff4",
                    borderRadius: 2,
                    border: "1px solid #22c55e",
                    color: "#16a34a",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                  }}
                >
                  🏠 Doorstep Demo Charges: {servicePricing.currency}
                  {servicePricing.price}
                  <br />
                  🏢 From: {nearestBranch?.name || "Nearest Branch"} (
                  {servicePricing.range})
                </Box>
              )}
            </Stack>
          </DialogContent>
          <Divider />
          <DialogActions sx={{ p: 2, gap: 1 }}>
            <button
              className="tr-redesign__dialog-btn tr-redesign__dialog-btn--outline"
              onClick={() => setConfirmDialogOpen(false)}
            >
              ✏️ Edit Details
            </button>
            <button
              className="tr-redesign__dialog-btn tr-redesign__dialog-btn--confirm"
              onClick={handleConfirmBooking}
            >
              🎉 Confirm Demo!
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </LocalizationProvider>
  );
};

export default TestRide;
