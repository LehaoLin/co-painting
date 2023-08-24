<template>
  <div class="first-page">
    <div class="video-container">
      <video
        autoplay
        muted
        loop
        poster="@/assets/background_new.jpg"
        id="bgvid"
      >
        <source src="@/assets/background_2.mp4" type="video/mp4" />
      </video>
    </div>
    <Wallet />
    <PaintNew style="box-shadow: inset 0 20px 15px #545353" />

    <!-- <Paint /> -->
    <div class="big">
      <!-- <img src="@/assets/vertical.png" /> -->
      <PageThree style="box-shadow: 0 -20px 15px #545353; z-index: 97" />
      <Stages />
      <Members />
    </div>
  </div>
</template>

<script setup>
import Wallet from "./Wallet.vue";
// import Paint from "./Paint.vue";
import PageThree from "./PageThree.vue";
import Stages from "./Stages.vue";
import Members from "./Members.vue";
import PaintNew from "./PaintNew.vue";
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped>
.big {
  background-image: url("@/assets/bg3.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  width: 100%;
  /* background: linear-gradient(to right, #df2f23, #4b74e2) !important; */

  /* background: linear-gradient(
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.9)
    ),
    conic-gradient(from 180deg at 50% 50%, #ec6b6b 0deg, #5f72e4 360deg);
  box-shadow: 6px 10px 6px rgba(0, 0, 0, 0.35); */
  /* opacity: 0.55; Adjust the opacity */
}
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
</style>
