// React Imports
import { useState } from "react";

// MUI Imports
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

// Local Imports
import "./utils.scss";
import sortOptionsJSON from "../../../data/sort-options.json";

export const SortOptionsPopover = ({ sort, setSort }) => {
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const isPopoverOpen = Boolean(popoverAnchor);
  const sortOptions = sortOptionsJSON.sort;

  const handleButtonClick = (event) => {
    setPopoverAnchor(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
    handlePopoverClose();
  };

  const selectedSortLabel =
    sortOptions
      .flatMap((group) => ("options" in group ? group.options : [group]))
      .find((option) => option.value === sort)?.label || "Sort";

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleButtonClick}
        endIcon={isPopoverOpen ? <ArrowDropUp /> : <ArrowDropDown />}
        className="sort_btn"
      >
        <SwapVertIcon />
        {selectedSortLabel}
      </Button>

      <Popover
        open={isPopoverOpen}
        anchorEl={popoverAnchor}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        PaperProps={{ sx: { width: 280, p: 2 } }}
      >
        <Typography variant="sortby" sx={{ mb: 1 }}>
          Sort By
        </Typography>

        <RadioGroup value={sort} onChange={handleSortChange}>
          {sortOptions.map((group, index) => (
            <Box key={index}>
              {"options" in group ? (
                <>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 1, mb: 0.5 }}
                    style={{ width: "100%", display: "block" }}
                  >
                    {group.label}
                  </Typography>
                  {group.options.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio size="small" />}
                      label={option.label}
                    />
                  ))}
                  {index < sortOptions.length - 1 && <Divider sx={{ my: 1 }} />}
                </>
              ) : (
                <FormControlLabel
                  value={group.value}
                  control={<Radio size="small" />}
                  label={group.label}
                />
              )}
            </Box>
          ))}
        </RadioGroup>
      </Popover>
    </>
  );
};

export default SortOptionsPopover;
