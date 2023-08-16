<template>
  <div class="first-page">
    <Header />

    <video
      autoplay
      muted
      loop
      poster="./assets/background.jpg"
      id="bgvid"
      v-if="store.router == 'home' || store.router == 'game'"
    >
      <source src="./assets/background.mp4" type="video/mp4" />
    </video>

    <Home v-if="store.router == 'home'" />
    <About v-if="store.router == 'about'" />
    <Game v-if="store.router == 'game'" />
    <Test v-if="store.router == 'test'" />
    <Footer style="z-index: 9999" />
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

const store = useStore();
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
