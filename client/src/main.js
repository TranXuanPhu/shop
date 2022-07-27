import { createApp } from "vue";
import { plugin, defaultConfig } from "@formkit/vue";
//import VueSplide from "@splidejs/vue-splide";

import App from "./App.vue";
import store from "./store/index.js";
import router from "./router/router.js";
import FontAwesomeIcon from "./plugins/fontawesome";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/global.css";
import axiosSetup from "./api/axios/axiosClient.js";

axiosSetup(store, router);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(store);
app.use(router);
//app.use(VueSplide);
app.use(plugin, defaultConfig);
app.mount("#app");
