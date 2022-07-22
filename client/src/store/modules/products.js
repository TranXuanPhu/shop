//import url from "../../api/url.js";
import axios from "axios";
//state
const state = {
  all: [],
};

//getters - get,computed data form state
const getters = {
  getAllProducts(state) {
    return state.all;
  },
  isProductExist(state) {
    return Array.isArray(state.all) && state.all.length;
  },
};
//actions -  call api, get data from url
//được gọi bằng cách từ vue component: this.$store.dispatch
// trả về giá trị gọi commit cho mutations
const actions = {
  async getAllProducts({ commit }) {
    try {
      axios.get().then((response) => {
        console.log(response);
        commit("setProducts", {
          products: response.data.products,
        });
      });
    } catch (error) {
      console.error("getAllProducts", error);
    }
  },
};

//mutations
// thường gán dữ liệu cho state
const mutations = {
  setProducts(state, { products }) {
    state.all = products;
  },
};
export const products = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
