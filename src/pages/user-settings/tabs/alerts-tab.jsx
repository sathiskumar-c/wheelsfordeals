// Reacts Import
import React, { useState } from "react";

// MUI Imports
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Chip,
  Grid,
  Box,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// Utils Component Imports
import FormSelect from "../utils/dropdown-select";

// JSON Imports
import bikeData from "../../../data/bike-alerts.json";
import myAlertsData from "../../../data/my-alerts.json";

export default function AlertsTab() {
  const [alerts, setAlerts] = useState(myAlertsData.alerts);

  const [bikeAlerts, setBikeAlerts] = useState({
    brand: "",
    model: "",
    version: "",
    priceRange: "",
  });

  const handleDeleteAlert = (alertId) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
  };

  const getChipColor = (type) => {
    const colors = {
      "Price Drop": "error",
      "Stock Alert": "success",
      "Test Ride": "primary",
      "Special Offer": "warning",
    };
    return colors[type] || "default";
  };

  // Bike Alerts handler
  const handleBikeAlertsChange = (e) => {
    const { name, value } = e.target;
    setBikeAlerts((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "brand" ? { model: "", version: "", priceRange: "" } : {}),
      ...(name === "model" ? { version: "", priceRange: "" } : {}),
      ...(name === "version" ? { priceRange: "" } : {}),
    }));
  };

  // Get models & versions dynamically
  const selectedBrand = bikeData.brands.find(
    (b) => b.name === bikeAlerts.brand
  );
  const selectedModel = selectedBrand?.models.find(
    (m) => m.name === bikeAlerts.model
  );

  return (
    <div className="alerts-container container">
      <Typography variant="h5" className="section-title pb-2">
        Your Alerts
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Stay updated with your bike alerts and notifications.
      </Typography>

      <Paper elevation={0} className="mt-2">
        <List>
          {alerts.map((alert) => (
            <React.Fragment key={alert.id}>
              <ListItem
                className={`alert-item ${alert.status}`}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteAlert(alert.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Typography variant="subtitle1" className="fw-bold">
                        {alert.bikeName}
                      </Typography>
                      <Chip
                        className="chip-parent"
                        label={alert.type}
                        size="small"
                        color={getChipColor(alert.type)}
                      />
                    </div>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography variant="body2" component="span">
                        {alert.message}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="textSecondary"
                        component="div"
                      >
                        {alert.date}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <ListItem divider />
            </React.Fragment>
          ))}
          {alerts.length === 0 && (
            <ListItem>
              <ListItemText
                primary="No alerts"
                secondary="You don't have any alerts at the moment"
              />
            </ListItem>
          )}
        </List>
      </Paper>

      {/* Bike Alert Form */}
      <form className="settings-form" onSubmit={(e) => e.preventDefault()}>
        <Typography variant="h5" className="form-title" gutterBottom>
          Create a New Alert
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className="form-subtitle"
        >
          Select your preferred bike brand, model, and version to get instant
          alerts.
        </Typography>

        <Grid container spacing={3} className="form-grid">
          <Grid item xs={12} md={6}>
            <FormSelect
              name="brand"
              label="Bike Brand"
              value={bikeAlerts.brand}
              onChange={handleBikeAlertsChange}
              options={bikeData.brands.map((brand) => ({
                value: brand.name,
                label: brand.name,
              }))}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormSelect
              name="model"
              label="Bike Model"
              value={bikeAlerts.model}
              onChange={handleBikeAlertsChange}
              options={
                selectedBrand?.models.map((model) => ({
                  value: model.name,
                  label: model.name,
                })) || []
              }
              disabled={!bikeAlerts.brand}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormSelect
              name="version"
              label="Bike Version"
              value={bikeAlerts.version}
              onChange={handleBikeAlertsChange}
              options={
                selectedModel?.versions.map((version) => ({
                  value: version,
                  label: version,
                })) || []
              }
              disabled={!bikeAlerts.model}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormSelect
              name="priceRange"
              label="Price Range"
              value={bikeAlerts.priceRange}
              onChange={handleBikeAlertsChange}
              options={bikeData.priceRanges.map((range) => ({
                value: range.id,
                label: range.label,
              }))}
            />
          </Grid>
        </Grid>

        <Box className="button-wrapper">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="save-btn"
          >
            Save Alert
          </Button>
        </Box>
      </form>
    </div>
  );
}
