import AccountService from "../../api/services/account.service.js";
import UserService from "../../api/services/user.service.js";
import tokenService from "../../api/services/token.service.js";

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
  logOut({ commit }) {
    AccountService.logOut();
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
  createAddresses({ commit }, data) {
    try {
      UserService.createAddresses(data).then((response) => {
        console.log("createAddresses", response);
        commit("createAddresses", response);
        return Promise.resolve(response);
      });
    } catch (error) {
      console.error("createAddresses", error);
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
    state.loggedInUser = {};
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
    state.loggedInUser = {};
    state.status.loggedIn = false;
  },
};

export const user = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
