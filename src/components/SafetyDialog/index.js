import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import FlagIcon from "@mui/icons-material/Flag";
import ShieldIcon from "@mui/icons-material/Shield";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "420px",
    display: "flex",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
    justifyContent: "center",
  },
}));

const SafetyDialog = ({ dialogStatus, handleClose }) => {
  return (
    <Box>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={dialogStatus}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, fontWeight: "800", textAlign: "center" }}
        >
          Safety Toolkit
        </DialogTitle>
        <DialogContent dividers>
          <FlagIcon
            sx={{
              marginRight: "10px",
              "& > *": {
                color: "#fd267a",
                opacity: "1",
              },
            }}
          />
          <Typography gutterBottom sx={{ color: "black", fontWeight: "550" }}>
            Report
          </Typography>
        </DialogContent>
        <DialogContent dividers>
          <ShieldIcon
            sx={{
              marginRight: "10px",
              "& > *": {
                color: "#00f",
                opacity: "1",
              },
            }}
          />
          <Typography gutterBottom sx={{ color: "black", fontWeight: "550" }}>
            Safety Tips
          </Typography>
        </DialogContent>
        <DialogActions className="cancel-btn">
          <Button
            autoFocus
            onClick={handleClose}
            sx={{ color: "black", fontWeight: "800" }}
          >
            CANCEL
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
};

export default SafetyDialog;
