import {
  fetchError,
  fetchStart,
  fetchSuccess,
} from "../redux/commonReducer/actions";
import { setCurrentUser } from "../redux/authReducer/actions";
import { axiosJson } from "./AxiosConfig";

import { Server } from "../utils";
import { JWTAuth } from "./AuthAPI";

var axJson = axiosJson();
export const resetPassword = (
  oldPassword,
  newPassword,
  confirmPassword,
  onCloseDialog
) => {
  return (dispatch) => {
    dispatch(fetchStart());
    if (localStorage.getItem("user")) {
      axJson.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axJson
        .put(
          `${Server.endpoint}/user/reset-password`,
          JSON.stringify({
            old_password: oldPassword,
            new_password: newPassword,
            confirm_password: confirmPassword,
          })
        )
        .then(({ data }) => {
          if (data.status_code === 200) {
            dispatch(fetchSuccess(data.message));
            dispatch(onCloseDialog());
            dispatch(JWTAuth.onLogout());
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
export const SetPersonalInfo = (
  { firstName, lastName, bio, phoneNumber },
  onCloseDialog
) => {
  return (dispatch) => {
    dispatch(fetchStart());
    if (localStorage.getItem("user")) {
      axJson.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axJson
        .put(
          `${Server.endpoint}/user/profile`,
          JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            bio: bio,
            phone_number: phoneNumber,
          })
        )
        .then(({ data }) => {
          if (data.status_code === 200) {
            dispatch(fetchSuccess(data.message));
            const user = JSON.parse(localStorage.getItem("user"));
            user.first_name = firstName;
            user.last_name = lastName;
            user.bio = bio;
            user.phone_number = phoneNumber;
            dispatch(setCurrentUser(user));
            dispatch(onCloseDialog());
            dispatch(
              JWTAuth.getAuthUser(
                true,
                localStorage.getItem("token"),
                data.message
              )
            );
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
