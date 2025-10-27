import React, { useState } from "react";
import {
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Tabs,
  Tab,
  Box,
  Switch,
  Paper,
  Typography,
} from "@mui/material";
import {
  Email as EmailIcon,
  WhatsApp as WhatsAppIcon,
  Sms as SmsIcon,
} from "@mui/icons-material";
import "./user-settings.scss";
import SecurityTab from "./utils/security-tab";

export default function UserSettings() {
  const [activeTab, setActiveTab] = useState(0);


  // Notifications
  const [channels, setChannels] = useState({
    email: true,
    inApp: true,
    sms: false,
  });
  const [alerts, setAlerts] = useState({
    topDeals: true,
    newArrivals: true,
    bestSellers: false,
  });

  // Alerts (Bike-specific)
  const [bikeAlerts, setBikeAlerts] = useState({
    bikeName: "",
    maxAmount: "",
    specifications: "",
  });

  const handleTabChange = (_, newValue) => setActiveTab(newValue);


//     e.preventDefault();
//     if (validatePasswords()) {
//       alert("Password updated successfully!");
//     }
//   };

  // Notification handlers
  const toggleChannel = (key) => {
    setChannels({ ...channels, [key]: !channels[key] });
  };
  const toggleAlert = (key) => {
    setAlerts({ ...alerts, [key]: !alerts[key] });
  };

  // Bike Alerts
  const handleBikeAlertsChange = (e) => {
    setBikeAlerts({ ...bikeAlerts, [e.target.name]: e.target.value });
  };

  return (
    <div className="settings-container container">

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable">
          <Tab label="Security" />
          <Tab label="Notifications" />
          <Tab label="Alerts" />
        </Tabs>
      </Box>

      {/* ---------------- Privacy & Security ---------------- */}
      {activeTab === 0 && (

        <SecurityTab/>
      )}

      {/* ---------------- Notifications ---------------- */}
      {activeTab === 1 && (
        <div className="notifications-container">
          <Typography variant="h5" className="section-title">
            Notification Preferences
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Configure how and when you receive notifications
          </Typography>

          {/* Notification Channels */}
          <Paper className="channels-card">
            <Typography variant="subtitle1" className="section-subtitle">
              Notification Channels
            </Typography>
            <Box className="channels">
              <div className="channel-item">
                <EmailIcon />
                <span>Email</span>
                <Switch
                  checked={channels.email}
                  onChange={() => toggleChannel("email")}
                  aria-label="Email notifications"
                />
              </div>
              <div className="channel-item">
                <WhatsAppIcon />
                <span>WhatsApp</span>
                <Switch
                  checked={channels.inApp}
                  onChange={() => toggleChannel("inApp")}
                  aria-label="WhatsApp notifications"
                />
              </div>
              <div className="channel-item">
                <SmsIcon />
                <span>SMS</span>
                <Switch
                  checked={channels.sms}
                  onChange={() => toggleChannel("sms")}
                  aria-label="SMS notifications"
                />
              </div>
            </Box>
          </Paper>

          {/* Alert Types */}
          <Paper className="alerts-card">
            <Typography variant="subtitle1" className="section-subtitle">
              Notification Configurations
            </Typography>
            <FormGroup>
              {[
                {
                  key: "topDeals",
                  title: "Top Deals",
                  desc: "Get notified about the hottest deals available.",
                },
                {
                  key: "newArrivals",
                  title: "New Arrivals",
                  desc: "Receive updates when new bikes arrive.",
                },
                {
                  key: "bestSellers",
                  title: "Best Sellers",
                  desc: "Stay informed about the best-selling bikes.",
                }
              ].map((item) => (
                <FormControlLabel
                  key={item.key}
                  control={
                    <Checkbox
                      checked={alerts[item.key]}
                      onChange={() => toggleAlert(item.key)}
                    />
                  }
                  label={
                    <div>
                      <strong>{item.title}</strong>
                      <Typography variant="body2" color="textSecondary">
                        {item.desc}
                      </Typography>
                    </div>
                  }
                />
              ))}
            </FormGroup>
          </Paper>
          <Button variant="contained" color="primary" style={{marginTop: 24}}>
            Save Changes
          </Button>
        </div>
      )}

      {/* ---------------- Alerts ---------------- */}
      {activeTab === 2 && (
        <form className="settings-form">
          <h2>Create Bike Alert</h2>
          <TextField
            label="Bike Name"
            name="bikeName"
            value={bikeAlerts.bikeName}
            onChange={handleBikeAlertsChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Maximum Amount"
            name="maxAmount"
            type="number"
            value={bikeAlerts.maxAmount}
            onChange={handleBikeAlertsChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Specifications"
            name="specifications"
            value={bikeAlerts.specifications}
            onChange={handleBikeAlertsChange}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary">
            Save Alert
          </Button>
        </form>
      )}
    </div>
  );
}
