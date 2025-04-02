// import axios from "axios";
// import { data } from "react-router-dom";

// //Base Axios Instance
// export const axiosInstance = axios.create({
//   baseURL: "http://localhost:3900/api", // Base URL defined here
// });

// // Function for POST API without auth token
// export const localAxios = (endpoint, data, contentType = "application/json") => ({
//     method: "POST",
//     url: `${axiosInstance.defaults.baseURL}${endpoint}`, // Base URL + endpoint
//     headers: {
//         "Content-Type": contentType, // Dynamic Content-Type
//     },
//     data,
// });

// // function for POST requests **with** auth token
// export const localAxiosToken = (endpoint, data, token, contentType = "application/json") => ({
//   method: "POST",
//   url: endpoint, // Only pass the endpoint in your component
//   headers: {
//     Authorization: `Bearer ${token}`,
//     "Content-Type": contentType, // Content-Type is dynamic
//   },
//   data, // Ensure the correct data format is passed
// });

// //function for put requests
// export const localAxiosPut = (endpoint, data, contentType = "application/json") => ({
//   method: "PUT",
//   url: `${axiosInstance.defaults.baseURL}${endpoint}`, // Base URL + endpoint
//   headers: {
//       "Content-Type": contentType, // Dynamic Content-Type
//   },
//   data,
// })
import axios from "axios";
import { data } from "react-router-dom";

//Base Axios Instance
export const axiosInstance = axios.create({
  baseURL: "http://localhost:3900/api", // Base URL defined here
});

// Function for POST API without auth token
export const localAxios = (endpoint, data, contentType = "application/json") => ({
    method: "POST",
    url: `${axiosInstance.defaults.baseURL}${endpoint}`, // Base URL + endpoint
    headers: {
        "Content-Type": contentType, // Dynamic Content-Type
    },
    data,
});

// function for POST requests **with** auth token
export const localAxiosToken = (endpoint, data, token, contentType = "application/json") => ({
  method: "POST",
  url: endpoint, // Only pass the endpoint in your component
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": contentType, // Content-Type is dynamic
  },
  data, // Ensure the correct data format is passed
});

//function for put requests
export const localAxiosPut = (endpoint, data, contentType = "application/json") => ({
  method: "PUT",
  url: `${axiosInstance.defaults.baseURL}${endpoint}`, // Base URL + endpoint
  headers: {
      "Content-Type": contentType, // Dynamic Content-Type
  },
  data,
});

// Function for GET API requests
export const localAxiosGet = (endpoint, token = null, contentType = "application/json") => {
  const config = {
    method: "GET",
    url: `${axiosInstance.defaults.baseURL}${endpoint}`, // Base URL + endpoint
    headers: {
      "Content-Type": contentType, // Dynamic Content-Type
    },
  };
  
  // Add authorization token if provided
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
};