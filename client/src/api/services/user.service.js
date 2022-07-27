import url from "../url.js";
import axios from "axios";
import tokenService from "./token.service.js";
class UserService {
  createAddresses(data) {
    return axios
      .post(url.addresses, data)
      .then((response) => {
        tokenService.updateLoggedUser(response.data.loggedUser);
        return response.data;
      })
      .catch((err) => err);
  }
}
export default new UserService();
