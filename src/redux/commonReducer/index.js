import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from "../../constants/ActionTypes";

const initialState = {
  error: "",
  message: "",
  loading: false,
};
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_START: {
      return { ...state, error: "", message: "", loading: true };
    }
    case FETCH_SUCCESS: {
      return { ...state, error: "", loading: false, message: action.payload };
    }
    case FETCH_ERROR: {
      return { ...state, loading: false, message: "", error: action.payload };
    }
    default:
      return state;
  }
};

export default appReducer;
