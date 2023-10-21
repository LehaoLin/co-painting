import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import ElementPlus from "element-plus";

import { createPinia } from "pinia";

// import Home from "@/components/Home.vue";
// import Test from "@/components/Test.vue";
// import About from "@/components/About.vue";

// import VScaleScreen from "v-scale-screen";
import router from "@/router";

const pinia = createPinia();

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(pinia);
// app.use(VScaleScreen);

app.mount("#app");
