// React imports
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Material UI imports
import { Box, Typography, Grid, Button, Tabs, Tab, Fade } from "@mui/material";

// Local imports
import "./tabs-component.scss";

const TabsComponent = ({ data, page }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const currentTabKey = data.tabs[tabIndex]?.key; // key to lookup content like "buyBike", "sellBike"
  const tabsData = data[currentTabKey] || [];

  return (
    <section
      className="component-parent tabs-container"
      role="region"
      aria-labelledby={data.aria_labelledby}
    >
      <Box>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          centered
          aria-label={data.aria_label}
        >
          {data.tabs.map((tab, index) => (
            <Tab
              key={tab.id || index}
              className="tab_parent"
              label={tab.label}
              aria-controls={tab.aria_controls}
              id={tab.id}
            />
          ))}
        </Tabs>

        <h2
          id={data.aria_labelledby}
          className="section-title text-center mb-0"
        >
          {data.title}
        </h2>

        <Fade in={true} key={tabIndex} timeout={1000}>
          <div role="tabpanel" id={data.tabs[tabIndex]?.aria_controls}>
            <Grid container spacing={3} justifyContent="center">
              {tabsData.map((res, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={res.id || res.title || index}
                >
                  <article className="tabs-card">
                    <Link
                      to={res.path}
                      aria-label={`Learn more about ${res.title}`}
                      title={res.title}
                    >
                      <img
                        src={res.image}
                        alt={res.alt || `${res.title} illustration`}
                        title={res.title}
                        className="tabs-image"
                        loading="lazy"
                        onError={(e) => {
                          if (e.target) e.target.src = "/images/default.png";
                        }}
                      />
                      <Typography variant="h6" className="tabs-heading">
                        {res.title}
                      </Typography>
                      <Typography variant="body2" className="tabs-description">
                        {res.description}
                      </Typography>
                    </Link>
                  </article>
                </Grid>
              ))}
            </Grid>
          </div>
        </Fade>

        {data.buttons && (
          <Box className="action-buttons">
            <Link to={`/${data.buttons.path}`}>
              <Button
                variant="contained"
                className="primary-btn"
                aria-label={data.buttons.aria_label}
              >
                {data.buttons.label}
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    </section>
  );
};

export default TabsComponent;
