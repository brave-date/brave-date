import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import Picker from "emoji-picker-react";
import PropTypes from "prop-types";

import Popover from "@mui/material/Popover";

const EmojiPicker = ({ onPickEmoji }) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const onEmojiClick = (event, emojiObject) => {
    onPickEmoji(emojiObject.emoji);
    setShowEmoji(!showEmoji);
  };

  return (
    <Box className="emoji-picker">
      <IconButton onClick={() => setShowEmoji(!showEmoji)}>
        <InsertEmoticonIcon />
      </IconButton>
      <Popover
        id={"user-popover"}
        open={showEmoji}
        className="user-popover"
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Picker onEmojiClick={onEmojiClick} />
      </Popover>
    </Box>
  );
};

export default EmojiPicker;

EmojiPicker.prototype = {
  onPickEmoji: PropTypes.func,
};
