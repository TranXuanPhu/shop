import url from "../../api/url.js";
import axios from "axios";
//state
const state = {
  orders: [],
};

//getters - get,computed data form state
const getters = {
  getOrders: (state) => state.orders,
};

const actions = {
  createOrder(_, data) {
    return axios
      .post(url.orders, data)
      .then((response) => {
        console.log("createOrder:", response);
        // commit("setItemCarts", response.data.cart);
        return Promise.resolve(response.data.index);
      })
      .catch((error) => {
        // commit("registerFailure");
        console.error("createOrder:", error);
        return Promise.reject(error);
      });
  },
  getOrders({ commit }) {
    return axios
      .get(url.orders)
      .then((response) => {
        console.log("getOrders:", response);
        commit("setOrders", response.data.orders);
        return Promise.resolve(response.data.orders);
      })
      .catch((error) => {
        // commit("registerFailure");
        console.error("getOrders:", error);
        return Promise.reject(error);
      });
  },
  getOrdersById(_, id) {
    return axios
      .get(`${url.orders}/${id}`)
      .then((response) => {
        console.log("getOrdersById:", response);
        return Promise.resolve(response.data.order);
      })
      .catch((error) => {
        // commit("registerFailure");
        console.error("getOrdersById:", error);
        return Promise.reject(error);
      });
  },
};

//mutations
// thường gán dữ liệu cho state
const mutations = {
  setOrders(state, orders) {
    state.orders = orders.items;
  },
};
export const orders = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
