import {
  SET_CONVERSATION_DATA,
  SEND_NEW_CHAT_MESSAGE,
  RECEIVE_NEW_CHAT_MESSAGE,
  SEND_NEW_MEDIA_MESSAGE,
  RECEIVE_NEW_MEDIA_MESSAGE,
  SET_SELECTED_USER,
  SET_CHAT_LIST,
} from "../../constants/ActionTypes";
import moment from "moment";

const initialState = {
  conversation: [],
  selectedUser: null,
  chatList: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONVERSATION_DATA: {
      return {
        ...state,
        conversation: action.payload,
      };
    }
    case SEND_NEW_CHAT_MESSAGE: {
      return {
        ...state,
        conversation: state.conversation.concat({
          id: new Date().getTime(),
          user: state.currentUser,
          content: action.payload,
          type: "sent",
          media: "",
          creation_date: moment.utc(),
        }),
      };
    }
    case RECEIVE_NEW_CHAT_MESSAGE: {
      return {
        ...state,
        conversation: state.conversation.concat({
          id: new Date().getTime(),
          user: action.payload.user,
          content: action.payload.content,
          type: "received",
          media: "",
          creation_date: moment.utc(),
        }),
      };
    }
    case SEND_NEW_MEDIA_MESSAGE: {
      return {
        ...state,
        conversation: state.conversation.concat({
          id: new Date().getTime(),
          user: state.currentUser,
          type: "sent",
          content: "",
          media: action.payload,
          creation_date: moment.utc(),
        }),
      };
    }
    case RECEIVE_NEW_MEDIA_MESSAGE: {
      return {
        ...state,
        conversation: state.conversation.concat({
          id: new Date().getTime(),
          type: "received",
          content: "",
          media: action.payload,
          creation_date: moment.utc(),
        }),
      };
    }
    case SET_CHAT_LIST: {
      return {
        ...state,
        chatList: action.payload,
      };
    }
    case SET_SELECTED_USER: {
      return { ...state, selectedUser: action.payload };
    }
    default:
      return state;
  }
};

export default chatReducer;
