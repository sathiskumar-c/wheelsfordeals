// react imports
import React, { useState, useEffect } from "react";

// material ui imports
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// local imports
import productListFilterData from "../../data/product-list-filter.json";
import { BrandFilterMUI, CheckboxMUI, RangeFieldMUI } from "./utils/utils";

const ProductListFilter = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleExpansion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const filtersToURL = (filters) => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(","));
      } else if (typeof value === "object" && value !== null) {
        // For nested object like models: { brand1: [a, b], brand2: [] }
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (Array.isArray(subValue) && subValue.length > 0) {
            params.set(`${key}.${subKey}`, subValue.join(","));
          }
        });
      } else if (value && typeof value !== "object") {
        // For scalar values like string or number
        params.set(key, value);
      }
      // else: skip empty array, empty string, or empty object
    });

    return params.toString();
  };

  // ✅ Update URL whenever selectedFilters changes
  useEffect(() => {
    const queryString = filtersToURL(selectedFilters);
    const newURL = `${window.location.pathname}?${queryString}`;
    window.history.replaceState(null, "", newURL);
  }, [selectedFilters]);

  return (
    <React.Fragment>
      <div style={{ margin: "10px" }}>
        <Typography variant="h6" gutterBottom>
          Filter
        </Typography>

        {productListFilterData.map((filter) => (
          <Accordion
            key={filter.id}
            expanded={expanded === filter.id}
            onChange={handleExpansion(filter.id)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{filter.label}</Typography>
            </AccordionSummary>

            <AccordionDetails>
              {filter.type === "range" && (
                <RangeFieldMUI
                  filter={filter}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                />
              )}

              {filter.type === "checkbox" && (
                <CheckboxMUI
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  filter={filter}
                />
              )}

              {filter.type == "accordion" && (
                <BrandFilterMUI
                  filter={filter}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                />
              )}
            </AccordionDetails>
          </Accordion>
        ))}

        <pre
          style={{ marginTop: "10px", background: "#f6f6f6", padding: "10px" }}
        >
          {JSON.stringify(selectedFilters, null, 2)}
        </pre>
      </div>
    </React.Fragment>
  );
};

export default ProductListFilter;
