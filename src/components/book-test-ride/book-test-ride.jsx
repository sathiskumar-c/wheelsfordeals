import React, { useState, useRef, useEffect } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  Stack,
  CircularProgress,
  Paper,
  InputBase,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import PlaceIcon from "@mui/icons-material/Place";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import dayjs from "dayjs";
import timeSlotData from "../../data/time-slot-availability.json";
import "./book-test-ride.scss";

// Google Maps API Key from environment variables
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Service configuration
const SERVICE_CONFIG = {
  freeServiceDistance: 0, // km - No free service (changed from 5)
  maxDistance: 10, // km - Maximum service distance
  apiTimeout: 10000, // ms - API request timeout
  searchDebounceTime: 300, // ms - Search input debounce
  // Distance-based pricing structure - No free service, minimum ₹49
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

// Example: Bangalore
const bikeBaseLocation = {
  latitude: 11.443487,
  longitude: 77.707368,
  address: "Rajam Theater",
};

// Function to calculate price based on distance
const calculateServicePrice = (distanceKm) => {
  if (!distanceKm || distanceKm <= 0) return null;

  const distance = parseFloat(distanceKm);

  if (distance <= 1) {
    return SERVICE_CONFIG.pricing["0-1"];
  } else if (distance <= 2) {
    return SERVICE_CONFIG.pricing["1-2"];
  } else if (distance <= 3) {
    return SERVICE_CONFIG.pricing["2-3"];
  } else if (distance <= 4) {
    return SERVICE_CONFIG.pricing["3-4"];
  } else if (distance <= 5) {
    return SERVICE_CONFIG.pricing["4-5"];
  } else if (distance <= 6) {
    return SERVICE_CONFIG.pricing["5-6"];
  } else if (distance <= 7) {
    return SERVICE_CONFIG.pricing["6-7"];
  } else if (distance <= 8) {
    return SERVICE_CONFIG.pricing["7-8"];
  } else if (distance <= 9) {
    return SERVICE_CONFIG.pricing["8-9"];
  } else if (distance <= 10) {
    return SERVICE_CONFIG.pricing["9-10"];
  }

  return null; // Beyond service area
};

const TestDriveBookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    date: null,
    time: "",
    location: "",
    agree: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [locationLoading, setLocationLoading] = useState(false);

  const [distanceKm, setDistanceKm] = useState(null);
  const [serviceMessage, setServiceMessage] = useState("");
  const [servicePricing, setServicePricing] = useState(null);
  const [nearestBranch, setNearestBranch] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);
  const autocompleteService = useRef(null);
  const placesService = useRef(null);

  // Time slot availability state
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [timeSlotsLoading, setTimeSlotsLoading] = useState(false);

  // Dialog state for confirmation
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  // Responsive dialog
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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

  // Effect to fetch time slots when date and location change
  useEffect(() => {
    console.log("Date/Location effect triggered:", {
      date: formData.date,
      location: formData.location,
    });

    if (formData.date) {
      if (formData.location) {
        console.log(
          "Both date and location available, fetching customized time slots"
        );
        fetchAvailableTimeSlots(formData.date, formData.location);
      } else {
        console.log(
          "Date available but no location, showing generic time slots"
        );
        // Show generic time slots based on date only (without location-specific filtering)
        fetchAvailableTimeSlots(formData.date, "generic");
      }
    } else {
      console.log("No date selected, clearing time slots");
      setAvailableTimeSlots([]);
    }
  }, [formData.date, formData.location]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let newValue = value;

    if (name === "mobile") {
      newValue = newValue.replace(/\D/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : newValue,
    }));
    setFormErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  // Function to determine the nearest branch based on location
  const getNearestBranch = (userLat, userLng) => {
    let nearestBranch = null;
    let minDistance = Infinity;

    Object.entries(timeSlotData.branches).forEach(([branchId, branch]) => {
      const distance = calculateDistanceInKm(
        userLat,
        userLng,
        branch.coordinates.latitude,
        branch.coordinates.longitude
      );

      if (distance < minDistance && distance <= branch.serviceRadius) {
        minDistance = distance;
        nearestBranch = { id: branchId, ...branch, distance };
      }
    });

    return nearestBranch;
  };

  // Function to get available time slots from JSON data
  const getAvailableTimeSlotsFromData = (selectedDate, branchId) => {
    try {
      const dateStr = dayjs(selectedDate).format("YYYY-MM-DD");
      const dayOfWeek = dayjs(selectedDate).day(); // 0 = Sunday, 6 = Saturday
      const today = dayjs();
      const isToday = dayjs(selectedDate).isSame(today, "day");
      const currentHour = dayjs().hour();

      console.log("Getting slots for date:", dateStr, "branch:", branchId);

      // Validate timeSlotData exists
      if (!timeSlotData || !timeSlotData.branches) {
        console.error("timeSlotData not available");
        return [];
      }

      // Check if it's a holiday
      const branch = timeSlotData.branches[branchId];
      if (!branch) {
        console.error("Branch not found:", branchId);
        return [];
      }

      if (branch?.holidays?.includes(dateStr)) {
        console.log("Holiday detected for", dateStr);
        return [];
      }

      // Check if branch operates on this day
      if (!branch?.workingDays?.includes(dayOfWeek)) {
        console.log("Branch closed on this day of week:", dayOfWeek);
        return [];
      }

      // Get base time slots for the branch
      let availableSlots = [
        ...(branch?.timeSlots ||
          timeSlotData.defaultAvailability.weekdays.slots),
      ];

      // Apply weekend restrictions if needed
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        availableSlots = timeSlotData.defaultAvailability.weekends.slots;
      }

      // Remove past slots if it's today
      if (isToday) {
        availableSlots = availableSlots.filter((slot) => {
          const slotHour = parseInt(slot.split(":")[0]);
          const isPM = slot.includes("PM");
          let adjustedHour = slotHour;
          if (isPM && slotHour !== 12) {
            adjustedHour = slotHour + 12;
          } else if (!isPM && slotHour === 12) {
            adjustedHour = 0;
          }
          return adjustedHour > currentHour;
        });
      }

      // Remove occupied slots for this specific date and branch
      const bookingData = timeSlotData.bookings?.[dateStr];
      if (bookingData && bookingData[branchId]) {
        const occupiedSlots = bookingData[branchId].occupiedSlots || [];
        availableSlots = availableSlots.filter(
          (slot) => !occupiedSlots.includes(slot)
        );

        console.log("Occupied slots for", dateStr, ":", occupiedSlots);
        console.log("Available slots after filtering:", availableSlots);
      }

      return availableSlots;
    } catch (error) {
      console.error("Error in getAvailableTimeSlotsFromData:", error);
      return [];
    }
  };

  // Function to fetch available time slots based on date and location
  const fetchAvailableTimeSlots = async (selectedDate, location) => {
    console.log("fetchAvailableTimeSlots called with:", {
      selectedDate,
      location,
    });

    if (!selectedDate) {
      console.log("Missing date, skipping fetch");
      setAvailableTimeSlots([]);
      return;
    }

    setTimeSlotsLoading(true);
    console.log("Loading time slots...");

    try {
      // Add a small delay to simulate API call and make loading visible
      await new Promise((resolve) => setTimeout(resolve, 500));

      let availableSlots = [];

      if (location && location !== "generic" && coordinates) {
        // Real location provided - find nearest branch and get specific availability
        const nearestBranch = getNearestBranch(
          coordinates.latitude,
          coordinates.longitude
        );

        if (nearestBranch) {
          console.log(
            "Found nearest branch:",
            nearestBranch.name,
            "Distance:",
            nearestBranch.distance
          );
          setNearestBranch(nearestBranch);
          availableSlots = getAvailableTimeSlotsFromData(
            selectedDate,
            nearestBranch.id
          );

          // Update service message based on branch availability with pricing
          const priceInfo = calculateServicePrice(
            nearestBranch.distance.toFixed(2)
          );

          if (
            nearestBranch.distance <= nearestBranch.serviceRadius &&
            priceInfo
          ) {
            setServiceMessage(
              `🏠 Doorstep demo from ${nearestBranch.name} - ${priceInfo.currency}${priceInfo.price} (${priceInfo.range}) - We bring it to you!`
            );
          }
        } else {
          console.log("No branch found within service radius");
          setNearestBranch(null);
          setServiceMessage(
            "❌ Sorry, doorstep demo service not available at your location. Please visit our nearest showroom."
          );
          availableSlots = [];
        }
      } else {
        // Generic case - use default availability (date-based filtering only)
        console.log("Using generic availability");
        setNearestBranch(null);
        const dateObj = dayjs(selectedDate);
        const dayOfWeek = dateObj.day();
        const today = dayjs();
        const isToday = dateObj.isSame(today, "day");
        const currentHour = dayjs().hour();

        // Use default slots based on weekday/weekend
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          availableSlots = [...timeSlotData.defaultAvailability.weekends.slots];
        } else {
          availableSlots = [...timeSlotData.defaultAvailability.weekdays.slots];
        }

        // Remove past slots if it's today
        if (isToday) {
          availableSlots = availableSlots.filter((slot) => {
            const slotHour = parseInt(slot.split(":")[0]);
            const isPM = slot.includes("PM");
            let adjustedHour = slotHour;
            if (isPM && slotHour !== 12) {
              adjustedHour = slotHour + 12;
            } else if (!isPM && slotHour === 12) {
              adjustedHour = 0;
            }
            return adjustedHour > currentHour;
          });
        }
      }

      console.log("Final available slots:", availableSlots);
      setAvailableTimeSlots(availableSlots);

      // Clear selected time if it's no longer available
      if (formData.time && !availableSlots.includes(formData.time)) {
        console.log("Clearing selected time as it's no longer available");
        setFormData((prev) => ({ ...prev, time: "" }));
      }
    } catch (error) {
      console.error("Error fetching time slots:", error);
      setAvailableTimeSlots(timeSlotData.defaultAvailability.weekdays.slots); // Fallback to default slots
    } finally {
      setTimeSlotsLoading(false);
      console.log("Time slots loading completed");
    }
  };

  const handleDateChange = (newDate) => {
    console.log("Date changed to:", newDate);

    setFormData((prev) => ({
      ...prev,
      date: newDate,
      time: "", // Reset time when date changes
    }));
    setFormErrors((prev) => ({
      ...prev,
      date: undefined,
      time: undefined,
    }));

    // useEffect will handle fetching time slots when date changes
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "👤 Tell us your name!";
    if (!formData.mobile.trim()) {
      errors.mobile = "📱 We need your mobile number!";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      errors.mobile =
        "📱 Enter a valid Indian mobile number (10 digits starting with 6-9)";
    }

    // Enhanced date validation
    if (!formData.date) {
      errors.date = "📅 When would you like your demo?";
    } else {
      const selectedDate = dayjs(formData.date);
      const today = dayjs().startOf("day");
      const maxDate = dayjs().add(30, "day");

      if (selectedDate.isBefore(today)) {
        errors.date = "⏰ Please select a future date for your demo ride";
      } else if (selectedDate.isAfter(maxDate)) {
        errors.date = "📆 Please select a date within the next 30 days";
      }
    }

    // Enhanced time validation
    if (!formData.time) {
      if (!formData.date) {
        errors.time = "📅 Choose your preferred date first!";
      } else if (availableTimeSlots.length === 0) {
        errors.time = "😔 No time slots available for this date";
      } else {
        errors.time = "⏰ Pick your perfect time slot!";
      }
    } else if (
      formData.date &&
      availableTimeSlots.length > 0 &&
      !availableTimeSlots.includes(formData.time)
    ) {
      errors.time = "❌ This time slot is no longer available";
    }

    if (!formData.location.trim())
      errors.location = "📍 Where should we bring your demo bike?";
    if (!formData.agree)
      errors.agree = "🤝 Please agree to be contacted for your demo!";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    // Check if location is too far for test ride
    if (distanceKm && parseFloat(distanceKm) > SERVICE_CONFIG.maxDistance) {
      setFormErrors((prev) => ({
        ...prev,
        location: `Sorry, test ride service is not available at your location. Maximum distance is ${SERVICE_CONFIG.maxDistance}km.`,
      }));
      return;
    }

    // Open confirmation dialog instead of submitting directly
    setConfirmDialogOpen(true);
  };

  // Handle final booking confirmation
  const handleConfirmBooking = () => {
    const formSubmissionData = {
      ...formData,
      date: formData.date ? formData.date.format("YYYY-MM-DD") : "",
      distanceFromService: distanceKm,
      serviceAvailable: distanceKm ? parseFloat(distanceKm) <= 10 : null,
    };

    console.log("Form submitted:", formSubmissionData);

    // Here you would typically send the data to your backend
    // Example: await submitTestRideBooking(formSubmissionData);

    // Close dialog after successful submission
    setConfirmDialogOpen(false);

    // Reset form
    setFormData({
      name: "",
      mobile: "",
      date: null,
      time: "",
      location: "",
      agree: false,
    });
    setFormErrors({});
  };

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistanceInKm = (lat1, lon1, lat2, lon2) => {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Get user's current location using HTML5 Geolocation API
  const getCurrentLocation = () => {
    setLocationLoading(true);

    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setFormErrors((prev) => ({
        ...prev,
        location:
          "Geolocation is not supported by your browser. Please enter location manually.",
      }));
      setLocationLoading(false);
      return;
    }

    // Get current position with high accuracy
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;

        // Store coordinates for debugging
        setCoordinates({ latitude, longitude, accuracy });

        console.log("📍 GPS Coordinates:", {
          latitude,
          longitude,
          accuracy: `${accuracy} meters`,
        });

        try {
          // Use OpenStreetMap Nominatim API for reverse geocoding
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          console.log("🗺️ Nominatim Response:", response.data);

          const userAddress = response.data.display_name;

          // Calculate distance from bike base location
          const dist = calculateDistanceInKm(
            latitude,
            longitude,
            bikeBaseLocation.latitude,
            bikeBaseLocation.longitude
          );

          setDistanceKm(dist.toFixed(2));

          // Calculate pricing based on distance
          const priceInfo = calculateServicePrice(dist.toFixed(2));
          setServicePricing(priceInfo);

          // Set service availability message based on distance with pricing
          if (dist <= SERVICE_CONFIG.maxDistance && priceInfo) {
            setServiceMessage(
              `🏠 Doorstep demo available! Charges: ${priceInfo.currency}${priceInfo.price} (${priceInfo.range}) - We come to you!`
            );
          } else {
            setServiceMessage(
              "❌ Sorry, doorstep demo not available at your location (beyond 10km radius)."
            );
          }

          // Update form data with the fetched address
          setFormData((prev) => ({
            ...prev,
            location: userAddress,
          }));

          // useEffect will handle fetching time slots when location changes

          // Clear any location errors
          setFormErrors((prev) => ({
            ...prev,
            location: undefined,
          }));
        } catch (error) {
          console.error("Error fetching address:", error);
          setFormErrors((prev) => ({
            ...prev,
            location:
              "Failed to fetch address. Please enter location manually.",
          }));
        } finally {
          setLocationLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        let errorMessage = "Location access denied.";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location access denied. Please enable location permissions.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
          default:
            errorMessage = "An unknown error occurred while fetching location.";
            break;
        }

        setFormErrors((prev) => ({
          ...prev,
          location: errorMessage,
        }));
        setLocationLoading(false);
      },
      // Geolocation options for better accuracy
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 300000, // 5 minutes cache
      }
    );
  };

  // Google Places Search (triggered by search button click)
  const handleSearchClick = () => {
    const query = searchQuery.trim();

    if (query.length > 2 && autocompleteService.current) {
      autocompleteService.current.getPlacePredictions(
        {
          input: query,
          componentRestrictions: { country: "in" }, // Restrict to India
        },
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
        }
      );
    }
  };

  // Handle search input change (just update state, no API call)
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    // Hide suggestions when user is typing
    setShowSuggestions(false);
  };

  // Handle place selection from suggestions
  const handlePlaceSelect = (placeId, description) => {
    if (placesService.current) {
      placesService.current.getDetails(
        {
          placeId: placeId,
          fields: ["geometry", "formatted_address", "name"],
        },
        (place, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            place
          ) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();

            // Calculate distance from bike base location
            const dist = calculateDistanceInKm(
              lat,
              lng,
              bikeBaseLocation.latitude,
              bikeBaseLocation.longitude
            );

            setDistanceKm(dist.toFixed(2));
            setCoordinates({
              latitude: lat,
              longitude: lng,
              accuracy: "exact",
            });

            // Calculate pricing based on distance
            const priceInfo = calculateServicePrice(dist.toFixed(2));
            setServicePricing(priceInfo);

            // Set service availability message based on distance with pricing
            if (dist <= SERVICE_CONFIG.maxDistance && priceInfo) {
              setServiceMessage(
                `🏠 Doorstep demo available! Charges: ${priceInfo.currency}${priceInfo.price} (${priceInfo.range}) - We come to you!`
              );
            } else {
              setServiceMessage(
                "❌ Sorry, doorstep demo not available at your location (beyond 10km radius)."
              );
            }

            // Update form data with selected place
            setFormData((prev) => ({
              ...prev,
              location: place.formatted_address || description,
            }));

            // useEffect will handle fetching time slots when location changes

            setSearchQuery("");
            setShowSuggestions(false);

            // Clear any location errors
            setFormErrors((prev) => ({
              ...prev,
              location: undefined,
            }));
          }
        }
      );
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box className="booking-container">
        <Typography variant="h5" className="title" gutterBottom>
          🏍️ Book Your Doorstep Demo
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 3, color: "text.secondary", textAlign: "center" }}
        >
          We bring your dream bike to you!
        </Typography>
        <form onSubmit={handleSubmit} className="booking-form" noValidate>
          <Stack spacing={1.5}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              error={!!formErrors.name}
              helperText={formErrors.name}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  },
                  "&.Mui-focused": {
                    boxShadow: "0 2px 12px rgba(25, 118, 210, 0.2)",
                  },
                },
              }}
            />
            <TextField
              label="Mobile Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              fullWidth
              type="tel"
              inputProps={{
                maxLength: 10,
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              error={!!formErrors.mobile}
              helperText={formErrors.mobile}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  },
                  "&.Mui-focused": {
                    boxShadow: "0 2px 12px rgba(25, 118, 210, 0.2)",
                  },
                },
              }}
            />
            <Box
              onClick={(e) => {
                // Find the calendar button and click it, but only if clicking on the field itself, not the input
                if (e.target.closest(".MuiOutlinedInput-input")) {
                  return; // Allow typing in the input
                }
                const calendarButton = e.currentTarget.querySelector(
                  '[data-testid="CalendarIcon"], .MuiIconButton-root'
                );
                if (
                  calendarButton &&
                  !e.target.closest(".MuiIconButton-root")
                ) {
                  calendarButton.click();
                }
              }}
              sx={{ cursor: "pointer", m: 0 }}
            >
              <DatePicker
                label="Preferred Date"
                value={formData.date}
                onChange={handleDateChange}
                minDate={dayjs()}
                maxDate={dayjs().add(1, "year")}
                openTo="day"
                views={["year", "month", "day"]}
                loading={timeSlotsLoading}
                shouldDisableDate={(date) => {
                  // Allow calendar navigation for 1 year, but only enable selection for next 30 days
                  return (
                    date.isBefore(dayjs(), "day") ||
                    date.isAfter(dayjs().add(30, "day"), "day")
                  );
                }}
                slotProps={{
                  calendarHeader: {
                    sx: {
                      "& .MuiPickersCalendarHeader-label": {
                        cursor: "pointer",
                      },
                    },
                  },
                  textField: {
                    fullWidth: true,
                    error: !!formErrors.date,
                    helperText: formErrors.date,
                    required: true,
                    sx: {
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        },
                        "&.Mui-focused": {
                          boxShadow: "0 2px 12px rgba(25, 118, 210, 0.2)",
                        },
                      },
                      "& .MuiOutlinedInput-input": {
                        cursor: "text",
                      },
                    },
                  },
                  openPickerButton: {
                    sx: {
                      color: "primary.main",
                    },
                  },
                }}
              />
            </Box>
            <TextField
              select
              label="Preferred Time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              fullWidth
              error={!!formErrors.time}
              helperText={
                !formData.date
                  ? "📅 Pick a date first to see available slots!"
                  : timeSlotsLoading
                  ? "⏳ Finding perfect slots for you..."
                  : !formData.location && formData.date
                  ? "📍 Add location for personalized time slots!"
                  : formErrors.time ||
                    (availableTimeSlots.length === 0 && formData.date
                      ? "😔 No slots available for this date"
                      : undefined)
              }
              disabled={!formData.date || timeSlotsLoading}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  },
                  "&.Mui-focused": {
                    boxShadow: "0 2px 12px rgba(25, 118, 210, 0.2)",
                  },
                },
              }}
            >
              {availableTimeSlots.map((slot) => (
                <MenuItem key={slot} value={slot}>
                  {slot}
                </MenuItem>
              ))}
            </TextField>

            {/* Location Section with Google Maps Search */}
            <Box className="mt-2">
              {/* Google Maps Style Search Input */}
              <Box sx={{ position: "relative", mb: 2 }}>
                <Paper
                  component="form"
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    border: formErrors.location
                      ? "1px solid red"
                      : "1px solid #ccc",
                    borderRadius: 2,
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    },
                    "&:focus-within": {
                      boxShadow: "0 2px 12px rgba(25, 118, 210, 0.2)",
                      borderColor: "#1976d2",
                    },
                  }}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <IconButton sx={{ p: "10px" }}>
                    <PlaceIcon />
                  </IconButton>
                  <InputBase
                    ref={searchInputRef}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="🏠 Your address - We come to you!"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    inputProps={{ "aria-label": "search location" }}
                  />
                  <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    onClick={handleSearchClick}
                    title="Search locations"
                  >
                    <SearchIcon />
                  </IconButton>
                  <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                  <IconButton
                    color="primary"
                    sx={{ p: "10px" }}
                    onClick={getCurrentLocation}
                    disabled={locationLoading}
                    title="Use current location"
                  >
                    {locationLoading ? (
                      <CircularProgress size={20} />
                    ) : (
                      <MyLocationIcon />
                    )}
                  </IconButton>
                </Paper>

                {/* Search Suggestions Dropdown */}
                {showSuggestions && searchSuggestions.length > 0 && (
                  <Paper
                    sx={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      zIndex: 1000,
                      maxHeight: 200,
                      overflowY: "auto",
                      mt: 0.5,
                    }}
                  >
                    {searchSuggestions.map((prediction) => (
                      <Box
                        key={prediction.place_id}
                        sx={{
                          p: 2,
                          cursor: "pointer",
                          "&:hover": { backgroundColor: "#f5f5f5" },
                          borderBottom: "1px solid #eee",
                        }}
                        onClick={() =>
                          handlePlaceSelect(
                            prediction.place_id,
                            prediction.description
                          )
                        }
                      >
                        <Typography variant="body2">
                          <PlaceIcon
                            sx={{
                              fontSize: 16,
                              mr: 1,
                              verticalAlign: "middle",
                            }}
                          />
                          {prediction.description}
                        </Typography>
                      </Box>
                    ))}
                  </Paper>
                )}
              </Box>

              {formData.location && (
                <>
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, fontStyle: "italic", color: "green" }}
                  >
                    📍 {formData.location}
                  </Typography>

                  {/* Debug info */}
                  {/* {coordinates && (
                    <Typography
                      variant="caption"
                      sx={{ display: "block", mt: 1, color: "gray" }}
                    >
                      🔍 Debug: Lat: {coordinates.latitude.toFixed(6)}, Lng:{" "}
                      {coordinates.longitude.toFixed(6)}, Accuracy:{" "}
                      {coordinates.accuracy}m
                    </Typography>
                  )} */}

                  {distanceKm && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Distance from service center:{" "}
                      <strong>{distanceKm} km</strong>
                    </Typography>
                  )}

                  {servicePricing && distanceKm > 0 && (
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        p: 1.5,
                        backgroundColor: "#f0fff4",
                        borderRadius: 2,
                        border: "1px solid #22c55e",
                        color: "#16a34a",
                        boxShadow: "0 2px 8px rgba(34, 197, 94, 0.1)",
                        fontSize: "0.95rem",
                        fontWeight: 500,
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                          boxShadow: "0 4px 12px rgba(34, 197, 94, 0.15)",
                          transform: "translateY(-1px)",
                        },
                      }}
                    >
                      🏠{" "}
                      <strong>
                        Doorstep Demo Charges: {servicePricing.currency}
                        {servicePricing.price}
                      </strong>
                      <br />
                      🏢 From: {nearestBranch?.name || "Nearest Branch"} (
                      {servicePricing.range})
                    </Typography>
                  )}
                </>
              )}

              {formErrors.location && (
                <Typography
                  color="error"
                  variant="caption"
                  sx={{ display: "block", mt: 1 }}
                >
                  {formErrors.location}
                </Typography>
              )}
            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  required
                />
              }
              label="🤝 I agree to be contacted for my demo"
              className="m-0"
            />
            {formErrors.agree && (
              <Typography color="error" variant="caption">
                {formErrors.agree}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              className="submit-button"
              sx={{
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: "bold",
                boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
                background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0 6px 16px rgba(25, 118, 210, 0.4)",
                  transform: "translateY(-2px)",
                  background:
                    "linear-gradient(45deg, #1565c0 30%, #1976d2 90%)",
                },
              }}
            >
              🚀 Book Demo Now!
            </Button>
          </Stack>
        </form>

        {/* Confirmation Dialog */}
        <Dialog
          open={confirmDialogOpen}
          onClose={() => setConfirmDialogOpen(false)}
          fullScreen={isMobile}
          maxWidth="sm"
          fullWidth
          sx={{
            "& .MuiDialog-paper": {
              borderRadius: 2,
            },
          }}
        >
          <DialogTitle>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                👀 Review Your Demo Details
              </Typography>
              <IconButton
                aria-label="close"
                onClick={() => setConfirmDialogOpen(false)}
                sx={{ color: "grey.500" }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          {/* <Divider /> */}
          <DialogContent dividers>
            <Box sx={{ py: 1 }}>
              {/* <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "primary.main", mb: 2 }}
              >
                Booking Details
              </Typography> */}

              <Stack spacing={2}>
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", color: "text.secondary" }}
                  >
                    Name
                  </Typography>
                  <Typography variant="body1">{formData.name}</Typography>
                </Box>

                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", color: "text.secondary" }}
                  >
                    Mobile Number
                  </Typography>
                  <Typography variant="body1">{formData.mobile}</Typography>
                </Box>

                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", color: "text.secondary" }}
                  >
                    Preferred Date
                  </Typography>
                  <Typography variant="body1">
                    {formData.date
                      ? formData.date.format("DD MMMM YYYY")
                      : "Not selected"}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", color: "text.secondary" }}
                  >
                    Preferred Time
                  </Typography>
                  <Typography variant="body1">{formData.time}</Typography>
                </Box>

                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", color: "text.secondary" }}
                  >
                    Your Location
                  </Typography>
                  <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
                    {formData.location}
                  </Typography>
                  {distanceKm && (
                    <Typography
                      variant="body2"
                      sx={{ mt: 0.5, color: "text.secondary" }}
                    >
                      Distance from service center:{" "}
                      <strong>{distanceKm} km</strong>
                    </Typography>
                  )}

                  {servicePricing && distanceKm > 0 && (
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 0.5,
                        p: 1.5,
                        backgroundColor: "#f0fff4",
                        borderRadius: 2,
                        border: "1px solid #22c55e",
                        color: "#16a34a",
                        fontWeight: "bold",
                        boxShadow: "0 2px 8px rgba(34, 197, 94, 0.1)",
                        fontSize: "0.95rem",
                      }}
                    >
                      🏠 Doorstep Demo Charges: {servicePricing.currency}
                      {servicePricing.price}
                      <br />
                      🏢 From: {nearestBranch?.name || "Nearest Branch"} (
                      {servicePricing.range})
                    </Typography>
                  )}

                  {serviceMessage && (
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 0.5,
                        color: distanceKm <= 10 ? "success.main" : "error.main",
                        fontWeight: "bold",
                      }}
                    >
                      {/* {servicePricing ? "✅ Doorstep demo service confirmed!" : serviceMessage} */}
                    </Typography>
                  )}
                </Box>
              </Stack>
            </Box>
          </DialogContent>
          <Divider />
          <DialogActions sx={{ p: 2, gap: 1 }}>
            <Button
              onClick={() => setConfirmDialogOpen(false)}
              variant="outlined"
              fullWidth={isMobile}
              // style={{ borderRadius: "0px" }}
            >
              ✏️ Edit Details
            </Button>
            <Button
              onClick={handleConfirmBooking}
              variant="contained"
              fullWidth={isMobile}
              sx={{ minWidth: isMobile ? "auto" : "120px" }}
              // style={{ borderRadius: "0px" }}
            >
              🎉 Confirm Demo!
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default TestDriveBookingForm;
