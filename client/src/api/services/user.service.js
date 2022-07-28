import url from "../url.js";
import axios from "axios";
import tokenService from "./token.service.js";
class UserService {
  createAddresses(data) {
    return axios
      .post(url.addresses, data)
      .then((response) => {
        tokenService.updateLoggedUser(response.data.loggedUser);
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        console.error("createAddresses: ", error);
        return Promise.reject(error);
      });
  }
  updateAddress(data) {
    return axios
      .patch(url.addresses, data)
      .then((response) => {
        tokenService.updateLoggedUser(response.data.loggedUser);
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        console.error("updateAddress: ", error);
        return Promise.reject(error);
      });
  }
  deleteAddress(dataDelete) {
    return axios
      .delete(url.addresses, { data: dataDelete })
      .then((response) => {
        tokenService.updateLoggedUser(response.data.loggedUser);
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        console.error("deleteAddress: ", error);
        return Promise.reject(error);
      });
  }
}
export default new UserService();
