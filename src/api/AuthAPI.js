import { axiosUrlEncoded, axiosJson } from "./AxiosConfig";
import {
  setAuthUser,
  updateLoadUser,
  setCurrentUser,
} from "../redux/authReducer/actions";
import {
  fetchError,
  fetchStart,
  fetchSuccess,
} from "../redux/commonReducer/actions";

import { Server } from "../utils";

var axUrlEncoded = axiosUrlEncoded();
var axJson = axiosJson();

export const JWTAuth = {
  onRegister: ({ personelInfo, navigate }) => {
    return (dispatch) => {
      try {
        // TODO: move `navigate` into `then` when the backend is completed
        navigate("/app/recs");
        dispatch(fetchStart());
        axJson
          .post(
            `${Server.endpoint}/auth/register`,
            JSON.stringify(personelInfo)
          )
          .then(({ data }) => {
            if (data.status_code === 201) {
              localStorage.setItem("token", data.token.value);
              axJson.defaults.headers.common["Authorization"] =
                "Bearer " + data.token.value;
              dispatch(fetchSuccess(data.message));
              //dispatch(JWTAuth.getAuthUser(true, data.token.value));
            } else {
              dispatch(fetchError(data.message));
            }
          })
          .catch(function (error) {
            dispatch(fetchError(""));
          });
      } catch (error) {
        dispatch(fetchError(""));
      }
    };
  },
  onLogin: ({ email, password, navigate }) => {
    return (dispatch) => {
      try {
        // TODO: move `navigate` into `then` when the backend is completed
        navigate("/app/recs");
        dispatch(fetchStart());
        axUrlEncoded
          .post(
            `${Server.endpoint}/auth/login`,
            JSON.stringify(
              `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`
            )
          )
          .then(({ data }) => {
            if (data.access_token) {
              localStorage.setItem("token", data.access_token);
              axJson.defaults.headers.common["Authorization"] =
                "Bearer " + data.access_token;
              dispatch(fetchSuccess());
              dispatch(
                JWTAuth.getAuthUser(
                  true,
                  data.access_token,
                  "Welcome. Let's get chattin'"
                )
              );
            } else {
              dispatch(fetchError(data.message));
            }
          })
          .catch(function (error) {
            dispatch(fetchError(""));
          });
      } catch (error) {
        dispatch(fetchError(""));
      }
    };
  },
  onLogout: () => {
    return (dispatch) => {
      localStorage.clear();
      dispatch(fetchStart());
      axJson
        .get(`${Server.endpoint}/user/logout`)
        .then(({ data }) => {
          if (data.status_code === 200) {
            dispatch(fetchSuccess(data.message));
            dispatch(setAuthUser(null));
            dispatch(setCurrentUser(null));
          } else {
            dispatch(fetchError(data.message));
          }
        })
        .catch(function (error) {
          dispatch(fetchError(""));
        });
    };
  },

  getAuthUser: (loaded = false, token, message) => {
    return (dispatch) => {
      if (!token) {
        const token = localStorage.getItem("token");
        axiosJson.defaults.headers.common["Authorization"] = "Bearer " + token;
      }
      dispatch(fetchStart());
      dispatch(updateLoadUser(loaded));
      axJson
        .get(`${Server.endpoint}/user/profile`)
        .then(({ data }) => {
          if (data.status_code === 200) {
            dispatch(fetchSuccess(message));
            dispatch(updateLoadUser(true));
            dispatch(setCurrentUser(data.user));
            dispatch(setAuthUser(data.user));
            // store the user in localStorage
            localStorage.setItem("user", JSON.stringify(data.user));
          } else {
            dispatch(JWTAuth.onLogout());
          }
        })
        .catch(function (error) {
          dispatch(fetchError(""));
        });
    };
  },
};
