// React Imports
import { useState } from "react";

// Local Imports
import JSON from "../../data/contactus-query.json";
import "./contactus-query.scss";

// Toastify Imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// MUI imports
import { useTheme } from "@mui/material/styles";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Box,
  TextField,
  Button,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selectedNames, theme) {
  return {
    fontWeight: selectedNames.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const ContactUsQuery = () => {
  // Hook Variables
  const theme = useTheme();

  // State Management
  const [formData, setFormData] = useState({
    queryType: [],
    queryDescription: "",
    name: "",
    mobile: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  // Select Query Change
  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData((prev) => ({
      ...prev,
      queryType: typeof value === "string" ? value.split(",") : value,
    }));
  };

  // Input Form Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Restrict mobile input to digits only and max 10 digits
    if (name === "mobile") {
      if (/^\d*$/.test(value) && value.length <= 10) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // All Valitations
  const validate = () => {
    const newErrors = {};
    if (!formData.queryType.length)
      newErrors.queryType = "Query type is required.";
    if (!formData.queryDescription)
      newErrors.queryDescription = "Please describe your query.";
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required.";
    } else if (formData.mobile.length !== 10) {
      newErrors.mobile = "Mobile number must be exactly 10 digits.";
    }
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", formData);
      toast.success("Thank you");
      // Reset form or show success message if needed
    }
  };

  return (
    <section className="contactus-query container">
      <div className="query-wrapper row">
        {/* Left Column - Form */}
        <div className="query-left col-md-5">
          <h2 className="text-center">{JSON.leftTitle}</h2>
          <form className="query-form" onSubmit={handleSubmit}>
            {JSON.formFields.map((field, index) => {
              if (field.type === "select") {
                return (
                  <FormControl
                    key={index}
                    fullWidth
                    error={Boolean(errors[field.name])}
                  >
                    <InputLabel>{field.placeholder}</InputLabel>
                    <Select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleSelectChange}
                      input={<OutlinedInput label={field.placeholder} />}
                      renderValue={(selected) => (
                        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                          {selected.map((value) => (
                            <MenuItem key={value} label={value}>
                              {value}
                            </MenuItem>
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {field.options?.map((option) => (
                        <MenuItem
                          key={option.id}
                          value={option.title}
                          style={getStyles(
                            option.title,
                            formData[field.name],
                            theme
                          )}
                        >
                          {option.title}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors[field.name] && (
                      <Box className="error-text">{errors[field.name]}</Box>
                    )}
                  </FormControl>
                );
              }

              if (field.type === "textarea") {
                return (
                  <TextField
                    key={index}
                    fullWidth
                    multiline
                    minRows={4}
                    name={field.name}
                    label={field.placeholder}
                    variant="outlined"
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    error={Boolean(errors[field.name])}
                    helperText={errors[field.name]}
                    sx={{ mb: 2 }}
                  />
                );
              }

              return (
                <TextField
                  key={index}
                  fullWidth
                  type={field.type}
                  label={field.placeholder}
                  variant="outlined"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  error={Boolean(errors[field.name])}
                  helperText={errors[field.name]}
                  sx={{ mb: 2 }}
                />
              );
            })}

            <Button variant="contained" color="primary" type="submit">
              {JSON.buttonText}
            </Button>
          </form>
        </div>

        {/* Right Column - Office Info */}
        <div className="query-right col-md-5">
          <h2 className="text-center">{JSON.rightTitle}</h2>
          {JSON.offices.map((office, index) => (
            <div key={index} className="office-block">
              <p className="office-heading">🏢 {office.heading}</p>
              <p className="office-company mb-0">{office.company}</p>
              <p className="office-address">{office.address}</p>
              <a
                href={office.mapUrl}
                className="office-map-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {office.mapLabel} <span>›</span>
              </a>
            </div>
          ))}

          {/* Embedded Map */}
          <div className="map-embed">
            <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15548.988891179508!2d80.2098277837533!3d13.019922502999442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52671aa10c448b%3A0xf62cad8de2391803!2sSaidapet%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1748374129388!5m2!1sen!2sin"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
};

export default ContactUsQuery;
