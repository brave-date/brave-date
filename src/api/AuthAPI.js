import { axiosUrlEncoded, axiosJson, axiosFiles } from "./AxiosConfig";
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
var axFiles = axiosFiles();

export const JWTAuth = {
  onRegister: ({ personelInfo, navigate }) => {
    return (dispatch) => {
      try {
        dispatch(fetchStart());
        let profile_picture = personelInfo.profile_picture;
        personelInfo["profile_picture"] = "";
        const email = personelInfo.email;
        const password = personelInfo.password;
        axJson
          .post(
            `${Server.endpoint}/auth/register`,
            JSON.stringify(personelInfo)
          )
          .then(({ data }) => {
            if (data.status_code === 201) {
              localStorage.setItem("token", data.token.access_token);
              axJson.defaults.headers.common["Authorization"] =
                "Bearer " + data.token.access_token;
              dispatch(
                JWTAuth.onLogin({ email, password, navigate, profile_picture })
              );
            } else {
              dispatch(fetchError(data.message));
            }
          })
          .catch(function (error) {
            dispatch(fetchError(error));
          });
      } catch (error) {
        dispatch(fetchError(error));
      }
    };
  },
  onLogin: ({ email, password, navigate, profile_picture }) => {
    return (dispatch) => {
      try {
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
              if (profile_picture) {
                dispatch(uploadProfilePicture(profile_picture));
              } else {
                dispatch(
                  JWTAuth.getAuthUser(
                    true,
                    data.access_token,
                    "Welcome. Let's get matchin'!"
                  )
                );
              }
              navigate("/app/recs");
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
        axJson.defaults.headers.common["Authorization"] = "Bearer " + token;
      }
      dispatch(fetchStart());
      dispatch(updateLoadUser(loaded));
      axJson
        .get(`${Server.endpoint}/user/profile`)
        .then(({ data }) => {
          if (data.status_code === 200) {
            if (message !== "navigate") {
              dispatch(fetchSuccess(message));
            }
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

export const uploadProfilePicture = (image) => {
  return (dispatch) => {
    const formData = new FormData();
    formData.append("file", image);
    dispatch(fetchStart());
    const token = localStorage.getItem("token");
    if (token) {
      axFiles.defaults.headers.common["Authorization"] = "Bearer " + token;
      axFiles
        .put(`${Server.endpoint}/user/profile-image`, formData)
        .then(({ data }) => {
          if (data.status_code === 200) {
            dispatch(JWTAuth.getAuthUser(true, token, data.message));
            dispatch(JWTAuth.getAuthUser(true, token, data.message));
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
