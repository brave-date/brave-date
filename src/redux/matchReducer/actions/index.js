import {
  SET_MATCH_USERS,
  SET_MATCH_USER,
  SET_SELECTED_MATCH,
  DELETE_MATCH,
  SET_USERS,
} from "../../../constants/ActionTypes";

export const setUsers = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_USERS,
      payload: data,
    });
  };
};

export const setMatchUsers = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_MATCH_USERS,
      payload: data,
    });
  };
};

export const setMatchUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: SET_MATCH_USER,
      payload: user,
    });
  };
};

export const deleteMatch = (email) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_MATCH,
      payload: email,
    });
  };
};

export const onMatchSelect = (user) => {
  return (dispatch) => {
    dispatch({
      type: SET_SELECTED_MATCH,
      payload: user,
    });
  };
};
