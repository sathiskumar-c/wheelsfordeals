// React Imports
import { useState } from "react";
import { Link } from "react-router-dom";

// Material UI Imports
import { Box, Typography, Grid, Button, Tabs, Tab, Fade } from "@mui/material";

// Local Imports
import "./benefits.scss";
import JSON from "../../data/benefits.json";

const Benefits = () => {
  // State management
  const [tabIndex, setTabIndex] = useState(0);

  // Tab Change
  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const currentBenefits = tabIndex === 0 ? JSON.buyBike : JSON.sellBike;

  return (
    <section
      className="component-parent benefits-container"
      role="region"
      aria-labelledby="benefits-title"
    >
      <Box>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          centered
          className="benefits-tabs"
          aria-label="Buy or Sell Bike Benefits Tabs"
        >
          <Tab
            className="buy_tab"
            label="Buy Bike"
            aria-controls="buy-bike-panel"
            id="buy-tab"
          />
          <Tab
            className="sell_tab"
            label="Sell Bike"
            aria-controls="sell-bike-panel"
            id="sell-tab"
          />
        </Tabs>

        <h2 id="benefits-title" className="section-title text-center mb-0">
          {JSON.title || "Benefits of Buying or Selling Bikes"}
        </h2>

        <Fade in={true} key={tabIndex} timeout={1000}>
          <div
            role="tabpanel"
            id={tabIndex === 0 ? "buy-bike-panel" : "sell-bike-panel"}
            aria-labelledby={tabIndex === 0 ? "buy-tab" : "sell-tab"}
          >
            <Grid container spacing={3} justifyContent="center">
              {currentBenefits.map((benefit) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={benefit.id || benefit.title}
                >
                  <article className="benefit-card">
                    <Link
                      to={benefit.path}
                      className="benefit-link"
                      aria-label={`Learn more about ${benefit.title}`}
                      title={benefit.title}
                    >
                      <img
                        src={benefit.image}
                        alt={
                          benefit.alt || `${benefit.title} benefit illustration`
                        }
                        title={benefit.title}
                        className="benefit-image"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = "/images/default.png";
                        }}
                      />
                      <Typography variant="h6" className="benefit-title">
                        {benefit.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        className="benefit-description"
                      >
                        {benefit.description}
                      </Typography>
                    </Link>
                  </article>
                </Grid>
              ))}
            </Grid>
          </div>
        </Fade>

        <Box className="action-buttons">
          <Link to="/bikes">
            <Button
              variant="contained"
              className="browse-btn"
              aria-label="Browse available bikes"
            >
              Browse Bike
            </Button>
          </Link>
        </Box>
      </Box>
    </section>
  );
};

export default Benefits;
