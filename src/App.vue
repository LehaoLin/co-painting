<template>
  <div id="app" :class="bg">
    <!-- <v-scale-screen width="1920" height="1080"> -->
    <header>
      <Header />
    </header>

    <main>
      <router-view></router-view>
    </main>
    <footer>
      <Footer />
    </footer>
    <!-- </v-scale-screen> -->
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Home from "./components/Home.vue";
import Header from "./components/Header.vue";
import About from "./components/About.vue";
import Game from "./components/Game.vue";
import Test from "./components/Test.vue";
import Footer from "./components/Footer.vue";

import { useStore } from "@/store";
import { useRoute } from "vue-router";

const store = useStore();

const route = useRoute();

const bg = computed(() => {
  if (route.path == "/test") {
    return "other_bg";
  } else {
    return;
  }
});
</script>

<style scoped>
video {
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}

.first-page {
  width: 100%;
}

.other_bg {
  background-image: url("@/assets/test_bg.png");
  background-size: cover;
  top: 0;
  background-position: center top;
  z-index: 100;
}

/* .first-page {
  background-image: url("./assets/background.mp4");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
} */
/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */
</style>
