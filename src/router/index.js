import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Home.vue";
import Test from "@/components/Test.vue";
import Market from "@/components/Market.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/test",
    name: "test",
    component: Test,
  },
  {
    path: "/market",
    name: "market",
    // component: Market,
    redirect: "/",
  },
  {
    path: "/about",
    redirect: "https://www.notion.so/e1c7fdd4b7804784874c7505099fa07f?pvs=4",
    //   name: 'about',
    //   component: About,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
