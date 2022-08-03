import { createRouter, createWebHistory } from "vue-router";
//import Homepage from "../views/Home.vue";
import store from "../store/index.js";
import Guard from "../helpers/guard.js";
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
  // {
  //   name: "collections",
  //   path: "/collections/:type?:q",
  //   component: () => import("../views/Collections.vue"),
  // },
  {
    name: "Collections",
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
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../components/error/NotFound.vue"),
  },

  /**
   * path requiring auth
   */
  {
    name: "Cart",
    path: "/cart",
    component: () => import("../views/Cart.vue"),
    meta: { requiresAuth: true },
  },
  {
    name: "CheckOuts",
    path: "/checkouts",
    component: () => import("../views/CheckOuts.vue"),
    meta: { requiresAuth: true },
  },

  {
    name: "Account",
    path: "/account",
    component: () => import("../views/account/Account.vue"),
    meta: { requiresAuth: true },
    redirect: (to) => {
      console.log("to:", to);
      if (to.query.view) {
        console.log("have query");
        return { path: "/account/view" };
      }
      return { path: "/account/information" };
    },
    children: [
      {
        path: "information",
        component: () => import("../components/account/AccountInfo.vue"),
        alias: [""],
      },
      {
        path: "view",
        component: () => import("../components/account/ViewQuery.vue"),
        //alias: [""],
      },
      {
        path: "addresses",
        component: () => import("../components/account/Addresses.vue"),
      },
      {
        name: "Orders",
        path: "orders/:id",
        component: () => import("../components/account/Orders.vue"),
      },
      {
        path: "logout",
        component: () => import("../components/account/Logout.vue"),
        beforeEnter: () => {
          store.dispatch("user/logOut");
          return { name: "Home" };
        },
      },

      /**
       * path requiring auth, manager, admin in account
       */
      {
        name: "ManagerOrders",
        path: "/manager/orders",
        component: () => import("../components/manager/ManagerOrders.vue"),
      },
    ],
  },

  /**
   * path requiring auth, manager, admin
   */
  {
    name: "ManagerProducts",
    path: "/manager/products",
    component: () => import("../views/Manager/ManagerProducts.vue"),
    meta: { requiresAuth: true, requiresManager: true },
  },
  {
    name: "NewProduct",
    path: "/products/new",
    component: () => import("../components/product/NewProduct.vue"),
    meta: { requiresAuth: true, requiresManager: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to, _, next) => {
  const isLoggedIn = store.getters["user/getStatusLoggedIn"];
  const isManager = store.getters["user/isManager"];
  const requiresAuth = to.matched.some(
    (route) => route.meta && route.meta.requiresAuth
  );
  const requiresManager = to.matched.some(
    (route) => route.meta && route.meta.requiresManager
  );

  if (!isLoggedIn && requiresAuth) {
    return next(Guard.redirectToLogin(to));
  }

  if (requiresManager) {
    if (!isLoggedIn) return next(Guard.redirectToLogin(to));
    if (!isManager) return next(Guard.redirectToHome(to));
  }

  return next();
});

export default router;
