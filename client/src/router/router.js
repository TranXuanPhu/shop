import { createRouter, createWebHistory } from "vue-router";
//import Homepage from "../views/Home.vue";
import Guard from "../helpers/guard.js";
import store from "../store/index.js";
const routes = [
  /**
   * path not requiring auth
   *
   */
  {
    name: "Home",
    path: "/",
    // alias: "/home",
    component: () => import("../views/Home.vue"),
  },
  { path: "/home", redirect: "/" },
  {
    name: "collections",
    path: "/collections/:type?:q",
    component: () => import("../views/Collections.vue"),
  },
  {
    name: "collections",
    path: "/collections/:type",
    component: () => import("../views/Collections.vue"),
  },
  { path: "/collections", redirect: "/collections/all" },

  // {
  //   name: "ProductDetail",
  //   path: "/products/:id",
  //   component: () => import("../components/product/ProductDetail.vue"),
  // },

  {
    name: "ProductDetails",
    path: "/products/:slug",
    component: () => import("../components/product/ProductDetails.vue"),
  },
  // {
  //   name: "Cart",
  //   path: "/cart",
  //   component: () => import("../views/Cart.vue"),
  // },
  {
    name: "Login",
    path: "/account/login",
    component: () => import("../views/account/Login.vue"),
  },
  {
    name: "Register",
    path: "/account/register",
    component: () => import("../views/account/Register.vue"),
  },

  /**
   * path requiring auth
   */
  {
    name: "NewProduct",
    path: "/products/new",
    component: () => import("../components/product/NewProduct.vue"),
    meta: { requiresAuth: true },
  },
  {
    name: "Account",
    path: "/account",
    component: () => import("../views/account/Account.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to, _, next) => {
  const isLoggedIn = store.getters["user/getStatusLoggedIn"];
  const requiresAuth = to.matched.some(
    (route) => route.meta && route.meta.requiresAuth
  );
  if (!isLoggedIn && requiresAuth) {
    return next(Guard.redirectToLogin(to));
  }

  return next();
});

export default router;
