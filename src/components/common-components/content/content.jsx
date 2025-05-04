import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Content = ({ JSON }) => {
  const { heading, paragraph, image, button, section } = JSON;

  return (
    <Box
      component="section"
      aria-labelledby={section.ariaLabelledBy}
      sx={{
        display: "flex",
        height: "100%",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box
        sx={{
          flex: 1,
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "auto",
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          id={heading.id}
          aria-label={heading.ariaLabel}
          gutterBottom
          tabIndex={0}
          style={{ fontWeight: "bold" }}
        >
          {heading.text}
        </Typography>

        <Typography
          variant="body1"
          paragraph
          aria-label={paragraph.ariaLabel}
          tabIndex={0}
        >
          {paragraph.text}
        </Typography>

        <img
          src={image.src}
          alt={image.alt}
          role="img"
          aria-label={image.ariaLabel}
          width="60%"
          height="auto"
        />

        <Link to={button.path}>
          <Button
            variant="contained"
            color="primary"
            aria-label={button.ariaLabel}
            style={{ width: "fit-content", margin: "auto" }}
          >
            {button.label}
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Content;
