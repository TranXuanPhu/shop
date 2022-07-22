import { createApp } from "vue";
import { plugin, defaultConfig } from "@formkit/vue";

import App from "./App.vue";
import router from "./router/router.js";
import FontAwesomeIcon from "./plugins/fontawesome";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/global.css";
import axiosSetup from "./api/axios/axiosClient.js";
import store from "./store/index.js";

axiosSetup();

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.use(store);
app.use(plugin, defaultConfig);
app.mount("#app");
