// reacct imports
import React, { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// material ui imports
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  IconButton,
  Slide,
} from "@mui/material";

// icons import
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CloseIcon from "@mui/icons-material/Close";

// toast imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// local imports
import "../need-help/need-help.scss";
import JSON from "../../../src/data/need-help.json";

// dialog transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// icons render
const ICON_MAP = {
  whatsapp: WhatsAppIcon,
  helpline: HeadsetMicIcon,
  questionmark: QuestionMarkIcon,
};

// error messages
const ERROR_MESSAGES = {
  NAME_REQUIRED: "Name is required.",
  MOBILE_INVALID: "Mobile number must be exactly 10 digits.",
  EMAIL_INVALID: "Please enter a valid email address.",
};

// form validation
const validateForm = ({ name, mobile, email }) => {
  const errors = {};
  if (!name) errors.name = ERROR_MESSAGES.NAME_REQUIRED;
  if (!/^\d{10}$/.test(mobile)) errors.mobile = ERROR_MESSAGES.MOBILE_INVALID;
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = ERROR_MESSAGES.EMAIL_INVALID;
  return errors;
};

const NeedHelp = () => {
  // nvigate
  const navigate = useNavigate();

  // react local states
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mobileError, setMobileError] = useState("");
  const [nameError, setNameError] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // open dialog
  const handleDialogOpen = useCallback(() => setDialogOpen(true), []);

  // close dialog and set state default
  const handleDialogClose = useCallback(() => {
    setDialogOpen(false);
    setMobile("");
    setName("");
    setEmail("");
    setMobileError("");
    setNameError("");
  }, []);

  //submit
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const errors = validateForm({ name, mobile, email });

      setNameError(errors.name || "");
      setMobileError(errors.mobile || "");
      if (errors.email) {
        toast.error(errors.email);
        return;
      }
      if (errors.name || errors.mobile) return;

      const data = { name, mobile, email };
      setMobile("");
      setName("");
      setEmail("");
      toast.success("Our team will contact you shortly!");
      console.log("Form Data:", data);
      handleDialogClose();
    },
    [name, mobile, email, handleDialogClose]
  );

  // useeffect
  useEffect(() => {
    if (dialogOpen) {
      const firstInput = document.querySelector('input[name="name"]');
      firstInput?.focus();
    }
  }, [dialogOpen]);

  // icons and title render
  const helpOptions =
    JSON?.needhelpdata?.map((option) => {
      const isDialog = option.path === "callback";
      const IconComponent = ICON_MAP[option.icon];
      const commonContent = (
        <>
          <div className="icon" aria-hidden="true">
            {IconComponent && <IconComponent />}
          </div>
          <div className="text">
            <h3>{option.title}</h3>
            <p>{option.description}</p>
          </div>
          <div className="arrow">
            <KeyboardArrowRightIcon />
          </div>
        </>
      );

      return isDialog ? (
        <button
          key={option.title}
          onClick={handleDialogOpen}
          className="help-card"
          aria-label={`Request a Callback`}
          style={{ border: "unset" }}
        >
          {commonContent}
        </button>
      ) : (
        <Link
          key={option.title}
          to={option.path}
          className="help-card"
          aria-label={`Navigate to ${option.title}`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") navigate(option.path);
          }}
        >
          {commonContent}
        </Link>
      );
    }) || [];

  return (
    <section
      className="help-section component-parent"
      role="region"
      aria-labelledby="need-help-title"
    >
      <h3 className="section-title text-center" id="need-help-title">
        {JSON.title || "Need Help?"}
      </h3>

      <div className="help-options">{helpOptions}</div>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="md"
        disableEscapeKeyDown
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="callback-dialog-title"
        aria-describedby="callback-dialog-description"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{ m: 0, p: 2 }} id="callback-dialog-title">
            Request a Callback
            <IconButton
              aria-label="close"
              onClick={handleDialogClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <DialogContentText
              id="callback-dialog-description"
              className="mb-3"
            >
              Please enter your details and we will get in touch with you
              shortly.
            </DialogContentText>
            <div>
              <TextField
                required
                name="name"
                label="Full Name"
                type="text"
                fullWidth
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!nameError}
                helperText={nameError}
                aria-label="Full Name"
                aria-describedby={nameError ? "name-error" : undefined}
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.preventDefault();
                }}
                sx={{ mb: 2 }}
              />
              {nameError && (
                <span id="name-error" className="sr-only">
                  {nameError}
                </span>
              )}
              <TextField
                required
                name="mobile"
                label="Mobile Number"
                type="tel"
                fullWidth
                variant="outlined"
                value={mobile}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setMobile(value);
                    setMobileError(
                      value.length !== 10 && value.length > 0
                        ? ERROR_MESSAGES.MOBILE_INVALID
                        : ""
                    );
                  } else {
                    setMobileError("Only numbers are allowed.");
                  }
                }}
                error={!!mobileError}
                helperText={mobileError}
                aria-label="Mobile Number"
                aria-describedby={mobileError ? "mobile-error" : undefined}
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.preventDefault();
                }}
                sx={{ mb: 2 }}
              />
              {mobileError && (
                <span id="mobile-error" className="sr-only">
                  {mobileError}
                </span>
              )}
              <TextField
                name="email"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email"
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.preventDefault();
                }}
                sx={{ mb: 2 }}
              />
            </div>
          </DialogContent>
          <DialogActions className="my-2" style={{ paddingRight: "25px" }}>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              aria-label="Submit Request"
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <ToastContainer />
    </section>
  );
};

export default NeedHelp;
