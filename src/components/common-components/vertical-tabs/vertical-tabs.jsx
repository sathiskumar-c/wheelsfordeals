import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function TabPanel(props) {
  const { children, value, index, panelId, tabId, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={panelId}
      aria-labelledby={tabId}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  panelId: PropTypes.string.isRequired,
  tabId: PropTypes.string.isRequired,
};

function VerticalTabs({ data }) {
  const [value, setValue] = React.useState(0);
  const { title, ariaLabel, categories } = data;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "background.paper", minHeight: 400 }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label={ariaLabel}
        sx={{ borderRight: 1, borderColor: "divider", minWidth: 200 }}
      >
        {categories.map((cat, index) => (
          <Tab
            label={cat.category}
            key={index}
            id={cat.tabId}
            aria-controls={cat.panelId}
          />
        ))}
      </Tabs>

      {categories.map((cat, index) => (
        <TabPanel
          value={value}
          index={index}
          key={index}
          panelId={cat.panelId}
          tabId={cat.tabId}
        >
          <Typography variant="h6" gutterBottom>
            {cat.category}
          </Typography>

          {cat.question_answer?.map((res, idx) => (
            <Accordion key={idx} id={res.panelId}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={res.ariaControls}
                id={res.id}
              >
                <Typography component="span">{res.question}</Typography>
              </AccordionSummary>
              <AccordionDetails
                id={res.ariaControls}
                aria-labelledby={res.ariaLabelledby}
              >
                <Typography>{res.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </TabPanel>
      ))}
    </Box>
  );
}

export default VerticalTabs;
