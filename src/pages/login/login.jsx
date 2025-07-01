// React Imports
import React, { useState } from "react";
import { Link } from "react-router-dom";

// MUI Imports
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// Local Imports
import "./login.scss";
import Img_Login from "/images/illustrations/login.png";
import Img_Google from "/images/icons/google.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();

  const validateForm = () => {
    const errors = { email: "", password: "" };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormErrors(errors);

    return !errors.email && !errors.password;
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });

    // Clear the error as the user types
    setFormErrors({ ...formErrors, [field]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", formData);
      // Proceed with login logic
    }
  };

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
  };

  return (
    <main role="main" className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <h5 className="login-title">Login</h5>

        <img className="login__img" src={Img_Login} alt="Login Illustration" />

        {/* Email Field */}
        <TextField
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange("email")}
          fullWidth
          required
          error={!!formErrors.email}
          helperText={formErrors.email}
        />

        {/* Password Field */}
        <FormControl
          variant="outlined"
          className="mt-2"
          fullWidth
          required
          error={!!formErrors.password}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            placeholder="Enter your password"
          />
          <FormHelperText>{formErrors.password}</FormHelperText>
        </FormControl>

        {/* Forgot Password */}
        <button
          type="button"
          className="login__forgot-password"
          onClick={handleForgotPassword}
        >
          Forgot password?
        </button>

        {/* Submit */}
        <button type="submit" className="login__submit-button">
          Sign In
        </button>

        {/* Sign Up Link */}
        <p className="login__text">
          Don’t have an account?
          <Link to="/signup">
            <span className="login__sign-up">Sign Up</span>
          </Link>
        </p>

        {/* Social Login */}
        <p className="login__text login__divider">Or With</p>
        <div className="login__social-buttons">
          <button type="button" className="login__social-btn google">
            <img
              className="login__google-img"
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

export default Login;
