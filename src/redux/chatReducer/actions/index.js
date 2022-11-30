import {
  SEND_NEW_CHAT_MESSAGE,
  SEND_NEW_MEDIA_MESSAGE,
  RECEIVE_NEW_MEDIA_MESSAGE,
  SET_CHAT_USERS,
  RECEIVE_NEW_CHAT_MESSAGE,
  SET_CONVERSATION_DATA,
  SET_SELECTED_USER,
  SET_CHAT_LIST,
} from "../../../constants/ActionTypes";

export const onUserSelect = (user) => {
  return (dispatch) => {
    dispatch({
      type: SET_SELECTED_USER,
      payload: user,
    });
  };
};

export const sendNewChatMessage = (message) => {
  return (dispatch) => {
    dispatch({
      type: SEND_NEW_CHAT_MESSAGE,
      payload: message,
    });
  };
};

export const receiveNewChatMessage = (data) => {
  return (dispatch) => {
    dispatch({
      type: RECEIVE_NEW_CHAT_MESSAGE,
      payload: data,
    });
  };
};

export const sendMediaMessage = (file) => {
  return (dispatch) => {
    dispatch({
      type: SEND_NEW_MEDIA_MESSAGE,
      payload: file,
    });
  };
};

export const receiveMediaMessage = (file) => {
  return (dispatch) => {
    dispatch({
      type: RECEIVE_NEW_MEDIA_MESSAGE,
      payload: file,
    });
  };
};

export const setChatUsers = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_CHAT_USERS,
      payload: data,
    });
  };
};

export const setConversation = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_CONVERSATION_DATA,
      payload: data,
    });
  };
};

export const setChatList = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_CHAT_LIST,
      payload: data,
    });
  };
};
