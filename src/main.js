import { createApp } from "vue";

import App from "./App.vue";
import router from "@/config/router";
import store from "@/store";
import axios from "@/config/axios";

import "@/assets/scss/main.scss";
import { registerGlobalComponent } from "@/utils/globalComponent";

import { clickOutsideDirective } from "@/plugins/directive/clickOutside";

let app = createApp(App);
clickOutsideDirective(app);
registerGlobalComponent(app);
app.config.globalProperties.axios = axios;
app.use(store);
app.use(router);
app.mount("#app");
