import React from "react";
import CustomList from "../../CustomList";
import MessageCell from "../MessageCell";
import NoMessageRecordsFound from "../NoMessageRecordsFound";

const MessagesList = ({ messages, onMessagesSelect }) => {
  return messages && messages.length > 0 ? (
    <CustomList
      data={messages}
      renderRow={(data) => {
        return (
          <MessageCell
            key={data.id}
            data={data}
            onMessageSelect={onMessagesSelect}
          />
        );
      }}
    />
  ) : (
    <NoMessageRecordsFound />
  );
};

export default MessagesList;
