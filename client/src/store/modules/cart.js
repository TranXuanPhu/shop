import url from "../../api/url.js";
import axios from "axios";
//state
const state = {
  items: [],
  totals: 0,
};

//getters - get,computed data form state
const getters = {
  getAllItems(state) {
    return state.items;
  },
  getTotalItems: (state) => state.totals || 0,
  getTotalMoney: (state) =>
    state.items.reduce(
      (total, item) => total + item?.product?.price * item?.quantity,
      0
    ) || 0,
};

const actions = {
  getItemCarts({ commit }) {
    return axios
      .get(url.cart)
      .then((response) => {
        console.log("getItemsCart:", response);
        commit("setItemCarts", response.data.cart);
        return Promise.resolve(response.data.cart);
      })
      .catch((error) => {
        // commit("registerFailure");
        console.error("getItemsCart:", error);
        return Promise.reject(error);
      });
  },
  addToCart({ commit }, data) {
    return axios
      .post(url.cart, data)
      .then((response) => {
        console.log("addToCart:", response);
        commit("setItemCarts", response.data.cart);
        return Promise.resolve(response.data.cart);
      })
      .catch((error) => {
        // commit("registerFailure");
        console.error("addToCart:", error);
        return Promise.reject(error);
      });
  },
  updateItemsInCart({ commit }, data) {
    return axios
      .patch(url.cart, data)
      .then((response) => {
        console.log("updateItemsInCart:", response);
        commit("setItemCarts", response.data.cart);
        return Promise.resolve(response.data.cart);
      })
      .catch((error) => {
        console.error("updateItemsInCart:", error);
        return Promise.reject(error);
      });
  },
  deleteItemsInCart({ commit }, data) {
    return axios
      .delete(url.cart, { data })
      .then((response) => {
        console.log("deleteItemsInCart:", response);
        commit("setItemCarts", response.data.cart);
        return Promise.resolve(response.data.cart);
      })
      .catch((error) => {
        console.error("deleteItemsInCart:", error);
        return Promise.reject(error);
      });
  },
  emptyCart({ commit }) {
    commit("setItemCarts", { items: [], totals: 0 });
  },
};

//mutations
// thường gán dữ liệu cho state
const mutations = {
  setItemCarts(state, cart) {
    state.items = cart.items;
    state.totals = cart.totals;
  },
};
export const cart = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
