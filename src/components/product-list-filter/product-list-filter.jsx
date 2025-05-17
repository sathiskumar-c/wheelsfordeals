// react imports
import React, { useState } from "react";

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

  return (
    <React.Fragment>
      <div style={{ margin: "10px" }}>
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
