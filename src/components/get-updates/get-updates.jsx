import * as React from "react";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Alert, Stack } from "@mui/material";
import "./get-updates.scss";

const GetUpdates = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleJoinUs = (event) => {
    event.preventDefault();

    // Basic email validation
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    toast.success("Thank you for subscribing!");
    setSubscribed(true);
  };

  return (
    <>
      <section className="get-updates component-parent">
        <h3 className="title section-title pb-0">Get Updates</h3>
        <p className="subtitle">
          Receive pricing updates, shopping tips &amp; more!
        </p>

        {!subscribed && (
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
            }}
            onSubmit={handleJoinUs}
          >
            <>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                inputProps={{ "aria-label": "email input" }}
              />

              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton
                color="primary"
                sx={{ p: "10px" }}
                aria-label="submit"
                type="submit"
              >
                <ArrowForwardIcon />
              </IconButton>
            </>
          </Paper>
        )}

        {subscribed == true && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert
              iconMapping={{
                success: <CheckCircleOutlineIcon fontSize="inherit" />,
              }}
            >
              Thank you for subscribing! You'll now receive updates and offers.
            </Alert>
          </Stack>
        )}
      </section>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default GetUpdates;
