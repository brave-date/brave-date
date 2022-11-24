import {
  UPDATE_AUTH_USER,
  UPDATE_LOAD_USER,
  SET_CURRENT_USER,
} from "../../constants/ActionTypes";

const initialState = {
  authUser: "",
  loadUser: false,
  currentUser: null,
};
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_AUTH_USER: {
      return {
        ...state,
        authUser: action.payload,
        loadUser: true,
      };
    }
    case UPDATE_LOAD_USER: {
      return {
        ...state,
        loadUser: action.payload,
      };
    }
    case SET_CURRENT_USER: {
      return { ...state, currentUser: action.payload };
    }
    default:
      return state;
  }
};

export default appReducer;
