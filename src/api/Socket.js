import {
  receiveNewChatMessage,
  receiveMediaMessage,
} from "../redux/chatReducer/actions";
// import {
//   fetchSuccess,
// } from "../redux/commonReducer/actions";
import { Server } from "../utils";

const SOCKET_URL = Server.socketEndpoint;
let chatClient = null;

export const initiateChatSocket = (sender, receiver) => {
  return (dispatch) => {
    if (chatClient === null || chatClient.readyState === WebSocket.CLOSED) {
      chatClient = new WebSocket(
        `${SOCKET_URL}/chat/${sender.id}/${receiver.id}`
      );
    }
    chatClient.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    chatClient.onclose = () => {
      console.log("Websocket Disconnected");
    };
    chatClient.onerror = (err) => {
      console.error(
        "Socket encountered error: ",
        err.message,
        "Closing socket"
      );
      chatClient.close();
      chatClient = new WebSocket(
        `${SOCKET_URL}/chat/${sender.id}/${receiver.id}`
      );
    };
    chatClient.onmessage = (event) => {
      let message = JSON.parse(event.data);
      let message_body = {
        user: message["user"],
        content: message["content"],
      };
      if (
        (message["type"] === "online" || message["type"] === "offline") &&
        message["user"] &&
        message["user"].id !== sender.id
      ) {
        //dispatch(fetchSuccess(message["content"]));
      } else if (
        message["type"] === "media" &&
        message["user"].id !== sender.id
      ) {
        dispatch(receiveMediaMessage(message["media"]));
      } else if (message["user"].id !== sender.id) {
        dispatch(receiveNewChatMessage(message_body));
      }
    };
  };
};

export const sendChatMessage = (message) => {
  return (dispatch) => {
    if (!chatClient) {
      return;
    }
    chatClient.send(JSON.stringify(message));
  };
};

export const sendNewMessageMedia = (fileContent, fileName, preview) => {
  return (dispatch) => {
    if (!chatClient) {
      return;
    }
    chatClient.send(
      JSON.stringify({
        content: fileContent.split(",")[1],
        file_name: fileName,
        type: "media",
        preview: preview,
      })
    );
  };
};

export const leaveMatchSocket = () => {
  return (dispatch) => {
    if (!chatClient) {
      return;
    }
    chatClient.send(JSON.stringify({ content: "leave", type: "leave" }));
  };
};
