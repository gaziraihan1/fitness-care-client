import axios from "axios";
import React from "react";

const axiosInstance = axios.create({
  baseURL: "https://server-side-mu-seven.vercel.app",
});
const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
