import React, { useState } from "react";
import moment from "moment";
import { Box } from "@mui/material";
import clsx from "clsx";
import CustomImage from "../../CustomImage";
import CustomAvatar from "../../CustomAvatar";
import MediaViewer from "../../MediaViewer";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import parse from "html-react-parser";
import { checkHtml } from "../../Helper";

const ReceivedMessageCell = ({ conversation, user }) => {
  const [position, setPosition] = useState(-1);
  const handleClose = () => {
    setPosition(-1);
  };
  return (
    <Box className={clsx("chat-msg-item", "received-msg-item")}>
      <Box className="chat-avatar">
        <CustomAvatar src={user.profile_picture} alt={user.first_name} />
      </Box>
      <Box className="chat-msg-content">
        <Box className="chat-bubble">
          {conversation.content.length > 0 ? (
            checkHtml(conversation.content) ? (
              parse(conversation.content)
            ) : (
              <ReactMarkdown
                children={conversation.content}
                remarkPlugins={[remarkGfm]}
              />
            )
          ) : typeof conversation.media === "string" &&
            conversation.media.length > 0 &&
            conversation.content.length === 0 ? (
            <Box>
              <CustomImage
                onClick={() => {
                  setPosition(0);
                }}
                key={conversation.id}
                src={conversation.media}
                alt={"image"}
                height={100}
                width={100}
              />
              <MediaViewer
                position={position}
                medias={{
                  preview: conversation.media,
                  name: "image",
                }}
                handleClose={handleClose}
              />
            </Box>
          ) : (
            <Box>
              <CustomImage
                onClick={() => {
                  setPosition(0);
                }}
                key={conversation.id}
                src={conversation.media.preview}
                alt={"image"}
                height={100}
                width={100}
              />
              <MediaViewer
                position={position}
                medias={{ preview: conversation.media.preview, name: "image" }}
                handleClose={handleClose}
              />
            </Box>
          )}
        </Box>
        <Box className="chat-time">
          {moment(conversation.creation_date).format("hh:mm:ss")}
        </Box>
      </Box>
    </Box>
  );
};

export default ReceivedMessageCell;
