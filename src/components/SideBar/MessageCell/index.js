import React from "react";
import { Badge, Box } from "@mui/material";
import CustomAvatar from "../../CustomAvatar";
import "../style.css";
import Typography from "@mui/material/Typography";

const MessageCell = ({ data, onMessageSelect }) => {
  const getBadgeStatusClass = () => {
    if (data.user_status === "online") {
      return "badge-online";
    }

    if (data.user_status === "away") {
      return "badge-away";
    }

    return "badge-offline";
  };

  return (
    <Box className="chat-cell-item" onClick={() => onMessageSelect(data)}>
      <Box className="chat-avatar-root">
        <Badge
          classes={{ root: "status-dot", badge: getBadgeStatusClass() }}
          variant="dot"
        >
          <CustomAvatar src={data.profile_picture} alt={data.first_name} />
        </Badge>
      </Box>
      <Box className="chat-cell-info">
        <Box display="flex" alignItems="center">
          <Typography
            component="div"
            variant="subtitle2"
            className="title-root"
          >
            {data.first_name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MessageCell;
