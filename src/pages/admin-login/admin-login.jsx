// React Imports
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI Imports
import {
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Box,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// Local Imports
import "./admin-login.scss";
import Img_AdminLogin from "/images/illustrations/admin.png";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const [step, setStep] = useState("login"); // login -> method -> otp
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [otpMethod, setOtpMethod] = useState(""); // "email" or "mobile"
  const navigate = useNavigate();

  const otpRefs = React.useRef([...Array(4)].map(() => React.createRef()));

  useEffect(() => {
    if (step === "otp") {
      otpRefs.current[0].current?.focus();
    }
  }, [step]);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    setFormErrors({ ...formErrors, [field]: "" });
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Enter a valid email";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    } else if (formData.password.length > 16) {
      errors.password = "Password must not exceed 16 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setStep("method");
    }
  };

  const handleSelectMethod = (method) => {
    setOtpMethod(method);
    setStep("otp");
  };

  const handleOtpChange = (index) => (e) => {
    let value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      otpRefs.current[index + 1]?.current?.focus();
    }

    setOtpError("");
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (pasted.length === otp.length) {
      setOtp(pasted.split(""));
      otpRefs.current[otp.length - 1]?.current?.focus();
      e.preventDefault();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    const dummyOtp = "1234";
    if (enteredOtp === dummyOtp) {
      navigate("/admin/dashboard");
    } else {
      setOtpError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-left">
        <img
          src={Img_AdminLogin}
          alt="Admin Login"
          className="admin-login-img"
        />
      </div>

      <div className="admin-login-right">
        <form
          className="admin-login-form"
          onSubmit={
            step === "login"
              ? handleLoginSubmit
              : step === "otp"
              ? handleOtpSubmit
              : undefined
          }
        >
          <h2 className={`form-title ${step !== "login" ? "text-center" : ""}`}>
            {step === "login"
              ? "Login to Dashboard"
              : step === "method"
              ? "Verify your Identity"
              : "Verification OTP"}
          </h2>

          {step === "login" && (
            <>
              <TextField
                label="Email Address*"
                type="email"
                fullWidth
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange("email")}
                error={!!formErrors.email}
                helperText={formErrors.email}
              />
              <FormControl
                variant="outlined"
                fullWidth
                error={!!formErrors.password}
              >
                <InputLabel>Password*</InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange("password")}
                  // inputProps={{ maxLength: 16 }}
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

              <div className="form-links">
                <button type="button" className="forgot-password">
                  Forgot password?
                </button>
              </div>

              <Button type="submit" fullWidth className="admin-login-btn">
                LOGIN
              </Button>
            </>
          )}

          {step === "method" && (
            <>
              <Button
                variant="outlined"
                onClick={() => handleSelectMethod("email")}
                className="admin-login-btn"
              >
                Verify via Email
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleSelectMethod("mobile")}
                className="admin-login-btn"
              >
                Verify via Mobile
              </Button>
            </>
          )}

          {step === "otp" && (
            <>
              <div style={{ textAlign: "center", marginBottom: "10px" }}>
                Enter the OTP sent to{" "}
                <b>
                  {otpMethod === "email"
                    ? "sa***32@gmail.com"
                    : "+91-98XXXXXX32"}
                </b>
              </div>
              <Box className="otp-box">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    ref={otpRefs.current[index]}
                    value={digit}
                    onChange={handleOtpChange(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !otp[index] && index > 0) {
                        otpRefs.current[index - 1]?.current?.focus();
                      }
                    }}
                    onPaste={handleOtpPaste}
                    autoComplete="one-time-code"
                    aria-label={`OTP digit ${index + 1}`}
                  />
                ))}
              </Box>

              {otpError && (
                <FormHelperText error sx={{ textAlign: "center" }}>
                  {otpError}
                </FormHelperText>
              )}
              <Button
                type="submit"
                variant="contained"
                className="admin-login-btn"
                disabled={otp.some((digit) => digit === "")}
              >
                Verify OTP
              </Button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
