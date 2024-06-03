import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
const app = createApp(App);
import "@mdi/font/css/materialdesignicons.css";

import { createPinia } from "pinia";
import "./main.css"
const pinia = createPinia();



app.use(router);
// app.use(vuetify);
app.use(pinia);
app.mount("#app");