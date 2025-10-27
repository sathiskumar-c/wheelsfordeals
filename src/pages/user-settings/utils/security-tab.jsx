import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

export default function SecurityTab() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const [devices] = useState([
    { id: 1, name: "Dell 24\"", location: "London, UK", date: "May 12, 2023 at 2:30 AM" },
    { id: 2, name: "Macbook Air", location: "London, UK", date: "May 12, 2023 at 2:30 AM" },
    { id: 3, name: "iPhone 14 Pro Max", location: "London, UK", date: "May 12, 2023 at 2:30 AM" },
    { id: 4, name: "Samsung Galaxy S22 Ultra", location: "London, UK", date: "Aug 12, 2021 at 2:30 AM" },
    { id: 5, name: "Macbook Pro", location: "London, UK", date: "Aug 12, 2021 at 2:30 AM" },
  ]);

  const handleChange = (e) => {
  const { name, value } = e.target;
  setPasswordData({ ...passwordData, [name]: value });
  };

  const handlePasswordChange = () => {
    if (validatePasswords()) {
      alert("Password changed successfully!");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setErrors({});
    }
  };

  const validatePasswords = () => {
    let newErrors = {};
    if (!passwordData.currentPassword) newErrors.currentPassword = "Current password is required";
    if (!passwordData.newPassword) newErrors.newPassword = "New password is required";
    if (passwordData.newPassword.length < 8)
      newErrors.newPassword = "At least 8 characters";
    if (!/(?=.*[A-Z])/.test(passwordData.newPassword))
      newErrors.newPassword = "Must contain an uppercase letter";
    if (!/(?=.*[a-z])/.test(passwordData.newPassword))
      newErrors.newPassword = "Must contain a lowercase letter";
    if (!/(?=.*\d)/.test(passwordData.newPassword))
      newErrors.newPassword = "Must contain a number";
    if (!/(?=.*[!@#$%^&*])/.test(passwordData.newPassword))
      newErrors.newPassword = "Must contain a special character";
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="security-container">
      {/* Change Password Section */}
      <div className="password-section">
        <Typography variant="h6">Change Password</Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          To change your password, please fill in the fields below.<br />
          Your password must contain at least 8 characters, with one uppercase,
          one lowercase, one number, and one special character.
        </Typography>

        <form className="settings-form" onSubmit={e => { e.preventDefault(); handlePasswordChange(); }}>
          <TextField
            label="Current Password"
            name="currentPassword"
            type="password"
            value={passwordData.currentPassword}
            onChange={handleChange}
            error={!!errors.currentPassword}
            helperText={errors.currentPassword}
            fullWidth
            margin="normal"
          />
          <TextField
            label="New Password"
            name="newPassword"
            type="password"
            value={passwordData.newPassword}
            onChange={handleChange}
            error={!!errors.newPassword}
            helperText={errors.newPassword}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={passwordData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" type="submit" className="mt-3">
            Change Password
          </Button>
        </form>
      </div>

      {/* Devices Section */}
      <div className="devices-section">
        <Typography variant="h6">Your Devices</Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Your devices linked to this account.
        </Typography>
        <Button variant="outlined" color="secondary" className="btn-secondary">Log Out From All Devices</Button>

        <ul className="device-list">
          {devices.map((device) => (
            <li key={device.id} className="device-item">
              <div className="device-info">
                <span className="device-name">{device.name}</span>
                <span className="device-meta">
                  {device.location} • {device.date}
                </span>
              </div>
              <button className="logout-btn">⟶</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
