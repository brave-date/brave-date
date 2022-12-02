import {
  setMatchUsers,
  setUsers,
} from "../redux/matchReducer/actions";
import {
  fetchError,
  fetchStart,
  fetchSuccess,
} from "../redux/commonReducer/actions";
import { axiosJson } from "./AxiosConfig";

import { Server } from "../utils";

var axJson = axiosJson();

export const getUserMatches = () => {
  return (dispatch) => {
    dispatch(fetchStart());
    const user = localStorage.getItem("user");
    if (user) {
      axJson.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axJson
        .get(`${Server.endpoint}/matches`, {
          params: { user: user.email },
        })
        .then(({ data }) => {
          if (data.status_code === 200) {
            dispatch(fetchSuccess());
            dispatch(setMatchUsers(data.result));
          } else {
            dispatch(fetchError(data.message));
          }
        })
        .catch(function (error) {
          dispatch(fetchError(""));
        });
    }
  };
};

export const setInitialUsers = () => {
  return (dispatch) => {
    dispatch(fetchStart());
    const user = localStorage.getItem("user");
    if (user) {
      axJson.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axJson
        .get(`${Server.endpoint}/user/all`, {
          params: { user: user.email },
        })
        .then(({ data }) => {
          if (data.status_code === 200) {
            dispatch(fetchSuccess());
            dispatch(setUsers(data.result));
          } else {
            dispatch(fetchError(data.message));
          }
        })
        .catch(function (error) {
          dispatch(fetchError(""));
        });
    }
  };
};

export const setSelectedMatch = (user) => {
  return (dispatch) => {
    dispatch(fetchStart());
    axJson.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    axJson
      .post(`${Server.endpoint}/matches`, { match: user.email })
      .then(({ data }) => {
        if (data.status_code === 201) {
          dispatch(fetchSuccess());
          dispatch(getUserMatches());
        } else {
          dispatch(fetchError(data.message));
        }
      })
      .catch(function (error) {
        dispatch(fetchError(error));
      });
  };
};
