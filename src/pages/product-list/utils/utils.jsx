import { useState } from "react";
import {
  Button,
  Popover,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Box,
} from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import SwapVertIcon from "@mui/icons-material/SwapVert";

import "./utils.scss";

const sortOptions = [
  {
    label: "",
    options: [{ label: "Recently Posted", value: "recently_posted" }],
  },
  {
    label: "PRICE",
    options: [
      { label: "Price (Low to High)", value: "price_low_to_high" },
      { label: "Price (High to Low)", value: "price_high_to_low" },
    ],
  },
  {
    label: "KMS DRIVEN",
    options: [
      { label: "Mileage (Low to High)", value: "mileage_low_to_high" },
      { label: "Mileage (High to Low)", value: "mileage_high_to_low" },
    ],
  },
  {
    label: "BIKES MODEL",
    options: [
      { label: "Year (Newest to Oldest)", value: "year_new_to_old" },
      { label: "Year (Oldest to Newest)", value: "year_old_to_new" },
    ],
  },
  {
    label: "ENGINE CAPACITY",
    options: [
      { label: "CC (High to Low)", value: "engine_high_to_low" },
      { label: "CC (Low to High)", value: "engine_low_to_high" },
    ],
  },
  {
    label: "OTHERS",
    options: [{ label: "Brand (A - Z)", value: "brand_a_to_z" }],
  },
];

export const SortOptionsPopover = ({ sort, setSort }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (event) => {
    setSort(event.target.value);
    handleClose();
  };

  const selectedLabel =
    sortOptions
      .flatMap((item) => ("options" in item ? item.options : [item]))
      .find((o) => o.value === sort)?.label || "Sort";

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClick}
        endIcon={open ? <ArrowDropUp /> : <ArrowDropDown />}
        className="sort_btn"
      >
        <SwapVertIcon />
        {selectedLabel}
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        PaperProps={{ sx: { width: 280, p: 2 } }}
      >
        <Typography variant="sortby" sx={{ mb: 1 }}>
          Sort By
        </Typography>
        <RadioGroup value={sort} onChange={handleChange}>
          {sortOptions.map((item, idx) => (
            <Box key={idx}>
              {"options" in item ? (
                <>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 1, mb: 0.5 }}
                    style={{ width: "100%", display: "block" }}
                  >
                    {item.label}
                  </Typography>
                  {item.options.map((opt) => (
                    <FormControlLabel
                      key={opt.value}
                      value={opt.value}
                      control={<Radio size="small" />}
                      label={opt.label}
                    />
                  ))}
                  {idx < sortOptions.length - 1 && <Divider sx={{ my: 1 }} />}
                </>
              ) : (
                <FormControlLabel
                  value={item.value}
                  control={<Radio size="small" />}
                  label={item.label}
                />
              )}
            </Box>
          ))}
        </RadioGroup>
      </Popover>
    </>
  );
};

// Utility function to throttle scroll handler
export const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function (...args) {
    if (!lastRan) {
      func(...args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};
