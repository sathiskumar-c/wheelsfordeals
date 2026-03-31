// React
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// MUI Icons & component
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Avatar } from "@mui/material";

// Local Imports
import "./edit-profile.scss";

const INITIAL_DATA = {
  firstName: "Natashia",
  lastName: "Khaleira",
  email: "info@binary-fusion.com",
  phone: "9876543210",
  streetAddress: "123 Main Street, Apartment 4B",
  city: "Leeds",
  state: "Tamil Nadu",
  postalCode: "123456",
  bio: "Passionate about two wheels and great deals. Experienced in buying and selling pre-owned bikes with a focus on quality and transparency.",
};

const EditProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ ...INITIAL_DATA });
  const [errors, setErrors] = useState({});
  const [avatarChanged, setAvatarChanged] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(
    "https://i.pravatar.cc/150?img=12",
  );
  const [avatarError, setAvatarError] = useState("");
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const pendingNavRef = useRef(null);
  const fileInputRef = useRef(null);

  // Check if anything changed compared to initial values
  const isDirty =
    avatarChanged ||
    Object.keys(INITIAL_DATA).some(
      (key) => formData[key] !== INITIAL_DATA[key],
    );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Intercept navigation — show modal if there are unsaved changes
  const safeNavigate = (path) => {
    if (isDirty) {
      pendingNavRef.current = path;
      setShowDiscardModal(true);
    } else {
      navigate(path);
    }
  };

  const handleCancel = () => safeNavigate("/profile");

  const handleDiscardConfirm = () => {
    setShowDiscardModal(false);
    navigate(pendingNavRef.current);
  };

  const handleDiscardCancel = () => {
    setShowDiscardModal(false);
    pendingNavRef.current = null;
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    )
      newErrors.email = "Valid email is required";
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Enter a valid 10-digit mobile number";
    if (!formData.streetAddress.trim())
      newErrors.streetAddress = "Street address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.postalCode.trim() || !/^\d{6}$/.test(formData.postalCode))
      newErrors.postalCode = "6-digit postal code required";
    return newErrors;
  };

  const handleSave = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    navigate("/profile");
  };

  const bioMax = 500;

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      setAvatarError("Image size must not exceed 3 MB.");
      e.target.value = "";
      return;
    }
    setAvatarError("");
    setAvatarSrc(URL.createObjectURL(file));
    setAvatarChanged(true);
    e.target.value = "";
  };

  return (
    <div className="edit-profile-page">
      {/* Page Header */}
      <div className="edit-profile-page__header">
        <div>
          <nav className="edit-profile-page__breadcrumb">
            <span
              className="edit-profile-page__breadcrumb-link"
              onClick={() => safeNavigate("/profile")}
            >
              Account
            </span>
            <span className="edit-profile-page__breadcrumb-sep">›</span>
            <span className="edit-profile-page__breadcrumb-current">
              Edit Profile
            </span>
          </nav>
          <h1 className="edit-profile-page__title">Profile Settings</h1>
          <p className="edit-profile-page__subtitle">
            Manage your personal information and address.
          </p>
        </div>
        <div className="edit-profile-page__header-actions">
          <button
            className="edit-profile-page__cancel-btn"
            onClick={handleCancel}
            aria-label="Cancel and go back"
          >
            <ArrowBackIcon sx={{ fontSize: 16 }} />
            Cancel
          </button>
          <button
            className="edit-profile-page__save-btn"
            onClick={handleSave}
            disabled={!isDirty}
            aria-label="Save changes"
          >
            <CheckCircleIcon sx={{ fontSize: 17 }} />
            Save Changes
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="edit-profile-page__body">
        {/* Left Column */}
        <aside className="edit-profile-page__aside">
          {/* Identity Card */}
          <div className="identity-card">
            <div className="identity-card__avatar-wrapper">
              <Avatar
                src={avatarSrc}
                alt="Profile"
                sx={{ width: 160, height: 160 }}
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleAvatarUpload}
              />
              <button
                className="identity-card__camera-btn"
                aria-label="Upload new photo"
                onClick={() => fileInputRef.current.click()}
              >
                <PhotoCameraIcon sx={{ fontSize: 18 }} />
              </button>
            </div>
            {avatarError && (
              <p className="identity-card__avatar-error">{avatarError}</p>
            )}
            <h2 className="identity-card__name">
              {`${formData.firstName} ${formData.lastName}`}
            </h2>
            <p className="identity-card__subtitle">
              Premium Member since Oct 2023
            </p>

            <div className="identity-card__completion">
              <div className="identity-card__completion-row">
                <span>Profile Completion</span>
                <span className="identity-card__completion-pct">85%</span>
              </div>
              <div className="identity-card__bar-track">
                <div
                  className="identity-card__bar-fill"
                  style={{ width: "85%" }}
                />
              </div>
            </div>
          </div>

          {/* Verified Badge */}
          <div className="verified-badge">
            <div className="verified-badge__icon">
              <VerifiedUserIcon sx={{ fontSize: 22, color: "#fff" }} />
            </div>
            <div>
              <p className="verified-badge__title">Identity Verified</p>
              <p className="verified-badge__desc">
                Your account meets all security standards.
              </p>
            </div>
          </div>
        </aside>

        {/* Right Column */}
        <div className="edit-profile-page__form-panel">
          {/* Basic Information */}
          <section className="form-section">
            <div className="form-section__heading-row">
              <h3 className="form-section__heading">Basic Information</h3>
              <div className="form-section__divider" />
            </div>
            <div className="form-section__grid form-section__grid--2">
              <div className="form-field">
                <label className="form-field__label">First Name</label>
                <input
                  className={`form-field__input ${errors.firstName ? "form-field__input--error" : ""}`}
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <span className="form-field__error">{errors.firstName}</span>
                )}
              </div>
              <div className="form-field">
                <label className="form-field__label">Last Name</label>
                <input
                  className={`form-field__input ${errors.lastName ? "form-field__input--error" : ""}`}
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <span className="form-field__error">{errors.lastName}</span>
                )}
              </div>
              <div className="form-field">
                <label className="form-field__label">Email Address</label>
                <input
                  className={`form-field__input ${errors.email ? "form-field__input--error" : ""}`}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <span className="form-field__error">{errors.email}</span>
                )}
              </div>
              <div className="form-field">
                <label className="form-field__label">Phone Number</label>
                <div
                  className={`form-field__phone-wrapper ${errors.phone ? "form-field__phone-wrapper--error" : ""}`}
                >
                  <span className="form-field__phone-prefix">+91</span>
                  <input
                    className="form-field__phone-input"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => {
                      // allow digits only, max 10
                      const val = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);
                      setFormData((prev) => ({ ...prev, phone: val }));
                      if (errors.phone)
                        setErrors((prev) => ({ ...prev, phone: "" }));
                    }}
                    placeholder="Enter 10-digit number"
                    maxLength={10}
                  />
                </div>
                {errors.phone && (
                  <span className="form-field__error">{errors.phone}</span>
                )}
              </div>
            </div>
          </section>

          {/* Address */}
          <section className="form-section">
            <div className="form-section__heading-row">
              <h3 className="form-section__heading">Address &amp; Region</h3>
              <div className="form-section__divider" />
            </div>
            <div className="form-field">
              <label className="form-field__label">Street Address</label>
              <input
                className={`form-field__input ${errors.streetAddress ? "form-field__input--error" : ""}`}
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                placeholder="Enter street address"
              />
              {errors.streetAddress && (
                <span className="form-field__error">
                  {errors.streetAddress}
                </span>
              )}
            </div>
            <div className="form-section__grid form-section__grid--3">
              <div className="form-field">
                <label className="form-field__label">City</label>
                <input
                  className={`form-field__input ${errors.city ? "form-field__input--error" : ""}`}
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                />
                {errors.city && (
                  <span className="form-field__error">{errors.city}</span>
                )}
              </div>
              <div className="form-field">
                <label className="form-field__label">State / Province</label>
                <input
                  className="form-field__input form-field__input--readonly"
                  type="text"
                  name="state"
                  value={formData.state}
                  readOnly
                />
              </div>
              <div className="form-field">
                <label className="form-field__label">Postal Code</label>
                <input
                  className={`form-field__input ${errors.postalCode ? "form-field__input--error" : ""}`}
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="6-digit code"
                  maxLength={6}
                />
                {errors.postalCode && (
                  <span className="form-field__error">{errors.postalCode}</span>
                )}
              </div>
            </div>
          </section>

          {/* Bio */}
          <section className="form-section">
            <div className="form-section__heading-row">
              <h3 className="form-section__heading">Public Bio</h3>
              <div className="form-section__divider" />
            </div>
            <div className="form-field">
              <label className="form-field__label">Biography</label>
              <textarea
                className="form-field__textarea"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                maxLength={bioMax}
                placeholder="Tell us a bit about yourself..."
              />
              <p className="form-field__char-count">
                {formData.bio.length} / {bioMax} characters
              </p>
            </div>
          </section>

          {/* Mobile action buttons */}
          <div className="edit-profile-page__mobile-actions">
            <button
              className="edit-profile-page__cancel-btn"
              onClick={handleCancel}
            >
              <ArrowBackIcon sx={{ fontSize: 15 }} />
              Cancel
            </button>
            <button
              className="edit-profile-page__save-btn"
              onClick={handleSave}
              disabled={!isDirty}
            >
              <CheckCircleIcon sx={{ fontSize: 17 }} />
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Discard Changes Modal */}
      {showDiscardModal && (
        <div className="discard-modal-overlay">
          <div className="discard-modal">
            <div className="discard-modal__icon">
              <ErrorOutlineIcon sx={{ fontSize: 32, color: "#3e1000" }} />
            </div>
            <div className="discard-modal__content">
              <h3 className="discard-modal__title">Discard Unsaved Changes?</h3>
              <p className="discard-modal__desc">
                You have unsaved changes. If you leave now, your changes will be
                lost.
              </p>
            </div>
            <div className="discard-modal__actions">
              <button
                className="discard-modal__discard-btn"
                onClick={handleDiscardConfirm}
              >
                Discard Changes
              </button>
              <button
                className="discard-modal__stay-btn"
                onClick={handleDiscardCancel}
              >
                Keep Editing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
