// React Imports
import React, { useState } from "react";
import PropTypes from "prop-types";

// MUI Imports & MUI Icons
import {
  Button,
  Grid,
  Divider,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import XIcon from "@mui/icons-material/X";
import TelegramIcon from "@mui/icons-material/Telegram";
import { calculateEMI } from "./utils";

export default function BikeProductDetailCard({ bikeData }) {
  // State Management
  const [copied, setCopied] = useState(false);

  const {
    brand,
    model,
    year_of_model,
    km_driven,
    location,
    price,
    engine_and_performance,
    key_points,
    emi_and_payments,
  } = bikeData;

  // Extract EMI & Payment Info
  const { payments, emi } = emi_and_payments || {};

  // EMI Config
  const downpaymentPercent = payments?.downpayment_percent_min || 0;
  const interestRate = emi?.intrest_rate_percent || 12;
  const tenureMonths = emi?.default_duration_months || 24;

  // Discount Price
  const discountedPrice = (
    price.original_price *
    (1 - price.discount_percent / 100)
  ).toFixed(0);

  // Principal Calculation (after downpayment)
  const principalAmount = discountedPrice * ((100 - downpaymentPercent) / 100);

  // Offer EMI
  const offerEMI = calculateEMI(principalAmount, interestRate, tenureMonths);

  // Original EMI (with 2.5% higher rate for comparison)
  const originalEMI = calculateEMI(
    principalAmount,
    interestRate + 2.5,
    tenureMonths
  );

  const currentUrl = encodeURIComponent(window.location.href);

  const shareOptions = [
    {
      name: copied ? "Copied!" : "Copy",
      icon: <ContentCopyIcon fontSize="small" />,
      onClick: () => {
        handleCopy();
      },
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

  // Copy URL
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bike-card">
      <div className="bike-card__header">
        <div>
          <h6 className="bike-card__title">
            {brand} {model} {year_of_model}
            <span className="bike-card__at-highlight">*</span>
          </h6>
          <p className="mb-0 bike-card__subtitle">
            {km_driven.toLocaleString()} km • {engine_and_performance.fuel_type}{" "}
            • {engine_and_performance.transmission_type}
          </p>
        </div>
        <div className="bike-card__wishlist">
          <IconButton>
            <FavoriteBorderIcon />
          </IconButton>
          <p className="mb-0 bike-card__shortlist-info">5 people shortlisted</p>
        </div>
      </div>

      <div className="bike-card__info">
        <p className="bike-card__info-item">
          <DirectionsBikeIcon fontSize="small" /> Test Drive:{" "}
          {bikeData.test_ride.availability
            ? `Available For Home`
            : `Available in Office`}
        </p>
        <p className="bike-card__info-item">
          <LocationOnIcon fontSize="small" /> {location}
        </p>
      </div>

      <div className="bike-card__tags">
        <Chip
          label="Assured"
          size="small"
          color="primary"
          className="bike_chip"
        />

        {key_points.map((res) => {
          return (
            <div key={res} className="bike-card__chip">
              {res}
            </div>
          );
        })}
      </div>

      <Divider className="bike-card__divider" />

      <p className="bike-card__label">Fixed on road price</p>

      <div className="price_parent">
        <h3 className="original_price">
          <CurrencyRupeeIcon />
          {`${(price?.original_price / 100000).toFixed(2)} Lakh`}
        </h3>

        <h3 className="final_price_parent">
          <CurrencyRupeeIcon />
          {`${(discountedPrice / 100000).toFixed(2)} Lakh`}
        </h3>
        <span className="bike-card__tcs">+ 1% TCS</span>
      </div>

      <p className="bike-card__inclusion">
        Includes RC transfer, insurance, fixes, upgrades & more
      </p>

      <div className="bike-card__emi-details">
        <p className="bike-card__emi-original">
          ₹{originalEMI.toLocaleString()}
        </p>
        <p className="bike-card__emi-discount">
          ₹{offerEMI.toLocaleString()}/m
        </p>
        <p className="bike-card__emi-validity">Valid till 17th Jun</p>

        <p>EMI starting at ₹{offerEMI.toLocaleString()}/mo</p>
      </div>

      <p className="bike-card__savings">
        Special rate starts at {emi_and_payments.emi.intrest_rate_percent}%
      </p>

      <div className="bike-card__emi-footer">
        <p>EMI starting at ₹7,331/mo</p>
        <Button size="small" className="bike-card__emi-button">
          Calculate your EMI
        </Button>
      </div>

      <Grid container spacing={2} className="bike-card__cta">
        <Grid item xs={6}>
          <Button variant="contained" fullWidth className="bike-card__book-btn">
            BOOK NOW
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            fullWidth
            className="bike-card__testdrive-btn"
          >
            FREE TEST DRIVE
          </Button>
        </Grid>
      </Grid>

      <Divider className="bike-card__divider" />

      <div className="bike-card__share">
        <p className="mb-0 fw-500" style={{ fontWeight: "500" }}>
          Share with a friend:
        </p>
        {shareOptions.map(({ name, icon, url, onClick }) => (
          <Tooltip key={name} title={name} arrow>
            <IconButton
              onClick={() => {
                if (onClick) return onClick();
                if (url) window.open(url, "_blank");
              }}
              size="small"
              className="share_icons"
            >
              {icon}
            </IconButton>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}

BikeProductDetailCard.propTypes = {
  bikeData: PropTypes.object.isRequired,
};
