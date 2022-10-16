import { BASE_URL } from "@/api/url/base.js";

const axios = require("axios");

axios.defaults.baseURL = BASE_URL;

axios.interceptors.request.use(
  //syntax ES6
  (config) => {
    // Do something before request is sent
    config.headers.common["Cache-Control"] = "no-cache";
    config.headers.common["Pragma"] = "no-cache";
    config.headers.common["X-Requested-With"] = "XMLHttpRequest";

    config.headers.Authorization = `Bearer ` + "token";

    return config;
  },
  (error) => Promise.reject(error)
);
axios.interceptors.response.use(
  //syntax ES5
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    console.log(error);
    return Promise.reject(error);
  }
);

export default axios;
