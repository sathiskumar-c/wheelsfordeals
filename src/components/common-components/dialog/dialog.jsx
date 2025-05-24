// MUI Imports
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// Custom styled dialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    width: "75%",
    margin: 0,
    maxWidth: "none",
  },
}));

// Functional Component
const CommonDialog = ({ openDialog, onClose, title, content, footer }) => {
  return (
    <BootstrapDialog
      fullWidth
      maxWidth={false}
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={openDialog}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>{content}</DialogContent>
      {footer && <DialogActions>{footer}</DialogActions>}
    </BootstrapDialog>
  );
};

export default CommonDialog;
