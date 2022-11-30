import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";

import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import AttachFileIcon from "@mui/icons-material/Attachment";

import { sendNewMediaMessage, sendTextMessage } from "../../api/ChatAPI";

import { sendMediaMessage } from "../../redux/chatReducer/actions";
import CustomTextInput from "../CustomTextInput";
import { authUser } from "../../redux/authReducer/selectors";

import EmojiPicker from "../EmojiPicker";
import Box from "@mui/material/Box";

const ChatFooter = ({ receiver }) => {
  const [message, setMessage] = useState("");
  const sender = useSelector(authUser);

  const dispatch = useDispatch();
  const onPickEmoji = (emoji) => {
    if (message) {
      setMessage(message + emoji);
    } else {
      setMessage(emoji);
    }
  };
  const onSendMessage = () => {
    if (message) {
      if (receiver.first_name) {
        dispatch(sendTextMessage(sender, receiver, message));
      }
      setMessage("");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*,video/*",
    multiple: true,
    onDrop: (acceptedFiles) => {
      // eslint-disable-next-line
      const files = acceptedFiles.map((file) => {
        const tempFile = file;
        const reader = new FileReader();
        reader.onload = (event) => {
          if (receiver.first_name) {
            dispatch(
              sendNewMediaMessage(
                receiver.id,
                event.target.result,
                tempFile.name,
                URL.createObjectURL(tempFile)
              )
            );
          }
        };
        reader.readAsDataURL(tempFile);
        file = {
          preview: URL.createObjectURL(file),
          name: file.name,
          ...file,
          metaData: { type: file.type, size: file.size },
        };
        if (receiver.first_name) {
          dispatch(sendMediaMessage(file));
        }
        return file;
      });
    },
  });

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey && message) {
      if (receiver.first_name) {
        dispatch(sendTextMessage(sender, receiver, message));
      }
      event.preventDefault();
      setMessage("");
    }
  };

  return (
    <div className="chat-footer-root">
      <input {...getInputProps()} />
      <IconButton className="icon-btn-root" {...getRootProps()}>
        <AttachFileIcon />
      </IconButton>
      <CustomTextInput
        id="chat-textarea"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Shift ⇧ + Enter ↵ to add a line break."
        variant="outlined"
        multiline
        className="text-field-root"
      />
      <Box mr={4} ml={0}>
        <EmojiPicker onPickEmoji={onPickEmoji} />
      </Box>
      <IconButton className="icon-btn-root" onClick={onSendMessage}>
        <SendIcon />
      </IconButton>
    </div>
  );
};

export default ChatFooter;
