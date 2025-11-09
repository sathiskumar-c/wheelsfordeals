// Reacts Import
import React, { useState } from "react";

// MUI Imports
import { Tabs, Tab, Box } from "@mui/material";

// Tab Component Imports
import SecurityTab from "./tabs/security-tab";
import NotificationsTab from "./tabs/notifications-tab";
import AlertsTab from "./tabs/alerts-tab";

// Local Imports
import "./user-settings.scss";

export default function UserSettings() {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (_, newValue) => setActiveTab(newValue);

  return (
    <div className="settings-container container">
      {/* Tabs */}
      <Box>
        <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable">
          <Tab label="Security" />
          <Tab label="Notifications" />
          <Tab label="Alerts" />
        </Tabs>
      </Box>

      {/* ---------------- Security ---------------- */}
      {activeTab === 0 && <SecurityTab />}

      {/* ---------------- Notifications ---------------- */}
      {activeTab === 1 && <NotificationsTab />}

      {/* ---------------- Alerts ---------------- */}
      {activeTab === 2 && <AlertsTab />}
    </div>
  );
}
