import { createRouter, createWebHistory } from "vue-router";
//import Homepage from "../views/Home.vue";

const routes = [
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
    name: "NewProduct",
    path: "/products/new",
    component: () => import("../components/product/NewProduct.vue"),
  },
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
  // {
  //   name: "Login",
  //   path: "/account/login",
  //   component: () => import("../views/account/Login.vue"),
  // },
  // {
  //   name: "Register",
  //   path: "/account/register",
  //   component: () => import("../views/account/register.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
