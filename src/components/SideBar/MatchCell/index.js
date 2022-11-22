import React from "react";
import Box from "@mui/material/Box";

const ChatUserCell = ({ data, onMatchSelect }) => {
  return (
    <Box className="match-cell-item" onClick={() => onMatchSelect(data)}>
      <Box className="match-cell-image">
        <img src="image" alt="like match" />
      </Box>
    </Box>
  );
};

export default ChatUserCell;
