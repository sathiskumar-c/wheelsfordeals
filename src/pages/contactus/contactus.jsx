// React Imports
import React, { useState } from "react";

// Local Imports
import "./contactus.scss";
import bannerData from "../../data/contactus-banner.json";
import hubsData from "../../data/contactus-hubs.json";
import queryData from "../../data/contactus-query.json";

// MUI Icon Imports
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Alert from "@mui/material/Alert";

const inquiryOptions =
  queryData.formFields.find((f) => f.name === "queryType")?.options || [];

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    inquiryType: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.inquiryType)
      newErrors.inquiryType = "Please select an inquiry type.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setSubmitted(true);
    setFormData({ fullName: "", email: "", inquiryType: "", message: "" });
    setErrors({});
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="cu-redesign">
      {/* Hero Section */}
      <section className="cu-redesign__hero">
        {/* Left - hero image with contact info */}
        <div
          className="cu-redesign__hero-image"
          style={{ backgroundImage: `url(${bannerData.backgroundImage})` }}
        >
          <div className="cu-redesign__hero-overlay">
            <span className="cu-redesign__hero-badge">Global Presence</span>
            <h1 className="cu-redesign__hero-heading">
              Inquiry &amp; <br />
              <span className="cu-redesign__hero-heading--accent">
                Excellence.
              </span>
            </h1>
            <p className="cu-redesign__hero-desc">
              Our curators are standing by to facilitate your next acquisition.
              Experience a marketplace redefined by precision and authority.
            </p>
            <div className="cu-redesign__hero-contacts">
              <a
                href={`tel:${bannerData.phone}`}
                className="cu-redesign__hero-contact-link"
              >
                <CallRoundedIcon />
                <span>{bannerData.phone}</span>
              </a>
              <a
                href={`mailto:${bannerData.email}`}
                className="cu-redesign__hero-contact-link"
              >
                <MailRoundedIcon />
                <span>{bannerData.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right - contact form panel */}
        <div className="cu-redesign__hero-form-panel">
          <div className="cu-redesign__form-wrapper">
            <header className="cu-redesign__form-header">
              <h2 className="cu-redesign__form-title">Get in touch</h2>
              <p className="cu-redesign__form-subtitle">
                Our curators respond within 12 business hours.
              </p>
            </header>

            {submitted && (
              <Alert
                severity="success"
                sx={{ mb: 3, borderRadius: "0.5rem" }}
                onClose={() => setSubmitted(false)}
              >
                Your message has been sent! Our team will respond shortly.
              </Alert>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="cu-redesign__form-row">
                <div className="cu-redesign__form-group">
                  <label className="cu-redesign__form-label">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={`cu-redesign__form-input${errors.fullName ? " cu-redesign__form-input--error" : ""}`}
                  />
                  {errors.fullName && (
                    <span className="cu-redesign__form-error">
                      {errors.fullName}
                    </span>
                  )}
                </div>
                <div className="cu-redesign__form-group">
                  <label className="cu-redesign__form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`cu-redesign__form-input${errors.email ? " cu-redesign__form-input--error" : ""}`}
                  />
                  {errors.email && (
                    <span className="cu-redesign__form-error">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="cu-redesign__form-group">
                <label className="cu-redesign__form-label">Inquiry Type</label>
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className={`cu-redesign__form-select${errors.inquiryType ? " cu-redesign__form-input--error" : ""}`}
                >
                  <option value="">Select inquiry type</option>
                  {inquiryOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.title}
                    </option>
                  ))}
                </select>
                {errors.inquiryType && (
                  <span className="cu-redesign__form-error">
                    {errors.inquiryType}
                  </span>
                )}
              </div>

              <div className="cu-redesign__form-group">
                <label className="cu-redesign__form-label">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can our team assist you?"
                  rows={5}
                  className={`cu-redesign__form-textarea${errors.message ? " cu-redesign__form-input--error" : ""}`}
                />
                {errors.message && (
                  <span className="cu-redesign__form-error">
                    {errors.message}
                  </span>
                )}
              </div>

              <button type="submit" className="cu-redesign__form-submit">
                Send Message
                <ArrowForwardRoundedIcon />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Hubs Section */}
      <section className="cu-redesign__hubs">
        <div className="cu-redesign__hubs-header">
          <div>
            <span className="cu-redesign__hubs-eyebrow">Regional Network</span>
            <h2 className="cu-redesign__hubs-title">{hubsData.title}</h2>
            <p className="cu-redesign__hubs-subtitle">
              Strategically located experience centers designed for the
              automotive elite.
            </p>
          </div>
          <div className="cu-redesign__hubs-nav">
            <button
              className="cu-redesign__hubs-nav-btn"
              aria-label="Previous hub"
            >
              <ChevronLeftRoundedIcon />
            </button>
            <button className="cu-redesign__hubs-nav-btn" aria-label="Next hub">
              <ChevronRightRoundedIcon />
            </button>
          </div>
        </div>

        {/* Bento-style grid */}
        <div className="cu-redesign__hubs-grid">
          {/* Featured hub - large card */}
          <div className="cu-redesign__hub-card cu-redesign__hub-card--large">
            <img
              src={hubsData.hubs[0].image}
              alt={hubsData.hubs[0].title}
              className="cu-redesign__hub-image"
            />
            <div className="cu-redesign__hub-overlay" />
            <div className="cu-redesign__hub-content">
              <h3 className="cu-redesign__hub-name">
                {hubsData.hubs[0].title}
              </h3>
              <p className="cu-redesign__hub-address">
                {hubsData.hubs[0].address}
              </p>
              <div className="cu-redesign__hub-stats">
                <div className="cu-redesign__hub-stat">
                  <span className="cu-redesign__hub-stat-label">Inventory</span>
                  <span className="cu-redesign__hub-stat-value">
                    {hubsData.hubs[0].cars} Units
                  </span>
                </div>
                <div className="cu-redesign__hub-stat-divider" />
                <div className="cu-redesign__hub-stat">
                  <span className="cu-redesign__hub-stat-label">Hours</span>
                  <span className="cu-redesign__hub-stat-value">
                    {hubsData.hubs[0].timing}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Remaining hubs */}
          {hubsData.hubs.slice(1).map((hub, index) => (
            <div key={index} className="cu-redesign__hub-card">
              <img
                src={hub.image}
                alt={hub.title}
                className="cu-redesign__hub-image"
              />
              <div className="cu-redesign__hub-overlay" />
              <div className="cu-redesign__hub-content">
                <h3 className="cu-redesign__hub-name cu-redesign__hub-name--sm">
                  {hub.title}
                </h3>
                <p className="cu-redesign__hub-address cu-redesign__hub-address--sm">
                  {hub.address}
                </p>
                <button className="cu-redesign__hub-visit-btn">
                  Visit Hub <ArrowForwardRoundedIcon fontSize="small" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="cu-redesign__info-cards">
        <div className="cu-redesign__info-grid">
          <div className="cu-redesign__info-card">
            <SupportAgentRoundedIcon className="cu-redesign__info-icon" />
            <h4 className="cu-redesign__info-title">24/7 Concierge</h4>
            <p className="cu-redesign__info-desc">
              Direct access to our senior advisors for immediate assistance with
              active inquiries and bids.
            </p>
            <a
              href={`tel:${bannerData.phone}`}
              className="cu-redesign__info-link"
            >
              {bannerData.phone}
            </a>
          </div>

          <div className="cu-redesign__info-card">
            <VerifiedUserRoundedIcon className="cu-redesign__info-icon" />
            <h4 className="cu-redesign__info-title">Verification Hub</h4>
            <p className="cu-redesign__info-desc">
              Status updates on vehicle inspections and title authentication
              reports.
            </p>
            <a href="#" className="cu-redesign__info-link">
              Check Status
            </a>
          </div>

          <div className="cu-redesign__info-card">
            <CampaignRoundedIcon className="cu-redesign__info-icon" />
            <h4 className="cu-redesign__info-title">Media Relations</h4>
            <p className="cu-redesign__info-desc">
              For press inquiries, editorial features, and brand partnership
              requests.
            </p>
            <a
              href={`mailto:${bannerData.email}`}
              className="cu-redesign__info-link"
            >
              {bannerData.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
