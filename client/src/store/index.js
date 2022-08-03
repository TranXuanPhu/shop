import { createStore, createLogger } from "vuex";
import { products } from "./modules/products.js";
import { user } from "./modules/user.js";
import { cart } from "./modules/cart.js";
import { orders } from "./modules/orders.js";

const debug = process.env.NODE_ENV !== "production";

//state
const state = {
  isLoading: false,
  isModalError: false,
  modalAddCartSuccess: {
    showModal: false,
    product: {},
  },
};

const getters = {
  getIsLoading: (state) => state.isLoading,
  getIsModalError: (state) => state.isModalError,
  getIsModalSuccess: (state) => state.modalAddCartSuccess.showModal,
  getModalAddCartSuccess: (state) => state.modalAddCartSuccess,
};

const actions = {
  setLoading({ commit }, isLoading) {
    commit("setLoading", isLoading);
  },
  setModalError({ commit }, isModalError) {
    commit("setModalError", isModalError);
  },
  setAddCartSuccess({ commit }, showModal, product) {
    commit("setAddCartSuccess", showModal, product);

    if (showModal) {
      setTimeout(() => {
        commit("setAddCartSuccess", false, product);
      }, 2000);
    }
  },
};
const mutations = {
  setLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
  setModalError(state, isModalError) {
    state.isModalError = isModalError;
  },
  setAddCartSuccess(state, showModal, product) {
    state.modalAddCartSuccess.showModal = showModal;
    state.modalAddCartSuccess.product = product;
  },
};
export default createStore({
  state,
  getters,
  actions,
  mutations,

  modules: {
    products,
    user,
    cart,
    orders,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
