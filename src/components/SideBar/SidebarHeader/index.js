import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import CustomAvatar from "../../CustomAvatar";
import IconButton from "@mui/material/IconButton";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ShieldIcon from "@mui/icons-material/Shield";
import SafetyDialog from "../../SafetyDialog";
import { useDispatch } from "react-redux";
import Popover from "@mui/material/Popover";

import ProfileDetail from "../ProfileDetail";

import { uploadProfilePicture } from "../../../api/AuthAPI";

import { useDropzone } from "react-dropzone";

const SidebarHeader = ({ user }) => {
  const [dialogStatus, setDialogStatus] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userStatus, setUserStatus] = React.useState(user.chat_status);

  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: (file) => {
      dispatch(uploadProfilePicture(file));
    },
  });

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getStatusColor = () => {
    if (!userStatus) {
      return "#c1c1c1";
    }
    switch (userStatus.toLowerCase()) {
      case "online":
        return "#8DCD03";
      case "busy":
        return "#FF8C00";
      case "don't disturb":
        return "#E00930";
      default:
        return "#C1C1C1";
    }
  };
  const openSafetyDialog = () => {
    setDialogStatus(true);
  };

  const closeSafetyDialog = () => {
    setDialogStatus(false);
  };

  return (
    <Box className="side-bar-header-root">
      <Box className="user-root">
        <Box className="header-avatar-root" onClick={handleClick}>
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
              onClick={openSafetyDialog}
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
          <SafetyDialog
            dialogStatus={dialogStatus}
            handleClose={closeSafetyDialog}
          />
        </Box>
      </Box>
      <Popover
        id={"user-popover"}
        open={Boolean(anchorEl)}
        className="user-popover"
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box p={{ xs: 2, md: 3 }}>
          <Box className="user-root">
            <input {...getInputProps()} />
            <IconButton className="icon-btn-root" {...getRootProps()}>
              <CustomAvatar
                src={user.profile_picture ? user.profile_picture : ""}
              />
            </IconButton>
            <Box className="custom-user-info">
              <Typography className="user-title" component="h3" variant="h6">
                {user.first_name}
              </Typography>
              <Typography className="user-sub-title" component="span">
                {user.bio ? user.bio.substring(0, 30) + "..." : ""}
              </Typography>
            </Box>
          </Box>
          <ProfileDetail
            currentUser="true"
            user={user}
            userStatus={userStatus}
            setUserStatus={setUserStatus}
            statusColor={getStatusColor()}
          />
        </Box>
      </Popover>
    </Box>
  );
};

export default SidebarHeader;
