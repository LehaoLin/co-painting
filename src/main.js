import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import ElementPlus from "element-plus";

import { createRouter, createWebHashHistory } from "vue-router";

import { createPinia } from "pinia";

import Home from "@/components/Home.vue";
import Test from "@/components/Test.vue";
import About from "@/components/About.vue";

const pinia = createPinia();

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/test",
    component: Test,
  },
  {
    path: "/about",
    component: About,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(pinia);

app.mount("#app");
