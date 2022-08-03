import AccountService from "../../api/services/account.service.js";
import UserService from "../../api/services/user.service.js";
import tokenService from "../../api/services/token.service.js";

const isRoleManager = (role) => {
  return ["manager", "admin"].includes(role);
};
const userLocal = tokenService.getUser();
//state
const state = userLocal
  ? {
      status: { loggedIn: true },
      loggedUser: userLocal?.loggedInUser || {},
      accessToken: userLocal?.accessToken || "",
      refreshToken: userLocal?.refreshToken || "",
    }
  : {
      status: { loggedIn: false },
      loggedUser: {},
      accessToken: "",
      refreshToken: "",
    };

//getters
const getters = {
  getLoggedUser: (state) => state.loggedUser,
  getStatusLoggedIn: (state) => state.status.loggedIn,
  getAccessToken: (state) => state.accessToken,
  getAddresses: (state) => state.loggedUser.addresses,
  getAddressDefault: (state) =>
    state.loggedUser.addresses.find((address) => address.default),
  isManager: (state) => isRoleManager(state.loggedUser.role),
};

//actions
const actions = {
  login({ commit }, user) {
    return AccountService.login(user)
      .then((user) => {
        commit("loginSuccess", user);
        return Promise.resolve(user);
      })
      .catch((error) => {
        console.error(error);
        commit("loginFailure");
        return Promise.reject(error);
      });
  },
  register({ commit }, user) {
    return AccountService.register(user)
      .then((response) => {
        commit("registerSuccess");
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        commit("registerFailure");
        return Promise.reject(error);
      });
  },
  logOut({ commit, dispatch }) {
    AccountService.logOut();
    dispatch("cart/emptyCart", "", { root: true });
    commit("clearUserData");
  },
  async refreshToken({ state, commit }) {
    try {
      AccountService.refreshToken(state.refreshToken).then((response) => {
        console.log("refreshToken", response);
        commit("setAccessToken", response);
      });
    } catch (error) {
      console.error("refreshToken", error);
      commit("clearUserData");
    }
  },
  async createAddresses({ commit }, data) {
    try {
      const responseData = await UserService.createAddresses(data);
      console.log("createAddresses", responseData);
      commit("updateLoggedUser", responseData.loggedUser);
      return Promise.resolve(responseData.loggedUser);
    } catch (error) {
      console.error("createAddresses", error);
      return Promise.reject(error);
    }
  },
  async updateAddress({ commit }, data) {
    try {
      const responseData = await UserService.updateAddress(data);
      console.log("updateAddress success", responseData);
      commit("updateLoggedUser", responseData.loggedUser);
      return Promise.resolve(responseData.loggedUser);
    } catch (error) {
      console.error("updateAddress", error);
      return Promise.reject(error);
    }
  },
  async deleteAddress({ commit }, data) {
    try {
      const responseData = await UserService.deleteAddress(data);
      console.log("deleteAddress success", responseData);
      commit("updateLoggedUser", responseData.loggedUser);
      return Promise.resolve(responseData.loggedUser);
    } catch (error) {
      console.error("deleteAddress", error);
      return Promise.reject(error);
    }
  },
};

//mutations
const mutations = {
  loginSuccess(state, user) {
    state.status.loggedIn = true;
    state.loggedUser = user.loggedInUser;
    state.accessToken = user.accessToken;
    state.refreshToken = user.refreshToken;
  },
  loginFailure(state) {
    state.refreshToken = "";
    state.accessToken = "";
    state.loggedUser = {};
    state.status.loggedIn = false;
  },

  registerSuccess(state) {
    state.status.loggedIn = false;
  },
  registerFailure(state) {
    state.status.loggedIn = false;
  },
  setRefreshToken(state, refreshToken) {
    state.refreshToken = refreshToken;
  },
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken;
  },
  clearUserData(state) {
    state.refreshToken = "";
    state.accessToken = "";
    state.loggedUser = {};
    state.status.loggedIn = false;
  },
  updateLoggedUser(state, loggedUser) {
    state.loggedUser = loggedUser;
  },
};

export const user = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
