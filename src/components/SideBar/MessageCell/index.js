import React from "react";
import Box from "@mui/material/Box";

const MessageCell = ({ data, onMessageSelect }) => {
  return (
    <Box className="match-cell-item" onClick={() => onMessageSelect(data)}>
      <Box className="match-cell-image">
        <img src="image" alt="message cell" />
      </Box>
    </Box>
  );
};

export default MessageCell;
