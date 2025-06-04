// React Imports
import { useState } from "react";

// Material UI Imports
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";

// Icons Imports
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Only for range filter
export const RangeFieldMUI = ({
  filter,
  selectedFilters,
  setSelectedFilters,
}) => {
  // A helper function to format based on filter type
  const formatValue = (value) => {
    if (filter.unit === "price") {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(value);
    } else if (filter.unit === "km") {
      return `${value} km`;
    } else {
      return value; // fallback
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "8px",
          fontWeight: 500,
        }}
      >
        <span>
          {formatValue(selectedFilters[filter.id]?.[0] || filter.min)}
        </span>
        <span>
          {formatValue(selectedFilters[filter.id]?.[1] || filter.max)}
        </span>
      </div>

      {/* Actual Slider */}
      <Slider
        value={selectedFilters[filter.id] || [filter.min, filter.max]}
        onChange={(e, val) =>
          setSelectedFilters((prev) => ({
            ...prev,
            [filter.id]: val,
          }))
        }
        min={filter.min}
        max={filter.max}
        step={filter.step}
        getAriaLabel={() => filter.label}
      />

      {/* Minimum and Maximum labels below the slider */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "8px",
          color: "#888",
        }}
      >
        <span style={{ fontSize: "12px", fontWeight: "bold" }}>Minimum</span>
        <span style={{ fontSize: "12px", fontWeight: "bold" }}>Maximum</span>
      </div>
    </div>
  );
};

export const CheckboxMUI = ({
  filter,
  selectedFilters,
  setSelectedFilters,
}) => {
  const handleChange = (event) => {
    const { value, checked } = event.target;
    setSelectedFilters((prev) => {
      const currentValues = prev[filter.id] || [];
      if (checked) {
        return {
          ...prev,
          [filter.id]: [...currentValues, value],
        };
      } else {
        return {
          ...prev,
          [filter.id]: currentValues.filter((item) => item !== value),
        };
      }
    });
  };

  return (
    <FormGroup>
      {filter.options.map((option, idx) => (
        <FormControlLabel
          key={idx}
          control={
            <Checkbox
              checked={(selectedFilters[filter.id] || []).includes(option)}
              onChange={handleChange}
              value={option}
            />
          }
          label={option}
        />
      ))}
    </FormGroup>
  );
};

export const BrandFilterMUI = ({
  filter,
  selectedFilters,
  setSelectedFilters,
}) => {
  const [expanded, setExpanded] = useState(false);

  // 🔹 Handle Brand Checkbox
  const handleBrandChange = (slugBrand) => (event) => {
    const { checked } = event.target;
    setSelectedFilters((prev) => {
      const currentBrands = prev.brands || [];
      return {
        ...prev,
        brands: checked
          ? [...currentBrands, slugBrand]
          : currentBrands.filter((b) => b !== slugBrand),
      };
    });
  };

  // 🔹 Handle Model Checkbox (optional if needed)
  const handleModelChange = (brand, model) => (event) => {
    const { checked } = event.target;
    setSelectedFilters((prev) => {
      const currentModels = prev.models || {};
      const brandModels = currentModels[brand] || [];
      return {
        ...prev,
        models: {
          ...currentModels,
          [brand]: checked
            ? [...brandModels, model]
            : brandModels.filter((m) => m !== model),
        },
      };
    });
  };

  return (
    <Box>
      {filter.options.map((option, idx) => {
        const slugBrand = option.slug?.brand?.toLowerCase();

        return (
          <Accordion
            key={idx}
            expanded={expanded === idx}
            onChange={() => setExpanded(expanded === idx ? false : idx)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={(selectedFilters.brands || []).includes(slugBrand)}
                    onChange={handleBrandChange(slugBrand)}
                    onClick={(event) => event.stopPropagation()}
                  />
                }
                label={
                  <Box display="flex" alignItems="center">
                    <img
                      src={option.image}
                      alt={option.brand}
                      style={{ width: 24, height: 24, marginRight: 8 }}
                    />
                    <Typography>{option.brand}</Typography>
                  </Box>
                }
                onClick={(event) => event.stopPropagation()}
              />
            </AccordionSummary>

            {/* Optional: Show models inside brand accordion */}
            <AccordionDetails>
              {option.models?.map((model, modelIdx) => (
                <FormControlLabel
                  key={modelIdx}
                  control={
                    <Checkbox
                      checked={(
                        selectedFilters.models?.[option.brand] || []
                      ).includes(model)}
                      onChange={handleModelChange(option.brand, model)}
                    />
                  }
                  label={model}
                />
              ))}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};
