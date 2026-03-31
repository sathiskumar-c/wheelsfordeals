import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI Imports
import { Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SecurityIcon from "@mui/icons-material/Security";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

// Local Imports
import "./view-profile.scss";

const ViewProfile = () => {
  const navigate = useNavigate();
  const [formData] = useState({
    firstName: "Natashia",
    lastName: "Khaleira",
    email: "info@binary-fusion.com",
    phone: "+919876543210",
    streetAddress: "123 Main Street, Apartment 4B",
    city: "Leeds, East London",
    state: "Tamil Nadu",
    postalCode: "123456",
  });

  return (
    <div className="profile-page">
      {/* Hero */}
      <div className="profile-hero">
        <div className="profile-avatar-wrapper">
          <Avatar
            alt={`${formData.firstName} ${formData.lastName}`}
            src="https://i.pravatar.cc/150?img=12"
            sx={{ width: 120, height: 120 }}
          />
          <button className="camera-btn" aria-label="Change profile photo">
            <PhotoCameraIcon sx={{ fontSize: 16 }} />
          </button>
        </div>
        <div className="profile-hero-info">
          <h1>{`${formData.firstName} ${formData.lastName}`}</h1>
          <p className="profile-subtitle">Premium Member since Oct 2023</p>
          <div className="profile-badges">
            <span className="profile-badge profile-badge--verified">
              Verified Collector
            </span>
            <span className="profile-badge profile-badge--tier">
              Indigo Tier
            </span>
          </div>
        </div>
        <button
          className="hero-edit-btn"
          onClick={() => navigate("/profile/edit")}
          aria-label="Edit profile"
        >
          <EditIcon sx={{ fontSize: 16 }} />
          Edit Profile
        </button>
      </div>

      {/* Personal Information */}
      <section className="profile-card" aria-labelledby="personal-info-heading">
        <div className="card-header">
          <div className="card-title-group">
            <PersonOutlineIcon className="card-icon" />
            <h2 id="personal-info-heading">Personal Information</h2>
          </div>
        </div>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Full Name</span>
            <span className="info-value">{`${formData.firstName} ${formData.lastName}`}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Email Address</span>
            <span className="info-value">{formData.email}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Phone Number</span>
            <span className="info-value">{formData.phone}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Account Role</span>
            <span className="info-value">Premium Member</span>
          </div>
        </div>
      </section>

      {/* Address */}
      <section className="profile-card" aria-labelledby="address-heading">
        <div className="card-header">
          <div className="card-title-group">
            <LocationOnOutlinedIcon className="card-icon" />
            <h2 id="address-heading">Address</h2>
          </div>
        </div>
        <div className="info-grid">
          <div className="info-item info-item--full">
            <span className="info-label">Street Address</span>
            <span className="info-value">{formData.streetAddress}</span>
          </div>
          <div className="info-item">
            <span className="info-label">City / State</span>
            <span className="info-value">{formData.city}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Postal Code</span>
            <span className="info-value">{formData.postalCode}</span>
          </div>
        </div>
      </section>

      {/* Security & Notification */}
      <div className="extra-grid">
        <section className="extra-card">
          <h4 className="extra-title">Security</h4>
          <div className="extra-row">
            <div className="extra-row-left">
              <SecurityIcon sx={{ fontSize: 20, color: "#6c45c0" }} />
              <span>Two-Factor Auth</span>
            </div>
            <span className="status-badge status-badge--active">Active</span>
          </div>
        </section>
        <section className="extra-card">
          <h4 className="extra-title">Notification Preference</h4>
          <div className="extra-row">
            <div className="extra-row-left">
              <EmailOutlinedIcon sx={{ fontSize: 20, color: "#6c45c0" }} />
              <span>Weekly Curations</span>
            </div>
            <span className="status-badge status-badge--subscribed">
              Subscribed
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ViewProfile;
