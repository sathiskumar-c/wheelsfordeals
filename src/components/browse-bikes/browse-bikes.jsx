import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Button } from "@mui/material";
import "./browse-bikes.scss";
import JSON from "../../data/browse-bikes.json";

// Reusable component for rendering data
const AppendData = ({ data, renderItem }) => {
  return (
    <>
      {data.map((item, index) => (
        <React.Fragment key={item.id}>
          {renderItem({ item, index })}
        </React.Fragment>
      ))}
    </>
  );
};

// Specific render functions for Price, CC, and Brand
const renderPriceOrCC = ({ item }) => (
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
);

const renderBrand = ({ item }) => (
  <div className="append-brand-parent" id={item.id}>
    <Link
      to={`brands/${item.path}`}
      className="brand-link"
      aria-label={`View bikes from ${item.alt}`}
    >
      <img
        className="append-brand-img"
        id={item.id}
        src={item.image}
        alt={item.alt}
        title={item.alt}
        loading="lazy"
        onError={(e) => {
          e.target.src = "/default-image.jpg";
          console.error(`Image failed to load: ${item.image}`);
        }}
      />
    </Link>
  </div>
);

const BrowseBikesBy = () => {
  const [tabValue, setTabValue] = useState("brand");

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const tabs = [
    {
      label: JSON.browsebybrand.tabtitle,
      value: JSON.browsebybrand.value,
      data: JSON.browsebybrand.data,
      render: renderBrand,
    },
    {
      label: JSON.browsebyprice.tabtitle,
      value: JSON.browsebyprice.value,
      data: JSON.browsebyprice.data,
      render: renderPriceOrCC,
    },
    {
      label: JSON.browsebydisplacement.tabtitle,
      value: JSON.browsebydisplacement.value,
      data: JSON.browsebydisplacement.data,
      render: renderPriceOrCC,
    },
  ];

  return (
    <section
      className="container component-parent browsebikesby-parent"
      aria-labelledby="browse-bikes"
      role="region"
    >
      <h2 className="section-title" id="browse-bikes-section">
        {JSON.title}
      </h2>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChangeTab}
              aria-label="Browse bikes by categories"
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  value={tab.value}
                  aria-controls={`tabpanel-${tab.value}`}
                />
              ))}
            </TabList>
          </Box>
          {tabs.map((tab) => (
            <TabPanel
              key={tab.value}
              className="tabpanel"
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
