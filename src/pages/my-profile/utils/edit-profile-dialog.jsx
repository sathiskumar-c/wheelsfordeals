import {
    TextField,
    Grid,
    Button,
    Avatar,
    Box,
} from "@mui/material";
import CommonDialog from "../../../components/common-components/dialog/dialog";

const EditProfileDialog = ({
    open,
    onClose,
    values,
    onChange,
    onSave,
}) => {
    const footer = (
        <Button
            variant="contained"
            color="warning"
            onClick={onSave}
            sx={{ px: 3 }}
        >
            Save Changes
        </Button>
    );

    const content = (
        <Box sx={{ mt: 2 }}>
            <Box display="flex" justifyContent="center" mb={3}>
                <Avatar
                    src="https://i.pravatar.cc/100"
                    alt="Profile"
                    sx={{ width: 80, height: 80 }}
                />
            </Box>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={values.firstName}
                        onChange={onChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={values.lastName}
                        onChange={onChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        value={values.email}
                        onChange={onChange}
                        disabled
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={values.phone}
                        onChange={onChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        type="date"
                        label="Date of Birth"
                        name="dob"
                        value={values.dob}
                        onChange={onChange}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
            </Grid>
        </Box>
    );

    return (
        <CommonDialog
            openDialog={open}
            onClose={onClose}
            title="Edit Personal Information"
            content={content}
            footer={footer}
            width="500px"
        />
    );
};

export default EditProfileDialog;
