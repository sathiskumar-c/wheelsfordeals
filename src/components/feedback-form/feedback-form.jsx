// React Imports
import React, { useState } from "react";

// MUI Imports
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";

// Local Imports
import "./feedback-form.scss";
import formSchema from "../../data/feedback-form.json";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    city: "",
    message: "",
    satisfaction: "",
  });
  const [errors, setErrors] = useState({});
  const [openSnack, setOpenSnack] = useState(false);

  // Helper: validate single field (used on blur & submit)
  const validateField = (key, value) => {
    // For empty required fields
    if (key === "email") {
      if (!value.trim()) {
        return "Email is required";
      }
      // Email validation for Gmail
      const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      if (!emailRegex.test(value)) {
        return "Please enter a valid Gmail address";
      }
      return null;
    }

    // Other fields validation
    const rule = formSchema[key];
    if (!rule) return null;

    if (rule.required && (!value || value.toString().trim() === "")) {
      return `${rule.label} is required`;
    }

    // Additional custom checks: mobile length and email TLD whitelist
    if (key === "mobile" && value) {
      // mobile is optional but if provided must be 10 digits
      if (!/^\d{10}$/.test(value)) {
        return "Mobile number must be exactly 10 digits.";
      }
    }

    if (key === "email" && value) {
      // Basic email format already handled by pattern, but enforce TLD whitelist:
      // get tld after last dot
      const parts = value.trim().toLowerCase().split(".");
      const tld = parts[parts.length - 1];
      const allowed = formSchema.email.allowedTLDs || [];
      if (!allowed.includes(tld)) {
        return `Email domain "${tld}" not supported. Use .com, .net, .org, etc.`;
      }
    }

    return null;
  };

  // Whole-form validation
  const validateAll = () => {
    const newErrors = {};
    Object.keys(formSchema).forEach((key) => {
      const value = formData[key];
      const err = validateField(key, value);
      if (err) newErrors[key] = err;
    });
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Mobile: allow only digits while typing
    if (name === "mobile") {
      const digits = value.replace(/\D/g, "");
      setFormData((p) => ({ ...p, mobile: digits }));
      // clear mobile error as user types
      setErrors((p) => ({ ...p, mobile: undefined }));
      return;
    }

    setFormData((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const err = validateField(name, value);
    setErrors((p) => ({ ...p, [name]: err || undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateAll();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // focus first error field (optional)
      const firstKey = Object.keys(newErrors)[0];
      const el = document.querySelector(`[name="${firstKey}"]`);
      if (el?.focus) el.focus();
      return;
    }

    // submit (replace with your API call)
    console.log("Submitting feedback:", formData);

    // show success & reset
    setOpenSnack(true);
    setFormData({
      name: "",
      mobile: "",
      email: "",
      city: "",
      message: "",
      satisfaction: "",
    });
    setErrors({});
  };

  return (
    <Paper
      elevation={4}
      className="feedback-container"
      component="section"
      aria-labelledby="feedback-heading"
    >
      <Typography
        id="feedback-heading"
        variant="h4"
        className="form-title"
        gutterBottom
      >
        We Value Your Feedback
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        className="feedback-form"
      >
        <Grid container>
          {/* Each field takes 100% width */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name *"
              name="name"
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.name}
              helperText={errors.name}
              inputProps={{ maxLength: 50 }}
              required
            />
          </Grid>

          {/* Mobile Number Field (100%) */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mobile Number"
              name="mobile"
              variant="outlined"
              value={formData.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.mobile}
              helperText={errors.mobile}
              inputProps={{
                maxLength: 10,
                inputMode: "numeric",
                pattern: "\\d*",
              }}
            />
          </Grid>

          {/* Email Field (100%) */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email *"
              name="email"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.email}
              helperText={errors.email}
              required
              type="email"
            />
          </Grid>

          {/* City Field (100%) */}
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Select City *"
              name="city"
              variant="outlined"
              value={formData.city}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.city}
              helperText={errors.city}
              SelectProps={{
                native: true,
                displayEmpty: true,
              }}
              required
            >
              <option value="" disabled>
                Select City
              </option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Chennai">Chennai</option>
            </TextField>
          </Grid>

          {/* Message field (100% width) */}
          <Grid item xs={12} style={{ marginTop: "1rem" }}>
            <TextField
              fullWidth
              label="Message"
              name="message"
              variant="outlined"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.message}
              helperText={errors.message}
              sx={{
                "& .MuiInputBase-root": {
                  height: "120px",
                },
                "& .MuiInputBase-inputMultiline": {
                  height: "120px !important",
                  overflowY: "auto",
                  paddingTop: "10px",
                  resize: "none",
                },
              }}
            />
          </Grid>
        </Grid>

        {/* Satisfaction (full width block like your screenshot) */}
        <Typography variant="h6" className="feedback-subtitle">
          Tell us how you feel about our services
        </Typography>

        <Box
          className="satisfaction-group"
          role="group"
          aria-label="Satisfaction options"
        >
          {["Extremely happy", "Satisfied", "Not Satisfied"].map((level) => (
            <Box
              key={level}
              className={`satisfaction-option ${
                formData.satisfaction === level ? "selected" : ""
              }`}
              onClick={() =>
                setFormData((p) => ({ ...p, satisfaction: level }))
              }
              tabIndex={0}
              onKeyDown={(ev) => {
                if (ev.key === "Enter")
                  setFormData((p) => ({ ...p, satisfaction: level }));
              }}
              role="button"
              aria-pressed={formData.satisfaction === level}
            >
              <span className="emoji">
                {level === "Extremely happy" && "😄"}
                {level === "Satisfied" && "🙂"}
                {level === "Not Satisfied" && "🙁"}
              </span>
              <Typography variant="body1">{level}</Typography>
            </Box>
          ))}
        </Box>

        <Button type="submit" variant="contained" className="submit-btn">
          SUBMIT
        </Button>
      </Box>

      <Snackbar
        open={openSnack}
        autoHideDuration={3500}
        onClose={() => setOpenSnack(false)}
      >
        <Alert
          onClose={() => setOpenSnack(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Thank you for your feedback!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default FeedbackForm;
