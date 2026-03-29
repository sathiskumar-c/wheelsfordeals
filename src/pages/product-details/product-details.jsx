// React
import React, { useState } from "react";
import { Link } from "react-router-dom";

// MUI Components
import { Tooltip, IconButton, Chip } from "@mui/material";

// MUI Icons
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import VideocamIcon from "@mui/icons-material/Videocam";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PaletteIcon from "@mui/icons-material/Palette";
import BusinessIcon from "@mui/icons-material/Business";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import SecurityIcon from "@mui/icons-material/Security";
import SportsMotorsportsIcon from "@mui/icons-material/SportsMotorsports";
import SpeedIcon from "@mui/icons-material/Speed";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import VerifiedIcon from "@mui/icons-material/Verified";
import ShieldIcon from "@mui/icons-material/Shield";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";

// Styles
import "./product-details.scss";

// ── Static mock data (same shape as product-details.jsx) ──────────────────────
const bikeData = {
  bike_id: "HON4237-NT1942",
  brand: "Honda",
  model: "CBR150R",
  year_of_model: 2024,
  registration_year: 2024,
  posted_date: "2024-11-27",
  price: {
    original_price: 363399.0,
    discount_percent: 5,
  },
  bike_condition: "Good",
  km_driven: 38666,
  owner_count: "1st Owner",
  location: "Bangalore",
  color: "Matte Black",
  images: [
    {
      url: "https://static.toiimg.com/photo/80452572.cms?imgsize=156776",
      alt: "Front view of Honda CBR150R",
      title: "Front View",
    },
    {
      url: "https://images.overdrive.in/wp-content/odgallery/2022/08/63809_2022_Royal_Enfield_Hunter_350_468x263.jpg",
      alt: "Side profile of Honda CBR150R",
      title: "Side View",
    },
    {
      url: "https://cdn.bikedekho.com/processedimages/kawasaki/kawasaki-ninja-zx-10r/source/kawasaki-ninja-zx-10r674008194e755.jpg",
      alt: "Rear view of Honda CBR150R",
      title: "Rear View",
    },
    {
      url: "https://beepkart.com/images/blogs/fastest-bikes.webp",
      alt: "Close-up of odometer showing 38666 km",
      title: "Odometer Reading",
    },
  ],
  engine_and_performance: {
    engine_cc: 403.1,
    max_torque: "32.1 Nm @ 7917 rpm",
    top_speed_kmph: 152,
    mileage_kmpl: 32,
    transmission_type: "Manual",
    gear_count: 5,
    fuel_type: "Petrol",
    fuel_tank_capacity_litres: 13.7,
    emission_standard: "BS4",
  },
  brakes: {
    brake_type: { front: "Disc", rear: "Disc" },
    abs: false,
  },
  tyre_condition: "Good",
  body_type: "Commuter",
  documents: {
    rc_available: true,
    insurance: { is_valid: false, validity_period: "Expired" },
    accident_history: false,
    service_history: true,
  },
  rto: {
    rg_number: "CO43 65 NT 1942",
    location_code: "CO43",
  },
  seller_type: "Dealer",
  test_ride: { availability: false, range_km: "0" },
  exchange: { availability: true, condition: "Based on vehicle" },
  accessories_included: ["Guards", "Mirrors", "Tank Bag", "Gloves"],
  hold: {
    is_held: false,
    held_by_user_id: "user_93797",
    hold_start_time: "2025-05-16T18:58:50.980431Z",
    hold_expiry_time: "2025-05-17T18:58:50.980431Z",
  },
  selling_status: "available",
  dealer_details: {
    name: "Rapid Motors",
    dealer_id: "dealer_002",
  },
  offers: ["service_package", "insurance"],
  slug: { brand: "honda", model: "cbr150r" },
  key_points: ["Less Driven", "Most popular", "High Quality"],
  emi_and_payments: {
    emi: {
      is_emi_available: true,
      intrest_rate_percent: 12,
      emi_type: "flat",
      min_duration_months: 12,
      max_duration_months: 48,
      default_duration_months: 24,
      loan_tenure_options_months: [12, 18, 24, 36, 48],
      max_loan_percent_of_price: 80,
      processing_fee_percent: 1,
      gst_applicable: true,
      pre_closure: { allowed: true, charge_percent: 2.5 },
      approval_required: true,
      requires_kyc: true,
    },
    payments: {
      is_downpayment_required: true,
      downpayment_percent_min: 10,
      allow_custom_downpayment: true,
    },
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const formatINR = (amount) => Number(amount).toLocaleString("en-IN");

// ── Component ─────────────────────────────────────────────────────────────────
const ProductDetails = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const currentUrl = encodeURIComponent(window.location.href);

  const shareOptions = [
    {
      name: copied ? "Copied!" : "Copy",
      icon: <ContentCopyIcon fontSize="small" />,
      onClick: handleCopy,
    },
    {
      name: "WhatsApp",
      icon: <WhatsAppIcon fontSize="small" />,
      url: `https://wa.me/?text=${currentUrl}`,
    },
    {
      name: "Messenger",
      icon: <FacebookIcon fontSize="small" />,
      url: `https://www.facebook.com/dialog/send?link=${currentUrl}&app_id=YOUR_APP_ID&redirect_uri=${currentUrl}`,
    },
    {
      name: "Telegram",
      icon: <TelegramIcon />,
      url: `https://t.me/share/url?url=${currentUrl}&text=Check this out!`,
    },
    {
      name: "Twitter/X",
      icon: <XIcon fontSize="small" />,
      url: `https://twitter.com/intent/tweet?url=${currentUrl}`,
    },
    {
      name: "Instagram",
      icon: <InstagramIcon fontSize="small" />,
      onClick: () => {
        navigator.clipboard.writeText(window.location.href);
        window.open("https://www.instagram.com/", "_blank");
      },
    },
  ];

  const discountedPrice = Math.round(
    bikeData.price.original_price * (1 - bikeData.price.discount_percent / 100),
  );

  const { engine_and_performance: eng, brakes } = bikeData;

  return (
    <div className="pd-redesign">
      <div className="pd-redesign__container">
        {/* ── Breadcrumb ──────────────────────────────────────────── */}
        <nav className="pd-redesign__breadcrumb" aria-label="breadcrumb">
          <span>Marketplace</span>
          <span className="breadcrumb-sep">
            <ChevronRightIcon fontSize="small" />
          </span>
          <span>Premium Bikes</span>
          <span className="breadcrumb-sep">
            <ChevronRightIcon fontSize="small" />
          </span>
          <span className="pd-redesign__breadcrumb-active">
            Listing Details
          </span>
        </nav>

        {/* ── Main Layout Grid ─────────────────────────────────────── */}
        <div className="pd-redesign__layout">
          {/* ═══════════════════════════════════════════════════════════
              LEFT — Main Content
          ═══════════════════════════════════════════════════════════ */}
          <div className="pd-redesign__main">
            {/* Hero Image */}
            <div className="pd-redesign__hero">
              <img src={bikeData.images[0].url} alt={bikeData.images[0].alt} />
              <div className="pd-redesign__hero-overlay">
                <button className="pd-redesign__hero-btn" type="button">
                  <PhotoLibraryIcon />
                  {bikeData.images.length} Photos
                </button>
                <button className="pd-redesign__hero-btn" type="button">
                  <VideocamIcon />
                  Walkaround
                </button>
              </div>
            </div>

            {/* ── Spec Sections ── */}
            <div>
              {/* General Overview */}
              <section aria-labelledby="general-overview-title">
                <h2
                  id="general-overview-title"
                  className="pd-redesign__section-title"
                >
                  <span
                    className="pd-redesign__section-title-bar"
                    aria-hidden="true"
                  />
                  General Overview
                </h2>
                <div className="pd-redesign__overview-grid">
                  <div className="pd-redesign__overview-card">
                    <span className="ov-icon">
                      <BusinessIcon />
                    </span>
                    <p className="ov-label">Brand</p>
                    <p className="ov-value">{bikeData.brand}</p>
                  </div>
                  <div className="pd-redesign__overview-card">
                    <span className="ov-icon">
                      <TwoWheelerIcon />
                    </span>
                    <p className="ov-label">Model</p>
                    <p className="ov-value">{bikeData.model}</p>
                  </div>
                  <div className="pd-redesign__overview-card">
                    <span className="ov-icon">
                      <CalendarTodayIcon />
                    </span>
                    <p className="ov-label">Year</p>
                    <p className="ov-value">{bikeData.year_of_model}</p>
                  </div>
                  <div className="pd-redesign__overview-card">
                    <span className="ov-icon">
                      <PaletteIcon />
                    </span>
                    <p className="ov-label">Color</p>
                    <p className="ov-value">{bikeData.color}</p>
                  </div>
                </div>
              </section>

              {/* Performance & Engineering */}
              <section
                aria-labelledby="perf-title"
                style={{ marginTop: "2.5rem" }}
              >
                <h2 id="perf-title" className="pd-redesign__section-title">
                  <span
                    className="pd-redesign__section-title-bar"
                    aria-hidden="true"
                  />
                  Performance &amp; Engineering
                </h2>
                <div className="pd-redesign__perf-grid">
                  <div className="pd-redesign__perf-card">
                    <div className="pd-redesign__perf-card-icon">
                      <SettingsInputComponentIcon />
                    </div>
                    <div>
                      <p className="pd-redesign__perf-card-label">Engine</p>
                      <p className="pd-redesign__perf-card-value">
                        {eng.engine_cc}cc&nbsp;{eng.emission_standard}
                      </p>
                    </div>
                  </div>

                  <div className="pd-redesign__perf-card">
                    <div className="pd-redesign__perf-card-icon">
                      <SettingsIcon />
                    </div>
                    <div>
                      <p className="pd-redesign__perf-card-label">
                        Transmission
                      </p>
                      <p className="pd-redesign__perf-card-value">
                        {eng.gear_count}-Speed {eng.transmission_type}
                      </p>
                    </div>
                  </div>

                  <div className="pd-redesign__perf-card">
                    <div className="pd-redesign__perf-card-icon">
                      <LocalGasStationIcon />
                    </div>
                    <div>
                      <p className="pd-redesign__perf-card-label">Fuel Type</p>
                      <p className="pd-redesign__perf-card-value">
                        {eng.fuel_type}
                      </p>
                    </div>
                  </div>

                  <div className="pd-redesign__perf-card">
                    <div className="pd-redesign__perf-card-icon">
                      <SecurityIcon />
                    </div>
                    <div>
                      <p className="pd-redesign__perf-card-label">ABS</p>
                      <p className="pd-redesign__perf-card-value">
                        {brakes.abs ? "Dual Channel" : "Standard"}
                      </p>
                    </div>
                  </div>

                  <div className="pd-redesign__perf-card">
                    <div className="pd-redesign__perf-card-icon">
                      <SportsMotorsportsIcon />
                    </div>
                    <div>
                      <p className="pd-redesign__perf-card-label">Body Type</p>
                      <p className="pd-redesign__perf-card-value">
                        {bikeData.body_type}
                      </p>
                    </div>
                  </div>

                  <div className="pd-redesign__perf-card">
                    <div className="pd-redesign__perf-card-icon">
                      <SpeedIcon />
                    </div>
                    <div>
                      <p className="pd-redesign__perf-card-label">Condition</p>
                      <p className="pd-redesign__perf-card-value">
                        {bikeData.bike_condition}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* History & Legal */}
              <section
                aria-labelledby="history-title"
                style={{ marginTop: "2.5rem" }}
              >
                <h2 id="history-title" className="pd-redesign__section-title">
                  <span
                    className="pd-redesign__section-title-bar"
                    aria-hidden="true"
                  />
                  History &amp; Legal
                </h2>
                <div className="pd-redesign__history">
                  <div className="pd-redesign__history-grid">
                    <div className="pd-redesign__history-item">
                      <p className="hi-label">Registration</p>
                      <p className="hi-value">{bikeData.rto.rg_number}</p>
                    </div>
                    <div className="pd-redesign__history-item">
                      <p className="hi-label">Km Driven</p>
                      <p className="hi-value">
                        {bikeData.km_driven.toLocaleString()} km
                      </p>
                    </div>
                    <div className="pd-redesign__history-item">
                      <p className="hi-label">Owner</p>
                      <p className="hi-value">{bikeData.owner_count}</p>
                    </div>
                    <div className="pd-redesign__history-item">
                      <p className="hi-label">Insurance</p>
                      <p className="hi-value">
                        {bikeData.documents.insurance.validity_period}
                      </p>
                    </div>
                    <div className="pd-redesign__history-item">
                      <p className="hi-label">RTO</p>
                      <p className="hi-value">{bikeData.rto.location_code}</p>
                    </div>
                    <div className="pd-redesign__history-item">
                      <p className="hi-label">Location</p>
                      <p className="hi-value">{bikeData.location}</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              RIGHT — Sticky Sidebar
          ═══════════════════════════════════════════════════════════ */}
          <div className="pd-redesign__sidebar">
            <div className="pd-redesign__sidebar-inner">
              {/* Action Card */}
              <div className="pd-redesign__action-card">
                {/* Seller Info */}
                <div className="pd-redesign__seller">
                  <div className="pd-redesign__seller-avatar">
                    {/* Placeholder avatar — swap with real seller image from API */}
                    <img
                      src="https://ui-avatars.com/api/?name=Rapid+Motors&background=311b92&color=fff&size=96"
                      alt={bikeData.dealer_details.name}
                    />
                  </div>
                  <div className="pd-redesign__seller-info">
                    <p className="pd-redesign__seller-name">
                      {bikeData.dealer_details.name}
                      <Tooltip title="Verified Seller" arrow>
                        <VerifiedIcon className="pd-redesign__seller-verified-inline" />
                      </Tooltip>
                    </p>
                    <p className="pd-redesign__seller-badge">
                      Certified Premium Seller
                    </p>
                  </div>
                  <div className="pd-redesign__seller-actions">
                    {!bikeData.hold?.is_held && (
                      <Tooltip title="Hold this bike" arrow>
                        <Link
                          to={`/hold-bike/${bikeData.brand.toLowerCase()}/${bikeData.model.toLowerCase()}/${bikeData.bike_id}`}
                          style={{ display: "inline-flex" }}
                        >
                          <IconButton color="warning" size="small">
                            <DirectionsBikeIcon />
                          </IconButton>
                        </Link>
                      </Tooltip>
                    )}
                    <Tooltip title="Add to wishlist" arrow>
                      <IconButton size="small">
                        <FavoriteBorderIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>

                <hr className="pd-redesign__divider" />

                {/* Name + Price Header */}
                <div className="pd-redesign__card-header">
                  <div>
                    <p className="pd-redesign__card-title">
                      {bikeData.brand} {bikeData.model} {bikeData.year_of_model}
                      <span className="pd-redesign__card-title-asterisk">
                        *
                      </span>
                    </p>
                    <p className="pd-redesign__card-subtitle">
                      {bikeData.km_driven.toLocaleString()} km &bull;{" "}
                      {eng.fuel_type} &bull; {eng.transmission_type}
                    </p>
                  </div>
                  <p className="pd-redesign__card-price">
                    ₹ {formatINR(discountedPrice)}
                  </p>
                </div>

                <hr className="pd-redesign__divider" />

                {/* Features */}
                <div className="pd-redesign__features">
                  <p className="pd-redesign__features-label">
                    <AutoAwesomeIcon />
                    Key Features
                  </p>
                  <div className="pd-redesign__chips">
                    <Chip
                      label="Assured"
                      size="small"
                      color="primary"
                      className="pd-chip pd-chip--assured"
                    />
                    {bikeData.key_points.map((point) => (
                      <div key={point} className="pd-chip">
                        {point}
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="pd-redesign__divider" />

                {/* CTA Buttons */}
                <div className="pd-redesign__cta-buttons">
                  {bikeData.hold?.is_held ? (
                    <>
                      <button
                        className="pd-redesign__cta-hold"
                        type="button"
                        disabled
                      >
                        CURRENTLY ON HOLD
                      </button>
                      <p className="pd-redesign__hold-info">
                        This bike is currently held by another user until{" "}
                        {bikeData.hold.hold_expiry_time
                          ? new Date(
                              bikeData.hold.hold_expiry_time,
                            ).toLocaleDateString()
                          : "further notice"}
                      </p>
                    </>
                  ) : (
                    <div className="pd-redesign__cta-row">
                      <Link
                        to={`/book-bike/${bikeData.brand.toLowerCase()}/${bikeData.model.toLowerCase()}/${bikeData.bike_id}`}
                        className="pd-redesign__cta-book"
                      >
                        BOOK NOW
                      </Link>
                      <Link
                        to={`/test-drive/${bikeData.brand.toLowerCase()}/${bikeData.model.toLowerCase()}/${bikeData.bike_id}`}
                        className="pd-redesign__cta-testdrive"
                      >
                        FREE TEST DRIVE
                      </Link>
                    </div>
                  )}
                </div>

                <hr className="pd-redesign__divider" />

                {/* Share Section */}
                <div className="pd-redesign__share">
                  <p className="pd-redesign__share-label">
                    Share with a friend:
                  </p>
                  <div className="pd-redesign__share-icons">
                    {shareOptions.map(({ name, icon, url, onClick }) => (
                      <Tooltip key={name} title={name} arrow>
                        <IconButton
                          onClick={() => {
                            if (onClick) return onClick();
                            if (url) window.open(url, "_blank");
                          }}
                          size="small"
                          className="pd-share-icon"
                        >
                          {icon}
                        </IconButton>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              </div>

              {/* Purchase Protection */}
              <div className="pd-redesign__protection">
                <div className="pd-redesign__protection-header">
                  <ShieldIcon />
                  <span>Purchase Protection</span>
                </div>
                <p className="pd-redesign__protection-text">
                  This vehicle has undergone a 150-point quality check and is
                  eligible for our premium curation guarantee.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
