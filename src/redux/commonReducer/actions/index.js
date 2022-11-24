import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from "../../../constants/ActionTypes";

export const fetchSuccess = (message) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_SUCCESS,
      payload: message || "",
    });
  };
};
export const fetchError = (error) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_ERROR,
      payload: error,
    });
  };
};

export const fetchStart = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_START,
    });
  };
};
