import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import ElementPlus from "element-plus";

import { createPinia } from "pinia";
const pinia = createPinia();

createApp(App).use(ElementPlus).use(pinia).mount("#app");
