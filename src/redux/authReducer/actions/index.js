import {
  UPDATE_AUTH_USER,
  UPDATE_LOAD_USER,
  SET_CURRENT_USER,
} from "../../../constants/ActionTypes";

export const setAuthUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_AUTH_USER,
      payload: user,
    });
  };
};

export const updateLoadUser = (loading) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_LOAD_USER,
      payload: loading,
    });
  };
};

export const setCurrentUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: SET_CURRENT_USER,
      payload: user,
    });
  };
};
