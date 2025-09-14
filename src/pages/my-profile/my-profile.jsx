import React, { useState } from "react";
import { TextField, Button, Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "./my-profile.scss";
import EditProfileDialog from "./utils/edit-profile-dialog";

const MyProfile = () => {
    const [formData, setFormData] = useState({
        firstName: "Natashia",
        lastName: "Khaleira",
        dob: "1990-10-12",
        email: "info@binary-fusion.com",
        phone: "+62 821 2554 5846",
        role: "Admin",
        country: "United Kingdom",
        city: "Leeds, East London",
        postalCode: "ERT 1254",
    });
    const [openDialog, setOpenDialog] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = () => {
        console.log("Saved data:", formData);
        setOpenDialog(false);
    };

    return (
        <div className="profile-container">
            {/* Profile Header */}
            <header className="profile-header">
                <Avatar
                    alt={`${formData.firstName} ${formData.lastName}`}
                    src="https://i.pravatar.cc/150?img=12"
                    sx={{ width: 80, height: 80 }}
                />
                <div>
                    <h1 tabIndex="0">{`${formData.firstName} ${formData.lastName}`}</h1>
                    <p role="text" aria-label="User Role">
                        {formData.role}
                    </p>
                </div>
            </header>

            {/* Personal Info Section */}
            <section className="profile-section" aria-labelledby="personal-info-heading">
                <div className="section-header">
                    <h2 id="personal-info-heading">Personal Information</h2>
                    <Button
                        variant="contained"
                        color="warning"
                        startIcon={<EditIcon />}
                        onClick={() => {
                            setOpenDialog(true)
                        }}
                        aria-label="Edit personal information"
                    >
                        Edit
                    </Button>
                </div>

                <div className="profile-form">
                    <TextField
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Date of Birth"
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                </div>
            </section>

            {/* Address Section */}
            <section className="profile-section" aria-labelledby="address-heading">
                <div className="section-header">
                    <h2 id="address-heading">Address</h2>
                    <Button
                        variant="contained"
                        color="warning"
                        startIcon={<EditIcon />}
                        onClick={handleSave}
                        aria-label="Edit address information"
                    >
                        Edit
                    </Button>
                </div>

                <div className="profile-form">
                    <TextField
                        label="Country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Postal Code"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                </div>
            </section>

            <EditProfileDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                values={formData}
                onChange={handleChange}
                onSave={handleSave}
            />

        </div>
    );
};

export default MyProfile;
