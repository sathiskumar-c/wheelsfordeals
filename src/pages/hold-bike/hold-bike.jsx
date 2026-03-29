import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Alert } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import dayjs from "dayjs";

import { getBikeDetails } from "../../api/getBikeDetails";
import "./hold-bike.scss";

const PER_DAY_COST = 149;
const SERVICE_FEE_PERCENT = 2;
const MAX_HOLD_DAYS = 7;

const normalizeKey = (value) =>
  String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

const formatINR = (amount, maximumFractionDigits = 0) =>
  Number(amount || 0).toLocaleString("en-IN", {
    minimumFractionDigits: maximumFractionDigits,
    maximumFractionDigits,
  });

const findSelectedBike = (bikes, params) => {
  const routeBikeId = normalizeKey(params.bike_id);
  const routeBrand = normalizeKey(params.bike_brand);
  const routeModel = normalizeKey(params.bike_model);

  return bikes.find((bike) => {
    const bikeId = normalizeKey(bike.bike_id);
    const brand = normalizeKey(bike.brand || bike.slug?.brand);
    const model = normalizeKey(bike.model || bike.slug?.model);
    const slugModel = normalizeKey(bike.slug?.model);

    return (
      bikeId === routeBikeId ||
      ((brand === routeBrand ||
        normalizeKey(bike.slug?.brand) === routeBrand) &&
        (model === routeModel || slugModel === routeModel))
    );
  });
};

const HoldBike = () => {
  const params = useParams();
  const [bikeData, setBikeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    fromDate: dayjs(),
    toDate: dayjs().add(MAX_HOLD_DAYS - 1, "day"),
  });

  useEffect(() => {
    let isMounted = true;

    const loadBike = async () => {
      try {
        const bikes = await getBikeDetails();
        const bikeList = Array.isArray(bikes) ? bikes : [];
        const selectedBike = findSelectedBike(bikeList, params);

        if (!isMounted) {
          return;
        }

        if (!selectedBike) {
          setLoadError(
            "We could not find the selected bike for this reservation.",
          );
          setBikeData(null);
        } else {
          setBikeData(selectedBike);
        }
      } catch {
        if (isMounted) {
          setLoadError("Unable to load bike details right now.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadBike();

    return () => {
      isMounted = false;
    };
  }, [params]);

  const reservationDetails = useMemo(() => {
    const start = formData.fromDate
      ? dayjs(formData.fromDate).startOf("day")
      : null;
    const end = formData.toDate ? dayjs(formData.toDate).startOf("day") : null;

    if (!start || !end) {
      return { days: 0, holdCost: 0, serviceFee: 0, total: 0 };
    }

    const days = Math.max(end.diff(start, "day") + 1, 0);
    const holdCost = days * PER_DAY_COST;
    const serviceFee = Number(
      ((holdCost * SERVICE_FEE_PERCENT) / 100).toFixed(2),
    );
    const total = Number((holdCost + serviceFee).toFixed(2));

    return { days, holdCost, serviceFee, total };
  }, [formData.fromDate, formData.toDate]);

  const handleDateChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    setSubmitted(false);
  };

  const validate = () => {
    const nextErrors = {};
    const start = formData.fromDate
      ? dayjs(formData.fromDate).startOf("day")
      : null;
    const end = formData.toDate ? dayjs(formData.toDate).startOf("day") : null;

    if (!start) {
      nextErrors.fromDate = "From date is required";
    }

    if (!end) {
      nextErrors.toDate = "To date is required";
    }

    if (start && end && end.isBefore(start, "day")) {
      nextErrors.toDate = "To date must be on or after the from date";
    }

    if (reservationDetails.days <= 0) {
      nextErrors.toDate = "Select a valid hold period";
    }

    if (reservationDetails.days > MAX_HOLD_DAYS) {
      nextErrors.toDate = `Reservations are limited to ${MAX_HOLD_DAYS} days`;
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setFormErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitted(true);
  };

  if (loading) {
    return (
      <div className="hb-redesign">
        <div className="hb-redesign__container">
          <div className="hb-redesign__loading">
            Loading reservation details...
          </div>
        </div>
      </div>
    );
  }

  if (loadError || !bikeData) {
    return (
      <div className="hb-redesign">
        <div className="hb-redesign__container">
          <Alert severity="error" className="hb-redesign__alert">
            {loadError || "Unable to open the hold-bike page."}
          </Alert>
        </div>
      </div>
    );
  }

  const discountedPrice = Math.round(
    bikeData.price.original_price * (1 - bikeData.price.discount_percent / 100),
  );
  const heroImage = bikeData.images?.[0];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="hb-redesign">
        <div className="hb-redesign__container">
          <nav className="hb-redesign__breadcrumb" aria-label="breadcrumb">
            <Link to="/bikes" className="hb-redesign__breadcrumb-link">
              <ChevronLeftIcon fontSize="small" />
              Back to Marketplace
            </Link>
            <span className="hb-redesign__breadcrumb-sep">/</span>
            <span className="hb-redesign__breadcrumb-current">Reservation</span>
          </nav>

          <div className="hb-redesign__layout">
            <div className="hb-redesign__main">
              <section className="hb-redesign__intro">
                <h1 className="hb-redesign__title">Hold Your Bike</h1>
                <p className="hb-redesign__subtitle">
                  Secure this exceptional machine while you finalize your
                  decision. Our curation experts will ensure it remains
                  off-market exclusively for you.
                </p>
              </section>

              <section className="hb-redesign__preview-card">
                <div className="hb-redesign__preview-media">
                  <img
                    src={heroImage?.url}
                    alt={
                      heroImage?.alt || `${bikeData.brand} ${bikeData.model}`
                    }
                  />
                </div>

                <div className="hb-redesign__preview-body">
                  <div>
                    <span className="hb-redesign__eyebrow">Featured Asset</span>
                    <h2 className="hb-redesign__bike-name">
                      {bikeData.brand} {bikeData.model}
                    </h2>
                    <p className="hb-redesign__bike-meta">
                      {bikeData.year_of_model} Edition
                      <span className="hb-redesign__dot">•</span>
                      {bikeData.color}
                    </p>
                  </div>

                  <div className="hb-redesign__asset-value">
                    <span className="hb-redesign__asset-label">
                      Asset Value
                    </span>
                    <div className="hb-redesign__asset-price">
                      ₹{formatINR(discountedPrice)}
                    </div>
                  </div>
                </div>
              </section>

              <section
                className="hb-redesign__trust-grid"
                aria-label="Trust signals"
              >
                <div className="hb-redesign__trust-card">
                  <ShieldRoundedIcon />
                  <div>
                    <div className="hb-redesign__trust-title">
                      Fully Insured
                    </div>
                    <div className="hb-redesign__trust-text">
                      Coverage during hold
                    </div>
                  </div>
                </div>

                <div className="hb-redesign__trust-card">
                  <LockRoundedIcon />
                  <div>
                    <div className="hb-redesign__trust-title">
                      Escrow Secured
                    </div>
                    <div className="hb-redesign__trust-text">
                      Funds held safely
                    </div>
                  </div>
                </div>

                <div className="hb-redesign__trust-card">
                  <WorkspacePremiumRoundedIcon />
                  <div>
                    <div className="hb-redesign__trust-title">
                      Certified Status
                    </div>
                    <div className="hb-redesign__trust-text">
                      Marketplace verified
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <aside className="hb-redesign__sidebar">
              <div className="hb-redesign__sidebar-inner">
                <form
                  className="hb-redesign__reservation-card"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <h3 className="hb-redesign__card-title">
                    Reservation Details
                  </h3>

                  <div className="hb-redesign__date-grid">
                    <div className="hb-redesign__date-field">
                      <label className="hb-redesign__field-label">
                        From Date
                      </label>
                      <DatePicker
                        value={formData.fromDate}
                        onChange={(value) =>
                          handleDateChange("fromDate", value)
                        }
                        minDate={dayjs()}
                        maxDate={dayjs().add(MAX_HOLD_DAYS - 1, "day")}
                        format="DD-MM-YYYY"
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!formErrors.fromDate,
                            helperText: formErrors.fromDate,
                            className: "hb-redesign__date-input",
                          },
                        }}
                      />
                    </div>

                    <div className="hb-redesign__date-field">
                      <label className="hb-redesign__field-label">
                        To Date
                      </label>
                      <DatePicker
                        value={formData.toDate}
                        onChange={(value) => handleDateChange("toDate", value)}
                        minDate={formData.fromDate || dayjs()}
                        maxDate={dayjs().add(MAX_HOLD_DAYS - 1, "day")}
                        format="DD-MM-YYYY"
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!formErrors.toDate,
                            helperText: formErrors.toDate,
                            className: "hb-redesign__date-input",
                          },
                        }}
                      />
                    </div>
                  </div>

                  <div className="hb-redesign__summary-card">
                    <div className="hb-redesign__summary-row">
                      <span>Reservation period</span>
                      <strong>{reservationDetails.days} Days</strong>
                    </div>
                    <div className="hb-redesign__summary-row">
                      <span>Daily holding rate</span>
                      <strong>₹{formatINR(PER_DAY_COST, 2)}</strong>
                    </div>
                    <div className="hb-redesign__summary-row">
                      <span>Service fee ({SERVICE_FEE_PERCENT}%)</span>
                      <strong>
                        ₹{formatINR(reservationDetails.serviceFee, 2)}
                      </strong>
                    </div>

                    <div className="hb-redesign__summary-total">
                      <div>
                        <div className="hb-redesign__summary-total-label">
                          Total Hold Price
                        </div>
                        <div className="hb-redesign__summary-total-value">
                          ₹{formatINR(reservationDetails.total, 2)}
                        </div>
                      </div>
                      <span className="hb-redesign__refund-badge">
                        Fully Refundable
                      </span>
                    </div>
                  </div>

                  {submitted && (
                    <Alert severity="success" className="hb-redesign__success">
                      Your bike has been reserved successfully.
                    </Alert>
                  )}

                  <button type="submit" className="hb-redesign__submit-btn">
                    Hold My Bike Now!
                  </button>

                  <p className="hb-redesign__terms">
                    By clicking the button above, you agree to our
                    <Link to="/terms-and-conditions"> Reservation Terms</Link>.
                    The bike will be marked as &quot;Hold Pending&quot;
                    immediately upon payment.
                  </p>
                </form>

                <div className="hb-redesign__support">
                  <SupportAgentRoundedIcon />
                  <span>
                    Need help? <Link to="/contact-us">Chat with a Curator</Link>
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default HoldBike;
