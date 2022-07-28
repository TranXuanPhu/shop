import url from "../../api/url.js";
import axios from "axios";
//state
const state = {
  items: [],
};

//getters - get,computed data form state
const getters = {
  getAllItems(state) {
    return state.items;
  },
  getTotalItems: (state) => state.items.length,
};

const actions = {
  getItemCarts({ commit }) {
    return axios
      .get(url.cart)
      .then((response) => {
        console.log("getItemsCart:", response);
        commit("setItemCarts", response.data.itemCarts);
        return Promise.resolve(response.data.itemCarts);
      })
      .catch((error) => {
        // commit("registerFailure");
        console.error("getItemsCart:", error);
        return Promise.reject(error);
      });
  },
};

//mutations
// thường gán dữ liệu cho state
const mutations = {
  setItemCarts(state, itemCarts) {
    state.items = itemCarts;
  },
};
export const cart = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
