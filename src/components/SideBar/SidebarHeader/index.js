import React from "react";
import { Box, Typography } from "@mui/material";
import CustomAvatar from "../../CustomAvatar";
import IconButton from "@mui/material/IconButton";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ShieldIcon from "@mui/icons-material/Shield";
const SidebarHeader = ({ user }) => {
  return (
    <Box className="side-bar-header-root">
      <Box className="user-root">
        <Box className="header-avatar-root">
          <CustomAvatar src={user.profile_picture} />
        </Box>
        <Box className="custom-user-info">
          <Typography
            className="user-title"
            component="h6"
            variant="h6"
            sx={{ marginLeft: "5px", color: "white", fontSize: "15px" }}
          >
            {user.first_name}
          </Typography>
          <Box className="custom-buttons">
            <IconButton
              sx={{
                backgroundColor: "black",
                opacity: "0.7",
                marginRight: "10px",
                "&:hover": {
                  color: "white",
                  opacity: "1",
                  backgroundColor: "black",
                },
              }}
            >
              <ManageSearchIcon
                sx={{
                  "& > *": {
                    color: "white",
                    opacity: "1",
                  },
                }}
              />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: "black",
                opacity: "0.7",
                marginRight: "10px",
                "&:hover": {
                  color: "white",
                  opacity: "1",
                  backgroundColor: "black",
                },
              }}
            >
              <BusinessCenterIcon
                sx={{
                  "& > *": {
                    color: "white",
                    opacity: "1",
                  },
                }}
              />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: "black",
                opacity: "0.7",
                marginRight: "10px",
                "&:hover": {
                  color: "white",
                  opacity: "1",
                  backgroundColor: "black",
                },
              }}
            >
              <ShieldIcon
                sx={{
                  "& > *": {
                    color: "white",
                    opacity: "1",
                  },
                }}
              />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarHeader;
