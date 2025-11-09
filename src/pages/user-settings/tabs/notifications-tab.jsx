import React, { useState } from "react";
import {
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
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

export default function NotificationsTab() {
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

  const toggleChannel = (key) => {
    setChannels((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleAlert = (key) => {
    setAlerts((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="notifications-container container">
      <Typography variant="h5" className="section-title pb-2">
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
        <FormGroup className="checkbox-parent">
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
            },
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
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        className="save-btn"
      >
        Save Changes
      </Button>
    </div>
  );
}
