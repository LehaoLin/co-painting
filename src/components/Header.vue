<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
    style="border-bottom: white"
    active-text-color="#FC5E5E"
  >
    <div class="flex-grow" />
    <el-menu-item index="0">主页</el-menu-item>
    <el-menu-item index="9">预创作</el-menu-item>
    <el-menu-item index="3" :disabled="store.auction_open() ?? false"
      >拍卖行</el-menu-item
    >
    <el-menu-item index="2">规则详解</el-menu-item>
    <el-menu-item index="1" @click="toDiscord">Discord社区</el-menu-item>
    <el-menu-item index="4" @click="toScan">PolygonScan</el-menu-item>
  </el-menu>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useStore } from "@/store/index";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();

const store = useStore();

const activeIndex = ref("0");

const toDiscord = () => {
  window.open("https://discord.gg/uXcmFN7fXx", "_blank");
  activeIndex.value = "0";
  store.router = "home";
};

const toScan = () => {
  window.open(
    "https://sepolia.etherscan.io/address/0x3cf00e16dc4039d2c1daa295e326524fe9d8650c",
    "_blank"
  );
  activeIndex.value = "0";
  store.router = "home";
};

const toNotion = () => {
  window.open(
    "https://admitted-fibre-3dc.notion.site/Painting-Together-or-not-rules-e1c7fdd4b7804784874c7505099fa07f",
    "_blank"
  );
  activeIndex.value = "0";
  store.router = "home";
};

const handleSelect = (key, keyPath) => {
  if (key == "0") {
    // store.router = "home";
    router.push("/");
    // router.push({ path: "/" });
  }
  if (key == "2") {
    // store.router = "about";
    // router.push("/about");
    window.open(
      "https://www.notion.so/e1c7fdd4b7804784874c7505099fa07f?pvs=4",
      "_blank"
    );
  }
  if (key == "3") {
    // store.router = "game";
    router.push("/market");
  }
  if (key == "9") {
    // store.router = "test";
    console.log("test");
    router.push("/test");
  }
  // console.log(key, keyPath);
};

const router_name = computed(() => {
  return store.router;
});

watch(router_name, (new_value, old_value) => {
  if (new_value == "home") {
    activeIndex.value = "0";
  }
  if (new_value == "about") {
    activeIndex.value = "2";
  }
  if (new_value == "game") {
    activeIndex.value = "3";
  }
  if (new_value == "test") {
    activeIndex.value = "5";
  }
});
</script>

<style>
.el-menu {
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
}
.flex-grow {
  /* flex-grow: 1; */
}
.el-menu-item {
  font-size: 18px !important;
}
</style>
