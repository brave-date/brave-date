import { sendChatMessage, sendNewMessageMedia } from "./Socket";
import {
  fetchError,
  fetchStart,
  fetchSuccess,
} from "../redux/commonReducer/actions";
import { axiosJson } from "./AxiosConfig";
import {
  sendNewChatMessage,
  setChatUsers,
  setConversation,
  setChatList,
} from "../redux/chatReducer/actions";
import { Server } from "../utils";

var axJson = axiosJson();

export const getChatUsers = () => {
  return (dispatch) => {
    dispatch(fetchStart());
    axJson.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    axJson
      .get(`${Server.endpoint}/messages`)
      .then((data) => {
        if (data.data.status_code === 200) {
          dispatch(fetchSuccess());
          dispatch(setChatUsers(data.data.result));
        } else {
          dispatch(fetchError(""));
        }
      })
      .catch(function (error) {
        dispatch(fetchError(""));
      });
  };
};

export const getMessagesList = () => {
  return (dispatch) => {
    dispatch(fetchStart());
    axJson.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    axJson
      .get(`${Server.endpoint}/message/users`)
      .then((data) => {
        if (data.data.status_code === 200) {
          dispatch(fetchSuccess());
          dispatch(setChatList(data.data.result));
        } else {
          dispatch(fetchError("Something went wrong"));
          dispatch(setChatList([]));
        }
      })
      .catch(function (error) {
        dispatch(fetchError(""));
        dispatch(setConversation([]));
      });
  };
};

export const getConversation = (receiver) => {
  return (dispatch) => {
    dispatch(fetchStart());
    axJson.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    axJson
      .get(`${Server.endpoint}/message`, {
        params: {
          receiver: receiver.email,
        },
      })
      .then((data) => {
        if (data.data.status_code === 200) {
          dispatch(fetchSuccess());
          dispatch(setConversation(data.data.result));
        } else {
          dispatch(fetchError("Something went wrong"));
          dispatch(setConversation([]));
        }
      })
      .catch(function (error) {
        dispatch(fetchError(""));
        dispatch(setConversation([]));
      });
  };
};

export const sendTextMessage = (sender, receiver, message) => {
  return (dispatch) => {
    dispatch(fetchStart());
    dispatch(sendChatMessage({ content: message, type: "text" }));
    dispatch(sendNewChatMessage(message));
    dispatch(fetchSuccess());
  };
};

export const sendNewMediaMessage = (
  receiverID,
  fileContent,
  fileName,
  preview
) => {
  return (dispatch) => {
    dispatch(fetchStart());
    dispatch(sendNewMessageMedia(fileContent, fileName, preview));
    dispatch(fetchSuccess());
  };
};
