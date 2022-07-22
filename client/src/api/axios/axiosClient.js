import axios from "axios";
const axiosSetup = () => {
  axios.defaults.baseURL = "http://localhost:5000/api/";
};

export default axiosSetup;
