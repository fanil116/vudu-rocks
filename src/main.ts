import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles/main.css";
import "./assets/styles/main.scss";

import { createPinia } from "pinia";
import { createApp } from "vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import App from "./App.vue";
// Создаем Vuetify экземпляр
const vuetify = createVuetify({
  components,
  directives,
});
const app = createApp(App);
app.use(vuetify);
app.use(createPinia());
app.mount("#app");
