// React Imports
import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Material UI Imports
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Button } from "@mui/material";

// Local Imports
import "./browse-bikes.scss";
import JSON from "../../data/browse-bikes.json";

// Reusable component for rendering data
const AppendData = ({ data, renderItem }) => {
  return (
    <>
      {data.map((item) => (
        <React.Fragment key={item.id}>{renderItem({ item })}</React.Fragment>
      ))}
    </>
  );
};

// Specific render functions for Price, CC, and Brand
const renderPriceOrCC = ({ item }) => (
  <article>
    <Button
      key={item.id}
      component={Link}
      to={item.path}
      variant="outlined"
      aria-label={`Browse bikes by ${item.title}`}
      className="browsebybikes_btn"
    >
      {item.title}
    </Button>
  </article>
);

const renderBrand = ({ item }) => (
  <article
    className="append-brand-parent"
    id={item.id}
    aria-label={`Bike brand: ${item.alt || item.title}`}
  >
    <Link
      to={`/bikes/brands/${item.path}`}
      className="brand-link"
      aria-label={`View bikes from brand ${item.alt || item.title}`}
    >
      <img
        className="append-brand-img"
        id={`img-${item.id}`}
        src={item.image}
        alt={item.alt ? `Logo of ${item.alt}` : "Brand logo"}
        title={item.alt || "Brand"}
        loading="lazy"
        onError={(e) => {
          e.target.src = "/default-image.jpg";
          console.error(`Image failed to load: ${item.image}`);
        }}
      />
    </Link>
  </article>
);

const BrowseBikesBy = () => {
  // State management
  const [tabValue, setTabValue] = useState("brand");

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const tabs = [
    {
      label: JSON.browsebybrand?.tabtitle || "Brands",
      value: JSON.browsebybrand?.value || "brand",
      data: JSON.browsebybrand?.data || [],
      render: renderBrand,
    },
    {
      label: JSON.browsebyprice?.tabtitle || "Price",
      value: JSON.browsebyprice?.value || "price",
      data: JSON.browsebyprice?.data || [],
      render: renderPriceOrCC,
    },
    {
      label: JSON.browsebydisplacement?.tabtitle || "Displacement",
      value: JSON.browsebydisplacement?.value || "displacement",
      data: JSON.browsebydisplacement?.data || [],
      render: renderPriceOrCC,
    },
  ];

  return (
    <section
      className="container component-parent browsebikesby-parent"
      aria-labelledby="browse-bikes-section"
      role="region"
    >
      <h2 className="section-title" id="browse-bikes-section">
        {JSON.title || "Browse Bikes By"}
      </h2>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }} component="nav">
            <TabList
              onChange={handleChangeTab}
              aria-label="Select a category to browse bikes by"
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  value={tab.value}
                  aria-controls={`tabpanel-${tab.value}`}
                  id={`tab-${tab.value}`}
                />
              ))}
            </TabList>
          </Box>
          {tabs.map((tab) => (
            <TabPanel
              key={tab.value}
              className={`tabpanel ${
                tabValue === tab.value ? "active-tabpanel" : ""
              }`}
              value={tab.value}
              id={`tabpanel-${tab.value}`}
              role="tabpanel"
              aria-labelledby={`tab-${tab.value}`}
              style={{
                columnGap: tab.value === "brand" ? "30px" : "15px",
                rowGap: tab.value === "brand" ? "20px" : "10px",
              }}
            >
              <AppendData data={tab.data} renderItem={tab.render} />
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </section>
  );
};

export default BrowseBikesBy;
