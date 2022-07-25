import axios from "axios";
const axiosSetup = () => {
  axios.defaults.baseURL = "http://localhost:5000/api/";
  // axios.defaults.withCredentials = true;
};

export default axiosSetup;
