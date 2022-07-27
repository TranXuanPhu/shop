import axios from "axios";
const axiosSetup = (store, router) => {
  axios.defaults.baseURL = "http://localhost:5000/api/";
  // axios.defaults.withCredentials = true;

  axios.interceptors.request.use(async (config) => {
    const customHeaders = {};
    // console.log("axios.interceptors.request.use");
    const accessToken = store.getters["user/getAccessToken"]; //tokenService.getLocalAccessToken();
    if (accessToken) {
      const Authorization = "x-access-token";
      Object.assign(customHeaders, { "x-access-token": accessToken });
      config.headers = { [Authorization]: accessToken };
      // Object.assign(config.headers, { "x-access-token": accessToken });

      console.log("Access token", config);
    }
    return config;
  });
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    async function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      console.log("axios.interceptors.response.use: ", error);
      const originalRequest = error.config;
      if (
        error.response.status === 401 &&
        originalRequest.url.includes("account/refreshtoken")
      ) {
        store.commit("user/clearUserData");
        router.push("/account/login");
        return Promise.reject(error);
      } else if (
        error.response.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url.includes("account/login")
      ) {
        console.log(
          "axios.interceptors.response.use: gui refreshToken để lấy accesstoken"
        );
        originalRequest._retry = true;
        await store.dispatch("user/refreshToken");
        return axios(originalRequest);
      }
      return Promise.reject(error);
    }
  );
};

export default axiosSetup;
