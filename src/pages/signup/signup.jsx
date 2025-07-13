// React Imports
import React, { useState } from "react";
import { Link } from "react-router-dom";

// MUI Imports
import {
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// Local Imports
import "./signup.scss";
import Img_SignUp from "../../../public/images/illustrations/signup.png";
import Img_Google from "../../../public/images/icons/google.png";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    setFormErrors({ ...formErrors, [field]: "" });
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Enter a valid email";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted", formData);
    }
  };

  return (
    <main className="signup-wrapper">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h5 className="signup-title">Create Account</h5>
        <img
          className="signup__img"
          src={Img_SignUp}
          alt="Sign Up Illustration"
        />

        <TextField
          label="Name"
          variant="outlined"
          placeholder="Enter your name"
          fullWidth
          value={formData.name}
          onChange={handleChange("name")}
          error={!!formErrors.name}
          helperText={formErrors.name}
        />

        <TextField
          label="Email"
          type="email"
          variant="outlined"
          placeholder="Enter your email"
          fullWidth
          value={formData.email}
          onChange={handleChange("email")}
          error={!!formErrors.email}
          helperText={formErrors.email}
        />

        <FormControl fullWidth variant="outlined" error={!!formErrors.password}>
          <InputLabel>Password</InputLabel>
          <OutlinedInput
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange("password")}
            placeholder="Enter your password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <FormHelperText>{formErrors.password}</FormHelperText>
        </FormControl>

        <FormControl
          fullWidth
          variant="outlined"
          error={!!formErrors.confirmPassword}
        >
          <InputLabel>Confirm Password</InputLabel>
          <OutlinedInput
            type={showConfirm ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange("confirmPassword")}
            placeholder="Re-enter your password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirm((prev) => !prev)}
                  edge="end"
                >
                  {showConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
          />
          <FormHelperText>{formErrors.confirmPassword}</FormHelperText>
        </FormControl>

        <button type="submit" className="signup__submit-button">
          Sign Up
        </button>

        <p className="signup__text">
          Already have an account?
          <Link to="/login">
            <span className="signup__login-link">Login</span>
          </Link>
        </p>

        <p className="signup__text signup__divider">Or With</p>

        <div className="signup__social-buttons">
          <button type="button" className="signup__social-btn google">
            <img
              className="signup__google-img"
              src={Img_Google}
              alt="Google icon"
            />
            Continue With Google
          </button>
        </div>
      </form>
    </main>
  );
};

export default SignUp;
