import {
  SET_MATCH_USER,
  SET_MATCH_USERS,
  SET_SELECTED_MATCH,
  SET_USERS,
} from "../../constants/ActionTypes";

const initialState = {
  matches: [],
  users: [],
  selectedMatch: null,
};

const matchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS: {
      return { ...state, users: action.payload };
    }
    case SET_MATCH_USERS: {
      return { ...state, matches: action.payload };
    }
    case SET_MATCH_USER: {
      return {
        ...state,
        matches: state.matches.concat(action.payload),
      };
    }
    case SET_SELECTED_MATCH: {
      return { ...state, selectedMatch: action.payload };
    }
    default:
      return state;
  }
};

export default matchReducer;
