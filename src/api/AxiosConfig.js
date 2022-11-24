import axios from "axios";

export const axiosUrlEncoded = () => {
  return axios.create({
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
};

export const axiosJson = () => {
  return axios.create({
    headers: { "Content-Type": "application/json" },
  });
};
