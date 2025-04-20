// react imports
import React, { useState, useEffect } from "react";
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
  // navigate
  const navigate = useNavigate();

  // react local states for form
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
  });

  //error value holding state
  const [formErrors, setFormErrors] = useState({
    name: "",
    mobile: "",
    email: "",
  });

  // open dialog
  const handleDialogOpen = () => setDialogOpen(true);

  // close dialog and reset state
  const handleDialogClose = () => {
    setDialogOpen(false);
    setFormData({ name: "", mobile: "", email: "" });
    setFormErrors({ name: "", mobile: "", email: "" });
  };

  // handle form change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  //handle form blur
  const handleFormBlur = (e) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "email") {
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = ERROR_MESSAGES.EMAIL_INVALID;
      }
    }

    if (name === "mobile") {
      if (value && !/^\d{10}$/.test(value)) {
        error = ERROR_MESSAGES.MOBILE_INVALID;
      }
    }

    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  // submit button click
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    toast.success("Our team will contact you shortly!");
    setFormData({ name: "", mobile: "", email: "" });
    handleDialogClose();
  };

  // focus on first input when dialog opens
  useEffect(() => {
    if (dialogOpen) {
      const firstInput = document.querySelector('input[name="name"]');
      firstInput?.focus();
    }
  }, [dialogOpen]);

  // render help options
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
        onClose={() => {}}
        fullWidth
        maxWidth="md"
        disableEscapeKeyDown
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="callback-dialog-title"
        aria-describedby="callback-dialog-description"
        PaperProps={{
          onClick: (e) => e.stopPropagation(), // prevent accidental bubbling
        }}
        BackdropProps={{
          onClick: (e) => e.stopPropagation(), // block outside click
        }}
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
            <React.Fragment>
              <TextField
                required
                name="name"
                label="Full Name"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.name}
                onChange={handleFormChange}
                onBlur={(e) => {
                  const val = e.target.value.trim();
                  if (!val) {
                    setFormErrors((prev) => ({
                      ...prev,
                      name: "Name is required.",
                    }));
                  } else {
                    setFormErrors((prev) => ({
                      ...prev,
                      name: "",
                    }));
                  }
                }}
                error={!!formErrors.name}
                helperText={formErrors.name}
                aria-label="Full Name"
                aria-describedby={formErrors.name ? "name-error" : undefined}
                sx={{ mb: 2 }}
              />

              <TextField
                name="mobile"
                label="Mobile Number"
                type="tel"
                fullWidth
                variant="outlined"
                value={formData.mobile}
                required
                onChange={(e) => {
                  const val = e.target.value;
                  // Only allow digits
                  if (/^\d*$/.test(val)) {
                    setFormData({ ...formData, mobile: val });

                    // Don't show error while typing
                    // Clear error only if already error and now correct
                    if (formErrors.mobile && val.length === 10) {
                      setFormErrors({ ...formErrors, mobile: "" });
                    }
                  }
                }}
                onBlur={(e) => {
                  const val = e.target.value;
                  if (!val) {
                    setFormErrors({
                      ...formErrors,
                      mobile: "Mobile number is required",
                    });
                  } else if (val.length !== 10) {
                    setFormErrors({
                      ...formErrors,
                      mobile: ERROR_MESSAGES.MOBILE_INVALID,
                    });
                  } else {
                    setFormErrors({ ...formErrors, mobile: "" });
                  }
                }}
                error={!!formErrors.mobile}
                helperText={formErrors.mobile}
                inputProps={{
                  maxLength: 10,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={formData.email}
                onChange={handleFormChange}
                onBlur={handleFormBlur}
                error={!!formErrors.email}
                helperText={formErrors.email}
                sx={{ mb: 2 }}
              />
            </React.Fragment>
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

      <ToastContainer aria-live="assertive" />
    </section>
  );
};

export default NeedHelp;
