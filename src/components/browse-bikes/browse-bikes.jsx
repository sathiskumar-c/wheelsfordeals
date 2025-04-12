import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  return (
    <>
      {data.map((item, index) => (
        <React.Fragment key={item.id}>
          {renderItem({ item, navigate, index })}
        </React.Fragment>
      ))}
    </>
  );
};

// Specific render functions
const renderPriceOrCC = ({ item, navigate }) => (
  <Button key={item.id} onClick={() => navigate(item.path)} variant="outlined">
    {item.title}
  </Button>
);

const renderBrand = ({ item, navigate }) => (
  <div
    className="append-brand-parent"
    key={item.id}
    id={item.id}
    onClick={() => navigate(item.path)}
  >
    <img
      className="append-brand-img"
      id={item.id}
      src={item.image}
      alt={item.alt}
      title={item.alt}
      onError={(e) => {
        e.target.src = "/default-image.jpg";
        console.error(`Image failed to load: ${item.image}`);
      }}
    />
  </div>
);

const BrowseBikesBy = () => {
  const [tabValue, setTabValue] = useState("brand");

  const handleChangeTab = (event, newValue) => {
    console.log("newValue", newValue);
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
    <div className="container component-parent browsebikesby-parent">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <h3 className="section-title">{JSON.title}</h3>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChangeTab} aria-label="browse bikes by">
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </TabList>
          </Box>
          {tabs.map((tab) => {
            console.log("tab", tab);
            return (
              <TabPanel
                key={tab.value}
                className="tabpanel"
                style={{
                  columnGap: tab.value == "brand" ? "30px" : "15px",
                  rowGap: tab.value == "brand" ? "20px" : "10px",
                }}
                value={tab.value}
              >
                <AppendData data={tab.data} renderItem={tab.render} />
              </TabPanel>
            );
          })}
        </TabContext>
      </Box>
    </div>
  );
};

export default BrowseBikesBy;
